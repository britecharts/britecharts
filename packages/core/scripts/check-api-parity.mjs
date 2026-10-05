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

/** Every `export function name(): SomeModule` across the typings. */
const factories = new Map();

for (const file of program.getSourceFiles()) {
    if (!file.fileName.includes('/src/typings/charts/')) {
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

// Chart factory name -> its source file, taken from the barrel so the mapping
// is the library's own rather than guessed from directory names.
const barrel = readFileSync(path.join(srcRoot, 'index.js'), 'utf8');
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
