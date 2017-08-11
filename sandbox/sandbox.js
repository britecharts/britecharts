const d3 = require('d3');
const path = require('path');

const constants = require('./constants');
const defaultData = require('./data');
const storage = require('./localStorageManager');
const domHelpers = require('./domHelpers');

const {
    dataSelectorClass,
    chartSelectorClass,
    // chart containers
    britechartContainerClass,
    britechartPlaceHolder,
    // data input
    submitDataButtonClass,
    resetDataButtonClass,
    dataInputSizeToggleClass,
    // config inoput
    submitConfigButtonClass,
    resetConfigButtonClass
} = constants.domClassNames;
const {
    rootSaveKey,
    savedDataKey,
    // savedDataTypeKey,
    savedChartTypeKey,
    savedConfigKey
} = constants.saveKeys;
const defaultConfig = constants.chartConfigs;
const {
    dataInputId,
    chartInputId
} = constants.domIdNames;

const {
    prettifyInitString,
    prettifyJson
} = require('./utils');

let {createEditors} = require('./editors');
let {
    dataEditor,
    configEditor
} = createEditors({dataInputId, chartInputId});

const charts = Object.keys(defaultConfig);

let state = {
    isDataInputExpanded: false
}
const errors = [];

require('./styles.scss');

// move/remove
const dataEditorWidth = '300px';
window.d3 = d3;


function main() {
    loadDependencies();
    setInitialData();
    domHelpers.initDomElements();

    setDataInInputField();
    setConfigInInputField();
    setChartSelectorType();
    setNewChart();
    setHandlers();

}
main();
function setInitialData() {
    // always set type first
    getCurrentType();
    getCurrentData();
    getCurrentConfig();
}

function setHandlers() {
    d3.select(`.${chartSelectorClass}`).on('change', _handleChartSelectorChange);
    d3.select(`.${dataSelectorClass}`).on('change', _handleDataSelectorChange);

    d3.select(`.${submitDataButtonClass}`).on('click', _handleDataUpdate);
    d3.select(`.${resetDataButtonClass}`).on('click', _handleDataReset);
    d3.select(`.${dataInputSizeToggleClass}`).on('click', _handleDataSizeToggle);

    d3.select(`.${submitConfigButtonClass}`).on('click', _handleConfigUpdate);
    d3.select(`.${resetConfigButtonClass}`).on('click', _handleConfigReset);
}
function _handleDataSelectorChange () {
    let chartType = getCurrentType();
    let dataType = d3.select(`.${dataSelectorClass}`).property('value');
    let currentData = defaultData[chartType][dataType];

    storage.setDataByKey(savedDataKey, currentData);
    updateAllComponents()
}

function _handleDataSizeToggle() {
    let {isDataInputExpanded} = state;
    let size = isDataInputExpanded ? dataEditorWidth : '100%';

    state.isDataInputExpanded = !isDataInputExpanded;
    d3.select(`#${dataInputId}`).style('width', size);
}

function getCurrentData() {
    let currentData = storage.getDataByKey(savedDataKey);

    if (!currentData) {
        let chartType = getCurrentType();
        let {initialDataType} = defaultConfig[chartType];

        currentData = defaultData[chartType][initialDataType];

        storage.setDataByKey(savedDataKey, currentData);
    }

    return currentData;
}

function getCurrentConfig() {
    let initString = storage.getDataByKey(savedConfigKey);

    if (!initString) {

        let chartType = getCurrentType();
        let {chartConfig} = defaultConfig[chartType];

        initString = formatParamsIntoChartInitString(chartConfig);
        storage.setDataByKey(savedConfigKey, initString);
    }

    return initString;
}

function getCurrentType() {
    let currentType = storage.getDataByKey(savedChartTypeKey);

    if (!currentType) {
        currentType = charts[0]
        storage.setDataByKey(savedChartTypeKey, currentType);
    }

    return currentType;
}

function _handleDataReset() {
    storage.removeDataByKey(savedDataKey);

    let data = getCurrentData();

    dataEditor.setValue(prettifyJson(data));
}

function _handleDataUpdate() {
    const rawData = dataEditor.getValue();

    let freshData = null;
    try {
        freshData = eval(rawData);
    } catch(e) {
        errors.push(new Error('Could not parse the data from the input field', rawData));
    }

    storage.setDataByKey(savedDataKey, freshData);

    if (freshData) {
        setNewChart();
    }
}

function _handleConfigUpdate() {
    const rawData = configEditor.getValue();

    storage.setDataByKey(savedConfigKey, rawData);
    setNewChart();
}
function _handleConfigReset() {
    storage.removeDataByKey(savedConfigKey);
    let initString = getCurrentConfig();
    configEditor.setValue(prettifyInitString(initString));
}

function setDataInInputField() {
    let data = getCurrentData();

    dataEditor.setValue(prettifyJson(data));
}

function setConfigInInputField() {
    let initString = getCurrentConfig();

    configEditor.setValue(prettifyInitString(initString));
}

function setChartSelectorType() {
    let chartType = getCurrentType();

    d3.select(`.${chartSelectorClass}`).property('value', chartType);
}

function _safeLoadDependency(name) {
    try {
        window[name] = require(`../src/charts/${name}`);
    } catch(e) {
        let error = {
            error: e,
            filePath: name
        }
        errors.push(error);
    }
}

function loadDependencies() {
    charts.forEach(_safeLoadDependency);

    if (errors.length) {
        domHelpers.showErrors(errors);
    }
}

function updateAllComponents() {
    setNewChart()
    setDataInInputField();
    setConfigInInputField();
    setNewDataTypes();
}

function setNewDataTypes() {
    let chartType = getCurrentType();
    let dataTypes = Object.keys(defaultData[chartType]);

    let dataSelector = d3.select(`.${dataSelectorClass}`)
        .selectAll('option')
        .data(dataTypes);

    dataSelector.enter().append('option')
        .attr('value', (d) => d)
        .merge(dataSelector)
            .text((d) => d);

    dataSelector.exit().remove();
}

function _handleChartSelectorChange() {
    storage.clear()
    let chartType = d3.select(`.${chartSelectorClass}`).property('value');
    storage.setDataByKey(savedChartTypeKey, chartType);
    updateAllComponents();
}

function _removeBriteChartContainer() {
    d3.select(`.${britechartContainerClass}`).remove();
}

function _addBritechartContainer() {
    d3.select(`.${britechartPlaceHolder}`)
        .append('div')
        .classed(britechartContainerClass, true);
}

function formatParamsIntoChartInitString(chartConfig=getCurentConfig()) {
    return Object.keys(chartConfig).reduce((m, i) => {
        let value = chartConfig[i];

        if (typeof value === 'object') {
            value = prettifyJson(value);
        }
        return m.concat(`.${i}(${value})`);
    }, 'chart');
}

function setNewChart(chartData=getCurrentData(), chartInitString=getCurrentConfig(), chartType=getCurrentType()) {
    _removeBriteChartContainer();
    _addBritechartContainer();

    console.log(storage.getData());
    let chart = window[chartType]();

    try {
        eval(chartInitString);
    } catch (e) {
        console.error(e);
    }

    d3.select(`.${britechartContainerClass}`).datum(chartData).call(chart);
}




