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
                top: 5,
                right: 5,
                bottom: 5,
                left: 5
            },
            width = 300,
            height = 100,

            lineHeight = 30,
            textHeight = 25,
            circleRadius = 5,

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

            container.append('g').classed('legend-group', true);
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
                // .attr({
                //     'dy': '1em',
                //     'x': 20,
                //     'y': textHeight
                // });
                .attr('data-item', function(d) { return d.id; })
                .attr('transform', function(d, i) {
                    var horizontalOffset = 2 * circleRadius + 10,
                        verticalOffset = i * lineHeight;

                    return 'translate(' + horizontalOffset + ',' + verticalOffset + ')';
                });

            entries
                .append('circle')
                .classed('legend-circle', true)
                .attr({
                    'cx': 20,
                    // 'cx': 23 - tooltipWidth / 4,
                    'cy': textHeight,
                    // 'cy': (ttTextY + circleYOffset),
                    'r': circleRadius
                })
                .style({
                    'fill': 'red',
                    'stroke-width': 1
                });

            entries
                .append('text')
                .classed('legend-entry-name', true)
                .text(function(d) { return d.name; });
                // .attr({
                //     text: function(d) { return d.name; }
                // });

            entries
                .append('text')
                .classed('legend-entry-value', true)
                .text(function(d) { return d['quantity_human']; });


                // tooltipBody
                //     .append('circle')
                //     .classed('tooltip-circle', true)
                //     .attr({
                //         'cx': 23 - tooltipWidth / 4,
                //         'cy': (ttTextY + circleYOffset),
                //         'r': 5
                //     })
                //     .style({
                //         'fill': colorMap[topic.name],
                //         'stroke-width': 1
                //     });

            // Update
            entries.transition()
                .ease('linear')
                .attr({
                    width: chartWidth
                });

            // Exit
            entries.exit()
                .transition().style({ opacity: 0 }).remove();


            // // Enter
            // bars.enter()
            //     .append('rect')
            //     .classed('bar', true)
            //     .attr({
            //         width: barW,
            //         x: chartWidth, // Initially drawing the bars at the end of Y axis
            //         y: function(d) { return yScale(d.frequency); },
            //         height: function(d) { return chartHeight - yScale(d.frequency); }
            //     })
            //     .on('mouseover', dispatch.customHover);

            // // Update
            // bars.transition()
            //     .ease(ease)
            //     .attr({
            //         width: barW,
            //         x: function(d) { return xScale(d.letter) + gapSize/2; },
            //         y: function(d) { return yScale(d.frequency); },
            //         height: function(d) { return chartHeight - yScale(d.frequency); }
            //     });

            // // Exit
            // bars.exit()
            //     .transition().style({ opacity: 0 }).remove();



        }

        return exports;

    };

});
