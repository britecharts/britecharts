import { select } from 'd3-selection';

import scatterPlot from './scatter-plot';
import miniTooltip from '../mini-tooltip/mini-tooltip';

import { getCleanContainer } from '../../../.storybook/helpers';
import { ScatterPlotDataBuilder } from './scatterPlotDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new ScatterPlotDataBuilder();

export const WithSingleSource = () => {
    const container = getCleanContainer();
    const scatterPlotContainer = select(container);
    const scatterChart = scatterPlot();
    const tooltip = miniTooltip().title('Temperature (C)');
    const containerWidth = scatterPlotContainer.node()
        ? scatterPlotContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withOneSource().build();
    let tooltipContainer;

    if (containerWidth) {
        scatterChart
            .isAnimated(true)
            .width(containerWidth)
            .circleOpacity(0.6)
            .hasTrendline(true)
            .grid('horizontal')
            .margin({
                left: 60,
                bottom: 50,
                right: 20,
            })
            .xAxisFormat('.1f')
            .xAxisLabel('Temperature (C)')
            .yAxisFormat('$')
            .yAxisLabel('Ice Cream Sales')
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        scatterPlotContainer.datum(dataset).call(scatterChart);

        // tooltip set up
        tooltip.valueLabel('y').nameLabel('x').numberFormat('$');

        tooltipContainer = select('.scatter-plot .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
    }

    return container;
};

export const WithIncreasedAreaAndHollowCircles = () => {
    const container = getCleanContainer();
    const scatterPlotContainer = select(container);
    const scatterChart = scatterPlot();
    const tooltip = miniTooltip();
    const containerWidth = scatterPlotContainer.node()
        ? scatterPlotContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withFourNames().build();
    let tooltipContainer;

    if (containerWidth) {
        scatterChart
            .width(containerWidth)
            .hasCrossHairs(true)
            .hasHollowCircles(true)
            .isAnimated(true)
            .margin({
                left: 60,
                bottom: 45,
                right: 20,
            })
            .maxCircleArea(15)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', function (dataPoint, mousePos, chartSize) {
                tooltip.title(dataPoint.name);
                // passing an empty object to not have any data
                // in the tooltip - we want to only show the title
                tooltip.update({}, mousePos, chartSize);
            })
            .on('customMouseOut', tooltip.hide);

        scatterPlotContainer.datum(dataset).call(scatterChart);

        tooltipContainer = select('.scatter-plot .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
    }

    return container;
};

export default { title: 'Charts/ScatterPlot' };
