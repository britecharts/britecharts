define(function(require) {
    'use strict';

    const d3 = require('d3');


    /**
     * @typedef BrushChartData
     * @type {Object[]}
     * @property {Number} value        Value to chart (required)
     * @property {Date} date           Date of the value (required)
     *
     * @example
     * [
     *     {
     *         value: 1,
     *         date: '2011-01-06T00:00:00Z'
     *     },
     *     {
     *         value: 2,
     *         date: '2011-01-07T00:00:00Z'
     *     }
     * ]
     */

    /**
     * Brush Chart reusable API class that renders a
     * simple and configurable brush chart.
     *
     * @module Brush
     * @version 0.0.1
     * @tutorial brush
     * @requires d3
     *
     * @example
     * let brushChart = brush();
     *
     * brushChart
     *     .height(500)
     *     .width(800);
     *
     * d3.select('.css-selector')
     *     .datum(dataset)
     *     .call(brushChart);
     *
     */
    return function module() {

        let margin = {top: 20, right: 20, bottom: 40, left: 20},
            width = 960,
            height = 500,
            data,
            svg,

            ease = 'quad-out',

            dateLabel = 'date',
            valueLabel = 'value',

            chartWidth, chartHeight,
            xScale, yScale,
            xAxis,

            xAxisPadding = {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            },

            brush,
            chartBrush,

            onBrush = null,

            setBrushTransitionDuration = 500,
            setBrushTransitionDelay = 1000,

            gradientColorSchema = {
                left: '#39C7EA',
                right: '#4CDCBA'
            },

            // formats
            defaultTimeFormat = '%m/%d/%Y',
            xTickMonthFormat = d3.time.format('%b'),

            // extractors
            getValue = ({value}) => value,
            getDate = ({date}) => date;


        /**
         * This function creates the graph using the selection as container
         * @param  {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         * @param {BrushChartData} _data The data to attach and generate the chart
         */
        function exports(_selection){
            _selection.each(function(_data){
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = cleanData(cloneData(_data));

                buildScales();
                buildAxis();
                buildSVG(this);
                buildGradient();
                buildBrush();
                drawArea();
                drawAxis();
                drawBrush();

                // This last step is optional, just needed when
                // a given selection would need to be shown
                setBrush(0, 0.5);
            });
        }

        /**
         * Creates the d3 x axis, setting orientation
         * @private
         */
        function buildAxis(){
            xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom')
                .tickFormat(xTickMonthFormat);
        }

        /**
         * Creates the brush element and attaches a listener
         * @return {void}
         */
        function buildBrush() {
            brush = d3.svg.brush()
                .x(xScale)
                .on('brush', handleBrush);
        }

        /**
         * Builds containers for the chart, the axis and a wrapper for all of them
         * Also applies the Margin convention
         * @private
         */
        function buildContainerGroups(){
            let container = svg.append('g')
                .classed('container-group', true)
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            container
              .append('g')
                .classed('chart-group', true);
            container
              .append('g')
                .classed('metadata-group', true);
            container
              .append('g')
                .classed('x-axis-group', true);
            container
              .append('g')
                .classed('brush-group', true);
        }

        /**
         * Creates the gradient on the area
         * @return {void}
         */
        function buildGradient() {
            let metadataGroup = svg.select('.metadata-group');

            metadataGroup.append('linearGradient')
                .attr('id', 'brush-area-gradient')
                .attr('gradientUnits', 'userSpaceOnUse')
                .attr('x1', 0)
                .attr('x2', xScale(data[data.length - 1].date))
                .attr('y1', 0)
                .attr('y2', 0)
              .selectAll('stop')
                .data([
                    {offset: '0%', color: gradientColorSchema.left},
                    {offset: '100%', color: gradientColorSchema.right}
                ])
              .enter().append('stop')
                .attr('offset', ({offset}) => offset)
                .attr('stop-color', ({color}) => color);
        }

        /**
         * Creates the x and y scales of the graph
         * @private
         */
        function buildScales(){
            xScale = d3.time.scale()
                .domain(d3.extent(data, getDate ))
                .range([0, chartWidth]);

            yScale = d3.scale.linear()
                .domain([0, d3.max(data, getValue)])
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
                    .classed('britechart brush-chart', true);

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
         *
         * @param  {BrushChartData} data Data
         */
        function cleanData(data) {
            let parseDate = d3.time.format(defaultTimeFormat).parse;

            return data.map(function (d) {
                d.date = parseDate(d[dateLabel]);
                d.value = +d[valueLabel];

                return d;
            });
        }

        /**
         * Clones the passed array of data
         * @param  {Object[]} dataToClone Data to clone
         * @return {Object[]}             Cloned data
         */
        function cloneData(dataToClone) {
            return JSON.parse(JSON.stringify(dataToClone));
        }

        /**
         * Draws the x axis on the svg object within its group
         *
         * @private
         */
        function drawAxis(){
            svg.select('.x-axis-group')
              .append('g')
                .attr('class', 'x axis')
                .attr('transform', `translate(0, ${chartHeight})`)
                .call(xAxis);
        }

        /**
         * Draws the area that is going to represent the data
         *
         * @return {void}
         */
        function drawArea() {
            // Create and configure the area generator
            let area = d3.svg.area()
                .x(({date}) => xScale(date))
                .y0(chartHeight)
                .y1(({value}) => yScale(value))
                .interpolate('basis');

            // Create the area path
            svg.select('.chart-group')
              .append('path')
                .datum(data)
                .attr('class', 'brush-area')
                .attr('d', area);
        }

        /**
         * Draws the Brush components on its group
         * @return {void}
         */
        function drawBrush() {
            chartBrush = svg.select('.brush-group')
                                .call(brush);

            // Update the height of the brushing rectangle
            chartBrush.selectAll('rect')
                .classed('brush-rect', true)
                .attr('height', chartHeight);
        }

        /**
         * When a brush event happens, we can extract info from the extension
         * of the brush.
         *
         * @return {void}
         */
        function handleBrush() {
            let brushExtent = d3.event.target.extent();

            if (typeof onBrush === 'function') {
                onBrush.call(null, brushExtent);
            }
        }

        /**
         * Sets a new brush extent within the passed percentage positions
         * @param {Number} a Percentage of data that the brush start with
         * @param {Number} b Percentage of data that the brush ends with
         */
        function setBrush(a, b) {
            let x0 = xScale.invert(a * chartWidth),
                x1 = xScale.invert(b * chartWidth);

            brush.extent([x0, x1]);

            // now draw the brush to match our extent
            brush(d3.select('.brush-group').transition().duration(setBrushTransitionDuration));

            // now fire the brushstart, brushmove, and brushend events
            // set transition the delay and duration to 0 to draw right away
            brush.event(d3.select('.brush-group').transition().delay(setBrushTransitionDelay).duration(setBrushTransitionDuration));
        }


        /**
         * Gets or Sets the height of the chart
         * @param  {number} _x Desired width for the graph
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
         * Gets or Sets the margin of the chart
         * @param  {object} _x Margin object to get/set
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
         * Gets or Sets the callback that will be called when the user brushes over the area
         * @param  {Function} _x Callback to call
         * @return {Function | module}    Current callback function or the Chart Module
         */
        exports.onBrush = function(_x) {
            if (!arguments.length) return onBrush;
            onBrush = _x;

            return this;
        };

        /**
         * Gets or Sets the width of the chart
         * @param  {number} _x Desired width for the graph
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
        return exports;
    };

});
