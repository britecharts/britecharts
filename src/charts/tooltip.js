define(function(require){
    'use strict';

    const d3 = require('d3');


    /**
     * Tooltip Component reusable API class that renders a
     * simple and configurable tooltip element for Britechart's
     * line chart or stacked area chart.
     *
     * @module Tooltip
     * @version 0.0.1
     * @tutorial tooltip
     * @requires d3
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
     * d3.select('.css-selector')
     *     .datum(dataset)
     *     .call(lineChart);
     *
     * d3.select('.metadata-group .hover-marker')
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
            ttTextX = 0,
            ttTextY = 37,
            textSize,
            entryLineLimit = 3,

            circleYOffset = 8,

            colorMap,
            bodyFillColor = '#FFFFFF',
            borderStrokeColor = '#D2D6DF',
            titleFillColor = '#6D717A',
            textFillColor = '#282C35',
            tooltipTextColor = '#000000',

            // formats
            tooltipDateFormat = d3.time.format('%b %d, %Y'),
            valueRangeLimits = {
                small: 10,
                medium: 100
            },
            valueFormats = {
                small: d3.format('.3f'),
                medium: d3.format('.2f'),
                large: d3.format('.2s')
            },

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
                .attr({
                    transform: `translate( ${margin.left}, ${margin.top})`
                });

            container.append('g').classed('tooltip-group', true);
        }

        /**
         * Builds the SVG element that will contain the chart
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @private
         */
        function buildSVG(container) {
            if (!svg) {
                svg = d3.select(container)
                    .append('g')
                    .classed('britechart britechart-tooltip', true);

                buildContainerGroups();
                drawTooltip();
            }
            svg.transition().attr({
                width: width + margin.left + margin.right,
                height: height + margin.top + margin.bottom
            });
            // Hidden by default
            exports.hide();
        }

        /**
         * Resets the tooltipBody content
         * @return void
         */
        function cleanContent(){
            tooltipBody.selectAll('text').remove();
            tooltipBody.selectAll('circle').remove();
        }

        /**
         * Draws the different elements of the Tooltip box
         * @return void
         */
        function drawTooltip(){
            tooltipTextContainer = svg.selectAll('.tooltip-group')
                .append('g')
                .classed('tooltip-text', true);

            tooltip = tooltipTextContainer
                .append('rect')
                .classed('tooltip-text-container', true)
                .attr({
                    'x': -tooltipWidth / 4 + 8,
                    'y': 0,
                    'width': tooltipWidth,
                    'height': tooltipHeight,
                    'rx': 3,
                    'ry': 3
                })
                .style({
                    'fill': bodyFillColor,
                    'stroke': borderStrokeColor,
                    'stroke-width': 1
                });

            tooltipTitle = tooltipTextContainer
                .append('text')
                .classed('tooltip-title', true)
                .attr({
                    'x': -tooltipWidth / 4 + 17,
                    'dy': '.35em',
                    'y': 16
                })
                .style({
                    'fill': titleFillColor
                });

            tooltipDivider = tooltipTextContainer
                .append('line')
                .classed('tooltip-divider', true)
                .attr({
                    'x1': -tooltipWidth / 4 + 15,
                    'y1': 31,
                    'x2': 265,
                    'y2': 31
                })
                .style({
                    'stroke': borderStrokeColor
                });

            tooltipBody = tooltipTextContainer
                .append('g')
                .classed('tooltip-body', true)
                .style({
                    'transform': 'translateY(8px)',
                    'fill': textFillColor
                });
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

        function getValueText(topic) {
            let value = topic.value ? topic.value : topic.views;
            let valueText;

            if (topic.missingValue) {
                valueText = '-';
            } else {
                valueText = getFormattedValue(value);
            }

            return valueText;
        }

        /**
         * Formats the value depending on the range of the number
         * @param  {Number} value Value to format
         * @return {Number}       Formatted value
         */
        function getFormattedValue(value) {
            let size = 'large';

            if (!value) {
                return 0;
            }

            if (value < valueRangeLimits.small) {
                size = 'small';
            } if (value < valueRangeLimits.medium) {
                size = 'medium';
            }

            return valueFormats[size](value);
        }

        /**
         * Draws the data entries inside the tooltip for a given topic
         * @param  {Object} topic Topic to extract data from
         * @return void
         */
        function updateContent(topic){
            let name = topic.name,
                tooltipRight,
                tooltipLeftText,
                tooltipRightText,
                elementText;

            tooltipLeftText = topic.topicName || name;
            tooltipRightText = getValueText(topic);

            elementText = tooltipBody
                .append('text')
                .classed('tooltip-left-text', true)
                .attr({
                    'dy': '1em',
                    'x': ttTextX - 20,
                    'y': ttTextY
                })
                .style('fill', tooltipTextColor)
                .text(tooltipLeftText)
                .call(textWrap, tooltipMaxTopicLength, -25);

            tooltipRight = tooltipBody
                .append('text')
                .classed('tooltip-right-text', true)
                .attr({
                    'dy': '1em',
                    'x': ttTextX + 8,
                    'y': ttTextY
                })
                .style('fill', tooltipTextColor)
                .text(tooltipRightText);

            textSize = elementText.node().getBBox();
            tooltipHeight += textSize.height + 5;

            // Not sure if necessary
            tooltipRight.attr({
                'x': tooltipWidth - tooltipRight.node().getBBox().width - 10 - tooltipWidth / 4
            });

            tooltipBody
                .append('circle')
                .classed('tooltip-circle', true)
                .attr({
                    'cx': 23 - tooltipWidth / 4,
                    'cy': (ttTextY + circleYOffset),
                    'r': 5
                })
                .style({
                    'fill': colorMap[name],
                    'stroke-width': 1
                });

            ttTextY += textSize.height + 7;
        }

        /**
         * Updates size and position of tooltip depending on the side of the chart we are in
         * @param  {Object} dataPoint DataPoint of the tooltip
         * @param  {Number} xPosition DataPoint's x position in the chart
         * @return void
         */
        function updatePositionAndSize(dataPoint, xPosition){
            tooltip
                .attr({
                    'width': tooltipWidth,
                    'height': tooltipHeight + 10
                });

            // show tooltip to the right
            if ((xPosition - tooltipWidth) < 0) {
                // Tooltip on the right
                tooltipTextContainer
                    .attr('transform', 'translate(' + (tooltipWidth - 185) + ',' + tooltipOffset.y + ')');
            } else {
                // Tooltip on the left
                tooltipTextContainer
                    .attr('transform', 'translate(' + (-205) + ',' + tooltipOffset.y + ')');
            }

            tooltipDivider
                .attr({
                    'x2': tooltipWidth - 60
                });
        }

        /**
         * Updates value of tooltipTitle with the data meaning and the date
         * @param  {Object} dataPoint Point of data to use as source
         * @return void
         */
        function updateTitle(dataPoint) {
            var date = dataPoint.date ? new Date(dataPoint.date) : new Date(dataPoint.key),
                tooltipTitleText = title + ' - ' + tooltipDateFormat(date);

            tooltipTitle.text(tooltipTitleText);
        }

        /**
         * Updates tooltip title, content, size and position
         *
         * @param  {lineChartPointByDate} dataPoint  Current datapoint to show info about
         * @param  {Number} xPosition           Position of the mouse on the X axis
         * @return void
         */
        function updateTooltip(dataPoint, xPosition) {
            var topics = dataPoint.topics ? dataPoint.topics : dataPoint.values;

            cleanContent();
            resetSizeAndPositionPointers();
            updateTitle(dataPoint);
            topics.forEach(updateContent);
            updatePositionAndSize(dataPoint, xPosition);
        }

        /**
         * Wraps a text given the text, width, x position and textFormatter function
         * @param  {D3Selection} text  Selection with the text to wrap inside
         * @param  {Number} width Desired max width for that line
         * @param  {Number} xpos  Initial x position of the text
         *
         * REF: http://bl.ocks.org/mbostock/7555321
         * More discussions on https://github.com/mbostock/d3/issues/1642
         */
        function textWrap(text, width, xpos) {
            xpos = xpos || 0;

            text.each(function() {
                var words,
                    word,
                    line,
                    lineNumber,
                    lineHeight,
                    y,
                    dy,
                    tspan;

                text = d3.select(this);

                words = text.text().split(/\s+/).reverse();
                line = [];
                lineNumber = 0;
                lineHeight = 1.2;
                y = text.attr('y');
                dy = parseFloat(text.attr('dy'));
                tspan = text
                    .text(null)
                    .append('tspan')
                    .attr({
                        'x': xpos,
                        'y': y,
                        'dy': dy + 'em'
                    });

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
         * Hides the tooltip
         * @return {Module} Tooltip module to chain calls
         * @public
         */
        exports.hide = function() {
            svg.style('display', 'none');

            return this;
        };

        /**
         * Shows the tooltip
         * @return {Module} Tooltip module to chain calls
         * @public
         */
        exports.show = function() {
            svg.style('display', 'block');

            return this;
        };

        /**
         * Gets or Sets the title of the tooltip
         * @param  {string} _x Desired title
         * @return { string | module} Current title or module to chain calls
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
         * Updates the position and content of the tooltip
         * @param  {Object} dataPoint    Datapoint to represent
         * @param  {Object} colorMapping Color scheme of the topics
         * @param  {Number} position     X-scale position in pixels
         * @return {Module} Tooltip module to chain calls
         * @public
         */
        exports.update = function(dataPoint, colorMapping, position) {
            colorMap = colorMapping;
            updateTooltip(dataPoint, position);

            return this;
        };

        return exports;

    };

});
