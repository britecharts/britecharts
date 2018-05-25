module.exports = (function() {
    const baseConfig = {
        tooltipSelector: '.metadata-group'
    };

    return {
        chartDependencies: [
            'helpers/colors',
            'legend',
            'tooltip',
            'mini-tooltip'
        ],
        chartConfigs: {
            bar: {
                ...baseConfig,
                chartConfig: {
                    width: 400,
                    height: 300
                },
                initialDataType: 'basicBar',
            },
            donut: {
                ...baseConfig,
                chartConfig: {
                    width: 300,
                    height: 300,
                },
                initialDataType: 'basicDonut',
            },
            line: {
                ...baseConfig,
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
                initialDataType: 'basicLine',
                tooltipSelector: '.metadata-group .hover-marker'
            },
            sparkline: {
                ...baseConfig,
                chartConfig: {
                    width: 300,
                    height: 150
                },
                initialDataType: 'basicSparkLine'
            },
            brush: {
                ...baseConfig,
                chartConfig: {
                    width: 300,
                    height: 150
                },
                initialDataType: 'basicBrush'
            },
            step: {
                ...baseConfig,
                chartConfig: {
                    width: 400,
                    height: 275
                },
                initialDataType: 'basicStep',

            },
            'stacked-area': {
                ...baseConfig,
                chartConfig: {
                    width: 500,
                    height:300
                },
                initialDataType: 'basicStackedArea',
                tooltipSelector: '.metadata-group .vertical-marker-container'
            },
            'scatter-plot': {
                ...baseConfig,
                chartConfig: {
                    width: 500,
                    height:300
                },
                initialDataType: 'basicScatterPlot',
                tooltipSelector: '.metadata-group .vertical-marker-container'
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
            britechartPlaceHolderClass: 'chart-container-place-holder',
            // data input
            dataSubmitButtonClass: 'data-display__submit',
            dataResetButtonClass: 'data-display__reset',
            dataInputSizeToggleClass: 'data-display__toggle-size',
            // config inoput
            configSubmitButtonClass: 'config-display__submit',
            configResetButtonClass: 'config-display__reset',
            configAddTooltipClass: 'config-panel__add-tooltip',
            configAddMiniTooltipClass: 'config-panel__add-mini-tooltip',
            // other
            genericSelectBoxClass: 'select-box',
            notificationBarClass: 'notification-bar',
            notificationStackTraceClass: 'notification--stack-trace',
            notificationErrorClass: 'notification__error',
            tooltipMetaGroup: 'metadata-group',
            tooltipHoverGroup: 'hover-marker',

        },
        domIdNames: {
           dataInputId: 'dataInput',
           chartInputId: 'chartConfigInput'
        },
        editorConfig: {
            theme: 'ace/theme/monokai',
            mode: 'ace/mode/javascript'
        },
        saveKeys: {
            rootSaveKey: '__BRITECHARTS_SANDBOX_ROOT',
            savedDataKey: '__SAVED_CHART_DATA',
            // savedDataTypeKey: '__SAVED_DATA_TYPE',
            savedChartTypeKey: '__SAVED_CHART_TYPE',
            savedConfigKey: '__SAVED_CHART_CONFIG'
        },
        tooltipConfigs: {
            basic: {
                initString: `.on('customMouseOver', tip.show)
                            .on('customMouseMove', tip.update)
                            .on('customMouseOut', tip.hide)`,
            },
            mini: {
                initString: `.on('customMouseOver', miniTip.show)
                            .on('customMouseMove', miniTip.update)
                            .on('customMouseOut', miniTip.hide)`
            }
        }
    }
}());
