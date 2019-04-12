define(function(require){
    'use strict';

    const d3Array = require('d3-array');
    const d3Axis = require('d3-axis');
    const d3Collection = require('d3-collection');
    const d3Dispatch = require('d3-dispatch');
    const d3Ease = require('d3-ease');
    const d3Scale = require('d3-scale');
    const d3Shape = require('d3-shape');
    const d3Selection = require('d3-selection');
    const d3Transition = require('d3-transition');
    const d3TimeFormat = require('d3-time-format');
    const assign = require('lodash.assign');

    const { exportChart } = require('./helpers/export');
    const colorHelper = require('./helpers/color');
    const { getTimeSeriesAxis } = require('./helpers/axis');
    const { axisTimeCombinations, curveMap } = require('./helpers/constants');
    const {
        formatIntegerValue,
        formatDecimalValue,
        isInteger
    } = require('./helpers/number');
    const {
        createFilterContainer,
        createGlowWithMatrix,
        bounceCircleHighlight
    } = require('./helpers/filter');
    const {
        addDays,
        diffDays
    } = require('./helpers/date');
    const { stackedArea: stackedAreaLoadingMarkup } = require('./helpers/load');


    const uniq = (arrArg) => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos);


    /**
     * @typdef D3Layout
     * @type function
     */

    /**
     * @typedef areaChartData
     * @type {Object[]}
     * @property {String} date         Date of the entry in ISO8601 format (required)
     * @property {String} name         Name of the entry (required)
     * @property {Number} value        Value of the entry (required)
     *
     * @example
     * [
     *     {
     *         date: "2011-01-05T00:00:00Z",
     *         name: "Direct",
     *         value: 0
     *     }
     * ]
     */

    /**
     * Stacked Area Chart reusable API module that allows us
     * rendering a multi area and configurable chart.
     *
     * @module Stacked-area
     * @tutorial stacked-area
     * @requires d3-array, d3-axis, d3-collection, d3-ease, d3-scale, d3-shape, d3-selection, d3-time, d3-time-format
     *
     * @example
     * let stackedArea = stackedArea();
     *
     * stackedArea
     *     .width(containerWidth);
     *
     * d3Selection.select('.css-selector')
     *     .datum(dataset.data)
     *     .call(stackedArea);
     *
     */

    return function module() {

        let margin = {
                top: 70,
                right: 30,
                bottom: 60,
                left: 70
            },
            width = 960,
            height = 500,
            loadingState = stackedAreaLoadingMarkup,

            xScale, xAxis, xMonthAxis,
            yScale, yAxis,

            aspectRatio = null,

            monthAxisPadding = 30,
            yTicks = 5,
            yTickTextYOffset = -8,
            yAxisLabel,
            yAxisLabelEl,
            yAxisLabelOffset = -60,
            yTickTextXOffset = -20,
            tickPadding = 5,

            colorSchema = colorHelper.colorSchemas.britecharts,
            lineGradient = colorHelper.colorGradients.greenBlue,

            highlightFilter = null,
            highlightFilterId = null,
            highlightCircleSize = 12,
            highlightCircleRadius = 5,
            highlightCircleStroke = 1.2,
            highlightCircleActiveRadius = highlightCircleRadius + 2,
            highlightCircleActiveStrokeWidth = 5,
            highlightCircleActiveStrokeOpacity = 0.6,

            areaOpacity = 0.24,
            categoryColorMap,
            order,
            topicsOrder,

            xAxisFormat = null,
            xTicks = null,
            xAxisCustomFormat = null,
            locale,

            baseLine,
            areaCurve = 'monotoneX',

            layers,
            series,
            layersInitial,
            area,
            areaOutline,

            // Area Animation
            maxAreaNumber = 10,
            areaAnimationDelayStep = 20,
            areaAnimationDelays = d3Array.range(areaAnimationDelayStep, maxAreaNumber * areaAnimationDelayStep, areaAnimationDelayStep),

            overlay,
            overlayColor = 'rgba(0, 0, 0, 0)',
            verticalMarkerContainer,
            verticalMarkerLine,
            epsilon,

            dataPoints            = {},
            pointsSize            = 1.5,
            pointsColor           = '#c0c6cc',
            pointsBorderColor     = '#ffffff',

            isAnimated = false,
            ease = d3Ease.easeQuadInOut,
            areaAnimationDuration = 1000,

            hasOutline = true,

            svg,
            chartWidth, chartHeight,
            data,
            dataByDate,
            dataByDateFormatted,
            dataByDateZeroed,

            verticalGridLines,
            horizontalGridLines,
            grid = null,

            tooltipThreshold = 480,

            xAxisPadding = {
                top: 0,
                left: 15,
                bottom: 0,
                right: 0
            },

            dateLabel = 'date',
            valueLabel = 'value',
            keyLabel = 'name',

            emptyDataConfig = {
                minDate: new Date(new Date().setDate(new Date().getDate()-30)),
                maxDate: new Date(),
                maxY: 500
            },

            isUsingFakeData = false,

            // getters
            getName = ({name}) => name,
            getDate = ({date}) => date,

            // events
            dispatcher = d3Dispatch.dispatch(
                'customMouseOver',
                'customMouseOut',
                'customMouseMove',
                'customDataEntryClick',
                'customTouchMove'
            );

       /**
         * This function creates the graph using the selection and data provided
         * @param {D3Selection} _selection A d3 selection that represents
         * the container(s) where the chart(s) will be rendered
         * @param {areaChartData} _data The data to attach and generate the chart
         */
        function exports(_selection) {
            _selection.each(function(_data) {
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = cleanData(_data);
                dataByDate = getDataByDate(data);

                buildLayers();
                buildScales();
                buildSVG(this);
                buildAxis();
                drawAxis();
                drawStackedAreas();

                addTouchEvents();

                if (shouldShowTooltip()) {
                    drawHoverOverlay();
                    drawVerticalMarker();
                    addMouseEvents();
                }
            });
        }

        /**
         * Adds a filter to the element
         * @param {DOMElement} el
         * @private
         */
        function addGlowFilter(el) {
            if (!highlightFilter) {
                highlightFilter = createFilterContainer(svg.select('.metadata-group'));
                highlightFilterId = createGlowWithMatrix(highlightFilter);
            }

            let glowEl = d3Selection.select(el);

            glowEl
                .style('stroke-width', highlightCircleActiveStrokeWidth)
                .style('stroke-opacity', highlightCircleActiveStrokeOpacity)
                .attr('filter', `url(#${highlightFilterId})`);

            bounceCircleHighlight(
                glowEl,
                ease,
                highlightCircleActiveRadius
            );
        }

        /**
         * Adds events to the container group if the environment is not mobile
         * Adding: mouseover, mouseout and mousemove
         * @private
         */
        function addMouseEvents() {
            svg
                .on('mouseover', function(d) {
                    handleMouseOver(this, d);
                })
                .on('mouseout', function(d) {
                    handleMouseOut(this, d);
                })
                .on('mousemove',  function(d) {
                    handleMouseMove(this, d);
                });
        }

        /**
         * Adds events to the container group for the mobile environment
         * Adding: touchmove
         * @private
         */
        function addTouchEvents() {
            svg
                .on('touchmove', function(d) {
                    handleTouchMove(this, d);
                });
        }

        /**
         * Formats the value depending on its characteristics
         * @param  {Number} value Value to format
         * @return {Number}       Formatted value
         */
        function getFormattedValue(value) {
            let format;

            if (isInteger(value)) {
                format = formatIntegerValue;
            } else {
                format = formatDecimalValue;
            }

            return format(value);
        }

        /**
         * Creates the d3 x and y axis, setting orientations
         * @private
         */
        function buildAxis() {
            let minor, major;

            if (xAxisFormat === 'custom' && typeof xAxisCustomFormat === 'string') {
                minor = {
                    tick: xTicks,
                    format:  d3TimeFormat.timeFormat(xAxisCustomFormat)
                };
                major = null;
            } else {
                ({minor, major} = getTimeSeriesAxis(dataByDate, width, xAxisFormat, locale));

                xMonthAxis = d3Axis.axisBottom(xScale)
                    .ticks(major.tick)
                    .tickSize(0, 0)
                    .tickFormat(major.format);
            }

            xAxis = d3Axis.axisBottom(xScale)
                .ticks(minor.tick)
                .tickSize(10, 0)
                .tickPadding(tickPadding)
                .tickFormat(minor.format);


            yAxis = d3Axis.axisRight(yScale)
                .ticks(yTicks)
                .tickSize([0])
                .tickPadding(tickPadding)
                .tickFormat(getFormattedValue);

            drawGridLines(minor.tick, yTicks);
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
              .append('g').classed('y-axis-label', true);
            container
              .append('g').classed('chart-group', true);
            container
              .append('g').classed('metadata-group', true);
        }

        /**
         * Builds the stacked layers layout
         * @return {D3Layout} Layout for drawing the chart
         * @private
         */
        function buildLayers() {
            dataByDateFormatted = dataByDate
                .map(d => assign({}, d, d.values))
                .map(d => {
                    Object.keys(d).forEach(k => {
                        const entry = d[k];

                        if (entry && entry.name) {
                            d[entry.name] = entry.value;
                        }
                    });

                    return assign({}, d, {
                        date: new Date(d['key'])
                    });
                });

            dataByDateZeroed = dataByDate
                .map(d => assign({}, d, d.values))
                .map(d => {
                    Object.keys(d).forEach(k => {
                        const entry = d[k];

                        if (entry && entry.name) {
                            d[entry.name] = 0;
                        }
                    });

                    return assign({}, d, {
                        date: new Date(d['key'])
                    });
                });

            let initialTotalsObject = uniq(data.map(getName))
                                        .reduce((memo, key) => (
                                            assign({}, memo, {[key]: 0})
                                        ), {});

            let totals = data
                .reduce((memo, item) => (
                    assign({}, memo, {[item.name]: memo[item.name] += item.value})
                ), initialTotalsObject);

            order = topicsOrder || formatOrder(totals);

            let stack3 = d3Shape.stack()
                .keys(order)
                .order(d3Shape.stackOrderNone)
                .offset(d3Shape.stackOffsetNone);

            layersInitial = stack3(dataByDateZeroed);
            layers = stack3(dataByDateFormatted);
        }

        /**
         * Takes an object with all topics as keys and their aggregate totals as values,
         * sorts them into a list by descending total value and
         * moves "Other" to the end
         * @param  {Object} totals  Keys of all the topics and their corresponding totals
         * @return {Array}          List of topic names in aggregate order
         */
        function formatOrder(totals) {
            let order = Object.keys(totals)
                .sort((a, b) => {
                    if (totals[a] > totals[b]) return -1;
                    if (totals[a] === totals[b]) return 0;

                    return 1;
                });

            let otherIndex = order.indexOf('Other');

            if (otherIndex >= 0) {
                let other = order.splice(otherIndex, 1);

                order = order.concat(other);
            }

            return order;
        }

        /**
         * Creates the x, y and color scales of the chart
         * @private
         */
        function buildScales() {
            const maxValueByDate = isUsingFakeData ? emptyDataConfig.maxY : getMaxValueByDate();

            xScale = d3Scale.scaleTime()
                .domain(d3Array.extent(dataByDate, ({date}) => date))
                .rangeRound([0, chartWidth]);

            yScale = d3Scale.scaleLinear()
                .domain([0, maxValueByDate])
                .rangeRound([chartHeight, 0])
                .nice();

            categoryColorMap =  order.reduce((memo, topic, index) => (
                assign({}, memo, {[topic]: colorSchema[index]})
            ), {});
        }

        /**
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @private
         */
        function buildSVG(container) {
            if (!svg) {
                svg = d3Selection.select(container)
                    .append('svg')
                    .classed('britechart stacked-area', true);

                buildContainerGroups();
            }

            svg
                .attr('width', width)
                .attr('height', height);
        }

        /**
         * Creates fake data for when data is an empty array
         * @return {array}      Fake data built from emptyDataConfig settings
         */
        function createFakeData() {
            const numDays = diffDays(emptyDataConfig.minDate, emptyDataConfig.maxDate)
            const emptyArray = Array.apply(null, Array(numDays));

            isUsingFakeData = true;

            return [
                ...emptyArray.map((el, i) => ({
                    [dateLabel]: addDays(emptyDataConfig.minDate, i),
                    [valueLabel]: 0,
                    [keyLabel]: '1',
                })),
                ...emptyArray.map((el, i) => ({
                    [dateLabel]: addDays(emptyDataConfig.minDate, i),
                    [valueLabel]: 0,
                    [keyLabel]: '2',
                }))
            ];

        }

        /**
         * Cleaning data casting the values and dates to the proper type while keeping
         * the rest of properties on the data. It creates fake data is the data is empty.
         * @param  {areaChartData} originalData   Raw data from the container
         * @return {areaChartData}                Parsed data with values and dates
         * @private
         */
        function cleanData(originalData) {
            originalData = originalData.length === 0 ? createFakeData() : originalData;

            return originalData.reduce((acc, d) => {
                d.date = new Date(d[dateLabel]),
                d.value = +d[valueLabel]

                return [...acc, d];
            }, []);
        }

        /**
         * Draws the x and y axis on the svg object within their
         * respective groups
         * @private
         */
        function drawAxis() {
            svg.select('.x-axis-group .axis.x')
                .attr('transform', `translate( 0, ${chartHeight} )`)
                .call(xAxis);

            if (xAxisFormat !== 'custom') {
                svg.select('.x-axis-group .month-axis')
                    .attr('transform', `translate(0, ${(chartHeight + monthAxisPadding)})`)
                    .call(xMonthAxis);
            }

            svg.select('.y-axis-group.axis')
                .attr('transform', `translate( ${-xAxisPadding.left}, 0)`)
                .call(yAxis)
                .call(adjustYTickLabels);

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

            // Moving the YAxis tick labels to the right side
            // d3Selection.selectAll('.y-axis-group .tick text')
            //     .attr('transform', `translate( ${-chartWidth - yTickTextXOffset}, ${yTickTextYOffset})` );
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
         * Creates SVG dot elements for each data entry and draws them
         * TODO: Plug
         */
        function drawDataReferencePoints() {
            // Creates Dots on Data points
            var points = svg.select('.chart-group').selectAll('.dots')
                .data(layers)
                .enter()
                  .append('g')
                    .attr('class', 'dots')
                    .attr('d', ({values}) => area(values))
                    .attr('clip-path', 'url(#clip)');

            // Processes the points
            // TODO: Optimize this code
            points.selectAll('.dot')
                .data(({values}, index) => values.map((point) => ({index, point})))
                .enter()
                  .append('circle')
                    .attr('class','dot')
                    .attr('r', () => pointsSize)
                    .attr('fill', () => pointsColor)
                    .attr('stroke-width', '0')
                    .attr('stroke', pointsBorderColor)
                    .attr('transform', function(d) {
                        let {point} = d;
                        let key = xScale(point.date);

                        dataPoints[key] = dataPoints[key] || [];
                        dataPoints[key].push(d);

                        let {date, y, y0} = point;

                        return `translate( ${xScale(date)}, ${yScale(y + y0)} )`;
                    });
        }

        /**
         * Draws grid lines on the background of the chart
         * @return void
         */
        function drawGridLines(xTicks, yTicks) {
            svg.select('.grid-lines-group')
                .selectAll('line')
                .remove();

            if (grid === 'horizontal' || grid === 'full') {
                horizontalGridLines = svg.select('.grid-lines-group')
                    .selectAll('line.horizontal-grid-line')
                    .data(yScale.ticks(yTicks))
                    .enter()
                      .append('line')
                        .attr('class', 'horizontal-grid-line')
                        .attr('x1', (-xAxisPadding.left - 30))
                        .attr('x2', chartWidth)
                        .attr('y1', (d) => yScale(d))
                        .attr('y2', (d) => yScale(d));
            }

            if (grid === 'vertical' || grid === 'full') {
                verticalGridLines = svg.select('.grid-lines-group')
                    .selectAll('line.vertical-grid-line')
                    .data(xScale.ticks(xTicks))
                    .enter()
                      .append('line')
                        .attr('class', 'vertical-grid-line')
                        .attr('y1', 0)
                        .attr('y2', chartHeight)
                        .attr('x1', (d) => xScale(d))
                        .attr('x2', (d) => xScale(d));
            }

            //draw a horizontal line to extend x-axis till the edges
            baseLine = svg.select('.grid-lines-group')
                .selectAll('line.extended-x-line')
                .data([0])
                .enter()
                  .append('line')
                    .attr('class', 'extended-x-line')
                    .attr('x1', (-xAxisPadding.left - 30))
                    .attr('x2', chartWidth)
                    .attr('y1', height - margin.bottom - margin.top)
                    .attr('y2', height - margin.bottom - margin.top);
        }

        /**
         * Draws an overlay element over the graph
         * @private
         */
        function drawHoverOverlay() {
            // Not ideal, we need to figure out how to call exit for nested elements
            if (overlay) {
                svg.selectAll('.overlay').remove();
            }

            overlay = svg.select('.metadata-group')
              .append('rect')
                .attr('class', 'overlay')
                .attr('y1', 0)
                .attr('y2', chartHeight)
                .attr('height', chartHeight)
                .attr('width', chartWidth)
                .attr('fill', overlayColor)
                .style('display', 'none');
        }

        /**
         * Draws an empty line when the data is all zero
         * @private
         */
        function drawEmptyDataLine() {
            let emptyDataLine = d3Shape.line()
                .x( (d) => xScale(d.date) )
                .y( () => yScale(0) - 1 );

            let chartGroup = svg.select('.chart-group');

            chartGroup
              .append('path')
                .attr('class', 'empty-data-line')
                .attr('d', emptyDataLine(dataByDateFormatted))
                .style('stroke', 'url(#empty-data-line-gradient)');

            chartGroup
              .append('linearGradient')
                .attr('id', 'empty-data-line-gradient')
                .attr('gradientUnits', 'userSpaceOnUse')
                .attr('x1', 0)
                .attr('x2', xScale(data[data.length - 1].date))
                .attr('y1', 0)
                .attr('y2', 0)
                .selectAll('stop')
                .data([
                    {offset: '0%', color: lineGradient[0]},
                    {offset: '100%', color: lineGradient[1]}
                ])
                .enter()
                  .append('stop')
                    .attr('offset', ({offset}) => offset)
                    .attr('stop-color', ({color}) => color);
        }

        /**
         * Draws the different areas into the chart-group element
         * @private
         */
        function drawStackedAreas() {
            // Not ideal, we need to figure out how to call exit for nested elements
            if (series) {
                svg.selectAll('.layer-container').remove();
                svg.selectAll('.layer').remove();
                svg.selectAll('.area-outline').remove();
            }

            if (isUsingFakeData) {
                drawEmptyDataLine();

                return;
            }

            area = d3Shape.area()
                .curve(curveMap[areaCurve])
                .x(({data})=> xScale(data.date))
                .y0((d) => yScale(d[0]))
                .y1((d) => yScale(d[1]));

            areaOutline = d3Shape.line()
                .curve(area.curve())
                .x(({data}) => xScale(data.date))
                .y((d) => yScale(d[1]));

            if (isAnimated) {
                series = svg.select('.chart-group').selectAll('.layer')
                    .data(layersInitial, getName)
                    .enter()
                      .append('g')
                        .classed('layer-container', true);

                series
                  .append('path')
                    .attr('class', 'layer')
                    .attr('d', area)
                    .style('opacity', areaOpacity)
                    .style('fill', ({key}) => categoryColorMap[key]);

                series
                  .append('path')
                    .attr('class', 'area-outline')
                    .attr('d', areaOutline)
                    .style('stroke', ({key}) => categoryColorMap[key]);

                // Update
                svg.select('.chart-group').selectAll('.layer')
                    .data(layers)
                    .transition()
                    .delay((_, i) => areaAnimationDelays[i])
                    .duration(areaAnimationDuration)
                    .ease(ease)
                    .attr('d', area)
                    .style('opacity', areaOpacity)
                    .style('fill', ({key}) => categoryColorMap[key]);

                svg.select('.chart-group').selectAll('.area-outline')
                    .data(layers)
                    .transition()
                    .delay( (_, i) => areaAnimationDelays[i])
                    .duration(areaAnimationDuration)
                    .ease(ease)
                    .attr('d', areaOutline);

            } else {
                series = svg.select('.chart-group').selectAll('.layer')
                    .data(layers)
                    .enter()
                      .append('g')
                        .classed('layer-container', true);

                series
                  .append('path')
                    .attr('class', 'layer')
                    .attr('d', area)
                    .style('opacity', areaOpacity)
                    .style('fill', ({key}) => categoryColorMap[key]);

                series
                  .append('path')
                    .attr('class', 'area-outline')
                    .attr('d', areaOutline)
                    .style('stroke', ({key}) => categoryColorMap[key]);


                // Update
                svg.select('.chart-group').selectAll('.layer')
                    .attr('d', area)
                    .style('opacity', areaOpacity)
                    .style('fill', ({key}) => categoryColorMap[key]);

                svg.select('.chart-group').selectAll('.area-outline')
                    .attr('class', 'area-outline')
                    .attr('d', areaOutline)
                    .style('stroke', ({key}) => categoryColorMap[key]);
            }

            if (!hasOutline) {
                svg.select('.chart-group')
                  .selectAll('.area-outline')
                  .style('display', 'none');
            }

            // Exit
            series.exit()
                .transition()
                .style('opacity', 0)
                .remove();
        }

        /**
         * Creates the vertical marker
         * @return void
         */
        function drawVerticalMarker() {
            // Not ideal, we need to figure out how to call exit for nested elements
            if (verticalMarkerContainer) {
                svg.selectAll('.vertical-marker-container').remove();
            }

            verticalMarkerContainer = svg.select('.metadata-group')
              .append('g')
                .attr('class', 'vertical-marker-container')
                .attr('transform', 'translate(9999, 0)');

            verticalMarkerLine = verticalMarkerContainer.selectAll('path')
                .data([{
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                }])
                .enter()
                  .append('line')
                    .classed('vertical-marker', true)
                    .attr('x1', 0)
                    .attr('y1', chartHeight)
                    .attr('x2', 0)
                    .attr('y2', 0);
        }

        /**
         * Removes all the datapoints highlighter circles added to the marker container
         * @return void
         * @private
         */
        function cleanDataPointHighlights() {
            verticalMarkerContainer.selectAll('.circle-container').remove();
        }

        /**
         * Orders the data by date for consumption on the chart tooltip
         * @param  {areaChartData} data    Chart data
         * @return {Object[]}               Chart data ordered by date
         * @private
         */
        function getDataByDate(data) {
            return d3Collection.nest()
                .key(getDate)
                .entries(
                    data.sort((a, b) => a.date - b.date)
                )
                .map(d => {
                    return assign({}, d, {
                        date: new Date(d.key)
                    });
                });

            // let b =  d3Collection.nest()
            //                     .key(getDate).sortKeys(d3Array.ascending)
            //                     .entries(data);
        }

        /**
         * Computes the maximum sum of values for any date
         *
         * @return {Number} Max value
         */
        function getMaxValueByDate() {
            let keys = uniq(data.map(o => o.name));
            let maxValueByDate = d3Array.max(dataByDateFormatted, function(d){
                let vals = keys.map((key) => d[key]);

                return d3Array.sum(vals);
            });

            return maxValueByDate;
        }

        /**
         * Finds out the data entry that is closer to the given position on pixels
         * @param  {Number} mouseX X position of the mouse
         * @return {obj}        Data entry that is closer to that x axis position
         */
        function getNearestDataPoint(mouseX) {
            let points = dataByDate.filter(({date}) => Math.abs(xScale(date) - mouseX) <= epsilon);

            if (points.length) {
                return points[0];
            }
        }

        /**
         * Epsilon is the value given to the number representing half of the distance in
         * pixels between two date data points
         * @return {Number} half distance between any two points
         */
        function setEpsilon() {
            let dates = dataByDate.map(({date}) => date);

            epsilon = (xScale(dates[1]) - xScale(dates[0])) / 2;
        }

        /**
         * MouseMove handler, calculates the nearest dataPoint to the cursor
         * and updates metadata related to it
         * @private
         */
        function handleMouseMove(e) {
            epsilon || setEpsilon();

            let [xPosition, yPosition] = d3Selection.mouse(e),
                dataPoint = getNearestDataPoint(xPosition - margin.left),
                dataPointXPosition;

            if (dataPoint) {
                dataPointXPosition = xScale(new Date( dataPoint.key ));
                // Move verticalMarker to that datapoint
                moveVerticalMarker(dataPointXPosition);
                // Add data points highlighting
                highlightDataPoints(dataPoint);
                // Emit event with xPosition for tooltip or similar feature
                dispatcher.call('customMouseMove', e, dataPoint, categoryColorMap, dataPointXPosition, yPosition);
            }
        }

        /**
         * MouseOut handler, hides overlay and removes active class on verticalMarkerLine
         * It also resets the container of the vertical marker
         * @private
         */
        function handleMouseOut(e, d) {
            overlay.style('display', 'none');
            verticalMarkerLine.classed('bc-is-active', false);
            verticalMarkerContainer.attr('transform', 'translate(9999, 0)');

            dispatcher.call('customMouseOut', e, d, d3Selection.mouse(e));
        }

        /**
         * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
         * @private
         */
        function handleMouseOver(e, d) {
            overlay.style('display', 'block');
            verticalMarkerLine.classed('bc-is-active', true);

            dispatcher.call('customMouseOver', e, d, d3Selection.mouse(e));
        }

        /**
         * Touchmove highlighted points
         * It will only pass the information with the event
         * @private
         */
        function handleTouchMove(e, d) {
            dispatcher.call('customTouchMove', e, d, d3Selection.touch(e));
        }

        /**
         * Mouseclick handler over one of the highlight points
         * It will only pass the information with the event
         * @private
         */
        function handleHighlightClick(e, d) {
            dispatcher.call('customDataEntryClick', e, d, d3Selection.mouse(e));
        }

        /**
         * Creates coloured circles marking where the exact data y value is for a given data point
         * @param  {obj} dataPoint Data point to extract info from
         * @private
         */
        function highlightDataPoints({values}) {
            let accumulator = 0;

            cleanDataPointHighlights();

            // ensure order stays constant
            let sortedValues = order.reduce((acc, current) => {
                return [...acc, values.find(({name}) => name === current)];
            },[]);

            sortedValues.forEach((d, index) => {
                let marker = verticalMarkerContainer
                    .append('g')
                    .classed('circle-container', true)
                        .append('circle')
                        .classed('data-point-highlighter', true)
                        .attr('cx', highlightCircleSize)
                        .attr('cy', 0)
                        .attr('r', highlightCircleRadius)
                        .style('stroke-width', highlightCircleStroke)
                        .style('stroke', categoryColorMap[d.name])
                        .style('cursor', 'pointer')
                        .on('click', function() {
                            addGlowFilter(this);
                            handleHighlightClick(this, d);
                        })
                        .on('mouseout', function() {
                            removeFilter(this);
                        });

                accumulator = accumulator + sortedValues[index][valueLabel];

                marker.attr('transform', `translate( ${(- highlightCircleSize)}, ${(yScale(accumulator))} )` );
            });
        }

        /**
         * Helper method to update the x position of the vertical marker
         * @param  {obj} dataPoint Data entry to extract info
         * @return void
         */
        function moveVerticalMarker(verticalMarkerXPosition) {
            verticalMarkerContainer.attr('transform', `translate(${verticalMarkerXPosition},0)`);
        }

        /**
         * Resets a point filter
         * @param {DOMElement} point  Point to reset
         */
        function removeFilter(point) {
            d3Selection.select(point)
                .attr('filter', 'none');
        }

        /**
         * Determines if we should add the tooltip related logic depending on the
         * size of the chart and the tooltipThreshold variable value
         * @return {boolean} Should we build the tooltip?
         * @private
         */
        function shouldShowTooltip() {
            return width > tooltipThreshold && !isUsingFakeData;
        }


        // API

         /**
         * Gets or Sets the area curve of the stacked area.
         * @param {String} [_x='monotoneX'] Desired curve for the stacked area, default 'monotoneX'. Other options are:
         * basis, natural, linear, monotoneY, step, stepAfter, stepBefore, cardinal, and
         * catmullRom. Visit https://github.com/d3/d3-shape#curves for more information.
         * @return {String | module} Current area curve setting or Chart module to chain calls
         * @public
         * @example stackedArea.areaCurve('step')
         */
        exports.areaCurve = function(_x) {
            if (!arguments.length) {
                return areaCurve;
            }
            areaCurve = _x;

            return this;
        }

        /**
         * Gets or Sets the opacity of the stacked areas in the chart (all of them will have the same opacity)
         * @param  {Number} _x                  Opacity to get/set
         * @return {Number | module}          Current opacity or Area Chart module to chain calls
         * @public
         */
        exports.areaOpacity = function(_x) {
            if (!arguments.length) {
                return areaOpacity;
            }
            areaOpacity = _x;

            return this;
        };

        /**
         * Gets or Sets the aspect ratio of the chart
         * @param  {Number} _x Desired aspect ratio for the graph
         * @return {Number | Module} Current aspect ratio or Area Chart module to chain calls
         * @public
         */
        exports.aspectRatio = function(_x) {
            if (!arguments.length) {
                return aspectRatio;
            }
            aspectRatio = _x;

            return this;
        };

        /**
         * Exposes the constants to be used to force the x axis to respect a certain granularity
         * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
         * @example
         *     area.xAxisFormat(area.axisTimeCombinations.HOUR_DAY)
         */
        exports.axisTimeCombinations = axisTimeCombinations;

        /**
         * Gets or Sets the colorSchema of the chart
         * @param  {String[]} _x Desired colorSchema for the graph
         * @return {String[] | module} Current colorSchema or Chart module to chain calls
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
         * Gets or Sets the dateLabel of the chart
         * @param  {String} _x Desired dateLabel for the graph
         * @return {String | module} Current dateLabel or Chart module to chain calls
         * @public
         */
        exports.dateLabel = function(_x) {
            if (!arguments.length) {
                return dateLabel;
            }
            dateLabel = _x;

            return this;
        };

        /**
         * Gets or Sets the emptyDataConfig of the chart
         * @param  {Object} _x emptyDataConfig object to get/set
         * @return {Object | module} Current config for when chart data is an empty array
         * @public
         */
        exports.emptyDataConfig = function(_x) {
            if (!arguments.length) {
                return emptyDataConfig;
            }
            emptyDataConfig = _x;

            return this;
        };

        /**
         * Gets or Sets the grid mode.
         *
         * @param  {String} _x Desired mode for the grid ('vertical'|'horizontal'|'full')
         * @return {String | module} Current mode of the grid or Area Chart module to chain calls
         * @public
         */
        exports.grid = function(_x) {
            if (!arguments.length) {
                return grid;
            }
            grid = _x;

            return this;
        };

        exports.hasOutline = function(_x) {
            if (!arguments.length) {
                return hasOutline;
            }
            hasOutline = _x;

            return this;
        }

        /**
         * Gets or Sets the height of the chart
         * @param  {Number} _x Desired width for the graph
         * @return {Number | module} Current height or Area Chart module to chain calls
         * @public
         */
        exports.height = function(_x) {
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
         * Gets or Sets the isAnimated property of the chart, making it to animate when render.
         * By default this is 'false'
         *
         * @param  {Boolean} _x Desired animation flag
         * @return {Boolean | module} Current isAnimated flag or Chart module
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
         * Gets or Sets the keyLabel of the chart
         * @param  {Number} _x Desired keyLabel for the graph
         * @return {Number | module} Current keyLabel or Chart module to chain calls
         * @public
         */
        exports.keyLabel = function(_x) {
            if (!arguments.length) {
                return keyLabel;
            }
            keyLabel = _x;

            return this;
        };

        /**
         * Gets or Sets the margin of the chart
         * @param  {Object} _x Margin object to get/set
         * @return {Object | module} Current margin or Area Chart module to chain calls
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
         * Gets or Sets the minimum width of the graph in order to show the tooltip
         * NOTE: This could also depend on the aspect ratio
         *
         * @param  {Number} _x          Minimum width of the graph
         * @return {Number | module}    Current tooltipThreshold or Area Chart module to chain calls
         * @public
         */
        exports.tooltipThreshold = function(_x) {
            if (!arguments.length) {
                return tooltipThreshold;
            }
            tooltipThreshold = _x;

            return this;
        };

        /**
         * Pass an override for the ordering of the topics
         * @param  {String[]} _x           Array of the names of your tooltip items
         * @return {String[] | module}    Current override order or Chart module to chain calls
         * @public
         */
        exports.topicsOrder = function(_x) {
            if (!arguments.length) {
                return topicsOrder;
            }
            topicsOrder = _x;

            return this;
        };

        /**
         * Gets or Sets the loading state of the chart
         * @param  {String} markup Desired markup to show when null data
         * @return {String | module} Current loading state markup or Chart module to chain calls
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
         * Pass language tag for the tooltip to localize the date.
         * Feature uses Intl.DateTimeFormat, for compatability and support, refer to
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
         * @param  {String} _x  must be a language tag (BCP 47) like 'en-US' or 'fr-FR'
         * @return {String | Module}    Current locale or module to chain calls
         * @public
         */
        exports.locale = function(_x) {
            if (!arguments.length) {
                return locale;
            }
            locale = _x;

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
         * Exposes an 'on' method that acts as a bridge with the event dispatcher
         * We are going to expose this events:
         * customMouseOver, customMouseMove, customMouseOut,
         * customDataEntryClick and customTouchMove
         * @return {module} Stacked Area
         * @public
         */
        exports.on = function() {
            let value = dispatcher.on.apply(dispatcher, arguments);

            return value === dispatcher ? exports : value;
        };

        /**
         * Gets or Sets the valueLabel of the chart
         * @param  {Number} _x Desired valueLabel for the graph
         * @return {Number | module} Current valueLabel or Chart module to chain calls
         * @public
         */
        exports.valueLabel = function(_x) {
            if (!arguments.length) {
                return valueLabel;
            }
            valueLabel = _x;

            return this;
        };

        /**
         * Gets or Sets the width of the chart
         * @param  {Number} _x Desired width for the graph
         * @return {Number | module} Current width or Area Chart module to chain calls
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

        /**
         * Exposes the ability to force the chart to show a certain x format
         * It requires a `xAxisFormat` of 'custom' in order to work.
         * NOTE: localization not supported
         * @param  {String} _x            Desired format for x axis
         * @return {String | Module}      Current format or module to chain calls
         * @public
         */
        exports.xAxisCustomFormat = function(_x) {
            if (!arguments.length) {
              return xAxisCustomFormat;
            }
            xAxisCustomFormat = _x;

            return this;
        };

        /**
         * Exposes the ability to force the chart to show a certain x axis grouping
         * @param  {String} _x          Desired format
         * @return {String | Module}    Current format or module to chain calls
         * @public
         * @example
         *     area.xAxisFormat(area.axisTimeCombinations.HOUR_DAY)
         */
        exports.xAxisFormat = function(_x) {
            if (!arguments.length) {
              return xAxisFormat;
            }
            xAxisFormat = _x;

            return this;
        };

        /**
         * Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisFormat` of 'custom' in order to work.
         * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
         * how many and where the ticks will appear.
         *
         * @param  {Number} _x            Desired number of x axis ticks (multiple of 2, 5 or 10)
         * @return {Number | Module}      Current number or ticks or module to chain calls
         * @public
         */
        exports.xTicks = function(_x) {
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
         * @example stackedArea.yAxisLabel('Ticket Sales')
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
         * @param  {Number} [_x=-60] Desired offset for the label
         * @return {Number | module} Current yAxisLabelOffset or Chart module to chain calls
         * @public
         * @example stackedArea.yAxisLabelOffset(-55)
         */
        exports.yAxisLabelOffset = function (_x) {
            if (!arguments.length) {
                return yAxisLabelOffset;
            }
            yAxisLabelOffset = _x;

            return this;
        };

        /**
         * Gets or Sets the number of ticks of the y axis on the chart
         * (Default is 5)
         * @param  {Number} [_x=5]      Desired vertical ticks
         * @return {Number | module}    Current vertical ticks or Chart module to chain calls
         * @public
         */
        exports.yTicks = function (_x) {
            if (!arguments.length) {
                return yTicks;
            }
            yTicks = _x;

            return this;
        };

        return exports;
    };

});
