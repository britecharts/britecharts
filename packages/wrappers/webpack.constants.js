const path = require('path');

exports.CHARTS = {
    bar: './src/charts/bar/barChart.js',
    bullet: './src/charts/bullet/bulletChart.js',
    donut: './src/charts/donut/donutChart.js',
    groupedBar: './src/charts/groupedBar/groupedBarChart.js',
    legend: './src/charts/legend/legendChart.js',
    line: './src/charts/line/lineChart.js',
    scatterPlot: './src/charts/scatterPlot/scatterPlotChart.js',
    sparkline: './src/charts/sparkline/sparklineChart.js',
    stackedArea: './src/charts/stackedArea/stackedAreaChart.js',
    stackedBar: './src/charts/stackedBar/stackedBarChart.js',
    tooltip: './src/charts/tooltip/tooltipChart.js',
};

exports.PATHS = {
    vendor: path.resolve('./node_modules'),
    // The barrel is TypeScript now. `resolve.extensionAlias` would still
    // resolve a `.js` spelling here, but naming the file that exists is
    // clearer than relying on that for the build's own entry point.
    bundleIndex: path.resolve('./src/index.ts'),
    charts: path.resolve('./src/charts'),
};
