define(function(require){
    'use strict';

    var d3 = require('d3');

    /**
     * @typdef D3Selection
     * @type Array[]
     */

    /**
     * @fileOverview Reusable Donut Chart API class that renders a
     * simple and configurable donut chart.
     *
     * @tutorial donut
     * @exports charts/donut
     * @requires d3
     * @version 0.0.1
     */
    return function module() {

        var margin = {
                top: 60,
                right: 60,
                bottom: 60,
                left: 60
            },
            width = 300,
            height = 300,
            ease = 'cubic-in-out',
            arcTransitionDuration = 750,
            pieDrawingTransitionDuration = 1200,
            pieHoverTransitionDuration = 150,
            radiusHoverOffset = 20,
            data,
            chartWidth, chartHeight,
            externalRadius = 140,
            internalRadius = 45.5,
            legendWidth = externalRadius + internalRadius,
            sortComparator = null,
            layout,
            shape,
            slices,
            svg,

            // colors
            colorScale = d3.scale.category20c(),
            colorScheme = ['#00AF38', '#41C2C9', '#F6C664', '#F4693A', '#9A66D7'],

            // utils
            storeAngle = function(d) {
                this._current = d;
            },
            reduceOuterRadius = function(d) {
                d.outerRadius = externalRadius - radiusHoverOffset;
            },

            // extractors
            getQuantity = function(d) { return parseInt(d.quantity, 10); },
            getSliceFill = function(d) { return colorScale(d.data.name); };

        /**
         * This function creates the graph using the selection as container
         * @param  {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         */
        function exports(_selection) {
            /* @param {object} _data The data to attach and generate the chart */
            _selection.each(function(_data) {
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = _data;

                buildLayout();
                buildColorScale();
                buildShape();
                buildSVG(this);
                drawSlices();
                initTooltip();
            });
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
         * Builds containers for the chart, the legend and a wrapper for all of them
         * @private
         */
        function buildContainerGroups() {
            var container = svg.append('g')
                .classed('container-group', true)
                .attr({
                    transform: 'translate(' + (width / 2) + ',' + (height / 2) + ')'
                });

            container.append('g').classed('chart-group', true);
            container.append('g').classed('legend-group', true);
        }

        /**
         * Builds the pie layout that will produce data ready to draw
         * @private
         */
        function buildLayout() {
            layout = d3.layout.pie()
                .value(getQuantity)
                .sort(sortComparator);
        }

        /**
         * Builds the shape function
         * @private
         */
        function buildShape() {
            shape = d3.svg.arc()
                .innerRadius(internalRadius)
                .padRadius(externalRadius);
        }

        /**
         * Builds the SVG element that will contain the chart
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @private
         */
        function buildSVG(container) {
            svg = d3.select(container)
                .selectAll('svg')
                .data([data]);

            svg.enter().append('svg')
                .attr('class', 'britechart donut-chart');

            buildContainerGroups();

            svg.transition().ease(ease)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);
        }

        /**
         * Draws the values on the donut slice inside the text element
         * @param  {obj} obj Data object
         * @private
         */
        function drawLegend(obj) {
            svg.select('.legend-text')
                .text(function() {
                    return obj.data.percentage + '% ' + obj.data.name;
                })
                .attr('dy', '.35em')
                .attr('text-anchor', 'middle');

            svg.select('.legend-text').call(wrapText, legendWidth);
        }

        /**
         * Draws the slices of the donut
         * @private
         */
        function drawSlices() {
            if (!slices) {
                slices = svg.select('.chart-group')
                    .selectAll('g.arc')
                    .data(layout(data));

                slices.enter()
                    .append('g')
                    .each(storeAngle)
                    .each(reduceOuterRadius)
                    .classed('arc', true)
                    .on('mouseover', handleMouseOver)
                    .on('mouseout', handleMouseOut);

                slices
                    .append('path')
                    .attr('fill', getSliceFill)
                    .on('mouseover', tweenGrowthFactory(externalRadius, 0))
                    .on('mouseout', tweenGrowthFactory(externalRadius - radiusHoverOffset, pieHoverTransitionDuration))
                  .transition()
                    .ease(ease)
                    .duration(pieDrawingTransitionDuration)
                    .attrTween('d', tweenLoading);

            } else {
                slices = svg.select('.chart-group')
                    .selectAll('path')
                    .data(layout(data));

                slices
                    .attr('d', shape);

                // Redraws the angles of the data
                slices
                    .transition().duration(arcTransitionDuration)
                    .attrTween('d', tweenArc);
            }
        }

        /**
         * Cleans any value that could be on the legend text element
         * @private
         */
        function cleanLegend() {
            svg.select('.legend-text').text('');
        }

        function handleMouseOver(datum) {
            drawLegend(datum);
        }

        function handleMouseOut() {
            cleanLegend();
        }

        /**
         * Creates the text element that will hold the legend of the chart
         */
        function initTooltip() {
            svg.select('.legend-group').append('text')
                .attr('class', 'legend-text')
                .style('font-weight', 'normal')
                .style('font-size', internalRadius / 3 + 'px')
                .attr('x', -100);
        }

        /**
         * Stores current angles and interpolates with new angles
         * @param {obj} a New data for slice
         *
         * Check out {@link http://bl.ocks.org/mbostock/1346410| this example}
         * @private
         */
        function tweenArc(a) {
            var i = d3.interpolate(this._current, a);

            this._current = i(0);

            return function(t) {
                return shape(i(t));
            };
        }

        /**
         * Generates animations with tweens depending on the attributes given
         * @param  {number} outerRadius Final outer radius value
         * @param  {number} delay       Delay of animation
         * @return {function}           Function that when called will tween the element
         * @private
         */
        function tweenGrowthFactory(outerRadius, delay) {
            return function() {
                d3.select(this)
                    .transition()
                    .delay(delay)
                    .attrTween('d', function(d) {
                        var i = d3.interpolate(d.outerRadius, outerRadius);

                        return function(t) {
                            d.outerRadius = i(t);

                            return shape(d);
                        };
                    });
            };
        }

        /**
         * Animation for chart loading
         * @param  {obj} b Data point
         * @return {funct}   Tween function
         * Check out {@link http://bl.ocks.org/mbostock/4341574| this example}
         * @private
         */
        function tweenLoading(b) {
            var i;

            b.innerRadius = 0;
            i = d3.interpolate({ startAngle: 0, endAngle: 0}, b);

            return function(t) { return shape(i(t)); };
        }

        /**
         * Utility function that wraps a text into the given width
         * @param  {string} text         Text to write
         * @param  {number} legendWidth Width of the container
         * @private
         */
        function wrapText(text, legendWidth) {
            text.each(function() {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1,
                    y = text.attr('y'),
                    dy = parseFloat(text.attr('dy')),
                    tspan = text.text(null).append('tspan')
                        .attr('x', 0)
                        .attr('y', y)
                        .attr('dy', dy + 'em')
                        .style('font-weight', 'bold')
                        .style('font-size', externalRadius / 3.5 + 'px');

                tspan.text(words.pop());
                tspan = text.append('tspan')
                    .attr('x', 0)
                    .attr('y', y)
                    .attr('dy', ++lineNumber * lineHeight + dy + 'em');

                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(' '));
                    if (tspan.node().getComputedTextLength() > legendWidth - 50) {
                        line.pop();
                        tspan.text(line.join(' '));
                        line = [word];
                        tspan = text.append('tspan')
                            .attr('x', 0)
                            .attr('y', y)
                            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                            .text(word);
                    }
                }
            });
        }

        /**
         * Gets or Sets the colorScheme of the chart
         * @param  {array} _x Color scheme array to get/set
         * @return { colorScheme | module} Current colorScheme or Donut Chart module to chain calls
         * @public
         */
        exports.colorScheme = function(_x) {
            if (!arguments.length) {
                return colorScheme;
            }
            colorScheme = _x;
            return this;
        };

        /**
         * Gets or Sets the externalRadius of the chart
         * @param  {number} _x ExternalRadius number to get/set
         * @return { externalRadius | module} Current externalRadius or Donut Chart module to chain calls
         * @public
         */
        exports.externalRadius = function(_x) {
            if (!arguments.length) {
                return externalRadius;
            }
            externalRadius = _x;
            return this;
        };

        /**
         * Gets or Sets the height of the chart
         * @param  {number} _x Desired width for the graph
         * @return { height | module} Current height or Donut Chart module to chain calls
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
         * Gets or Sets the internalRadius of the chart
         * @param  {number} _x InternalRadius number to get/set
         * @return { internalRadius | module} Current internalRadius or Donut Chart module to chain calls
         * @public
         */
        exports.internalRadius = function(_x) {
            if (!arguments.length) {
                return internalRadius;
            }
            internalRadius = _x;
            return this;
        };

        /**
         * Gets or Sets the margin of the chart
         * @param  {object} _x Margin object to get/set
         * @return { margin | module} Current margin or Donut Chart module to chain calls
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
         * Gets or Sets the width of the chart
         * @param  {number} _x Desired width for the graph
         * @return { width | module} Current width or Donut Chart module to chain calls
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
