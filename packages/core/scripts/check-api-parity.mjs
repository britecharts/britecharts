/**
 * Checks that every accessor a chart exposes at runtime is declared in the
 * published typings.
 *
 * Converting the heatmap turned up three accessors it had always shipped and
 * never declared -- `on`, `isAnimated` and `animationDuration`. `on` is the
 * event bridge a consumer uses to attach a tooltip, so
 * `heatmap().on('customMouseOver', tooltip.show)` had never compiled for anyone
 * writing TypeScript. Nothing was comparing the two sides, so nothing said so.
 *
 * The declaration side is read through the TypeScript compiler rather than by
 * matching text, which is the whole point. A first attempt at this with regexes
 * produced three classes of false positive before being thrown away: it assumed
 * four-space indentation, so `bullet-chart.d.ts` at two spaces reported all
 * thirteen of its members missing; it skipped interfaces whose body is empty;
 * and it could not follow a base declared as `type X = Omit<Y, 'z'>`, which is
 * how both bullet and the scatter plot declare theirs. The checker resolves
 * intersections, inherited members and `Omit` alike, and `Omit` matters here --
 * a member removed on purpose must not be reported as missing.
 *
 * The runtime side is read from the source, since the accessors are properties
 * assigned onto a function inside a closure and no tool infers them: that is the
 * same blind spot that made typedoc useless for the docs and that makes every
 * chart assert its own module type.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, '..');
const srcRoot = path.join(packageRoot, 'src');
const typingsEntry = path.join(srcRoot, 'typings', 'index.d.ts');

/** Accessor names assigned onto the chart's `exports` function. */
const assignedAccessors = (source) => {
    const names = new Set();

    // `exports.width = ...` in a JavaScript chart, and
    // `(exports as BarChartModule).width = ...` in a converted one, where the
    // assertion is what lets TypeScript see the module's members.
    for (const [, name] of source.matchAll(
        /(?:^|\()\s*exports(?:\s+as\s+[\w[\]'"]+\s*\))?\.(\w+)\s*=/gm
    )) {
        names.add(name);
    }

    return names;
};

const program = ts.createProgram([typingsEntry], {
    target: ts.ScriptTarget.ES2020,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    skipLibCheck: true,
    noEmit: true,
});
const checker = program.getTypeChecker();

/**
 * Every `export function name(): SomeModule` the typings entry reaches.
 *
 * Both directories, because a chart's module type lives beside the chart now
 * and the factory declaration stays in the typings barrel: the declaration
 * naming the factory and the type it returns can be in either place.
 *
 * Filtering to `/src/typings/charts/` alone is how this silently stopped
 * comparing bullet and mini-tooltip the moment their types moved -- the chart
 * simply left the set, and a comparison over a smaller set reports success
 * just as loudly. `expectedFactories` below is the guard against that
 * happening again.
 */
const factories = new Map();
const isOwnSource = (fileName) =>
    fileName.includes('/src/typings/') || fileName.includes('/src/charts/');

for (const file of program.getSourceFiles()) {
    if (!isOwnSource(file.fileName)) {
        continue;
    }

    for (const statement of file.statements) {
        if (
            ts.isFunctionDeclaration(statement) &&
            statement.name &&
            statement.type
        ) {
            factories.set(statement.name.text, checker.getTypeAtLocation(statement.type));
        }
    }
}

/** The first of these paths that exists, read. */
const readSource = (candidates) => {
    for (const candidate of candidates) {
        try {
            return readFileSync(candidate, 'utf8');
        } catch {
            // try the next extension
        }
    }

    throw new Error(`None of these exist: ${candidates.join(', ')}`);
};

// Chart factory name -> its source file, taken from the barrel so the mapping
// is the library's own rather than guessed from directory names.
// Read across both extensions, as the chart files below are: the barrel is
// TypeScript now, and the import specifiers inside it stay '.js' either way,
// which is what webpack's `extensionAlias` and TypeScript's bundler resolution
// both expect.
const barrel = readSource(
    ['index.ts', 'index.js'].map((name) => path.join(srcRoot, name))
);
const sources = new Map();

for (const [, name, relative] of barrel.matchAll(
    /import (\w+) from '\.\/(charts\/[^']+)\.js'/g
)) {
    for (const extension of ['.ts', '.js']) {
        const candidate = path.join(srcRoot, relative + extension);

        try {
            sources.set(name, {
                file: candidate,
                source: readFileSync(candidate, 'utf8'),
            });
            break;
        } catch {
            // try the other extension
        }
    }
}

/**
 * Members of a chart's module type that are not accessors, so their absence from
 * the source's assignments means nothing. The callable's own members come from
 * `ChartModuleSelection`, and `exportChart` is a command rather than a
 * get-or-set pair.
 */
const NOT_AN_ACCESSOR = new Set([
    'apply',
    'arguments',
    'bind',
    'call',
    'caller',
    'length',
    'name',
    'prototype',
    'toString',
]);

const gaps = [];

for (const [name, { file, source }] of [...sources].sort()) {
    const moduleType = factories.get(name);

    if (!moduleType) {
        // `colors` is a helper and `miniTooltip` is a preset of the tooltip;
        // neither declares a factory of its own.
        continue;
    }

    const declared = new Set(
        checker.getPropertiesOfType(moduleType).map((symbol) => symbol.getName())
    );
    const exposed = assignedAccessors(source);

    // A preset assigns nothing: `miniTooltip` is
    // `tooltip().layout('single').title('').numberFormat('.2f')` and inherits the
    // tooltip's whole surface, so every member it declares is legitimately
    // absent from its own source.
    if (exposed.size === 0) {
        console.log(`  ${name.padEnd(13)} a preset, nothing of its own to compare`);
        continue;
    }
    const undeclared = [...exposed].filter((n) => !declared.has(n)).sort();
    // The other direction, which this script used to ignore: a member the
    // typings promise and the chart does not have. Calling one compiles and then
    // throws, which is worse than an accessor being merely unreachable.
    // `exportChart` and the callable itself are not accessors and never appear
    // as assignments.
    const phantom = [...declared]
        .filter((n) => !exposed.has(n) && !NOT_AN_ACCESSOR.has(n))
        .sort();

    if (undeclared.length || phantom.length) {
        gaps.push({
            name,
            file: path.relative(packageRoot, file),
            undeclared,
            phantom,
        });
    }

    const counts = `${String(exposed.size).padStart(2)} exposed, ${String(declared.size).padStart(2)} declared`;
    const notes = [
        undeclared.length ? `undeclared: ${undeclared.join(', ')}` : '',
        phantom.length ? `declared but absent: ${phantom.join(', ')}` : '',
    ].filter(Boolean);

    console.log(
        `  ${name.padEnd(13)} ${counts}${notes.length ? '  ' + notes.join('; ') : ''}`
    );
}

// Every chart the barrel exports has to have been compared. Without this, a
// chart whose declaration moves out of the set this script looks in simply
// stops being checked, and the run still ends with a tick: that is how bullet
// and mini-tooltip went uncompared for one commit.
// `colors` is the one barrel export that is not a chart: it is the object of
// colour schemas, with no factory to declare.
const NOT_A_FACTORY = new Set(['colors']);
const uncompared = [...sources.keys()].filter(
    (name) => !factories.has(name) && !NOT_A_FACTORY.has(name)
);

if (uncompared.length) {
    console.error(
        `\n✖ ${uncompared.length} chart(s) the barrel exports have no factory ` +
            `declaration this script could find: ${uncompared.join(', ')}.\n` +
            'Nothing was compared for them. Declare the factory where the other\n' +
            "charts' are, or teach this script where it moved."
    );
    process.exit(1);
}

if (gaps.length) {
    const total = gaps.reduce((sum, g) => sum + g.undeclared.length, 0);

    console.error(
        `\n✖ ${total} accessor(s) across ${gaps.length} chart(s) are exposed at runtime but not declared.\n` +
            'A consumer writing TypeScript cannot call these at all. Declare them in\n' +
            "the chart's own typings, or mark them private if they were never meant to\n" +
            'be public.'
    );
    process.exit(1);
}

console.log('\n✔️  every exposed accessor is declared');
