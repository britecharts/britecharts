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
            yTicks = 5,
            xTicks = 5,
            percentageAxisToMaxRatio = 1,
            enablePercentageLabels = false,
            betweenBarsPadding = 0.1,
            percentageLabelMargin = 7,
            percentageLabelSize = 12,
            horizontalLabelFormat = '.0%',
            verticalLabelFormat = '.0f',
            numberFormat = NUMBER_FORMAT,
            xAxis, yAxis,
            xAxisPadding = {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            },
            yAxisPaddingBetweenChart = 10,
            yAxisLineWrapLimit = 1,
            isHorizontal = false,
            svg,

            isAnimated = false,
            ease = d3Ease.easeQuadInOut,
            animationDuration = 800,
            animationStepRatio = 70,
            interBarDelay = (d, i) => animationStepRatio * i,

            orderingFunction,

            valueLabel = 'value',
            nameLabel = 'name',

            baseLine,
            maskGridLines,
            shouldReverseColorList = true,

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
                ({data, dataZeroed} = sortData(cleanData(_data)));

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

            if (isHorizontal) {
                xScale = d3Scale.scaleLinear()
                    .domain([0, percentageAxis])
                    .rangeRound([0, chartWidth]);

                yScale = d3Scale.scaleBand()
                    .domain(data.map(getName))
                    .rangeRound([chartHeight, 0])
                    .padding(betweenBarsPadding);
            } else {
                xScale = d3Scale.scaleBand()
                    .domain(data.map(getName))
                    .rangeRound([0, chartWidth])
                    .padding(betweenBarsPadding);

                yScale = d3Scale.scaleLinear()
                    .domain([0, percentageAxis])
                    .rangeRound([chartHeight, 0]);
            }

            if (shouldReverseColorList) {
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
         * Cleaning data casting the values and names to the proper type while keeping 
         * the rest of properties on the data
         * It also creates a set of zeroed data (for animation purposes)
         * @param  {BarChartData} originalData  Raw data as passed to the container
         * @return  {BarChartData}              Clean data
         * @private
         */
        function cleanData(originalData) {
            let data = originalData.reduce((acc, d) => {
                d.value = +d[valueLabel];
                d.name = String(d[nameLabel]);

                return [...acc, d];
            }, []);

            let dataZeroed = data.map((d) => ({
                value: 0,
                name: String(d[nameLabel])
            }));

            return { data, dataZeroed };
        }

        /**
         * Sorts data if orderingFunction is specified
         * @param  {BarChartData}     clean unordered data
         * @return  {BarChartData}    clean ordered data
         * @private
         */
        function sortData(unorderedData) {
            let {data, dataZeroed} = unorderedData; 

            if (orderingFunction) {
                data.sort(orderingFunction); 
                dataZeroed.sort(orderingFunction)
            }
            
            return { data, dataZeroed };
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
                .on('mouseover', function(d) {
                    handleMouseOver(this, d, chartWidth, chartHeight);
                })
                .on('mousemove', function(d) {
                    handleMouseMove(this, d, chartWidth, chartHeight);
                })
                .on('mouseout', function(d) {
                    handleMouseOut(this, d, chartWidth, chartHeight);
                })
              .merge(bars)
                .attr('x', 0)
                .attr('y', ({name}) => yScale(name))
                .attr('height', yScale.bandwidth())
                .attr('width', ({value}) => xScale(value))
                .attr('fill', ({name}) => colorMap(name));
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
                .on('mouseover', function(d) {
                    handleMouseOver(this, d, chartWidth, chartHeight);
                })
                .on('mousemove', function(d) {
                    handleMouseMove(this, d, chartWidth, chartHeight);
                })
                .on('mouseout', function(d) {
                    handleMouseOut(this, d, chartWidth, chartHeight);
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
                .on('mouseover', function(d) {
                    handleMouseOver(this, d, chartWidth, chartHeight);
                })
                .on('mousemove', function(d) {
                    handleMouseMove(this, d, chartWidth, chartHeight);
                })
                .on('mouseout', function(d) {
                    handleMouseOut(this, d, chartWidth, chartHeight);
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
                .on('mouseover', function(d) {
                    handleMouseOver(this, d, chartWidth, chartHeight);
                })
                .on('mousemove', function(d) {
                    handleMouseMove(this, d, chartWidth, chartHeight);
                })
                .on('mouseout', function(d) {
                    handleMouseOut(this, d, chartWidth, chartHeight);
                })
              .merge(bars)
                .attr('x', ({name}) => xScale(name))
                .attr('y', ({value}) => yScale(value))
                .attr('width', xScale.bandwidth())
                .attr('height', ({value}) => chartHeight - yScale(value))
                .attr('fill', ({name}) => colorMap(name));
        }

        /**
         * Draws percentage labels at the end of each bar
         * @private
         * @return {void}
         */
        function drawPercentageLabels() {
            let labelXPosition = isHorizontal ? _percentageLabelHorizontalX : _percentageLabelVerticalX;
            let labelYPosition = isHorizontal ? _percentageLabelHorizontalY : _percentageLabelVerticalY;
            let text = isHorizontal ? _percentageLabelHorizontalFormatValue : _percentageLabelVerticalFormatValue;

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
        function handleMouseOver(e, d, chartWidth, chartHeight) {
            dispatcher.call('customMouseOver', e, d, d3Selection.mouse(e), [chartWidth, chartHeight]);
            d3Selection.select(e).attr('fill', ({name}) => d3Color.color(colorMap(name)).darker());
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
        function handleMouseOut(e, d, chartWidth, chartHeight) {
            dispatcher.call('customMouseOut', e, d, d3Selection.mouse(e), [chartWidth, chartHeight]);
            d3Selection.select(e).attr('fill', ({name}) => colorMap(name));
        }

        // API

        /**
         * Gets or Sets the padding of the chart (Default is 0.1)
         * @param  { Number | module } _x Padding value to get/set
         * @return { padding | module} Current padding or Chart module to chain calls
         * @public
         */
        exports.betweenBarsPadding = function(_x) {
            if (!arguments.length) {
                return betweenBarsPadding;
            }
            betweenBarsPadding = _x;

            return this;
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
        };

        /**
         * Default false. If true, adds percentage labels at the end of the bars
         * @param  {Boolean} _x
         * @return {Boolean | module}    Current value of enablePercentageLables or Chart module to chain calls
         */
        exports.enablePercentageLabels = function(_x) {
            if (!arguments.length) {
                return enablePercentageLabels;
            }
            enablePercentageLabels = _x;

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
         * @return { height | module} Current height or Chart module to chain calls
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
         * Gets or Sets the margin of the chart
         * @param  {object} _x Margin object to get/set
         * @return { margin | module} Current margin or Chart module to chain calls
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
         * Configurable extension of the x axis
         * if your max point was 50% you might want to show x axis to 60%, pass 1.2
         * @param  {number} _x ratio to max data point to add to the x axis
         * @return { ratio | module} Current ratio or Chart module to chain calls
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
         * @return {number | module}    Currnet offset or Chart module to chain calls
         */
        exports.percentageLabelMargin = function(_x) {
            if (!arguments.length) {
                return percentageLabelMargin;
            }
            percentageLabelMargin = _x;

            return this;
        }

        /**
         * Gets or Sets whether the color list should be reversed or not
         * @param  {boolean} _x     Should reverse the color list
         * @return { boolean | module} Is color list being reversed
         * @public
         */
        exports.shouldReverseColorList = function(_x) {
            if (!arguments.length) {
                return shouldReverseColorList;
            }
            shouldReverseColorList = _x;

            return this;
        };


        /**
         * Changes the order of items given the custom function
         * @param  {Function} _x             A custom function that sets logic for ordering
         * @return { (Function | Module) }   Updated module with ordering function applied
         * @public
         */
        exports.orderingFunction = function(_x) {
            if (!arguments.length) {
                return orderingFunction;
            }
            orderingFunction = _x;

            return this;
        }

        /**
         * Gets or Sets the hasPercentage status
         * @param  {boolean} _x     Should use percentage as value format
         * @return { boolean | module} Is percentage used or Chart module to chain calls
         * @public
         */
        exports.hasPercentage = function(_x) {
            if (!arguments.length) {
                return numberFormat === PERCENTAGE_FORMAT;
            }
            if (_x) {
                numberFormat = PERCENTAGE_FORMAT;
            } else {
                numberFormat = NUMBER_FORMAT;
            }

            return this;
        };

        /**
         * Gets or Sets the numberFormat to a percentage format if true (default false)
         * @param  {boolean} _x     Should use percentage as value format
         * @return { boolean | module} Is percentage the value format used or Chart module to chain calls
         * @public
         */
        exports.usePercentage = function(_x) {
            if (!arguments.length) {
                return numberFormat === PERCENTAGE_FORMAT;
            }
            if (_x) {
                numberFormat = PERCENTAGE_FORMAT;
            } else {
                numberFormat = NUMBER_FORMAT;
            }

            return this;
        };

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
         * Gets or Sets the width of the chart
         * @param  {number} _x Desired width for the graph
         * @return { width | module} Current width or Chart module to chain calls
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
