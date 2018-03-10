define(function (require) {
    'use strict';

    const d3Array = require('d3-array');
    const d3Axis = require('d3-axis');
    const d3Color = require('d3-color');
    const d3Collection = require('d3-collection');
    const d3Dispatch = require('d3-dispatch');
    const d3Ease = require('d3-ease');
    const d3Interpolate = require('d3-interpolate');
    const d3Scale = require('d3-scale');
    const d3Selection = require('d3-selection');
    const assign = require('lodash.assign');
    const d3Transition = require('d3-transition');

    const { exportChart } = require('./helpers/export');
    const colorHelper = require('./helpers/color');
    const {bar} = require('./helpers/load');

    const NUMBER_FORMAT = ',f';
    const uniq = (arrArg) => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) == pos);


    /**
     * @typdef D3Layout
     * @type function
     */

    /**
     * @typedef GroupedBarChartData
     * @type {Object[]}
     * @property {String} name         Name of the entry
     * @property {String} group        group of the entry
     * @property {Number} value        Value of the entry
     *
     * @example
     * [
     *     {
     *         "name": "2011-01",
     *         "group": "Direct",
     *         "value": 0
     *     }
     * ]
     */

    /**
     * Grouped Bar Chart reusable API module that allows us
     * rendering a multi grouped bar and configurable chart.
     *
     * @module Grouped-bar
     * @tutorial grouped-bar
     * @requires d3-array, d3-axis, d3-color, d3-collection, d3-dispatch, d3-ease,
     *  d3-interpolate, d3-scale, d3-selection, lodash assign
     *
     * @example
     * let groupedBar = GroupedBar();
     *
     * groupedBar
     *     .width(containerWidth);
     *
     * d3Selection.select('.css-selector')
     *     .datum(dataset.data)
     *     .call(groupedBar);
     *
     */
    return function module() {

        let margin = {
                top: 40,
                right: 30,
                bottom: 60,
                left: 70
            },
            width = 960,
            height = 500,
            loadingState = bar,

            xScale,
            xScale2,
            xAxis,
            yScale,
            yScale2,
            yAxis,

            aspectRatio = null,

            yTickTextOffset = {
                y: -8,
                x: -20
            },

            yTicks = 5,
            xTicks = 5,
            baseLine,

            colorSchema = colorHelper.colorSchemas.britecharts,

            colorScale,
            categoryColorMap,

            layers,

            ease = d3Ease.easeQuadInOut,
            isHorizontal = false,

            svg,
            chartWidth, chartHeight,
            data,
            groups,
            layerElements,

            transformedData,

            tooltipThreshold = 480,

            xAxisPadding = {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            },
            yAxisLabel,
            yAxisLabelEl,
            yAxisLabelOffset = -60,

            maxBarNumber = 8,
            barOpacity = 0.24,

            animationDelayStep = 20,
            animationDelays = d3Array.range(animationDelayStep, maxBarNumber * animationDelayStep, animationDelayStep),
            animationDuration = 1000,

            grid = null,

            nameLabel = 'name',
            valueLabel = 'value',
            groupLabel = 'group',
            valueLabelFormat = NUMBER_FORMAT,

            // getters
            getName = ({name}) => name,
            getValue = ({value}) => value,
            getGroup = ({group}) => group,
            isAnimated = false,

            // events
            dispatcher = d3Dispatch.dispatch(
                'customMouseOver',
                'customMouseOut',
                'customMouseMove',
                'customClick'
            );

        /**
         * This function creates the graph using the selection and data provided
         * @param {D3Selection} _selection A d3 selection that represents
         * the container(s) where the chart(s) will be rendered
         * @param {GroupedBarChartData} _data The data to attach and generate the chart
         */
        function exports(_selection) {
            _selection.each(function (_data) {
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = cleanData(_data);

                prepareData(data);
                buildScales();
                buildLayers();
                buildSVG(this);
                drawGridLines();
                buildAxis();
                drawAxis();
                drawGroupedBar();
                addMouseEvents();
            });
        }

        /**
         * Adds events to the container group if the environment is not mobile
         * Adding: mouseover, mouseout and mousemove
         */
        function addMouseEvents() {
            if (shouldShowTooltip()) {
                svg
                    .on('mouseover', function(d) {
                        handleMouseOver(this, d);
                    })
                    .on('mouseout', function(d) {
                        handleMouseOut(this, d);
                    })
                    .on('mousemove',  function(d) {
                        handleMouseMove(this, d);
                    })
                    .on('click',  function(d) {
                        handleCustomClick(this, d);
                    });;
            }

            svg.selectAll('.bar')
                .on('mouseover', function(d) {
                    handleBarsMouseOver(this, d);
                })
                .on('mouseout', function(d) {
                    handleBarsMouseOut(this, d);
                });
        }

        /**
         * Adjusts the position of the y axis' ticks
         * @param  {D3Selection} selection Y axis group
         * @return void
         */
        function adjustYTickLabels(selection) {
            selection.selectAll('.tick text')
                .attr('transform', `translate(${yTickTextOffset['x']}, ${yTickTextOffset['y']})`);
        }

        /**
         * Creates the d3 x and y axis, setting orientations
         * @private
         */
        function buildAxis() {
            if (isHorizontal) {
                xAxis = d3Axis.axisBottom(xScale)
                    .ticks(xTicks, valueLabelFormat);
                yAxis = d3Axis.axisLeft(yScale)
            } else {
                xAxis = d3Axis.axisBottom(xScale)
                yAxis = d3Axis.axisLeft(yScale)
                    .ticks(yTicks, valueLabelFormat)
            }
        }

        /**
         * Builds containers for the chart, the axis and a wrapper for all of them
         * NOTE: The order of drawing of this group elements is really important,
         * as everything else will be drawn on top of them
         * @private
         */
        function buildContainerGroups() {
            let container = svg
                .append('g')
                .classed('container-group', true)
                .attr('transform', `translate(${margin.left},${margin.top})`);

            container
                .append('g').classed('x-axis-group', true)
                .append('g').classed('x axis', true);
            container.selectAll('.x-axis-group')
                .append('g').classed('month-axis', true);
            container
                .append('g').classed('y-axis-group axis', true);
            container
                .append('g').classed('y-axis-label', true);
            container
                .append('g').classed('grid-lines-group', true);
            container
                .append('g').classed('chart-group', true);
            container
                .append('g').classed('metadata-group', true);
        }

        /**
         * Builds the grouped layers layout
         * @return {D3Layout} Layout for drawing the chart
         * @private
         */
        function buildLayers() {
            layers = transformedData.map((item) => {
                let ret = {};

                groups.forEach((key) => {
                    ret[key] = item[key];
                });

                return assign({}, item, ret);
            });
        }

        /**
         * Creates the x, y and color scales of the chart
         * @private
         */
        function buildScales() {
            let yMax = d3Array.max(data.map(getValue));

            if (isHorizontal) {
                xScale = d3Scale.scaleLinear()
                    .domain([0, yMax])
                    .rangeRound([0, chartWidth - 1]);
                // 1 pix for edge tick

                yScale = d3Scale.scaleBand()
                    .domain(data.map(getName))
                    .rangeRound([chartHeight, 0])
                    .padding(0.1);

                yScale2 = d3Scale.scaleBand()
                    .domain(data.map(getGroup))
                    .rangeRound([yScale.bandwidth(), 0])
                    .padding(0.1);
            } else {
                xScale = d3Scale.scaleBand()
                    .domain(data.map(getName))
                    .rangeRound([0, chartWidth])
                    .padding(0.1);
                xScale2 = d3Scale.scaleBand()
                    .domain(data.map(getGroup))
                    .rangeRound([0, xScale.bandwidth()])
                    .padding(0.1);

                yScale = d3Scale.scaleLinear()
                    .domain([0, yMax])
                    .rangeRound([chartHeight, 0])
                    .nice();
            }

            colorScale = d3Scale.scaleOrdinal()
                .range(colorSchema)
                .domain(data.map(getGroup));

            categoryColorMap = colorScale
                .domain(data.map(getName)).domain()
                .reduce((memo, item) => {
                    data.forEach(function (v) {
                        if (getName(v) == item) {
                            memo[v.name] = colorScale(v.group)
                            memo[v.group] = colorScale(v.group)
                            memo[v.group + item] = colorScale(v.group)
                        }
                    })
                    return memo;
                }, {});
        }

        /**
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @private
         */
        function buildSVG(container) {
            if (!svg) {
                svg = d3Selection.select(container)
                    .append('svg')
                    .classed('britechart grouped-bar', true);

                buildContainerGroups();
            }

            svg
                .attr('width', width)
                .attr('height', height);
        }

        /**
         * Cleaning data casting the values, groups, topic names and names to the proper type while keeping
         * the rest of properties on the data
         * @param  {GroupedBarChartData} originalData   Raw data from the container
         * @return {GroupedBarChartData}                Parsed data with values and dates
         * @private
         */
        function cleanData(originalData) {
            return originalData.reduce((acc, d) => {
                    d.value = +d[valueLabel];
                    d.group = d[groupLabel];
                    // for tooltip
                    d.topicName = getGroup(d);
                    d.name = d[nameLabel];

                    return [...acc, d];
                }, []);
        }

        /**
         * Draws the x and y axis on the svg object within their
         * respective groups
         * @private
         */
        function drawAxis() {
            if (isHorizontal) {
                svg.select('.x-axis-group .axis.x')
                    .attr('transform', `translate( 0, ${chartHeight} )`)
                    .call(xAxis);

                svg.select('.y-axis-group.axis')
                    .attr('transform', `translate( ${-xAxisPadding.left}, 0)`)
                    .call(yAxis);
            } else {
                svg.select('.x-axis-group .axis.x')
                    .attr('transform', `translate( 0, ${chartHeight} )`)
                    .call(xAxis);

                svg.select('.y-axis-group.axis')
                    .attr('transform', `translate( ${-xAxisPadding.left}, 0)`)
                    .call(yAxis)
                    .call(adjustYTickLabels);
            }

            if (yAxisLabel) {
                if (yAxisLabelEl) {
                    svg.selectAll('.y-axis-label-text').remove();
                }

                yAxisLabelEl = svg.select('.y-axis-label')
                    .append('text')
                        .classed('y-axis-label-text', true)
                        .attr('x', -chartHeight / 2)
                        .attr('y', yAxisLabelOffset)
                        .attr('text-anchor', 'middle')
                        .attr('transform', 'rotate(270 0 0)')
                        .text(yAxisLabel)
            }
        }

        /**
         * Draws a vertical line to extend x-axis till the edges
         * @return {void}
         */
        function drawHorizontalExtendedLine() {
            baseLine = svg.select('.grid-lines-group')
                .selectAll('line.extended-x-line')
                .data([0])
                .enter()
                  .append('line')
                    .attr('class', 'extended-x-line')
                    .attr('x1', (xAxisPadding.left))
                    .attr('x2', chartWidth)
                    .attr('y1', chartHeight)
                    .attr('y2', chartHeight);
        }

        /**
         * Draws a vertical line to extend y-axis till the edges
         * @return {void}
         */
        function drawVerticalExtendedLine() {
            baseLine = svg.select('.grid-lines-group')
                .selectAll('line.extended-y-line')
                .data([0])
                .enter()
                  .append('line')
                    .attr('class', 'extended-y-line')
                    .attr('y1', (xAxisPadding.bottom))
                    .attr('y2', chartHeight)
                    .attr('x1', 0)
                    .attr('x2', 0);
        }

        /**
         * Draws grid lines on the background of the chart
         * @return void
         */
        function drawGridLines() {
            let scale = isHorizontal ? xScale : yScale;

            svg.select('.grid-lines-group')
                .selectAll('line')
                .remove();

            if (grid === 'horizontal' || grid === 'full') {
                svg.select('.grid-lines-group')
                    .selectAll('line.horizontal-grid-line')
                    .data(scale.ticks(yTicks).slice(1))
                    .enter()
                      .append('line')
                        .attr('class', 'horizontal-grid-line')
                        .attr('x1', (-xAxisPadding.left + 1))
                        .attr('x2', chartWidth)
                        .attr('y1', (d) => yScale(d))
                        .attr('y2', (d) => yScale(d));
            }

            if (grid === 'vertical' || grid === 'full') {
                svg.select('.grid-lines-group')
                    .selectAll('line.vertical-grid-line')
                    .data(scale.ticks(xTicks).slice(1))
                    .enter()
                      .append('line')
                        .attr('class', 'vertical-grid-line')
                        .attr('y1', 0)
                        .attr('y2', chartHeight)
                        .attr('x1', (d) => xScale(d))
                        .attr('x2', (d) => xScale(d));
            }

            if (isHorizontal) {
                drawVerticalExtendedLine();
            } else {
                drawHorizontalExtendedLine();
            }
        }

        /**
         * Draws the bars along the x axis
         * @param  {D3Selection} layersSelection Selection of layers
         * @return {void}
         */
        function drawHorizontalBars(layersSelection) {
            let layerJoin = layersSelection
                .data(layers);

            layerElements = layerJoin
                .enter()
                  .append('g')
                    .attr('transform', ({key}) => `translate(0,${yScale(key)})`)
                    .classed('layer', true);

            let barJoin = layerElements
                .selectAll('.bar')
                .data(({values}) => values);

            // Enter + Update
            let bars = barJoin
                    .enter()
                      .append('rect')
                        .classed('bar', true)
                        .attr('x', 1)
                        .attr('y', (d) => yScale2(getGroup(d)))
                        .attr('height', yScale2.bandwidth())
                        .attr('fill', (({group}) => categoryColorMap[group]));

            if (isAnimated) {
                bars.style('opacity', barOpacity)
                    .transition()
                    .delay((_, i) => animationDelays[i])
                    .duration(animationDuration)
                    .ease(ease)
                    .tween('attr.width', horizontalBarsTween);
            } else {
                bars.attr('width', (d) => xScale(getValue(d)));
            }
        }

        /**
         * Draws the bars along the y axis
         * @param  {D3Selection} layersSelection Selection of layers
         * @return {void}
         */
        function drawVerticalBars(layersSelection) {
            let layerJoin = layersSelection
                .data(layers);

            layerElements = layerJoin
                .enter()
                .append('g')
                  .attr('transform', ({key}) => `translate(${xScale(key)},0)`)
                  .classed('layer', true);

            let barJoin = layerElements
                  .selectAll('.bar')
                  .data(({values}) => values);

            let bars = barJoin
                  .enter()
                    .append('rect')
                      .classed('bar', true)
                      .attr('x', (d) => xScale2(getGroup(d)))
                      .attr('y', ({value}) => yScale(value))
                      .attr('width', xScale2.bandwidth)
                      .attr('fill', (({group}) => categoryColorMap[group]));

            if (isAnimated) {
                bars.style('opacity', barOpacity)
                    .transition()
                    .delay((_, i) => animationDelays[i])
                    .duration(animationDuration)
                    .ease(ease)
                    .tween('attr.height', verticalBarsTween);
            } else {
                bars.attr('height', (d) => chartHeight - yScale(getValue(d)));
            }
        }

        /**
         * Draws the different areas into the chart-group element
         * @private
         */
        function drawGroupedBar() {
            // Not ideal, we need to figure out how to call exit for nested elements
            if (layerElements) {
                svg.selectAll('.layer').remove();
            }

            let series = svg.select('.chart-group').selectAll('.layer');

            if (isHorizontal) {
                drawHorizontalBars(series);
            } else {
                drawVerticalBars(series);
            }

            // Exit
            series.exit()
                .transition()
                .style('opacity', 0)
                .remove();
        }

        /**
         * Extract X position on the chart from a given mouse event
         * @param  {obj} event D3 mouse event
         * @return {Number}       Position on the x axis of the mouse
         * @private
         */
        function getMousePosition(event) {
            return d3Selection.mouse(event);
        }

        /**
         * Finds out the data entry that is closer to the given position on pixels
         * @param  {Number} mouseX X position of the mouse
         * @return {obj}        Data entry that is closer to that x axis position
         */
        function getNearestDataPoint(mouseX) {
            let adjustedMouseX = mouseX - margin.left,
                epsilon = xScale2.bandwidth(),
                nearest = [];

            layers.forEach(function (data) {
                let found = data.values.find((d2) => Math.abs(adjustedMouseX >= xScale(d2[nameLabel]) + xScale2(d2[groupLabel])) && Math.abs(adjustedMouseX - xScale2(d2[groupLabel]) - xScale(d2[nameLabel]) <= epsilon));

                if (found) {
                    found.values = data.values;
                    found.key = found.name;
                    nearest.push(found);
                }

            });

            return nearest.length ? nearest[0] : undefined;
        }

        /**
        * Finds out the data entry that is closer to the given position on pixels
        * @param  {Number} mouseX X position of the mouse
        * @return {obj}        Data entry that is closer to that x axis position
        */
        function getNearestDataPoint2(mouseY) {
            let adjustedMouseY = mouseY - margin.bottom,
                epsilon = yScale.bandwidth(),
                nearest = [];

            layers.map(function (data) {
                let found = data.values.find((d2) => Math.abs(adjustedMouseY >= yScale(d2[nameLabel])) && Math.abs(adjustedMouseY - yScale(d2[nameLabel]) <= epsilon * 2));

                if (found) {
                    found.values = data.values;
                    found.key = found.name;
                    nearest.push(found)
                }
            });

            return nearest.length ? nearest[0] : undefined;
        }

        /**
         * Handles a mouseover event on top of a bar
         * @param  {obj} e the fired event
         * @param  {obj} d data of bar
         * @return {void}
         */
        function handleBarsMouseOver(e, d) {
            d3Selection.select(e)
                .attr('fill', () => d3Color.color(categoryColorMap[d.group]).darker());
        }

        /**
         * Handles a mouseout event out of a bar
         * @param  {obj} e the fired event
         * @param  {obj} d data of bar
         * @return {void}
         */
        function handleBarsMouseOut(e, d) {
            d3Selection.select(e)
                .attr('fill', () => categoryColorMap[d.group])
        }

        /**
         * MouseMove handler, calculates the nearest dataPoint to the cursor
         * and updates metadata related to it
         * @param  {obj} e the fired event
         * @private
         */
        function handleMouseMove(e) {
            let [mouseX, mouseY] = getMousePosition(e),
                dataPoint = isHorizontal ? getNearestDataPoint2(mouseY) : getNearestDataPoint(mouseX),
                x,
                y;

            if (dataPoint) {
                // Move verticalMarker to that datapoint
                if (isHorizontal) {
                    x = mouseX - margin.left;
                    y = yScale(dataPoint.key) + yScale.bandwidth() / 2;
                } else {
                    x = xScale(dataPoint.key) + xScale2(dataPoint[groupLabel]);
                    y = mouseY - margin.bottom;
                }
                moveTooltipOriginXY(x, y);

                // Emit event with xPosition for tooltip or similar feature
                dispatcher.call('customMouseMove', e, dataPoint, categoryColorMap, x, y);
            }
        }

        /**
         * Click handler, shows data that was clicked and passes to the user
         * @private
         */
        function handleCustomClick (e, d) {
            let [mouseX, mouseY] = getMousePosition(e);
            let dataPoint = isHorizontal ? getNearestDataPoint2(mouseY) : getNearestDataPoint(mouseX);

            dispatcher.call('customClick', e, dataPoint, d3Selection.mouse(e));
        }

        /**
         * MouseOut handler, hides overlay and removes active class on verticalMarkerLine
         * It also resets the container of the vertical marker
         * @private
         */
        function handleMouseOut(e, d) {
            svg.select('.metadata-group').attr('transform', 'translate(9999, 0)');
            dispatcher.call('customMouseOut', e, d, d3Selection.mouse(e));
        }

        /**
         * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
         * @private
         */
        function handleMouseOver(e, d) {
            dispatcher.call('customMouseOver', e, d, d3Selection.mouse(e));
        }

        /**
         * Animation tween of horizontal bars
         * @param  {obj} d data of bar
         * @return {void}
         */
        function horizontalBarsTween(d) {
            let node = d3Selection.select(this),
                i = d3Interpolate.interpolateRound(0, xScale(getValue(d))),
                j = d3Interpolate.interpolateNumber(0, 1);

            return function (t) {
                node.attr('width', i(t))
                    .style('opacity', j(t));
            }
        }

        /**
         * Helper method to update the x position of the vertical marker
         * @param  {obj} dataPoint Data entry to extract info
         * @return void
         */
        function moveTooltipOriginXY(originXPosition, originYPosition) {
            svg.select('.metadata-group')
                .attr('transform', `translate(${originXPosition},${originYPosition})`);
        }

        /**
         * Prepare data for create chart.
         * @private
         */
        function prepareData(data) {
            groups = uniq(data.map((d) => getGroup(d)));
            transformedData = d3Collection.nest()
                .key(getName)
                .rollup(function (values) {
                    let ret = {};

                    values.forEach((entry) => {
                        if (entry && entry[groupLabel]) {
                            ret[entry[groupLabel]] = getValue(entry);
                        }
                    });
                    //for tooltip
                    ret.values = values;
                    return ret;
                })
                .entries(data)
                .map(function (data) {
                    return assign({}, {
                        total: d3Array.sum(d3Array.permute(data.value, groups)),
                        key: data.key
                    }, data.value);
                });
        }

        /**
         * Determines if we should add the tooltip related logic depending on the
         * size of the chart and the tooltipThreshold variable value
         * @return {boolean} Should we build the tooltip?
         * @private
         */
        function shouldShowTooltip() {
            return width > tooltipThreshold;
        }

        /**
         * Animation tween of vertical bars
         * @param  {obj} d data of bar
         * @return {void}
         */
        function verticalBarsTween(d) {
            let node = d3Selection.select(this),
                i = d3Interpolate.interpolateRound(0, chartHeight - yScale(getValue(d))),
                y = d3Interpolate.interpolateRound(chartHeight, yScale(getValue(d))),
                j = d3Interpolate.interpolateNumber(0, 1);

            return function (t) {
                node.attr('y', y(t))
                    .attr('height', i(t)).style('opacity', j(t));
            }
        }

        // API

        /**
         * Gets or Sets the aspect ratio of the chart
         * @param  {Number} _x Desired aspect ratio for the graph
         * @return { (Number | Module) } Current aspect ratio or Area Chart module to chain calls
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
         * Gets or Sets the colorSchema of the chart
         * @param  {String[]} _x Desired colorSchema for the graph
         * @return { colorSchema | module} Current colorSchema or Chart module to chain calls
         * @public
         */
        exports.colorSchema = function (_x) {
            if (!arguments.length) {
                return colorSchema;
            }
            colorSchema = _x;

            return this;
        };

        /**
         * Chart exported to png and a download action is fired
         * @param {String} filename     File title for the resulting picture
         * @param {String} title        Title to add at the top of the exported picture
         * @public
         */
        exports.exportChart = function (filename, title) {
            exportChart.call(exports, svg, filename, title);
        };

        /**
         * Gets or Sets the groupLabel of the chart
         * @param  {String} _x Desired groupLabel for the graph
         * @return { groupLabel | module} Current groupLabel or Chart module to chain calls
         * @public
         */
        exports.groupLabel = function (_x) {
            if (!arguments.length) {
                return groupLabel;
            }
            groupLabel = _x;

            return this;
        };

        /**
         * Gets or Sets the grid mode.
         *
         * @param  {String} _x Desired mode for the grid ('vertical'|'horizontal'|'full')
         * @return { String | module} Current mode of the grid or Area Chart module to chain calls
         * @public
         */
        exports.grid = function (_x) {
            if (!arguments.length) {
                return grid;
            }
            grid = _x;

            return this;
        };

        /**
         * Gets or Sets the height of the chart
         * @param  {Number} _x Desired width for the graph
         * @return { height | module} Current height or Area Chart module to chain calls
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
         * Gets or Sets the horizontal direction of the chart
         * @param  {number} _x Desired horizontal direction for the graph
         * @return { isHorizontal | module} If it is horizontal or Bar Chart module to chain calls
         * @public
         */
        exports.isHorizontal = function (_x) {
            if (!arguments.length) {
                return isHorizontal;
            }
            isHorizontal = _x;

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
        exports.isAnimated = function (_x) {
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
         * @param  {Object} _x Margin object to get/set
         * @return { margin | module} Current margin or Area Chart module to chain calls
         * @public
         */
        exports.margin = function (_x) {
            if (!arguments.length) {
                return margin;
            }
            margin = _x;

            return this;
        };

        /**
         * Gets or Sets the nameLabel of the chart
         * @param  {Number} _x Desired dateLabel for the graph
         * @return { nameLabel | module} Current nameLabel or Chart module to chain calls
         * @public
         */
        exports.nameLabel = function (_x) {
            if (!arguments.length) {
                return nameLabel;
            }
            nameLabel = _x;

            return this;
        };

        /**
         * Gets or Sets the number of ticks of the y axis on the chart
         * @param  {Number} _x          Desired vertical ticks
         * @return {Number | module}    Current yTicks or Chart module to chain calls
         * @public
         */
        exports.yTicks = function (_x) {
            if (!arguments.length) {
                return yTicks;
            }
            yTicks = _x;

            return this;
        };

        /**
         * Exposes an 'on' method that acts as a bridge with the event dispatcher
         * We are going to expose this events:
         * customMouseOver, customMouseMove, customMouseOut, and customClick
         *
         * @return {module} Bar Chart
         * @public
         */
        exports.on = function () {
            let value = dispatcher.on.apply(dispatcher, arguments);

            return value === dispatcher ? exports : value;
        };

        /**
         * Gets or Sets the minimum width of the graph in order to show the tooltip
         * NOTE: This could also depend on the aspect ratio
         *
         * @param  {Number} [_x=480] Minimum width of chart to show the tooltip
         * @return {Number | module} Current tooltipThreshold or Area Chart module to chain calls
         * @public
         */
        exports.tooltipThreshold = function (_x) {
            if (!arguments.length) {
                return tooltipThreshold;
            }
            tooltipThreshold = _x;

            return this;
        };

        /**
         * Gets or Sets the valueLabel of the chart
         * @param  {Number} _x Desired valueLabel for the graph
         * @return {Number | module} Current valueLabel or Chart module to chain calls
         * @public
         */
        exports.valueLabel = function (_x) {
            if (!arguments.length) {
                return valueLabel;
            }
            valueLabel = _x;

            return this;
        };

        /**
         * Gets or Sets the valueLabelFormat of the chart
         * @param  {String[]} _x Desired valueLabelFormat for the graph
         * @return {String[] | module} Current valueLabelFormat or Chart module to chain calls
         * @public
         */
        exports.valueLabelFormat = function (_x) {
            if (!arguments.length) {
                return valueLabelFormat;
            }
            valueLabelFormat = _x;

            return this;
        };

        /**
         * Gets or Sets the width of the chart
         * @param  {Number} _x Desired width for the graph
         * @return {Number | module} Current width or Area Chart module to chain calls
         * @public
         */
        exports.width = function (_x) {
            if (!arguments.length) {
                return width;
            }
            if (aspectRatio) {
                height = Math.ceil(_x * aspectRatio);
            }
            width = _x;

            return this;
        };

        /**
         * Gets or Sets the number of ticks of the x axis on the chart
         * @param  {Number} _x Desired xTicks
         * @return {Number | module} Current xTicks or Chart module to chain calls
         * @public
         */
        exports.xTicks = function (_x) {
            if (!arguments.length) {
                return xTicks;
            }
            xTicks = _x;

            return this;
        };

        /**
         * Gets or Sets the y-axis label of the chart
         * @param  {String} _x Desired label string
         * @return {String | module} Current yAxisLabel or Chart module to chain calls
         * @public
         * @example groupedBar.yAxisLabel('Ticket Sales')
         */
        exports.yAxisLabel = function (_x) {
            if (!arguments.length) {
                return yAxisLabel;
            }
            yAxisLabel = _x;

            return this;
        };

        /**
         * Gets or Sets the offset of the yAxisLabel of the chart.
         * The method accepts both positive and negative values.
         * The default value is -60
         * @param  {Number} _x Desired offset for the label
         * @return {Number | module} Current yAxisLabelOffset or Chart module to chain calls
         * @public
         * @example groupedBar.yAxisLabelOffset(-55)
         */
        exports.yAxisLabelOffset = function (_x) {
            if (!arguments.length) {
                return yAxisLabelOffset;
            }
            yAxisLabelOffset = _x;

            return this;
        }

        /**
         * Gets or Sets the x and y offset of ticks of the y axis on the chart
         * @param  {Object} _x Desired offset
         * @return {Object | module} Current offset or Chart module to chain calls
         * @public
         */
        exports.yTickTextOffset = function (_x) {
            if (!arguments.length) {
                return yTickTextOffset;
            }
            yTickTextOffset = _x;

            return this;
        };

        return exports;
    };
});
