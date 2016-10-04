define(function(require){
    'use strict';

    const d3 = require('d3');

    /**
     * Mini Tooltip Component reusable API class that renders a
     * simple and configurable tooltip element for Britechart's
     * bar and step chart.
     *
     * @module Mini-tooltip
     * @version 0.0.1
     * @tutorial mini-tooltip
     * @requires d3
     *
     * @example
     * var barChart = line(),
     *     miniTooltip = miniTooltip();
     *
     * barChart
     *     .width(500)
     *     .on('customHover', function() {
     *          miniTooltip.show();
     *     })
     *     .on('customMouseOut', function() {
     *          miniTooltip.hide();
     *     });
     *
     * d3.select('.css-selector')
     *     .datum(dataset)
     *     .call(barChart);
     *
     * d3.select('.metadata-group .mini-tooltip-container')
     *     .datum([])
     *     .call(tooltip);
     *
     */
    return function module() {

        let margin = {
                top: 7,
                right: 7,
                bottom: 7,
                left: 7
            },
            width = 50,
            height = 45,

            bodyNode = d3.select('body').node(),

            // tooltip
            tooltip,
            tooltipOffset = {
                y: 0,
                x: 0
            },
            tooltipMaxTextLength = 100,
            tooltipTextContainer,
            tooltipDivider,
            tooltipBody,

            title = 'Long Example title',

            ttTextY = 0,
            textSize = 16,
            textLineHeight = 1.35,

            entryLineLimit = 3,

            circleYOffset = 8,

            valueLabel = 'frequency',
            nameLabel = 'letter',

            colorMap,

            bodyFillColor = '#FFFFFF',
            borderStrokeColor = '#D2D6DF',

            titleFillColor = '#6D717A',
            textFillColor = '#282C35',

            // formats
            tooltipDateFormat = d3.time.format('%b %d, %Y'),
            tooltipValueFormat = d3.format(',2f'),

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
            let container = svg.append('g')
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
                    .classed('britechart britechart-mini-tooltip', true);

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
                    'width': width + margin.left + margin.right,
                    'height': height + margin.top + margin.bottom,
                    'rx': 3,
                    'ry': 3,
                    'y': - margin.top,
                    'x': - margin.left
                })
                .style({
                    'fill': bodyFillColor,
                    'stroke': borderStrokeColor,
                    'stroke-width': 1
                });
        }

        /**
         * Draws the data entries inside the tooltip for a given topic
         * @param  {Object} topic Topic to extract data from
         * @return void
         */
        function updateContent(dataPoint = {}){
            let value = dataPoint[valueLabel] || '',
                name = dataPoint[nameLabel] || '',
                numLines = 0,
                lineHeight = textSize * textLineHeight,
                temporalDY = '1em',
                tooltipValue,
                tooltipName,
                tooltipTitle;

            tooltipTextContainer.selectAll('text')
                .remove();

            if (title) {
                tooltipTitle = tooltipTextContainer
                  .append('text')
                    .classed('mini-tooltip-title', true)
                    .attr({
                        'dy': temporalDY,
                        'y': ttTextY
                    })
                    .style('fill', titleFillColor)
                    .style('font-size', textSize)
                    .text(title);

                numLines++;
            }

            if (name) {
                tooltipName = tooltipTextContainer
                  .append('text')
                    .classed('mini-tooltip-name', true)
                    .attr({
                        'dy': temporalDY,
                        'y': numLines ? (numLines * lineHeight) : 0
                    })
                    .style('fill', textFillColor)
                    .style('font-size', textSize)
                    .text(name);

                numLines++;
            }

            if (value) {
                tooltipValue = tooltipTextContainer
                  .append('text')
                    .classed('mini-tooltip-value', true)
                    .attr({
                        'dy': temporalDY,
                        'y': numLines ? (numLines * lineHeight) : 0
                    })
                    .style('fill', textFillColor)
                    .style('font-size', textSize)
                    .text(value);

                numLines++;
            }

            height = numLines * lineHeight;
            width = getMaxLengthLine(tooltipName, tooltipTitle, tooltipValue);
            console.log('width', width)
            updatePositionAndSize(getMousePosition())
        }

        function getMaxLengthLine(...texts) {
            let textSizes = texts.filter(x => !!x)
                .map(x => x.node().getBBox().width);

            return d3.max(textSizes);
        }

        function getMousePosition() {
            let event = d3.event || {pageX: 0, pageY:0};

            return {
                y: event.pageY,
                x: event.pageX
            };
        }

        /**
         * Updates size and position of tooltip depending on the side of the chart we are in
         * @param  {Object} dataPoint DataPoint of the tooltip
         * @return void
         */
        function updatePositionAndSize({y, x}){
            let newY = y/2 - height,
                newX = x - width;

            svg.transition()
                .attr({
                    width: width + margin.left + margin.right,
                    height: height + margin.top + margin.bottom
                })
                .style('position', 'absolute')
                .attr('transform', `translate(${newX},${newY})`);

            tooltip
                .attr({
                    width: width + margin.left + margin.right,
                    height: height + margin.top + margin.bottom
                });
        }

        /**
         * Updates tooltip content, size and position
         *
         * @param  {Object} dataPoint Current datapoint to show info about
         * @return void
         */
        function updateTooltip(dataPoint) {
            updateContent(dataPoint);
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

        function showTooltip(dataPoint) {
            updateTooltip(dataPoint);
            svg.style('display', 'block');
        }

        function hideTooltip() {
            svg.style('display', 'none');
        }

        /**
         * Hides the tooltip
         * @return {Module} Tooltip module to chain calls
         * @public
         */
        exports.hide = function() {
            hideTooltip();

            return this;
        };

        /**
         * Shows the tooltip
         * @return {Module} Tooltip module to chain calls
         * @public
         */
        exports.show = function() {
            showTooltip();

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
         * @return {Module} Tooltip module to chain calls
         * @public
         */
        exports.update = function(dataPoint) {
            updateTooltip(dataPoint);

            return this;
        };

        return exports;
    };

});
