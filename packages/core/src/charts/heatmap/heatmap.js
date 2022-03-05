import { extent } from 'd3-array';
import { select, mouse } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { interpolateHcl } from 'd3-interpolate';
import { dispatch } from 'd3-dispatch';
import 'd3-transition';

import { exportChart } from '../helpers/export';
import colorHelper from '../helpers/color';
import { hoursHuman, motion } from '../helpers/constants';

/**
 * @typedef HeatmapData
 * @type {Array[]}
 * @property {Number} week
 * @property {Number} day
 * @property {Number} value
 *
 * @example
 * [
 *     {
 *         day: 0,
 *         hour: 0,
 *         value: 7
 *     },
 *     {
 *         day: 0,
 *         hour: 1,
 *         value: 10
 *     }
 * ]
 */

/**
 * Reusable Heatmap API module that renders a
 * simple and configurable heatmap chart.
 *
 * @module Heatmap
 * @tutorial heatmap
 * @requires d3-array, d3-selection, d3-scale, d3-interpolate, d3-transition
 *
 * @example
 * let heatmap = heatmap();
 *
 * heatmap
 *     .width(500);
 *
 * d3Selection.select('.css-selector')
 *     .datum(dataset)
 *     .call(heatmap);
 */
export default function module() {
    let margin = {
            top: 40,
            right: 20,
            bottom: 20,
            left: 40,
        },
        width = 780,
        height = 270,
        svg,
        data,
        chartWidth,
        chartHeight,
        boxes,
        boxSize = 30,
        boxBorderSize = 2,
        boxInitialOpacity = 0.2,
        boxFinalOpacity = 1,
        boxInitialColor = '#BBBBBB',
        boxBorderColor = '#FFFFFF',
        colorScale,
        colorSchema = colorHelper.colorSchemas.red,
        animationDuration = motion.duration,
        isAnimated = false,
        yAxisLabels,
        dayLabels,
        daysHuman = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        dayLabelWidth = 30,
        hourLabels,
        hourLabelHeight = 20,
        // Dispatcher object to broadcast the mouse events
        // Ref: https://github.com/mbostock/d3/wiki/Internals#d3_dispatch
        dispatcher = dispatch(
            'customMouseOver',
            'customMouseOut',
            'customMouseMove',
            'customClick'
        ),
        getValue = ({ value }) => value;

    /**
     * This function creates the graph using the selection as container
     * @param  {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     * @param {HeatmapData} _data The data to attach and generate the chart
     */
    function exports(_selection) {
        _selection.each(function (_data) {
            data = cleanData(_data);

            chartWidth = width - margin.left - margin.right;
            chartHeight = height - margin.top - margin.bottom;

            buildScales();
            buildSVG(this);
            drawDayLabels();
            drawHourLabels();
            drawBoxes();
        });
    }

    /**
     * Builds the SVG element that will contain the chart
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
     * @return {void}
     * @private
     */
    function buildSVG(container) {
        if (!svg) {
            svg = select(container)
                .append('svg')
                .classed('britechart heatmap', true);

            buildContainerGroups();
        }

        svg.attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
            .attr('width', width)
            .attr('height', height);
    }

    /**
     * Builds containers for the chart, the axis and a wrapper for all of them
     * Also applies the Margin convention
     * @return {void}
     * @private
     */
    function buildContainerGroups() {
        let container = svg
            .append('g')
            .classed('container-group', true)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        container.append('g').classed('chart-group', true);
        container.append('g').classed('day-labels-group', true);
        container.append('g').classed('hour-labels-group', true);
        container.append('g').classed('metadata-group', true);
    }

    /**
     * Cleaning data casting the values to the proper
     * type while keeping the rest of properties on the data. It
     * also creates a set of zeroed data (for animation purposes)
     * @param   {HeatmapData} originalData  Raw data as passed to the container
     * @return  {HeatmapData}               Clean data
     * @private
     */
    function cleanData(originalData) {
        return originalData.reduce(
            (acc, { day, hour, value }) => [
                ...acc,
                {
                    day: +day,
                    hour: +hour,
                    value: +value,
                },
            ],
            []
        );
    }

    /**
     * Creates the scales for the heatmap chart
     * @return void
     */
    function buildScales() {
        colorScale = scaleLinear()
            .range([colorSchema[0], colorSchema[colorSchema.length - 1]])
            .domain(extent(data, getValue))
            .interpolate(interpolateHcl);
    }

    /**
     * Draws the boxes of the heatmap
     */
    function drawBoxes() {
        boxes = svg.select('.chart-group').selectAll('.box').data(data);

        const boxElements = boxes
            .enter()
            .append('rect')
            .classed('box', true)
            .attr('width', boxSize)
            .attr('height', boxSize)
            .attr('x', ({ hour }) => hour * boxSize)
            .attr('y', ({ day }) => day * boxSize)
            .style('opacity', boxInitialOpacity)
            .style('fill', boxInitialColor)
            .style('stroke', boxBorderColor)
            .style('stroke-width', boxBorderSize)
            .on('mouseover', function (d, index, boxList) {
                handleMouseOver(this, d, boxList, chartWidth, chartHeight);
            })
            .on('mousemove', function (d) {
                handleMouseMove(this, d, chartWidth, chartHeight);
            })
            .on('mouseout', function (d, index, boxList) {
                handleMouseOut(this, d, boxList, chartWidth, chartHeight);
            })
            .on('click', function (d) {
                handleClick(this, d, chartWidth, chartHeight);
            });

        if (isAnimated) {
            boxElements
                .transition()
                .duration(animationDuration)
                .style('fill', ({ value }) => colorScale(value))
                .style('opacity', boxFinalOpacity);
        } else {
            boxElements
                .style('fill', ({ value }) => colorScale(value))
                .style('opacity', boxFinalOpacity);
        }

        boxElements.exit().remove();
    }

    /**
     * Draws the day labels
     */
    function drawDayLabels() {
        const dayLabelsGroup = svg.select('.day-labels-group');
        const arrayForYAxisLabels = yAxisLabels || daysHuman;

        dayLabels = svg
            .select('.day-labels-group')
            .selectAll('.day-label')
            .data(arrayForYAxisLabels);

        dayLabels
            .enter()
            .append('text')
            .text((label) => label)
            .attr('x', 0)
            .attr('y', (d, i) => i * boxSize)
            .style('text-anchor', 'start')
            .style('dominant-baseline', 'central')
            .attr('class', 'day-label y-axis-label');

        dayLabelsGroup.attr(
            'transform',
            `translate(-${dayLabelWidth}, ${boxSize / 2})`
        );
    }

    /**
     * Draws the hour labels
     */
    function drawHourLabels() {
        let hourLabelsGroup = svg.select('.hour-labels-group');

        hourLabels = svg
            .select('.hour-labels-group')
            .selectAll('.hour-label')
            .data(hoursHuman);

        hourLabels
            .enter()
            .append('text')
            .text((label) => label)
            .attr('y', 0)
            .attr('x', (d, i) => i * boxSize)
            .style('text-anchor', 'middle')
            .style('dominant-baseline', 'central')
            .attr('class', 'hour-label');

        hourLabelsGroup.attr(
            'transform',
            `translate(${boxSize / 2}, -${hourLabelHeight})`
        );
    }

    function handleMouseOver(e, d, boxList, chartWidth, chartHeight) {
        dispatcher.call('customMouseOver', e, d, mouse(e), [
            chartWidth,
            chartHeight,
        ]);
    }

    function handleMouseMove(e, d, chartWidth, chartHeight) {
        dispatcher.call('customMouseMove', e, d, mouse(e), [
            chartWidth,
            chartHeight,
        ]);
    }

    function handleMouseOut(e, d, boxList, chartWidth, chartHeight) {
        dispatcher.call('customMouseOut', e, d, mouse(e), [
            chartWidth,
            chartHeight,
        ]);
    }

    function handleClick(e, d, chartWidth, chartHeight) {
        dispatcher.call('customClick', e, d, mouse(e), [
            chartWidth,
            chartHeight,
        ]);
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
     * Gets or Sets the boxSize of the chart
     * @param  {Number} _x=30       Desired boxSize for the heatmap boxes
     * @return {Number | module}    Current boxSize or Chart module to chain calls
     * @public
     */
    exports.boxSize = function (_x) {
        if (!arguments.length) {
            return boxSize;
        }
        boxSize = _x;

        return this;
    };

    /**
     * Gets or Sets the colorSchema of the chart
     * @param  {String[]} _x=britecharts-red  Desired colorSchema for the heatma boxes
     * @return {String[] | module}            Current colorSchema or Chart module to chain calls
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
     * Chart exported to png and a download action is fired
     * @param {String} filename     File title for the resulting picture
     * @param {String} title        Title to add at the top of the exported picture
     * @public
     */
    exports.exportChart = function (filename, title) {
        exportChart.call(exports, svg, filename, title);
    };

    /**
     * Gets or Sets the height of the chart
     * @param  {Number} _x=270          Desired height for the chart
     * @return {Number | module}    Current height or Chart module to chain calls
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
     * Gets or Sets the isAnimated value of the chart
     * @param  {Boolean} _x=false         Decide whether to show chart animation
     * @return {Boolean | module}         Current isAnimated value or Chart module to chain calls
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
     * @param  {Object} _x          Margin object to get/set
     * @return {margin | module}    Current margin or Chart module to chain calls
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
     * Gets or Sets the y-axis labels of the chart
     * @param  {String[]} _x=['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']     An array of string labels across the y-axis
     * @return {yAxisLabels | module}                                       Current yAxisLabels array or Chart module to chain calls
     * @public
     */
    exports.yAxisLabels = function (_x) {
        if (!arguments.length) {
            return yAxisLabels;
        }
        yAxisLabels = _x;

        return this;
    };

    /**
     * Gets or Sets the width of the chart
     * @param  {Number} _x=780           Desired width for the chart
     * @return {Number | module}         Current width or Chart module to chain calls
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
}
