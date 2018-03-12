const path = require('path');

exports.CHARTS = {
    bar: './src/charts/bar.js',
    donut: './src/charts/donut.js',
    legend: './src/charts/legend.js',
    line: './src/charts/line.js',
    tooltip: './src/charts/tooltip.js',
    miniTooltip: './src/charts/mini-tooltip.js',
    sparkline: './src/charts/sparkline.js',
    stackedArea: './src/charts/stacked-area.js',
    stackedBar: './src/charts/stacked-bar.js',
    groupedBar: './src/charts/grouped-bar.js',
    step: './src/charts/step.js',
    brush: './src/charts/brush.js',
    loading: ['./src/charts/helpers/load.js'],
    // hack to make webpack use colors as an entry point while its also a dependency of the charts above
    colors: ['./src/charts/helpers/color.js'],
    grid: './src/charts/helpers/grid.js'
};

exports.DEMOS = {
    'demo-line': './demos/demo-line.js',
    'demo-stacked-area': './demos/demo-stacked-area.js',
    'demo-bar': './demos/demo-bar.js',
    'demo-grouped-bar': './demos/demo-grouped-bar.js',
    'demo-stacked-bar': './demos/demo-stacked-bar.js',
    'demo-donut': './demos/demo-donut.js',
    'demo-sparkline': './demos/demo-sparkline.js',
    'demo-step': './demos/demo-step.js',
    'demo-brush': './demos/demo-brush.js',
    'demo-kitchen-sink': './demos/demo-kitchen-sink.js',
    'demo-legend': './demos/demo-legend.js'
};

exports.PATHS = {
    vendor: path.resolve('./node_modules'),
    bundleIndex: path.resolve('./src/bundle.js'),
    charts: path.resolve('./src/charts'),
};
