webpackJsonp([3],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(26),
	    d3Selection = __webpack_require__(1),
	    d3TimeFormat = __webpack_require__(13),
	    PubSub = __webpack_require__(2),
	    brush = __webpack_require__(29),
	    line = __webpack_require__(43),
	    tooltip = __webpack_require__(46),
	    dataBuilder = __webpack_require__(47),
	    colorSelectorHelper = __webpack_require__(42);
	
	function createBrushChart(optionalColorSchema) {
	    var brushChart = brush(),
	        brushMargin = { top: 0, bottom: 40, left: 70, right: 30 },
	        testDataSet = new dataBuilder.LineDataBuilder(),
	        brushContainer = d3Selection.select('.js-line-brush-chart-container'),
	        containerWidth = brushContainer.node() ? brushContainer.node().getBoundingClientRect().width : false,
	        dataset;
	
	    if (containerWidth) {
	        dataset = testDataSet.with5Topics().build();
	
	        brushChart.width(containerWidth).height(100).margin(brushMargin).onBrush(function (brushExtent) {
	            var format = d3TimeFormat.timeFormat('%m/%d/%Y');
	
	            d3Selection.select('.js-start-date').text(format(brushExtent[0]));
	            d3Selection.select('.js-end-date').text(format(brushExtent[1]));
	
	            d3Selection.select('.js-date-range').classed('is-hidden', false);
	
	            // Filter
	            d3Selection.selectAll('.js-line-chart-container .line-chart').remove();
	            createLineChart(optionalColorSchema ? optionalColorSchema : null, filterData(brushExtent[0], brushExtent[1]));
	        });
	
	        brushContainer.datum(brushDataAdapter(dataset)).call(brushChart);
	    }
	}
	
	function createLineChart(optionalColorSchema, optionalData) {
	    var lineChart1 = line(),
	        chartTooltip = tooltip(),
	        testDataSet = new dataBuilder.LineDataBuilder(),
	        container = d3Selection.select('.js-line-chart-container'),
	        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
	        tooltipContainer,
	        dataset;
	
	    if (containerWidth) {
	        d3Selection.select('#button').on('click', function () {
	            lineChart1.exportChart('linechart.png', 'Britecharts Line Chart');
	        });
	
	        dataset = testDataSet.with5Topics().build();
	
	        // LineChart Setup and start
	        lineChart1.isAnimated(true).aspectRatio(0.5).grid('horizontal').tooltipThreshold(600).width(containerWidth).dateLabel('fullDate').on('customMouseOver', chartTooltip.show).on('customMouseMove', chartTooltip.update).on('customMouseOut', chartTooltip.hide);
	
	        if (optionalColorSchema) {
	            lineChart1.colorSchema(optionalColorSchema);
	        }
	
	        if (optionalData) {
	            container.datum(optionalData).call(lineChart1);
	        } else {
	            container.datum(dataset).call(lineChart1);
	        }
	
	        // Tooltip Setup and start
	        chartTooltip
	        // In order to change the date range on the tooltip title, uncomment this line
	        // .forceDateRange(chartTooltip.axisTimeCombinations.HOUR_DAY)
	        .title('Quantity Sold').forceOrder(dataset.dataByTopic.map(function (topic) {
	            return topic.topic;
	        }));
	
	        // Note that if the viewport width is less than the tooltipThreshold value,
	        // this container won't exist, and the tooltip won't show up
	        tooltipContainer = d3Selection.select('.js-line-chart-container .metadata-group .hover-marker');
	        tooltipContainer.datum([]).call(chartTooltip);
	    }
	}
	
	function createLineChartWithSingleLine() {
	    var lineChart2 = line(),
	        chartTooltip = tooltip(),
	        testDataSet = new dataBuilder.LineDataBuilder(),
	        container = d3Selection.select('.js-single-line-chart-container'),
	        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
	        tooltipContainer,
	        dataset;
	
	    if (containerWidth) {
	        dataset = testDataSet.withOneSource().build();
	
	        d3Selection.select('#button2').on('click', function () {
	            lineChart2.exportChart('linechart.png', 'Britecharts LÍne Chart');
	        });
	
	        lineChart2.tooltipThreshold(600).height(500).grid('horizontal').width(containerWidth).dateLabel('fullDate').on('customMouseOver', function () {
	            chartTooltip.show();
	        }).on('customMouseMove', function (dataPoint, topicColorMap, dataPointXPosition) {
	            chartTooltip.update(dataPoint, topicColorMap, dataPointXPosition);
	        }).on('customMouseOut', function () {
	            chartTooltip.hide();
	        });
	
	        container.datum(dataset).call(lineChart2);
	
	        // Tooltip Setup and start
	        chartTooltip.title('Quantity Sold');
	
	        // Note that if the viewport width is less than the tooltipThreshold value,
	        // this container won't exist, and the tooltip won't show up
	        tooltipContainer = d3Selection.select('.js-single-line-chart-container .metadata-group .hover-marker');
	        tooltipContainer.datum([]).call(chartTooltip);
	    }
	}
	
	function createLineChartWithFixedHeight() {
	    var lineChart3 = line(),
	        chartTooltip = tooltip(),
	        testDataSet = new dataBuilder.LineDataBuilder(),
	        container = d3Selection.select('.js-fixed-line-chart-container'),
	        containerWidth = container.node() ? container.node().getBoundingClientRect().width : false,
	        tooltipContainer,
	        dataset;
	
	    if (containerWidth) {
	        dataset = testDataSet.with5Topics().build();
	
	        lineChart3.height(300).width(containerWidth).grid('full').dateLabel('fullDate').on('customMouseOver', function () {
	            chartTooltip.show();
	        }).on('customMouseMove', function (dataPoint, topicColorMap, dataPointXPosition) {
	            chartTooltip.update(dataPoint, topicColorMap, dataPointXPosition);
	        }).on('customMouseOut', function () {
	            chartTooltip.hide();
	        });
	
	        container.datum(dataset).call(lineChart3);
	
	        // Tooltip Setup and start
	        chartTooltip.title('Quantity Sold');
	
	        // Note that if the viewport width is less than the tooltipThreshold value,
	        // this container won't exist, and the tooltip won't show up
	        tooltipContainer = d3Selection.select('.js-fixed-line-chart-container .metadata-group .hover-marker');
	        tooltipContainer.datum([]).call(chartTooltip);
	    }
	}
	
	/*
	 * The Brush chart wants an input like this one
	 * @example
	 * [
	 *     {
	 *         value: 1,
	 *         date: '2011-01-06T00:00:00Z'
	 *     },
	 *     {
	 *         value: 2,
	 *         date: '2011-01-07T00:00:00Z'
	 *     }
	 * ]
	 */
	function brushDataAdapter(dataLine) {
	    return dataLine.dataByDate.map(function (d) {
	        d.value = d.topics.reduce(function (acc, topic) {
	            return acc + topic.value;
	        }, 0);
	
	        return d;
	    });
	}
	
	function filterData(d0, d1) {
	    var testDataSet = new dataBuilder.LineDataBuilder(),
	        data = JSON.parse(JSON.stringify(testDataSet.with5Topics().build()));
	
	    data.dataByDate = data.dataByDate.filter(isInRange.bind(null, d0, d1));
	
	    data.dataByTopic = data.dataByTopic.map(function (topic) {
	        topic.dates = topic.dates.filter(isInRange.bind(null, d0, d1));
	
	        return topic;
	    });
	
	    return data;
	}
	
	function isInRange(d0, d1, d) {
	    return new Date(d.date) >= d0 && new Date(d.date) <= d1;
	}
	
	// Show charts if container available
	if (d3Selection.select('.js-line-chart-container').node()) {
	    createLineChart();
	    createBrushChart();
	    createLineChartWithSingleLine();
	    createLineChartWithFixedHeight();
	
	    var redrawCharts = function redrawCharts() {
	        d3Selection.selectAll('.line-chart').remove();
	        d3Selection.selectAll('.brush-chart').remove();
	
	        createLineChart();
	        createBrushChart();
	        createLineChartWithSingleLine();
	        createLineChartWithFixedHeight();
	    };
	
	    // Redraw charts on window resize
	    PubSub.subscribe('resize', redrawCharts);
	
	    // Color schema selector
	    colorSelectorHelper.createColorSelector('.js-color-selector-container', '.line-chart', function (newSchema) {
	        createLineChart(newSchema);
	        d3Selection.selectAll('.brush-chart').remove();
	        createBrushChart(newSchema);
	    });
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Array = __webpack_require__(4);
	    var d3Axis = __webpack_require__(5);
	    var d3Brush = __webpack_require__(30);
	    var d3Ease = __webpack_require__(16);
	    var d3Scale = __webpack_require__(9);
	    var d3Shape = __webpack_require__(32);
	    var d3Selection = __webpack_require__(1);
	    var d3Time = __webpack_require__(12);
	    var d3Transition = __webpack_require__(14);
	    var d3TimeFormat = __webpack_require__(13);
	
	    var colorHelper = __webpack_require__(19);
	    var timeAxisHelper = __webpack_require__(34);
	
	    var _require = __webpack_require__(20),
	        axisTimeCombinations = _require.axisTimeCombinations;
	
	    /**
	     * @typedef BrushChartData
	     * @type {Object[]}
	     * @property {Number} value        Value to chart (required)
	     * @property {Date} date           Date of the value (required)
	     *
	     * @example
	     * [
	     *     {
	     *         value: 1,
	     *         date: '2011-01-06T00:00:00Z'
	     *     },
	     *     {
	     *         value: 2,
	     *         date: '2011-01-07T00:00:00Z'
	     *     }
	     * ]
	     */
	
	    /**
	     * Brush Chart reusable API class that renders a
	     * simple and configurable brush chart.
	     *
	     * @module Brush
	     * @tutorial brush
	     * @requires d3-array, d3-axis, d3-brush, d3-ease, d3-scale, d3-shape, d3-selection, d3-time, d3-time-format
	     *
	     * @example
	     * let brushChart = brush();
	     *
	     * brushChart
	     *     .height(500)
	     *     .width(800);
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(brushChart);
	     *
	     */
	
	    return function module() {
	
	        var margin = {
	            top: 20,
	            right: 20,
	            bottom: 30,
	            left: 20
	        },
	            width = 960,
	            height = 500,
	            data = void 0,
	            svg = void 0,
	            ease = d3Ease.easeQuadOut,
	            dateLabel = 'date',
	            valueLabel = 'value',
	            dateRange = [null, null],
	            chartWidth = void 0,
	            chartHeight = void 0,
	            xScale = void 0,
	            yScale = void 0,
	            xAxis = void 0,
	            forceAxisSettings = null,
	            forcedXTicks = null,
	            forcedXFormat = null,
	            brush = void 0,
	            chartBrush = void 0,
	            handle = void 0,
	            tickPadding = 5,
	            onBrush = null,
	            gradient = colorHelper.colorGradients.greenBlueGradient,
	
	
	        // extractors
	        getValue = function getValue(_ref) {
	            var value = _ref.value;
	            return value;
	        },
	            getDate = function getDate(_ref2) {
	            var date = _ref2.date;
	            return date;
	        };
	
	        /**
	         * This function creates the graph using the selection as container
	         * @param  {D3Selection} _selection A d3 selection that represents
	         *                                  the container(s) where the chart(s) will be rendered
	         * @param {BrushChartData} _data The data to attach and generate the chart
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	                data = cleanData(cloneData(_data));
	
	                buildScales();
	                buildAxis();
	                buildSVG(this);
	                buildGradient();
	                buildBrush();
	                drawArea();
	                drawAxis();
	                drawBrush();
	                drawHandles();
	            });
	        }
	
	        /**
	         * Creates the d3 x axis, setting orientation
	         * @private
	         */
	        function buildAxis() {
	            var minor = void 0,
	                major = void 0;
	
	            if (forceAxisSettings === 'custom' && typeof forcedXFormat === 'string') {
	                minor = {
	                    tick: forcedXTicks,
	                    format: d3TimeFormat.timeFormat(forcedXFormat)
	                };
	            } else {
	                var _timeAxisHelper$getXA = timeAxisHelper.getXAxisSettings(data, width, forceAxisSettings);
	
	                minor = _timeAxisHelper$getXA.minor;
	                major = _timeAxisHelper$getXA.major;
	            }
	
	            xAxis = d3Axis.axisBottom(xScale).ticks(minor.tick).tickSize(10, 0).tickPadding([tickPadding]).tickFormat(minor.format);
	        }
	
	        /**
	         * Creates the brush element and attaches a listener
	         * @return {void}
	         */
	        function buildBrush() {
	            brush = d3Brush.brushX().extent([[0, 0], [chartWidth, chartHeight]]).on('brush', handleBrush).on('end', handleBrushEnded);
	        }
	
	        /**
	         * Builds containers for the chart, the axis and a wrapper for all of them
	         * Also applies the Margin convention
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
	
	            container.append('g').classed('chart-group', true);
	            container.append('g').classed('metadata-group', true);
	            container.append('g').classed('x-axis-group', true);
	            container.append('g').classed('brush-group', true);
	        }
	
	        /**
	         * Creates the gradient on the area
	         * @return {void}
	         */
	        function buildGradient() {
	            var metadataGroup = svg.select('.metadata-group');
	
	            metadataGroup.append('linearGradient').attr('id', 'brush-area-gradient').attr('gradientUnits', 'userSpaceOnUse').attr('x1', 0).attr('x2', xScale(data[data.length - 1].date)).attr('y1', 0).attr('y2', 0).selectAll('stop').data([{ offset: '0%', color: gradient[0] }, { offset: '100%', color: gradient[1] }]).enter().append('stop').attr('offset', function (_ref3) {
	                var offset = _ref3.offset;
	                return offset;
	            }).attr('stop-color', function (_ref4) {
	                var color = _ref4.color;
	                return color;
	            });
	        }
	
	        /**
	         * Creates the x and y scales of the graph
	         * @private
	         */
	        function buildScales() {
	            xScale = d3Scale.scaleTime().domain(d3Array.extent(data, getDate)).range([0, chartWidth]);
	
	            yScale = d3Scale.scaleLinear().domain([0, d3Array.max(data, getValue)]).range([chartHeight, 0]);
	        }
	
	        /**
	         * Builds the SVG element that will contain the chart
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3Selection.select(container).append('svg').classed('britechart brush-chart', true);
	
	                buildContainerGroups();
	            }
	
	            svg.attr('width', width).attr('height', height);
	        }
	
	        /**
	         * Cleaning data adding the proper format
	         *
	         * @param  {BrushChartData} data Data
	         */
	        function cleanData(data) {
	            return data.map(function (d) {
	                d.date = new Date(d[dateLabel]);
	                d.value = +d[valueLabel];
	
	                return d;
	            });
	        }
	
	        /**
	         * Clones the passed array of data
	         * @param  {Object[]} dataToClone Data to clone
	         * @return {Object[]}             Cloned data
	         */
	        function cloneData(dataToClone) {
	            return JSON.parse(JSON.stringify(dataToClone));
	        }
	
	        /**
	         * Draws the x axis on the svg object within its group
	         *
	         * @private
	         */
	        function drawAxis() {
	            svg.select('.x-axis-group').append('g').attr('class', 'x axis').attr('transform', 'translate(0, ' + chartHeight + ')').call(xAxis);
	        }
	
	        /**
	         * Draws the area that is going to represent the data
	         *
	         * @return {void}
	         */
	        function drawArea() {
	            // Create and configure the area generator
	            var area = d3Shape.area().x(function (_ref5) {
	                var date = _ref5.date;
	                return xScale(date);
	            }).y0(chartHeight).y1(function (_ref6) {
	                var value = _ref6.value;
	                return yScale(value);
	            }).curve(d3Shape.curveBasis);
	
	            // Create the area path
	            svg.select('.chart-group').append('path').datum(data).attr('class', 'brush-area').attr('d', area);
	        }
	
	        /**
	         * Draws the Brush components on its group
	         * @return {void}
	         */
	        function drawBrush() {
	            chartBrush = svg.select('.brush-group').call(brush);
	
	            // Update the height of the brushing rectangle
	            chartBrush.selectAll('rect').classed('brush-rect', true).attr('height', chartHeight);
	        }
	
	        /**
	         * Draws a handle for the Brush section
	         * @return {void}
	         */
	        function drawHandles() {
	            var handleFillColor = colorHelper.colorSchemasHuman.britechartsGreySchema[1];
	
	            // Styling
	            handle = chartBrush.selectAll('.handle.brush-rect').style('fill', handleFillColor);
	        }
	
	        /**
	         * When a brush event happens, we can extract info from the extension
	         * of the brush.
	         *
	         * @return {void}
	         */
	        function handleBrush() {
	            var s = d3Selection.event.selection,
	                dateExtent = s.map(xScale.invert);
	
	            if (typeof onBrush === 'function') {
	                onBrush.call(null, dateExtent);
	            }
	
	            // updateHandlers(dateExtent);
	        }
	
	        /**
	         * Processes the end brush event, snapping the boundaries to days
	         * as showed on the example on https://bl.ocks.org/mbostock/6232537
	         * @return {void}
	         * @private
	         */
	        function handleBrushEnded() {
	            if (!d3Selection.event.sourceEvent) return; // Only transition after input.
	            if (!d3Selection.event.selection) return; // Ignore empty selections.
	
	            var d0 = d3Selection.event.selection.map(xScale.invert),
	                d1 = d0.map(d3Time.timeDay.round);
	
	            // If empty when rounded, use floor & ceil instead.
	            if (d1[0] >= d1[1]) {
	                d1[0] = d3Time.timeDay.floor(d0[0]);
	                d1[1] = d3Time.timeDay.offset(d1[0]);
	            }
	
	            d3Selection.select(this).transition().call(d3Selection.event.target.move, d1.map(xScale));
	        }
	
	        /**
	         * Sets a new brush extent within the passed percentage positions
	         * @param {Number} a Percentage of data that the brush start with
	         * @param {Number} b Percentage of data that the brush ends with
	         * @example
	         *     setBrushByPercentages(0.25, 0.5)
	         */
	        function setBrushByPercentages(a, b) {
	            var x0 = a * chartWidth,
	                x1 = b * chartWidth;
	
	            brush.move(chartBrush, [x0, x1]);
	        }
	
	        /**
	         * Sets a new brush extent within the passed dates
	         * @param {String | Date} dateA Initial Date
	         * @param {String | Date} dateB End Date
	         */
	        function setBrushByDates(dateA, dateB) {
	            var x0 = xScale(new Date(dateA)),
	                x1 = xScale(new Date(dateB));
	
	            brush.move(chartBrush, [x0, x1]);
	        }
	
	        /**
	         * Updates visibility and position of the brush handlers
	         * @param  {Number[]} dateExtent Date range
	         * @return {void}
	         */
	        function updateHandlers(dateExtent) {
	            if (dateExtent == null) {
	                handle.attr('display', 'none');
	            } else {
	                handle.attr('display', null).attr('transform', function (d, i) {
	                    return 'translate(' + dateExtent[i] + ',' + chartHeight / 2 + ')';
	                });
	            }
	        }
	
	        // API
	
	        /**
	         * Gets or Sets the dateRange for the selected part of the brush
	         * @param  {String[]} _x Desired dateRange for the graph
	         * @return { dateRange | module} Current dateRange or Chart module to chain calls
	         * @public
	         */
	        exports.dateRange = function (_x) {
	            if (!arguments.length) {
	                return dateRange;
	            }
	            dateRange = _x;
	
	            if (Array.isArray(dateRange)) {
	                setBrushByDates.apply(undefined, _toConsumableArray(dateRange));
	            }
	
	            return this;
	        };
	
	        /**
	         * Exposes the ability to force the chart to show a certain x axis grouping
	         * @param  {String} _x Desired format
	         * @return { (String|Module) }    Current format or module to chain calls
	         * @example
	         *     brush.forceAxisFormat(brush.axisTimeCombinations.HOUR_DAY)
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
	         * Exposes the constants to be used to force the x axis to respect a certain granularity
	         * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
	         * @example
	         *     brush.forceAxisFormat(brush.axisTimeCombinations.HOUR_DAY)
	         */
	        exports.axisTimeCombinations = axisTimeCombinations;
	
	        /**
	         * Gets or Sets the gradient of the chart
	         * @param  {String[]} _x Desired gradient for the graph
	         * @return { gradient | module} Current gradient or Chart module to chain calls
	         * @public
	         */
	        exports.gradient = function (_x) {
	            if (!arguments.length) {
	                return gradient;
	            }
	            gradient = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the height of the chart
	         * @param  {number} _x Desired width for the graph
	         * @return { height | module} Current height or Chart module to chain calls
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
	         * @param  {object} _x Margin object to get/set
	         * @return { margin | module} Current margin or Chart module to chain calls
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
	         * Gets or Sets the callback that will be called when the user brushes over the area
	         * @param  {Function} _x Callback to call
	         * @return {Function | module}    Current callback function or the Chart Module
	         */
	        exports.onBrush = function (_x) {
	            if (!arguments.length) return onBrush;
	            onBrush = _x;
	
	            return this;
	        };
	
	        /**
	         * Gets or Sets the width of the chart
	         * @param  {number} _x Desired width for the graph
	         * @return { width | module} Current width or Chart module to chain calls
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

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-brush/ Version 1.0.4. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports, __webpack_require__(7), __webpack_require__(31), __webpack_require__(11), __webpack_require__(1), __webpack_require__(14)) :
		typeof define === 'function' && define.amd ? define(['exports', 'd3-dispatch', 'd3-drag', 'd3-interpolate', 'd3-selection', 'd3-transition'], factory) :
		(factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3));
	}(this, (function (exports,d3Dispatch,d3Drag,d3Interpolate,d3Selection,d3Transition) { 'use strict';
	
	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	var BrushEvent = function(target, type, selection) {
	  this.target = target;
	  this.type = type;
	  this.selection = selection;
	};
	
	function nopropagation() {
	  d3Selection.event.stopImmediatePropagation();
	}
	
	var noevent = function() {
	  d3Selection.event.preventDefault();
	  d3Selection.event.stopImmediatePropagation();
	};
	
	var MODE_DRAG = {name: "drag"};
	var MODE_SPACE = {name: "space"};
	var MODE_HANDLE = {name: "handle"};
	var MODE_CENTER = {name: "center"};
	
	var X = {
	  name: "x",
	  handles: ["e", "w"].map(type),
	  input: function(x, e) { return x && [[x[0], e[0][1]], [x[1], e[1][1]]]; },
	  output: function(xy) { return xy && [xy[0][0], xy[1][0]]; }
	};
	
	var Y = {
	  name: "y",
	  handles: ["n", "s"].map(type),
	  input: function(y, e) { return y && [[e[0][0], y[0]], [e[1][0], y[1]]]; },
	  output: function(xy) { return xy && [xy[0][1], xy[1][1]]; }
	};
	
	var XY = {
	  name: "xy",
	  handles: ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(type),
	  input: function(xy) { return xy; },
	  output: function(xy) { return xy; }
	};
	
	var cursors = {
	  overlay: "crosshair",
	  selection: "move",
	  n: "ns-resize",
	  e: "ew-resize",
	  s: "ns-resize",
	  w: "ew-resize",
	  nw: "nwse-resize",
	  ne: "nesw-resize",
	  se: "nwse-resize",
	  sw: "nesw-resize"
	};
	
	var flipX = {
	  e: "w",
	  w: "e",
	  nw: "ne",
	  ne: "nw",
	  se: "sw",
	  sw: "se"
	};
	
	var flipY = {
	  n: "s",
	  s: "n",
	  nw: "sw",
	  ne: "se",
	  se: "ne",
	  sw: "nw"
	};
	
	var signsX = {
	  overlay: +1,
	  selection: +1,
	  n: null,
	  e: +1,
	  s: null,
	  w: -1,
	  nw: -1,
	  ne: +1,
	  se: +1,
	  sw: -1
	};
	
	var signsY = {
	  overlay: +1,
	  selection: +1,
	  n: -1,
	  e: null,
	  s: +1,
	  w: null,
	  nw: -1,
	  ne: -1,
	  se: +1,
	  sw: +1
	};
	
	function type(t) {
	  return {type: t};
	}
	
	// Ignore right-click, since that should open the context menu.
	function defaultFilter() {
	  return !d3Selection.event.button;
	}
	
	function defaultExtent() {
	  var svg = this.ownerSVGElement || this;
	  return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
	}
	
	// Like d3.local, but with the name “__brush” rather than auto-generated.
	function local(node) {
	  while (!node.__brush) if (!(node = node.parentNode)) return;
	  return node.__brush;
	}
	
	function empty(extent) {
	  return extent[0][0] === extent[1][0]
	      || extent[0][1] === extent[1][1];
	}
	
	function brushSelection(node) {
	  var state = node.__brush;
	  return state ? state.dim.output(state.selection) : null;
	}
	
	function brushX() {
	  return brush$1(X);
	}
	
	function brushY() {
	  return brush$1(Y);
	}
	
	var brush = function() {
	  return brush$1(XY);
	};
	
	function brush$1(dim) {
	  var extent = defaultExtent,
	      filter = defaultFilter,
	      listeners = d3Dispatch.dispatch(brush, "start", "brush", "end"),
	      handleSize = 6,
	      touchending;
	
	  function brush(group) {
	    var overlay = group
	        .property("__brush", initialize)
	      .selectAll(".overlay")
	      .data([type("overlay")]);
	
	    overlay.enter().append("rect")
	        .attr("class", "overlay")
	        .attr("pointer-events", "all")
	        .attr("cursor", cursors.overlay)
	      .merge(overlay)
	        .each(function() {
	          var extent = local(this).extent;
	          d3Selection.select(this)
	              .attr("x", extent[0][0])
	              .attr("y", extent[0][1])
	              .attr("width", extent[1][0] - extent[0][0])
	              .attr("height", extent[1][1] - extent[0][1]);
	        });
	
	    group.selectAll(".selection")
	      .data([type("selection")])
	      .enter().append("rect")
	        .attr("class", "selection")
	        .attr("cursor", cursors.selection)
	        .attr("fill", "#777")
	        .attr("fill-opacity", 0.3)
	        .attr("stroke", "#fff")
	        .attr("shape-rendering", "crispEdges");
	
	    var handle = group.selectAll(".handle")
	      .data(dim.handles, function(d) { return d.type; });
	
	    handle.exit().remove();
	
	    handle.enter().append("rect")
	        .attr("class", function(d) { return "handle handle--" + d.type; })
	        .attr("cursor", function(d) { return cursors[d.type]; });
	
	    group
	        .each(redraw)
	        .attr("fill", "none")
	        .attr("pointer-events", "all")
	        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
	        .on("mousedown.brush touchstart.brush", started);
	  }
	
	  brush.move = function(group, selection) {
	    if (group.selection) {
	      group
	          .on("start.brush", function() { emitter(this, arguments).beforestart().start(); })
	          .on("interrupt.brush end.brush", function() { emitter(this, arguments).end(); })
	          .tween("brush", function() {
	            var that = this,
	                state = that.__brush,
	                emit = emitter(that, arguments),
	                selection0 = state.selection,
	                selection1 = dim.input(typeof selection === "function" ? selection.apply(this, arguments) : selection, state.extent),
	                i = d3Interpolate.interpolate(selection0, selection1);
	
	            function tween(t) {
	              state.selection = t === 1 && empty(selection1) ? null : i(t);
	              redraw.call(that);
	              emit.brush();
	            }
	
	            return selection0 && selection1 ? tween : tween(1);
	          });
	    } else {
	      group
	          .each(function() {
	            var that = this,
	                args = arguments,
	                state = that.__brush,
	                selection1 = dim.input(typeof selection === "function" ? selection.apply(that, args) : selection, state.extent),
	                emit = emitter(that, args).beforestart();
	
	            d3Transition.interrupt(that);
	            state.selection = selection1 == null || empty(selection1) ? null : selection1;
	            redraw.call(that);
	            emit.start().brush().end();
	          });
	    }
	  };
	
	  function redraw() {
	    var group = d3Selection.select(this),
	        selection = local(this).selection;
	
	    if (selection) {
	      group.selectAll(".selection")
	          .style("display", null)
	          .attr("x", selection[0][0])
	          .attr("y", selection[0][1])
	          .attr("width", selection[1][0] - selection[0][0])
	          .attr("height", selection[1][1] - selection[0][1]);
	
	      group.selectAll(".handle")
	          .style("display", null)
	          .attr("x", function(d) { return d.type[d.type.length - 1] === "e" ? selection[1][0] - handleSize / 2 : selection[0][0] - handleSize / 2; })
	          .attr("y", function(d) { return d.type[0] === "s" ? selection[1][1] - handleSize / 2 : selection[0][1] - handleSize / 2; })
	          .attr("width", function(d) { return d.type === "n" || d.type === "s" ? selection[1][0] - selection[0][0] + handleSize : handleSize; })
	          .attr("height", function(d) { return d.type === "e" || d.type === "w" ? selection[1][1] - selection[0][1] + handleSize : handleSize; });
	    }
	
	    else {
	      group.selectAll(".selection,.handle")
	          .style("display", "none")
	          .attr("x", null)
	          .attr("y", null)
	          .attr("width", null)
	          .attr("height", null);
	    }
	  }
	
	  function emitter(that, args) {
	    return that.__brush.emitter || new Emitter(that, args);
	  }
	
	  function Emitter(that, args) {
	    this.that = that;
	    this.args = args;
	    this.state = that.__brush;
	    this.active = 0;
	  }
	
	  Emitter.prototype = {
	    beforestart: function() {
	      if (++this.active === 1) this.state.emitter = this, this.starting = true;
	      return this;
	    },
	    start: function() {
	      if (this.starting) this.starting = false, this.emit("start");
	      return this;
	    },
	    brush: function() {
	      this.emit("brush");
	      return this;
	    },
	    end: function() {
	      if (--this.active === 0) delete this.state.emitter, this.emit("end");
	      return this;
	    },
	    emit: function(type) {
	      d3Selection.customEvent(new BrushEvent(brush, type, dim.output(this.state.selection)), listeners.apply, listeners, [type, this.that, this.args]);
	    }
	  };
	
	  function started() {
	    if (d3Selection.event.touches) { if (d3Selection.event.changedTouches.length < d3Selection.event.touches.length) return noevent(); }
	    else if (touchending) return;
	    if (!filter.apply(this, arguments)) return;
	
	    var that = this,
	        type = d3Selection.event.target.__data__.type,
	        mode = (d3Selection.event.metaKey ? type = "overlay" : type) === "selection" ? MODE_DRAG : (d3Selection.event.altKey ? MODE_CENTER : MODE_HANDLE),
	        signX = dim === Y ? null : signsX[type],
	        signY = dim === X ? null : signsY[type],
	        state = local(that),
	        extent = state.extent,
	        selection = state.selection,
	        W = extent[0][0], w0, w1,
	        N = extent[0][1], n0, n1,
	        E = extent[1][0], e0, e1,
	        S = extent[1][1], s0, s1,
	        dx,
	        dy,
	        moving,
	        shifting = signX && signY && d3Selection.event.shiftKey,
	        lockX,
	        lockY,
	        point0 = d3Selection.mouse(that),
	        point = point0,
	        emit = emitter(that, arguments).beforestart();
	
	    if (type === "overlay") {
	      state.selection = selection = [
	        [w0 = dim === Y ? W : point0[0], n0 = dim === X ? N : point0[1]],
	        [e0 = dim === Y ? E : w0, s0 = dim === X ? S : n0]
	      ];
	    } else {
	      w0 = selection[0][0];
	      n0 = selection[0][1];
	      e0 = selection[1][0];
	      s0 = selection[1][1];
	    }
	
	    w1 = w0;
	    n1 = n0;
	    e1 = e0;
	    s1 = s0;
	
	    var group = d3Selection.select(that)
	        .attr("pointer-events", "none");
	
	    var overlay = group.selectAll(".overlay")
	        .attr("cursor", cursors[type]);
	
	    if (d3Selection.event.touches) {
	      group
	          .on("touchmove.brush", moved, true)
	          .on("touchend.brush touchcancel.brush", ended, true);
	    } else {
	      var view = d3Selection.select(d3Selection.event.view)
	          .on("keydown.brush", keydowned, true)
	          .on("keyup.brush", keyupped, true)
	          .on("mousemove.brush", moved, true)
	          .on("mouseup.brush", ended, true);
	
	      d3Drag.dragDisable(d3Selection.event.view);
	    }
	
	    nopropagation();
	    d3Transition.interrupt(that);
	    redraw.call(that);
	    emit.start();
	
	    function moved() {
	      var point1 = d3Selection.mouse(that);
	      if (shifting && !lockX && !lockY) {
	        if (Math.abs(point1[0] - point[0]) > Math.abs(point1[1] - point[1])) lockY = true;
	        else lockX = true;
	      }
	      point = point1;
	      moving = true;
	      noevent();
	      move();
	    }
	
	    function move() {
	      var t;
	
	      dx = point[0] - point0[0];
	      dy = point[1] - point0[1];
	
	      switch (mode) {
	        case MODE_SPACE:
	        case MODE_DRAG: {
	          if (signX) dx = Math.max(W - w0, Math.min(E - e0, dx)), w1 = w0 + dx, e1 = e0 + dx;
	          if (signY) dy = Math.max(N - n0, Math.min(S - s0, dy)), n1 = n0 + dy, s1 = s0 + dy;
	          break;
	        }
	        case MODE_HANDLE: {
	          if (signX < 0) dx = Math.max(W - w0, Math.min(E - w0, dx)), w1 = w0 + dx, e1 = e0;
	          else if (signX > 0) dx = Math.max(W - e0, Math.min(E - e0, dx)), w1 = w0, e1 = e0 + dx;
	          if (signY < 0) dy = Math.max(N - n0, Math.min(S - n0, dy)), n1 = n0 + dy, s1 = s0;
	          else if (signY > 0) dy = Math.max(N - s0, Math.min(S - s0, dy)), n1 = n0, s1 = s0 + dy;
	          break;
	        }
	        case MODE_CENTER: {
	          if (signX) w1 = Math.max(W, Math.min(E, w0 - dx * signX)), e1 = Math.max(W, Math.min(E, e0 + dx * signX));
	          if (signY) n1 = Math.max(N, Math.min(S, n0 - dy * signY)), s1 = Math.max(N, Math.min(S, s0 + dy * signY));
	          break;
	        }
	      }
	
	      if (e1 < w1) {
	        signX *= -1;
	        t = w0, w0 = e0, e0 = t;
	        t = w1, w1 = e1, e1 = t;
	        if (type in flipX) overlay.attr("cursor", cursors[type = flipX[type]]);
	      }
	
	      if (s1 < n1) {
	        signY *= -1;
	        t = n0, n0 = s0, s0 = t;
	        t = n1, n1 = s1, s1 = t;
	        if (type in flipY) overlay.attr("cursor", cursors[type = flipY[type]]);
	      }
	
	      if (state.selection) selection = state.selection; // May be set by brush.move!
	      if (lockX) w1 = selection[0][0], e1 = selection[1][0];
	      if (lockY) n1 = selection[0][1], s1 = selection[1][1];
	
	      if (selection[0][0] !== w1
	          || selection[0][1] !== n1
	          || selection[1][0] !== e1
	          || selection[1][1] !== s1) {
	        state.selection = [[w1, n1], [e1, s1]];
	        redraw.call(that);
	        emit.brush();
	      }
	    }
	
	    function ended() {
	      nopropagation();
	      if (d3Selection.event.touches) {
	        if (d3Selection.event.touches.length) return;
	        if (touchending) clearTimeout(touchending);
	        touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
	        group.on("touchmove.brush touchend.brush touchcancel.brush", null);
	      } else {
	        d3Drag.dragEnable(d3Selection.event.view, moving);
	        view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
	      }
	      group.attr("pointer-events", "all");
	      overlay.attr("cursor", cursors.overlay);
	      if (state.selection) selection = state.selection; // May be set by brush.move (on start)!
	      if (empty(selection)) state.selection = null, redraw.call(that);
	      emit.end();
	    }
	
	    function keydowned() {
	      switch (d3Selection.event.keyCode) {
	        case 16: { // SHIFT
	          shifting = signX && signY;
	          break;
	        }
	        case 18: { // ALT
	          if (mode === MODE_HANDLE) {
	            if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
	            if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
	            mode = MODE_CENTER;
	            move();
	          }
	          break;
	        }
	        case 32: { // SPACE; takes priority over ALT
	          if (mode === MODE_HANDLE || mode === MODE_CENTER) {
	            if (signX < 0) e0 = e1 - dx; else if (signX > 0) w0 = w1 - dx;
	            if (signY < 0) s0 = s1 - dy; else if (signY > 0) n0 = n1 - dy;
	            mode = MODE_SPACE;
	            overlay.attr("cursor", cursors.selection);
	            move();
	          }
	          break;
	        }
	        default: return;
	      }
	      noevent();
	    }
	
	    function keyupped() {
	      switch (d3Selection.event.keyCode) {
	        case 16: { // SHIFT
	          if (shifting) {
	            lockX = lockY = shifting = false;
	            move();
	          }
	          break;
	        }
	        case 18: { // ALT
	          if (mode === MODE_CENTER) {
	            if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;
	            if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;
	            mode = MODE_HANDLE;
	            move();
	          }
	          break;
	        }
	        case 32: { // SPACE
	          if (mode === MODE_SPACE) {
	            if (d3Selection.event.altKey) {
	              if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
	              if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
	              mode = MODE_CENTER;
	            } else {
	              if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;
	              if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;
	              mode = MODE_HANDLE;
	            }
	            overlay.attr("cursor", cursors[type]);
	            move();
	          }
	          break;
	        }
	        default: return;
	      }
	      noevent();
	    }
	  }
	
	  function initialize() {
	    var state = this.__brush || {selection: null};
	    state.extent = extent.apply(this, arguments);
	    state.dim = dim;
	    return state;
	  }
	
	  brush.extent = function(_) {
	    return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), brush) : extent;
	  };
	
	  brush.filter = function(_) {
	    return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), brush) : filter;
	  };
	
	  brush.handleSize = function(_) {
	    return arguments.length ? (handleSize = +_, brush) : handleSize;
	  };
	
	  brush.on = function() {
	    var value = listeners.on.apply(listeners, arguments);
	    return value === listeners ? brush : value;
	  };
	
	  return brush;
	}
	
	exports.brush = brush;
	exports.brushX = brushX;
	exports.brushY = brushY;
	exports.brushSelection = brushSelection;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	// https://d3js.org/d3-drag/ Version 1.1.0. Copyright 2017 Mike Bostock.
	(function (global, factory) {
		 true ? factory(exports, __webpack_require__(7), __webpack_require__(1)) :
		typeof define === 'function' && define.amd ? define(['exports', 'd3-dispatch', 'd3-selection'], factory) :
		(factory((global.d3 = global.d3 || {}),global.d3,global.d3));
	}(this, (function (exports,d3Dispatch,d3Selection) { 'use strict';
	
	function nopropagation() {
	  d3Selection.event.stopImmediatePropagation();
	}
	
	var noevent = function() {
	  d3Selection.event.preventDefault();
	  d3Selection.event.stopImmediatePropagation();
	};
	
	var nodrag = function(view) {
	  var root = view.document.documentElement,
	      selection = d3Selection.select(view).on("dragstart.drag", noevent, true);
	  if ("onselectstart" in root) {
	    selection.on("selectstart.drag", noevent, true);
	  } else {
	    root.__noselect = root.style.MozUserSelect;
	    root.style.MozUserSelect = "none";
	  }
	};
	
	function yesdrag(view, noclick) {
	  var root = view.document.documentElement,
	      selection = d3Selection.select(view).on("dragstart.drag", null);
	  if (noclick) {
	    selection.on("click.drag", noevent, true);
	    setTimeout(function() { selection.on("click.drag", null); }, 0);
	  }
	  if ("onselectstart" in root) {
	    selection.on("selectstart.drag", null);
	  } else {
	    root.style.MozUserSelect = root.__noselect;
	    delete root.__noselect;
	  }
	}
	
	var constant = function(x) {
	  return function() {
	    return x;
	  };
	};
	
	function DragEvent(target, type, subject, id, active, x, y, dx, dy, dispatch$$1) {
	  this.target = target;
	  this.type = type;
	  this.subject = subject;
	  this.identifier = id;
	  this.active = active;
	  this.x = x;
	  this.y = y;
	  this.dx = dx;
	  this.dy = dy;
	  this._ = dispatch$$1;
	}
	
	DragEvent.prototype.on = function() {
	  var value = this._.on.apply(this._, arguments);
	  return value === this._ ? this : value;
	};
	
	// Ignore right-click, since that should open the context menu.
	function defaultFilter() {
	  return !d3Selection.event.button;
	}
	
	function defaultContainer() {
	  return this.parentNode;
	}
	
	function defaultSubject(d) {
	  return d == null ? {x: d3Selection.event.x, y: d3Selection.event.y} : d;
	}
	
	var drag = function() {
	  var filter = defaultFilter,
	      container = defaultContainer,
	      subject = defaultSubject,
	      gestures = {},
	      listeners = d3Dispatch.dispatch("start", "drag", "end"),
	      active = 0,
	      mousedownx,
	      mousedowny,
	      mousemoving,
	      touchending,
	      clickDistance2 = 0;
	
	  function drag(selection) {
	    selection
	        .on("mousedown.drag", mousedowned)
	        .on("touchstart.drag", touchstarted)
	        .on("touchmove.drag", touchmoved)
	        .on("touchend.drag touchcancel.drag", touchended)
	        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	  }
	
	  function mousedowned() {
	    if (touchending || !filter.apply(this, arguments)) return;
	    var gesture = beforestart("mouse", container.apply(this, arguments), d3Selection.mouse, this, arguments);
	    if (!gesture) return;
	    d3Selection.select(d3Selection.event.view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
	    nodrag(d3Selection.event.view);
	    nopropagation();
	    mousemoving = false;
	    mousedownx = d3Selection.event.clientX;
	    mousedowny = d3Selection.event.clientY;
	    gesture("start");
	  }
	
	  function mousemoved() {
	    noevent();
	    if (!mousemoving) {
	      var dx = d3Selection.event.clientX - mousedownx, dy = d3Selection.event.clientY - mousedowny;
	      mousemoving = dx * dx + dy * dy > clickDistance2;
	    }
	    gestures.mouse("drag");
	  }
	
	  function mouseupped() {
	    d3Selection.select(d3Selection.event.view).on("mousemove.drag mouseup.drag", null);
	    yesdrag(d3Selection.event.view, mousemoving);
	    noevent();
	    gestures.mouse("end");
	  }
	
	  function touchstarted() {
	    if (!filter.apply(this, arguments)) return;
	    var touches = d3Selection.event.changedTouches,
	        c = container.apply(this, arguments),
	        n = touches.length, i, gesture;
	
	    for (i = 0; i < n; ++i) {
	      if (gesture = beforestart(touches[i].identifier, c, d3Selection.touch, this, arguments)) {
	        nopropagation();
	        gesture("start");
	      }
	    }
	  }
	
	  function touchmoved() {
	    var touches = d3Selection.event.changedTouches,
	        n = touches.length, i, gesture;
	
	    for (i = 0; i < n; ++i) {
	      if (gesture = gestures[touches[i].identifier]) {
	        noevent();
	        gesture("drag");
	      }
	    }
	  }
	
	  function touchended() {
	    var touches = d3Selection.event.changedTouches,
	        n = touches.length, i, gesture;
	
	    if (touchending) clearTimeout(touchending);
	    touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
	    for (i = 0; i < n; ++i) {
	      if (gesture = gestures[touches[i].identifier]) {
	        nopropagation();
	        gesture("end");
	      }
	    }
	  }
	
	  function beforestart(id, container, point, that, args) {
	    var p = point(container, id), s, dx, dy,
	        sublisteners = listeners.copy();
	
	    if (!d3Selection.customEvent(new DragEvent(drag, "beforestart", s, id, active, p[0], p[1], 0, 0, sublisteners), function() {
	      if ((d3Selection.event.subject = s = subject.apply(that, args)) == null) return false;
	      dx = s.x - p[0] || 0;
	      dy = s.y - p[1] || 0;
	      return true;
	    })) return;
	
	    return function gesture(type) {
	      var p0 = p, n;
	      switch (type) {
	        case "start": gestures[id] = gesture, n = active++; break;
	        case "end": delete gestures[id], --active; // nobreak
	        case "drag": p = point(container, id), n = active; break;
	      }
	      d3Selection.customEvent(new DragEvent(drag, type, s, id, n, p[0] + dx, p[1] + dy, p[0] - p0[0], p[1] - p0[1], sublisteners), sublisteners.apply, sublisteners, [type, that, args]);
	    };
	  }
	
	  drag.filter = function(_) {
	    return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), drag) : filter;
	  };
	
	  drag.container = function(_) {
	    return arguments.length ? (container = typeof _ === "function" ? _ : constant(_), drag) : container;
	  };
	
	  drag.subject = function(_) {
	    return arguments.length ? (subject = typeof _ === "function" ? _ : constant(_), drag) : subject;
	  };
	
	  drag.on = function() {
	    var value = listeners.on.apply(listeners, arguments);
	    return value === listeners ? drag : value;
	  };
	
	  drag.clickDistance = function(_) {
	    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
	  };
	
	  return drag;
	};
	
	exports.drag = drag;
	exports.dragDisable = nodrag;
	exports.dragEnable = yesdrag;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
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
/* 43 */
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
	
	    var _require = __webpack_require__(18),
	        exportChart = _require.exportChart;
	
	    var colorHelper = __webpack_require__(19);
	    var timeAxisHelper = __webpack_require__(34);
	
	    var _require2 = __webpack_require__(44),
	        isInteger = _require2.isInteger;
	
	    var _require3 = __webpack_require__(20),
	        axisTimeCombinations = _require3.axisTimeCombinations,
	        lineGradientId = _require3.lineGradientId;
	
	    var _require4 = __webpack_require__(45),
	        formatIntegerValue = _require4.formatIntegerValue,
	        formatDecimalValue = _require4.formatDecimalValue;
	
	    /**
	     * @typedef D3Selection
	     * @type {Array[]}
	     * @property {Number} length            Size of the selection
	     * @property {DOMElement} parentNode    Parent of the selection
	     */
	
	    /**
	     * @typedef lineChartDataByTopic
	     * @type {Object}
	     * @property {String} topicName    Topic name (required)
	     * @property {Number} topic        Topic identifier (required)
	     * @property {Object[]} dates      All date entries with values for that topic (required)
	     *
	     * @example
	     * {
	     *     topicName: 'San Francisco',
	     *     topic: 123,
	     *     dates: [
	     *         {
	     *             date: '2017-01-16T16:00:00-08:00',
	     *             value: 1
	     *         },
	     *         {
	     *             date: '2017-01-16T17:00:00-08:00',
	     *             value: 2
	     *         }
	     *     ]
	     * }
	     */
	
	    /**
	     * @typedef LineChartData
	     * @type {Object[]}
	     * @property {lineChartDataByTopic[]} dataByTopic  Data values to chart (required)
	     *
	     * @example
	     * {
	     *     dataByTopic: [
	     *         {
	     *             topicName: 'San Francisco',
	     *             topic: 123,
	     *             dates: [
	     *                 {
	     *                     date: '2017-01-16T16:00:00-08:00',
	     *                     value: 1
	     *                 },
	     *                 {
	     *                     date: '2017-01-16T17:00:00-08:00',
	     *                     value: 2
	     *                 }
	     *             ]
	     *         },
	     *         {
	     *             topicName: 'Other',
	     *             topic: 345,
	     *             dates: [
	     *                 {...},
	     *                 {...}
	     *             ]
	     *         }
	     *     ]
	     * }
	     */
	
	    /**
	     * Line Chart reusable API module that allows us
	     * rendering a multi line and configurable chart.
	     *
	     * @module Line
	     * @tutorial line
	     * @requires d3-array, d3-axis, d3-brush, d3-ease, d3-format, d3-scale, d3-shape, d3-selection, d3-time, d3-time-format
	     *
	     * @example
	     * let lineChart = line();
	     *
	     * lineChart
	     *     .aspectRatio(0.5)
	     *     .width(500);
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(lineChart);
	     *
	     */
	
	
	    return function line() {
	
	        var margin = {
	            top: 60,
	            right: 30,
	            bottom: 40,
	            left: 70
	        },
	            width = 960,
	            height = 500,
	            aspectRatio = null,
	            tooltipThreshold = 480,
	            svg = void 0,
	            chartWidth = void 0,
	            chartHeight = void 0,
	            xScale = void 0,
	            yScale = void 0,
	            colorScale = void 0,
	            xAxis = void 0,
	            xMonthAxis = void 0,
	            yAxis = void 0,
	            xAxisPadding = {
	            top: 0,
	            left: 15,
	            bottom: 0,
	            right: 0
	        },
	            monthAxisPadding = 28,
	            tickPadding = 5,
	            colorSchema = colorHelper.colorSchemas.britechartsColorSchema,
	            singleLineGradientColors = colorHelper.colorGradients.greenBlueGradient,
	            topicColorMap = void 0,
	            forceAxisSettings = null,
	            forcedXTicks = null,
	            forcedXFormat = null,
	            isAnimated = false,
	            ease = d3Ease.easeQuadInOut,
	            animationDuration = 1500,
	            maskingRectangle = void 0,
	            dataByTopic = void 0,
	            dataByDate = void 0,
	            dateLabel = 'date',
	            valueLabel = 'value',
	            topicLabel = 'topic',
	            topicNameLabel = 'topicName',
	            verticalTicks = 5,
	            overlay = void 0,
	            overlayColor = 'rgba(0, 0, 0, 0)',
	            verticalMarkerContainer = void 0,
	            verticalMarkerLine = void 0,
	            verticalGridLines = void 0,
	            horizontalGridLines = void 0,
	            grid = null,
	            baseLine = void 0,
	
	
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
	
	
	        // events
	        dispatcher = d3Dispatch.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');
	
	        /**
	         * This function creates the graph using the selection and data provided
	         *
	         * @param {D3Selection} _selection A d3 selection that represents
	         *                                  the container(s) where the chart(s) will be rendered
	         * @param {LineChartData} _data The data to attach and generate the chart
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                var _cleanData = cleanData(_data);
	
	                dataByTopic = _cleanData.dataByTopic;
	                dataByDate = _cleanData.dataByDate;
	
	
	                chartWidth = width - margin.left - margin.right;
	                chartHeight = height - margin.top - margin.bottom;
	
	                buildScales();
	                buildSVG(this);
	                buildAxis();
	                drawAxis();
	                buildGradient();
	                drawLines();
	                createMaskingClip();
	
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
	            var dataTimeSpan = yScale.domain()[1] - yScale.domain()[0];
	            var yTickNumber = dataTimeSpan < verticalTicks - 1 ? dataTimeSpan : verticalTicks;
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
	
	            yAxis = d3Axis.axisLeft(yScale).ticks(yTickNumber).tickSize([0]).tickPadding(tickPadding).tickFormat(getFormattedValue);
	
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
	
	            container.append('g').classed('x-axis-group', true).append('g').classed('axis x', true);
	            container.selectAll('.x-axis-group').append('g').classed('month-axis', true);
	            container.append('g').classed('y-axis-group axis y', true);
	            container.append('g').classed('grid-lines-group', true);
	            container.append('g').classed('chart-group', true);
	            container.append('g').classed('metadata-group', true);
	        }
	
	        /**
	         * Builds the gradient element to be used later
	         * @return {void}
	         */
	        function buildGradient() {
	            svg.select('.metadata-group').append('linearGradient').attr('id', lineGradientId).attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '0%').selectAll('stop').data([{ offset: '0%', color: singleLineGradientColors[0] }, { offset: '100%', color: singleLineGradientColors[1] }]).enter().append('stop').attr('offset', function (_ref5) {
	                var offset = _ref5.offset;
	                return offset;
	            }).attr('stop-color', function (_ref6) {
	                var color = _ref6.color;
	                return color;
	            });
	        }
	
	        /**
	         * Creates the x and y scales of the graph
	         * @private
	         */
	        function buildScales() {
	            var minX = d3Array.min(dataByTopic, function (_ref7) {
	                var dates = _ref7.dates;
	                return d3Array.min(dates, getDate);
	            }),
	                maxX = d3Array.max(dataByTopic, function (_ref8) {
	                var dates = _ref8.dates;
	                return d3Array.max(dates, getDate);
	            }),
	                maxY = d3Array.max(dataByTopic, function (_ref9) {
	                var dates = _ref9.dates;
	                return d3Array.max(dates, getValue);
	            }),
	                minY = d3Array.min(dataByTopic, function (_ref10) {
	                var dates = _ref10.dates;
	                return d3Array.min(dates, getValue);
	            });
	            var yScaleBottomValue = Math.abs(minY) < 0 ? Math.abs(minY) : 0;
	
	            xScale = d3Scale.scaleTime().domain([minX, maxX]).rangeRound([0, chartWidth]);
	
	            yScale = d3Scale.scaleLinear().domain([yScaleBottomValue, Math.abs(maxY)]).rangeRound([chartHeight, 0]).nice();
	
	            colorScale = d3Scale.scaleOrdinal().range(colorSchema).domain(dataByTopic.map(getTopic));
	
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
	                svg = d3Selection.select(container).append('svg').classed('britechart line-chart', true);
	
	                buildContainerGroups();
	            }
	
	            svg.attr('width', width).attr('height', height);
	        }
	
	        /**
	         * Parses dates and values into JS Date objects and numbers
	         * @param  {obj} dataByTopic    Raw data grouped by topic
	         * @return {obj}                Parsed data with dataByTopic and dataByDate
	         */
	        function cleanData(_ref11) {
	            var dataByTopic = _ref11.dataByTopic,
	                dataByDate = _ref11.dataByDate;
	
	
	            if (dataByTopic) {
	                var flatData = [];
	
	                dataByTopic.forEach(function (topic) {
	                    topic.dates.forEach(function (date) {
	                        flatData.push({
	                            topicName: topic[topicNameLabel],
	                            name: topic[topicLabel],
	                            date: date[dateLabel],
	                            value: date[valueLabel]
	                        });
	                    });
	                });
	
	                // Nest data by date and format
	                dataByDate = d3Collection.nest().key(getDate).entries(flatData).map(function (d) {
	                    return {
	                        date: new Date(d.key),
	                        topics: d.values
	                    };
	                });
	
	                // Normalize dates in keys
	                dataByDate = dataByDate.map(function (d) {
	                    d.date = new Date(d.date);
	
	                    return d;
	                });
	
	                // Normalize dataByTopic
	                dataByTopic.forEach(function (kv) {
	                    kv.dates.forEach(function (d) {
	                        d.date = new Date(d[dateLabel]);
	                        d.value = +d[valueLabel];
	                    });
	                });
	            }
	
	            return { dataByTopic: dataByTopic, dataByDate: dataByDate };
	        }
	
	        /**
	         * Removes all the datapoints highlighter circles added to the marker container
	         * @return void
	         */
	        function cleanDataPointHighlights() {
	            verticalMarkerContainer.selectAll('.circle-container').remove();
	        }
	
	        /**
	         * Creates a masking clip that would help us fake an animation if the
	         * proper flag is true
	         *
	         * @return {void}
	         */
	        function createMaskingClip() {
	            if (isAnimated) {
	                // We use a white rectangle to simulate the line drawing animation
	                maskingRectangle = svg.append('rect').attr('class', 'masking-rectangle').attr('width', width).attr('height', height).attr('x', 0).attr('y', 0);
	
	                maskingRectangle.transition().duration(animationDuration).ease(ease).attr('x', width).on('end', function () {
	                    return maskingRectangle.remove();
	                });
	            }
	        }
	
	        /**
	         * Draws the x and y axis on the svg object within their
	         * respective groups
	         * @private
	         */
	        function drawAxis() {
	            svg.select('.x-axis-group .axis.x').attr('transform', 'translate(0, ' + chartHeight + ')').call(xAxis);
	
	            if (forceAxisSettings !== 'custom') {
	                svg.select('.x-axis-group .month-axis').attr('transform', 'translate(0, ' + (chartHeight + monthAxisPadding) + ')').call(xMonthAxis);
	            }
	
	            svg.select('.y-axis-group.axis.y').transition().ease(ease).attr('transform', 'translate(' + -xAxisPadding.left + ', 0)').call(yAxis).call(adjustYTickLabels);
	        }
	
	        /**
	         * Draws the line elements within the chart group
	         * @private
	         */
	        function drawLines() {
	            var lines = void 0,
	                topicLine = void 0;
	
	            topicLine = d3Shape.line().x(function (_ref12) {
	                var date = _ref12.date;
	                return xScale(date);
	            }).y(function (_ref13) {
	                var value = _ref13.value;
	                return yScale(value);
	            });
	
	            lines = svg.select('.chart-group').selectAll('.line').data(dataByTopic);
	
	            lines.enter().append('g').attr('class', 'topic').append('path').attr('class', 'line').attr('d', function (_ref14) {
	                var dates = _ref14.dates;
	                return topicLine(dates);
	            }).style('stroke', function (d) {
	                return dataByTopic.length === 1 ? 'url(#' + lineGradientId + ')' : getLineColor(d);
	            });
	
	            lines.exit().remove();
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
	         * @inner
	         * @return void
	         */
	        function drawHoverOverlay() {
	            overlay = svg.select('.metadata-group').append('rect').attr('class', 'overlay').attr('y1', 0).attr('y2', height).attr('height', chartHeight).attr('width', chartWidth).attr('fill', overlayColor).style('display', 'none');
	        }
	
	        /**
	         * Creates the vertical marker
	         * @return void
	         */
	        function drawVerticalMarker() {
	            verticalMarkerContainer = svg.select('.metadata-group').append('g').attr('class', 'hover-marker vertical-marker-container').attr('transform', 'translate(9999, 0)');
	
	            verticalMarkerLine = verticalMarkerContainer.selectAll('path').data([{
	                x1: 0,
	                y1: 0,
	                x2: 0,
	                y2: 0
	            }]).enter().append('line').classed('vertical-marker', true).attr('x1', 0).attr('y1', chartHeight).attr('x2', 0).attr('y2', 0);
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
	         * Extract X position on the graph from a given mouse event
	         * @param  {Object} event D3 mouse event
	         * @return {Number}       Position on the x axis of the mouse
	         */
	        function getMouseXPosition(event) {
	            return d3Selection.mouse(event)[0];
	        }
	
	        /**
	         * Finds out the data entry that is closer to the given position on pixels
	         * @param  {Number} mouseX X position of the mouse
	         * @return {Object}        Data entry that is closer to that x axis position
	         */
	        function getNearestDataPoint(mouseX) {
	            var dateFromInvertedX = xScale.invert(mouseX);
	            var bisectDate = d3Array.bisector(getDate).left;
	            var dataEntryIndex = bisectDate(dataByDate, dateFromInvertedX, 1);
	            var dataEntryForXPosition = dataByDate[dataEntryIndex];
	            var previousDataEntryForXPosition = dataByDate[dataEntryIndex - 1];
	            var nearestDataPoint = void 0;
	
	            if (previousDataEntryForXPosition && dataEntryForXPosition) {
	                nearestDataPoint = findOutNearestDate(dateFromInvertedX, dataEntryForXPosition, previousDataEntryForXPosition);
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
	                dataPointXPosition = void 0;
	
	            if (dataPoint) {
	                dataPointXPosition = xScale(new Date(dataPoint.date));
	                // More verticalMarker to that datapoint
	                moveVerticalMarker(dataPointXPosition);
	                // Add data points highlighting
	                highlightDataPoints(dataPoint);
	                // Emit event with xPosition for tooltip or similar feature
	                dispatcher.call('customMouseMove', this, dataPoint, topicColorMap, dataPointXPosition);
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
	
	            dispatcher.call('customMouseOut', this, data);
	        }
	
	        /**
	         * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
	         * @private
	         */
	        function handleMouseOver(data) {
	            overlay.style('display', 'block');
	            verticalMarkerLine.classed('bc-is-active', true);
	
	            dispatcher.call('customMouseOver', this, data);
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
	                return topicColorMap[a.name] < topicColorMap[b.name];
	            });
	
	            dataPoint.topics.forEach(function (_ref15, index) {
	                var name = _ref15.name;
	
	                var marker = verticalMarkerContainer.append('g').classed('circle-container', true),
	                    circleSize = 12;
	
	                marker.append('circle').classed('data-point-highlighter', true).attr('cx', circleSize).attr('cy', 0).attr('r', 5).style('stroke', topicColorMap[name]);
	
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
	         *     line.forceAxisFormat(line.axisTimeCombinations.HOUR_DAY)
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
	         * @return { String | module} Current mode of the grid or Line Chart module to chain calls
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
	         * Gets or Sets the gradient colors of the line chart when there is only one line
	         * @param  {String[]} _x Desired color gradient for the line (array of two hexadecimal numbers)
	         * @return { (Number | Module) } Current color gradient or Line Chart module to chain calls
	         * @public
	         */
	        exports.lineGradient = function (_x) {
	            if (!arguments.length) {
	                return singleLineGradientColors;
	            }
	            singleLineGradientColors = _x;
	
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
	         * Gets or Sets the topicLabel of the chart
	         * @param  {Number} _x Desired topicLabel for the graph
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
	        exports.exportChart = function (filename, title) {
	            exportChart.call(exports, svg, filename, title);
	        };
	
	        /**
	         * Exposes an 'on' method that acts as a bridge with the event dispatcher
	         * We are going to expose this events:
	         * customMouseHover, customMouseMove and customMouseOut
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
	         *     line.forceAxisFormat(line.axisTimeCombinations.HOUR_DAY)
	         */
	        exports.axisTimeCombinations = axisTimeCombinations;
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var _ = __webpack_require__(26),
	        jsonAllDatas = __webpack_require__(48),
	        jsonFiveTopics = __webpack_require__(49),
	        jsonOneSource = __webpack_require__(50),
	        jsonMultiMonthValueRange = __webpack_require__(51),
	        jsonHourDateRange = __webpack_require__(52),
	        jsonSmallValueRange = __webpack_require__(53);
	
	    function LineDataBuilder(config) {
	        this.Klass = LineDataBuilder;
	
	        this.config = _.defaults({}, config);
	
	        this.with5Topics = function () {
	            var attributes = _.extend({}, this.config, jsonFiveTopics);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withOneSource = function () {
	            var attributes = _.extend({}, this.config, jsonOneSource);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withSmallValueRange = function () {
	            var attributes = _.extend({}, this.config, jsonSmallValueRange);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withMultiMonthValueRange = function () {
	            var attributes = _.extend({}, this.config, jsonMultiMonthValueRange);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withHourDateRange = function () {
	            var attributes = _.extend({}, this.config, jsonHourDateRange);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withAllDatas = function () {
	            var attributes = _.extend({}, this.config, jsonAllDatas);
	
	            return new this.Klass(attributes);
	        };
	
	        /**
	         * Sets the path for fetching the data
	         * @param  {string} path Desired path for test data
	         * @return {LineDataBuilder}      Builder object
	         */
	        this.withPath = function (path) {
	            var attributes = _.extend({}, this.config, {
	                jsonURL: path
	            });
	
	            return new this.Klass(attributes);
	        };
	
	        this.build = function () {
	            return this.config;
	        };
	    }
	
	    return {
	        LineDataBuilder: LineDataBuilder
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"topicName": "Sales",
				"topic": -1,
				"value": 15,
				"date": "2015-12-30T00:00:00-08:00"
			},
			{
				"topicName": "Sales",
				"topic": -1,
				"value": 16,
				"date": "2015-12-31T00:00:00-08:00"
			},
			{
				"topicName": "Sales",
				"topic": -1,
				"value": 15,
				"date": "2016-01-01T00:00:00-08:00"
			},
			{
				"topicName": "Sales",
				"topic": -1,
				"value": 18,
				"date": "2016-01-02T00:00:00-08:00"
			},
			{
				"topicName": "Sales",
				"topic": -1,
				"value": 16,
				"date": "2016-01-03T00:00:00-08:00"
			}
		],
		"dataByTopic": [
			{
				"topic": -1,
				"topicName": "Sales",
				"dates": [
					{
						"value": 15,
						"date": "2015-12-30T00:00:00-08:00"
					},
					{
						"value": 16,
						"date": "2015-12-31T00:00:00-08:00"
					},
					{
						"value": 15,
						"date": "2016-01-01T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-02T00:00:00-08:00"
					},
					{
						"value": 16,
						"date": "2016-01-03T00:00:00-08:00"
					},
					{
						"value": 16,
						"date": "2016-01-04T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-05T00:00:00-08:00"
					},
					{
						"value": 15,
						"date": "2016-01-06T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-07T00:00:00-08:00"
					},
					{
						"value": 21,
						"date": "2016-01-08T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-09T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-10T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-11T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-12T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-13T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-14T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-15T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-16T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-17T00:00:00-08:00"
					},
					{
						"value": 20,
						"date": "2016-01-18T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-19T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-20T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-21T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-22T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-23T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-24T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-25T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-26T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-27T00:00:00-08:00"
					},
					{
						"value": 21,
						"date": "2016-01-28T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-29T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-30T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-01-31T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-01T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-02T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-03T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-04T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-05T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-06T00:00:00-08:00"
					},
					{
						"value": 20,
						"date": "2016-02-07T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-08T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-09T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-10T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-11T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-12T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-13T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-14T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-15T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-16T00:00:00-08:00"
					},
					{
						"value": 21,
						"date": "2016-02-17T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-18T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-19T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-20T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-21T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-22T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-23T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-24T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-25T00:00:00-08:00"
					},
					{
						"value": 18,
						"date": "2016-02-26T00:00:00-08:00"
					},
					{
						"value": 20,
						"date": "2016-02-27T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-02-28T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-02-29T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-01T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-02T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-03T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-04T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-05T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-06T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-07T00:00:00-08:00"
					},
					{
						"value": 20,
						"date": "2016-03-08T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-09T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-10T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-11T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-12T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-13T00:00:00-08:00"
					},
					{
						"value": 17,
						"date": "2016-03-14T00:00:00-07:00"
					},
					{
						"value": 17,
						"date": "2016-03-15T00:00:00-07:00"
					},
					{
						"value": 17,
						"date": "2016-03-16T00:00:00-07:00"
					},
					{
						"value": 17,
						"date": "2016-03-17T00:00:00-07:00"
					},
					{
						"value": 20,
						"date": "2016-03-18T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-19T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-20T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-21T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-22T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-23T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-24T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-25T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-26T00:00:00-07:00"
					},
					{
						"value": 18,
						"date": "2016-03-27T00:00:00-07:00"
					},
					{
						"value": 30,
						"date": "2016-03-28T00:00:00-07:00"
					}
				]
			}
		]
	};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	module.exports = {
		"dataByTopic": [
			{
				"topic": 103,
				"dates": [
					{
						"date": "27-Jun-15",
						"value": 1,
						"fullDate": "2015-06-27T07:00:00.000Z"
					},
					{
						"date": "28-Jun-15",
						"value": 1,
						"fullDate": "2015-06-28T07:00:00.000Z"
					},
					{
						"date": "29-Jun-15",
						"value": 4,
						"fullDate": "2015-06-29T07:00:00.000Z"
					},
					{
						"date": "30-Jun-15",
						"value": 2,
						"fullDate": "2015-06-30T07:00:00.000Z"
					},
					{
						"date": "1-Jul-15",
						"value": 3,
						"fullDate": "2015-07-01T07:00:00.000Z"
					},
					{
						"date": "2-Jul-15",
						"value": 3,
						"fullDate": "2015-07-02T07:00:00.000Z"
					},
					{
						"date": "3-Jul-15",
						"value": 0,
						"fullDate": "2015-07-03T07:00:00.000Z"
					},
					{
						"date": "4-Jul-15",
						"value": 3,
						"fullDate": "2015-07-04T07:00:00.000Z"
					},
					{
						"date": "5-Jul-15",
						"value": 1,
						"fullDate": "2015-07-05T07:00:00.000Z"
					},
					{
						"date": "6-Jul-15",
						"value": 2,
						"fullDate": "2015-07-06T07:00:00.000Z"
					},
					{
						"date": "7-Jul-15",
						"value": 0,
						"fullDate": "2015-07-07T07:00:00.000Z"
					},
					{
						"date": "8-Jul-15",
						"value": 2,
						"fullDate": "2015-07-08T07:00:00.000Z"
					},
					{
						"date": "9-Jul-15",
						"value": 1,
						"fullDate": "2015-07-09T07:00:00.000Z"
					},
					{
						"date": "10-Jul-15",
						"value": 4,
						"fullDate": "2015-07-10T07:00:00.000Z"
					},
					{
						"date": "11-Jul-15",
						"value": 2,
						"fullDate": "2015-07-11T07:00:00.000Z"
					},
					{
						"date": "12-Jul-15",
						"value": 1,
						"fullDate": "2015-07-12T07:00:00.000Z"
					},
					{
						"date": "13-Jul-15",
						"value": 6,
						"fullDate": "2015-07-13T07:00:00.000Z"
					},
					{
						"date": "14-Jul-15",
						"value": 5,
						"fullDate": "2015-07-14T07:00:00.000Z"
					},
					{
						"date": "15-Jul-15",
						"value": 2,
						"fullDate": "2015-07-15T07:00:00.000Z"
					},
					{
						"date": "16-Jul-15",
						"value": 7,
						"fullDate": "2015-07-16T07:00:00.000Z"
					},
					{
						"date": "17-Jul-15",
						"value": 3,
						"fullDate": "2015-07-17T07:00:00.000Z"
					},
					{
						"date": "18-Jul-15",
						"value": 1,
						"fullDate": "2015-07-18T07:00:00.000Z"
					},
					{
						"date": "19-Jul-15",
						"value": 4,
						"fullDate": "2015-07-19T07:00:00.000Z"
					},
					{
						"date": "20-Jul-15",
						"value": 8,
						"fullDate": "2015-07-20T07:00:00.000Z"
					},
					{
						"date": "21-Jul-15",
						"value": 4,
						"fullDate": "2015-07-21T07:00:00.000Z"
					},
					{
						"date": "22-Jul-15",
						"value": 11,
						"fullDate": "2015-07-22T07:00:00.000Z"
					},
					{
						"date": "23-Jul-15",
						"value": 7,
						"fullDate": "2015-07-23T07:00:00.000Z"
					},
					{
						"date": "24-Jul-15",
						"value": 5,
						"fullDate": "2015-07-24T07:00:00.000Z"
					},
					{
						"date": "25-Jul-15",
						"value": 5,
						"fullDate": "2015-07-25T07:00:00.000Z"
					},
					{
						"date": "26-Jul-15",
						"value": 6,
						"fullDate": "2015-07-26T07:00:00.000Z"
					},
					{
						"date": "27-Jul-15",
						"value": 16,
						"fullDate": "2015-07-27T07:00:00.000Z"
					},
					{
						"date": "28-Jul-15",
						"value": 17,
						"fullDate": "2015-07-28T07:00:00.000Z"
					},
					{
						"date": "29-Jul-15",
						"value": 15,
						"fullDate": "2015-07-29T07:00:00.000Z"
					},
					{
						"date": "30-Jul-15",
						"value": 12,
						"fullDate": "2015-07-30T07:00:00.000Z"
					},
					{
						"date": "31-Jul-15",
						"value": 0,
						"fullDate": "2015-07-31T07:00:00.000Z"
					},
					{
						"date": "1-Aug-15",
						"value": 0,
						"fullDate": "2015-08-01T07:00:00.000Z"
					},
					{
						"date": "2-Aug-15",
						"value": 0,
						"fullDate": "2015-08-02T07:00:00.000Z"
					}
				],
				"topicName": "San Francisco"
			},
			{
				"topic": 149,
				"dates": [
					{
						"date": "27-Jun-15",
						"value": 0,
						"fullDate": "2015-06-27T07:00:00.000Z"
					},
					{
						"date": "28-Jun-15",
						"value": 2,
						"fullDate": "2015-06-28T07:00:00.000Z"
					},
					{
						"date": "29-Jun-15",
						"value": 4,
						"fullDate": "2015-06-29T07:00:00.000Z"
					},
					{
						"date": "30-Jun-15",
						"value": 3,
						"fullDate": "2015-06-30T07:00:00.000Z"
					},
					{
						"date": "1-Jul-15",
						"value": 1,
						"fullDate": "2015-07-01T07:00:00.000Z"
					},
					{
						"date": "2-Jul-15",
						"value": 3,
						"fullDate": "2015-07-02T07:00:00.000Z"
					},
					{
						"date": "3-Jul-15",
						"value": 3,
						"fullDate": "2015-07-03T07:00:00.000Z"
					},
					{
						"date": "4-Jul-15",
						"value": 1,
						"fullDate": "2015-07-04T07:00:00.000Z"
					},
					{
						"date": "5-Jul-15",
						"value": 2,
						"fullDate": "2015-07-05T07:00:00.000Z"
					},
					{
						"date": "6-Jul-15",
						"value": 2,
						"fullDate": "2015-07-06T07:00:00.000Z"
					},
					{
						"date": "7-Jul-15",
						"value": 4,
						"fullDate": "2015-07-07T07:00:00.000Z"
					},
					{
						"date": "8-Jul-15",
						"value": 7,
						"fullDate": "2015-07-08T07:00:00.000Z"
					},
					{
						"date": "9-Jul-15",
						"value": 1,
						"fullDate": "2015-07-09T07:00:00.000Z"
					},
					{
						"date": "10-Jul-15",
						"value": 5,
						"fullDate": "2015-07-10T07:00:00.000Z"
					},
					{
						"date": "11-Jul-15",
						"value": 9,
						"fullDate": "2015-07-11T07:00:00.000Z"
					},
					{
						"date": "12-Jul-15",
						"value": 5,
						"fullDate": "2015-07-12T07:00:00.000Z"
					},
					{
						"date": "13-Jul-15",
						"value": 2,
						"fullDate": "2015-07-13T07:00:00.000Z"
					},
					{
						"date": "14-Jul-15",
						"value": 8,
						"fullDate": "2015-07-14T07:00:00.000Z"
					},
					{
						"date": "15-Jul-15",
						"value": 3,
						"fullDate": "2015-07-15T07:00:00.000Z"
					},
					{
						"date": "16-Jul-15",
						"value": 1,
						"fullDate": "2015-07-16T07:00:00.000Z"
					},
					{
						"date": "17-Jul-15",
						"value": 2,
						"fullDate": "2015-07-17T07:00:00.000Z"
					},
					{
						"date": "18-Jul-15",
						"value": 7,
						"fullDate": "2015-07-18T07:00:00.000Z"
					},
					{
						"date": "19-Jul-15",
						"value": 1,
						"fullDate": "2015-07-19T07:00:00.000Z"
					},
					{
						"date": "20-Jul-15",
						"value": 5,
						"fullDate": "2015-07-20T07:00:00.000Z"
					},
					{
						"date": "21-Jul-15",
						"value": 0,
						"fullDate": "2015-07-21T07:00:00.000Z"
					},
					{
						"date": "22-Jul-15",
						"value": 2,
						"fullDate": "2015-07-22T07:00:00.000Z"
					},
					{
						"date": "23-Jul-15",
						"value": 5,
						"fullDate": "2015-07-23T07:00:00.000Z"
					},
					{
						"date": "24-Jul-15",
						"value": 2,
						"fullDate": "2015-07-24T07:00:00.000Z"
					},
					{
						"date": "25-Jul-15",
						"value": 2,
						"fullDate": "2015-07-25T07:00:00.000Z"
					},
					{
						"date": "26-Jul-15",
						"value": 3,
						"fullDate": "2015-07-26T07:00:00.000Z"
					},
					{
						"date": "27-Jul-15",
						"value": 8,
						"fullDate": "2015-07-27T07:00:00.000Z"
					},
					{
						"date": "28-Jul-15",
						"value": 11,
						"fullDate": "2015-07-28T07:00:00.000Z"
					},
					{
						"date": "29-Jul-15",
						"value": 17,
						"fullDate": "2015-07-29T07:00:00.000Z"
					},
					{
						"date": "30-Jul-15",
						"value": 14,
						"fullDate": "2015-07-30T07:00:00.000Z"
					},
					{
						"date": "31-Jul-15",
						"value": 0,
						"fullDate": "2015-07-31T07:00:00.000Z"
					},
					{
						"date": "1-Aug-15",
						"value": 0,
						"fullDate": "2015-08-01T07:00:00.000Z"
					},
					{
						"date": "2-Aug-15",
						"value": 0,
						"fullDate": "2015-08-02T07:00:00.000Z"
					}
				],
				"topicName": "Unknown Location with a super hyper mega very very very long name."
			},
			{
				"topic": 60,
				"dates": [
					{
						"date": "27-Jun-15",
						"value": 0,
						"fullDate": "2015-06-27T07:00:00.000Z"
					},
					{
						"date": "28-Jun-15",
						"value": 0,
						"fullDate": "2015-06-28T07:00:00.000Z"
					},
					{
						"date": "29-Jun-15",
						"value": 18,
						"fullDate": "2015-06-29T07:00:00.000Z"
					},
					{
						"date": "30-Jun-15",
						"value": 1,
						"fullDate": "2015-06-30T07:00:00.000Z"
					},
					{
						"date": "1-Jul-15",
						"value": 6,
						"fullDate": "2015-07-01T07:00:00.000Z"
					},
					{
						"date": "2-Jul-15",
						"value": 0,
						"fullDate": "2015-07-02T07:00:00.000Z"
					},
					{
						"date": "3-Jul-15",
						"value": 0,
						"fullDate": "2015-07-03T07:00:00.000Z"
					},
					{
						"date": "4-Jul-15",
						"value": 0,
						"fullDate": "2015-07-04T07:00:00.000Z"
					},
					{
						"date": "5-Jul-15",
						"value": 0,
						"fullDate": "2015-07-05T07:00:00.000Z"
					},
					{
						"date": "6-Jul-15",
						"value": 0,
						"fullDate": "2015-07-06T07:00:00.000Z"
					},
					{
						"date": "7-Jul-15",
						"value": 15,
						"fullDate": "2015-07-07T07:00:00.000Z"
					},
					{
						"date": "8-Jul-15",
						"value": 32,
						"fullDate": "2015-07-08T07:00:00.000Z"
					},
					{
						"date": "9-Jul-15",
						"value": 0,
						"fullDate": "2015-07-09T07:00:00.000Z"
					},
					{
						"date": "10-Jul-15",
						"value": 0,
						"fullDate": "2015-07-10T07:00:00.000Z"
					},
					{
						"date": "11-Jul-15",
						"value": 0,
						"fullDate": "2015-07-11T07:00:00.000Z"
					},
					{
						"date": "12-Jul-15",
						"value": 0,
						"fullDate": "2015-07-12T07:00:00.000Z"
					},
					{
						"date": "13-Jul-15",
						"value": 3,
						"fullDate": "2015-07-13T07:00:00.000Z"
					},
					{
						"date": "14-Jul-15",
						"value": 0,
						"fullDate": "2015-07-14T07:00:00.000Z"
					},
					{
						"date": "15-Jul-15",
						"value": 0,
						"fullDate": "2015-07-15T07:00:00.000Z"
					},
					{
						"date": "16-Jul-15",
						"value": 15,
						"fullDate": "2015-07-16T07:00:00.000Z"
					},
					{
						"date": "17-Jul-15",
						"value": 0,
						"fullDate": "2015-07-17T07:00:00.000Z"
					},
					{
						"date": "18-Jul-15",
						"value": 0,
						"fullDate": "2015-07-18T07:00:00.000Z"
					},
					{
						"date": "19-Jul-15",
						"value": 0,
						"fullDate": "2015-07-19T07:00:00.000Z"
					},
					{
						"date": "20-Jul-15",
						"value": 0,
						"fullDate": "2015-07-20T07:00:00.000Z"
					},
					{
						"date": "21-Jul-15",
						"value": 0,
						"fullDate": "2015-07-21T07:00:00.000Z"
					},
					{
						"date": "22-Jul-15",
						"value": 5,
						"fullDate": "2015-07-22T07:00:00.000Z"
					},
					{
						"date": "23-Jul-15",
						"value": 0,
						"fullDate": "2015-07-23T07:00:00.000Z"
					},
					{
						"date": "24-Jul-15",
						"value": 1,
						"fullDate": "2015-07-24T07:00:00.000Z"
					},
					{
						"date": "25-Jul-15",
						"value": 0,
						"fullDate": "2015-07-25T07:00:00.000Z"
					},
					{
						"date": "26-Jul-15",
						"value": 1,
						"fullDate": "2015-07-26T07:00:00.000Z"
					},
					{
						"date": "27-Jul-15",
						"value": 0,
						"fullDate": "2015-07-27T07:00:00.000Z"
					},
					{
						"date": "28-Jul-15",
						"value": 0,
						"fullDate": "2015-07-28T07:00:00.000Z"
					},
					{
						"date": "29-Jul-15",
						"value": 3,
						"fullDate": "2015-07-29T07:00:00.000Z"
					},
					{
						"date": "30-Jul-15",
						"value": 2,
						"fullDate": "2015-07-30T07:00:00.000Z"
					},
					{
						"date": "31-Jul-15",
						"value": 0,
						"fullDate": "2015-07-31T07:00:00.000Z"
					},
					{
						"date": "1-Aug-15",
						"value": 0,
						"fullDate": "2015-08-01T07:00:00.000Z"
					},
					{
						"date": "2-Aug-15",
						"value": 0,
						"fullDate": "2015-08-02T07:00:00.000Z"
					}
				],
				"topicName": "Los Angeles"
			},
			{
				"topic": 81,
				"dates": [
					{
						"date": "27-Jun-15",
						"value": 0,
						"fullDate": "2015-06-27T07:00:00.000Z"
					},
					{
						"date": "28-Jun-15",
						"value": 0,
						"fullDate": "2015-06-28T07:00:00.000Z"
					},
					{
						"date": "29-Jun-15",
						"value": 1,
						"fullDate": "2015-06-29T07:00:00.000Z"
					},
					{
						"date": "30-Jun-15",
						"value": 0,
						"fullDate": "2015-06-30T07:00:00.000Z"
					},
					{
						"date": "1-Jul-15",
						"value": 0,
						"fullDate": "2015-07-01T07:00:00.000Z"
					},
					{
						"date": "2-Jul-15",
						"value": 0,
						"fullDate": "2015-07-02T07:00:00.000Z"
					},
					{
						"date": "3-Jul-15",
						"value": 0,
						"fullDate": "2015-07-03T07:00:00.000Z"
					},
					{
						"date": "4-Jul-15",
						"value": 0,
						"fullDate": "2015-07-04T07:00:00.000Z"
					},
					{
						"date": "5-Jul-15",
						"value": 0,
						"fullDate": "2015-07-05T07:00:00.000Z"
					},
					{
						"date": "6-Jul-15",
						"value": 0,
						"fullDate": "2015-07-06T07:00:00.000Z"
					},
					{
						"date": "7-Jul-15",
						"value": 0,
						"fullDate": "2015-07-07T07:00:00.000Z"
					},
					{
						"date": "8-Jul-15",
						"value": 0,
						"fullDate": "2015-07-08T07:00:00.000Z"
					},
					{
						"date": "9-Jul-15",
						"value": 1,
						"fullDate": "2015-07-09T07:00:00.000Z"
					},
					{
						"date": "10-Jul-15",
						"value": 0,
						"fullDate": "2015-07-10T07:00:00.000Z"
					},
					{
						"date": "11-Jul-15",
						"value": 1,
						"fullDate": "2015-07-11T07:00:00.000Z"
					},
					{
						"date": "12-Jul-15",
						"value": 1,
						"fullDate": "2015-07-12T07:00:00.000Z"
					},
					{
						"date": "13-Jul-15",
						"value": 0,
						"fullDate": "2015-07-13T07:00:00.000Z"
					},
					{
						"date": "14-Jul-15",
						"value": 2,
						"fullDate": "2015-07-14T07:00:00.000Z"
					},
					{
						"date": "15-Jul-15",
						"value": 3,
						"fullDate": "2015-07-15T07:00:00.000Z"
					},
					{
						"date": "16-Jul-15",
						"value": 0,
						"fullDate": "2015-07-16T07:00:00.000Z"
					},
					{
						"date": "17-Jul-15",
						"value": 0,
						"fullDate": "2015-07-17T07:00:00.000Z"
					},
					{
						"date": "18-Jul-15",
						"value": 0,
						"fullDate": "2015-07-18T07:00:00.000Z"
					},
					{
						"date": "19-Jul-15",
						"value": 2,
						"fullDate": "2015-07-19T07:00:00.000Z"
					},
					{
						"date": "20-Jul-15",
						"value": 7,
						"fullDate": "2015-07-20T07:00:00.000Z"
					},
					{
						"date": "21-Jul-15",
						"value": 0,
						"fullDate": "2015-07-21T07:00:00.000Z"
					},
					{
						"date": "22-Jul-15",
						"value": 1,
						"fullDate": "2015-07-22T07:00:00.000Z"
					},
					{
						"date": "23-Jul-15",
						"value": 2,
						"fullDate": "2015-07-23T07:00:00.000Z"
					},
					{
						"date": "24-Jul-15",
						"value": 0,
						"fullDate": "2015-07-24T07:00:00.000Z"
					},
					{
						"date": "25-Jul-15",
						"value": 0,
						"fullDate": "2015-07-25T07:00:00.000Z"
					},
					{
						"date": "26-Jul-15",
						"value": 0,
						"fullDate": "2015-07-26T07:00:00.000Z"
					},
					{
						"date": "27-Jul-15",
						"value": 1,
						"fullDate": "2015-07-27T07:00:00.000Z"
					},
					{
						"date": "28-Jul-15",
						"value": 2,
						"fullDate": "2015-07-28T07:00:00.000Z"
					},
					{
						"date": "29-Jul-15",
						"value": 2,
						"fullDate": "2015-07-29T07:00:00.000Z"
					},
					{
						"date": "30-Jul-15",
						"value": 6,
						"fullDate": "2015-07-30T07:00:00.000Z"
					},
					{
						"date": "31-Jul-15",
						"value": 0,
						"fullDate": "2015-07-31T07:00:00.000Z"
					},
					{
						"date": "1-Aug-15",
						"value": 0,
						"fullDate": "2015-08-01T07:00:00.000Z"
					},
					{
						"date": "2-Aug-15",
						"value": 0,
						"fullDate": "2015-08-02T07:00:00.000Z"
					}
				],
				"topicName": "Oakland"
			},
			{
				"topic": 0,
				"topicName": "Other",
				"dates": [
					{
						"date": "27-Jun-15",
						"value": 3,
						"fullDate": "2015-06-27T07:00:00.000Z"
					},
					{
						"date": "28-Jun-15",
						"value": 9,
						"fullDate": "2015-06-28T07:00:00.000Z"
					},
					{
						"date": "29-Jun-15",
						"value": 6,
						"fullDate": "2015-06-29T07:00:00.000Z"
					},
					{
						"date": "30-Jun-15",
						"value": 11,
						"fullDate": "2015-06-30T07:00:00.000Z"
					},
					{
						"date": "1-Jul-15",
						"value": 7,
						"fullDate": "2015-07-01T07:00:00.000Z"
					},
					{
						"date": "2-Jul-15",
						"value": 10,
						"fullDate": "2015-07-02T07:00:00.000Z"
					},
					{
						"date": "3-Jul-15",
						"value": 5,
						"fullDate": "2015-07-03T07:00:00.000Z"
					},
					{
						"date": "4-Jul-15",
						"value": 10,
						"fullDate": "2015-07-04T07:00:00.000Z"
					},
					{
						"date": "5-Jul-15",
						"value": 8,
						"fullDate": "2015-07-05T07:00:00.000Z"
					},
					{
						"date": "6-Jul-15",
						"value": 10,
						"fullDate": "2015-07-06T07:00:00.000Z"
					},
					{
						"date": "7-Jul-15",
						"value": 6,
						"fullDate": "2015-07-07T07:00:00.000Z"
					},
					{
						"date": "8-Jul-15",
						"value": 14,
						"fullDate": "2015-07-08T07:00:00.000Z"
					},
					{
						"date": "9-Jul-15",
						"value": 12,
						"fullDate": "2015-07-09T07:00:00.000Z"
					},
					{
						"date": "10-Jul-15",
						"value": 17,
						"fullDate": "2015-07-10T07:00:00.000Z"
					},
					{
						"date": "11-Jul-15",
						"value": 9,
						"fullDate": "2015-07-11T07:00:00.000Z"
					},
					{
						"date": "12-Jul-15",
						"value": 9,
						"fullDate": "2015-07-12T07:00:00.000Z"
					},
					{
						"date": "13-Jul-15",
						"value": 9,
						"fullDate": "2015-07-13T07:00:00.000Z"
					},
					{
						"date": "14-Jul-15",
						"value": 11,
						"fullDate": "2015-07-14T07:00:00.000Z"
					},
					{
						"date": "15-Jul-15",
						"value": 16,
						"fullDate": "2015-07-15T07:00:00.000Z"
					},
					{
						"date": "16-Jul-15",
						"value": 6,
						"fullDate": "2015-07-16T07:00:00.000Z"
					},
					{
						"date": "17-Jul-15",
						"value": 7,
						"fullDate": "2015-07-17T07:00:00.000Z"
					},
					{
						"date": "18-Jul-15",
						"value": 8,
						"fullDate": "2015-07-18T07:00:00.000Z"
					},
					{
						"date": "19-Jul-15",
						"value": 4,
						"fullDate": "2015-07-19T07:00:00.000Z"
					},
					{
						"date": "20-Jul-15",
						"value": 9,
						"fullDate": "2015-07-20T07:00:00.000Z"
					},
					{
						"date": "21-Jul-15",
						"value": 5,
						"fullDate": "2015-07-21T07:00:00.000Z"
					},
					{
						"date": "22-Jul-15",
						"value": 7,
						"fullDate": "2015-07-22T07:00:00.000Z"
					},
					{
						"date": "23-Jul-15",
						"value": 7,
						"fullDate": "2015-07-23T07:00:00.000Z"
					},
					{
						"date": "24-Jul-15",
						"value": 10,
						"fullDate": "2015-07-24T07:00:00.000Z"
					},
					{
						"date": "25-Jul-15",
						"value": 8,
						"fullDate": "2015-07-25T07:00:00.000Z"
					},
					{
						"date": "26-Jul-15",
						"value": 13,
						"fullDate": "2015-07-26T07:00:00.000Z"
					},
					{
						"date": "27-Jul-15",
						"value": 18,
						"fullDate": "2015-07-27T07:00:00.000Z"
					},
					{
						"date": "28-Jul-15",
						"value": 14,
						"fullDate": "2015-07-28T07:00:00.000Z"
					},
					{
						"date": "29-Jul-15",
						"value": 30,
						"fullDate": "2015-07-29T07:00:00.000Z"
					},
					{
						"date": "30-Jul-15",
						"value": 33,
						"fullDate": "2015-07-30T07:00:00.000Z"
					},
					{
						"date": "31-Jul-15",
						"value": 0,
						"fullDate": "2015-07-31T07:00:00.000Z"
					},
					{
						"date": "1-Aug-15",
						"value": 0,
						"fullDate": "2015-08-01T07:00:00.000Z"
					},
					{
						"date": "2-Aug-15",
						"value": 0,
						"fullDate": "2015-08-02T07:00:00.000Z"
					}
				]
			}
		],
		"dataByDate": [
			{
				"date": "2015-06-27T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 1,
						"topicName": "San Francisco"
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 149,
						"value": 0,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 3,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-06-28T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 1,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 2,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 9,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-06-29T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 18,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 1,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 4,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 4,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 6,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-06-30T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 1,
						"topicName": "Los Angeles"
					},
					{
						"name": 103,
						"value": 2,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 3,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 11,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-01T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 6,
						"topicName": "Los Angeles"
					},
					{
						"name": 103,
						"value": 3,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 1,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 7,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-02T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 3,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 3,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 10,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-03T07:00:00.000Z",
				"topics": [
					{
						"name": 149,
						"value": 3,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 0,
						"topicName": "San Francisco"
					},
					{
						"name": 0,
						"value": 5,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-04T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 3,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 1,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 10,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-05T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 1,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 2,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 8,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-06T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 2,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 2,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 10,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-07T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 15,
						"topicName": "Los Angeles"
					},
					{
						"name": 149,
						"value": 4,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 0,
						"topicName": "San Francisco"
					},
					{
						"name": 0,
						"value": 6,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-08T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 32,
						"topicName": "Los Angeles"
					},
					{
						"name": 103,
						"value": 2,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 7,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 14,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-09T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 1,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 1,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 1,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 12,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-10T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 4,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 5,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 17,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-11T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 1,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 2,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 9,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 9,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-12T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 1,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 1,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 5,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 9,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-13T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 3,
						"topicName": "Los Angeles"
					},
					{
						"name": 103,
						"value": 6,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 2,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 9,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-14T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 2,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 5,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 8,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 11,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-15T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 3,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 2,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 3,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 16,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-16T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 15,
						"topicName": "Los Angeles"
					},
					{
						"name": 103,
						"value": 7,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 1,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 6,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-17T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 3,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 2,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 7,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-18T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 1,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 7,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 8,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-19T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 2,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 4,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 1,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 4,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-20T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 7,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 8,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 5,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 9,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-21T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 4,
						"topicName": "San Francisco"
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 149,
						"value": 0,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 5,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-22T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 5,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 1,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 11,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 2,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 7,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-23T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 2,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 7,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 5,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 7,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-24T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 1,
						"topicName": "Los Angeles"
					},
					{
						"name": 103,
						"value": 5,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 2,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 10,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-25T07:00:00.000Z",
				"topics": [
					{
						"name": 103,
						"value": 5,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 2,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 8,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-26T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 1,
						"topicName": "Los Angeles"
					},
					{
						"name": 103,
						"value": 6,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 3,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 0,
						"value": 13,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-27T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 1,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 16,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 8,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 18,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-28T07:00:00.000Z",
				"topics": [
					{
						"name": 81,
						"value": 2,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 17,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 11,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 0,
						"value": 14,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-29T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 3,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 2,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 15,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 17,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 30,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-30T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 2,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 6,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 12,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 14,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 33,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-07-31T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 0,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 0,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 0,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-08-01T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 0,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 0,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 0,
						"topicName": "Other"
					}
				]
			},
			{
				"date": "2015-08-02T07:00:00.000Z",
				"topics": [
					{
						"name": 60,
						"value": 0,
						"topicName": "Los Angeles"
					},
					{
						"name": 81,
						"value": 0,
						"topicName": "Oakland"
					},
					{
						"name": 103,
						"value": 0,
						"topicName": "San Francisco"
					},
					{
						"name": 149,
						"value": 0,
						"topicName": "Unknown Location with a super hyper mega very very very long name."
					},
					{
						"name": 0,
						"value": 0,
						"topicName": "Other"
					}
				]
			}
		]
	};

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	module.exports = {
		"dataByTopic": [
			{
				"topic": -1,
				"topicName": "Quantity",
				"dates": [
					{
						"date": "31-Jul-16",
						"value": 0,
						"fullDate": "2016-07-31T00:00:00-07:00"
					},
					{
						"date": "1-Aug-16",
						"value": 0,
						"fullDate": "2016-08-01T00:00:00-07:00"
					},
					{
						"date": "2-Aug-16",
						"value": 3,
						"fullDate": "2016-08-02T00:00:00-07:00"
					},
					{
						"date": "3-Aug-16",
						"value": 1,
						"fullDate": "2016-08-03T00:00:00-07:00"
					},
					{
						"date": "4-Aug-16",
						"value": 3,
						"fullDate": "2016-08-04T00:00:00-07:00"
					},
					{
						"date": "5-Aug-16",
						"value": 3,
						"fullDate": "2016-08-05T00:00:00-07:00"
					},
					{
						"date": "6-Aug-16",
						"value": 0,
						"fullDate": "2016-08-06T00:00:00-07:00"
					},
					{
						"date": "7-Aug-16",
						"value": 1,
						"fullDate": "2016-08-07T00:00:00-07:00"
					},
					{
						"date": "8-Aug-16",
						"value": 1,
						"fullDate": "2016-08-08T00:00:00-07:00"
					},
					{
						"date": "9-Aug-16",
						"value": 0,
						"fullDate": "2016-08-09T00:00:00-07:00"
					},
					{
						"date": "10-Aug-16",
						"value": 3,
						"fullDate": "2016-08-10T00:00:00-07:00"
					},
					{
						"date": "11-Aug-16",
						"value": 4,
						"fullDate": "2016-08-11T00:00:00-07:00"
					},
					{
						"date": "12-Aug-16",
						"value": 4,
						"fullDate": "2016-08-12T00:00:00-07:00"
					},
					{
						"date": "13-Aug-16",
						"value": 2,
						"fullDate": "2016-08-13T00:00:00-07:00"
					},
					{
						"date": "14-Aug-16",
						"value": 3,
						"fullDate": "2016-08-14T00:00:00-07:00"
					},
					{
						"date": "15-Aug-16",
						"value": 0,
						"fullDate": "2016-08-15T00:00:00-07:00"
					},
					{
						"date": "16-Aug-16",
						"value": 1,
						"fullDate": "2016-08-16T00:00:00-07:00"
					},
					{
						"date": "17-Aug-16",
						"value": 0,
						"fullDate": "2016-08-17T00:00:00-07:00"
					},
					{
						"date": "18-Aug-16",
						"value": 2,
						"fullDate": "2016-08-18T00:00:00-07:00"
					},
					{
						"date": "19-Aug-16",
						"value": 5,
						"fullDate": "2016-08-19T00:00:00-07:00"
					},
					{
						"date": "20-Aug-16",
						"value": 1,
						"fullDate": "2016-08-20T00:00:00-07:00"
					},
					{
						"date": "21-Aug-16",
						"value": 2,
						"fullDate": "2016-08-21T00:00:00-07:00"
					},
					{
						"date": "22-Aug-16",
						"value": 9,
						"fullDate": "2016-08-22T00:00:00-07:00"
					},
					{
						"date": "23-Aug-16",
						"value": 4,
						"fullDate": "2016-08-23T00:00:00-07:00"
					},
					{
						"date": "24-Aug-16",
						"value": 3,
						"fullDate": "2016-08-24T00:00:00-07:00"
					},
					{
						"date": "25-Aug-16",
						"value": 2,
						"fullDate": "2016-08-25T00:00:00-07:00"
					},
					{
						"date": "26-Aug-16",
						"value": 5,
						"fullDate": "2016-08-26T00:00:00-07:00"
					}
				]
			}
		]
	};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	module.exports = {
		"dataByTopic": [
			{
				"topic": -1,
				"topicName": "Quantity",
				"dates": [
					{
						"date": 1422000000000,
						"value": 0,
						"fullDate": "2015-01-23T03:00:00-05:00"
					},
					{
						"date": 1422086400000,
						"value": 0,
						"fullDate": "2015-01-24T03:00:00-05:00"
					},
					{
						"date": 1422172800000,
						"value": 0,
						"fullDate": "2015-01-25T03:00:00-05:00"
					},
					{
						"date": 1422259200000,
						"value": 0,
						"fullDate": "2015-01-26T03:00:00-05:00"
					},
					{
						"date": 1422345600000,
						"value": 0,
						"fullDate": "2015-01-27T03:00:00-05:00"
					},
					{
						"date": 1422432000000,
						"value": 0,
						"fullDate": "2015-01-28T03:00:00-05:00"
					},
					{
						"date": 1422518400000,
						"value": 0,
						"fullDate": "2015-01-29T03:00:00-05:00"
					},
					{
						"date": 1422604800000,
						"value": 0,
						"fullDate": "2015-01-30T03:00:00-05:00"
					},
					{
						"date": 1422691200000,
						"value": 0,
						"fullDate": "2015-01-31T03:00:00-05:00"
					},
					{
						"date": 1422777600000,
						"value": 0,
						"fullDate": "2015-02-01T03:00:00-05:00"
					},
					{
						"date": 1422864000000,
						"value": 0,
						"fullDate": "2015-02-02T03:00:00-05:00"
					},
					{
						"date": 1422950400000,
						"value": 0,
						"fullDate": "2015-02-03T03:00:00-05:00"
					},
					{
						"date": 1423036800000,
						"value": 0,
						"fullDate": "2015-02-04T03:00:00-05:00"
					},
					{
						"date": 1423123200000,
						"value": 0,
						"fullDate": "2015-02-05T03:00:00-05:00"
					},
					{
						"date": 1423209600000,
						"value": 0,
						"fullDate": "2015-02-06T03:00:00-05:00"
					},
					{
						"date": 1423296000000,
						"value": 0,
						"fullDate": "2015-02-07T03:00:00-05:00"
					},
					{
						"date": 1423382400000,
						"value": 0,
						"fullDate": "2015-02-08T03:00:00-05:00"
					},
					{
						"date": 1423468800000,
						"value": 0,
						"fullDate": "2015-02-09T03:00:00-05:00"
					},
					{
						"date": 1423555200000,
						"value": 0,
						"fullDate": "2015-02-10T03:00:00-05:00"
					},
					{
						"date": 1423641600000,
						"value": 0,
						"fullDate": "2015-02-11T03:00:00-05:00"
					},
					{
						"date": 1423728000000,
						"value": 0,
						"fullDate": "2015-02-12T03:00:00-05:00"
					},
					{
						"date": 1423814400000,
						"value": 0,
						"fullDate": "2015-02-13T03:00:00-05:00"
					},
					{
						"date": 1423900800000,
						"value": 0,
						"fullDate": "2015-02-14T03:00:00-05:00"
					},
					{
						"date": 1423987200000,
						"value": 0,
						"fullDate": "2015-02-15T03:00:00-05:00"
					},
					{
						"date": 1424073600000,
						"value": 0,
						"fullDate": "2015-02-16T03:00:00-05:00"
					},
					{
						"date": 1424160000000,
						"value": 0,
						"fullDate": "2015-02-17T03:00:00-05:00"
					},
					{
						"date": 1424246400000,
						"value": 0,
						"fullDate": "2015-02-18T03:00:00-05:00"
					},
					{
						"date": 1424332800000,
						"value": 0,
						"fullDate": "2015-02-19T03:00:00-05:00"
					},
					{
						"date": 1424419200000,
						"value": 0,
						"fullDate": "2015-02-20T03:00:00-05:00"
					},
					{
						"date": 1424505600000,
						"value": 0,
						"fullDate": "2015-02-21T03:00:00-05:00"
					},
					{
						"date": 1424592000000,
						"value": 0,
						"fullDate": "2015-02-22T03:00:00-05:00"
					},
					{
						"date": 1424678400000,
						"value": 0,
						"fullDate": "2015-02-23T03:00:00-05:00"
					},
					{
						"date": 1424764800000,
						"value": 0,
						"fullDate": "2015-02-24T03:00:00-05:00"
					},
					{
						"date": 1424851200000,
						"value": 0,
						"fullDate": "2015-02-25T03:00:00-05:00"
					},
					{
						"date": 1424937600000,
						"value": 0,
						"fullDate": "2015-02-26T03:00:00-05:00"
					},
					{
						"date": 1425024000000,
						"value": 0,
						"fullDate": "2015-02-27T03:00:00-05:00"
					},
					{
						"date": 1425110400000,
						"value": 0,
						"fullDate": "2015-02-28T03:00:00-05:00"
					},
					{
						"date": 1425196800000,
						"value": 0,
						"fullDate": "2015-03-01T03:00:00-05:00"
					},
					{
						"date": 1425283200000,
						"value": 0,
						"fullDate": "2015-03-02T03:00:00-05:00"
					},
					{
						"date": 1425369600000,
						"value": 0,
						"fullDate": "2015-03-03T03:00:00-05:00"
					},
					{
						"date": 1425456000000,
						"value": 0,
						"fullDate": "2015-03-04T03:00:00-05:00"
					},
					{
						"date": 1425542400000,
						"value": 0,
						"fullDate": "2015-03-05T03:00:00-05:00"
					},
					{
						"date": 1425628800000,
						"value": 0,
						"fullDate": "2015-03-06T03:00:00-05:00"
					},
					{
						"date": 1425715200000,
						"value": 0,
						"fullDate": "2015-03-07T03:00:00-05:00"
					},
					{
						"date": 1425884400000,
						"value": 0,
						"fullDate": "2015-03-09T03:00:00-04:00"
					},
					{
						"date": 1425970800000,
						"value": 0,
						"fullDate": "2015-03-10T03:00:00-04:00"
					},
					{
						"date": 1426057200000,
						"value": 0,
						"fullDate": "2015-03-11T03:00:00-04:00"
					},
					{
						"date": 1426143600000,
						"value": 0,
						"fullDate": "2015-03-12T03:00:00-04:00"
					},
					{
						"date": 1426230000000,
						"value": 0,
						"fullDate": "2015-03-13T03:00:00-04:00"
					},
					{
						"date": 1426316400000,
						"value": 0,
						"fullDate": "2015-03-14T03:00:00-04:00"
					},
					{
						"date": 1426402800000,
						"value": 0,
						"fullDate": "2015-03-15T03:00:00-04:00"
					},
					{
						"date": 1426489200000,
						"value": 0,
						"fullDate": "2015-03-16T03:00:00-04:00"
					},
					{
						"date": 1426575600000,
						"value": 0,
						"fullDate": "2015-03-17T03:00:00-04:00"
					},
					{
						"date": 1426662000000,
						"value": 0,
						"fullDate": "2015-03-18T03:00:00-04:00"
					},
					{
						"date": 1426748400000,
						"value": 0,
						"fullDate": "2015-03-19T03:00:00-04:00"
					},
					{
						"date": 1426834800000,
						"value": 0,
						"fullDate": "2015-03-20T03:00:00-04:00"
					},
					{
						"date": 1426921200000,
						"value": 0,
						"fullDate": "2015-03-21T03:00:00-04:00"
					},
					{
						"date": 1427007600000,
						"value": 0,
						"fullDate": "2015-03-22T03:00:00-04:00"
					},
					{
						"date": 1427094000000,
						"value": 0,
						"fullDate": "2015-03-23T03:00:00-04:00"
					},
					{
						"date": 1427180400000,
						"value": 0,
						"fullDate": "2015-03-24T03:00:00-04:00"
					},
					{
						"date": 1427266800000,
						"value": 0,
						"fullDate": "2015-03-25T03:00:00-04:00"
					},
					{
						"date": 1427353200000,
						"value": 0,
						"fullDate": "2015-03-26T03:00:00-04:00"
					},
					{
						"date": 1427439600000,
						"value": 0,
						"fullDate": "2015-03-27T03:00:00-04:00"
					},
					{
						"date": 1427526000000,
						"value": 0,
						"fullDate": "2015-03-28T03:00:00-04:00"
					},
					{
						"date": 1427612400000,
						"value": 0,
						"fullDate": "2015-03-29T03:00:00-04:00"
					},
					{
						"date": 1427698800000,
						"value": 0,
						"fullDate": "2015-03-30T03:00:00-04:00"
					},
					{
						"date": 1427785200000,
						"value": 0,
						"fullDate": "2015-03-31T03:00:00-04:00"
					},
					{
						"date": 1427871600000,
						"value": 0,
						"fullDate": "2015-04-01T03:00:00-04:00"
					},
					{
						"date": 1427958000000,
						"value": 0,
						"fullDate": "2015-04-02T03:00:00-04:00"
					},
					{
						"date": 1428044400000,
						"value": 0,
						"fullDate": "2015-04-03T03:00:00-04:00"
					},
					{
						"date": 1428130800000,
						"value": 0,
						"fullDate": "2015-04-04T03:00:00-04:00"
					},
					{
						"date": 1428217200000,
						"value": 0,
						"fullDate": "2015-04-05T03:00:00-04:00"
					},
					{
						"date": 1428303600000,
						"value": 0,
						"fullDate": "2015-04-06T03:00:00-04:00"
					},
					{
						"date": 1428390000000,
						"value": 0,
						"fullDate": "2015-04-07T03:00:00-04:00"
					},
					{
						"date": 1428476400000,
						"value": 0,
						"fullDate": "2015-04-08T03:00:00-04:00"
					},
					{
						"date": 1428562800000,
						"value": 0,
						"fullDate": "2015-04-09T03:00:00-04:00"
					},
					{
						"date": 1428649200000,
						"value": 0,
						"fullDate": "2015-04-10T03:00:00-04:00"
					},
					{
						"date": 1428735600000,
						"value": 0,
						"fullDate": "2015-04-11T03:00:00-04:00"
					},
					{
						"date": 1428822000000,
						"value": 0,
						"fullDate": "2015-04-12T03:00:00-04:00"
					},
					{
						"date": 1428908400000,
						"value": 0,
						"fullDate": "2015-04-13T03:00:00-04:00"
					},
					{
						"date": 1428994800000,
						"value": 0,
						"fullDate": "2015-04-14T03:00:00-04:00"
					},
					{
						"date": 1429081200000,
						"value": 0,
						"fullDate": "2015-04-15T03:00:00-04:00"
					},
					{
						"date": 1429167600000,
						"value": 0,
						"fullDate": "2015-04-16T03:00:00-04:00"
					},
					{
						"date": 1429254000000,
						"value": 0,
						"fullDate": "2015-04-17T03:00:00-04:00"
					},
					{
						"date": 1429340400000,
						"value": 0,
						"fullDate": "2015-04-18T03:00:00-04:00"
					},
					{
						"date": 1429426800000,
						"value": 0,
						"fullDate": "2015-04-19T03:00:00-04:00"
					},
					{
						"date": 1429513200000,
						"value": 0,
						"fullDate": "2015-04-20T03:00:00-04:00"
					},
					{
						"date": 1429599600000,
						"value": 0,
						"fullDate": "2015-04-21T03:00:00-04:00"
					},
					{
						"date": 1429686000000,
						"value": 0,
						"fullDate": "2015-04-22T03:00:00-04:00"
					},
					{
						"date": 1429772400000,
						"value": 0,
						"fullDate": "2015-04-23T03:00:00-04:00"
					},
					{
						"date": 1429858800000,
						"value": 0,
						"fullDate": "2015-04-24T03:00:00-04:00"
					},
					{
						"date": 1429945200000,
						"value": 0,
						"fullDate": "2015-04-25T03:00:00-04:00"
					},
					{
						"date": 1430031600000,
						"value": 0,
						"fullDate": "2015-04-26T03:00:00-04:00"
					},
					{
						"date": 1430118000000,
						"value": 0,
						"fullDate": "2015-04-27T03:00:00-04:00"
					},
					{
						"date": 1430204400000,
						"value": 0,
						"fullDate": "2015-04-28T03:00:00-04:00"
					},
					{
						"date": 1430290800000,
						"value": 0,
						"fullDate": "2015-04-29T03:00:00-04:00"
					},
					{
						"date": 1430377200000,
						"value": 0,
						"fullDate": "2015-04-30T03:00:00-04:00"
					},
					{
						"date": 1430463600000,
						"value": 0,
						"fullDate": "2015-05-01T03:00:00-04:00"
					},
					{
						"date": 1430550000000,
						"value": 0,
						"fullDate": "2015-05-02T03:00:00-04:00"
					},
					{
						"date": 1430636400000,
						"value": 0,
						"fullDate": "2015-05-03T03:00:00-04:00"
					},
					{
						"date": 1430722800000,
						"value": 0,
						"fullDate": "2015-05-04T03:00:00-04:00"
					},
					{
						"date": 1430809200000,
						"value": 0,
						"fullDate": "2015-05-05T03:00:00-04:00"
					},
					{
						"date": 1430895600000,
						"value": 0,
						"fullDate": "2015-05-06T03:00:00-04:00"
					},
					{
						"date": 1430982000000,
						"value": 0,
						"fullDate": "2015-05-07T03:00:00-04:00"
					},
					{
						"date": 1431068400000,
						"value": 0,
						"fullDate": "2015-05-08T03:00:00-04:00"
					},
					{
						"date": 1431154800000,
						"value": 0,
						"fullDate": "2015-05-09T03:00:00-04:00"
					},
					{
						"date": 1431241200000,
						"value": 0,
						"fullDate": "2015-05-10T03:00:00-04:00"
					},
					{
						"date": 1431327600000,
						"value": 0,
						"fullDate": "2015-05-11T03:00:00-04:00"
					},
					{
						"date": 1431414000000,
						"value": 0,
						"fullDate": "2015-05-12T03:00:00-04:00"
					},
					{
						"date": 1431500400000,
						"value": 0,
						"fullDate": "2015-05-13T03:00:00-04:00"
					},
					{
						"date": 1431586800000,
						"value": 0,
						"fullDate": "2015-05-14T03:00:00-04:00"
					},
					{
						"date": 1431673200000,
						"value": 0,
						"fullDate": "2015-05-15T03:00:00-04:00"
					},
					{
						"date": 1431759600000,
						"value": 0,
						"fullDate": "2015-05-16T03:00:00-04:00"
					},
					{
						"date": 1431846000000,
						"value": 0,
						"fullDate": "2015-05-17T03:00:00-04:00"
					},
					{
						"date": 1431932400000,
						"value": 0,
						"fullDate": "2015-05-18T03:00:00-04:00"
					},
					{
						"date": 1432018800000,
						"value": 0,
						"fullDate": "2015-05-19T03:00:00-04:00"
					},
					{
						"date": 1432105200000,
						"value": 0,
						"fullDate": "2015-05-20T03:00:00-04:00"
					},
					{
						"date": 1432191600000,
						"value": 0,
						"fullDate": "2015-05-21T03:00:00-04:00"
					},
					{
						"date": 1432278000000,
						"value": 0,
						"fullDate": "2015-05-22T03:00:00-04:00"
					},
					{
						"date": 1432364400000,
						"value": 0,
						"fullDate": "2015-05-23T03:00:00-04:00"
					},
					{
						"date": 1432450800000,
						"value": 0,
						"fullDate": "2015-05-24T03:00:00-04:00"
					},
					{
						"date": 1432537200000,
						"value": 0,
						"fullDate": "2015-05-25T03:00:00-04:00"
					},
					{
						"date": 1432623600000,
						"value": 0,
						"fullDate": "2015-05-26T03:00:00-04:00"
					},
					{
						"date": 1432710000000,
						"value": 0,
						"fullDate": "2015-05-27T03:00:00-04:00"
					},
					{
						"date": 1432796400000,
						"value": 0,
						"fullDate": "2015-05-28T03:00:00-04:00"
					},
					{
						"date": 1432882800000,
						"value": 0,
						"fullDate": "2015-05-29T03:00:00-04:00"
					},
					{
						"date": 1432969200000,
						"value": 0,
						"fullDate": "2015-05-30T03:00:00-04:00"
					},
					{
						"date": 1433055600000,
						"value": 0,
						"fullDate": "2015-05-31T03:00:00-04:00"
					},
					{
						"date": 1433142000000,
						"value": 0,
						"fullDate": "2015-06-01T03:00:00-04:00"
					},
					{
						"date": 1433228400000,
						"value": 0,
						"fullDate": "2015-06-02T03:00:00-04:00"
					},
					{
						"date": 1433314800000,
						"value": 0,
						"fullDate": "2015-06-03T03:00:00-04:00"
					},
					{
						"date": 1433401200000,
						"value": 0,
						"fullDate": "2015-06-04T03:00:00-04:00"
					},
					{
						"date": 1433487600000,
						"value": 0,
						"fullDate": "2015-06-05T03:00:00-04:00"
					},
					{
						"date": 1433574000000,
						"value": 0,
						"fullDate": "2015-06-06T03:00:00-04:00"
					},
					{
						"date": 1433660400000,
						"value": 0,
						"fullDate": "2015-06-07T03:00:00-04:00"
					},
					{
						"date": 1433746800000,
						"value": 0,
						"fullDate": "2015-06-08T03:00:00-04:00"
					},
					{
						"date": 1433833200000,
						"value": 0,
						"fullDate": "2015-06-09T03:00:00-04:00"
					},
					{
						"date": 1433919600000,
						"value": 0,
						"fullDate": "2015-06-10T03:00:00-04:00"
					},
					{
						"date": 1434006000000,
						"value": 0,
						"fullDate": "2015-06-11T03:00:00-04:00"
					},
					{
						"date": 1434092400000,
						"value": 0,
						"fullDate": "2015-06-12T03:00:00-04:00"
					},
					{
						"date": 1434178800000,
						"value": 0,
						"fullDate": "2015-06-13T03:00:00-04:00"
					},
					{
						"date": 1434265200000,
						"value": 0,
						"fullDate": "2015-06-14T03:00:00-04:00"
					},
					{
						"date": 1434351600000,
						"value": 0,
						"fullDate": "2015-06-15T03:00:00-04:00"
					},
					{
						"date": 1434438000000,
						"value": 0,
						"fullDate": "2015-06-16T03:00:00-04:00"
					},
					{
						"date": 1434524400000,
						"value": 0,
						"fullDate": "2015-06-17T03:00:00-04:00"
					},
					{
						"date": 1434610800000,
						"value": 0,
						"fullDate": "2015-06-18T03:00:00-04:00"
					},
					{
						"date": 1434697200000,
						"value": 0,
						"fullDate": "2015-06-19T03:00:00-04:00"
					},
					{
						"date": 1434783600000,
						"value": 0,
						"fullDate": "2015-06-20T03:00:00-04:00"
					},
					{
						"date": 1434870000000,
						"value": 0,
						"fullDate": "2015-06-21T03:00:00-04:00"
					},
					{
						"date": 1434956400000,
						"value": 0,
						"fullDate": "2015-06-22T03:00:00-04:00"
					},
					{
						"date": 1435042800000,
						"value": 0,
						"fullDate": "2015-06-23T03:00:00-04:00"
					},
					{
						"date": 1435129200000,
						"value": 0,
						"fullDate": "2015-06-24T03:00:00-04:00"
					},
					{
						"date": 1435215600000,
						"value": 0,
						"fullDate": "2015-06-25T03:00:00-04:00"
					},
					{
						"date": 1435302000000,
						"value": 0,
						"fullDate": "2015-06-26T03:00:00-04:00"
					},
					{
						"date": 1435388400000,
						"value": 0,
						"fullDate": "2015-06-27T03:00:00-04:00"
					},
					{
						"date": 1435474800000,
						"value": 0,
						"fullDate": "2015-06-28T03:00:00-04:00"
					},
					{
						"date": 1435561200000,
						"value": 0,
						"fullDate": "2015-06-29T03:00:00-04:00"
					},
					{
						"date": 1435647600000,
						"value": 0,
						"fullDate": "2015-06-30T03:00:00-04:00"
					},
					{
						"date": 1435734000000,
						"value": 0,
						"fullDate": "2015-07-01T03:00:00-04:00"
					},
					{
						"date": 1435820400000,
						"value": 0,
						"fullDate": "2015-07-02T03:00:00-04:00"
					},
					{
						"date": 1435906800000,
						"value": 0,
						"fullDate": "2015-07-03T03:00:00-04:00"
					},
					{
						"date": 1435993200000,
						"value": 0,
						"fullDate": "2015-07-04T03:00:00-04:00"
					},
					{
						"date": 1436079600000,
						"value": 0,
						"fullDate": "2015-07-05T03:00:00-04:00"
					},
					{
						"date": 1436166000000,
						"value": 0,
						"fullDate": "2015-07-06T03:00:00-04:00"
					},
					{
						"date": 1436252400000,
						"value": 0,
						"fullDate": "2015-07-07T03:00:00-04:00"
					},
					{
						"date": 1436338800000,
						"value": 0,
						"fullDate": "2015-07-08T03:00:00-04:00"
					},
					{
						"date": 1436425200000,
						"value": 0,
						"fullDate": "2015-07-09T03:00:00-04:00"
					},
					{
						"date": 1436511600000,
						"value": 0,
						"fullDate": "2015-07-10T03:00:00-04:00"
					},
					{
						"date": 1436598000000,
						"value": 0,
						"fullDate": "2015-07-11T03:00:00-04:00"
					},
					{
						"date": 1436684400000,
						"value": 0,
						"fullDate": "2015-07-12T03:00:00-04:00"
					},
					{
						"date": 1436770800000,
						"value": 0,
						"fullDate": "2015-07-13T03:00:00-04:00"
					},
					{
						"date": 1436857200000,
						"value": 0,
						"fullDate": "2015-07-14T03:00:00-04:00"
					},
					{
						"date": 1436943600000,
						"value": 0,
						"fullDate": "2015-07-15T03:00:00-04:00"
					},
					{
						"date": 1437030000000,
						"value": 0,
						"fullDate": "2015-07-16T03:00:00-04:00"
					},
					{
						"date": 1437116400000,
						"value": 0,
						"fullDate": "2015-07-17T03:00:00-04:00"
					},
					{
						"date": 1437202800000,
						"value": 0,
						"fullDate": "2015-07-18T03:00:00-04:00"
					},
					{
						"date": 1437289200000,
						"value": 0,
						"fullDate": "2015-07-19T03:00:00-04:00"
					},
					{
						"date": 1437375600000,
						"value": 0,
						"fullDate": "2015-07-20T03:00:00-04:00"
					},
					{
						"date": 1437462000000,
						"value": 0,
						"fullDate": "2015-07-21T03:00:00-04:00"
					},
					{
						"date": 1437548400000,
						"value": 0,
						"fullDate": "2015-07-22T03:00:00-04:00"
					},
					{
						"date": 1437634800000,
						"value": 0,
						"fullDate": "2015-07-23T03:00:00-04:00"
					},
					{
						"date": 1437721200000,
						"value": 0,
						"fullDate": "2015-07-24T03:00:00-04:00"
					},
					{
						"date": 1437807600000,
						"value": 0,
						"fullDate": "2015-07-25T03:00:00-04:00"
					},
					{
						"date": 1437894000000,
						"value": 0,
						"fullDate": "2015-07-26T03:00:00-04:00"
					},
					{
						"date": 1437980400000,
						"value": 0,
						"fullDate": "2015-07-27T03:00:00-04:00"
					},
					{
						"date": 1438066800000,
						"value": 0,
						"fullDate": "2015-07-28T03:00:00-04:00"
					},
					{
						"date": 1438153200000,
						"value": 0,
						"fullDate": "2015-07-29T03:00:00-04:00"
					},
					{
						"date": 1438239600000,
						"value": 0,
						"fullDate": "2015-07-30T03:00:00-04:00"
					},
					{
						"date": 1438326000000,
						"value": 0,
						"fullDate": "2015-07-31T03:00:00-04:00"
					},
					{
						"date": 1438412400000,
						"value": 0,
						"fullDate": "2015-08-01T03:00:00-04:00"
					},
					{
						"date": 1438498800000,
						"value": 0,
						"fullDate": "2015-08-02T03:00:00-04:00"
					},
					{
						"date": 1438585200000,
						"value": 0,
						"fullDate": "2015-08-03T03:00:00-04:00"
					},
					{
						"date": 1438671600000,
						"value": 0,
						"fullDate": "2015-08-04T03:00:00-04:00"
					},
					{
						"date": 1438758000000,
						"value": 0,
						"fullDate": "2015-08-05T03:00:00-04:00"
					},
					{
						"date": 1438844400000,
						"value": 0,
						"fullDate": "2015-08-06T03:00:00-04:00"
					},
					{
						"date": 1438930800000,
						"value": 0,
						"fullDate": "2015-08-07T03:00:00-04:00"
					},
					{
						"date": 1439017200000,
						"value": 0,
						"fullDate": "2015-08-08T03:00:00-04:00"
					},
					{
						"date": 1439103600000,
						"value": 0,
						"fullDate": "2015-08-09T03:00:00-04:00"
					},
					{
						"date": 1439190000000,
						"value": 0,
						"fullDate": "2015-08-10T03:00:00-04:00"
					},
					{
						"date": 1439276400000,
						"value": 0,
						"fullDate": "2015-08-11T03:00:00-04:00"
					},
					{
						"date": 1439362800000,
						"value": 0,
						"fullDate": "2015-08-12T03:00:00-04:00"
					},
					{
						"date": 1439449200000,
						"value": 0,
						"fullDate": "2015-08-13T03:00:00-04:00"
					},
					{
						"date": 1439535600000,
						"value": 0,
						"fullDate": "2015-08-14T03:00:00-04:00"
					},
					{
						"date": 1439622000000,
						"value": 0,
						"fullDate": "2015-08-15T03:00:00-04:00"
					},
					{
						"date": 1439708400000,
						"value": 0,
						"fullDate": "2015-08-16T03:00:00-04:00"
					},
					{
						"date": 1439794800000,
						"value": 0,
						"fullDate": "2015-08-17T03:00:00-04:00"
					},
					{
						"date": 1439881200000,
						"value": 0,
						"fullDate": "2015-08-18T03:00:00-04:00"
					},
					{
						"date": 1439967600000,
						"value": 0,
						"fullDate": "2015-08-19T03:00:00-04:00"
					},
					{
						"date": 1440054000000,
						"value": 0,
						"fullDate": "2015-08-20T03:00:00-04:00"
					},
					{
						"date": 1440140400000,
						"value": 0,
						"fullDate": "2015-08-21T03:00:00-04:00"
					},
					{
						"date": 1440226800000,
						"value": 0,
						"fullDate": "2015-08-22T03:00:00-04:00"
					},
					{
						"date": 1440313200000,
						"value": 0,
						"fullDate": "2015-08-23T03:00:00-04:00"
					},
					{
						"date": 1440399600000,
						"value": 0,
						"fullDate": "2015-08-24T03:00:00-04:00"
					},
					{
						"date": 1440486000000,
						"value": 0,
						"fullDate": "2015-08-25T03:00:00-04:00"
					},
					{
						"date": 1440572400000,
						"value": 0,
						"fullDate": "2015-08-26T03:00:00-04:00"
					},
					{
						"date": 1440658800000,
						"value": 0,
						"fullDate": "2015-08-27T03:00:00-04:00"
					},
					{
						"date": 1440745200000,
						"value": 0,
						"fullDate": "2015-08-28T03:00:00-04:00"
					},
					{
						"date": 1440831600000,
						"value": 0,
						"fullDate": "2015-08-29T03:00:00-04:00"
					},
					{
						"date": 1440918000000,
						"value": 0,
						"fullDate": "2015-08-30T03:00:00-04:00"
					},
					{
						"date": 1441004400000,
						"value": 0,
						"fullDate": "2015-08-31T03:00:00-04:00"
					},
					{
						"date": 1441090800000,
						"value": 0,
						"fullDate": "2015-09-01T03:00:00-04:00"
					},
					{
						"date": 1441177200000,
						"value": 0,
						"fullDate": "2015-09-02T03:00:00-04:00"
					},
					{
						"date": 1441263600000,
						"value": 0,
						"fullDate": "2015-09-03T03:00:00-04:00"
					},
					{
						"date": 1441350000000,
						"value": 0,
						"fullDate": "2015-09-04T03:00:00-04:00"
					},
					{
						"date": 1441436400000,
						"value": 0,
						"fullDate": "2015-09-05T03:00:00-04:00"
					},
					{
						"date": 1441522800000,
						"value": 0,
						"fullDate": "2015-09-06T03:00:00-04:00"
					},
					{
						"date": 1441609200000,
						"value": 0,
						"fullDate": "2015-09-07T03:00:00-04:00"
					},
					{
						"date": 1441695600000,
						"value": 0,
						"fullDate": "2015-09-08T03:00:00-04:00"
					},
					{
						"date": 1441782000000,
						"value": 0,
						"fullDate": "2015-09-09T03:00:00-04:00"
					},
					{
						"date": 1441868400000,
						"value": 0,
						"fullDate": "2015-09-10T03:00:00-04:00"
					},
					{
						"date": 1441954800000,
						"value": 0,
						"fullDate": "2015-09-11T03:00:00-04:00"
					},
					{
						"date": 1442041200000,
						"value": 0,
						"fullDate": "2015-09-12T03:00:00-04:00"
					},
					{
						"date": 1442127600000,
						"value": 0,
						"fullDate": "2015-09-13T03:00:00-04:00"
					},
					{
						"date": 1442214000000,
						"value": 0,
						"fullDate": "2015-09-14T03:00:00-04:00"
					},
					{
						"date": 1442300400000,
						"value": 0,
						"fullDate": "2015-09-15T03:00:00-04:00"
					},
					{
						"date": 1442386800000,
						"value": 0,
						"fullDate": "2015-09-16T03:00:00-04:00"
					},
					{
						"date": 1442473200000,
						"value": 0,
						"fullDate": "2015-09-17T03:00:00-04:00"
					},
					{
						"date": 1442559600000,
						"value": 0,
						"fullDate": "2015-09-18T03:00:00-04:00"
					},
					{
						"date": 1442646000000,
						"value": 0,
						"fullDate": "2015-09-19T03:00:00-04:00"
					},
					{
						"date": 1442732400000,
						"value": 0,
						"fullDate": "2015-09-20T03:00:00-04:00"
					},
					{
						"date": 1442818800000,
						"value": 0,
						"fullDate": "2015-09-21T03:00:00-04:00"
					},
					{
						"date": 1442905200000,
						"value": 0,
						"fullDate": "2015-09-22T03:00:00-04:00"
					},
					{
						"date": 1442991600000,
						"value": 0,
						"fullDate": "2015-09-23T03:00:00-04:00"
					},
					{
						"date": 1443078000000,
						"value": 0,
						"fullDate": "2015-09-24T03:00:00-04:00"
					},
					{
						"date": 1443164400000,
						"value": 0,
						"fullDate": "2015-09-25T03:00:00-04:00"
					},
					{
						"date": 1443250800000,
						"value": 0,
						"fullDate": "2015-09-26T03:00:00-04:00"
					},
					{
						"date": 1443337200000,
						"value": 0,
						"fullDate": "2015-09-27T03:00:00-04:00"
					},
					{
						"date": 1443423600000,
						"value": 0,
						"fullDate": "2015-09-28T03:00:00-04:00"
					},
					{
						"date": 1443510000000,
						"value": 0,
						"fullDate": "2015-09-29T03:00:00-04:00"
					},
					{
						"date": 1443596400000,
						"value": 0,
						"fullDate": "2015-09-30T03:00:00-04:00"
					},
					{
						"date": 1443682800000,
						"value": 0,
						"fullDate": "2015-10-01T03:00:00-04:00"
					},
					{
						"date": 1443769200000,
						"value": 0,
						"fullDate": "2015-10-02T03:00:00-04:00"
					},
					{
						"date": 1443855600000,
						"value": 0,
						"fullDate": "2015-10-03T03:00:00-04:00"
					},
					{
						"date": 1443942000000,
						"value": 0,
						"fullDate": "2015-10-04T03:00:00-04:00"
					},
					{
						"date": 1444028400000,
						"value": 0,
						"fullDate": "2015-10-05T03:00:00-04:00"
					},
					{
						"date": 1444114800000,
						"value": 0,
						"fullDate": "2015-10-06T03:00:00-04:00"
					},
					{
						"date": 1444201200000,
						"value": 0,
						"fullDate": "2015-10-07T03:00:00-04:00"
					},
					{
						"date": 1444287600000,
						"value": 0,
						"fullDate": "2015-10-08T03:00:00-04:00"
					},
					{
						"date": 1444374000000,
						"value": 0,
						"fullDate": "2015-10-09T03:00:00-04:00"
					},
					{
						"date": 1444460400000,
						"value": 0,
						"fullDate": "2015-10-10T03:00:00-04:00"
					},
					{
						"date": 1444546800000,
						"value": 0,
						"fullDate": "2015-10-11T03:00:00-04:00"
					},
					{
						"date": 1444633200000,
						"value": 0,
						"fullDate": "2015-10-12T03:00:00-04:00"
					},
					{
						"date": 1444719600000,
						"value": 0,
						"fullDate": "2015-10-13T03:00:00-04:00"
					},
					{
						"date": 1444806000000,
						"value": 0,
						"fullDate": "2015-10-14T03:00:00-04:00"
					},
					{
						"date": 1444892400000,
						"value": 0,
						"fullDate": "2015-10-15T03:00:00-04:00"
					},
					{
						"date": 1444978800000,
						"value": 0,
						"fullDate": "2015-10-16T03:00:00-04:00"
					},
					{
						"date": 1445065200000,
						"value": 0,
						"fullDate": "2015-10-17T03:00:00-04:00"
					},
					{
						"date": 1445151600000,
						"value": 0,
						"fullDate": "2015-10-18T03:00:00-04:00"
					},
					{
						"date": 1445238000000,
						"value": 0,
						"fullDate": "2015-10-19T03:00:00-04:00"
					},
					{
						"date": 1445324400000,
						"value": 0,
						"fullDate": "2015-10-20T03:00:00-04:00"
					},
					{
						"date": 1445410800000,
						"value": 0,
						"fullDate": "2015-10-21T03:00:00-04:00"
					},
					{
						"date": 1445497200000,
						"value": 0,
						"fullDate": "2015-10-22T03:00:00-04:00"
					},
					{
						"date": 1445583600000,
						"value": 0,
						"fullDate": "2015-10-23T03:00:00-04:00"
					},
					{
						"date": 1445670000000,
						"value": 0,
						"fullDate": "2015-10-24T03:00:00-04:00"
					},
					{
						"date": 1445756400000,
						"value": 0,
						"fullDate": "2015-10-25T03:00:00-04:00"
					},
					{
						"date": 1445842800000,
						"value": 0,
						"fullDate": "2015-10-26T03:00:00-04:00"
					},
					{
						"date": 1445929200000,
						"value": 0,
						"fullDate": "2015-10-27T03:00:00-04:00"
					},
					{
						"date": 1446015600000,
						"value": 0,
						"fullDate": "2015-10-28T03:00:00-04:00"
					},
					{
						"date": 1446102000000,
						"value": 0,
						"fullDate": "2015-10-29T03:00:00-04:00"
					},
					{
						"date": 1446188400000,
						"value": 0,
						"fullDate": "2015-10-30T03:00:00-04:00"
					},
					{
						"date": 1446274800000,
						"value": 0,
						"fullDate": "2015-10-31T03:00:00-04:00"
					},
					{
						"date": 1446361200000,
						"value": 0,
						"fullDate": "2015-11-01T02:00:00-05:00"
					},
					{
						"date": 1446361200000,
						"value": 0,
						"fullDate": "2015-11-01T02:00:00-05:00"
					},
					{
						"date": 1446451200000,
						"value": 0,
						"fullDate": "2015-11-02T03:00:00-05:00"
					},
					{
						"date": 1446537600000,
						"value": 0,
						"fullDate": "2015-11-03T03:00:00-05:00"
					},
					{
						"date": 1446624000000,
						"value": 0,
						"fullDate": "2015-11-04T03:00:00-05:00"
					},
					{
						"date": 1446710400000,
						"value": 0,
						"fullDate": "2015-11-05T03:00:00-05:00"
					},
					{
						"date": 1446796800000,
						"value": 0,
						"fullDate": "2015-11-06T03:00:00-05:00"
					},
					{
						"date": 1446883200000,
						"value": 0,
						"fullDate": "2015-11-07T03:00:00-05:00"
					},
					{
						"date": 1446969600000,
						"value": 0,
						"fullDate": "2015-11-08T03:00:00-05:00"
					},
					{
						"date": 1447056000000,
						"value": 0,
						"fullDate": "2015-11-09T03:00:00-05:00"
					},
					{
						"date": 1447142400000,
						"value": 0,
						"fullDate": "2015-11-10T03:00:00-05:00"
					},
					{
						"date": 1447228800000,
						"value": 0,
						"fullDate": "2015-11-11T03:00:00-05:00"
					},
					{
						"date": 1447315200000,
						"value": 0,
						"fullDate": "2015-11-12T03:00:00-05:00"
					},
					{
						"date": 1447401600000,
						"value": 0,
						"fullDate": "2015-11-13T03:00:00-05:00"
					},
					{
						"date": 1447488000000,
						"value": 0,
						"fullDate": "2015-11-14T03:00:00-05:00"
					},
					{
						"date": 1447574400000,
						"value": 0,
						"fullDate": "2015-11-15T03:00:00-05:00"
					},
					{
						"date": 1447660800000,
						"value": 0,
						"fullDate": "2015-11-16T03:00:00-05:00"
					},
					{
						"date": 1447747200000,
						"value": 0,
						"fullDate": "2015-11-17T03:00:00-05:00"
					},
					{
						"date": 1447833600000,
						"value": 0,
						"fullDate": "2015-11-18T03:00:00-05:00"
					},
					{
						"date": 1447920000000,
						"value": 0,
						"fullDate": "2015-11-19T03:00:00-05:00"
					},
					{
						"date": 1448006400000,
						"value": 0,
						"fullDate": "2015-11-20T03:00:00-05:00"
					},
					{
						"date": 1448092800000,
						"value": 0,
						"fullDate": "2015-11-21T03:00:00-05:00"
					},
					{
						"date": 1448179200000,
						"value": 0,
						"fullDate": "2015-11-22T03:00:00-05:00"
					},
					{
						"date": 1448265600000,
						"value": 0,
						"fullDate": "2015-11-23T03:00:00-05:00"
					},
					{
						"date": 1448352000000,
						"value": 0,
						"fullDate": "2015-11-24T03:00:00-05:00"
					},
					{
						"date": 1448438400000,
						"value": 0,
						"fullDate": "2015-11-25T03:00:00-05:00"
					},
					{
						"date": 1448524800000,
						"value": 0,
						"fullDate": "2015-11-26T03:00:00-05:00"
					},
					{
						"date": 1448611200000,
						"value": 0,
						"fullDate": "2015-11-27T03:00:00-05:00"
					},
					{
						"date": 1448697600000,
						"value": 0,
						"fullDate": "2015-11-28T03:00:00-05:00"
					},
					{
						"date": 1448784000000,
						"value": 0,
						"fullDate": "2015-11-29T03:00:00-05:00"
					},
					{
						"date": 1448870400000,
						"value": 0,
						"fullDate": "2015-11-30T03:00:00-05:00"
					},
					{
						"date": 1448956800000,
						"value": 0,
						"fullDate": "2015-12-01T03:00:00-05:00"
					},
					{
						"date": 1449043200000,
						"value": 0,
						"fullDate": "2015-12-02T03:00:00-05:00"
					},
					{
						"date": 1449129600000,
						"value": 0,
						"fullDate": "2015-12-03T03:00:00-05:00"
					},
					{
						"date": 1449216000000,
						"value": 0,
						"fullDate": "2015-12-04T03:00:00-05:00"
					},
					{
						"date": 1449302400000,
						"value": 0,
						"fullDate": "2015-12-05T03:00:00-05:00"
					},
					{
						"date": 1449388800000,
						"value": 0,
						"fullDate": "2015-12-06T03:00:00-05:00"
					},
					{
						"date": 1449475200000,
						"value": 0,
						"fullDate": "2015-12-07T03:00:00-05:00"
					},
					{
						"date": 1449561600000,
						"value": 0,
						"fullDate": "2015-12-08T03:00:00-05:00"
					},
					{
						"date": 1449648000000,
						"value": 0,
						"fullDate": "2015-12-09T03:00:00-05:00"
					},
					{
						"date": 1449734400000,
						"value": 0,
						"fullDate": "2015-12-10T03:00:00-05:00"
					},
					{
						"date": 1449820800000,
						"value": 0,
						"fullDate": "2015-12-11T03:00:00-05:00"
					},
					{
						"date": 1449907200000,
						"value": 0,
						"fullDate": "2015-12-12T03:00:00-05:00"
					},
					{
						"date": 1449993600000,
						"value": 0,
						"fullDate": "2015-12-13T03:00:00-05:00"
					},
					{
						"date": 1450080000000,
						"value": 0,
						"fullDate": "2015-12-14T03:00:00-05:00"
					},
					{
						"date": 1450166400000,
						"value": 0,
						"fullDate": "2015-12-15T03:00:00-05:00"
					},
					{
						"date": 1450252800000,
						"value": 0,
						"fullDate": "2015-12-16T03:00:00-05:00"
					},
					{
						"date": 1450339200000,
						"value": 0,
						"fullDate": "2015-12-17T03:00:00-05:00"
					},
					{
						"date": 1450425600000,
						"value": 0,
						"fullDate": "2015-12-18T03:00:00-05:00"
					},
					{
						"date": 1450512000000,
						"value": 0,
						"fullDate": "2015-12-19T03:00:00-05:00"
					},
					{
						"date": 1450598400000,
						"value": 0,
						"fullDate": "2015-12-20T03:00:00-05:00"
					},
					{
						"date": 1450684800000,
						"value": 0,
						"fullDate": "2015-12-21T03:00:00-05:00"
					},
					{
						"date": 1450771200000,
						"value": 0,
						"fullDate": "2015-12-22T03:00:00-05:00"
					},
					{
						"date": 1450857600000,
						"value": 0,
						"fullDate": "2015-12-23T03:00:00-05:00"
					},
					{
						"date": 1450944000000,
						"value": 0,
						"fullDate": "2015-12-24T03:00:00-05:00"
					},
					{
						"date": 1451030400000,
						"value": 0,
						"fullDate": "2015-12-25T03:00:00-05:00"
					},
					{
						"date": 1451116800000,
						"value": 0,
						"fullDate": "2015-12-26T03:00:00-05:00"
					},
					{
						"date": 1451203200000,
						"value": 0,
						"fullDate": "2015-12-27T03:00:00-05:00"
					},
					{
						"date": 1451289600000,
						"value": 0,
						"fullDate": "2015-12-28T03:00:00-05:00"
					},
					{
						"date": 1451376000000,
						"value": 0,
						"fullDate": "2015-12-29T03:00:00-05:00"
					},
					{
						"date": 1451462400000,
						"value": 0,
						"fullDate": "2015-12-30T03:00:00-05:00"
					},
					{
						"date": 1451548800000,
						"value": 0,
						"fullDate": "2015-12-31T03:00:00-05:00"
					},
					{
						"date": 1451635200000,
						"value": 0,
						"fullDate": "2016-01-01T03:00:00-05:00"
					},
					{
						"date": 1451721600000,
						"value": 0,
						"fullDate": "2016-01-02T03:00:00-05:00"
					},
					{
						"date": 1451808000000,
						"value": 0,
						"fullDate": "2016-01-03T03:00:00-05:00"
					},
					{
						"date": 1451894400000,
						"value": 0,
						"fullDate": "2016-01-04T03:00:00-05:00"
					},
					{
						"date": 1451980800000,
						"value": 0,
						"fullDate": "2016-01-05T03:00:00-05:00"
					},
					{
						"date": 1452067200000,
						"value": 0,
						"fullDate": "2016-01-06T03:00:00-05:00"
					},
					{
						"date": 1452153600000,
						"value": 0,
						"fullDate": "2016-01-07T03:00:00-05:00"
					},
					{
						"date": 1452240000000,
						"value": 0,
						"fullDate": "2016-01-08T03:00:00-05:00"
					},
					{
						"date": 1452326400000,
						"value": 0,
						"fullDate": "2016-01-09T03:00:00-05:00"
					},
					{
						"date": 1452412800000,
						"value": 0,
						"fullDate": "2016-01-10T03:00:00-05:00"
					},
					{
						"date": 1452499200000,
						"value": 0,
						"fullDate": "2016-01-11T03:00:00-05:00"
					},
					{
						"date": 1452585600000,
						"value": 0,
						"fullDate": "2016-01-12T03:00:00-05:00"
					},
					{
						"date": 1452672000000,
						"value": 0,
						"fullDate": "2016-01-13T03:00:00-05:00"
					},
					{
						"date": 1452758400000,
						"value": 0,
						"fullDate": "2016-01-14T03:00:00-05:00"
					},
					{
						"date": 1452844800000,
						"value": 0,
						"fullDate": "2016-01-15T03:00:00-05:00"
					},
					{
						"date": 1452931200000,
						"value": 0,
						"fullDate": "2016-01-16T03:00:00-05:00"
					},
					{
						"date": 1453017600000,
						"value": 0,
						"fullDate": "2016-01-17T03:00:00-05:00"
					},
					{
						"date": 1453104000000,
						"value": 0,
						"fullDate": "2016-01-18T03:00:00-05:00"
					},
					{
						"date": 1453190400000,
						"value": 0,
						"fullDate": "2016-01-19T03:00:00-05:00"
					},
					{
						"date": 1453276800000,
						"value": 0,
						"fullDate": "2016-01-20T03:00:00-05:00"
					},
					{
						"date": 1453363200000,
						"value": 0,
						"fullDate": "2016-01-21T03:00:00-05:00"
					},
					{
						"date": 1453449600000,
						"value": 0,
						"fullDate": "2016-01-22T03:00:00-05:00"
					},
					{
						"date": 1453536000000,
						"value": 0,
						"fullDate": "2016-01-23T03:00:00-05:00"
					},
					{
						"date": 1453622400000,
						"value": 0,
						"fullDate": "2016-01-24T03:00:00-05:00"
					},
					{
						"date": 1453708800000,
						"value": 0,
						"fullDate": "2016-01-25T03:00:00-05:00"
					},
					{
						"date": 1453795200000,
						"value": 0,
						"fullDate": "2016-01-26T03:00:00-05:00"
					},
					{
						"date": 1453881600000,
						"value": 0,
						"fullDate": "2016-01-27T03:00:00-05:00"
					},
					{
						"date": 1453968000000,
						"value": 0,
						"fullDate": "2016-01-28T03:00:00-05:00"
					},
					{
						"date": 1454054400000,
						"value": 0,
						"fullDate": "2016-01-29T03:00:00-05:00"
					},
					{
						"date": 1454140800000,
						"value": 0,
						"fullDate": "2016-01-30T03:00:00-05:00"
					},
					{
						"date": 1454227200000,
						"value": 0,
						"fullDate": "2016-01-31T03:00:00-05:00"
					},
					{
						"date": 1454313600000,
						"value": 0,
						"fullDate": "2016-02-01T03:00:00-05:00"
					},
					{
						"date": 1454400000000,
						"value": 0,
						"fullDate": "2016-02-02T03:00:00-05:00"
					},
					{
						"date": 1454486400000,
						"value": 0,
						"fullDate": "2016-02-03T03:00:00-05:00"
					},
					{
						"date": 1454572800000,
						"value": 0,
						"fullDate": "2016-02-04T03:00:00-05:00"
					},
					{
						"date": 1454659200000,
						"value": 0,
						"fullDate": "2016-02-05T03:00:00-05:00"
					},
					{
						"date": 1454745600000,
						"value": 0,
						"fullDate": "2016-02-06T03:00:00-05:00"
					},
					{
						"date": 1454832000000,
						"value": 0,
						"fullDate": "2016-02-07T03:00:00-05:00"
					},
					{
						"date": 1454918400000,
						"value": 0,
						"fullDate": "2016-02-08T03:00:00-05:00"
					},
					{
						"date": 1455004800000,
						"value": 0,
						"fullDate": "2016-02-09T03:00:00-05:00"
					},
					{
						"date": 1455091200000,
						"value": 0,
						"fullDate": "2016-02-10T03:00:00-05:00"
					},
					{
						"date": 1455177600000,
						"value": 0,
						"fullDate": "2016-02-11T03:00:00-05:00"
					},
					{
						"date": 1455264000000,
						"value": 0,
						"fullDate": "2016-02-12T03:00:00-05:00"
					},
					{
						"date": 1455350400000,
						"value": 0,
						"fullDate": "2016-02-13T03:00:00-05:00"
					},
					{
						"date": 1455523200000,
						"value": 10,
						"fullDate": "2016-02-15T03:00:00-05:00"
					},
					{
						"date": 1455523200000,
						"value": 0,
						"fullDate": "2016-02-15T03:00:00-05:00"
					},
					{
						"date": 1455609600000,
						"value": 0,
						"fullDate": "2016-02-16T03:00:00-05:00"
					},
					{
						"date": 1455696000000,
						"value": 0,
						"fullDate": "2016-02-17T03:00:00-05:00"
					},
					{
						"date": 1455868800000,
						"value": 1,
						"fullDate": "2016-02-19T03:00:00-05:00"
					},
					{
						"date": 1455868800000,
						"value": 0,
						"fullDate": "2016-02-19T03:00:00-05:00"
					},
					{
						"date": 1455955200000,
						"value": 0,
						"fullDate": "2016-02-20T03:00:00-05:00"
					},
					{
						"date": 1456041600000,
						"value": 0,
						"fullDate": "2016-02-21T03:00:00-05:00"
					},
					{
						"date": 1456214400000,
						"value": 4,
						"fullDate": "2016-02-23T03:00:00-05:00"
					},
					{
						"date": 1456214400000,
						"value": 0,
						"fullDate": "2016-02-23T03:00:00-05:00"
					},
					{
						"date": 1456300800000,
						"value": 0,
						"fullDate": "2016-02-24T03:00:00-05:00"
					},
					{
						"date": 1456387200000,
						"value": 0,
						"fullDate": "2016-02-25T03:00:00-05:00"
					},
					{
						"date": 1456473600000,
						"value": 0,
						"fullDate": "2016-02-26T03:00:00-05:00"
					},
					{
						"date": 1456560000000,
						"value": 0,
						"fullDate": "2016-02-27T03:00:00-05:00"
					},
					{
						"date": 1456646400000,
						"value": 0,
						"fullDate": "2016-02-28T03:00:00-05:00"
					},
					{
						"date": 1456732800000,
						"value": 0,
						"fullDate": "2016-02-29T03:00:00-05:00"
					},
					{
						"date": 1456819200000,
						"value": 0,
						"fullDate": "2016-03-01T03:00:00-05:00"
					},
					{
						"date": 1456905600000,
						"value": 0,
						"fullDate": "2016-03-02T03:00:00-05:00"
					},
					{
						"date": 1457078400000,
						"value": 1,
						"fullDate": "2016-03-04T03:00:00-05:00"
					},
					{
						"date": 1457164800000,
						"value": 1,
						"fullDate": "2016-03-05T03:00:00-05:00"
					},
					{
						"date": 1457164800000,
						"value": 0,
						"fullDate": "2016-03-05T03:00:00-05:00"
					},
					{
						"date": 1457251200000,
						"value": 0,
						"fullDate": "2016-03-06T03:00:00-05:00"
					},
					{
						"date": 1457337600000,
						"value": 0,
						"fullDate": "2016-03-07T03:00:00-05:00"
					},
					{
						"date": 1457424000000,
						"value": 0,
						"fullDate": "2016-03-08T03:00:00-05:00"
					},
					{
						"date": 1457510400000,
						"value": 0,
						"fullDate": "2016-03-09T03:00:00-05:00"
					},
					{
						"date": 1457596800000,
						"value": 0,
						"fullDate": "2016-03-10T03:00:00-05:00"
					},
					{
						"date": 1457683200000,
						"value": 0,
						"fullDate": "2016-03-11T03:00:00-05:00"
					},
					{
						"date": 1457769600000,
						"value": 0,
						"fullDate": "2016-03-12T03:00:00-05:00"
					},
					{
						"date": 1457938800000,
						"value": 0,
						"fullDate": "2016-03-14T03:00:00-04:00"
					},
					{
						"date": 1458025200000,
						"value": 0,
						"fullDate": "2016-03-15T03:00:00-04:00"
					},
					{
						"date": 1458111600000,
						"value": 0,
						"fullDate": "2016-03-16T03:00:00-04:00"
					},
					{
						"date": 1458198000000,
						"value": 0,
						"fullDate": "2016-03-17T03:00:00-04:00"
					},
					{
						"date": 1458284400000,
						"value": 0,
						"fullDate": "2016-03-18T03:00:00-04:00"
					},
					{
						"date": 1458370800000,
						"value": 1,
						"fullDate": "2016-03-19T03:00:00-04:00"
					},
					{
						"date": 1458457200000,
						"value": 0,
						"fullDate": "2016-03-20T03:00:00-04:00"
					},
					{
						"date": 1458543600000,
						"value": 0,
						"fullDate": "2016-03-21T03:00:00-04:00"
					},
					{
						"date": 1458630000000,
						"value": 0,
						"fullDate": "2016-03-22T03:00:00-04:00"
					},
					{
						"date": 1458716400000,
						"value": 0,
						"fullDate": "2016-03-23T03:00:00-04:00"
					},
					{
						"date": 1458802800000,
						"value": 0,
						"fullDate": "2016-03-24T03:00:00-04:00"
					},
					{
						"date": 1458889200000,
						"value": 0,
						"fullDate": "2016-03-25T03:00:00-04:00"
					},
					{
						"date": 1458975600000,
						"value": 0,
						"fullDate": "2016-03-26T03:00:00-04:00"
					},
					{
						"date": 1459062000000,
						"value": 0,
						"fullDate": "2016-03-27T03:00:00-04:00"
					},
					{
						"date": 1459148400000,
						"value": 0,
						"fullDate": "2016-03-28T03:00:00-04:00"
					},
					{
						"date": 1459234800000,
						"value": 4,
						"fullDate": "2016-03-29T03:00:00-04:00"
					},
					{
						"date": 1459321200000,
						"value": 0,
						"fullDate": "2016-03-30T03:00:00-04:00"
					},
					{
						"date": 1459407600000,
						"value": 0,
						"fullDate": "2016-03-31T03:00:00-04:00"
					},
					{
						"date": 1459494000000,
						"value": 2,
						"fullDate": "2016-04-01T03:00:00-04:00"
					},
					{
						"date": 1459580400000,
						"value": 0,
						"fullDate": "2016-04-02T03:00:00-04:00"
					},
					{
						"date": 1459666800000,
						"value": 0,
						"fullDate": "2016-04-03T03:00:00-04:00"
					},
					{
						"date": 1459753200000,
						"value": 0,
						"fullDate": "2016-04-04T03:00:00-04:00"
					},
					{
						"date": 1459839600000,
						"value": 0,
						"fullDate": "2016-04-05T03:00:00-04:00"
					},
					{
						"date": 1459926000000,
						"value": 0,
						"fullDate": "2016-04-06T03:00:00-04:00"
					},
					{
						"date": 1460012400000,
						"value": 0,
						"fullDate": "2016-04-07T03:00:00-04:00"
					},
					{
						"date": 1460098800000,
						"value": 2,
						"fullDate": "2016-04-08T03:00:00-04:00"
					},
					{
						"date": 1460185200000,
						"value": 0,
						"fullDate": "2016-04-09T03:00:00-04:00"
					},
					{
						"date": 1460271600000,
						"value": 1,
						"fullDate": "2016-04-10T03:00:00-04:00"
					},
					{
						"date": 1460358000000,
						"value": 0,
						"fullDate": "2016-04-11T03:00:00-04:00"
					},
					{
						"date": 1460444400000,
						"value": 1,
						"fullDate": "2016-04-12T03:00:00-04:00"
					},
					{
						"date": 1460530800000,
						"value": 0,
						"fullDate": "2016-04-13T03:00:00-04:00"
					},
					{
						"date": 1460617200000,
						"value": 1,
						"fullDate": "2016-04-14T03:00:00-04:00"
					},
					{
						"date": 1460703600000,
						"value": 0,
						"fullDate": "2016-04-15T03:00:00-04:00"
					},
					{
						"date": 1460790000000,
						"value": 0,
						"fullDate": "2016-04-16T03:00:00-04:00"
					},
					{
						"date": 1460876400000,
						"value": 0,
						"fullDate": "2016-04-17T03:00:00-04:00"
					},
					{
						"date": 1460962800000,
						"value": 0,
						"fullDate": "2016-04-18T03:00:00-04:00"
					},
					{
						"date": 1461049200000,
						"value": 0,
						"fullDate": "2016-04-19T03:00:00-04:00"
					},
					{
						"date": 1461135600000,
						"value": 0,
						"fullDate": "2016-04-20T03:00:00-04:00"
					},
					{
						"date": 1461222000000,
						"value": 0,
						"fullDate": "2016-04-21T03:00:00-04:00"
					},
					{
						"date": 1461308400000,
						"value": 0,
						"fullDate": "2016-04-22T03:00:00-04:00"
					},
					{
						"date": 1461394800000,
						"value": 0,
						"fullDate": "2016-04-23T03:00:00-04:00"
					},
					{
						"date": 1461481200000,
						"value": 0,
						"fullDate": "2016-04-24T03:00:00-04:00"
					},
					{
						"date": 1461567600000,
						"value": 0,
						"fullDate": "2016-04-25T03:00:00-04:00"
					},
					{
						"date": 1461654000000,
						"value": 0,
						"fullDate": "2016-04-26T03:00:00-04:00"
					},
					{
						"date": 1461740400000,
						"value": 0,
						"fullDate": "2016-04-27T03:00:00-04:00"
					},
					{
						"date": 1461826800000,
						"value": 0,
						"fullDate": "2016-04-28T03:00:00-04:00"
					},
					{
						"date": 1461913200000,
						"value": 0,
						"fullDate": "2016-04-29T03:00:00-04:00"
					},
					{
						"date": 1461999600000,
						"value": 0,
						"fullDate": "2016-04-30T03:00:00-04:00"
					},
					{
						"date": 1462086000000,
						"value": 0,
						"fullDate": "2016-05-01T03:00:00-04:00"
					},
					{
						"date": 1462172400000,
						"value": 0,
						"fullDate": "2016-05-02T03:00:00-04:00"
					},
					{
						"date": 1462258800000,
						"value": 0,
						"fullDate": "2016-05-03T03:00:00-04:00"
					},
					{
						"date": 1462345200000,
						"value": 0,
						"fullDate": "2016-05-04T03:00:00-04:00"
					},
					{
						"date": 1462431600000,
						"value": 0,
						"fullDate": "2016-05-05T03:00:00-04:00"
					},
					{
						"date": 1462518000000,
						"value": 0,
						"fullDate": "2016-05-06T03:00:00-04:00"
					},
					{
						"date": 1462604400000,
						"value": 0,
						"fullDate": "2016-05-07T03:00:00-04:00"
					},
					{
						"date": 1462690800000,
						"value": 0,
						"fullDate": "2016-05-08T03:00:00-04:00"
					},
					{
						"date": 1462777200000,
						"value": 0,
						"fullDate": "2016-05-09T03:00:00-04:00"
					},
					{
						"date": 1462863600000,
						"value": 0,
						"fullDate": "2016-05-10T03:00:00-04:00"
					},
					{
						"date": 1462950000000,
						"value": 0,
						"fullDate": "2016-05-11T03:00:00-04:00"
					},
					{
						"date": 1463036400000,
						"value": 0,
						"fullDate": "2016-05-12T03:00:00-04:00"
					},
					{
						"date": 1463122800000,
						"value": 0,
						"fullDate": "2016-05-13T03:00:00-04:00"
					},
					{
						"date": 1463209200000,
						"value": 0,
						"fullDate": "2016-05-14T03:00:00-04:00"
					},
					{
						"date": 1463295600000,
						"value": 0,
						"fullDate": "2016-05-15T03:00:00-04:00"
					},
					{
						"date": 1463382000000,
						"value": 0,
						"fullDate": "2016-05-16T03:00:00-04:00"
					},
					{
						"date": 1463468400000,
						"value": 0,
						"fullDate": "2016-05-17T03:00:00-04:00"
					},
					{
						"date": 1463554800000,
						"value": 0,
						"fullDate": "2016-05-18T03:00:00-04:00"
					},
					{
						"date": 1463641200000,
						"value": 0,
						"fullDate": "2016-05-19T03:00:00-04:00"
					},
					{
						"date": 1463727600000,
						"value": 0,
						"fullDate": "2016-05-20T03:00:00-04:00"
					},
					{
						"date": 1463814000000,
						"value": 0,
						"fullDate": "2016-05-21T03:00:00-04:00"
					},
					{
						"date": 1463900400000,
						"value": 0,
						"fullDate": "2016-05-22T03:00:00-04:00"
					},
					{
						"date": 1463986800000,
						"value": 0,
						"fullDate": "2016-05-23T03:00:00-04:00"
					},
					{
						"date": 1464073200000,
						"value": 0,
						"fullDate": "2016-05-24T03:00:00-04:00"
					},
					{
						"date": 1464159600000,
						"value": 0,
						"fullDate": "2016-05-25T03:00:00-04:00"
					},
					{
						"date": 1464246000000,
						"value": 0,
						"fullDate": "2016-05-26T03:00:00-04:00"
					},
					{
						"date": 1464332400000,
						"value": 0,
						"fullDate": "2016-05-27T03:00:00-04:00"
					},
					{
						"date": 1464418800000,
						"value": 0,
						"fullDate": "2016-05-28T03:00:00-04:00"
					},
					{
						"date": 1464505200000,
						"value": 0,
						"fullDate": "2016-05-29T03:00:00-04:00"
					},
					{
						"date": 1464591600000,
						"value": 0,
						"fullDate": "2016-05-30T03:00:00-04:00"
					},
					{
						"date": 1464678000000,
						"value": 0,
						"fullDate": "2016-05-31T03:00:00-04:00"
					},
					{
						"date": 1464764400000,
						"value": 0,
						"fullDate": "2016-06-01T03:00:00-04:00"
					},
					{
						"date": 1464850800000,
						"value": 0,
						"fullDate": "2016-06-02T03:00:00-04:00"
					},
					{
						"date": 1464937200000,
						"value": 0,
						"fullDate": "2016-06-03T03:00:00-04:00"
					},
					{
						"date": 1465023600000,
						"value": 0,
						"fullDate": "2016-06-04T03:00:00-04:00"
					},
					{
						"date": 1465110000000,
						"value": 0,
						"fullDate": "2016-06-05T03:00:00-04:00"
					},
					{
						"date": 1465196400000,
						"value": 0,
						"fullDate": "2016-06-06T03:00:00-04:00"
					},
					{
						"date": 1465282800000,
						"value": 0,
						"fullDate": "2016-06-07T03:00:00-04:00"
					},
					{
						"date": 1465369200000,
						"value": 0,
						"fullDate": "2016-06-08T03:00:00-04:00"
					},
					{
						"date": 1465455600000,
						"value": 0,
						"fullDate": "2016-06-09T03:00:00-04:00"
					},
					{
						"date": 1465542000000,
						"value": 0,
						"fullDate": "2016-06-10T03:00:00-04:00"
					},
					{
						"date": 1465628400000,
						"value": 0,
						"fullDate": "2016-06-11T03:00:00-04:00"
					},
					{
						"date": 1465714800000,
						"value": 0,
						"fullDate": "2016-06-12T03:00:00-04:00"
					},
					{
						"date": 1465801200000,
						"value": 0,
						"fullDate": "2016-06-13T03:00:00-04:00"
					},
					{
						"date": 1465887600000,
						"value": 0,
						"fullDate": "2016-06-14T03:00:00-04:00"
					},
					{
						"date": 1465974000000,
						"value": 0,
						"fullDate": "2016-06-15T03:00:00-04:00"
					},
					{
						"date": 1466060400000,
						"value": 0,
						"fullDate": "2016-06-16T03:00:00-04:00"
					},
					{
						"date": 1466146800000,
						"value": 0,
						"fullDate": "2016-06-17T03:00:00-04:00"
					},
					{
						"date": 1466233200000,
						"value": 0,
						"fullDate": "2016-06-18T03:00:00-04:00"
					},
					{
						"date": 1466319600000,
						"value": 0,
						"fullDate": "2016-06-19T03:00:00-04:00"
					},
					{
						"date": 1466406000000,
						"value": 0,
						"fullDate": "2016-06-20T03:00:00-04:00"
					},
					{
						"date": 1466492400000,
						"value": 0,
						"fullDate": "2016-06-21T03:00:00-04:00"
					},
					{
						"date": 1466578800000,
						"value": 0,
						"fullDate": "2016-06-22T03:00:00-04:00"
					},
					{
						"date": 1466665200000,
						"value": 0,
						"fullDate": "2016-06-23T03:00:00-04:00"
					},
					{
						"date": 1466751600000,
						"value": 0,
						"fullDate": "2016-06-24T03:00:00-04:00"
					},
					{
						"date": 1466838000000,
						"value": 0,
						"fullDate": "2016-06-25T03:00:00-04:00"
					},
					{
						"date": 1466924400000,
						"value": 0,
						"fullDate": "2016-06-26T03:00:00-04:00"
					},
					{
						"date": 1467010800000,
						"value": 0,
						"fullDate": "2016-06-27T03:00:00-04:00"
					},
					{
						"date": 1467097200000,
						"value": 0,
						"fullDate": "2016-06-28T03:00:00-04:00"
					},
					{
						"date": 1467183600000,
						"value": 0,
						"fullDate": "2016-06-29T03:00:00-04:00"
					},
					{
						"date": 1467270000000,
						"value": 0,
						"fullDate": "2016-06-30T03:00:00-04:00"
					},
					{
						"date": 1467356400000,
						"value": 0,
						"fullDate": "2016-07-01T03:00:00-04:00"
					},
					{
						"date": 1467442800000,
						"value": 0,
						"fullDate": "2016-07-02T03:00:00-04:00"
					},
					{
						"date": 1467529200000,
						"value": 0,
						"fullDate": "2016-07-03T03:00:00-04:00"
					},
					{
						"date": 1467615600000,
						"value": 0,
						"fullDate": "2016-07-04T03:00:00-04:00"
					},
					{
						"date": 1467702000000,
						"value": 0,
						"fullDate": "2016-07-05T03:00:00-04:00"
					},
					{
						"date": 1467788400000,
						"value": 0,
						"fullDate": "2016-07-06T03:00:00-04:00"
					},
					{
						"date": 1467874800000,
						"value": 0,
						"fullDate": "2016-07-07T03:00:00-04:00"
					},
					{
						"date": 1467961200000,
						"value": 0,
						"fullDate": "2016-07-08T03:00:00-04:00"
					},
					{
						"date": 1468047600000,
						"value": 0,
						"fullDate": "2016-07-09T03:00:00-04:00"
					},
					{
						"date": 1468134000000,
						"value": 0,
						"fullDate": "2016-07-10T03:00:00-04:00"
					},
					{
						"date": 1468220400000,
						"value": 0,
						"fullDate": "2016-07-11T03:00:00-04:00"
					},
					{
						"date": 1468306800000,
						"value": 0,
						"fullDate": "2016-07-12T03:00:00-04:00"
					},
					{
						"date": 1468393200000,
						"value": 0,
						"fullDate": "2016-07-13T03:00:00-04:00"
					},
					{
						"date": 1468479600000,
						"value": 0,
						"fullDate": "2016-07-14T03:00:00-04:00"
					},
					{
						"date": 1468566000000,
						"value": 0,
						"fullDate": "2016-07-15T03:00:00-04:00"
					},
					{
						"date": 1468652400000,
						"value": 0,
						"fullDate": "2016-07-16T03:00:00-04:00"
					},
					{
						"date": 1468738800000,
						"value": 0,
						"fullDate": "2016-07-17T03:00:00-04:00"
					},
					{
						"date": 1468825200000,
						"value": 0,
						"fullDate": "2016-07-18T03:00:00-04:00"
					},
					{
						"date": 1468911600000,
						"value": 0,
						"fullDate": "2016-07-19T03:00:00-04:00"
					},
					{
						"date": 1468998000000,
						"value": 0,
						"fullDate": "2016-07-20T03:00:00-04:00"
					},
					{
						"date": 1469084400000,
						"value": 0,
						"fullDate": "2016-07-21T03:00:00-04:00"
					},
					{
						"date": 1469170800000,
						"value": 0,
						"fullDate": "2016-07-22T03:00:00-04:00"
					},
					{
						"date": 1469257200000,
						"value": 0,
						"fullDate": "2016-07-23T03:00:00-04:00"
					},
					{
						"date": 1469343600000,
						"value": 0,
						"fullDate": "2016-07-24T03:00:00-04:00"
					},
					{
						"date": 1469430000000,
						"value": 0,
						"fullDate": "2016-07-25T03:00:00-04:00"
					},
					{
						"date": 1469516400000,
						"value": 0,
						"fullDate": "2016-07-26T03:00:00-04:00"
					},
					{
						"date": 1469602800000,
						"value": 0,
						"fullDate": "2016-07-27T03:00:00-04:00"
					},
					{
						"date": 1469689200000,
						"value": 0,
						"fullDate": "2016-07-28T03:00:00-04:00"
					},
					{
						"date": 1469775600000,
						"value": 0,
						"fullDate": "2016-07-29T03:00:00-04:00"
					},
					{
						"date": 1469862000000,
						"value": 0,
						"fullDate": "2016-07-30T03:00:00-04:00"
					},
					{
						"date": 1469948400000,
						"value": 0,
						"fullDate": "2016-07-31T03:00:00-04:00"
					},
					{
						"date": 1470034800000,
						"value": 0,
						"fullDate": "2016-08-01T03:00:00-04:00"
					},
					{
						"date": 1470121200000,
						"value": 0,
						"fullDate": "2016-08-02T03:00:00-04:00"
					},
					{
						"date": 1470207600000,
						"value": 0,
						"fullDate": "2016-08-03T03:00:00-04:00"
					},
					{
						"date": 1470294000000,
						"value": 0,
						"fullDate": "2016-08-04T03:00:00-04:00"
					},
					{
						"date": 1470380400000,
						"value": 0,
						"fullDate": "2016-08-05T03:00:00-04:00"
					},
					{
						"date": 1470466800000,
						"value": 0,
						"fullDate": "2016-08-06T03:00:00-04:00"
					},
					{
						"date": 1470553200000,
						"value": 0,
						"fullDate": "2016-08-07T03:00:00-04:00"
					},
					{
						"date": 1470639600000,
						"value": 0,
						"fullDate": "2016-08-08T03:00:00-04:00"
					},
					{
						"date": 1470726000000,
						"value": 0,
						"fullDate": "2016-08-09T03:00:00-04:00"
					},
					{
						"date": 1470812400000,
						"value": 0,
						"fullDate": "2016-08-10T03:00:00-04:00"
					},
					{
						"date": 1470898800000,
						"value": 0,
						"fullDate": "2016-08-11T03:00:00-04:00"
					},
					{
						"date": 1470985200000,
						"value": 0,
						"fullDate": "2016-08-12T03:00:00-04:00"
					},
					{
						"date": 1471071600000,
						"value": 0,
						"fullDate": "2016-08-13T03:00:00-04:00"
					},
					{
						"date": 1471158000000,
						"value": 0,
						"fullDate": "2016-08-14T03:00:00-04:00"
					},
					{
						"date": 1471244400000,
						"value": 0,
						"fullDate": "2016-08-15T03:00:00-04:00"
					},
					{
						"date": 1471330800000,
						"value": 0,
						"fullDate": "2016-08-16T03:00:00-04:00"
					},
					{
						"date": 1471417200000,
						"value": 0,
						"fullDate": "2016-08-17T03:00:00-04:00"
					},
					{
						"date": 1471503600000,
						"value": 0,
						"fullDate": "2016-08-18T03:00:00-04:00"
					},
					{
						"date": 1471590000000,
						"value": 0,
						"fullDate": "2016-08-19T03:00:00-04:00"
					},
					{
						"date": 1471676400000,
						"value": 0,
						"fullDate": "2016-08-20T03:00:00-04:00"
					},
					{
						"date": 1471762800000,
						"value": 0,
						"fullDate": "2016-08-21T03:00:00-04:00"
					},
					{
						"date": 1471849200000,
						"value": 0,
						"fullDate": "2016-08-22T03:00:00-04:00"
					},
					{
						"date": 1471935600000,
						"value": 0,
						"fullDate": "2016-08-23T03:00:00-04:00"
					},
					{
						"date": 1472022000000,
						"value": 0,
						"fullDate": "2016-08-24T03:00:00-04:00"
					},
					{
						"date": 1472108400000,
						"value": 0,
						"fullDate": "2016-08-25T03:00:00-04:00"
					},
					{
						"date": 1472194800000,
						"value": 0,
						"fullDate": "2016-08-26T03:00:00-04:00"
					},
					{
						"date": 1472281200000,
						"value": 0,
						"fullDate": "2016-08-27T03:00:00-04:00"
					},
					{
						"date": 1472367600000,
						"value": 0,
						"fullDate": "2016-08-28T03:00:00-04:00"
					},
					{
						"date": 1472454000000,
						"value": 0,
						"fullDate": "2016-08-29T03:00:00-04:00"
					},
					{
						"date": 1472540400000,
						"value": 0,
						"fullDate": "2016-08-30T03:00:00-04:00"
					},
					{
						"date": 1472626800000,
						"value": 0,
						"fullDate": "2016-08-31T03:00:00-04:00"
					},
					{
						"date": 1472713200000,
						"value": 0,
						"fullDate": "2016-09-01T03:00:00-04:00"
					},
					{
						"date": 1472799600000,
						"value": 0,
						"fullDate": "2016-09-02T03:00:00-04:00"
					},
					{
						"date": 1472886000000,
						"value": 0,
						"fullDate": "2016-09-03T03:00:00-04:00"
					},
					{
						"date": 1472972400000,
						"value": 0,
						"fullDate": "2016-09-04T03:00:00-04:00"
					},
					{
						"date": 1473058800000,
						"value": 0,
						"fullDate": "2016-09-05T03:00:00-04:00"
					},
					{
						"date": 1473145200000,
						"value": 0,
						"fullDate": "2016-09-06T03:00:00-04:00"
					},
					{
						"date": 1473231600000,
						"value": 0,
						"fullDate": "2016-09-07T03:00:00-04:00"
					},
					{
						"date": 1473318000000,
						"value": 0,
						"fullDate": "2016-09-08T03:00:00-04:00"
					},
					{
						"date": 1473404400000,
						"value": 0,
						"fullDate": "2016-09-09T03:00:00-04:00"
					},
					{
						"date": 1473490800000,
						"value": 0,
						"fullDate": "2016-09-10T03:00:00-04:00"
					},
					{
						"date": 1473577200000,
						"value": 0,
						"fullDate": "2016-09-11T03:00:00-04:00"
					},
					{
						"date": 1473663600000,
						"value": 0,
						"fullDate": "2016-09-12T03:00:00-04:00"
					},
					{
						"date": 1473750000000,
						"value": 0,
						"fullDate": "2016-09-13T03:00:00-04:00"
					},
					{
						"date": 1473836400000,
						"value": 0,
						"fullDate": "2016-09-14T03:00:00-04:00"
					},
					{
						"date": 1473922800000,
						"value": 0,
						"fullDate": "2016-09-15T03:00:00-04:00"
					},
					{
						"date": 1474009200000,
						"value": 0,
						"fullDate": "2016-09-16T03:00:00-04:00"
					},
					{
						"date": 1474095600000,
						"value": 0,
						"fullDate": "2016-09-17T03:00:00-04:00"
					},
					{
						"date": 1474182000000,
						"value": 0,
						"fullDate": "2016-09-18T03:00:00-04:00"
					},
					{
						"date": 1474268400000,
						"value": 0,
						"fullDate": "2016-09-19T03:00:00-04:00"
					},
					{
						"date": 1474354800000,
						"value": 0,
						"fullDate": "2016-09-20T03:00:00-04:00"
					},
					{
						"date": 1474441200000,
						"value": 0,
						"fullDate": "2016-09-21T03:00:00-04:00"
					},
					{
						"date": 1474527600000,
						"value": 0,
						"fullDate": "2016-09-22T03:00:00-04:00"
					},
					{
						"date": 1474614000000,
						"value": 0,
						"fullDate": "2016-09-23T03:00:00-04:00"
					},
					{
						"date": 1474700400000,
						"value": 0,
						"fullDate": "2016-09-24T03:00:00-04:00"
					},
					{
						"date": 1474786800000,
						"value": 0,
						"fullDate": "2016-09-25T03:00:00-04:00"
					},
					{
						"date": 1474873200000,
						"value": 0,
						"fullDate": "2016-09-26T03:00:00-04:00"
					},
					{
						"date": 1474959600000,
						"value": 0,
						"fullDate": "2016-09-27T03:00:00-04:00"
					},
					{
						"date": 1475046000000,
						"value": 0,
						"fullDate": "2016-09-28T03:00:00-04:00"
					},
					{
						"date": 1475132400000,
						"value": 0,
						"fullDate": "2016-09-29T03:00:00-04:00"
					},
					{
						"date": 1475218800000,
						"value": 0,
						"fullDate": "2016-09-30T03:00:00-04:00"
					},
					{
						"date": 1475305200000,
						"value": 0,
						"fullDate": "2016-10-01T03:00:00-04:00"
					},
					{
						"date": 1475391600000,
						"value": 0,
						"fullDate": "2016-10-02T03:00:00-04:00"
					},
					{
						"date": 1475478000000,
						"value": 0,
						"fullDate": "2016-10-03T03:00:00-04:00"
					},
					{
						"date": 1475564400000,
						"value": 0,
						"fullDate": "2016-10-04T03:00:00-04:00"
					},
					{
						"date": 1475650800000,
						"value": 0,
						"fullDate": "2016-10-05T03:00:00-04:00"
					},
					{
						"date": 1475737200000,
						"value": 0,
						"fullDate": "2016-10-06T03:00:00-04:00"
					},
					{
						"date": 1475823600000,
						"value": 0,
						"fullDate": "2016-10-07T03:00:00-04:00"
					},
					{
						"date": 1475910000000,
						"value": 0,
						"fullDate": "2016-10-08T03:00:00-04:00"
					},
					{
						"date": 1475996400000,
						"value": 0,
						"fullDate": "2016-10-09T03:00:00-04:00"
					},
					{
						"date": 1476082800000,
						"value": 0,
						"fullDate": "2016-10-10T03:00:00-04:00"
					},
					{
						"date": 1476169200000,
						"value": 0,
						"fullDate": "2016-10-11T03:00:00-04:00"
					},
					{
						"date": 1476255600000,
						"value": 0,
						"fullDate": "2016-10-12T03:00:00-04:00"
					},
					{
						"date": 1476342000000,
						"value": 0,
						"fullDate": "2016-10-13T03:00:00-04:00"
					},
					{
						"date": 1476428400000,
						"value": 0,
						"fullDate": "2016-10-14T03:00:00-04:00"
					},
					{
						"date": 1476514800000,
						"value": 0,
						"fullDate": "2016-10-15T03:00:00-04:00"
					},
					{
						"date": 1476601200000,
						"value": 0,
						"fullDate": "2016-10-16T03:00:00-04:00"
					},
					{
						"date": 1476687600000,
						"value": 0,
						"fullDate": "2016-10-17T03:00:00-04:00"
					},
					{
						"date": 1476774000000,
						"value": 0,
						"fullDate": "2016-10-18T03:00:00-04:00"
					},
					{
						"date": 1476860400000,
						"value": 0,
						"fullDate": "2016-10-19T03:00:00-04:00"
					},
					{
						"date": 1476946800000,
						"value": 0,
						"fullDate": "2016-10-20T03:00:00-04:00"
					},
					{
						"date": 1477033200000,
						"value": 0,
						"fullDate": "2016-10-21T03:00:00-04:00"
					},
					{
						"date": 1477119600000,
						"value": 0,
						"fullDate": "2016-10-22T03:00:00-04:00"
					},
					{
						"date": 1477206000000,
						"value": 0,
						"fullDate": "2016-10-23T03:00:00-04:00"
					},
					{
						"date": 1477292400000,
						"value": 0,
						"fullDate": "2016-10-24T03:00:00-04:00"
					},
					{
						"date": 1477378800000,
						"value": 0,
						"fullDate": "2016-10-25T03:00:00-04:00"
					},
					{
						"date": 1477465200000,
						"value": 0,
						"fullDate": "2016-10-26T03:00:00-04:00"
					},
					{
						"date": 1477551600000,
						"value": 0,
						"fullDate": "2016-10-27T03:00:00-04:00"
					},
					{
						"date": 1477638000000,
						"value": 0,
						"fullDate": "2016-10-28T03:00:00-04:00"
					},
					{
						"date": 1477724400000,
						"value": 0,
						"fullDate": "2016-10-29T03:00:00-04:00"
					},
					{
						"date": 1477810800000,
						"value": 0,
						"fullDate": "2016-10-30T03:00:00-04:00"
					},
					{
						"date": 1477897200000,
						"value": 0,
						"fullDate": "2016-10-31T03:00:00-04:00"
					},
					{
						"date": 1477983600000,
						"value": 0,
						"fullDate": "2016-11-01T03:00:00-04:00"
					},
					{
						"date": 1478070000000,
						"value": 0,
						"fullDate": "2016-11-02T03:00:00-04:00"
					},
					{
						"date": 1478156400000,
						"value": 0,
						"fullDate": "2016-11-03T03:00:00-04:00"
					},
					{
						"date": 1478242800000,
						"value": 0,
						"fullDate": "2016-11-04T03:00:00-04:00"
					},
					{
						"date": 1478329200000,
						"value": 0,
						"fullDate": "2016-11-05T03:00:00-04:00"
					},
					{
						"date": 1478415600000,
						"value": 0,
						"fullDate": "2016-11-06T02:00:00-05:00"
					},
					{
						"date": 1478415600000,
						"value": 0,
						"fullDate": "2016-11-06T02:00:00-05:00"
					},
					{
						"date": 1478505600000,
						"value": 0,
						"fullDate": "2016-11-07T03:00:00-05:00"
					},
					{
						"date": 1478592000000,
						"value": 0,
						"fullDate": "2016-11-08T03:00:00-05:00"
					},
					{
						"date": 1478678400000,
						"value": 0,
						"fullDate": "2016-11-09T03:00:00-05:00"
					},
					{
						"date": 1478764800000,
						"value": 0,
						"fullDate": "2016-11-10T03:00:00-05:00"
					},
					{
						"date": 1478851200000,
						"value": 0,
						"fullDate": "2016-11-11T03:00:00-05:00"
					},
					{
						"date": 1478937600000,
						"value": 0,
						"fullDate": "2016-11-12T03:00:00-05:00"
					},
					{
						"date": 1479024000000,
						"value": 0,
						"fullDate": "2016-11-13T03:00:00-05:00"
					},
					{
						"date": 1479110400000,
						"value": 0,
						"fullDate": "2016-11-14T03:00:00-05:00"
					},
					{
						"date": 1479196800000,
						"value": 0,
						"fullDate": "2016-11-15T03:00:00-05:00"
					},
					{
						"date": 1479283200000,
						"value": 0,
						"fullDate": "2016-11-16T03:00:00-05:00"
					},
					{
						"date": 1479369600000,
						"value": 0,
						"fullDate": "2016-11-17T03:00:00-05:00"
					},
					{
						"date": 1479456000000,
						"value": 0,
						"fullDate": "2016-11-18T03:00:00-05:00"
					},
					{
						"date": 1479542400000,
						"value": 0,
						"fullDate": "2016-11-19T03:00:00-05:00"
					},
					{
						"date": 1479628800000,
						"value": 0,
						"fullDate": "2016-11-20T03:00:00-05:00"
					},
					{
						"date": 1479715200000,
						"value": 0,
						"fullDate": "2016-11-21T03:00:00-05:00"
					},
					{
						"date": 1479801600000,
						"value": 0,
						"fullDate": "2016-11-22T03:00:00-05:00"
					},
					{
						"date": 1479888000000,
						"value": 0,
						"fullDate": "2016-11-23T03:00:00-05:00"
					},
					{
						"date": 1479974400000,
						"value": 0,
						"fullDate": "2016-11-24T03:00:00-05:00"
					},
					{
						"date": 1480060800000,
						"value": 0,
						"fullDate": "2016-11-25T03:00:00-05:00"
					},
					{
						"date": 1480147200000,
						"value": 0,
						"fullDate": "2016-11-26T03:00:00-05:00"
					},
					{
						"date": 1480233600000,
						"value": 0,
						"fullDate": "2016-11-27T03:00:00-05:00"
					},
					{
						"date": 1480320000000,
						"value": 0,
						"fullDate": "2016-11-28T03:00:00-05:00"
					},
					{
						"date": 1480406400000,
						"value": 0,
						"fullDate": "2016-11-29T03:00:00-05:00"
					},
					{
						"date": 1480492800000,
						"value": 0,
						"fullDate": "2016-11-30T03:00:00-05:00"
					},
					{
						"date": 1480579200000,
						"value": 0,
						"fullDate": "2016-12-01T03:00:00-05:00"
					},
					{
						"date": 1480665600000,
						"value": 0,
						"fullDate": "2016-12-02T03:00:00-05:00"
					},
					{
						"date": 1480752000000,
						"value": 0,
						"fullDate": "2016-12-03T03:00:00-05:00"
					},
					{
						"date": 1480838400000,
						"value": 0,
						"fullDate": "2016-12-04T03:00:00-05:00"
					},
					{
						"date": 1480924800000,
						"value": 0,
						"fullDate": "2016-12-05T03:00:00-05:00"
					},
					{
						"date": 1481011200000,
						"value": 0,
						"fullDate": "2016-12-06T03:00:00-05:00"
					},
					{
						"date": 1481097600000,
						"value": 0,
						"fullDate": "2016-12-07T03:00:00-05:00"
					},
					{
						"date": 1481184000000,
						"value": 0,
						"fullDate": "2016-12-08T03:00:00-05:00"
					},
					{
						"date": 1481270400000,
						"value": 0,
						"fullDate": "2016-12-09T03:00:00-05:00"
					},
					{
						"date": 1481356800000,
						"value": 0,
						"fullDate": "2016-12-10T03:00:00-05:00"
					},
					{
						"date": 1481443200000,
						"value": 0,
						"fullDate": "2016-12-11T03:00:00-05:00"
					},
					{
						"date": 1481529600000,
						"value": 0,
						"fullDate": "2016-12-12T03:00:00-05:00"
					},
					{
						"date": 1481616000000,
						"value": 0,
						"fullDate": "2016-12-13T03:00:00-05:00"
					},
					{
						"date": 1481702400000,
						"value": 0,
						"fullDate": "2016-12-14T03:00:00-05:00"
					},
					{
						"date": 1481788800000,
						"value": 0,
						"fullDate": "2016-12-15T03:00:00-05:00"
					},
					{
						"date": 1481875200000,
						"value": 0,
						"fullDate": "2016-12-16T03:00:00-05:00"
					},
					{
						"date": 1481961600000,
						"value": 0,
						"fullDate": "2016-12-17T03:00:00-05:00"
					},
					{
						"date": 1482048000000,
						"value": 0,
						"fullDate": "2016-12-18T03:00:00-05:00"
					},
					{
						"date": 1482134400000,
						"value": 0,
						"fullDate": "2016-12-19T03:00:00-05:00"
					},
					{
						"date": 1482220800000,
						"value": 0,
						"fullDate": "2016-12-20T03:00:00-05:00"
					},
					{
						"date": 1482307200000,
						"value": 0,
						"fullDate": "2016-12-21T03:00:00-05:00"
					},
					{
						"date": 1482393600000,
						"value": 0,
						"fullDate": "2016-12-22T03:00:00-05:00"
					},
					{
						"date": 1482480000000,
						"value": 0,
						"fullDate": "2016-12-23T03:00:00-05:00"
					},
					{
						"date": 1482566400000,
						"value": 0,
						"fullDate": "2016-12-24T03:00:00-05:00"
					},
					{
						"date": 1482652800000,
						"value": 0,
						"fullDate": "2016-12-25T03:00:00-05:00"
					},
					{
						"date": 1482739200000,
						"value": 0,
						"fullDate": "2016-12-26T03:00:00-05:00"
					},
					{
						"date": 1482825600000,
						"value": 0,
						"fullDate": "2016-12-27T03:00:00-05:00"
					},
					{
						"date": 1482912000000,
						"value": 0,
						"fullDate": "2016-12-28T03:00:00-05:00"
					},
					{
						"date": 1482998400000,
						"value": 0,
						"fullDate": "2016-12-29T03:00:00-05:00"
					},
					{
						"date": 1483084800000,
						"value": 0,
						"fullDate": "2016-12-30T03:00:00-05:00"
					},
					{
						"date": 1483171200000,
						"value": 0,
						"fullDate": "2016-12-31T03:00:00-05:00"
					},
					{
						"date": 1483257600000,
						"value": 0,
						"fullDate": "2017-01-01T03:00:00-05:00"
					},
					{
						"date": 1483344000000,
						"value": 0,
						"fullDate": "2017-01-02T03:00:00-05:00"
					},
					{
						"date": 1483430400000,
						"value": 0,
						"fullDate": "2017-01-03T03:00:00-05:00"
					},
					{
						"date": 1483516800000,
						"value": 0,
						"fullDate": "2017-01-04T03:00:00-05:00"
					},
					{
						"date": 1483603200000,
						"value": 0,
						"fullDate": "2017-01-05T03:00:00-05:00"
					},
					{
						"date": 1483689600000,
						"value": 0,
						"fullDate": "2017-01-06T03:00:00-05:00"
					},
					{
						"date": 1483776000000,
						"value": 0,
						"fullDate": "2017-01-07T03:00:00-05:00"
					},
					{
						"date": 1483862400000,
						"value": 0,
						"fullDate": "2017-01-08T03:00:00-05:00"
					},
					{
						"date": 1483948800000,
						"value": 0,
						"fullDate": "2017-01-09T03:00:00-05:00"
					},
					{
						"date": 1484035200000,
						"value": 0,
						"fullDate": "2017-01-10T03:00:00-05:00"
					},
					{
						"date": 1484121600000,
						"value": 0,
						"fullDate": "2017-01-11T03:00:00-05:00"
					},
					{
						"date": 1484208000000,
						"value": 0,
						"fullDate": "2017-01-12T03:00:00-05:00"
					},
					{
						"date": 1484294400000,
						"value": 0,
						"fullDate": "2017-01-13T03:00:00-05:00"
					},
					{
						"date": 1484380800000,
						"value": 0,
						"fullDate": "2017-01-14T03:00:00-05:00"
					},
					{
						"date": 1484467200000,
						"value": 0,
						"fullDate": "2017-01-15T03:00:00-05:00"
					},
					{
						"date": 1484553600000,
						"value": 0,
						"fullDate": "2017-01-16T03:00:00-05:00"
					},
					{
						"date": 1484640000000,
						"value": 0,
						"fullDate": "2017-01-17T03:00:00-05:00"
					},
					{
						"date": 1484726400000,
						"value": 0,
						"fullDate": "2017-01-18T03:00:00-05:00"
					},
					{
						"date": 1484812800000,
						"value": 0,
						"fullDate": "2017-01-19T03:00:00-05:00"
					},
					{
						"date": 1484899200000,
						"value": 0,
						"fullDate": "2017-01-20T03:00:00-05:00"
					},
					{
						"date": 1484985600000,
						"value": 0,
						"fullDate": "2017-01-21T03:00:00-05:00"
					},
					{
						"date": 1485072000000,
						"value": 0,
						"fullDate": "2017-01-22T03:00:00-05:00"
					},
					{
						"date": 1485158400000,
						"value": 0,
						"fullDate": "2017-01-23T03:00:00-05:00"
					}
				]
			}
		],
		"dataByDate": [
			{
				"date": "2015-01-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-01-24T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-01-25T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-01-26T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-01-27T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-01-28T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-01-29T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-01-30T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-01-31T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-13T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-14T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-16T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-17T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-18T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-20T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-21T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-22T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-24T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-25T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-26T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-27T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-02-28T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-03-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-04-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-05-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-06-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-07-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-08-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-09-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-10-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-13T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-14T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-16T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-17T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-18T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-20T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-21T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-22T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-24T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-25T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-26T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-27T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-28T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-29T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-11-30T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-13T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-14T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-16T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-17T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-18T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-20T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-21T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-22T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-24T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-25T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-26T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-27T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-28T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-29T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-30T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2015-12-31T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-13T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-14T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-16T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-17T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-18T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-20T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-21T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-22T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-24T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-25T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-26T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-27T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-28T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-29T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-30T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-01-31T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-13T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 10,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-16T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-17T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 1,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-20T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-21T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 4,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-24T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-25T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-26T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-27T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-28T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-02-29T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 1,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 1,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 1,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 4,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-03-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 2,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 2,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 1,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 1,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 1,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-04-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-05-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-06-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-07-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-08-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-09-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-07T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-08T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-09T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-10T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-11T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-12T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-13T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-14T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-15T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-16T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-17T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-18T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-19T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-20T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-21T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-22T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-23T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-24T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-25T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-26T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-27T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-28T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-29T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-30T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-10-31T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-01T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-02T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-03T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-04T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-05T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-06T07:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-13T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-14T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-16T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-17T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-18T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-20T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-21T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-22T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-24T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-25T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-26T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-27T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-28T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-29T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-11-30T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-13T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-14T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-16T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-17T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-18T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-20T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-21T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-22T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-24T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-25T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-26T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-27T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-28T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-29T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-30T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2016-12-31T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-05T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-06T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-07T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-08T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-09T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-10T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-11T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-12T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-13T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-14T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-15T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-16T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-18T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-19T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-20T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-21T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-22T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-23T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			}
		]
	};

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	module.exports = {
		"dataByTopic": [
			{
				"topic": -1,
				"topicName": "Quantity",
				"dates": [
					{
						"date": "16-Jan-17",
						"value": 0,
						"fullDate": "2017-01-16T16:00:00-08:00"
					},
					{
						"date": "16-Jan-17",
						"value": 0,
						"fullDate": "2017-01-16T17:00:00-08:00"
					},
					{
						"date": "16-Jan-17",
						"value": 0,
						"fullDate": "2017-01-16T18:00:00-08:00"
					},
					{
						"date": "16-Jan-17",
						"value": 0,
						"fullDate": "2017-01-16T19:00:00-08:00"
					},
					{
						"date": "16-Jan-17",
						"value": 0,
						"fullDate": "2017-01-16T20:00:00-08:00"
					},
					{
						"date": "16-Jan-17",
						"value": 0,
						"fullDate": "2017-01-16T21:00:00-08:00"
					},
					{
						"date": "16-Jan-17",
						"value": 0,
						"fullDate": "2017-01-16T22:00:00-08:00"
					},
					{
						"date": "16-Jan-17",
						"value": 0,
						"fullDate": "2017-01-16T23:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T00:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T01:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T02:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T03:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T04:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T05:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T06:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T07:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T09:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T10:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T11:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T12:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T13:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T14:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 0,
						"fullDate": "2017-01-17T15:00:00-08:00"
					},
					{
						"date": "17-Jan-17",
						"value": 1,
						"fullDate": "2017-01-17T16:00:00-08:00"
					}
				]
			}
		],
		"dataByDate": [
			{
				"date": "2017-01-16T16:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-16T17:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-16T18:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-16T19:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-16T20:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-16T21:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-16T22:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-16T23:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T00:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T01:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T02:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T03:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T04:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T05:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T06:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T07:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T09:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T10:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T11:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T12:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T13:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T14:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T15:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Quantity"
					}
				]
			},
			{
				"date": "2017-01-17T16:00:00-08:00",
				"topics": [
					{
						"name": -1,
						"value": 1,
						"topicName": "Quantity"
					}
				]
			}
		]
	};

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	module.exports = {
		"dataByTopic": [
			{
				"topic": -1,
				"dates": [
					{
						"date": "30-Dec-15",
						"value": 0,
						"fullDate": "2015-12-30T00:00:00-08:00"
					},
					{
						"date": "31-Dec-15",
						"value": 2,
						"fullDate": "2015-12-31T00:00:00-08:00"
					},
					{
						"date": "1-Jan-16",
						"value": 0,
						"fullDate": "2016-01-01T00:00:00-08:00"
					},
					{
						"date": "2-Jan-16",
						"value": 0,
						"fullDate": "2016-01-02T00:00:00-08:00"
					},
					{
						"date": "3-Jan-16",
						"value": 0,
						"fullDate": "2016-01-03T00:00:00-08:00"
					},
					{
						"date": "4-Jan-16",
						"value": 0,
						"fullDate": "2016-01-04T00:00:00-08:00"
					}
				],
				"topicName": "Sales"
			}
		],
		"dataByDate": [
			{
				"date": "2015-12-30T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Sales"
					}
				]
			},
			{
				"date": "2015-12-31T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 2,
						"topicName": "Sales"
					}
				]
			},
			{
				"date": "2016-01-01T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Sales"
					}
				]
			},
			{
				"date": "2016-01-02T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Sales"
					}
				]
			},
			{
				"date": "2016-01-03T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Sales"
					}
				]
			},
			{
				"date": "2016-01-04T08:00:00.000Z",
				"topics": [
					{
						"name": -1,
						"value": 0,
						"topicName": "Sales"
					}
				]
			}
		]
	};

/***/ })
]);
//# sourceMappingURL=demo-line.js.map