const d3 = require('d3');
const path = require('path');
const chartSelectorContainerClass = '.chartSelectorContainer';

const defaults = require('./defaults');
const initialData = require('./data');

const chartSelectorClass = 'chartSelector';
const britechartContainerClass = 'britechartContainer';
const britechartPlaceHolder = 'chartContainerPlaceHolder';
const submitDataButtonClass = 'submitDataButton';
const resetDataButtonClass = 'resetDataButton';
const dataInputSizeToggleClass = 'toggleDataInputSize';

const dataInputId = 'dataInput';
const chartInputId = 'chartConfigInput';


const savedDataKey = 'SAVED_CHART_DATA';
const savedConfigKey = 'SAVED_CHART_CONFIG';

const dataEditorWidth = '300px';
const dataEditorHeight = '200px';


require('./styles.scss');
// require('./lib/aceEditor-1.2.8')
require('./dataInputField')

// remove
window.d3 = d3;

const charts = [
    'bar',
    'brush',
    // 'donut',
    // 'line',
    // 'sparkline',
    // 'stacked-area',
    // 'step'
];
const errors = []


window.dataEditor = ace.edit(dataInputId);
dataEditor.setTheme('ace/theme/monokai');
dataEditor.getSession().setMode('ace/mode/javascript');
// remove unwanted warning
dataEditor.$blockScrolling = Infinity;


window.chartConfigEditor = ace.edit(chartInputId);
chartConfigEditor.setTheme('ace/theme/monokai');
chartConfigEditor.renderer.setShowGutter(false);
chartConfigEditor.getSession().setMode('ace/mode/javascript');
// remove unwanted warning
chartConfigEditor.$blockScrolling = Infinity;


let dataSizeExpanded = false;

loadDependencies();
createSelectChartElement();
setDataInInputField();
setNewChart();
setHandlers();

function setHandlers() {
    d3.select(`.${submitDataButtonClass}`).on('click', _handleDataUpdate);
    d3.select(`.${resetDataButtonClass}`).on('click', _handleDataReset);
    d3.select(`.${dataInputSizeToggleClass}`).on('click', _handleDataSizeToggle);
}


function _handleDataSizeToggle() {
    let size = dataSizeExpanded ? dataEditorWidth : '100%';
    dataSizeExpanded =! dataSizeExpanded;
    d3.select(`#${dataInputId}`).style('width', size);
}

function getInitialData() {
    let _data = getDataFromLocalStorage();

    if (!_data) {
        let chartType = d3.select(`.${chartSelectorClass}`).property('value');

        let {initialDataType} = defaults[chartType];
        _data = initialData[chartType][initialDataType];

        setDataInLocalStorage(_data);
    }

    return _data;
}

function _handleDataReset() {
    localStorage.removeItem(savedDataKey);

    let data = getInitialData();

    dataEditor.setValue(prettify(data));
}

function _handleDataUpdate() {
    const rawData = dataEditor.getValue();
    let data = null;
    try {
        data = eval(rawData);
    } catch(e) {
        errors.push(new Error('Could not parse the data from the input field', rawData));
    }

    setDataInLocalStorage(data);

    if (data) {
        setNewChart(data);
    }
}

function prettify(data) {
    if (typeof data === 'string') {
        data = JSON.parse(data);
    }

    return JSON.stringify(data, null, '\t');
}

function setDataInInputField() {
    let data = getInitialData();

    dataEditor.setValue(prettify(data));
}


function safeLoadDependency(name) {
    try {
        window[name] = require(`../src/charts/${name}`);
    } catch(e) {
        errors.push(e);
    }
}

function loadDependencies() {
    charts.forEach(safeLoadDependency);

    if (errors.length) {
        d3.select('body').style('background','red');
    }
}

function createSelectChartElement() {
    let select = d3.select(chartSelectorContainerClass)
        .append('select')
        .classed(chartSelectorClass, true)
        .on('change', _handleChartSelectorChange)

    let options = select.selectAll('option').data(charts)

    options.enter().append('option')
        .attr('value', (d) => d)
        .text((d) => d);
}

function _handleChartSelectorChange() {
    setNewChart();
}

function removeBriteChartContainer() {
    d3.select(`.${britechartContainerClass}`).remove();
}

function addBritechartContainer() {
    d3.select(`.${britechartPlaceHolder}`)
        .append('div')
        .classed(britechartContainerClass, true);
}

function setDataInLocalStorage(data) {
    localStorage.setItem(savedDataKey, JSON.stringify(data));
}

function getDataFromLocalStorage() {
    let jsonData = localStorage.getItem(savedDataKey);
    let data = null;

    try {
        data = JSON.parse(jsonData);
    } catch(e) {
        localStorage.removeItem(savedDataKey);
        error.push(new Error('Trouble loading data', data));
    }

    return data;
}

function setNewChart(chartData=getInitialData()) {
    removeBriteChartContainer();
    addBritechartContainer();

    let chartType = d3.select(`.${chartSelectorClass}`).property('value');

    // extend options here
    let defaultConfig = defaults[chartType].chartConfig;
    let chart = window[chartType]();

    Object.keys(defaultConfig).forEach((optionName) => {
        chart[optionName](defaultConfig[optionName]);
    });

    d3.select(`.${britechartContainerClass}`).datum(chartData).call(chart);
}




