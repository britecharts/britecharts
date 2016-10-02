define(function(require){
    'use strict';

    const d3 = require('d3');

    const exportChart = require('./helpers/exportChart');
    const textHelper = require('./helpers/text');

    /**
     * @typedef D3Selection
     * @type Array[]
     */

    /**
     * Reusable Donut Chart API class that renders a
     * simple and configurable donut chart.
     *
     * @module Donut
     * @version 0.0.1
     * @tutorial donut
     * @requires d3
     *
     * @example
     * var donutChart = donut();
     *
     * donutChart
     *     .externalRadius(500)
     *     .internalRadius(200);
     *
     * d3.select('.css-selector')
     *     .datum(dataset)
     *     .call(donutChart);
     *
     */
    return function module() {

        let margin = {
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
            radiusHoverOffset = 15,
            paddingAngle = 0.015,
            data,
            chartWidth, chartHeight,
            externalRadius = 140,
            internalRadius = 45.5,
            legendWidth = externalRadius + internalRadius,
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
            reduceOuterRadius = d => {
                d.outerRadius = externalRadius - radiusHoverOffset;
            },
            sortComparator = (a, b) => b.quantity - a.quantity,

            // extractors
            getQuantity = ({quantity}) => parseInt(quantity, 10),
            getSliceFill = ({data}) => colorScale(data.name),

            // events
            dispatch = d3.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');

        /**
         * This function creates the graph using the selection as container
         *
         * @param {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         * @param {Object} _data The data to attach and generate the chart
         */
        function exports(_selection) {
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
            let container = svg.append('g')
                .classed('container-group', true)
                .attr({
                    transform: `translate(${width / 2}, ${height / 2})`
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
                .padAngle(paddingAngle)
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
         *
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
         *
         * @param  {Object} obj Data object
         * @private
         */
        function drawLegend(obj) {
            if (obj.data) {
                svg.select('.donut-text')
                    .text(() => `${obj.data.percentage}% ${ obj.data.name}`)
                    .attr('dy', '.2em')
                    .attr('text-anchor', 'middle');

                svg.select('.donut-text').call(wrapText, legendWidth);
            }
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
            svg.select('.donut-text').text('');
        }

        function handleMouseOver(datum) {
            drawLegend(datum);

            dispatch.customMouseOver(datum);
        }

        function handleMouseOut() {
            cleanLegend();

            dispatch.customMouseOut();
        }

        /**
         * Creates the text element that will hold the legend of the chart
         */
        function initTooltip() {
            svg.select('.legend-group')
                .append('text')
                .attr('class', 'donut-text');
        }

        /**
         * Stores current angles and interpolates with new angles
         * Check out {@link http://bl.ocks.org/mbostock/1346410| this example}
         *
         * @param  {Object}     a   New data for slice
         * @return {Function}       Tweening function for the donut shape
         * @private
         */
        function tweenArc(a) {
            let i = d3.interpolate(this._current, a);

            this._current = i(0);

            return function(t) {
                return shape(i(t));
            };
        }

        /**
         * Generates animations with tweens depending on the attributes given
         *
         * @param  {Number} outerRadius Final outer radius value
         * @param  {Number} delay       Delay of animation
         * @return {Function}           Function that when called will tween the element
         * @private
         */
        function tweenGrowthFactory(outerRadius, delay) {
            return function() {
                d3.select(this)
                    .transition()
                    .delay(delay)
                    .attrTween('d', function(d) {
                        let i = d3.interpolate(d.outerRadius, outerRadius);

                        return (t) => {
                            d.outerRadius = i(t);

                            return shape(d);
                        };
                    });
            };
        }

        /**
         * Animation for chart loading
         * Check out {@link http://bl.ocks.org/mbostock/4341574| this example}
         *
         * @param  {Object} b Data point
         * @return {Function}   Tween function
         * @private
         */
        function tweenLoading(b) {
            let i;

            b.innerRadius = 0;
            i = d3.interpolate({ startAngle: 0, endAngle: 0}, b);

            return function(t) { return shape(i(t)); };
        }

        /**
         * Utility function that wraps a text into the given width
         * TODO: Candidate to refactoring
         *
         * @param  {D3Selection} text         Text to write
         * @param  {Number} legendWidth Width of the container
         * @private
         */
        function wrapText(text, legendWidth) {
            let fontSize = externalRadius / 5;

            textHelper.wrapText.call(null, fontSize, legendWidth, text.node());
        }

        /**
         * Gets or Sets the colorScheme of the chart
         * @param  {Array} _x Color scheme array to get/set
         * @return { (Number | Module) } Current colorScheme or Donut Chart module to chain calls
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
         * @param  {Number} _x ExternalRadius number to get/set
         * @return { (Number | Module) } Current externalRadius or Donut Chart module to chain calls
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
         * @param  {Number} _x Desired width for the graph
         * @return { (Number | Module) } Current height or Donut Chart module to chain calls
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
         * @param  {Number} _x InternalRadius number to get/set
         * @return { (Number | Module) } Current internalRadius or Donut Chart module to chain calls
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
         * @param  {Object} _x Margin object to get/set
         * @return { (Number | Module) } Current margin or Donut Chart module to chain calls
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
         * @param  {Number} _x Desired width for the graph
         * @return { (Number | Module) } Current width or Donut Chart module to chain calls
         * @public
         */
        exports.width = function(_x) {
            if (!arguments.length) {
                return width;
            }
            width = _x;
            return this;
        };

        /**
         * Chart exported to png and a download action is fired
         * @public
         */
        exports.exportChart = function(filename) {
            exportChart.call(exports, svg, filename);
        };

        // Rebind 'customHover' event to the "exports" function, so it's available "externally" under the typical "on" method:
        d3.rebind(exports, dispatch, 'on');

        return exports;
    };
});
