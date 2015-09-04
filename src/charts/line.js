
define(function(require){
    'use strict';

    var _ = require('underscore'),
        d3 = require('d3');

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
            topicColorMap,
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
            readableDataType,

            chartWidth, chartHeight,
            xScale, yScale, colorScale,
            xAxis, yAxis,
            maskGridLines,
            svg,
            overlay,
            verticalMarkerContainer,
            verticalMarkerLine,

            tooltip,
            tooltipTextContainer,
            tooltipBackground,
            tooltipDivider,
            tooltipBody,
            tooltipTitle,
            tooltipWidth = 250,
            tooltipHeight = 45,
            ttTextX,
            ttTextY,
            textSize,

            isMobile = false,
            // extractors
            getDate = function(d) { return d.date; },
            getValue = function(d) { return d.value; },
            getTopic = function(d) { return d.topic; },
            // formats
            yTickNumberFormat = d3.format('s'),
            xTickDateFormat = d3.time.format('%e'),
            tooltipDateFormat = d3.time.format('%b %d, %Y'),
            // events
            dispatch = d3.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');

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
                readableDataType = _data.readableDataType;

                buildScales();
                buildAxis();
                buildSVG(this);
                buildContainerGroups();

                drawGridLines();
                drawAxis();
                drawLines();

                drawVerticalMarker();
                drawTooltip();
                drawHoverOverlay();
                addMouseEvents();
            });
        }

        /**
         * Adds events to the container group if the environment is not mobile
         * Adding: mouseover, mouseout and mousemove
         */
        function addMouseEvents(){
            if (isMobile) {
                return;
            }

            svg
                .on('mouseover', handleMouseOver)
                .on('mouseout', handleMouseOut)
                .on('mousemove', handleMouseMove);
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
                .rangeRound([0, chartWidth])
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
            overlay = svg.select('.metadata-group')
                .append('rect')
                .attr('class','overlay')
                .attr('y1', 0)
                .attr('y2', height)
                .attr('height', height)
                .attr('width', width)
                .attr('fill','rgba(65, 72, 83, 0.12)')
                .style('display', 'none');
        }

        /**
         * Creates the vertical marker
         * @return void
         */
        function drawVerticalMarker(){
            verticalMarkerContainer = svg.select('.metadata-group')
                .append('g')
                .attr('class', 'hover-marker')
                .attr('transform', 'translate(' + '9999' + ',' + '0' + ')');

            verticalMarkerLine = verticalMarkerContainer.selectAll('path')
                .data([{
                    'x1': 0,
                    'y1': 0,
                    'x2': 0,
                    'y2': 0
                }])
                .enter()
                .append('line')
                .classed('vertical-marker', true)
                .attr({
                    'x1': 0,
                    'y1': height,
                    'x2': 0,
                    'y2': 0
                });
        }

        /**
         * Draws the different elements of the Tooltip box
         * @return void
         */
        function drawTooltip(){
            tooltipTextContainer = verticalMarkerContainer
                .append('g')
                .classed('tooltip-text', true);

            tooltipBackground = tooltipTextContainer
                .append('rect')
                .classed('tooltip-background', true)
                .attr({
                    'x': -tooltipWidth / 4 + 10,
                    'y': -1,
                    'width': tooltipWidth,
                    'height': tooltipHeight,
                    'rx': 3,
                    'ry': 3
                })
                .style({
                    'fill': '#FFFFFF',
                    'stroke': '#D9D9D9',
                    'stroke-width': 2
                });

            tooltip = tooltipTextContainer
                .append('rect')
                .classed('tooltip', true)
                .attr({
                    'x': -tooltipWidth / 4 + 8,
                    'y': 0,
                    'width': tooltipWidth,
                    'height': tooltipHeight,
                    'rx': 3,
                    'ry': 3
                })
                .style({
                    'fill': '#FFFFFF',
                    'stroke': '#D9D9D9',
                    'stroke-width': 1
                });

            tooltipTitle = tooltipTextContainer
                .append('text')
                .classed('tooltip-title', true)
                .attr({
                    'x': -tooltipWidth / 4 + 17,
                    'dy': '.35em',
                    'y': 16
                })
                .style({
                    'fill': '#666666'
                });

            tooltipDivider = tooltipTextContainer
                .append('line')
                .classed('tooltip-divider', true)
                .attr({
                    'x1': -tooltipWidth / 4 + 15,
                    'y1': 31,
                    'x2': 265,
                    'y2': 31
                })
                .style({
                    'stroke': '#D9D9D9'
                });

            tooltipBody = tooltipTextContainer
                .append('g')
                .classed('tooltip-body', true)
                .style({
                    'fill': '#404040'
                });
        }

        /**
         * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
         * @return void
         */
        function handleMouseOver(){
            overlay.style('display', 'block');
            verticalMarkerLine.classed('bc-is-active', true);

            dispatch.customMouseOver();
        }

        /**
         * MouseOut handler, hides overlay and removes active class on verticalMarkerLine
         * It also resets the container of the vertical marker
         * @return {[type]} [description]
         */
        function handleMouseOut(){
            overlay.style('display', 'none');
            verticalMarkerLine.classed('bc-is-active', false);
            verticalMarkerContainer.attr('transform', 'translate(' + '9999' + ',' + '0' + ')');

            dispatch.customMouseOut();
        }

        /**
         * MouseMove handler, calculates the nearest dataPoint to the cursor
         * and updates metadata related to it
         * @return void
         */
        function handleMouseMove(){
            var dataPoint = getNearestDataPoint(getMouseXPosition(this));

            // More verticalMarker to that datapoint
            moveVerticalMarker(dataPoint);
            // Add data points highlighting
            highlightDataPoints(dataPoint);
            // Fill tooltip
            updateTooltip(dataPoint);

            dispatch.customMouseMove();
        }

        /**
         * Resets the tooltipBody content
         * @return void
         */
        function cleanTooltipContent(){
            tooltipBody.selectAll('text').remove();
            tooltipBody.selectAll('circle').remove();
        }

        /**
         * Updates value of tooltipTitle with the data meaning and the date
         * @param  {obj} dataPoint Point of data to use as source
         * @return void
         */
        function updateTooltipTitle(dataPoint) {
            var tooltipTitleText = readableDataType.name + ' - ' + tooltipDateFormat(new Date(dataPoint.date));

            tooltipTitle.text(tooltipTitleText);
        }

        /**
         * Draws the data entries inside the tooltip for a given topic
         * @param  {obj} topic Topic to extract data from
         * @return void
         */
        function updateTooltipContent(topic){
            var tooltipRight,
                tooltipLeftText,
                tooltipRightText,
                elementText;

            tooltipLeftText = $.trim(topic.topicName);

            if (topic.missingValue) {
                tooltipRightText = '-';
            } else {
                if (readableDataType.type === 'money') {
                    tooltipRightText = topic.value;
                    // tooltipRightText = EB.Intl.formatMoney(topic.value);
                } else {
                    tooltipRightText = topic.value;
                    // tooltipRightText = EB.Intl.formatNumber(topic.value, {precision: 0});
                }
            }

            elementText = tooltipBody
                .append('text')
                .attr({
                    'dy': '1em',
                    'x': ttTextX,
                    'y': ttTextY
                })
                .style('fill', 'black')
                .text(tooltipLeftText);

            // TODO: wrap text

            tooltipRight = tooltipBody
                .append('text')
                .attr({
                    'dy': '1em',
                    'x': ttTextX + 8,
                    'y': ttTextY
                })
                .style('fill', 'black')
                .text(tooltipRightText);

            textSize = elementText.node().getBBox();
            tooltipHeight += textSize.height + 5;

            // Not sure if necessary
            tooltipRight.attr({
                'x': tooltipWidth - tooltipRight.node().getBBox().width - 10 - tooltipWidth / 4
            });

            tooltipBody
                .append('circle')
                .attr({
                    'cx': 22 - tooltipWidth / 4,
                    'cy': (ttTextY + 7),
                    'r': 5
                })
                .style({
                    'fill': topicColorMap[topic.name],
                    'stroke-width': 1
                });

            ttTextY += textSize.height + 7;
        }

        /**
         * Updates tooltip title, content, size and position
         * @param  {object} dataPoint Current datapoint to show info about
         * @return void
         */
        function updateTooltip(dataPoint){
            ttTextX = 0;
            ttTextY = 37;
            tooltipHeight = 40;

            cleanTooltipContent();
            updateTooltipTitle(dataPoint);
            _.each(dataPoint.topics, updateTooltipContent);
            updateTooltipPositionAndSize(dataPoint);
        }

        /**
         * Updates size and position of tooltip depending on the side of the chart we are in
         * @param  {object} dataPoint DataPoint of the tooltip
         * @return void
         */
        function updateTooltipPositionAndSize(dataPoint){
            tooltip
                .attr({
                    'width': tooltipWidth,
                    'height': tooltipHeight + 10
                });

            tooltipBackground
                .attr({
                    'width': tooltipWidth - 3,
                    'height': tooltipHeight + 12
                });


            // show tooltip to the right
            if ((xScale(new Date(dataPoint.date)) - tooltipWidth) < 0) {
                // Tooltip on the right
                tooltipTextContainer
                    .attr('transform', 'translate(' + (tooltipWidth - 190) + ',' + (0) + ')');
            } else {
                // Tooltip on the left
                tooltipTextContainer
                    .attr('transform', 'translate(' + (-200) + ',' + (0) + ')');
            }

            tooltipDivider
                .attr({
                    'x2': tooltipWidth - 60
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
         * Creates coloured circles marking where the exact data y value is for a given data point
         * @param  {obj} dataPoint Data point to extract info from
         * @return void
         */
        function highlightDataPoints(dataPoint){
            cleanDataPointHighlights();

            topicColorMap = _.object(
                colorScale.domain(),
                colorScale.range()
            );

            _.each(dataPoint.topics, function(topic, index){
                var marker = verticalMarkerContainer
                                .append('g')
                                .classed('circle-container', true),
                    circleSize = 12;

                marker.append('circle')
                    .classed('data-point-highlighter', true)
                    .attr({
                        'cx': circleSize,
                        'cy': 0,
                        'r': 5.5
                    })
                    .style({
                        'fill': topicColorMap[topic.name]
                    });

                marker.attr('transform', 'translate(' + (- circleSize) + ',' + (yScale(dataPoint.topics[index].value)) + ')');
            });
        }

        /**
         * Helper method to update the x position of the vertical marker
         * @param  {obj} dataPoint Data entry to extract info
         * @return void
         */
        function moveVerticalMarker(dataPoint){
            var date = new Date(dataPoint.date),
                verticalMarkerXPosition = xScale(date);

            verticalMarkerContainer.attr('transform', 'translate(' + verticalMarkerXPosition + ',' + '0' + ')');
        }

        /**
         * Extract X position on the graph from a given mouse event
         * @param  {obj} event D3 mouse event
         * @return {number}       Position on the x axis of the mouse
         */
        function getMouseXPosition(event) {
            return d3.mouse(event)[0];
        }

        /**
         * Formats the date in ISOString
         * @param  {string} date Date as given in data entries
         * @return {string}      Date in ISO format in a neutral timezone
         */
        function getFormattedDateFromData(date) {
            return date.toISOString().split('T')[0] + 'T00:00:00Z';
        }

        /**
         * Finds out the data entry that is closer to the given position on pixels
         * @param  {number} mouseX X position of the mouse
         * @return {obj}        Data entry that is closer to that x axis position
         */
        function getNearestDataPoint(mouseX) {
            var invertedX = xScale.invert(mouseX),
                bisectDate = d3.bisector(getDate).left,
                dataEntryIndex, dateOnCursorXPosition, dataEntryForXPosition, previousDataEntryForXPosition,
                nearestDataPoint;

            dateOnCursorXPosition = getFormattedDateFromData(invertedX);
            dataEntryIndex = bisectDate(dataByDate, dateOnCursorXPosition, 1);
            dataEntryForXPosition = dataByDate[dataEntryIndex];
            previousDataEntryForXPosition = dataByDate[dataEntryIndex - 1];

            if (previousDataEntryForXPosition) {
                nearestDataPoint = findOutNearestDate(dateOnCursorXPosition, dataEntryForXPosition, previousDataEntryForXPosition);
            } else {
                nearestDataPoint = dataEntryForXPosition;
            }

            return nearestDataPoint;
        }

        function findOutNearestDate(x0, d0, d1){
            return (new Date(x0).getTime() - new Date(d0.date).getTime()) > (new Date(d1.date).getTime() - new Date(x0).getTime()) ? d1 : d0;
        }

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
         * Gets or Sets whether the chart is being rendered on mobile
         * @param  {boolean} _x True is mobile, false is not mobile
         * @return { isMobile | module} Current mode (mobile or not mobile) or Line Chart module to chain calls
         * @public
         */
        exports.isMobile = function(_x) {
            if (!arguments.length) {
                return isMobile;
            }
            isMobile = _x;
            return this;
        };

        // Rebind 'customHover' event to the "exports" function, so it's available "externally" under the typical "on" method:
        d3.rebind(exports, dispatch, 'on');

        return exports;
    };

});
