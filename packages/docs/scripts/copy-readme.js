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

// The all-contributors bot writes each contribution badge as a link to
// `#<type>-<user>`, a fragment nothing on the page defines (it is only
// meaningful on the bot's own emoji key page), and it regenerates the table
// whenever a contributor is added. So the README keeps the bot's format and
// the docs copy points those links at the emoji key instead, where
// Docusaurus's broken-anchor check can follow them.
function pointContributionBadgesAtTheEmojiKey(content) {
    return content.replace(
        /href="#[a-z]+-[A-Za-z0-9_-]+"/g,
        'href="https://allcontributors.org/docs/en/emoji-key"'
    );
}

async function copyMainReadme() {
    const readmeFile = pointContributionBadgesAtTheEmojiKey(
        String(await readFile(mainReadmePath))
    );
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
