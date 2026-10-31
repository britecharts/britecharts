import { select, selectAll } from 'd3-selection';

import brush from '../brush/brush';
import line from './line';
import tooltip from '../tooltip/tooltip';

import {
    addExportButtons,
    getCleanContainer,
} from '../../../.storybook/helpers';
import {
    applyArgs,
    playgroundArgs,
    playgroundArgTypes,
} from '../../../.storybook/playground';
import { LineDataBuilder } from './lineChartDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new LineDataBuilder();
const lineMargin = { top: 60, bottom: 50, left: 50, right: 30 };
const brushMargin = { top: 0, bottom: 40, left: 50, right: 30 };

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

export const Playground = (args) => {
    const container = getCleanContainer();
    const lineChart = line();
    const lineContainer = select(container);
    const containerWidth = lineContainer.node()
        ? lineContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const dataset = aTestDataSet().with5Topics().build();
        const chartTooltip = tooltip().topicsOrder([
            ...new Set(dataset.data.map(({ name }) => name)),
        ]);

        // The chart connects and places its tooltip
        applyArgs(lineChart, args).width(containerWidth).tooltip(chartTooltip);

        lineContainer.datum(dataset).call(lineChart);

        addExportButtons(container, lineChart, 'line');
    }

    return container;
};

Playground.args = playgroundArgs(line, [
    'height',
    'margin',
    'isAnimated',
    'colorSchema',
    'grid',
    'lineCurve',
    'hasMinimumValueScale',
    'shouldShowAllDataPoints',
    'xAxisValueType',
    'xAxisScale',
    'xAxisFormat',
    'xAxisCustomFormat',
    'xAxisLabel',
    'yAxisLabel',
    'yAxisLabelPadding',
    'xTicks',
    'yTicks',
    'tooltipThreshold',
    'numberFormat',
    'isLoading',
]);
Playground.args.isAnimated = false;
Playground.args.grid = 'horizontal';
Playground.argTypes = playgroundArgTypes(Playground.args);

export const WithSingleLine = () => {
    const container = getCleanContainer();
    const lineChart = line();
    const chartTooltip = tooltip();
    const lineContainer = select(container);
    const containerWidth = lineContainer.node()
        ? lineContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withOneSource().build();
    let tooltipContainer;

    if (containerWidth) {
        lineChart
            .tooltipThreshold(600)
            .height(300)
            .margin(lineMargin)
            .lineCurve('basis')
            .grid('vertical')
            .width(containerWidth)
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', chartTooltip.hide);

        lineContainer.datum(dataset).call(lineChart);

        // Tooltip Setup and start
        chartTooltip.title('Quantity Sold');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select('.metadata-group .vertical-marker-container');
        tooltipContainer.datum([]).call(chartTooltip);
    }

    return container;
};

export const WithManyLines = () => {
    const container = getCleanContainer();
    const lineChart = line();
    const chartTooltip = tooltip();
    const lineContainer = select(container);
    const containerWidth = lineContainer.node()
        ? lineContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().with5Topics().build();
    let tooltipContainer;

    if (containerWidth) {
        lineChart
            .height(300)
            .width(containerWidth)
            .margin(lineMargin)
            .grid('full')
            .on('customMouseOver', function () {
                chartTooltip.show();
            })
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', function () {
                chartTooltip.hide();
            });

        lineContainer.datum(dataset).call(lineChart);

        // Tooltip Setup and start
        chartTooltip.title('Quantity Sold');

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select('.metadata-group .hover-marker');
        tooltipContainer.datum([]).call(chartTooltip);
    }

    return container;
};

export const WithAnimation = () => {
    const container = getCleanContainer();
    const lineChart = line();
    const lineContainer = select(container);
    const containerWidth = lineContainer.node()
        ? lineContainer.node().getBoundingClientRect().width
        : false;
    const chartTooltip = tooltip();

    if (containerWidth) {
        const dataset = aTestDataSet().with5Topics().build();

        lineChart
            .isAnimated(true)
            .width(containerWidth)
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', chartTooltip.hide);

        lineContainer.datum(dataset).call(lineChart);

        chartTooltip.topicsOrder([
            ...new Set(dataset.data.map(({ name }) => name)),
        ]);

        select('.metadata-group .hover-marker').datum([]).call(chartTooltip);
    }

    return container;
};

export const WithStepBeforeCurveAndTealColorSchema = () => {
    const container = getCleanContainer();
    const lineChart = line();
    const lineContainer = select(container);
    const containerWidth = lineContainer.node()
        ? lineContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const dataset = aTestDataSet().with5Topics().build();

        lineChart
            .width(containerWidth)
            .margin(lineMargin)
            .lineCurve('stepBefore')
            .tooltipThreshold(200)
            .colorSchema(colors.colorSchemas.teal);

        lineContainer.datum(dataset).call(lineChart);
    }

    return container;
};

export const WithTooltipAndBrush = () => {
    const container = getCleanContainer();
    const lineChart = line();
    const chartTooltip = tooltip();
    const brushChart = brush();
    const lineContainer = select(container);
    const containerWidth = lineContainer.node()
        ? lineContainer.node().getBoundingClientRect().width
        : false;
    let tooltipContainer;
    const dataset = aTestDataSet().with5Topics().build();

    if (containerWidth) {
        // LineChart Setup and start
        lineChart
            .isAnimated(true)
            .grid('horizontal')
            .tooltipThreshold(600)
            .width(containerWidth)
            .margin(lineMargin)
            .yAxisLabel('Value Axis Label')
            .on('customMouseOver', chartTooltip.show)
            .on('customMouseMove', chartTooltip.update)
            .on('customMouseOut', chartTooltip.hide);

        lineContainer.datum(dataset).call(lineChart);

        // Tooltip Setup and start
        chartTooltip
            // In order to change the date range on the tooltip title, uncomment this line
            // .dateFormat(chartTooltip.axisTimeCombinations.HOUR .title('Quantity Sold')
            .topicsOrder([...new Set(dataset.data.map(({ name }) => name))]);

        // Note that if the viewport width is less than the tooltipThreshold value,
        // this container won't exist, and the tooltip won't show up
        tooltipContainer = select('.metadata-group .hover-marker');
        tooltipContainer.datum([]).call(chartTooltip);

        const wrapper = document.createElement('div');
        wrapper.classList = 'brush-chart-container';
        container.appendChild(wrapper);
        const brushContainer = select(wrapper);

        brushChart
            .width(containerWidth)
            .height(100)
            .isAnimated(true)
            .margin(brushMargin)
            .on('customBrushEnd', ([brushRangeStart, brushRangeEnd]) => {
                const data =
                    brushRangeStart && brushRangeEnd
                        ? filterData(brushRangeStart, brushRangeEnd)
                        : dataset;

                lineContainer.datum(data).call(lineChart);
            });

        brushContainer.datum(brushDataAdapter(dataset)).call(brushChart);
    }

    return container;
};

export const WithLoadingState = () => {
    const container = getCleanContainer();
    const lineContainer = select(container);
    const lineChart = line();
    const containerWidth = lineContainer.node()
        ? lineContainer.node().getBoundingClientRect().width
        : false;
    const dataset = { data: [] };

    if (containerWidth) {
        lineChart
            .width(containerWidth)
            .height(300)
            .isAnimated(true)
            .isLoading(true);

        lineContainer.datum(dataset).call(lineChart);
    }

    return container;
};

export default { title: 'Charts/Line' };
