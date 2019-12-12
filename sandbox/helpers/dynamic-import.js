import path from 'path';

import constants from '../constants/constants';
import domHelpers from './domHelpers';

const defaultConfig = constants.chartConfigs;
const { chartDependencies } = constants;
const charts = Object.keys(defaultConfig);
let errors = [];

const req = require.context(
    'babel-loader!./../../src/charts',
    true,
    /^\.\//
);



/**
 * Safe load dependency. If there is an error, it loads the error to be displayed in the notification bar
 * @param  {file name} name     name of fiel at src/charts. probably could refactor to take full path
 */
function _safeLoadDependency(name) {
    try {
        const moduleName = './' + name + '.js';
        const moduleFunction = req(moduleName);
        console.log({moduleName});
        console.log({moduleFunction});

        // console.log('path', path.join('../../src/charts', name));
        // const fn = require('../../src/charts/' + name + '.js');
        // const fn = req(name + '.js');
        // const fn = req(moduleName);
        // window[name.split('/').pop()] = module;
        // window[name.split('/').pop()] = require(path.basename('../../src/charts', name));

        return {
            chartName: name.split('/').pop(),
            fn: moduleFunction
        };
    } catch (e) {
        console.log('catch', e)
        errors.push({
            error: e,
            filePath: name
        });
    }
}

/**
 * Reads all of the dependencies [charts etc] from the constants file and safe loads them
 * onto the window object.
 */
export default function getCharts() {
    const allModules = [...new Set([
        ...charts,
        ...chartDependencies,
    ])];
    // allModules = ["bar", "brush", "donut", "grouped-bar", "legend", "line", "sparkline", "step", "stacked-area", "scatter-plot", "helpers/color", "tooltip", "mini-tooltip"]
    const modules = allModules.map(_safeLoadDependency);

    if (errors.length) {
        domHelpers.showErrors(errors);
    }

    return {
        modules,
        errors
    };
}
