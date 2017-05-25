webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var d3Selection = __webpack_require__(1),
	    PubSub = __webpack_require__(2),
	    bar = __webpack_require__(3),
	    miniTooltip = __webpack_require__(24),
	    colors = __webpack_require__(19),
	    dataBuilder = __webpack_require__(25);
	
	function createBarChart() {
	    var barChart = bar(),
	        testDataSet = new dataBuilder.BarDataBuilder(),
	        barContainer = d3Selection.select('.js-bar-chart-container'),
	        containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false,
	        dataset;
	
	    if (containerWidth) {
	        dataset = testDataSet.withLettersFrequency().build();
	
	        barChart.width(containerWidth).height(300);
	
	        barContainer.datum(dataset).call(barChart);
	    }
	}
	
	function createHorizontalBarChart() {
	    var barChart = bar(),
	        tooltip = miniTooltip(),
	        testDataSet = new dataBuilder.BarDataBuilder(),
	        barContainer = d3Selection.select('.js-horizontal-bar-chart-container'),
	        containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false,
	        tooltipContainer,
	        dataset;
	
	    if (containerWidth) {
	        dataset = testDataSet.withColors().build();
	
	        barChart.margin({
	            left: 120,
	            right: 20,
	            top: 20,
	            bottom: 30
	        }).horizontal(true).colorSchema(colors.colorSchemas.britechartsColorSchema).width(containerWidth).yAxisPaddingBetweenChart(30).height(300).percentageAxisToMaxRatio(1.3).on('customMouseOver', tooltip.show).on('customMouseMove', tooltip.update).on('customMouseOut', tooltip.hide);
	
	        barContainer.datum(dataset).call(barChart);
	
	        tooltipContainer = d3Selection.select('.js-horizontal-bar-chart-container .bar-chart .metadata-group');
	        tooltipContainer.datum([]).call(tooltip);
	    }
	}
	
	function createBarChartWithTooltip() {
	    var barChart = bar(),
	        tooltip = miniTooltip(),
	        testDataSet = new dataBuilder.BarDataBuilder(),
	        barContainer = d3Selection.select('.js-bar-chart-tooltip-container'),
	        containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false,
	        tooltipContainer,
	        dataset;
	
	    if (containerWidth) {
	        d3Selection.select('.js-download-button').on('click', function () {
	            barChart.exportChart('barchart.png', 'Britecharts Bar Chart');
	        });
	
	        dataset = testDataSet.withLettersFrequency().build();
	
	        barChart.width(containerWidth).height(300).usePercentage(true).on('customMouseOver', tooltip.show).on('customMouseMove', tooltip.update).on('customMouseOut', tooltip.hide);
	
	        barContainer.datum(dataset).call(barChart);
	
	        tooltipContainer = d3Selection.select('.bar-chart .metadata-group');
	        tooltipContainer.datum([]).call(tooltip);
	    }
	}
	
	// Show charts if container available
	if (d3Selection.select('.js-bar-chart-tooltip-container').node()) {
	    createBarChart();
	    createHorizontalBarChart();
	    createBarChartWithTooltip();
	
	    var redrawCharts = function redrawCharts() {
	        d3Selection.selectAll('.bar-chart').remove();
	
	        createBarChart();
	        createHorizontalBarChart();
	        createBarChartWithTooltip();
	    };
	
	    // Redraw charts on window resize
	    PubSub.subscribe('resize', redrawCharts);
	}

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var d3Array = __webpack_require__(4);
	    var d3Axis = __webpack_require__(5);
	    var d3Color = __webpack_require__(6);
	    var d3Dispatch = __webpack_require__(7);
	    var d3Format = __webpack_require__(8);
	    var d3Scale = __webpack_require__(9);
	    var d3Selection = __webpack_require__(1);
	    var d3Transition = __webpack_require__(14);
	
	    var textHelper = __webpack_require__(17);
	
	    var _require = __webpack_require__(18),
	        exportChart = _require.exportChart;
	
	    var colorHelper = __webpack_require__(19);
	
	    var PERCENTAGE_FORMAT = '%';
	    var NUMBER_FORMAT = ',f';
	
	    /**
	     * @typedef BarChartData
	     * @type {Object[]}
	     * @property {Number} value        Value of the group (required)
	     * @property {String} name         Name of the group (required)
	     *
	     * @example
	     * [
	     *     {
	     *         value: 1,
	     *         name: 'glittering'
	     *     },
	     *     {
	     *         value: 1,
	     *         name: 'luminous'
	     *     }
	     * ]
	     */
	
	    /**
	     * Bar Chart reusable API class that renders a
	     * simple and configurable bar chart.
	     *
	     * @module Bar
	     * @tutorial bar
	     * @requires d3-array, d3-axis, d3-dispatch, d3-scale, d3-selection
	     *
	     * @example
	     * var barChart = bar();
	     *
	     * barChart
	     *     .height(500)
	     *     .width(800);
	     *
	     * d3Selection.select('.css-selector')
	     *     .datum(dataset)
	     *     .call(barChart);
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
	            data = void 0,
	            chartWidth = void 0,
	            chartHeight = void 0,
	            xScale = void 0,
	            yScale = void 0,
	            colorSchema = colorHelper.singleColors.aloeGreen,
	            colorList = void 0,
	            colorMap = void 0,
	            numOfVerticalTicks = 5,
	            numOfHorizontalTicks = 5,
	            percentageAxisToMaxRatio = 1,
	            enablePercentageLabels = false,
	            percentageLabelMargin = 7,
	            percentageLabelSize = 12,
	            horizontalLabelFormat = '.0%',
	            verticalLabelFormat = '.0f',
	            valueLabelFormat = NUMBER_FORMAT,
	            xAxis = void 0,
	            yAxis = void 0,
	            xAxisPadding = {
	            top: 0,
	            left: 0,
	            bottom: 0,
	            right: 0
	        },
	            yAxisPaddingBetweenChart = 10,
	            yAxisLineWrapLimit = 1,
	            horizontal = false,
	            svg = void 0,
	            valueLabel = 'value',
	            nameLabel = 'name',
	            maskGridLines = void 0,
	            baseLine = void 0,
	
	
	        // Dispatcher object to broadcast the mouse events
	        // Ref: https://github.com/mbostock/d3/wiki/Internals#d3_dispatch
	        dispatcher = d3Dispatch.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove'),
	
	
	        // extractors
	        getName = function getName(_ref) {
	            var name = _ref.name;
	            return name;
	        },
	            getValue = function getValue(_ref2) {
	            var value = _ref2.value;
	            return value;
	        },
	            _percentageLabelHorizontalX = function _percentageLabelHorizontalX(_ref3) {
	            var value = _ref3.value;
	            return xScale(value) + percentageLabelMargin;
	        },
	            _percentageLabelHorizontalY = function _percentageLabelHorizontalY(_ref4) {
	            var name = _ref4.name;
	            return yScale(name) + yScale.bandwidth() / 2 + percentageLabelSize * (3 / 8);
	        },
	            _percentageLabelVerticalX = function _percentageLabelVerticalX(_ref5) {
	            var name = _ref5.name;
	            return xScale(name);
	        },
	            _percentageLabelVerticalY = function _percentageLabelVerticalY(_ref6) {
	            var value = _ref6.value;
	            return yScale(value) - percentageLabelMargin;
	        },
	            _percentageLabelHorizontalFormatValue = function _percentageLabelHorizontalFormatValue(_ref7) {
	            var value = _ref7.value;
	            return d3Format.format(horizontalLabelFormat)(value);
	        },
	            _percentageLabelVerticalFormatValue = function _percentageLabelVerticalFormatValue(_ref8) {
	            var value = _ref8.value;
	            return d3Format.format(verticalLabelFormat)(parseFloat(value) * 100);
	        };
	
	        /**
	         * This function creates the graph using the selection as container
	         * @param  {D3Selection} _selection A d3 selection that represents
	         *                                  the container(s) where the chart(s) will be rendered
	         * @param {BarChartData} _data The data to attach and generate the chart
	         */
	        function exports(_selection) {
	            _selection.each(function (_data) {
	                chartWidth = width - margin.left - margin.right - yAxisPaddingBetweenChart * 1.2;
	                chartHeight = height - margin.top - margin.bottom;
	                data = cleanData(_data);
	
	                buildScales();
	                buildAxis();
	                buildSVG(this);
	                drawGridLines();
	                drawBars();
	                drawAxis();
	                if (enablePercentageLabels) {
	                    drawPercentageLabels();
	                }
	            });
	        }
	
	        /**
	         * Creates the d3 x and y axis, setting orientations
	         * @private
	         */
	        function buildAxis() {
	            if (!horizontal) {
	                xAxis = d3Axis.axisBottom(xScale);
	
	                yAxis = d3Axis.axisLeft(yScale).ticks(numOfVerticalTicks, valueLabelFormat);
	            } else {
	                xAxis = d3Axis.axisBottom(xScale).ticks(numOfHorizontalTicks, valueLabelFormat).tickSizeInner([-chartHeight]);
	
	                yAxis = d3Axis.axisLeft(yScale);
	            }
	        }
	
	        /**
	         * Builds containers for the chart, the axis and a wrapper for all of them
	         * Also applies the Margin convention
	         * @private
	         */
	        function buildContainerGroups() {
	            var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + (margin.left + yAxisPaddingBetweenChart) + ', ' + margin.top + ')');
	
	            container.append('g').classed('grid-lines-group', true);
	            container.append('g').classed('chart-group', true);
	            container.append('g').classed('x-axis-group axis', true);
	            container.append('g').attr('transform', 'translate(' + -1 * yAxisPaddingBetweenChart + ', 0)').classed('y-axis-group axis', true);
	            container.append('g').classed('metadata-group', true);
	        }
	
	        /**
	         * Creates the x and y scales of the graph
	         * @private
	         */
	        function buildScales() {
	            var percentageAxis = Math.min(percentageAxisToMaxRatio * d3Array.max(data, getValue));
	
	            if (!horizontal) {
	                xScale = d3Scale.scaleBand().domain(data.map(getName)).rangeRound([0, chartWidth]).padding(0.1);
	
	                yScale = d3Scale.scaleLinear().domain([0, percentageAxis]).rangeRound([chartHeight, 0]);
	            } else {
	                xScale = d3Scale.scaleLinear().domain([0, percentageAxis]).rangeRound([0, chartWidth]);
	
	                yScale = d3Scale.scaleBand().domain(data.map(getName)).rangeRound([chartHeight, 0]).padding(0.1);
	            }
	
	            colorList = data.map(function (d) {
	                return d;
	            }).reverse().map(function (_ref9, i) {
	                var name = _ref9.name;
	                return {
	                    name: name,
	                    color: colorSchema[i % colorSchema.length] };
	            });
	
	            colorMap = function colorMap(item) {
	                return colorList.filter(function (_ref10) {
	                    var name = _ref10.name;
	                    return name === item;
	                })[0].color;
	            };
	        }
	
	        /**
	         * Builds the SVG element that will contain the chart
	         * @param  {HTMLElement} container DOM element that will work as the container of the graph
	         * @private
	         */
	        function buildSVG(container) {
	            if (!svg) {
	                svg = d3Selection.select(container).append('svg').classed('britechart bar-chart', true);
	
	                buildContainerGroups();
	            }
	
	            svg.attr('width', width).attr('height', height);
	        }
	
	        /**
	         * Cleaning data adding the proper format
	         * @param  {BarChartData} data Data
	         * @private
	         */
	        function cleanData(data) {
	            return data.map(function (d) {
	                d.value = +d[valueLabel];
	                d.name = String(d[nameLabel]);
	
	                return d;
	            });
	        }
	
	        /**
	         * Utility function that wraps a text into the given width
	         * @param  {D3Selection} text         Text to write
	         * @param  {Number} containerWidth
	         * @private
	         */
	        function wrapText(text, containerWidth) {
	            textHelper.wrapTextWithEllipses(text, containerWidth, 0, yAxisLineWrapLimit);
	        }
	
	        /**
	         * Draws the x and y axis on the svg object within their
	         * respective groups
	         * @private
	         */
	        function drawAxis() {
	            svg.select('.x-axis-group.axis').attr('transform', 'translate(0, ' + chartHeight + ')').call(xAxis);
	
	            svg.select('.y-axis-group.axis').call(yAxis);
	
	            svg.selectAll('.y-axis-group .tick text').call(wrapText, margin.left - yAxisPaddingBetweenChart);
	        }
	
	        /**
	         * Draws the bars along the x axis
	         * @param  {D3Selection} bars Selection of bars
	         * @return {void}
	         */
	        function drawHorizontalBars(bars) {
	            // Enter + Update
	            bars.enter().append('rect').classed('bar', true).attr('y', chartHeight).attr('x', 0).attr('height', yScale.bandwidth()).attr('width', function (_ref11) {
	                var value = _ref11.value;
	                return xScale(value);
	            }).attr('fill', function (_ref12) {
	                var name = _ref12.name;
	                return colorMap(name);
	            }).on('mouseover', function () {
	                dispatcher.call('customMouseOver', this);
	                d3Selection.select(this).attr('fill', function (_ref13) {
	                    var name = _ref13.name;
	                    return d3Color.color(colorMap(name)).darker();
	                });
	            }).on('mousemove', function (d) {
	                dispatcher.call('customMouseMove', this, d, d3Selection.mouse(this), [chartWidth, chartHeight]);
	            }).on('mouseout', function () {
	                dispatcher.call('customMouseOut', this);
	                d3Selection.select(this).attr('fill', function (_ref14) {
	                    var name = _ref14.name;
	                    return colorMap(name);
	                });
	            }).merge(bars).attr('x', 0).attr('y', function (_ref15) {
	                var name = _ref15.name;
	                return yScale(name);
	            }).attr('height', yScale.bandwidth()).attr('width', function (_ref16) {
	                var value = _ref16.value;
	                return xScale(value);
	            });
	        }
	
	        /**
	         * Draws the bars along the y axis
	         * @param  {D3Selection} bars Selection of bars
	         * @return {void}
	         */
	        function drawVerticalBars(bars) {
	            // Enter + Update
	            bars.enter().append('rect').classed('bar', true).attr('x', chartWidth).attr('y', function (_ref17) {
	                var value = _ref17.value;
	                return yScale(value);
	            }).attr('width', xScale.bandwidth()).attr('height', function (_ref18) {
	                var value = _ref18.value;
	                return chartHeight - yScale(value);
	            }).attr('fill', function (_ref19) {
	                var name = _ref19.name;
	                return colorMap(name);
	            }).on('mouseover', function () {
	                dispatcher.call('customMouseOver', this);
	                d3Selection.select(this).attr('fill', function (_ref20) {
	                    var name = _ref20.name;
	                    return d3Color.color(colorMap(name)).darker();
	                });
	            }).on('mousemove', function (d) {
	                dispatcher.call('customMouseMove', this, d, d3Selection.mouse(this), [chartWidth, chartHeight]);
	            }).on('mouseout', function () {
	                dispatcher.call('customMouseOut', this);
	                d3Selection.select(this).attr('fill', function (_ref21) {
	                    var name = _ref21.name;
	                    return colorMap(name);
	                });
	            }).merge(bars).attr('x', function (_ref22) {
	                var name = _ref22.name;
	                return xScale(name);
	            }).attr('y', function (_ref23) {
	                var value = _ref23.value;
	                return yScale(value);
	            }).attr('width', xScale.bandwidth()).attr('height', function (_ref24) {
	                var value = _ref24.value;
	                return chartHeight - yScale(value);
	            });
	        }
	
	        /**
	         * Draws percentage labels at the end of each bar
	         * @private
	         * @return {void}
	         */
	        function drawPercentageLabels() {
	            var labelXPosition = horizontal ? _percentageLabelHorizontalX : _percentageLabelVerticalX;
	            var labelYPosition = horizontal ? _percentageLabelHorizontalY : _percentageLabelVerticalY;
	            var text = horizontal ? _percentageLabelHorizontalFormatValue : _percentageLabelVerticalFormatValue;
	
	            var percentageLabels = svg.select('.metadata-group').append('g').classed('percentage-label-group', true).selectAll('text').data(data.reverse()).enter().append('text');
	
	            percentageLabels.classed('percentage-label', true).attr('x', labelXPosition).attr('y', labelYPosition).text(text).attr('font-size', percentageLabelSize + 'px');
	        }
	
	        /**
	         * Draws the bar elements within the chart group
	         * @private
	         */
	        function drawBars() {
	            var bars = svg.select('.chart-group').selectAll('.bar').data(data);
	
	            if (!horizontal) {
	                drawVerticalBars(bars);
	            } else {
	                drawHorizontalBars(bars);
	            }
	
	            // Exit
	            bars.exit().transition().style('opacity', 0).remove();
	        }
	
	        /**
	         * Draws grid lines on the background of the chart
	         * @return void
	         */
	        function drawGridLines() {
	            if (!horizontal) {
	                drawVerticalGridLines();
	            } else {
	                drawHorizontalGridLines();
	            }
	        }
	
	        /**
	         * Draws the grid lines for an horizontal bar chart
	         * @return {void}
	         */
	        function drawHorizontalGridLines() {
	            maskGridLines = svg.select('.grid-lines-group').selectAll('line.vertical-grid-line').data(xScale.ticks(4)).enter().append('line').attr('class', 'vertical-grid-line').attr('y1', xAxisPadding.left).attr('y2', chartHeight).attr('x1', function (d) {
	                return xScale(d);
	            }).attr('x2', function (d) {
	                return xScale(d);
	            });
	
	            //draw a horizontal line to extend y-axis till the edges
	            baseLine = svg.select('.grid-lines-group').selectAll('line.extended-y-line').data([0]).enter().append('line').attr('class', 'extended-y-line').attr('y1', xAxisPadding.left).attr('y2', chartHeight).attr('x1', 0).attr('x2', 0);
	        }
	
	        /**
	         * Draws the grid lines for a vertical bar chart
	         * @return {void}
	         */
	        function drawVerticalGridLines() {
	            maskGridLines = svg.select('.grid-lines-group').selectAll('line.horizontal-grid-line').data(yScale.ticks(4)).enter().append('line').attr('class', 'horizontal-grid-line').attr('x1', xAxisPadding.left).attr('x2', chartWidth).attr('y1', function (d) {
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
	         * Gets or Sets the height of the chart
	         * @param  {number} _x Desired width for the graph
	         * @return { height | module} Current height or Bar Chart module to chain calls
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
	         * @return { margin | module} Current margin or Bar Chart module to chain calls
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
	         * @return { width | module} Current width or Bar Chart module to chain calls
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
	         * Gets or Sets the horizontal direction of the chart
	         * @param  {number} _x Desired horizontal direction for the graph
	         * @return { horizontal | module} Current horizontal direction or Bar Chart module to chain calls
	         * @public
	         */
	        exports.horizontal = function (_x) {
	            if (!arguments.length) {
	                return horizontal;
	            }
	            horizontal = _x;
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
	         * Gets or Sets the valueLabelFormat to a percentage format if true (default false)
	         * @param  {boolean} _x     Should use percentage as value format
	         * @return { valueLabelFormat | module} Is percentage value format used or Chart module to chain calls
	         * @public
	         */
	        exports.usePercentage = function (_x) {
	            if (!arguments.length) {
	                return valueLabelFormat === PERCENTAGE_FORMAT;
	            }
	            if (_x) {
	                valueLabelFormat = PERCENTAGE_FORMAT;
	            } else {
	                valueLabelFormat = NUMBER_FORMAT;
	            }
	            return this;
	        };
	
	        /**
	         * Configurable extension of the x axis
	         * if your max point was 50% you might want to show x axis to 60%, pass 1.2
	         * @param  {number} _x ratio to max data point to add to the x axis
	         * @return { ratio | module} Current ratio or Bar Chart module to chain calls
	         * @public
	         */
	        exports.percentageAxisToMaxRatio = function (_x) {
	            if (!arguments.length) {
	                return percentageAxisToMaxRatio;
	            }
	            percentageAxisToMaxRatio = _x;
	            return this;
	        };
	
	        /**
	         * Default 10px. Offset between end of bar and start of the percentage bars
	         * @param  {number} _x percentage margin offset from end of bar
	         * @return {number | module}    Currnet offset or Bar Chart module to chain calls
	         */
	        exports.percentageLabelMargin = function (_x) {
	            if (!arguments.length) {
	                return percentageLabelMargin;
	            }
	            percentageLabelMargin = _x;
	            return this;
	        };
	
	        /**
	         * Default false. If true, adds percentage labels at the end of the bars
	         * @param  {Boolean} _x
	         * @return {Boolean | module}    Current value of enablePercentageLables or Bar Chart module to chain calls
	         */
	        exports.enablePercentageLabels = function (_x) {
	            if (!arguments.length) {
	                return enablePercentageLabels;
	            }
	            enablePercentageLabels = _x;
	            return this;
	        };
	
	        /**
	         * Default 10. Space between y axis and chart
	         * @param  {number} _x space between y axis and chart
	         * @return {number| module}    Current value of yAxisPaddingBetweenChart or Bar Chart module to chain calls
	         */
	        exports.yAxisPaddingBetweenChart = function (_x) {
	            if (!arguments.length) {
	                return yAxisPaddingBetweenChart;
	            }
	            yAxisPaddingBetweenChart = _x;
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
	         * Gets or Sets the nameLabel of the chart
	         * @param  {Number} _x Desired nameLabel for the graph
	         * @return { nameLabel | module} Current nameLabel or Chart module to chain calls
	         * @public
	         */
	        exports.nameLabel = function (_x) {
	            if (!arguments.length) {
	                return nameLabel;
	            }
	            nameLabel = _x;
	            return this;
	        };
	
	        return exports;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
	    var d3Selection = __webpack_require__(1);
	
	    var wrapConfig = {
	        lineHeight: 1.2,
	        smallTextOffset: 10,
	        smallTextLineHeightRatio: 0.9,
	        smallTextRatio: 0.6,
	        valueClassName: 'value',
	        labelClassName: 'label'
	    };
	
	    var defaultTextSize = 12;
	    var defaultFontFace = 'Arial';
	
	    /**
	     * Wraps a selection of text within the available width
	     * @param  {Number} fontSize       Size of the base font
	     * @param  {Number} availableWidth Width of the container where the text needs to wrap on
	     * @param  {D3Selection} node      SVG text element that contains the text to wrap
	     *
	     * REF: http://bl.ocks.org/mbostock/7555321
	     * More discussions on https://github.com/mbostock/d3/issues/1642
	     * @return {void}
	     */
	    var wrapText = function wrapText(xOffset, fontSize, availableWidth, node, data, i) {
	        var text = d3Selection.select(node),
	            words = text.text().split(/\s+/).reverse(),
	            word = void 0,
	            line = [],
	            lineNumber = 0,
	            smallLineHeight = wrapConfig.lineHeight * wrapConfig.smallTextLineHeightRatio,
	            y = text.attr('y'),
	            dy = parseFloat(text.attr('dy')),
	            smallFontSize = fontSize * wrapConfig.smallTextRatio,
	            tspan = text.text(null).append('tspan').attr('x', xOffset).attr('y', y - 5).attr('dy', dy + 'em').classed(wrapConfig.valueClassName, true).style('font-size', fontSize + 'px');
	
	        tspan.text(words.pop());
	        tspan = text.append('tspan').classed(wrapConfig.labelClassName, true).attr('x', xOffset).attr('y', y + wrapConfig.smallTextOffset).attr('dy', ++lineNumber * smallLineHeight + dy + 'em').style('font-size', smallFontSize + 'px');
	
	        while (word = words.pop()) {
	            line.push(word);
	            tspan.text(line.join(' '));
	            if (tspan.node().getComputedTextLength() > availableWidth - 50) {
	                line.pop();
	                tspan.text(line.join(' '));
	                line = [word];
	                tspan = text.append('tspan').classed(wrapConfig.labelClassName, true).attr('x', xOffset).attr('y', y + wrapConfig.smallTextOffset).attr('dy', ++lineNumber * smallLineHeight + dy + 'em').text(word).style('font-size', smallFontSize + 'px');
	            }
	        }
	    };
	
	    /**
	     * Wraps a selection of text within the available width, also adds class .adjust-upwards
	     * to configure a y offset for entries with multiple rows
	     * @param  {D3Sekectuib} text       d3 text element
	     * @param  {Number} width           Width of the container where the text needs to wrap on
	     * @param  {Number} xpos            number passed to determine the x offset
	     * @param  {Number} limit           number of lines before an ellipses is added and the rest of the text is cut off
	     *
	     * REF: http://bl.ocks.org/mbostock/7555321
	     * More discussions on https://github.com/mbostock/d3/issues/1642
	     * @return {void}
	     */
	    var wrapTextWithEllipses = function wrapTextWithEllipses(text, width) {
	        var xpos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	        var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
	
	
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
	
	                    if (lineNumber < limit - 1) {
	                        line = [word];
	                        tspan = text.append('tspan').attr('x', xpos).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
	                        // if we need two lines for the text, move them both up to center them
	                        text.classed('adjust-upwards', true);
	                    } else {
	                        line.push('...');
	                        tspan.text(line.join(' '));
	                        break;
	                    }
	                }
	            }
	        });
	    };
	
	    /**
	     * Figures out an approximate of the text width by using a canvas element
	     * This avoids having to actually render the text to measure it from the DOM itself
	     * @param  {String} text     Text to measure
	     * @param  {Number} fontSize Fontsize (or default)
	     * @param  {String} fontFace Font familty (or default)
	     * @return {String}          Approximate font size of the text
	     */
	    var getTextWidth = function getTextWidth(text) {
	        var fontSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultTextSize;
	        var fontFace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultFontFace;
	
	        var a = document.createElement('canvas'),
	            b = a.getContext('2d');
	
	        b.font = fontSize + 'px ' + fontFace;
	
	        return b.measureText(text).width;
	    };
	
	    return {
	        getTextWidth: getTextWidth,
	        wrapText: wrapText,
	        wrapTextWithEllipses: wrapTextWithEllipses
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
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
/* 24 */
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	
	    var _ = __webpack_require__(26),
	        jsonColors = __webpack_require__(27),
	        jsonLetters = __webpack_require__(28);
	
	    function BarDataBuilder(config) {
	        this.Klass = BarDataBuilder;
	
	        this.config = _.defaults({}, config);
	
	        this.withLettersFrequency = function () {
	            var attributes = _.extend({}, this.config, jsonLetters);
	
	            return new this.Klass(attributes);
	        };
	
	        this.withColors = function () {
	            var attributes = _.extend({}, this.config, jsonColors);
	
	            return new this.Klass(attributes);
	        };
	
	        /**
	         * Sets the path for fetching the data
	         * @param  {String} path Desired path for test data
	         * @return {BarDataBuilder}      Builder object
	         */
	        this.withPath = function (path) {
	            var attributes = _.extend({}, this.config, {
	                jsonURL: path
	            });
	
	            return new this.Klass(attributes);
	        };
	
	        this.build = function () {
	            return this.config.data;
	        };
	    }
	
	    return {
	        BarDataBuilder: BarDataBuilder
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 26 */,
/* 27 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"name": "Radiating",
				"value": 2
			},
			{
				"name": "Opalescent",
				"value": 4
			},
			{
				"name": "Shining",
				"value": 3
			},
			{
				"name": "Vibrant",
				"value": 6
			},
			{
				"name": "Vivid",
				"value": 6
			},
			{
				"name": "Brilliant",
				"value": 1
			}
		]
	};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	module.exports = {
		"data": [
			{
				"name": "A",
				"value": 0.08167
			},
			{
				"name": "B",
				"value": 0.01492
			},
			{
				"name": "C",
				"value": 0.02782
			},
			{
				"name": "D",
				"value": 0.04253
			},
			{
				"name": "E",
				"value": 0.12702
			},
			{
				"name": "F",
				"value": 0.02288
			},
			{
				"name": "G",
				"value": 0.02015
			},
			{
				"name": "H",
				"value": 0.06094
			},
			{
				"name": "I",
				"value": 0.06966
			},
			{
				"name": "J",
				"value": 0.00153
			},
			{
				"name": "K",
				"value": 0.00772
			},
			{
				"name": "L",
				"value": 0.04025
			},
			{
				"name": "M",
				"value": 0.02406
			},
			{
				"name": "N",
				"value": 0.06749
			},
			{
				"name": "O",
				"value": 0.07507
			},
			{
				"name": "P",
				"value": 0.01929
			},
			{
				"name": "Q",
				"value": 0.00095
			},
			{
				"name": "R",
				"value": 0.05987
			},
			{
				"name": "S",
				"value": 0.06327
			},
			{
				"name": "T",
				"value": 0.09056
			},
			{
				"name": "U",
				"value": 0.02758
			},
			{
				"name": "V",
				"value": 0.00978
			},
			{
				"name": "W",
				"value": 0.0236
			},
			{
				"name": "X",
				"value": 0.0015
			},
			{
				"name": "Y",
				"value": 0.01974
			},
			{
				"name": "Z",
				"value": 0.00074
			}
		]
	};

/***/ })
]);
//# sourceMappingURL=demo-bar.js.map