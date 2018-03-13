define(function(require){
    'use strict';

    const d3Format = require('d3-format');
    const d3Scale = require('d3-scale');
    const d3Selection = require('d3-selection');
    const d3Transition = require('d3-transition');

    const textHelper = require('./helpers/text');
    const colorHelper = require('./helpers/color');

    /**
     * @typedef LegendChartData
     * @type {Object[]}
     * @property {Number} id        Id of the group (required)
     * @property {Number} quantity  Quantity of the group (required)
     * @property {String} name      Name of the group (required)
     *
     * @example
     * [
     *     {
     *         id: 1,
     *         quantity: 2,
     *         name: 'glittering'
     *     },
     *     {
     *         id: 2,
     *         quantity: 3,
     *         name: 'luminous'
     *     }
     * ]
     */


    /**
     * @fileOverview Legend Component reusable API class that renders a
     * simple and configurable legend element.
     *
     * @example
     * var donutChart = donut(),
     *     legendBox = legend();
     *
     * donutChart
     *     .externalRadius(500)
     *     .internalRadius(200)
     *     .on('customMouseOver', function(data) {
     *         legendBox.highlight(data.data.id);
     *     })
     *     .on('customMouseOut', function() {
     *         legendBox.clearHighlight();
     *     });
     *
     * d3Selection.select('.css-selector')
     *     .datum(dataset)
     *     .call(donutChart);
     *
     * d3Selection.select('.other-css-selector')
     *     .datum(dataset)
     *     .call(legendBox);
     *
     * @module Legend
     * @tutorial legend
     * @exports charts/legend
     * @requires d3
     */
    return function module() {

        let margin = {
                top: 5,
                right: 5,
                bottom: 5,
                left: 5
            },
            width = 320,
            height = 180,

            markerSize = 16,
            // Offset to middle of text using em as per d3.axis
            // For marker positioning, 0.36 looks better than the 0.32 for tick labels
            markerYOffset = '-0.36em',
            marginRatio = 1.5,

            valueReservedSpace = 40,
            numberLetterSpacing = 0.8,
            numberFormat = 's',
            unit = '',

            isFadedClassName = 'is-faded',
            isHorizontal = false,
            highlightedEntryId = null,

            // colors
            colorScale,
            colorSchema = colorHelper.colorSchemas.britecharts,

            getId = ({id}) => id,
            getName = ({name}) => name,
            getFormattedQuantity = ({quantity}) => d3Format.format(numberFormat)(quantity) + unit,
            getCircleFill = ({name}) => colorScale(name),

            entries,
            chartWidth, chartHeight,
            data,
            svg;


        /**
         * This function creates the graph using the selection as container
         * @param  {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         * @param {object} _data The data to attach and generate the chart
         * @private
         */
        function exports(_selection) {
            _selection.each(function(_data){
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = _data;

                buildColorScale();
                buildSVG(this);

                if (isHorizontal) {
                    drawHorizontalLegend();
                } else {
                    drawVerticalLegend();
                }

                if (highlightedEntryId) {
                    cleanFadedLines();
                    fadeLinesBut(highlightedEntryId);
                }
            });
        }

        /**
         * Depending on the size of the horizontal legend, we are going to add a new
         * line with the last entry of the legend
         * @return {void}
         * @private
         */
        function adjustLines() {
            let lineWidth = svg.select('.legend-line').node().getBoundingClientRect().width + markerSize;
            let lineWidthSpace = chartWidth - lineWidth;

            if (lineWidthSpace <= 0) {
                splitInLines();
            }

            centerLegendOnSVG();
        }

        /**
         * Builds containers for the legend
         * Also applies the Margin convention
         * @private
         */
        function buildContainerGroups() {
            let container = svg
              .append('g')
                .classed('legend-container-group', true)
                .attr('transform', `translate(${margin.left},${margin.top})`);

            container
              .append('g')
                .classed('legend-group', true);
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
         * Builds the SVG element that will contain the chart
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @private
         */
        function buildSVG(container) {
            if (!svg) {
                svg = d3Selection.select(container)
                  .append('svg')
                    .classed('britechart britechart-legend', true);

                buildContainerGroups();
            }

            svg
                .attr('width', width)
                .attr('height', height);
        }

        /**
         * Centers the legend on the chart given that is a single line of labels
         * @return {void}
         * @private
         */
        function centerLegendOnSVG() {
            let legendGroupSize = svg.select('g.legend-container-group').node().getBoundingClientRect().width + getLineElementMargin();
            let emptySpace = width - legendGroupSize;

            if (emptySpace > 0) {
                svg.select('g.legend-container-group')
                    .attr('transform', `translate(${emptySpace/2},0)`)
            }
        }

        /**
         * Removes the faded class from all the entry lines
         * @private
         */
        function cleanFadedLines() {
            svg.select('.legend-group')
                .selectAll('g.legend-entry')
                .classed(isFadedClassName, false);
        }

        /**
         * Draws the entries of the legend within a single line
         * @private
         */
        function drawHorizontalLegend() {
            let xOffset = markerSize;

            svg.select('.legend-group')
                .selectAll('g')
                .remove();

            // We want a single line
            svg.select('.legend-group')
              .append('g')
                .classed('legend-line', true);

            // And one entry per data item
            entries = svg.select('.legend-line')
              .selectAll('g.legend-entry')
              .data(data);

            // Enter
            entries.enter()
              .append('g')
                .classed('legend-entry', true)
                .attr('data-item', getId)
                .attr('transform', function({name}, i, nodes) {
                    let horizontalOffset = xOffset,
                        lineHeight = chartHeight / 2,
                        verticalOffset = lineHeight,
                        labelWidth = textHelper.getTextWidth(name, textHelper.getFontSize(nodes[i]));

                    xOffset += markerSize + 2 * getLineElementMargin() + labelWidth;

                    return `translate(${horizontalOffset},${verticalOffset})`;
                })
                .merge(entries)
              .append('circle')
                .classed('legend-circle', true)
                .attr('cx', markerSize / 2)
                .attr('cy', markerYOffset)
                .attr('r', markerSize / 2)
                .style('fill', getCircleFill);

            svg.select('.legend-group')
                .selectAll('g.legend-entry')
              .append('text')
                .classed('legend-entry-name', true)
                .text(getName)
                .attr('x', getLineElementMargin());

            // Exit
            svg.select('.legend-group')
                .selectAll('g.legend-entry')
                .exit()
                .transition()
                .style('opacity', 0)
                .remove();

            adjustLines();
        }

        /**
         * Draws the entries of the legend
         * @private
         */
        function drawVerticalLegend() {
            svg.select('.legend-group')
                .selectAll('g')
                .remove();

            entries = svg.select('.legend-group')
                .selectAll('g.legend-line')
                .data(data);

            // Enter
            entries.enter()
              .append('g')
                .classed('legend-line', true)
                  .append('g')
                    .classed('legend-entry', true)
                    .attr('data-item', getId)
                    .attr('transform', function(d, i) {
                        let horizontalOffset = markerSize + getLineElementMargin(),
                            lineHeight = chartHeight / (data.length + 1),
                            verticalOffset = (i + 1) * lineHeight;

                        return `translate(${horizontalOffset},${verticalOffset})`;
                    })
                    .merge(entries)
                  .append('circle')
                    .classed('legend-circle', true)
                    .attr('cx', markerSize / 2)
                    .attr('cy', markerYOffset)
                    .attr('r', markerSize / 2 )
                    .style('fill', getCircleFill);

            svg.select('.legend-group')
                .selectAll('g.legend-line')
                .selectAll('g.legend-entry')
              .append('text')
                .classed('legend-entry-name', true)
                .text(getName)
                .attr('x', getLineElementMargin());

            svg.select('.legend-group')
                .selectAll('g.legend-line')
                .selectAll('g.legend-entry')
              .append('text')
                .classed('legend-entry-value', true)
                .text(getFormattedQuantity)
                .attr('x', chartWidth - valueReservedSpace);

            // Exit
            svg.select('.legend-group')
                .selectAll('g.legend-line')
                .exit()
                .transition()
                .style('opacity', 0)
                .remove();
        }

        /**
         * Applies the faded class to all lines but the one that has the given id
         * @param  {number} exceptionItemId Id of the line that needs to stay the same
         * @private
         */
        function fadeLinesBut(exceptionItemId) {
            let classToFade = 'g.legend-entry';
            let entryLine = svg.select(`[data-item="${exceptionItemId}"]`);

            if (entryLine.nodes().length){
                svg.select('.legend-group')
                    .selectAll(classToFade)
                    .classed(isFadedClassName, true);

                entryLine.classed(isFadedClassName, false);
            }
        }

        /**
         * Calculates the margin between elements of the legend
         * @return {Number} Margin to apply between elements
         * @private
         */
        function getLineElementMargin() {
            return marginRatio * markerSize;
        }

        /**
         * Simple method to move the last item of an overflowing legend into the next line
         * @return {void}
         * @private
         */
        function splitInLines() {
            let legendEntries = svg.selectAll('.legend-entry');
            let numberOfEntries = legendEntries.size();
            let lineHeight = (chartHeight / 2) * 1.7;
            let newLine = svg.select('.legend-group')
              .append('g')
                .classed('legend-line', true)
                .attr('transform', `translate(0, ${lineHeight})`);
            let lastEntry = legendEntries.filter(`:nth-child(${numberOfEntries})`);

            lastEntry.attr('transform', `translate(${markerSize},0)`);
            newLine.append(() => lastEntry.node());
        }

        // API

        /**
         * Clears all highlighted entries
         * @public
         */
        exports.clearHighlight = function() {
            cleanFadedLines();
        };

        /**
         * Gets or Sets the colorSchema of the chart
         * @param  {array} _x Color scheme array to get/set
         * @return {number | module} Current colorSchema or Donut Chart module to chain calls
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
         * Gets or Sets the height of the legend chart
         * @param  {number} _x Desired width for the chart
         * @return {height | module} Current height or Legend module to chain calls
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
         * Highlights a line entry by fading the rest of lines
         * @param  {number} entryId ID of the entry line
         * @public
         */
        exports.highlight = function(entryId) {
            cleanFadedLines();
            fadeLinesBut(entryId);
        };

        /**
         * Gets or Sets the id of the entry to highlight
         * @param  {Number} _x              Entry id
         * @return { (Number | Module) }    Current highlighted slice id or Donut Chart module to chain calls
         * @public
         */
        exports.highlightEntryById = function (_x) {
            if (!arguments.length) {
                return highlightedEntryId;
            }
            highlightedEntryId = _x;

            return this;
        };

        /**
         * Gets or Sets the horizontal mode on the legend
         * @param  {Boolean} _x Desired horizontal mode for the graph
         * @return {Boolean | module} If it is horizontal or Legend module to chain calls
         * @public
         */
        exports.isHorizontal = function(_x) {
            if (!arguments.length) {
                return isHorizontal;
            }
            isHorizontal = _x;

            return this;
        };

        /**
         * Gets or Sets the margin of the legend chart
         * @param  {object} _x Margin object to get/set
         * @return {object | module} Current margin or Legend module to chain calls
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
         * Gets or Sets the margin ratio of the legend chart.
         * Used to determine spacing between legend elements.
         * @param  {number} _x Margin Ratio to get/set
         * @return {number | module} Current marginRatio or Legend module to chain calls
         * @public
         */
        exports.marginRatio = function(_x) {
            if (!arguments.length) {
                return marginRatio;
            }
            marginRatio = _x;

            return this;
        };

        /**
         * Gets or Sets the markerSize of the legend chart.
         * This markerSize will determine the horizontal and vertical size of the colored marks
         * added as color identifiers for the chart's categories.
         *
         * @param  {object} _x Margin object to get/set
         * @return {object | module} Current markerSize or Legend module to chain calls
         * @public
         */
        exports.markerSize = function(_x) {
            if (!arguments.length) {
                return markerSize;
            }
            markerSize = _x;

            return this;
        };

        /**
         * Gets or Sets the number format of the legend chart
         * @param  {string} _x Desired number format for the legend chart
         * @return {string | module} Current number format or Legend module to chain calls
         * @public
         */
        exports.numberFormat = function (_x) {
            if (!arguments.length) {
                return numberFormat;
            }
            numberFormat = _x;

            return this;
        };

        /**
         * Gets or Sets the unit of the value
         * @param  {String} _x          Desired unit
         * @return {String | module}    Current unit or Legend module to chain calls
         * @public
         */
        exports.unit = function(_x) {
            if (!arguments.length) {
                return unit;
            }
            unit = _x;

            return this;
        };

        /**
         * Gets or Sets the width of the legend chart
         * @param  {number} _x Desired width for the graph
         * @return {number | module} Current width or Legend module to chain calls
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
