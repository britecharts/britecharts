import { max } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import { dispatch } from 'd3-dispatch';
import { easeQuadInOut } from 'd3-ease';
import { format } from 'd3-format';
import { scaleLinear, scaleBand } from 'd3-scale';
import { select, mouse } from 'd3-selection';
import 'd3-transition';

import { exportChart } from '../helpers/export';
import { lineLoadingMarkup } from '../helpers/load';

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
 * NOTE: We will be deprecating this chart soon
 *
 * @module Step
 * @tutorial step
 * @requires d3-array, d3-axis, d3-dispatch, d3-ease, d3-format, d3-scale, d3-selection, d3-transition
 * @deprecated
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
        ease = easeQuadInOut,
        data,
        chartWidth,
        chartHeight,
        xScale,
        yScale,
        yTicks = 6,
        xAxis,
        xAxisLabel,
        xAxisLabelEl,
        yAxis,
        yAxisLabel,
        yAxisLabelEl,
        xAxisLabelOffset = 80,
        yAxisLabelOffset = -20,
        xAxisPadding = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        yTickPadding = 8,
        svg,
        valueLabel = 'value',
        nameLabel = 'key',
        maskGridLines,
        baseLine,
        // Dispatcher object to broadcast the mouse events
        // Ref: https://github.com/mbostock/d3/wiki/Internals#d3_dispatch
        dispatcher = dispatch(
            'customMouseOver',
            'customMouseOut',
            'customMouseMove'
        ),
        // Formats
        yAxisTickFormat = format('.3'),
        // extractors
        getKey = ({ key }) => key,
        getValue = ({ value }) => value;

    /**
     * This function creates the graph using the selection as container
     * @param  {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     * @param {StepChartData} _data The data to attach and generate the chart
     * @deprecated
     */
    function exports(_selection) {
        _selection.each(function (_data) {
            // Make space on the left of the graph for the y axis label
            chartWidth = width - margin.left - margin.right;
            chartHeight = height - margin.top - margin.bottom;
            data = cleanData(_data);

            // eslint-disable-next-line no-console
            console.warn(
                'The Step Chart is being deprecated! Please use a line chart with lineCurve "step" for your visualization!'
            );

            buildSVG(this);
            if (isLoading) {
                drawLoadingState();

                return;
            }
            cleanLoadingState();

            buildScales();
            buildAxis();
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
        xAxis = axisBottom(xScale);

        yAxis = axisLeft(yScale)
            .ticks(yTicks)
            .tickPadding(yTickPadding)
            .tickFormat(yAxisTickFormat);
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
            .classed('y-axis-group axis', true)
            .append('g')
            .classed('y-axis-label', true);
        container.append('g').classed('metadata-group', true);
    }

    /**
     * Creates the x and y scales of the graph
     * @private
     */
    function buildScales() {
        xScale = scaleBand()
            .domain(data.map(getKey))
            .rangeRound([0, chartWidth])
            .paddingInner(0);

        yScale = scaleLinear()
            .domain([0, max(data, getValue)])
            .rangeRound([chartHeight, 0]);
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
                .classed('britechart step-chart', true);

            buildContainerGroups();
        }

        svg.attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
            .attr('width', width)
            .attr('height', height);
    }

    /**
     * Cleaning data casting the values and keys to the proper type while keeping
     * the rest of properties on the data
     * @param  {StepChartData} originalData Data as provided on the container
     * @private
     */
    function cleanData(originalData) {
        return originalData.reduce((acc, d) => {
            d.value = +d[valueLabel];
            d.key = String(d[nameLabel]);

            return [...acc, d];
        }, []);
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

        svg.selectAll('.x-axis-group .tick text')
            .style('text-anchor', 'start')
            .attr('transform', 'rotate(45 -1 10)');

        if (xAxisLabel) {
            if (xAxisLabelEl) {
                svg.selectAll('.x-axis-label-text').remove();
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

        svg.select('.y-axis-group.axis').call(yAxis);

        if (yAxisLabel) {
            if (yAxisLabelEl) {
                svg.selectAll('.y-axis-label-text').remove();
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
    }

    /**
     * Draws the loading state
     * @private
     */
    function drawLoadingState() {
        svg.select('.loading-state-group').html(lineLoadingMarkup);
    }

    /**
     * Draws the step elements within the chart group
     * @private
     */
    function drawSteps() {
        let steps = svg.select('.chart-group').selectAll('.step').data(data);

        // Enter
        steps
            .enter()
            .append('rect')
            .classed('step', true)
            .attr('x', chartWidth) // Initially drawing the steps at the end of Y axis
            .attr('y', ({ value }) => yScale(value))
            .attr('width', xScale.bandwidth())
            .attr('height', (d) => chartHeight - yScale(d.value))
            .on('mouseover', function (d) {
                handleMouseOver(this, d, chartWidth, chartHeight);
            })
            .on('mousemove', function (d) {
                handleMouseMove(this, d, chartWidth, chartHeight);
            })
            .on('mouseout', function (d) {
                handleMouseOut(this, d, chartWidth, chartHeight);
            })
            .merge(steps)
            .transition()
            .ease(ease)
            .attr('x', ({ key }) => xScale(key))
            .attr('y', function (d) {
                return yScale(d.value);
            })
            .attr('width', xScale.bandwidth())
            .attr('height', function (d) {
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
        if (maskGridLines) {
            svg.selectAll('.horizontal-grid-line').remove();
        }
        if (baseLine) {
            svg.selectAll('.extended-x-line').remove();
        }

        maskGridLines = svg
            .select('.grid-lines-group')
            .selectAll('line.horizontal-grid-line')
            .data(yScale.ticks(yTicks))
            .enter()
            .append('line')
            .attr('class', 'horizontal-grid-line')
            .attr('x1', xAxisPadding.left)
            .attr('x2', chartWidth)
            .attr('y1', (d) => yScale(d))
            .attr('y2', (d) => yScale(d));

        if (baseLine) {
            svg.selectAll('.extended-x-line').remove();
        }

        //draw a horizontal line to extend x-axis till the edges
        baseLine = svg
            .select('.grid-lines-group')
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

    // API

    /**
     * Custom OnMouseOver event handler
     * @return {void}
     * @private
     */
    function handleMouseOver(e, d, chartWidth, chartHeight) {
        dispatcher.call('customMouseOver', e, d, mouse(e), [
            chartWidth,
            chartHeight,
        ]);
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
    function handleMouseOut(e, d, chartWidth, chartHeight) {
        dispatcher.call('customMouseOut', e, d, mouse(e), [
            chartWidth,
            chartHeight,
        ]);
    }

    /**
     * Chart exported to png and a download action is fired
     * @param {String} filename     File title for the resulting picture
     * @param {String} title        Title to add at the top of the exported picture
     * @return {Promise}            Promise that resolves if the chart image was loaded and downloaded successfully
     * @public
     */
    exports.exportChart = function (filename) {
        return exportChart.call(exports, svg, filename);
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
        margin = {
            ...margin,
            ..._x,
        };

        return this;
    };

    /**
     * Gets or Sets the number of vertical ticks on the chart
     * (Default is 6)
     * @param  {Number} _x          Desired number of vertical ticks for the graph
     * @return {Number | module}    Current yTicks or Chart module to chain calls
     * @public
     */
    exports.yTicks = function (_x) {
        if (!arguments.length) {
            return yTicks;
        }
        yTicks = _x;

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
     * Exposes an 'on' method that acts as a bridge with the event dispatcher
     * We are going to expose this events:
     * customMouseOver, customMouseMove and customMouseOut
     *
     * @return {module} Bar Chart
     * @public
     */
    exports.on = function (...args) {
        let value = dispatcher.on(...args);

        return value === dispatcher ? exports : value;
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

    /**
     * Gets or Sets the text of the xAxisLabel on the chart
     * @param  {String} _x Desired text for the label
     * @return {String | module} label or Chart module to chain calls
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
     * Gets or Sets the text of the yAxisLabel on the chart
     * @param  {String} _x Desired text for the label
     * @return {String | module} label or Chart module to chain calls
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
     * @param  {Number} _x Desired offset for the label
     * @return {Number | module} label or Chart module to chain calls
     * @public
     */
    exports.yAxisLabelOffset = function (_x) {
        if (!arguments.length) {
            return yAxisLabelOffset;
        }
        yAxisLabelOffset = _x;

        return this;
    };

    return exports;
}
