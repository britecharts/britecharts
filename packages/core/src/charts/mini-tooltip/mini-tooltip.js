import { max } from 'd3-array';
import { easeQuadInOut } from 'd3-ease';
import { format } from 'd3-format';
import { select } from 'd3-selection';
import 'd3-transition';

import { dataKeyDeprecationMessage } from '../helpers/project';
import { isDefined } from '../helpers/type';
import { measureFrame, originOf } from '../tooltip/frame';
import { place } from '../tooltip/place';

const NUMBER_FORMAT = '.2f';

/**
 * Mini Tooltip Component reusable API class that renders a
 * simple and configurable tooltip element for Britechart's
 * bar chart.
 *
 * @module Mini-tooltip
 * @tutorial bar
 * @requires d3-array, d3-ease, d3-format, d3-selection, d3-transition
 *
 * @example
 * const barChart = line(),
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
export default function module() {
    let margin = {
            top: 12,
            right: 12,
            bottom: 12,
            left: 12,
        },
        width = 100,
        height = 100,
        // Optional Title
        title = '',
        // Data Format
        valueLabel = 'value',
        nameLabel = 'name',
        // Animations
        fadeInDuration = 200,
        ease = easeQuadInOut,
        // tooltip
        tooltipBackground,
        backgroundBorderRadius = 2,
        tooltipTextContainer,
        tooltipGap = 12,
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
        numberFormat = NUMBER_FORMAT,
        valueFormatter = (value) => format(numberFormat)(value),
        chartWidth,
        chartHeight,
        svg;

    /**
     * This function creates the graph using the selection as container
     * @param {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     */
    function exports(_selection) {
        _selection.each(function () {
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
        let container = svg
            .append('g')
            .classed('tooltip-container-group', true)
            .attr('transform', `translate( ${margin.left}, ${margin.top})`);

        container.append('g').classed('tooltip-group', true);
    }

    /**
     * Builds the SVG element that will contain the chart
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
     * @private
     */
    function buildSVG(container) {
        if (!svg) {
            svg = select(container)
                .append('g')
                .classed('britechart britechart-mini-tooltip', true)
                // Never between the pointer and the shape underneath: the
                // charts listen on their shapes, and a tooltip that caught
                // the pointer would hide itself with a mouseout
                .attr('pointer-events', 'none');

            buildContainerGroups();
        }
        svg.transition().attr('width', width).attr('height', height);

        // Hidden by default
        exports.hide();
    }

    /**
     * Draws the different elements of the Tooltip box
     * @return void
     * @private
     */
    function drawTooltip() {
        tooltipTextContainer = svg
            .selectAll('.tooltip-group')
            .append('g')
            .classed('tooltip-text select-disable', true);

        tooltipBackground = tooltipTextContainer
            .append('rect')
            .classed('tooltip-background', true)
            .attr('width', width)
            .attr('height', height)
            .attr('rx', backgroundBorderRadius)
            .attr('ry', backgroundBorderRadius)
            .attr('y', -margin.top)
            .attr('x', -margin.left)
            .style('pointer-events', 'none');
    }

    /**
     * Figures out the max length of the tooltip lines
     * @param  {D3Selection[]} texts    List of svg elements of each line
     * @return {Number}                 Max size of the lines
     * @private
     */
    function getMaxLengthLine(...texts) {
        // getBBox() comes back empty while the tooltip is hidden and under
        // jsdom; a missing width must not turn into a NaN attribute.
        let textSizes = texts
            .filter((x) => !!x)
            .map((x) => x.node().getBBox().width || 0);

        return max(textSizes) || 0;
    }

    /**
     * Works out where to draw the box for the pointer position.
     *
     * The position arrives in the coordinate space of the parent of the
     * element this tooltip was called on -- the chart's `.metadata-group`
     * -- which is the space every chart dispatches its pointer in. The
     * chart's size is not needed: the tooltip lives inside the chart's svg,
     * so it measures its own frame (see ../tooltip/frame.js) and keeps the
     * box inside it (see ../tooltip/place.js), flipping to the other side of
     * the pointer when there is no room and sliding vertically at the edges.
     *
     * @param  {Number} mouseX      Current horizontal mouse position
     * @param  {Number} mouseY      Current vertical mouse position
     * @return {Number[]}           translate() for the tooltip
     * @private
     */
    function getTooltipPosition([mouseX, mouseY]) {
        const container = svg.node().parentNode;
        const [parentX, parentY] = originOf(container.parentNode);
        const {
            width,
            height,
            origin: [containerX, containerY],
        } = measureFrame(container);
        const { x, y } = place({
            anchor: [parentX + (mouseX || 0), parentY + (mouseY || 0)],
            size: [
                chartWidth + margin.left + margin.right,
                chartHeight + margin.top + margin.bottom,
            ],
            frame: { width, height },
            gap: tooltipGap,
        });

        return [x - containerX, y - containerY];
    }

    /**
     * Hides the tooltip
     * @return {void}
     * @private
     */
    function hideTooltip() {
        svg.interrupt().style('visibility', 'hidden');
    }

    /**
     * Shows the tooltip. With a data point it renders and places it at once;
     * without one it shows empty until the first update. Either way a fade
     * still running from the last update is stopped first, so it cannot
     * reveal the box before its content is right.
     * @param  {Object} [dataPoint]     Data point from the chart
     * @param  {Number[]} [position]    [x, y] of the pointer in the chart
     * @return {void}
     * @private
     */
    function showTooltip(dataPoint, position) {
        svg.interrupt().style('visibility', 'visible').style('opacity', 0);

        if (dataPoint) {
            updateTooltip(dataPoint, position);
        } else {
            updateContent();
        }
    }

    /**
     * Draws the data entries inside the tooltip for a given topic
     * @param  {Object} topic Topic to extract data from
     * @return void
     * @private
     */
    function updateContent(dataPoint = {}) {
        let value = dataPoint[valueLabel],
            name = dataPoint[nameLabel] || '',
            lineHeight = textSize * textLineHeight,
            valueLineHeight = valueTextSize * valueTextLineHeight,
            defaultDy = '1em',
            temporalHeight = 0,
            tooltipValue,
            tooltipName,
            tooltipTitle;

        tooltipTextContainer.selectAll('text').remove();

        if (title) {
            tooltipTitle = tooltipTextContainer
                .append('text')
                .classed('mini-tooltip-title', true)
                .attr('dy', defaultDy)
                .attr('y', 0)
                .style('fill', titleFillColor)
                .style('font-size', textSize)
                .text(title);

            temporalHeight = lineHeight + temporalHeight;
        }

        if (name) {
            tooltipName = tooltipTextContainer
                .append('text')
                .classed('mini-tooltip-name', true)
                .attr('dy', defaultDy)
                .attr('y', temporalHeight || 0)
                .style('fill', nameTextFillColor)
                .style('font-size', textSize)
                .text(name);

            temporalHeight = lineHeight + temporalHeight;
        }

        if (isDefined(value)) {
            tooltipValue = tooltipTextContainer
                .append('text')
                .classed('mini-tooltip-value', true)
                .attr('dy', defaultDy)
                .attr('y', temporalHeight || 0)
                .style('fill', valueTextFillColor)
                .style('font-size', valueTextSize)
                .style('font-weight', valueTextWeight)
                .text(valueFormatter(value));

            temporalHeight = valueLineHeight + temporalHeight;
        }

        chartWidth = getMaxLengthLine(tooltipName, tooltipTitle, tooltipValue);
        chartHeight = temporalHeight;
    }

    /**
     * Updates the size of the tooltip and moves it next to the pointer
     * @param  {Number[]} mousePosition   [x, y] of the pointer in the chart
     * @return void
     * @private
     */
    function updatePositionAndSize(mousePosition) {
        let [tooltipX, tooltipY] = getTooltipPosition(mousePosition);

        svg.transition()
            .duration(fadeInDuration)
            .ease(ease)
            .style('opacity', 1)
            .attr('height', chartHeight + margin.top + margin.bottom)
            .attr('width', chartWidth + margin.left + margin.right)
            .attr('transform', `translate(${tooltipX},${tooltipY})`);

        tooltipBackground
            .attr('height', chartHeight + margin.top + margin.bottom)
            .attr('width', chartWidth + margin.left + margin.right);
    }

    /**
     * Updates tooltip content, size and position
     *
     * @param  {Object} dataPoint       Current datapoint to show info about
     * @param  {Number[]} position      [x, y] of the pointer in the chart
     * @return void
     * @private
     */
    function updateTooltip(dataPoint, position) {
        updateContent(dataPoint);
        updatePositionAndSize(position);
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
     * @return { text | module} nameLabel or Mini Tooltip module to chain calls
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
     * Gets or Sets the number format for the value displayed on the tooltip
     * @param  {string} _x = '.2f'      Desired numberFormat for the chart. See examples [here]{@link https://observablehq.com/@d3/d3-format}
     * @return {string | module}        Current numberFormat or Chart module to chain calls
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
     * Gets or Sets the formatter function for the value displayed on the tooltip.
     * Setting this property makes the tooltip ignore numberFormat. Set by default to
     * d3-format formatter with numberFormat.
     * @param  {Function} _x Desired formatter function
     * @return {Function | module} Current valueFormatter or Chart module to chain calls
     * @public
     * @example tooltipChart.valueFormatter(value => value.toString().length.toString())
     */
    exports.valueFormatter = function (_x) {
        if (!arguments.length) {
            return valueFormatter;
        }
        valueFormatter = _x;

        return this;
    };

    /**
     * Shows the tooltip. The charts dispatch `customMouseOver` with the
     * hovered data point and the pointer position, so
     * `chart.on('customMouseOver', tooltip.show)` shows it with the right
     * content straight away; called with no arguments it shows empty until
     * the first `update`.
     * @param  {Object} [dataPoint]         Datapoint of the hovered element
     * @param  {Array} [mousePosition]      Mouse position relative to the chart's drawing area, [x, y]
     * @return {module}                     Current component
     * @public
     */
    exports.show = function (dataPoint, mousePosition) {
        showTooltip(dataPoint, mousePosition);

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
     * Updates the position and content of the tooltip. The charts dispatch
     * these with `customMouseMove`, so `chart.on('customMouseMove', tooltip.update)`
     * is all the wiring needed.
     * @param  {Object} dataPoint       Datapoint of the hovered element
     * @param  {Array} mousePosition    Mouse position relative to the chart's drawing area, [x, y]
     * @param  {Array} [chartSize]      Ignored; the tooltip measures the chart itself. Kept so
     *                                  the charts' existing `customMouseMove` payload still fits
     * @return {module}                 Current component
     * @public
     */
    exports.update = function (dataPoint, mousePosition) {
        updateTooltip(dataPoint, mousePosition);

        return this;
    };

    /**
     * Gets or Sets data's valueLabel
     * @param  {text} _x        Desired valueLabel
     * @return {text | module}  valueLabel or Mini Tooltip module to chain calls
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

    return exports;
}
