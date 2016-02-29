require.config({

    // baseUrl: '../',

    paths: {
        'underscore': '../node_modules/underscore/underscore',
        'jquery': '../node_modules/jquery/dist/jquery',
        'd3': '../node_modules/d3/d3',

        'dataBuilder': '../test/fixtures/lineChartDataBuilder',
        'line': '/dist/charts/line',
        'bar': '/dist/charts/bar',
        'donut': '/dist/charts/donut',
        'tooltip': '/dist/charts/tooltip',
        'legend': '/dist/charts/legend'
    },

    callback: function(){
        'use strict';

        var page = document.querySelector('body').id;

        if (page === 'bar') {
            require(['/demos/demo-bar.js'], function(){});
        }
        if (page === 'line') {
            require(['/demos/demo-line.js'], function(){});
        }
        if (page === 'donut') {
            require(['/demos/demo-donut.js'], function(){});
        }
    },

    shim: {
        'd3': { exports: 'd3'},
        'underscore': { exports: '_'}
    },

    map: {},
    packages: []
});
