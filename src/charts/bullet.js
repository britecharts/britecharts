define(function(require) {
    'use strict';

    const d3Array = require('d3-array');
    const d3Ease = require('d3-ease');
    const d3Axis = require('d3-axis');
    const d3Color = require('d3-color');
    const d3Dispatch = require('d3-dispatch');
    const d3Format = require('d3-format');
    const d3Scale = require('d3-scale');
    const d3Selection = require('d3-selection');
    const d3Transition = require('d3-transition');

    const {exportChart} = require('./helpers/export');
    const colorHelper = require('./helpers/color');


    /**
     * @typedef BulletChartData
     * @type {Object}
     * @property {Number[]} ranges      Range that encodes the qualitative measure
     * @property {Number[]} measures    Range that encodes the performance measure
     * @property {Number[]} markers     Marker lines that encode the comparative measure
     * @property {String}   [title]     String that sets identification for the measure
     * @property {String} [subtitle]  String that provides more details on measure identification
     *
     * @example
     * {
     *      ranges: [130, 160, 250],
     *      measures: [150, 180],
     *      markers: [175]
     * }
     *
     */

    /**
     * Reusable Bullet Chart API class that renders a
     * simple and configurable Bullet Chart.
     *
     * @module Bullet
     * @tutorial bullet-chart
     * @requires d3-array, d3-dispatch, d3-ease, d3-scale, d3-selection
     *
     * @example
     * let bulletChart = bullet();
     *
     * bulletChart
     *     .aspectRatio(0.5)
     *     .width(containerWidth);
     *
     * d3Selection.select('.css-selector')
     *     .datum(dataset)
     *     .call(bulletChart);
     */
    return function module() {

        let margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 20
            },
            data,
            width = 960, height = 150,
            chartWidth, chartHeight,
            xScale,

            rangeOpacityScale,
            rangeOpacifyDiff = 0.2,
            measureOpacityScale,
            measureOpacifyDiff = 0.3,

            colorSchema = colorHelper.colorSchemas.britecharts,
            rangeColor,
            measureColor,
            numberFormat = '',

            baseLine,

            aspectRatio = null,
            ticks = 6,
            tickPadding = 5,
            axis,
            paddingBetweenAxisAndChart = 5,
            startMaxRangeOpacity = 0.5,
            markerStrokeWidth = 5,
            barWidth,

            isReverse = false,

            legendGroup,
            titleEl,
            subtitleEl,
            rangesEl,
            measuresEl,
            markersEl,

            legendSpacing = 100,
            title,
            customTitle,

            subtitle,
            customSubtitle,
            subtitleSpacing = 15,

            ranges = [],
            markers = [],
            measures = [],

            svg,
            ease = d3Ease.easeQuadInOut,

            hasTitle = () => title || customTitle,
            getMeasureBarHeight = () => chartHeight / 3;


        /**
         * This function creates the graph using the selection as container
         * @param  {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         * @param {BulletChartData} _data   The data to attach and generate the chart
         */
        function exports(_selection) {
            _selection.each(function(_data) {
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = cleanData(_data);

                if (hasTitle()) {
                    chartWidth -= legendSpacing;
                }

                buildScales();
                buildSVG(this);
                buildAxis();
                drawBullet();
                drawTitles();
                drawAxis();

            });
        }

        /**
         * Creates the d3 x and y axis, setting orientations
         * @private
         */
        function buildAxis() {
            axis = d3Axis.axisBottom(xScale)
                .ticks(ticks)
                .tickPadding(tickPadding)
                .tickFormat(d3Format.format(numberFormat));
        }

        /**
         * Builds containers for the chart, the axis and a wrapper for all of them
         * Also applies the Margin convention
         * @return {void}
         * @private
         */
        function buildContainerGroups() {
            let container = svg
                .append('g')
                  .classed('container-group', true)
                  .attr('transform', `translate(${margin.left}, ${margin.top})`);

            container
                .append('g').classed('grid-lines-group', true);
            container
                .append('g').classed('chart-group', true);
            container
                .append('g').classed('axis-group', true);
            container
                .append('g').classed('metadata-group', true);

            if (hasTitle()) {
                container.selectAll('.chart-group')
                  .attr('transform', `translate(${legendSpacing}, 0)`);
            }
        }

        /**
         * Creates the x scales of the chart
         * @return {void}
         * @private
         */
        function buildScales() {
            const decidedRange = isReverse ? [chartWidth, 0] : [0, chartWidth];

            xScale = d3Scale.scaleLinear()
                .domain([0, Math.max(ranges[0], markers[0], measures[0])])
                .rangeRound(decidedRange)
                .nice();

            // Derive width scales from x scales
            barWidth = bulletWidth(xScale);

            // set up opacity scale based on ranges and measures
            rangeOpacityScale = ranges.map((d, i) => startMaxRangeOpacity - (i * rangeOpacifyDiff)).reverse();
            measureOpacityScale = ranges.map((d, i) => 0.9 - (i * measureOpacifyDiff)).reverse();

            // initialize range and measure bars and marker line colors
            rangeColor = colorSchema[0];
            measureColor = colorSchema[1];
        }

        /**
         * Builds the SVG element that will contain the chart
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @return {void}
         * @private
         */
        function buildSVG(container) {
            if (!svg) {
                svg = d3Selection.select(container)
                    .append('svg')
                      .classed('britechart bullet-chart', true);

                buildContainerGroups();
            }

            svg
                .attr('width', width)
                .attr('height', height);
        }

        /**
         * Calculates width for each bullet using scale
         * @return {void}
         * @private
         */
        function bulletWidth(x) {
            const x0 = x(0);

            return function (d) {
                return Math.abs(x(d) - x0);
            }
        }

        /**
         * Cleaning data casting the values and names to the proper
         * type while keeping the rest of properties on the data. It
         * also creates a set of zeroed data (for animation purposes)
         * @param   {BulletChartData} originalData  Raw data as passed to the container
         * @return  {BulletChartData}               Clean data
         * @private
         */
        function cleanData(originalData) {
            const newData = {
                ranges: originalData.ranges.slice().sort().reverse(),
                measures: originalData.measures.slice().sort().reverse(),
                markers: originalData.markers.slice().sort().reverse(),
                subtitle: originalData.subtitle,
                title: originalData.title
            };

            ({title, subtitle, ranges, measures, markers} = newData);

            return newData;
        }

        /**
         * Draws the x and y axis on the svg object within their
         * respective groups along with their axis labels
         * @return {void}
         * @private
         */
        function drawAxis() {
            let translateX = hasTitle() ? legendSpacing : 0;

            svg.select('.axis-group')
                .attr('transform', `translate(${translateX}, ${chartHeight + paddingBetweenAxisAndChart})`)
                .call(axis);

            drawHorizontalExtendedLine();
        }

        /**
         * Draws the measures of the bullet chart
         * @return {void}
         * @private
         */
        function drawBullet() {
            if (rangesEl) {
                rangesEl.remove();
                measuresEl.remove();
                markersEl.remove();
            }

            rangesEl = svg.select('.chart-group')
              .selectAll('rect.range')
              .data(ranges)
              .enter()
                .append('rect')
                  .attr('fill', rangeColor)
                  .attr('opacity', (d, i) => rangeOpacityScale[i])
                  .attr('class', (d, i) => `range r${i}`)
                  .attr('width', barWidth)
                  .attr('height', chartHeight)
                  .attr('x', isReverse ? xScale : 0);

            measuresEl = svg.select('.chart-group')
              .selectAll('rect.measure')
              .data(measures)
              .enter()
                .append('rect')
                  .attr('fill', measureColor)
                  .attr('fill-opacity', (d, i) => measureOpacityScale[i])
                  .attr('class', (d, i) => `measure m${i}`)
                  .attr('width', barWidth)
                  .attr('height', getMeasureBarHeight)
                  .attr('x', isReverse ? xScale : 0)
                  .attr('y', getMeasureBarHeight);

            markersEl = svg.select('.chart-group')
              .selectAll('line.marker-line')
              .data(markers)
              .enter()
                .append('line')
                  .attr('class', 'marker-line')
                  .attr('stroke', measureColor)
                  .attr('stroke-width', markerStrokeWidth)
                  .attr('opacity', measureOpacityScale[0])
                  .attr('x1', xScale)
                  .attr('x2', xScale)
                  .attr('y1', 0)
                  .attr('y2', chartHeight);
        }

        /**
         * Draws a vertical line to extend x-axis till the edges
         * @return {void}
         * @private
         */
        function drawHorizontalExtendedLine() {
            baseLine = svg.select('.axis-group')
              .selectAll('line.extended-x-line')
              .data([0])
              .enter()
                .append('line')
                  .attr('class', 'extended-x-line')
                  .attr('x1', 0)
                  .attr('x2', chartWidth);
        }

        /**
         * Draws the title and subtitle components of chart
         * @return {void}
         * @private
         */
        function drawTitles() {
            if (hasTitle()) {
                // either use title provided from the data
                // or customTitle provided via API method call
                if (legendGroup) {
                    legendGroup.remove();
                }

                legendGroup = svg.select('.metadata-group')
                  .append('g')
                    .classed('legend-group', true)
                    .attr('transform', `translate(0, ${chartHeight / 2})`);


                // override title with customTitle if given
                if (customTitle) {
                    title = customTitle;
                }

                titleEl = legendGroup.selectAll('text.bullet-title')
                  .data([1])
                  .enter()
                    .append('text')
                      .attr('class', 'bullet-title x-axis-label')
                      .text(title);

                // either use subtitle provided from the data
                // or customSubtitle provided via API method call
                if (subtitle || customSubtitle) {

                    // override subtitle with customSubtitle if given
                    if (customSubtitle) {
                        subtitle = customSubtitle;
                    }

                    titleEl = legendGroup.selectAll('text.bullet-subtitle')
                      .data([1])
                      .enter()
                        .append('text')
                          .attr('class', 'bullet-subtitle x-axis-label')
                          .attr('y', subtitleSpacing)
                          .text(subtitle);
                }
            }
        }

        // API

        /**
         * Gets or Sets the aspect ratio of the chart
         * @param  {Number} _x              Desired aspect ratio for the graph
         * @return {Number | module}        Current aspect ratio or Chart module to chain calls
         * @public
         */
        exports.aspectRatio = function (_x) {
            if (!arguments.length) {
                return aspectRatio;
            }
            aspectRatio = _x;

            return this;
        };

        /**
         * Gets or Sets the colorSchema of the chart.
         * The first color from the array will be applied to range bars (the wider bars).
         * The second color from the array will be applied to measure bars (the narrow bars) and marker lines.
         * @param  {String[]} _x        Desired colorSchema for the graph
         * @return {String[] | module}  Current colorSchema or Chart module to chain calls
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
         * Gets or Sets the title for measure identifier
         * range.
         * @param  {String} _x              Desired customTitle for chart
         * @return {String | module}        Current customTitle or Chart module to chain calls
         * @public
         * @example bulletChart.customTitle('CPU Usage')
         */
        exports.customTitle = function(_x) {
            if (!arguments.length) {
                return customTitle;
            }
            customTitle = _x;

            return this;
        }

        /**
         * Gets or Sets the subtitle for measure identifier
         * range.
         * @param  {String} _x              Desired customSubtitle for chart
         * @return {String | module}        current customSubtitle or Chart module to chain calls
         * @public
         * @example bulletChart.customSubtitle('GHz')
         */
        exports.customSubtitle = function(_x) {
            if (!arguments.length) {
                return customSubtitle;
            }
            customSubtitle = _x;

            return this;
        }

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
         * Gets or Sets the height of the chart
         * @param  {Number} _x          Desired height for the chart
         * @return {Number | module}    Current height or Chart module to chain calls
         * @public
         */
        exports.height = function (_x) {
            if (!arguments.length) {
                return height;
            }
            if (aspectRatio) {
                width = Math.ceil(_x / aspectRatio);
            }
            height = _x;

            return this;
        };

        /**
         * Gets or Sets the isReverse status of the chart. If true,
         * the elements will be rendered in reverse order.
         * @param  {Boolean} _x=false       Desired height for the chart
         * @return {Boolean | module}       Current height or Chart module to chain calls
         * @public
         */
        exports.isReverse = function (_x) {
            if (!arguments.length) {
                return isReverse;
            }
            isReverse = _x;

            return this;
        }

        /**
         * Gets or Sets the margin of the chart
         * @param  {Object} _x          Margin object to get/set
         * @return {margin | module}    Current margin or Chart module to chain calls
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
         * Gets or Sets the number format of the bar chart
         * @param  {string} _x                  Desired number format for the bar chart
         * @return {numberFormat | module}      Current numberFormat or Chart module to chain calls
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
         * Space between axis and chart
         * @param  {Number} _x=5            Space between y axis and chart
         * @return {Number| module}         Current value of paddingBetweenAxisAndChart or Chart module to chain calls
         * @public
         */
        exports.paddingBetweenAxisAndChart = function(_x) {
            if (!arguments.length) {
                return paddingBetweenAxisAndChart;
            }
            paddingBetweenAxisAndChart = _x;

            return this;
        };

        /**
         * Gets or Sets the starting point of the capacity
         * range.
         * @param  {Number} _x=0.5          Desired startMaxRangeOpacity for chart
         * @return {Number | module}        current startMaxRangeOpacity or Chart module to chain calls
         * @public
         * @example bulletChart.startMaxRangeOpacity(0.8)
         */
        exports.startMaxRangeOpacity = function(_x) {
            if (!arguments.length) {
                return startMaxRangeOpacity;
            }
            startMaxRangeOpacity = _x;

            return this;
        }

        /**
         * Gets or Sets the number of ticks of the x axis on the chart
         * (Default is 5)
         * @param  {Number} _x          Desired horizontal ticks
         * @return {Number | module}    Current ticks or Chart module to chain calls
         * @public
         */
        exports.ticks = function (_x) {
            if (!arguments.length) {
                return ticks;
            }
            ticks = _x;

            return this;
        };

        /**
         * Gets or Sets the width of the chart
         * @param  {Number} _x           Desired width for the chart
         * @return {Number | module}     Current width or Chart module to chain calls
         * @public
         */
        exports.width = function(_x) {
            if (!arguments.length) {
                return width;
            }
            if (aspectRatio) {
                height = Math.ceil(_x * aspectRatio);
            }
            width = _x;

            return this;
        };

        return exports;
    };

});
