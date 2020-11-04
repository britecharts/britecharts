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
    const d3Transition = require('d3-transition');
    const d3TimeFormat = require('d3-time-format');

    const { exportChart } = require('./helpers/export');
    const colorHelper = require('./helpers/color');
    const { line: lineChartLoadingMarkup } = require('./helpers/load');

    const { getTimeSeriesAxis, getSortedNumberAxis } = require('./helpers/axis');
    const { castValueToType } = require('./helpers/type');
    const {
        axisTimeCombinations,
        curveMap
    } = require('./helpers/constants');
    const {
        createFilterContainer,
        createGlowWithMatrix,
        bounceCircleHighlight
    } = require('./helpers/filter');
    const {
        formatIntegerValue,
        formatDecimalValue,
        isInteger,
        uniqueId
    } = require('./helpers/number');

    const acceptNullValue = (value) => value === null ? null : +value;

    /**
     * @typedef D3Selection
     * @type {Array[]}
     * @property {Number} length            Size of the selection
     * @property {DOMElement} parentNode    Parent of the selection
     */

    /**
      * @typedef lineChartFlatData
      * @type {Object}
      * @property {String} topicName    Topic name (required)
      * @property {Number} topic        Topic identifier (required)
      * @property {Object[]} dates      All date entries with values for that topic in ISO8601 format (required)
      *
      * @example
      * [
      *     {
      *         topicName: 'San Francisco',
      *         name: 123,
      *         date: '2017-01-16T16:00:00-08:00',
      *         value: 1
      *     }
      * ]
      */

     /**
      * Former data standard, it is currently calculated internally if not passed
      * @typedef lineChartDataByTopic
      * @type {Object}
      * @property {String} topicName    Topic name (required)
      * @property {Number} topic        Topic identifier (required)
      * @property {Object[]} dates      All date entries with values for that topic in ISO8601 format (required)
      *
      * @example
      * {
      *     topicName: 'San Francisco',
      *     topic: 123,
      *     dates: [
      *         {
      *             date: '2017-01-16T16:00:00-08:00',
      *             value: 1
      *         },
      *         {
      *             date: '2017-01-16T17:00:00-08:00',
      *             value: 2
      *         }
      *     ]
      * }
      */

    /**
      * The Data Sorted is calculated internally in the chart in order to pass it to our tooltips
      * @typedef lineChartDataSorted
      * @type {Object[]}
      * @property {String} date | number        Date in ISO8601 format or number (required)
      * @property {Object[]} topics     List of topics with values that date or number (required)
      *
      * @example
      * [
      *     {
      *         date: "2015-06-27T07:00:00.000Z",
      *         topics: [
      *             {
      *                 "name": 1,
      *                 "value": 1,
      *                 "topicName": "San Francisco"
      *             },
      *             {
      *                 "name": 2,
      *                 "value": 20,
      *                 "topicName": "Los Angeles"
      *             },
      *             {
      *                 "name": 3,
      *                 "value": 10,
      *                 "topicName": "Oakland"
      *             }
      *         ]
      *     },
      *     {...}
      * ]
      */

     /**
      * The data shape for the line chart.
      * Note that up to version 2.10.1, this required a "dataByTopic" array described on lineChartDataByTopic.
      * The "dataByTopic" schema still works, but we prefer a flat dataset as described here.
      * @typedef LineChartData
      * @type {Object}
      * @property {lineChartFlatData[]} data  Data values to chart (required)
      *
      * @example
      * {
      *     data: [
      *         {
      *             topicName: 'San Francisco',
      *             name: 1,
      *             date: '2017-01-16T16:00:00-08:00',
      *             value: 1
      *         },
      *         {
      *             topicName: 'San Francisco',
      *             name: 1,
      *             date: '2017-01-17T16:00:00-08:00',
      *             value: 2
      *         },
      *         {
      *             topicName: 'Oakland',
      *             name: 2,
      *             date: '2017-01-16T16:00:00-08:00',
      *             value: 3
      *         },
      *         {
      *             topicName: 'Oakland',
      *             name: 2,
      *             date: '2017-01-17T16:00:00-08:00',
      *             value: 7
      *         }
      *     ]
      * }
      */

    /**
     * Line Chart reusable API module that allows us
     * rendering a multi line and configurable chart.
     *
     * @module Line
     * @tutorial line
     * @requires d3-array, d3-axis, d3-brush, d3-ease, d3-format, d3-scale, d3-shape, d3-selection, d3-time, d3-time-format
     *
     * @example
     * let lineChart = line();
     *
     * lineChart
     *     .aspectRatio(0.5)
     *     .width(500);
     *
     * d3Selection.select('.css-selector')
     *     .datum(dataset)
     *     .call(lineChart);
     *
     */
    return function module() {

        let margin = {
                top: 60,
                right: 30,
                bottom: 40,
                left: 70,
            },
            width = 960,
            height = 500,
            loadingState = lineChartLoadingMarkup,
            aspectRatio = null,
            tooltipThreshold = 480,
            svg,
            paths,
            chartWidth, chartHeight,
            xScale, yScale, colorScale,
            xAxis, xSubAxis, yAxis,
            xAxisPadding = {
                top: 0,
                left: 15,
                bottom: 0,
                right: 0
            },
            verticalShift = 30,
            monthAxisPadding = 28,
            tickPadding = 5,
            colorSchema = colorHelper.colorSchemas.britecharts,
            singleLineGradientColors = colorHelper.colorGradients.greenBlue,
            topicColorMap,
            linearGradient,
            lineGradientId = uniqueId('one-line-gradient'),

            highlightFilter = null,
            highlightFilterId = null,
            highlightCircleSize = 12,
            highlightCircleRadius = 5,
            highlightCircleStroke = 2,
            highlightCircleStrokeAll = 5,
            highlightCircleActiveRadius = highlightCircleRadius + 2,
            highlightCircleActiveStrokeWidth = 5,
            highlightCircleActiveStrokeOpacity = 0.6,

            xAxisValueType = 'date',
            xAxisScale = 'linear',
            xAxisFormat = null,
            xTicks = null,
            xAxisCustomFormat = null,
            locale,

            shouldShowAllDataPoints = false,
            isAnimated = false,
            ease = d3Ease.easeQuadInOut,
            animationDuration = 1500,
            maskingRectangle,

            lineCurve = 'linear',

            dataByTopic,
            dataSorted,

            dateLabel = 'date',
            valueLabel = 'value',
            topicLabel = 'topic',
            topicNameLabel = 'topicName',

            xAxisLabel = null,
            xAxisLabelEl = null,
            xAxisLabelPadding = 36,
            yAxisLabel = null,
            yAxisLabelEl = null,
            yAxisLabelPadding = 36,

            yTicks = 5,

            overlay,
            overlayColor = 'rgba(0, 0, 0, 0)',
            verticalMarkerContainer,
            verticalMarkerLine,
            numberFormat,

            customLines = [],
            defaultCustomLineColor = '#C3C6CF',
            verticalLines,
            verticalGridLines,
            horizontalGridLines,
            grid = null,

            baseLine,

            pathYCache = {},

            // extractors
            getDate = ({date}) => date,
            getValue = ({value}) => value,
            getTopic = ({topic}) => topic,
            getVariableTopicName = (d) => d[topicNameLabel],
            getLineColor = ({topic}) => colorScale(topic),

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
         *
         * @param {D3Selection} _selection A d3 selection that represents
         *                                  the container(s) where the chart(s) will be rendered
         * @param {LineChartData} _data The data to attach and generate the chart
         */
        function exports(_selection) {
            _selection.each(function(_data) {
                ({
                    dataByTopic,
                    dataSorted: dataSorted
                } = cleanData(_data));

                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;

                buildScales();
                buildSVG(this);
                buildAxis();
                drawAxis();
                buildGradient();
                drawLines();
                createMaskingClip();

                if (shouldShowTooltip()) {
                    drawHoverOverlay();
                    drawVerticalMarker();
                    addMouseEvents();
                }

                if (shouldShowAllDataPoints) {
                    drawAllDataPoints();
                }

                addTouchEvents();
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
                highlightCircleRadius
            );
        }

        /**
         * Adds events to the container group if the environment is not mobile
         * Adding: mouseover, mouseout and mousemove
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
         * Adjusts the position of the y axis' ticks
         * @param  {D3Selection} selection Y axis group
         * @return void
         */
        function adjustYTickLabels(selection) {
            selection.selectAll('.tick text')
                .attr('transform', 'translate(0, -7)');
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

            if (numberFormat) {
                format = d3Format.format(numberFormat)
            }

            return format(value);
        }

        /**
         * Creates the d3 x and y axis, setting orientations
         * @private
         */
        function buildAxis() {
            let minor, major;

            if (xAxisValueType === 'number') {
                minor = getSortedNumberAxis(dataSorted, width);
                major = null;

                if(xAxisScale === 'logarithmic') {
                    xAxis = d3Axis.axisBottom(xScale)
                        .ticks(minor.tick, "e")
                        .tickFormat(function (d) {
                            const log = Math.log(d) / Math.LN10;
                            return Math.abs(Math.round(log) - log) < 1e-6 ? '10^' + Math.round(log) : '';
                        });
                } else {
                    xAxis = d3Axis.axisBottom(xScale)
                        .ticks(minor.tick)
                        .tickFormat(getFormattedValue);
                }
            } else {
                if (xAxisFormat === 'custom' && typeof xAxisCustomFormat === 'string') {
                    minor = {
                        tick: xTicks,
                        format: d3TimeFormat.timeFormat(xAxisCustomFormat)
                    };
                    major = null;
                } else {
                    ({ minor, major } = getTimeSeriesAxis(dataSorted, width, xAxisFormat, locale));

                    xSubAxis = d3Axis.axisBottom(xScale)
                        .ticks(major.tick)
                        .tickSize(0, 0)
                        .tickFormat(major.format);
                }

                xAxis = d3Axis.axisBottom(xScale)
                    .ticks(minor.tick)
                    .tickSize(10, 0)
                    .tickPadding(tickPadding)
                    .tickFormat(minor.format);
            }

            yAxis = d3Axis.axisLeft(yScale)
                .ticks(yTicks)
                .tickSize([0])
                .tickPadding(tickPadding)
                .tickFormat(getFormattedValue);

            drawGridLines(minor.tick, yTicks);
            drawCustomLines();
        }

        /**
         * Builds containers for the chart, the axis and a wrapper for all of them
         * NOTE: The order of drawing of this group elements is really important,
         * as everything else will be drawn on top of them
         * @private
         */
        function buildContainerGroups(){
            let container = svg
              .append('g')
                .classed('container-group', true)
                .attr('transform', `translate(${margin.left},${margin.top})`);

            container
              .append('g').classed('x-axis-group', true)
              .append('g').classed('axis x', true);
            container.selectAll('.x-axis-group')
              .append('g').classed('month-axis', true);
            container
              .append('g').classed('y-axis-group', true)
              .append('g').classed('axis y', true);
            container
              .append('g').classed('grid-lines-group', true);
            container
                .append('g').classed('custom-lines-group', true);
            container
              .append('g').classed('chart-group', true);
            container
              .append('g').classed('metadata-group', true);
        }

        /**
         * Builds the gradient element to be used later
         * @return {void}
         */
        function buildGradient() {
            if (!linearGradient) {
                linearGradient = svg.select('.metadata-group')
                  .append('linearGradient')
                    .attr('id', lineGradientId)
                    .attr('x1', '0%')
                    .attr('y1', '0%')
                    .attr('x2', '100%')
                    .attr('y2', '0%')
                    .attr('gradientUnits', 'userSpaceOnUse')
                    .selectAll('stop')
                    .data([
                        {offset:'0%', color: singleLineGradientColors[0]},
                        {offset:'100%', color: singleLineGradientColors[1]}
                    ])
                    .enter()
                      .append('stop')
                        .attr('offset', ({offset}) => offset)
                        .attr('stop-color', ({color}) => color)
            }
        }

        /**
         * Creates the x and y scales of the graph
         * @private
         */
        function buildScales(){
            xScale = buildXAxisScale();
            yScale = buildYAxisScale();

            colorScale = d3Scale.scaleOrdinal()
                .range(colorSchema)
                .domain(dataByTopic.map(getTopic));

            let range = colorScale.range();

            topicColorMap = colorScale.domain().reduce((memo, item, i) => {
                memo[item] = range[i];

                return memo;
            }, {});
        }

        /**
         * Creates the xScale depending on the settings of
         * xAxisValueType and xAxisScale
         * @private
         */
        function buildXAxisScale() {
            let minX = d3Array.min(dataByTopic, ({dates}) => d3Array.min(dates, getDate)),
                maxX = d3Array.max(dataByTopic, ({dates}) => d3Array.max(dates, getDate));

            if(xAxisValueType === 'number') {
                if(xAxisScale === 'logarithmic') {
                    return d3Scale.scaleLog()
                        .domain([minX, maxX])
                        .rangeRound([0, chartWidth]);
                } else {
                    return d3Scale.scaleLinear()
                        .domain([minX, maxX])
                        .rangeRound([0, chartWidth]);
                }
            } else {
                return d3Scale.scaleTime()
                    .domain([minX, maxX])
                    .rangeRound([0, chartWidth]);
            }
        }

        /**
         * Creates the yScale
         * @private
         */
        function buildYAxisScale() {
            let maxY = d3Array.max(dataByTopic, ({dates}) => d3Array.max(dates, getValue)),
                minY = d3Array.min(dataByTopic, ({dates}) => d3Array.min(dates, getValue));
            let yScaleBottomValue = minY < 0 ? minY : 0;
            let yScaleTopValue = minY === 0 && maxY === 0 ? 1 : maxY;

            return d3Scale.scaleLinear()
                .domain([yScaleBottomValue, yScaleTopValue])
                .rangeRound([chartHeight, 0])
                .nice();
        }

        /**
         * Builds the SVG element that will contain the chart
         *
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @private
         */
        function buildSVG(container){
            if (!svg) {
                svg = d3Selection.select(container)
                  .append('svg')
                    .classed('britechart line-chart', true);

                buildContainerGroups();
            }

            svg
                .attr('width', width)
                .attr('height', height);
        }

        /**
         * Parses dates and values into JS Date objects and numbers
         * @param  {obj} dataByTopic    Raw data grouped by topic
         * @return {obj}                Parsed data with dataByTopic and dataSorted
         */
        function cleanData({dataByTopic, dataSorted, data}) {
            if (!dataByTopic && !data) {
                throw new Error('Data needs to have a dataByTopic or data property. See more in http://britecharts.github.io/britecharts/global.html#LineChartData__anchor');
            }

            // If dataByTopic or data are not present, we generate them
            if (!dataByTopic) {
                dataByTopic = d3Collection.nest()
                    .key(getVariableTopicName)
                    .entries(data)
                    .map(d => ({
                            topic: d.values[0]['name'],
                            topicName: d.key,
                            dates: d.values
                        })
                    );
            } else {
                data = dataByTopic.reduce((accum, topic) => {
                    topic.dates.forEach((date) => {
                        accum.push({
                            topicName: topic[topicNameLabel],
                            name: topic[topicLabel],
                            date: date[dateLabel],
                            value: date[valueLabel]
                        });
                    });

                    return accum;
                }, []);
            }

            // Nest data by date or number and format
            dataSorted = d3Collection.nest()
                .key(getDate)
                .entries(data)
                .map((d) => {
                    return {
                        date: castValueToType(d.key, xAxisValueType),
                        topics: d.values
                    }
                });

            const normalizedDataByTopic = dataByTopic.reduce((accum, topic) => {
                let {dates, ...restProps} = topic;

                let newDates = dates.map(d => {
                    return {
                        date: castValueToType(d[dateLabel], xAxisValueType),
                        value: acceptNullValue(d[valueLabel])
                    };
                });

                accum.push({ dates: newDates, ...restProps });

                return accum;
            }, []);

            return {
                dataByTopic: normalizedDataByTopic,
                dataSorted
            };
        }

        /**
         * Removes all the datapoints highlighter circles added to the marker container
         * @return void
         */
        function cleanDataPointHighlights(){
            verticalMarkerContainer.selectAll('.circle-container').remove();
        }

        /**
         * Creates a masking clip that would help us fake an animation if the
         * proper flag is true
         *
         * @return {void}
         */
        function createMaskingClip() {
            if (isAnimated) {
                // We use a white rectangle to simulate the line drawing animation
                maskingRectangle = svg.append('rect')
                    .attr('class', 'masking-rectangle')
                    .attr('width', width)
                    .attr('height', height)
                    .attr('x', 0)
                    .attr('y', 0);

                maskingRectangle.transition()
                    .duration(animationDuration)
                    .ease(ease)
                    .attr('x', width)
                    .on('end', () => maskingRectangle.remove());
            }
        }

        /**
         * Draws the x and y axis on the svg object within their
         * respective groups along with the axis labels if given
         * @private
         */
        function drawAxis(){
            svg.select('.x-axis-group .axis.x')
                .attr('transform', `translate(0, ${chartHeight})`)
                .call(xAxis);

            if (xAxisFormat !== 'custom' && xAxisValueType !== 'number') {
                svg.select('.x-axis-group .month-axis')
                    .attr('transform', `translate(0, ${(chartHeight + monthAxisPadding)})`)
                    .call(xSubAxis);
            }

            if (xAxisLabel) {
                if (xAxisLabelEl) {
                    svg.selectAll('.x-axis-label').remove();
                }
                let xLabelXPosition = chartWidth/2;
                let xLabelYPosition = chartHeight + monthAxisPadding + xAxisLabelPadding;

                xAxisLabelEl = svg.select('.x-axis-group')
                  .append('text')
                    .attr('x', xLabelXPosition)
                    .attr('y', xLabelYPosition)
                    .attr('text-anchor', 'middle')
                    .attr('class', 'x-axis-label')
                    .text(xAxisLabel);
            }

            svg.select('.y-axis-group .axis.y')
                .attr('transform', `translate(${-xAxisPadding.left}, 0)`)
                .call(yAxis)
                .call(adjustYTickLabels);

            if (yAxisLabel) {
                if (yAxisLabelEl) {
                    svg.selectAll('.y-axis-label').remove();
                }
                // Note this coordinates are rotated, so they are not what they look
                let yLabelYPosition = -yAxisLabelPadding - xAxisPadding.left;
                let yLabelXPosition = -chartHeight/2;

                yAxisLabelEl = svg.select('.y-axis-group')
                  .append('text')
                    .attr('x', yLabelXPosition)
                    .attr('y', yLabelYPosition)
                    .attr('text-anchor', 'middle')
                    .attr('transform', 'rotate(270)')
                    .attr('class', 'y-axis-label')
                    .text(yAxisLabel);
            }
        }

        /**
         * Draws the line elements within the chart group
         * @private
         */
        function drawLines(){
            let lines,
                topicLine;

            // clear tooltip chache on path redraw
            pathYCache = {};

            topicLine = d3Shape.line()
                .curve(curveMap[lineCurve])
                .x(({date}) => xScale(date))
                .defined(({ value }) => value !== null)
                .y(({value}) => yScale(value));

            lines = svg.select('.chart-group').selectAll('.line')
                .data(dataByTopic, getTopic);

            paths = lines.enter()
                .append('g')
                .attr('class', 'topic')
                .append('path')
                .attr('class', 'line')
                .merge(lines)
                .attr('id', ({topic}) => topic)
                .attr('d', ({dates}) => topicLine(dates))
                .style('stroke', (d) => (
                    dataByTopic.length === 1 ? `url(#${lineGradientId})` : getLineColor(d)
                ))
                .style('fill', 'none');

            lines
                .exit()
                .remove();
        }

        /**
         * Draws grid lines on the background of the chart
         * @return void
         */
        function drawGridLines(xTicks, yTicks){
            svg.select('.grid-lines-group')
                .selectAll('line')
                .remove();

            let minY = d3Array.min(dataByTopic, ({dates}) => d3Array.min(dates, getValue));
            let shouldHighlightXAxis = minY < 0;

            if (grid === 'horizontal' || grid === 'full') {
                horizontalGridLines = svg.select('.grid-lines-group')
                    .selectAll('line.horizontal-grid-line')
                    .data(yScale.ticks(yTicks))
                    .enter()
                      .append('line')
                        .attr('class', 'horizontal-grid-line')
                        .attr('x1', (-xAxisPadding.left - verticalShift))
                        .attr('x2', chartWidth)
                        .attr('y1', (d) => yScale(d))
                        .attr('y2', (d) => yScale(d))
                        .classed('horizontal-grid-line--highlighted', (value) => shouldHighlightXAxis && value === 0);
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
                    .attr('x1', (-xAxisPadding.left - verticalShift))
                    .attr('x2', chartWidth)
                    .attr('y1', height - margin.bottom - margin.top)
                    .attr('y2', height - margin.bottom - margin.top);
        }

        /**
         * Draws custom user-defined lines onto the chart
         * @return void
         */
        function drawCustomLines(){
            svg.select('.custom-lines-group')
                .selectAll('line')
                .remove();

            let yValues = customLines.map(line => line.y);

            let getColor = yValue => {
                const definedColor = customLines.find(line => line.y === yValue).color;
                if(definedColor) {
                    return definedColor;
                }

                return defaultCustomLineColor;
            }

            //draw a horizontal line to extend x-axis till the edges
            verticalLines = svg.select('.custom-lines-group')
                .selectAll('line.custom-line')
                .data(yValues)
                .enter()
                  .append('line')
                  .attr('class', 'custom-line')
                  .attr('x1', 0)
                  .attr('x2', chartWidth)
                  .attr('y1', (d) => yScale(d))
                  .attr('y2', (d) => yScale(d))
                  .attr('stroke', (d) => getColor(d))
                  .attr('fill', 'none');

            // draw the annotations right above the line at the right end of the chart
            for(let line of customLines) {
                if (line.name) {
                    svg.select('.custom-lines-group')
                        .append('text')
                        .attr('x', chartWidth)
                        .attr('y', yScale(line.y) - 6)
                        .attr('class', 'custom-line-annotation')
                        .attr('text-anchor', 'end')
                        .attr('dominant-baseline', 'baseline')
                        .text(line.name);
                }
            }
        }

        /**
         * Draws an overlay element over the graph
         * @inner
         * @return void
         */
        function drawHoverOverlay(){
            if (!overlay) {
                overlay = svg.select('.metadata-group')
                  .append('rect')
                    .attr('class','overlay')
                    .attr('y1', 0)
                    .attr('y2', height)
                    .attr('height', chartHeight)
                    .attr('width', chartWidth)
                    .attr('fill', overlayColor)
                    .style('display', 'none');
            }
        }

        /**
         * Draws all data points of the chart
         * if shouldShowAllDataPoints is set to true
         * @private
         * @return void
         */
        function drawAllDataPoints() {
            svg.select('.chart-group')
                .selectAll('.data-points-container')
                .remove();

            const nodesById = paths.nodes().reduce((acc, node) => {
                acc[node.id] = node

                return acc;
            }, {});


            const allTopics = dataSorted.reduce((accum, dataPoint) => {
                const dataPointTopics = dataPoint.topics.map(topic => ({
                    topic,
                    node: nodesById[topic.name]
                }));

                accum = [...accum, ...dataPointTopics];

                return accum;
            }, []);

            let allDataPoints = svg.select('.chart-group')
              .append('g')
              .classed('data-points-container', true)
              .selectAll('circle')
              .data(allTopics)
              .enter()
                .append('circle')
                .classed('data-point-mark', true)
                .attr('r', highlightCircleRadius)
                .style('stroke-width', highlightCircleStroke)
                .style('stroke', (d) => topicColorMap[d.topic.name])
                .style('cursor', 'pointer')
                .attr('cx', d => xScale(castValueToType(d.topic.date, xAxisValueType)))
                .attr('cy', d => getPathYFromX(xScale(castValueToType(d.topic.date, xAxisValueType)), d.node, d.topic.name));
        }

        /**
         * Creates the vertical marker
         * @return void
         */
        function drawVerticalMarker(){
            if (!verticalMarkerContainer) {
                verticalMarkerContainer = svg.select('.metadata-group')
                  .append('g')
                    .attr('class', 'hover-marker vertical-marker-container')
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
        }

        /**
         * Finds out which datapoint is closer to the given x position
         * @param  {Number} x0 Date or number value for data point
         * @param  {Object} d0 Previous datapoint
         * @param  {Object} d1 Next datapoint
         * @return {Object}    d0 or d1, the datapoint with closest date to x0
         */
        function findOutNearestDate(x0, d0, d1){
            if(xAxisValueType === 'number') {
                return (x0 - d0.date) > (d1.date - x0) ? d0 : d1;
            }

            return (new Date(x0).getTime() - new Date(d0.date).getTime()) > (new Date(d1.date).getTime() - new Date(x0).getTime()) ? d0 : d1;
        }

        /**
         * Finds out the data entry that is closer to the given position on pixels
         * @param  {Number} mouseX X position of the mouse
         * @return {Object}        Data entry that is closer to that x axis position
         */
        function getNearestDataPoint(mouseX) {
            let dateFromInvertedX = xScale.invert(mouseX);
            let bisectDate = d3Array.bisector(getDate).left;
            let dataEntryIndex = bisectDate(dataSorted, dateFromInvertedX, 1);
            let dataEntryForXPosition = dataSorted[dataEntryIndex];
            let previousDataEntryForXPosition = dataSorted[dataEntryIndex - 1];
            let nearestDataPoint;

            if (previousDataEntryForXPosition && dataEntryForXPosition) {
                nearestDataPoint = findOutNearestDate(dateFromInvertedX, dataEntryForXPosition, previousDataEntryForXPosition);
            } else {
                nearestDataPoint = dataEntryForXPosition;
            }

            return nearestDataPoint;
        }

        /**
         * MouseMove handler, calculates the nearest dataPoint to the cursor
         * and updates metadata related to it
         * @private
         */
        function handleMouseMove(e){
            let [xPosition, yPosition] = d3Selection.mouse(e),
                xPositionOffset = -margin.left, //Arbitrary number, will love to know how to assess it
                dataPoint = getNearestDataPoint(xPosition + xPositionOffset),
                dataPointXPosition;

            if (dataPoint) {
                dataPointXPosition = xScale(castValueToType(dataPoint.date, xAxisValueType));
                // More verticalMarker to that datapoint
                moveVerticalMarker(dataPointXPosition);
                // Add data points highlighting
                highlightDataPoints(dataPoint);
                // Emit event with xPosition for tooltip or similar feature
                dispatcher.call('customMouseMove', e, dataPoint, topicColorMap, dataPointXPosition, yPosition);
            }
        }

        /**
         * MouseOut handler, hides overlay and removes active class on verticalMarkerLine
         * It also resets the container of the vertical marker
         * @private
         */
        function handleMouseOut(e, d){
            overlay.style('display', 'none');
            verticalMarkerLine.classed('bc-is-active', false);
            verticalMarkerContainer.attr('transform', 'translate(9999, 0)');

            dispatcher.call('customMouseOut', e, d, d3Selection.mouse(e));
        }

        /**
         * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
         * @private
         */
        function handleMouseOver(e, d){
            overlay.style('display', 'block');
            verticalMarkerLine.classed('bc-is-active', true);

            dispatcher.call('customMouseOver', e, d, d3Selection.mouse(e));
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
         * Touchmove highlighted points
         * It will only pass the information with the event
         * @private
         */
        function handleTouchMove(e, d) {
            dispatcher.call('customTouchMove', e, d, d3Selection.touch(e));
        }

        /**
         * Creates coloured circles marking where the exact data y value is for a given data point
         * @param  {Object} dataPoint Data point to extract info from
         * @private
         */
        function highlightDataPoints(dataPoint) {
            cleanDataPointHighlights();

            const nodes = paths.nodes()
            const nodesById = nodes.reduce((acc, node) => {
                acc[node.id] = node

                return acc;
            }, {});

            // Group corresponding path node with its topic, and
            // sorting the topics based on the order of the colors,
            // so that the order always stays constant
            const topicsWithNode = dataPoint.topics
                .map(topic => ({
                    topic,
                    node: nodesById[topic.name]
                }))
                .filter(({topic}) => !!topic)
                .sort((a, b) => topicColorMap[a.topic.name] < topicColorMap[b.topic.name])

            dataPoint.topics = topicsWithNode.map(({topic}) => topic);

            dataPoint.topics.forEach((d, index) => {
                let marker = verticalMarkerContainer
                  .append('g')
                    .classed('circle-container', true)
                      .append('circle')
                        .classed('data-point-highlighter', true)
                        .attr('cx', highlightCircleSize)
                        .attr('cy', 0)
                        .attr('r', highlightCircleRadius)
                        .style('stroke-width', () => (
                            shouldShowAllDataPoints ? highlightCircleStrokeAll : highlightCircleStroke
                        ))
                        .style('stroke', topicColorMap[d.name])
                        .style('cursor', 'pointer')
                        .on('click', function () {
                            addGlowFilter(this);
                            handleHighlightClick(this, d);
                        })
                        .on('mouseout', function () {
                            removeFilter(this);
                        });

                const path = topicsWithNode[index].node;
                const x = xScale(castValueToType(dataPoint.topics[index].date, xAxisValueType));
                const y = getPathYFromX(x, path, d.name);

                marker.attr('transform', `translate( ${(-highlightCircleSize)}, ${y} )` );
            });
        }

        /**
         * Finds the y coordinate of a path given an x coordinate and the line's path node.
         * @param  {number} x The x coordinate
         * @param  {node} path The path node element
         * @param {*} name - The name identifier of the topic
         * @param  {number} error The margin of error from the actual x coordinate. Default 0.01
         * @private
         */
        function getPathYFromX(x, path, name, error) {
            const key = `${name}-${x}`;

            if (key in pathYCache) {
                return pathYCache[key];
            }

            error = error || 0.01;

            const maxIterations = 100;

            let lengthStart = 0;
            let lengthEnd = path.getTotalLength();
            let point;
            try {
                point = path.getPointAtLength((lengthEnd + lengthStart) / 2);
            } catch (e) {
                point = {x: 0, y: 0}
            }
            let iterations = 0;

            while (x < point.x - error || x > point.x + error) {
                const midpoint = (lengthStart + lengthEnd) / 2;

                try {
                    point = path.getPointAtLength(midpoint);
                } catch (e) {
                    point = {x: 0, y: 0}
                }

                if (x < point.x) {
                    lengthEnd = midpoint;
                } else {
                    lengthStart = midpoint;
                }

                iterations += 1;
                if (maxIterations < iterations) {
                    break;
                }
            }

            pathYCache[key] = point.y

            return pathYCache[key]
        }

        /**
         * Helper method to update the x position of the vertical marker
         * @param  {Object} dataPoint Data entry to extract info
         * @return void
         */
        function moveVerticalMarker(verticalMarkerXPosition){
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
         * @return {Boolean} Should we build the tooltip?
         */
        function shouldShowTooltip() {
            return width > tooltipThreshold;
        }

        // API

        /**
         * Gets or Sets the aspect ratio of the chart
         * @param  {Number} _x Desired aspect ratio for the graph
         * @return { (Number | Module) } Current aspect ratio or Line Chart module to chain calls
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
         * Gets or Sets the label of the X axis of the chart
         * @param  {String} _x Desired label for the X axis
         * @return { (String | Module) } Current label of the X axis or Line Chart module to chain calls
         * @public
         */
        exports.xAxisLabel = function(_x) {
            if (!arguments.length) {
                return xAxisLabel;
            }
            xAxisLabel = _x;

            return this;
        };

        /**
         * Gets or Sets the label of the Y axis of the chart
         * @param  {String} _x Desired label for the Y axis
         * @return { (String | Module) } Current label of the Y axis or Line Chart module to chain calls
         * @public
         */
        exports.yAxisLabel = function(_x) {
            if (!arguments.length) {
                return yAxisLabel;
            }
            yAxisLabel = _x;

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
         * Exposes the ability to force the chart to show a certain x axis grouping
         * @param  {String} _x Desired format
         * @return { (String|Module) }    Current format or module to chain calls
         * @public
         * @example
         *     line.xAxisFormat(line.axisTimeCombinations.HOUR_DAY)
         */
        exports.xAxisFormat = function(_x) {
            if (!arguments.length) {
              return xAxisFormat;
            }
            xAxisFormat = _x;

            return this;
        };

        /**
         * Exposes the ability to force the chart to show a certain x format
         * It requires a `xAxisFormat` of 'custom' in order to work.
         * NOTE: localization not supported
         * @param  {String} _x              Desired format for x axis
         * @return { (String|Module) }      Current format or module to chain calls
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
         * Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisFormat` of 'custom' in order to work.
         * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
         * how many and where the ticks will appear.
         *
         * @param  {Number} _x              Desired number of x axis ticks (multiple of 2, 5 or 10)
         * @return { (Number|Module) }      Current number or ticks or module to chain calls
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
         * Gets or Sets the grid mode.
         *
         * @param  {String} _x Desired mode for the grid ('vertical'|'horizontal'|'full')
         * @return { String | module} Current mode of the grid or Line Chart module to chain calls
         * @public
         */
        exports.grid = function(_x) {
            if (!arguments.length) {
                return grid;
            }
            grid = _x;

            return this;
        };

        /**
         * Gets or Sets the height of the chart
         * @param  {Number} _x Desired width for the graph
         * @return { (Number | Module) } Current height or Line Chart module to chain calls
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
         * @return { (Object | Module) } Current margin or Line Chart module to chain calls
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
         * Gets or Sets the number format of the line chart
         * @param  {string} _x Desired number format for the line chart
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
         * Gets or Sets the curve of the line chart
         * @param  {curve} _x Desired curve for the lines, default 'linear'. Other options are:
         * basis, natural, monotoneX, monotoneY, step, stepAfter, stepBefore, cardinal, and
         * catmullRom. Visit https://github.com/d3/d3-shape#curves for more information.
         * @return { (curve | Module) } Current line curve or Line Chart module to chain calls
         * @public
         */
        exports.lineCurve = function(_x) {
            if (!arguments.length) {
                return lineCurve;
            }
            lineCurve = _x;

            return this;
        };

        /**
         * Gets or Sets the gradient colors of the line chart when there is only one line
         * @param  {String[]} _x Desired color gradient for the line (array of two hexadecimal numbers)
         * @return { (Number | Module) } Current color gradient or Line Chart module to chain calls
         * @public
         */
        exports.lineGradient = function(_x) {
            if (!arguments.length) {
                return singleLineGradientColors;
            }
            singleLineGradientColors = _x;

            return this;
        };

        /**
         * Gets or Sets the topicLabel of the chart
         * @param  {Boolean} _x=false       Whether all data points should be drawn
         * @return {shouldShowAllDataPoints | module}   Current shouldShowAllDataPoints or Chart module to chain calls
         * @public
         */
        exports.shouldShowAllDataPoints = function(_x) {
            if (!arguments.length) {
                return shouldShowAllDataPoints;
            }
            shouldShowAllDataPoints = _x;

            return this;
        }

        /**
         * Gets or Sets the minimum width of the graph in order to show the tooltip
         * NOTE: This could also depend on the aspect ratio
         * @param  {Number} _x Desired tooltip threshold for the graph
         * @return { (Number | Module) } Current tooltip threshold or Line Chart module to chain calls
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
         * Gets or Sets the topicLabel of the chart
         * @param  {Number} _x Desired topicLabel for the graph
         * @return {topicLabel | module} Current topicLabel or Chart module to chain calls
         * @public
         */
        exports.topicLabel = function(_x) {
            if (!arguments.length) {
                return topicLabel;
            }
            topicLabel = _x;

            return this;
        };

        /**
         * Gets or Sets the valueLabel of the chart
         * @param  {Number} _x Desired valueLabel for the graph
         * @return {valueLabel | module} Current valueLabel or Chart module to chain calls
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
         * Gets or Sets the yAxisLabelPadding of the chart.
         * The default value is -36
         * @param  {Number} _x Desired yAxisLabelPadding for the graph
         * @return {yAxisLabelPadding | module} Current yAxisLabelPadding or Chart module to chain calls
         * @public
         */
        exports.yAxisLabelPadding = function(_x) {
            if (!arguments.length) {
                return yAxisLabelPadding;
            }
            yAxisLabelPadding = _x;

            return this;
        }

        /**
         * Gets or Sets the number of ticks of the y axis on the chart
         * (Default is 5)
         * @param  {Number} _x          Desired yTicks
         * @return {Number | module}   Current yTicks or Chart module to chain calls
         * @public
         */
        exports.yTicks = function(_x) {
            if (!arguments.length) {
                return yTicks;
            }
            yTicks = _x;

            return this;
        };

        /**
         * Gets or Sets the width of the chart
         * @param  {Number} _x Desired width for the graph
         * @return {Number | Module} Current width or Line Chart module to chain calls
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
         * Pass language tag for the tooltip to localize the date.
         * Feature uses Intl.DateTimeFormat, for compatability and support, refer to
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
         * @param  {String} _x  must be a language tag (BCP 47) like 'en-US' or 'fr-FR'
         * @return { (String|Module) }    Current locale or module to chain calls
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
         * Add custom horizontal lines to the Chart - this way you are able to plot arbitrary horizontal lines
         * onto the chart with a specific color and a text annotation over the line.
         * @param  {Object[]} _x  Array of Objects describing the lines
         * @return { (Object[] | Module) }    Current lines or module to chain calls
         * @public
         * @example line.lines([{
         *   y: 2,
         *   name: 'Maximum threshold',
         *   color: '#ff0000'
         * }])
         */
        exports.lines = function(_x) {
            if (!arguments.length) {
                return customLines;
            }
            customLines = _x;

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
         * customMouseHover, customMouseMove, customMouseOut,
         * customDataEntryClick, and customTouchMove
         *
         * @return {module} Bar Chart
         * @public
         */
        exports.on = function() {
            let value = dispatcher.on.apply(dispatcher, arguments);

            return value === dispatcher ? exports : value;
        };

        /**
         * Exposes the constants to be used to force the x axis to respect a certain granularity
         * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
         * @example
         *     line.xAxisCustomFormat(line.axisTimeCombinations.HOUR_DAY)
         */
        exports.axisTimeCombinations = axisTimeCombinations;

        /**
         * Gets or Sets the `xAxisValueType`.
         * Choose between 'date' and 'number'. When set to `number` the values of the x-axis must not
         * be dates anymore, but can be arbitrary numbers.
         * @param  {string} [_x='date']      Desired value type of the x-axis
         * @return {string | module}    Current value type of the x-axis or Chart module to chain calls
         * @public
         * @example line.xAxisValueType('numeric')
         */
        exports.xAxisValueType = function (_x) {
            if (!arguments.length) {
                return xAxisValueType;
            }
            xAxisValueType = _x;

            return this;
        };

        /**
         * Gets or Sets the `xAxisScale`.
         * Choose between 'linear' and 'logarithmic'. The setting will only work if `xAxisValueType` is set to
         * 'number' as well, otherwise it won't influence the visualization.
         * @param  {string} [_x='linear']      Desired value type of the x-axis
         * @return {string | module}    Current value type of the x-axis or Chart module to chain calls
         * @public
         * @example line.xAxisValueType('numeric').xAxisScale('logarithmic')
         */
        exports.xAxisScale = function (_x) {
            if (!arguments.length) {
                return xAxisScale;
            }
            xAxisScale = _x;

            return this;
        };

        return exports;
    };

});
