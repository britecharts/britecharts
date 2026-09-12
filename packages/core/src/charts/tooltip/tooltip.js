import { easeQuadInOut } from 'd3-ease';
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
import { measureFrame, originOf, translateOf } from './frame';
import { place } from './place';

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
        // Animations
        mouseChaseDuration = 200,
        fadeInDuration = 100,
        ease = easeQuadInOut,
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
        xAxisValueType = 'date',
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
        }
        svg.transition().attr('width', width).attr('height', height);

        // Hidden by default
        exports.hide();
    }

    /**
     * Resets the tooltipBody content
     * @return void
     * @private
     */
    function cleanContent() {
        tooltipBody.selectAll('text').remove();
        tooltipBody.selectAll('circle').remove();
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
     * Draws the data entries inside the tooltip for a given topic
     * @param  {Object} topic Topic to extract data from
     * @return void
     * @private
     */
    function updateTopicContent(topic) {
        let name = topic[nameLabel],
            tooltipRight,
            tooltipLeftText,
            tooltipRightText,
            elementText;

        tooltipLeftText = topic.topicName || name;
        tooltipRightText = getValueText(topic);

        elementText = tooltipBody
            .append('text')
            .classed('tooltip-left-text', true)
            .attr('dy', '1em')
            .attr('x', ttTextX)
            .attr('y', ttTextY)
            .style('fill', tooltipTextColor)
            .text(tooltipLeftText)
            .call(textWrap, tooltipMaxTopicLength, initialTooltipTextXPosition);

        tooltipRight = tooltipBody
            .append('text')
            .classed('tooltip-right-text', true)
            .attr('dy', '1em')
            .attr('x', ttTextX)
            .attr('y', ttTextY)
            .style('fill', tooltipTextColor)
            .text(tooltipRightText);

        // A height of 0 comes back when the node cannot be measured: IE11 does it
        // when hovering over the vertical marker, and any browser does it while
        // the tooltip is still hidden. Keep the last usable measurement instead,
        // which is seeded with defaultTextHeight so it is never undefined.
        const measuredTextHeight = elementText.node().getBBox().height;

        textHeight = measuredTextHeight || textHeight;

        tooltipHeight += textHeight + tooltipTextLinePadding;
        // update the width if it exists because IE renders the elements
        // too slow and cant figure out the width?
        tooltipRightWidth = tooltipRight.node().getBBox().width
            ? tooltipRight.node().getBBox().width
            : tooltipRightWidth;
        tooltipRight.attr(
            'x',
            tooltipWidth - tooltipRightWidth - 10 - tooltipWidth / 4
        );

        tooltipBody
            .append('circle')
            .classed('tooltip-circle', true)
            .attr('cx', -tooltipWidth / 4 + 30)
            .attr('cy', ttTextY + circleYOffset)
            .attr('r', circularMarkerRadius)
            .style('fill', colorMap[name])
            .style('stroke-width', 1);

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

        svg.transition()
            .duration(fadeInDuration)
            .ease(ease)
            .style('opacity', 1);

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
            .duration(mouseChaseDuration)
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
        if (xAxisValueType === 'number') {
            return Number(key);
        }

        return formatDate(new Date(key));
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
        const textTitle = getTooltipTitle(dataPoint[dateLabel]);

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
            if (shouldShowDateInTitle) {
                textTitle = `${textTitle} - ${formattedDate}`;
            }
        } else {
            textTitle = formattedDate;
        }

        return textTitle;
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
     * Shows the tooltip updating it's content
     * @return {void}
     * @private
     */
    function showTooltip() {
        // A fade still running from the last update is stopped, so it
        // cannot reveal the box before the first update fills it
        svg.interrupt().style('visibility', 'visible').style('opacity', 0);
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

        cleanContent();
        updateTitle(dataPoint);
        resetSizeAndPositionPointers();
        topics.forEach(updateTopicContent);
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
     * Gets or Sets the dateLabel of the data
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
     * Gets or Sets the `xAxisValueType` of the data. Choose between 'date' and 'number'. When set to
     * number, the x-Axis values won't be parsed as dates anymore, but as numbers.
     * @param  {String} [_x='date']     Desired keyType
     * @return {String | module}        Current keyType or Chart module to chain calls
     * @public
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
