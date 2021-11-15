import { extent } from 'd3-array';
import { easeQuadInOut } from 'd3-ease';
import { scaleLinear } from 'd3-scale';
import { area, line, curveBasis } from 'd3-shape';
import { select } from 'd3-selection';
import 'd3-transition';

import { exportChart } from '../helpers/export';
import { dataKeyDeprecationMessage } from '../helpers/project';
import colorHelper from '../helpers/color';
import { sparkLineLoadingMarkup } from '../helpers/load';
import { uniqueId } from '../helpers/number';
import { motion } from '../helpers/constants';

const DEFAULT_TITLE_TEXT_STYLE = {
    'font-size': '22px',
    'font-family': 'sans-serif',
    'font-style': 'normal',
    'font-weight': 0,
};

/**
 * @typedef SparklineChartData
 * @type {Object[]}
 * @property {number} value        Value of the group (required)
 * @property {string} name         Name of the group (required)
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
 * Sparkline Chart reusable API module that allows us
 * rendering a sparkline configurable chart.
 *
 * @module Sparkline
 * @tutorial sparkline
 * @requires d3-array, d3-ease, d3-scale, d3-shape, d3-selection, d3-transition
 *
 * @example
 * var sparkLineChart = sparkline();
 *
 * sparkLineChart
 *     .width(200)
 *     .height(100);
 *
 * d3Selection.select('.css-selector')
 *     .datum(dataset)
 *     .call(sparkLineChart);
 *
 */
export default function module() {
    let margin = {
            left: 5,
            right: 5,
            top: 5,
            bottom: 5,
        },
        width = 100,
        height = 30,
        isLoading = false,
        xScale,
        yScale,
        areaGradient = ['#F5FDFF', '#F6FEFC'],
        areaGradientEl,
        areaGradientId = uniqueId('sparkline-area-gradient'),
        lineStrokeWidth = 2,
        lineGradient = colorHelper.colorGradients.greenBlue,
        lineGradientEl,
        lineGradientId = uniqueId('sparkline-line-gradient'),
        maskingClip,
        maskingClipId = uniqueId('maskingClip'),
        svg,
        chartWidth,
        chartHeight,
        data,
        hasArea = true,
        isAnimated = false,
        clipDuration = motion.duration,
        ease = easeQuadInOut,
        topLine,
        areaBelow,
        circle,
        titleEl,
        titleText,
        titleTextStyle = DEFAULT_TITLE_TEXT_STYLE,
        markerSize = 1.5,
        valueLabel = 'value',
        dateLabel = 'date',
        // getters
        getDate = ({ date }) => date,
        getValue = ({ value }) => value;

    /**
     * This function creates the graph using the selection and data provided
     *
     * @param {D3Selection} _selection A d3 selection that represents
     * the container(s) where the chart(s) will be rendered
     * @param {SparklineChartData} _data The data to attach and generate the chart
     */
    function exports(_selection) {
        _selection.each(function (_data) {
            chartWidth = width - margin.left - margin.right;
            chartHeight = height - margin.top - margin.bottom;
            data = cleanData(_data);

            buildSVG(this);
            if (isLoading) {
                drawLoadingState();

                return;
            }
            cleanLoadingState();
            buildScales();
            createGradients();
            createMaskingClip();
            drawArea();
            drawLine();
            drawEndMarker();

            if (titleText) {
                drawSparklineTitle();
            }
        });
    }

    /**
     * Builds containers for the chart, the axis and a wrapper for all of them
     * NOTE: The order of drawing of this group elements is really important,
     * as everything else will be drawn on top of them
     * @private
     */
    function buildContainerGroups() {
        let container = svg
            .append('g')
            .classed('container-group', true)
            .attr('transform', `translate(${margin.left},${margin.top})`);

        svg.append('g').classed('loading-state-group', true);

        container.append('g').classed('text-group', true);
        container.append('g').classed('chart-group', true);
        container.append('g').classed('metadata-group', true);
    }

    /**
     * Creates the x, y and color scales of the chart
     * @private
     */
    function buildScales() {
        xScale = scaleLinear()
            .domain(extent(data, getDate))
            .range([0, chartWidth]);

        yScale = scaleLinear()
            .domain(extent(data, getValue))
            .range([chartHeight, 0]);
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
                .classed('britechart sparkline', true);

            buildContainerGroups();
        }

        svg.attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
            .attr('width', width)
            .attr('height', height);
    }

    /**
     * Cleaning data casting the values and dates to the proper type while keeping
     * the rest of properties on the data
     * @param  {SparklineChartData} originalData    Raw data from the container
     * @return {SparklineChartData}                 Clean data
     * @private
     */
    function cleanData(originalData) {
        return originalData.reduce((acc, d) => {
            d.date = new Date(d[dateLabel]);
            d.value = +d[valueLabel];

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
     * Creates the gradient on the area below the line
     * @return {void}
     */
    function createGradients() {
        let metadataGroup = svg.select('.metadata-group');

        if (areaGradientEl || lineGradientEl) {
            svg.selectAll(`#${areaGradientId}`).remove();
            svg.selectAll(`#${lineGradientId}`).remove();
        }

        areaGradientEl = metadataGroup
            .append('linearGradient')
            .attr('id', areaGradientId)
            .attr('class', 'area-gradient')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', 0)
            .attr('x2', xScale(data[data.length - 1].date))
            .attr('y1', 0)
            .attr('y2', 0)
            .selectAll('stop')
            .data([
                { offset: '0%', color: areaGradient[0] },
                { offset: '100%', color: areaGradient[1] },
            ])
            .enter()
            .append('stop')
            .attr('offset', ({ offset }) => offset)
            .attr('stop-color', ({ color }) => color);

        lineGradientEl = metadataGroup
            .append('linearGradient')
            .attr('id', lineGradientId)
            .attr('class', 'line-gradient')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', 0)
            .attr('x2', xScale(data[data.length - 1].date))
            .attr('y1', 0)
            .attr('y2', 0)
            .selectAll('stop')
            .data([
                { offset: '0%', color: lineGradient[0] },
                { offset: '100%', color: lineGradient[1] },
            ])
            .enter()
            .append('stop')
            .attr('offset', ({ offset }) => offset)
            .attr('stop-color', ({ color }) => color);
    }

    /**
     * Creates a masking clip that would help us fake an animation if the
     * proper flag is true
     *
     * @return {void}
     */
    function createMaskingClip() {
        if (maskingClip) {
            svg.selectAll(`#${maskingClipId}`).remove();
        }

        if (isAnimated) {
            maskingClip = svg
                .select('.metadata-group')
                .append('clipPath')
                .attr('id', maskingClipId)
                .attr('class', 'clip-path')
                .append('rect')
                .attr('width', 0)
                .attr('height', height);

            select(`#${maskingClipId} rect`)
                .transition()
                .ease(ease)
                .duration(clipDuration)
                .attr('width', width);
        }
    }

    /**
     * Draws the area that will be placed below the line
     * @private
     */
    function drawArea() {
        if (areaBelow) {
            svg.selectAll('.sparkline-area').remove();
        }

        areaBelow = area()
            .x(({ date }) => xScale(date))
            .y0(() => yScale(0) + lineStrokeWidth / 2)
            .y1(({ value }) => yScale(value))
            .curve(curveBasis);

        svg.select('.chart-group')
            .append('path')
            .datum(data)
            .attr('class', 'sparkline-area')
            .attr('fill', `url(#${areaGradientId})`)
            .attr('d', areaBelow)
            .attr('clip-path', `url(#${maskingClipId})`);
    }

    /**
     * Draws the line element within the chart group
     * @private
     */
    function drawLine() {
        if (topLine) {
            svg.selectAll('.line').remove();
        }

        topLine = line()
            .curve(curveBasis)
            .x(({ date }) => xScale(date))
            .y(({ value }) => yScale(value));

        svg.select('.chart-group')
            .append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('stroke', `url(#${lineGradientId})`)
            .attr('d', topLine)
            .attr('clip-path', `url(#${maskingClipId})`)
            .attr('fill', 'none');
    }

    /**
     * Draws the loading state
     * @private
     */
    function drawLoadingState() {
        svg.select('.loading-state-group').html(sparkLineLoadingMarkup);
    }

    /**
     * Draws the text element within the text group
     * Is displayed at the top of sparked area
     * @private
     */
    function drawSparklineTitle() {
        if (titleEl) {
            svg.selectAll('.sparkline-text').remove();
        }

        titleEl = svg
            .selectAll('.text-group')
            .append('text')
            .attr('x', chartWidth / 2)
            .attr('y', chartHeight / 6)
            .attr('text-anchor', 'middle')
            .attr('class', 'sparkline-text')
            .style(
                'font-size',
                titleTextStyle['font-size'] ||
                    DEFAULT_TITLE_TEXT_STYLE['font-size']
            )
            .style('fill', titleTextStyle['fill'] || lineGradient[0])
            .style(
                'font-family',
                titleTextStyle['font-family'] ||
                    DEFAULT_TITLE_TEXT_STYLE['font-family']
            )
            .style(
                'font-weight',
                titleTextStyle['font-weight'] ||
                    DEFAULT_TITLE_TEXT_STYLE['font-weight']
            )
            .style(
                'font-style',
                titleTextStyle['font-style'] ||
                    DEFAULT_TITLE_TEXT_STYLE['font-style']
            )
            .text(titleText);
    }

    /**
     * Draws a marker at the end of the sparkline
     */
    function drawEndMarker() {
        if (circle) {
            svg.selectAll('.sparkline-circle').remove();
        }

        circle = svg
            .selectAll('.chart-group')
            .append('circle')
            .attr('class', 'sparkline-circle')
            .attr('cx', xScale(data[data.length - 1].date))
            .attr('cy', yScale(data[data.length - 1].value))
            .attr('r', markerSize);
    }

    // API
    /**
     * Gets or Sets the duration of the animation
     * @param  {number} _x=1200         Desired animation duration for the graph
     * @return {duration | module}      Current animation duration or Chart module to chain calls
     * @public
     */
    exports.animationDuration = function (_x) {
        if (!arguments.length) {
            return clipDuration;
        }
        clipDuration = _x;

        return this;
    };

    /**
     * Gets or Sets the areaGradient of the chart
     * @param  {string[]} _x = ['#F5FDFF', '#F6FEFC']   Desired areaGradient for the graph
     * @return {areaGradient | module}                  Current areaGradient or Chart module to chain calls
     * @public
     */
    exports.areaGradient = function (_x) {
        if (!arguments.length) {
            return areaGradient;
        }
        areaGradient = _x;

        return this;
    };

    /**
     * Gets or Sets the dateLabel of the chart
     * @param  {number} _x          Desired dateLabel for the graph
     * @return {dateLabel | module} Current dateLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    exports.dateLabel = function (_x) {
        if (!arguments.length) {
            return dateLabel;
        }
        dateLabel = _x;
        dataKeyDeprecationMessage('date');

        return this;
    };

    /**
     * Chart exported to png and a download action is fired
     * @param {string} filename     File title for the resulting picture
     * @param {string} title        Title to add at the top of the exported picture
     * @return {Promise}            Promise that resolves if the chart image was loaded and downloaded successfully
     * @public
     */
    exports.exportChart = function (filename, title) {
        return exportChart.call(exports, svg, filename, title);
    };

    /**
     * Gets or Sets the height of the chart
     * @param  {number} _x=30       Desired height for the graph
     * @return { height | module}   Current height or Chart module to chain calls
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
     * Gets or Sets the isAnimated property of the chart, making it to animate when render.
     * By default this is 'false'
     *
     * @param  {boolean} _x=false       Desired animation flag
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
     * Gets or Sets the lineGradient of the chart
     * @param  {string[]} _x = colorHelper.colorGradients.greenBlue     Desired lineGradient for the graph
     * @return {lineGradient | module}                                  Current lineGradient or Chart module to chain calls
     * @public
     */
    exports.lineGradient = function (_x) {
        if (!arguments.length) {
            return lineGradient;
        }
        lineGradient = _x;

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
     * @param  {object} _x          Margin object to get/set
     * @return {object | module}    Current margin or Chart module to chain calls
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
     * Gets or Sets the text of the title at the top of sparkline.
     * To style the title, use the titleTextStyle method below.
     * @param  {string} _x = null   String to set
     * @return {string | module}    Current titleText or Chart module to chain calls
     * @public
     */
    exports.titleText = function (_x) {
        if (!arguments.length) {
            return titleText;
        }
        titleText = _x;

        return this;
    };

    /**
     * Gets or Sets the text style object of the title at the top of sparkline.
     * Using this method, you can set font-family, font-size, font-weight, font-style,
     * and color (fill). The default text font settings:
     *
     * <pre>
     * <code>
     * {
     *    'font-family': 'sans-serif',
     *    'font-size': '22px',
     *    'font-weight': 0,
     *    'font-style': 'normal',
     *    'fill': linearGradient[0]
     * }
     * </code>
     * </pre>
     *
     * You can set attributes individually. Setting just 'font-family'
     * within the object will set custom 'font-family` while the rest
     * of the attributes will have the default values provided above.
     * @param  {object} _x          Object with text font configurations
     * @return {Object | module}    Current titleTextStyle or Chart module to chain calls
     * @public
     * @example
     * sparkline.titleTextStyle({
     *    'font-family': 'Roboto',
     *    'font-size': '1.5em',
     *    'font-weight': 600,
     *    'font-style': 'italic',
     *    'fill': 'lightblue'
     * })
     */
    exports.titleTextStyle = function (_x) {
        if (!arguments.length) {
            return titleTextStyle;
        }
        titleTextStyle = _x;

        return this;
    };

    /**
     * Gets or Sets the valueLabel of the chart
     * @param  {number} _x              Desired valueLabel for the graph
     * @return {valueLabel | module}    Current valueLabel or Chart module to chain calls
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
     * Gets or Sets the width of the chart
     * @param  {number} _x=100      Desired width for the graph
     * @return {width | module}     Current width or Chart module to chain calls
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