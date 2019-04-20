define(function(require) {
    'use strict';

    const d3Dispatch = require('d3-dispatch');
    const d3Ease = require('d3-ease');
    const d3Format = require('d3-format');
    const d3Interpolate = require('d3-interpolate');
    const d3Scale = require('d3-scale');
    const d3Shape = require('d3-shape');
    const d3Selection = require('d3-selection');
    const d3Transition = require('d3-transition');

    const {exportChart} = require('./helpers/export');
    const textHelper = require('./helpers/text');
    const colorHelper = require('./helpers/color');
    const {calculatePercent} = require('./helpers/number');
    const {emptyDonutData} =require('./helpers/constants');
    const {donut} = require('./helpers/load');


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
            loadingState = donut,
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
            isEmpty = false,

            highlightedSliceId,
            highlightedSlice,
            hasFixedHighlightedSlice = false,
            hasHoverAnimation = true,

            hasLastHoverSliceHighlighted = false,
            lastHighlightedSlice = null,

            emptyDataConfig = {
                emptySliceColor: '#EFF2F5',
                showEmptySlice: false
            },

            quantityLabel = 'quantity',
            nameLabel = 'name',
            percentageLabel = 'percentage',

            percentageFormat = '.1f',
            numberFormat,

            // colors
            colorScale,
            colorSchema = colorHelper.colorSchemas.britecharts,

            centeredTextFunction = (d) => `${d.percentage}% ${d.name}`,

            // utils
            storeAngle = function(d) {
                this._current = d;
            },
            reduceOuterRadius = d => {
                d.outerRadius = externalRadius - radiusHoverOffset;
            },

            orderingFunction = (a, b) => b.quantity - a.quantity,

            sumValues = (data) => data.reduce((total, d) => d.quantity + total, 0),

            // extractors
            getQuantity = ({quantity}) => quantity,
            getSliceFill = ({data}) => colorScale(data.name),

            // events
            dispatcher = d3Dispatch.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove', 'customClick');

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
                if (isEmpty && emptyDataConfig.showEmptySlice) {
                    drawEmptySlice();
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
                .classed('container-group', true);

            container
              .append('g')
                .classed('chart-group', true);
            container
              .append('g')
                .classed('legend-group', true);
        }

        /**
         * Builds the pie layout that will produce data ready to draw
         * @private
         */
        function buildLayout() {
            layout = d3Shape.pie()
                .padAngle(paddingAngle)
                .value(getQuantity)
                .sort(orderingFunction);
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
                    .classed('britechart donut-chart', true);

                buildContainerGroups();
            }

            // Updates Container Group position
            svg
                .select('.container-group')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);

            // Updates SVG size
            svg
                .attr('width', width)
                .attr('height', height);
        }

        /**
         * Cleaning data casting the quantities, names and percentages to the proper type while keeping
         * the rest of properties on the data. It also calculates the percentages if not present.
         * @param  {DonutChartData} data    Data as passed to the container
         * @return {DonutChartData}         Clean data with percentages
         * @private
         */
        function cleanData(data) {
            let dataWithPercentages;
            let cleanData = data.reduce((acc, d) => {
                // Skip data without quantity
                if (d[quantityLabel] === undefined || d[quantityLabel] === null) {
                    return acc;
                }

                d.quantity = +d[quantityLabel];
                d.name = String(d[nameLabel]);
                d.percentage = d[percentageLabel] || null;

                return [...acc, d];
            }, []);

            let totalQuantity = sumValues(cleanData);

            if (totalQuantity === 0 && emptyDataConfig.showEmptySlice) {
                isEmpty = true;
            }

            dataWithPercentages = cleanData.map((d) => {
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
         * Draw an empty slice
         * @private
         */
        function drawEmptySlice() {

            if (slices) {
                svg.selectAll('g.arc').remove();
            }
            slices = svg.select('.chart-group')
                .selectAll('g.arc')
                .data(layout(emptyDonutData));

            let newSlices = slices.enter()
                .append('g')
                  .each(storeAngle)
                  .each(reduceOuterRadius)
                  .classed('arc', true)
                  .append('path');

            newSlices.merge(slices)
                .attr('fill', emptyDataConfig.emptySliceColor)
                .attr('d', shape)
                .transition()
                .ease(ease)
                .duration(pieDrawingTransitionDuration)
                .attrTween('d', tweenLoading);

            slices.exit().remove();
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
                    .text(() => centeredTextFunction(obj.data))
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
            // Not ideal, we need to figure out how to call exit for nested elements
            if (slices) {
                svg.selectAll('g.arc').remove();
            }

            slices = svg.select('.chart-group')
                .selectAll('g.arc')
                .data(layout(data));

            let newSlices = slices.enter()
                .append('g')
                  .each(storeAngle)
                  .each(reduceOuterRadius)
                  .classed('arc', true)
                  .append('path');

            if (isAnimated) {
                newSlices.merge(slices)
                    .attr('fill', getSliceFill)
                    .on('mouseover', function(d) {
                        handleMouseOver(this, d, chartWidth, chartHeight);
                    })
                    .on('mousemove', function(d) {
                        handleMouseMove(this, d, chartWidth, chartHeight);
                    })
                    .on('mouseout', function(d) {
                        handleMouseOut(this, d, chartWidth, chartHeight);
                    })
                    .on('click', function(d) {
                        handleClick(this, d, chartWidth, chartHeight);
                    })
                    .transition()
                    .ease(ease)
                    .duration(pieDrawingTransitionDuration)
                    .attrTween('d', tweenLoading);
            } else {
                newSlices.merge(slices)
                    .attr('fill', getSliceFill)
                    .attr('d', shape)
                    .on('mouseover', function(d) {
                        handleMouseOver(this, d, chartWidth, chartHeight);
                    })
                    .on('mousemove', function(d) {
                        handleMouseMove(this, d, chartWidth, chartHeight);
                    })
                    .on('mouseout', function(d) {
                        handleMouseOut(this, d, chartWidth, chartHeight);
                    })
                    .on('click', function(d) {
                        handleClick(this, d, chartWidth, chartHeight);
                    });
            }

            slices.exit().remove();
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
        function handleMouseOver(el, d, chartWidth, chartHeight) {
            drawLegend(d);
            dispatcher.call('customMouseOver', el, d, d3Selection.mouse(el), [chartWidth, chartHeight]);

            if (hasHoverAnimation) {
                // if the hovered slice is not the same as the last slice hovered
                // after mouseout event, then shrink the last slice that was highlighted
                if (lastHighlightedSlice && el !== lastHighlightedSlice) {
                    tweenGrowth(lastHighlightedSlice, externalRadius - radiusHoverOffset, pieHoverTransitionDuration);
                }
                if (highlightedSlice && el !== highlightedSlice) {
                    tweenGrowth(highlightedSlice, externalRadius - radiusHoverOffset);
                }
                tweenGrowth(el, externalRadius);
            }

        }

        /**
         * Handles a path mouse move
         * @return {void}
         * @private
         */
        function handleMouseMove(el, d, chartWidth, chartHeight) {
            dispatcher.call('customMouseMove', el, d, d3Selection.mouse(el), [chartWidth, chartHeight]);
        }

        /**
         * Handles a path mouse out
         * @return {void}
         * @private
         */
        function handleMouseOut(el, d, chartWidth, chartHeight) {
            cleanLegend();

            // When there is a fixed highlighted slice,
            // we will always highlight it and render legend
            if (highlightedSlice && hasFixedHighlightedSlice && !hasLastHoverSliceHighlighted) {
                drawLegend(highlightedSlice.__data__);
                tweenGrowth(highlightedSlice, externalRadius);
            }

            // When the current slice is not the highlighted, or there isn't a fixed highlighted slice and it is the highlighted
            // we will shrink the slice
            if (el !== highlightedSlice || (!hasFixedHighlightedSlice && el === highlightedSlice) ) {
                tweenGrowth(el, externalRadius - radiusHoverOffset, pieHoverTransitionDuration);
            }

            if (hasLastHoverSliceHighlighted) {
                drawLegend(el.__data__);
                tweenGrowth(el, externalRadius);
                lastHighlightedSlice = el;
            }

            dispatcher.call('customMouseOut', el, d, d3Selection.mouse(el), [chartWidth, chartHeight]);
        }

        /**
         * Handles a path click
         * @return {void}
         * @private
         */
        function handleClick(el, d, chartWidth, chartHeight) {
            dispatcher.call('customClick', el, d, d3Selection.mouse(el), [chartWidth, chartHeight]);
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


        // API

        /**
         * Gets or Sets the centeredTextFunction of the chart. If function is provided
         * the format will be changed by the custom function's value format.
         * The default format function value is "${d.percentage}% ${d.name}".
         * The callback will provide the data object with id, name, percentage, and quantity.
         * Also provides the component added by the user in each data entry.
         * @param  {Function} _x        Custom function that returns a formatted string
         * @return {Function | module}  Current centeredTextFunction or Chart module to chain calls
         * @public
         * @example donutChart.centeredTextFunction(d => `${d.id} ${d.quantity}`)
         */
        exports.centeredTextFunction = function(_x) {
            if (!arguments.length) {
                return centeredTextFunction;
            }
            centeredTextFunction = _x;

            return this;
        }

        /**
         * Gets or Sets the colorSchema of the chart
         * @param  {String[]} _x        Desired colorSchema for the graph
         * @return { String | module}   Current colorSchema or Chart module to chain calls
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
         * Gets or Sets the emptyDataConfig of the chart. If set and data is empty (quantity
         * adds up to zero or there are no entries), the chart will render an empty slice
         * with a given color (light gray by default)
         * @param  {Object} _x emptyDataConfig object to get/set
         * @return { Object | module} Current config for when chart data is an empty array
         * @public
         * @example donutChart.emptyDataConfig({showEmptySlice: true, emptySliceColor: '#000000'})
         */
        exports.emptyDataConfig = function(_x) {
            if (!arguments.length) {
                return emptyDataConfig;
            }
            emptyDataConfig = _x;

            return this;
        };

        /**
         * Chart exported to png and a download action is fired
         * @param {String} filename     File title for the resulting picture
         * @param {String} title        Title to add at the top of the exported picture
         * @public
         */
        exports.exportChart = function(filename, title) {
            exportChart.call(exports, svg, filename, title);
        };

        /**
         * Gets or Sets the externalRadius of the chart
         * @param  {Number} _x              ExternalRadius number to get/set
         * @return { (Number | Module) }    Current externalRadius or Donut Chart module to chain calls
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
         * Gets or Sets the hasHoverAnimation property of the chart. By default,
         * donut chart highlights the hovered slice. This property explicitly
         * disables this hover behavior.
         * @param  {boolean} _x         Decide whether hover slice animation should be enabled
         * @return {boolean | module}   Current hasHoverAnimation flag or Chart module
         * @public
         */
        exports.hasHoverAnimation = function(_x) {
            if (!arguments.length) {
                return hasHoverAnimation;
            }
            hasHoverAnimation = _x;

            return this;
        }

        /**
         * Gets or Sets the hasFixedHighlightedSlice property of the chart, making it to
         * highlight the selected slice id set with `highlightSliceById` all the time.
         *
         * @param  {boolean} _x         If we want to make the highlighted slice permanently highlighted
         * @return {boolean | module}   Current hasFixedHighlightedSlice flag or Chart module
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
         * Gets or sets the hasLastHoverSliceHighlighted property.
         * If property is true, the last hovered slice will be highlighted
         * after 'mouseout` event is triggered. The last hovered slice will remain
         * in highlight state.
         * Note: if both hasFixedHighlightedSlice and hasLastHoverSliceHighlighted
         * are true, the latter property will override the former.
         * @param {boolean} _x          Decide whether the last hovered slice should be highlighted
         * @return {boolean | module}   Current hasLastHoverSliceHighlighted value or Chart module
         * @public
         */
        exports.hasLastHoverSliceHighlighted = function(_x) {
            if (!arguments.length) {
                return hasLastHoverSliceHighlighted;
            }
            hasLastHoverSliceHighlighted = _x;

            return this;
        }

        /**
         * Gets or Sets the height of the chart
         * @param  {Number} _x              Desired width for the graph
         * @return { (Number | Module) }    Current height or Donut Chart module to chain calls
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
         * Gets or Sets the id of the slice to highlight
         * @param  {Number} _x              Slice id
         * @return { (Number | Module) }    Current highlighted slice id or Donut Chart module to chain calls
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
         * Gets or Sets the internalRadius of the chart
         * @param  {Number} _x              InternalRadius number to get/set
         * @return { (Number | Module) }    Current internalRadius or Donut Chart module to chain calls
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
         * Gets or Sets the isAnimated property of the chart, making it to animate when render.
         * By default this is 'false'
         *
         * @param  {Boolean} _x             Desired animation flag
         * @return { Boolean | module}      Current isAnimated flag or Chart module
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
         * Gets or Sets the loading state of the chart
         * @param  {string} markup Desired markup to show when null data
         * @return { loadingState | module} Current loading state markup or Chart module to chain calls
         * @public
         */
        exports.loadingState = function(_markup) {
            if (!arguments.length) {
                return loadingState;
            }
            loadingState = _markup;

            return this;
        };

        /**
         * Gets or Sets the margin of the chart
         * @param  {Object} _x              Margin object to get/set
         * @return { (Object | Module) }    Current margin or Donut Chart module to chain calls
         * @public
         */
        exports.margin = function(_x) {
            if (!arguments.length) {
                return margin;
            }
            margin = {
                ...margin,
                ..._x
            };

            return this;
        };

        /**
         * Gets or Sets the number format of the donut chart
         * @param  {string} _x Desired number format for the donut chart
         * @return {numberFormat | module} Current numberFormat or Chart module to chain calls
         * @public
         */
        exports.numberFormat = function(_x) {
            if (!arguments.length) {
                return numberFormat;
            }
            numberFormat = _x;

            return this;
        }

        /**
         * Exposes an 'on' method that acts as a bridge with the event dispatcher
         * We are going to expose this events:
         * customMouseOver, customMouseMove, customMouseOut and customClick
         *
         * @return {module} Bar Chart
         * @public
         */
        exports.on = function() {
            let value = dispatcher.on.apply(dispatcher, arguments);

            return value === dispatcher ? exports : value;
        };

        /**
         * Changes the order of items given custom function
         * @param  {Function} _x              A custom function that sets logic for ordering
         * @return { (Function | Module) }    Void function with no return
         * @public
         */
        exports.orderingFunction = function(_x) {
            if (!arguments.length) {
                return orderingFunction;
            }
            orderingFunction = _x;

            return this;
        };

       /**
         * Gets or Sets the percentage format for the percentage label
         * @param  {String} _x              Format for the percentage label (e.g. '.1f')
         * @return { (Number | Module) }    Current format or Donut Chart module to chain calls
         * @public
         */
        exports.percentageFormat = function(_x) {
            if (!arguments.length) {
                return percentageFormat;
            }
            percentageFormat = _x;

            return this;
        };

     /**
         * Gets or Sets the radiusHoverOffset of the chart
         * @param  {Number} _x              Desired offset for the hovered slice
         * @return { (Number | Module) }    Current offset or Donut Chart module to chain calls
         * @public
         */
        exports.radiusHoverOffset = function(_x) {
            if (!arguments.length) {
                return radiusHoverOffset;
            }
            radiusHoverOffset = _x;

            return this;
        };

        /**
         * Gets or Sets the width of the chart
         * @param  {Number} _x              Desired width for the graph
         * @return { (Number | Module) }    Current width or Donut Chart module to chain calls
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
