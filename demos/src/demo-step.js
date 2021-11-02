import { select } from 'd3-selection';
// import PubSub from 'pubsub-js';

import step from './../../src/charts/step/step';
import miniTooltip from './../../src/charts/mini-tooltip/mini-tooltip';
import { StepDataBuilder } from './../../src/charts/step/stepChartDataBuilder';

require('./helpers/resizeHelper');

const aTestDataSet = () => new StepDataBuilder();
let redrawCharts;

function createStepChart() {
    let stepChart = step(),
        tooltip = miniTooltip(),
        stepContainer = select('.js-step-chart-container'),
        containerWidth = stepContainer.node()
            ? stepContainer.node().getBoundingClientRect().width
            : false,
        tooltipContainer,
        dataset;

    if (containerWidth) {
        select('#button').on('click', function () {
            stepChart.exportChart('stepchart.png', 'Britecharts Step Chart');
        });

        dataset = aTestDataSet().withSmallData().build();

        stepChart
            .width(containerWidth)
            .height(300)
            .xAxisLabel('Meal Type')
            .xAxisLabelOffset(60)
            .yAxisLabel('Quantity')
            .yAxisLabelOffset(-50)
            .margin({
                top: 40,
                right: 40,
                bottom: 80,
                left: 80,
            })
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        stepContainer.datum(dataset.data).call(stepChart);

        tooltip.nameLabel('key');

        tooltipContainer = select(
            '.js-step-chart-container .step-chart .metadata-group'
        );
        tooltipContainer.datum([]).call(tooltip);
    }
}

// Show charts if container available
if (select('.js-step-chart-container').node()) {
    createStepChart();

    // For getting a responsive behavior on our chart,
    // we'll need to listen to the window resize event
    redrawCharts = function () {
        select('.step-chart').remove();

        createStepChart();
    };

    // Redraw charts on window resize
    // PubSub.subscribe('resize', redrawCharts);
}
