webpackJsonp([5],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var d3Selection = __webpack_require__(1),
	    PubSub = __webpack_require__(2),
	    colors = __webpack_require__(19),
	    stackedAreaChart = __webpack_require__(57),
	    tooltip = __webpack_require__(46),
	    stackedDataBuilder = __webpack_require__(59),
	    colorSelectorHelper = __webpack_require__(42);
	
	function createStackedAreaChartWithTooltip(optionalColorSchema) {
	    var stackedArea = stackedAreaChart(),
	        chartTooltip = tooltip(),
	        testDataSet = new stackedDataBuilder.StackedAreaDataBuilder(),
	        container = d3Selection.select('.js-stacked-area-chart-tooltip-container'),
	        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
	        tooltipContainer,
	        dataset;
	
	    if (containerWidth) {
	        // dataset = testDataSet.withReportData().build();
	        // dataset = testDataSet.with3Sources().build();
	        // dataset = testDataSet.with6Sources().build();
	        dataset = testDataSet.withSalesChannelData().build();
	        // dataset = testDataSet.withLargeData().build();
	        // dataset = testDataSet.withGeneratedData().build();
	
	        // StackedAreChart Setup and start
	        stackedArea.isAnimated(true).tooltipThreshold(600).width(containerWidth).grid('horizontal').on('customMouseOver', chartTooltip.show).on('customMouseMove', chartTooltip.update).on('customMouseOut', chartTooltip.hide);
	
	        if (optionalColorSchema) {
	            stackedArea.colorSchema(optionalColorSchema);
	        }
	
	        container.datum(dataset.data).call(stackedArea);
	
	        // Tooltip Setup and start
	        chartTooltip.topicLabel('values').title('Testing tooltip');
	
	        // Note that if the viewport width is less than the tooltipThreshold value,
	        // this container won't exist, and the tooltip won't show up
	        tooltipContainer = d3Selection.select('.js-stacked-area-chart-tooltip-container .metadata-group .vertical-marker-container');
	        tooltipContainer.datum([]).call(chartTooltip);
	
	        d3Selection.select('#button').on('click', function () {
	            stackedArea.exportChart('stacked-area.png', 'Britecharts Stacked Area');
	        });
	    }
	}
	
	function createStackedAreaChartWithFixedAspectRatio(optionalColorSchema) {
	    var stackedArea = stackedAreaChart(),
	        chartTooltip = tooltip(),
	        testDataSet = new stackedDataBuilder.StackedAreaDataBuilder(),
	        container = d3Selection.select('.js-stacked-area-chart-fixed-container'),
	        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
	        tooltipContainer,
	        dataset;
	
	    if (containerWidth) {
	        // dataset = testDataSet.withReportData().build();
	        dataset = testDataSet.with3Sources().build();
	        // dataset = testDataSet.with6Sources().build();
	        // dataset = testDataSet.withLargeData().build();
	
	        // StackedAreChart Setup and start
	        stackedArea.tooltipThreshold(600).aspectRatio(0.6).grid('full').forceAxisFormat('custom').forcedXFormat('%Y/%m/%d').forcedXTicks(2).width(containerWidth).dateLabel('dateUTC').valueLabel('views').on('customMouseOver', chartTooltip.show).on('customMouseMove', chartTooltip.update).on('customMouseOut', chartTooltip.hide);
	
	        if (optionalColorSchema) {
	            stackedArea.colorSchema(optionalColorSchema);
	        }
	
	        container.datum(dataset.data).call(stackedArea);
	
	        // Tooltip Setup and start
	        chartTooltip.topicLabel('values').title('Tooltip Title');
	
	        // Note that if the viewport width is less than the tooltipThreshold value,
	        // this container won't exist, and the tooltip won't show up
	        tooltipContainer = d3Selection.select('.js-stacked-area-chart-fixed-container .metadata-group .vertical-marker-container');
	        tooltipContainer.datum([]).call(chartTooltip);
	    }
	}
	
	if (d3Selection.select('.js-stacked-area-chart-tooltip-container').node()) {
	    // Chart creation
	    createStackedAreaChartWithTooltip();
	    createStackedAreaChartWithFixedAspectRatio();
	
	    // For getting a responsive behavior on our chart,
	    // we'll need to listen to the window resize event
	    var redrawCharts = function redrawCharts() {
	        d3Selection.selectAll('.stacked-area').remove();
	
	        createStackedAreaChartWithTooltip();
	        createStackedAreaChartWithFixedAspectRatio();
	    };
	
	    // Redraw charts on window resize
	    PubSub.subscribe('resize', redrawCharts);
	
	    // Color schema selector
	    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.stacked-area', createStackedAreaChartWithTooltip);
	}

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
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
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
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
/* 19 */,
/* 20 */,
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-shape/ Version 1.1.1. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports, __webpack_require__(33)) :
		typeof define === 'function' && define.amd ? define(['exports', 'd3-path'], factory) :
		(factory((global.d3 = global.d3 || {}),global.d3));
	}(this, (function (exports,d3Path) { 'use strict';
	
	var constant = function(x) {
	  return function constant() {
	    return x;
	  };
	};
	
	var abs = Math.abs;
	var atan2 = Math.atan2;
	var cos = Math.cos;
	var max = Math.max;
	var min = Math.min;
	var sin = Math.sin;
	var sqrt = Math.sqrt;
	
	var epsilon = 1e-12;
	var pi = Math.PI;
	var halfPi = pi / 2;
	var tau = 2 * pi;
	
	function acos(x) {
	  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
	}
	
	function asin(x) {
	  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
	}
	
	function arcInnerRadius(d) {
	  return d.innerRadius;
	}
	
	function arcOuterRadius(d) {
	  return d.outerRadius;
	}
	
	function arcStartAngle(d) {
	  return d.startAngle;
	}
	
	function arcEndAngle(d) {
	  return d.endAngle;
	}
	
	function arcPadAngle(d) {
	  return d && d.padAngle; // Note: optional!
	}
	
	function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
	  var x10 = x1 - x0, y10 = y1 - y0,
	      x32 = x3 - x2, y32 = y3 - y2,
	      t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
	  return [x0 + t * x10, y0 + t * y10];
	}
	
	// Compute perpendicular offset line of length rc.
	// http://mathworld.wolfram.com/Circle-LineIntersection.html
	function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
	  var x01 = x0 - x1,
	      y01 = y0 - y1,
	      lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01),
	      ox = lo * y01,
	      oy = -lo * x01,
	      x11 = x0 + ox,
	      y11 = y0 + oy,
	      x10 = x1 + ox,
	      y10 = y1 + oy,
	      x00 = (x11 + x10) / 2,
	      y00 = (y11 + y10) / 2,
	      dx = x10 - x11,
	      dy = y10 - y11,
	      d2 = dx * dx + dy * dy,
	      r = r1 - rc,
	      D = x11 * y10 - x10 * y11,
	      d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)),
	      cx0 = (D * dy - dx * d) / d2,
	      cy0 = (-D * dx - dy * d) / d2,
	      cx1 = (D * dy + dx * d) / d2,
	      cy1 = (-D * dx + dy * d) / d2,
	      dx0 = cx0 - x00,
	      dy0 = cy0 - y00,
	      dx1 = cx1 - x00,
	      dy1 = cy1 - y00;
	
	  // Pick the closer of the two intersection points.
	  // TODO Is there a faster way to determine which intersection to use?
	  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
	
	  return {
	    cx: cx0,
	    cy: cy0,
	    x01: -ox,
	    y01: -oy,
	    x11: cx0 * (r1 / r - 1),
	    y11: cy0 * (r1 / r - 1)
	  };
	}
	
	var arc = function() {
	  var innerRadius = arcInnerRadius,
	      outerRadius = arcOuterRadius,
	      cornerRadius = constant(0),
	      padRadius = null,
	      startAngle = arcStartAngle,
	      endAngle = arcEndAngle,
	      padAngle = arcPadAngle,
	      context = null;
	
	  function arc() {
	    var buffer,
	        r,
	        r0 = +innerRadius.apply(this, arguments),
	        r1 = +outerRadius.apply(this, arguments),
	        a0 = startAngle.apply(this, arguments) - halfPi,
	        a1 = endAngle.apply(this, arguments) - halfPi,
	        da = abs(a1 - a0),
	        cw = a1 > a0;
	
	    if (!context) context = buffer = d3Path.path();
	
	    // Ensure that the outer radius is always larger than the inner radius.
	    if (r1 < r0) r = r1, r1 = r0, r0 = r;
	
	    // Is it a point?
	    if (!(r1 > epsilon)) context.moveTo(0, 0);
	
	    // Or is it a circle or annulus?
	    else if (da > tau - epsilon) {
	      context.moveTo(r1 * cos(a0), r1 * sin(a0));
	      context.arc(0, 0, r1, a0, a1, !cw);
	      if (r0 > epsilon) {
	        context.moveTo(r0 * cos(a1), r0 * sin(a1));
	        context.arc(0, 0, r0, a1, a0, cw);
	      }
	    }
	
	    // Or is it a circular or annular sector?
	    else {
	      var a01 = a0,
	          a11 = a1,
	          a00 = a0,
	          a10 = a1,
	          da0 = da,
	          da1 = da,
	          ap = padAngle.apply(this, arguments) / 2,
	          rp = (ap > epsilon) && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)),
	          rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
	          rc0 = rc,
	          rc1 = rc,
	          t0,
	          t1;
	
	      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
	      if (rp > epsilon) {
	        var p0 = asin(rp / r0 * sin(ap)),
	            p1 = asin(rp / r1 * sin(ap));
	        if ((da0 -= p0 * 2) > epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
	        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
	        if ((da1 -= p1 * 2) > epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
	        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
	      }
	
	      var x01 = r1 * cos(a01),
	          y01 = r1 * sin(a01),
	          x10 = r0 * cos(a10),
	          y10 = r0 * sin(a10);
	
	      // Apply rounded corners?
	      if (rc > epsilon) {
	        var x11 = r1 * cos(a11),
	            y11 = r1 * sin(a11),
	            x00 = r0 * cos(a00),
	            y00 = r0 * sin(a00);
	
	        // Restrict the corner radius according to the sector angle.
	        if (da < pi) {
	          var oc = da0 > epsilon ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
	              ax = x01 - oc[0],
	              ay = y01 - oc[1],
	              bx = x11 - oc[0],
	              by = y11 - oc[1],
	              kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2),
	              lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
	          rc0 = min(rc, (r0 - lc) / (kc - 1));
	          rc1 = min(rc, (r1 - lc) / (kc + 1));
	        }
	      }
	
	      // Is the sector collapsed to a line?
	      if (!(da1 > epsilon)) context.moveTo(x01, y01);
	
	      // Does the sector’s outer ring have rounded corners?
	      else if (rc1 > epsilon) {
	        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
	        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
	
	        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);
	
	        // Have the corners merged?
	        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);
	
	        // Otherwise, draw the two corners and the ring.
	        else {
	          context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
	          context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
	          context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
	        }
	      }
	
	      // Or is the outer ring just a circular arc?
	      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
	
	      // Is there no inner ring, and it’s a circular sector?
	      // Or perhaps it’s an annular sector collapsed due to padding?
	      if (!(r0 > epsilon) || !(da0 > epsilon)) context.lineTo(x10, y10);
	
	      // Does the sector’s inner ring (or point) have rounded corners?
	      else if (rc0 > epsilon) {
	        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
	        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
	
	        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);
	
	        // Have the corners merged?
	        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);
	
	        // Otherwise, draw the two corners and the ring.
	        else {
	          context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
	          context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
	          context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
	        }
	      }
	
	      // Or is the inner ring just a circular arc?
	      else context.arc(0, 0, r0, a10, a00, cw);
	    }
	
	    context.closePath();
	
	    if (buffer) return context = null, buffer + "" || null;
	  }
	
	  arc.centroid = function() {
	    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
	        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
	    return [cos(a) * r, sin(a) * r];
	  };
	
	  arc.innerRadius = function(_) {
	    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
	  };
	
	  arc.outerRadius = function(_) {
	    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
	  };
	
	  arc.cornerRadius = function(_) {
	    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
	  };
	
	  arc.padRadius = function(_) {
	    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
	  };
	
	  arc.startAngle = function(_) {
	    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
	  };
	
	  arc.endAngle = function(_) {
	    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
	  };
	
	  arc.padAngle = function(_) {
	    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
	  };
	
	  arc.context = function(_) {
	    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
	  };
	
	  return arc;
	};
	
	function Linear(context) {
	  this._context = context;
	}
	
	Linear.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; // proceed
	      default: this._context.lineTo(x, y); break;
	    }
	  }
	};
	
	var curveLinear = function(context) {
	  return new Linear(context);
	};
	
	function x(p) {
	  return p[0];
	}
	
	function y(p) {
	  return p[1];
	}
	
	var line = function() {
	  var x$$1 = x,
	      y$$1 = y,
	      defined = constant(true),
	      context = null,
	      curve = curveLinear,
	      output = null;
	
	  function line(data) {
	    var i,
	        n = data.length,
	        d,
	        defined0 = false,
	        buffer;
	
	    if (context == null) output = curve(buffer = d3Path.path());
	
	    for (i = 0; i <= n; ++i) {
	      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	        if (defined0 = !defined0) output.lineStart();
	        else output.lineEnd();
	      }
	      if (defined0) output.point(+x$$1(d, i, data), +y$$1(d, i, data));
	    }
	
	    if (buffer) return output = null, buffer + "" || null;
	  }
	
	  line.x = function(_) {
	    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant(+_), line) : x$$1;
	  };
	
	  line.y = function(_) {
	    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant(+_), line) : y$$1;
	  };
	
	  line.defined = function(_) {
	    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
	  };
	
	  line.curve = function(_) {
	    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
	  };
	
	  line.context = function(_) {
	    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
	  };
	
	  return line;
	};
	
	var area = function() {
	  var x0 = x,
	      x1 = null,
	      y0 = constant(0),
	      y1 = y,
	      defined = constant(true),
	      context = null,
	      curve = curveLinear,
	      output = null;
	
	  function area(data) {
	    var i,
	        j,
	        k,
	        n = data.length,
	        d,
	        defined0 = false,
	        buffer,
	        x0z = new Array(n),
	        y0z = new Array(n);
	
	    if (context == null) output = curve(buffer = d3Path.path());
	
	    for (i = 0; i <= n; ++i) {
	      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
	        if (defined0 = !defined0) {
	          j = i;
	          output.areaStart();
	          output.lineStart();
	        } else {
	          output.lineEnd();
	          output.lineStart();
	          for (k = i - 1; k >= j; --k) {
	            output.point(x0z[k], y0z[k]);
	          }
	          output.lineEnd();
	          output.areaEnd();
	        }
	      }
	      if (defined0) {
	        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
	        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
	      }
	    }
	
	    if (buffer) return output = null, buffer + "" || null;
	  }
	
	  function arealine() {
	    return line().defined(defined).curve(curve).context(context);
	  }
	
	  area.x = function(_) {
	    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), x1 = null, area) : x0;
	  };
	
	  area.x0 = function(_) {
	    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), area) : x0;
	  };
	
	  area.x1 = function(_) {
	    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : x1;
	  };
	
	  area.y = function(_) {
	    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), y1 = null, area) : y0;
	  };
	
	  area.y0 = function(_) {
	    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), area) : y0;
	  };
	
	  area.y1 = function(_) {
	    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : y1;
	  };
	
	  area.lineX0 =
	  area.lineY0 = function() {
	    return arealine().x(x0).y(y0);
	  };
	
	  area.lineY1 = function() {
	    return arealine().x(x0).y(y1);
	  };
	
	  area.lineX1 = function() {
	    return arealine().x(x1).y(y0);
	  };
	
	  area.defined = function(_) {
	    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), area) : defined;
	  };
	
	  area.curve = function(_) {
	    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
	  };
	
	  area.context = function(_) {
	    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
	  };
	
	  return area;
	};
	
	var descending = function(a, b) {
	  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	};
	
	var identity = function(d) {
	  return d;
	};
	
	var pie = function() {
	  var value = identity,
	      sortValues = descending,
	      sort = null,
	      startAngle = constant(0),
	      endAngle = constant(tau),
	      padAngle = constant(0);
	
	  function pie(data) {
	    var i,
	        n = data.length,
	        j,
	        k,
	        sum = 0,
	        index = new Array(n),
	        arcs = new Array(n),
	        a0 = +startAngle.apply(this, arguments),
	        da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)),
	        a1,
	        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
	        pa = p * (da < 0 ? -1 : 1),
	        v;
	
	    for (i = 0; i < n; ++i) {
	      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
	        sum += v;
	      }
	    }
	
	    // Optionally sort the arcs by previously-computed values or by data.
	    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
	    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });
	
	    // Compute the arcs! They are stored in the original data's order.
	    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
	      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
	        data: data[j],
	        index: i,
	        value: v,
	        startAngle: a0,
	        endAngle: a1,
	        padAngle: p
	      };
	    }
	
	    return arcs;
	  }
	
	  pie.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), pie) : value;
	  };
	
	  pie.sortValues = function(_) {
	    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
	  };
	
	  pie.sort = function(_) {
	    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
	  };
	
	  pie.startAngle = function(_) {
	    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), pie) : startAngle;
	  };
	
	  pie.endAngle = function(_) {
	    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), pie) : endAngle;
	  };
	
	  pie.padAngle = function(_) {
	    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), pie) : padAngle;
	  };
	
	  return pie;
	};
	
	var curveRadialLinear = curveRadial(curveLinear);
	
	function Radial(curve) {
	  this._curve = curve;
	}
	
	Radial.prototype = {
	  areaStart: function() {
	    this._curve.areaStart();
	  },
	  areaEnd: function() {
	    this._curve.areaEnd();
	  },
	  lineStart: function() {
	    this._curve.lineStart();
	  },
	  lineEnd: function() {
	    this._curve.lineEnd();
	  },
	  point: function(a, r) {
	    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
	  }
	};
	
	function curveRadial(curve) {
	
	  function radial(context) {
	    return new Radial(curve(context));
	  }
	
	  radial._curve = curve;
	
	  return radial;
	}
	
	function radialLine(l) {
	  var c = l.curve;
	
	  l.angle = l.x, delete l.x;
	  l.radius = l.y, delete l.y;
	
	  l.curve = function(_) {
	    return arguments.length ? c(curveRadial(_)) : c()._curve;
	  };
	
	  return l;
	}
	
	var radialLine$1 = function() {
	  return radialLine(line().curve(curveRadialLinear));
	};
	
	var radialArea = function() {
	  var a = area().curve(curveRadialLinear),
	      c = a.curve,
	      x0 = a.lineX0,
	      x1 = a.lineX1,
	      y0 = a.lineY0,
	      y1 = a.lineY1;
	
	  a.angle = a.x, delete a.x;
	  a.startAngle = a.x0, delete a.x0;
	  a.endAngle = a.x1, delete a.x1;
	  a.radius = a.y, delete a.y;
	  a.innerRadius = a.y0, delete a.y0;
	  a.outerRadius = a.y1, delete a.y1;
	  a.lineStartAngle = function() { return radialLine(x0()); }, delete a.lineX0;
	  a.lineEndAngle = function() { return radialLine(x1()); }, delete a.lineX1;
	  a.lineInnerRadius = function() { return radialLine(y0()); }, delete a.lineY0;
	  a.lineOuterRadius = function() { return radialLine(y1()); }, delete a.lineY1;
	
	  a.curve = function(_) {
	    return arguments.length ? c(curveRadial(_)) : c()._curve;
	  };
	
	  return a;
	};
	
	var slice = Array.prototype.slice;
	
	var radialPoint = function(x, y) {
	  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
	};
	
	function linkSource(d) {
	  return d.source;
	}
	
	function linkTarget(d) {
	  return d.target;
	}
	
	function link(curve) {
	  var source = linkSource,
	      target = linkTarget,
	      x$$1 = x,
	      y$$1 = y,
	      context = null;
	
	  function link() {
	    var buffer, argv = slice.call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
	    if (!context) context = buffer = d3Path.path();
	    curve(context, +x$$1.apply(this, (argv[0] = s, argv)), +y$$1.apply(this, argv), +x$$1.apply(this, (argv[0] = t, argv)), +y$$1.apply(this, argv));
	    if (buffer) return context = null, buffer + "" || null;
	  }
	
	  link.source = function(_) {
	    return arguments.length ? (source = _, link) : source;
	  };
	
	  link.target = function(_) {
	    return arguments.length ? (target = _, link) : target;
	  };
	
	  link.x = function(_) {
	    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant(+_), link) : x$$1;
	  };
	
	  link.y = function(_) {
	    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant(+_), link) : y$$1;
	  };
	
	  link.context = function(_) {
	    return arguments.length ? ((context = _ == null ? null : _), link) : context;
	  };
	
	  return link;
	}
	
	function curveHorizontal(context, x0, y0, x1, y1) {
	  context.moveTo(x0, y0);
	  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
	}
	
	function curveVertical(context, x0, y0, x1, y1) {
	  context.moveTo(x0, y0);
	  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
	}
	
	function curveRadial$1(context, x0, y0, x1, y1) {
	  var p0 = radialPoint(x0, y0),
	      p1 = radialPoint(x0, y0 = (y0 + y1) / 2),
	      p2 = radialPoint(x1, y0),
	      p3 = radialPoint(x1, y1);
	  context.moveTo(p0[0], p0[1]);
	  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
	}
	
	function linkHorizontal() {
	  return link(curveHorizontal);
	}
	
	function linkVertical() {
	  return link(curveVertical);
	}
	
	function linkRadial() {
	  var l = link(curveRadial$1);
	  l.angle = l.x, delete l.x;
	  l.radius = l.y, delete l.y;
	  return l;
	}
	
	var circle = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / pi);
	    context.moveTo(r, 0);
	    context.arc(0, 0, r, 0, tau);
	  }
	};
	
	var cross = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / 5) / 2;
	    context.moveTo(-3 * r, -r);
	    context.lineTo(-r, -r);
	    context.lineTo(-r, -3 * r);
	    context.lineTo(r, -3 * r);
	    context.lineTo(r, -r);
	    context.lineTo(3 * r, -r);
	    context.lineTo(3 * r, r);
	    context.lineTo(r, r);
	    context.lineTo(r, 3 * r);
	    context.lineTo(-r, 3 * r);
	    context.lineTo(-r, r);
	    context.lineTo(-3 * r, r);
	    context.closePath();
	  }
	};
	
	var tan30 = Math.sqrt(1 / 3);
	var tan30_2 = tan30 * 2;
	
	var diamond = {
	  draw: function(context, size) {
	    var y = Math.sqrt(size / tan30_2),
	        x = y * tan30;
	    context.moveTo(0, -y);
	    context.lineTo(x, 0);
	    context.lineTo(0, y);
	    context.lineTo(-x, 0);
	    context.closePath();
	  }
	};
	
	var ka = 0.89081309152928522810;
	var kr = Math.sin(pi / 10) / Math.sin(7 * pi / 10);
	var kx = Math.sin(tau / 10) * kr;
	var ky = -Math.cos(tau / 10) * kr;
	
	var star = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size * ka),
	        x = kx * r,
	        y = ky * r;
	    context.moveTo(0, -r);
	    context.lineTo(x, y);
	    for (var i = 1; i < 5; ++i) {
	      var a = tau * i / 5,
	          c = Math.cos(a),
	          s = Math.sin(a);
	      context.lineTo(s * r, -c * r);
	      context.lineTo(c * x - s * y, s * x + c * y);
	    }
	    context.closePath();
	  }
	};
	
	var square = {
	  draw: function(context, size) {
	    var w = Math.sqrt(size),
	        x = -w / 2;
	    context.rect(x, x, w, w);
	  }
	};
	
	var sqrt3 = Math.sqrt(3);
	
	var triangle = {
	  draw: function(context, size) {
	    var y = -Math.sqrt(size / (sqrt3 * 3));
	    context.moveTo(0, y * 2);
	    context.lineTo(-sqrt3 * y, -y);
	    context.lineTo(sqrt3 * y, -y);
	    context.closePath();
	  }
	};
	
	var c = -0.5;
	var s = Math.sqrt(3) / 2;
	var k = 1 / Math.sqrt(12);
	var a = (k / 2 + 1) * 3;
	
	var wye = {
	  draw: function(context, size) {
	    var r = Math.sqrt(size / a),
	        x0 = r / 2,
	        y0 = r * k,
	        x1 = x0,
	        y1 = r * k + r,
	        x2 = -x1,
	        y2 = y1;
	    context.moveTo(x0, y0);
	    context.lineTo(x1, y1);
	    context.lineTo(x2, y2);
	    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
	    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
	    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
	    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
	    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
	    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
	    context.closePath();
	  }
	};
	
	var symbols = [
	  circle,
	  cross,
	  diamond,
	  square,
	  star,
	  triangle,
	  wye
	];
	
	var symbol = function() {
	  var type = constant(circle),
	      size = constant(64),
	      context = null;
	
	  function symbol() {
	    var buffer;
	    if (!context) context = buffer = d3Path.path();
	    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
	    if (buffer) return context = null, buffer + "" || null;
	  }
	
	  symbol.type = function(_) {
	    return arguments.length ? (type = typeof _ === "function" ? _ : constant(_), symbol) : type;
	  };
	
	  symbol.size = function(_) {
	    return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), symbol) : size;
	  };
	
	  symbol.context = function(_) {
	    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
	  };
	
	  return symbol;
	};
	
	var noop = function() {};
	
	function point(that, x, y) {
	  that._context.bezierCurveTo(
	    (2 * that._x0 + that._x1) / 3,
	    (2 * that._y0 + that._y1) / 3,
	    (that._x0 + 2 * that._x1) / 3,
	    (that._y0 + 2 * that._y1) / 3,
	    (that._x0 + 4 * that._x1 + x) / 6,
	    (that._y0 + 4 * that._y1 + y) / 6
	  );
	}
	
	function Basis(context) {
	  this._context = context;
	}
	
	Basis.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 3: point(this, this._x1, this._y1); // proceed
	      case 2: this._context.lineTo(this._x1, this._y1); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};
	
	var basis = function(context) {
	  return new Basis(context);
	};
	
	function BasisClosed(context) {
	  this._context = context;
	}
	
	BasisClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x2, this._y2);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
	        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x2, this._y2);
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
	      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
	      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};
	
	var basisClosed = function(context) {
	  return new BasisClosed(context);
	};
	
	function BasisOpen(context) {
	  this._context = context;
	}
	
	BasisOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
	      case 3: this._point = 4; // proceed
	      default: point(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	  }
	};
	
	var basisOpen = function(context) {
	  return new BasisOpen(context);
	};
	
	function Bundle(context, beta) {
	  this._basis = new Basis(context);
	  this._beta = beta;
	}
	
	Bundle.prototype = {
	  lineStart: function() {
	    this._x = [];
	    this._y = [];
	    this._basis.lineStart();
	  },
	  lineEnd: function() {
	    var x = this._x,
	        y = this._y,
	        j = x.length - 1;
	
	    if (j > 0) {
	      var x0 = x[0],
	          y0 = y[0],
	          dx = x[j] - x0,
	          dy = y[j] - y0,
	          i = -1,
	          t;
	
	      while (++i <= j) {
	        t = i / j;
	        this._basis.point(
	          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
	          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
	        );
	      }
	    }
	
	    this._x = this._y = null;
	    this._basis.lineEnd();
	  },
	  point: function(x, y) {
	    this._x.push(+x);
	    this._y.push(+y);
	  }
	};
	
	var bundle = ((function custom(beta) {
	
	  function bundle(context) {
	    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
	  }
	
	  bundle.beta = function(beta) {
	    return custom(+beta);
	  };
	
	  return bundle;
	}))(0.85);
	
	function point$1(that, x, y) {
	  that._context.bezierCurveTo(
	    that._x1 + that._k * (that._x2 - that._x0),
	    that._y1 + that._k * (that._y2 - that._y0),
	    that._x2 + that._k * (that._x1 - x),
	    that._y2 + that._k * (that._y1 - y),
	    that._x2,
	    that._y2
	  );
	}
	
	function Cardinal(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}
	
	Cardinal.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x2, this._y2); break;
	      case 3: point$1(this, this._x1, this._y1); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
	      case 2: this._point = 3; // proceed
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var cardinal = ((function custom(tension) {
	
	  function cardinal(context) {
	    return new Cardinal(context, tension);
	  }
	
	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };
	
	  return cardinal;
	}))(0);
	
	function CardinalClosed(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}
	
	CardinalClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.lineTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        this.point(this._x5, this._y5);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
	      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
	      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var cardinalClosed = ((function custom(tension) {
	
	  function cardinal(context) {
	    return new CardinalClosed(context, tension);
	  }
	
	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };
	
	  return cardinal;
	}))(0);
	
	function CardinalOpen(context, tension) {
	  this._context = context;
	  this._k = (1 - tension) / 6;
	}
	
	CardinalOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
	      case 3: this._point = 4; // proceed
	      default: point$1(this, x, y); break;
	    }
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var cardinalOpen = ((function custom(tension) {
	
	  function cardinal(context) {
	    return new CardinalOpen(context, tension);
	  }
	
	  cardinal.tension = function(tension) {
	    return custom(+tension);
	  };
	
	  return cardinal;
	}))(0);
	
	function point$2(that, x, y) {
	  var x1 = that._x1,
	      y1 = that._y1,
	      x2 = that._x2,
	      y2 = that._y2;
	
	  if (that._l01_a > epsilon) {
	    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
	        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
	    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
	    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
	  }
	
	  if (that._l23_a > epsilon) {
	    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
	        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
	    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
	    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
	  }
	
	  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
	}
	
	function CatmullRom(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}
	
	CatmullRom.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x2, this._y2); break;
	      case 3: this.point(this._x2, this._y2); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	
	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }
	
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; // proceed
	      default: point$2(this, x, y); break;
	    }
	
	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var catmullRom = ((function custom(alpha) {
	
	  function catmullRom(context) {
	    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
	  }
	
	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };
	
	  return catmullRom;
	}))(0.5);
	
	function CatmullRomClosed(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}
	
	CatmullRomClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
	    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 1: {
	        this._context.moveTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 2: {
	        this._context.lineTo(this._x3, this._y3);
	        this._context.closePath();
	        break;
	      }
	      case 3: {
	        this.point(this._x3, this._y3);
	        this.point(this._x4, this._y4);
	        this.point(this._x5, this._y5);
	        break;
	      }
	    }
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	
	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }
	
	    switch (this._point) {
	      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
	      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
	      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
	      default: point$2(this, x, y); break;
	    }
	
	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var catmullRomClosed = ((function custom(alpha) {
	
	  function catmullRom(context) {
	    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
	  }
	
	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };
	
	  return catmullRom;
	}))(0.5);
	
	function CatmullRomOpen(context, alpha) {
	  this._context = context;
	  this._alpha = alpha;
	}
	
	CatmullRomOpen.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 = this._x2 =
	    this._y0 = this._y1 = this._y2 = NaN;
	    this._l01_a = this._l12_a = this._l23_a =
	    this._l01_2a = this._l12_2a = this._l23_2a =
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	
	    if (this._point) {
	      var x23 = this._x2 - x,
	          y23 = this._y2 - y;
	      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
	    }
	
	    switch (this._point) {
	      case 0: this._point = 1; break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
	      case 3: this._point = 4; // proceed
	      default: point$2(this, x, y); break;
	    }
	
	    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
	    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
	    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
	    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
	  }
	};
	
	var catmullRomOpen = ((function custom(alpha) {
	
	  function catmullRom(context) {
	    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
	  }
	
	  catmullRom.alpha = function(alpha) {
	    return custom(+alpha);
	  };
	
	  return catmullRom;
	}))(0.5);
	
	function LinearClosed(context) {
	  this._context = context;
	}
	
	LinearClosed.prototype = {
	  areaStart: noop,
	  areaEnd: noop,
	  lineStart: function() {
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (this._point) this._context.closePath();
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    if (this._point) this._context.lineTo(x, y);
	    else this._point = 1, this._context.moveTo(x, y);
	  }
	};
	
	var linearClosed = function(context) {
	  return new LinearClosed(context);
	};
	
	function sign(x) {
	  return x < 0 ? -1 : 1;
	}
	
	// Calculate the slopes of the tangents (Hermite-type interpolation) based on
	// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
	// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
	// NOV(II), P. 443, 1990.
	function slope3(that, x2, y2) {
	  var h0 = that._x1 - that._x0,
	      h1 = x2 - that._x1,
	      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
	      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
	      p = (s0 * h1 + s1 * h0) / (h0 + h1);
	  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
	}
	
	// Calculate a one-sided slope.
	function slope2(that, t) {
	  var h = that._x1 - that._x0;
	  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
	}
	
	// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
	// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
	// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
	function point$3(that, t0, t1) {
	  var x0 = that._x0,
	      y0 = that._y0,
	      x1 = that._x1,
	      y1 = that._y1,
	      dx = (x1 - x0) / 3;
	  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
	}
	
	function MonotoneX(context) {
	  this._context = context;
	}
	
	MonotoneX.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x0 = this._x1 =
	    this._y0 = this._y1 =
	    this._t0 = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    switch (this._point) {
	      case 2: this._context.lineTo(this._x1, this._y1); break;
	      case 3: point$3(this, this._t0, slope2(this, this._t0)); break;
	    }
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    var t1 = NaN;
	
	    x = +x, y = +y;
	    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; break;
	      case 2: this._point = 3; point$3(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
	      default: point$3(this, this._t0, t1 = slope3(this, x, y)); break;
	    }
	
	    this._x0 = this._x1, this._x1 = x;
	    this._y0 = this._y1, this._y1 = y;
	    this._t0 = t1;
	  }
	};
	
	function MonotoneY(context) {
	  this._context = new ReflectContext(context);
	}
	
	(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
	  MonotoneX.prototype.point.call(this, y, x);
	};
	
	function ReflectContext(context) {
	  this._context = context;
	}
	
	ReflectContext.prototype = {
	  moveTo: function(x, y) { this._context.moveTo(y, x); },
	  closePath: function() { this._context.closePath(); },
	  lineTo: function(x, y) { this._context.lineTo(y, x); },
	  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
	};
	
	function monotoneX(context) {
	  return new MonotoneX(context);
	}
	
	function monotoneY(context) {
	  return new MonotoneY(context);
	}
	
	function Natural(context) {
	  this._context = context;
	}
	
	Natural.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x = [];
	    this._y = [];
	  },
	  lineEnd: function() {
	    var x = this._x,
	        y = this._y,
	        n = x.length;
	
	    if (n) {
	      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
	      if (n === 2) {
	        this._context.lineTo(x[1], y[1]);
	      } else {
	        var px = controlPoints(x),
	            py = controlPoints(y);
	        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
	          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
	        }
	      }
	    }
	
	    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
	    this._line = 1 - this._line;
	    this._x = this._y = null;
	  },
	  point: function(x, y) {
	    this._x.push(+x);
	    this._y.push(+y);
	  }
	};
	
	// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
	function controlPoints(x) {
	  var i,
	      n = x.length - 1,
	      m,
	      a = new Array(n),
	      b = new Array(n),
	      r = new Array(n);
	  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
	  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
	  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
	  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
	  a[n - 1] = r[n - 1] / b[n - 1];
	  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
	  b[n - 1] = (x[n] + a[n - 1]) / 2;
	  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
	  return [a, b];
	}
	
	var natural = function(context) {
	  return new Natural(context);
	};
	
	function Step(context, t) {
	  this._context = context;
	  this._t = t;
	}
	
	Step.prototype = {
	  areaStart: function() {
	    this._line = 0;
	  },
	  areaEnd: function() {
	    this._line = NaN;
	  },
	  lineStart: function() {
	    this._x = this._y = NaN;
	    this._point = 0;
	  },
	  lineEnd: function() {
	    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
	    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
	    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
	  },
	  point: function(x, y) {
	    x = +x, y = +y;
	    switch (this._point) {
	      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
	      case 1: this._point = 2; // proceed
	      default: {
	        if (this._t <= 0) {
	          this._context.lineTo(this._x, y);
	          this._context.lineTo(x, y);
	        } else {
	          var x1 = this._x * (1 - this._t) + x * this._t;
	          this._context.lineTo(x1, this._y);
	          this._context.lineTo(x1, y);
	        }
	        break;
	      }
	    }
	    this._x = x, this._y = y;
	  }
	};
	
	var step = function(context) {
	  return new Step(context, 0.5);
	};
	
	function stepBefore(context) {
	  return new Step(context, 0);
	}
	
	function stepAfter(context) {
	  return new Step(context, 1);
	}
	
	var none = function(series, order) {
	  if (!((n = series.length) > 1)) return;
	  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
	    s0 = s1, s1 = series[order[i]];
	    for (j = 0; j < m; ++j) {
	      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
	    }
	  }
	};
	
	var none$1 = function(series) {
	  var n = series.length, o = new Array(n);
	  while (--n >= 0) o[n] = n;
	  return o;
	};
	
	function stackValue(d, key) {
	  return d[key];
	}
	
	var stack = function() {
	  var keys = constant([]),
	      order = none$1,
	      offset = none,
	      value = stackValue;
	
	  function stack(data) {
	    var kz = keys.apply(this, arguments),
	        i,
	        m = data.length,
	        n = kz.length,
	        sz = new Array(n),
	        oz;
	
	    for (i = 0; i < n; ++i) {
	      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
	        si[j] = sij = [0, +value(data[j], ki, j, data)];
	        sij.data = data[j];
	      }
	      si.key = ki;
	    }
	
	    for (i = 0, oz = order(sz); i < n; ++i) {
	      sz[oz[i]].index = i;
	    }
	
	    offset(sz, oz);
	    return sz;
	  }
	
	  stack.keys = function(_) {
	    return arguments.length ? (keys = typeof _ === "function" ? _ : constant(slice.call(_)), stack) : keys;
	  };
	
	  stack.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), stack) : value;
	  };
	
	  stack.order = function(_) {
	    return arguments.length ? (order = _ == null ? none$1 : typeof _ === "function" ? _ : constant(slice.call(_)), stack) : order;
	  };
	
	  stack.offset = function(_) {
	    return arguments.length ? (offset = _ == null ? none : _, stack) : offset;
	  };
	
	  return stack;
	};
	
	var expand = function(series, order) {
	  if (!((n = series.length) > 0)) return;
	  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
	    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
	    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
	  }
	  none(series, order);
	};
	
	var diverging = function(series, order) {
	  if (!((n = series.length) > 1)) return;
	  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
	    for (yp = yn = 0, i = 0; i < n; ++i) {
	      if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
	        d[0] = yp, d[1] = yp += dy;
	      } else if (dy < 0) {
	        d[1] = yn, d[0] = yn += dy;
	      } else {
	        d[0] = yp;
	      }
	    }
	  }
	};
	
	var silhouette = function(series, order) {
	  if (!((n = series.length) > 0)) return;
	  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
	    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
	    s0[j][1] += s0[j][0] = -y / 2;
	  }
	  none(series, order);
	};
	
	var wiggle = function(series, order) {
	  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
	  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
	    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
	      var si = series[order[i]],
	          sij0 = si[j][1] || 0,
	          sij1 = si[j - 1][1] || 0,
	          s3 = (sij0 - sij1) / 2;
	      for (var k = 0; k < i; ++k) {
	        var sk = series[order[k]],
	            skj0 = sk[j][1] || 0,
	            skj1 = sk[j - 1][1] || 0;
	        s3 += skj0 - skj1;
	      }
	      s1 += sij0, s2 += s3 * sij0;
	    }
	    s0[j - 1][1] += s0[j - 1][0] = y;
	    if (s1) y -= s2 / s1;
	  }
	  s0[j - 1][1] += s0[j - 1][0] = y;
	  none(series, order);
	};
	
	var ascending = function(series) {
	  var sums = series.map(sum);
	  return none$1(series).sort(function(a, b) { return sums[a] - sums[b]; });
	};
	
	function sum(series) {
	  var s = 0, i = -1, n = series.length, v;
	  while (++i < n) if (v = +series[i][1]) s += v;
	  return s;
	}
	
	var descending$1 = function(series) {
	  return ascending(series).reverse();
	};
	
	var insideOut = function(series) {
	  var n = series.length,
	      i,
	      j,
	      sums = series.map(sum),
	      order = none$1(series).sort(function(a, b) { return sums[b] - sums[a]; }),
	      top = 0,
	      bottom = 0,
	      tops = [],
	      bottoms = [];
	
	  for (i = 0; i < n; ++i) {
	    j = order[i];
	    if (top < bottom) {
	      top += sums[j];
	      tops.push(j);
	    } else {
	      bottom += sums[j];
	      bottoms.push(j);
	    }
	  }
	
	  return bottoms.reverse().concat(tops);
	};
	
	var reverse = function(series) {
	  return none$1(series).reverse();
	};
	
	exports.arc = arc;
	exports.area = area;
	exports.line = line;
	exports.pie = pie;
	exports.radialArea = radialArea;
	exports.radialLine = radialLine$1;
	exports.linkHorizontal = linkHorizontal;
	exports.linkVertical = linkVertical;
	exports.linkRadial = linkRadial;
	exports.symbol = symbol;
	exports.symbols = symbols;
	exports.symbolCircle = circle;
	exports.symbolCross = cross;
	exports.symbolDiamond = diamond;
	exports.symbolSquare = square;
	exports.symbolStar = star;
	exports.symbolTriangle = triangle;
	exports.symbolWye = wye;
	exports.curveBasisClosed = basisClosed;
	exports.curveBasisOpen = basisOpen;
	exports.curveBasis = basis;
	exports.curveBundle = bundle;
	exports.curveCardinalClosed = cardinalClosed;
	exports.curveCardinalOpen = cardinalOpen;
	exports.curveCardinal = cardinal;
	exports.curveCatmullRomClosed = catmullRomClosed;
	exports.curveCatmullRomOpen = catmullRomOpen;
	exports.curveCatmullRom = catmullRom;
	exports.curveLinearClosed = linearClosed;
	exports.curveLinear = curveLinear;
	exports.curveMonotoneX = monotoneX;
	exports.curveMonotoneY = monotoneY;
	exports.curveNatural = natural;
	exports.curveStep = step;
	exports.curveStepAfter = stepAfter;
	exports.curveStepBefore = stepBefore;
	exports.stack = stack;
	exports.stackOffsetExpand = expand;
	exports.stackOffsetDiverging = diverging;
	exports.stackOffsetNone = none;
	exports.stackOffsetSilhouette = silhouette;
	exports.stackOffsetWiggle = wiggle;
	exports.stackOrderAscending = ascending;
	exports.stackOrderDescending = descending$1;
	exports.stackOrderInsideOut = insideOut;
	exports.stackOrderNone = none$1;
	exports.stackOrderReverse = reverse;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-path/ Version 1.0.5. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.d3 = global.d3 || {})));
	}(this, (function (exports) { 'use strict';
	
	var pi = Math.PI;
	var tau = 2 * pi;
	var epsilon = 1e-6;
	var tauEpsilon = tau - epsilon;
	
	function Path() {
	  this._x0 = this._y0 = // start of current subpath
	  this._x1 = this._y1 = null; // end of current subpath
	  this._ = "";
	}
	
	function path() {
	  return new Path;
	}
	
	Path.prototype = path.prototype = {
	  constructor: Path,
	  moveTo: function(x, y) {
	    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
	  },
	  closePath: function() {
	    if (this._x1 !== null) {
	      this._x1 = this._x0, this._y1 = this._y0;
	      this._ += "Z";
	    }
	  },
	  lineTo: function(x, y) {
	    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  quadraticCurveTo: function(x1, y1, x, y) {
	    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
	    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  arcTo: function(x1, y1, x2, y2, r) {
	    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
	    var x0 = this._x1,
	        y0 = this._y1,
	        x21 = x2 - x1,
	        y21 = y2 - y1,
	        x01 = x0 - x1,
	        y01 = y0 - y1,
	        l01_2 = x01 * x01 + y01 * y01;
	
	    // Is the radius negative? Error.
	    if (r < 0) throw new Error("negative radius: " + r);
	
	    // Is this path empty? Move to (x1,y1).
	    if (this._x1 === null) {
	      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
	    }
	
	    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
	    else if (!(l01_2 > epsilon)) {}
	
	    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
	    // Equivalently, is (x1,y1) coincident with (x2,y2)?
	    // Or, is the radius zero? Line to (x1,y1).
	    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
	      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
	    }
	
	    // Otherwise, draw an arc!
	    else {
	      var x20 = x2 - x0,
	          y20 = y2 - y0,
	          l21_2 = x21 * x21 + y21 * y21,
	          l20_2 = x20 * x20 + y20 * y20,
	          l21 = Math.sqrt(l21_2),
	          l01 = Math.sqrt(l01_2),
	          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
	          t01 = l / l01,
	          t21 = l / l21;
	
	      // If the start tangent is not coincident with (x0,y0), line to.
	      if (Math.abs(t01 - 1) > epsilon) {
	        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
	      }
	
	      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
	    }
	  },
	  arc: function(x, y, r, a0, a1, ccw) {
	    x = +x, y = +y, r = +r;
	    var dx = r * Math.cos(a0),
	        dy = r * Math.sin(a0),
	        x0 = x + dx,
	        y0 = y + dy,
	        cw = 1 ^ ccw,
	        da = ccw ? a0 - a1 : a1 - a0;
	
	    // Is the radius negative? Error.
	    if (r < 0) throw new Error("negative radius: " + r);
	
	    // Is this path empty? Move to (x0,y0).
	    if (this._x1 === null) {
	      this._ += "M" + x0 + "," + y0;
	    }
	
	    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
	    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
	      this._ += "L" + x0 + "," + y0;
	    }
	
	    // Is this arc empty? We’re done.
	    if (!r) return;
	
	    // Does the angle go the wrong way? Flip the direction.
	    if (da < 0) da = da % tau + tau;
	
	    // Is this a complete circle? Draw two arcs to complete the circle.
	    if (da > tauEpsilon) {
	      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
	    }
	
	    // Is this arc non-empty? Draw an arc!
	    else if (da > epsilon) {
	      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
	    }
	  },
	  rect: function(x, y, w, h) {
	    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
	  },
	  toString: function() {
	    return this._;
	  }
	};
	
	exports.path = path;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var _settingsToMajorTickM;
	
	    var d3Time = __webpack_require__(12);
	    var d3TimeFormat = __webpack_require__(13);
	
	    var _require = __webpack_require__(20),
	        axisTimeCombinations = _require.axisTimeCombinations,
	        timeBenchmarks = _require.timeBenchmarks;
	
	    var singleTickWidth = 20;
	    var horizontalTickSpacing = 50;
	    var minEntryNumForDayFormat = 5;
	    var xTickMinuteFormat = d3TimeFormat.timeFormat('%M m');
	    var xTickHourFormat = d3TimeFormat.timeFormat('%H %p');
	    var xTickSimpleDayFormat = d3TimeFormat.timeFormat('%e');
	    var xTickDayMonthFormat = d3TimeFormat.timeFormat('%d %b');
	    var xTickMonthFormat = d3TimeFormat.timeFormat('%b');
	    var xTickYearFormat = d3TimeFormat.timeFormat('%Y');
	
	    var formatMap = {
	        minute: xTickMinuteFormat,
	        hour: xTickHourFormat,
	        day: xTickSimpleDayFormat,
	        daymonth: xTickDayMonthFormat,
	        month: xTickMonthFormat,
	        year: xTickYearFormat
	    };
	    var settingsToMajorTickMap = (_settingsToMajorTickM = {}, _defineProperty(_settingsToMajorTickM, axisTimeCombinations.MINUTE_HOUR, d3Time.timeHour.every(1)), _defineProperty(_settingsToMajorTickM, axisTimeCombinations.HOUR_DAY, d3Time.timeDay.every(1)), _defineProperty(_settingsToMajorTickM, axisTimeCombinations.DAY_MONTH, d3Time.timeMonth.every(1)), _defineProperty(_settingsToMajorTickM, axisTimeCombinations.MONTH_YEAR, d3Time.timeYear.every(1)), _settingsToMajorTickM);
	
	    /**
	     * Figures out the proper settings from the current time span
	     * @param  {Number} timeSpan    Span of time charted by the graph in milliseconds
	     * @return {String}             Type of settings for the given timeSpan
	     */
	    var getAxisSettingsFromTimeSpan = function getAxisSettingsFromTimeSpan(timeSpan) {
	        var ONE_YEAR = timeBenchmarks.ONE_YEAR,
	            ONE_DAY = timeBenchmarks.ONE_DAY;
	
	        var settings = void 0;
	
	        if (timeSpan < ONE_DAY) {
	            settings = axisTimeCombinations.HOUR_DAY;
	        } else if (timeSpan < ONE_YEAR) {
	            settings = axisTimeCombinations.DAY_MONTH;
	        } else {
	            settings = axisTimeCombinations.MONTH_YEAR;
	        }
	
	        return settings;
	    };
	
	    /**
	     * Calculates the maximum number of ticks for the x axis
	     * @param  {Number} width Chart width
	     * @param  {Number} dataPointNumber  Number of entries on the data
	     * @return {Number}       Number of ticks to render
	     */
	    var getMaxNumOfHorizontalTicks = function getMaxNumOfHorizontalTicks(width, dataPointNumber) {
	        var ticksForWidth = Math.ceil(width / (singleTickWidth + horizontalTickSpacing));
	
	        return dataPointNumber < minEntryNumForDayFormat ? d3Time.timeDay : Math.min(dataPointNumber, ticksForWidth);
	    };
	
	    /**
	     * Returns tick object to be used when building the x axis
	     * @param {dataByDate} dataByDate       Chart data ordered by Date
	     * @param {Number} width                Chart width
	     * @param {String} settings             Optional forced settings for axis
	     * @return {object} tick settings for major and minr axis
	     */
	    var getXAxisSettings = function getXAxisSettings(dataByDate, width) {
	        var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	
	        var firstDate = new Date(dataByDate[0].date);
	        var lastDate = new Date(dataByDate[dataByDate.length - 1].date);
	        var dateTimeSpan = lastDate - firstDate;
	
	        if (!settings) {
	            settings = getAxisSettingsFromTimeSpan(dateTimeSpan);
	        }
	
	        var _settings$split = settings.split('-'),
	            _settings$split2 = _slicedToArray(_settings$split, 2),
	            minor = _settings$split2[0],
	            major = _settings$split2[1];
	
	        var majorTickValue = settingsToMajorTickMap[settings];
	        var minorTickValue = getMaxNumOfHorizontalTicks(width, dataByDate.length);
	
	        return {
	            minor: {
	                format: formatMap[minor],
	                tick: minorTickValue
	            },
	            major: {
	                format: formatMap[major],
	                tick: majorTickValue
	            }
	        };
	    };
	
	    return {
	        getXAxisSettings: getXAxisSettings
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
	    var d3Selection = __webpack_require__(1),
	        colors = __webpack_require__(19),
	        selectClass = 'form-control';
	
	    /**
	     * Creates a color schema selector
	     * @param  {String}   selectContainerSelector   CSS DOM selector for the select box root
	     * @param  {String}   chartSelector             CSS DOM selector of the chart to render
	     * @param  {Function} callback                  Optional callback to execute after color change
	     * @return {void}
	     */
	    function createColorSelector(selectContainerSelector, chartSelector, callback) {
	        var colorKeys = Object.keys(colors.colorSchemas);
	        var containerSelector = document.querySelector(selectContainerSelector);
	
	        if (!containerSelector) {
	            return;
	        }
	
	        // Create Select
	        var sel = document.createElement("select");
	        sel.className += ' ' + selectClass;
	
	        // And fill with options
	        colorKeys.forEach(function (key, i) {
	            var opt = document.createElement("option");
	
	            opt.value = key;
	            opt.text = colors.colorSchemasHuman[key];
	            sel.add(opt);
	        });
	
	        // Add it to the DOM
	        containerSelector.append(sel);
	
	        // Listen for changes
	        d3Selection.select(sel).on('change', function () {
	            // Get new color schema
	            var newSchema = colors.colorSchemas[this.value];
	
	            d3Selection.select(chartSelector).remove();
	
	            // Draw
	            if (callback) {
	                callback(newSchema);
	            }
	        });
	    }
	
	    return {
	        createColorSelector: createColorSelector
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 43 */,
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    /**
	     * Checks if a number is an integer of has decimal values
	     * @param  {Number}  value Value to check
	     * @return {Boolean}       If it is an iteger
	     */
	
	    function isInteger(value) {
	        return value % 1 === 0;
	    }
	
	    return {
	        isInteger: isInteger
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Format = __webpack_require__(8);
	
	    var valueRangeLimits = {
	        small: 10,
	        medium: 100
	    };
	    var integerValueFormats = {
	        small: d3Format.format(''),
	        medium: d3Format.format(''),
	        large: d3Format.format('.2s')
	    };
	    var decimalValueFormats = {
	        small: d3Format.format('.3f'),
	        medium: d3Format.format('.1f'),
	        large: d3Format.format('.2s')
	    };
	
	    function getValueSize(value) {
	        var size = 'large';
	
	        if (value < valueRangeLimits.small) {
	            size = 'small';
	        } else if (value < valueRangeLimits.medium) {
	            size = 'medium';
	        }
	        return size;
	    }
	
	    /**
	     * Formats an integer value depending on its value range
	     * @param  {Number} value Decimal point value to format
	     * @return {Number}       Formatted value to show
	     */
	    function formatIntegerValue(value) {
	        var format = integerValueFormats[getValueSize(value)];
	
	        return format(value);
	    }
	
	    /**
	     * Formats a floating point value depending on its value range
	     * @param  {Number} value Decimal point value to format
	     * @return {Number}       Formatted value to show
	     */
	    function formatDecimalValue(value) {
	        var format = decimalValueFormats[getValueSize(value)];
	
	        return format(value);
	    }
	
	    return {
	        formatDecimalValue: formatDecimalValue,
	        formatIntegerValue: formatIntegerValue
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Format = __webpack_require__(8);
	    var d3Selection = __webpack_require__(1);
	    var d3Transition = __webpack_require__(14);
	    var d3TimeFormat = __webpack_require__(13);
	
	    var _require = __webpack_require__(20),
	        axisTimeCombinations = _require.axisTimeCombinations;
	
	    var _require2 = __webpack_require__(45),
	        formatIntegerValue = _require2.formatIntegerValue,
	        formatDecimalValue = _require2.formatDecimalValue;
	
	    var _require3 = __webpack_require__(44),
	        isInteger = _require3.isInteger;
	
	    /**
	     * Tooltip Component reusable API class that renders a
	     * simple and configurable tooltip element for Britechart's
	     * line chart or stacked area chart.
	     *
	     * @module Tooltip
	     * @tutorial tooltip
	     * @requires d3-array, d3-axis, d3-dispatch, d3-format, d3-scale, d3-selection, d3-transition
	     *
	     * @example
	     * var lineChart = line(),
	     *     tooltip = tooltip();
	     *
	     * tooltip
	     *     .title('Tooltip title');
	     *
	     * lineChart
	     *     .width(500)
	     *     .on('customMouseOver', function() {
	     *          tooltip.show();
	     *     })
	     *     .on('customMouseMove', function(dataPoint, topicColorMap, dataPointXPosition) {
	     *          tooltip.update(dataPoint, topicColorMap, dataPointXPosition);
	     *     })
	     *     .on('customMouseOut', function() {
	     *          tooltip.hide();
	     *     });
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(lineChart);
	     *
	     * d3Selection.select('.metadata-group .hover-marker')
	     *     .datum([])
	     *     .call(tooltip);
	     *
	     */
	
	
	    return function module() {
	
	        var margin = {
	            top: 2,
	            right: 2,
	            bottom: 2,
	            left: 2
	        },
	            width = 250,
	            height = 45,
	            title = 'Tooltip title',
	
	
	        // tooltip
	        tooltip = void 0,
	            tooltipOffset = {
	            y: -55,
	            x: 0
	        },
	            tooltipMaxTopicLength = 170,
	            tooltipTextContainer = void 0,
	            tooltipDivider = void 0,
	            tooltipBody = void 0,
	            tooltipTitle = void 0,
	            tooltipWidth = 250,
	            tooltipHeight = 48,
	            ttTextX = 0,
	            ttTextY = 37,
	            textSize = void 0,
	            entryLineLimit = 3,
	            circleYOffset = 8,
	            colorMap = void 0,
	            bodyFillColor = '#FFFFFF',
	            borderStrokeColor = '#D2D6DF',
	            titleFillColor = '#6D717A',
	            textFillColor = '#282C35',
	            tooltipTextColor = '#000000',
	            dateLabel = 'date',
	            valueLabel = 'value',
	            topicLabel = 'topics',
	            defaultAxisSettings = axisTimeCombinations.DAY_MONTH,
	            forceAxisSettings = null,
	            forceOrder = [],
	
	
	        // formats
	        monthDayYearFormat = d3TimeFormat.timeFormat('%b %d, %Y'),
	            monthDayHourFormat = d3TimeFormat.timeFormat('%b %d, %I %p'),
	            chartWidth = void 0,
	            chartHeight = void 0,
	            data = void 0,
	            svg = void 0;
	
	        /**
	         * This function creates the graph using the selection as container
	         * @param {D3Selection} _selection A d3 selection that represents
	         *                                  the container(s) where the chart(s) will be rendered
	         * @param {Object} _data The data to attach and generate the chart
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	                data = _data;
	
	                buildSVG(this);
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
	                svg = d3Selection.select(container).append('g').classed('britechart britechart-tooltip', true);
	
	                buildContainerGroups();
	                drawTooltip();
	            }
	            svg.transition().attr('width', width).attr('height', height);
	
	            // Hidden by default
	            exports.hide();
	        }
	
	        /**
	         * Resets the tooltipBody content
	         * @return void
	         */
	        function cleanContent() {
	            tooltipBody.selectAll('text').remove();
	            tooltipBody.selectAll('circle').remove();
	        }
	
	        /**
	         * Draws the different elements of the Tooltip box
	         * @return void
	         */
	        function drawTooltip() {
	            tooltipTextContainer = svg.selectAll('.tooltip-group').append('g').classed('tooltip-text', true);
	
	            tooltip = tooltipTextContainer.append('rect').classed('tooltip-text-container', true).attr('x', -tooltipWidth / 4 + 8).attr('y', 0).attr('width', tooltipWidth).attr('height', tooltipHeight).attr('rx', 3).attr('ry', 3).style('fill', bodyFillColor).style('stroke', borderStrokeColor).style('stroke-width', 1);
	
	            tooltipTitle = tooltipTextContainer.append('text').classed('tooltip-title', true).attr('x', -tooltipWidth / 4 + 17).attr('dy', '.35em').attr('y', 16).style('fill', titleFillColor);
	
	            tooltipDivider = tooltipTextContainer.append('line').classed('tooltip-divider', true).attr('x1', -tooltipWidth / 4 + 15).attr('y1', 31).attr('x2', 265).attr('y2', 31).style('stroke', borderStrokeColor);
	
	            tooltipBody = tooltipTextContainer.append('g').classed('tooltip-body', true).style('transform', 'translateY(8px)').style('fill', textFillColor);
	        }
	
	        /**
	         * Formats the value depending on its characteristics
	         * @param  {Number} value Value to format
	         * @return {Number}       Formatted value
	         */
	        function getFormattedValue(value) {
	            if (!value) {
	                return 0;
	            }
	
	            if (isInteger(value)) {
	                value = formatIntegerValue(value);
	            } else {
	                value = formatDecimalValue(value);
	            }
	
	            return value;
	        }
	
	        /**
	         * Extracts the value from the data object
	         * @param  {Object} data Data value containing the info
	         * @return {String}      Value to show
	         */
	        function getValueText(data) {
	            var value = data[valueLabel];
	            var valueText = void 0;
	
	            if (data.missingValue) {
	                valueText = '-';
	            } else {
	                valueText = getFormattedValue(value).toString();
	            }
	
	            return valueText;
	        }
	
	        /**
	         * Resets the height of the tooltip and the pointer for the text
	         * position
	         */
	        function resetSizeAndPositionPointers() {
	            tooltipHeight = 48;
	            ttTextY = 37;
	            ttTextX = 0;
	        }
	
	        /**
	         * Draws the data entries inside the tooltip for a given topic
	         * @param  {Object} topic Topic to extract data from
	         * @return void
	         */
	        function updateContent(topic) {
	            var name = topic.name,
	                tooltipRight = void 0,
	                tooltipLeftText = void 0,
	                tooltipRightText = void 0,
	                elementText = void 0;
	
	            tooltipLeftText = topic.topicName || name;
	            tooltipRightText = getValueText(topic);
	
	            elementText = tooltipBody.append('text').classed('tooltip-left-text', true).attr('dy', '1em').attr('x', ttTextX - 20).attr('y', ttTextY).style('fill', tooltipTextColor).text(tooltipLeftText).call(textWrap, tooltipMaxTopicLength, -25);
	
	            tooltipRight = tooltipBody.append('text').classed('tooltip-right-text', true).attr('dy', '1em').attr('x', ttTextX + 8).attr('y', ttTextY).style('fill', tooltipTextColor).text(tooltipRightText);
	
	            textSize = elementText.node().getBBox();
	            tooltipHeight += textSize.height + 5;
	
	            // Not sure if necessary
	            tooltipRight.attr('x', tooltipWidth - tooltipRight.node().getBBox().width - 10 - tooltipWidth / 4);
	
	            tooltipBody.append('circle').classed('tooltip-circle', true).attr('cx', 23 - tooltipWidth / 4).attr('cy', ttTextY + circleYOffset).attr('r', 5).style('fill', colorMap[name]).style('stroke-width', 1);
	
	            ttTextY += textSize.height + 7;
	        }
	
	        /**
	         * Updates size and position of tooltip depending on the side of the chart we are in
	         * @param  {Object} dataPoint DataPoint of the tooltip
	         * @param  {Number} xPosition DataPoint's x position in the chart
	         * @return void
	         */
	        function updatePositionAndSize(dataPoint, xPosition) {
	            tooltip.attr('width', tooltipWidth).attr('height', tooltipHeight + 10);
	
	            // show tooltip to the right
	            if (xPosition - tooltipWidth < 0) {
	                // Tooltip on the right
	                tooltipTextContainer.attr('transform', 'translate(' + (tooltipWidth - 185) + ',' + tooltipOffset.y + ')');
	            } else {
	                // Tooltip on the left
	                tooltipTextContainer.attr('transform', 'translate(' + -205 + ',' + tooltipOffset.y + ')');
	            }
	
	            tooltipDivider.attr('x2', tooltipWidth - 60);
	        }
	
	        /**
	         * Updates value of tooltipTitle with the data meaning and the date
	         * @param  {Object} dataPoint Point of data to use as source
	         * @return void
	         */
	        function updateTitle(dataPoint) {
	            var date = new Date(dataPoint[dateLabel]),
	                tooltipTitleText = title + ' - ' + formatDate(date);
	
	            tooltipTitle.text(tooltipTitleText);
	        }
	
	        /**
	         * Figures out which date format to use when showing the date of the current data entry
	         * @return {Function} The proper date formatting function
	         */
	        function formatDate(date) {
	            var settings = forceAxisSettings || defaultAxisSettings;
	            var format = null;
	
	            if (settings === axisTimeCombinations.DAY_MONTH || settings === axisTimeCombinations.MONTH_YEAR) {
	                format = monthDayYearFormat;
	            } else if (settings === axisTimeCombinations.HOUR_DAY || settings === axisTimeCombinations.MINUTE_HOUR) {
	                format = monthDayHourFormat;
	            }
	
	            return format(date);
	        }
	
	        /**
	         * Helper method to sort the passed topics array by the names passed int he order arary
	         * @param  {Object[]} topics    Topics data, retrieved from datapoint passed by line chart
	         * @param  {Object[]} order     Array of names in the order to sort topics by
	         * @return {Object[]}           sorted topics object
	         */
	        function _sortByForceOrder(topics) {
	            var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : forceOrder;
	
	            return forceOrder.map(function (orderName) {
	                return topics.filter(function (_ref) {
	                    var name = _ref.name;
	                    return name === orderName;
	                })[0];
	            });
	        }
	
	        /**
	         * Updates tooltip title, content, size and position
	         *
	         * @param  {lineChartPointByDate} dataPoint  Current datapoint to show info about
	         * @param  {Number} xPosition           Position of the mouse on the X axis
	         * @return void
	         */
	        function updateTooltip(dataPoint, xPosition) {
	            var topics = dataPoint[topicLabel];
	
	            // sort order by forceOrder array if passed
	            if (forceOrder.length) {
	                topics = _sortByForceOrder(topics);
	            }
	
	            cleanContent();
	            resetSizeAndPositionPointers();
	            updateTitle(dataPoint);
	            topics.forEach(updateContent);
	            updatePositionAndSize(dataPoint, xPosition);
	        }
	
	        /**
	         * Wraps a text given the text, width, x position and textFormatter function
	         * @param  {D3Selection} text  Selection with the text to wrap inside
	         * @param  {Number} width Desired max width for that line
	         * @param  {Number} xpos  Initial x position of the text
	         *
	         * REF: http://bl.ocks.org/mbostock/7555321
	         * More discussions on https://github.com/mbostock/d3/issues/1642
	         */
	        function textWrap(text, width, xpos) {
	            xpos = xpos || 0;
	
	            text.each(function () {
	                var words, word, line, lineNumber, lineHeight, y, dy, tspan;
	
	                text = d3Selection.select(this);
	
	                words = text.text().split(/\s+/).reverse();
	                line = [];
	                lineNumber = 0;
	                lineHeight = 1.2;
	                y = text.attr('y');
	                dy = parseFloat(text.attr('dy'));
	                tspan = text.text(null).append('tspan').attr('x', xpos).attr('y', y).attr('dy', dy + 'em');
	
	                while (word = words.pop()) {
	                    line.push(word);
	                    tspan.text(line.join(' '));
	
	                    if (tspan.node().getComputedTextLength() > width) {
	                        line.pop();
	                        tspan.text(line.join(' '));
	
	                        if (lineNumber < entryLineLimit - 1) {
	                            line = [word];
	                            tspan = text.append('tspan').attr('x', xpos).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
	                        }
	                    }
	                }
	            });
	        }
	
	        /**
	         * Gets or Sets the dateLabel of the data
	         * @param  {Number} _x Desired dateLabel
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
	         * Gets or Sets the valueLabel of the data
	         * @param  {Number} _x Desired valueLabel
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
	         * Gets or Sets the topicLabel of the data
	         * @param  {Number} _x Desired topicLabel
	         * @return { topicLabel | module} Current topicLabel or Chart module to chain calls
	         * @public
	         */
	        exports.topicLabel = function (_x) {
	            if (!arguments.length) {
	                return topicLabel;
	            }
	            topicLabel = _x;
	
	            return this;
	        };
	
	        /**
	         * Hides the tooltip
	         * @return {Module} Tooltip module to chain calls
	         * @public
	         */
	        exports.hide = function () {
	            svg.style('display', 'none');
	
	            return this;
	        };
	
	        /**
	         * Shows the tooltip
	         * @return {Module} Tooltip module to chain calls
	         * @public
	         */
	        exports.show = function () {
	            svg.style('display', 'block');
	
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
	         * Pass an override for the ordering of your tooltip
	         * @param  {Object[]} _x    Array of the names of your tooltip items
	         * @return { overrideOrder | module} Current overrideOrder or Chart module to chain calls
	         * @public
	         */
	        exports.forceOrder = function (_x) {
	            if (!arguments.length) {
	                return forceOrder;
	            }
	            forceOrder = _x;
	
	            return this;
	        };
	
	        /**
	         * Updates the position and content of the tooltip
	         * @param  {Object} dataPoint    Datapoint to represent
	         * @param  {Object} colorMapping Color scheme of the topics
	         * @param  {Number} position     X-scale position in pixels
	         * @return {Module} Tooltip module to chain calls
	         * @public
	         */
	        exports.update = function (dataPoint, colorMapping, position) {
	            colorMap = colorMapping;
	            updateTooltip(dataPoint, position);
	
	            return this;
	        };
	
	        /**
	         * Exposes the ability to force the tooltip to use a certain date format
	         * @param  {String} _x Desired format
	         * @return { (String|Module) }    Current format or module to chain calls
	         */
	        exports.forceDateRange = function (_x) {
	            if (!arguments.length) {
	                return forceAxisSettings || defaultAxisSettings;
	            }
	            forceAxisSettings = _x;
	            return this;
	        };
	
	        /**
	         * constants to be used to force the x axis to respect a certain granularity
	         * current options: HOUR_DAY, DAY_MONTH, MONTH_YEAR
	         * @example tooltip.forceDateRange(tooltip.axisTimeCombinations.HOUR_DAY)
	         */
	        exports.axisTimeCombinations = axisTimeCombinations;
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Array = __webpack_require__(4);
	    var d3Axis = __webpack_require__(5);
	    var d3Collection = __webpack_require__(10);
	    var d3Dispatch = __webpack_require__(7);
	    var d3Ease = __webpack_require__(16);
	    var d3Scale = __webpack_require__(9);
	    var d3Shape = __webpack_require__(32);
	    var d3Selection = __webpack_require__(1);
	    var d3Transition = __webpack_require__(14);
	    var d3TimeFormat = __webpack_require__(13);
	
	    var assign = __webpack_require__(58);
	
	    var _require = __webpack_require__(18),
	        exportChart = _require.exportChart;
	
	    var colorHelper = __webpack_require__(19);
	    var timeAxisHelper = __webpack_require__(34);
	
	    var _require2 = __webpack_require__(44),
	        isInteger = _require2.isInteger;
	
	    var _require3 = __webpack_require__(20),
	        axisTimeCombinations = _require3.axisTimeCombinations;
	
	    var _require4 = __webpack_require__(45),
	        formatIntegerValue = _require4.formatIntegerValue,
	        formatDecimalValue = _require4.formatDecimalValue;
	
	    var uniq = function uniq(arrArg) {
	        return arrArg.filter(function (elem, pos, arr) {
	            return arr.indexOf(elem) == pos;
	        });
	    };
	
	    /**
	     * @typdef D3Layout
	     * @type function
	     */
	
	    /**
	     * @typedef areaChartData
	     * @type {Object}
	     * @property {Object[]} data       All data entries
	     * @property {String} date         Date of the entry
	     * @property {String} name         Name of the entry
	     * @property {Number} value        Value of the entry
	     *
	     * @example
	     * {
	     *     'data': [
	     *         {
	     *             "date": "2011-01-05T00:00:00Z",
	     *             "name": "Direct",
	     *             "value": 0
	     *         }
	     *     ]
	     * }
	     */
	
	    /**
	     * Stacked Area Chart reusable API module that allows us
	     * rendering a multi area and configurable chart.
	     *
	     * @module Stacked-area
	     * @tutorial stacked-area
	     * @requires d3-array, d3-axis, d3-collection, d3-ease, d3-scale, d3-shape, d3-selection, d3-time, d3-time-format
	     *
	     * @example
	     * let stackedArea = stackedArea();
	     *
	     * stackedArea
	     *     .width(containerWidth);
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset.data)
	     *     .call(stackedArea);
	     *
	     */
	
	    return function module() {
	
	        var margin = {
	            top: 70,
	            right: 30,
	            bottom: 60,
	            left: 70
	        },
	            width = 960,
	            height = 500,
	            xScale = void 0,
	            xAxis = void 0,
	            xMonthAxis = void 0,
	            yScale = void 0,
	            yAxis = void 0,
	            aspectRatio = null,
	            monthAxisPadding = 30,
	            verticalTicks = 5,
	            yTickTextYOffset = -8,
	            yTickTextXOffset = -20,
	            tickPadding = 5,
	            colorSchema = colorHelper.colorSchemas.britechartsColorSchema,
	            colorOrder = colorSchema.reduce(function (acc, color, index) {
	            acc[color] = index;
	
	            return acc;
	        }, {}),
	            areaOpacity = 0.64,
	            colorScale = void 0,
	            categoryColorMap = void 0,
	            order = void 0,
	            forceAxisSettings = null,
	            forcedXTicks = null,
	            forcedXFormat = null,
	            baseLine = void 0,
	            layers = void 0,
	            layersInitial = void 0,
	            area = void 0,
	
	
	        // Area Animation
	        maxAreaNumber = 8,
	            areaAnimationDelayStep = 20,
	            areaAnimationDelays = d3Array.range(areaAnimationDelayStep, maxAreaNumber * areaAnimationDelayStep, areaAnimationDelayStep),
	            overlay = void 0,
	            verticalMarkerContainer = void 0,
	            verticalMarker = void 0,
	            epsilon = void 0,
	            dataPoints = {},
	            pointsSize = 1.5,
	            pointsColor = '#c0c6cc',
	            pointsBorderColor = '#ffffff',
	            isAnimated = false,
	            ease = d3Ease.easeQuadInOut,
	            areaAnimationDuration = 1000,
	            svg = void 0,
	            chartWidth = void 0,
	            chartHeight = void 0,
	            data = void 0,
	            dataByDate = void 0,
	            dataByDateFormatted = void 0,
	            dataByDateZeroed = void 0,
	            verticalGridLines = void 0,
	            horizontalGridLines = void 0,
	            grid = null,
	            tooltipThreshold = 480,
	            xAxisPadding = {
	            top: 0,
	            left: 15,
	            bottom: 0,
	            right: 0
	        },
	            dateLabel = 'date',
	            valueLabel = 'value',
	            keyLabel = 'name',
	
	
	        // getters
	        getName = function getName(_ref) {
	            var name = _ref.name;
	            return name;
	        },
	            getDate = function getDate(_ref2) {
	            var date = _ref2.date;
	            return date;
	        },
	
	
	        // events
	        dispatcher = d3Dispatch.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');
	
	        /**
	          * This function creates the graph using the selection and data provided
	          * @param {D3Selection} _selection A d3 selection that represents
	          * the container(s) where the chart(s) will be rendered
	          * @param {areaChartData} _data The data to attach and generate the chart
	          */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	                data = cleanData(_data);
	                dataByDate = getDataByDate(data);
	
	                buildLayers();
	                buildScales();
	                buildSVG(this);
	                buildAxis();
	                drawAxis();
	                drawStackedAreas();
	
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
	         * Formats the value depending on its characteristics
	         * @param  {Number} value Value to format
	         * @return {Number}       Formatted value
	         */
	        function getFormattedValue(value) {
	            var format = void 0;
	
	            if (isInteger(value)) {
	                format = formatIntegerValue;
	            } else {
	                format = formatDecimalValue;
	            }
	
	            return format(value);
	        }
	
	        /**
	         * Creates the d3 x and y axis, setting orientations
	         * @private
	         */
	        function buildAxis() {
	            var dataSpan = yScale.domain()[1] - yScale.domain()[0];
	            var yTickNumber = dataSpan < verticalTicks - 1 ? dataSpan : verticalTicks;
	            var minor = void 0,
	                major = void 0;
	
	            if (forceAxisSettings === 'custom' && typeof forcedXFormat === 'string') {
	                minor = {
	                    tick: forcedXTicks,
	                    format: d3TimeFormat.timeFormat(forcedXFormat)
	                };
	                major = null;
	            } else {
	                var _timeAxisHelper$getXA = timeAxisHelper.getXAxisSettings(dataByDate, width, forceAxisSettings);
	
	                minor = _timeAxisHelper$getXA.minor;
	                major = _timeAxisHelper$getXA.major;
	
	
	                xMonthAxis = d3Axis.axisBottom(xScale).ticks(major.tick).tickSize(0, 0).tickFormat(major.format);
	            }
	
	            xAxis = d3Axis.axisBottom(xScale).ticks(minor.tick).tickSize(10, 0).tickPadding(tickPadding).tickFormat(minor.format);
	
	            yAxis = d3Axis.axisRight(yScale).ticks(yTickNumber).tickSize([0]).tickPadding(tickPadding).tickFormat(getFormattedValue);
	
	            drawGridLines(minor.tick, yTickNumber);
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
	            container.append('g').classed('grid-lines-group', true);
	            container.append('g').classed('chart-group', true);
	            container.append('g').classed('metadata-group', true);
	        }
	
	        /**
	         * Builds the stacked layers layout
	         * @return {D3Layout} Layout for drawing the chart
	         * @private
	         */
	        function buildLayers() {
	            dataByDateFormatted = dataByDate.map(function (d) {
	                return assign({}, d, d.values);
	            }).map(function (d) {
	                Object.keys(d).forEach(function (k) {
	                    var entry = d[k];
	
	                    if (entry && entry.name) {
	                        d[entry.name] = entry.value;
	                    }
	                });
	
	                return assign({}, d, {
	                    date: new Date(d['key'])
	                });
	            });
	
	            dataByDateZeroed = dataByDate.map(function (d) {
	                return assign({}, d, d.values);
	            }).map(function (d) {
	                Object.keys(d).forEach(function (k) {
	                    var entry = d[k];
	
	                    if (entry && entry.name) {
	                        d[entry.name] = 0;
	                    }
	                });
	
	                return assign({}, d, {
	                    date: new Date(d['key'])
	                });
	            });
	
	            order = uniq(data.map(function (o) {
	                return o.name;
	            }));
	            var stack3 = d3Shape.stack().keys(order).order(d3Shape.stackOrderNone).offset(d3Shape.stackOffsetNone);
	
	            layersInitial = stack3(dataByDateZeroed);
	            layers = stack3(dataByDateFormatted);
	        }
	
	        /**
	         * Creates the x, y and color scales of the chart
	         * @private
	         */
	        function buildScales() {
	            xScale = d3Scale.scaleTime().domain(d3Array.extent(dataByDate, function (_ref3) {
	                var date = _ref3.date;
	                return date;
	            })).rangeRound([0, chartWidth]);
	
	            yScale = d3Scale.scaleLinear().domain([0, getMaxValueByDate()]).rangeRound([chartHeight, 0]).nice();
	
	            colorScale = d3Scale.scaleOrdinal().range(colorSchema).domain(data.map(getName));
	
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
	                svg = d3Selection.select(container).append('svg').classed('britechart stacked-area', true);
	
	                buildContainerGroups();
	            }
	
	            svg.attr('width', width).attr('height', height);
	        }
	
	        /**
	         * Parses dates and values into JS Date objects and numbers
	         * @param  {obj} data Raw data from JSON file
	         * @return {obj}      Parsed data with values and dates
	         */
	        function cleanData(data) {
	            return data.map(function (d) {
	                d.date = new Date(d[dateLabel]), d.value = +d[valueLabel];
	
	                return d;
	            });
	        }
	
	        /**
	         * Draws the x and y axis on the svg object within their
	         * respective groups
	         * @private
	         */
	        function drawAxis() {
	            svg.select('.x-axis-group .axis.x').attr('transform', 'translate( 0, ' + chartHeight + ' )').call(xAxis);
	
	            if (forceAxisSettings !== 'custom') {
	                svg.select('.x-axis-group .month-axis').attr('transform', 'translate(0, ' + (chartHeight + monthAxisPadding) + ')').call(xMonthAxis);
	            }
	
	            svg.select('.y-axis-group.axis').attr('transform', 'translate( ' + -xAxisPadding.left + ', 0)').call(yAxis).call(adjustYTickLabels);
	
	            // Moving the YAxis tick labels to the right side
	            // d3Selection.selectAll('.y-axis-group .tick text')
	            //     .attr('transform', `translate( ${-chartWidth - yTickTextXOffset}, ${yTickTextYOffset})` );
	        }
	
	        /**
	         * Adjusts the position of the y axis' ticks
	         * @param  {D3Selection} selection Y axis group
	         * @return void
	         */
	        function adjustYTickLabels(selection) {
	            selection.selectAll('.tick text').attr('transform', 'translate(' + yTickTextXOffset + ', ' + yTickTextYOffset + ')');
	        }
	
	        /**
	         * Creates SVG dot elements for each data entry and draws them
	         * TODO: Plug
	         */
	        function drawDataReferencePoints() {
	            // Creates Dots on Data points
	            var points = svg.select('.chart-group').selectAll('.dots').data(layers).enter().append('g').attr('class', 'dots').attr('d', function (_ref4) {
	                var values = _ref4.values;
	                return area(values);
	            }).attr('clip-path', 'url(#clip)');
	
	            // Processes the points
	            // TODO: Optimize this code
	            points.selectAll('.dot').data(function (_ref5, index) {
	                var values = _ref5.values;
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
	
	                var date = point.date,
	                    y = point.y,
	                    y0 = point.y0;
	
	                return 'translate( ' + xScale(date) + ', ' + yScale(y + y0) + ' )';
	            });
	        }
	
	        /**
	         * Draws grid lines on the background of the chart
	         * @return void
	         */
	        function drawGridLines(xTicks, yTicks) {
	            if (grid === 'horizontal' || grid === 'full') {
	                horizontalGridLines = svg.select('.grid-lines-group').selectAll('line.horizontal-grid-line').data(yScale.ticks(yTicks)).enter().append('line').attr('class', 'horizontal-grid-line').attr('x1', -xAxisPadding.left - 30).attr('x2', chartWidth).attr('y1', function (d) {
	                    return yScale(d);
	                }).attr('y2', function (d) {
	                    return yScale(d);
	                });
	            }
	
	            if (grid === 'vertical' || grid === 'full') {
	                verticalGridLines = svg.select('.grid-lines-group').selectAll('line.vertical-grid-line').data(xScale.ticks(xTicks)).enter().append('line').attr('class', 'vertical-grid-line').attr('y1', 0).attr('y2', chartHeight).attr('x1', function (d) {
	                    return xScale(d);
	                }).attr('x2', function (d) {
	                    return xScale(d);
	                });
	            }
	
	            //draw a horizontal line to extend x-axis till the edges
	            baseLine = svg.select('.grid-lines-group').selectAll('line.extended-x-line').data([0]).enter().append('line').attr('class', 'extended-x-line').attr('x1', -xAxisPadding.left - 30).attr('x2', chartWidth).attr('y1', height - margin.bottom - margin.top).attr('y2', height - margin.bottom - margin.top);
	        }
	
	        /**
	         * Draws an overlay element over the graph
	         * @private
	         */
	        function drawHoverOverlay() {
	            overlay = svg.select('.metadata-group').append('rect').attr('class', 'overlay').attr('y1', 0).attr('y2', chartHeight).attr('height', chartHeight).attr('width', chartWidth).attr('fill', 'rgba(0,0,0,0)').style('display', 'none');
	        }
	
	        /**
	         * Draws the different areas into the chart-group element
	         * @private
	         */
	        function drawStackedAreas() {
	            var series = void 0;
	
	            area = d3Shape.area().curve(d3Shape.curveMonotoneX).x(function (_ref6) {
	                var data = _ref6.data;
	                return xScale(data.date);
	            }).y0(function (d) {
	                return yScale(d[0]);
	            }).y1(function (d) {
	                return yScale(d[1]);
	            });
	
	            if (isAnimated) {
	                series = svg.select('.chart-group').selectAll('.layer').data(layersInitial).enter().append('g').classed('layer-container', true);
	
	                series.append('path').attr('class', 'layer').attr('d', area).style('fill', function (_ref7) {
	                    var key = _ref7.key;
	                    return categoryColorMap[key];
	                });
	
	                // Update
	                svg.select('.chart-group').selectAll('.layer').data(layers).transition().delay(function (_, i) {
	                    return areaAnimationDelays[i];
	                }).duration(areaAnimationDuration).ease(ease).attr('d', area).style('opacity', areaOpacity).style('fill', function (_ref8) {
	                    var key = _ref8.key;
	                    return categoryColorMap[key];
	                });
	            } else {
	                series = svg.select('.chart-group').selectAll('.layer').data(layers).enter().append('g').classed('layer-container', true);
	
	                series.append('path').attr('class', 'layer').attr('d', area).style('fill', function (_ref9) {
	                    var key = _ref9.key;
	                    return categoryColorMap[key];
	                });
	
	                // Update
	                series.attr('d', area).style('opacity', areaOpacity).style('fill', function (_ref10) {
	                    var key = _ref10.key;
	                    return categoryColorMap[key];
	                });
	            }
	
	            // Exit
	            series.exit().transition().style('opacity', 0).remove();
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
	            }]).enter().append('line').classed('vertical-marker', true).attr('x1', 0).attr('y1', chartHeight).attr('x2', 0).attr('y2', 0);
	        }
	
	        /**
	         * Removes all the datapoints highlighter circles added to the marker container
	         * @return void
	         */
	        function eraseDataPointHighlights() {
	            verticalMarkerContainer.selectAll('.circle-container').remove();
	        }
	
	        /**
	         * Orders the data by date for consumption on the chart tooltip
	         * @param  {areaChartData} data    Chart data
	         * @return {Object[]}               Chart data ordered by date
	         * @private
	         */
	        function getDataByDate(data) {
	            return d3Collection.nest().key(getDate).entries(data.sort(function (a, b) {
	                return a.date - b.date;
	            })).map(function (d) {
	                return assign({}, d, {
	                    date: new Date(d.key)
	                });
	            });
	
	            // let b =  d3Collection.nest()
	            //                     .key(getDate).sortKeys(d3Array.ascending)
	            //                     .entries(data);
	        }
	
	        /**
	         * Computes the maximum sum of values for any date
	         *
	         * @return {Number} Max value
	         */
	        function getMaxValueByDate() {
	            var keys = uniq(data.map(function (o) {
	                return o.name;
	            }));
	            var maxValueByDate = d3Array.max(dataByDateFormatted, function (d) {
	                var vals = keys.map(function (key) {
	                    return d[key];
	                });
	
	                return d3Array.sum(vals);
	            });
	
	            return maxValueByDate;
	        }
	
	        /**
	         * Extract X position on the chart from a given mouse event
	         * @param  {obj} event D3 mouse event
	         * @return {Number}       Position on the x axis of the mouse
	         * @private
	         */
	        function getMouseXPosition(event) {
	            return d3Selection.mouse(event)[0];
	        }
	
	        /**
	         * Finds out the data entry that is closer to the given position on pixels
	         * @param  {Number} mouseX X position of the mouse
	         * @return {obj}        Data entry that is closer to that x axis position
	         */
	        function getNearestDataPoint(mouseX) {
	            return dataByDate.find(function (_ref11) {
	                var date = _ref11.date;
	                return Math.abs(xScale(date) - mouseX) <= epsilon;
	            });
	        }
	
	        /**
	         * Epsilon is the value given to the number representing half of the distance in
	         * pixels between two date data points
	         * @return {Number} half distance between any two points
	         */
	        function setEpsilon() {
	            var dates = dataByDate.map(function (_ref12) {
	                var date = _ref12.date;
	                return date;
	            });
	
	            epsilon = (xScale(dates[1]) - xScale(dates[0])) / 2;
	        }
	
	        /**
	         * MouseMove handler, calculates the nearest dataPoint to the cursor
	         * and updates metadata related to it
	         * @private
	         */
	        function handleMouseMove() {
	            epsilon || setEpsilon();
	
	            var dataPoint = getNearestDataPoint(getMouseXPosition(this) - margin.left),
	                dataPointXPosition = void 0;
	
	            if (dataPoint) {
	                dataPointXPosition = xScale(new Date(dataPoint.key));
	                // Move verticalMarker to that datapoint
	                moveVerticalMarker(dataPointXPosition);
	                // Add data points highlighting
	                highlightDataPoints(dataPoint);
	                // Emit event with xPosition for tooltip or similar feature
	                dispatcher.call('customMouseMove', this, dataPoint, categoryColorMap, dataPointXPosition);
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
	
	            dispatcher.call('customMouseOut', this, data);
	        }
	
	        /**
	         * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
	         * @private
	         */
	        function handleMouseOver(data) {
	            overlay.style('display', 'block');
	            verticalMarker.classed('bc-is-active', true);
	
	            dispatcher.call('customMouseOver', this, data);
	        }
	
	        /**
	         * Creates coloured circles marking where the exact data y value is for a given data point
	         * @param  {obj} dataPoint Data point to extract info from
	         * @private
	         */
	        function highlightDataPoints(_ref13) {
	            var values = _ref13.values;
	
	            var accumulator = 0;
	
	            eraseDataPointHighlights();
	
	            // ensure order stays constant
	            values = values.filter(function (v) {
	                return !!v;
	            }).sort(function (a, b) {
	                return order.indexOf(a.name) > order.indexOf(b.name);
	            });
	
	            values.forEach(function (_ref14, index) {
	                var name = _ref14.name;
	
	                var marker = verticalMarkerContainer.append('g').classed('circle-container', true),
	                    circleSize = 12;
	
	                accumulator = accumulator + values[index][valueLabel];
	
	                marker.append('circle').classed('data-point-highlighter', true).attr('cx', circleSize).attr('cy', 0).attr('r', 5).style('stroke-width', 2).style('stroke', categoryColorMap[name]);
	
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
	         * Gets or Sets the opacity of the stacked areas in the chart (all of them will have the same opacity)
	         * @param  {Object} _x                  Opacity to get/set
	         * @return { opacity | module}          Current opacity or Area Chart module to chain calls
	         * @public
	         */
	        exports.areaOpacity = function (_x) {
	            if (!arguments.length) {
	                return areaOpacity;
	            }
	            areaOpacity = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the aspect ratio of the chart
	         * @param  {Number} _x Desired aspect ratio for the graph
	         * @return { (Number | Module) } Current aspect ratio or Area Chart module to chain calls
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
	         * Gets or Sets the colorSchema of the chart
	         * @param  {String[]} _x Desired colorSchema for the graph
	         * @return { colorSchema | module} Current colorSchema or Chart module to chain calls
	         * @public
	         */
	        exports.colorSchema = function (_x) {
	            if (!arguments.length) {
	                return colorSchema;
	            }
	            colorSchema = _x;
	
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
	         * Exposes the ability to force the chart to show a certain x axis grouping
	         * @param  {String} _x Desired format
	         * @return { (String|Module) }    Current format or module to chain calls
	         * @example
	         *     area.forceAxisFormat(area.axisTimeCombinations.HOUR_DAY)
	         */
	        exports.forceAxisFormat = function (_x) {
	            if (!arguments.length) {
	                return forceAxisSettings;
	            }
	            forceAxisSettings = _x;
	
	            return this;
	        };
	
	        /**
	         * Exposes the ability to force the chart to show a certain x format
	         * It requires a `forceAxisFormat` of 'custom' in order to work.
	         * @param  {String} _x              Desired format for x axis
	         * @return { (String|Module) }      Current format or module to chain calls
	         */
	        exports.forcedXFormat = function (_x) {
	            if (!arguments.length) {
	                return forcedXFormat;
	            }
	            forcedXFormat = _x;
	
	            return this;
	        };
	
	        /**
	         * Exposes the ability to force the chart to show a certain x ticks. It requires a `forceAxisFormat` of 'custom' in order to work.
	         * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
	         * how many and where the ticks will appear.
	         *
	         * @param  {Number} _x              Desired number of x axis ticks (multiple of 2, 5 or 10)
	         * @return { (Number|Module) }      Current number or ticks or module to chain calls
	         */
	        exports.forcedXTicks = function (_x) {
	            if (!arguments.length) {
	                return forcedXTicks;
	            }
	            forcedXTicks = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the grid mode.
	         *
	         * @param  {String} _x Desired mode for the grid ('vertical'|'horizontal'|'full')
	         * @return { String | module} Current mode of the grid or Area Chart module to chain calls
	         * @public
	         */
	        exports.grid = function (_x) {
	            if (!arguments.length) {
	                return grid;
	            }
	            grid = _x;
	
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
	            if (aspectRatio) {
	                width = Math.ceil(_x / aspectRatio);
	            }
	            height = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the isAnimated property of the chart, making it to animate when render.
	         * By default this is 'false'
	         *
	         * @param  {Boolean} _x Desired animation flag
	         * @return { isAnimated | module} Current isAnimated flag or Chart module
	         * @public
	         */
	        exports.isAnimated = function (_x) {
	            if (!arguments.length) {
	                return isAnimated;
	            }
	            isAnimated = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the keyLabel of the chart
	         * @param  {Number} _x Desired keyLabel for the graph
	         * @return { keyLabel | module} Current keyLabel or Chart module to chain calls
	         * @public
	         */
	        exports.keyLabel = function (_x) {
	            if (!arguments.length) {
	                return keyLabel;
	            }
	            keyLabel = _x;
	
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
	         * Gets or Sets the minimum width of the graph in order to show the tooltip
	         * NOTE: This could also depend on the aspect ratio
	         *
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
	         * Gets or Sets the number of verticalTicks of the yAxis on the chart
	         * @param  {Number} _x Desired verticalTicks
	         * @return { verticalTicks | module} Current verticalTicks or Chart module to chain calls
	         * @public
	         */
	        exports.verticalTicks = function (_x) {
	            if (!arguments.length) {
	                return verticalTicks;
	            }
	            verticalTicks = _x;
	
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
	        exports.exportChart = function (filename, title) {
	            exportChart.call(exports, svg, filename, title);
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
	         * Exposes the constants to be used to force the x axis to respect a certain granularity
	         * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
	         * @example
	         *     area.forceAxisFormat(area.axisTimeCombinations.HOUR_DAY)
	         */
	        exports.axisTimeCombinations = axisTimeCombinations;
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 58 */
/***/ (function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object),
	    nativeMax = Math.max;
	
	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
	
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];
	
	  var length = result.length,
	      skipIndexes = !!length;
	
	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}
	
	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	
	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;
	
	    assignValue(object, key, newValue === undefined ? source[key] : newValue);
	  }
	  return object;
	}
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;
	
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assign({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var assign = createAssigner(function(object, source) {
	  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	
	module.exports = assign;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var _ = __webpack_require__(26),
	        jsonThreeSources = __webpack_require__(60),
	        jsonSixSources = __webpack_require__(61),
	        jsonSalesChannel = __webpack_require__(62),
	        jsonReportService = __webpack_require__(63),
	        jsonLargeService = __webpack_require__(64);
	
	    function StackedAreaDataBuilder(config) {
	        this.Klass = StackedAreaDataBuilder;
	
	        this.config = _.defaults({}, config);
	
	        this.with3Sources = function () {
	            var attributes = _.extend({}, this.config, jsonThreeSources);
	
	            return new this.Klass(attributes);
	        };
	
	        this.with6Sources = function () {
	            var attributes = _.extend({}, this.config, jsonSixSources);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withReportData = function () {
	            var attributes = _.extend({}, this.config, jsonReportService);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withSalesChannelData = function () {
	            var attributes = _.extend({}, this.config, jsonSalesChannel);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withLargeData = function () {
	            var attributes = _.extend({}, this.config, jsonLargeService);
	            return new this.Klass(attributes);
	        };
	
	        this.build = function () {
	            return this.config;
	        };
	    }
	
	    return {
	        StackedAreaDataBuilder: StackedAreaDataBuilder
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 60 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"name": "Direct",
				"views": 0,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Direct",
				"views": 10,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Direct",
				"views": 16,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Direct",
				"views": 23,
				"dateUTC": "2011-01-08T00:00:00Z"
			},
			{
				"name": "Eventbrite",
				"views": 23,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Eventbrite",
				"views": 16,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Eventbrite",
				"views": 10,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Eventbrite",
				"views": 0,
				"dateUTC": "2011-01-08T00:00:00Z"
			},
			{
				"name": "Email",
				"views": 10,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Email",
				"views": 20,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Email",
				"views": 26,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Email",
				"views": 33,
				"dateUTC": "2011-01-08T00:00:00Z"
			}
		]
	};

/***/ }),
/* 61 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"name": "Direct",
				"views": 0,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Direct",
				"views": 1000,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Direct",
				"views": 1006.34,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Direct",
				"views": 2000,
				"dateUTC": "2011-01-08T00:00:00Z"
			},
			{
				"name": "Eventbrite",
				"views": 1003,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Eventbrite",
				"views": 1006,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Eventbrite",
				"views": 1000,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Eventbrite",
				"views": 500,
				"dateUTC": "2011-01-08T00:00:00Z"
			},
			{
				"name": "Email",
				"views": 1000,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Email",
				"views": 2000,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Email",
				"views": 2002,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Email",
				"views": 700,
				"dateUTC": "2011-01-08T00:00:00Z"
			},
			{
				"name": "Sun's Website",
				"views": 0,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Sun's Website",
				"views": 1000,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Sun's Website",
				"views": 1006,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Sun's Website",
				"views": 300,
				"dateUTC": "2011-01-08T00:00:00Z"
			},
			{
				"name": "Related Events",
				"views": 1008,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Related Events",
				"views": 1002,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Related Events",
				"views": 500,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Related Events",
				"views": 300,
				"dateUTC": "2011-01-08T00:00:00Z"
			},
			{
				"name": "Facebook",
				"views": 400,
				"dateUTC": "2011-01-05T00:00:00Z"
			},
			{
				"name": "Facebook",
				"views": 900,
				"dateUTC": "2011-01-06T00:00:00Z"
			},
			{
				"name": "Facebook",
				"views": 600,
				"dateUTC": "2011-01-07T00:00:00Z"
			},
			{
				"name": "Facebook",
				"views": 300,
				"dateUTC": "2011-01-08T00:00:00Z"
			}
		]
	};

/***/ }),
/* 62 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"date": "2017-02-16T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 5
			},
			{
				"date": "2017-02-16T00:00:00-08:00",
				"name": "EB Driven",
				"value": 0
			},
			{
				"date": "2017-02-17T00:00:00-08:00",
				"name": "EB Driven",
				"value": 1
			},
			{
				"date": "2017-02-17T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 13
			},
			{
				"date": "2017-02-18T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 15
			},
			{
				"date": "2017-02-18T00:00:00-08:00",
				"name": "EB Driven",
				"value": 1
			},
			{
				"date": "2017-02-19T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 15
			},
			{
				"date": "2017-02-19T00:00:00-08:00",
				"name": "EB Driven",
				"value": 1
			},
			{
				"date": "2017-02-20T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 15
			},
			{
				"date": "2017-02-20T00:00:00-08:00",
				"name": "EB Driven",
				"value": 1
			},
			{
				"date": "2017-02-21T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 18
			},
			{
				"date": "2017-02-21T00:00:00-08:00",
				"name": "EB Driven",
				"value": 1
			},
			{
				"date": "2017-02-22T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 19
			},
			{
				"date": "2017-02-22T00:00:00-08:00",
				"name": "EB Driven",
				"value": 1
			},
			{
				"date": "2017-02-23T00:00:00-08:00",
				"name": "EB Driven",
				"value": 2
			},
			{
				"date": "2017-02-23T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 22
			},
			{
				"date": "2017-02-24T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 25
			},
			{
				"date": "2017-02-24T00:00:00-08:00",
				"name": "EB Driven",
				"value": 2
			},
			{
				"date": "2017-02-25T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 28
			},
			{
				"date": "2017-02-25T00:00:00-08:00",
				"name": "EB Driven",
				"value": 2
			},
			{
				"date": "2017-02-26T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 30
			},
			{
				"date": "2017-02-26T00:00:00-08:00",
				"name": "EB Driven",
				"value": 2
			},
			{
				"date": "2017-02-27T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 30
			},
			{
				"date": "2017-02-27T00:00:00-08:00",
				"name": "EB Driven",
				"value": 2
			},
			{
				"date": "2017-02-28T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 31
			},
			{
				"date": "2017-02-28T00:00:00-08:00",
				"name": "EB Driven",
				"value": 2
			},
			{
				"date": "2017-03-01T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 33
			},
			{
				"date": "2017-03-01T00:00:00-08:00",
				"name": "EB Driven",
				"value": 2
			},
			{
				"date": "2017-03-02T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 33
			},
			{
				"date": "2017-03-02T00:00:00-08:00",
				"name": "EB Driven",
				"value": 2
			},
			{
				"date": "2017-03-03T00:00:00-08:00",
				"name": "EB Driven",
				"value": 4
			},
			{
				"date": "2017-03-03T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 34
			},
			{
				"date": "2017-03-04T00:00:00-08:00",
				"name": "EB Driven",
				"value": 4
			},
			{
				"date": "2017-03-04T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 34
			},
			{
				"date": "2017-03-05T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 37
			},
			{
				"date": "2017-03-05T00:00:00-08:00",
				"name": "EB Driven",
				"value": 4
			},
			{
				"date": "2017-03-06T00:00:00-08:00",
				"name": "EB Driven",
				"value": 5
			},
			{
				"date": "2017-03-06T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 41
			},
			{
				"date": "2017-03-07T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 69
			},
			{
				"date": "2017-03-07T00:00:00-08:00",
				"name": "EB Driven",
				"value": 5
			},
			{
				"date": "2017-03-08T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 77
			},
			{
				"date": "2017-03-08T00:00:00-08:00",
				"name": "EB Driven",
				"value": 5
			},
			{
				"date": "2017-03-09T00:00:00-08:00",
				"name": "EB Driven",
				"value": 8
			},
			{
				"date": "2017-03-09T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 79
			},
			{
				"date": "2017-03-10T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 85
			},
			{
				"date": "2017-03-10T00:00:00-08:00",
				"name": "EB Driven",
				"value": 8
			},
			{
				"date": "2017-03-11T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 85
			},
			{
				"date": "2017-03-11T00:00:00-08:00",
				"name": "EB Driven",
				"value": 8
			},
			{
				"date": "2017-03-12T00:00:00-08:00",
				"name": "Organizer Driven",
				"value": 85
			},
			{
				"date": "2017-03-12T00:00:00-08:00",
				"name": "EB Driven",
				"value": 8
			},
			{
				"date": "2017-03-13T00:00:00-07:00",
				"name": "Organizer Driven",
				"value": 85
			},
			{
				"date": "2017-03-13T00:00:00-07:00",
				"name": "EB Driven",
				"value": 8
			},
			{
				"date": "2017-03-14T00:00:00-07:00",
				"name": "Organizer Driven",
				"value": 85
			},
			{
				"date": "2017-03-14T00:00:00-07:00",
				"name": "EB Driven",
				"value": 8
			},
			{
				"date": "2017-03-15T00:00:00-07:00",
				"name": "Organizer Driven",
				"value": 85
			},
			{
				"date": "2017-03-15T00:00:00-07:00",
				"name": "EB Driven",
				"value": 8
			},
			{
				"date": "2017-03-16T00:00:00-07:00",
				"name": "Organizer Driven",
				"value": 85
			},
			{
				"date": "2017-03-16T00:00:00-07:00",
				"name": "EB Driven",
				"value": 8
			},
			{
				"date": "2017-03-17T00:00:00-07:00",
				"name": "Organizer Driven",
				"value": 85
			},
			{
				"date": "2017-03-17T00:00:00-07:00",
				"name": "EB Driven",
				"value": 8
			}
		]
	};

/***/ }),
/* 63 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"dateUTC": "2016-01-02T08:00:00Z",
				"dateEventTZ": "2016-01-02T00:00:00",
				"name": "google",
				"views": "22"
			},
			{
				"dateUTC": "2016-01-02T08:00:00Z",
				"dateEventTZ": "2016-01-02T00:00:00",
				"name": "facebook",
				"views": "21"
			},
			{
				"dateUTC": "2016-01-02T08:00:00Z",
				"dateEventTZ": "2016-01-02T00:00:00",
				"name": "twitter",
				"views": "24"
			},
			{
				"dateUTC": "2016-01-02T08:00:00Z",
				"dateEventTZ": "2016-01-02T00:00:00",
				"name": "user_newsletter",
				"views": "26"
			},
			{
				"dateUTC": "2016-01-02T08:00:00Z",
				"dateEventTZ": "2016-01-02T00:00:00",
				"name": "user_email",
				"views": "31"
			},
			{
				"dateUTC": "2016-01-02T08:00:00Z",
				"dateEventTZ": "2016-01-02T00:00:00",
				"name": "unknown",
				"views": "50"
			},
			{
				"dateUTC": "2016-01-03T08:00:00Z",
				"dateEventTZ": "2016-01-03T00:00:00",
				"name": "google",
				"views": "37"
			},
			{
				"dateUTC": "2016-01-03T08:00:00Z",
				"dateEventTZ": "2016-01-03T00:00:00",
				"name": "facebook",
				"views": "24"
			},
			{
				"dateUTC": "2016-01-03T08:00:00Z",
				"dateEventTZ": "2016-01-03T00:00:00",
				"name": "twitter",
				"views": "31"
			},
			{
				"dateUTC": "2016-01-03T08:00:00Z",
				"dateEventTZ": "2016-01-03T00:00:00",
				"name": "user_newsletter",
				"views": "24"
			},
			{
				"dateUTC": "2016-01-03T08:00:00Z",
				"dateEventTZ": "2016-01-03T00:00:00",
				"name": "user_email",
				"views": "41"
			},
			{
				"dateUTC": "2016-01-03T08:00:00Z",
				"dateEventTZ": "2016-01-03T00:00:00",
				"name": "unknown",
				"views": "0"
			}
		]
	};

/***/ }),
/* 64 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"dateUTC": "2016-07-14T08:00:00Z",
				"name": "google",
				"views": 69
			},
			{
				"dateUTC": "2016-07-14T08:00:00Z",
				"name": "facebook",
				"views": 0
			},
			{
				"dateUTC": "2016-07-14T08:00:00Z",
				"name": "twitter",
				"views": 23
			},
			{
				"dateUTC": "2016-07-14T08:00:00Z",
				"name": "user_newsvarter",
				"views": 46
			},
			{
				"dateUTC": "2016-07-14T08:00:00Z",
				"name": "user_email",
				"views": 92
			},
			{
				"dateUTC": "2016-07-14T08:00:00Z",
				"name": "unknown",
				"views": 56
			},
			{
				"dateUTC": "2016-07-15T08:00:00Z",
				"name": "google",
				"views": 74
			},
			{
				"dateUTC": "2016-07-15T08:00:00Z",
				"name": "facebook",
				"views": 74
			},
			{
				"dateUTC": "2016-07-15T08:00:00Z",
				"name": "twitter",
				"views": 26
			},
			{
				"dateUTC": "2016-07-15T08:00:00Z",
				"name": "user_newsvarter",
				"views": 8
			},
			{
				"dateUTC": "2016-07-15T08:00:00Z",
				"name": "user_email",
				"views": 91
			},
			{
				"dateUTC": "2016-07-15T08:00:00Z",
				"name": "unknown",
				"views": 2
			},
			{
				"dateUTC": "2016-07-16T08:00:00Z",
				"name": "google",
				"views": 63
			},
			{
				"dateUTC": "2016-07-16T08:00:00Z",
				"name": "facebook",
				"views": 66
			},
			{
				"dateUTC": "2016-07-16T08:00:00Z",
				"name": "twitter",
				"views": 10
			},
			{
				"dateUTC": "2016-07-16T08:00:00Z",
				"name": "user_newsvarter",
				"views": 76
			},
			{
				"dateUTC": "2016-07-16T08:00:00Z",
				"name": "user_email",
				"views": 88
			},
			{
				"dateUTC": "2016-07-16T08:00:00Z",
				"name": "unknown",
				"views": 9
			},
			{
				"dateUTC": "2016-07-17T08:00:00Z",
				"name": "google",
				"views": 70
			},
			{
				"dateUTC": "2016-07-17T08:00:00Z",
				"name": "facebook",
				"views": 48
			},
			{
				"dateUTC": "2016-07-17T08:00:00Z",
				"name": "twitter",
				"views": 1
			},
			{
				"dateUTC": "2016-07-17T08:00:00Z",
				"name": "user_newsvarter",
				"views": 20
			},
			{
				"dateUTC": "2016-07-17T08:00:00Z",
				"name": "user_email",
				"views": 77
			},
			{
				"dateUTC": "2016-07-17T08:00:00Z",
				"name": "unknown",
				"views": 34
			},
			{
				"dateUTC": "2016-07-18T08:00:00Z",
				"name": "google",
				"views": 61
			},
			{
				"dateUTC": "2016-07-18T08:00:00Z",
				"name": "facebook",
				"views": 7
			},
			{
				"dateUTC": "2016-07-18T08:00:00Z",
				"name": "twitter",
				"views": 34
			},
			{
				"dateUTC": "2016-07-18T08:00:00Z",
				"name": "user_newsvarter",
				"views": 82
			},
			{
				"dateUTC": "2016-07-18T08:00:00Z",
				"name": "user_email",
				"views": 61
			},
			{
				"dateUTC": "2016-07-18T08:00:00Z",
				"name": "unknown",
				"views": 58
			},
			{
				"dateUTC": "2016-07-19T08:00:00Z",
				"name": "google",
				"views": 0
			},
			{
				"dateUTC": "2016-07-19T08:00:00Z",
				"name": "facebook",
				"views": 1
			},
			{
				"dateUTC": "2016-07-19T08:00:00Z",
				"name": "twitter",
				"views": 52
			},
			{
				"dateUTC": "2016-07-19T08:00:00Z",
				"name": "user_newsvarter",
				"views": 95
			},
			{
				"dateUTC": "2016-07-19T08:00:00Z",
				"name": "user_email",
				"views": 76
			},
			{
				"dateUTC": "2016-07-19T08:00:00Z",
				"name": "unknown",
				"views": 33
			},
			{
				"dateUTC": "2016-07-20T08:00:00Z",
				"name": "google",
				"views": 3
			},
			{
				"dateUTC": "2016-07-20T08:00:00Z",
				"name": "facebook",
				"views": 63
			},
			{
				"dateUTC": "2016-07-20T08:00:00Z",
				"name": "twitter",
				"views": 67
			},
			{
				"dateUTC": "2016-07-20T08:00:00Z",
				"name": "user_newsvarter",
				"views": 12
			},
			{
				"dateUTC": "2016-07-20T08:00:00Z",
				"name": "user_email",
				"views": 10
			},
			{
				"dateUTC": "2016-07-20T08:00:00Z",
				"name": "unknown",
				"views": 97
			},
			{
				"dateUTC": "2016-07-21T08:00:00Z",
				"name": "google",
				"views": 77
			},
			{
				"dateUTC": "2016-07-21T08:00:00Z",
				"name": "facebook",
				"views": 13
			},
			{
				"dateUTC": "2016-07-21T08:00:00Z",
				"name": "twitter",
				"views": 9
			},
			{
				"dateUTC": "2016-07-21T08:00:00Z",
				"name": "user_newsvarter",
				"views": 37
			},
			{
				"dateUTC": "2016-07-21T08:00:00Z",
				"name": "user_email",
				"views": 35
			},
			{
				"dateUTC": "2016-07-21T08:00:00Z",
				"name": "unknown",
				"views": 18
			},
			{
				"dateUTC": "2016-07-22T08:00:00Z",
				"name": "google",
				"views": 72
			},
			{
				"dateUTC": "2016-07-22T08:00:00Z",
				"name": "facebook",
				"views": 88
			},
			{
				"dateUTC": "2016-07-22T08:00:00Z",
				"name": "twitter",
				"views": 64
			},
			{
				"dateUTC": "2016-07-22T08:00:00Z",
				"name": "user_newsvarter",
				"views": 77
			},
			{
				"dateUTC": "2016-07-22T08:00:00Z",
				"name": "user_email",
				"views": 86
			},
			{
				"dateUTC": "2016-07-22T08:00:00Z",
				"name": "unknown",
				"views": 30
			},
			{
				"dateUTC": "2016-07-23T08:00:00Z",
				"name": "google",
				"views": 11
			},
			{
				"dateUTC": "2016-07-23T08:00:00Z",
				"name": "facebook",
				"views": 90
			},
			{
				"dateUTC": "2016-07-23T08:00:00Z",
				"name": "twitter",
				"views": 30
			},
			{
				"dateUTC": "2016-07-23T08:00:00Z",
				"name": "user_newsvarter",
				"views": 22
			},
			{
				"dateUTC": "2016-07-23T08:00:00Z",
				"name": "user_email",
				"views": 32
			},
			{
				"dateUTC": "2016-07-23T08:00:00Z",
				"name": "unknown",
				"views": 19
			},
			{
				"dateUTC": "2016-07-24T08:00:00Z",
				"name": "google",
				"views": 46
			},
			{
				"dateUTC": "2016-07-24T08:00:00Z",
				"name": "facebook",
				"views": 58
			},
			{
				"dateUTC": "2016-07-24T08:00:00Z",
				"name": "twitter",
				"views": 0
			},
			{
				"dateUTC": "2016-07-24T08:00:00Z",
				"name": "user_newsvarter",
				"views": 9
			},
			{
				"dateUTC": "2016-07-24T08:00:00Z",
				"name": "user_email",
				"views": 31
			},
			{
				"dateUTC": "2016-07-24T08:00:00Z",
				"name": "unknown",
				"views": 48
			},
			{
				"dateUTC": "2016-07-25T08:00:00Z",
				"name": "google",
				"views": 19
			},
			{
				"dateUTC": "2016-07-25T08:00:00Z",
				"name": "facebook",
				"views": 93
			},
			{
				"dateUTC": "2016-07-25T08:00:00Z",
				"name": "twitter",
				"views": 15
			},
			{
				"dateUTC": "2016-07-25T08:00:00Z",
				"name": "user_newsvarter",
				"views": 90
			},
			{
				"dateUTC": "2016-07-25T08:00:00Z",
				"name": "user_email",
				"views": 30
			},
			{
				"dateUTC": "2016-07-25T08:00:00Z",
				"name": "unknown",
				"views": 0
			},
			{
				"dateUTC": "2016-07-26T08:00:00Z",
				"name": "google",
				"views": 37
			},
			{
				"dateUTC": "2016-07-26T08:00:00Z",
				"name": "facebook",
				"views": 44
			},
			{
				"dateUTC": "2016-07-26T08:00:00Z",
				"name": "twitter",
				"views": 78
			},
			{
				"dateUTC": "2016-07-26T08:00:00Z",
				"name": "user_newsvarter",
				"views": 72
			},
			{
				"dateUTC": "2016-07-26T08:00:00Z",
				"name": "user_email",
				"views": 26
			},
			{
				"dateUTC": "2016-07-26T08:00:00Z",
				"name": "unknown",
				"views": 70
			},
			{
				"dateUTC": "2016-07-27T08:00:00Z",
				"name": "google",
				"views": 85
			},
			{
				"dateUTC": "2016-07-27T08:00:00Z",
				"name": "facebook",
				"views": 15
			},
			{
				"dateUTC": "2016-07-27T08:00:00Z",
				"name": "twitter",
				"views": 8
			},
			{
				"dateUTC": "2016-07-27T08:00:00Z",
				"name": "user_newsvarter",
				"views": 22
			},
			{
				"dateUTC": "2016-07-27T08:00:00Z",
				"name": "user_email",
				"views": 65
			},
			{
				"dateUTC": "2016-07-27T08:00:00Z",
				"name": "unknown",
				"views": 83
			},
			{
				"dateUTC": "2016-07-28T08:00:00Z",
				"name": "google",
				"views": 89
			},
			{
				"dateUTC": "2016-07-28T08:00:00Z",
				"name": "facebook",
				"views": 39
			},
			{
				"dateUTC": "2016-07-28T08:00:00Z",
				"name": "twitter",
				"views": 47
			},
			{
				"dateUTC": "2016-07-28T08:00:00Z",
				"name": "user_newsvarter",
				"views": 90
			},
			{
				"dateUTC": "2016-07-28T08:00:00Z",
				"name": "user_email",
				"views": 16
			},
			{
				"dateUTC": "2016-07-28T08:00:00Z",
				"name": "unknown",
				"views": 96
			},
			{
				"dateUTC": "2016-07-29T08:00:00Z",
				"name": "google",
				"views": 1
			},
			{
				"dateUTC": "2016-07-29T08:00:00Z",
				"name": "facebook",
				"views": 38
			},
			{
				"dateUTC": "2016-07-29T08:00:00Z",
				"name": "twitter",
				"views": 89
			},
			{
				"dateUTC": "2016-07-29T08:00:00Z",
				"name": "user_newsvarter",
				"views": 26
			},
			{
				"dateUTC": "2016-07-29T08:00:00Z",
				"name": "user_email",
				"views": 84
			},
			{
				"dateUTC": "2016-07-29T08:00:00Z",
				"name": "unknown",
				"views": 48
			},
			{
				"dateUTC": "2016-07-30T08:00:00Z",
				"name": "google",
				"views": 63
			},
			{
				"dateUTC": "2016-07-30T08:00:00Z",
				"name": "facebook",
				"views": 8
			},
			{
				"dateUTC": "2016-07-30T08:00:00Z",
				"name": "twitter",
				"views": 56
			},
			{
				"dateUTC": "2016-07-30T08:00:00Z",
				"name": "user_newsvarter",
				"views": 62
			},
			{
				"dateUTC": "2016-07-30T08:00:00Z",
				"name": "user_email",
				"views": 0
			},
			{
				"dateUTC": "2016-07-30T08:00:00Z",
				"name": "unknown",
				"views": 23
			},
			{
				"dateUTC": "2016-07-31T08:00:00Z",
				"name": "google",
				"views": 9
			},
			{
				"dateUTC": "2016-07-31T08:00:00Z",
				"name": "facebook",
				"views": 39
			},
			{
				"dateUTC": "2016-07-31T08:00:00Z",
				"name": "twitter",
				"views": 66
			},
			{
				"dateUTC": "2016-07-31T08:00:00Z",
				"name": "user_newsvarter",
				"views": 31
			},
			{
				"dateUTC": "2016-07-31T08:00:00Z",
				"name": "user_email",
				"views": 14
			},
			{
				"dateUTC": "2016-07-31T08:00:00Z",
				"name": "unknown",
				"views": 37
			},
			{
				"dateUTC": "2016-08-01T08:00:00Z",
				"name": "google",
				"views": 3
			},
			{
				"dateUTC": "2016-08-01T08:00:00Z",
				"name": "facebook",
				"views": 90
			},
			{
				"dateUTC": "2016-08-01T08:00:00Z",
				"name": "twitter",
				"views": 80
			},
			{
				"dateUTC": "2016-08-01T08:00:00Z",
				"name": "user_newsvarter",
				"views": 42
			},
			{
				"dateUTC": "2016-08-01T08:00:00Z",
				"name": "user_email",
				"views": 76
			},
			{
				"dateUTC": "2016-08-01T08:00:00Z",
				"name": "unknown",
				"views": 39
			},
			{
				"dateUTC": "2016-08-02T08:00:00Z",
				"name": "google",
				"views": 24
			},
			{
				"dateUTC": "2016-08-02T08:00:00Z",
				"name": "facebook",
				"views": 20
			},
			{
				"dateUTC": "2016-08-02T08:00:00Z",
				"name": "twitter",
				"views": 71
			},
			{
				"dateUTC": "2016-08-02T08:00:00Z",
				"name": "user_newsvarter",
				"views": 65
			},
			{
				"dateUTC": "2016-08-02T08:00:00Z",
				"name": "user_email",
				"views": 58
			},
			{
				"dateUTC": "2016-08-02T08:00:00Z",
				"name": "unknown",
				"views": 19
			},
			{
				"dateUTC": "2016-08-03T08:00:00Z",
				"name": "google",
				"views": 79
			},
			{
				"dateUTC": "2016-08-03T08:00:00Z",
				"name": "facebook",
				"views": 81
			},
			{
				"dateUTC": "2016-08-03T08:00:00Z",
				"name": "twitter",
				"views": 2
			},
			{
				"dateUTC": "2016-08-03T08:00:00Z",
				"name": "user_newsvarter",
				"views": 85
			},
			{
				"dateUTC": "2016-08-03T08:00:00Z",
				"name": "user_email",
				"views": 56
			},
			{
				"dateUTC": "2016-08-03T08:00:00Z",
				"name": "unknown",
				"views": 65
			},
			{
				"dateUTC": "2016-08-04T08:00:00Z",
				"name": "google",
				"views": 85
			},
			{
				"dateUTC": "2016-08-04T08:00:00Z",
				"name": "facebook",
				"views": 65
			},
			{
				"dateUTC": "2016-08-04T08:00:00Z",
				"name": "twitter",
				"views": 24
			},
			{
				"dateUTC": "2016-08-04T08:00:00Z",
				"name": "user_newsvarter",
				"views": 80
			},
			{
				"dateUTC": "2016-08-04T08:00:00Z",
				"name": "user_email",
				"views": 47
			},
			{
				"dateUTC": "2016-08-04T08:00:00Z",
				"name": "unknown",
				"views": 49
			},
			{
				"dateUTC": "2016-08-05T08:00:00Z",
				"name": "google",
				"views": 38
			},
			{
				"dateUTC": "2016-08-05T08:00:00Z",
				"name": "facebook",
				"views": 5
			},
			{
				"dateUTC": "2016-08-05T08:00:00Z",
				"name": "twitter",
				"views": 94
			},
			{
				"dateUTC": "2016-08-05T08:00:00Z",
				"name": "user_newsvarter",
				"views": 65
			},
			{
				"dateUTC": "2016-08-05T08:00:00Z",
				"name": "user_email",
				"views": 76
			},
			{
				"dateUTC": "2016-08-05T08:00:00Z",
				"name": "unknown",
				"views": 73
			},
			{
				"dateUTC": "2016-08-06T08:00:00Z",
				"name": "google",
				"views": 88
			},
			{
				"dateUTC": "2016-08-06T08:00:00Z",
				"name": "facebook",
				"views": 66
			},
			{
				"dateUTC": "2016-08-06T08:00:00Z",
				"name": "twitter",
				"views": 18
			},
			{
				"dateUTC": "2016-08-06T08:00:00Z",
				"name": "user_newsvarter",
				"views": 74
			},
			{
				"dateUTC": "2016-08-06T08:00:00Z",
				"name": "user_email",
				"views": 58
			},
			{
				"dateUTC": "2016-08-06T08:00:00Z",
				"name": "unknown",
				"views": 18
			},
			{
				"dateUTC": "2016-08-07T08:00:00Z",
				"name": "google",
				"views": 72
			},
			{
				"dateUTC": "2016-08-07T08:00:00Z",
				"name": "facebook",
				"views": 95
			},
			{
				"dateUTC": "2016-08-07T08:00:00Z",
				"name": "twitter",
				"views": 62
			},
			{
				"dateUTC": "2016-08-07T08:00:00Z",
				"name": "user_newsvarter",
				"views": 24
			},
			{
				"dateUTC": "2016-08-07T08:00:00Z",
				"name": "user_email",
				"views": 25
			},
			{
				"dateUTC": "2016-08-07T08:00:00Z",
				"name": "unknown",
				"views": 74
			},
			{
				"dateUTC": "2016-08-08T08:00:00Z",
				"name": "google",
				"views": 78
			},
			{
				"dateUTC": "2016-08-08T08:00:00Z",
				"name": "facebook",
				"views": 5
			},
			{
				"dateUTC": "2016-08-08T08:00:00Z",
				"name": "twitter",
				"views": 12
			},
			{
				"dateUTC": "2016-08-08T08:00:00Z",
				"name": "user_newsvarter",
				"views": 95
			},
			{
				"dateUTC": "2016-08-08T08:00:00Z",
				"name": "user_email",
				"views": 19
			},
			{
				"dateUTC": "2016-08-08T08:00:00Z",
				"name": "unknown",
				"views": 35
			},
			{
				"dateUTC": "2016-08-09T08:00:00Z",
				"name": "google",
				"views": 92
			},
			{
				"dateUTC": "2016-08-09T08:00:00Z",
				"name": "facebook",
				"views": 81
			},
			{
				"dateUTC": "2016-08-09T08:00:00Z",
				"name": "twitter",
				"views": 93
			},
			{
				"dateUTC": "2016-08-09T08:00:00Z",
				"name": "user_newsvarter",
				"views": 98
			},
			{
				"dateUTC": "2016-08-09T08:00:00Z",
				"name": "user_email",
				"views": 25
			},
			{
				"dateUTC": "2016-08-09T08:00:00Z",
				"name": "unknown",
				"views": 23
			},
			{
				"dateUTC": "2016-08-10T08:00:00Z",
				"name": "google",
				"views": 94
			},
			{
				"dateUTC": "2016-08-10T08:00:00Z",
				"name": "facebook",
				"views": 12
			},
			{
				"dateUTC": "2016-08-10T08:00:00Z",
				"name": "twitter",
				"views": 53
			},
			{
				"dateUTC": "2016-08-10T08:00:00Z",
				"name": "user_newsvarter",
				"views": 39
			},
			{
				"dateUTC": "2016-08-10T08:00:00Z",
				"name": "user_email",
				"views": 61
			},
			{
				"dateUTC": "2016-08-10T08:00:00Z",
				"name": "unknown",
				"views": 63
			},
			{
				"dateUTC": "2016-08-11T08:00:00Z",
				"name": "google",
				"views": 5
			},
			{
				"dateUTC": "2016-08-11T08:00:00Z",
				"name": "facebook",
				"views": 25
			},
			{
				"dateUTC": "2016-08-11T08:00:00Z",
				"name": "twitter",
				"views": 92
			},
			{
				"dateUTC": "2016-08-11T08:00:00Z",
				"name": "user_newsvarter",
				"views": 96
			},
			{
				"dateUTC": "2016-08-11T08:00:00Z",
				"name": "user_email",
				"views": 37
			},
			{
				"dateUTC": "2016-08-11T08:00:00Z",
				"name": "unknown",
				"views": 24
			},
			{
				"dateUTC": "2016-08-12T08:00:00Z",
				"name": "google",
				"views": 20
			},
			{
				"dateUTC": "2016-08-12T08:00:00Z",
				"name": "facebook",
				"views": 89
			},
			{
				"dateUTC": "2016-08-12T08:00:00Z",
				"name": "twitter",
				"views": 57
			},
			{
				"dateUTC": "2016-08-12T08:00:00Z",
				"name": "user_newsvarter",
				"views": 68
			},
			{
				"dateUTC": "2016-08-12T08:00:00Z",
				"name": "user_email",
				"views": 29
			},
			{
				"dateUTC": "2016-08-12T08:00:00Z",
				"name": "unknown",
				"views": 54
			},
			{
				"dateUTC": "2016-08-13T08:00:00Z",
				"name": "google",
				"views": 33
			},
			{
				"dateUTC": "2016-08-13T08:00:00Z",
				"name": "facebook",
				"views": 75
			},
			{
				"dateUTC": "2016-08-13T08:00:00Z",
				"name": "twitter",
				"views": 74
			},
			{
				"dateUTC": "2016-08-13T08:00:00Z",
				"name": "user_newsvarter",
				"views": 42
			},
			{
				"dateUTC": "2016-08-13T08:00:00Z",
				"name": "user_email",
				"views": 96
			},
			{
				"dateUTC": "2016-08-13T08:00:00Z",
				"name": "unknown",
				"views": 60
			},
			{
				"dateUTC": "2016-08-14T08:00:00Z",
				"name": "google",
				"views": 87
			},
			{
				"dateUTC": "2016-08-14T08:00:00Z",
				"name": "facebook",
				"views": 40
			},
			{
				"dateUTC": "2016-08-14T08:00:00Z",
				"name": "twitter",
				"views": 89
			},
			{
				"dateUTC": "2016-08-14T08:00:00Z",
				"name": "user_newsvarter",
				"views": 75
			},
			{
				"dateUTC": "2016-08-14T08:00:00Z",
				"name": "user_email",
				"views": 84
			},
			{
				"dateUTC": "2016-08-14T08:00:00Z",
				"name": "unknown",
				"views": 77
			},
			{
				"dateUTC": "2016-08-15T08:00:00Z",
				"name": "google",
				"views": 6
			},
			{
				"dateUTC": "2016-08-15T08:00:00Z",
				"name": "facebook",
				"views": 14
			},
			{
				"dateUTC": "2016-08-15T08:00:00Z",
				"name": "twitter",
				"views": 55
			},
			{
				"dateUTC": "2016-08-15T08:00:00Z",
				"name": "user_newsvarter",
				"views": 67
			},
			{
				"dateUTC": "2016-08-15T08:00:00Z",
				"name": "user_email",
				"views": 63
			},
			{
				"dateUTC": "2016-08-15T08:00:00Z",
				"name": "unknown",
				"views": 60
			},
			{
				"dateUTC": "2016-08-16T08:00:00Z",
				"name": "google",
				"views": 68
			},
			{
				"dateUTC": "2016-08-16T08:00:00Z",
				"name": "facebook",
				"views": 88
			},
			{
				"dateUTC": "2016-08-16T08:00:00Z",
				"name": "twitter",
				"views": 64
			},
			{
				"dateUTC": "2016-08-16T08:00:00Z",
				"name": "user_newsvarter",
				"views": 50
			},
			{
				"dateUTC": "2016-08-16T08:00:00Z",
				"name": "user_email",
				"views": 18
			},
			{
				"dateUTC": "2016-08-16T08:00:00Z",
				"name": "unknown",
				"views": 59
			},
			{
				"dateUTC": "2016-08-17T08:00:00Z",
				"name": "google",
				"views": 23
			},
			{
				"dateUTC": "2016-08-17T08:00:00Z",
				"name": "facebook",
				"views": 47
			},
			{
				"dateUTC": "2016-08-17T08:00:00Z",
				"name": "twitter",
				"views": 80
			},
			{
				"dateUTC": "2016-08-17T08:00:00Z",
				"name": "user_newsvarter",
				"views": 6
			},
			{
				"dateUTC": "2016-08-17T08:00:00Z",
				"name": "user_email",
				"views": 50
			},
			{
				"dateUTC": "2016-08-17T08:00:00Z",
				"name": "unknown",
				"views": 19
			},
			{
				"dateUTC": "2016-08-18T08:00:00Z",
				"name": "google",
				"views": 1
			},
			{
				"dateUTC": "2016-08-18T08:00:00Z",
				"name": "facebook",
				"views": 43
			},
			{
				"dateUTC": "2016-08-18T08:00:00Z",
				"name": "twitter",
				"views": 9
			},
			{
				"dateUTC": "2016-08-18T08:00:00Z",
				"name": "user_newsvarter",
				"views": 60
			},
			{
				"dateUTC": "2016-08-18T08:00:00Z",
				"name": "user_email",
				"views": 71
			},
			{
				"dateUTC": "2016-08-18T08:00:00Z",
				"name": "unknown",
				"views": 7
			},
			{
				"dateUTC": "2016-08-19T08:00:00Z",
				"name": "google",
				"views": 57
			},
			{
				"dateUTC": "2016-08-19T08:00:00Z",
				"name": "facebook",
				"views": 13
			},
			{
				"dateUTC": "2016-08-19T08:00:00Z",
				"name": "twitter",
				"views": 42
			},
			{
				"dateUTC": "2016-08-19T08:00:00Z",
				"name": "user_newsvarter",
				"views": 50
			},
			{
				"dateUTC": "2016-08-19T08:00:00Z",
				"name": "user_email",
				"views": 73
			},
			{
				"dateUTC": "2016-08-19T08:00:00Z",
				"name": "unknown",
				"views": 68
			},
			{
				"dateUTC": "2016-08-20T08:00:00Z",
				"name": "google",
				"views": 44
			},
			{
				"dateUTC": "2016-08-20T08:00:00Z",
				"name": "facebook",
				"views": 23
			},
			{
				"dateUTC": "2016-08-20T08:00:00Z",
				"name": "twitter",
				"views": 0
			},
			{
				"dateUTC": "2016-08-20T08:00:00Z",
				"name": "user_newsvarter",
				"views": 4
			},
			{
				"dateUTC": "2016-08-20T08:00:00Z",
				"name": "user_email",
				"views": 81
			},
			{
				"dateUTC": "2016-08-20T08:00:00Z",
				"name": "unknown",
				"views": 78
			},
			{
				"dateUTC": "2016-08-21T08:00:00Z",
				"name": "google",
				"views": 7
			},
			{
				"dateUTC": "2016-08-21T08:00:00Z",
				"name": "facebook",
				"views": 2
			},
			{
				"dateUTC": "2016-08-21T08:00:00Z",
				"name": "twitter",
				"views": 18
			},
			{
				"dateUTC": "2016-08-21T08:00:00Z",
				"name": "user_newsvarter",
				"views": 32
			},
			{
				"dateUTC": "2016-08-21T08:00:00Z",
				"name": "user_email",
				"views": 8
			},
			{
				"dateUTC": "2016-08-21T08:00:00Z",
				"name": "unknown",
				"views": 69
			},
			{
				"dateUTC": "2016-08-22T08:00:00Z",
				"name": "google",
				"views": 44
			},
			{
				"dateUTC": "2016-08-22T08:00:00Z",
				"name": "facebook",
				"views": 93
			},
			{
				"dateUTC": "2016-08-22T08:00:00Z",
				"name": "twitter",
				"views": 30
			},
			{
				"dateUTC": "2016-08-22T08:00:00Z",
				"name": "user_newsvarter",
				"views": 80
			},
			{
				"dateUTC": "2016-08-22T08:00:00Z",
				"name": "user_email",
				"views": 64
			},
			{
				"dateUTC": "2016-08-22T08:00:00Z",
				"name": "unknown",
				"views": 65
			},
			{
				"dateUTC": "2016-08-23T08:00:00Z",
				"name": "google",
				"views": 85
			},
			{
				"dateUTC": "2016-08-23T08:00:00Z",
				"name": "facebook",
				"views": 23
			},
			{
				"dateUTC": "2016-08-23T08:00:00Z",
				"name": "twitter",
				"views": 30
			},
			{
				"dateUTC": "2016-08-23T08:00:00Z",
				"name": "user_newsvarter",
				"views": 9
			},
			{
				"dateUTC": "2016-08-23T08:00:00Z",
				"name": "user_email",
				"views": 84
			},
			{
				"dateUTC": "2016-08-23T08:00:00Z",
				"name": "unknown",
				"views": 95
			},
			{
				"dateUTC": "2016-08-24T08:00:00Z",
				"name": "google",
				"views": 23
			},
			{
				"dateUTC": "2016-08-24T08:00:00Z",
				"name": "facebook",
				"views": 50
			},
			{
				"dateUTC": "2016-08-24T08:00:00Z",
				"name": "twitter",
				"views": 49
			},
			{
				"dateUTC": "2016-08-24T08:00:00Z",
				"name": "user_newsvarter",
				"views": 29
			},
			{
				"dateUTC": "2016-08-24T08:00:00Z",
				"name": "user_email",
				"views": 38
			},
			{
				"dateUTC": "2016-08-24T08:00:00Z",
				"name": "unknown",
				"views": 27
			},
			{
				"dateUTC": "2016-08-25T08:00:00Z",
				"name": "google",
				"views": 49
			},
			{
				"dateUTC": "2016-08-25T08:00:00Z",
				"name": "facebook",
				"views": 41
			},
			{
				"dateUTC": "2016-08-25T08:00:00Z",
				"name": "twitter",
				"views": 12
			},
			{
				"dateUTC": "2016-08-25T08:00:00Z",
				"name": "user_newsvarter",
				"views": 72
			},
			{
				"dateUTC": "2016-08-25T08:00:00Z",
				"name": "user_email",
				"views": 31
			},
			{
				"dateUTC": "2016-08-25T08:00:00Z",
				"name": "unknown",
				"views": 70
			},
			{
				"dateUTC": "2016-08-26T08:00:00Z",
				"name": "google",
				"views": 41
			},
			{
				"dateUTC": "2016-08-26T08:00:00Z",
				"name": "facebook",
				"views": 28
			},
			{
				"dateUTC": "2016-08-26T08:00:00Z",
				"name": "twitter",
				"views": 67
			},
			{
				"dateUTC": "2016-08-26T08:00:00Z",
				"name": "user_newsvarter",
				"views": 99
			},
			{
				"dateUTC": "2016-08-26T08:00:00Z",
				"name": "user_email",
				"views": 71
			},
			{
				"dateUTC": "2016-08-26T08:00:00Z",
				"name": "unknown",
				"views": 61
			},
			{
				"dateUTC": "2016-08-27T08:00:00Z",
				"name": "google",
				"views": 71
			},
			{
				"dateUTC": "2016-08-27T08:00:00Z",
				"name": "facebook",
				"views": 33
			},
			{
				"dateUTC": "2016-08-27T08:00:00Z",
				"name": "twitter",
				"views": 65
			},
			{
				"dateUTC": "2016-08-27T08:00:00Z",
				"name": "user_newsvarter",
				"views": 43
			},
			{
				"dateUTC": "2016-08-27T08:00:00Z",
				"name": "user_email",
				"views": 1
			},
			{
				"dateUTC": "2016-08-27T08:00:00Z",
				"name": "unknown",
				"views": 46
			},
			{
				"dateUTC": "2016-08-28T08:00:00Z",
				"name": "google",
				"views": 43
			},
			{
				"dateUTC": "2016-08-28T08:00:00Z",
				"name": "facebook",
				"views": 42
			},
			{
				"dateUTC": "2016-08-28T08:00:00Z",
				"name": "twitter",
				"views": 63
			},
			{
				"dateUTC": "2016-08-28T08:00:00Z",
				"name": "user_newsvarter",
				"views": 65
			},
			{
				"dateUTC": "2016-08-28T08:00:00Z",
				"name": "user_email",
				"views": 44
			},
			{
				"dateUTC": "2016-08-28T08:00:00Z",
				"name": "unknown",
				"views": 51
			},
			{
				"dateUTC": "2016-08-29T08:00:00Z",
				"name": "google",
				"views": 26
			},
			{
				"dateUTC": "2016-08-29T08:00:00Z",
				"name": "facebook",
				"views": 10
			},
			{
				"dateUTC": "2016-08-29T08:00:00Z",
				"name": "twitter",
				"views": 30
			},
			{
				"dateUTC": "2016-08-29T08:00:00Z",
				"name": "user_newsvarter",
				"views": 37
			},
			{
				"dateUTC": "2016-08-29T08:00:00Z",
				"name": "user_email",
				"views": 72
			},
			{
				"dateUTC": "2016-08-29T08:00:00Z",
				"name": "unknown",
				"views": 25
			},
			{
				"dateUTC": "2016-08-30T08:00:00Z",
				"name": "google",
				"views": 18
			},
			{
				"dateUTC": "2016-08-30T08:00:00Z",
				"name": "facebook",
				"views": 68
			},
			{
				"dateUTC": "2016-08-30T08:00:00Z",
				"name": "twitter",
				"views": 79
			},
			{
				"dateUTC": "2016-08-30T08:00:00Z",
				"name": "user_newsvarter",
				"views": 95
			},
			{
				"dateUTC": "2016-08-30T08:00:00Z",
				"name": "user_email",
				"views": 93
			},
			{
				"dateUTC": "2016-08-30T08:00:00Z",
				"name": "unknown",
				"views": 74
			},
			{
				"dateUTC": "2016-08-31T08:00:00Z",
				"name": "google",
				"views": 47
			},
			{
				"dateUTC": "2016-08-31T08:00:00Z",
				"name": "facebook",
				"views": 67
			},
			{
				"dateUTC": "2016-08-31T08:00:00Z",
				"name": "twitter",
				"views": 44
			},
			{
				"dateUTC": "2016-08-31T08:00:00Z",
				"name": "user_newsvarter",
				"views": 14
			},
			{
				"dateUTC": "2016-08-31T08:00:00Z",
				"name": "user_email",
				"views": 28
			},
			{
				"dateUTC": "2016-08-31T08:00:00Z",
				"name": "unknown",
				"views": 86
			},
			{
				"dateUTC": "2016-09-01T08:00:00Z",
				"name": "google",
				"views": 3
			},
			{
				"dateUTC": "2016-09-01T08:00:00Z",
				"name": "facebook",
				"views": 22
			},
			{
				"dateUTC": "2016-09-01T08:00:00Z",
				"name": "twitter",
				"views": 78
			},
			{
				"dateUTC": "2016-09-01T08:00:00Z",
				"name": "user_newsvarter",
				"views": 91
			},
			{
				"dateUTC": "2016-09-01T08:00:00Z",
				"name": "user_email",
				"views": 15
			},
			{
				"dateUTC": "2016-09-01T08:00:00Z",
				"name": "unknown",
				"views": 33
			},
			{
				"dateUTC": "2016-09-02T08:00:00Z",
				"name": "google",
				"views": 91
			},
			{
				"dateUTC": "2016-09-02T08:00:00Z",
				"name": "facebook",
				"views": 20
			},
			{
				"dateUTC": "2016-09-02T08:00:00Z",
				"name": "twitter",
				"views": 28
			},
			{
				"dateUTC": "2016-09-02T08:00:00Z",
				"name": "user_newsvarter",
				"views": 51
			},
			{
				"dateUTC": "2016-09-02T08:00:00Z",
				"name": "user_email",
				"views": 72
			},
			{
				"dateUTC": "2016-09-02T08:00:00Z",
				"name": "unknown",
				"views": 48
			},
			{
				"dateUTC": "2016-09-03T08:00:00Z",
				"name": "google",
				"views": 53
			},
			{
				"dateUTC": "2016-09-03T08:00:00Z",
				"name": "facebook",
				"views": 67
			},
			{
				"dateUTC": "2016-09-03T08:00:00Z",
				"name": "twitter",
				"views": 52
			},
			{
				"dateUTC": "2016-09-03T08:00:00Z",
				"name": "user_newsvarter",
				"views": 92
			},
			{
				"dateUTC": "2016-09-03T08:00:00Z",
				"name": "user_email",
				"views": 8
			},
			{
				"dateUTC": "2016-09-03T08:00:00Z",
				"name": "unknown",
				"views": 77
			},
			{
				"dateUTC": "2016-09-04T08:00:00Z",
				"name": "google",
				"views": 65
			},
			{
				"dateUTC": "2016-09-04T08:00:00Z",
				"name": "facebook",
				"views": 62
			},
			{
				"dateUTC": "2016-09-04T08:00:00Z",
				"name": "twitter",
				"views": 48
			},
			{
				"dateUTC": "2016-09-04T08:00:00Z",
				"name": "user_newsvarter",
				"views": 60
			},
			{
				"dateUTC": "2016-09-04T08:00:00Z",
				"name": "user_email",
				"views": 79
			},
			{
				"dateUTC": "2016-09-04T08:00:00Z",
				"name": "unknown",
				"views": 60
			},
			{
				"dateUTC": "2016-09-05T08:00:00Z",
				"name": "google",
				"views": 80
			},
			{
				"dateUTC": "2016-09-05T08:00:00Z",
				"name": "facebook",
				"views": 78
			},
			{
				"dateUTC": "2016-09-05T08:00:00Z",
				"name": "twitter",
				"views": 65
			},
			{
				"dateUTC": "2016-09-05T08:00:00Z",
				"name": "user_newsvarter",
				"views": 59
			},
			{
				"dateUTC": "2016-09-05T08:00:00Z",
				"name": "user_email",
				"views": 95
			},
			{
				"dateUTC": "2016-09-05T08:00:00Z",
				"name": "unknown",
				"views": 58
			},
			{
				"dateUTC": "2016-09-06T08:00:00Z",
				"name": "google",
				"views": 89
			},
			{
				"dateUTC": "2016-09-06T08:00:00Z",
				"name": "facebook",
				"views": 53
			},
			{
				"dateUTC": "2016-09-06T08:00:00Z",
				"name": "twitter",
				"views": 70
			},
			{
				"dateUTC": "2016-09-06T08:00:00Z",
				"name": "user_newsvarter",
				"views": 82
			},
			{
				"dateUTC": "2016-09-06T08:00:00Z",
				"name": "user_email",
				"views": 6
			},
			{
				"dateUTC": "2016-09-06T08:00:00Z",
				"name": "unknown",
				"views": 40
			},
			{
				"dateUTC": "2016-09-07T08:00:00Z",
				"name": "google",
				"views": 85
			},
			{
				"dateUTC": "2016-09-07T08:00:00Z",
				"name": "facebook",
				"views": 62
			},
			{
				"dateUTC": "2016-09-07T08:00:00Z",
				"name": "twitter",
				"views": 21
			},
			{
				"dateUTC": "2016-09-07T08:00:00Z",
				"name": "user_newsvarter",
				"views": 74
			},
			{
				"dateUTC": "2016-09-07T08:00:00Z",
				"name": "user_email",
				"views": 81
			},
			{
				"dateUTC": "2016-09-07T08:00:00Z",
				"name": "unknown",
				"views": 19
			},
			{
				"dateUTC": "2016-09-08T08:00:00Z",
				"name": "google",
				"views": 50
			},
			{
				"dateUTC": "2016-09-08T08:00:00Z",
				"name": "facebook",
				"views": 81
			},
			{
				"dateUTC": "2016-09-08T08:00:00Z",
				"name": "twitter",
				"views": 87
			},
			{
				"dateUTC": "2016-09-08T08:00:00Z",
				"name": "user_newsvarter",
				"views": 69
			},
			{
				"dateUTC": "2016-09-08T08:00:00Z",
				"name": "user_email",
				"views": 8
			},
			{
				"dateUTC": "2016-09-08T08:00:00Z",
				"name": "unknown",
				"views": 95
			},
			{
				"dateUTC": "2016-09-09T08:00:00Z",
				"name": "google",
				"views": 45
			},
			{
				"dateUTC": "2016-09-09T08:00:00Z",
				"name": "facebook",
				"views": 99
			},
			{
				"dateUTC": "2016-09-09T08:00:00Z",
				"name": "twitter",
				"views": 11
			},
			{
				"dateUTC": "2016-09-09T08:00:00Z",
				"name": "user_newsvarter",
				"views": 15
			},
			{
				"dateUTC": "2016-09-09T08:00:00Z",
				"name": "user_email",
				"views": 17
			},
			{
				"dateUTC": "2016-09-09T08:00:00Z",
				"name": "unknown",
				"views": 0
			},
			{
				"dateUTC": "2016-09-10T08:00:00Z",
				"name": "google",
				"views": 1
			},
			{
				"dateUTC": "2016-09-10T08:00:00Z",
				"name": "facebook",
				"views": 82
			},
			{
				"dateUTC": "2016-09-10T08:00:00Z",
				"name": "twitter",
				"views": 87
			},
			{
				"dateUTC": "2016-09-10T08:00:00Z",
				"name": "user_newsvarter",
				"views": 32
			},
			{
				"dateUTC": "2016-09-10T08:00:00Z",
				"name": "user_email",
				"views": 27
			},
			{
				"dateUTC": "2016-09-10T08:00:00Z",
				"name": "unknown",
				"views": 12
			},
			{
				"dateUTC": "2016-09-11T08:00:00Z",
				"name": "google",
				"views": 64
			},
			{
				"dateUTC": "2016-09-11T08:00:00Z",
				"name": "facebook",
				"views": 96
			},
			{
				"dateUTC": "2016-09-11T08:00:00Z",
				"name": "twitter",
				"views": 66
			},
			{
				"dateUTC": "2016-09-11T08:00:00Z",
				"name": "user_newsvarter",
				"views": 2
			},
			{
				"dateUTC": "2016-09-11T08:00:00Z",
				"name": "user_email",
				"views": 26
			},
			{
				"dateUTC": "2016-09-11T08:00:00Z",
				"name": "unknown",
				"views": 71
			},
			{
				"dateUTC": "2016-09-12T08:00:00Z",
				"name": "google",
				"views": 77
			},
			{
				"dateUTC": "2016-09-12T08:00:00Z",
				"name": "facebook",
				"views": 2
			},
			{
				"dateUTC": "2016-09-12T08:00:00Z",
				"name": "twitter",
				"views": 85
			},
			{
				"dateUTC": "2016-09-12T08:00:00Z",
				"name": "user_newsvarter",
				"views": 13
			},
			{
				"dateUTC": "2016-09-12T08:00:00Z",
				"name": "user_email",
				"views": 30
			},
			{
				"dateUTC": "2016-09-12T08:00:00Z",
				"name": "unknown",
				"views": 28
			},
			{
				"dateUTC": "2016-09-13T08:00:00Z",
				"name": "google",
				"views": 32
			},
			{
				"dateUTC": "2016-09-13T08:00:00Z",
				"name": "facebook",
				"views": 80
			},
			{
				"dateUTC": "2016-09-13T08:00:00Z",
				"name": "twitter",
				"views": 98
			},
			{
				"dateUTC": "2016-09-13T08:00:00Z",
				"name": "user_newsvarter",
				"views": 60
			},
			{
				"dateUTC": "2016-09-13T08:00:00Z",
				"name": "user_email",
				"views": 0
			},
			{
				"dateUTC": "2016-09-13T08:00:00Z",
				"name": "unknown",
				"views": 34
			},
			{
				"dateUTC": "2016-09-14T08:00:00Z",
				"name": "google",
				"views": 71
			},
			{
				"dateUTC": "2016-09-14T08:00:00Z",
				"name": "facebook",
				"views": 71
			},
			{
				"dateUTC": "2016-09-14T08:00:00Z",
				"name": "twitter",
				"views": 67
			},
			{
				"dateUTC": "2016-09-14T08:00:00Z",
				"name": "user_newsvarter",
				"views": 62
			},
			{
				"dateUTC": "2016-09-14T08:00:00Z",
				"name": "user_email",
				"views": 75
			},
			{
				"dateUTC": "2016-09-14T08:00:00Z",
				"name": "unknown",
				"views": 92
			},
			{
				"dateUTC": "2016-09-15T08:00:00Z",
				"name": "google",
				"views": 54
			},
			{
				"dateUTC": "2016-09-15T08:00:00Z",
				"name": "facebook",
				"views": 0
			},
			{
				"dateUTC": "2016-09-15T08:00:00Z",
				"name": "twitter",
				"views": 74
			},
			{
				"dateUTC": "2016-09-15T08:00:00Z",
				"name": "user_newsvarter",
				"views": 11
			},
			{
				"dateUTC": "2016-09-15T08:00:00Z",
				"name": "user_email",
				"views": 41
			},
			{
				"dateUTC": "2016-09-15T08:00:00Z",
				"name": "unknown",
				"views": 70
			},
			{
				"dateUTC": "2016-09-16T08:00:00Z",
				"name": "google",
				"views": 39
			},
			{
				"dateUTC": "2016-09-16T08:00:00Z",
				"name": "facebook",
				"views": 92
			},
			{
				"dateUTC": "2016-09-16T08:00:00Z",
				"name": "twitter",
				"views": 95
			},
			{
				"dateUTC": "2016-09-16T08:00:00Z",
				"name": "user_newsvarter",
				"views": 48
			},
			{
				"dateUTC": "2016-09-16T08:00:00Z",
				"name": "user_email",
				"views": 56
			},
			{
				"dateUTC": "2016-09-16T08:00:00Z",
				"name": "unknown",
				"views": 3
			},
			{
				"dateUTC": "2016-09-17T08:00:00Z",
				"name": "google",
				"views": 64
			},
			{
				"dateUTC": "2016-09-17T08:00:00Z",
				"name": "facebook",
				"views": 19
			},
			{
				"dateUTC": "2016-09-17T08:00:00Z",
				"name": "twitter",
				"views": 89
			},
			{
				"dateUTC": "2016-09-17T08:00:00Z",
				"name": "user_newsvarter",
				"views": 59
			},
			{
				"dateUTC": "2016-09-17T08:00:00Z",
				"name": "user_email",
				"views": 80
			},
			{
				"dateUTC": "2016-09-17T08:00:00Z",
				"name": "unknown",
				"views": 85
			},
			{
				"dateUTC": "2016-09-18T08:00:00Z",
				"name": "google",
				"views": 44
			},
			{
				"dateUTC": "2016-09-18T08:00:00Z",
				"name": "facebook",
				"views": 38
			},
			{
				"dateUTC": "2016-09-18T08:00:00Z",
				"name": "twitter",
				"views": 89
			},
			{
				"dateUTC": "2016-09-18T08:00:00Z",
				"name": "user_newsvarter",
				"views": 73
			},
			{
				"dateUTC": "2016-09-18T08:00:00Z",
				"name": "user_email",
				"views": 0
			},
			{
				"dateUTC": "2016-09-18T08:00:00Z",
				"name": "unknown",
				"views": 50
			},
			{
				"dateUTC": "2016-09-19T08:00:00Z",
				"name": "google",
				"views": 73
			},
			{
				"dateUTC": "2016-09-19T08:00:00Z",
				"name": "facebook",
				"views": 8
			},
			{
				"dateUTC": "2016-09-19T08:00:00Z",
				"name": "twitter",
				"views": 52
			},
			{
				"dateUTC": "2016-09-19T08:00:00Z",
				"name": "user_newsvarter",
				"views": 38
			},
			{
				"dateUTC": "2016-09-19T08:00:00Z",
				"name": "user_email",
				"views": 53
			},
			{
				"dateUTC": "2016-09-19T08:00:00Z",
				"name": "unknown",
				"views": 88
			},
			{
				"dateUTC": "2016-09-20T08:00:00Z",
				"name": "google",
				"views": 5
			},
			{
				"dateUTC": "2016-09-20T08:00:00Z",
				"name": "facebook",
				"views": 94
			},
			{
				"dateUTC": "2016-09-20T08:00:00Z",
				"name": "twitter",
				"views": 34
			},
			{
				"dateUTC": "2016-09-20T08:00:00Z",
				"name": "user_newsvarter",
				"views": 63
			},
			{
				"dateUTC": "2016-09-20T08:00:00Z",
				"name": "user_email",
				"views": 48
			},
			{
				"dateUTC": "2016-09-20T08:00:00Z",
				"name": "unknown",
				"views": 88
			},
			{
				"dateUTC": "2016-09-21T08:00:00Z",
				"name": "google",
				"views": 48
			},
			{
				"dateUTC": "2016-09-21T08:00:00Z",
				"name": "facebook",
				"views": 27
			},
			{
				"dateUTC": "2016-09-21T08:00:00Z",
				"name": "twitter",
				"views": 78
			},
			{
				"dateUTC": "2016-09-21T08:00:00Z",
				"name": "user_newsvarter",
				"views": 50
			},
			{
				"dateUTC": "2016-09-21T08:00:00Z",
				"name": "user_email",
				"views": 31
			},
			{
				"dateUTC": "2016-09-21T08:00:00Z",
				"name": "unknown",
				"views": 83
			},
			{
				"dateUTC": "2016-09-22T08:00:00Z",
				"name": "google",
				"views": 73
			},
			{
				"dateUTC": "2016-09-22T08:00:00Z",
				"name": "facebook",
				"views": 36
			},
			{
				"dateUTC": "2016-09-22T08:00:00Z",
				"name": "twitter",
				"views": 8
			},
			{
				"dateUTC": "2016-09-22T08:00:00Z",
				"name": "user_newsvarter",
				"views": 96
			},
			{
				"dateUTC": "2016-09-22T08:00:00Z",
				"name": "user_email",
				"views": 22
			},
			{
				"dateUTC": "2016-09-22T08:00:00Z",
				"name": "unknown",
				"views": 36
			},
			{
				"dateUTC": "2016-09-23T08:00:00Z",
				"name": "google",
				"views": 42
			},
			{
				"dateUTC": "2016-09-23T08:00:00Z",
				"name": "facebook",
				"views": 70
			},
			{
				"dateUTC": "2016-09-23T08:00:00Z",
				"name": "twitter",
				"views": 91
			},
			{
				"dateUTC": "2016-09-23T08:00:00Z",
				"name": "user_newsvarter",
				"views": 93
			},
			{
				"dateUTC": "2016-09-23T08:00:00Z",
				"name": "user_email",
				"views": 25
			},
			{
				"dateUTC": "2016-09-23T08:00:00Z",
				"name": "unknown",
				"views": 85
			},
			{
				"dateUTC": "2016-09-24T08:00:00Z",
				"name": "google",
				"views": 74
			},
			{
				"dateUTC": "2016-09-24T08:00:00Z",
				"name": "facebook",
				"views": 6
			},
			{
				"dateUTC": "2016-09-24T08:00:00Z",
				"name": "twitter",
				"views": 95
			},
			{
				"dateUTC": "2016-09-24T08:00:00Z",
				"name": "user_newsvarter",
				"views": 3
			},
			{
				"dateUTC": "2016-09-24T08:00:00Z",
				"name": "user_email",
				"views": 14
			},
			{
				"dateUTC": "2016-09-24T08:00:00Z",
				"name": "unknown",
				"views": 40
			},
			{
				"dateUTC": "2016-09-25T08:00:00Z",
				"name": "google",
				"views": 66
			},
			{
				"dateUTC": "2016-09-25T08:00:00Z",
				"name": "facebook",
				"views": 33
			},
			{
				"dateUTC": "2016-09-25T08:00:00Z",
				"name": "twitter",
				"views": 52
			},
			{
				"dateUTC": "2016-09-25T08:00:00Z",
				"name": "user_newsvarter",
				"views": 81
			},
			{
				"dateUTC": "2016-09-25T08:00:00Z",
				"name": "user_email",
				"views": 87
			},
			{
				"dateUTC": "2016-09-25T08:00:00Z",
				"name": "unknown",
				"views": 90
			},
			{
				"dateUTC": "2016-09-26T08:00:00Z",
				"name": "google",
				"views": 50
			},
			{
				"dateUTC": "2016-09-26T08:00:00Z",
				"name": "facebook",
				"views": 91
			},
			{
				"dateUTC": "2016-09-26T08:00:00Z",
				"name": "twitter",
				"views": 47
			},
			{
				"dateUTC": "2016-09-26T08:00:00Z",
				"name": "user_newsvarter",
				"views": 87
			},
			{
				"dateUTC": "2016-09-26T08:00:00Z",
				"name": "user_email",
				"views": 82
			},
			{
				"dateUTC": "2016-09-26T08:00:00Z",
				"name": "unknown",
				"views": 31
			},
			{
				"dateUTC": "2016-09-27T08:00:00Z",
				"name": "google",
				"views": 52
			},
			{
				"dateUTC": "2016-09-27T08:00:00Z",
				"name": "facebook",
				"views": 97
			},
			{
				"dateUTC": "2016-09-27T08:00:00Z",
				"name": "twitter",
				"views": 21
			},
			{
				"dateUTC": "2016-09-27T08:00:00Z",
				"name": "user_newsvarter",
				"views": 32
			},
			{
				"dateUTC": "2016-09-27T08:00:00Z",
				"name": "user_email",
				"views": 73
			},
			{
				"dateUTC": "2016-09-27T08:00:00Z",
				"name": "unknown",
				"views": 29
			},
			{
				"dateUTC": "2016-09-28T08:00:00Z",
				"name": "google",
				"views": 91
			},
			{
				"dateUTC": "2016-09-28T08:00:00Z",
				"name": "facebook",
				"views": 32
			},
			{
				"dateUTC": "2016-09-28T08:00:00Z",
				"name": "twitter",
				"views": 26
			},
			{
				"dateUTC": "2016-09-28T08:00:00Z",
				"name": "user_newsvarter",
				"views": 1
			},
			{
				"dateUTC": "2016-09-28T08:00:00Z",
				"name": "user_email",
				"views": 28
			},
			{
				"dateUTC": "2016-09-28T08:00:00Z",
				"name": "unknown",
				"views": 50
			},
			{
				"dateUTC": "2016-09-29T08:00:00Z",
				"name": "google",
				"views": 80
			},
			{
				"dateUTC": "2016-09-29T08:00:00Z",
				"name": "facebook",
				"views": 40
			},
			{
				"dateUTC": "2016-09-29T08:00:00Z",
				"name": "twitter",
				"views": 62
			},
			{
				"dateUTC": "2016-09-29T08:00:00Z",
				"name": "user_newsvarter",
				"views": 29
			},
			{
				"dateUTC": "2016-09-29T08:00:00Z",
				"name": "user_email",
				"views": 82
			},
			{
				"dateUTC": "2016-09-29T08:00:00Z",
				"name": "unknown",
				"views": 30
			},
			{
				"dateUTC": "2016-09-30T08:00:00Z",
				"name": "google",
				"views": 40
			},
			{
				"dateUTC": "2016-09-30T08:00:00Z",
				"name": "facebook",
				"views": 20
			},
			{
				"dateUTC": "2016-09-30T08:00:00Z",
				"name": "twitter",
				"views": 14
			},
			{
				"dateUTC": "2016-09-30T08:00:00Z",
				"name": "user_newsvarter",
				"views": 68
			},
			{
				"dateUTC": "2016-09-30T08:00:00Z",
				"name": "user_email",
				"views": 26
			},
			{
				"dateUTC": "2016-09-30T08:00:00Z",
				"name": "unknown",
				"views": 30
			},
			{
				"dateUTC": "2016-10-01T08:00:00Z",
				"name": "google",
				"views": 62
			},
			{
				"dateUTC": "2016-10-01T08:00:00Z",
				"name": "facebook",
				"views": 18
			},
			{
				"dateUTC": "2016-10-01T08:00:00Z",
				"name": "twitter",
				"views": 81
			},
			{
				"dateUTC": "2016-10-01T08:00:00Z",
				"name": "user_newsvarter",
				"views": 15
			},
			{
				"dateUTC": "2016-10-01T08:00:00Z",
				"name": "user_email",
				"views": 4
			},
			{
				"dateUTC": "2016-10-01T08:00:00Z",
				"name": "unknown",
				"views": 67
			},
			{
				"dateUTC": "2016-10-02T08:00:00Z",
				"name": "google",
				"views": 28
			},
			{
				"dateUTC": "2016-10-02T08:00:00Z",
				"name": "facebook",
				"views": 4
			},
			{
				"dateUTC": "2016-10-02T08:00:00Z",
				"name": "twitter",
				"views": 17
			},
			{
				"dateUTC": "2016-10-02T08:00:00Z",
				"name": "user_newsvarter",
				"views": 85
			},
			{
				"dateUTC": "2016-10-02T08:00:00Z",
				"name": "user_email",
				"views": 47
			},
			{
				"dateUTC": "2016-10-02T08:00:00Z",
				"name": "unknown",
				"views": 62
			},
			{
				"dateUTC": "2016-10-03T08:00:00Z",
				"name": "google",
				"views": 55
			},
			{
				"dateUTC": "2016-10-03T08:00:00Z",
				"name": "facebook",
				"views": 8
			},
			{
				"dateUTC": "2016-10-03T08:00:00Z",
				"name": "twitter",
				"views": 63
			},
			{
				"dateUTC": "2016-10-03T08:00:00Z",
				"name": "user_newsvarter",
				"views": 72
			},
			{
				"dateUTC": "2016-10-03T08:00:00Z",
				"name": "user_email",
				"views": 6
			},
			{
				"dateUTC": "2016-10-03T08:00:00Z",
				"name": "unknown",
				"views": 27
			},
			{
				"dateUTC": "2016-10-04T08:00:00Z",
				"name": "google",
				"views": 34
			},
			{
				"dateUTC": "2016-10-04T08:00:00Z",
				"name": "facebook",
				"views": 63
			},
			{
				"dateUTC": "2016-10-04T08:00:00Z",
				"name": "twitter",
				"views": 8
			},
			{
				"dateUTC": "2016-10-04T08:00:00Z",
				"name": "user_newsvarter",
				"views": 85
			},
			{
				"dateUTC": "2016-10-04T08:00:00Z",
				"name": "user_email",
				"views": 74
			},
			{
				"dateUTC": "2016-10-04T08:00:00Z",
				"name": "unknown",
				"views": 55
			},
			{
				"dateUTC": "2016-10-05T08:00:00Z",
				"name": "google",
				"views": 33
			},
			{
				"dateUTC": "2016-10-05T08:00:00Z",
				"name": "facebook",
				"views": 99
			},
			{
				"dateUTC": "2016-10-05T08:00:00Z",
				"name": "twitter",
				"views": 82
			},
			{
				"dateUTC": "2016-10-05T08:00:00Z",
				"name": "user_newsvarter",
				"views": 22
			},
			{
				"dateUTC": "2016-10-05T08:00:00Z",
				"name": "user_email",
				"views": 94
			},
			{
				"dateUTC": "2016-10-05T08:00:00Z",
				"name": "unknown",
				"views": 77
			},
			{
				"dateUTC": "2016-10-06T08:00:00Z",
				"name": "google",
				"views": 97
			},
			{
				"dateUTC": "2016-10-06T08:00:00Z",
				"name": "facebook",
				"views": 31
			},
			{
				"dateUTC": "2016-10-06T08:00:00Z",
				"name": "twitter",
				"views": 34
			},
			{
				"dateUTC": "2016-10-06T08:00:00Z",
				"name": "user_newsvarter",
				"views": 50
			},
			{
				"dateUTC": "2016-10-06T08:00:00Z",
				"name": "user_email",
				"views": 6
			},
			{
				"dateUTC": "2016-10-06T08:00:00Z",
				"name": "unknown",
				"views": 78
			},
			{
				"dateUTC": "2016-10-07T08:00:00Z",
				"name": "google",
				"views": 14
			},
			{
				"dateUTC": "2016-10-07T08:00:00Z",
				"name": "facebook",
				"views": 91
			},
			{
				"dateUTC": "2016-10-07T08:00:00Z",
				"name": "twitter",
				"views": 88
			},
			{
				"dateUTC": "2016-10-07T08:00:00Z",
				"name": "user_newsvarter",
				"views": 53
			},
			{
				"dateUTC": "2016-10-07T08:00:00Z",
				"name": "user_email",
				"views": 99
			},
			{
				"dateUTC": "2016-10-07T08:00:00Z",
				"name": "unknown",
				"views": 9
			},
			{
				"dateUTC": "2016-10-08T08:00:00Z",
				"name": "google",
				"views": 76
			},
			{
				"dateUTC": "2016-10-08T08:00:00Z",
				"name": "facebook",
				"views": 4
			},
			{
				"dateUTC": "2016-10-08T08:00:00Z",
				"name": "twitter",
				"views": 85
			},
			{
				"dateUTC": "2016-10-08T08:00:00Z",
				"name": "user_newsvarter",
				"views": 13
			},
			{
				"dateUTC": "2016-10-08T08:00:00Z",
				"name": "user_email",
				"views": 76
			},
			{
				"dateUTC": "2016-10-08T08:00:00Z",
				"name": "unknown",
				"views": 44
			},
			{
				"dateUTC": "2016-10-09T08:00:00Z",
				"name": "google",
				"views": 61
			},
			{
				"dateUTC": "2016-10-09T08:00:00Z",
				"name": "facebook",
				"views": 25
			},
			{
				"dateUTC": "2016-10-09T08:00:00Z",
				"name": "twitter",
				"views": 30
			},
			{
				"dateUTC": "2016-10-09T08:00:00Z",
				"name": "user_newsvarter",
				"views": 64
			},
			{
				"dateUTC": "2016-10-09T08:00:00Z",
				"name": "user_email",
				"views": 57
			},
			{
				"dateUTC": "2016-10-09T08:00:00Z",
				"name": "unknown",
				"views": 30
			},
			{
				"dateUTC": "2016-10-10T08:00:00Z",
				"name": "google",
				"views": 27
			},
			{
				"dateUTC": "2016-10-10T08:00:00Z",
				"name": "facebook",
				"views": 4
			},
			{
				"dateUTC": "2016-10-10T08:00:00Z",
				"name": "twitter",
				"views": 8
			},
			{
				"dateUTC": "2016-10-10T08:00:00Z",
				"name": "user_newsvarter",
				"views": 85
			},
			{
				"dateUTC": "2016-10-10T08:00:00Z",
				"name": "user_email",
				"views": 43
			},
			{
				"dateUTC": "2016-10-10T08:00:00Z",
				"name": "unknown",
				"views": 98
			},
			{
				"dateUTC": "2016-10-11T08:00:00Z",
				"name": "google",
				"views": 8
			},
			{
				"dateUTC": "2016-10-11T08:00:00Z",
				"name": "facebook",
				"views": 54
			},
			{
				"dateUTC": "2016-10-11T08:00:00Z",
				"name": "twitter",
				"views": 56
			},
			{
				"dateUTC": "2016-10-11T08:00:00Z",
				"name": "user_newsvarter",
				"views": 44
			},
			{
				"dateUTC": "2016-10-11T08:00:00Z",
				"name": "user_email",
				"views": 37
			},
			{
				"dateUTC": "2016-10-11T08:00:00Z",
				"name": "unknown",
				"views": 8
			},
			{
				"dateUTC": "2016-10-12T08:00:00Z",
				"name": "google",
				"views": 8
			},
			{
				"dateUTC": "2016-10-12T08:00:00Z",
				"name": "facebook",
				"views": 89
			},
			{
				"dateUTC": "2016-10-12T08:00:00Z",
				"name": "twitter",
				"views": 97
			},
			{
				"dateUTC": "2016-10-12T08:00:00Z",
				"name": "user_newsvarter",
				"views": 94
			},
			{
				"dateUTC": "2016-10-12T08:00:00Z",
				"name": "user_email",
				"views": 61
			},
			{
				"dateUTC": "2016-10-12T08:00:00Z",
				"name": "unknown",
				"views": 13
			},
			{
				"dateUTC": "2016-10-13T08:00:00Z",
				"name": "google",
				"views": 45
			},
			{
				"dateUTC": "2016-10-13T08:00:00Z",
				"name": "facebook",
				"views": 45
			},
			{
				"dateUTC": "2016-10-13T08:00:00Z",
				"name": "twitter",
				"views": 89
			},
			{
				"dateUTC": "2016-10-13T08:00:00Z",
				"name": "user_newsvarter",
				"views": 84
			},
			{
				"dateUTC": "2016-10-13T08:00:00Z",
				"name": "user_email",
				"views": 78
			},
			{
				"dateUTC": "2016-10-13T08:00:00Z",
				"name": "unknown",
				"views": 83
			},
			{
				"dateUTC": "2016-10-14T08:00:00Z",
				"name": "google",
				"views": 11
			},
			{
				"dateUTC": "2016-10-14T08:00:00Z",
				"name": "facebook",
				"views": 39
			},
			{
				"dateUTC": "2016-10-14T08:00:00Z",
				"name": "twitter",
				"views": 80
			},
			{
				"dateUTC": "2016-10-14T08:00:00Z",
				"name": "user_newsvarter",
				"views": 8
			},
			{
				"dateUTC": "2016-10-14T08:00:00Z",
				"name": "user_email",
				"views": 50
			},
			{
				"dateUTC": "2016-10-14T08:00:00Z",
				"name": "unknown",
				"views": 56
			},
			{
				"dateUTC": "2016-10-15T08:00:00Z",
				"name": "google",
				"views": 69
			},
			{
				"dateUTC": "2016-10-15T08:00:00Z",
				"name": "facebook",
				"views": 27
			},
			{
				"dateUTC": "2016-10-15T08:00:00Z",
				"name": "twitter",
				"views": 42
			},
			{
				"dateUTC": "2016-10-15T08:00:00Z",
				"name": "user_newsvarter",
				"views": 9
			},
			{
				"dateUTC": "2016-10-15T08:00:00Z",
				"name": "user_email",
				"views": 30
			},
			{
				"dateUTC": "2016-10-15T08:00:00Z",
				"name": "unknown",
				"views": 43
			},
			{
				"dateUTC": "2016-10-16T08:00:00Z",
				"name": "google",
				"views": 29
			},
			{
				"dateUTC": "2016-10-16T08:00:00Z",
				"name": "facebook",
				"views": 86
			},
			{
				"dateUTC": "2016-10-16T08:00:00Z",
				"name": "twitter",
				"views": 27
			},
			{
				"dateUTC": "2016-10-16T08:00:00Z",
				"name": "user_newsvarter",
				"views": 35
			},
			{
				"dateUTC": "2016-10-16T08:00:00Z",
				"name": "user_email",
				"views": 3
			},
			{
				"dateUTC": "2016-10-16T08:00:00Z",
				"name": "unknown",
				"views": 77
			},
			{
				"dateUTC": "2016-10-17T08:00:00Z",
				"name": "google",
				"views": 39
			},
			{
				"dateUTC": "2016-10-17T08:00:00Z",
				"name": "facebook",
				"views": 92
			},
			{
				"dateUTC": "2016-10-17T08:00:00Z",
				"name": "twitter",
				"views": 30
			},
			{
				"dateUTC": "2016-10-17T08:00:00Z",
				"name": "user_newsvarter",
				"views": 97
			},
			{
				"dateUTC": "2016-10-17T08:00:00Z",
				"name": "user_email",
				"views": 75
			},
			{
				"dateUTC": "2016-10-17T08:00:00Z",
				"name": "unknown",
				"views": 30
			},
			{
				"dateUTC": "2016-10-18T08:00:00Z",
				"name": "google",
				"views": 32
			},
			{
				"dateUTC": "2016-10-18T08:00:00Z",
				"name": "facebook",
				"views": 67
			},
			{
				"dateUTC": "2016-10-18T08:00:00Z",
				"name": "twitter",
				"views": 75
			},
			{
				"dateUTC": "2016-10-18T08:00:00Z",
				"name": "user_newsvarter",
				"views": 99
			},
			{
				"dateUTC": "2016-10-18T08:00:00Z",
				"name": "user_email",
				"views": 92
			},
			{
				"dateUTC": "2016-10-18T08:00:00Z",
				"name": "unknown",
				"views": 66
			},
			{
				"dateUTC": "2016-10-19T08:00:00Z",
				"name": "google",
				"views": 29
			},
			{
				"dateUTC": "2016-10-19T08:00:00Z",
				"name": "facebook",
				"views": 64
			},
			{
				"dateUTC": "2016-10-19T08:00:00Z",
				"name": "twitter",
				"views": 92
			},
			{
				"dateUTC": "2016-10-19T08:00:00Z",
				"name": "user_newsvarter",
				"views": 23
			},
			{
				"dateUTC": "2016-10-19T08:00:00Z",
				"name": "user_email",
				"views": 25
			},
			{
				"dateUTC": "2016-10-19T08:00:00Z",
				"name": "unknown",
				"views": 40
			},
			{
				"dateUTC": "2016-10-20T08:00:00Z",
				"name": "google",
				"views": 41
			},
			{
				"dateUTC": "2016-10-20T08:00:00Z",
				"name": "facebook",
				"views": 23
			},
			{
				"dateUTC": "2016-10-20T08:00:00Z",
				"name": "twitter",
				"views": 19
			},
			{
				"dateUTC": "2016-10-20T08:00:00Z",
				"name": "user_newsvarter",
				"views": 13
			},
			{
				"dateUTC": "2016-10-20T08:00:00Z",
				"name": "user_email",
				"views": 32
			},
			{
				"dateUTC": "2016-10-20T08:00:00Z",
				"name": "unknown",
				"views": 42
			},
			{
				"dateUTC": "2016-10-21T08:00:00Z",
				"name": "google",
				"views": 20
			},
			{
				"dateUTC": "2016-10-21T08:00:00Z",
				"name": "facebook",
				"views": 85
			},
			{
				"dateUTC": "2016-10-21T08:00:00Z",
				"name": "twitter",
				"views": 27
			},
			{
				"dateUTC": "2016-10-21T08:00:00Z",
				"name": "user_newsvarter",
				"views": 38
			},
			{
				"dateUTC": "2016-10-21T08:00:00Z",
				"name": "user_email",
				"views": 54
			},
			{
				"dateUTC": "2016-10-21T08:00:00Z",
				"name": "unknown",
				"views": 42
			}
		]
	};

/***/ })
]);
//# sourceMappingURL=demo-stacked-area.js.map