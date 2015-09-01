
define(function(require){
    'use strict';

    var d3 = require('d3');

    /**
     * @fileOverview Line Chart reusable API module that allows us
     * rendering a multi line and configurable chart.
     *
     * @tutorial using-line-chart
     * @exports charts/line
     * @requires d3
     * @version 0.0.1
     */
    return function module(){

        var margin = {top: 60, right: 0, bottom: 60, left: 0},
            colorRange = ['#00A8F2', '#00CC52', '#FFDB00', '#F20CB6', '#8400FF', '#051C48'],
            width = 960,
            height = 500,
            yAxisPadding = {
                top: 0,
                left: 35,
                bottom: 0,
                right: 0
            },
            numVerticalTics = 5,
            data,
            dataByDate,
            chartWidth, chartHeight,
            xScale, yScale, colorScale,
            xAxis, yAxis,
            maskGridLines,
            svg,
            overlay,
            focus,
            lineInterpolation = 'basis',
            // extractors
            getDate = function(d) { return d.date; },
            getValue = function(d) { return d.value; },
            getTopic = function(d) { return d.topic; },
            // formats
            yTickNumberFormat = d3.format('s'),
            xTickDateFormat = d3.time.format('%e'),
            // events
            dispatch = d3.dispatch('customHover');

        /**
         * Creates the d3 x and y axis, setting orientations
         * @private
         */
        function buildAxis(){
            xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom')
                .ticks(getMaxNumOfHorizontalTicks(width, dataByDate.length))
                .tickSize(10, 0).tickPadding(5)
                .tickFormat(xTickDateFormat);

            yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left')
                .ticks(numVerticalTics)
                .tickSize([0])
                .tickPadding([4])
                .tickFormat(yTickNumberFormat);
        }

        /**
         * Calculates the maximum number of ticks for the x axis
         * @param  {number} width Chart width
         * @param  {number} dataPointNumber  Number of entries on the data
         * @return {number}       Number of ticks to render
         */
        function getMaxNumOfHorizontalTicks(width, dataPointNumber) {
            var singleTickWidth = 20,
                spacing = 40,
                ticksForWidth = Math.ceil(width / (singleTickWidth + spacing));

            return Math.min(dataPointNumber, ticksForWidth);
        }

        /**
         * Builds containers for the chart, the axis and a wrapper for all of them
         * @private
         */
        function buildContainerGroups(){
            var container = svg.append('g').classed('container-group', true);

            container.append('g').classed('chart-group', true);
            container.append('g').classed('x-axis-group', true);
            container.append('g').classed('y-axis-group', true);
            container.append('g').classed('grid-lines-group', true);
            container.append('g').classed('metadata-group', true);
        }

        /**
         * Creates the x and y scales of the graph
         * @private
         */
        function buildScales(){
            var minX = d3.min(data, function(kv) {
                    return d3.min(kv.Data, getDate);
                }),
                maxX = d3.max(data, function(kv) { return d3.max(kv.Data, getDate); }),
                minY = d3.min(data, function(kv) { return d3.min(kv.Data, getValue); }),
                maxY = d3.max(data, function(kv) { return d3.max(kv.Data, getValue); });

            xScale = d3.time.scale()
                .rangeRound([60, chartWidth - 20])
                .domain([minX, maxX]);

            yScale = d3.scale.linear()
                .rangeRound([chartHeight, 0])
                .domain([Math.abs(minY), Math.abs(maxY)])
                .nice(3);

            colorScale = d3.scale.ordinal()
                .range(colorRange)
                .domain(data.map(getTopic));
        }

        /**
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @private
         */
        function buildSVG(container){
            if (!svg) {
                svg = d3.select(container)
                    .append('svg')
                    .classed('britechart', true)
                    .classed('line-chart', true);
            }
            svg.attr({
                width: width + margin.left + margin.right,
                height: height + margin.top + margin.bottom
            });
        }

        /**
         * @description
         * Draws the x and y axis on the svg object within their
         * respective groups
         * @private
         */
        function drawAxis(){
            svg.select('.x-axis-group')
                .append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + chartHeight + ')')
                .call(xAxis);

            svg.select('.y-axis-group')
                .append('g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(' + yAxisPadding.left + ', 0)')
                .call(yAxis);
        }

        /**
         * Draws the line elements within the chart group
         * @private
         */
        function drawLines(){
            var lines,
                topicLine;

            topicLine = d3.svg.line()
                .x(function(d) {
                    return xScale(d.date);
                })
                .y(function(d) { return yScale(d.value); })
                .interpolate(lineInterpolation);

            lines = svg.select('.chart-group').selectAll('.line')
                .data(data)
                .enter()
                .append('g')
                .attr('class', 'topic');

            lines.append('path')
                .attr('class', 'line')
                .attr('d', function(d) {
                    return topicLine(d.Data);
                })
                .style({
                    'stroke': function(d) { return colorScale(d.topic); }
                });
        }

        /**
         * Draws grid lines on the background of the chart
         * @return void
         */
        function drawGridLines(){
            maskGridLines = svg.select('.grid-lines-group')
                .selectAll('line.horizontal-grid-line')
                .data(yScale.ticks(5))
                .enter()
                    .append('line')
                    .attr({
                        'class': 'horizontal-grid-line',
                        'x1': 0,
                        'x2': chartWidth + 20,
                        'y1': function(d) { return yScale(d); },
                        'y2': function(d) { return yScale(d); }
                    });
        }

        /**
         * Draws an overlay element over the graph
         * @inner
         * @return void
         */
        function drawHoverOverlay(){
            overlay = svg.select('.metadata-group').append('rect')
                .attr('class','overlay')
                .attr('y1', 0)
                .attr('y2', height)
                .attr('height', height)
                .attr('width', width)
                .attr('fill','rgba(65, 72, 83, 0.12)')
                .style('display', 'none');
        }

        /**
         * This function creates the graph using the selection and data provided
         * @param  {D3Selection} _selection A d3 selection that represents
         * the container(s) where the chart(s) will be rendered
         */
        function exports(_selection){
            /** @param {object} _data The data to attach and generate the chart */
            _selection.each(function(_data){
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = _data.data;
                dataByDate = _data.dataByDate;

                buildScales();
                buildAxis();
                buildSVG(this);
                buildContainerGroups();

                drawGridLines();
                drawAxis();
                drawLines();

                addMouseEvents();
                drawHoverOverlay();
                prepareTooltip();
            });
        }

        function prepareTooltip(){
        }

        function addMouseEvents(){
            svg.select('.container-group')
                .on('mouseover', handleMouseOver)
                .on('mouseout', handleMouseOut)
                .on('mousemove', handleMouseMove);
        }

        function handleMouseOver(){
            console.log('MouseOver!');
            overlay.style('display', null);
        }

        function handleMouseOut(){
            console.log('MouseOut!');
            overlay.style('display', 'none');
        }

        function handleMouseMove(){
            console.log('MouseMove!');
        }

        // function listenToEvents(){
        //     exports.on('customHover', function(){
        //         console.log('hey!');
        //     });
        // }

        /**
         * Gets or Sets the margin of the chart
         * @param  {object} _x Margin object to get/set
         * @return { margin | module} Current margin or Line Chart module to chain calls
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
         * @return { width | module} Current width or Line Chart module to chain calls
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
         * @return { height | module} Current height or Line Chart module to chain calls
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
         * Gets or Sets the line's interpolation mode
         * @param  {string} _x Desired interpolation mode for the lines
         * @return { lineInterpolation | module} Current lineInterpolation or Line Chart module to chain calls
         * @public
         */
        exports.lineInterpolation = function(_x) {
            if (!arguments.length) {
                return lineInterpolation;
            }
            lineInterpolation = _x;
            return this;
        };

        // Rebind 'customHover' event to the "exports" function, so it's available "externally" under the typical "on" method:
        d3.rebind(exports, dispatch, 'on');

        return exports;
    };

});
