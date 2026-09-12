// H · every way a tooltip is attached to a chart, drawn from the package's
// ES module entry. tests/hover.spec.js drives a real pointer over each.
import { select } from 'd3-selection';
import {
    bar,
    groupedBar,
    heatmap,
    line,
    miniTooltip,
    scatterPlot,
    stackedArea,
    stackedBar,
    tooltip,
} from '@britecharts/core';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';
import {
    barData,
    groupedBarData,
    heatmapData,
    lineData,
    scatterData,
    stackedAreaData,
    stackedBarData,
} from './hover-data.js';

const WIDTH = 600;
const HEIGHT = 300;

// The multi-value tooltip: attached where the docs and stories attach it.
// The line chart's data points carry `topics`; the other three carry
// `values`, and their stories set the topic label accordingly. The bar
// charts dispatch the band's `key`, not a `date`, so their stories point
// the title at it too.
function withTooltip(
    chart,
    container,
    data,
    attachTo,
    topicLabel = 'topics',
    configure = () => {}
) {
    const chartTooltip = tooltip().title('Title').topicLabel(topicLabel);

    chart
        .width(WIDTH)
        .height(HEIGHT)
        .isAnimated(false)
        .on('customMouseOver', chartTooltip.show)
        .on('customMouseMove', chartTooltip.update)
        .on('customMouseOut', chartTooltip.hide);
    configure(chart, chartTooltip);

    container.datum(data).call(chart);
    container.select(attachTo).datum([]).call(chartTooltip);
}

// The single-value tooltip: always on the chart's .metadata-group.
function withMiniTooltip(chart, container, data, configure = () => {}) {
    const chartTooltip = miniTooltip().title('Title');

    chart
        .width(WIDTH)
        .height(HEIGHT)
        .isAnimated(false)
        .on('customMouseOver', chartTooltip.show)
        .on('customMouseMove', chartTooltip.update)
        .on('customMouseOut', chartTooltip.hide);
    configure(chart);

    container.datum(data).call(chart);
    container.select('.metadata-group').datum([]).call(chartTooltip);
}

withTooltip(
    line(),
    select('.hover-line'),
    lineData,
    '.metadata-group .hover-marker'
);
withTooltip(
    stackedArea(),
    select('.hover-stacked-area'),
    stackedAreaData,
    '.metadata-group .vertical-marker-container',
    'values'
);
withTooltip(
    stackedBar(),
    select('.hover-stacked-bar'),
    stackedBarData,
    '.metadata-group',
    'values',
    (chart, chartTooltip) => {
        chart.stackLabel('stack');
        chartTooltip.dateLabel('key');
    }
);
withTooltip(
    groupedBar(),
    select('.hover-grouped-bar'),
    groupedBarData,
    '.metadata-group',
    'values',
    (chart, chartTooltip) => {
        chart.groupLabel('group');
        chartTooltip.dateLabel('key');
    }
);

withMiniTooltip(bar(), select('.hover-bar'), barData);
withMiniTooltip(scatterPlot(), select('.hover-scatter-plot'), scatterData);
withMiniTooltip(heatmap(), select('.hover-heatmap'), heatmapData, (chart) =>
    chart.boxSize(20)
);
