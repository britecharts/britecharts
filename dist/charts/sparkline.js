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
	     * Sparkline Chart reusable API module that allows us
	     * rendering a sparkline configurable chart.
	     *
	     * @module Sparkline
	     * @version 0.0.1
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
	     * d3.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(sparkLineChart);
	     *
	     */
	    return function module() {
	
	        var margin = {
	            left: 5,
	            right: 5,
	            top: 5,
	            bottom: 5
	        },
	            width = 100,
	            height = 30,
	            xScale = undefined,
	            yScale = undefined,
	            ease = 'quad-out',
	            svg = undefined,
	            chartWidth = undefined,
	            chartHeight = undefined,
	            data = undefined,
	            line = undefined,
	            markerSize = 1.5,
	            valueLabel = 'views',
	            dateLabel = 'date',
	
	
	        // getters
	        getDate = function getDate(d) {
	            return d.date;
	        },
	            getValue = function getValue(d) {
	            return d[valueLabel];
	        };
	
	        /**
	         * This function creates the graph using the selection and data provided
	         *
	         * @param {D3Selection} _selection A d3 selection that represents
	         * the container(s) where the chart(s) will be rendered
	         * @param {Object} _data The data to attach and generate the chart
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	                data = cleanData(_data);
	
	                buildScales();
	                buildSVG(this);
	                drawLine();
	                drawEndMarker();
	            });
	        }
	
	        /**
	         * Builds containers for the chart, the axis and a wrapper for all of them
	         * NOTE: The order of drawing of this group elements is really important,
	         * as everything else will be drawn on top of them
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
	            container.append('g').classed('chart-group', true);
	            container.append('g').classed('metadata-group', true);
	        }
	
	        /**
	         * Creates the x, y and color scales of the chart
	         * @private
	         */
	        function buildScales() {
	            xScale = d3.scale.linear().domain(d3.extent(data, getDate)).range([0, chartWidth]);
	
	            yScale = d3.scale.linear().domain(d3.extent(data, getValue)).range([chartHeight, 0]);
	        }
	
	        /**
	         * Builds the SVG element that will contain the chart
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3.select(container).append('svg').classed('britechart sparkline', true);
	
	                buildContainerGroups();
	            }
	
	            svg.transition().ease(ease).attr({
	                width: width,
	                height: height
	            });
	        }
	
	        /**
	         * Cleaning data adding the proper format
	         * @param  {array} data Data
	         * @private
	         */
	        function cleanData(data) {
	            return data.map(function (d) {
	                d.date = new Date(d[dateLabel]);
	                d[valueLabel] = +d[valueLabel];
	                return d;
	            });
	        }
	
	        /**
	         * Draws the line element within the chart group
	         * @private
	         */
	        function drawLine() {
	            line = d3.svg.line().interpolate('basis').x(function (d) {
	                return xScale(d.date);
	            }).y(function (d) {
	                return yScale(d[valueLabel]);
	            });
	
	            svg.select('.chart-group').append('path').datum(data).attr('class', 'line').attr('d', line);
	        }
	
	        /**
	         * Draws a marker at the end of the sparkline
	         */
	        function drawEndMarker() {
	            svg.selectAll('.chart-group').append('circle').attr('class', 'sparkline-circle').attr('cx', xScale(data[data.length - 1].date)).attr('cy', yScale(data[data.length - 1][valueLabel])).attr('r', markerSize);
	        }
	
	        // Accessors
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
//# sourceMappingURL=sparkline.js.map