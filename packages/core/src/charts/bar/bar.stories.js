import { select, selectAll } from 'd3-selection';

import bar from './bar';
import { BarDataBuilder } from './barChartDataBuilder';

// import miniTooltip from '../mini-tooltip/mini-tooltip';
// import colors from '../helpers/color';
// require('../helpers/resizeHelper');

const aTestDataSet = () => new BarDataBuilder();

const createContainer = (className) => {
    const result = document.createElement('article');

    if (className) {
        result.classList.add(className);
    }

    return result;
};

export const SimpleBarChart = () => {
    const container = createContainer('js-bar-chart-container');
    const barChart = bar();
    const barContainer = select('.js-bar-chart-container');
    const containerWidth = barContainer.node()
        ? barContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const dataset = aTestDataSet().withLettersFrequency().build();
        debugger;
        barChart
            .width(containerWidth)
            .hasPercentage(true)
            .enableLabels(true)
            .labelsNumberFormat('.0%')
            .height(300);

        barContainer.datum(dataset).call(barChart);
    }

    return container;
};

export default { title: 'Charts/Bar' };

// function createSimpleBarChart() {
//     let barChart = bar(),
//         barContainer = select('.js-bar-chart-container'),
//         containerWidth = barContainer.node()
//             ? barContainer.node().getBoundingClientRect().width
//             : false,
//         dataset;

//     if (containerWidth) {
//         dataset = aTestDataSet().withLettersFrequency().build();

//         barChart
//             .width(containerWidth)
//             .hasPercentage(true)
//             .enableLabels(true)
//             .labelsNumberFormat('.0%')
//             .height(300);

//         barContainer.datum(dataset).call(barChart);
//     }
// }

// function createHorizontalBarChart() {
//     let barChart = bar(),
//         tooltip = miniTooltip(),
//         barContainer = select('.js-horizontal-bar-chart-container'),
//         containerWidth = barContainer.node()
//             ? barContainer.node().getBoundingClientRect().width
//             : false,
//         tooltipContainer,
//         dataset;

//     if (containerWidth) {
//         dataset = aTestDataSet().withColors().build();

//         barChart
//             .isHorizontal(true)
//             .isAnimated(true)
//             .margin({
//                 left: 120,
//                 right: 20,
//                 top: 20,
//                 bottom: 30,
//             })
//             .colorSchema(colors.colorSchemas.britecharts)
//             .width(containerWidth)
//             .yAxisPaddingBetweenChart(20)
//             .height(300)
//             .percentageAxisToMaxRatio(1.3)
//             .on('customMouseOver', tooltip.show)
//             .on('customMouseMove', tooltip.update)
//             .on('customMouseOut', tooltip.hide);

//         barContainer.datum(dataset).call(barChart);

//         tooltipContainer = select(
//             '.js-horizontal-bar-chart-container .bar-chart .metadata-group'
//         );
//         tooltipContainer.datum([]).call(tooltip);
//     }
// }

// function createBarChartWithTooltip() {
//     let barChart = bar(),
//         tooltip = miniTooltip(),
//         barContainer = select('.js-bar-chart-tooltip-container'),
//         containerWidth = barContainer.node()
//             ? barContainer.node().getBoundingClientRect().width
//             : false,
//         tooltipContainer,
//         dataset;

//     if (containerWidth) {
//         select('.js-download-button').on('click', function () {
//             barChart.exportChart('barchart.png', 'Britecharts Bar Chart');
//         });

//         dataset = aTestDataSet().withLettersFrequency().build();

//         barChart
//             .width(containerWidth)
//             .height(300)
//             .isAnimated(true)
//             .on('customMouseOver', tooltip.show)
//             .on('customMouseMove', tooltip.update)
//             .on('customMouseOut', tooltip.hide);

//         barContainer.datum(dataset).call(barChart);

//         tooltip.numberFormat('.2%');

//         tooltipContainer = select('.bar-chart .metadata-group');
//         tooltipContainer.datum([]).call(tooltip);
//     }
// }

// function createLoadingState(isLoading, instance) {
//     let barChart = instance ? instance : bar(),
//         container = select('.js-loading-container'),
//         containerWidth = container.node()
//             ? container.node().getBoundingClientRect().width
//             : false;
//     const dataset = aTestDataSet().withLettersFrequency().build();

//     if (containerWidth) {
//         barChart
//             .width(containerWidth)
//             .height(300)
//             .isAnimated(true)
//             .isLoading(isLoading);

//         container.datum(dataset).call(barChart);
//     }

//     return barChart;
// }

// // Show charts if container available
// if (select('.js-bar-chart-tooltip-container').node()) {
//     createBarChartWithTooltip();
//     createHorizontalBarChart();
//     createSimpleBarChart();
//     createLoadingState(true);

//     let redrawCharts = function () {
//         selectAll('.bar-chart').remove();
//         createBarChartWithTooltip();
//         createHorizontalBarChart();
//         createSimpleBarChart();
//         createLoadingState(false);
//     };

//     // Redraw charts on window resize
//     // PubSub.subscribe('resize', redrawCharts);
// }
