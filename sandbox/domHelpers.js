const d3 = require('d3');
const data = require('./data');
const constants = require('./constants');
const storage = require('./localStorageManager');

const {savedChartTypeKey} = constants.saveKeys;
const {
    chartSelectorContainerClass,
    chartSelectorClass,
    dataSelectorContainerClass,
    dataSelectorClass
} = constants.domClassNames;
const charts = Object.keys(constants.chartConfigs);

module.exports = (function() {
    return {
        initDomElements() {
            this.createChartSelector()
            this.createDataSelector()
        },
        createChartSelector() {
            this.createSelectElement(`.${chartSelectorContainerClass}`, chartSelectorClass, charts);
        },
        createDataSelector() {
            let chartType = storage.getDataByKey(savedChartTypeKey);
            let dataTypes = Object.keys(data[chartType]);

            this.createSelectElement(`.${dataSelectorContainerClass}`, dataSelectorClass, dataTypes);

        },
        createSelectElement(selector, selectClass, optionList) {
            let select = d3.select(selector)
                .append('select')
                .classed(selectClass, true)

            let options = select.selectAll('option').data(optionList)

            options.enter().append('option')
                .attr('value', (d) => d)
                .text((d) => d);
        }
    }
}());