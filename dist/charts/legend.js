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
	
	    /**
	     * @typdef D3Selection
	     * @type Array[]
	     */
	
	    /**
	     * @fileOverview Legend Component reusable API class that renders a
	     * simple and configurable legend element.
	     *
	     * @tutorial legend
	     * @exports charts/legend
	     * @requires d3
	     * @version 0.0.1
	     */
	    return function module() {
	
	        var margin = {
	            top: 20,
	            right: 10,
	            bottom: 10,
	            left: 10
	        },
	            width = 320,
	            height = 180,
	            lineMargin = 10,
	            circleRadius = 8,
	            circleYOffset = -5,
	            textSize = 12,
	            textLetterSpacing = 0.5,
	            valueReservedSpace = 40,
	            numberLetterSpacing = 0.8,
	            numberFormat = d3.format('s'),
	            isFadedClassName = 'is-faded',
	
	
	        // colors
	        colorScale = d3.scale.category20c(),
	            colorScheme = ['#00AF38', '#41C2C9', '#F6C664', '#F4693A', '#9A66D7'],
	            entries = undefined,
	            chartWidth = undefined,
	            chartHeight = undefined,
	            data = undefined,
	            svg = undefined;
	
	        /**
	         * This function creates the graph using the selection as container
	         * @param  {D3Selection} _selection A d3 selection that represents
	         *                                  the container(s) where the chart(s) will be rendered
	         */
	        function exports(_selection) {
	            /* @param {object} _data The data to attach and generate the chart */
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	                data = _data;
	
	                buildColorScale();
	                buildSVG(this);
	                drawEntries();
	            });
	        }
	
	        /**
	         * Builds containers for the legend
	         * Also applies the Margin convention
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('legend-container-group', true).attr({
	                transform: 'translate(' + margin.left + ',' + margin.top + ')'
	            });
	
	            container.append('g').classed('legend-group', true);
	        }
	
	        /**
	         * Builds color scale for chart, if any colorScheme was defined
	         * @private
	         */
	        function buildColorScale() {
	            if (colorScheme) {
	                colorScale = d3.scale.ordinal().range(colorScheme);
	            }
	        }
	
	        /**
	         * Builds the SVG element that will contain the chart
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3.select(container).append('svg').classed('britechart britechart-legend', true);
	
	                buildContainerGroups();
	            }
	            svg.transition().attr({
	                width: width + margin.left + margin.right,
	                height: height + margin.top + margin.bottom
	            });
	        }
	
	        /**
	         * Removes the faded class from all the entry lines
	         */
	        function cleanFadedLines() {
	            entries.classed(isFadedClassName, false);
	        }
	
	        /**
	         * Draws the entries of the legend
	         * @private
	         */
	        function drawEntries() {
	            entries = svg.select('.legend-group').selectAll('g.legend-line').data(data);
	
	            // Enter
	            entries.enter().append('g').classed('legend-line', true).attr('data-item', function (d) {
	                return d.id;
	            }).attr('transform', function (d, i) {
	                var horizontalOffset = 2 * circleRadius + 10,
	                    lineHeightBis = chartHeight / data.length,
	                    verticalOffset = i * lineHeightBis;
	
	                return 'translate(' + horizontalOffset + ',' + verticalOffset + ')';
	            });
	
	            entries.append('circle').classed('legend-circle', true).attr({
	                'cx': 0,
	                'cy': circleYOffset,
	                'r': circleRadius
	            }).style({
	                'fill': function fill(d) {
	                    return colorScale(d.quantity);
	                },
	                'stroke-width': 1
	            });
	
	            entries.append('text').classed('legend-entry-name', true).text(function (d) {
	                return d.name;
	            }).attr({
	                x: 2 * circleRadius + lineMargin
	            }).style({
	                'font-size': textSize + 'px',
	                'letter-spacing': textLetterSpacing + 'px'
	            });
	
	            entries.append('text').classed('legend-entry-value', true).text(function (d) {
	                return numberFormat(d['quantity']);
	            }).attr({
	                x: chartWidth - valueReservedSpace
	            }).style({
	                'font-size': textSize + 'px',
	                'letter-spacing': numberLetterSpacing + 'px',
	                'text-anchor': 'end',
	                'startOffset': '100%'
	            });
	
	            // Exit
	            entries.exit().transition().style({ opacity: 0 }).remove();
	        }
	
	        /**
	         * Applies the faded class to all lines but the one that has the given id
	         * @param  {number} exceptionItemId Id of the line that needs to stay the same
	         */
	        function fadeLinesBut(exceptionItemId) {
	            entries.classed(isFadedClassName, true);
	            d3.select('[data-item="' + exceptionItemId + '"]').classed(isFadedClassName, false);
	        }
	
	        /**
	         * Clears the highlighted line entry
	         */
	        exports.clearHighlight = function () {
	            cleanFadedLines();
	        };
	
	        /**
	         * Gets or Sets the height of the legend chart
	         * @param  {number} _x Desired width for the chart
	         * @return { height | module} Current height or Legend module to chain calls
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
	         * Highlights a line entry by fading the rest of lines
	         * @param  {number} entryId ID of the entry line
	         */
	        exports.highlight = function (entryId) {
	            cleanFadedLines();
	            fadeLinesBut(entryId);
	        };
	
	        /**
	         * Gets or Sets the margin of the legend chart
	         * @param  {object} _x Margin object to get/set
	         * @return { margin | module} Current margin or Legend module to chain calls
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
	         * Gets or Sets the width of the legend chart
	         * @param  {number} _x Desired width for the graph
	         * @return { width | module} Current width or Legend module to chain calls
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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=legend.js.map