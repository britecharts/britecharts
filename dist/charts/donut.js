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
	     * Reusable Donut Chart API class that renders a
	     * simple and configurable donut chart.
	     *
	     * @module Donut
	     * @version 0.0.1
	     * @tutorial donut
	     * @requires d3
	     *
	     * @example
	     * var donutChart = donut();
	     *
	     * donutChart
	     *     .externalRadius(500)
	     *     .internalRadius(200);
	     *
	     * d3.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(donutChart);
	     *
	     */
	    return function module() {
	
	        var margin = {
	            top: 60,
	            right: 60,
	            bottom: 60,
	            left: 60
	        },
	            width = 300,
	            height = 300,
	            ease = 'cubic-in-out',
	            arcTransitionDuration = 750,
	            pieDrawingTransitionDuration = 1200,
	            pieHoverTransitionDuration = 150,
	            radiusHoverOffset = 15,
	            paddingAngle = 0.015,
	            data = undefined,
	            chartWidth = undefined,
	            chartHeight = undefined,
	            externalRadius = 140,
	            internalRadius = 45.5,
	            legendWidth = externalRadius + internalRadius,
	            layout = undefined,
	            shape = undefined,
	            slices = undefined,
	            svg = undefined,
	
	
	        // colors
	        colorScale = d3.scale.category20c(),
	            colorScheme = ['#00AF38', '#41C2C9', '#F6C664', '#F4693A', '#9A66D7'],
	
	
	        // utils
	        storeAngle = function storeAngle(d) {
	            this._current = d;
	        },
	            reduceOuterRadius = function reduceOuterRadius(d) {
	            d.outerRadius = externalRadius - radiusHoverOffset;
	        },
	            sortComparator = function sortComparator(a, b) {
	            return b.quantity - a.quantity;
	        },
	
	
	        // extractors
	        getQuantity = function getQuantity(d) {
	            return parseInt(d.quantity, 10);
	        },
	            getSliceFill = function getSliceFill(d) {
	            return colorScale(d.data.name);
	        },
	
	
	        // events
	        dispatch = d3.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');
	
	        /**
	         * This function creates the graph using the selection as container
	         *
	         * @param {D3Selection} _selection A d3 selection that represents
	         *                                  the container(s) where the chart(s) will be rendered
	         * @param {Object} _data The data to attach and generate the chart
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	                data = _data;
	
	                buildLayout();
	                buildColorScale();
	                buildShape();
	                buildSVG(this);
	                drawSlices();
	                initTooltip();
	            });
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
	         * Builds containers for the chart, the legend and a wrapper for all of them
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('container-group', true).attr({
	                transform: 'translate(' + width / 2 + ', ' + height / 2 + ')'
	            });
	
	            container.append('g').classed('chart-group', true);
	            container.append('g').classed('legend-group', true);
	        }
	
	        /**
	         * Builds the pie layout that will produce data ready to draw
	         * @private
	         */
	        function buildLayout() {
	            layout = d3.layout.pie().padAngle(paddingAngle).value(getQuantity).sort(sortComparator);
	        }
	
	        /**
	         * Builds the shape function
	         * @private
	         */
	        function buildShape() {
	            shape = d3.svg.arc().innerRadius(internalRadius).padRadius(externalRadius);
	        }
	
	        /**
	         * Builds the SVG element that will contain the chart
	         *
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            svg = d3.select(container).selectAll('svg').data([data]);
	
	            svg.enter().append('svg').attr('class', 'britechart donut-chart');
	
	            buildContainerGroups();
	
	            svg.transition().ease(ease).attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
	        }
	
	        /**
	         * Draws the values on the donut slice inside the text element
	         *
	         * @param  {Object} obj Data object
	         * @private
	         */
	        function drawLegend(obj) {
	            if (obj.data) {
	                svg.select('.donut-text').text(function () {
	                    return obj.data.percentage + '% ' + obj.data.name;
	                }).attr('dy', '.2em').attr('text-anchor', 'middle');
	
	                svg.select('.donut-text').call(wrapText, legendWidth);
	            }
	        }
	
	        /**
	         * Draws the slices of the donut
	         * @private
	         */
	        function drawSlices() {
	            if (!slices) {
	                slices = svg.select('.chart-group').selectAll('g.arc').data(layout(data));
	
	                slices.enter().append('g').each(storeAngle).each(reduceOuterRadius).classed('arc', true).on('mouseover', handleMouseOver).on('mouseout', handleMouseOut);
	
	                slices.append('path').attr('fill', getSliceFill).on('mouseover', tweenGrowthFactory(externalRadius, 0)).on('mouseout', tweenGrowthFactory(externalRadius - radiusHoverOffset, pieHoverTransitionDuration)).transition().ease(ease).duration(pieDrawingTransitionDuration).attrTween('d', tweenLoading);
	            } else {
	                slices = svg.select('.chart-group').selectAll('path').data(layout(data));
	
	                slices.attr('d', shape);
	
	                // Redraws the angles of the data
	                slices.transition().duration(arcTransitionDuration).attrTween('d', tweenArc);
	            }
	        }
	
	        /**
	         * Cleans any value that could be on the legend text element
	         * @private
	         */
	        function cleanLegend() {
	            svg.select('.donut-text').text('');
	        }
	
	        function handleMouseOver(datum) {
	            drawLegend(datum);
	
	            dispatch.customMouseOver(datum);
	        }
	
	        function handleMouseOut() {
	            cleanLegend();
	
	            dispatch.customMouseOut();
	        }
	
	        /**
	         * Creates the text element that will hold the legend of the chart
	         */
	        function initTooltip() {
	            svg.select('.legend-group').append('text').attr('class', 'donut-text');
	        }
	
	        /**
	         * Stores current angles and interpolates with new angles
	         * Check out {@link http://bl.ocks.org/mbostock/1346410| this example}
	         *
	         * @param  {Object}     a   New data for slice
	         * @return {Function}       Tweening function for the donut shape
	         * @private
	         */
	        function tweenArc(a) {
	            var i = d3.interpolate(this._current, a);
	
	            this._current = i(0);
	
	            return function (t) {
	                return shape(i(t));
	            };
	        }
	
	        /**
	         * Generates animations with tweens depending on the attributes given
	         *
	         * @param  {Number} outerRadius Final outer radius value
	         * @param  {Number} delay       Delay of animation
	         * @return {Function}           Function that when called will tween the element
	         * @private
	         */
	        function tweenGrowthFactory(outerRadius, delay) {
	            return function () {
	                d3.select(this).transition().delay(delay).attrTween('d', function (d) {
	                    var i = d3.interpolate(d.outerRadius, outerRadius);
	
	                    return function (t) {
	                        d.outerRadius = i(t);
	
	                        return shape(d);
	                    };
	                });
	            };
	        }
	
	        /**
	         * Animation for chart loading
	         * Check out {@link http://bl.ocks.org/mbostock/4341574| this example}
	         *
	         * @param  {Object} b Data point
	         * @return {Function}   Tween function
	         * @private
	         */
	        function tweenLoading(b) {
	            var i = undefined;
	
	            b.innerRadius = 0;
	            i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
	
	            return function (t) {
	                return shape(i(t));
	            };
	        }
	
	        /**
	         * Utility function that wraps a text into the given width
	         * TODO: Candidate to refactoring
	         *
	         * @param  {String} text         Text to write
	         * @param  {Number} legendWidth Width of the container
	         * @private
	         */
	        function wrapText(text, legendWidth) {
	            text.each(function () {
	                var text = d3.select(this),
	                    words = text.text().split(/\s+/).reverse(),
	                    word = undefined,
	                    line = [],
	                    lineNumber = 0,
	                    lineHeight = 1.2,
	                    smallLineHeight = lineHeight * 0.9,
	                    smallTextOffset = 15,
	                    y = text.attr('y'),
	                    dy = parseFloat(text.attr('dy')),
	                    fontSize = externalRadius / 4,
	                    smallFontSize = fontSize / 2.5,
	                    tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y - 5).attr('dy', dy + 'em').classed('donut-value', true).style('font-size', fontSize + 'px');
	
	                tspan.text(words.pop());
	                tspan = text.append('tspan').classed('donut-label', true).attr('x', 0).attr('y', y + smallTextOffset).attr('dy', ++lineNumber * smallLineHeight + dy + 'em').style('font-size', smallFontSize + 'px');
	
	                while (word = words.pop()) {
	                    line.push(word);
	                    tspan.text(line.join(' '));
	                    if (tspan.node().getComputedTextLength() > legendWidth - 50) {
	                        line.pop();
	                        tspan.text(line.join(' '));
	                        line = [word];
	                        tspan = text.append('tspan').classed('donut-label', true).attr('x', 0).attr('y', y + smallTextOffset).attr('dy', ++lineNumber * smallLineHeight + dy + 'em').text(word).style('font-size', smallFontSize + 'px');
	                    }
	                }
	            });
	        }
	
	        /**
	         * Gets or Sets the colorScheme of the chart
	         * @param  {Array} _x Color scheme array to get/set
	         * @return { (Number | Module) } Current colorScheme or Donut Chart module to chain calls
	         * @public
	         */
	        exports.colorScheme = function (_x) {
	            if (!arguments.length) {
	                return colorScheme;
	            }
	            colorScheme = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the externalRadius of the chart
	         * @param  {Number} _x ExternalRadius number to get/set
	         * @return { (Number | Module) } Current externalRadius or Donut Chart module to chain calls
	         * @public
	         */
	        exports.externalRadius = function (_x) {
	            if (!arguments.length) {
	                return externalRadius;
	            }
	            externalRadius = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the height of the chart
	         * @param  {Number} _x Desired width for the graph
	         * @return { (Number | Module) } Current height or Donut Chart module to chain calls
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
	         * Gets or Sets the internalRadius of the chart
	         * @param  {Number} _x InternalRadius number to get/set
	         * @return { (Number | Module) } Current internalRadius or Donut Chart module to chain calls
	         * @public
	         */
	        exports.internalRadius = function (_x) {
	            if (!arguments.length) {
	                return internalRadius;
	            }
	            internalRadius = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the margin of the chart
	         * @param  {Object} _x Margin object to get/set
	         * @return { (Number | Module) } Current margin or Donut Chart module to chain calls
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
	         * Gets or Sets the width of the chart
	         * @param  {Number} _x Desired width for the graph
	         * @return { (Number | Module) } Current width or Donut Chart module to chain calls
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
//# sourceMappingURL=donut.js.map