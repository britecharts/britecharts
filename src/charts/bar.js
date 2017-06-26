define(function(require) {
    'use strict';

    const d3Array = require('d3-array');
    const d3Ease = require('d3-ease');
    const d3Axis = require('d3-axis');
    const d3Color = require('d3-color');
    const d3Dispatch = require('d3-dispatch');
    const d3Format = require('d3-format');
    const d3Scale = require('d3-scale');
    const d3Selection = require('d3-selection');
    const d3Transition = require('d3-transition');

    const textHelper = require('./helpers/text');
    const {exportChart} = require('./helpers/exportChart');
    const colorHelper = require('./helpers/colors');


    const PERCENTAGE_FORMAT = '%';
    const NUMBER_FORMAT = ',f';


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

        let margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 40
            },
            width = 960,
            height = 500,
            data,
            dataZeroed,
            chartWidth, chartHeight,
            xScale, yScale,
            colorSchema = colorHelper.singleColors.aloeGreen,
            colorList,
            colorMap,
            numOfVerticalTicks = 5,
            numOfHorizontalTicks = 5,
            percentageAxisToMaxRatio = 1,
            enablePercentageLabels = false,
            percentageLabelMargin = 7,
            percentageLabelSize = 12,
            horizontalLabelFormat = '.0%',
            verticalLabelFormat = '.0f',
            valueLabelFormat = NUMBER_FORMAT,
            xAxis, yAxis,
            xAxisPadding = {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            },
            yAxisPaddingBetweenChart = 10,
            yAxisLineWrapLimit = 1,
            horizontal = false,
            svg,

            isAnimated = false,
            ease = d3Ease.easeQuadInOut,
            animationDuration = 800,
            interBarDelay = function(d, i) {return 70 * i},

            valueLabel = 'value',
            nameLabel = 'name',

            maskGridLines,
            baseLine,
            reverseColorList = true,

            // Dispatcher object to broadcast the mouse events
            // Ref: https://github.com/mbostock/d3/wiki/Internals#d3_dispatch
            dispatcher = d3Dispatch.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove'),

            // extractors
            getName = ({name}) => name,
            getValue = ({value}) => value,

            _percentageLabelHorizontalX = ({value}) => xScale(value) + percentageLabelMargin,
            _percentageLabelHorizontalY= ({name}) => yScale(name) + (yScale.bandwidth() / 2) + (percentageLabelSize * (3/8)),

            _percentageLabelVerticalX = ({name}) => xScale(name),
            _percentageLabelVerticalY = ({value}) => yScale(value) - percentageLabelMargin,

            _percentageLabelHorizontalFormatValue = ({value}) => d3Format.format(horizontalLabelFormat)(value),
            _percentageLabelVerticalFormatValue = ({value}) => d3Format.format(verticalLabelFormat)(parseFloat(value) * 100);

        /**
         * This function creates the graph using the selection as container
         * @param  {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         * @param {BarChartData} _data The data to attach and generate the chart
         */
        function exports(_selection) {
            _selection.each(function(_data) {
                chartWidth = width - margin.left - margin.right - (yAxisPaddingBetweenChart * 1.2);
                chartHeight = height - margin.top - margin.bottom;
                ({data, dataZeroed} = cleanData(_data));

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

                yAxis = d3Axis.axisLeft(yScale)
                    .ticks(numOfVerticalTicks, valueLabelFormat)
            } else {
                xAxis = d3Axis.axisBottom(xScale)
                    .ticks(numOfHorizontalTicks, valueLabelFormat)
                    .tickSizeInner([-chartHeight]);

                yAxis = d3Axis.axisLeft(yScale);
            }
        }

        /**
         * Builds containers for the chart, the axis and a wrapper for all of them
         * Also applies the Margin convention
         * @private
         */
        function buildContainerGroups() {
            let container = svg
                .append('g')
                  .classed('container-group', true)
                  .attr('transform', `translate(${margin.left + yAxisPaddingBetweenChart}, ${margin.top})`);

            container
                .append('g').classed('grid-lines-group', true);
            container
                .append('g').classed('chart-group', true);
            container
                .append('g').classed('x-axis-group axis', true);
            container
                .append('g')
                .attr('transform', `translate(${-1 * (yAxisPaddingBetweenChart)}, 0)`)
                .classed('y-axis-group axis', true);
            container
                .append('g').classed('metadata-group', true);
        }

        /**
         * Creates the x and y scales of the graph
         * @private
         */
        function buildScales() {
            let percentageAxis = Math.min(percentageAxisToMaxRatio * d3Array.max(data, getValue))

            if (!horizontal) {
                xScale = d3Scale.scaleBand()
                    .domain(data.map(getName))
                    .rangeRound([0, chartWidth])
                    .padding(0.1);

                yScale = d3Scale.scaleLinear()
                    .domain([0, percentageAxis])
                    .rangeRound([chartHeight, 0]);
            } else {
                xScale = d3Scale.scaleLinear()
                    .domain([0, percentageAxis])
                    .rangeRound([0, chartWidth]);

                yScale = d3Scale.scaleBand()
                    .domain(data.map(getName))
                    .rangeRound([chartHeight, 0])
                    .padding(0.1);
            }

            if (reverseColorList) {
                colorList = data.map(d => d)
                                .reverse()
                                .map(({name}, i) => ({
                                        name,
                                        color: colorSchema[i % colorSchema.length]}
                                    ));
            } else {
                colorList = data.map(d => d)
                                .map(({name}, i) => ({
                                        name,
                                        color: colorSchema[i % colorSchema.length]}
                                    ));
            }

            colorMap = (item) => colorList.filter(({name}) => name === item)[0].color;
        }

        /**
         * Builds the SVG element that will contain the chart
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @private
         */
        function buildSVG(container) {
            if (!svg) {
                svg = d3Selection.select(container)
                    .append('svg')
                      .classed('britechart bar-chart', true);

                buildContainerGroups();
            }

            svg
                .attr('width', width)
                .attr('height', height);
        }

        /**
         * Cleaning data adding the proper format
         * @param  {BarChartData} originalData Data
         * @private
         */
        function cleanData(originalData) {
            let data = originalData.map((d) => ({
                    value: +d[valueLabel],
                    name: String(d[nameLabel])
                }));
            let dataZeroed = data.map((d) => ({
                    value: 0,
                    name: String(d[nameLabel])
                }));

            return {data, dataZeroed}
        }

        /**
         * Utility function that wraps a text into the given width
         * @param  {D3Selection} text         Text to write
         * @param  {Number} containerWidth
         * @private
         */
        function wrapText(text, containerWidth) {
            textHelper.wrapTextWithEllipses(text, containerWidth, 0, yAxisLineWrapLimit)
        }

        /**
         * Draws the x and y axis on the svg object within their
         * respective groups
         * @private
         */
        function drawAxis() {
            svg.select('.x-axis-group.axis')
                .attr('transform', `translate(0, ${chartHeight})`)
                .call(xAxis);

            svg.select('.y-axis-group.axis')
                .call(yAxis);

            svg.selectAll('.y-axis-group .tick text')
                .call(wrapText, margin.left - yAxisPaddingBetweenChart)
        }

        /**
         * Draws the bars along the x axis
         * @param  {D3Selection} bars Selection of bars
         * @return {void}
         */
        function drawHorizontalBars(bars) {
            // Enter + Update
            bars.enter()
              .append('rect')
                .classed('bar', true)
                .attr('y', chartHeight)
                .attr('x', 0)
                .attr('height', yScale.bandwidth())
                .attr('width', ({value}) => xScale(value))
                .attr('fill', ({name}) => colorMap(name))
                .on('mouseover', function() {
                    dispatcher.call('customMouseOver', this);
                    d3Selection.select(this).attr('fill', ({name}) => d3Color.color(colorMap(name)).darker());
                })
                .on('mousemove', function(d) {
                    dispatcher.call('customMouseMove', this, d, d3Selection.mouse(this), [chartWidth, chartHeight]);
                })
                .on('mouseout', function() {
                    dispatcher.call('customMouseOut', this);
                    d3Selection.select(this).attr('fill', ({name}) => colorMap(name))
                })
              .merge(bars)
                .attr('x', 0)
                .attr('y', ({name}) => yScale(name))
                .attr('height', yScale.bandwidth())
                .attr('width', ({value}) => xScale(value));
        }

        /**
         * Draws and animates the bars along the x axis
         * @param  {D3Selection} bars Selection of bars
         * @return {void}
         */
        function drawAnimatedHorizontalBars(bars) {
            // Enter + Update
            bars.enter()
              .append('rect')
                .classed('bar', true)
                .attr('x', 0)
                .attr('y', chartHeight)
                .attr('height', yScale.bandwidth())
                .attr('width', ({value}) => xScale(value))
                .attr('fill', ({name}) => colorMap(name))
                .on('mouseover', function() {
                    dispatcher.call('customMouseOver', this);
                    d3Selection.select(this).attr('fill', ({name}) => d3Color.color(colorMap(name)).darker());
                })
                .on('mousemove', function(d) {
                    dispatcher.call('customMouseMove', this, d, d3Selection.mouse(this), [chartWidth, chartHeight]);
                })
                .on('mouseout', function() {
                    dispatcher.call('customMouseOut', this);
                    d3Selection.select(this).attr('fill', ({name}) => colorMap(name))
                });

            bars
                .attr('x', 0)
                .attr('y', ({name}) => yScale(name))
                .attr('height', yScale.bandwidth())
                .transition()
                .duration(animationDuration)
                .delay(interBarDelay)
                .ease(ease)
                .attr('width', ({value}) => xScale(value));
        }

        /**
         * Draws and animates the bars along the y axis
         * @param  {D3Selection} bars Selection of bars
         * @return {void}
         */
        function drawAnimatedVerticalBars(bars) {
            // Enter + Update
            bars.enter()
              .append('rect')
                .classed('bar', true)
                .attr('x', chartWidth)
                .attr('y', ({value}) => yScale(value))
                .attr('width', xScale.bandwidth())
                .attr('height', ({value}) => chartHeight - yScale(value))
                .attr('fill', ({name}) => colorMap(name))
                .on('mouseover', function() {
                    dispatcher.call('customMouseOver', this);
                    d3Selection.select(this).attr('fill', ({name}) => d3Color.color(colorMap(name)).darker())
                })
                .on('mousemove', function(d) {
                    dispatcher.call('customMouseMove', this, d, d3Selection.mouse(this), [chartWidth, chartHeight]);
                })
                .on('mouseout', function() {
                    dispatcher.call('customMouseOut', this);
                    d3Selection.select(this).attr('fill', ({name}) => colorMap(name))
                })
              .merge(bars)
                .attr('x', ({name}) => xScale(name))
                .attr('width', xScale.bandwidth())
                .transition()
                .duration(animationDuration)
                .delay(interBarDelay)
                .ease(ease)
                .attr('y', ({value}) => yScale(value))
                .attr('height', ({value}) => chartHeight - yScale(value));
        }

        /**
         * Draws the bars along the y axis
         * @param  {D3Selection} bars Selection of bars
         * @return {void}
         */
        function drawVerticalBars(bars) {
            // Enter + Update
            bars.enter()
              .append('rect')
                .classed('bar', true)
                .attr('x', chartWidth)
                .attr('y', ({value}) => yScale(value))
                .attr('width', xScale.bandwidth())
                .attr('height', ({value}) => chartHeight - yScale(value))
                .attr('fill', ({name}) => colorMap(name))
                .on('mouseover', function() {
                    dispatcher.call('customMouseOver', this);
                    d3Selection.select(this).attr('fill', ({name}) => d3Color.color(colorMap(name)).darker())
                })
                .on('mousemove', function(d) {
                    dispatcher.call('customMouseMove', this, d, d3Selection.mouse(this), [chartWidth, chartHeight]);
                })
                .on('mouseout', function() {
                    dispatcher.call('customMouseOut', this);
                    d3Selection.select(this).attr('fill', ({name}) => colorMap(name))
                })
              .merge(bars)
                .attr('x', ({name}) => xScale(name))
                .attr('y', ({value}) => yScale(value))
                .attr('width', xScale.bandwidth())
                .attr('height', ({value}) => chartHeight - yScale(value));
        }

        /**
         * Draws percentage labels at the end of each bar
         * @private
         * @return {void}
         */
        function drawPercentageLabels() {
            let labelXPosition = horizontal ? _percentageLabelHorizontalX : _percentageLabelVerticalX;
            let labelYPosition = horizontal ? _percentageLabelHorizontalY : _percentageLabelVerticalY;
            let text = horizontal ? _percentageLabelHorizontalFormatValue : _percentageLabelVerticalFormatValue;

            let percentageLabels = svg.select('.metadata-group')
              .append('g')
                .classed('percentage-label-group', true)
                .selectAll('text')
                .data(data.reverse())
                .enter()
              .append('text');

            percentageLabels
                .classed('percentage-label', true)
                .attr('x', labelXPosition)
                .attr('y', labelYPosition)
                .text(text)
                .attr('font-size', percentageLabelSize + 'px')
        }

        /**
         * Draws the bar elements within the chart group
         * @private
         */
        function drawBars() {
            let bars;

            if (isAnimated) {
                bars = svg.select('.chart-group').selectAll('.bar')
                    .data(dataZeroed);

                if (!horizontal) {
                    drawVerticalBars(bars);
                } else {
                    drawHorizontalBars(bars);
                }

                bars = svg.select('.chart-group').selectAll('.bar')
                    .data(data);

                if (!horizontal) {
                    drawAnimatedVerticalBars(bars);
                } else {
                    drawAnimatedHorizontalBars(bars);
                }
            } else {
                bars = svg.select('.chart-group').selectAll('.bar')
                    .data(data);

                if (!horizontal) {
                    drawVerticalBars(bars);
                } else {
                    drawHorizontalBars(bars);
                }
            }

            // Exit
            bars.exit()
                .transition()
                .style('opacity', 0)
                .remove();
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
            maskGridLines = svg.select('.grid-lines-group')
                .selectAll('line.vertical-grid-line')
                .data(xScale.ticks(4))
                .enter()
                  .append('line')
                    .attr('class', 'vertical-grid-line')
                    .attr('y1', (xAxisPadding.left))
                    .attr('y2', chartHeight)
                    .attr('x1', (d) => xScale(d))
                    .attr('x2', (d) => xScale(d))

            drawVerticalExtendedLine();
        }

        /**
         * Draws a vertical line to extend y-axis till the edges
         * @return {void}
         */
        function drawVerticalExtendedLine() {
            baseLine = svg.select('.grid-lines-group')
                .selectAll('line.extended-y-line')
                .data([0])
                .enter()
                  .append('line')
                    .attr('class', 'extended-y-line')
                    .attr('y1', (xAxisPadding.bottom))
                    .attr('y2', chartHeight)
                    .attr('x1', 0)
                    .attr('x2', 0);
        }

        /**
         * Draws the grid lines for a vertical bar chart
         * @return {void}
         */
        function drawVerticalGridLines() {
            maskGridLines = svg.select('.grid-lines-group')
                .selectAll('line.horizontal-grid-line')
                .data(yScale.ticks(4))
                .enter()
                  .append('line')
                    .attr('class', 'horizontal-grid-line')
                    .attr('x1', (xAxisPadding.left))
                    .attr('x2', chartWidth)
                    .attr('y1', (d) => yScale(d))
                    .attr('y2', (d) => yScale(d))

            drawHorizontalExtendedLine();
        }

        /**
         * Draws a vertical line to extend x-axis till the edges
         * @return {void}
         */
        function drawHorizontalExtendedLine() {
            baseLine = svg.select('.grid-lines-group')
                .selectAll('line.extended-x-line')
                .data([0])
                .enter()
                  .append('line')
                    .attr('class', 'extended-x-line')
                    .attr('x1', (xAxisPadding.left))
                    .attr('x2', chartWidth)
                    .attr('y1', chartHeight)
                    .attr('y2', chartHeight);
        }

        /**
         * Chart exported to png and a download action is fired
         * @public
         */
        exports.exportChart = function(filename) {
            exportChart.call(exports, svg, filename);
        };

        /**
         * Gets or Sets the height of the chart
         * @param  {number} _x Desired width for the graph
         * @return { height | module} Current height or Bar Chart module to chain calls
         * @public
         */
        exports.height = function(_x) {
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
        exports.margin = function(_x) {
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
        exports.width = function(_x) {
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
        exports.horizontal = function(_x) {
            if (!arguments.length) {
                return horizontal;
            }
            horizontal = _x;

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
        exports.isAnimated = function(_x) {
            if (!arguments.length) {
                return isAnimated;
            }
            isAnimated = _x;

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
        exports.on = function() {
            let value = dispatcher.on.apply(dispatcher, arguments);

            return value === dispatcher ? exports : value;
        };

        /**
         * Chart exported to png and a download action is fired
         * @public
         */
        exports.exportChart = function(filename, title) {
            exportChart.call(exports, svg, filename, title);
        };

        /**
         * Gets or Sets the colorSchema of the chart
         * @param  {String[]} _x Desired colorSchema for the graph
         * @return { colorSchema | module} Current colorSchema or Chart module to chain calls
         * @public
         */
        exports.colorSchema = function(_x) {
            if (!arguments.length) {
                return colorSchema;
            }
            colorSchema = _x;

            return this;
        }

        /**
         * Gets or Sets the valueLabelFormat to a percentage format if true (default false)
         * @param  {boolean} _x     Should use percentage as value format
         * @return { valueLabelFormat | module} Is percentage value format used or Chart module to chain calls
         * @public
         */
        exports.usePercentage = function(_x) {
            if (!arguments.length) {
                return valueLabelFormat === PERCENTAGE_FORMAT;
            }
            if (_x) {
                valueLabelFormat = PERCENTAGE_FORMAT;
            } else {
                valueLabelFormat = NUMBER_FORMAT;
            }

            return this;
        }

        /**
         * Configurable extension of the x axis
         * if your max point was 50% you might want to show x axis to 60%, pass 1.2
         * @param  {number} _x ratio to max data point to add to the x axis
         * @return { ratio | module} Current ratio or Bar Chart module to chain calls
         * @public
         */
        exports.percentageAxisToMaxRatio = function(_x) {
            if (!arguments.length) {
                return percentageAxisToMaxRatio;
            }
            percentageAxisToMaxRatio = _x;

            return this;
        }

        /**
         * Default 10px. Offset between end of bar and start of the percentage bars
         * @param  {number} _x percentage margin offset from end of bar
         * @return {number | module}    Currnet offset or Bar Chart module to chain calls
         */
        exports.percentageLabelMargin = function(_x) {
            if (!arguments.length) {
                return percentageLabelMargin;
            }
            percentageLabelMargin = _x;

            return this;
        }

        /**
         * Default false. If true, adds percentage labels at the end of the bars
         * @param  {Boolean} _x
         * @return {Boolean | module}    Current value of enablePercentageLables or Bar Chart module to chain calls
         */
        exports.enablePercentageLabels = function(_x) {
            if (!arguments.length) {
                return enablePercentageLabels;
            }
            enablePercentageLabels = _x;

            return this;
        }

        /**
         * Default 10. Space between y axis and chart
         * @param  {number} _x space between y axis and chart
         * @return {number| module}    Current value of yAxisPaddingBetweenChart or Bar Chart module to chain calls
         */
        exports.yAxisPaddingBetweenChart = function(_x) {
            if (!arguments.length) {
                return yAxisPaddingBetweenChart;
            }
            yAxisPaddingBetweenChart = _x;

            return this;
        }

        /**
         * Gets or Sets the valueLabel of the chart
         * @param  {Number} _x Desired valueLabel for the graph
         * @return { valueLabel | module} Current valueLabel or Chart module to chain calls
         * @public
         */
        exports.valueLabel = function(_x) {
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
        exports.nameLabel = function(_x) {
            if (!arguments.length) {
                return nameLabel;
            }
            nameLabel = _x;

            return this;
        };

        /**
         * Gets or Sets whether the color list should be reversed or not
         * @param  {boolean} _x     Should reverse the color list
         * @return { boolean | module} Is color list being reversed
         * @public
         */
        exports.reverseColorList = function(_x) {
            if (!arguments.length) {
                return reverseColorList;
            }
            reverseColorList = _x;

            return this;
        };

        return exports;
    };

});
