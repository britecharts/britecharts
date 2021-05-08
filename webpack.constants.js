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

exports.DEMOS = {
    'demo-bar': './demos/src/demo-bar.js',
    'demo-bullet': './demos/src/demo-bullet.js',
    'demo-brush': './demos/src/demo-brush.js',
    'demo-donut': './demos/src/demo-donut.js',
    'demo-color': './demos/src/demo-color.js',
    'demo-grouped-bar': './demos/src/demo-grouped-bar.js',
    'demo-heatmap': './demos/src/demo-heatmap.js',
    'demo-kitchen-sink': './demos/src/demo-kitchen-sink.js',
    'demo-legend': './demos/src/demo-legend.js',
    'demo-line': './demos/src/demo-line.js',
    'demo-scatter-plot': './demos/src/demo-scatter-plot.js',
    'demo-stacked-area': './demos/src/demo-stacked-area.js',
    'demo-stacked-bar': './demos/src/demo-stacked-bar.js',
    'demo-step': './demos/src/demo-step.js',
    'demo-sparkline': './demos/src/demo-sparkline.js',
};

exports.PATHS = {
    vendor: path.resolve('./node_modules'),
    bundleIndex: path.resolve('./src/index.js'),
    charts: path.resolve('./src/charts'),
};
