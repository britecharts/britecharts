const { readFile, writeFile } = require('fs/promises');

const readmePath = '../../README.md';
const newReadmePath = './docs/Britecharts.md';

function updateFrontMatterWithPosition(content, position) {
    return `---\n sidebar_position: ${position} \n---\n ${content}`;
}

async function main() {
    const readmeFile = await readFile(readmePath);
    const updatedContent = updateFrontMatterWithPosition(readmeFile, 1);

    await writeFile(newReadmePath, updatedContent);

    console.log('\u001B[32m', '✔️  Readme copied over', '\u001B[0m');
}

main().catch(console.error);
