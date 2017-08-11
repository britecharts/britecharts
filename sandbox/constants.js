module.exports = (function() {
    return {
        saveKeys: {
            rootSaveKey: '__BRITECHARTS_SANDBOX_ROOT',
            savedDataKey: '__SAVED_CHART_DATA',
            // savedDataTypeKey: '__SAVED_DATA_TYPE',
            savedChartTypeKey: '__SAVED_CHART_TYPE',
            savedConfigKey: '__SAVED_CHART_CONFIG'
        },
        editorConfig: {
            theme: 'ace/theme/monokai',
            mode: 'ace/mode/javascript'
        },
        chartConfigs: {
            bar: {
                chartConfig: {
                    width: 400,
                    height: 300
                },
                initialDataType: 'basicBar'
            },
            donut: {
                chartConfig: {
                    width: 300,
                    height: 300,
                },
                initialDataType: 'basicDonut'
            },
            line: {
                chartConfig: {
                    margin: {
                        top: 60,
                        bottom: 50,
                        left: 50,
                        right: 20
                    },
                    width: 500,
                    height: 300
                },
                initialDataType: 'basicLine'
            }
        },
        domClassNames: {
            // chart selector
            chartSelectorContainerClass: 'chart-selector-container',
            chartSelectorClass: 'chart-selector',

            // data selector
            dataSelectorContainerClass: 'data-selector-container',
            dataSelectorClass: 'data-selector',

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
            // other
            genericSelectBoxClass: 'select-box',
            notificationBarClass: 'notification-bar',

        },
        domIdNames: {
           dataInputId: 'dataInput',
           chartInputId: 'chartConfigInput'
        }
    }
}());