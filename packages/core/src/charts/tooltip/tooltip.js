import { format } from 'd3-format';
import { select } from 'd3-selection';
import { timeFormat } from 'd3-time-format';
import 'd3-transition';

import { axisTimeCombinations } from '../helpers/constants';
import { dataKeyDeprecationMessage } from '../helpers/project';
import {
    formatIntegerValue,
    formatDecimalValue,
    isInteger,
} from '../helpers/number';
import { getTextWidth, getApproximateNumberOfLines } from '../helpers/text';
import { isDefined } from '../helpers/type';
import { measureFrame, originOf, translateOf } from './frame';
import { chaseDuration, ease, prepareToShow, fadeIn, fadeOut } from './motion';
import { place } from './place';

// Key of the row that stands for the topics past maxEntries
const MORE_ROW_KEY = '__more__';

/**
 * Tooltip Component reusable API class that renders a
 * simple and configurable tooltip element for Britechart's
 * line chart or stacked area chart.
 *
 * @module Tooltip
 * @tutorial tooltip
 * @requires d3-array, d3-axis, d3-dispatch, d3-format, d3-scale, d3-selection, d3-transition
 *
 * @example
 * const lineChart = line(),
 *     tooltip = tooltip();
 *
 * tooltip
 *     .title('Tooltip title');
 *
 * lineChart
 *     .width(500)
 *     .on('customMouseOver', function() {
 *          tooltip.show();
 *     })
 *     .on('customMouseMove', function(dataPoint, topicColorMap, dataPointXPosition, mouseYPosition) {
 *          tooltip.update(dataPoint, topicColorMap, dataPointXPosition, mouseYPosition);
 *     })
 *     .on('customMouseOut', function() {
 *          tooltip.hide();
 *     });
 *
 * d3Selection.select('.css-selector')
 *     .datum(dataset)
 *     .call(lineChart);
 *
 * d3Selection.select('.metadata-group .hover-marker')
 *     .datum([])
 *     .call(tooltip);
 *
 */
export default function module() {
    let margin = {
            top: 2,
            right: 2,
            bottom: 2,
            left: 2,
        },
        width = 250,
        height = 45,
        title = 'Tooltip title',
        shouldShowDateInTitle = true,
        valueFormat = null,
        // tooltip
        tooltipBackground,
        tooltipBackgroundX = 0,
        tooltipOffset = {
            x: 0,
            y: 0,
        },
        tooltipGap = 12,
        tooltipMaxTopicLength = 170,
        tooltipMaxTitleLength = 230,
        tooltipGroupOrigin = null,
        tooltipTextContainer,
        tooltipBody,
        tooltipTitle,
        tooltipWidth = 250,
        tooltipHeight = 48,
        tooltipBorderRadius = 3,
        tooltipContentPadding = 12,
        circularMarkerRadius = 4,
        ttTextX = 0,
        ttTextY = 37,
        // Fallback for the getBBox() guard below: roughly one line of the 12px
        // tooltip text. Without it the first measurement that comes back 0 makes
        // textHeight undefined, and every height derived from it NaN.
        defaultTextHeight = 14,
        textHeight = defaultTextHeight,
        entryLineLimit = 3,
        initialTooltipBodyYPosition = 37,
        additionalTooltipTitleHeight = 0,
        initialTooltipTextXPosition = -22,
        tooltipTextLinePadding = 5,
        tooltipRightWidth,
        // Whether show() has been called and hide() has not
        isShown = false,
        // Whether the next update is the first since show(), and fades in
        isEntering = false,
        circleYOffset = 8,
        colorMap,
        titleFillColor = '#6D717A',
        textFillColor = '#282C35',
        tooltipTextColor = '#000000',
        dateLabel = 'date',
        valueLabel = 'value',
        nameLabel = 'name',
        topicLabel = 'topics',
        defaultAxisSettings = axisTimeCombinations.DAY_MONTH,
        xAxisValueType = 'auto',
        // Rows shown before the rest are folded into a "+n more" row
        maxEntries = 12,
        dateFormat = null,
        dateCustomFormat = null,
        topicsOrder = [],
        // formats
        numberFormat = null,
        valueFormatter = null,
        monthDayYearFormat = timeFormat('%b %d, %Y'),
        monthDayHourFormat = timeFormat('%b %d, %I %p'),
        locale,
        chartWidth,
        chartHeight,
        data,
        svg;

    /**
     * This function creates the graph using the selection as container
     * @param {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     * @param {Object} _data The data to attach and generate the chart
     */
    function exports(_selection) {
        _selection.each(function (_data) {
            chartWidth = width - margin.left - margin.right;
            chartHeight = height - margin.top - margin.bottom;
            data = _data;

            buildSVG(this);
        });
    }

    /**
     * Builds containers for the tooltip
     * Also applies the Margin convention
     * @private
     */
    function buildContainerGroups() {
        const container = svg
            .append('g')
            .classed('tooltip-container-group select-disable', true)
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
                .classed('britechart britechart-tooltip', true)
                // Never between the pointer and the chart: a tooltip that
                // caught the pointer would end the hover that shows it
                .attr('pointer-events', 'none')
                .style('visibility', 'hidden');

            buildContainerGroups();
            drawTooltip();

            // Hidden by default. Only on the first build: the wrappers call
            // the tooltip on its container again on every update, and a
            // hide there would make the box fade in again on every move
            exports.hide();
        }
        svg.transition().attr('width', width).attr('height', height);
    }

    /**
     * Draws the different elements of the Tooltip box
     * @return void
     * @private
     */
    function drawTooltip() {
        tooltipBackgroundX = -tooltipWidth / 4 + tooltipContentPadding;

        tooltipTextContainer = svg
            .selectAll('.tooltip-group')
            .append('g')
            .classed('tooltip-text', true);

        tooltipBackground = tooltipTextContainer
            .append('rect')
            .classed('tooltip-background', true)
            .attr('x', tooltipBackgroundX)
            .attr('y', 0)
            .attr('width', tooltipWidth)
            .attr('height', tooltipHeight)
            .attr('rx', tooltipBorderRadius)
            .attr('ry', tooltipBorderRadius);

        tooltipTitle = tooltipTextContainer
            .append('text')
            .classed('tooltip-title', true)
            .attr('x', getTooltipTitleXPosition())
            .attr('dy', '0em')
            .attr('y', tooltipContentPadding * 2)
            .style('fill', titleFillColor);

        tooltipBody = tooltipTextContainer
            .append('g')
            .classed('tooltip-body', true)
            .style('fill', textFillColor);

        updateTooltipTitleYPosition();
    }

    /**
     * Formats the value depending on its characteristics
     * @param  {Number} value Value to format
     * @return {Number}       Formatted value
     * @private
     */
    function getFormattedValue(value) {
        if (valueFormatter !== null) {
            return valueFormatter(value);
        }

        let chosenValueFormatter = formatDecimalValue;

        if (!value) {
            return 0;
        }
        if (numberFormat !== null) {
            chosenValueFormatter = format(numberFormat);
        } else if (isInteger(value)) {
            chosenValueFormatter = formatIntegerValue;
        }

        return chosenValueFormatter(value);
    }

    /**
     * Works out where to draw the box for an anchor point.
     *
     * The anchor arrives in the coordinate space of the parent of the
     * element this tooltip was called on -- a chart's `.metadata-group`,
     * or the container group that holds it -- which is the space every chart
     * dispatches in. The chart's size is not passed in: the tooltip lives
     * inside the chart's svg, so it measures its own frame (see frame.js),
     * then keeps the box inside it (see place.js), flipping to the other side
     * of the anchor when there is no room and sliding vertically at the edges.
     *
     * @param  {Number} anchorX     Horizontal anchor, usually the data point's x
     * @param  {Number} anchorY     Vertical anchor, usually the pointer's y
     * @return {Object}             { x, y } translate() for the tooltip group and
     *                              the origin the group is measured from
     * @private
     */
    function getTooltipPosition([anchorX, anchorY]) {
        const container = svg.node().parentNode;
        const [parentX, parentY] = originOf(container.parentNode);
        // Measured from the parent of the group that gets translated, so
        // the current position never feeds into the next one.
        const {
            width,
            height,
            origin: [groupX, groupY],
        } = measureFrame(svg.select('.tooltip-container-group').node());
        const { x, y } = place({
            anchor: [
                parentX + (anchorX || 0) + tooltipOffset.x,
                parentY + (anchorY || 0),
            ],
            size: [tooltipWidth, tooltipHeight],
            frame: { width, height },
            gap: tooltipGap,
            offsetY: tooltipOffset.y,
        });

        return {
            x: x - groupX - tooltipBackgroundX,
            y: y - groupY,
            origin: [groupX, groupY],
        };
    }

    /**
     * Extracts the value from the data object
     * @param  {Object} data Data value containing the info
     * @return {String}      Value to show
     */
    function getValueText(data) {
        let value = data[valueLabel];
        let valueText;

        if (data.missingValue) {
            valueText = '-';
        } else {
            valueText = getFormattedValue(value).toString();
        }

        return valueText;
    }

    /**
     * Resets the height of the tooltip and the pointer for the text
     * position
     */
    function resetSizeAndPositionPointers() {
        tooltipHeight =
            48 + additionalTooltipTitleHeight + tooltipContentPadding;
        ttTextY = initialTooltipBodyYPosition + additionalTooltipTitleHeight;
        ttTextX = 0;
    }

    /**
     * Builds the nodes of one row of the tooltip: the colour dot, the
     * topic's name on the left and its value on the right. Positions and
     * text are set by layoutEntry on every update.
     * @param  {Selection} entry    The row's group, just entered
     * @return void
     * @private
     */
    function buildEntry(entry) {
        entry
            .append('circle')
            .classed('tooltip-circle', true)
            .attr('cx', -tooltipWidth / 4 + 30)
            .attr('cy', circleYOffset)
            .attr('r', circularMarkerRadius)
            .style('stroke-width', 1);

        entry
            .append('text')
            .classed('tooltip-left-text', true)
            .attr('dy', '1em')
            .attr('x', ttTextX)
            .attr('y', 0)
            .style('fill', tooltipTextColor);

        entry
            .append('text')
            .classed('tooltip-right-text', true)
            .attr('dy', '1em')
            .attr('y', 0)
            .style('fill', tooltipTextColor);
    }

    /**
     * Lays out one row of the tooltip for a topic. Rows are kept across
     * updates (see updateContent), so a text is only re-set, re-wrapped and
     * re-measured when it changed; the row goes to its y through its
     * group's transform.
     * @param  {Selection} entry    The row's group
     * @param  {Object} topic       Topic to extract data from
     * @return void
     * @private
     */
    function layoutEntry(entry, topic) {
        const name = topic[nameLabel];
        const isMoreRow = !!topic.isMoreRow;
        const leftText = isMoreRow
            ? `+${topic.hiddenCount} more`
            : topic.topicName || name;
        const rightText = isMoreRow ? '' : getValueText(topic);
        const left = entry.select('.tooltip-left-text');
        const right = entry.select('.tooltip-right-text');

        entry.attr('transform', `translate(${ttTextX}, ${ttTextY})`);

        if (left.attr('data-text') !== leftText) {
            left.attr('data-text', leftText)
                .text(leftText)
                .call(
                    textWrap,
                    tooltipMaxTopicLength,
                    initialTooltipTextXPosition
                );
        }

        if (right.attr('data-text') !== rightText) {
            right.attr('data-text', rightText).text(rightText);

            // A width of 0 comes back while the tooltip is hidden; keep the
            // last usable one, as with the height below
            const measuredWidth = right.node().getBBox().width;

            if (measuredWidth) {
                right.attr('data-width', measuredWidth);
                tooltipRightWidth = measuredWidth;
            }
        }

        const rightWidth =
            parseFloat(right.attr('data-width')) || tooltipRightWidth || 0;

        right.attr('x', tooltipWidth - rightWidth - 10 - tooltipWidth / 4);

        // A height of 0 comes back when the node cannot be measured: IE11 does it
        // when hovering over the vertical marker, and any browser does it while
        // the tooltip is still hidden. Keep the last usable measurement instead,
        // which is seeded with defaultTextHeight so it is never undefined.
        const measuredTextHeight = left.node().getBBox().height;

        textHeight = measuredTextHeight || textHeight;
        tooltipHeight += textHeight + tooltipTextLinePadding;

        entry
            .select('.tooltip-circle')
            .style('display', isMoreRow ? 'none' : null)
            .style('fill', isMoreRow ? null : colorMap[name]);

        ttTextY += textHeight + 7;
    }

    /**
     * Updates the size of the tooltip and moves it next to the anchor
     *
     * @param  {Number} xPosition DataPoint's x position in the chart
     * @param  {Number} yPosition Pointer's y position in the chart
     * @return void
     * @private
     */
    function updatePositionAndSize(xPosition, yPosition) {
        const { x, y, origin } = getTooltipPosition([xPosition, yPosition]);
        const group = svg.selectAll('.tooltip-group');

        if (isEntering) {
            fadeIn(svg);
            isEntering = false;
        }

        tooltipBackground
            .attr('width', tooltipWidth)
            .attr('height', tooltipHeight);

        // The box eases towards each new position, the same delayed follow
        // as the mini tooltip. The charts move the container this tooltip
        // lives in (the vertical marker) instantly to each data point, so
        // before easing, the group is shifted by the same amount the
        // container just moved: the box stays where it is on screen and
        // the ease runs in chart space, instead of jumping with the marker
        // and easing back.
        if (tooltipGroupOrigin) {
            const [currentX, currentY] = translateOf(group.node());
            const shiftX = origin[0] - tooltipGroupOrigin[0];
            const shiftY = origin[1] - tooltipGroupOrigin[1];

            if (shiftX || shiftY) {
                group
                    .interrupt()
                    .attr(
                        'transform',
                        `translate(${currentX - shiftX}, ${currentY - shiftY})`
                    );
            }
        }
        tooltipGroupOrigin = origin;

        group
            .transition()
            .duration(chaseDuration)
            .ease(ease)
            .attr('transform', `translate(${x}, ${y})`);
    }

    /**
     * Get formatted key to show in the tooltip title
     * @param {Date | String} key   Key to format
     * @return {String}     Formatted Key
     * @private
     */
    function formatKey(key) {
        if (!isDefined(key)) {
            return '';
        }

        const type =
            xAxisValueType === 'auto' ? detectKeyType(key) : xAxisValueType;

        if (type === 'number') {
            return Number(key);
        }

        if (type === 'category') {
            return String(key);
        }

        return formatDate(new Date(key));
    }

    /**
     * Works out how to show a key when xAxisValueType is 'auto': a Date or
     * a string that parses as one is a date, a number or a numeric string
     * is a number, anything else (a category name) is shown as it is
     * @param  {Date | Number | String} key   Key of the data point
     * @return {'date' | 'number' | 'category'}
     * @private
     */
    function detectKeyType(key) {
        if (key instanceof Date) {
            return 'date';
        }

        if (typeof key === 'number') {
            return 'number';
        }

        const text = String(key).trim();

        if (text !== '' && Number.isFinite(Number(text))) {
            return 'number';
        }

        if (Number.isFinite(Date.parse(text))) {
            return 'date';
        }

        return 'category';
    }

    /**
     * The key of a data point: the configured dateLabel, or, when the point
     * has no such field, its `key` (what the stacked and grouped bar charts
     * dispatch) or its `date`
     * @param  {Object} dataPoint   The hovered data point
     * @return {Date | Number | String | undefined}
     * @private
     */
    function getKey(dataPoint) {
        if (isDefined(dataPoint[dateLabel])) {
            return dataPoint[dateLabel];
        }

        if (isDefined(dataPoint.key)) {
            return dataPoint.key;
        }

        return dataPoint.date;
    }

    /**
     * Figures out which date format to use when showing the date of the current data entry
     * @param {Date} date   Date object to format
     * @return {Function}   The proper date formatting function
     * @private
     */
    function formatDate(date) {
        let settings = dateFormat || defaultAxisSettings;
        let format = null;
        let localeOptions = { month: 'short', day: 'numeric' };

        if (
            settings === axisTimeCombinations.DAY_MONTH ||
            settings === axisTimeCombinations.MONTH_YEAR
        ) {
            format = monthDayYearFormat;
            localeOptions.year = 'numeric';
        } else if (
            settings === axisTimeCombinations.HOUR_DAY ||
            settings === axisTimeCombinations.MINUTE_HOUR
        ) {
            format = monthDayHourFormat;
            localeOptions.hour = 'numeric';
        } else if (
            settings === axisTimeCombinations.CUSTOM &&
            typeof dateCustomFormat === 'string'
        ) {
            format = timeFormat(dateCustomFormat);
        }

        if (
            locale &&
            typeof Intl !== 'undefined' &&
            typeof Intl === 'object' &&
            Intl.DateTimeFormat
        ) {
            let f = Intl.DateTimeFormat(locale, localeOptions);

            return f.format(date);
        }

        return format(date);
    }

    /**
     * Returns the x-Position of the Tooltip Title
     * @private
     */
    function getTooltipTitleXPosition() {
        return -tooltipWidth / 4 + 2 * tooltipContentPadding;
    }

    /**
     * Helper method to sort the passed topics array by the names passed int he order arary
     * @param  {Object[]} topics    Topics data, retrieved from datapoint passed by line chart
     * @param  {Object[]} order     Array of names in the order to sort topics by
     * @return {Object[]}           sorted topics object
     * @private
     */
    function _sortByTopicsOrder(topics, order = topicsOrder) {
        return order.map(
            (orderName) => topics.filter(({ name }) => name === orderName)[0]
        );
    }

    /**
     * Sorts topic by alphabetical order for arrays of objects with a name proeprty
     * @param  {Array} topics   List of topic objects
     * @return {Array}          List of topic name strings
     * @private
     */
    function _sortByAlpha(topics) {
        return topics
            .map((d) => d)
            .sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name === b.name) return 0;

                return -1;
            });
    }

    /**
     * Calculates the number of lines the tooltip title will need and updates the
     * initialTooltipBodyYPosition accordingly
     * @private
     */
    function updateTooltipTitleYPosition() {
        const approximateTitle = getTooltipTitle(Date.now());
        const approximateNumberOfTitleLines = getApproximateNumberOfLines(
            approximateTitle,
            16,
            tooltipMaxTitleLength
        );

        if (approximateNumberOfTitleLines > 1) {
            additionalTooltipTitleHeight =
                17 * (approximateNumberOfTitleLines - 1);
        }
    }

    /**
     * Updates value of tooltipTitle with the data meaning and the date
     * @param  {Object} dataPoint Point of data to use as source
     * @return void
     * @private
     */
    function updateTitle(dataPoint) {
        const textTitle = getTooltipTitle(getKey(dataPoint));

        tooltipTitle
            .text(textTitle)
            .call(textWrap, tooltipMaxTitleLength, getTooltipTitleXPosition());
    }

    /**
     * Gets the tooltipTitle respecting the different settings
     * @param  {Date | String}  date  Date to use
     * @private
     */
    function getTooltipTitle(date) {
        let textTitle = title;
        let formattedDate = formatKey(date);

        if (textTitle.length) {
            if (shouldShowDateInTitle && formattedDate !== '') {
                textTitle = `${textTitle} - ${formattedDate}`;
            }
        } else {
            textTitle = formattedDate;
        }

        return textTitle;
    }

    /**
     * Fades the tooltip out and hides it
     * @return {void}
     * @private
     */
    function hideTooltip() {
        if (!isShown) {
            return;
        }
        isShown = false;
        isEntering = false;
        fadeOut(svg);
    }

    /**
     * Shows the tooltip; it fades in with its first update
     * @return {void}
     * @private
     */
    function showTooltip() {
        // Already showing: nothing to do, and no new fade -- the wrappers
        // call show() before every update
        if (isShown) {
            return;
        }
        isShown = true;
        // Transparent until the first update fills it, which fades it in
        isEntering = true;
        prepareToShow(svg);
    }

    /**
     * Wraps a text given the text, width, x position and textFormatter function
     * @param  {D3Selection} text  Selection with the text to wrap inside
     * @param  {Number} width Desired max width for that line
     * @param  {Number} xpos  Initial x position of the text
     * REF: http://bl.ocks.org/mbostock/7555321
     * More discussions on https://github.com/mbostock/d3/issues/1642
     * @private
     *
     */
    function textWrap(text, width, xpos = 0) {
        text.each(function () {
            let words, word, line, lineNumber, lineHeight, y, dy, tspan;

            text = select(this);

            words = text.text().split(/\s+/).reverse();
            line = [];
            lineNumber = 0;
            lineHeight = 1.2;
            y = text.attr('y');
            dy = parseFloat(text.attr('dy'));
            tspan = text
                .text(null)
                .append('tspan')
                .attr('x', xpos)
                .attr('y', y)
                .attr('dy', dy + 'em');

            while ((word = words.pop())) {
                line.push(word);
                tspan.text(line.join(' '));

                // fixes for IE wrap text issue
                const textWidth = getTextWidth(
                    line.join(' '),
                    16,
                    'Karla, sans-serif'
                );

                if (textWidth > width) {
                    line.pop();
                    tspan.text(line.join(' '));

                    if (lineNumber < entryLineLimit - 1) {
                        line = [word];
                        tspan = text
                            .append('tspan')
                            .attr('x', xpos)
                            .attr('y', y)
                            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                            .text(word);
                    }
                }
            }
        });
    }

    /**
     * Draws the data entries inside the tooltip
     * @param  {Object} dataPoint   Data entry from to take the info
     * @return void
     * @private
     */
    function updateContent(dataPoint) {
        let topics = dataPoint[topicLabel];

        // sort order by topicsOrder array if passed
        if (topicsOrder.length) {
            topics = _sortByTopicsOrder(topics);
        } else if (topics.length && topics[0].name) {
            topics = _sortByAlpha(topics);
        }

        topics = topics.filter(Boolean);

        // Past maxEntries the last row says how many are not shown, so the
        // box keeps a height that fits in the chart
        if (maxEntries > 0 && topics.length > maxEntries) {
            const shown = topics.slice(0, maxEntries - 1);

            topics = shown.concat([
                {
                    [nameLabel]: MORE_ROW_KEY,
                    isMoreRow: true,
                    hiddenCount: topics.length - shown.length,
                },
            ]);
        }

        updateTitle(dataPoint);
        resetSizeAndPositionPointers();

        // One row per topic, kept across updates so the pointer moving
        // over the chart re-sets text and positions instead of rebuilding
        // every node
        const entries = tooltipBody
            .selectAll('.tooltip-entry')
            .data(topics, (topic) => topic[nameLabel]);

        entries.exit().remove();

        const entered = entries
            .enter()
            .append('g')
            .classed('tooltip-entry', true)
            .call(buildEntry);

        entered
            .merge(entries)
            .order()
            .each(function (topic) {
                layoutEntry(select(this), topic);
            });
    }

    /**
     * Updates tooltip title, content, size and position
     * sorts by alphatical name order if not forced order given
     *
     * @param  {lineChartPointByDate} dataPoint  Current datapoint to show info about
     * @param  {Number} xPosition           Position of the mouse on the X axis
     * @return void
     * @private
     */
    function updateTooltip(dataPoint, xPosition, yPosition) {
        updateContent(dataPoint);
        updatePositionAndSize(xPosition, yPosition);
    }

    // API

    /**
     * constants to be used to force the x axis to respect a certain granularity
     * current options: HOUR_DAY, DAY_MONTH, MONTH_YEAR
     * @example tooltip.dateFormat(tooltip.axisTimeCombinations.HOUR_DAY)
     */
    exports.axisTimeCombinations = axisTimeCombinations;

    /**
     * Exposes the ability to force the tooltip to use a certain date format
     * @param  {String} _x          Desired format
     * @return {String | module}  Current format or module to chain calls
     * @public
     */
    exports.dateFormat = function (_x) {
        if (!arguments.length) {
            return dateFormat || defaultAxisSettings;
        }
        dateFormat = _x;

        return this;
    };

    /**
     * Exposes the ability to use a custom date format
     * @param  {String} _x          Desired custom format
     * @return {String | module}  Current format or module to chain calls
     * @public
     * @example tooltip.dateFormat(tooltip.axisTimeCombinations.CUSTOM);
     * tooltip.dateCustomFormat('%H:%M %p')
     */
    exports.dateCustomFormat = function (_x) {
        if (!arguments.length) {
            return dateCustomFormat;
        }
        dateCustomFormat = _x;

        return this;
    };

    /**
     * Gets or Sets the dateLabel of the data: the field of the data point
     * shown in the title. When the data point has no such field, its `key`
     * (what the stacked and grouped bar charts dispatch) or its `date` is
     * used, so the default works for every chart.
     * @param  {String} _x          Desired dateLabel
     * @return {String | module}   Current dateLabel or Chart module to chain calls
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
     * Hides the tooltip
     * @return {module} Tooltip module to chain calls
     * @public
     */
    exports.hide = function () {
        hideTooltip();

        return this;
    };

    /**
     * Pass locale for the tooltip to render the date in
     * @param  {String} _x          Must be a locale tag like 'en-US' or 'fr-FR'
     * @return {String | module}    Current locale or module to chain calls
     * @public
     */
    exports.locale = function (_x) {
        if (!arguments.length) {
            return locale;
        }
        locale = _x;

        return this;
    };

    /**
     * Gets or Sets the nameLabel of the data
     * @param  {String} _x           Desired nameLabel
     * @return {String | module}    Current nameLabel or Chart module to chain calls
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
     * @param  {string} _x              Desired numberFormat for the chart. See examples [here]{@link https://observablehq.com/@d3/d3-format}
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
     * Setting this property makes the tooltip ignore numberFormat.
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
     * Gets or Sets shouldShowDateInTitle
     * @param  {Boolean} _x          Desired value
     * @return {Boolean | module}    Current shouldShowDateInTitle or Chart module to chain calls
     * @public
     */
    exports.shouldShowDateInTitle = function (_x) {
        if (!arguments.length) {
            return shouldShowDateInTitle;
        }
        shouldShowDateInTitle = _x;

        return this;
    };

    /**
     * Shows the tooltip
     * @return {module} Tooltip module to chain calls
     * @public
     */
    exports.show = function () {
        showTooltip();

        return this;
    };

    /**
     * Gets or Sets the title of the tooltip (to only show the date, set a blank title)
     * @param  {String} _x          Desired title
     * @return {String | module}   Current title or module to chain calls
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
     * Gets or Sets an offset, in pixels, applied to the point the tooltip is
     * placed next to: `x` moves the anchor along the chart, `y` moves the box
     * up (negative) or down. The box still stays inside the chart.
     * @param  {Object} _x          Object with the x and y offsets
     * @return {Object | module}    Current tooltipOffset or module to chain calls
     * @public
     * @example tooltip.tooltipOffset({ x: 0, y: -20 })
     */
    exports.tooltipOffset = function (_x) {
        if (!arguments.length) {
            return tooltipOffset;
        }
        tooltipOffset = _x;

        return this;
    };

    /**
     * Gets or Sets the most rows the tooltip shows. Past that, the last row
     * reads "+n more" instead, so the box keeps a height that fits in the
     * chart. 0 shows every row.
     * @param  {Number} [_x=12]      Most rows to show
     * @return {Number | module}    Current maxEntries or Chart module to chain calls
     * @public
     * @example tooltip.maxEntries(6)
     */
    exports.maxEntries = function (_x) {
        if (!arguments.length) {
            return maxEntries;
        }
        maxEntries = _x;

        return this;
    };

    /**
     * Pass an override for the ordering of your tooltip
     * @param  {String[]} _x           Array of the names of your tooltip items
     * @return {String[] | module}    Current overrideOrder or Chart module to chain calls
     * @public
     */
    exports.topicsOrder = function (_x) {
        if (!arguments.length) {
            return topicsOrder;
        }
        topicsOrder = _x;

        return this;
    };

    /**
     * Gets or Sets the topicLabel of the data
     * @param  {String} _x          Desired topicLabel
     * @return {String | module}   Current topicLabel or Chart module to chain calls
     * @public
     * @deprecated
     */
    exports.topicLabel = function (_x) {
        if (!arguments.length) {
            return topicLabel;
        }
        topicLabel = _x;
        dataKeyDeprecationMessage('topic');

        return this;
    };

    /**
     * Updates the position and content of the tooltip. The positions are the
     * ones the charts dispatch with `customMouseMove`: the hovered data
     * point's x and the pointer's y, relative to the chart's drawing area.
     * @param  {Object} dataPoint       Datapoint to represent
     * @param  {Object} colorMapping    Color scheme of the topics
     * @param  {Number} xPosition       X position to anchor the tooltip to, in pixels
     * @param  {Number} [yPosition]     Y position to anchor the tooltip to, in pixels
     * @return {Module}                 Tooltip module to chain calls
     * @public
     */
    exports.update = function (
        dataPoint,
        colorMapping,
        xPosition,
        yPosition = null
    ) {
        colorMap = colorMapping;
        updateTooltip(dataPoint, xPosition, yPosition);

        return this;
    };

    /**
     * Gets or Sets the valueLabel of the data
     * @param  {String} _x          Desired valueLabel
     * @return {String | module}   Current valueLabel or Chart module to chain calls
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
     * Gets or Sets how the key of the data point is shown in the title:
     * 'date' formats it as a date, 'number' as a number, 'category' shows
     * it as it is, and 'auto' (the default) picks one per key -- a Date or
     * a string that parses as one is a date, a number or a numeric string
     * is a number, anything else is a category. Set 'date' for keys that
     * happen to parse as numbers, or 'category' for names that happen to
     * parse as dates.
     * @param  {String} [_x='auto']     'auto', 'date', 'number' or 'category'
     * @return {String | module}        Current xAxisValueType or Chart module to chain calls
     * @public
     * @example tooltip.xAxisValueType('category')
     */
    exports.xAxisValueType = function (_x) {
        if (!arguments.length) {
            return xAxisValueType;
        }
        xAxisValueType = _x;

        return this;
    };

    return exports;
}
