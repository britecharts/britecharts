define(function(require){
    'use strict';

    const d3Ease = require('d3-ease');
    const d3Format = require('d3-format');
    const d3Selection = require('d3-selection');
    const d3Transition = require('d3-transition');
    const d3TimeFormat = require('d3-time-format');

    const {axisTimeCombinations} = require('./helpers/constants');
    const {
        formatIntegerValue,
        formatDecimalValue,
        isInteger
    } = require('./helpers/number');

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
     * var lineChart = line(),
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
     *     .on('customMouseMove', function(dataPoint, topicColorMap, dataPointXPosition) {
     *          tooltip.update(dataPoint, topicColorMap, dataPointXPosition);
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
    return function module() {

        let margin = {
                top: 2,
                right: 2,
                bottom: 2,
                left: 2
            },
            width = 250,
            height = 45,

            title = 'Tooltip title',
            shouldShowDateInTitle = true,
            valueFormat = null,

            // tooltip
            tooltip,
            tooltipOffset = {
                y: -55,
                x: 0
            },
            tooltipMaxTopicLength = 170,
            tooltipTextContainer,
            tooltipDivider,
            tooltipBody,
            tooltipTitle,
            tooltipWidth = 250,
            tooltipHeight = 48,
            tooltipBorderRadius = 3,
            ttTextX = 0,
            ttTextY = 37,
            textSize,
            entryLineLimit = 3,
            initialTooltipTextXPosition = -25,
            tooltipTextLinePadding = 5,

            // Animations
            mouseChaseDuration = 100,
            ease = d3Ease.easeQuadInOut,

            circleYOffset = 8,

            colorMap,
            bodyFillColor = '#FFFFFF',
            borderStrokeColor = '#D2D6DF',
            titleFillColor = '#6D717A',
            textFillColor = '#282C35',
            tooltipTextColor = '#000000',

            dateLabel = 'date',
            valueLabel = 'value',
            nameLabel = 'name',
            topicLabel = 'topics',

            defaultAxisSettings = axisTimeCombinations.DAY_MONTH,
            dateFormat = null,
            dateCustomFormat = null,
            topicsOrder = [],

            // formats
            numberFormat = null,
            monthDayYearFormat = d3TimeFormat.timeFormat('%b %d, %Y'),
            monthDayHourFormat = d3TimeFormat.timeFormat('%b %d, %I %p'),
            locale,

            chartWidth, chartHeight,
            data,
            svg;


        /**
         * This function creates the graph using the selection as container
         * @param {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         * @param {Object} _data The data to attach and generate the chart
         */
        function exports(_selection) {
            _selection.each(function(_data){
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
            var container = svg.append('g')
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
                svg = d3Selection.select(container)
                  .append('g')
                    .classed('britechart britechart-tooltip', true)
                    .style('display', 'none');

                buildContainerGroups();
                drawTooltip();
            }
            svg
                .transition()
                .attr('width', width)
                .attr('height', height);

            // Hidden by default
            exports.hide();
        }

        /**
         * Resets the tooltipBody content
         * @return void
         * @private
         */
        function cleanContent(){
            tooltipBody.selectAll('text').remove();
            tooltipBody.selectAll('circle').remove();
        }

        /**
         * Draws the different elements of the Tooltip box
         * @return void
         * @private
         */
        function drawTooltip(){
            tooltipTextContainer = svg.selectAll('.tooltip-group')
              .append('g')
                .classed('tooltip-text', true);

            tooltip = tooltipTextContainer
              .append('rect')
                .classed('tooltip-text-container', true)
                .attr('x', -tooltipWidth / 4 + 8)
                .attr('y', 0)
                .attr('width', tooltipWidth)
                .attr('height', tooltipHeight)
                .attr('rx', tooltipBorderRadius)
                .attr('ry', tooltipBorderRadius)
                .style('fill', bodyFillColor)
                .style('stroke', borderStrokeColor)
                .style('stroke-width', 1);

            tooltipTitle = tooltipTextContainer
              .append('text')
                .classed('tooltip-title', true)
                .attr('x', -tooltipWidth / 4 + 16)
                .attr('dy', '.35em')
                .attr('y', 16)
                .style('fill', titleFillColor);

            tooltipDivider = tooltipTextContainer
              .append('line')
                .classed('tooltip-divider', true)
                .attr('x1', -tooltipWidth / 4 + 16)
                .attr('x2', 265)
                .attr('y1', 31)
                .attr('y2', 31)
                .style('stroke', borderStrokeColor);

            tooltipBody = tooltipTextContainer
              .append('g')
                .classed('tooltip-body', true)
                .style('transform', 'translateY(8px)')
                .style('fill', textFillColor);
        }

        /**
         * Formats the value depending on its characteristics
         * @param  {Number} value Value to format
         * @return {Number}       Formatted value
         * @private
         */
        function getFormattedValue(value) {
            let valueFormatter = formatDecimalValue;

            if (!value) {
                return 0;
            }
            if (numberFormat !== null) {
                valueFormatter = d3Format.format(numberFormat);
            } else if (isInteger(value)) {
                valueFormatter = formatIntegerValue;
            }

            return valueFormatter(value);
        }

        /**
         * Calculates the desired position for the tooltip
         * @param  {Number} mouseX             Current horizontal mouse position
         * @param  {Number} mouseY             Current vertical mouse position
         * @return {Number[]}                  X and Y position
         * @private
         */
        function getTooltipPosition([mouseX, mouseY]) {
            let tooltipX, tooltipY;

            // show tooltip to the right
            if ((mouseX - tooltipWidth) < 0) {
                // Tooltip on the right
                tooltipX = tooltipWidth - 185;
            } else {
                // Tooltip on the left
                tooltipX = -205
            }

            if (mouseY) {
                tooltipY = tooltipOffset.y;
                // tooltipY = mouseY + tooltipOffset.y;
            } else {
                tooltipY = tooltipOffset.y;
            }

            return [tooltipX, tooltipY];
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
            tooltipHeight = 48;
            ttTextY = 37;
            ttTextX = 0;
        }

        /**
         * Draws the data entries inside the tooltip for a given topic
         * @param  {Object} topic Topic to extract data from
         * @return void
         * @private
         */
        function updateTopicContent(topic){
            let name = topic[nameLabel],
                textHeight,
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

            textSize = elementText.node().getBBox();

            // IE11 give us sometimes a height of 0 when hovering on top of the vertical marker
            // This hack fixes it for some cases, but it doesn't work in multiline (they won't wrap)
            // Let's remove this once we stop supporting IE11
            textHeight = textSize.height ? textSize.height : 18.4;

            tooltipHeight += textHeight + tooltipTextLinePadding;

            // Not sure if necessary
            tooltipRight.attr('x', tooltipWidth - tooltipRight.node().getBBox().width - 10 - tooltipWidth / 4)

            tooltipBody
                .append('circle')
                .classed('tooltip-circle', true)
                .attr('cx', 23 - tooltipWidth / 4)
                .attr('cy', (ttTextY + circleYOffset))
                .attr('r', 5)
                .style('fill', colorMap[name])
                .style('stroke-width', 1);

            ttTextY += textHeight + 7;
        }

        /**
         * Updates size and position of tooltip depending on the side of the chart we are in
         * TODO: This needs a refactor, following the mini-tooltip code.
         *
         * @param  {Object} dataPoint DataPoint of the tooltip
         * @param  {Number} xPosition DataPoint's x position in the chart
         * @param  {Number} xPosition DataPoint's y position in the chart
         * @return void
         * @private
         */
        function updatePositionAndSize(dataPoint, xPosition, yPosition){
            let [tooltipX, tooltipY] = getTooltipPosition([xPosition, yPosition])

            tooltip
                .attr('width', tooltipWidth)
                .attr('height', tooltipHeight + 10);

            tooltipTextContainer.transition()
                .duration(mouseChaseDuration)
                .ease(ease)
                .attr('transform', `translate(${tooltipX}, ${tooltipY})`);

            tooltipDivider
                .attr('x2', tooltipWidth - 60);
        }

        /**
         * Updates value of tooltipTitle with the data meaning and the date
         * @param  {Object} dataPoint Point of data to use as source
         * @return void
         * @private
         */
        function updateTitle(dataPoint) {
            let tTitle = title;
            let formattedDate = formatDate(new Date(dataPoint[dateLabel]));

            if (tTitle.length) {
                if (shouldShowDateInTitle) {
                    tTitle = `${tTitle} - ${formattedDate}`;
                }
            } else {
                tTitle = formattedDate;
            }

            tooltipTitle.text(tTitle);
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
            let localeOptions = {month:'short', day:'numeric'};

            if (settings === axisTimeCombinations.DAY_MONTH || settings === axisTimeCombinations.MONTH_YEAR) {
                format = monthDayYearFormat;
                localeOptions.year = 'numeric';
            } else if (settings === axisTimeCombinations.HOUR_DAY || settings === axisTimeCombinations.MINUTE_HOUR) {
                format = monthDayHourFormat;
                localeOptions.hour = 'numeric';
            } else if (settings === axisTimeCombinations.CUSTOM && typeof dateCustomFormat === 'string') {
                format = d3TimeFormat.timeFormat(dateCustomFormat);
            }

            if (locale && ((typeof Intl !== 'undefined') && (typeof Intl === 'object' && Intl.DateTimeFormat))) {
                let f = Intl.DateTimeFormat(locale, localeOptions);

                return f.format(date);
            }

            return format(date);
        }

        /**
         * Helper method to sort the passed topics array by the names passed int he order arary
         * @param  {Object[]} topics    Topics data, retrieved from datapoint passed by line chart
         * @param  {Object[]} order     Array of names in the order to sort topics by
         * @return {Object[]}           sorted topics object
         * @private
         */
        function _sortByTopicsOrder(topics, order=topicsOrder) {
            return order.map((orderName) => topics.filter(({name}) => name === orderName)[0]);
        }

        /**
         * Sorts topic by alphabetical order for arrays of objects with a name proeprty
         * @param  {Array} topics   List of topic objects
         * @return {Array}          List of topic name strings
         * @private
         */
        function _sortByAlpha(topics) {
            return topics
                .map(d => d)
                .sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name === b.name) return 0;

                    return -1;
                });

            let otherIndex = topics.map(({ name }) => name).indexOf('Other');

            if (otherIndex >= 0) {
                let other = topics.splice(otherIndex, 1);

                topics = topics.concat(other);
            }
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
            text.each(function() {
                var words,
                    word,
                    line,
                    lineNumber,
                    lineHeight,
                    y,
                    dy,
                    tspan;

                text = d3Selection.select(this);

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

                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(' '));

                        if (lineNumber < entryLineLimit - 1) {
                            line = [word];
                            tspan = text.append('tspan')
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
        function updateContent(dataPoint){
            var topics = dataPoint[topicLabel];

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
            updatePositionAndSize(dataPoint, xPosition, yPosition);
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
        exports.dateFormat = function(_x) {
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
        exports.dateCustomFormat = function(_x) {
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
         */
        exports.dateLabel = function(_x) {
            if (!arguments.length) {
                return dateLabel;
            }
            dateLabel = _x;

            return this;
        };

        /**
         * Hides the tooltip
         * @return {module} Tooltip module to chain calls
         * @public
         */
        exports.hide = function() {
            svg.style('display', 'none');

            return this;
        };

        /**
         * Pass locale for the tooltip to render the date in
         * @param  {String} _x          Must be a locale tag like 'en-US' or 'fr-FR'
         * @return {String | module}    Current locale or module to chain calls
         * @public
         */
        exports.locale = function(_x) {
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
         */
        exports.nameLabel = function(_x) {
            if (!arguments.length) {
                return nameLabel;
            }
            nameLabel = _x;

            return this;
        };

        /**
         * Gets or Sets the number format for the value displayed on the tooltip
         * @param  {string} Desired number format
         * @return {string | module} Current numberFormat or Chart module to chain calls
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
         * Gets or Sets shouldShowDateInTitle
         * @param  {Boolean} _x          Desired value
         * @return {Boolean | module}    Current shouldShowDateInTitle or Chart module to chain calls
         * @public
         */
        exports.shouldShowDateInTitle = function(_x) {
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
        exports.show = function() {
            svg.style('display', 'block');

            return this;
        };

        /**
         * Gets or Sets the title of the tooltip (to only show the date, set a blank title)
         * @param  {String} _x          Desired title
         * @return {String | module}   Current title or module to chain calls
         * @public
         */
        exports.title = function(_x) {
            if (!arguments.length) {
                return title;
            }
            title = _x;

            return this;
        };

        /**
         * Pass an override for the offset of your tooltip
         * @param  {Object} tooltipOffset  Object representing the X and Y offsets
         * @return {Object | module}       Current tooltipOffset
         * @public
         */
        exports.tooltipOffset = function(_x) {
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
        exports.topicsOrder = function(_x) {
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
         */
        exports.topicLabel = function(_x) {
            if (!arguments.length) {
                return topicLabel;
            }
            topicLabel = _x;

            return this;
        };

        /**
         * Updates the position and content of the tooltip
         * @param  {Object} dataPoint       Datapoint to represent
         * @param  {Object} colorMapping    Color scheme of the topics
         * @param  {Number} position        X-scale position in pixels
         * @return {Module}                 Tooltip module to chain calls
         * @public
         */
        exports.update = function(dataPoint, colorMapping, xPosition, yPosition = null) {
            colorMap = colorMapping;
            updateTooltip(dataPoint, xPosition, yPosition);

            return this;
        };

        /**
         * Gets or Sets the valueLabel of the data
         * @param  {String} _x          Desired valueLabel
         * @return {String | module}   Current valueLabel or Chart module to chain calls
         * @public
         */
        exports.valueLabel = function(_x) {
            if (!arguments.length) {
                return valueLabel;
            }
            valueLabel = _x;

            return this;
        };

        return exports;
    };
});
