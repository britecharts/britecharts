define(function(require){
    'use strict';

    const d3Array = require('d3-array');
    const d3Ease = require('d3-ease');
    const d3Scale = require('d3-scale');
    const d3Shape = require('d3-shape');
    const d3Selection = require('d3-selection');
    const d3Transition = require('d3-transition');

    const {exportChart} = require('./helpers/exportChart');
    const colorHelper = require('./helpers/colors');

    const {uniqueId} = require('./helpers/common');

    /**
     * @typedef SparklineChartData
     * @type {Object[]}
     * @property {Number} value        Value of the group (required)
     * @property {String} name         Name of the group (required)
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
     * Sparkline Chart reusable API module that allows us
     * rendering a sparkline configurable chart.
     *
     * @module Sparkline
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
     * d3Selection.select('.css-selector')
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

            areaGradient = ['#F5FDFF', '#F6FEFC'],
            areaGradientEl,
            areaGradientId = uniqueId('sparkline-area-gradient'),

            lineGradient = colorHelper.colorGradients.greenBlue,
            lineGradientEl,
            lineGradientId = uniqueId('sparkline-line-gradient'),

            maskingClip,
            maskingClipId = uniqueId('maskingClip'),

            svg,
            chartWidth, chartHeight,
            data,

            hasArea = true,
            isAnimated = false,
            clipDuration = 3000,
            ease = d3Ease.easeQuadInOut,

            line,
            area,
            circle,

            markerSize = 1.5,

            valueLabel = 'value',
            dateLabel = 'date',

            // getters
            getDate = ({date}) => date,
            getValue = ({value}) => value;

        /**
         * This function creates the graph using the selection and data provided
         *
         * @param {D3Selection} _selection A d3 selection that represents
         * the container(s) where the chart(s) will be rendered
         * @param {SparklineChartData} _data The data to attach and generate the chart
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
            let container = svg
              .append('g')
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
            xScale = d3Scale.scaleLinear()
                .domain(d3Array.extent(data, getDate))
                .range([0, chartWidth]);

            yScale = d3Scale.scaleLinear()
                .domain(d3Array.extent(data, getValue))
                .range([chartHeight, 0]);
        }

        /**
         * Builds the SVG element that will contain the chart
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @private
         */
        function buildSVG(container){
            if (!svg) {
                svg = d3Selection.select(container)
                    .append('svg')
                    .classed('britechart sparkline', true);

                buildContainerGroups();
            }

            svg
                .attr('width', width)
                .attr('height', height);
        }

        /**
         * Cleaning data casting the values and dates to the proper type while keeping
         * the rest of properties on the data
         * @param  {SparklineChartData} originalData    Raw data from the container
         * @return {SparklineChartData}                 Clean data
         * @private
         */
        function cleanData(originalData) {
            return originalData.reduce((acc, d) => {
                d.date = new Date(d[dateLabel]);
                d.value = +d[valueLabel];

                return [...acc, d];
            }, []);
        }

        /**
         * Creates the gradient on the area below the line
         * @return {void}
         */
        function createGradients() {
            let metadataGroup = svg.select('.metadata-group');

            if (areaGradientEl || lineGradientEl) {
                svg.selectAll(`#${areaGradientId}`).remove();
                svg.selectAll(`#${lineGradientId}`).remove();
            }

            areaGradientEl = metadataGroup.append('linearGradient')
                .attr('id', areaGradientId)
                .attr('class', 'area-gradient')
                .attr('gradientUnits', 'userSpaceOnUse')
                .attr('x1', 0)
                .attr('x2', xScale(data[data.length - 1].date))
                .attr('y1', 0)
                .attr('y2', 0)
              .selectAll('stop')
                .data([
                    {offset: '0%', color: areaGradient[0]},
                    {offset: '100%', color: areaGradient[1]}
                ])
              .enter().append('stop')
                .attr('offset', ({offset}) => offset)
                .attr('stop-color', ({color}) => color);

            lineGradientEl = metadataGroup.append('linearGradient')
                .attr('id', lineGradientId)
                .attr('class', 'line-gradient')
                .attr('gradientUnits', 'userSpaceOnUse')
                .attr('x1', 0)
                .attr('x2', xScale(data[data.length - 1].date))
                .attr('y1', 0)
                .attr('y2', 0)
              .selectAll('stop')
                .data([
                    {offset: '0%', color: lineGradient[0]},
                    {offset: '100%', color: lineGradient[1]}
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
            if (maskingClip) {
                svg.selectAll(`#${maskingClipId}`).remove();
            }

            if (isAnimated) {
                maskingClip = svg.select('.metadata-group')
                  .append('clipPath')
                    .attr('id', maskingClipId)
                    .attr('class', 'clip-path')
                      .append('rect')
                        .attr('width', 0)
                        .attr('height', height);

                d3Selection.select(`#${maskingClipId} rect`)
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
            if (area) {
                svg.selectAll('.sparkline-area').remove();
            }

            area = d3Shape.area()
                .x(({date}) => xScale(date))
                .y0(() => yScale(0))
                .y1(({value}) => yScale(value))
                .curve(d3Shape.curveBasis);

            svg.select('.chart-group')
              .append('path')
                .datum(data)
                .attr('class', 'sparkline-area')
                .attr('fill', `url(#${areaGradientId})`)
                .attr('d', area)
                .attr('clip-path', `url(#${maskingClipId})`);
        }

        /**
         * Draws the line element within the chart group
         * @private
         */
        function drawLine(){
            if (line) {
                svg.selectAll('.line').remove();
            }

            line = d3Shape.line()
                .curve(d3Shape.curveBasis)
                .x(({date}) => xScale(date))
                .y(({value}) => yScale(value));

            svg.select('.chart-group')
              .append('path')
                .datum(data)
                .attr('class', 'line')
                .attr('stroke', `url(#${lineGradientId})`)
                .attr('d', line)
                .attr('clip-path', `url(#${maskingClipId})`);
        }

        /**
         * Draws a marker at the end of the sparkline
         */
        function drawEndMarker(){
            if (circle) {
                svg.selectAll('.sparkline-circle').remove();
            }

            circle = svg.selectAll('.chart-group')
              .append('circle')
                .attr('class', 'sparkline-circle')
                .attr('cx', xScale(data[data.length - 1].date))
                .attr('cy', yScale(data[data.length - 1].value))
                .attr('r', markerSize);
        }

        // API

        /**
         * Gets or Sets the areaGradient of the chart
         * @param  {String[]} _x Desired areaGradient for the graph
         * @return { areaGradient | module} Current areaGradient or Chart module to chain calls
         * @public
         */
        exports.areaGradient = function(_x) {
            if (!arguments.length) {
                return areaGradient;
            }
            areaGradient = _x;
            return this;
        };

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
         * Chart exported to png and a download action is fired
         * @param {String} filename     File title for the resulting picture
         * @param {String} title        Title to add at the top of the exported picture
         * @public
         */
        exports.exportChart = function(filename, title) {
            exportChart.call(exports, svg, filename, title);
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
         * Gets or Sets the isAnimated property of the chart, making it to animate when render.
         * By default this is 'false'
         *
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
         * Gets or Sets the lineGradient of the chart
         * @param  {String[]} _x Desired lineGradient for the graph
         * @return { lineGradient | module} Current lineGradient or Chart module to chain calls
         * @public
         */
        exports.lineGradient = function(_x) {
            if (!arguments.length) {
                return lineGradient;
            }
            lineGradient = _x;
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

        return exports;
    };

});
