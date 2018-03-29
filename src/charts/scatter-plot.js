define(function(require) {
    'use strict';

    const d3Array = require('d3-array');
    const d3Axis = require('d3-axis');
    const d3Collection = require('d3-collection');
    const d3Dispatch = require('d3-dispatch');
    const d3Ease = require('d3-ease');
    const d3Format = require('d3-format');
    const d3Scale = require('d3-scale');
    const d3Selection = require('d3-selection');
    const d3Transition = require('d3-transition');
    const d3TimeFormat = require('d3-time-format');

    const {exportChart} = require('./helpers/export');
    const colorHelper = require('./helpers/color');

    const {
        formatIntegerValue,
        formatDecimalValue,
        isInteger,
        uniqueId
    } = require('./helpers/number');

    /**
     * @typedef ScatterPlotData
     * @type {Object[]}
     * @property {String} name      Name of the category or topic for data point
     * @property {Number} x         Data point's position value relative to x-axis
     * @property {Number} y         Data point's position value relative to y-axis
     * @property {Number} [size]    Data point's relative size
     *
     * @example
     * [
     *     {
     *         name: 'topic',
     *         x: 123,
     *         y: 24,
     *         size: 95
     *     },
     *     {
     *         name: 'topic1',
     *         x: 53,
     *         y: 31,
     *         size: 48
     *     },
     *     {
     *         name: 'topic',
     *         x: 631,
     *         y: 321,
     *         size: 234
     *     }
     * ]
     */

    /**
     * Reusable Scatter Plot API class that renders a
     * simple and configurable scatter chart.
     *
     * @module Scatter-plot
     * @tutorial scatter-plot
     * @requires d3-array, d3-dispatch, d3-ease, d3-scale, d3-selection
     *
     * @example
     * let scatterPlot = scatterPlot();
     *
     * scatterPlot
     *     .aspectRatio(0.5)
     *     .grid('horizontal')
     *     .width(500);
     *
     * d3Selection.select('.css-selector')
     *     .datum(dataset)
     *     .call(scatterPlot);
     */
    return function module() {

        let margin = {
            top: 20,
            right: 10,
            bottom: 20,
            left: 40
        },
        width = 960,
        height = 500,
        aspectRatio = null,

        nameColorMap,

        dataPoints,

        xKey = 'x',
        yKey = 'y',
        nameKey = 'name',

        xTicks = 6,
        yTicks = null,
        tickPadding = 5,
        hollowColor = '#fff',

        grid = null,
        baseLine,
        maskGridLines,

        xAxis,
        xScale,
        yAxis,
        yAxisFormat = null,
        yScale,
        areaScale,
        colorScale,

        yAxisLabel,
        yAxisLabelEl,
        yAxisLabelOffset = -40,
        xAxisLabel,
        xAxisLabelEl,
        xAxisLabelOffset = -40,

        xAxisPadding = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },

        circleOpacity = 0.24,
        maxCircleArea = 10,

        colorSchema = colorHelper.colorSchemas.britecharts,

        isAnimated = true,
        ease = d3Ease.easeCircleIn,
        delay = 500,
        duration = 500,

        hasHollowCircles = false,

        svg,
        chartWidth,
        chartHeight,

        dispatcher = d3Dispatch.dispatch(
            'customClick'
        ),

        getName = ({name}) => name;

        /**
         * This function creates the graph using the selection as container
         * @param  {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         * @param {ScatterPlotData} _data The data to attach and generate the chart
         */
        function exports(_selection) {
            _selection.each(function(_data) {
                dataPoints = cleanData(_data);

                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;

                buildScales();
                buildSVG(this);
                buildAxis();
                drawAxis();
                drawGridLines();
                drawDataPoints();

            });
        }

        /**
         * Creates the x-axis and y-axis with proper orientations
         * @private
        */
        function buildAxis() {
            xAxis = d3Axis.axisBottom(xScale)
                .ticks(xTicks)
                .tickPadding(tickPadding);

            yAxis = d3Axis.axisLeft(yScale)
                .ticks(yTicks)
                .tickPadding(tickPadding)
                .tickFormat(d3Format.format(yAxisFormat));
        }

        /**
         * Builds containers for the chart, including the chart axis,
         * chart, and metadata groups.
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
                .append('g').classed('x-axis-group', true)
                .append('g').classed('axis x', true);
            container
                .append('g').classed('y-axis-group', true)
                .append('g').classed('axis y', true);
            container
                .append('g').classed('axis-labels-group', true);
            container
                .append('g').classed('metadata-group', true);
        }

        /**
         * Draws the x and y axis on the svg object within their
         * respective groups along with their axis labels
         * @private
         */
        function drawAxis() {
            svg.select('.x-axis-group .axis.x')
                .attr('transform', `translate(0, ${chartHeight})`)
                .call(xAxis);

            svg.select('.y-axis-group .axis.y')
                .call(yAxis);

            drawAxisLabels();
        }

        /**
         * Draws axis labels next to x and y axis to
         * represent data value labels on the chart
         * @private
         */
        function drawAxisLabels() {
            // If y-axis label is given, draw it
            if (yAxisLabel) {
                if (yAxisLabelEl) {
                    svg.selectAll('.y-axis-label-text').remove();
                }

                yAxisLabelEl = svg.select('.axis-labels-group')
                    .append('g')
                    .attr('class', 'y-axis-label')
                      .append('text')
                      .classed('y-axis-label-text', true)
                      .attr('x', -chartHeight / 2)
                      .attr('y', yAxisLabelOffset - xAxisPadding.left)
                      .attr('text-anchor', 'middle')
                      .attr('transform', 'rotate(270 0 0)')
                      .text(yAxisLabel)
            }

            // If x-axis label is given, draw it
            if (xAxisLabel) {
                if (xAxisLabelEl) {
                    svg.selectAll('.x-axis-label-text').remove();
                }

                xAxisLabelEl = svg.selectAll('.axis-labels-group')
                    .append('g')
                    .attr('class', 'x-axis-label')
                      .append('text')
                      .classed('x-axis-label-text', true)
                      .attr('x', chartWidth / 2)
                      .attr('y', chartHeight - xAxisLabelOffset)
                      .attr('text-anchor', 'middle')
                      .text(xAxisLabel);
            }
        }

        /**
         * Draws grid lines on the background of the chart
         * @return void
         */
        function drawGridLines() {
            svg.select('.grid-lines-group')
                .selectAll('line')
                .remove();

            if (grid === 'horizontal' || grid === 'full') {
                drawHorizontalGridLines();
            }

            if (grid === 'vertical' || grid === 'full') {
                drawVerticalGridLines();
            }

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
         * Draw horizontal gridles of the chart
         * These gridlines are parallel to x-axis
         * @return {void}
         */
        function drawHorizontalGridLines() {
            maskGridLines = svg.select('.grid-lines-group')
                .selectAll('line.horizontal-grid-line')
                .data(yScale.ticks(yTicks))
                .enter()
                .append('line')
                .attr('class', 'horizontal-grid-line')
                .attr('x1', (xAxisPadding.left))
                .attr('x2', chartWidth)
                .attr('y1', (d) => yScale(d))
                .attr('y2', (d) => yScale(d))
        }

        /**
         * Draws vertical gridlines of the chart
         * These gridlines are parallel to y-axis
         * @return {void}
         */
        function drawVerticalGridLines() {
            maskGridLines = svg.select('.grid-lines-group')
                .selectAll('line.vertical-grid-line')
                .data(yScale.ticks(xTicks))
                .enter()
                .append('line')
                .attr('class', 'vertical-grid-line')
                .attr('y1', (xAxisPadding.left))
                .attr('y2', chartHeight)
                .attr('x1', (d) => xScale(d))
                .attr('x2', (d) => xScale(d));
        }

        /**
         * Creates the x and y scales of the chart
         * @private
         */
        function buildScales() {
            const [minX, minY] = [d3Array.min(dataPoints, ({x}) => x), d3Array.min(dataPoints, ({y}) => y)];
            const [maxX, maxY] = [d3Array.max(dataPoints, ({x}) => x), d3Array.max(dataPoints, ({y}) => y)];
            const yScaleBottomValue = Math.abs(minY) < 0 ? Math.abs(minY) : 0;

            xScale = d3Scale.scaleLinear()
                .domain([minX, maxX])
                .rangeRound([0, chartWidth])
                .nice();

            yScale = d3Scale.scaleLinear()
                .domain([yScaleBottomValue, maxY])
                .rangeRound([chartHeight, 0])
                .nice();

            colorScale = d3Scale.scaleOrdinal()
                .domain(dataPoints.map(getName))
                .range(colorSchema);

            areaScale = d3Scale.scaleSqrt()
                .domain([yScaleBottomValue, maxY])
                .range([0, maxCircleArea]);

            const colorRange = colorScale.range();

            /**
             * Maps data point category name to
             * each color of the given color scheme
             * {
             *     name1: 'color1',
             *     name2: 'color2',
             *     name3: 'color3',
             *     ...
             * }
             * @private
             */
            nameColorMap = colorScale.domain().reduce((accum, item, i) => {
                accum[item] = colorRange[i];

                return accum;
            }, {});
        }

        /**
         * Builds the SVG element that will contain the chart
         * @param {HTMLElement} container A DOM element that will work as
         * the container of the chart
         * @private
         */
        function buildSVG(container) {
            if (!svg) {
                svg = d3Selection.select(container)
                  .append('svg')
                    .classed('britechart scatter-plot', true);

                buildContainerGroups();
            }

            svg
                .attr('width', width)
                .attr('height', height);
        }

        /**
         * Cleaning data casting the values and names to the proper type while keeping
         * the rest of properties on the data
         * @param  {ScatterPlotData} originalData  Raw data as passed to the container
         * @return  {ScatterPlotData}              Clean data
         * @private
         */
        function cleanData(originalData) {
            return originalData.reduce((acc, d) => {
                d.name = String(d[nameKey]);
                d.x = d[xKey];
                d.y = d[yKey];

                return [...acc, d];
            }, []);
        }

        /**
         * Draws the points for each data element
         * on the chart group
         * @private
        */
        function drawDataPoints() {
            let circles = svg.select('.chart-group')
                .selectAll('circle')
                .data(dataPoints)
                .enter();

            if (isAnimated) {
                circles
                  .append('circle')
                    .on('click', function (d) {
                        handleClick(this, d, chartWidth, chartHeight);
                    })
                    .transition()
                    .delay(delay)
                    .duration(duration)
                    .ease(ease)
                    .attr('class', 'point')
                    .attr('class', 'data-point-highlighter')
                    .style('stroke', (d) => (
                        hasHollowCircles ? nameColorMap[d.name] : null
                    ))
                    .attr('opacity', circleOpacity)
                    .attr('r', (d) => areaScale(d.y))
                    .attr('cx', (d) => xScale(d.x))
                    .attr('cy', (d) => yScale(d.y))
                    .attr('fill', (d) => (
                        hasHollowCircles ? hollowColor : nameColorMap[d.name]
                    ))
                    .style('cursor', 'pointer');
            } else {
                circles
                    .append('circle')
                      .on('click', function (d) {
                          handleClick(this, d, chartWidth, chartHeight);
                      })
                      .attr('class', 'point')
                      .attr('class', 'data-point-highlighter')
                      .style('stroke', (d) => (
                          hasHollowCircles ? nameColorMap[d.name] : null
                      ))
                      .attr('opacity', circleOpacity)
                      .attr('r', (d) => areaScale(d.y))
                      .attr('cx', (d) => xScale(d.x))
                      .attr('cy', (d) => yScale(d.y))
                      .attr('fill', (d) => (
                          hasHollowCircles ? hollowColor : nameColorMap[d.name]
                      ))
                      .style('cursor', 'pointer');
            }
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
         * Gets or Sets the aspect ratio of the chart
         * @param  {Number} _x            Desired aspect ratio for the graph
         * @return {aspectRatio | module} Current aspect ratio or Chart module to chain calls
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
         * Gets or Sets the circles opacity value of the chart.
         * Use this to set opacity of a circle for each data point of the chart.
         * It makes the area of each data point more transparent if it's less than 1.
         * @param  {Number} _x=0.24            Desired opacity of circles of the chart
         * @return {circleOpacity | module}    Current circleOpacity or Scatter Chart module to chain calls
         * @public
         * @example
         * scatterPlot.circleOpacity(0.6)
         */
        exports.circleOpacity = function (_x) {
            if (!arguments.length) {
                return circleOpacity;
            }
            circleOpacity = _x;

            return this;
        }


        /**
         * Gets or Sets the colorSchema of the chart
         * @param  {String[]} _x            Desired colorSchema for the chart
         * @return {colorSchema | module}   Current colorSchema or Chart module to chain calls
         * @public
         * @example
         * scatterPlot.colorSchema(['#fff', '#bbb', '#ccc'])
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
        exports.exportChart = function (filename, title) {
            exportChart.call(exports, svg, filename, title);
        };

        /**
         * Gets or Sets the grid mode.
         *
         * @param  {String} _x Desired mode for the grid ('vertical'|'horizontal'|'full')
         * @return {String | module} Current mode of the grid or Area Chart module to chain calls
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
         * Gets or Sets the hasHollowCircles value of the chart area
         * @param  {boolean} _x=false             Choose whether chart's data points/circles should be hollow
         * @return {hasHollowCircles | module}    Current hasHollowCircles value or Scatter Chart module to chain calls
         * @public
         */
        exports.hasHollowCircles = function (_x) {
            if (!arguments.length) {
                return hasHollowCircles;
            }
            hasHollowCircles = _x;

            return this;
        }

        /**
         * Gets or Sets the height of the chart
         * @param  {Number} _x          Desired height for the chart
         * @return {height | module}    Current height or Scatter Chart module to chain calls
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
         * Gets or Sets isAnimated value. If set to true,
         * the chart will be initialized or updated with animation.
         * @param  {boolean} _x=false       Desired margin object properties for each side
         * @return {isAnimated | module}    Current height or Scatter Chart module to chain calls
         * @public
         */
        exports.isAnimated = function(_x) {
            if (!arguments.length) {
                return isAnimated;
            }
            isAnimated = _x;

            return this;
        }

        /**
         * Gets or Sets the margin object of the chart
         * @param  {Object} _x          Desired margin object properties for each side
         * @return {margin | module}    Current height or Scatter Chart module to chain calls
         * @public
         */
        exports.margin = function(_x) {
            if (!arguments.length) {
                return margin;
            }
            margin = {
                ...margin,
                ..._x,
            };

            return this;
        };

        /**
         * Gets or Sets the maximum value of the chart area
         * @param  {Number} _x=10       Desired margin object properties for each side
         * @return {maxCircleArea | module}    Current height or Scatter Chart module to chain calls
         * @public
         */
        exports.maxCircleArea = function(_x) {
            if (!arguments.length) {
                return maxCircleArea;
            }
            maxCircleArea = _x;

            return this;
        }

        /**
         * Exposes an 'on' method that acts as a bridge with the event dispatcher
         * We are going to expose this events:
         * customClick
         *
         * @return {module} Scatter Plot
         * @public
         */
        exports.on = function () {
            let value = dispatcher.on.apply(dispatcher, arguments);

            return value === dispatcher ? exports : value;
        };

        /**
         * Gets or Sets the height of the chart
         * @param  {Number} _x          Desired height for the chart
         * @return {width | module}    Current width or Scatter Chart module to chain calls
         * @public
         */
        exports.width = function(_x) {
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
         * Gets or Sets the xAxisLabel of the chart. Adds a
         * label bellow x-axis for better clarify of data representation.
         * @param  {String} _x              Desired string for x-axis label of the chart
         * @return {xAxisLabel | module}    Current width or Scatter Chart module to chain calls
         * @public
         */
        exports.xAxisLabel = function(_x) {
            if (!arguments.length) {
                return xAxisLabel;
            }
            xAxisLabel = _x;

            return this;
        };

        /**
         * Gets or Sets the offset of the xAxisLabel of the chart.
         * The method accepts both positive and negative values.
         * @param  {Number} _x=-40                Desired offset for the label
         * @return {xAxisLabelOffset | module}    Current xAxisLabelOffset or Chart module to chain calls
         * @public
         * @example scatterPlot.xAxisLabelOffset(-55)
         */
        exports.xAxisLabelOffset = function (_x) {
            if (!arguments.length) {
                return xAxisLabelOffset;
            }
            xAxisLabelOffset = _x;

            return this;
        };

        /**
         * Gets or Sets the xTicks of the chart
         * @param  {Number} _x         Desired height for the chart
         * @return {xTicks | module}    Current width or Scatter Chart module to chain calls
         * @public
         */
        exports.xTicks = function(_x) {
            if (!arguments.length) {
                return xTicks;
            }
            xTicks = _x;

            return this;
        };

        /**
         * Exposes ability to set the format of y-axis values
         * @param  {String} _x         Desired height for the chart
         * @return {yAxisFormat | module}    Current width or Scatter Chart module to chain calls
         * @public
         */
        exports.yAxisFormat = function(_x) {
            if (!arguments.length) {
                return yAxisFormat;
            }
            yAxisFormat = _x;

            return this;
        }

        /**
         * Gets or Sets the y-axis label of the chart
         * @param  {String} _x Desired label string
         * @return {yAxisLabel | module} Current yAxisLabel or Chart module to chain calls
         * @public
         * @example scatterPlot.yAxisLabel('Ice Cream Consmuption Growth')
         */
        exports.yAxisLabel = function (_x) {
            if (!arguments.length) {
                return yAxisLabel;
            }
            yAxisLabel = _x;

            return this;
        };

        /**
         * Gets or Sets the offset of the yAxisLabel of the chart.
         * The method accepts both positive and negative values.
         * @param  {Number} _x=-40      Desired offset for the label
         * @return {yAxisLabelOffset | module}    Current yAxisLabelOffset or Chart module to chain calls
         * @public
         * @example scatterPlot.yAxisLabelOffset(-55)
         */
        exports.yAxisLabelOffset = function (_x) {
            if (!arguments.length) {
                return yAxisLabelOffset;
            }
            yAxisLabelOffset = _x;

            return this;
        }

        /**
         * Gets or Sets the xTicks of the chart
         * @param  {Number} _x         Desired height for the chart
         * @return {xTicks | module}    Current width or Scatter Chart module to chain calls
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