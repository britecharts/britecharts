define(function(require){
    'use strict';

    var d3 = require('d3');

    /**
     * @typdef D3Selection
     * @type Array[]
     */

    /**
     * @fileOverview Legend Component reusable API class that renders a
     * simple and configurable legend element.
     *
     * @tutorial legend
     * @exports charts/legend
     * @requires d3
     * @version 0.0.1
     */
    return function module() {

        var margin = {
                top: 20,
                right: 10,
                bottom: 10,
                left: 10
            },
            width = 320,
            height = 180,

            lineMargin = 15,

            circleRadius = 10,
            circleYOffset = -5,

            valueReservedSpace = 50,

            // colors
            colorScale = d3.scale.category20c(),
            colorScheme = ['#00AF38', '#41C2C9', '#F6C664', '#F4693A', '#9A66D7'],

            entries,
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

                buildColorScale();
                buildSVG(this);
                drawEntries();
            });
        }

        /**
         * Builds containers for the legend
         * Also applies the Margin convention
         * @private
         */
        function buildContainerGroups() {
            var container = svg.append('g')
                .classed('legend-container-group', true)
                .attr({
                    transform: 'translate(' + margin.left + ',' + margin.top + ')'
                });

            container
                .append('g')
                .classed('legend-group', true);
        }

        /**
         * Builds color scale for chart, if any colorScheme was defined
         * @private
         */
        function buildColorScale() {
            if (colorScheme) {
                colorScale = d3.scale.ordinal().range(colorScheme);
            }
        }

        /**
         * Builds the SVG element that will contain the chart
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @private
         */
        function buildSVG(container) {
            if (!svg) {
                svg = d3.select(container)
                    .append('svg')
                    .classed('britechart britechart-legend', true);

                buildContainerGroups();
            }
            svg.transition().attr({
                width: width + margin.left + margin.right,
                height: height + margin.top + margin.bottom
            });
        }

        /**
         * Draws the entries of the legend
         * @private
         */
        function drawEntries() {
            entries = svg.select('.legend-group')
                .selectAll('g.legend-line')
                .data(data);

            // Enter
            entries.enter()
                .append('g')
                .classed('legend-line', true)
                .attr('data-item', function(d) { return d.id; })
                .attr('transform', function(d, i) {
                    var horizontalOffset = 2 * circleRadius + 10,
                        lineHeightBis = chartHeight/data.length,
                        verticalOffset = i * lineHeightBis;

                    return 'translate(' + horizontalOffset + ',' + verticalOffset + ')';
                });

            entries
                .append('circle')
                .classed('legend-circle', true)
                .attr({
                    'cx': 0,
                    'cy': circleYOffset,
                    'r': circleRadius
                })
                .style({
                    'fill': function(d) {
                        return colorScale(d.quantity);
                    },
                    'stroke-width': 1
                });

            entries
                .append('text')
                .classed('legend-entry-name', true)
                .text(function(d) { return d.name; })
                .attr({
                    x: (2 * circleRadius) + lineMargin
                });

            entries
                .append('text')
                .classed('legend-entry-value', true)
                .text(function(d) { return d['quantity']; })
                .attr({
                    x: chartWidth - valueReservedSpace
                });

            // Update
            entries.transition()
                .ease('linear')
                .attr({
                    width: chartWidth
                });

            // // Update
            // bars.transition()
            //     .ease(ease)
            //     .attr({
            //         width: barW,
            //         x: function(d) { return xScale(d.letter) + gapSize/2; },
            //         y: function(d) { return yScale(d.frequency); },
            //         height: function(d) { return chartHeight - yScale(d.frequency); }
            //     });

            // Exit
            entries.exit()
                .transition().style({ opacity: 0 }).remove();
        }

        /**
         * Gets or Sets the height of the legend chart
         * @param  {number} _x Desired width for the chart
         * @return { height | module} Current height or Legend module to chain calls
         * @public
         */
        exports.height = function(_x) {
            if (!arguments.length) {
                return height;
            }
            height = _x;
            return this;
        };

        /**
         * Gets or Sets the margin of the legend chart
         * @param  {object} _x Margin object to get/set
         * @return { margin | module} Current margin or Legend module to chain calls
         * @public
         */
        exports.margin = function(_x) {
            if (!arguments.length) {
                return margin;
            }
            margin = _x;
            return this;
        };

        /**
         * Gets or Sets the width of the legend chart
         * @param  {number} _x Desired width for the graph
         * @return { width | module} Current width or Legend module to chain calls
         * @public
         */
        exports.width = function(_x) {
            if (!arguments.length) {
                return width;
            }
            width = _x;
            return this;
        };

        return exports;

    };

});
