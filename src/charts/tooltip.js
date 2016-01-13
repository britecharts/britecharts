define(function(require){
    'use strict';

    var d3 = require('d3');

    /**
     * @typdef D3Selection
     * @type Array[]
     */

    /**
     * @fileOverview Tooltip Component reusable API class that renders a
     * simple and configurable tooltip element.
     *
     * @tutorial tooltip
     * @exports charts/tooltip
     * @requires d3
     * @version 0.0.1
     */
    return function module() {

        var margin = {
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
            tooltipBackground,
            tooltipDivider,
            tooltipBody,
            tooltipTitle,
            tooltipWidth = 250,
            tooltipHeight = 48,
            ttTextX = 0,
            ttTextY = 37,
            textSize,

            circleYOffset = 10,

            colorMap,

            tooltipDateFormat = d3.time.format('%B %d, %Y'),

            chartWidth, chartHeight,
            data,
            svg;


        /**
         * This function creates the graph using the selection as container
         * @param  {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         */
        function exports(_selection) {
            /* @param {object} _data The data to attach and generate the chart */
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
                    transform: 'translate(' + margin.left + ',' + margin.top + ')'
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

            tooltipBackground = tooltipTextContainer
                .append('rect')
                .classed('tooltip-background', true)
                .attr({
                    'x': -tooltipWidth / 4 + 10,
                    'y': 0,
                    'width': tooltipWidth,
                    'height': tooltipHeight-1,
                    'rx': 3,
                    'ry': 3
                });

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
                    'fill': '#FFFFFF',
                    'stroke': '#D9D9D9',
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
                    'fill': '#666666'
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
                    'stroke': '#D9D9D9'
                });

            tooltipBody = tooltipTextContainer
                .append('g')
                .classed('tooltip-body', true)
                .style({
                    'transform': 'translateY(8px)',
                    'fill': '#404040'
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

        /**
         * Draws the data entries inside the tooltip for a given topic
         * @param  {obj} topic Topic to extract data from
         * @return void
         */
        function updateContent(topic){
            var tooltipRight,
                tooltipLeftText,
                tooltipRightText,
                elementText;

            tooltipLeftText = topic.topicName;

            if (topic.missingValue) {
                tooltipRightText = '-';
            } else {
                tooltipRightText = topic.value;
            }

            elementText = tooltipBody
                .append('text')
                .classed('tooltip-left-text', true)
                .attr({
                    'dy': '1em',
                    'x': ttTextX - 20,
                    'y': ttTextY
                })
                .style('fill', 'black')
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
                .style('fill', 'black')
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
                    'fill': colorMap[topic.name],
                    'stroke-width': 1
                });

            ttTextY += textSize.height + 7;
        }

        /**
         * Updates size and position of tooltip depending on the side of the chart we are in
         * @param  {object} dataPoint DataPoint of the tooltip
         * @param  {number} xPosition DataPoint's x position in the chart
         * @return void
         */
        function updatePositionAndSize(dataPoint, xPosition){
            tooltip
                .attr({
                    'width': tooltipWidth,
                    'height': tooltipHeight + 10
                });

            tooltipBackground
                .attr({
                    'width': tooltipWidth - 3,
                    'height': tooltipHeight + 12
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
         * @param  {obj} dataPoint Point of data to use as source
         * @return void
         */
        function updateTitle(dataPoint) {
            var tooltipTitleText = title + ' - ' + tooltipDateFormat(new Date(dataPoint.date));

            tooltipTitle.text(tooltipTitleText);
        }

        /**
         * Updates tooltip title, content, size and position
         * @param  {object} dataPoint Current datapoint to show info about
         * @return void
         */
        function updateTooltip(dataPoint, position) {
            cleanContent();
            resetSizeAndPositionPointers();
            updateTitle(dataPoint);
            dataPoint.topics.forEach(updateContent);
            updatePositionAndSize(dataPoint, position);
        }

        /**
         * Wraps a text given the text, width, x position and textFormatter function
         * @param  {D3Selection} text  Selection with the text to wrap inside
         * @param  {number} width Desired max width for that line
         * @param  {number} xpos  Initial x position of the text
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
                        line = [word];
                        tspan = text.append('tspan')
                            .attr('x', xpos)
                            .attr('y', y)
                            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                            .text(word);
                    }
                }
            });
        }

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
         * Shows the tooltip
         * @return {module} Tooltip module to chain calls
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
         * @param  {obj} dataPoint    Datapoint to represent
         * @param  {obj} colorMapping Color scheme of the topics
         * @param  {number} position     X-scale position in pixels
         * @return {module} Tooltip module to chain calls
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
