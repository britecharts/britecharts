define(function(require){
    'use strict';

    const d3 = require('d3');
    const exportChart = require('./helpers/exportChart');

    /**
     * @typdef D3Layout
     * @type function
     */

    /**
     * @fileOverview Sparkline Chart reusable API module that allows us
     * rendering a sparkline configurable chart.
     *
     * @tutorial sparkline
     * @exports charts/sparkline
     * @requires d3
     * @version 0.0.1
     */
    return function module(){

        let type = "sparkline",
            margin = {
                left: 5,
                right: 5,
                top: 5,
                bottom: 5
            },
            width = 100,
            height = 30,

            xScale,
            yScale,

            ease = 'quad-out',

            svg,
            chartWidth, chartHeight,
            data,

            line,

            markerSize = 1.5,

            valueLabel = 'views',
            dateLabel = 'date',

            // getters
            getDate = d => d.date,
            getValue = d => d[valueLabel];

        /**
         * This function creates the graph using the selection and data provided
         * @param  {D3Selection} _selection A d3 selection that represents
         * the container(s) where the chart(s) will be rendered
         */
        function exports(_selection) {
            /** @param {object} _data The data to attach and generate the chart */
            _selection.each(function(_data){
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = cleanData(_data);

                buildScales();
                buildSVG(this);
                drawLine();
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
            data.forEach(function(d){
                d.date = new Date (d[dateLabel]);
                d[valueLabel] = +d[valueLabel];
            });

            return data;
        }

        /**
         * Draws the line element within the chart group
         * @private
         */
        function drawLine(){
            line = d3.svg.line()
                .interpolate('basis')
                .x(function(d) {
                    return xScale(d.date);
                })
                .y(function(d) {
                    return yScale(d[valueLabel]);
                });

            svg
                .select('.chart-group')
                .append('path')
                .datum(data)
                .attr('class', 'line')
                .attr('d', line);
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
         * Gets or Sets the height of the chart
         * @param  {number} _x Desired width for the graph
         * @return { height | module} Current height or Area Chart module to chain calls
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
         * @return { margin | module} Current margin or Area Chart module to chain calls
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
         * @return { width | module} Current width or Area Chart module to chain calls
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
         * @param  {number} _x Desired valueLabel for the graph
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
         * Gets or Sets the dateLabel of the chart
         * @param  {number} _x Desired dateLabel for the graph
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
         * Chart exported to png and a download action is fired
         * @public
         */
        exports.exportChart = function(filename) {
            exportChart.call(exports, svg, filename);
        };

        return exports;
    };

});
