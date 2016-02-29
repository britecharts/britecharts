(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"), require("underscore"));
	else if(typeof define === 'function' && define.amd)
		define(["d3", "underscore"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("d3"), require("underscore")) : factory(root["d3"], root["underscore"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var _ = __webpack_require__(2),
	        d3 = __webpack_require__(1);
	
	    /**
	     * @fileOverview Line Chart reusable API module that allows us
	     * rendering a multi line and configurable chart.
	     *
	     * @tutorial line
	     * @exports charts/line
	     * @requires d3
	     * @version 0.0.1
	     */
	    return function module() {
	
	        var margin = {
	            top: 60,
	            right: 20,
	            bottom: 60,
	            left: 80
	        },
	            width = 960,
	            height = 500,
	            aspectRatio = null,
	            tooltipThreshold = 480,
	            svg = undefined,
	            chartWidth = undefined,
	            chartHeight = undefined,
	            xScale = undefined,
	            yScale = undefined,
	            colorScale = undefined,
	            xAxis = undefined,
	            xMonthAxis = undefined,
	            yAxis = undefined,
	            xAxisPadding = {
	            top: 0,
	            left: 15,
	            bottom: 0,
	            right: 0
	        },
	            colorRange = ['#4DC2F5', '#4DDB86', '#E5C400', '#FF4D7C', '#9963D5', '#051C48'],
	            colorOrder = {
	            '#4DC2F5': 0,
	            '#4DDB86': 1,
	            '#E5C400': 2,
	            '#FF4D7C': 3,
	            '#9963D5': 4,
	            '#051C48': 5
	        },
	            topicColorMap = undefined,
	            ease = 'ease',
	            data = undefined,
	            dataByDate = undefined,
	            readableDataType = undefined,
	            baseLine = undefined,
	            maskGridLines = undefined,
	            numVerticalTics = 5,
	            overlay = undefined,
	            overlayColor = 'rgba(0, 0, 0, 0)',
	            verticalMarkerContainer = undefined,
	            verticalMarkerLine = undefined,
	
	
	        // extractors
	        getDate = function getDate(d) {
	            return d.date;
	        },
	            getValue = function getValue(d) {
	            return d.value;
	        },
	            getTopic = function getTopic(d) {
	            return d.topic;
	        },
	            getLineColor = function getLineColor(d) {
	            return colorScale(d.topic);
	        },
	
	
	        // formats
	        yTickNumberFormat = d3.format('s'),
	            xTickDateFormat = d3.time.format('%e'),
	            xTickMonthFormat = d3.time.format('%B'),
	
	
	        // events
	        dispatch = d3.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');
	
	        /**
	         * This function creates the graph using the selection and data provided
	         * @param  {D3Selection} _selection A d3 selection that represents
	         * the container(s) where the chart(s) will be rendered
	         */
	        function exports(_selection) {
	            /** @param {object} _data The data to attach and generate the chart */
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	                data = _data.data;
	                dataByDate = _data.dataByDate;
	                readableDataType = _data.readableDataType;
	
	                buildScales();
	                buildAxis();
	                buildSVG(this);
	                drawGridLines();
	                drawAxis();
	                drawLines();
	
	                if (shouldShowTooltip()) {
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
	        function addMouseEvents() {
	            svg.on('mouseover', handleMouseOver).on('mouseout', handleMouseOut).on('mousemove', handleMouseMove);
	        }
	
	        /**
	         * Adjusts the position of the y axis' ticks
	         * @param  {D3Selection} selection Y axis group
	         * @return void
	         */
	        function adjustYTickLabels(selection) {
	            selection.selectAll('.tick text').attr('transform', 'translate(0, -7)');
	        }
	
	        /**
	         * Creates the d3 x and y axis, setting orientations
	         * @private
	         */
	        function buildAxis() {
	            xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(getMaxNumOfHorizontalTicks(width, dataByDate.length)).tickSize(10, 0).tickPadding(5).tickFormat(xTickDateFormat);
	
	            xMonthAxis = d3.svg.axis().scale(xScale).ticks(d3.time.months).tickSize(0, 0).orient('bottom').tickFormat(xTickMonthFormat);
	
	            yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(numVerticalTics).tickSize([0]).tickPadding([4]).tickFormat(yTickNumberFormat);
	        }
	
	        /**
	         * Builds containers for the chart, the axis and a wrapper for all of them
	         * NOTE: The order of drawing of this group elements is really important,
	         * as everything else will be drawn on top of them
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
	            container.append('g').classed('x-axis-group', true).append('g').classed('axis x', true);
	            container.selectAll('.x-axis-group').append('g').classed('month-axis', true);
	            container.append('g').classed('y-axis-group axis y', true);
	            container.append('g').classed('grid-lines-group', true);
	            container.append('g').classed('chart-group', true);
	            container.append('g').classed('metadata-group', true);
	        }
	
	        /**
	         * Creates the x and y scales of the graph
	         * @private
	         */
	        function buildScales() {
	            var minX = d3.min(data, function (kv) {
	                return d3.min(kv.Data, getDate);
	            }),
	                maxX = d3.max(data, function (kv) {
	                return d3.max(kv.Data, getDate);
	            }),
	                minY = d3.min(data, function (kv) {
	                return d3.min(kv.Data, getValue);
	            }),
	                maxY = d3.max(data, function (kv) {
	                return d3.max(kv.Data, getValue);
	            });
	
	            xScale = d3.time.scale().rangeRound([0, chartWidth]).domain([minX, maxX]);
	
	            yScale = d3.scale.linear().rangeRound([chartHeight, 0]).domain([Math.abs(minY), Math.abs(maxY)]).nice(3);
	
	            colorScale = d3.scale.ordinal().range(colorRange).domain(data.map(getTopic));
	
	            topicColorMap = _.object(colorScale.domain(), colorScale.range());
	        }
	
	        /**
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3.select(container).append('svg').classed('britechart line-chart', true);
	
	                buildContainerGroups();
	            }
	
	            svg.transition().ease(ease).attr({
	                width: width,
	                height: height
	            });
	        }
	
	        /**
	         * Removes all the datapoints highlighter circles added to the marker container
	         * @return void
	         */
	        function cleanDataPointHighlights() {
	            verticalMarkerContainer.selectAll('.circle-container').remove();
	        }
	
	        /**
	         * @description
	         * Draws the x and y axis on the svg object within their
	         * respective groups
	         * @private
	         */
	        function drawAxis() {
	            svg.select('.x-axis-group .axis.x').transition().ease(ease).attr('transform', 'translate(0,' + chartHeight + ')').call(xAxis);
	
	            svg.select('.x-axis-group .month-axis').transition().ease(ease).attr('transform', 'translate(0,' + (chartHeight + 28) + ')').call(xMonthAxis);
	
	            svg.select('.y-axis-group.axis.y').transition().ease(ease).attr('transform', 'translate(' + -xAxisPadding.left + ', 0)').call(yAxis).call(adjustYTickLabels);
	        }
	
	        /**
	         * Draws the line elements within the chart group
	         * @private
	         */
	        function drawLines() {
	            var lines = undefined,
	                topicLine = undefined,
	                maskingRectangle = undefined;
	
	            topicLine = d3.svg.line().x(function (d) {
	                return xScale(d.date);
	            }).y(function (d) {
	                return yScale(d.value);
	            });
	
	            lines = svg.select('.chart-group').selectAll('.line').data(data);
	
	            lines.enter().append('g').attr('class', 'topic').append('path').attr('class', 'line').attr('d', function (d) {
	                return topicLine(d.Data);
	            }).style({
	                'stroke': getLineColor
	            });
	
	            lines.exit().remove();
	
	            // We use a white rectangle to simulate the line drawing animation
	            maskingRectangle = svg.append('rect').attr('class', 'masking-rectangle').attr('width', width - 30).attr('height', height + 20).attr('x', 60).attr('y', -18);
	
	            maskingRectangle.transition().duration(2000).ease('cubic-out').attr('x', width).each('end', function () {
	                maskingRectangle.remove();
	            });
	        }
	
	        /**
	         * Draws grid lines on the background of the chart
	         * @return void
	         */
	        function drawGridLines() {
	            maskGridLines = svg.select('.grid-lines-group').selectAll('line.horizontal-grid-line').data(yScale.ticks(5)).enter().append('line').attr({
	                'class': 'horizontal-grid-line',
	                'x1': -xAxisPadding.left - 30,
	                'x2': chartWidth,
	                'y1': function y1(d) {
	                    return yScale(d);
	                },
	                'y2': function y2(d) {
	                    return yScale(d);
	                }
	            });
	
	            //draw a horizontal line to extend x-axis till the edges
	            baseLine = svg.select('.grid-lines-group').selectAll('line.extended-x-line').data([0]).enter().append('line').attr({
	                'class': 'extended-x-line',
	                'x1': -xAxisPadding.left - 30,
	                'x2': chartWidth,
	                'y1': height - margin.bottom - margin.top,
	                'y2': height - margin.bottom - margin.top
	            });
	        }
	
	        /**
	         * Draws an overlay element over the graph
	         * @inner
	         * @return void
	         */
	        function drawHoverOverlay() {
	            overlay = svg.select('.metadata-group').append('rect').attr('class', 'overlay').attr('y1', 0).attr('y2', height).attr('height', height - margin.top - margin.bottom).attr('width', width - margin.left - margin.right).attr('fill', overlayColor).style('display', 'none');
	        }
	
	        /**
	         * Creates the vertical marker
	         * @return void
	         */
	        function drawVerticalMarker() {
	            verticalMarkerContainer = svg.select('.metadata-group').append('g').attr('class', 'hover-marker').attr('transform', 'translate(' + '9999' + ',' + '0' + ')');
	
	            verticalMarkerLine = verticalMarkerContainer.selectAll('path').data([{
	                'x1': 0,
	                'y1': 0,
	                'x2': 0,
	                'y2': 0
	            }]).enter().append('line').classed('vertical-marker', true).attr({
	                'x1': 0,
	                'y1': height - margin.top - margin.bottom,
	                'x2': 0,
	                'y2': 0
	            });
	        }
	
	        /**
	         * Finds out which datapoint is closer to the given x position
	         * @param  {number} x0 Date value for data point
	         * @param  {obj} d0 Previous datapoint
	         * @param  {obj} d1 Next datapoint
	         * @return {obj}    d0 or d1, the datapoint with closest date to x0
	         */
	        function findOutNearestDate(x0, d0, d1) {
	            return new Date(x0).getTime() - new Date(d0.date).getTime() > new Date(d1.date).getTime() - new Date(x0).getTime() ? d0 : d1;
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
	                dataEntryIndex = undefined,
	                dateOnCursorXPosition = undefined,
	                dataEntryForXPosition = undefined,
	                previousDataEntryForXPosition = undefined,
	                nearestDataPoint = undefined;
	
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
	         * @return void
	         */
	        function handleMouseMove() {
	            var xPositionOffset = -margin.left,
	                //Arbitrary number, will love to know how to assess it
	            dataPoint = getNearestDataPoint(getMouseXPosition(this) + xPositionOffset),
	                dataPointXPosition = undefined;
	
	            if (dataPoint) {
	                // More verticalMarker to that datapoint
	                moveVerticalMarker(dataPoint);
	                // Add data points highlighting
	                highlightDataPoints(dataPoint);
	                // Emit event with xPosition for tooltip or similar feature
	                dataPointXPosition = xScale(new Date(dataPoint.date));
	                dispatch.customMouseMove(dataPoint, topicColorMap, dataPointXPosition);
	            }
	        }
	
	        /**
	         * MouseOut handler, hides overlay and removes active class on verticalMarkerLine
	         * It also resets the container of the vertical marker
	         * @return void
	         */
	        function handleMouseOut(data) {
	            overlay.style('display', 'none');
	            verticalMarkerLine.classed('bc-is-active', false);
	            verticalMarkerContainer.attr('transform', 'translate(' + '9999' + ',' + '0' + ')');
	
	            dispatch.customMouseOut(data);
	        }
	
	        /**
	         * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
	         * @return void
	         */
	        function handleMouseOver(data) {
	            overlay.style('display', 'block');
	            verticalMarkerLine.classed('bc-is-active', true);
	
	            dispatch.customMouseOver(data);
	        }
	
	        /**
	         * Creates coloured circles marking where the exact data y value is for a given data point
	         * @param  {obj} dataPoint Data point to extract info from
	         * @return void
	         */
	        function highlightDataPoints(dataPoint) {
	            cleanDataPointHighlights();
	
	            // sorting the topics based on the order of the colors,
	            // so that the order always stays constant
	            dataPoint.topics = _.chain(dataPoint.topics).compact().sortBy(function (el) {
	                return colorOrder[topicColorMap[el.name]];
	            }).value();
	
	            dataPoint.topics.forEach(function (topic, index) {
	                var marker = verticalMarkerContainer.append('g').classed('circle-container', true),
	                    circleSize = 12;
	
	                marker.append('circle').classed('data-point-highlighter', true).attr({
	                    'cx': circleSize,
	                    'cy': 0,
	                    'r': 5
	                }).style({
	                    'stroke': topicColorMap[topic.name]
	                });
	
	                marker.attr('transform', 'translate(' + -circleSize + ',' + yScale(dataPoint.topics[index].value) + ')');
	            });
	        }
	
	        /**
	         * Helper method to update the x position of the vertical marker
	         * @param  {obj} dataPoint Data entry to extract info
	         * @return void
	         */
	        function moveVerticalMarker(dataPoint) {
	            var date = new Date(dataPoint.date),
	                verticalMarkerXPosition = xScale(date);
	
	            verticalMarkerContainer.attr('transform', 'translate(' + verticalMarkerXPosition + ',0)');
	        }
	
	        /**
	         * Determines if we should add the tooltip related logic depending on the
	         * size of the chart and the tooltipThreshold variable value
	         * @return {boolean} Should we build the tooltip?
	         */
	        function shouldShowTooltip() {
	            return width > tooltipThreshold;
	        }
	
	        // API Methods
	
	        /**
	         * Gets or Sets the aspect ratio of the chart
	         * @param  {number} _x Desired aspect ratio for the graph
	         * @return { number | module} Current aspect ratio or Line Chart module to chain calls
	         * @public
	         */
	        exports.aspectRatio = function (_x) {
	            if (!arguments.length) {
	                return aspectRatio;
	            }
	            aspectRatio = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the height of the chart
	         * @param  {number} _x Desired width for the graph
	         * @return { height | module} Current height or Line Chart module to chain calls
	         * @public
	         */
	        exports.height = function (_x) {
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
	         * @param  {object} _x Margin object to get/set
	         * @return { margin | module} Current margin or Line Chart module to chain calls
	         * @public
	         */
	        exports.margin = function (_x) {
	            if (!arguments.length) {
	                return margin;
	            }
	            margin = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the minimum width of the graph in order to show the tooltip
	         * NOTE: This could also depend on the aspect ratio
	         * @param  {number} _x Desired tooltip threshold for the graph
	         * @return { number | module} Current tooltip threshold or Line Chart module to chain calls
	         * @public
	         */
	        exports.tooltipThreshold = function (_x) {
	            if (!arguments.length) {
	                return tooltipThreshold;
	            }
	            tooltipThreshold = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the width of the chart
	         * @param  {number} _x Desired width for the graph
	         * @return { width | module} Current width or Line Chart module to chain calls
	         * @public
	         */
	        exports.width = function (_x) {
	            if (!arguments.length) {
	                return width;
	            }
	            if (aspectRatio) {
	                height = Math.ceil(_x * aspectRatio);
	            }
	            width = _x;
	            return this;
	        };
	
	        // Rebind 'customHover' event to the "exports" function, so it's available "externally" under the typical "on" method:
	        d3.rebind(exports, dispatch, 'on');
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=line.js.map