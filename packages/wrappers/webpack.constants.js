const path = require('path');

exports.CHARTS = {
    bar: './src/charts/bar/barChart.js',
    bullet: './src/charts/bullet/bulletChart.js',
    donut: './src/charts/donut/donutChart.js',
    groupedBar: './src/charts/groupedBar/groupedBarChart.js',
    legend: './src/charts/legend/legendChart.js',
    line: './src/charts/line/lineChart.js',
    sparkline: './src/charts/sparkline/sparklineChart.js',
    stackedArea: './src/charts/stackedArea/stackedAreaChart.js',
    stackedBar: './src/charts/stackedBar/stackedBarChart.js',
    step: './src/charts/step/stepChart.js',
    tooltip: './src/charts/tooltip/tooltipChart.js',
};

exports.PATHS = {
    vendor: path.resolve('./node_modules'),
    bundleIndex: path.resolve('./src/index.js'),
    charts: path.resolve('./src/charts'),
};
