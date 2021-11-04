import { select, selectAll } from 'd3-selection';
import { timeFormat } from 'd3-time-format';
// import PubSub from 'pubsub-js';

import brush from './../../src/charts/brush/brush';
import line from './../../src/charts/line/line';
import tooltip from './../../src/charts/tooltip/tooltip';
import { LineDataBuilder } from './../../src/charts/line/lineChartDataBuilder';
import colorSelectorHelper from './helpers/colorSelector';

require('./helpers/resizeHelper');

const aTestDataSet = () => new LineDataBuilder();
const lineMargin = { top: 60, bottom: 50, left: 50, right: 30 };
let redrawCharts;

function createBrushChart(optionalColorSchema) {
    let brushChart = brush(),
        brushMargin = { top: 0, bottom: 40, left: 50, right: 30 },
        brushContainer = select('.js-line-brush-chart-container'),
        containerWidth = brushContainer.node()
            ? brushContainer.node().getBoundingClientRect().width
            : false,
        colorSchema = optionalColorSchema ? optionalColorSchema : null,
        dataset;

    if (containerWidth) {
        dataset = aTestDataSet().with5Topics().build();

        brushChart
            .width(containerWidth)
            .height(100)
            .isAnimated(true)
            .margin(brushMargin)
            .on('customBrushEnd', function ([brushRangeStart, brushRangeEnd]) {
                let format = timeFormat('%m/%d/%Y');

                select('.js-start-date').text(format(brushRangeStart));
                select('.js-end-date').text(format(brushRangeEnd));
                select('.js-date-range').classed('is-hidden', false);

                // Filter
                selectAll('.js-line-chart-container .line-chart').remove();

                if (brushRangeStart && brushRangeEnd) {
                    const filteredDataByBrushRange = filterData(
                        brushRangeStart,
                        brushRangeEnd
                    );
                    createLineChart(colorSchema, filteredDataByBrushRange);
                } else {
                    createLineChart(colorSchema, dataset);
                }
            });

        brushContainer.datum(brushDataAdapter(dataset)).call(brushChart);
    }
}

function createLineChart(optionalColorSchema, optionalData) {
    let lineChart1 = line(),
        chartTooltip = tooltip(),
        container = select('.js-line-chart-container'),
        containerWidth = container.node()
            ? container.node().getBoundingClientRect().width
            : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        select('#button').on('click', function () {
            lineChart1.exportChart('linechart.png', 'Britecharts Line Chart');
        });

        dataset = aTestDataSet().with5Topics().build();

        // LineChart Setup and start
        lineChart1
            .isAnimated(true)
            .grid('horizontal')
            .tooltipThreshold(600)
            .width(containerWidth)
            .margin(lineMargin)
            .yAxisLabel('Value Axis Label')
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', chartTooltip.hide)
            .on('customDataEntryClick', function (d, mousePosition) {
                // eslint-disable-next-line no-console
                console.log('Data entry marker clicked', d, mousePosition);
            });

        if (optionalColorSchema) {
            lineChart1.colorSchema(optionalColorSchema);
        }

        if (optionalData) {
            container.datum(optionalData).call(lineChart1);
        } else {
            container.datum(dataset).call(lineChart1);
        }

        // Tooltip Setup and start
        chartTooltip
            // In order to change the date range on the tooltip title, uncomment this line
            // .dateFormat(chartTooltip.axisTimeCombinations.HOUR .title('Quantity Sold')
            .topicsOrder([...new Set(dataset.data.map(({ name }) => name))]);

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select(
            '.js-line-chart-container .metadata-group .hover-marker'
        );
        tooltipContainer.datum([]).call(chartTooltip);
    }
}

function createLineChartWithSingleLine() {
    let lineChart2 = line(),
        chartTooltip = tooltip(),
        container = select('.js-single-line-chart-container'),
        containerWidth = container.node()
            ? container.node().getBoundingClientRect().width
            : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = aTestDataSet().withOneSource().build();

        lineChart2
            .tooltipThreshold(600)
            .height(300)
            .margin(lineMargin)
            .lineCurve('basis')
            .grid('vertical')
            .width(containerWidth)
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', function (
                dataPoint,
                topicColorMap,
                dataPointXPosition
            ) {
                chartTooltip.update(
                    dataPoint,
                    topicColorMap,
                    dataPointXPosition
                );
            })
            .on('customMouseOut', chartTooltip.hide);

        container.datum(dataset).call(lineChart2);

        // Tooltip Setup and start
        chartTooltip.title('Quantity Sold');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select(
            '.js-single-line-chart-container .metadata-group .vertical-marker-container'
        );
        tooltipContainer.datum([]).call(chartTooltip);

        select('#button2').on('click', function () {
            lineChart2.exportChart('linechart.png', 'Britecharts LÍne Chart');
        });
    }
}

function createLineChartWithFixedHeight() {
    let lineChart3 = line(),
        chartTooltip = tooltip(),
        container = select('.js-fixed-line-chart-container'),
        containerWidth = container.node()
            ? container.node().getBoundingClientRect().width
            : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        dataset = aTestDataSet().with5Topics().build();

        lineChart3
            .height(300)
            .width(containerWidth)
            .margin(lineMargin)
            .grid('full')
            .on('customMouseOver', function () {
                chartTooltip.show();
            })
            .on('customMouseMove', function (
                dataPoint,
                topicColorMap,
                dataPointXPosition
            ) {
                chartTooltip.update(
                    dataPoint,
                    topicColorMap,
                    dataPointXPosition
                );
            })
            .on('customMouseOut', function () {
                chartTooltip.hide();
            });

        container.datum(dataset).call(lineChart3);

        // Tooltip Setup and start
        chartTooltip.title('Quantity Sold');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select(
            '.js-fixed-line-chart-container .metadata-group .hover-marker'
        );
        tooltipContainer.datum([]).call(chartTooltip);
    }
}

function createLoadingState(isLoading, instance) {
    let lineChart = instance ? instance : line(),
        container = select('.js-loading-container'),
        containerWidth = container.node()
            ? container.node().getBoundingClientRect().width
            : false;
    const dataset = isLoading ? {} : aTestDataSet().withOneSource().build();

    if (containerWidth) {
        lineChart
            .width(containerWidth)
            .height(300)
            .isAnimated(true)
            .isLoading(isLoading);

        container.datum(dataset).call(lineChart);
    }

    return lineChart;
}

/*
 * The Brush chart wants an input like this one
 * @example
 * [
 *     {
 *         value: 1,
 *         date: '2011-01-06T00:00:00Z'
 *     },
 *     {
 *         value: 2,
 *         date: '2011-01-07T00:00:00Z'
 *     }
 * ]
 */
function brushDataAdapter(dataLine) {
    return dataLine.dataByDate.map(function (d) {
        d.value = d.topics.reduce(function (acc, topic) {
            return acc + topic.value;
        }, 0);

        return d;
    });
}

function filterData(d0, d1) {
    let data = JSON.parse(JSON.stringify(aTestDataSet().with5Topics().build()));

    data.dataByDate = data.dataByDate.filter(isInRange.bind(null, d0, d1));
    data.data = data.data.filter(isInRange.bind(null, d0, d1));

    return data;
}

function isInRange(d0, d1, d) {
    return new Date(d.date) >= d0 && new Date(d.date) <= d1;
}

// Show charts if container available
if (select('.js-line-chart-container').node()) {
    createLineChart();
    createBrushChart();
    createLineChartWithSingleLine();
    createLineChartWithFixedHeight();
    createLoadingState(true);

    redrawCharts = function () {
        selectAll('.line-chart, .brush-chart').remove();
        createLineChart();
        createBrushChart();
        createLineChartWithSingleLine();
        createLineChartWithFixedHeight();
        createLoadingState(false);
    };

    // Redraw charts on window resize
    // PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector(
        '.js-color-selector-container',
        '.line-chart',
        function (newSchema) {
            createLineChart(newSchema);
            selectAll('.brush-chart').remove();
            createBrushChart(newSchema);
        }
    );
}
