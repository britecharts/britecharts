webpackJsonp([6],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var d3Selection = __webpack_require__(1),
	    PubSub = __webpack_require__(2),
	    step = __webpack_require__(65),
	    miniTooltip = __webpack_require__(24),
	    dataBuilder = __webpack_require__(66);
	
	function createStepChart() {
	    var stepChart = step(),
	        tooltip = miniTooltip(),
	        testDataSet = new dataBuilder.StepDataBuilder(),
	        stepContainer = d3Selection.select('.js-step-chart-container'),
	        containerWidth = stepContainer.node() ? stepContainer.node().getBoundingClientRect().width : false,
	        tooltipContainer,
	        dataset;
	
	    if (containerWidth) {
	        d3Selection.select('#button').on('click', function () {
	            stepChart.exportChart('stepchart.png', 'Britecharts Step Chart');
	        });
	
	        dataset = testDataSet.withSmallData().build();
	
	        stepChart.width(containerWidth).height(300).xAxisLabel('Meal Type').xAxisLabelOffset(45).yAxisLabel('Quantity').yAxisLabelOffset(-50).margin({
	            top: 40,
	            right: 40,
	            bottom: 50,
	            left: 80
	        }).on('customMouseOver', tooltip.show).on('customMouseMove', tooltip.update).on('customMouseOut', tooltip.hide);
	
	        stepContainer.datum(dataset.data).call(stepChart);
	
	        tooltip.nameLabel('key');
	
	        tooltipContainer = d3Selection.select('.js-step-chart-container .step-chart .metadata-group');
	        tooltipContainer.datum([]).call(tooltip);
	    }
	}
	
	// Show charts if container available
	if (d3Selection.select('.js-step-chart-container').node()) {
	    createStepChart();
	
	    // For getting a responsive behavior on our chart,
	    // we'll need to listen to the window resize event
	    var redrawCharts = function redrawCharts() {
	        d3Selection.select('.step-chart').remove();
	
	        createStepChart();
	    };
	
	    // Redraw charts on window resize
	    PubSub.subscribe('resize', redrawCharts);
	}

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-axis/ Version 1.0.7. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var slice = Array.prototype.slice;
	
	var identity = function(x) {
	  return x;
	};
	
	var top = 1;
	var right = 2;
	var bottom = 3;
	var left = 4;
	var epsilon = 1e-6;
	
	function translateX(x) {
	  return "translate(" + (x + 0.5) + ",0)";
	}
	
	function translateY(y) {
	  return "translate(0," + (y + 0.5) + ")";
	}
	
	function center(scale) {
	  var offset = Math.max(0, scale.bandwidth() - 1) / 2; // Adjust for 0.5px offset.
	  if (scale.round()) offset = Math.round(offset);
	  return function(d) {
	    return scale(d) + offset;
	  };
	}
	
	function entering() {
	  return !this.__axis;
	}
	
	function axis(orient, scale) {
	  var tickArguments = [],
	      tickValues = null,
	      tickFormat = null,
	      tickSizeInner = 6,
	      tickSizeOuter = 6,
	      tickPadding = 3,
	      k = orient === top || orient === left ? -1 : 1,
	      x = orient === left || orient === right ? "x" : "y",
	      transform = orient === top || orient === bottom ? translateX : translateY;
	
	  function axis(context) {
	    var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
	        format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity) : tickFormat,
	        spacing = Math.max(tickSizeInner, 0) + tickPadding,
	        range = scale.range(),
	        range0 = range[0] + 0.5,
	        range1 = range[range.length - 1] + 0.5,
	        position = (scale.bandwidth ? center : identity)(scale.copy()),
	        selection = context.selection ? context.selection() : context,
	        path = selection.selectAll(".domain").data([null]),
	        tick = selection.selectAll(".tick").data(values, scale).order(),
	        tickExit = tick.exit(),
	        tickEnter = tick.enter().append("g").attr("class", "tick"),
	        line = tick.select("line"),
	        text = tick.select("text");
	
	    path = path.merge(path.enter().insert("path", ".tick")
	        .attr("class", "domain")
	        .attr("stroke", "#000"));
	
	    tick = tick.merge(tickEnter);
	
	    line = line.merge(tickEnter.append("line")
	        .attr("stroke", "#000")
	        .attr(x + "2", k * tickSizeInner));
	
	    text = text.merge(tickEnter.append("text")
	        .attr("fill", "#000")
	        .attr(x, k * spacing)
	        .attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));
	
	    if (context !== selection) {
	      path = path.transition(context);
	      tick = tick.transition(context);
	      line = line.transition(context);
	      text = text.transition(context);
	
	      tickExit = tickExit.transition(context)
	          .attr("opacity", epsilon)
	          .attr("transform", function(d) { return isFinite(d = position(d)) ? transform(d) : this.getAttribute("transform"); });
	
	      tickEnter
	          .attr("opacity", epsilon)
	          .attr("transform", function(d) { var p = this.parentNode.__axis; return transform(p && isFinite(p = p(d)) ? p : position(d)); });
	    }
	
	    tickExit.remove();
	
	    path
	        .attr("d", orient === left || orient == right
	            ? "M" + k * tickSizeOuter + "," + range0 + "H0.5V" + range1 + "H" + k * tickSizeOuter
	            : "M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter);
	
	    tick
	        .attr("opacity", 1)
	        .attr("transform", function(d) { return transform(position(d)); });
	
	    line
	        .attr(x + "2", k * tickSizeInner);
	
	    text
	        .attr(x, k * spacing)
	        .text(format);
	
	    selection.filter(entering)
	        .attr("fill", "none")
	        .attr("font-size", 10)
	        .attr("font-family", "sans-serif")
	        .attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");
	
	    selection
	        .each(function() { this.__axis = position; });
	  }
	
	  axis.scale = function(_) {
	    return arguments.length ? (scale = _, axis) : scale;
	  };
	
	  axis.ticks = function() {
	    return tickArguments = slice.call(arguments), axis;
	  };
	
	  axis.tickArguments = function(_) {
	    return arguments.length ? (tickArguments = _ == null ? [] : slice.call(_), axis) : tickArguments.slice();
	  };
	
	  axis.tickValues = function(_) {
	    return arguments.length ? (tickValues = _ == null ? null : slice.call(_), axis) : tickValues && tickValues.slice();
	  };
	
	  axis.tickFormat = function(_) {
	    return arguments.length ? (tickFormat = _, axis) : tickFormat;
	  };
	
	  axis.tickSize = function(_) {
	    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
	  };
	
	  axis.tickSizeInner = function(_) {
	    return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
	  };
	
	  axis.tickSizeOuter = function(_) {
	    return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
	  };
	
	  axis.tickPadding = function(_) {
	    return arguments.length ? (tickPadding = +_, axis) : tickPadding;
	  };
	
	  return axis;
	}
	
	function axisTop(scale) {
	  return axis(top, scale);
	}
	
	function axisRight(scale) {
	  return axis(right, scale);
	}
	
	function axisBottom(scale) {
	  return axis(bottom, scale);
	}
	
	function axisLeft(scale) {
	  return axis(left, scale);
	}
	
	exports.axisTop = axisTop;
	exports.axisRight = axisRight;
	exports.axisBottom = axisBottom;
	exports.axisLeft = axisLeft;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var _require = __webpack_require__(19),
	        colorSchemas = _require.colorSchemas;
	
	    var constants = __webpack_require__(20);
	    var serializeWithStyles = __webpack_require__(21);
	
	    var encoder = window.btoa;
	
	    if (!encoder) {
	        encoder = __webpack_require__(22).encode;
	    }
	
	    // Base64 doesn't work really well with Unicode strings, so we need to use this function
	    // Ref: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
	    var b64EncodeUnicode = function b64EncodeUnicode(str) {
	        return encoder(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
	            return String.fromCharCode('0x' + p1);
	        }));
	    };
	
	    var config = {
	        styleClass: 'britechartStyle',
	        defaultFilename: 'britechart.png',
	        chartBackground: 'white',
	        imageSourceBase: 'data:image/svg+xml;base64,',
	        titleFontSize: '15px',
	        titleFontFamily: '\'Benton Sans\', sans-serif',
	        titleTopOffset: 30,
	        get styleBackgroundString() {
	            return '<style>svg{background:' + this.chartBackground + ';}</style>';
	        }
	    };
	
	    /**
	     * Main function to be used as a method by chart instances to export charts to png
	     * @param  {array} svgs         (or an svg element) pass in both chart & legend as array or just chart as svg or in array
	     * @param  {string} filename    [download to be called <filename>.png]
	     * @param  {string} title       Title for the image
	     */
	    function exportChart(d3svg, filename, title) {
	        var img = createImage(convertSvgToHtml.call(this, d3svg, title));
	
	        img.onload = handleImageLoad.bind(img, createCanvas(this.width(), this.height()), filename);
	    }
	
	    /**
	     * adds background styles to raw html
	     * @param {string} html raw html
	     */
	    function addBackground(html) {
	        return html.replace('>', '>' + config.styleBackgroundString);
	    }
	
	    /**
	     * takes d3 svg el, adds proper svg tags, adds inline styles
	     * from stylesheets, adds white background and returns string
	     * @param  {object} d3svg TYPE d3 svg element
	     * @return {string} string of passed d3
	     */
	    function convertSvgToHtml(d3svg, title) {
	        if (!d3svg) {
	            return;
	        }
	
	        d3svg.attr('version', 1.1).attr('xmlns', 'http://www.w3.org/2000/svg');
	        var serializer = serializeWithStyles.initializeSerializer();
	        var html = serializer(d3svg.node());
	        html = formatHtmlByBrowser(html);
	        html = prependTitle.call(this, html, title, parseInt(d3svg.attr('width')));
	        html = addBackground(html);
	
	        return html;
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
	
	        img.src = '' + config.imageSourceBase + b64EncodeUnicode(svgHtml);
	
	        return img;
	    };
	
	    /**
	     * Draws image on canvas
	     * @param  {object} image TYPE:el <img>, to be drawn
	     * @param  {object} canvas TYPE: el <canvas>, to draw on
	     */
	    function drawImageOnCanvas(image, canvas) {
	        canvas.getContext('2d').drawImage(image, 0, 0);
	
	        return canvas;
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
	        var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : config.defaultFilename;
	        var extensionType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'image/png';
	
	        var url = canvas.toDataURL(extensionType);
	        var link = document.createElement('a');
	
	        link.href = url;
	        link.download = filename;
	        document.body.appendChild(link);
	        link.click();
	        document.body.removeChild(link);
	    }
	
	    /**
	     * Some browsers need special formatting, we handle that here
	     * @param  {string} html string of svg html
	     * @return {string} string of svg html
	     */
	    function formatHtmlByBrowser(html) {
	        if (navigator.userAgent.search('FireFox') > -1) {
	            return html.replace(/url.*&quot;\)/, 'url(&quot;#' + constants.lineGradientId + '&quot;);');
	        }
	
	        return html;
	    }
	
	    /**
	     * Handles on load event fired by img.onload, this=img
	     * @param  {object} canvas TYPE: el <canvas>
	     * @param  {string} filename
	     * @param  {object} e
	     */
	    function handleImageLoad(canvas, filename, e) {
	        e.preventDefault();
	
	        downloadCanvas(drawImageOnCanvas(this, canvas), filename);
	    }
	
	    /**
	     * if passed, append title to the raw html to appear on graph
	     * @param  {string} html     raw html string
	     * @param  {string} title    title of the graph
	     * @param  {number} svgWidth width of graph container
	     * @return {string}         raw html with title prepended
	     */
	    function prependTitle(html, title, svgWidth) {
	        if (!title || !svgWidth) {
	            return html;
	        }
	        var britechartsGreySchema = colorSchemas.britechartsGreySchema;
	
	        html = html.replace(/<g/, '<text x="' + this.margin().left + '" y="' + config.titleTopOffset + '" font-family="' + config.titleFontFamily + '" font-size="' + config.titleFontSize + '" fill="' + britechartsGreySchema[6] + '"> ' + title + ' </text><g ');
	
	        return html;
	    }
	
	    return {
	        exportChart: exportChart,
	        convertSvgToHtml: convertSvgToHtml,
	        createImage: createImage,
	        drawImageOnCanvas: drawImageOnCanvas
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function () {
	
	    'use strict';
	
	    return {
	
	        /**
	         * returns serializer function, only run it when you know you want to serialize your chart
	         * @return {func} serializer to add styles in line to dom string
	         */
	        initializeSerializer: function initializeSerializer() {
	
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
	
	            function serializeWithStyles(elem) {
	
	                var cssTexts = [],
	                    elements = void 0,
	                    computedStyle = void 0,
	                    defaultStyle = void 0,
	                    result = void 0;
	
	                if (!elem || elem.nodeType !== Node.ELEMENT_NODE) {
	                    console.error('Error: Object passed in to serializeWithSyles not of nodeType Node.ELEMENT_NODE');
	                    return;
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
	        }
	    };
	}();

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)(module), (function() { return this; }())))

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Array = __webpack_require__(4);
	    var d3Ease = __webpack_require__(16);
	    var d3Format = __webpack_require__(8);
	    var d3Selection = __webpack_require__(1);
	    var d3Transition = __webpack_require__(14);
	
	    /**
	     * Mini Tooltip Component reusable API class that renders a
	     * simple and configurable tooltip element for Britechart's
	     * bar and step chart.
	     *
	     * @module Mini-tooltip
	     * @tutorial bar
	     * @requires d3
	     *
	     * @example
	     * var barChart = line(),
	     *     miniTooltip = miniTooltip();
	     *
	     * barChart
	     *     .width(500)
	     *     .height(300)
	     *     .on('customMouseHover', miniTooltip.show)
	     *     .on('customMouseMove', miniTooltip.update)
	     *     .on('customMouseOut', miniTooltip.hide);
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(barChart);
	     *
	     * d3Selection.select('.metadata-group .mini-tooltip-container')
	     *     .datum([])
	     *     .call(miniTooltip);
	     *
	     */
	    return function module() {
	
	        var margin = {
	            top: 12,
	            right: 12,
	            bottom: 12,
	            left: 12
	        },
	            width = 100,
	            height = 100,
	
	
	        // Optional Title
	        title = '',
	
	
	        // Data Format
	        valueLabel = 'value',
	            nameLabel = 'name',
	
	
	        // Animations
	        mouseChaseDuration = 100,
	            ease = d3Ease.easeQuadInOut,
	
	
	        // tooltip
	        tooltipBackground = void 0,
	            backgroundBorderRadius = 1,
	            tooltipTextContainer = void 0,
	            tooltipOffset = {
	            y: 0,
	            x: 20
	        },
	
	
	        // Fonts
	        textSize = 14,
	            textLineHeight = 1.5,
	            valueTextSize = 27,
	            valueTextLineHeight = 1.18,
	
	
	        // Colors
	        bodyFillColor = '#FFFFFF',
	            borderStrokeColor = '#D2D6DF',
	            titleFillColor = '#666a73',
	            nameTextFillColor = '#666a73',
	            valueTextFillColor = '#45494E',
	            valueTextWeight = 200,
	
	
	        // formats
	        tooltipValueFormat = d3Format.format('.2f'),
	            chartWidth = void 0,
	            chartHeight = void 0,
	            svg = void 0;
	
	        /**
	         * This function creates the graph using the selection as container
	         * @param {D3Selection} _selection A d3 selection that represents
	         *                                  the container(s) where the chart(s) will be rendered
	         * @param {Array} _data The data to attach and generate the chart (usually an empty array)
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	
	                buildSVG(this);
	                drawTooltip();
	            });
	        }
	
	        /**
	         * Builds containers for the tooltip
	         * Also applies the Margin convention
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('tooltip-container-group', true).attr('transform', 'translate( ' + margin.left + ', ' + margin.top + ')');
	
	            container.append('g').classed('tooltip-group', true);
	        }
	
	        /**
	         * Builds the SVG element that will contain the chart
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3Selection.select(container).append('g').classed('britechart britechart-mini-tooltip', true);
	
	                buildContainerGroups();
	            }
	            svg.transition().attr('width', width).attr('height', height);
	
	            // Hidden by default
	            exports.hide();
	        }
	
	        /**
	         * Draws the different elements of the Tooltip box
	         * @return void
	         */
	        function drawTooltip() {
	            tooltipTextContainer = svg.selectAll('.tooltip-group').append('g').classed('tooltip-text', true);
	
	            tooltipBackground = tooltipTextContainer.append('rect').classed('tooltip-background', true).attr('width', width).attr('height', height).attr('rx', backgroundBorderRadius).attr('ry', backgroundBorderRadius).attr('y', -margin.top).attr('x', -margin.left).style('fill', bodyFillColor).style('stroke', borderStrokeColor).style('stroke-width', 1).style('pointer-events', 'none').style('opacity', 0.9);
	        }
	
	        /**
	         * Figures out the max length of the tooltip lines
	         * @param  {D3Selection[]} texts    List of svg elements of each line
	         * @return {Number}                 Max size of the lines
	         */
	        function getMaxLengthLine() {
	            for (var _len = arguments.length, texts = Array(_len), _key = 0; _key < _len; _key++) {
	                texts[_key] = arguments[_key];
	            }
	
	            var textSizes = texts.filter(function (x) {
	                return !!x;
	            }).map(function (x) {
	                return x.node().getBBox().width;
	            });
	
	            return d3Array.max(textSizes);
	        }
	
	        /**
	         * Calculates the desired position for the tooltip
	         * @param  {Number} mouseX             Current horizontal mouse position
	         * @param  {Number} mouseY             Current vertical mouse position
	         * @param  {Number} parentChartWidth   Parent's chart width
	         * @param  {Number} parentChartHeight  Parent's chart height
	         * @return {Number[]}                  X and Y position
	         * @private
	         */
	        function getTooltipPosition(_ref, _ref2) {
	            var _ref4 = _slicedToArray(_ref, 2),
	                mouseX = _ref4[0],
	                mouseY = _ref4[1];
	
	            var _ref3 = _slicedToArray(_ref2, 2),
	                parentChartWidth = _ref3[0],
	                parentChartHeight = _ref3[1];
	
	            var tooltipX = void 0,
	                tooltipY = void 0;
	
	            if (hasEnoughHorizontalRoom(parentChartWidth, mouseX)) {
	                tooltipX = mouseX + tooltipOffset.x;
	            } else {
	                tooltipX = mouseX - chartWidth - tooltipOffset.x - margin.right;
	            }
	
	            if (hasEnoughVerticalRoom(parentChartHeight, mouseY)) {
	                tooltipY = mouseY + tooltipOffset.y;
	            } else {
	                tooltipY = mouseY - chartHeight - tooltipOffset.y - margin.bottom;
	            }
	
	            return [tooltipX, tooltipY];
	        }
	
	        /**
	         * Checks if the mouse is over the bounds of the parent chart
	         * @param  {Number}  chartWidth Parent's chart
	         * @param  {Number}  positionX  Mouse position
	         * @return {Boolean}            If the mouse position allows space for the tooltip
	         */
	        function hasEnoughHorizontalRoom(parentChartWidth, positionX) {
	            return parentChartWidth - margin.left - margin.right - chartWidth - positionX > 0;
	        }
	
	        /**
	         * Checks if the mouse is over the bounds of the parent chart
	         * @param  {Number}  chartWidth Parent's chart
	         * @param  {Number}  positionX  Mouse position
	         * @return {Boolean}            If the mouse position allows space for the tooltip
	         */
	        function hasEnoughVerticalRoom(parentChartHeight, positionY) {
	            return parentChartHeight - margin.top - margin.bottom - chartHeight - positionY > 0;
	        }
	
	        /**
	         * Hides the tooltip
	         * @return {void}
	         */
	        function hideTooltip() {
	            svg.style('display', 'none');
	        }
	
	        /**
	         * Shows the tooltip updating it's content
	         * @param  {Object} dataPoint Data point from the chart
	         * @return {void}
	         */
	        function showTooltip(dataPoint) {
	            updateContent(dataPoint);
	            svg.style('display', 'block');
	        }
	
	        /**
	         * Draws the data entries inside the tooltip for a given topic
	         * @param  {Object} topic Topic to extract data from
	         * @return void
	         */
	        function updateContent() {
	            var dataPoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            var value = dataPoint[valueLabel] || '',
	                name = dataPoint[nameLabel] || '',
	                lineHeight = textSize * textLineHeight,
	                valueLineHeight = valueTextSize * valueTextLineHeight,
	                defaultDy = '1em',
	                temporalHeight = 0,
	                tooltipValue = void 0,
	                tooltipName = void 0,
	                tooltipTitle = void 0;
	
	            tooltipTextContainer.selectAll('text').remove();
	
	            if (title) {
	                tooltipTitle = tooltipTextContainer.append('text').classed('mini-tooltip-title', true).attr('dy', defaultDy).attr('y', 0).style('fill', titleFillColor).style('font-size', textSize).text(title);
	
	                temporalHeight = lineHeight + temporalHeight;
	            }
	
	            if (name) {
	                tooltipName = tooltipTextContainer.append('text').classed('mini-tooltip-name', true).attr('dy', defaultDy).attr('y', temporalHeight || 0).style('fill', nameTextFillColor).style('font-size', textSize).text(name);
	
	                temporalHeight = lineHeight + temporalHeight;
	            }
	
	            if (value) {
	                tooltipValue = tooltipTextContainer.append('text').classed('mini-tooltip-value', true).attr('dy', defaultDy).attr('y', temporalHeight || 0).style('fill', valueTextFillColor).style('font-size', valueTextSize).style('font-weight', valueTextWeight).text(tooltipValueFormat(value));
	
	                temporalHeight = valueLineHeight + temporalHeight;
	            }
	
	            chartWidth = getMaxLengthLine(tooltipName, tooltipTitle, tooltipValue);
	            chartHeight = temporalHeight;
	        }
	
	        /**
	         * Updates size and position of tooltip depending on the side of the chart we are in
	         * @param  {Object} dataPoint DataPoint of the tooltip
	         * @return void
	         */
	        function updatePositionAndSize(mousePosition, parentChartSize) {
	            var _getTooltipPosition = getTooltipPosition(mousePosition, parentChartSize),
	                _getTooltipPosition2 = _slicedToArray(_getTooltipPosition, 2),
	                tooltipX = _getTooltipPosition2[0],
	                tooltipY = _getTooltipPosition2[1];
	
	            svg.transition().duration(mouseChaseDuration).ease(ease).attr('height', chartHeight + margin.top + margin.bottom).attr('width', chartWidth + margin.left + margin.right).attr('transform', 'translate(' + tooltipX + ',' + tooltipY + ')');
	
	            tooltipBackground.attr('height', chartHeight + margin.top + margin.bottom).attr('width', chartWidth + margin.left + margin.right);
	        }
	
	        /**
	         * Updates tooltip content, size and position
	         *
	         * @param  {Object} dataPoint Current datapoint to show info about
	         * @return void
	         */
	        function updateTooltip(dataPoint, position, chartSize) {
	            updateContent(dataPoint);
	            updatePositionAndSize(position, chartSize);
	        }
	
	        /**
	         * Hides the tooltip
	         * @return {Module} Tooltip module to chain calls
	         * @public
	         */
	        exports.hide = function () {
	            hideTooltip();
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets data's nameLabel
	         * @param  {text} _x Desired nameLabel
	         * @return { text | module} nameLabel or Step Chart module to chain calls
	         * @public
	         */
	        exports.nameLabel = function (_x) {
	            if (!arguments.length) {
	                return nameLabel;
	            }
	            nameLabel = _x;
	            return this;
	        };
	
	        /**
	         * Shows the tooltip
	         * @return {Module} Tooltip module to chain calls
	         * @public
	         */
	        exports.show = function () {
	            showTooltip();
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the title of the tooltip
	         * @param  {string} _x Desired title
	         * @return { string | module} Current title or module to chain calls
	         * @public
	         */
	        exports.title = function (_x) {
	            if (!arguments.length) {
	                return title;
	            }
	            title = _x;
	            return this;
	        };
	
	        /**
	         * Updates the position and content of the tooltip
	         * @param  {Object} dataPoint       Datapoint of the hovered element
	         * @param  {Array} mousePosition    Mouse position relative to the parent chart [x, y]
	         * @param  {Array} chartSize        Parent chart size [x, y]
	         * @return {module}                 Current component
	         */
	        exports.update = function (dataPoint, mousePosition, chartSize) {
	            updateTooltip(dataPoint, mousePosition, chartSize);
	
	            return this;
	        };
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Array = __webpack_require__(4);
	    var d3Axis = __webpack_require__(5);
	    var d3Dispatch = __webpack_require__(7);
	    var d3Ease = __webpack_require__(16);
	    var d3Format = __webpack_require__(8);
	    var d3Scale = __webpack_require__(9);
	    var d3Selection = __webpack_require__(1);
	    var d3Transition = __webpack_require__(14);
	
	    var _require = __webpack_require__(18),
	        exportChart = _require.exportChart;
	
	    /**
	     * @typedef StepChartData
	     * @type Object[]
	     *
	     * @property {String} key      Key we measure (required)
	     * @property {Number} value    value of the key (required)
	     *
	     * @example
	     * [
	     *     {
	     *         value: 1,
	     *         key: 'glittering'
	     *     },
	     *     {
	     *         value: 1,
	     *         key: 'luminous'
	     *     }
	     * ]
	     */
	
	    /**
	     * Step Chart reusable API class that renders a
	     * simple and configurable step chart.
	     *
	     * @module Step
	     * @tutorial step
	     * @requires d3-array, d3-axis, d3-dispatch, d3-format, d3-scale, d3-selection, d3-transition
	     *
	     * @example
	     * var stepChart= step();
	     *
	     * stepChart
	     *     .height(500)
	     *     .width(800);
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(stepChart);
	     *
	     */
	
	    return function module() {
	
	        var margin = {
	            top: 20,
	            right: 20,
	            bottom: 30,
	            left: 40
	        },
	            width = 960,
	            height = 500,
	            ease = d3Ease.easeQuadInOut,
	            data = void 0,
	            chartWidth = void 0,
	            chartHeight = void 0,
	            xScale = void 0,
	            yScale = void 0,
	            numOfVerticalTicks = 6,
	            xAxis = void 0,
	            xAxisLabel = void 0,
	            yAxis = void 0,
	            yAxisLabel = void 0,
	            xAxisLabelOffset = 45,
	            yAxisLabelOffset = -20,
	            xAxisPadding = {
	            top: 0,
	            left: 0,
	            bottom: 0,
	            right: 0
	        },
	            yTickPadding = 8,
	            svg = void 0,
	            valueLabel = 'value',
	            nameLabel = 'key',
	            maskGridLines = void 0,
	            baseLine = void 0,
	
	
	        // Dispatcher object to broadcast the mouse events
	        // Ref: https://github.com/mbostock/d3/wiki/Internals#d3_dispatch
	        dispatcher = d3Dispatch.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove'),
	
	
	        // Formats
	        yAxisTickFormat = d3Format.format('.3'),
	
	
	        // extractors
	        getKey = function getKey(_ref) {
	            var key = _ref.key;
	            return key;
	        },
	            getValue = function getValue(_ref2) {
	            var value = _ref2.value;
	            return value;
	        };
	
	        /**
	         * This function creates the graph using the selection as container
	         * @param  {D3Selection} _selection A d3 selection that represents
	         *                                  the container(s) where the chart(s) will be rendered
	         * @param {StepChartData} _data The data to attach and generate the chart
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                // Make space on the left of the graph for the y axis label
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	                data = cleanData(_data);
	
	                buildScales();
	                buildAxis();
	                buildSVG(this);
	                drawGridLines();
	                drawSteps();
	                drawAxis();
	            });
	        }
	
	        /**
	         * Creates the d3 x and y axis, setting orientations
	         * @private
	         */
	        function buildAxis() {
	            xAxis = d3Axis.axisBottom(xScale);
	
	            yAxis = d3Axis.axisLeft(yScale).ticks(numOfVerticalTicks).tickPadding(yTickPadding).tickFormat(yAxisTickFormat);
	        }
	
	        /**
	         * Builds containers for the chart, the axis and a wrapper for all of them
	         * Also applies the Margin convention
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
	
	            container.append('g').classed('grid-lines-group', true);
	            container.append('g').classed('chart-group', true);
	            container.append('g').classed('x-axis-group axis', true).append('g').classed('x-axis-label', true);
	            container.append('g').classed('y-axis-group axis', true).append('g').classed('y-axis-label', true);
	            container.append('g').classed('metadata-group', true);
	        }
	
	        /**
	         * Creates the x and y scales of the graph
	         * @private
	         */
	        function buildScales() {
	            xScale = d3Scale.scaleBand().domain(data.map(getKey)).rangeRound([0, chartWidth]).paddingInner(0);
	
	            yScale = d3Scale.scaleLinear().domain([0, d3Array.max(data, getValue)]).rangeRound([chartHeight, 0]);
	        }
	
	        /**
	         * Builds the SVG element that will contain the chart
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3Selection.select(container).append('svg').classed('britechart step-chart', true);
	
	                buildContainerGroups();
	            }
	
	            svg.attr('width', width).attr('height', height);
	        }
	
	        /**
	         * Cleaning data adding the proper format
	         * @param  {StepChartData} data Data
	         * @private
	         */
	        function cleanData(data) {
	            return data.map(function (d) {
	                d.value = +d[valueLabel];
	                d.key = String(d[nameLabel]);
	
	                return d;
	            });
	        }
	
	        /**
	         * Draws the x and y axis on the svg object within their
	         * respective groups
	         * @private
	         */
	        function drawAxis() {
	            svg.select('.x-axis-group.axis').attr('transform', 'translate(0, ' + chartHeight + ')').call(xAxis);
	
	            if (xAxisLabel) {
	                svg.select('.x-axis-label').append('text').attr('text-anchor', 'middle').attr('x', chartWidth / 2).attr('y', xAxisLabelOffset).text(xAxisLabel);
	            }
	
	            svg.select('.y-axis-group.axis').call(yAxis);
	
	            if (yAxisLabel) {
	                svg.select('.y-axis-label').append('text').attr('x', -chartHeight / 2).attr('y', yAxisLabelOffset).attr('text-anchor', 'middle').attr('transform', 'rotate(270 0 0)').text(yAxisLabel);
	            }
	        }
	
	        /**
	         * Draws the step elements within the chart group
	         * @private
	         */
	        function drawSteps() {
	            var steps = svg.select('.chart-group').selectAll('.step').data(data);
	
	            // Enter
	            steps.enter().append('rect').classed('step', true).attr('x', chartWidth) // Initially drawing the steps at the end of Y axis
	            .attr('y', function (_ref3) {
	                var value = _ref3.value;
	                return yScale(value);
	            }).attr('width', xScale.bandwidth()).attr('height', function (d) {
	                return chartHeight - yScale(d.value);
	            }).on('mouseover', function () {
	                dispatcher.call('customMouseOver', this);
	            }).on('mousemove', function (d) {
	                dispatcher.call('customMouseMove', this, d, d3Selection.mouse(this), [chartWidth, chartHeight]);
	            }).on('mouseout', function () {
	                dispatcher.call('customMouseOut', this);
	            }).merge(steps).transition().ease(ease).attr('x', function (_ref4) {
	                var key = _ref4.key;
	                return xScale(key);
	            }).attr('y', function (d) {
	                return yScale(d.value);
	            }).attr('width', xScale.bandwidth()).attr('height', function (d) {
	                return chartHeight - yScale(d.value);
	            });
	
	            // Exit
	            steps.exit().transition().style('opacity', 0).remove();
	        }
	
	        /**
	         * Draws grid lines on the background of the chart
	         * @return void
	         */
	        function drawGridLines() {
	            maskGridLines = svg.select('.grid-lines-group').selectAll('line.horizontal-grid-line').data(yScale.ticks(numOfVerticalTicks)).enter().append('line').attr('class', 'horizontal-grid-line').attr('x1', xAxisPadding.left).attr('x2', chartWidth).attr('y1', function (d) {
	                return yScale(d);
	            }).attr('y2', function (d) {
	                return yScale(d);
	            });
	
	            //draw a horizontal line to extend x-axis till the edges
	            baseLine = svg.select('.grid-lines-group').selectAll('line.extended-x-line').data([0]).enter().append('line').attr('class', 'extended-x-line').attr('x1', xAxisPadding.left).attr('x2', chartWidth).attr('y1', height - margin.bottom - margin.top).attr('y2', height - margin.bottom - margin.top);
	        }
	
	        /**
	         * Chart exported to png and a download action is fired
	         * @public
	         */
	        exports.exportChart = function (filename) {
	            exportChart.call(exports, svg, filename);
	        };
	
	        /**
	         * Gets or Sets the margin of the chart
	         * @param  {object} _x Margin object to get/set
	         * @return { margin | module} Current margin or Step Chart module to chain calls
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
	         * @param  {number} _x Desired width for the graph
	         * @return { width | module} Current width or step Chart module to chain calls
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
	         * Gets or Sets the height of the chart
	         * @param  {number} _x Desired width for the graph
	         * @return { height | module} Current height or Step Chart module to chain calls
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
	         * Gets or Sets the number of vertical ticks on the chart
	         * @param  {number} _x Desired width for the graph
	         * @return { height | module} Current height or Step Chart module to chain calls
	         * @public
	         */
	        exports.numOfVerticalTicks = function (_x) {
	            if (!arguments.length) {
	                return numOfVerticalTicks;
	            }
	            numOfVerticalTicks = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the text of the xAxisLabel on the chart
	         * @param  {text} _x Desired text for the label
	         * @return { text | module} label or Step Chart module to chain calls
	         * @public
	         */
	        exports.xAxisLabel = function (_x) {
	            if (!arguments.length) {
	                return xAxisLabel;
	            }
	            xAxisLabel = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the offset of the xAxisLabel on the chart
	         * @param  {integer} _x Desired offset for the label
	         * @return { integer | module} label or Step Chart module to chain calls
	         * @public
	         */
	        exports.xAxisLabelOffset = function (_x) {
	            if (!arguments.length) {
	                return xAxisLabelOffset;
	            }
	            xAxisLabelOffset = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the text of the yAxisLabel on the chart
	         * @param  {text} _x Desired text for the label
	         * @return { text | module} label or Step Chart module to chain calls
	         * @public
	         */
	        exports.yAxisLabel = function (_x) {
	            if (!arguments.length) {
	                return yAxisLabel;
	            }
	            yAxisLabel = _x;
	            return this;
	        };
	
	        /**
	         * Gets or Sets the offset of the yAxisLabel on the chart
	         * @param  {integer} _x Desired offset for the label
	         * @return { integer | module} label or Step Chart module to chain calls
	         * @public
	         */
	        exports.yAxisLabelOffset = function (_x) {
	            if (!arguments.length) {
	                return yAxisLabelOffset;
	            }
	            yAxisLabelOffset = _x;
	            return this;
	        };
	
	        /**
	         * Exposes an 'on' method that acts as a bridge with the event dispatcher
	         * We are going to expose this events:
	         * customMouseOver, customMouseMove and customMouseOut
	         *
	         * @return {module} Bar Chart
	         * @public
	         */
	        exports.on = function () {
	            var value = dispatcher.on.apply(dispatcher, arguments);
	
	            return value === dispatcher ? exports : value;
	        };
	
	        /**
	         * Chart exported to png and a download action is fired
	         * @public
	         */
	        exports.exportChart = function (filename, title) {
	            exportChart.call(exports, svg, filename, title);
	        };
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var _ = __webpack_require__(26),
	        jsonStepDataSmall = __webpack_require__(67);
	
	    function StepDataBuilder(config) {
	        this.Klass = StepDataBuilder;
	
	        this.config = _.defaults({}, config);
	
	        this.withSmallData = function () {
	            var attributes = _.extend({}, this.config, jsonStepDataSmall);
	
	            return new this.Klass(attributes);
	        };
	
	        this.build = function () {
	            return this.config;
	        };
	    }
	
	    return {
	        StepDataBuilder: StepDataBuilder
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 67:
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"key": "Appetizer",
				"value": 400
			},
			{
				"key": "Soup",
				"value": 300
			},
			{
				"key": "Salad",
				"value": 300
			},
			{
				"key": "Lunch",
				"value": 250
			},
			{
				"key": "Dinner",
				"value": 220
			},
			{
				"key": "Dessert",
				"value": 100
			},
			{
				"key": "Midnight snack",
				"value": 20
			}
		]
	};

/***/ })

});
//# sourceMappingURL=demo-step.js.map