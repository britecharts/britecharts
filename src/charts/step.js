define(function(require) {
    'use strict';

    const d3 = require('d3');
    const exportChart = require('./helpers/exportChart');

    /**
     * @typedef D3Selection
     * @type Array[]
     */

    /**
     * @typedef ChartData
     * @type Object[]
     *
     * @param {String} key      Key we measure
     * @param {Number} value    value of the key
     */

    /**
     * Step Chart reusable API class that renders a
     * simple and configurable step chart.
     *
     * @module Step
     * @version 0.1.0
     * @tutorial step
     * @requires d3
     *
     * @example
     * var stepChart= step();
     *
     * stepChart
     *     .height(500)
     *     .width(800);
     *
     * d3.select('.css-selector')
     *     .datum(dataset)
     *     .call(stepChart);
     *
     */
    return function module() {

        let margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960,
            height = 500,
            ease = 'ease',
            data,
            chartWidth, chartHeight,
            xScale, yScale,
            numOfVerticalTicks = 6,
            xAxis, yAxis,
            xAxisPadding = {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            },
            svg,

            maskGridLines,
            baseLine,

            // Dispatcher object to broadcast the 'customHover' event
            // Ref: https://github.com/mbostock/d3/wiki/Internals#d3_dispatch
            dispatch = d3.dispatch('customHover'),

            // extractors
            getKey = d => d.key,
            getValue = d => d.value;


        /**
         * This function creates the graph using the selection as container
         * @param  {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         * @param {ChartData} _data The data to attach and generate the chart
         */
        function exports(_selection){
            _selection.each(function(_data){
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = _data;

                buildScales();
                buildAxis();
                buildSVG(this);
                drawGridLines();
                drawSteps();
                drawAxis();
            });
        }

        /**
         * Creates the d3 x and y axis, setting orientations
         * @private
         */
        function buildAxis(){
            xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom');

            yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left')
                .ticks(numOfVerticalTicks);
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
                .append('g').classed('grid-lines-group', true);
            container
                .append('g').classed('chart-group', true);
            container
                .append('g').classed('x-axis-group axis', true);
            container
                .append('g').classed('y-axis-group axis', true);
        }

        /**
         * Creates the x and y scales of the graph
         * @private
         */
        function buildScales(){
            xScale = d3.scale.ordinal()
                .domain(data.map(getKey))
                .rangeRoundBands([0, chartWidth]);

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
                    .classed('britechart step-chart', true);

                buildContainerGroups();
            }

            svg
                .transition()
                .ease(ease)
                .attr({
                    width: width + margin.left + margin.right,
                    height: height + margin.top + margin.bottom
                });
        }

        /**
         * Draws the x and y axis on the svg object within their
         * respective groups
         * @private
         */
        function drawAxis(){
            svg.select('.x-axis-group.axis')
                .transition()
                .ease(ease)
                .attr('transform', `translate(0, ${chartHeight})`)
                .call(xAxis);

            svg.select('.y-axis-group.axis')
                .call(yAxis);
        }

        /**
         * Draws the step elements within the chart group
         * @private
         */
        function drawSteps(){
            let stepW = xScale.rangeBand(),
                steps = svg.select('.chart-group').selectAll('.step').data(data);

            // Enter
            steps.enter()
                .append('rect')
                .classed('step', true)
                .attr({
                    width: stepW,
                    x: chartWidth, // Initially drawing the steps at the end of Y axis
                    y: ({value}) => yScale(value),
                    height: function(d) { return chartHeight - yScale(d.value); }
                })
                .on('mouseover', dispatch.customHover);

            // Update
            steps.transition()
                .ease(ease)
                .attr({
                    width: stepW,
                    x: ({key}) => xScale(key),
                    y: function(d) { return yScale(d.value); },
                    height: function(d) { return chartHeight - yScale(d.value); }
                });

            // Exit
            steps.exit()
                .transition().style({ opacity: 0 }).remove();
        }

        /**
         * Draws grid lines on the background of the chart
         * @return void
         */
        function drawGridLines(){
            maskGridLines = svg.select('.grid-lines-group')
                .selectAll('line.horizontal-grid-line')
                .data(yScale.ticks(numOfVerticalTicks))
                .enter()
                    .append('line')
                    .attr({
                        class: 'horizontal-grid-line',
                        x1: (xAxisPadding.left),
                        x2: chartWidth,
                        y1: (d) => yScale(d),
                        y2: (d) => yScale(d)
                    });

            //draw a horizontal line to extend x-axis till the edges
            baseLine = svg.select('.grid-lines-group')
                .selectAll('line.extended-x-line')
                .data([0])
                .enter()
                    .append('line')
                    .attr({
                        class: 'extended-x-line',
                        x1: (xAxisPadding.left),
                        x2: chartWidth,
                        y1: height - margin.bottom - margin.top,
                        y2: height - margin.bottom - margin.top
                    });
        }

        /**
         * Gets or Sets the margin of the chart
         * @param  {object} _x Margin object to get/set
         * @return { margin | module} Current margin or Step Chart module to chain calls
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
         * @param  {number} _x Desired width for the graph
         * @return { width | module} Current width or step Chart module to chain calls
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
         * Gets or Sets the height of the chart
         * @param  {number} _x Desired width for the graph
         * @return { height | module} Current height or Step Chart module to chain calls
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
         * Gets or Sets the number of vertical ticks on the chart
         * @param  {number} _x Desired width for the graph
         * @return { height | module} Current height or Step Chart module to chain calls
         * @public
         */
        exports.numOfVerticalTicks = function(_x) {
            if (!arguments.length) {
                return numOfVerticalTicks;
            }
            numOfVerticalTicks = _x;
            return this;
        };

        /**
         * Chart exported to png and a download action is fired
         * @public
         */
        exports.exportChart = function(filename) {
            exportChart.call(exports, svg, filename);
        };

        // Copies the method "on" from dispatch to exports, making it accesible
        // from outside
        // Reference: https://github.com/mbostock/d3/wiki/Internals#rebind
        d3.rebind(exports, dispatch, 'on');

        return exports;
    };

});
