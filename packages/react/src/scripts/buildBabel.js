/* eslint-disable import/no-extraneous-dependencies */
import { transform } from '@babel/core';
import fs from 'fs';
import path from 'path';
import outputFileSync from 'output-file-sync';

const buildContent = function (
    content,
    filename,
    destination,
    babelOptions = {}
) {
    const newOptions = {
        ...babelOptions,
        filename,
    };

    try {
        const result = transform(content, newOptions);

        outputFileSync(destination, result.code, { encoding: 'utf8' });
    } catch (e) {
        console.log('Horror!', e);
        console.error(
            `${e.message} (${filename}:${e.loc.line}:${e.loc.column})`
        );
    }
};

const buildFile = function (filename, destination, babelOptions = {}) {
    const content = fs.readFileSync(filename, { encoding: 'utf8' });

    // We only have .js files that we need to build
    if (path.extname(filename) === '.js') {
        const outputPath = path.join(destination, path.basename(filename));
        // console.log('%s => %s', filename, outputPath);

        buildContent(content, filename, outputPath, babelOptions);
    }
};

export default function buildBabel(
    folderPath,
    destination,
    babelOptions = {},
    firstFolder = true
) {
    const stats = fs.statSync(folderPath);

    if (stats.isFile()) {
        buildFile(folderPath, destination, babelOptions);
    } else if (stats.isDirectory()) {
        const outputPath = firstFolder
            ? destination
            : path.join(destination, path.basename(folderPath));
        const files = fs
            .readdirSync(folderPath)
            .map((file) => path.join(folderPath, file));

        files.forEach((filename) =>
            buildBabel(filename, outputPath, babelOptions, false)
        );
    }
}
