/**
 * Requires jsdoc and jsdoc-to-markdown
 * Reference: https://gist.github.com/slorber/0bf8c8c8001505f0f99a062ac55bf442
 */

/* eslint-disable no-console */
const fs = require('fs');
const os = require('os');
const path = require('path');
const glob = require('glob');
const babel = require('@babel/core');
// The parser jsdoc reads tag types with. Depended on directly so the types
// written into the comments below can be validated with the same grammar that
// will later read them, instead of an approximation of it.
const catharsis = require('catharsis');
const jsdoc2md = require('jsdoc-to-markdown');
const { execSync } = require('child_process');
const sidebars = require('../sidebars');

// Matches paths of the shape: /package/core/src/charts/bar extracting the package and chart names
const CHART_REGEX = /\/packages\/([\s\S]*?)\/src\/charts\/([\s\S]*?)\//i;

// Matches paths of the shape: /src/charts/bar and get the chart name
const SUB_FOLDER_REGEX = /\/src\/charts\/([\s\S]*?)$/i;

// Extension-agnostic on purpose. These used to read `*.spec.js`,
// `*.stories.js` and `*DataBuilder.js`, which stop matching the moment a file
// converts to TypeScript -- the same blind spot that leaked spec files into the
// published wrappers tarball.
const IGNORED_PATHS = [
    '**/node_modules/**',
    '**/*.spec.[jt]s?(x)',
    '**/*.d.ts',
    '**/index.[jt]s',
    '**/*.stories.[jt]s?(x)',
    '**/*DataBuilder.[jt]s',
    '**/*Data.[jt]s',
];

/**
 * The parents a function's own doc comment can sit on, and so the only ones
 * annotateDocTypesFromTs walks up through looking for it.
 *
 * Anything else stops the walk. Without that an undocumented callback would
 * keep climbing until it reached some enclosing documented function, and its
 * types would be written into a comment describing a different signature --
 * `.each(function () {...})` inside a documented helper is the common shape.
 */
const DECLARATION_PARENTS = new Set([
    'VariableDeclarator',
    'VariableDeclaration',
    'ExportNamedDeclaration',
    'ExportDefaultDeclaration',
    // `exports.width = function (_x) {...}` -- every chart accessor.
    'AssignmentExpression',
    'ExpressionStatement',
    'ObjectProperty',
]);

/**
 * Reads the source text of a node, which is how the types are taken verbatim
 * rather than reprinted. `@babel/generator` would reformat them, and is not a
 * dependency of this package.
 */
const sourceOf = (code, node) => code.slice(node.start, node.end);

/**
 * Rewrites a TypeScript type as one jsdoc can parse, or returns null when it
 * cannot be.
 *
 * The result is checked with catharsis, which is the parser jsdoc itself reads
 * tag types with -- so what passes here is what jsdoc accepts, rather than what
 * some regex here guesses it accepts. That matters because jsdoc treats an
 * unparseable type expression as fatal: one bad tag and the whole docs run
 * exits non-zero. Most TypeScript spellings turn out to parse as written,
 * including unions, generics, `T[]` and string literal types.
 */
const toJsdocType = (typeText) => {
    const collapsed = typeText.replace(/\s+/g, ' ').trim();

    // Closure has no arrow type. `function` is what these pages already showed
    // for a callback parameter, so nothing about them changes.
    if (collapsed.includes('=>')) {
        return 'function';
    }

    const candidate = collapsed
        // An object type literal separates its members with `;` in TypeScript
        // and `,` in Closure.
        .replace(/;/g, ',')
        .replace(/,(\s*})/g, '$1')
        // Closure has no tuple either, but a tuple of one repeated type is an
        // array as far as a reader is concerned -- and `Array.<Number>` is what
        // `[number, number]` was documented as before it became a real type.
        .replace(/^\[\s*([\w$.<>|]+)((?:\s*,\s*\1)+)\s*\]$/, 'Array.<$1>');

    try {
        catharsis.parse(candidate, { jsdoc: true });
    } catch {
        return null;
    }

    return candidate;
};

/** The identifier of a parameter, looking through a default value. */
const parameterIdentifier = (param) =>
    param.type === 'AssignmentPattern' ? param.left : param;

/**
 * Copies TypeScript parameter and return types into the JSDoc tags that
 * jsdoc2md renders, so the generated pages keep their Type column once a file's
 * `@param {Number}` annotations are gone.
 *
 * Only untyped tags are filled in: a tag that still carries a `{...}` is left
 * exactly as written, so a .js file is untouched and a deliberate override in a
 * .ts file wins over its annotation.
 */
function annotateDocTypesFromTs({ onUnsupportedType }) {
    /** A type jsdoc can take, recording the ones it cannot. */
    const documentable = (typeText, where) => {
        const type = toJsdocType(typeText);

        if (!type) {
            onUnsupportedType(`${where}: ${typeText.replace(/\s+/g, ' ')}`);
        }

        return type;
    };

    const typeByParameterName = (fn, code, where) => {
        const types = new Map();

        const record = (name, typeNode) => {
            const type = documentable(
                sourceOf(code, typeNode),
                `${where} param ${name}`
            );

            if (type) {
                types.set(name, type);
            }
        };

        for (const param of fn.params) {
            const identifier = parameterIdentifier(param);
            const annotation = identifier.typeAnnotation?.typeAnnotation;

            if (!annotation) {
                continue;
            }

            // A destructured options object is documented one option per
            // `@param`, not as the object -- `@param ratio`, where `ratio` is a
            // member of the type rather than a parameter. The members are what
            // has to be matched against the tags, so they are read out here.
            if (
                identifier.type === 'ObjectPattern' &&
                annotation.type === 'TSTypeLiteral'
            ) {
                for (const member of annotation.members) {
                    if (
                        member.type === 'TSPropertySignature' &&
                        member.key.type === 'Identifier' &&
                        member.typeAnnotation
                    ) {
                        record(
                            member.key.name,
                            member.typeAnnotation.typeAnnotation
                        );
                    }
                }

                continue;
            }

            // A rest parameter has no name to match a tag against, and `this`
            // is a TypeScript-only parameter that is not part of the call
            // signature.
            if (
                identifier.type !== 'Identifier' ||
                identifier.name === 'this'
            ) {
                continue;
            }

            record(identifier.name, annotation);
        }

        return types;
    };

    /** The comment that documents this function, or null if it has none. */
    const findDocComment = (fnPath) => {
        let current = fnPath;

        while (current) {
            const comments = current.node.leadingComments ?? [];
            // The last one, because only the comment nearest the declaration
            // documents it -- jsdoc reads it the same way.
            const comment = comments.at(-1);

            // A JSDoc block starts `/**`, which Babel stores as a value
            // beginning with `*`. A line or plain block comment is not one.
            if (comment && comment.value.startsWith('*')) {
                return comment;
            }

            current = current.parentPath;

            if (!current || !DECLARATION_PARENTS.has(current.node.type)) {
                return null;
            }
        }

        return null;
    };

    const annotate = (comment, types, returnType) => {
        comment.value = comment.value
            .split('\n')
            .map((line) => {
                const param = line.match(
                    /^(\s*\*\s*@param\s+)(?!\{)([A-Za-z_$][\w$]*)/
                );

                if (param && types.has(param[2])) {
                    return line.replace(
                        param[0],
                        `${param[1]}{${types.get(param[2])}} ${param[2]}`
                    );
                }

                const returns = line.match(/^(\s*\*\s*@returns?\s*)(?!\{)/);

                // `void` is left alone: jsdoc2md renders a return type as part
                // of the heading, and the pages never announced that a
                // side-effecting helper returns nothing.
                if (returns && returnType && returnType !== 'void') {
                    return line.replace(
                        returns[1],
                        `${returns[1].replace(/\s*$/, '')} {${returnType}} `
                    );
                }

                return line;
            })
            .join('\n');
    };

    const visitFunction = (nodePath, state) => {
        const comment = findDocComment(nodePath);

        if (!comment) {
            return;
        }

        const { code } = state.file;
        const { returnType } = nodePath.node;
        const where = state.file.opts.filename ?? 'unknown';

        annotate(
            comment,
            typeByParameterName(nodePath.node, code, where),
            returnType
                ? documentable(
                      sourceOf(code, returnType.typeAnnotation),
                      `${where} return`
                  )
                : null
        );
    };

    return {
        name: 'annotate-doc-types-from-ts',
        visitor: {
            FunctionDeclaration: visitFunction,
            FunctionExpression: visitFunction,
            ArrowFunctionExpression: visitFunction,
        },
    };
}

/**
 * Marks the doc comments on declarations that exist only in the type system, so
 * they do not outlive them.
 *
 * Babel removes a type alias, interface or enum but keeps the comment above it,
 * which then belongs to the next statement in the file. jsdoc reads that as
 * documentation for a symbol it was never about.
 *
 * Each comment is marked rather than detached, because Babel attaches the same
 * comment object in more than one place: as `leadingComments` of the type and
 * as `trailingComments` of the statement before it. Clearing one side left the
 * other to print it, which is why nulling the fields alone was not enough.
 * `ignore` is read by the generator at print time, so it holds wherever the
 * object is reachable from.
 */
function dropTypeOnlyComments() {
    const ignoreComments = (nodePath) => {
        for (const comment of nodePath.node.leadingComments ?? []) {
            // A `@typedef` is kept: it is the author saying this type should
            // appear on the page, which is the one way to get a section and
            // working links for a type that is no longer a jsdoc construct.
            // Keeping it cannot orphan it either, because jsdoc reads a
            // `@typedef` as a symbol of its own rather than as documentation
            // for whatever follows it.
            if (comment.value.includes('@typedef')) {
                continue;
            }

            comment.ignore = true;
        }
    };

    return {
        name: 'drop-type-only-comments',
        visitor: {
            TSTypeAliasDeclaration: ignoreComments,
            TSInterfaceDeclaration: ignoreComments,
            // Not TSEnumDeclaration: an enum emits runtime code, so a comment
            // above it documents something that survives.
            TSDeclareFunction: ignoreComments,
            // An exported type is handled here rather than through the two
            // visitors above, which never see it: preset-typescript drops a
            // type-only export in its Program pass, before this plugin's
            // nested visitors are reached. The comment sits on the `export`
            // statement in any case, not on the declaration inside it.
            ExportNamedDeclaration(nodePath) {
                if (nodePath.node.exportKind === 'type') {
                    ignoreComments(nodePath);
                }
            },
            ImportDeclaration(nodePath) {
                if (nodePath.node.importKind === 'type') {
                    ignoreComments(nodePath);
                }
            },
        },
    };
}

/**
 * Copies core's sources into a temporary tree with the TypeScript transpiled to
 * plain JavaScript, and returns that tree's root alongside its
 * `packages/core/src` -- the root so the caller can delete it when it is done.
 *
 * jsdoc cannot read TypeScript at all -- its `includePattern` in
 * jsdoc.conf.json is `.+\.js(doc)?$`, and handed a .ts file the whole run
 * fails with "There are no input files to process". Stripping the types leaves
 * the JSDoc comments untouched, which is all jsdoc2md reads.
 *
 * This is deliberately not typedoc, which the migration plan had pencilled in.
 * typedoc only sees declarations, and every chart's API is accessors assigned
 * onto a function inside a closure (`exports.width = function (_x) {...}`).
 * Measured on bar: typedoc produces one 41-line page mentioning none of them,
 * where jsdoc2md produces 37 accessor sections. The accessor list is what
 * these pages are, so the tool that can see it wins.
 *
 * One thing is lost by converting a `@typedef` into a real TypeScript type:
 * jsdoc2md no longer knows it is documented, so references to it render as
 * plain code rather than links to its own section. Keep an `@typedef` comment
 * alongside the type where the page should show it.
 *
 * Doc comments on type declarations are dropped before stripping, by
 * dropTypeOnlyComments below. Without that they survive their declaration and
 * attach to whatever statement follows, so jsdoc documents the wrong symbol --
 * `AxisTimeCombinationValue`'s comment appeared on `timeBenchmarks`, and
 * `DateFormatter`'s on `formatMap`, each creating a page out of nothing.
 *
 * Parameter and return types are copied out of the annotations and into the
 * JSDoc by annotateDocTypesFromTs below, before they are stripped. Converting
 * a file means deleting its `@param {Number}` tags, because the type now lives
 * in the signature and two copies would drift -- but jsdoc2md builds the pages'
 * Type column out of exactly those tags, so without this the column empties
 * out, and every accessor of every chart loses its documented type.
 *
 * The tree mirrors the real paths, so every path-shape assumption below --
 * CHART_REGEX, SUB_FOLDER_REGEX, the page titles -- keeps working unchanged.
 */
function stripTypesForJsdoc(sourceRoot) {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'britecharts-docs-'));
    const destRoot = path.join(tmpRoot, 'packages', 'core', 'src');
    // `.d.ts` files are excluded here as well as from IGNORED_PATHS: they are
    // declarations, so Babel rejects them outright (`declare const x: T;` has
    // no initializer), and jsdoc has nothing to read in them anyway.
    const files = glob.sync(path.join(sourceRoot, '**/*.[jt]s?(x)'), {
        ignore: ['**/node_modules/**', '**/*.d.ts'],
    });
    // Built once and shared, so a type jsdoc cannot take is reported for the
    // whole run rather than per file.
    const unsupportedTypes = [];
    const annotateTypes = annotateDocTypesFromTs({
        onUnsupportedType: (message) => unsupportedTypes.push(message),
    });

    for (const file of files) {
        const relative = path.relative(sourceRoot, file);
        const isTypeScript = /\.tsx?$/.test(file);
        const dest = path.join(destRoot, relative.replace(/\.tsx?$/, '.js'));

        fs.mkdirSync(path.dirname(dest), { recursive: true });

        if (!isTypeScript) {
            fs.copyFileSync(file, dest);
            continue;
        }

        // Types out, comments kept. `comments: true` is the default, and the
        // whole point here -- jsdoc2md reads nothing else.
        const { code } = babel.transformFileSync(file, {
            babelrc: false,
            configFile: false,
            comments: true,
            // Order matters: the types have to be copied into the comments
            // while the annotations are still there to read.
            plugins: [annotateTypes, dropTypeOnlyComments],
            presets: [require.resolve('@babel/preset-typescript')],
            filename: file,
        });

        fs.writeFileSync(dest, code);
    }

    // Said out loud rather than swallowed: each of these is a Type column cell
    // that will render empty, and the fix is either a wider
    // SUPPORTED_JSDOC_TYPE or an explicit `@param {...}` on the tag.
    if (unsupportedTypes.length) {
        console.log(
            `\n⚠️  ${unsupportedTypes.length} type(s) jsdoc cannot express, left undocumented:`
        );
        unsupportedTypes.forEach((message) => console.log(`   ${message}`));
    }

    return { tmpRoot, strippedRoot: destRoot };
}

/**
 * Deletes API pages this run did not produce.
 *
 * The script only ever wrote pages, so a page whose source stopped being
 * processed stayed on disk and on the site, frozen at whatever it last said.
 * That happened to grid.md and domain.md when their helpers converted: both
 * kept serving stale content, which reads as current.
 */
function removeStalePages(writeDir, generated) {
    if (!fs.existsSync(writeDir)) {
        return;
    }

    for (const file of fs.readdirSync(writeDir)) {
        if (!file.endsWith('.md') || generated.has(file)) {
            continue;
        }

        fs.unlinkSync(path.join(writeDir, file));
        console.log(`-= Removed ${file}, which is no longer generated =-`);
    }
}

/**
 * Runs through packages folders looking for JSDoc and generates markdown docs
 */
async function generateDocs() {
    console.log('-= Generating package docs =-');
    // Both JavaScript and TypeScript, with the TypeScript transpiled to
    // plain JavaScript first -- see stripTypesForJsdoc below for why that
    // rather than typedoc.
    const sourceRoot = path.join(__dirname, '../../core/src');
    const { tmpRoot, strippedRoot } = stripTypesForJsdoc(sourceRoot);
    const pathPattern = path.join(strippedRoot, '**/*.js');
    const filePaths = glob.sync(pathPattern, {
        ignore: IGNORED_PATHS,
    });
    const writeDir = path.join(__dirname, '../docs/API/');

    // Get the sidebar object
    let processingPackageName;
    const generatedPages = new Set();

    // grab all js files
    for (const filePath of filePaths) {
        // Generate markdown from JSDoc comments.
        // jsdoc-to-markdown dropped renderSync in v8, so this is awaited.
        // eslint-disable-next-line testing-library/render-result-naming-convention -- jsdoc2md.render, not Testing Library's
        const apiMarkdown = await jsdoc2md.render({
            files: filePath,
            configure: path.join(__dirname, '../jsdoc.conf.json'),
            'heading-depth': 1,
            // A file with no @module (the helpers) would otherwise open with
            // an index of its constants and functions -- a page that reads as
            // the same content twice, titled "Constants" or "Modules".
            'global-index-format': 'none',
        });
        // jsdoc2md anchors its table of contents with <a name="…">, which
        // browsers honour but Docusaurus's broken-anchor check does not:
        // it only knows ids. Give every anchor an id as well.
        // jsdoc2md puts the chart's own call (`exports(_selection)`) at
        // heading level 2 and every accessor at level 3, so the first entry
        // on a page sits one level above the rest. One level for all of
        // them: the page's title is the only level-1 heading.
        const markdown = apiMarkdown
            .replace(/<a name="([^"]+)"><\/a>/g, '<a name="$1" id="$1"></a>')
            .replace(/^### /gm, '## ');

        // if there's markdown, do stuff
        if (markdown && markdown.length > 0) {
            // get the package ID from the file path
            const matchingExpression = filePath.match(CHART_REGEX);
            const [, packageId, chartId] = matchingExpression;
            const chartName =
                chartId.charAt(0).toUpperCase() + chartId.slice(1);
            // The page's title, which is also its sidebar label: "Grouped
            // Bar" rather than the module's "Grouped-bar", and the helpers
            // (grid, domain) named as such
            const title =
                chartId
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ') + (chartId === 'helpers' ? '' : '');

            if (chartName !== processingPackageName) {
                processingPackageName = chartName;
                console.log(
                    `-= Processing the ${chartName} chart from the ${packageId} package =-`
                );
            }

            // get the sub-folder structure relative to /src/
            let subPath = path.dirname(filePath).match(SUB_FOLDER_REGEX)
                ? `${path.dirname(filePath).match(SUB_FOLDER_REGEX)[1]}`
                : '';

            // Get each part of the path, filtering out empty path items
            const subPathArray = subPath.split('/');

            // get file name sans extension
            let fileName = path.basename(filePath, '.js');

            // if the file name is index, but is not the package index
            if (subPathArray.length > 0 && fileName === 'index') {
                // change file name to the parent folder name
                fileName = subPathArray[subPathArray.length - 1];

                // remove the parent folder from the path
                subPathArray.pop();
                subPath = subPathArray.join('/');
            }

            // check if the directory exists
            if (!fs.existsSync(writeDir)) {
                // create the directory
                fs.mkdirSync(writeDir, { recursive: true });
            }

            const isHelper = /\/helpers\//.test(filePath);
            const pageTitle = isHelper
                ? `${fileName.charAt(0).toUpperCase()}${fileName.slice(
                      1
                  )} helpers`
                : title;
            // The module heading would repeat the title; the rest -- the
            // chart's call, its accessors, typedefs, a helper's functions --
            // all sit one level under it
            const page = markdown
                .replace(new RegExp(`^# ${chartName}\\n`, 'm'), '')
                // jsdoc2md's own indexes of a page's modules, typedefs,
                // constants or functions: lists of links to what follows
                .replace(
                    /^# (Modules|Typedefs|Constants|Functions|Members|Classes)\n[\s\S]*?(?=^# |^<a name=|(?![\s\S]))/gm,
                    ''
                )
                .replace(/^# /gm, '## ');

            // write the markdown file
            fs.writeFileSync(
                `${writeDir}/${fileName}.md`,
                `---\ntitle: ${pageTitle}\n---\n\n${page}`
            );
            generatedPages.add(`${fileName}.md`);
        }

        // Add category metadata
        const readmeFile = fs.readFileSync('./scripts/_category_.json');
        fs.writeFileSync(`${writeDir}/_category_.json`, readmeFile);
    }

    removeStalePages(writeDir, generatedPages);

    // The transpiled copy has done its job. Left behind it would accumulate one
    // tree per run in the system temp directory.
    fs.rmSync(tmpRoot, { recursive: true, force: true });

    // Let the user know what step we're on
    console.log('\u001B[32m', '✔️  Docs generated', '\u001B[0m');
}

generateDocs().then(
    () => process.exit(0),
    (error) => {
        console.error(error);
        process.exit(1);
    }
);
