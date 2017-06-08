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

    const { exportChart } = require('./helpers/exportChart');
    const colorHelper = require('./helpers/colors');
    const NUMBER_FORMAT = ',f';
    const uniq = (arrArg) => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) == pos);


    /**
     * @typdef D3Layout
     * @type function
     */

    /**
     * @typedef GroupedBarChartData
     * @type {Object}
     * @property {Object[]} data       All data entries
     * @property {String} name         Name of the entry
     * @property {String} group        group of the entry
     * @property {Number} value        Value of the entry
     *
     * @example
     * {
     *     'data': [
     *         {
     *             "name": "2011-01",
     *             "group": "Direct",
     *             "value": 0
     *         }
     *     ]
     * }
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

            xScale,
            xScale2,
            xAxis,
            yScale,
            yScale2,
            yAxis,

            aspectRatio = null,

            verticalTicks = 5,
            yTickTextYOffset = -8,
            yTickTextXOffset = -20,

            numOfVerticalTicks = 5,
            numOfHorizontalTicks = 5,
            percentageAxisToMaxRatio = 1,

            colorSchema = colorHelper.colorSchemas.britechartsColorSchema,

            colorScale,
            categoryColorMap,

            layers,

            ease = d3Ease.easeQuadInOut,
            horizontal = false,

            svg,
            chartWidth, chartHeight,
            data,
            groups,

            transformedData,

            tooltipThreshold = 480,

            xAxisPadding = {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            },
            maxBarNumber = 8,

            animationDelayStep = 20,
            animationDelays = d3Array.range(animationDelayStep, maxBarNumber * animationDelayStep, animationDelayStep),
            animationDuration = 1000,

            grid = null,

            nameLabel = 'name',
            valueLabel = 'value',
            groupLabel = 'group',
            nameLabelFormat,
            valueLabelFormat = NUMBER_FORMAT,

            // getters
            getName = ({name}) => name,
            getValue = ({value}) => value,
            getGroup = ({group}) => group,
            isAnimated = false,

            // events
            dispatcher = d3Dispatch.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');

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
                if (shouldShowTooltip()) {
                    addMouseEvents();
                }
            });
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
         * Adds events to the container group if the environment is not mobile
         * Adding: mouseover, mouseout and mousemove
         */
        function addMouseEvents() {
            svg
                .on('mouseover', handleMouseOver)
                .on('mouseout', handleMouseOut)
                .on('mousemove', handleMouseMove);
        }

        /**
         * Creates the d3 x and y axis, setting orientations
         * @private
         */
        function buildAxis() {
            if (!horizontal) {
                xAxis = d3Axis.axisBottom(xScale)
                yAxis = d3Axis.axisLeft(yScale)
                    .ticks(numOfVerticalTicks, valueLabelFormat)
            } else {
                xAxis = d3Axis.axisBottom(xScale)
                    .ticks(numOfHorizontalTicks, valueLabelFormat);
                yAxis = d3Axis.axisLeft(yScale)
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

            if (!horizontal) {
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
            } else {
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
         * Parses dates and values into JS Date objects and numbers
         * @param  {obj} data Raw data from JSON file
         * @return {obj}      Parsed data with values and dates
         */
        function cleanData(data) {
            return data.map((d) => {
                d.value = +d[valueLabel];
                d.group = d[groupLabel];
                // for tooltip
                d.topicName = getGroup(d);
                d.name = d[nameLabel];

                return d;
            });
        }

        /**
         * Draws the x and y axis on the svg object within their
         * respective groups
         * @private
         */
        function drawAxis() {
            if (!horizontal) {
                svg.select('.x-axis-group .axis.x')
                    .attr('transform', `translate( 0, ${chartHeight} )`)
                    .call(xAxis);

                svg.select('.y-axis-group.axis')
                    .attr('transform', `translate( ${-xAxisPadding.left}, 0)`)
                    .call(yAxis)
                    .call(adjustYTickLabels);
            } else {
                svg.select('.x-axis-group .axis.x')
                    .attr('transform', `translate( 0, ${chartHeight} )`)
                    .call(xAxis);

                svg.select('.y-axis-group.axis')
                    .attr('transform', `translate( ${-xAxisPadding.left}, 0)`)
                    .call(yAxis);
            }
        }

        /**
         * Adjusts the position of the y axis' ticks
         * @param  {D3Selection} selection Y axis group
         * @return void
         */
        function adjustYTickLabels(selection) {
            selection.selectAll('.tick text')
                .attr('transform', `translate(${yTickTextXOffset}, ${yTickTextYOffset})`);
        }

        /**
         * Draws grid lines on the background of the chart
         * @return void
         */
        function drawGridLines(xTicks, yTicks) {
            if (grid === 'horizontal' || grid === 'full') {
                svg.select('.grid-lines-group')
                    .selectAll('line.horizontal-grid-line')
                    .data(yScale.ticks(yTicks).slice(1))
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
                    .data(xScale.ticks(xTicks).slice(1))
                    .enter()
                      .append('line')
                        .attr('class', 'vertical-grid-line')
                        .attr('y1', 0)
                        .attr('y2', chartHeight)
                        .attr('x1', (d) => xScale(d))
                        .attr('x2', (d) => xScale(d));
            }
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
                node.attr('width', i(t)).style('opacity', j(t));
            }
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

        /**
         * mouseover event handle of bars
         * @param  {obj} d data of bar
         * @return {void}
         */
        function barsOnMouseOver(d) {
            dispatcher.call('customMouseOver', this);
            d3Selection.select(this).attr('fill', () => d3Color.color(categoryColorMap[d.group]).darker())
        }

        /**
         * mousemove event handle of bars
         * @param  {obj} d data of bar
         * @return {void}
         */
        function barsOnMouseMove(d) {
            let data = assign({}, this.__data__), [x, y] = d3Selection.mouse(this);

            data.values = this.parentNode.__data__.values;
            dispatcher.call('customMouseMove', this, data, categoryColorMap, x, y);
        }

        /**
         * mouseout event handle of bars
         * @param  {obj} d data of bar
         * @return {void}
         */
        function barsOnMouseOut(d) {
            dispatcher.call('customMouseOut', this);
            d3Selection.select(this).attr('fill', () => categoryColorMap[d.group])
        }

        /**
         * Draws the bars along the x axis
         * @param  {D3Selection} bars Selection of bars
         * @return {void}
         */
        function drawHorizontalBars(series) {
            // Enter + Update
            let bars = series
                .data(layers)
                .enter()
                  .append('g')
                    .attr('transform', function (d) { return 'translate(0,' + yScale(d.key) + ')'; })
                    .classed('layer', true)
                    .selectAll('.bar')
                    .data((d) => d.values)
                    .enter()
                      .append('rect')
                        .classed('bar', true)
                        .attr('x', 1)
                        .attr('y', (d) => yScale2(getGroup(d)))
                        .attr('height', yScale2.bandwidth())
                        .attr('fill', ((data) => categoryColorMap[data.group]));

            if (isAnimated) {
                bars.style('opacity', 0.24)
                    .transition()
                    .delay((_, i) => animationDelays[i])
                    .duration(animationDuration)
                    .ease(ease)
                    .tween('attr.width', horizontalBarsTween);
            } else {
                bars.attr('width', (d) => xScale(getValue(d)))
            }

            bars.on('mouseover', barsOnMouseOver)
                .on('mousemove', barsOnMouseMove)
                .on('mouseout', barsOnMouseOut);
        }

        /**
         * Draws the bars along the y axis
         * @param  {D3Selection} bars Selection of bars
         * @return {void}
         */
        function drawVerticalBars(series) {
            // Enter + Update
            let bars = series
                .data(layers)
                .enter()
                .append('g')
                  .attr('transform', function (d) { return 'translate(' + xScale(d.key) + ',0)'; })
                  .classed('layer', true)
                  .selectAll('.bar')
                  .data((d) => d.values)
                  .enter()
                    .append('rect')
                      .classed('bar', true)
                      .attr('x', (d) => xScale2(getGroup(d)))
                      .attr('y', (d) => yScale(d.value))
                      .attr('width', xScale2.bandwidth)
                      .attr('fill', ((data) => categoryColorMap[data.group]));

            if (isAnimated) {
                bars.style('opacity', 0.24).transition()
                    .delay((_, i) => animationDelays[i])
                    .duration(animationDuration)
                    .ease(ease)
                    .tween('attr.height', verticalBarsTween);
            } else {
                bars.attr('height', (d) => chartHeight - yScale(getValue(d)));
            }

            bars.on('mouseover', barsOnMouseOver)
                .on('mousemove', barsOnMouseMove)
                .on('mouseout', barsOnMouseOut);
        }

        /**
         * Draws the different areas into the chart-group element
         * @private
         */
        function drawGroupedBar() {
            let series = svg.select('.chart-group').selectAll('.layer')

            if (!horizontal) {
                drawVerticalBars(series)
            } else {
                drawHorizontalBars(series)
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
        function getNearestDataPoint(pos) {
            let mouseX = pos[0] - margin.left,
                epsilon = xScale2.bandwidth(),
                nearest = [];

            layers.forEach(function (data) {
                let found = data.values.find((d2) => Math.abs(mouseX >= xScale(d2[nameLabel]) + xScale2(d2[groupLabel])) && Math.abs(mouseX - xScale2(d2[groupLabel]) - xScale(d2[nameLabel]) <= epsilon));

                if (found) {
                    found.values = data.values;
                    found.key = found.name;
                    nearest.push(found)
                }

            });

            return nearest.length ? nearest[0] : undefined;
        }

        /**
        * Finds out the data entry that is closer to the given position on pixels
        * @param  {Number} mouseX X position of the mouse
        * @return {obj}        Data entry that is closer to that x axis position
        */
        function getNearestDataPoint2(pos) {
            let mouseY = pos[1] - margin.bottom,
                epsilon = yScale.bandwidth(),
                nearest = [];

            layers.map(function (data) {
                let found = data.values.find((d2) => Math.abs(mouseY >= yScale(d2[nameLabel])) && Math.abs(mouseY - yScale(d2[nameLabel]) <= epsilon * 2));

                if (found) {
                    found.values = data.values;
                    found.key = found.name;
                    nearest.push(found)
                }
            });

            return nearest.length ? nearest[0] : undefined;
        }

        /**
         * MouseMove handler, calculates the nearest dataPoint to the cursor
         * and updates metadata related to it
         * @private
         */
        function handleMouseMove() {
            let mousePos = getMousePosition(this),
                dataPoint = !horizontal ? getNearestDataPoint(mousePos) : getNearestDataPoint2(mousePos),
                x,
                y;

            if (dataPoint) {
                // Move verticalMarker to that datapoint
                if (!horizontal) {
                    x = xScale(dataPoint.key) + xScale2(dataPoint[groupLabel]),
                    y = yScale(getValue(dataPoint));
                    moveVerticalMarkerXY(x, y);
                } else {
                    x = mousePos[1],
                    y = yScale(dataPoint.key) + yScale.bandwidth() / 2;
                    moveVerticalMarkerXY(x, y);
                }
                // Emit event with xPosition for tooltip or similar feature
                dispatcher.call('customMouseMove', this, dataPoint, categoryColorMap, x, y);
            }
        }

        /**
         * MouseOut handler, hides overlay and removes active class on verticalMarkerLine
         * It also resets the container of the vertical marker
         * @private
         */
        function handleMouseOut(data) {
            svg.select('.metadata-group').attr('transform', 'translate(9999, 0)');
            dispatcher.call('customMouseOut', this, data);
        }

        /**
         * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
         * @private
         */
        function handleMouseOver(data) {
            dispatcher.call('customMouseOver', this, data);
        }

        /**
         * Helper method to update the x position of the vertical marker
         * @param  {obj} dataPoint Data entry to extract info
         * @return void
         */
        function moveVerticalMarkerXY(verticalMarkerXPosition, verticalMarkerYPosition) {
            svg.select('.metadata-group').attr('transform', `translate(${verticalMarkerXPosition},${verticalMarkerYPosition})`);
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
         * Gets or Sets the valueLabelFormat of the chart
         * @param  {String[]} _x Desired valueLabelFormat for the graph
         * @return { valueLabelFormat | module} Current valueLabelFormat or Chart module to chain calls
         * @public
         */
        exports.nameLabelFormat = function (_x) {
            if (!arguments.length) {
                return nameLabelFormat;
            }
            nameLabelFormat = _x;

            return this;
        };

        /**
         * Configurable extension of the x axis
         * if your max point was 50% you might want to show x axis to 60%, pass 1.2
         * @param  {number} _x ratio to max data point to add to the x axis
         * @return { ratio | module} Current ratio or Bar Chart module to chain calls
         * @public
         */
        exports.percentageAxisToMaxRatio = function (_x) {
            if (!arguments.length) {
                return percentageAxisToMaxRatio;
            }
            percentageAxisToMaxRatio = _x;

            return this;
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
         * @return { horizontal | module} Current horizontal direction or Bar Chart module to chain calls
         * @public
         */
        exports.horizontal = function (_x) {
            if (!arguments.length) {
                return horizontal;
            }
            horizontal = _x;

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
         * Gets or Sets the minimum width of the graph in order to show the tooltip
         * NOTE: This could also depend on the aspect ratio
         *
         * @param  {Object} _x Margin object to get/set
         * @return { tooltipThreshold | module} Current tooltipThreshold or Area Chart module to chain calls
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
         * @return { valueLabel | module} Current valueLabel or Chart module to chain calls
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
         * @return { valueLabelFormat | module} Current valueLabelFormat or Chart module to chain calls
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
         * Gets or Sets the number of verticalTicks of the yAxis on the chart
         * @param  {Number} _x Desired verticalTicks
         * @return { verticalTicks | module} Current verticalTicks or Chart module to chain calls
         * @public
         */
        exports.verticalTicks = function (_x) {
            if (!arguments.length) {
                return verticalTicks;
            }
            verticalTicks = _x;

            return this;
        };

        /**
         * Gets or Sets the width of the chart
         * @param  {Number} _x Desired width for the graph
         * @return { width | module} Current width or Area Chart module to chain calls
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
         * Chart exported to png and a download action is fired
         * @public
         */
        exports.exportChart = function (filename, title) {
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
        exports.on = function () {
            let value = dispatcher.on.apply(dispatcher, arguments);

            return value === dispatcher ? exports : value;
        };

        return exports;
    };
});
