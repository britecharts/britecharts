module.exports = (function() {
    return {
        saveKeys: {
            rootSaveKey: '__BRITECHARTS_SANDBOX_ROOT',
            savedChartTypeKey: '__SAVED_CHART_TYPE',
            savedDataKey: '__SAVED_CHART_DATA',
            savedConfigKey: '__SAVED_CHART_CONFIG'
        },
        editorConfig: {
            theme: 'ace/theme/monokai',
            mode: 'ace/mode/javascript'
        },
        chartConfigs: {
            bar: {
                chartConfig: {
                    percentageAxisToMaxRatio: 1.3,
                    width: 400,
                    height: 300
                },
                initialDataType: 'basicBar'
            },
            donut: {
                chartConfig: {
                    width: 500,
                    height: 500,
                },
                initialDataType: 'basicDonut'
            }
        },
        domClassNames: {
            // chart selector
            chartSelectorClass: 'chart-selector',
            // chart containers
            britechartContainerClass: 'britechart-container',
            britechartPlaceHolder: 'chart-container-place-holder',
            // data input
            submitDataButtonClass: 'data-display__submit',
            resetDataButtonClass: 'data-display__reset',
            dataInputSizeToggleClass: 'data-display__toggle-size',
            // config inoput
            submitConfigButtonClass: 'config-display__submit',
            resetConfigButtonClass: 'config-display__reset',
            configInputSizeToggleClass: 'config-display__toggle-size'
        },
        domIdNames: {
           dataInputId: 'dataInput',
           chartInputId: 'chartConfigInput'
        }
    }
}());