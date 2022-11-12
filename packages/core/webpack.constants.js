const path = require('path');

exports.CHARTS = {
    bar: './src/charts/bar/bar.js',
    brush: './src/charts/brush/brush.js',
    bullet: './src/charts/bullet/bullet.js',
    donut: './src/charts/donut/donut.js',
    groupedBar: './src/charts/grouped-bar/grouped-bar.js',
    heatmap: './src/charts/heatmap/heatmap.js',
    legend: './src/charts/legend/legend.js',
    line: './src/charts/line/line.js',
    miniTooltip: './src/charts/mini-tooltip/mini-tooltip.js',
    scatterPlot: './src/charts/scatter-plot/scatter-plot.js',
    sparkline: './src/charts/sparkline/sparkline.js',
    stackedArea: './src/charts/stacked-area/stacked-area.js',
    stackedBar: './src/charts/stacked-bar/stacked-bar.js',
    step: './src/charts/step/step.js',
    tooltip: './src/charts/tooltip/tooltip.js',
    loading: ['./src/charts/helpers/load.js'],
    // hack to make webpack use colors as an entry point while its also a dependency of the charts above
    colors: ['./src/charts/helpers/color.js'],
};

exports.CHART_STYLES = {
    bar: './src/styles/charts/bar.scss',
    brush: './src/styles/charts/brush.scss',
    bullet: './src/styles/charts/bullet.scss',
    groupedBar: './src/styles/charts/grouped-bar.scss',
    line: './src/styles/charts/line.scss',
    scatterPlot: './src/styles/charts/scatter-plot.scss',
    sparkline: './src/styles/charts/sparkline.scss',
    stackedArea: './src/styles/charts/stacked-area.scss',
    stackedBar: './src/styles/charts/stacked-bar.scss',
    step: './src/styles/charts/step.scss',
    common: './src/styles/common.scss',
};

exports.PATHS = {
    vendor: path.resolve('./node_modules'),
    bundleIndex: path.resolve('./src/index.js'),
    charts: path.resolve('./src/charts'),
    styles: path.resolve('./src/styles/britecharts.scss'),
};
