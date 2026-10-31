/**
 * Checks that every accessor a chart exposes at runtime is declared in the
 * chart's module type, which is what the published declarations carry.
 *
 * An accessor a chart ships but does not declare cannot be called from
 * TypeScript at all. When it is `on`, the event bridge a consumer uses to
 * attach a tooltip, `heatmap().on('customMouseOver', tooltip.show)` does not
 * compile, and nothing else compares the two sides to say so.
 *
 * The declaration side is read through the TypeScript compiler rather than by
 * matching text, which is the whole point. Text matching depends on
 * indentation, misses interfaces whose body is empty, and cannot follow a base
 * declared as `type X = Omit<Y, 'z'>`, which is how both bullet and the
 * scatter plot declare theirs. The checker resolves intersections, inherited
 * members and `Omit` alike, and `Omit` matters here -- a member removed on
 * purpose must not be reported as missing.
 *
 * The runtime side is read from the source, since the accessors are properties
 * assigned onto a function inside a closure and no tool infers them: that is the
 * same blind spot that makes every chart assert its own module type.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, '..');
const srcRoot = path.join(packageRoot, 'src');
const barrelEntry = path.join(srcRoot, 'index.ts');

/** Accessor names assigned onto the chart's `exports` function. */
const assignedAccessors = (source) => {
    const names = new Set();

    // `exports.width = ...` in a JavaScript chart, and
    // `(exports as BarChartModule).width = ...` in a TypeScript one, where the
    // assertion is what lets TypeScript see the module's members.
    for (const [, name] of source.matchAll(
        /(?:^|\()\s*exports(?:\s+as\s+[\w[\]'"]+\s*\))?\.(\w+)\s*=/gm
    )) {
        names.add(name);
    }

    return names;
};

const program = ts.createProgram([barrelEntry], {
    target: ts.ScriptTarget.ES2020,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    skipLibCheck: true,
    noEmit: true,
});
const checker = program.getTypeChecker();

/**
 * Every factory the barrel exports, mapped to the module type it returns.
 *
 * Read from `src/index.ts` itself, which is what the published declarations
 * are generated from. Asking the checker for the barrel's exports leaves
 * nothing to filter: any filter on the set lets a chart drop out of it
 * silently, and a comparison over a smaller set reports success just as
 * loudly. The `uncompared` check below is the guard against a chart dropping
 * out.
 */
const factories = new Map();
const barrelSymbol = checker.getSymbolAtLocation(
    program.getSourceFile(barrelEntry)
);

for (const exported of checker.getExportsOfModule(barrelSymbol)) {
    const target =
        exported.flags & ts.SymbolFlags.Alias
            ? checker.getAliasedSymbol(exported)
            : exported;

    if (!(target.flags & ts.SymbolFlags.Function)) {
        continue;
    }
    const [signature] = checker.getTypeOfSymbol(target).getCallSignatures();

    if (signature) {
        factories.set(exported.getName(), signature.getReturnType());
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
// Read across both extensions, as the chart files below are: the import
// specifiers inside the barrel are '.js' whatever the file behind them is,
// which is what TypeScript's resolution and the published ESM entry expect.
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
        // `colors` is a helper and `miniTooltip` is an alias of the tooltip;
        // neither declares a factory of its own.
        continue;
    }

    const declared = new Set(
        checker
            .getPropertiesOfType(moduleType)
            .map((symbol) => symbol.getName())
    );
    const exposed = assignedAccessors(source);

    // An alias assigns nothing: `miniTooltip` is
    // `tooltip().layout('single').title('').numberFormat('.2f')` and inherits the
    // tooltip's whole surface, so every member it declares is legitimately
    // absent from its own source.
    if (exposed.size === 0) {
        console.log(
            `  ${name.padEnd(13)} an alias, nothing of its own to compare`
        );
        continue;
    }
    const undeclared = [...exposed].filter((n) => !declared.has(n)).sort();
    // The other direction: a member the typings promise and the chart does not
    // have. Calling one compiles and then throws, which is worse than an
    // accessor being merely unreachable.
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
// stops being checked, and the run still ends with a tick.
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
