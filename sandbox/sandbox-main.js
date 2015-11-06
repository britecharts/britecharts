require.config({

    // baseUrl: '../',

    paths: {
        'underscore': '../node_modules/underscore/underscore',
        'jquery': '../node_modules/jquery/dist/jquery',
        'd3': '../node_modules/d3/d3',

        'dataBuilder': '../test/fixtures/lineChartDataBuilder',
        'line': '../src/charts/line',
        'bar': '../src/charts/bar',
        'donut': '../src/charts/donut'
    },

    callback: function(){
        require(['./sandbox/app.js'], function(){
        });
    },

    shim: {
        'd3': { exports: 'd3'},
        'underscore': { exports: '_'}
    },

    map: {},
    packages: []
});
