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
	     * @typdef D3Layout
	     * @type function
	     */
	
	    /**
	     * Stacked Area Chart reusable API module that allows us
	     * rendering a multi area and configurable chart.
	     *
	     * @module Stacked Area
	     * @version 0.0.1
	     * @tutorial stacked-area
	     * @requires d3
	     *
	     */
	    return function module() {
	
	        var margin = {
	            left: 40,
	            right: 20,
	            top: 60,
	            bottom: 40
	        },
	            width = 960,
	            height = 500,
	            xScale = undefined,
	            xAxis = undefined,
	            xMonthAxis = undefined,
	            yScale = undefined,
	            yAxis = undefined,
	            monthAxisPadding = 30,
	            numVerticalTicks = 5,
	            yTickTextYOffset = -8,
	            colors = ['#051C48', '#9963D5', '#FF4D7C', '#E5C400', '#4DDB86', '#4DC2F5'],
	            colorOrder = {
	            '#051C48': 0,
	            '#9963D5': 1,
	            '#FF4D7C': 2,
	            '#E5C400': 3,
	            '#4DDB86': 4,
	            '#4DC2F5': 5
	        },
	            areaOpacity = 0.8,
	            colorScale = undefined,
	            categoryColorMap = undefined,
	            layers = undefined,
	            layersInitial = undefined,
	            area = undefined,
	
	
	        // Area Animation
	        maxAreaNumber = 8,
	            areaAnimationDelayStep = 20,
	            areaAnimationDelays = d3.range(areaAnimationDelayStep, maxAreaNumber * areaAnimationDelayStep, areaAnimationDelayStep),
	            overlay = undefined,
	            verticalMarkerContainer = undefined,
	            verticalMarker = undefined,
	            dataPoints = {},
	            pointsSize = 1.5,
	            pointsColor = '#c0c6cc',
	            pointsBorderColor = '#ffffff',
	            ease = 'quad-out',
	            areaAnimationDuration = 1000,
	            svg = undefined,
	            chartWidth = undefined,
	            chartHeight = undefined,
	            data = undefined,
	            dataByDate = undefined,
	            tooltipThreshold = 480,
	            dateLabel = 'dateUTC',
	            valueLabel = 'views',
	
	
	        // getters
	        getValueLabel = function getValueLabel(d) {
	            return d[valueLabel];
	        },
	            getValues = function getValues(_ref) {
	            var values = _ref.values;
	            return values;
	        },
	            getKey = function getKey(_ref2) {
	            var key = _ref2.key;
	            return key;
	        },
	            getName = function getName(_ref3) {
	            var name = _ref3.name;
	            return name;
	        },
	            getDate = function getDate(_ref4) {
	            var date = _ref4.date;
	            return date;
	        },
	
	
	        // formats
	        utc = d3.time.format.utc('%Y-%m-%dT%H:%M:%SZ'),
	            parseUTC = utc.parse,
	            yTickFormat = d3.format('s'),
	            xTickFormat = d3.time.format('%e'),
	            xTickMonthFormat = d3.time.format('%b'),
	
	
	        // events
	        dispatch = d3.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');
	
	        /**
	          * This function creates the graph using the selection and data provided
	          * @param {D3Selection} _selection A d3 selection that represents
	          * the container(s) where the chart(s) will be rendered
	          * @param {Object} _data The data to attach and generate the chart
	          */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	                data = cleanData(_data);
	                dataByDate = d3.nest().key(getDate).entries(_data.sort(function (a, b) {
	                    if (a.date < b.date) return -1;
	                    if (a.date > b.date) return 1;
	                    return 0;
	                }));
	                buildLayers();
	                buildScales();
	                buildAxis();
	                buildSVG(this);
	                drawStackedAreas();
	                drawAxis();
	                drawDataReferencePoints();
	
	                if (shouldShowTooltip()) {
	                    drawHoverOverlay();
	                    drawVerticalMarker();
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
	         * Calculates the maximum number of ticks for the x axis
	         * @param  {Number} width Chart width
	         * @param  {Number} dataPointNumber  Number of entries on the data
	         * @return {Number}       Number of ticks to render
	         */
	        function getMaxNumOfHorizontalTicks(width, dataPointNumber) {
	            var singleTickWidth = 30,
	                spacing = 30,
	                ticksForWidth = Math.ceil(width / (singleTickWidth + spacing));
	
	            return Math.min(dataPointNumber, ticksForWidth);
	        }
	
	        /**
	         * Creates the d3 x and y axis, setting orientations
	         * @private
	         */
	        function buildAxis() {
	            xAxis = d3.svg.axis().scale(xScale).ticks(getMaxNumOfHorizontalTicks(chartWidth, dataByDate.length)).tickFormat(xTickFormat).tickSize(10, 0, 0).outerTickSize([50]).tickPadding([10]).orient('bottom');
	
	            //TODO: Review this axis with real data
	            xMonthAxis = d3.svg.axis().scale(xScale).ticks(d3.time.months).tickFormat(xTickMonthFormat).tickSize(10, 0, 0).tickPadding([10]).orient('bottom');
	
	            yAxis = d3.svg.axis().scale(yScale).ticks(numVerticalTicks).tickFormat(yTickFormat).tickSize(width, 0, 0).outerTickSize([50]).tickPadding([4]).orient('right');
	        }
	
	        /**
	         * Builds containers for the chart, the axis and a wrapper for all of them
	         * NOTE: The order of drawing of this group elements is really important,
	         * as everything else will be drawn on top of them
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
	            container.append('g').classed('x-axis-group', true).append('g').classed('x axis', true);
	            container.selectAll('.x-axis-group').append('g').classed('month-axis', true);
	            container.append('g').classed('y-axis-group axis', true);
	            container.append('g').classed('chart-group', true);
	            container.append('g').classed('metadata-group', true);
	        }
	
	        /**
	         * Builds the stacked layers layout
	         * @return {D3Layout} Layout for drawing the chart
	         * @private
	         */
	        function buildLayers() {
	            var stack = d3.layout.stack().offset('zero').values(getValues).x(getDate).y(getValueLabel);
	
	            var nest = d3.nest().key(getName);
	
	            layersInitial = stack(nest.entries(createEmptyInitialSet(data)));
	            layers = stack(nest.entries(data));
	        }
	
	        /**
	         * Creates the x, y and color scales of the chart
	         * @private
	         */
	        function buildScales() {
	            xScale = d3.time.scale().domain(d3.extent(data, function (_ref5) {
	                var date = _ref5.date;
	                return date;
	            })).range([0, chartWidth]);
	
	            yScale = d3.scale.linear().domain([0, d3.max(data, function (_ref6) {
	                var y0 = _ref6.y0;
	                var y = _ref6.y;
	                return y0 + y;
	            })]).range([chartHeight, 0]).nice([numVerticalTicks + 1]);
	
	            colorScale = d3.scale.ordinal().range(colors).domain(data.map(getName));
	
	            // TODO add spread and rest operators to britecharts
	            /*
	                let range = colorScale.range();
	                categoryColorMap = colorScale.domain().reduce((memo, item, i) => ({...memo, [item]: range[i], }), {});
	             */
	
	            var range = colorScale.range();
	            categoryColorMap = colorScale.domain().reduce(function (memo, item, i) {
	                memo[item] = range[i];
	                return memo;
	            }, {});
	        }
	
	        /**
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3.select(container).append('svg').classed('britechart stacked-area', true);
	
	                buildContainerGroups();
	            }
	
	            svg.transition().ease(ease).attr({ width: width, height: height });
	        }
	
	        /**
	         * Parses dates and values into JS Date objects and numbers
	         * @param  {obj} data Raw data from JSON file
	         * @return {obj}      Parsed data with values and dates
	         */
	        function cleanData(data) {
	
	            // could be rewritten using spread operator
	            /*
	                return data.map((d) => {...d, date: parseUTC(d[dateLabel], [valueLabel] : +d[valueLabel]})
	             */
	            return data.map(function (d) {
	                d.date = parseUTC(d[dateLabel]);
	                d[valueLabel] = +d[valueLabel];
	                return d;
	            });
	        }
	
	        /**
	         * Removes all the datapoints highlighter circles added to the marker container
	         * @return void
	         */
	        function eraseDataPointHighlights() {
	            verticalMarkerContainer.selectAll('.circle-container').remove();
	        }
	
	        /**
	         * Creates a copy of the data with values set to 0
	         * @param  {obj[]} data Array of objects with the original data
	         * @return {obj[]}      Array of objects with the original data and 0 values
	         */
	        function createEmptyInitialSet(data) {
	            // Parsing and stringify is a way of duplicating an array of objects
	            // spread could refactor this .map((value) => ({ ...value, [valueLabel]: 0}))
	            return cleanData(JSON.parse(JSON.stringify(data)).map(function (value) {
	                value[valueLabel] = 0;
	                // value.date = parseUTC(value)
	                return value;
	            }));
	        }
	
	        /**
	         * Draws the x and y axis on the svg object within their
	         * respective groups
	         * @private
	         */
	        function drawAxis() {
	            svg.select('.x-axis-group .axis.x').attr('transform', 'translate( 0, ' + chartHeight + ' )').call(xAxis);
	
	            svg.select('.x-axis-group .month-axis').attr('transform', 'translate(0, ' + (chartHeight + monthAxisPadding) + ')').call(xMonthAxis);
	
	            svg.select('.y-axis-group.axis').attr('transform', 'translate( ' + -margin.left + ', 0)').call(yAxis);
	
	            // Moving the YAxis tick labels to the right side
	            d3.selectAll('.y-axis-group .tick text').attr('transform', 'translate( ' + -width + ', ' + yTickTextYOffset + ')');
	        }
	
	        /**
	         * Creates SVG dot elements for each data entry and draws them
	         */
	        function drawDataReferencePoints() {
	            // Creates Dots on Data points
	            var points = svg.select('.chart-group').selectAll('.dots').data(layers).enter().append('g').attr({
	                'class': 'dots',
	                'd': function d(_ref7) {
	                    var values = _ref7.values;
	                    return area(values);
	                },
	                'clip-path': 'url(#clip)'
	            });
	
	            // Processes the points
	            // TODO: Optimize this code
	            points.selectAll('.dot').data(function (_ref8, index) {
	                var values = _ref8.values;
	                return values.map(function (point) {
	                    return { index: index, point: point };
	                });
	            }).enter().append('circle').attr('class', 'dot').attr('r', function () {
	                return pointsSize;
	            }).attr('fill', function () {
	                return pointsColor;
	            }).attr('stroke-width', '0').attr('stroke', pointsBorderColor).attr('transform', function (d) {
	                var point = d.point;
	
	                var key = xScale(point.date);
	
	                dataPoints[key] = dataPoints[key] || [];
	                dataPoints[key].push(d);
	
	                var date = point.date;
	                var y = point.y;
	                var y0 = point.y0;
	
	                return 'translate( ' + xScale(date) + ', ' + yScale(y + y0) + ' )';
	            });
	        }
	
	        /**
	         * Draws an overlay element over the graph
	         * @private
	         */
	        function drawHoverOverlay() {
	            overlay = svg.select('.metadata-group').append('rect').attr({
	                class: 'overlay',
	                y1: 0,
	                y2: chartHeight,
	                height: chartHeight,
	                width: chartWidth,
	                fill: 'rgba(0,0,0,0)'
	            }).style('display', 'none');
	        }
	
	        /**
	         * Draws the different areas into the chart-group element
	         * @private
	         */
	        function drawStackedAreas() {
	            var areas = svg.select('.chart-group').selectAll('.layer').data(layersInitial);
	
	            // Creating Area function
	            area = d3.svg.area().interpolate('cardinal').x(function (_ref9) {
	                var date = _ref9.date;
	                return xScale(date);
	            }).y0(function (_ref10) {
	                var y0 = _ref10.y0;
	                return yScale(y0);
	            }).y1(function (_ref11) {
	                var y0 = _ref11.y0;
	                var y = _ref11.y;
	                return yScale(y0 + y);
	            });
	
	            // Enter
	            areas.enter().append('path').attr('class', 'layer').attr('d', function (_ref12) {
	                var values = _ref12.values;
	                return area(values);
	            }).style('fill', function (_ref13) {
	                var key = _ref13.key;
	                return categoryColorMap[key];
	            });
	
	            // Update
	            svg.select('.chart-group').selectAll('.layer').data(layers).transition().delay(function (_, i) {
	                return areaAnimationDelays[i];
	            }).duration(areaAnimationDuration).ease(ease).attr('d', function (_ref14) {
	                var values = _ref14.values;
	                return area(values);
	            }).style('opacity', areaOpacity).style('fill', function (_ref15) {
	                var key = _ref15.key;
	                return categoryColorMap[key];
	            });
	
	            // Exit
	            areas.exit().transition().style({ opacity: 0 }).remove();
	        }
	
	        /**
	         * Creates the vertical marker
	         * @return void
	         */
	        function drawVerticalMarker() {
	            verticalMarkerContainer = svg.select('.metadata-group').append('g').attr('class', 'vertical-marker-container').attr('transform', 'translate(9999, 0)');
	
	            verticalMarker = verticalMarkerContainer.selectAll('path').data([{
	                x1: 0,
	                y1: 0,
	                x2: 0,
	                y2: 0
	            }]).enter().append('line').classed('vertical-marker', true).attr({
	                x1: 0,
	                y1: chartHeight,
	                x2: 0,
	                y2: 0
	            });
	        }
	
	        /**
	         * Extract X position on the chart from a given mouse event
	         * @param  {obj} event D3 mouse event
	         * @return {Number}       Position on the x axis of the mouse
	         * @private
	         */
	        function getMouseXPosition(event) {
	            return d3.mouse(event)[0];
	        }
	
	        /**
	         * Finds out the data entry that is closer to the given position on pixels
	         * @param  {Number} mouseX X position of the mouse
	         * @return {obj}        Data entry that is closer to that x axis position
	         */
	        function getNearestDataPoint(mouseX) {
	            var epsilon = undefined,
	                nearest = undefined;
	
	            //could use spread operator, would prevent mutation of original data
	            /*
	                let dataByDateParsed = dataByDate.map((item) => ({...item, key: new Date(item.key)}))
	             */
	            var dataByDateParsed = dataByDate.map(function (item) {
	                item.key = new Date(item.key);
	                return item;
	            });
	
	            epsilon = (xScale(dataByDateParsed[1].key) - xScale(dataByDateParsed[0].key)) / 2;
	            nearest = dataByDateParsed.find(function (_ref16) {
	                var key = _ref16.key;
	                return Math.abs(xScale(key) - mouseX) <= epsilon;
	            });
	
	            return nearest;
	        }
	
	        /**
	         * MouseMove handler, calculates the nearest dataPoint to the cursor
	         * and updates metadata related to it
	         * @private
	         */
	        function handleMouseMove() {
	            var dataPoint = getNearestDataPoint(getMouseXPosition(this) - margin.left),
	                dataPointXPosition = undefined;
	
	            if (dataPoint) {
	                dataPointXPosition = xScale(new Date(dataPoint.key));
	                // Move verticalMarker to that datapoint
	                moveVerticalMarker(dataPointXPosition);
	                // Add data points highlighting
	                highlightDataPoints(dataPoint);
	                // Emit event with xPosition for tooltip or similar feature
	                dispatch.customMouseMove(dataPoint, categoryColorMap, dataPointXPosition);
	            }
	        }
	
	        /**
	         * MouseOut handler, hides overlay and removes active class on verticalMarkerLine
	         * It also resets the container of the vertical marker
	         * @private
	         */
	        function handleMouseOut(data) {
	            overlay.style('display', 'none');
	            verticalMarker.classed('bc-is-active', false);
	            verticalMarkerContainer.attr('transform', 'translate(9999, 0)');
	
	            dispatch.customMouseOut(data);
	        }
	
	        /**
	         * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
	         * @private
	         */
	        function handleMouseOver(data) {
	            overlay.style('display', 'block');
	            verticalMarker.classed('bc-is-active', true);
	
	            dispatch.customMouseOver(data);
	        }
	
	        /**
	         * Creates coloured circles marking where the exact data y value is for a given data point
	         * @param  {obj} dataPoint Data point to extract info from
	         * @private
	         */
	        function highlightDataPoints(dataPoint) {
	            var accumulator = 0;
	
	            eraseDataPointHighlights();
	
	            // sorting the values based on the order of the colors,
	            // so that the order always stays constant
	            dataPoint.values = dataPoint.values.filter(function (v) {
	                return !!v;
	            }).sort(function (a, b) {
	                return colorOrder[a.el] > colorOrder[b.el];
	            });
	
	            dataPoint.values.forEach(function (_ref17, index) {
	                var name = _ref17.name;
	
	                var marker = verticalMarkerContainer.append('g').classed('circle-container', true),
	                    circleSize = 12;
	
	                accumulator = accumulator + dataPoint.values[index][valueLabel];
	
	                marker.append('circle').classed('data-point-highlighter', true).attr({
	                    'cx': circleSize,
	                    'cy': 0,
	                    'r': 5
	                }).style({
	                    'stroke-width': 3,
	                    'stroke': categoryColorMap[name]
	                });
	
	                marker.attr('transform', 'translate( ' + -circleSize + ', ' + yScale(accumulator) + ' )');
	            });
	        }
	
	        /**
	         * Helper method to update the x position of the vertical marker
	         * @param  {obj} dataPoint Data entry to extract info
	         * @return void
	         */
	        function moveVerticalMarker(verticalMarkerXPosition) {
	            verticalMarkerContainer.attr('transform', 'translate(' + verticalMarkerXPosition + ',0)');
	        }
	
	        /**
	         * Determines if we should add the tooltip related logic depending on the
	         * size of the chart and the tooltipThreshold variable value
	         * @return {boolean} Should we build the tooltip?
	         * @private
	         */
	        function shouldShowTooltip() {
	            return width > tooltipThreshold;
	        }
	
	        // Accessors
	        /**
	         * Gets or Sets the ease of the chart
	         * @param  {Number} _x Desired width for the graph
	         * @return { ease | module} Current ease animation or Area Chart module to chain calls
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
	         * @return { height | module} Current height or Area Chart module to chain calls
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
	         * @param  {Object} _x Margin object to get/set
	         * @return { margin | module} Current margin or Area Chart module to chain calls
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
	         * Gets or Sets the tooltipThreshold of the chart
	         * @param  {Object} _x Margin object to get/set
	         * @return { tooltipThreshold | module} Current tooltipThreshold or Area Chart module to chain calls
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
	         * @return { width | module} Current width or Area Chart module to chain calls
	         * @public
	         */
	        exports.width = function (_x) {
	            if (!arguments.length) {
	                return width;
	            }
	            width = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the valueLabel of the chart
	         * @param  {Number} _x Desired valueLabel for the graph
	         * @return { valueLabel | module} Current valueLabel or Chart module to chain calls
	         * @public
	         */
	        exports.valueLabel = function (_x) {
	            if (!arguments.length) {
	                return valueLabel;
	            }
	            valueLabel = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the dateLabel of the chart
	         * @param  {Number} _x Desired dateLabel for the graph
	         * @return { dateLabel | module} Current dateLabel or Chart module to chain calls
	         * @public
	         */
	        exports.dateLabel = function (_x) {
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
//# sourceMappingURL=stacked-area.js.map