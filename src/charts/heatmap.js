define(function (require) {
    'use strict';

    const d3Array = require('d3-array');
    const d3Selection = require('d3-selection');
    const d3Scale = require('d3-scale');
    const d3Transition = require('d3-transition');
    const d3Interpolate = require('d3-interpolate');

    const { exportChart } = require('./helpers/export');
    const colorHelper = require('./helpers/color');

    /**
     * @typedef HeatmapData
     * @type {Array[]}
     * @property {Number} week
     * @property {Number} day
     * @property {Number} value
     *
     * @example
     * [
     *     {
     *         day: 0,
     *         hour: 0,
     *         value: 7
     *     },
     *     {
     *         day: 0,
     *         hour: 1,
     *         value: 10
     *     }
     * ]
     */

    /**
     * Reusable Heatmap API module that renders a
     * simple and configurable heatmap chart.
     *
     * @module Heatmap
     * @tutorial heatmap
     * @requires d3-array, d3-selection, d3-scale, d3-interpolate, d3-transition
     *
     * @example
     * let heatmap = heatmap();
     *
     * heatmap
     *     .width(500);
     *
     * d3Selection.select('.css-selector')
     *     .datum(dataset)
     *     .call(heatmap);
     */
    return function module() {

        let margin = {
                top: 40,
                right: 20,
                bottom: 20,
                left: 40
            },
            width = 780,
            height = 270,
            svg,
            data,
            chartWidth,
            chartHeight,

            boxes,
            boxSize = 30,
            boxBorderSize = 2,
            boxInitialOpacity = 0.2,
            boxFinalOpacity = 1,
            boxInitialColor = '#BBBBBB',
            boxBorderColor = '#FFFFFF',

            colorScale,
            colorSchema = colorHelper.colorSchemas.red,

            animationDuration = 2000,

            dayLabels,
            daysHuman = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            dayLabelWidth = 30,

            hourLabels,
            hoursHuman = [
                '00h', '01h', '02h', '03h', '04h', '05h', '06h', '07h', '08h',
                '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h',
                '18h', '19h', '20h', '21h', '22h', '23h'
            ],
            hourLabelHeight = 20,

            getValue = ({value}) => value;

        /**
         * This function creates the graph using the selection as container
         * @param  {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         * @param {HeatmapData} _data The data to attach and generate the chart
         */
        function exports(_selection) {
            _selection.each(function (_data) {
                data = cleanData(_data);

                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;

                buildScales();
                buildSVG(this);
                drawDayLabels();
                drawHourLabels();
                drawBoxes();
            });
        }

        /**
         * Builds the SVG element that will contain the chart
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @return {void}
         * @private
         */
        function buildSVG(container) {
            if (!svg) {
                svg = d3Selection.select(container)
                    .append('svg')
                    .classed('britechart heatmap', true);

                buildContainerGroups();
            }

            svg
                .attr('width', width)
                .attr('height', height);
        }

        /**
         * Builds containers for the chart, the axis and a wrapper for all of them
         * Also applies the Margin convention
         * @return {void}
         * @private
         */
        function buildContainerGroups() {
            let container = svg
              .append('g')
                .classed('container-group', true)
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            container
                .append('g').classed('chart-group', true);
            container
                .append('g').classed('day-labels-group', true);
            container
                .append('g').classed('hour-labels-group', true);
            container
                .append('g').classed('metadata-group', true);
        }

        /**
         * Cleaning data casting the values to the proper
         * type while keeping the rest of properties on the data. It
         * also creates a set of zeroed data (for animation purposes)
         * @param   {HeatmapData} originalData  Raw data as passed to the container
         * @return  {HeatmapData}               Clean data
         * @private
         */
        function cleanData(originalData) {
            return originalData.reduce((acc, {day, hour, value}) => {
                return [
                    ...acc,
                    {
                        day: +day,
                        hour: +hour,
                        value: +value
                    }
                ];
            }, []);
        }

        /**
         * Creates the scales for the heatmap chart
         * @return void
         */
        function buildScales() {
            colorScale = d3Scale.scaleLinear()
                .range([colorSchema[0], colorSchema[colorSchema.length - 1]])
                .domain(d3Array.extent(data, getValue))
                .interpolate(d3Interpolate.interpolateHcl);
        }

        /**
         * Draws the boxes of the heatmap
         */
        function drawBoxes() {
            boxes = svg.select('.chart-group').selectAll('.box').data(data);

            boxes.enter()
              .append('rect')
                .classed('box', true)
                .attr('width', boxSize)
                .attr('height', boxSize)
                .attr('x', ({hour}) => hour * boxSize)
                .attr('y', ({day}) => day * boxSize)
                .style('opacity', boxInitialOpacity)
                .style('fill', boxInitialColor)
                .style('stroke', boxBorderColor)
                .style('stroke-width', boxBorderSize)
                .transition()
                    .duration(animationDuration)
                    .style('fill', ({value}) => colorScale(value))
                    .style('opacity', boxFinalOpacity);

            boxes.exit().remove();
        }

        /**
         * Draws the day labels
         */
        function drawDayLabels() {
            let dayLabelsGroup = svg.select('.day-labels-group');

            dayLabels = svg.select('.day-labels-group').selectAll('.day-label')
                .data(daysHuman);

            dayLabels.enter()
              .append('text')
                .text((label) => label)
                .attr('x', 0)
                .attr('y', (d, i) => i * boxSize)
                .style('text-anchor', 'start')
                .style('dominant-baseline', 'central')
                .attr('class', 'day-label');

            dayLabelsGroup.attr('transform', `translate(-${dayLabelWidth}, ${boxSize / 2})`);
        }

        /**
         * Draws the hour labels
         */
        function drawHourLabels() {
            let hourLabelsGroup = svg.select('.hour-labels-group');

            hourLabels = svg.select('.hour-labels-group').selectAll('.hour-label')
                .data(hoursHuman);

            hourLabels.enter()
              .append('text')
                .text((label) => label)
                .attr('y', 0)
                .attr('x', (d, i) => i * boxSize)
                .style('text-anchor', 'middle')
                .style('dominant-baseline', 'central')
                .attr('class', 'hour-label');

            hourLabelsGroup.attr('transform', `translate(${boxSize / 2}, -${hourLabelHeight})`);
        }

        // API
        /**
         * Gets or Sets the boxSize of the chart
         * @param  {Number} _x=30       Desired boxSize for the heatmap boxes
         * @return {Number | module}    Current boxSize or Chart module to chain calls
         * @public
         */
        exports.boxSize = function (_x) {
            if (!arguments.length) {
                return boxSize;
            }
            boxSize = _x;

            return this;
        };

        /**
         * Gets or Sets the colorSchema of the chart
         * @param  {String[]} _x=britecharts-red  Desired colorSchema for the heatma boxes
         * @return {String[] | module}            Current colorSchema or Chart module to chain calls
         * @public
         */
        exports.colorSchema = function (_x) {
            if (!arguments.length) {
                return colorSchema;
            }
            colorSchema = _x;

            return this;
        };

        /**
         * Chart exported to png and a download action is fired
         * @param {String} filename     File title for the resulting picture
         * @param {String} title        Title to add at the top of the exported picture
         * @public
         */
        exports.exportChart = function (filename, title) {
            exportChart.call(exports, svg, filename, title);
        };

        /**
         * Gets or Sets the height of the chart
         * @param  {Number} _x          Desired height for the chart
         * @return {Number | module}    Current height or Chart module to chain calls
         * @public
         */
        exports.height = function (_x) {
            if (!arguments.length) {
                return height;
            }
            height = _x;

            return this;
        };

        /**
         * Gets or Sets the margin of the chart
         * @param  {Object} _x          Margin object to get/set
         * @return {margin | module}    Current margin or Chart module to chain calls
         * @public
         */
        exports.margin = function (_x) {
            if (!arguments.length) {
                return margin;
            }
            margin = {
                ...margin,
                ..._x
            };

            return this;
        };

        /**
         * Gets or Sets the width of the chart
         * @param  {Number} _x           Desired width for the chart
         * @return {Number | module}     Current width or Chart module to chain calls
         * @public
         */
        exports.width = function (_x) {
            if (!arguments.length) {
                return width;
            }
            width = _x;

            return this;
        };

        return exports;
    };
});
