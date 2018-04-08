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

    const {exportChart} = require('./helpers/export');
    const colorHelper = require('./helpers/color');

    const PERCENTAGE_FORMAT = '%';
    const NUMBER_FORMAT = ',f';


    /**
     * @typedef BulletChartData
     * @type {Object}
     * @property {String} title         Name for identification of the measure
     * @property {String} subtitle      Measurement units or description for the measure
     * @property {Array[]} ranges       Quantitative range
     * @property {Array[]} measures     Comparative measures
     * @property {Array[]} markers      Marked points in chart
     *
     * @example
     *      {
     *          "title": "CPU 1 Load",
     *          "subtitle": "GHz",
     *          "ranges": [1500, 2100, 3500],
     *          "measures": [1800, 2200],
     *          "markers": [1800]
     *      }
     *
    /**
     * Bullet Chart reusable API class that renders a
     * simple and configurable bar chart.
     *
     * @module Bullet
     * @tutorial bullet
     * @requires d3-array, d3-axis, d3-dispatch, d3-scale, d3-selection
     *
     * @example
     * var bulletChart = bullet();
     *
     * bulletChart
     *     .height(500)
     *     .width(800);
     *
     * d3Selection.select('.css-selector')
     *     .datum(dataset)
     *     .call(bulletChart);
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
            chartWidth, chartHeight,
            xScale,

            opacityScale,
            opacityDiff = 0.2,

            colorSchema = colorHelper.singleColors.aloeGreen,
            measureColor = colorHelper.colorSchemas.grey[4],
            colorList,
            colorMap,
            xTicks = 5,
            percentageAxisToMaxRatio = 1,
            numberFormat = NUMBER_FORMAT,

            xAxis,
            startMaxRangeOpacity = 0.6,
            w0,

            isHorizontal = false,
            isReverse = false,

            title,
            subtitle,
            ranges = [],
            markers = [],
            measures = [],

            svg,
            ease = d3Ease.easeQuadInOut,

            // Dispatcher object to broadcast the mouse events
            // Ref: https://github.com/mbostock/d3/wiki/Internals#d3_dispatch
            dispatcher = d3Dispatch.dispatch(
                'customMouseOver',
                'customMouseOut',
                'customMouseMove',
                'customClick'
            );

        /**
         * This function creates the graph using the selection as container
         * @param  {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         * @param {BulletChartData} _data The data to attach and generate the chart
         */
        function exports(_selection) {
            _selection.each(function(_data) {
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = cleanData(_data);

                buildScales();
                buildSVG(this);
                drawRanges();
                // buildAxis();
                // drawGridLines();
                // drawBars();
                // drawAxis();

            });
        }

        /**
         * Creates the d3 x and y axis, setting orientations
         * @private
         */
        function buildAxis() {
            if (isHorizontal) {
                xAxis = d3Axis.axisBottom(xScale)
                    .ticks(xTicks, numberFormat)
                    .tickSizeInner([-chartHeight]);

                yAxis = d3Axis.axisLeft(yScale);
            } else {
                xAxis = d3Axis.axisBottom(xScale);

                yAxis = d3Axis.axisLeft(yScale)
                    .ticks(yTicks, numberFormat)
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
                  .attr('transform', `translate(${margin.left}, ${margin.top})`);

            container
                .append('g').classed('grid-lines-group', true);
            container
                .append('g').classed('chart-group', true);
            container
                .append('g').classed('axis', true);
            container
                .append('g').classed('metadata-group', true);
        }

        /**
         * Creates the x scales of the chart
         * @return {void}
         * @private
         */
        function buildScales() {
            const decidedRange = isReverse ? [chartWidth, 0] : [0, chartWidth];

            xScale = d3Scale.scaleLinear()
                .domain([0, Math.max(ranges[0], markers[0], measures[0])])
                .rangeRound(decidedRange)
                .nice();

            // Derive width scales from x scales
            w0 = bulletWidth(xScale);

            // set up opacity scale
            opacityScale = ranges.map((d, i) => startMaxRangeOpacity - (i * opacityDiff)).reverse();
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
                      .classed('britechart bullet-chart', true);

                buildContainerGroups();
            }

            svg
                .attr('width', width)
                .attr('height', height);
        }

        /**
         * Calculates bullet width
         * @private
         */
        function bulletWidth(x) {
            const x0 = x(0);

            return function (d) {
                return Math.abs(x(d) - x0);
            }
        }

        /**
         * Cleaning data casting the values and names to the proper type while keeping
         * the rest of properties on the data
         * It also creates a set of zeroed data (for animation purposes)
         * @param  {BarChartData} originalData  Raw data as passed to the container
         * @return  {BarChartData}              Clean data
         * @private
         */
        function cleanData(originalData) {
            const newData = {
                ranges: originalData.ranges.slice().sort().reverse(),
                measures: originalData.measures.slice().sort().reverse(),
                markers: originalData.markers.slice().sort().reverse(),
                subtitle,
                title
            };

            ({title, subtitle, ranges, measures, markers} = newData);

            return newData;
        }

        /**
         * Draws the measures of the bullet chart
         * @private
         */
        function drawRanges() {
            let range = svg.select('.chart-group')
                .selectAll('rect.range')
                .data(ranges)
                .enter()
                .append('rect')
                  .attr('fill', colorSchema[0])
                  .attr('opacity', (d, i) => opacityScale[i])
                  .attr('class', (d, i) => `range r${i}`)
                  .attr('width', w0)
                  .attr('height', chartHeight)
                  .attr('x', isReverse ? xScale : 0);

            let measure = svg.select('.chart-group')
                .selectAll('rect.measure')
                .data(measures)
                .enter()
                .append('rect')
                  .attr('fill', measureColor)
                  .attr('class', (d, i) => `measure m${i}`)
                  .attr('width', w0)
                  .attr('height', chartHeight / 3)
                  .attr('x', isReverse ? xScale : 0)
                  .attr('y', chartHeight / 3);


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
                .on('mouseover', function(d, index, barList) {
                    handleMouseOver(this, d, barList, chartWidth, chartHeight);
                })
                .on('mousemove', function(d) {
                    handleMouseMove(this, d, chartWidth, chartHeight);
                })
                .on('mouseout', function(d, index, barList) {
                    handleMouseOut(this, d, barList, chartWidth, chartHeight);
                })
                .on('click', function(d) {
                    handleClick(this, d, chartWidth, chartHeight);
                });

            bars
                .attr('x', 0)
                .attr('y', ({name}) => yScale(name))
                .attr('height', yScale.bandwidth())
                .attr('fill', ({name}) => colorMap(name))
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
                .on('mouseover', function(d, index, barList) {
                    handleMouseOver(this, d, barList, chartWidth, chartHeight);
                })
                .on('mousemove', function(d) {
                    handleMouseMove(this, d, chartWidth, chartHeight);
                })
                .on('mouseout', function(d, index, barList) {
                    handleMouseOut(this, d, barList, chartWidth, chartHeight);
                })
                .on('click', function(d) {
                    handleClick(this, d, chartWidth, chartHeight);
                })
              .merge(bars)
                .attr('x', ({name}) => xScale(name))
                .attr('width', xScale.bandwidth())
                .attr('fill', ({name}) => colorMap(name))
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
                .on('mouseover', function(d, index, barList) {
                    handleMouseOver(this, d, barList, chartWidth, chartHeight);
                })
                .on('mousemove', function(d) {
                    handleMouseMove(this, d, chartWidth, chartHeight);
                })
                .on('mouseout', function(d, index, barList) {
                    handleMouseOut(this, d, barList, chartWidth, chartHeight);
                })
                .on('click', function(d) {
                    handleClick(this, d, chartWidth, chartHeight);
                })
              .merge(bars)
                .attr('x', ({name}) => xScale(name))
                .attr('y', ({value}) => yScale(value))
                .attr('width', xScale.bandwidth())
                .attr('height', ({value}) => chartHeight - yScale(value))
                .attr('fill', ({name}) => colorMap(name));
        }

        /**
         * Draws labels at the end of each bar
         * @private
         * @return {void}
         */
        function drawLabels() {
            let labelXPosition = isHorizontal ? _labelsHorizontalX : _labelsVerticalX;
            let labelYPosition = isHorizontal ? _labelsHorizontalY : _labelsVerticalY;
            let text = _labelsFormatValue

            if (labelEl) {
                svg.selectAll('.percentage-label-group').remove();
            }

            labelEl = svg.select('.metadata-group')
              .append('g')
                .classed('percentage-label-group', true)
                .selectAll('text')
                .data(data.reverse())
                .enter()
              .append('text');

            labelEl
                .classed('percentage-label', true)
                .attr('x', labelXPosition)
                .attr('y', labelYPosition)
                .text(text)
                .attr('font-size', labelsSize + 'px')
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

                if (isHorizontal) {
                    drawHorizontalBars(bars);
                } else {
                    drawVerticalBars(bars);
                }

                bars = svg.select('.chart-group').selectAll('.bar')
                    .data(data);

                if (isHorizontal) {
                    drawAnimatedHorizontalBars(bars);
                } else {
                    drawAnimatedVerticalBars(bars);
                }
            } else {
                bars = svg.select('.chart-group').selectAll('.bar')
                    .data(data);

                if (isHorizontal) {
                    drawHorizontalBars(bars);
                } else {
                    drawVerticalBars(bars);
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
            svg.select('.grid-lines-group')
                .selectAll('line')
                .remove();

            if (isHorizontal) {
                drawHorizontalGridLines();
            } else {
                drawVerticalGridLines();
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
         * Custom OnMouseOver event handler
         * @return {void}
         * @private
         */
        function handleMouseOver(e, d, barList, chartWidth, chartHeight) {
            dispatcher.call('customMouseOver', e, d, d3Selection.mouse(e), [chartWidth, chartHeight]);
            highlightBarFunction = highlightBarFunction || function() {};

            if (hasSingleBarHighlight) {
                highlightBarFunction(d3Selection.select(e));
                return;
            }

            barList.forEach(barRect => {
                if (barRect === e) {
                    return;
                }
                highlightBarFunction(d3Selection.select(barRect));
            });
        }

        /**
         * Custom OnMouseMove event handler
         * @return {void}
         * @private
         */
        function handleMouseMove(e, d, chartWidth, chartHeight) {
            dispatcher.call('customMouseMove', e, d, d3Selection.mouse(e), [chartWidth, chartHeight]);
        }

        /**
         * Custom OnMouseOver event handler
         * @return {void}
         * @private
         */
        function handleMouseOut(e, d, barList, chartWidth, chartHeight) {
            dispatcher.call('customMouseOut', e, d, d3Selection.mouse(e), [chartWidth, chartHeight]);

            barList.forEach((barRect) => {
                d3Selection.select(barRect).attr('fill', ({name}) => colorMap(name));
            });
        }

        /**
         * Custom onClick event handler
         * @return {void}
         * @private
         */
        function handleClick(e, d, chartWidth, chartHeight) {
            dispatcher.call('customClick', e, d, d3Selection.mouse(e), [chartWidth, chartHeight]);
        }

        // API

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
        };

        /**
         * Chart exported to png and a download action is fired
         * @param {String} filename     File title for the resulting picture
         * @param {String} title        Title to add at the top of the exported picture
         * @public
         */
        exports.exportChart = function(filename, title) {
            exportChart.call(exports, svg, filename, title);
        };

        /**
         * Gets or Sets the height of the chart
         * @param  {number} _x Desired width for the graph
         * @return {height | module} Current height or Chart module to chain calls
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
         * Gets or Sets the horizontal direction of the chart
         * @param  {number} _x Desired horizontal direction for the graph
         * @return { isHorizontal | module} If it is horizontal or Chart module to chain calls
         * @public
         */
        exports.isHorizontal = function(_x) {
            if (!arguments.length) {
                return isHorizontal;
            }
            isHorizontal = _x;

            return this;
        };


        /**
         * Gets or Sets the starting point of the copacity
         * range.
         * @param  {Number} _x D        desired startMaxRangeOpacity for chart
         * @return {Number | module}    current startMaxRangeOpacity or Chart module to chain calls
         * @public
         */
        exports.startMaxRangeOpacity = function(_x) {
            if (!arguments.length) {
                return maxRangeOpacity;
            }
            maxRangeOpacity = _x;

            return this;
        }

        /**
         * Gets or Sets the margin of the chart
         * @param  {object} _x Margin object to get/set
         * @return {margin | module} Current margin or Chart module to chain calls
         * @public
         */
        exports.margin = function(_x) {
            if (!arguments.length) {
                return margin;
            }
            margin = {
                ...margin,
                ..._x
            };

            return this;
        };

        /**
         * Gets or Sets the number format of the bar chart
         * @param  {string} _x Desired number format for the bar chart
         * @return {numberFormat | module} Current numberFormat or Chart module to chain calls
         * @public
         */
        exports.numberFormat = function(_x) {
            if (!arguments.length) {
                return numberFormat;
            }
            numberFormat = _x;

            return this;
        }

        /**
         * Exposes an 'on' method that acts as a bridge with the event dispatcher
         * We are going to expose this events:
         * customMouseOver, customMouseMove, customMouseOut, and customClick
         *
         * @return {module} Bar Chart
         * @public
         */
        exports.on = function() {
            let value = dispatcher.on.apply(dispatcher, arguments);

            return value === dispatcher ? exports : value;
        };

        /**
         * Gets or Sets the width of the chart
         * @param  {number} _x Desired width for the graph
         * @return {width | module} Current width or Chart module to chain calls
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
         * Gets or Sets the number of ticks of the x axis on the chart
         * (Default is 5)
         * @param  {Number} _x          Desired horizontal ticks
         * @return {Number | module}    Current xTicks or Chart module to chain calls
         * @public
         */
        exports.xTicks = function (_x) {
            if (!arguments.length) {
                return xTicks;
            }
            xTicks = _x;

            return this;
        };

        /**
         * Space between y axis and chart
         * (Default 10)
         * @param  {Number} _x          Space between y axis and chart
         * @return {Number| module}     Current value of yAxisPaddingBetweenChart or Chart module to chain calls
         * @public
         */
        exports.yAxisPaddingBetweenChart = function(_x) {
            if (!arguments.length) {
                return yAxisPaddingBetweenChart;
            }
            yAxisPaddingBetweenChart = _x;

            return this;
        };

        /**
         * Gets or Sets the number of vertical ticks on the chart
         * (Default is 6)
         * @param  {Number} _x          Desired number of vertical ticks for the graph
         * @return {Number | module}    Current yTicks or Chart module to chain calls
         * @public
         */
        exports.yTicks = function(_x) {
            if (!arguments.length) {
                return yTicks;
            }
            yTicks = _x;

            return this;
        };

        return exports;
    };

});
