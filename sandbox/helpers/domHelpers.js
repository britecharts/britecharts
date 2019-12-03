const d3 = require('d3');
const data = require('../constants/data');
const constants = require('../constants/constants');
const storage = require('./localStorageHelpers');

const {savedChartTypeKey} = constants.saveKeys;
const {
    britechartContainerClass,
    britechartPlaceHolderClass,
    chartSelectorContainerClass,
    chartSelectorClass,
    dataSelectorContainerClass,
    dataSelectorClass,
    genericSelectBoxClass,
    notificationBarClass,
    notificationErrorClass,
    notificationStackTraceClass
} = constants.domClassNames;
const charts = Object.keys(constants.chartConfigs);

module.exports = (function() {
    return {
        initDomElements() {
            this.createChartSelector();
            this.createDataSelector();
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
                .classed(genericSelectBoxClass, true);

            let options = select.selectAll('option').data(optionList);

            options.enter().append('option')
                .attr('value', (d) => d)
                .text((d) => d);
        },
        showErrors(errorList) {
            let notifications = d3.select(`.${notificationBarClass}`).selectAll('div').data(errorList);

            notifications.enter().append('div')
                .text(d => `Could not load ${d.filePath}: ${d.error.message}`)
                .classed(notificationErrorClass, true)
                // cannot be bound to calling scope, weird d3 stuff
                .each(function() {
                    d3.select(this)
                        .append('pre')
                        .text(({error}) => error.stack)
                        .classed(notificationStackTraceClass, true)
                });
        },
        removeBriteChartContainer() {
            d3.select(`.${britechartContainerClass}`).remove();
        },

        addBritechartContainer() {
            d3.select(`.${britechartPlaceHolderClass}`)
                .append('div')
                .classed(britechartContainerClass, true);
        }
    }
}());
