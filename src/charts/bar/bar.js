import { max } from 'd3-array';
import { easeQuadInOut } from 'd3-ease';
import { axisBottom, axisLeft } from 'd3-axis';
import { color } from 'd3-color';
import { dispatch } from 'd3-dispatch';
import * as d3Format from 'd3-format';
import { scaleLinear, scaleBand } from 'd3-scale';
import { mouse, select } from 'd3-selection';
import 'd3-transition';

import { wrapTextWithEllipses } from '../helpers/text';
import { exportChart } from '../helpers/export';
import colorHelper from '../helpers/color';
import { barLoadingMarkup } from '../helpers/load';
import { uniqueId } from '../helpers/number';
import { setDefaultLocale } from '../helpers/locale';
import { dataKeyDeprecationMessage } from '../helpers/project';
import { motion } from '../helpers/constants';
import { gridHorizontal, gridVertical } from '../helpers/grid';

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
 * @typedef LocaleObject
 * @type {Object}
 * @property {String} decimal       the decimal point(e.g., ".")
 * @property {String} thousands     the group separator(e.g., ",")
 * @property {Number[]} grouping    the array of group sizes(e.g., [3]), cycled as needed
 * @property {String[]} currency    the currency prefix and suffix(e.g., ["$", ""])
 * @property {String[]} numerals    optional; an array of ten strings to replace the numerals 0 - 9.
 * @property {String} percent       optional; the percent sign(defaults to "%")
 * @property {String} minus         optional; the minus sign(defaults to hyphen - minus, "-")
 * @property {String} nan           optional; the not - a - number value(defaults "NaN")
 *
 * See some standard locale object values [here]{@link https://cdn.jsdelivr.net/npm/d3-format/locale/}.
 * @example
 * {
 *     "decimal": ",",
 *     "thousands": ".",
 *     "grouping": [3],
 *     "currency": ["", "\u00a0€"]
 * }
 */

/**
 * Bar Chart reusable API class that renders a
 * simple and configurable bar chart.
 *
 * @module Bar
 * @tutorial bar
 * @requires d3-array, d3-ease, d3-axis, d3-color, d3-dispatch, d3-format, d3-scale, d3-selection, d3-transition
 *
 * @example
 * var barChart = bar();
 *
 * barChart
 *     .height(500)
 *     .width(800);
 *
 * d3.select('.css-selector')
 *     .datum(dataset)
 *     .call(barChart);
 *
 */
export default function module() {
    let margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40,
        },
        width = 960,
        height = 500,
        isLoading = false,
        data,
        dataZeroed,
        chartWidth,
        chartHeight,
        xScale,
        yScale,
        colorSchema = colorHelper.singleColors.aloeGreen,
        colorList,
        nameToColorMap = null,
        chartGradientColors = null,
        chartGradientEl,
        chartGradientId = uniqueId('bar-gradient'),
        yTicks = 5,
        xTicks = 5,
        percentageAxisToMaxRatio = 1,
        numberFormat = NUMBER_FORMAT,
        enableLabels = false,
        labelsMargin = 7,
        labelsNumberFormat = NUMBER_FORMAT,
        labelsSize = 12,
        betweenBarsPadding = 0.1,
        xAxis,
        yAxis,
        xAxisPadding = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        yAxisPaddingBetweenChart = 10,
        yAxisLineWrapLimit = 1,
        isHorizontal = false,
        svg,
        hasSingleBarHighlight = true,
        isAnimated = false,
        ease = easeQuadInOut,
        animationDuration = motion.duration,
        animationStepRatio = 70,
        interBarDelay = (d, i) => animationStepRatio * i,
        highlightBarFunction = (barSelection) =>
            barSelection.attr('fill', ({ name }) =>
                color(
                    chartGradientColors
                        ? chartGradientColors[1]
                        : nameToColorMap[name]
                ).darker()
            ),
        orderingFunction,
        // To Deprecate
        valueLabel = 'value',
        nameLabel = 'name',
        labelEl,
        xAxisLabelEl = null,
        xAxisLabel = null,
        xAxisLabelOffset = 30,
        yAxisLabelEl = null,
        yAxisLabel = null,
        yAxisLabelOffset = -30,
        shouldReverseColorList = true,
        locale = null,
        localeFormatter = d3Format,
        // Dispatcher object to broadcast the mouse events
        // Ref: https://github.com/mbostock/d3/wiki/Internals#d3_dispatch
        dispatcher = dispatch(
            'customMouseOver',
            'customMouseOut',
            'customMouseMove',
            'customClick'
        ),
        // extractors
        getName = ({ name }) => name,
        getValue = ({ value }) => value,
        _labelsHorizontalX = ({ value }) => xScale(value) + labelsMargin,
        _labelsHorizontalY = ({ name }) =>
            yScale(name) + yScale.bandwidth() / 2 + labelsSize * (3 / 8),
        _labelsVerticalX = ({ name }) => xScale(name),
        _labelsVerticalY = ({ value }) => yScale(value) - labelsMargin;

    /**
     * This function creates the graph using the selection as container
     * @param  {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     * @param {BarChartData} _data The data to attach and generate the chart
     */
    function exports(_selection) {
        if (locale) {
            localeFormatter = setDefaultLocale(locale);
        }

        _selection.each(function (_data) {
            chartWidth =
                width -
                margin.left -
                margin.right -
                yAxisPaddingBetweenChart * 1.2;
            chartHeight = height - margin.top - margin.bottom;
            ({ data, dataZeroed } = sortData(cleanData(_data)));

            buildSVG(this);
            if (isLoading) {
                drawLoadingState();

                return;
            }
            cleanLoadingState();
            buildScales();
            buildAxis(localeFormatter);
            buildGradient();
            drawGridLines();
            drawAxis();
            drawBars();

            if (enableLabels) {
                drawLabels(localeFormatter);
            }
        });
    }

    /**
     * Creates the d3 x and y axis, setting orientations
     * @private
     */
    function buildAxis(locale) {
        if (isHorizontal) {
            xAxis = axisBottom(xScale)
                .ticks(xTicks, locale.format(numberFormat))
                .tickSizeInner([-chartHeight]);

            yAxis = axisLeft(yScale).ticks(yTicks, locale.format(numberFormat));
        } else {
            xAxis = axisBottom(xScale);

            yAxis = axisLeft(yScale).ticks(yTicks, locale.format(numberFormat));
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
            .attr(
                'transform',
                `translate(${margin.left + yAxisPaddingBetweenChart}, ${
                    margin.top
                })`
            );

        svg.append('g').classed('loading-state-group', true);

        container.append('g').classed('grid-lines-group', true);
        container.append('g').classed('chart-group', true);
        container
            .append('g')
            .classed('x-axis-group axis', true)
            .append('g')
            .classed('x-axis-label', true);
        container
            .append('g')
            .attr('transform', `translate(${-1 * yAxisPaddingBetweenChart}, 0)`)
            .classed('y-axis-group axis', true)
            .append('g')
            .classed('y-axis-label', true);
        container.append('g').classed('metadata-group', true);
    }

    /**
     * Builds the gradient element to be used later
     * @return {void}
     * @private
     */
    function buildGradient() {
        if (!chartGradientEl && chartGradientColors) {
            chartGradientEl = svg
                .select('.metadata-group')
                .append('linearGradient')
                .attr('id', chartGradientId)
                .attr('x1', '0%')
                .attr('y1', '0%')
                .attr('x2', '100%')
                .attr('y2', '100%')
                .attr('gradientUnits', 'userSpaceOnUse')
                .selectAll('stop')
                .data([
                    { offset: '0%', color: chartGradientColors[0] },
                    { offset: '50%', color: chartGradientColors[1] },
                ])
                .enter()
                .append('stop')
                .attr('offset', ({ offset }) => offset)
                .attr('stop-color', ({ color }) => color);
        }
    }

    /**
     * Creates the x and y scales of the graph
     * @private
     */
    function buildScales() {
        let percentageAxis = getPercentageAxis();

        if (isHorizontal) {
            xScale = scaleLinear()
                .domain([0, percentageAxis])
                .rangeRound([0, chartWidth]);

            yScale = scaleBand()
                .domain(data.map(getName))
                .rangeRound([0, chartHeight])
                .padding(betweenBarsPadding);
        } else {
            xScale = scaleBand()
                .domain(data.map(getName))
                .rangeRound([0, chartWidth])
                .padding(betweenBarsPadding);

            yScale = scaleLinear()
                .domain([0, percentageAxis])
                .rangeRound([chartHeight, 0]);
        }

        if (shouldReverseColorList) {
            colorList = data
                .map((d) => d)
                .reverse()
                .map(({ name }, i) => ({
                    name,
                    color: colorSchema[i % colorSchema.length],
                }));
        } else {
            colorList = data
                .map((d) => d)
                .map(({ name }, i) => ({
                    name,
                    color: colorSchema[i % colorSchema.length],
                }));
        }

        nameToColorMap =
            nameToColorMap ||
            data
                .map((d) => d)
                .reduce(
                    (acc, { name }, i) => ({
                        ...acc,
                        [name]: colorSchema[i % colorSchema.length],
                    }),
                    {}
                );
    }

    /**
     * Builds the SVG element that will contain the chart
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
     * @private
     */
    function buildSVG(container) {
        if (!svg) {
            svg = select(container)
                .append('svg')
                .classed('britechart bar-chart', true);

            buildContainerGroups();
        }

        svg.attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
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
            name: String(d[nameLabel]),
        }));

        return { data, dataZeroed };
    }

    /**
     * A utility function that checks if custom gradient
     * color map should be applied if specified by the user
     * @param {String} name - bar's data point name
     * @return {void}
     * @private
     */
    function computeColor(name) {
        return chartGradientColors
            ? `url(#${chartGradientId})`
            : nameToColorMap[name];
    }

    /**
     * Sorts data if orderingFunction is specified
     * @param  {BarChartData}     clean unordered data
     * @return  {BarChartData}    clean ordered data
     * @private
     */
    function sortData(unorderedData) {
        let { data, dataZeroed } = unorderedData;

        if (orderingFunction) {
            data.sort(orderingFunction);
            dataZeroed.sort(orderingFunction);
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
        wrapTextWithEllipses(text, containerWidth, 0, yAxisLineWrapLimit);
    }

    /**
     * Cleans the loading state
     * @private
     */
    function cleanLoadingState() {
        svg.select('.loading-state-group svg').remove();
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

        svg.select('.y-axis-group.axis').call(yAxis);

        svg.selectAll('.y-axis-group .tick text').call(
            wrapText,
            margin.left - yAxisPaddingBetweenChart
        );

        drawAxisLabels();
    }

    /**
     * Draws the x and y axis custom labels respective groups
     * @private
     */
    function drawAxisLabels() {
        if (yAxisLabel) {
            if (yAxisLabelEl) {
                yAxisLabelEl.remove();
            }
            yAxisLabelEl = svg
                .select('.y-axis-label')
                .append('text')
                .classed('y-axis-label-text', true)
                .attr('x', -chartHeight / 2)
                .attr('y', yAxisLabelOffset)
                .attr('text-anchor', 'middle')
                .attr('transform', 'rotate(270 0 0)')
                .text(yAxisLabel);
        }

        if (xAxisLabel) {
            if (xAxisLabelEl) {
                xAxisLabelEl.remove();
            }
            xAxisLabelEl = svg
                .select('.x-axis-label')
                .append('text')
                .attr('y', xAxisLabelOffset)
                .attr('text-anchor', 'middle')
                .classed('x-axis-label-text', true)
                .attr('x', chartWidth / 2)
                .text(xAxisLabel);
        }
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
            .attr('width', ({ value }) => xScale(value))
            .on('mouseover', function (d, _, barList) {
                handleMouseOver(this, d, barList, chartWidth, chartHeight);
            })
            .on('mousemove', function (d) {
                handleMouseMove(this, d, chartWidth, chartHeight);
            })
            .on('mouseout', function (d, _, barList) {
                handleMouseOut(this, d, barList, chartWidth, chartHeight);
            })
            .on('click', function (d) {
                handleClick(this, d, chartWidth, chartHeight);
            })
            .merge(bars)
            .attr('x', 0)
            .attr('y', ({ name }) => yScale(name))
            .attr('height', yScale.bandwidth())
            .attr('width', ({ value }) => xScale(value))
            .attr('fill', ({ name }) => computeColor(name));
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
            .attr('width', ({ value }) => xScale(value))
            .on('mouseover', function (d, _, barList) {
                handleMouseOver(this, d, barList, chartWidth, chartHeight);
            })
            .on('mousemove', function (d) {
                handleMouseMove(this, d, chartWidth, chartHeight);
            })
            .on('mouseout', function (d, _, barList) {
                handleMouseOut(this, d, barList, chartWidth, chartHeight);
            })
            .on('click', function (d) {
                handleClick(this, d, chartWidth, chartHeight);
            });

        bars.attr('x', 0)
            .attr('y', ({ name }) => yScale(name))
            .attr('height', yScale.bandwidth())
            .attr('fill', ({ name }) => computeColor(name))
            .transition()
            .duration(animationDuration)
            .delay(interBarDelay)
            .ease(ease)
            .attr('width', ({ value }) => xScale(value));
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
            .attr('y', ({ value }) => yScale(value))
            .attr('width', xScale.bandwidth())
            .attr('height', ({ value }) => chartHeight - yScale(value))
            .on('mouseover', function (d, _, barList) {
                handleMouseOver(this, d, barList, chartWidth, chartHeight);
            })
            .on('mousemove', function (d) {
                handleMouseMove(this, d, chartWidth, chartHeight);
            })
            .on('mouseout', function (d, _, barList) {
                handleMouseOut(this, d, barList, chartWidth, chartHeight);
            })
            .on('click', function (d) {
                handleClick(this, d, chartWidth, chartHeight);
            })
            .merge(bars)
            .attr('x', ({ name }) => xScale(name))
            .attr('width', xScale.bandwidth())
            .attr('fill', ({ name }) => computeColor(name))
            .transition()
            .duration(animationDuration)
            .delay(interBarDelay)
            .ease(ease)
            .attr('y', ({ value }) => yScale(value))
            .attr('height', ({ value }) => chartHeight - yScale(value));
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
            .attr('y', ({ value }) => yScale(value))
            .attr('width', xScale.bandwidth())
            .attr('height', ({ value }) => chartHeight - yScale(value))
            .on('mouseover', function (d, _, barList) {
                handleMouseOver(this, d, barList, chartWidth, chartHeight);
            })
            .on('mousemove', function (d) {
                handleMouseMove(this, d, chartWidth, chartHeight);
            })
            .on('mouseout', function (d, _, barList) {
                handleMouseOut(this, d, barList, chartWidth, chartHeight);
            })
            .on('click', function (d) {
                handleClick(this, d, chartWidth, chartHeight);
            })
            .merge(bars)
            .attr('x', ({ name }) => xScale(name))
            .attr('y', ({ value }) => yScale(value))
            .attr('width', xScale.bandwidth())
            .attr('height', ({ value }) => chartHeight - yScale(value))
            .attr('fill', ({ name }) => computeColor(name));
    }

    /**
     * Draws labels at the end of each bar
     * @private
     * @return {void}
     */
    function drawLabels(locale) {
        const labelXPosition = isHorizontal
            ? _labelsHorizontalX
            : _labelsVerticalX;
        const labelYPosition = isHorizontal
            ? _labelsHorizontalY
            : _labelsVerticalY;
        const textFormatter = ({ value }) =>
            locale.format(labelsNumberFormat)(value);

        if (labelEl) {
            svg.selectAll('.percentage-label-group').remove();
        }

        labelEl = svg
            .select('.metadata-group')
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
            .text(textFormatter)
            .attr('font-size', labelsSize + 'px');
    }

    /**
     * Draws the bar elements within the chart group
     * @private
     */
    function drawBars() {
        let bars;

        if (isAnimated) {
            bars = svg
                .select('.chart-group')
                .selectAll('.bar')
                .data(dataZeroed);

            if (isHorizontal) {
                drawHorizontalBars(bars);
            } else {
                drawVerticalBars(bars);
            }

            bars = svg.select('.chart-group').selectAll('.bar').data(data);

            if (isHorizontal) {
                drawAnimatedHorizontalBars(bars);
            } else {
                drawAnimatedVerticalBars(bars);
            }

            // Exit
            bars.exit().transition().style('opacity', 0).remove();
        } else {
            bars = svg.select('.chart-group').selectAll('.bar').data(data);

            if (isHorizontal) {
                drawHorizontalBars(bars);
            } else {
                drawVerticalBars(bars);
            }

            // Exit
            bars.exit().remove();
        }
    }

    /**
     * Draws grid lines on the background of the chart
     * @return void
     */
    function drawGridLines() {
        svg.select('.grid-lines-group').selectAll('grid').remove();

        if (isHorizontal) {
            drawVerticalGridLines();
        } else {
            drawHorizontalGridLines();
        }
    }

    /**
     * Draws the grid lines for an horizontal bar chart
     * @return {void}
     */
    function drawVerticalGridLines() {
        const grid = gridVertical(xScale)
            .range([0, chartHeight])
            .hideEdges('first')
            .ticks(xTicks);

        grid(svg.select('.grid-lines-group'));

        drawVerticalExtendedLine();
    }

    /**
     * Draws the loading state
     * @private
     */
    function drawLoadingState() {
        svg.select('.loading-state-group').html(barLoadingMarkup);
    }

    /**
     * Draws a vertical line to extend y-axis till the edges
     * @return {void}
     */
    function drawVerticalExtendedLine() {
        svg.select('.grid-lines-group')
            .selectAll('line.extended-y-line')
            .data([0])
            .enter()
            .append('line')
            .attr('class', 'extended-y-line')
            .attr('y1', xAxisPadding.bottom)
            .attr('y2', chartHeight)
            .attr('x1', 0)
            .attr('x2', 0);
    }

    /**
     * Draws the grid lines for a vertical bar chart
     * @return {void}
     */
    function drawHorizontalGridLines() {
        const grid = gridHorizontal(yScale)
            .range([0, chartWidth])
            .hideEdges('first')
            .ticks(yTicks);

        grid(svg.select('.grid-lines-group'));

        drawHorizontalExtendedLine();
    }

    /**
     * Draws a vertical line to extend x-axis till the edges
     * @return {void}
     */
    function drawHorizontalExtendedLine() {
        svg.select('.grid-lines-group')
            .selectAll('line.extended-x-line')
            .data([0])
            .enter()
            .append('line')
            .attr('class', 'extended-x-line')
            .attr('x1', xAxisPadding.left)
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
        dispatcher.call('customMouseOver', e, d, mouse(e), [
            chartWidth,
            chartHeight,
        ]);
        highlightBarFunction = highlightBarFunction || function () {};

        if (hasSingleBarHighlight) {
            highlightBarFunction(select(e));

            return;
        }

        barList.forEach((barRect) => {
            if (barRect === e) {
                return;
            }
            highlightBarFunction(select(barRect));
        });
    }

    /**
     * Custom OnMouseMove event handler
     * @return {void}
     * @private
     */
    function handleMouseMove(e, d, chartWidth, chartHeight) {
        dispatcher.call('customMouseMove', e, d, mouse(e), [
            chartWidth,
            chartHeight,
        ]);
    }

    /**
     * Custom OnMouseOver event handler
     * @return {void}
     * @private
     */
    function handleMouseOut(e, d, barList, chartWidth, chartHeight) {
        dispatcher.call('customMouseOut', e, d, mouse(e), [
            chartWidth,
            chartHeight,
        ]);

        barList.forEach((barRect) => {
            select(barRect).attr('fill', ({ name }) => computeColor(name));
        });
    }

    /**
     * Custom onClick event handler
     * @return {void}
     * @private
     */
    function handleClick(e, d, chartWidth, chartHeight) {
        dispatcher.call('customClick', e, d, mouse(e), [
            chartWidth,
            chartHeight,
        ]);
    }

    /**
     * Gets the percentageAxis, sets it to `percentageAxisToMaxRatio` if all data points are 0
     * @return {number} Calculated percentageAxis
     * @private
     */
    function getPercentageAxis() {
        const uniqueDataPoints = new Set(data.map(getValue));
        const allZeroes =
            uniqueDataPoints.size === 1 && uniqueDataPoints.has(0);

        if (allZeroes) {
            return percentageAxisToMaxRatio;
        }

        return Math.min(percentageAxisToMaxRatio * max(data, getValue));
    }

    // API
    /**
     * Gets or Sets the duration of the animation
     * @param  {Number} _x=1200         Desired animation duration for the graph
     * @return {duration | module}      Current animation duration or Chart module to chain calls
     * @public
     */
    exports.animationDuration = function (_x) {
        if (!arguments.length) {
            return animationDuration;
        }
        animationDuration = _x;

        return this;
    };

    /**
     * Gets or Sets the padding of the chart (Default is 0.1)
     * @param  { Number | module } _x   Padding value to get/set
     * @return {padding | module}       Current padding or Chart module to chain calls
     * @public
     */
    exports.betweenBarsPadding = function (_x) {
        if (!arguments.length) {
            return betweenBarsPadding;
        }
        betweenBarsPadding = _x;

        return this;
    };

    /**
     * Gets or Sets the gradient colors of a bar in the chart
     * @param  {String[]} _x            Desired color gradient for the line (array of two hexadecimal numbers)
     * @return {String[] | module}      Current color gradient or Line Chart module to chain calls
     * @public
     */
    exports.chartGradient = function (_x) {
        if (!arguments.length) {
            return chartGradientColors;
        }
        chartGradientColors = _x;

        return this;
    };

    /**
     * Gets or Sets the colorMap of the chart
     * @param  {object} [_x=null]    Color map
     * @return {object | module}     Current colorMap or Chart module to chain calls
     * @example barChart.colorMap({name: 'colorHex', name2: 'colorString'})
     * @public
     */
    exports.colorMap = function (_x) {
        if (!arguments.length) {
            return nameToColorMap;
        }
        nameToColorMap = _x;

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
     * If true, adds labels at the end of the bars
     * @param  {Boolean} [_x=false]
     * @return {Boolean | module}    Current value of enableLabels or Chart module to chain calls
     * @public
     */
    exports.enableLabels = function (_x) {
        if (!arguments.length) {
            return enableLabels;
        }
        enableLabels = _x;

        return this;
    };

    /**
     * Chart exported to png and a download action is fired
     * @param {String} filename     File title for the resulting picture
     * @param {String} title        Title to add at the top of the exported picture
     * @return {Promise}            Promise that resolves if the chart image was loaded and downloaded successfully
     * @public
     */
    exports.exportChart = function (filename, title) {
        return exportChart.call(exports, svg, filename, title);
    };

    /**
     * Gets or Sets the hasPercentage status
     * @param  {boolean} _x         Should use percentage as value format
     * @return {boolean | module}   Is percentage used or Chart module to chain calls
     * @public
     */
    exports.hasPercentage = function (_x) {
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
     * Gets or Sets the hasSingleBarHighlight status.
     * If the value is true (default), only the hovered bar is considered to
     * be highlighted and will be darkened by default. If the value is false,
     * all the bars but the hovered bar are considered to be highlighted
     * and will be darkened (by default). To customize the bar highlight or
     * remove it completely, use highlightBarFunction instead.
     * @param  {boolean} _x        Should highlight the hovered bar
     * @return {boolean | module} Is hasSingleBarHighlight used or Chart module to chain calls
     * @public
     */
    exports.hasSingleBarHighlight = function (_x) {
        if (!arguments.length) {
            return hasSingleBarHighlight;
        }
        hasSingleBarHighlight = _x;

        return this;
    };

    /**
     * Gets or Sets the height of the chart
     * @param  {number} _x Desired width for the graph
     * @return {height | module} Current height or Chart module to chain calls
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
     * Gets or Sets the highlightBarFunction function. The callback passed to
     * this function returns a bar selection from the bar chart. Use this function
     * if you want to apply a custom behavior to the highlighted bar on hover.
     * When hasSingleBarHighlight is true the highlighted bar will be the
     * one that was hovered by the user. When hasSingleBarHighlight is false
     * the highlighted bars are all the bars but the hovered one. The default
     * highlight effect on a bar is darkening the highlighted bar(s) color.
     * @param  {Function} _x        Desired operation operation on a hovered bar passed through callback
     * @return {highlightBarFunction | module} Is highlightBarFunction used or Chart module to chain calls
     * @public
     * @example barChart.highlightBarFunction(bar => bar.attr('fill', 'blue'))
     * barChart.highlightBarFunction(null) // will disable the default highlight effect
     */
    exports.highlightBarFunction = function (_x) {
        if (!arguments.length) {
            return highlightBarFunction;
        }
        highlightBarFunction = _x;

        return this;
    };

    /**
     * Gets or Sets the isAnimated property of the chart, making it to animate when render.
     * By default this is 'false'
     *
     * @param  {Boolean} _x             Desired animation flag
     * @return {isAnimated | module}    Current isAnimated flag or Chart module
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
     * Gets or Sets the horizontal direction of the chart
     * @param  {number} _x              Desired horizontal direction for the graph
     * @return { isHorizontal | module} If it is horizontal or Chart module to chain calls
     * @public
     */
    exports.isHorizontal = function (_x) {
        if (!arguments.length) {
            return isHorizontal;
        }
        isHorizontal = _x;

        return this;
    };

    /**
     * Offset between end of bar and start of the percentage bars
     * @param  {number} [_x=7]      Margin offset from end of bar
     * @return {number | module}    Current offset or Chart module to chain calls
     * @public
     */
    exports.labelsMargin = function (_x) {
        if (!arguments.length) {
            return labelsMargin;
        }
        labelsMargin = _x;

        return this;
    };

    /**
     * Gets or Sets the labels number format
     * @param  {string} [_x=",f"] desired label number format for the bar chart
     * @return {string | module} Current labelsNumberFormat or Chart module to chain calls
     * @public
     */
    exports.labelsNumberFormat = function (_x) {
        if (!arguments.length) {
            return labelsNumberFormat;
        }
        labelsNumberFormat = _x;

        return this;
    };

    /**
     * Get or Sets the labels text size
     * @param  {number} [_x=12] label font size
     * @return {number | module}    Current text size or Chart module to chain calls
     * @public
     */
    exports.labelsSize = function (_x) {
        if (!arguments.length) {
            return labelsSize;
        }
        labelsSize = _x;

        return this;
    };

    /**
     * Gets or Sets the loading state of the chart
     * @param  {boolean} flag       Desired value for the loading state
     * @return {boolean | module}   Current loading state flag or Chart module to chain calls
     * @public
     */
    exports.isLoading = function (_flag) {
        if (!arguments.length) {
            return isLoading;
        }
        isLoading = _flag;

        return this;
    };

    /**
     * Gets or Sets the margin of the chart
     * @param  {object} _x Margin object to get/set
     * @return {margin | module} Current margin or Chart module to chain calls
     * @public
     */
    exports.margin = function (_x) {
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
     * Gets or Sets the nameLabel of the chart
     * @param  {number} _x Desired nameLabel for the graph
     * @return {number | module} Current nameLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    exports.nameLabel = function (_x) {
        if (!arguments.length) {
            return nameLabel;
        }
        nameLabel = _x;
        dataKeyDeprecationMessage('name');

        return this;
    };

    /**
     * Gets or Sets the number format of the bar chart
     * @param  {string} _x = ',f'     Desired numberFormat for the chart. See examples [here]{@link https://observablehq.com/@d3/d3-format}
     * @return {string | module}      Current numberFormat or Chart module to chain calls
     * @public
     */
    exports.numberFormat = function (_x) {
        if (!arguments.length) {
            return numberFormat;
        }
        numberFormat = _x;

        return this;
    };

    /**
     * Exposes an 'on' method that acts as a bridge with the event dispatcher
     * We are going to expose this events:
     * customMouseOver, customMouseMove, customMouseOut, and customClick
     *
     * @return {module} Bar Chart
     * @public
     */
    exports.on = function () {
        let value = dispatcher.on.apply(dispatcher, arguments);

        return value === dispatcher ? exports : value;
    };

    /**
     * Configurable extension of the x axis. If your max point was 50% you might want to show x axis to 60%, pass 1.2
     * @param  {number} _x ratio to max data point to add to the x axis
     * @return {ratio | module} Current ratio or Chart module to chain calls
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
     * Gets or Sets whether the color list should be reversed or not
     * @param  {boolean} _x     Should reverse the color list
     * @return {boolean | module} Is color list being reversed or Chart module to chain calls
     * @public
     */
    exports.shouldReverseColorList = function (_x) {
        if (!arguments.length) {
            return shouldReverseColorList;
        }
        shouldReverseColorList = _x;

        return this;
    };

    /**
     * Changes the order of items given the custom function
     * @param  {Function} _x             A custom function that sets logic for ordering
     * @return {(Function | Module)}   A custom ordering function or Chart module to chain calls
     * @public
     */
    exports.orderingFunction = function (_x) {
        if (!arguments.length) {
            return orderingFunction;
        }
        orderingFunction = _x;

        return this;
    };

    /**
     * Gets or Sets the valueLabel of the chart
     * @param  {Number} _x Desired valueLabel for the graph
     * @return { valueLabel | module} Current valueLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    exports.valueLabel = function (_x) {
        if (!arguments.length) {
            return valueLabel;
        }
        valueLabel = _x;
        dataKeyDeprecationMessage('value');

        return this;
    };

    /**
     * Gets or Sets the locale which our formatting functions use.
     * Check [the d3-format docs]{@link https://github.com/d3/d3-format#formatLocale} for the required values.
     * @example
     *  barChart
     *  .valueLocale({thousands: '.', grouping: [3], currency: ["$", ""], decimal: "."})
     * @param  {LocaleObject}  [_x=null]  _x    Desired locale object format.
     * @return {LocaleObject | module}          Current locale object or Chart module to chain calls
     * @public
     */
    exports.valueLocale = function (_x) {
        if (!arguments.length) {
            return locale;
        }
        locale = _x;

        return this;
    };

    /**
     * Gets or Sets the width of the chart
     * @param  {number} _x Desired width for the graph
     * @return {width | module} Current width or Chart module to chain calls
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
     * Gets or Sets the text of the xAxisLabel on the chart
     * @param  {String} _x          Desired text for the label
     * @return {String | module}    Label or Chart module to chain calls
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
     * @param  {Number} _x Desired offset for the label
     * @return {Number | module} label or Chart module to chain calls
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
     * Gets or Sets the number of ticks of the x axis on the chart
     * @param  {Number} _x = 5          Desired horizontal ticks
     * @return {Number | module}        Current xTicks or Chart module to chain calls
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
     * Gets or Sets the text of the yAxisLabel on the chart
     * @param  {String} _x          Desired text for the label
     * @return {String | module}    Label or Chart module to chain calls
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
     * @param  {Number} _x          Desired offset for the label
     * @return {Number | module}    Label or Chart module to chain calls
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
     * Space between y axis and chart
     * @param  {Number} _x = 10     Space between y axis and chart
     * @return {Number| module}     Current value of yAxisPaddingBetweenChart or Chart module to chain calls
     * @public
     */
    exports.yAxisPaddingBetweenChart = function (_x) {
        if (!arguments.length) {
            return yAxisPaddingBetweenChart;
        }
        yAxisPaddingBetweenChart = _x;

        return this;
    };

    /**
     * Gets or Sets the number of vertical ticks on the chart
     * @param  {Number} _x = 6         Desired number of vertical ticks for the graph
     * @return {Number | module}       Current yTicks or Chart module to chain calls
     * @public
     */
    exports.yTicks = function (_x) {
        if (!arguments.length) {
            return yTicks;
        }
        yTicks = _x;

        return this;
    };

    return exports;
}
