import * as d3 from 'd3';

import constants from './constants/constants';
import defaultData from './constants/data';
import storage from './helpers/localStorageHelpers';
import domHelpers from './helpers/domHelpers';
import editorHelpers from './helpers/editorHelpers';
import getCharts from './helpers/dynamic-import';
import {
    evalDataString,
    prettifyInitString,
    prettifyJson,
} from './helpers/utils';

require('../src/styles/britecharts.scss');

const {
    dataSelectorClass,
    chartSelectorClass,

    // chart containers
    britechartContainerClass,

    // data input
    dataSubmitButtonClass,
    dataResetButtonClass,

    // config input
    configSubmitButtonClass,
    configResetButtonClass,
    configAddTooltipClass,
    configAddMiniTooltipClass,

    // tooltip
    tooltipMetaGroup,
    tooltipHoverGroup,
} = constants.domClassNames;
const { savedDataKey, savedChartTypeKey, savedConfigKey } = constants.saveKeys;
const defaultConfig = constants.chartConfigs;
const { chartDependencies } = constants;
const { tooltipConfigs } = constants;
const { dataInputId, chartInputId } = constants.domIdNames;

const { dataEditor, configEditor } = editorHelpers({
    dataInputId,
    chartInputId,
});

const charts = Object.keys(defaultConfig);
const tooltipTypes = Object.keys(tooltipConfigs).reduce(
    (m, i) => ({ ...m, [i]: i }),
    {}
);

const state = {
    isDataInputExpanded: false,
};
const errors = [];
const dataEditorWidth = '400px';

import './styles/styles.scss';

window.d3 = d3;

const getDependencies = () => {
    const { modules } = getCharts();

    modules.forEach(({ chartName, fn }) => (window[chartName] = fn.default));
};

(async () => {
    // start the sandbox
    return main();
})();

/**
 * Main function to run the sandbox
 */
async function main() {
    getDependencies();
    setInitialData();
    domHelpers.initDomElements();

    setDataInInputField();
    setConfigInInputField();
    setChartSelectorType();
    setNewChart();
    setHandlers();
}

// Ensures the data is properly set, this function should be run on or near load of the page
function setInitialData() {
    // always set type first
    getCurrentType();
    getCurrentData();
    getCurrentConfig();
}

/**
 * Sets handlers on all of our input fields on the sandbox dom
 */
function setHandlers() {
    d3.select(`.${chartSelectorClass}`).on(
        'change',
        _handleChartSelectorChange
    );
    d3.select(`.${dataSelectorClass}`).on('change', _handleDataSelectorChange);

    d3.select(`.${dataSubmitButtonClass}`).on('click', _handleDataUpdate);
    d3.select(`.${dataResetButtonClass}`).on('click', _handleDataReset);

    d3.select(`.${configSubmitButtonClass}`).on('click', _handleConfigUpdate);
    d3.select(`.${configResetButtonClass}`).on('click', _handleConfigReset);

    d3.select(`.${configAddTooltipClass}`).on(
        'click',
        _handleAddTooltip.bind(null, tooltipTypes.basic)
    );
    d3.select(`.${configAddMiniTooltipClass}`).on(
        'click',
        _handleAddTooltip.bind(null, tooltipTypes.mini)
    );
}

/**
 * Gets the current data from the store and sets the data input field with it
 */
function setDataInInputField() {
    let data = getCurrentData();

    dataEditor.setValue(prettifyJson(data));
}

/**
 * Gets the current chart configuration from the store and sets the config input field with it
 */
function setConfigInInputField() {
    let initString = getCurrentConfig();

    configEditor.setValue(prettifyInitString(initString));
}

/**
 * Gets the current chart type from the store and sets the chart selector value to reflect
 */
function setChartSelectorType() {
    let chartType = getCurrentType();

    d3.select(`.${chartSelectorClass}`).property('value', chartType);
}

/**
 * Removes the chart and adds a new one. It updates all data and sets the new chart with it.
 * NOTE: chart, tip and miniTip are available variables in teh chart config window
 * TODO: Write a message around the chart config text box noting that chart, tip and miniTip are available
 * @param {Object} chartData       Chart data
 * @param {string} chartInitString Chart init string, formatted configuration for the chart to be eval'd
 * @param {string} chartType       type of chart
 */
function setNewChart(
    chartData = getCurrentData(),
    chartInitString = getCurrentConfig(),
    chartType = getCurrentType()
) {
    domHelpers.removeBriteChartContainer();
    domHelpers.addBritechartContainer();

    let chart = window[chartType]();
    let tip = window['tooltip']();
    let miniTip = window['mini-tooltip']();

    // TODO investigate why we need this for the tooltip to work
    if (chartType === 'stacked-area') {
        tip.topicLabel('values');
    }

    try {
        eval(chartInitString);
    } catch (e) {
        console.error(e);
    }

    d3.select(`.${britechartContainerClass}`).datum(chartData).call(chart);
    d3.select(
        `.${britechartContainerClass} ${constants.chartConfigs[chartType].tooltipSelector}`
    )
        .datum([])
        .call(tip);
    d3.select(`.${tooltipMetaGroup}`).datum([]).call(miniTip);
}

/**
 * Reads from the constants file to fill the data type selelctor with the data types of that chart
 */
function setNewDataTypes() {
    let chartType = getCurrentType();
    let dataTypes = Object.keys(defaultData[chartType]);

    let dataSelector = d3
        .select(`.${dataSelectorClass}`)
        .selectAll('option')
        .data(dataTypes);

    dataSelector
        .enter()
        .append('option')
        .merge(dataSelector)
        .attr('value', (d) => d)
        .text((d) => d);

    dataSelector.exit().remove();
}

/**
 * Gets the current data either from the store or from the data file.
 * If no data is found on the store, one is set from the data file.
 * @return {Object}     Data object [data is parsed before it is set]
 */
function getCurrentData() {
    let currentData = storage.getDataByKey(savedDataKey);

    if (!currentData) {
        let chartType = getCurrentType();
        let { initialDataType } = defaultConfig[chartType];

        currentData = defaultData[chartType][initialDataType];

        storage.setDataByKey(savedDataKey, currentData);
    }

    return currentData;
}

/**
 * Gets teh current chart configuration either from the store or from the constants file.
 * If no configuration is found on the store, one is set from the constants.
 * @return {String}     config string
 */
function getCurrentConfig() {
    let initString = storage.getDataByKey(savedConfigKey);

    if (!initString) {
        let chartType = getCurrentType();
        let { chartConfig } = defaultConfig[chartType];

        initString = formatParamsIntoChartInitString(chartConfig);
        storage.setDataByKey(savedConfigKey, initString);
    }

    return initString;
}

/**
 * Gets the current chart type either from the store or from the constants file
 * If no chart type is found in the store, one is set from the constants.
 * @return {String}     chart type
 */
function getCurrentType() {
    let currentType = storage.getDataByKey(savedChartTypeKey);

    if (!currentType) {
        currentType = charts[0];
        storage.setDataByKey(savedChartTypeKey, currentType);
    }

    return currentType;
}

/**
 * Adds tooltip code to the editor
 * @param  {string} tooltipType Constant from constant file
 */
function _handleAddTooltip(tooltipType) {
    let initString = getCurrentConfig();
    let tooltipInitString = tooltipConfigs[tooltipType].initString;

    initString = initString.concat(tooltipInitString);
    configEditor.setValue(prettifyInitString(initString));
    setNewChart();
}

/**
 * Handles data selection change, updates the data on the store and then updates all components
 */
function _handleDataSelectorChange() {
    let chartType = getCurrentType();
    let dataType = d3.select(`.${dataSelectorClass}`).property('value');
    let currentData = defaultData[chartType][dataType];

    storage.setDataByKey(savedDataKey, currentData);
    updateAllComponents();
}

/**
 * Updates the data for the chart on the store, then sets a new chart so the new data is displayed
 * @return {[type]} [description]
 */
function _handleDataUpdate() {
    const rawData = dataEditor.getValue();
    let freshData = null;

    try {
        freshData = evalDataString(rawData);
    } catch (e) {
        errors.push(
            new Error('Could not parse the data from the input field', rawData)
        );
    }

    storage.setDataByKey(savedDataKey, freshData);

    if (freshData) {
        setNewChart();
    }
}

/**
 * Resets the data to its default state
 */
function _handleDataReset() {
    storage.removeDataByKey(savedDataKey);

    let data = getCurrentData();

    dataEditor.setValue(prettifyJson(data));
}

/**
 * Updates the configuration for the chart on the store, then sets a new chart so the new config is displayed
 */
function _handleConfigUpdate() {
    const rawData = configEditor.getValue();

    storage.setDataByKey(savedConfigKey, rawData);
    setNewChart();
}

/**
 * Resets the chart config to its default state
 */
function _handleConfigReset() {
    storage.removeDataByKey(savedConfigKey);

    let initString = getCurrentConfig();

    configEditor.setValue(prettifyInitString(initString));
}

/**
 * Updates the chart type when the chart selector is changed
 */
function _handleChartSelectorChange() {
    storage.clear();

    let chartType = d3.select(`.${chartSelectorClass}`).property('value');

    storage.setDataByKey(savedChartTypeKey, chartType);
    updateAllComponents();
}

/**
 * Updates the chart and all of the input fields and selectors to show the correct info
 * @return {[type]} [description]
 */
function updateAllComponents() {
    setNewChart();
    setDataInInputField();
    setConfigInInputField();
    setNewDataTypes();
}

/**
 * Obtains chart config [a js object] and formats it into a pretty display string
 * TODO: theres a bug here where on refresh,  new line is added between each line
 * @param  {Object} chartConfig     chart configuration object
 * @return {string}                 Prettified string that when eval'd will initiailize the chart
 */
function formatParamsIntoChartInitString(chartConfig = getCurentConfig()) {
    const baseChartName = 'chart';

    return Object.keys(chartConfig).reduce((memo, item) => {
        let value = chartConfig[item];

        if (typeof value === 'object') {
            value = prettifyJson(value);
        }

        return memo.concat(`.${item}(${value})`);
    }, baseChartName);
}
