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
     * @typedef ScatterPlotData
     * @type {Object[]}
     * @property {String} name      Name of the category or topic for data point        
     * @property {Number} x         Data point's position value relative to x-axis
     * @property {Number} y         Data point's position value relative to y-axis
     * @property {Number} [size]    Data point's relative size
     *
     * @example
     * [
     *     {
     *         name: 'topic',
     *         x: 123,
     *         y: 24,
     *         size: 95
     *     },
     *     {
     *         name: 'topic1',
     *         x: 53,
     *         y: 31,
     *         size: 48
     *     },
     *     {
     *         name: 'topic',
     *         x: 631,
     *         y: 321,
     *         size: 234
     *     }
     * ]
     */

    /**
     * Reusable Donut Chart API class that renders a
     * simple and configurable donut chart.
     *
     * @module Scatter-plot
     * @tutorial scatter-plot
     * @requires d3-array, d3-dispatch, d3-ease, d3-scale, d3-selection
     *
     * @example
     * let scatterPlot = scatterPlot();
     *
     * scatterPlot
     *     .width(500)
     *     .aspectRatio(1.5);
     *
     * d3Selection.select('.css-selector')
     *     .datum(dataset)
     *     .call(scatterPlot);
     */
    return function module() {

        let margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        },
        width = 960,
        height = 500,
        
        nameColorMap,

        dataPoints,

        xKey = 'x',
        yKey = 'y',
        nameKey = 'name',

        xScale,
        xAxis,
        yScale,
        yAxis,
        colorScale,
        
        isAnimated,
        ease = d3Ease.easeQuadInOut,
        
        svg,
        chartWidth,
        chartHeight;

        
        /**
         * This function creates the graph using the selection as container
         * @param  {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         * @param {ScatterPlotData} _data The data to attach and generate the chart
         */
        function exports(_selection) {
            _selection.each(function(_data) {
                dataPoints = cleanData(_data);

                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;

                buildScales();
                buildSVG(this);

                // TODO: the rest of the functions
            });    
        }

        /** 
         * Builds containers for the chart, including the chart axis,
         * chart, and metadata groups.
         * @private
        */
        function buildContainerGroups() {
            console.log('Start building container groups');

            let container = svg
                .append('g')
                .classed('container-group', true)
                .attr('transfrom', `translate(${margin.left}, ${margin.top})`);
            
            container
                .append('g').classed('x-axis-group', true)
                .append('g').classed('axis x', true);
            
            // TODO: build the rest of the container groups

        }

        /**
         * Creates the x and y scales of the chart
         * @private
         */
        function buildScales() {
            const [minX, minY] = [d3Array.min(dataPoints, ({x}) => x), d3Array.min(dataPoints, ({y}) => y)];
            const [maxX, maxY] = [d3Array.max(dataPoints, ({x}) => x), d3Array.max(dataPoints, ({y}) => y)];

            xScale = d3Scale.scaleLinear()
                .domain([minX, maxX])
                .rangeRound([0, chartWidth])
                .nice();
            
            yScale = d3Scale.scaleLinear()
                .domain([0, maxY])
                .rangeRound([chartHeight, 0])
                .nice();
            
            // TODO: set up colorScale and colorMap
            // Assign each color by "name" value

        }

        /**
         * Builds the SVG element that will contain the chart
         * @param {HTMLElement} container A DOM element that will work as
         * the container of the chart
         * @private
         */
        function buildSVG(container) {
            if (!svg) {
                svg = d3Selection.select(container)
                  .append('svg')
                    .classed('breitechart scatter-plot', true);
                
                buildContainerGroups();
            }

            svg
                .attr('width', width)
                .attr('height', height);
        }

        /**
         * Cleaning data casting the values and names to the proper type while keeping
         * the rest of properties on the data
         * @param  {ScatterPlotData} originalData  Raw data as passed to the container
         * @return  {ScatterPlotData}              Clean data
         * @private
         */
        function cleanData(originalData) {
            return originalData.reduce((acc, d) => {
                d.name = String(d[nameKey]);
                d.x = +d[xKey];
                d.y = +d[yKey];

                return [...acc, d];
            }, []);
        }


        // API

        /**
         * Gets or Sets the height of the chart
         * @param  {Number} _x          Desired height for the chart
         * @return {Number | module}    Current height or Scatter Chart module to chain calls
         * @public
         */
        exports.height = function(_x) {
            if (!arguments.length) {
                return height;
            }
            height = _x;

            return this;
        };

        /**
         * Gets or Sets the height of the chart
         * @param  {Number} _x          Desired height for the chart
         * @return {Number | module}    Current width or Scatter Chart module to chain calls
         * @public
         */
        exports.width = function(_x) {
            if (!arguments.length) {
                return width;
            }
            width = _x;

            return this;
        };

        return exports;
    };
});