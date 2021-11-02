import { select, selectAll } from 'd3-selection';
// import PubSub from 'pubsub-js';

import scatterPlot from './../../src/charts/scatter-plot/scatter-plot';
import miniTooltip from './../../src/charts/mini-tooltip/mini-tooltip';
import colorSelectorHelper from './helpers/colorSelector';
import { ScatterPlotDataBuilder } from './../../src/charts/scatter-plot/scatterPlotDataBuilder';

require('./helpers/resizeHelper');

const aTestDataSet = () => new ScatterPlotDataBuilder();

let redrawCharts;

function createScatterPlotWithSingleSource(optionalColorSchema) {
    let scatterChart = scatterPlot();
    let tooltip = miniTooltip().title('Temperature (C)');
    let scatterPlotContainer = select(
        '.js-scatter-plot-chart-tooltip-container'
    );
    let containerWidth = scatterPlotContainer.node()
        ? scatterPlotContainer.node().getBoundingClientRect().width
        : false;
    let dataset, tooltipContainer;

    if (containerWidth) {
        // data represents Ice Cream Sales (y) vs Temperature (x)
        dataset = aTestDataSet().withOneSource().build();

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

        if (optionalColorSchema) {
            scatterChart.colorSchema(optionalColorSchema);
        }

        scatterPlotContainer.datum(dataset).call(scatterChart);

        // tooltip set up
        tooltip.valueLabel('y').nameLabel('x').numberFormat('$');

        tooltipContainer = select(
            '.js-scatter-plot-chart-tooltip-container .scatter-plot .metadata-group'
        );
        tooltipContainer.datum([]).call(tooltip);
    }
}

function createScatterPlotWithIncreasedAreaAndHollowCircles() {
    let scatterChart = scatterPlot();
    let tooltip = miniTooltip();
    let scatterPlotContainer = select(
        '.js-scatter-plot-container-with-hollow-circles'
    );
    let containerWidth = scatterPlotContainer.node()
        ? scatterPlotContainer.node().getBoundingClientRect().width
        : false;
    let dataset, tooltipContainer;

    if (containerWidth) {
        dataset = aTestDataSet().withFourNames().build();

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

        tooltipContainer = select(
            '.js-scatter-plot-container-with-hollow-circles .scatter-plot .metadata-group'
        );
        tooltipContainer.datum([]).call(tooltip);
    }
}

// Show charts if container available
if (select('.js-scatter-plot-chart-tooltip-container').node()) {
    createScatterPlotWithSingleSource();
    createScatterPlotWithIncreasedAreaAndHollowCircles();

    redrawCharts = function () {
        selectAll('.scatter-plot').remove();
        createScatterPlotWithSingleSource();
        createScatterPlotWithIncreasedAreaAndHollowCircles();
    };

    // Redraw charts on window resize
    // PubSub.subscribe('resize', redrawCharts);

    // Color schema selector
    colorSelectorHelper.createColorSelector(
        '.js-color-selector-container',
        '.scatter-plot',
        function (newSchema) {
            createScatterPlotWithSingleSource(newSchema);
        }
    );
}
