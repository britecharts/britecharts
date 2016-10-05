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
                top: 12,
                right: 12,
                bottom: 12,
                left: 12
            },
            width = 50,
            height = 50,

            // Optional Title
            title = '',

            // Data Format
            valueLabel = 'value',
            nameLabel = 'name',

            // Animations
            mouseChaseDuration = 200,
            ease = 'ease-in',

            // tooltip
            tooltipBackground,
            backgroundBorderRadius = 1,
            tooltipTextContainer,
            tooltipOffset = {
                y: 0,
                x: 20
            },

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
            tooltipValueFormat = d3.format(',1f'),

            chartWidth,
            chartHeight,
            svg;


        /**
         * This function creates the graph using the selection as container
         * @param {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         * @param {Array} _data The data to attach and generate the chart (usually an empty array)
         */
        function exports(_selection) {
            _selection.each(function(_data){
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
            }
            svg
                .transition()
                .ease(ease)
                .attr({
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

            tooltipBackground = tooltipTextContainer
              .append('rect')
                .classed('tooltip-background', true)
                .attr({
                    'width': width,
                    'height': height,
                    'rx': backgroundBorderRadius,
                    'ry': backgroundBorderRadius,
                    'y': - margin.top,
                    'x': - margin.left
                })
                .style({
                    'fill': bodyFillColor,
                    'stroke': borderStrokeColor,
                    'stroke-width': 1,
                    'pointer-events': 'none',
                    'opacity': 0.9
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
         * Calculates the desired position for the tooltip
         * @param  {Number} mouseX             Current horizontal mouse position
         * @param  {Number} mouseY             Current vertical mouse position
         * @param  {Number} parentChartWidth   Parent's chart width
         * @param  {Number} parentChartHeight  Parent's chart height
         * @return {Number[]}                  X and Y position
         * @private
         */
        function getTooltipPosition([mouseX, mouseY], [parentChartWidth, parentChartHeight]) {
            let tooltipX, tooltipY;

            if (hasEnoughHorizontalRoom(parentChartWidth, mouseX)) {
                tooltipX = mouseX + tooltipOffset.x;
            } else {
                tooltipX = mouseX - chartWidth - tooltipOffset.x - margin.right;
            }

            if (hasEnoughVerticalRoom(parentChartHeight, mouseY)) {
                tooltipY = mouseY + tooltipOffset.y;
            } else {
                tooltipY = mouseY - chartHeight - tooltipOffset.y - margin.bottom;
            }

            return [tooltipX, tooltipY];
        }

        /**
         * Checks if the mouse is over the bounds of the parent chart
         * @param  {Number}  chartWidth Parent's chart
         * @param  {Number}  positionX  Mouse position
         * @return {Boolean}            If the mouse position allows space for the tooltip
         */
        function hasEnoughHorizontalRoom(parentChartWidth, positionX) {
            return (parentChartWidth - margin.left - margin.right - chartWidth) - positionX > 0;
        }

        /**
         * Checks if the mouse is over the bounds of the parent chart
         * @param  {Number}  chartWidth Parent's chart
         * @param  {Number}  positionX  Mouse position
         * @return {Boolean}            If the mouse position allows space for the tooltip
         */
        function hasEnoughVerticalRoom(parentChartHeight, positionY) {
            return (parentChartHeight - margin.top - margin.bottom - chartHeight) - positionY > 0;
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
                valueLineHeight = valueTextSize * valueTextLineHeight,
                defaultDy = '1em',
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
                        'dy': defaultDy,
                        'y': 0
                    })
                    .style('fill', titleFillColor)
                    .style('font-size', textSize)
                    .text(title);

                temporalHeight = lineHeight + temporalHeight;
            }

            if (name) {
                tooltipName = tooltipTextContainer
                  .append('text')
                    .classed('mini-tooltip-name', true)
                    .attr({
                        'dy': defaultDy,
                        'y': temporalHeight || 0
                    })
                    .style('fill', nameTextFillColor)
                    .style('font-size', textSize)
                    .text(name);

                temporalHeight = lineHeight + temporalHeight;
            }

            if (value) {
                tooltipValue = tooltipTextContainer
                  .append('text')
                    .classed('mini-tooltip-value', true)
                    .attr({
                        'dy': defaultDy,
                        'y': temporalHeight || 0
                    })
                    .style('fill', valueTextFillColor)
                    .style('font-size', valueTextSize)
                    .style('font-weight', valueTextWeight)
                    .text(tooltipValueFormat(value));

                temporalHeight = valueLineHeight + temporalHeight;
            }

            chartWidth = getMaxLengthLine(tooltipName, tooltipTitle, tooltipValue);
            chartHeight = temporalHeight;
        }

        /**
         * Updates size and position of tooltip depending on the side of the chart we are in
         * @param  {Object} dataPoint DataPoint of the tooltip
         * @return void
         */
        function updatePositionAndSize(mousePosition, parentChartSize) {
            let [tooltipX, tooltipY] = getTooltipPosition(mousePosition, parentChartSize);
            let newSize = {
                width: chartWidth + margin.left + margin.right,
                height: chartHeight + margin.top + margin.bottom
            };

            svg.transition()
                .duration(mouseChaseDuration)
                .ease(ease)
                .attr(newSize)
                .attr('transform', `translate(${tooltipX},${tooltipY})`);

            tooltipBackground
                .transition()
                .ease(ease)
                .attr(newSize);
        }

        /**
         * Updates tooltip content, size and position
         *
         * @param  {Object} dataPoint Current datapoint to show info about
         * @return void
         */
        function updateTooltip(dataPoint, position, chartSize) {
            updateContent(dataPoint);
            updatePositionAndSize(position, chartSize);
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
         * @param  {Object} dataPoint       Datapoint of the hovered element
         * @param  {Array} mousePosition    Mouse position relative to the parent chart [x, y]
         * @param  {Array} chartSize        Parent chart size [x, y]
         * @return {module}                 Current component
         */
        exports.update = function(dataPoint, mousePosition, chartSize) {
            updateTooltip(dataPoint, mousePosition, chartSize);

            return this;
        };

        return exports;
    };
});
