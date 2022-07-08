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
function generateDocs() {
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
    filePaths.forEach((filePath) => {
        // Generate markdown from JSDoc comments
        const markdown = jsdoc2md.renderSync({
            files: filePath,
            configure: path.join(__dirname, '../jsdoc.conf.json'),
            'heading-depth': 1,
        });

        // if there's markdown, do stuff
        if (markdown && markdown.length > 0) {
            // get the package ID from the file path
            const matchingExpression = filePath.match(CHART_REGEX);
            const [, packageId, chartId] = matchingExpression;
            const chartName =
                chartId.charAt(0).toUpperCase() + chartId.slice(1);

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

            // write the markdown file
            fs.writeFileSync(`${writeDir}/${fileName}.md`, markdown);
        }

        // Add category metadata
        const readmeFile = fs.readFileSync('./scripts/_category_.json');
        fs.writeFileSync(`${writeDir}/_category_.json`, readmeFile);
    });

    // Let the user know what step we're on
    console.log('\u001B[32m', '✔️  Docs generated', '\u001B[0m');
}

generateDocs();
process.exit(0);
