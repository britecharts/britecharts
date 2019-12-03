module.exports = (function() {
    const baseConfig = {
        tooltipSelector: '.metadata-group'
    };

    return {
        chartDependencies: [
            'helpers/color',
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
            brush: {
                ...baseConfig,
                chartConfig: {
                    width: 300,
                    height: 150
                },
                initialDataType: 'basicBrush'
            },
            donut: {
                ...baseConfig,
                chartConfig: {
                    width: 300,
                    height: 300,
                },
                initialDataType: 'basicDonut',
            },
            'grouped-bar': {
                ...baseConfig,
                chartConfig: {
                    margin: {
                        top: 20,
                        bottom: 20,
                        left: 20,
                        right: 20
                    },
                    width: 300,
                    height: 300
                },
                initialDataType: 'basicGroupedBar'
            },
            legend: {
                ...baseConfig,
                chartConfig: {
                    isHorizontal: true,
                    margin: {
                        top: 20,
                        bottom: 20,
                        left: 20,
                        right: 20
                    },
                    width: 300,
                    height: 300
                },
                initialDataType: 'basicLegend'
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
            chartSelectorContainerClass: 'js-chart-selector-container',
            chartSelectorClass: 'chart-selector',

            // data selector
            dataSelectorContainerClass: 'js-data-selector-container',
            dataSelectorClass: 'data-selector',

            // chart containers
            britechartContainerClass: 'britechart-container',
            britechartPlaceHolderClass: 'js-chart-container-placeholder',
            // data input
            dataSubmitButtonClass: 'js-data-display__submit',
            dataResetButtonClass: 'js-data-display__reset',
            // config inoput
            configSubmitButtonClass: 'js-config-display__submit',
            configResetButtonClass: 'js-config-display__reset',
            configAddTooltipClass: 'js-config-panel__add-tooltip',
            configAddMiniTooltipClass: 'js-config-panel__add-mini-tooltip',
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
