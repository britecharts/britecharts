/**
 * Requires jsdoc and jsdoc-to-markdown
 * Reference: https://gist.github.com/slorber/0bf8c8c8001505f0f99a062ac55bf442
 */

/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { execSync } = require('child_process');
const jsdoc2md = require('jsdoc-to-markdown');
const sidebars = require('../sidebars');

// Custom package names that don't match the base pattern `utils => Utils`
const packageNameOverrides = [
    // { id: 'api', name: 'API' },
];

/**
 * Runs through packages folders looking for JSDoc and generates markdown docs
 */
function generateDocs() {
    console.log('Generating package docs');
    // Use glob to get all js/ts files
    const pathPattern = path.join(
        __dirname,
        '../../core/src/**/*.[jt]s?(x)'
        // '../packages/**/src/**/*.[jt]s?(x)'
    );
    const filePaths = glob.sync(pathPattern, {
        ignore: [
            '**/node_modules/**',
            '**/*.spec.js',
            '**/*.d.ts',
            '**/index.js',
            '**/*.stories.js',
            '**/*DataBuilder.js',
            '**/*Data.js',
        ],
    });

    // Get the sidebar object
    const sidebarPackages = [];
    let processingPackageName;

    console.log('Processing these files: ', filePaths);

    // grab all js files
    filePaths.forEach((filePath) => {
        console.log('filePath', path.join(__dirname, '../jsdoc.conf.json'));
        console.log('filePath', path.join(__dirname, './template.hbs'));
        // Generate markdown from JSDoc comments
        const markdown = jsdoc2md.renderSync({
            files: filePath,
            configure: path.join(__dirname, '../jsdoc.conf.json'),
            // plugin: path.join(__dirname, './template.hbs'),
            'heading-depth': 1,
        });

        console.log('markdown', markdown);

        // if there's markdown, do stuff
        if (markdown && markdown.length > 0) {
            // get the package ID from the file path
            const chartId = filePath.match(
                /\/packages\/([\s\S]*?)\/src\/charts\//i
            )[1];

            // check against the title overrides array
            let chartName;
            // if override, use the title, else title = capitalize chartId
            if (packageNameOverrides.find((item) => item.id === chartId)) {
                chartName = packageNameOverrides.find(
                    (item) => item.id === chartId
                ).name;
            } else {
                chartName = chartId.charAt(0).toUpperCase() + chartId.slice(1);
            }

            if (chartName !== processingPackageName) {
                processingPackageName = chartName;
                console.log(`   Processing the ${chartName} package`);
            }

            // get the sub-folder structure relative to /src/
            let subPath = path.dirname(filePath).match(/\/src\/([\s\S]*?)$/i)
                ? `${path.dirname(filePath).match(/\/src\/([\s\S]*?)$/i)[1]}`
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

            const writeDir = path.join(
                __dirname,
                `../docs/charts/${chartId}/api-reference${
                    subPath ? `/${subPath}` : ''
                }`
            );

            // check if the directory exists
            if (!fs.existsSync(writeDir)) {
                // create the directory
                fs.mkdirSync(writeDir, { recursive: true });
            }

            // write the markdown file
            fs.writeFileSync(`${writeDir}/${fileName}.md`, markdown);

            // update sidebar object
            // define the relative path for the sidebar
            const sidebarPath = `charts/${chartId}/api-reference${
                subPath ? `/${subPath}` : ''
            }/${fileName}`;

            /**
             * Searches the parent array for the key and adds it if it's not found
             * @param {Array} parent The parent array to search
             * @param {String} key The key to search for and add
             */
            const addOnePathLevel = (parent, key) => {
                if (
                    !parent.find((item) => {
                        return Object.keys(item)[0] === key;
                    })
                ) {
                    // add the first element to the parent
                    parent.push({ [`${key}`]: [] });
                }
            };

            // add package path
            addOnePathLevel(sidebarPackages, chartName);

            // add API Reference path
            addOnePathLevel(
                sidebarPackages.find((item) => {
                    return Object.keys(item)[0] === chartName;
                })[chartName],
                'API Reference'
            );

            // Get the API Reference item
            let packageApiReferenceItem = sidebarPackages
                .find((item) => {
                    return Object.keys(item)[0] === chartName;
                })
                [chartName].find((item) => {
                    return Object.keys(item)[0] === 'API Reference';
                })['API Reference'];

            // If there's a subpath, recursively set the nested structure
            if (subPathArray.length > 0) {
                // make array of names
                const pathNameArray = subPathArray.map((item) => {
                    return item
                        .split('-')
                        .map((word) => {
                            return word.charAt(0).toUpperCase() + word.slice(1);
                        })
                        .join(' ');
                });

                // TODO: Make nested items (index > 0) recursive

                const addPathLevels = (parent, index) => {
                    // If the first element in the path array does not exist
                    if (
                        !parent.find((item) => {
                            return (
                                typeof item === 'object' &&
                                item[pathNameArray[index]]
                            );
                        })
                    ) {
                        // add the first element to the parent
                        parent.push({
                            [pathNameArray[index]]: [],
                        });
                    }
                    // Find the index of the first path element
                    const subItemIndex = parent.findIndex((item) => {
                        return (
                            typeof item === 'object' &&
                            item[pathNameArray[index]]
                        );
                    });

                    // add the sidebarPath to the last path element
                    if (pathNameArray.length - 1 === index) {
                        // eslint-disable-next-line no-param-reassign
                        parent[subItemIndex][pathNameArray[index]] = [
                            // filter duplicates
                            ...new Set([
                                ...parent[subItemIndex][pathNameArray[index]],
                                sidebarPath,
                            ]),
                        ];
                    }
                    if (pathNameArray.length - 2 >= index) {
                        addPathLevels(
                            parent[subItemIndex][pathNameArray[index]],
                            index + 1
                        );
                    }
                };

                // recursively add path levels
                addPathLevels(packageApiReferenceItem, 0);
            } else {
                // Push the sidebarPath on to the 'API Reference' array
                packageApiReferenceItem = [
                    // Preserve existing items, but filter duplicates
                    ...new Set([...packageApiReferenceItem, sidebarPath]),
                ];
            }
        }
    });
    // Let the user know what step we're on
    console.log('\u001B[32m', '✔️ Package docs generated', '\u001B[0m');

    console.log('sidebarPackages', sidebarPackages);

    // set packages to the updated sidebarPackages
    sidebars.primarySidebar.CoreCharts = sidebarPackages;

    // Let the user know what step we're on
    console.log('Updating sidebars.js');

    // write sidebar file
    fs.writeFileSync(
        path.join(__dirname, '../sidebars.js'),
        `module.exports = ${JSON.stringify(sidebars, null, '  ')}`,
        'utf8'
    );

    // run prettier on the output json
    // execSync(`eslint --fix ${path.join(__dirname, '../docs/sidebars.js')}`);

    // Let the user know what step we're on
    console.log('\u001B[32m', '✔️ sidebars.js updated', '\u001B[0m');
}

generateDocs();
process.exit(0);
