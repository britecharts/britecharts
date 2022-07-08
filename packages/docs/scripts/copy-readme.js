const { readFile, writeFile } = require('fs/promises');

const mainReadmePath = '../../README.md';
const newMainReadmePath = './docs/Britecharts.md';

const coreReadmePath = './../core/README.md';
const docsReadmePath = './README.md';
const wrappersReadmePath = './../wrappers/README.md';
const reactReadmePath = './../react/README.md';
const packageReadmePath = './docs/packages/';

const packages = [
    {
        name: 'core',
        path: coreReadmePath,
    },
    { name: 'docs', path: docsReadmePath },
    { name: 'wrappers', path: wrappersReadmePath },
    { name: 'react', path: reactReadmePath },
];

function updateFrontMatterWithPosition(content, position) {
    return `---\n sidebar_position: ${position} \n---\n ${content}`;
}

function log(msg) {
    console.log('\u001B[32m', msg, '\u001B[0m');
}

async function copyMainReadme() {
    const readmeFile = await readFile(mainReadmePath);
    const updatedContent = updateFrontMatterWithPosition(readmeFile, 1);

    await writeFile(newMainReadmePath, updatedContent);
    log('✔️  main Readme copied over');
}

function copyPackageReadmes() {
    packages.forEach(async ({ path, name }, idx) => {
        const packageReadmeFile = await readFile(path);
        const updatedPackageReadmeContent = updateFrontMatterWithPosition(
            packageReadmeFile,
            idx + 1
        );
        await writeFile(
            packageReadmePath + `${name}-readme.md`,
            updatedPackageReadmeContent
        );
        log(`✔️  ${name} Readme copied over`);
    });
}

async function main() {
    copyMainReadme();
    copyPackageReadmes();
}

main().catch(console.error);
