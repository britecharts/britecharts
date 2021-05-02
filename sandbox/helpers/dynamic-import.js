import constants from '../constants/constants';
import domHelpers from './domHelpers';

const defaultConfig = constants.chartConfigs;
const { chartDependencies } = constants;
const charts = Object.keys(defaultConfig);
let errors = [];

const req = require.context('babel-loader!./../../src/charts', true, /^\.\//);

/**
 * Safe load dependency. If there is an error, it loads the error to be displayed in the notification bar
 * @param  {file name} name     name of fiel at src/charts. probably could refactor to take full path
 */
function _safeLoadDependency(name) {
    try {
        let moduleName = './' + name + '/' + name + '.js';
        if (name.indexOf('/') > 0) {
            moduleName = './' + name + '.js';
        }
        const moduleFunction = req(moduleName);

        return {
            chartName: name.split('/').pop(),
            fn: moduleFunction,
        };
    } catch (e) {
        errors.push({
            error: e,
            filePath: name,
        });
    }
}

/**
 * Reads all of the dependencies [charts etc] from the constants file and safe loads them
 * onto the window object.
 */
export default function getCharts() {
    const allModules = [...new Set([...charts, ...chartDependencies])];
    const modules = allModules.map(_safeLoadDependency);

    if (errors.length) {
        domHelpers.showErrors(errors);
    }

    return {
        modules,
        errors,
    };
}
