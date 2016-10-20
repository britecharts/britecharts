(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["d3"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("d3")) : factory(root["d3"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
	
	    var d3 = __webpack_require__(1);
	
	    var exportChart = __webpack_require__(2);
	
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
	    return function line() {
	
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
	            numVerticalTics = 5,
	            overlay = undefined,
	            overlayColor = 'rgba(0, 0, 0, 0)',
	            verticalMarkerContainer = undefined,
	            verticalMarkerLine = undefined,
	            maskGridLines = undefined,
	            baseLine = undefined,
	
	
	        // extractors
	        getDate = function getDate(_ref) {
	            var date = _ref.date;
	            return date;
	        },
	            getValue = function getValue(_ref2) {
	            var value = _ref2.value;
	            return value;
	        },
	            getTopic = function getTopic(_ref3) {
	            var topic = _ref3.topic;
	            return topic;
	        },
	            getLineColor = function getLineColor(_ref4) {
	            var topic = _ref4.topic;
	            return colorScale(topic);
	        },
	
	
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
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                data = _data.data;
	                dataByDate = _data.dataByDate;
	                readableDataType = _data.readableDataType;
	
	
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	
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
	            var minX = d3.min(data, function (_ref5) {
	                var Data = _ref5.Data;
	                return d3.min(Data, getDate);
	            }),
	                maxX = d3.max(data, function (_ref6) {
	                var Data = _ref6.Data;
	                return d3.max(Data, getDate);
	            }),
	                minY = d3.min(data, function (_ref7) {
	                var Data = _ref7.Data;
	                return d3.min(Data, getValue);
	            }),
	                maxY = d3.max(data, function (_ref8) {
	                var Data = _ref8.Data;
	                return d3.max(Data, getValue);
	            });
	
	            xScale = d3.time.scale().rangeRound([0, chartWidth]).domain([minX, maxX]);
	
	            yScale = d3.scale.linear().rangeRound([chartHeight, 0]).domain([Math.abs(minY), Math.abs(maxY)]).nice(3);
	
	            colorScale = d3.scale.ordinal().range(colorRange).domain(data.map(getTopic));
	
	            // TODO add spread and rest operators to britecharts
	            /*
	                let range = colorScale.range();
	                topicColorMap = colorScale.domain().reduce((memo, item, i) => ({...memo, [item]: range[i], }), {});
	             */
	
	            var range = colorScale.range();
	            topicColorMap = colorScale.domain().reduce(function (memo, item, i) {
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
	         * Draws the x and y axis on the svg object within their
	         * respective groups
	         * @private
	         */
	        function drawAxis() {
	            svg.select('.x-axis-group .axis.x').transition().ease(ease).attr('transform', 'translate(0, ' + chartHeight + ')').call(xAxis);
	
	            svg.select('.x-axis-group .month-axis').transition().ease(ease).attr('transform', 'translate(0, ' + (chartHeight + 28) + ')').call(xMonthAxis);
	
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
	
	            topicLine = d3.svg.line().x(function (_ref9) {
	                var date = _ref9.date;
	                return xScale(date);
	            }).y(function (_ref10) {
	                var value = _ref10.value;
	                return yScale(value);
	            });
	
	            lines = svg.select('.chart-group').selectAll('.line').data(data);
	
	            lines.enter().append('g').attr('class', 'topic').append('path').attr('class', 'line').attr('d', function (_ref11) {
	                var Data = _ref11.Data;
	                return topicLine(Data);
	            }).style({
	                stroke: getLineColor
	            });
	
	            lines.exit().remove();
	
	            // We use a white rectangle to simulate the line drawing animation
	            maskingRectangle = svg.append('rect').attr('class', 'masking-rectangle').attr('width', width - 30).attr('height', height + 20).attr('x', 60).attr('y', -18);
	
	            maskingRectangle.transition().duration(2000).ease('cubic-out').attr('x', width).each('end', function () {
	                return maskingRectangle.remove();
	            });
	        }
	
	        /**
	         * Draws grid lines on the background of the chart
	         * @return void
	         */
	        function drawGridLines() {
	            maskGridLines = svg.select('.grid-lines-group').selectAll('line.horizontal-grid-line').data(yScale.ticks(5)).enter().append('line').attr({
	                class: 'horizontal-grid-line',
	                x1: -xAxisPadding.left - 30,
	                x2: chartWidth,
	                y1: function y1(d) {
	                    return yScale(d);
	                },
	                y2: function y2(d) {
	                    return yScale(d);
	                }
	            });
	
	            //draw a horizontal line to extend x-axis till the edges
	            baseLine = svg.select('.grid-lines-group').selectAll('line.extended-x-line').data([0]).enter().append('line').attr({
	                class: 'extended-x-line',
	                x1: -xAxisPadding.left - 30,
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
	        function drawHoverOverlay() {
	            overlay = svg.select('.metadata-group').append('rect').attr('class', 'overlay').attr('y1', 0).attr('y2', height).attr('height', height - margin.top - margin.bottom).attr('width', width - margin.left - margin.right).attr('fill', overlayColor).style('display', 'none');
	        }
	
	        /**
	         * Creates the vertical marker
	         * @return void
	         */
	        function drawVerticalMarker() {
	            verticalMarkerContainer = svg.select('.metadata-group').append('g').attr('class', 'hover-marker').attr('transform', 'translate(9999, 0)');
	
	            verticalMarkerLine = verticalMarkerContainer.selectAll('path').data([{
	                x1: 0,
	                y1: 0,
	                x2: 0,
	                y2: 0
	            }]).enter().append('line').classed('vertical-marker', true).attr({
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
	        function findOutNearestDate(x0, d0, d1) {
	            return new Date(x0).getTime() - new Date(d0.date).getTime() > new Date(d1.date).getTime() - new Date(x0).getTime() ? d0 : d1;
	        }
	
	        /**
	         * Calculates the maximum number of ticks for the x axis
	         * @param  {Number} width Chart width
	         * @param  {Number} dataPointNumber  Number of entries on the data
	         * @return {Number}       Number of ticks to render
	         */
	        function getMaxNumOfHorizontalTicks(width, dataPointNumber) {
	            var singleTickWidth = 20,
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
	         * @private
	         */
	        function handleMouseMove() {
	            var xPositionOffset = -margin.left,
	                //Arbitrary number, will love to know how to assess it
	            dataPoint = getNearestDataPoint(getMouseXPosition(this) + xPositionOffset),
	                dataPointXPosition = undefined;
	
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
	        function handleMouseOut(data) {
	            overlay.style('display', 'none');
	            verticalMarkerLine.classed('bc-is-active', false);
	            verticalMarkerContainer.attr('transform', 'translate(9999, 0)');
	
	            dispatch.customMouseOut(data);
	        }
	
	        /**
	         * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
	         * @private
	         */
	        function handleMouseOver(data) {
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
	            dataPoint.topics = dataPoint.topics.filter(function (t) {
	                return !!t;
	            }).sort(function (a, b) {
	                return topicColorMap[a.name] > topicColorMap[b.name];
	            });
	
	            dataPoint.topics.forEach(function (_ref12, index) {
	                var name = _ref12.name;
	
	                var marker = verticalMarkerContainer.append('g').classed('circle-container', true),
	                    circleSize = 12;
	
	                marker.append('circle').classed('data-point-highlighter', true).attr({
	                    cx: circleSize,
	                    cy: 0,
	                    r: 5
	                }).style({
	                    stroke: topicColorMap[name]
	                });
	
	                marker.attr('transform', 'translate( ' + -circleSize + ', ' + yScale(dataPoint.topics[index].value) + ' )');
	            });
	        }
	
	        /**
	         * Helper method to update the x position of the vertical marker
	         * @param  {Object} dataPoint Data entry to extract info
	         * @return void
	         */
	        function moveVerticalMarker(verticalMarkerXPosition) {
	            verticalMarkerContainer.attr('transform', 'translate(' + verticalMarkerXPosition + ',0)');
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
	        exports.aspectRatio = function (_x) {
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
	        exports.ease = function (_x) {
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
	         * @param  {Object} _x Margin object to get/set
	         * @return { (Number | Module) } Current margin or Line Chart module to chain calls
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
	         * @param  {Number} _x Desired tooltip threshold for the graph
	         * @return { (Number | Module) } Current tooltip threshold or Line Chart module to chain calls
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
	         * @param  {Number} _x Desired width for the graph
	         * @return { (Number | Module) } Current width or Line Chart module to chain calls
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
	
	        /**
	         * Chart exported to png and a download action is fired
	         * @public
	         */
	        exports.exportChart = function (filename) {
	            exportChart.call(exports, svg, filename);
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
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
	    'use strict';
	
	    var serializeWithStyles = __webpack_require__(3);
	
	    var encoder = window.btoa;
	
	    if (!encoder) {
	        encoder = __webpack_require__(4).encode;
	    }
	
	    var config = {
	        styleClass: 'britechartStyle',
	        defaultFilename: 'britechart.png',
	        chartBackground: 'white',
	        imageSourceBase: 'data:image/svg+xml;base64,',
	        get styleString() {
	            return '<style>svg{background:' + this.chartBackground + ';}</style>';
	        }
	    };
	
	    /**
	     * Main function to be used as a method by chart instances to export charts to png
	     * @param  {array} svgs (or an svg element) pass in both chart & legend as array or just chart as svg or in array
	     * @param  {string} filename [download to be called <filename>.png]
	     */
	    function exportChart(d3svg, filename) {
	        var html = undefined,
	            img = undefined,
	            canvas = undefined,
	            canvasWidth = this.width(),
	            canvasHeight = this.height();
	
	        html = convertSvgToHtml(d3svg);
	
	        canvas = createCanvas(canvasWidth, canvasHeight);
	
	        img = createImage(html);
	
	        img.onload = handleImageLoad.bind(img, canvas, filename);
	    }
	
	    /**
	     * takes d3 svg el, adds proper svg tags, adds inline styles
	     * from stylesheets, adds white background and returns string
	     * @param  {object} d3svg TYPE d3 svg element
	     * @return {string} string of passed d3
	     */
	    function convertSvgToHtml(d3svg) {
	        var serialized = undefined;
	
	        if (!d3svg) {
	            return;
	        }
	        d3svg.attr({ version: 1.1, xmlns: 'http://www.w3.org/2000/svg' });
	        serialized = serializeWithStyles(d3svg.node());
	        return serialized.replace('>', '>' + config.styleString);
	    }
	
	    /**
	     * Create Canvas
	     * @param  {number} width
	     * @param  {number} height
	     * @return {object} TYPE canvas element
	     */
	    function createCanvas(width, height) {
	        var canvas = document.createElement('canvas');
	
	        canvas.height = height;
	        canvas.width = width;
	        return canvas;
	    }
	
	    /**
	     * Create Image
	     * @param  {string} svgHtml string representation of svg el
	     * @return {object}  TYPE element <img>, src points at svg
	     */
	    function createImage(svgHtml) {
	        var img = new Image();
	
	        img.src = '' + config.imageSourceBase + encoder(svgHtml);
	        return img;
	    };
	
	    /**
	     * Draws image on canvas
	     * @param  {object} image TYPE:el <img>, to be drawn
	     * @param  {object} canvas TYPE: el <canvas>, to draw on
	     */
	    function drawImageOnCanvas(image, canvas) {
	        canvas.getContext('2d').drawImage(image, 0, 0);
	    }
	
	    /**
	     * Triggers browser to download image, convert canvas to url,
	     * we need to append the link el to the dom before clicking it for Firefox to register
	     * point <a> at it and trigger click
	     * @param  {object} canvas TYPE: el <canvas>
	     * @param  {string} filename
	     * @param  {string} extensionType
	     */
	    function downloadCanvas(canvas) {
	        var filename = arguments.length <= 1 || arguments[1] === undefined ? 'britechart.png' : arguments[1];
	        var extensionType = arguments.length <= 2 || arguments[2] === undefined ? 'image/png' : arguments[2];
	
	        var url = canvas.toDataURL(extensionType);
	        var link = document.createElement('a');
	
	        link.href = url;
	        link.download = filename;
	        document.body.appendChild(link);
	        link.click();
	        document.body.removeChild(link);
	    }
	
	    /**
	     * Handles on load event fired by img.onload, this=img
	     * @param  {object} canvas TYPE: el <canvas>
	     * @param  {string} filename
	     * @param  {object} e
	     */
	    function handleImageLoad(canvas, filename, e) {
	        e.preventDefault();
	        drawImageOnCanvas(this, canvas);
	        downloadCanvas(canvas, filename || config.defaultFilename);
	    }
	
	    return exportChart;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	
	    'use strict';
	
	    // Mapping between tag names and css default values lookup tables. This allows to exclude default values in the result.
	
	    var defaultStylesByTagName = {};
	
	    // Styles inherited from style sheets will not be rendered for elements with these tag names
	    var noStyleTags = { 'BASE': true, 'HEAD': true, 'HTML': true, 'META': true, 'NOFRAME': true, 'NOSCRIPT': true, 'PARAM': true, 'SCRIPT': true, 'STYLE': true, 'TITLE': true };
	
	    // This list determines which css default values lookup tables are precomputed at load time
	    // Lookup tables for other tag names will be automatically built at runtime if needed
	    var tagNames = ['A', 'ABBR', 'ADDRESS', 'AREA', 'ARTICLE', 'ASIDE', 'AUDIO', 'B', 'BASE', 'BDI', 'BDO', 'BLOCKQUOTE', 'BODY', 'BR', 'BUTTON', 'CANVAS', 'CAPTION', 'CENTER', 'CITE', 'CODE', 'COL', 'COLGROUP', 'COMMAND', 'DATALIST', 'DD', 'DEL', 'DETAILS', 'DFN', 'DIV', 'DL', 'DT', 'EM', 'EMBED', 'FIELDSET', 'FIGCAPTION', 'FIGURE', 'FONT', 'FOOTER', 'FORM', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HEAD', 'HEADER', 'HGROUP', 'HR', 'HTML', 'I', 'IFRAME', 'IMG', 'INPUT', 'INS', 'KBD', 'LABEL', 'LEGEND', 'LI', 'LINK', 'MAP', 'MARK', 'MATH', 'MENU', 'META', 'METER', 'NAV', 'NOBR', 'NOSCRIPT', 'OBJECT', 'OL', 'OPTION', 'OPTGROUP', 'OUTPUT', 'P', 'PARAM', 'PRE', 'PROGRESS', 'Q', 'RP', 'RT', 'RUBY', 'S', 'SAMP', 'SCRIPT', 'SECTION', 'SELECT', 'SMALL', 'SOURCE', 'SPAN', 'STRONG', 'STYLE', 'SUB', 'SUMMARY', 'SUP', 'SVG', 'TABLE', 'TBODY', 'TD', 'TEXTAREA', 'TFOOT', 'TH', 'THEAD', 'TIME', 'TITLE', 'TR', 'TRACK', 'U', 'UL', 'VAR', 'VIDEO', 'WBR'];
	
	    // Precompute the lookup tables.
	    [].forEach.call(tagNames, function (name) {
	        if (!noStyleTags[name]) {
	            defaultStylesByTagName[name] = computeDefaultStyleByTagName(name);
	        }
	    });
	
	    function computeDefaultStyleByTagName(tagName) {
	        var defaultStyle = {},
	            element = document.body.appendChild(document.createElement(tagName)),
	            computedStyle = window.getComputedStyle(element);
	
	        [].forEach.call(computedStyle, function (style) {
	            defaultStyle[style] = computedStyle[style];
	        });
	        document.body.removeChild(element);
	        return defaultStyle;
	    }
	
	    function getDefaultStyleByTagName(tagName) {
	        tagName = tagName.toUpperCase();
	        if (!defaultStylesByTagName[tagName]) {
	            defaultStylesByTagName[tagName] = computeDefaultStyleByTagName(tagName);
	        }
	        return defaultStylesByTagName[tagName];
	    };
	
	    //ie9 only supports outerHTML on certain tags
	    function outerHTMLPolyfill() {
	        var _this = this;
	
	        Object.defineProperty(SVGElement.prototype, 'outerHTML', {
	            get: function get() {
	                var temp = document.createElement('div');
	                var node = _this.cloneNode(true);
	
	                temp.appendChild(node);
	                return temp.innerHTML;
	            },
	            enumerable: false,
	            configurable: true
	        });
	    }
	
	    function serializeWithStyles(elem) {
	
	        var cssTexts = [],
	            elements = undefined,
	            computedStyle = undefined,
	            defaultStyle = undefined,
	            result = undefined;
	
	        if (!elem || elem.nodeType !== Node.ELEMENT_NODE) {
	            console.error('Error: Object passed in to serializeWithSyles not of nodeType Node.ELEMENT_NODE');
	            return;
	        }
	
	        if (!elem.outerHTML) {
	            outerHTMLPolyfill();
	        }
	
	        cssTexts = [];
	        elements = elem.querySelectorAll('*');
	
	        [].forEach.call(elements, function (el, i) {
	            if (!noStyleTags[el.tagName]) {
	                computedStyle = window.getComputedStyle(el);
	                defaultStyle = getDefaultStyleByTagName(el.tagName);
	                cssTexts[i] = el.style.cssText;
	                [].forEach.call(computedStyle, function (cssPropName) {
	                    if (computedStyle[cssPropName] !== defaultStyle[cssPropName]) {
	                        el.style[cssPropName] = computedStyle[cssPropName];
	                    }
	                });
	            }
	        });
	
	        result = elem.outerHTML;
	        elements = [].map.call(elements, function (el, i) {
	            el.style.cssText = cssTexts[i];
	            return el;
	        });
	
	        return result;
	    };
	
	    return serializeWithStyles;
	}();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
	;(function(root) {
	
		// Detect free variables `exports`.
		var freeExports = typeof exports == 'object' && exports;
	
		// Detect free variable `module`.
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;
	
		// Detect free variable `global`, from Node.js or Browserified code, and use
		// it as `root`.
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}
	
		/*--------------------------------------------------------------------------*/
	
		var InvalidCharacterError = function(message) {
			this.message = message;
		};
		InvalidCharacterError.prototype = new Error;
		InvalidCharacterError.prototype.name = 'InvalidCharacterError';
	
		var error = function(message) {
			// Note: the error messages used throughout this file match those used by
			// the native `atob`/`btoa` implementation in Chromium.
			throw new InvalidCharacterError(message);
		};
	
		var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		// http://whatwg.org/html/common-microsyntaxes.html#space-character
		var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;
	
		// `decode` is designed to be fully compatible with `atob` as described in the
		// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
		// The optimized base64-decoding algorithm used is based on @atk’s excellent
		// implementation. https://gist.github.com/atk/1020396
		var decode = function(input) {
			input = String(input)
				.replace(REGEX_SPACE_CHARACTERS, '');
			var length = input.length;
			if (length % 4 == 0) {
				input = input.replace(/==?$/, '');
				length = input.length;
			}
			if (
				length % 4 == 1 ||
				// http://whatwg.org/C#alphanumeric-ascii-characters
				/[^+a-zA-Z0-9/]/.test(input)
			) {
				error(
					'Invalid character: the string to be decoded is not correctly encoded.'
				);
			}
			var bitCounter = 0;
			var bitStorage;
			var buffer;
			var output = '';
			var position = -1;
			while (++position < length) {
				buffer = TABLE.indexOf(input.charAt(position));
				bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
				// Unless this is the first of a group of 4 characters…
				if (bitCounter++ % 4) {
					// …convert the first 8 bits to a single ASCII character.
					output += String.fromCharCode(
						0xFF & bitStorage >> (-2 * bitCounter & 6)
					);
				}
			}
			return output;
		};
	
		// `encode` is designed to be fully compatible with `btoa` as described in the
		// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
		var encode = function(input) {
			input = String(input);
			if (/[^\0-\xFF]/.test(input)) {
				// Note: no need to special-case astral symbols here, as surrogates are
				// matched, and the input is supposed to only contain ASCII anyway.
				error(
					'The string to be encoded contains characters outside of the ' +
					'Latin1 range.'
				);
			}
			var padding = input.length % 3;
			var output = '';
			var position = -1;
			var a;
			var b;
			var c;
			var d;
			var buffer;
			// Make sure any padding is handled outside of the loop.
			var length = input.length - padding;
	
			while (++position < length) {
				// Read three bytes, i.e. 24 bits.
				a = input.charCodeAt(position) << 16;
				b = input.charCodeAt(++position) << 8;
				c = input.charCodeAt(++position);
				buffer = a + b + c;
				// Turn the 24 bits into four chunks of 6 bits each, and append the
				// matching character for each of them to the output.
				output += (
					TABLE.charAt(buffer >> 18 & 0x3F) +
					TABLE.charAt(buffer >> 12 & 0x3F) +
					TABLE.charAt(buffer >> 6 & 0x3F) +
					TABLE.charAt(buffer & 0x3F)
				);
			}
	
			if (padding == 2) {
				a = input.charCodeAt(position) << 8;
				b = input.charCodeAt(++position);
				buffer = a + b;
				output += (
					TABLE.charAt(buffer >> 10) +
					TABLE.charAt((buffer >> 4) & 0x3F) +
					TABLE.charAt((buffer << 2) & 0x3F) +
					'='
				);
			} else if (padding == 1) {
				buffer = input.charCodeAt(position);
				output += (
					TABLE.charAt(buffer >> 2) +
					TABLE.charAt((buffer << 4) & 0x3F) +
					'=='
				);
			}
	
			return output;
		};
	
		var base64 = {
			'encode': encode,
			'decode': decode,
			'version': '0.1.0'
		};
	
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return base64;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = base64;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (var key in base64) {
					base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.base64 = base64;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module), (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ])
});
;
//# sourceMappingURL=line.js.map