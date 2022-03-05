/* eslint-disable new-cap */
import 'colors';
import fsp from 'fs-promise';
import { exec } from '../exec';
import { srcRoot, esRoot } from '../paths';
import babelConfig from '../babel.config';
import buildBabel from '../buildBabel';

const BuildES = function () {
    console.log('Building: '.cyan + 'es module'.green);

    return exec(`rimraf ${esRoot}`)
        .then(() => fsp.mkdirs(esRoot))
        .then(() => buildBabel(srcRoot, esRoot, babelConfig('es')))
        .then(() => console.log('Built: '.cyan + 'es module'.green))
        .catch((e) => console.error('Failed: '.red + 'es module: '.yellow + e));
};

BuildES();
