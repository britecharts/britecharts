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
     * @tutorial bar
     * @requires d3
     *
     * @example
     * var barChart = line(),
     *     miniTooltip = miniTooltip();
     *
     * barChart
     *     .width(500)
     *     .height(300)
     *     .on('customMouseHover', miniTooltip.show)
     *     .on('customMouseMove', miniTooltip.update)
     *     .on('customMouseOut', miniTooltip.hide);
     *
     * d3.select('.css-selector')
     *     .datum(dataset)
     *     .call(barChart);
     *
     * d3.select('.metadata-group .mini-tooltip-container')
     *     .datum([])
     *     .call(miniTooltip);
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
            height = 50,

            valueLabel = 'value',
            nameLabel = 'name',

            // tooltip
            tooltip,
            tooltipTextContainer,
            tooltipOffset = {
                y: 0,
                x: 20
            },

            title = 'Title',
            textSize = 16,
            textLineHeight = 1.35,

            valueTextSize = 18,

            // Styles
            bodyFillColor = '#FFFFFF',
            borderStrokeColor = '#D2D6DF',
            titleFillColor = '#6D717A',
            textFillColor = '#282C35',

            // formats
            tooltipValueFormat = d3.format(',1f'),

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
                    'stroke-width': 1,
                    'pointer-events': 'none'
                });
        }

        /**
         * Figures out the max length of the tooltip lines
         * @param  {D3Selection[]} texts    List of svg elements of each line
         * @return {Number}                 Max size of the lines
         */
        function getMaxLengthLine(...texts) {
            let textSizes = texts.filter(x => !!x)
                .map(x => x.node().getBBox().width);

            return d3.max(textSizes);
        }

        /**
         * Checks if the mouse is over the bounds of the parent chart
         * @param  {Number}  chartWidth Parent's chart
         * @param  {Number}  positionX  Mouse position
         * @return {Boolean}            If the mouse position allows space for the tooltip
         */
        function hasEnoughRoom(chartWidth, positionX) {
            return (chartWidth - margin.left - margin.right - width) - positionX < 0;
        }

        /**
         * Hides the tooltip
         * @return {void}
         */
        function hideTooltip() {
            svg.style('display', 'none');
        }

        /**
         * Shows the tooltip updating it's content
         * @param  {Object} dataPoint Data point from the chart
         * @return {void}
         */
        function showTooltip(dataPoint) {
            updateContent(dataPoint);
            svg.style('display', 'block');
        }

        /**
         * Draws the data entries inside the tooltip for a given topic
         * @param  {Object} topic Topic to extract data from
         * @return void
         */
        function updateContent(dataPoint = {}){
            let value = dataPoint[valueLabel] || '',
                name = dataPoint[nameLabel] || '',
                lineHeight = textSize * textLineHeight,
                valueLineHeight = valueTextSize * textLineHeight,
                temporalDY = '1em',
                temporalHeight = 0,
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
                        'y': 0
                    })
                    .style('fill', titleFillColor)
                    .style('font-size', textSize)
                    .text(title);

                temporalHeight += lineHeight;
            }

            if (name) {
                tooltipName = tooltipTextContainer
                  .append('text')
                    .classed('mini-tooltip-name', true)
                    .attr({
                        'dy': temporalDY,
                        'y': temporalHeight || 0
                    })
                    .style('fill', textFillColor)
                    .style('font-size', textSize)
                    .text(name);

                temporalHeight += lineHeight;
            }

            if (value) {
                tooltipValue = tooltipTextContainer
                  .append('text')
                    .classed('mini-tooltip-value', true)
                    .attr({
                        'dy': temporalDY,
                        'y': temporalHeight || 0
                    })
                    .style('fill', textFillColor)
                    .style('font-size', valueTextSize)
                    .text(tooltipValueFormat(value));

                temporalHeight += valueLineHeight;
            }

            height = temporalHeight;
            width = getMaxLengthLine(tooltipName, tooltipTitle, tooltipValue);
        }

        /**
         * Updates size and position of tooltip depending on the side of the chart we are in
         * @param  {Object} dataPoint DataPoint of the tooltip
         * @return void
         */
        function updatePositionAndSize([x, y], chartWidth) {
            if (hasEnoughRoom(chartWidth, x)) {
                x = x - width - tooltipOffset.x;
            } else {
                x = x + tooltipOffset.x;
            }

            svg.transition()
                .duration(200)
                .ease('ease-in')
                .attr({
                    width: width + margin.left + margin.right,
                    height: height + margin.top + margin.bottom
                })
                .attr('transform', `translate(${x},${y})`);

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
        function updateTooltip(dataPoint, position, chartWidth) {
            updateContent(dataPoint);
            updatePositionAndSize(position, chartWidth);
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
        exports.update = function(dataPoint, position, chartWidth) {
            updateTooltip(dataPoint, position, chartWidth);

            return this;
        };

        return exports;
    };

});
