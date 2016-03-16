require.config({

    baseUrl: '../',

    paths: {
        'underscore': '../node_modules/underscore/underscore',
        'jquery': '../node_modules/jquery/dist/jquery',
        'd3': '../node_modules/d3/d3',
        'json': '../node_modules/requirejs-plugins/src/json',
        'text': '../node_modules/text/text',

        'dataBuilder': '../test/fixtures/lineChartDataBuilder',
        'stackedDataBuilder': '../test/fixtures/stackedAreaDataBuilder',
        'sparklineDataBuilder': '../test/fixtures/sparklineDataBuilder',

        'line': '/dist/charts/line',
        'bar': '/dist/charts/bar',
        'donut': '/dist/charts/donut',
        'tooltip': '/dist/charts/tooltip',
        'legend': '/dist/charts/legend',
        'stacked-area': '/dist/charts/stacked-area',
        'sparkline': '/dist/charts/sparkline'
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
        if (page === 'stacked-area') {
            require(['/demos/demo-stacked-area.js'], function(){});
        }
        if (page === 'sparkline') {
            require(['/demos/demo-sparkline.js'], function(){});
        }
    },

    shim: {
        'd3': { exports: 'd3'},
        'underscore': { exports: '_'}
    },

    map: {},
    packages: []
});
