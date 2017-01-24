define(function(require){
    'use strict';

    const d3Array = require('d3-array');
    const d3Axis = require('d3-axis');
    const d3Collection = require('d3-collection');
    const d3Dispatch = require('d3-dispatch');
    const d3Ease = require('d3-ease');
    const d3Format = require('d3-format');
    const d3Scale = require('d3-scale');
    const d3Shape = require('d3-shape');
    const d3Selection = require('d3-selection');
    const d3Time = require('d3-time');
    const d3TimeFormat = require('d3-time-format');

    const _ = require('underscore');
    const exportChart = require('./helpers/exportChart');
    const colorHelper = require('./helpers/colors');

    const ONE_AND_A_HALF_YEARS = 47304000000;

    /**
     * @typdef D3Layout
     * @type function
     */

    /**
     * Stacked Area Chart reusable API module that allows us
     * rendering a multi area and configurable chart.
     *
     * @module Stacked-area
     * @version 0.1.0
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

            xScale, xAxis, xMonthAxis,
            yScale, yAxis,

            monthAxisPadding = 30,
            numVerticalTicks = 5,
            yTickTextYOffset = -8,
            yTickTextXOffset = 40,
            tickPadding = 5,

            colorSchema = colorHelper.colorSchemas.britechartsColorSchema,

            colorOrder = colorSchema
                .reduce((acc, color, index) => {
                    acc[color] = index;

                    return acc;
                }, {}),
            areaOpacity = 0.8,
            colorScale,
            categoryColorMap,

            layers,
            layersInitial,
            area,

            // Area Animation
            maxAreaNumber = 8,
            areaAnimationDelayStep = 20,
            areaAnimationDelays = d3Array.range(areaAnimationDelayStep, maxAreaNumber* areaAnimationDelayStep, areaAnimationDelayStep),

            overlay,

            verticalMarkerContainer,
            verticalMarker,

            dataPoints            = {},
            pointsSize            = 1.5,
            pointsColor           = '#c0c6cc',
            pointsBorderColor     = '#ffffff',

            ease = d3Ease.easeQuadInOut,
            areaAnimationDuration = 1000,

            defaultNumMonths = 10,

            svg,
            chartWidth, chartHeight,
            data,
            dataByDate,
            dataByDateFormatted,
            dataByDateZeroed,

            tooltipThreshold = 480,

            xAxisPadding = {
                top: 0,
                left: 15,
                bottom: 0,
                right: 0
            },

            dateLabel = 'dateUTC',
            valueLabel = 'views',

            // getters
            getValueLabel = d => d[valueLabel],
            getValues = ({values}) => values,
            getKey = ({key}) => key,
            getName = ({name}) => name,
            getDate = ({date}) => date,


            // formats
            parseUTC = d3TimeFormat.timeParse('%Y-%m-%dT%H:%M:%SZ'),

            yTickNumberFormat = d3Format.format('.3'),
            xTickDateFormat = d3TimeFormat.timeFormat('%e'),
            xTickMonthFormat = d3TimeFormat.timeFormat('%b'),

            // events
            dispatcher = d3Dispatch.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');

       /**
         * This function creates the graph using the selection and data provided
         * @param {D3Selection} _selection A d3 selection that represents
         * the container(s) where the chart(s) will be rendered
         * @param {Object} _data The data to attach and generate the chart
         */
        function exports(_selection) {
            _selection.each(function(_data){
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = cleanData(_data);
                dataByDate = d3Collection.nest()
                    .key( getDate )
                    .entries(
                         _(_data).sortBy('date')
                    );

                buildLayers();
                buildScales();
                buildAxis();
                buildSVG(this);
                drawAxis();
                drawStackedAreas();

                if(shouldShowTooltip()){
                    drawHoverOverlay();
                    drawVerticalMarker();
                    addMouseEvents();
                }
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
         * Calculates the maximum number of ticks for the x axis
         * @param  {Number} width Chart width
         * @param  {Number} dataPointNumber  Number of entries on the data
         * @return {Number}       Number of ticks to render
         */
        function getMaxNumOfHorizontalTicks(width, dataPointNumber) {
            let singleTickWidth = 30,
                spacing = 30,
                ticksForWidth = Math.ceil(width / (singleTickWidth + spacing));

            return Math.min(dataPointNumber, ticksForWidth);
        }

        /**
         * Creates the d3 x and y axis, setting orientations
         * @private
         */
        function buildAxis() {
            let dataTimeSpan = xScale.domain()[1] - xScale.domain()[0];
            let xMonthTicks = dataTimeSpan > ONE_AND_A_HALF_YEARS ? defaultNumMonths : d3Time.timeMonth;

            xAxis = d3Axis.axisBottom(xScale)
                .ticks(getMaxNumOfHorizontalTicks(chartWidth, dataByDate.length))
                .tickFormat(xTickDateFormat)
                .tickSize(10, 0)
                .tickPadding(tickPadding);

            //TODO: Review this axis with real data
            xMonthAxis = d3Axis.axisBottom(xScale)
                .ticks(xMonthTicks)
                .tickSize(10, 0)
                .tickFormat(xTickMonthFormat)
                .tickPadding(tickPadding);

            yAxis = d3Axis.axisRight(yScale)
                .ticks(numVerticalTicks)
                .tickFormat(yTickNumberFormat)
                .tickSize(chartWidth + yTickTextXOffset, 0, 0)
                .tickPadding(tickPadding);
        }

        /**
         * Builds containers for the chart, the axis and a wrapper for all of them
         * NOTE: The order of drawing of this group elements is really important,
         * as everything else will be drawn on top of them
         * @private
         */
        function buildContainerGroups(){
           let container = svg.append('g')
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
                .append('g').classed('chart-group', true);
            container
                .append('g').classed('metadata-group', true);
        }

        /**
         * Builds the stacked layers layout
         * @return {D3Layout} Layout for drawing the chart
         * @private
         */
        function buildLayers(){
            dataByDateFormatted = _.chain(dataByDate)
                .map((d) => _.extend(d, d.values))
                .map((d) => {
                    _(d).each((entry) => {
                        if(entry['name']) {
                            d[entry['name']] = entry.value;
                        }
                    });
                    d['date'] = new Date(d['key']);

                    return d;
                })
                .value();

            dataByDateZeroed = _.chain(JSON.parse(JSON.stringify(dataByDate)))
                .map((d) => _.extend(d, d.values))
                .map((d) => {
                    _(d).each((entry) => {
                        if(entry['name']) {
                            d[entry['name']] = 0;
                        }
                    });
                    d['date'] = new Date(d['key']);

                    return d;
                })
                .value();

            let keys = [...new Set(_(data).pluck('name'))];
            let stack3 = d3Shape.stack()
                .keys(keys)
                .order(d3Shape.stackOrderNone)
                .offset(d3Shape.stackOffsetNone);

            layersInitial = stack3(dataByDateZeroed);
            layers = stack3(dataByDateFormatted);
        }

        /**
         * Creates the x, y and color scales of the chart
         * @private
         */
        function buildScales() {
            xScale = d3Scale.scaleTime()
                .domain(d3Array.extent(data, ({date}) => date))
                .range([0, chartWidth]);

            yScale = d3Scale.scaleLinear()
                .domain([0, getMaxValueByDate()])
                .range([chartHeight, 0])
                .nice([numVerticalTicks + 1]);


            colorScale = d3Scale.scaleOrdinal()
                  .range(colorSchema)
                  .domain(data.map(getName));

            // TODO add spread and rest operators to britecharts
            /*
                let range = colorScale.range();
                categoryColorMap = colorScale.domain().reduce((memo, item, i) => ({...memo, [item]: range[i], }), {});
             */

            let range = colorScale.range();
            categoryColorMap = colorScale
                .domain()
                .reduce((memo, item, i) => {
                    memo[item] = range[i];
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
                    .classed('britechart stacked-area', true);

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

            // could be rewritten using spread operator
            /*
                return data.map((d) => {...d, date: parseUTC(d[dateLabel], [valueLabel] : +d[valueLabel]})
             */
            return data.map((d) => {
                d.date = parseUTC(d[dateLabel]);
                d.value = +d[valueLabel];

                return d;
            });
        }

        /**
         * Draws the x and y axis on the svg object within their
         * respective groups
         * @private
         */
        function drawAxis(){
            svg.select('.x-axis-group .axis.x')
                .attr('transform', `translate( 0, ${chartHeight} )`)
                .call(xAxis);

            svg.select('.x-axis-group .month-axis')
                .attr('transform', `translate(0, ${(chartHeight + monthAxisPadding)})`)
                .call(xMonthAxis);

            svg.select('.y-axis-group.axis')
                .attr('transform', `translate( ${-yTickTextXOffset}, 0)`)
                .call(yAxis);

            // Moving the YAxis tick labels to the right side
            d3Selection.selectAll('.y-axis-group .tick text')
                .attr('transform', `translate( ${-chartWidth - yTickTextXOffset}, ${yTickTextYOffset})` );
        }

        /**
         * Creates SVG dot elements for each data entry and draws them
         * TODO: Plug
         */
        function drawDataReferencePoints() {
            // Creates Dots on Data points
            var points = svg.select('.chart-group').selectAll('.dots')
                .data(layers)
              .enter().append('g')
                .attr('class', 'dots')
                .attr('d', ({values}) => area(values))
                .attr('clip-path', 'url(#clip)')

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
         * Draws an overlay element over the graph
         * @private
         */
        function drawHoverOverlay(){
            overlay = svg.select('.metadata-group')
                .append('rect')
                .attr('class', 'overlay')
                .attr('y1', 0)
                .attr('y2', chartHeight)
                .attr('height', chartHeight)
                .attr('width', chartWidth)
                .attr('fill', 'rgba(0,0,0,0)')
                .style('display', 'none');
        }

        /**
         * Draws the different areas into the chart-group element
         * @private
         */
        function drawStackedAreas(){
            // Creating Area function
            area = d3Shape.area()
                .curve(d3Shape.curveCardinal)
                .x( ({data}) => xScale(data.date) )
                .y0( (d) => yScale(d[0]) )
                .y1( (d) => yScale(d[1]) );

            let series = svg.select('.chart-group').selectAll('.layer')
                .data(layersInitial)
                .enter()
              .append('g')
                .classed('layer-container', true);

            series
              .append('path')
                .attr('class', 'layer')
                .attr('d', area)
                .style('fill', ({key}) => categoryColorMap[key]);

            // Update
            svg.select('.chart-group').selectAll('.layer')
                .data(layers)
                .transition()
                .delay( (_, i) => areaAnimationDelays[i])
                .duration(areaAnimationDuration)
                .ease(ease)
                .attr('d', area)
                .style('opacity', areaOpacity)
                .style('fill', ({key}) => categoryColorMap[key]);

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
        function drawVerticalMarker(){
            verticalMarkerContainer = svg.select('.metadata-group')
                .append('g')
                .attr('class', 'vertical-marker-container')
                .attr('transform', 'translate(9999, 0)');

            verticalMarker = verticalMarkerContainer.selectAll('path')
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
         */
        function eraseDataPointHighlights() {
            verticalMarkerContainer.selectAll('.circle-container').remove();
        }

        /**
         * Computes the maximum sum of values for any date
         *
         * @return {Number} Max value
         */
        function getMaxValueByDate() {
            let keys = [...new Set(_(data).pluck('name'))];
            let maxValueByDate = d3Array.max(dataByDateFormatted, function(d){
                let vals = keys.map((key) => d[key]);

                return d3Array.sum(vals);
            });

            return maxValueByDate;
        }

        /**
         * Extract X position on the chart from a given mouse event
         * @param  {obj} event D3 mouse event
         * @return {Number}       Position on the x axis of the mouse
         * @private
         */
        function getMouseXPosition(event) {
            return d3Selection.mouse(event)[0];
        }

        /**
         * Finds out the data entry that is closer to the given position on pixels
         * @param  {Number} mouseX X position of the mouse
         * @return {obj}        Data entry that is closer to that x axis position
         */
        function getNearestDataPoint(mouseX) {
            let epsilon,
                nearest;

            //could use spread operator, would prevent mutation of original data
            /*
                let dataByDateParsed = dataByDate.map((item) => ({...item, key: new Date(item.key)}))
             */
            let dataByDateParsed = dataByDate.map((item) => {
                item.key = new Date(item.key);

                return item;
            });

            epsilon = (xScale(dataByDateParsed[1].key) - xScale(dataByDateParsed[0].key)) / 2;
            nearest = dataByDateParsed.find(({key}) => Math.abs(xScale(key) - mouseX) <= epsilon);

            return nearest;
        }

        /**
         * MouseMove handler, calculates the nearest dataPoint to the cursor
         * and updates metadata related to it
         * @private
         */
        function handleMouseMove(){
            let dataPoint = getNearestDataPoint(getMouseXPosition(this) - margin.left),
                dataPointXPosition;

            if(dataPoint) {
                dataPointXPosition = xScale(new Date( dataPoint.key ));
                // Move verticalMarker to that datapoint
                moveVerticalMarker(dataPointXPosition);
                // Add data points highlighting
                highlightDataPoints(dataPoint);
                // Emit event with xPosition for tooltip or similar feature
                dispatcher.call('customMouseMove', this, dataPoint, categoryColorMap, dataPointXPosition);
            }
        }

        /**
         * MouseOut handler, hides overlay and removes active class on verticalMarkerLine
         * It also resets the container of the vertical marker
         * @private
         */
        function handleMouseOut(data){
            overlay.style('display', 'none');
            verticalMarker.classed('bc-is-active', false);
            verticalMarkerContainer.attr('transform', 'translate(9999, 0)');

            dispatcher.call('customMouseOut', this, data);
        }

        /**
         * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
         * @private
         */
        function handleMouseOver(data){
            overlay.style('display', 'block');
            verticalMarker.classed('bc-is-active', true);

            dispatcher.call('customMouseOver', this, data);
        }

        /**
         * Creates coloured circles marking where the exact data y value is for a given data point
         * @param  {obj} dataPoint Data point to extract info from
         * @private
         */
        function highlightDataPoints({values}) {
            let accumulator = 0;

            eraseDataPointHighlights();

            // sorting the values based on the order of the colors,
            // so that the order always stays constant
            values = values
                        .filter(v => !!v)
                        .sort((a, b) => colorOrder[a.el] > colorOrder[b.el]);

            values.forEach(({name}, index) => {
                let marker = verticalMarkerContainer
                                .append('g')
                                .classed('circle-container', true),
                    circleSize = 12;

                accumulator = accumulator + values[index][valueLabel];

                marker.append('circle')
                    .classed('data-point-highlighter', true)
                    .attr('cx', circleSize)
                    .attr('cy', 0)
                    .attr('r', 5)
                    .style('stroke-width', 3)
                    .style('stroke', categoryColorMap[name]);

                marker.attr('transform', `translate( ${(- circleSize)}, ${(yScale(accumulator))} )` );
            });
        }

        /**
         * Helper method to update the x position of the vertical marker
         * @param  {obj} dataPoint Data entry to extract info
         * @return void
         */
        function moveVerticalMarker(verticalMarkerXPosition){
            verticalMarkerContainer.attr('transform', `translate(${verticalMarkerXPosition},0)`);
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

        // Accessors

        /**
         * Gets or Sets the height of the chart
         * @param  {Number} _x Desired width for the graph
         * @return { height | module} Current height or Area Chart module to chain calls
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
         * Gets or Sets the margin of the chart
         * @param  {Object} _x Margin object to get/set
         * @return { margin | module} Current margin or Area Chart module to chain calls
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
         * Gets or Sets the tooltipThreshold of the chart
         * @param  {Object} _x Margin object to get/set
         * @return { tooltipThreshold | module} Current tooltipThreshold or Area Chart module to chain calls
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
         * Gets or Sets the width of the chart
         * @param  {Number} _x Desired width for the graph
         * @return { width | module} Current width or Area Chart module to chain calls
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
         * Gets or Sets the valueLabel of the chart
         * @param  {Number} _x Desired valueLabel for the graph
         * @return { valueLabel | module} Current valueLabel or Chart module to chain calls
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
         * Gets or Sets the dateLabel of the chart
         * @param  {Number} _x Desired dateLabel for the graph
         * @return { dateLabel | module} Current dateLabel or Chart module to chain calls
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
