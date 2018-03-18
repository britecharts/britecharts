define(function(require) {
    'use strict';

    const d3Array = require('d3-array');
    const d3Axis = require('d3-axis');
    const d3Collection = require('d3-collection');
    const d3Dispatch = require('d3-dispatch');
    const d3Ease = require('d3-ease');
    const d3Format = require('d3-format');
    const d3Scale = require('d3-scale');
    const d3Shape = require('d3-shape');
    const d3Selection = require('d3-selection');
    const d3Transition = require('d3-transition');
    const d3TimeFormat = require('d3-time-format');

    const {exportChart} = require('./helpers/export');
    const colorHelper = require('./helpers/color');

    const {
        formatIntegerValue,
        formatDecimalValue,
        isInteger,
        uniqueId
    } = require('./helpers/number');

     /**
      * @typedef scatterPlotDataByTopic
      * @type {Object}
      * @property {String} topic    The name of the topic or category
      * @property {Number} x        Position of the data point with respect to x-axis
      * @property {Number} y        Position of the data point with respect to y-axis
      * @property {Number} [size]   Relative size of the data point (optional)
      *
      * @example
      * {
      *     topic: 'topic',
      *     x:  123,
      *     y: 234,
      *     size: 345
      * }
      */

     /**
      * @typedef ScatterPlotData
      * @type {Array[]}
      * @property {scatterPlotDataByTopic[]} dataByTopic   Data values to chart (required)
      *
      * @example
      * [
      *     {
      *         topic: 'topic',
      *         x:  123,
      *         y: 234,
      *         size: 345
      *      },
      *      {
      *         topic: 'topic1',
      *         x: 23,
      *         y: 4,
      *         size: 45
      *      },
      *      {
      *         topic: 'topic',
      *         x: 12,
      *         y: 31,
      *         size: 22
      *      }
      *  ]
      */

     /**
      * Scatter Plot reusable API module that allows us to
      * render a chart with data points and configurable chart.
      * 
      * @module Scatter-plot
      * @tutorial scatter-plot
      * @requires d3-array, d3-axis, d3-ease, d3-format, d3-scale, d3-shape, d3-selection
      *
      * @example
      * let scatterPlot = scatterPlot();
      * 
      * scatterPlot
      *     .width(500)
      *     .height(500);
      * 
      * d3Selection.select('.css-selector)
      *     .datum(dataset)
      *     .call(scatterPlot);
      */
    return function module() {
        
        function exports(_selection) {
            _selection.each(function(_data) {
                console.log('this data', _data);
            });    
        }

        return exports;
    };
});