// Writes a JSON Schema for each chart's spec, the { chart, config, data }
// object an app or an agent describes a chart with, from the TypeScript types
// the wrappers already accept. The config schema is
// WrapperConfiguration<ChartModule> as the TypeScript checker resolves it, so
// every accessor, command and event is there with its value type and its JSDoc,
// and the schemas cannot drift from the code: schemas.spec.ts fails when the
// committed files differ from what this produces.
//
//   schemas/<chart>.json    the spec schema, published on the docs site
//   src/schemas/<chart>.ts  its config part without descriptions, which the
//                           wrappers check values against at run time
//
// Run with `pnpm --filter @britecharts/wrappers run schemas`.
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const wrappersDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
);

export const SCHEMA_BASE =
    'https://britecharts.github.io/britecharts/schema/v3/';

// Each wrapper's chart, named as core exports its factory, with the module and
// data types its wrapper is declared over. The tooltip draws no data of its own.
export const CHARTS = [
    ['bar', 'BarChartModule', 'BarChartDataShape[]'],
    ['brush', 'BrushChartModule', 'BrushChartDataShape[]'],
    ['bullet', 'BulletChartModule', 'BulletChartDataShape[]'],
    ['donut', 'DonutChartModule', 'DonutChartDataShape[]'],
    ['groupedBar', 'GroupedBarChartModule', 'GroupedBarChartDataShape[]'],
    ['heatmap', 'HeatmapChartModule', 'HeatmapChartDataShape[]'],
    ['legend', 'LegendModule', 'LegendDataShape[]'],
    ['line', 'LineChartModule', 'LineChartData'],
    ['scatterPlot', 'ScatterPlotModule', 'ScatterPlotDataShape[]'],
    ['sparkline', 'SparklineChartModule', 'SparklineChartDataShape[]'],
    ['stackedArea', 'StackedAreaChartModule', 'StackedAreaChartDataShape[]'],
    ['stackedBar', 'StackedBarChartModule', 'StackedBarChartDataShape[]'],
    ['tooltip', 'TooltipModule', null],
    ['treemap', 'TreemapChartModule', 'TreemapChartDataShape[]'],
];

// `on` registers events, which the configuration names directly instead;
// `render` draws the chart, which the wrapper does itself; and `tooltip`
// takes a tooltip module, which JSON can't hold
const NOT_CONFIGURATION = new Set(['on', 'render', 'tooltip']);

// JSON can't hold a function, so a spec can't set one; `not: {}` says so to a
// validator, and the wrappers accept a function wherever a schema has it
const FUNCTION_SCHEMA = {
    $comment: "A function: set it from JavaScript, since JSON can't hold one.",
    not: {},
};

const entryFile = path.join(wrappersDir, 'src', '__schemas__.ts');

const entrySource = () => {
    const types = CHARTS.flatMap(([, module, data]) => [module, data])
        .filter(Boolean)
        .map((type) => type.replace('[]', ''));

    return [
        "import type { WrapperConfiguration } from './helpers/configuration.js';",
        `import type { ${[...new Set(types)].join(', ')} } from '@britecharts/core';`,
        ...CHARTS.flatMap(([name, module, data]) => [
            `export type ${name}__config = WrapperConfiguration<${module}>;`,
            data ? `export type ${name}__data = ${data};` : '',
        ]),
    ].join('\n');
};

const createChecker = () => {
    const config = ts.getParsedCommandLineOfConfigFile(
        path.join(wrappersDir, 'tsconfig.json'),
        {},
        { ...ts.sys, onUnRecoverableConfigFileDiagnostic: () => {} }
    );
    const host = ts.createCompilerHost(config.options);
    const getSourceFile = host.getSourceFile;

    host.getSourceFile = (fileName, languageVersion) =>
        fileName === entryFile
            ? ts.createSourceFile(fileName, entrySource(), languageVersion)
            : getSourceFile(fileName, languageVersion);

    const program = ts.createProgram([entryFile], config.options, host);
    const checker = program.getTypeChecker();
    const entry = checker.getSymbolAtLocation(program.getSourceFile(entryFile));
    const exported = Object.fromEntries(
        checker
            .getExportsOfModule(entry)
            .map((symbol) => [
                symbol.name,
                checker.getDeclaredTypeOfSymbol(symbol),
            ])
    );

    return { checker, exported };
};

// The JSDoc's first paragraph, on one line
const describe = (checker, symbol) =>
    ts
        .displayPartsToString(symbol.getDocumentationComment(checker))
        .split(/\n\s*\n/)[0]
        .replace(/\s+/g, ' ')
        .trim();

const isOptional = (symbol) => (symbol.flags & ts.SymbolFlags.Optional) !== 0;

const toSchema = (checker, type, depth = 0) => {
    const flags = type.flags;

    if (depth > 8 || flags & (ts.TypeFlags.Any | ts.TypeFlags.Unknown)) {
        return {};
    }
    if (type.isUnion()) {
        return unionSchema(checker, type, depth);
    }
    if (flags & ts.TypeFlags.StringLiteral) {
        return { const: type.value };
    }
    if (flags & ts.TypeFlags.NumberLiteral) {
        return { const: type.value };
    }
    if (flags & ts.TypeFlags.BooleanLiteral) {
        return { const: checker.typeToString(type) === 'true' };
    }
    if (flags & ts.TypeFlags.StringLike) {
        return { type: 'string' };
    }
    if (flags & ts.TypeFlags.NumberLike) {
        return { type: 'number' };
    }
    if (flags & ts.TypeFlags.BooleanLike) {
        return { type: 'boolean' };
    }
    if (flags & ts.TypeFlags.Null) {
        return { type: 'null' };
    }
    if (type.getCallSignatures().length) {
        return { ...FUNCTION_SCHEMA };
    }
    if (type.symbol?.name === 'Date') {
        return { type: 'string', format: 'date-time' };
    }
    if (checker.isTupleType(type)) {
        const items = checker
            .getTypeArguments(type)
            .map((item) => toSchema(checker, item, depth + 1));

        // Optional elements, as in bullet's [number?, number?, number?], may
        // be left off the end
        return {
            type: 'array',
            prefixItems: items,
            items: false,
            minItems: type.target.minLength,
        };
    }
    if (checker.isArrayType(type)) {
        return {
            type: 'array',
            items: toSchema(
                checker,
                checker.getTypeArguments(type)[0],
                depth + 1
            ),
        };
    }

    return objectSchema(checker, type, depth);
};

const unionSchema = (checker, type, depth) => {
    const members = type.types.filter(
        (member) => !(member.flags & ts.TypeFlags.Undefined)
    );
    const booleans = members.filter(
        (member) => member.flags & ts.TypeFlags.BooleanLiteral
    );
    const others = members.filter(
        (member) => !(member.flags & ts.TypeFlags.BooleanLiteral)
    );
    const schemas = others.map((member) => toSchema(checker, member, depth));

    if (booleans.length === 2) {
        schemas.push({ type: 'boolean' });
    } else {
        booleans.forEach((member) =>
            schemas.push(toSchema(checker, member, depth))
        );
    }

    const consts = schemas.filter((schema) => 'const' in schema);

    if (consts.length === schemas.length) {
        return { enum: consts.map((schema) => schema.const) };
    }

    return schemas.length === 1 ? schemas[0] : { anyOf: schemas };
};

const objectSchema = (checker, type, depth) => {
    const [index] = checker.getIndexInfosOfType(type);
    const properties = checker.getPropertiesOfType(type);
    const schema = { type: 'object' };

    if (properties.length) {
        schema.properties = Object.fromEntries(
            properties.map((property) => [
                property.name,
                withDescription(
                    toSchema(
                        checker,
                        checker.getTypeOfSymbol(property),
                        depth + 1
                    ),
                    describe(checker, property)
                ),
            ])
        );

        const required = properties
            .filter((property) => !isOptional(property))
            .map((property) => property.name);

        if (required.length) {
            schema.required = required;
        }
    }
    if (index) {
        schema.additionalProperties = toSchema(checker, index.type, depth + 1);
    }

    return schema;
};

const withDescription = (schema, description) =>
    description ? { description, ...schema } : schema;

const configSchema = (checker, type) => {
    const properties = checker
        .getPropertiesOfType(type)
        .filter((property) => !NOT_CONFIGURATION.has(property.name))
        .sort((a, b) => a.name.localeCompare(b.name));

    return {
        type: 'object',
        properties: Object.fromEntries(
            properties.map((property) => [
                property.name,
                withDescription(
                    toSchema(checker, checker.getTypeOfSymbol(property), 1),
                    describe(checker, property)
                ),
            ])
        ),
        additionalProperties: false,
    };
};

// A copy without descriptions or comments, for the run-time check
const stripDocs = (schema) => {
    if (Array.isArray(schema)) {
        return schema.map(stripDocs);
    }
    if (schema && typeof schema === 'object') {
        return Object.fromEntries(
            Object.entries(schema)
                .filter(([key]) => key !== 'description' && key !== '$comment')
                .map(([key, value]) => [key, stripDocs(value)])
        );
    }

    return schema;
};

/**
 * Every chart's spec schema and the config schema its wrapper checks against,
 * keyed by the chart's name.
 */
export const buildSchemas = () => {
    const { checker, exported } = createChecker();

    return Object.fromEntries(
        CHARTS.map(([name, , data]) => {
            const config = configSchema(checker, exported[`${name}__config`]);
            const properties = {
                $schema: { type: 'string' },
                chart: { const: name },
                config,
            };

            if (data) {
                properties.data = toSchema(checker, exported[`${name}__data`]);
            }

            const spec = {
                $schema: 'https://json-schema.org/draft/2020-12/schema',
                $id: `${SCHEMA_BASE}${name}.json`,
                title: `Britecharts ${name} spec`,
                description: `A ${name} chart: the chart's name, its configuration (the accessors, commands and events the ${name} wrapper takes) and its data.`,
                type: 'object',
                properties,
                required: data ? ['chart', 'data'] : ['chart'],
                additionalProperties: false,
            };

            return [name, { spec, config: stripDocs(config) }];
        })
    );
};

const HEADER = `// Generated by scripts/generate-schemas.mjs from the chart's types: run
// \`pnpm --filter @britecharts/wrappers run schemas\` rather than editing it.
// What its wrapper checks configuration values against.
`;

const write = () => {
    const schemas = buildSchemas();

    mkdirSync(path.join(wrappersDir, 'schemas'), { recursive: true });
    mkdirSync(path.join(wrappersDir, 'src', 'schemas'), { recursive: true });

    const modules = Object.entries(schemas).map(([name, { spec, config }]) => {
        writeFileSync(
            path.join(wrappersDir, 'schemas', `${name}.json`),
            `${JSON.stringify(spec, null, 4)}\n`
        );
        writeFileSync(
            path.join(wrappersDir, 'src', 'schemas', `${name}.ts`),
            `${HEADER}import type { ConfigurationSchema } from '../helpers/schema.js';\n\nconst schema: ConfigurationSchema = ${JSON.stringify(config, null, 4)};\n\nexport default schema;\n`
        );

        return path.join('src', 'schemas', `${name}.ts`);
    });

    // In the repository's own format, so the commit hook leaves them as written
    execFileSync('npx', ['oxfmt', ...modules], {
        cwd: wrappersDir,
        stdio: 'ignore',
    });

    console.log(`Wrote ${Object.keys(schemas).length} chart schemas`);
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    write();
}
