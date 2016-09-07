define(function(require){
    'use strict';

    const d3 = require('d3');
    const exportChart = require('./helpers/exportChart');

    /**
     * @typedef D3Selection
     * @type Array[]
     */

    /**
     * Sparkline Chart reusable API module that allows us
     * rendering a sparkline configurable chart.
     *
     * @module Sparkline
     * @version 0.0.1
     * @tutorial sparkline
     * @requires d3
     *
     * @example
     * var sparkLineChart = sparkline();
     *
     * sparkLineChart
     *     .width(200)
     *     .height(100);
     *
     * d3.select('.css-selector')
     *     .datum(dataset)
     *     .call(sparkLineChart);
     *
     */
    return function module(){

        let margin = {
                left: 5,
                right: 5,
                top: 5,
                bottom: 5
            },
            width = 100,
            height = 30,

            xScale,
            yScale,

            colorRange = [
                '#4DC2F5',
                '#051C48'
            ],

            ease = 'quad-out',

            svg,
            chartWidth, chartHeight,
            data,

            hasArea = true,
            isAnimated = false,
            clipDuration = 3000,

            line,

            markerSize = 1.5,

            valueLabel = 'views',
            dateLabel = 'date',

            // getters
            getDate = d => d.date,
            getValue = d => d[valueLabel];

        /**
         * This function creates the graph using the selection and data provided
         *
         * @param {D3Selection} _selection A d3 selection that represents
         * the container(s) where the chart(s) will be rendered
         * @param {Object} _data The data to attach and generate the chart
         */
        function exports(_selection) {
            _selection.each(function(_data){
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = cleanData(_data);

                buildScales();
                buildSVG(this);
                createGradients();
                createMaskingClip();
                drawLine();
                drawArea();
                drawEndMarker();
            });
        }

        /**
         * Builds containers for the chart, the axis and a wrapper for all of them
         * NOTE: The order of drawing of this group elements is really important,
         * as everything else will be drawn on top of them
         * @private
         */
        function buildContainerGroups(){
           let container = svg.append('g')
                .classed('container-group', true)
                .attr('transform', `translate(${margin.left},${margin.top})`);

            container
                .append('g').classed('chart-group', true);
            container
                .append('g').classed('metadata-group', true);
        }

        /**
         * Creates the x, y and color scales of the chart
         * @private
         */
        function buildScales(){
            xScale = d3.scale.linear()
                .domain(d3.extent(data, getDate))
                .range([0, chartWidth]);

            yScale = d3.scale.linear()
                .domain(d3.extent(data, getValue))
                .range([chartHeight, 0]);
        }

        /**
         * Builds the SVG element that will contain the chart
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @private
         */
        function buildSVG(container){
            if (!svg) {
                svg = d3.select(container)
                    .append('svg')
                    .classed('britechart sparkline', true);

                buildContainerGroups();
            }

            svg
                .transition()
                .ease(ease)
                .attr({
                    width: width,
                    height: height
                });
        }

        /**
         * Cleaning data adding the proper format
         * @param  {array} data Data
         * @private
         */
        function cleanData(data) {
            return data.map((d) => {
                d.date = new Date(d[dateLabel]);
                d[valueLabel] = +d[valueLabel];

                return d;
            });
        }

        /**
         * Creates the gradient on the area below the line
         * @return {void}
         */
        function createGradients() {
            let metadataGroup = svg.select('.metadata-group');

            metadataGroup.append('linearGradient')
                .attr('id', 'sparkline-area-gradient')
                .attr('gradientUnits', 'userSpaceOnUse')
                .attr('x1', 0)
                .attr('x2', xScale(data[data.length - 1].date))
                .attr('y1', 0)
                .attr('y2', 0)
              .selectAll('stop')
                .data([
                    {offset: '0%', color: '#F5FDFF'},
                    {offset: '100%', color: '#F6FEFC'}
                ])
              .enter().append('stop')
                .attr('offset', ({offset}) => offset)
                .attr('stop-color', ({color}) => color);

            metadataGroup.append('linearGradient')
                .attr('id', 'sparkline-line-gradient')
                .attr('gradientUnits', 'userSpaceOnUse')
                .attr('x1', 0)
                .attr('x2', xScale(data[data.length - 1].date))
                .attr('y1', 0)
                .attr('y2', 0)
              .selectAll('stop')
                .data([
                    {offset: '0%', color: '#39C7EA'},
                    {offset: '100%', color: '#4CDCBA'}
                ])
              .enter().append('stop')
                .attr('offset', ({offset}) => offset)
                .attr('stop-color', ({color}) => color);
        }

        /**
         * Creates a masking clip that would help us fake an animation if the
         * proper flag is true
         *
         * @return {void}
         */
        function createMaskingClip() {
            if (isAnimated) {
                svg.select('.metadata-group')
                    .append('clipPath')
                    .attr('id', 'maskingClip')
                  .append('rect')
                    .attr('width', 0)
                    .attr('height', height);

                d3.select('#maskingClip rect')
                    .transition()
                    .ease(ease)
                    .duration(clipDuration)
                    .attr('width', width);
            }
        }

        /**
         * Draws the area that will be placed below the line
         * @private
         */
        function drawArea(){
            let area = d3.svg.area()
                .x((d) => xScale(d.date))
                .y0(() => yScale(0))
                .y1((d) => yScale(d[valueLabel]))
                .interpolate('basis');

            svg.select('.chart-group')
              .append('path')
                .datum(data)
                .attr('class', 'sparkline-area')
                .attr('d', area)
                .attr('clip-path', 'url(#maskingClip)');
        }

        /**
         * Draws the line element within the chart group
         * @private
         */
        function drawLine(){
            line = d3.svg.line()
                .interpolate('basis')
                .x((d) => xScale(d.date))
                .y((d) => yScale(d[valueLabel]));

            svg.select('.chart-group')
              .append('path')
                .datum(data)
                .attr('class', 'line')
                .attr('d', line)
                .attr('clip-path', 'url(#maskingClip)');
        }

        /**
         * Draws a marker at the end of the sparkline
         */
        function drawEndMarker(){
            svg.selectAll('.chart-group')
              .append('circle')
                .attr('class', 'sparkline-circle')
                .attr('cx', xScale(data[data.length - 1].date))
                .attr('cy', yScale(data[data.length - 1][valueLabel]))
                .attr('r', markerSize);
        }

        // Accessors
        /**
         * Gets or Sets the dateLabel of the chart
         * @param  {Number} _x Desired dateLabel for the graph
         * @return { dateLabel | module} Current dateLabel or Chart module to chain calls
         * @public
         */
        exports.dateLabel = function(_x) {
            if (!arguments.length) {
                return dateLabel;
            }
            dateLabel = _x;

            return this;
        };

        /**
         * Gets or Sets the duration of the animation
         * @param  {Number} _x Desired animation duration for the graph
         * @return { dateLabel | module} Current animation duration or Chart module to chain calls
         * @public
         */
        exports.duration = function(_x) {
            if (!arguments.length) {
                return clipDuration;
            }
            clipDuration = _x;

            return this;
        };

        /**
         * Gets or Sets the height of the chart
         * @param  {Number} _x Desired width for the graph
         * @return { height | module} Current height or Chart module to chain calls
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
         * Gets or Sets the isAnimated property of the chart
         * @param  {Boolean} _x Desired animation flag
         * @return { isAnimated | module} Current isAnimated flag or Chart module
         * @public
         */
        exports.isAnimated = function(_x) {
            if (!arguments.length) {
                return isAnimated;
            }
            isAnimated = _x;

            return this;
        };

        /**
         * Gets or Sets the margin of the chart
         * @param  {Object} _x Margin object to get/set
         * @return { margin | module} Current margin or Chart module to chain calls
         * @public
         */
        exports.margin = function(_x) {
            if (!arguments.length) {
                return margin;
            }
            margin = _x;

            return this;
        };

        /**
         * Gets or Sets the width of the chart
         * @param  {Number} _x Desired width for the graph
         * @return { width | module} Current width or Chart module to chain calls
         * @public
         */
        exports.width = function(_x) {
            if (!arguments.length) {
                return width;
            }
            width = _x;

            return this;
        };

        /**
         * Gets or Sets the valueLabel of the chart
         * @param  {Number} _x Desired valueLabel for the graph
         * @return { valueLabel | module} Current valueLabel or Chart module to chain calls
         * @public
         */
        exports.valueLabel = function(_x) {
            if (!arguments.length) {
                return valueLabel;
            }
            valueLabel = _x;

            return this;
        };


        /**
         * Chart exported to png and a download action is fired
         * @public
         */
        exports.exportChart = function(filename) {
            exportChart.call(exports, svg, filename);
        };

        return exports;
    };

});
