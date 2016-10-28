define(function(require){
    'use strict';

    const d3 = require('d3');

    const exportChart = require('./helpers/exportChart');
    const textHelper = require('./helpers/text');
    const colorHelper = require('./helpers/colors');


    /**
     * @typedef DonutChartData
     * @type {Object[]}
     * @property {Number} quantity     Quantity of the group (required)
     * @property {Number} percentage   Percentage of the total (required)
     * @property {String} name         Name of the group (required)
     * @property {Number} id           Identifier for the group required for legend feature (optional)
     *
     * @example
     * [
     *     {
     *         quantity: 1,
     *         percentage: 50,
     *         name: 'glittering',
     *         id: 1
     *     },
     *     {
     *         quantity: 1,
     *         percentage: 50,
     *         name: 'luminous',
     *         id: 2
     *     }
     * ]
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
            ease = d3.easeCubicInOut,
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

            quantityLabel = 'quantity',
            nameLabel = 'name',
            percentageLabel = 'percentage',

            // colors
            colorScale = d3.schemeCategory20c,
            colorScheme = colorHelper.britechartsColorSchema,

            // utils
            storeAngle = function(d) {
                this._current = d;
            },
            reduceOuterRadius = d => {
                d.outerRadius = externalRadius - radiusHoverOffset;
            },
            sortComparator = (a, b) => b.quantity - a.quantity,

            // extractors
            getQuantity = ({quantity}) => quantity,
            getSliceFill = ({data}) => colorScale(data.name),

            // events
            dispatcher = d3.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');

        /**
         * This function creates the graph using the selection as container
         *
         * @param {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         * @param {DonutChartData} _data The data to attach and generate the chart
         */
        function exports(_selection) {
            _selection.each(function(_data) {
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = cleanData(_data);

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
                colorScale = d3.scaleOrdinal().range(colorScheme);
            }
        }

        /**
         * Builds containers for the chart, the legend and a wrapper for all of them
         * @private
         */
        function buildContainerGroups() {
            let container = svg
              .append('g')
                .classed('container-group', true)
                .attr('transform', `translate(${width / 2}, ${height / 2})`);

            container.append('g').classed('chart-group', true);
            container.append('g').classed('legend-group', true);
        }

        /**
         * Builds the pie layout that will produce data ready to draw
         * @private
         */
        function buildLayout() {
            layout = d3.pie()
                .padAngle(paddingAngle)
                .value(getQuantity)
                .sort(sortComparator);
        }

        /**
         * Builds the shape function
         * @private
         */
        function buildShape() {
            shape = d3.arc()
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
            if (!svg) {
                svg = d3.select(container)
                  .append('svg')
                    .classed('britechart donut-chart', true)
                    .data([data]);  //TO REVIEW

                buildContainerGroups();
            }

            svg
                .transition()
                .ease(ease)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);
        }

        /**
         * Cleaning data adding the proper format
         * @param  {DonutChartData} data Data
         * @private
         */
        function cleanData(data) {
            return data.map((d) => {
                d.quantity = +d[quantityLabel];
                d.name = String(d[nameLabel]);
                d.percentage = String(d[percentageLabel]);

                return d;
            });
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
                    .on('mouseout', handleMouseOut)
                .merge(slices)
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
                    .transition()
                    .duration(arcTransitionDuration)
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

            dispatcher.call('customMouseOver', this, datum);
        }

        function handleMouseOut() {
            cleanLegend();

            dispatcher.call('customMouseOut', this);
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
         *
         * @param  {D3Selection} text         Text to write
         * @param  {Number} legendWidth Width of the container
         * @private
         */
        function wrapText(text, legendWidth) {
            let fontSize = externalRadius / 5;

            textHelper.wrapText.call(null, 0, fontSize, legendWidth, text.node());
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
        exports.exportChart = function(filename, title) {
            exportChart.call(exports, svg, filename, title);
        };

        /**
         * Exposes an 'on' method that acts as a bridge with the event dispatcher
         * We are going to expose this events:
         * customMouseOver, customMouseMove and customMouseOut
         *
         * @return {module} Bar Chart
         * @public
         */
        exports.on = function() {
            let value = dispatcher.on.apply(dispatcher, arguments);

            return value === dispatcher ? exports : value;
        };

        return exports;
    };
});
