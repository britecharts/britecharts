define(function(require){
    'use strict';

    const d3 = require('d3');

    const exportChart = require('./helpers/exportChart');

    /**
     * @typedef D3Selection
     * @type Array[]
     */

    /**
     * Line Chart reusable API module that allows us
     * rendering a multi line and configurable chart.
     *
     * @module Line
     * @version 0.0.1
     * @tutorial line
     * @requires d3
     *
     * @example
     * var lineChart = line();
     *
     * lineChart
     *     .aspectRatio(0.5)
     *     .width(500);
     *
     * d3.select('.css-selector')
     *     .datum(dataset)
     *     .call(lineChart);
     *
     */
    return function line(){

        let margin = {
                top: 60,
                right: 20,
                bottom: 60,
                left: 80
            },
            width = 960,
            height = 500,
            aspectRatio = null,
            tooltipThreshold = 480,
            svg,
            chartWidth, chartHeight,
            xScale, yScale, colorScale,
            xAxis, xMonthAxis, yAxis,
            xAxisPadding = {
                top: 0,
                left: 15,
                bottom: 0,
                right: 0
            },
            colorRange = [
                '#4DC2F5',
                '#4DDB86',
                '#E5C400',
                '#FF4D7C',
                '#9963D5',
                '#051C48'
            ],
            colorOrder = {
                '#4DC2F5': 0,
                '#4DDB86': 1,
                '#E5C400': 2,
                '#FF4D7C': 3,
                '#9963D5': 4,
                '#051C48': 5
            },
            singleLineGradientColors = [
                '#39C7EA',
                '#4CDCBA'
            ],
            topicColorMap,
            ease = 'ease',

            data,
            dataByDate,
            readableDataType,

            numVerticalTics = 5,

            overlay,
            overlayColor = 'rgba(0, 0, 0, 0)',
            verticalMarkerContainer,
            verticalMarkerLine,
            maskGridLines,
            baseLine,

            // extractors
            getDate = ({date}) => date,
            getValue = ({value}) => value,
            getTopic = ({topic}) => topic,
            getLineColor = ({topic}) => colorScale(topic),

            // formats
            yTickNumberFormat = d3.format('s'),
            xTickDateFormat = d3.time.format('%e'),
            xTickMonthFormat = d3.time.format('%b'),

            // events
            dispatch = d3.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');

        /**
         * This function creates the graph using the selection and data provided
         *
         * @param {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         * @param {Object} _data The data to attach and generate the chart
         */
        function exports(_selection){
            _selection.each(function(_data) {
                ({
                    data,
                    dataByDate,
                    readableDataType
                } = _data);

                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;

                buildScales();
                buildAxis();
                buildSVG(this);
                drawGridLines();
                drawAxis();
                buildGradient();
                drawLines();

                if (shouldShowTooltip()){
                    drawVerticalMarker();
                    drawHoverOverlay();
                    addMouseEvents();
                }
            });
        }

        /**
         * Adds events to the container group if the environment is not mobile
         * Adding: mouseover, mouseout and mousemove
         */
        function addMouseEvents(){
            svg
                .on('mouseover', handleMouseOver)
                .on('mouseout', handleMouseOut)
                .on('mousemove', handleMouseMove);
        }

        /**
         * Adjusts the position of the y axis' ticks
         * @param  {D3Selection} selection Y axis group
         * @return void
         */
        function adjustYTickLabels(selection){
            selection.selectAll('.tick text')
                .attr('transform', 'translate(0, -7)');
        }

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

            xMonthAxis = d3.svg.axis()
                .scale(xScale)
                .ticks(d3.time.months)
                .tickSize(0, 0)
                .orient('bottom')
                .tickFormat(xTickMonthFormat);

            yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left')
                .ticks(numVerticalTics)
                .tickSize([0])
                .tickPadding([4])
                .tickFormat(yTickNumberFormat);
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
              .append('g').classed('x-axis-group', true)
              .append('g').classed('axis x', true);
            container.selectAll('.x-axis-group')
              .append('g').classed('month-axis', true);
            container
              .append('g').classed('y-axis-group axis y', true);
            container
              .append('g').classed('grid-lines-group', true);
            container
              .append('g').classed('chart-group', true);
            container
              .append('g').classed('metadata-group', true);
        }

        /**
         * Builds the gradient element to be used later
         * @return {void}
         */
        function buildGradient() {
            svg.select('.metadata-group')
              .append('linearGradient')
                .attr('id', 'line-area-gradient')
                .attr('x1', '0%')
                .attr('y1', '0%')
                .attr('x2', '100%')
                .attr('y2', '0%')
                .selectAll('stop')
                .data([
                    {offset:'0%', color: singleLineGradientColors[0]},
                    {offset:'100%', color: singleLineGradientColors[1]}
                ])
                .enter()
              .append('stop')
                .attr('offset', ({offset}) => offset)
                .attr('stop-color', ({color}) => color)
        }

        /**
         * Creates the x and y scales of the graph
         * @private
         */
        function buildScales(){
            let minX = d3.min(data, ({Data}) => d3.min(Data, getDate)),
                maxX = d3.max(data, ({Data}) => d3.max(Data, getDate)),
                minY = d3.min(data, ({Data}) => d3.min(Data, getValue)),
                maxY = d3.max(data, ({Data}) => d3.max(Data, getValue));

            xScale = d3.time.scale()
                .rangeRound([0, chartWidth])
                .domain([minX, maxX]);

            yScale = d3.scale.linear()
                .rangeRound([chartHeight, 0])
                .domain([Math.abs(minY), Math.abs(maxY)])
                .nice(3);

            colorScale = d3.scale.ordinal()
                .range(colorRange)
                .domain(data.map(getTopic));


            // TODO add spread and rest operators to britecharts
            /*
                let range = colorScale.range();
                topicColorMap = colorScale.domain().reduce((memo, item, i) => ({...memo, [item]: range[i], }), {});
             */

            let range = colorScale.range();
            topicColorMap = colorScale.domain().reduce((memo, item, i) => {
                memo[item] = range[i];
                return memo;
            }, {});
        }

        /**
         * Builds the SVG element that will contain the chart
         *
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @private
         */
        function buildSVG(container){
            if (!svg) {
                svg = d3.select(container)
                  .append('svg')
                    .classed('britechart line-chart', true);

                buildContainerGroups();
            }

            svg
                .transition()
                .ease(ease)
                .attr({
                    width,
                    height
                });
        }

        /**
         * Removes all the datapoints highlighter circles added to the marker container
         * @return void
         */
        function cleanDataPointHighlights(){
            verticalMarkerContainer.selectAll('.circle-container').remove();
        }

        /**
         * Draws the x and y axis on the svg object within their
         * respective groups
         * @private
         */
        function drawAxis(){
            svg.select('.x-axis-group .axis.x')
                .transition()
                .ease(ease)
                .attr('transform', `translate(0, ${chartHeight})`)
                .call(xAxis);

            svg.select('.x-axis-group .month-axis')
                .transition()
                .ease(ease)
                .attr('transform', `translate(0, ${(chartHeight + 28)})`)
                .call(xMonthAxis);

            svg.select('.y-axis-group.axis.y')
                .transition()
                .ease(ease)
                .attr('transform', `translate(${-xAxisPadding.left}, 0)`)
                .call(yAxis)
                .call(adjustYTickLabels);
        }

        /**
         * Draws the line elements within the chart group
         * @private
         */
        function drawLines(){
            let lines,
                topicLine,
                maskingRectangle;

            topicLine = d3.svg.line()
                .x(({date}) => xScale(date))
                .y(({value}) => yScale(value));

            lines = svg.select('.chart-group').selectAll('.line')
                .data(data);

            lines
                .enter()
              .append('g')
                .attr('class', 'topic')
              .append('path')
                .attr('class', 'line')
                .attr('d', ({Data}) => topicLine(Data))
                .style('stroke', (d) => (
                    data.length === 1 ? 'url(#line-area-gradient)' : getLineColor(d)
                ));

            lines
                .exit()
                .remove();

            // We use a white rectangle to simulate the line drawing animation
            maskingRectangle = svg.append('rect')
                .attr('class', 'masking-rectangle')
                .attr('width', width - 30)
                .attr('height', height + 20)
                .attr('x', 60)
                .attr('y', -18);

            maskingRectangle.transition()
                .duration(2000)
                .ease('cubic-out')
                .attr('x', width)
                .each('end', () => maskingRectangle.remove());
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
                        class: 'horizontal-grid-line',
                        x1: (-xAxisPadding.left - 30),
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
                    x1: (-xAxisPadding.left - 30),
                    x2: chartWidth,
                    y1: height - margin.bottom - margin.top,
                    y2: height - margin.bottom - margin.top
                });
        }

        /**
         * Draws an overlay element over the graph
         * @inner
         * @return void
         */
        function drawHoverOverlay(){
            overlay = svg.select('.metadata-group')
              .append('rect')
                .attr('class','overlay')
                .attr('y1', 0)
                .attr('y2', height)
                .attr('height', height - margin.top - margin.bottom)
                .attr('width', width - margin.left - margin.right)
                .attr('fill', overlayColor)
                .style('display', 'none');
        }

        /**
         * Creates the vertical marker
         * @return void
         */
        function drawVerticalMarker(){
            verticalMarkerContainer = svg.select('.metadata-group')
              .append('g')
                .attr('class', 'hover-marker vertical-marker-container')
                .attr('transform', 'translate(9999, 0)');

            verticalMarkerLine = verticalMarkerContainer.selectAll('path')
                .data([{
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                }])
                .enter()
              .append('line')
                .classed('vertical-marker', true)
                .attr({
                    x1: 0,
                    y1: height - margin.top - margin.bottom,
                    x2: 0,
                    y2: 0
                });
        }

        /**
         * Finds out which datapoint is closer to the given x position
         * @param  {Number} x0 Date value for data point
         * @param  {Object} d0 Previous datapoint
         * @param  {Object} d1 Next datapoint
         * @return {Object}    d0 or d1, the datapoint with closest date to x0
         */
        function findOutNearestDate(x0, d0, d1){
            return (new Date(x0).getTime() - new Date(d0.date).getTime()) > (new Date(d1.date).getTime() - new Date(x0).getTime()) ? d0 : d1;
        }

        /**
         * Calculates the maximum number of ticks for the x axis
         * @param  {Number} width Chart width
         * @param  {Number} dataPointNumber  Number of entries on the data
         * @return {Number}       Number of ticks to render
         */
        function getMaxNumOfHorizontalTicks(width, dataPointNumber) {
            let singleTickWidth = 20,
                spacing = 40,
                ticksForWidth = Math.ceil(width / (singleTickWidth + spacing));

            return Math.min(dataPointNumber, ticksForWidth);
        }

        /**
         * Extract X position on the graph from a given mouse event
         * @param  {Object} event D3 mouse event
         * @return {Number}       Position on the x axis of the mouse
         */
        function getMouseXPosition(event) {
            return d3.mouse(event)[0];
        }

        /**
         * Formats the date in ISOString
         * @param  {String} date Date as given in data entries
         * @return {String}      Date in ISO format in a neutral timezone
         */
        function getFormattedDateFromData(date) {
            return date.toISOString().split('T')[0] + 'T00:00:00Z';
        }

        /**
         * Finds out the data entry that is closer to the given position on pixels
         * @param  {Number} mouseX X position of the mouse
         * @return {Object}        Data entry that is closer to that x axis position
         */
        function getNearestDataPoint(mouseX) {
            let invertedX = xScale.invert(mouseX),
                bisectDate = d3.bisector(getDate).left,
                dataEntryIndex, dateOnCursorXPosition, dataEntryForXPosition, previousDataEntryForXPosition,
                nearestDataPoint;

            dateOnCursorXPosition = getFormattedDateFromData(invertedX);
            dataEntryIndex = bisectDate(dataByDate, dateOnCursorXPosition, 1);
            dataEntryForXPosition = dataByDate[dataEntryIndex];
            previousDataEntryForXPosition = dataByDate[dataEntryIndex - 1];

            if (previousDataEntryForXPosition && dataEntryForXPosition) {
                nearestDataPoint = findOutNearestDate(dateOnCursorXPosition, dataEntryForXPosition, previousDataEntryForXPosition);
            } else {
                nearestDataPoint = dataEntryForXPosition;
            }

            return nearestDataPoint;
        }

        /**
         * MouseMove handler, calculates the nearest dataPoint to the cursor
         * and updates metadata related to it
         * @private
         */
        function handleMouseMove(){
            let xPositionOffset = -margin.left, //Arbitrary number, will love to know how to assess it
                dataPoint = getNearestDataPoint(getMouseXPosition(this) + xPositionOffset),
                dataPointXPosition;

            if (dataPoint) {
                dataPointXPosition = xScale(new Date(dataPoint.date));
                // More verticalMarker to that datapoint
                moveVerticalMarker(dataPointXPosition);
                // Add data points highlighting
                highlightDataPoints(dataPoint);
                // Emit event with xPosition for tooltip or similar feature
                dispatch.customMouseMove(dataPoint, topicColorMap, dataPointXPosition);
            }
        }

        /**
         * MouseOut handler, hides overlay and removes active class on verticalMarkerLine
         * It also resets the container of the vertical marker
         * @private
         */
        function handleMouseOut(data){
            overlay.style('display', 'none');
            verticalMarkerLine.classed('bc-is-active', false);
            verticalMarkerContainer.attr('transform', 'translate(9999, 0)');

            dispatch.customMouseOut(data);
        }

        /**
         * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
         * @private
         */
        function handleMouseOver(data){
            overlay.style('display', 'block');
            verticalMarkerLine.classed('bc-is-active', true);

            dispatch.customMouseOver(data);
        }

        /**
         * Creates coloured circles marking where the exact data y value is for a given data point
         * @param  {Object} dataPoint Data point to extract info from
         * @private
         */
        function highlightDataPoints(dataPoint) {
            cleanDataPointHighlights();

            // sorting the topics based on the order of the colors,
            // so that the order always stays constant
            dataPoint.topics = dataPoint.topics
                                    .filter(t => !!t)
                                    .sort((a, b) => topicColorMap[a.name] > topicColorMap[b.name]);

            dataPoint.topics.forEach(({name}, index) => {
                let marker = verticalMarkerContainer
                                .append('g')
                                .classed('circle-container', true),
                    circleSize = 12;

                marker.append('circle')
                    .classed('data-point-highlighter', true)
                    .attr({
                        cx: circleSize,
                        cy: 0,
                        r: 5
                    })
                    .style({
                        stroke: topicColorMap[name]
                    });

                marker.attr('transform', `translate( ${(- circleSize)}, ${(yScale(dataPoint.topics[index].value))} )` );
            });
        }

        /**
         * Helper method to update the x position of the vertical marker
         * @param  {Object} dataPoint Data entry to extract info
         * @return void
         */
        function moveVerticalMarker(verticalMarkerXPosition){
            verticalMarkerContainer.attr('transform', `translate(${verticalMarkerXPosition},0)`);
        }

        /**
         * Determines if we should add the tooltip related logic depending on the
         * size of the chart and the tooltipThreshold variable value
         * @return {Boolean} Should we build the tooltip?
         */
        function shouldShowTooltip() {
            return width > tooltipThreshold;
        }

        // API Methods

        /**
         * Gets or Sets the aspect ratio of the chart
         * @param  {Number} _x Desired aspect ratio for the graph
         * @return { (Number | Module) } Current aspect ratio or Line Chart module to chain calls
         * @public
         */
        exports.aspectRatio = function(_x) {
            if (!arguments.length) {
                return aspectRatio;
            }
            aspectRatio = _x;
            return this;
        };

        /**
         * Gets or Sets the ease of the chart
         * @param  {Number} _x Desired width for the graph
         * @return { (Number | Module) } Current ease animation or Line Chart module to chain calls
         * @public
         */
        exports.ease = function(_x) {
            if (!arguments.length) {
                return ease;
            }
            ease = _x;
            return this;
        };

        /**
         * Gets or Sets the height of the chart
         * @param  {Number} _x Desired width for the graph
         * @return { (Number | Module) } Current height or Line Chart module to chain calls
         * @public
         */
        exports.height = function(_x) {
            if (!arguments.length) {
                return height;
            }
            if (aspectRatio) {
                width = Math.ceil(_x / aspectRatio);
            }
            height = _x;
            return this;
        };

        /**
         * Gets or Sets the margin of the chart
         * @param  {Object} _x Margin object to get/set
         * @return { (Number | Module) } Current margin or Line Chart module to chain calls
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
         * Gets or Sets the minimum width of the graph in order to show the tooltip
         * NOTE: This could also depend on the aspect ratio
         * @param  {Number} _x Desired tooltip threshold for the graph
         * @return { (Number | Module) } Current tooltip threshold or Line Chart module to chain calls
         * @public
         */
        exports.tooltipThreshold = function(_x) {
            if (!arguments.length) {
                return tooltipThreshold;
            }
            tooltipThreshold = _x;
            return this;
        };

        /**
         * Gets or Sets the width of the chart
         * @param  {Number} _x Desired width for the graph
         * @return { (Number | Module) } Current width or Line Chart module to chain calls
         * @public
         */
        exports.width = function(_x) {
            if (!arguments.length) {
                return width;
            }
            if (aspectRatio) {
                height = Math.ceil(_x * aspectRatio);
            }
            width = _x;
            return this;
        };

        /**
         * Chart exported to png and a download action is fired
         * @public
         */
        exports.exportChart = function(filename) {
            exportChart.call(exports, svg, filename);
        };

        // Rebind 'customHover' event to the "exports" function, so it's available "externally" under the typical "on" method:
        d3.rebind(exports, dispatch, 'on');

        return exports;
    };

});
