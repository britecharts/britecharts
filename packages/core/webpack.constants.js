const path = require('path');

const PATHS = {
    vendor: path.resolve('./node_modules'),
    bundleIndex: path.resolve('./src/index.js'),
    charts: path.resolve('./src/charts'),
    styles: path.resolve('./src/styles/britecharts.scss'),
};
exports.PATHS = PATHS;

exports.CHARTS = {
    bar: `${PATHS.charts}/bar/bar.js`,
    brush: `${PATHS.charts}/brush/brush.js`,
    bullet: `${PATHS.charts}/bullet/bullet.js`,
    donut: `${PATHS.charts}/donut/donut.js`,
    groupedBar: `${PATHS.charts}/grouped-bar/grouped-bar.js`,
    heatmap: `${PATHS.charts}/heatmap/heatmap.js`,
    legend: `${PATHS.charts}/legend/legend.js`,
    line: `${PATHS.charts}/line/line.js`,
    miniTooltip: `${PATHS.charts}/mini-tooltip/mini-tooltip.js`,
    scatterPlot: `${PATHS.charts}/scatter-plot/scatter-plot.js`,
    sparkline: `${PATHS.charts}/sparkline/sparkline.js`,
    stackedArea: `${PATHS.charts}/stacked-area/stacked-area.js`,
    stackedBar: `${PATHS.charts}/stacked-bar/stacked-bar.js`,
    step: `${PATHS.charts}/step/step.js`,
    tooltip: `${PATHS.charts}/tooltip/tooltip.js`,
    loading: [`${PATHS.charts}/helpers/load.js`],
    // hack to make webpack use colors as an entry point while its also a dependency of the charts above
    colors: [`${PATHS.charts}/helpers/color.js`],
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
