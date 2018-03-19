import { colorSchema, nameLabel } from './bar';
import { xAxisLabel } from './line';

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
     *     .aspectRatio(0.5);
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

        xAxisPadding = {
            top: 0,
            left: 15,
            bottom: 0,
            right: 0
        },

        xKey = 'x',
        yKey = 'y',
        nameKey = 'name',

        xTicks = null,
        yTicks = null,
        tickPadding = 5,

        xScale,
        xAxis,
        yScale,
        yAxis,
        areaScale,
        colorScale,

        maxCircleArea = 10,

        colorSchema = colorHelper.colorSchemas.britecharts,
        
        isAnimated = true,
        ease = d3Ease.easeCircleIn,
        delay = 500,
        duration = 500,
        
        svg,
        chartWidth,
        chartHeight,
        
        getName = ({name}) => name;

        
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
                buildAxis();
                drawAxis();
                drawDataPoints();

                // TODO: the rest of the functions
            });    
        }

        /** 
         * Builds containers for the chart, including the chart axis,
         * chart, and metadata groups.
         * @private
        */
        function buildContainerGroups() {
            let container = svg
                .append('g')
                .classed('container-group', true)
                .attr('transfrom', `translate(${margin.left}, ${margin.top})`);
            
            container
                .append('g').classed('x-axis-group', true)
                .append('g').classed('axis x', true);
            container
                .append('g').classed('y-axis-group', true)
                .append('g').classed('axis y', true);
            container
                .append('g').classed('chart-group', true);
            container
                .append('g').classed('metadata-group', true);
            
            // TODO: build the rest of the container groups
            // Build clip container for the inner chart part
        }

        /** 
         * Creates the x-axis and y-axis with proper orientations
         * @private
        */
        function buildAxis() {
            xAxis = d3Axis.axisBottom(xScale)
                .ticks(xTicks)
                .tickPadding(tickPadding);
            
            yAxis = d3Axis.axisLeft(yScale)
                .ticks(yTicks)
                .tickPadding(tickPadding);

            // TODO: drawGridLines
        }

        /** 
         * Draws the x and y axis on the svg object within their
         * respective groups along with their axis labels
         * @private
        */
        function drawAxis() {
            svg.select('.x-axis-group .axis.x')
                .attr('transform', `translate(0, ${chartHeight})`)
                .call(xAxis);

            svg.select('.y-axis-group .axis.y')
                .attr('tramsform', `translate(${-xAxisPadding.left}, 0)`)
                .call(yAxis);
            // TODO: draw label axis
        }

        /**
         * Creates the x and y scales of the chart
         * @private
         */
        function buildScales() {
            const [minX, minY] = [d3Array.min(dataPoints, ({x}) => x), d3Array.min(dataPoints, ({y}) => y)];
            const [maxX, maxY] = [d3Array.max(dataPoints, ({x}) => x), d3Array.max(dataPoints, ({y}) => y)];
            const yScaleBottomValue = Math.abs(minY) < 0 ? Math.abs(minY) : 0;

            xScale = d3Scale.scaleLinear()
                .domain([minX, maxX])
                .rangeRound([0, chartWidth])
                .nice();
            
            yScale = d3Scale.scaleLinear()
                .domain([yScaleBottomValue, maxY])
                .rangeRound([chartHeight, 0])
                .nice();
            
            colorScale = d3Scale.scaleOrdinal()
                .domain(dataPoints.map(getName))
                .range(colorSchema);
            
            
            areaScale = d3Scale.scaleSqrt()
                .domain([yScaleBottomValue, maxY])
                .range([0, maxCircleArea]);
                    
            const colorRange = colorScale.range();

            /**
             * Maps data point category name to 
             * each color of the given color scheme
             * {
             *     name1: 'color1',
             *     name2: 'color2',
             *     name3: 'color3',
             *     ...
             * }
             */
            nameColorMap = colorScale.domain().reduce((accum, item, i) => {
                accum[item] = colorRange[i];

                return accum;
            }, {});
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
                d.x = d[xKey];
                d.y = d[yKey];

                return [...acc, d];
            }, []);
        }

        /**
         * Draws the points for each data element
         * on the charg group
         * @private
        */
        function drawDataPoints() {
            // TODO: check if isAnimated is true
            // before applying the transition effect

            let circles = svg.select('.chart-group')
                // TODO: .attr('clip-path', 'url(#chart-area')
                .selectAll('circle')
                .data(dataPoints)
                .enter();

            if (isAnimated) {
                circles
                    .append('circle')
                    .transition()
                    .delay(delay)
                    .duration(duration)
                    .ease(ease)
                    .attr('r', (d) => areaScale(d.y))
                    .attr('cx', (d) => xScale(d.x))
                    .attr('cy', (d) => yScale(d.y))
                    .attr('fill', (d) => nameColorMap[d.name]);
            } else {
                circles
                    .append('circle')
                    .attr('r', (d) => areaScale(d.y))
                    .attr('cx', (d) => xScale(d.x))
                    .attr('cy', (d) => yScale(d.y))
                    .attr('fill', (d) => nameColorMap[d.name]);
            }
        }


        // API

        /**
         * Gets or Sets the colorSchema of the chart
         * @param  {String[]} _x            Desired colorSchema for the graph
         * @return {colorSchema | module}   Current colorSchema or Chart module to chain calls
         * @public
         * @example
         * scatterPlot.colorSchema(['#fff', '#bbb', '#ccc'])
         */
        exports.colorSchema = function(_x) {
            if (!arguments.length) {
                return colorSchema;
            }
            colorSchema = _x;

            return this;
        };

        /**
         * Gets or Sets isAnimated value. If set to true,
         * the chart will be initialized or updated with animation.
         * @param  {boolean} _x=false       Desired margin object properties for each side
         * @return {isAnimated | module}    Current height or Scatter Chart module to chain calls
         * @public
         */
        exports.isAnimated = function(_x) {
            if (!arguments.length) {
                return isAnimated;
            }
            isAnimated = _x;

            return this;
        }

        /**
         * Gets or Sets the margin object of the chart
         * @param  {Object} _x          Desired margin object properties for each side
         * @return {margin | module}    Current height or Scatter Chart module to chain calls
         * @public
         */
        exports.margin = function(_x) {
            if (!arguments.length) {
                return margin;
            }
            margin = {
                ...margin,
                ..._x,
            };

            return this;
        };

        /**
         * Gets or Sets the maximum value of the chart area
         * @param  {number} _x=10       Desired margin object properties for each side
         * @return {maxCircleArea | module}    Current height or Scatter Chart module to chain calls
         * @public
         */
        exports.maxCircleArea = function(_x) {
            if (!arguments.length) {
                return maxCircleArea;
            }
            maxCircleArea = _x;

            return this;
        }

        /**
         * Gets or Sets the height of the chart
         * @param  {Number} _x          Desired height for the chart
         * @return {height | module}    Current height or Scatter Chart module to chain calls
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
         * @return {width | module}    Current width or Scatter Chart module to chain calls
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