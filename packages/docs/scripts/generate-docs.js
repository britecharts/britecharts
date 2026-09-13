/**
 * Requires jsdoc and jsdoc-to-markdown
 * Reference: https://gist.github.com/slorber/0bf8c8c8001505f0f99a062ac55bf442
 */

/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const jsdoc2md = require('jsdoc-to-markdown');
const { execSync } = require('child_process');
const sidebars = require('../sidebars');

// Matches paths of the shape: /package/core/src/charts/bar extracting the package and chart names
const CHART_REGEX = /\/packages\/([\s\S]*?)\/src\/charts\/([\s\S]*?)\//i;

// Matches paths of the shape: /src/charts/bar and get the chart name
const SUB_FOLDER_REGEX = /\/src\/charts\/([\s\S]*?)$/i;

const IGNORED_PATHS = [
    '**/node_modules/**',
    '**/*.spec.js',
    '**/*.d.ts',
    '**/index.js',
    '**/*.stories.js',
    '**/*DataBuilder.js',
    '**/*Data.js',
];

/**
 * Runs through packages folders looking for JSDoc and generates markdown docs
 */
async function generateDocs() {
    console.log('-= Generating package docs =-');
    // Use glob to get all js/ts files
    const pathPattern = path.join(__dirname, '../../core/src/**/*.[jt]s?(x)');
    const filePaths = glob.sync(pathPattern, {
        ignore: IGNORED_PATHS,
    });
    const writeDir = path.join(__dirname, '../docs/API/');

    // Get the sidebar object
    let processingPackageName;

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
        }

        // Add category metadata
        const readmeFile = fs.readFileSync('./scripts/_category_.json');
        fs.writeFileSync(`${writeDir}/_category_.json`, readmeFile);
    }

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
