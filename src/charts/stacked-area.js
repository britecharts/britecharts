define(function(require){
    'use strict';

    const _ = require('underscore'),
        d3 = require('d3');

    /**
     * @typdef D3Layout
     * @type function
     */

    /**
     * @fileOverview Stacked Area Chart reusable API module that allows us
     * rendering a multi area and configurable chart.
     *
     * @tutorial stacked-area
     * @exports charts/stacked-area
     * @requires d3
     * @version 0.0.1
     */
    return function module(){

        let margin = {
                left: 40,
                right: 20,
                top: 60,
                bottom: 40
            },
            width = 960,
            height = 500,

            xScale, xAxis, xMonthAxis,
            yScale, yAxis,

            monthAxisPadding = 30,
            numVerticalTicks = 5,
            yTickTextYOffset = -8,

            colors = [
                '#051C48',
                '#9963D5',
                '#FF4D7C',
                '#E5C400',
                '#4DDB86',
                '#4DC2F5'
            ],
            colorOrder = {
                '#051C48': 0,
                '#9963D5': 1,
                '#FF4D7C': 2,
                '#E5C400': 3,
                '#4DDB86': 4,
                '#4DC2F5': 5
            },
            areaOpacity = 0.8,
            colorScale,
            categoryColorMap,

            layers,
            layersInitial,
            area,

            // Area Animation
            maxAreaNumber = 8,
            areaAnimationDelayStep = 20,
            areaAnimationDelays = d3.range(areaAnimationDelayStep, maxAreaNumber* areaAnimationDelayStep, areaAnimationDelayStep),

            overlay,

            verticalMarkerContainer,
            verticalMarker,

            dataPoints            = {},
            pointsSize            = 1.5,
            pointsColor           = '#c0c6cc',
            pointsBorderColor     = '#ffffff',

            ease = 'quad-out',
            areaAnimationDuration = 1000,

            svg,
            chartWidth, chartHeight,
            data,
            dataByDate,

            tooltipThreshold = 480,

            dateLabel = 'dateUTC',
            valueLabel = 'views',

            // getters
            getValueLabel = d => d[valueLabel],
            getValues = d => d.values,
            getKey = d => d.key,
            getName = d => d.name,
            getDate = d => d.date,


            // formats
            utc = d3.time.format.utc('%Y-%m-%dT%H:%M:%SZ'),
            parseUTC = utc.parse,

            yTickFormat = d3.format('s'),
            xTickFormat = d3.time.format('%e'),
            xTickMonthFormat = d3.time.format('%B'),

            // events
            dispatch = d3.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');


        /**
         * This function creates the graph using the selection and data provided
         * @param  {D3Selection} _selection A d3 selection that represents
         * the container(s) where the chart(s) will be rendered
         */
        function exports(_selection) {
            /** @param {object} _data The data to attach and generate the chart */
            _selection.each(function(_data){
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = cleanData(_data);

                dataByDate = d3.nest()
                    .key( getDate )
                    .entries(
                        _(_data).sortBy('date')
                    );

                buildLayers();
                buildScales();
                buildAxis();
                buildSVG(this);
                drawStackedAreas();
                drawAxis();
                drawDataReferencePoints();

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
        function addMouseEvents(){
            svg
                .on('mouseover', handleMouseOver)
                .on('mouseout', handleMouseOut)
                .on('mousemove', handleMouseMove);
        }

        /**
         * Creates the d3 x and y axis, setting orientations
         * @private
         */
        function buildAxis(){
            xAxis = d3.svg.axis()
                .scale(xScale)
                .ticks(d3.time.days)
                .tickFormat(xTickFormat)
                .tickSize(10, 0, 0)
                .outerTickSize([50])
                .tickPadding([10])
                .orient('bottom');

            //TODO: Review this axis with real data
            xMonthAxis = d3.svg.axis()
                .scale(xScale)
                .ticks(d3.time.months)
                .tickFormat(xTickMonthFormat)
                .tickSize(10, 0, 0)
                .tickPadding([10])
                .orient('bottom');

            yAxis = d3.svg.axis()
                .scale(yScale)
                .ticks(numVerticalTicks)
                .tickFormat(yTickFormat)
                .tickSize(width, 0, 0)
                .outerTickSize([50])
                .tickPadding([4])
                .orient('right');
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
            let stack = d3.layout.stack()
                    .offset('zero')
                    .values(getValues)
                    .x(getDate)
                    .y(getValueLabel),
                nest = d3.nest()
                    .key(getName);

            layersInitial = stack(nest.entries(createEmptyInitialSet(data)));
            layers = stack(nest.entries(data));
        }

        /**
         * Creates the x, y and color scales of the chart
         * @private
         */
        function buildScales(){
            xScale = d3.time.scale()
                .domain(d3.extent(data, d => d.date))
                .range([0, chartWidth]);

            yScale = d3.scale.linear()
                .domain([0, d3.max(data, d => (d.y0 + d.y) )])
                .range([chartHeight, 0])
                .nice([numVerticalTicks + 1]);

            colorScale = d3.scale.ordinal()
                  .range(colors)
                  .domain(data.map(getName));

            categoryColorMap = _.object(
                colorScale.domain(),
                colorScale.range()
            );
        }

        /**
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @private
         */
        function buildSVG(container){
            if (!svg) {
                svg = d3.select(container)
                    .append('svg')
                    .classed('britechart stacked-area', true);

                buildContainerGroups();
            }

            svg
                .transition()
                .ease(ease)
                .attr({
                    width: width,
                    height: height
                });
        }

        /**
         * Parses dates and values into JS Date objects and numbers
         * @param  {obj} data Raw data from JSON file
         * @return {obj}      Parsed data with values and dates
         */
        function cleanData(data) {
            data.forEach(function(d){
                d.date = parseUTC( d[dateLabel] );
                d[valueLabel] = +d[valueLabel];
            });

            return data;
        }

        /**
         * Removes all the datapoints highlighter circles added to the marker container
         * @return void
         */
        function eraseDataPointHighlights(){
            verticalMarkerContainer.selectAll('.circle-container').remove();
        }

        /**
         * Creates a copy of the data with values set to 0
         * @param  {obj[]} data Array of objects with the original data
         * @return {obj[]}      Array of objects with the original data and 0 values
         */
        function createEmptyInitialSet(data) {
            // Parsing and stringify is a way of duplicating an array of objects
            return cleanData(
                JSON.parse(JSON.stringify(data))
                    .map(function(value){
                        value[valueLabel] = 0;
                        // value.date = parseUTC(value)
                        return value;
                    })
                );
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
                .attr('transform', `translate( ${-margin.left}, 0)`)
                .call(yAxis);

            // Moving the YAxis tick labels to the right side
            d3.selectAll('.y-axis-group .tick text')
                .attr('transform', `translate( ${- width}, ${yTickTextYOffset})` );
        }

        /**
         * Creates SVG dot elements for each data entry and draws them
         */
        function drawDataReferencePoints() {
            // Creates Dots on Data points
            var points = svg.select('.chart-group').selectAll('.dots')
                .data(layers)
              .enter().append('g')
                .attr({
                    'class': 'dots',
                    'd': d => area(d.values),
                    'clip-path': 'url(#clip)'
                });

            // Processes the points
            // TODO: Optimize this code
            points.selectAll('.dot')
                .data(function(d, index){
                    var a = [];

                    d.values.forEach(function(point){
                        a.push({'index': index, 'point': point});
                    });
                    return a;
                })
                .enter()
                .append('circle')
                .attr('class','dot')
                .attr('r', function(){
                    return pointsSize;
                })
                .attr('fill', function(){
                    return pointsColor;
                })
                .attr('stroke-width', '0')
                .attr('stroke', pointsBorderColor)
                .attr('transform', function(d) {
                    var key = xScale(d.point.date);

                    dataPoints[key] = dataPoints[key] || [];
                    dataPoints[key].push(d);

                    return `translate( ${xScale(d.point.date)}, ${yScale(d.point.y+d.point.y0)} )`;
                });
        }

        /**
         * Draws an overlay element over the graph
         * @private
         */
        function drawHoverOverlay(){
            overlay = svg.select('.metadata-group')
                .append('rect')
                .attr({
                    'class': 'overlay',
                    'y1': 0,
                    'y2': chartHeight,
                    'height': chartHeight,
                    'width': chartWidth
                })
                .attr('fill', 'rgba(0,0,0,0)') // TODO: remove after development
                .style('display', 'none');
        }

        /**
         * Draws the different areas into the chart-group element
         * @private
         */
        function drawStackedAreas(){
            let areas =  svg.select('.chart-group').selectAll('.layer')
                .data(layersInitial);

            // Creating Area function
            area = d3.svg.area()
                .interpolate('cardinal')
                .x( d => xScale(d.date) )
                .y0( d => yScale(d.y0) )
                .y1( d => yScale(d.y0 + d.y) );

            // Enter
            areas.enter()
                .append('path')
                .attr('class', 'layer')
                .attr('d', d => area(d.values))
                .style('fill', d => categoryColorMap[d.key]);

            // Update
            svg.select('.chart-group').selectAll('.layer')
                .data(layers)
                .transition()
                .delay( (d, i) => areaAnimationDelays[i])
                .duration(areaAnimationDuration)
                .ease(ease)
                .attr('d', d => area(d.values))
                .style('opacity', areaOpacity)
                .style('fill', d => categoryColorMap[d.key]);

            // Exit
            areas.exit()
                .transition().style({ opacity: 0 }).remove();
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
                    'x1': 0,
                    'y1': 0,
                    'x2': 0,
                    'y2': 0
                }])
                .enter()
                .append('line')
                .classed('vertical-marker', true)
                .attr({
                    'x1': 0,
                    'y1': chartHeight,
                    'x2': 0,
                    'y2': 0
                });
        }

        /**
         * Finds out which datapoint is closer to the given x position
         * NOTE: this would round to the previous one, we should try to make this
         * work using the xMouse position instead of the date for the datapoint
         * @param  {number} x0 Date value for data point
         * @param  {obj} d0 Previous datapoint
         * @param  {obj} d1 Next datapoint
         * @return {obj}    d0 or d1, the datapoint with closest date to x0
         */
        function findOutNearestDate(x0, d0, d1){
            return (new Date(x0).getTime() - new Date(d0.key).getTime()) > (new Date(d1.key).getTime() - new Date(x0).getTime()) ? d0 : d1;
        }

        /**
         * Formats the date in ISOString
         * @param  {string} date Date as given in data entries
         * @return {string}      Date in ISO format in a neutral timezone
         */
        function getFormattedDateFromData(date) {
            return date.toISOString().split('T')[0] + 'T00:00:00Z';
        }

        /**
         * Extract X position on the chart from a given mouse event
         * @param  {obj} event D3 mouse event
         * @return {number}       Position on the x axis of the mouse
         * @private
         */
        function getMouseXPosition(event) {
            return d3.mouse(event)[0];
        }

        /**
         * Finds out the data entry that is closer to the given position on pixels
         * @param  {number} mouseX X position of the mouse
         * @return {obj}        Data entry that is closer to that x axis position
         */
        function getNearestDataPoint(mouseX) {
            let invertedX = xScale.invert(mouseX),
                bisectDate = d3.bisector(getKey).right,
                dataEntryIndex, dateOnCursorXPosition,
                dataEntryForXPosition, previousDataEntryForXPosition,
                nearestDataPoint;

            dateOnCursorXPosition = getFormattedDateFromData(invertedX);
            dataEntryIndex = bisectDate(dataByDate, dateOnCursorXPosition, 1);
            dataEntryForXPosition = dataByDate[dataEntryIndex];
            previousDataEntryForXPosition = dataByDate[dataEntryIndex - 1];

            if (previousDataEntryForXPosition && dataEntryForXPosition) {
                nearestDataPoint = findOutNearestDate(dateOnCursorXPosition, dataEntryForXPosition, previousDataEntryForXPosition);
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
        function handleMouseMove(){
            let xPositionOffset = -margin.left, //Arbitrary number, will love to know how to assess it
                dataPoint = getNearestDataPoint(getMouseXPosition(this) + xPositionOffset),
                dataPointXPosition;

            if(dataPoint) {
                dataPointXPosition = xScale(new Date( dataPoint.key ));
                // More verticalMarker to that datapoint
                moveVerticalMarker(dataPointXPosition);
                // Add data points highlighting
                highlightDataPoints(dataPoint);
                // Emit event with xPosition for tooltip or similar feature
                dispatch.customMouseMove(dataPoint, categoryColorMap, dataPointXPosition);
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

            dispatch.customMouseOut(data);
        }

        /**
         * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
         * @private
         */
        function handleMouseOver(data){
            overlay.style('display', 'block');
            verticalMarker.classed('bc-is-active', true);

            dispatch.customMouseOver(data);
        }

        /**
         * Creates coloured circles marking where the exact data y value is for a given data point
         * @param  {obj} dataPoint Data point to extract info from
         * @private
         */
        function highlightDataPoints(dataPoint) {
            let accumulator = 0;

            eraseDataPointHighlights();

            // sorting the values based on the order of the colors,
            // so that the order always stays constant
            dataPoint.values = _.chain(dataPoint.values)
                .compact()
                .sortBy(function(el) {
                    return colorOrder[categoryColorMap[el.category]];
                })
                .value();

            dataPoint.values.forEach(function(value, index){
                let marker = verticalMarkerContainer
                                .append('g')
                                .classed('circle-container', true),
                    circleSize = 12;

                accumulator = accumulator + dataPoint.values[index][valueLabel];

                marker.append('circle')
                    .classed('data-point-highlighter', true)
                    .attr({
                        'cx': circleSize,
                        'cy': 0,
                        'r': 5
                    })
                    .style({
                        'stroke-width': 3,
                        'stroke': categoryColorMap[value.name]
                    });

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
         * Gets or Sets the ease of the chart
         * @param  {number} _x Desired width for the graph
         * @return { ease | module} Current ease animation or Area Chart module to chain calls
         * @public
         */
        exports.ease = function(_x) {
            if (!arguments.length) {
                return ease;
            }
            ease = _x;
            return this;
        };

        /**
         * Gets or Sets the height of the chart
         * @param  {number} _x Desired width for the graph
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
         * @param  {object} _x Margin object to get/set
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
         * @param  {object} _x Margin object to get/set
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
         * @param  {number} _x Desired width for the graph
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
         * @param  {number} _x Desired valueLabel for the graph
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
         * @param  {number} _x Desired dateLabel for the graph
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

        // Rebind 'customHover' event to the "exports" function, so it's available "externally" under the typical "on" method:
        d3.rebind(exports, dispatch, 'on');

        return exports;
    };

});
