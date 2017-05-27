define(function(require) {
    'use strict';

    const d3Dispatch = require('d3-dispatch');
    const d3Ease = require('d3-ease');
    const d3Interpolate = require('d3-interpolate');
    const d3Scale = require('d3-scale');
    const d3Shape = require('d3-shape');
    const d3Selection = require('d3-selection');
    const d3Transition = require('d3-transition');

    const {exportChart} = require('./helpers/exportChart');
    const textHelper = require('./helpers/text');
    const colorHelper = require('./helpers/colors');
    const {calculatePercent} = require('./helpers/common');


    /**
     * @typedef DonutChartData
     * @type {Object[]}
     * @property {Number} quantity     Quantity of the group (required)
     * @property {Number} percentage   Percentage of the total (optional)
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
     * @tutorial donut
     * @requires d3-dispatch, d3-ease, d3-interpolate, d3-scale, d3-shape, d3-selection
     *
     * @example
     * var donutChart = donut();
     *
     * donutChart
     *     .externalRadius(500)
     *     .internalRadius(200);
     *
     * d3Selection.select('.css-selector')
     *     .datum(dataset)
     *     .call(donutChart);
     *
     */
    return function module() {

        let margin = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            width = 300,
            height = 300,
            ease = d3Ease.easeCubicInOut,
            arcTransitionDuration = 750,
            pieDrawingTransitionDuration = 1200,
            pieHoverTransitionDuration = 150,
            radiusHoverOffset = 12,
            paddingAngle = 0,
            data,
            chartWidth, chartHeight,
            externalRadius = 140,
            internalRadius = 45.5,
            legendWidth = externalRadius + internalRadius,
            layout,
            shape,
            slices,
            svg,

            isAnimated = false,

            highlightedSliceId,
            highlightedSlice,
            hasFixedHighlightedSlice = false,

            quantityLabel = 'quantity',
            nameLabel = 'name',
            percentageLabel = 'percentage',

            percentageFormat = '.1f',

            // colors
            colorScale,
            colorSchema = colorHelper.colorSchemas.britechartsColorSchema,

            // utils
            storeAngle = function(d) {
                this._current = d;
            },
            reduceOuterRadius = d => {
                d.outerRadius = externalRadius - radiusHoverOffset;
            },
            sortComparator = (a, b) => b.quantity - a.quantity,
            sumValues = (data) => data.reduce((total, d) => d.quantity + total, 0),

            // extractors
            getQuantity = ({quantity}) => quantity,
            getSliceFill = ({data}) => colorScale(data.name),

            // events
            dispatcher = d3Dispatch.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');

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

                if (highlightedSliceId) {
                    initHighlightSlice();
                }
            });
        }

        /**
         * Builds color scale for chart, if any colorSchema was defined
         * @private
         */
        function buildColorScale() {
            if (colorSchema) {
                colorScale = d3Scale.scaleOrdinal().range(colorSchema);
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
            layout = d3Shape.pie()
                .padAngle(paddingAngle)
                .value(getQuantity)
                .sort(sortComparator);
        }

        /**
         * Builds the shape function
         * @private
         */
        function buildShape() {
            shape = d3Shape.arc()
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
                svg = d3Selection.select(container)
                  .append('svg')
                    .classed('britechart donut-chart', true)
                    .data([data]);  //TO REVIEW

                buildContainerGroups();
            }

            svg
                .attr('width', width)
                .attr('height', height);
        }

        /**
         * Cleaning data adding the proper format
         * @param  {DonutChartData} data Data
         * @private
         */
        function cleanData(data) {
            let cleanData = data.reduce((acc, d) => {
                // Skip data without quantity
                if (!d[quantityLabel]) {
                    return acc;
                }

                d.quantity = +d[quantityLabel];
                d.name = String(d[nameLabel]);
                d.percentage = d[percentageLabel] || null;
                acc.push(d);

                return acc;
            }, []);
            let totalQuantity = sumValues(cleanData);
            let dataWithPercentages = cleanData.map((d) => {
                d.percentage = String(d.percentage || calculatePercent(d[quantityLabel], totalQuantity, percentageFormat));

                return d;
            });

            return dataWithPercentages;
        }

        /**
         * Cleans any value that could be on the legend text element
         * @private
         */
        function cleanLegend() {
            svg.select('.donut-text').text('');
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

                let newSlices = slices.enter()
                  .append('g')
                    .each(storeAngle)
                    .each(reduceOuterRadius)
                    .classed('arc', true);

                if (isAnimated) {
                    newSlices.merge(slices)
                      .append('path')
                        .attr('fill', getSliceFill)
                        .on('mouseover', handleMouseOver)
                        .on('mouseout', handleMouseOut)
                        .transition()
                        .ease(ease)
                        .duration(pieDrawingTransitionDuration)
                        .attrTween('d', tweenLoading);
                } else {
                    newSlices.merge(slices)
                      .append('path')
                        .attr('fill', getSliceFill)
                        .attr('d', shape)
                        .on('mouseover', handleMouseOver)
                        .on('mouseout', handleMouseOut)
                }
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
         * Checks if the given element id is the same as the highlightedSliceId and returns the
         * element if that's the case
         * @param  {DOMElement} options.data Dom element to check
         * @return {DOMElement}              Dom element if it has the same id
         */
        function filterHighlightedSlice({data}) {
            if (data.id === highlightedSliceId) {
                return this;
            }
        }

        /**
         * Handles a path mouse over
         * @return {void}
         * @private
         */
        function handleMouseOver(datum) {
            drawLegend(datum);
            dispatcher.call('customMouseOver', this, datum);

            if (highlightedSlice && this !== highlightedSlice) {
                tweenGrowth(highlightedSlice, externalRadius - radiusHoverOffset);
            }
            tweenGrowth(this, externalRadius);
        }

        /**
         * Handles a path mouse out
         * @return {void}
         * @private
         */
        function handleMouseOut() {
            if (highlightedSlice && hasFixedHighlightedSlice) {
                drawLegend(highlightedSlice.__data__);
            } else {
                cleanLegend();
            }
            dispatcher.call('customMouseOut', this);

            if (highlightedSlice && hasFixedHighlightedSlice && this !== highlightedSlice) {
                tweenGrowth(highlightedSlice, externalRadius);
            }
            tweenGrowth(this, externalRadius - radiusHoverOffset, pieHoverTransitionDuration);
        }

        /**
         * Find the slice by id and growth it if needed
         * @private
         */
        function initHighlightSlice() {
            highlightedSlice = svg.selectAll('.chart-group .arc path')
                .select(filterHighlightedSlice).node();

            if (highlightedSlice) {
                drawLegend(highlightedSlice.__data__);
                tweenGrowth(highlightedSlice, externalRadius, pieDrawingTransitionDuration);
            }
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
            let i = d3Interpolate.interpolate(this._current, a);

            this._current = i(0);

            return function(t) {
                return shape(i(t));
            };
        }

        /**
         * Animate slice with tweens depending on the attributes given
         *
         * @param  {DOMElement} slice   Slice to growth
         * @param  {Number} outerRadius Final outer radius value
         * @param  {Number} delay       Delay of animation
         * @private
         */
        function tweenGrowth(slice, outerRadius, delay = 0) {
            d3Selection.select(slice)
                .transition()
                .delay(delay)
                .attrTween('d', function(d) {
                    let i = d3Interpolate.interpolate(d.outerRadius, outerRadius);

                    return (t) => {
                        d.outerRadius = i(t);

                        return shape(d);
                    };
                });
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
            i = d3Interpolate.interpolate({ startAngle: 0, endAngle: 0}, b);

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
         * Gets or Sets the colorSchema of the chart
         * @param  {String[]} _x Desired colorSchema for the graph
         * @return { colorSchema | module} Current colorSchema or Chart module to chain calls
         * @public
         */
        exports.colorSchema = function(_x) {
            if (!arguments.length) {
                return colorSchema;
            }
            colorSchema = _x;
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
         * Gets or Sets the hasFixedHighlightedSlice property of the chart, making it to
         * highlight the selected slice id set with `highlightSliceById` all the time.
         *
         * @param  {Boolean} _x                         If we want to make the highlighted slice permanently highlighted
         * @return { hasFixedHighlightedSlice | module} Current hasFixedHighlightedSlice flag or Chart module
         * @public
         */
        exports.hasFixedHighlightedSlice = function(_x) {
            if (!arguments.length) {
                return hasFixedHighlightedSlice;
            }
            hasFixedHighlightedSlice = _x;

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
         * Gets or Sets the isAnimated property of the chart, making it to animate when render.
         * By default this is 'false'
         *
         * @param  {Boolean} _x Desired animation flag
         * @return { isAnimated | module} Current isAnimated flag or Chart module
         * @public
         */
        exports.isAnimated = function(_x) {
            if (!arguments.length) {
                return isAnimated;
            }
            isAnimated = _x;

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
         * Gets or Sets the id of the slice to highlight
         * @param  {Number} _x Slice id
         * @return { (Number | Module) } Current highlighted slice id or Donut Chart module to chain calls
         * @public
         */
        exports.highlightSliceById = function(_x) {
            if (!arguments.length) {
                return highlightedSliceId;
            }
            highlightedSliceId = _x;
            return this;
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
