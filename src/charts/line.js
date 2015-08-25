/**
 * Line Chart Module
 *
 * @module Line Chart
 * @version 0.0.1
 */
define(function(require){
    'use strict';

    var d3 = require('d3');

    return function module(){

        var margin = {top: 60, right: 0, bottom: 60, left: 0},
            colorRange = ['#00A8F2', '#00CC52', '#FFDB00', '#F20CB6', '#8400FF', '#051C48'],
            width = 960,
            height = 500,
            data,
            dataByDate,
            chartWidth, chartHeight,
            xScale, yScale, colorScale,
            xAxis, yAxis,
            maskGridLines,
            svg,
            // extractors
            getDate = function(d) { return d.date; },
            getValue = function(d) { return d.value; },
            getTopic = function(d) { return d.topic; },
            // formats
            xTickFormat = d3.time.format('%-d-%b');

        /**
         * @name buildAxis
         * @description Creates the d3 x and y axis, setting orientations
         * @private
         */
        function buildAxis(){
            xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom')
                .ticks(getMaxNumOfTicks(width, dataByDate))
                .tickSize(10, 0).tickPadding(5)
                .tickFormat(xTickFormat);

            yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left')
                .ticks(5)
                .tickFormat(formatNumbers);
        }

        function getMaxNumOfTicks(width, data) {
            var singleTickWidth = 20,
                spacing = 40,
                ticksForWidth = Math.ceil(width / (singleTickWidth + spacing));

            return Math.min(data.length, ticksForWidth);
        }

        function formatNumbers(value) {
            var number = value,
                decPlaces = 1,
                abbrev = [ 'k', 'm', 'b', 't' ],
                size;

            decPlaces = Math.pow(10, decPlaces);

            for (var i = abbrev.length - 1; i >= 0; i--) {
                size = Math.pow(10, (i + 1) * 3);

                if (size <= number) {
                    number = Math.round(number * decPlaces / size) / decPlaces;

                    if ((number === 1000) && (i < abbrev.length - 1)) {
                        number = 1;
                        i++;
                    }

                    number += abbrev[i];

                    break;
                }
            }
            return number;
        }

        /**
         * @name buildContainer Groups
         * @description Builds containers for the chart, the axis and a wrapper for all of them
         * @private
         */
        function buildContainerGroups(){
            var container = svg.append('g').classed('container-group', true);

            container.append('g').classed('chart-group', true);
            container.append('g').classed('x-axis-group', true);
            container.append('g').classed('y-axis-group', true);
            container.append('g').classed('grid-lines-group', true);
        }

        /**
         * @name buildScales
         * @description Creates the x and y scales of the graph
         * @private
         */
        function buildScales(){
            var minX = d3.min(data, function(kv) {
                    debugger
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
         * @name buildSVG
         * @param  {dom element} container DOM element that will work as the container of the graph
         * @private
         */
        function buildSVG(container){
            if (!svg) {
                svg = d3.select(container)
                    .append('svg')
                    .classed('line-chart', true);
            }
            svg.attr({
                width: width + margin.left + margin.right,
                height: height + margin.top + margin.bottom
            });
        }

        /**
         * @name drawAxis
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
                // .selectAll('text')
                // .style({
                //     'text-anchor': 'end',
                //     'font-weight': 'normal'
                // }).call(this.wrap, 20, this, 0, this.xaxisLabelFormatterForWrap);

            //remove empty ticks, in case the text is zero (this is a fix for repeating dates in
            // very small data range )
            // d3.selectAll('.x.axis .tick')
            //     .each(function() {
            //         if (d3.select(this).select('text').text() === '') {
            //             this.remove();
            //         }
            //     });

            svg.select('.y-axis-group')
                .append('g')
                .attr('class', 'y axis')
                .call(yAxis);
                // .selectAll('text')
                // .style({
                //     'text-anchor': 'end',
                //     'font-weight': 'normal'
                // });
                // NOTE: Deepthi added too some padding on this axis

            // hide 0th value on y axis
            // d3.select('.y.axis .tick').style('display', 'none');

            // sort the border and the label text
            // d3.select('.y.axis').selectAll('.tick').select('text').each(function() {
            //     d3.select(this.parentNode)
            //     .append('rect')
            //     .attr({
            //         'x': -25,
            //         'y': -10,
            //         'width': 30,
            //         'height': 20,
            //         'rx': 10,
            //         'ry': 10
            //     }).style({
            //         'fill': '#ffffff',
            //         'fill-opacity': 1
            //     });
            //     self.moveToFront(this);
            // });
        }

        /**
         * @name drawLines
         * @description Draws the line elements within the chart group
         * @private
         */
        function drawLines(){
            // Setup the enter, exit and update of the actual lines in the chart.
            // Select the lines, and bind the data to the .line elements.
            var lines,
                topicLine,
                maskRect;

            topicLine = d3.svg.line()
                .x(function(d) {
                    debugger
                    return xScale(d.date);
                })
                .y(function(d) { return yScale(d.value); });

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
                    'stroke': function(d) { return colorScale(d.topic); },
                    'stroke-linecap': 'round'
                });

            // No idea what this is
            maskRect = svg.append('rect')
                .attr('class', 'maskRect')
                .attr('width', chartWidth - 30)
                .attr('height', chartHeight + 20)
                .attr('x', 60)
                .attr('y', -18);

            maskRect.transition()
                .duration(2000)
                .ease('cubic-out')
                .attr('x', chartWidth)
                .each('end', function() {
                    maskRect.remove();
                    maskGridLines.remove();
                });
        }

        /**
         * @name drawGridLines
         * @description Draws grid lines on the background of the chart
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
                        'y2': function(d) { return yScale(d); },
                        'fill': 'none',
                        'shape-rendering': 'crispEdges',
                        'stroke': '#DEDEDE',
                        'stroke-width': '1px',
                        'stroke-dasharray': '2,2'
                    });
        }

        /**
         * @description
         * This function creates the graph using the selection and data provided
         * @name exports
         * @param  {d3 selection} _selection A d3 selection that represents
         * the container(s) where the chart(s) will be rendered
         * @param {[] object} _data The data to attach and generate the chart
         */
        function exports(_selection){
            _selection.each(function(_data){
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = _data.data;
                dataByDate = _data.dataByDate;
debugger
                buildScales();
                buildAxis();
                buildSVG(this);
                buildContainerGroups();

                drawGridLines();
                drawAxis();
                drawLines();
            });
        }

        /**
         * @name margin
         * @param  {object} _x Margin object to get/set
         * @return { margin | module} Current margin or Bar Chart module to chain calls
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
         * @name width
         * @param  {number} _x Desired width for the graph
         * @return { width | module} Current width or Bar Chart module to chain calls
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
         * @name height
         * @param  {number} _x Desired width for the graph
         * @return { height | module} Current height or Bar Char module to chain calls
         * @public
         */
        exports.height = function(_x) {
            if (!arguments.length) {
                return height;
            }
            height = _x;
            return this;
        };

        return exports;
    };

});
