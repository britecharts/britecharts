const d3 = require('d3');
const path = require('path');
const chartSelectorContainerClass = 'chart-selector-container';

const defaultData = require('./data');
const storage = require('./localStorageManager');

const constants = require('./constants');
const {
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
   resetConfigButtonClass,
   configInputSizeToggleClass,
} = constants.domClassNames;
const {
    rootSaveKey,
    savedChartTypeKey,
    savedDataKey,
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

let createEditors = require('./editors');
let {
    dataEditor,
    configEditor
} = createEditors({dataInputId, chartInputId});

const dataEditorWidth = '300px';
// const configEditorWidth = '300px';
// const dataEditorHeight = '200px';


require('./styles.scss');
// require('./lib/aceEditor-1.2.8')
require('./dataInputField')

// remove
window.d3 = d3;


const charts = Object.keys(defaultConfig);
const errors = []


// window.dataEditor = ace.edit(dataInputId);
// dataEditor.setTheme('ace/theme/monokai');
// dataEditor.getSession().setMode('ace/mode/javascript');
// // remove unwanted warning
// dataEditor.$blockScrolling = Infinity;


// window.configEditor = ace.edit(chartInputId);
// configEditor.setTheme('ace/theme/monokai');
// configEditor.renderer.setShowGutter(false);
// configEditor.getSession().setMode('ace/mode/javascript');
// // remove unwanted warning
// configEditor.$blockScrolling = Infinity;

let state = {
    isDataInputExpanded: false
}

loadDependencies();
createSelectChartElement();
setDataInInputField();
setConfigInInputField();
setChartSelectorType()
// set handle chart change
setInitialData();
setNewChart();
setHandlers();

function setInitialData() {
    getCurrentData();
    getCurrentConfig();
    getCurrentType();
}



function setHandlers() {
    d3.select(`.${submitDataButtonClass}`).on('click', _handleDataUpdate);
    d3.select(`.${resetDataButtonClass}`).on('click', _handleDataReset);
    d3.select(`.${dataInputSizeToggleClass}`).on('click', _handleDataSizeToggle);

    d3.select(`.${submitConfigButtonClass}`).on('click', _handleConfigUpdate);
    d3.select(`.${resetConfigButtonClass}`).on('click', _handleConfigReset);
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
        let chartType = d3.select(`.${chartSelectorClass}`).property('value');
        let {initialDataType} = defaultConfig[chartType];

        currentData = defaultData[chartType][initialDataType];

        storage.setDataByKey(savedDataKey, currentData);
    }

    return currentData;
}

function getCurrentConfig() {
    let initString = storage.getDataByKey(savedConfigKey);

    if (!initString) {

        let chartType = d3.select(`.${chartSelectorClass}`).property('value');
        let {chartConfig} = defaultConfig[chartType];

        initString = formatParamsIntoChartInitString(chartConfig);
        storage.setDataByKey(savedConfigKey, initString);
    }

    return initString;
}

function getCurrentType() {
    let currentType = storage.getDataByKey(savedChartTypeKey);

    if (!currentType) {
        currentType = d3.select(`.${chartSelectorClass}`).property('value');
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
        errors.push(e);
    }
}

function loadDependencies() {
    charts.forEach(_safeLoadDependency);

    if (errors.length) {
        d3.select('body').style('background','red');
    }
}

function createSelectChartElement() {
    let select = d3.select(`.${chartSelectorContainerClass}`)
        .append('select')
        .classed(chartSelectorClass, true)
        .on('change', _handleChartSelectorChange)

    let options = select.selectAll('option').data(charts)

    options.enter().append('option')
        .attr('value', (d) => d)
        .text((d) => d);
}

function _handleChartSelectorChange() {
    storage.clear()
    setNewChart();
    setDataInInputField();
    setConfigInInputField();
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
    return Object.keys(chartConfig).reduce((m, i) => m.concat(`.${i}(${chartConfig[i]})`), 'chart');
}

function setNewChart(chartData=getCurrentData(), chartInitString=getCurrentConfig(), chartType=getCurrentType()) {
    _removeBriteChartContainer();
    _addBritechartContainer();

    console.log(storage.getData());
    let chart = window[chartType]();

    try {
        eval(chartInitString);
    } catch (e) {

        console.log(e);
    }

    d3.select(`.${britechartContainerClass}`).datum(chartData).call(chart);
}




