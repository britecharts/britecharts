const path = require('path');

exports.CHARTS = {
    bar: './src/charts/bar.js',
    donut: './src/charts/donut.js',
    legend: './src/charts/legend.js',
    line: './src/charts/line.js',
    tooltip: './src/charts/tooltip.js',
    miniTooltip: './src/charts/mini-tooltip.js',
    sparkline: './src/charts/sparkline.js',
    scatterPlot: './src/charts/scatter-plot.js',
    stackedArea: './src/charts/stacked-area.js',
    stackedBar: './src/charts/stacked-bar.js',
    groupedBar: './src/charts/grouped-bar.js',
    step: './src/charts/step.js',
    bullet: './src/charts/bullet.js',
    brush: './src/charts/brush.js',
    loading: ['./src/charts/helpers/load.js'],
    // hack to make webpack use colors as an entry point while its also a dependency of the charts above
    colors: ['./src/charts/helpers/color.js']
};

exports.DEMOS = {
    'demo-line': './demos/src/demo-line.js',
    'demo-stacked-area': './demos/src/demo-stacked-area.js',
    'demo-bar': './demos/src/demo-bar.js',
    'demo-grouped-bar': './demos/src/demo-grouped-bar.js',
    'demo-stacked-bar': './demos/src/demo-stacked-bar.js',
    'demo-donut': './demos/src/demo-donut.js',
    'demo-scatter-plot': './demos/src/demo-scatter-plot.js',
    'demo-sparkline': './demos/src/demo-sparkline.js',
    'demo-step': './demos/src/demo-step.js',
    'demo-bullet': './demos/src/demo-bullet.js',
    'demo-brush': './demos/src/demo-brush.js',
    'demo-kitchen-sink': './demos/src/demo-kitchen-sink.js',
    'demo-legend': './demos/src/demo-legend.js'
};

exports.PATHS = {
    vendor: path.resolve('./node_modules'),
    bundleIndex: path.resolve('./src/bundle.js'),
    charts: path.resolve('./src/charts'),
};
