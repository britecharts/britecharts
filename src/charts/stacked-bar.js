define(function(require){
    'use strict';

    const d3Array = require('d3-array');
    const d3Axis = require('d3-axis');
    const d3Color = require('d3-color');
    const d3Collection = require('d3-collection');
    const d3Dispatch = require('d3-dispatch');
    const d3Ease = require('d3-ease');
    const d3Scale = require('d3-scale');
    const d3Shape = require('d3-shape');
    const d3Selection = require('d3-selection');
    const d3Transition = require('d3-transition');
    const d3TimeFormat = require('d3-time-format');

    const _ = require('underscore');
    const {exportChart} = require('./helpers/exportChart');
    const colorHelper = require('./helpers/colors');
    const timeAxisHelper = require('./helpers/timeAxis');
    const {isInteger} = require('./helpers/common');
    const {axisTimeCombinations} = require('./helpers/constants');
    const NUMBER_FORMAT = ',f';
    const {
      formatIntegerValue,
      formatDecimalValue,
    } = require('./helpers/formatHelpers');

    const uniq = (arrArg) => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) == pos);


    /**
     * @typdef D3Layout
     * @type function
     */

    /**
     * @typedef areaChartData
     * @type {Object}
     * @property {Object[]} data       All data entries
     * @property {String} date         Date of the entry
     * @property {String} name         Name of the entry
     * @property {Number} value        Value of the entry
     *
     * @example
     * {
     *     'data': [
     *         {
     *             "date": "2011-01-05T00:00:00Z",
     *             "name": "Direct",
     *             "value": 0
     *         }
     *     ]
     * }
     */

    /**
     * Stacked Area Chart reusable API module that allows us
     * rendering a multi area and configurable chart.
     *
     * @module Stacked-bar
     * @tutorial stacked-bar
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
            zScale,
            
            aspectRatio = null,

            monthAxisPadding = 30,
            verticalTicks = 5,
            yTickTextYOffset = -8,
            yTickTextXOffset = -20,
            tickPadding = 5,
            numOfVerticalTicks = 5,
            numOfHorizontalTicks = 5,
             percentageAxisToMaxRatio = 1,

            colorSchema = colorHelper.colorSchemas.britechartsColorSchema,

            colorOrder = colorSchema
                .reduce((acc, color, index) => {
                    acc[color] = index;

                    return acc;
                }, {}),
            areaOpacity = 0.64,
            colorScale,
            categoryColorMap,

            forceAxisSettings = null,
            forcedXTicks = null,
            forcedXFormat = null,

            baseLine,
            maskGridLines,

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
            horizontal = false,

            svg,
            chartWidth, chartHeight,
            data,
            stacks,
            dataStacked,
            dataByDate,
            dataByName,
            dataByDateormatted,
            dataByDateZeroed,

            verticalGridLines,
            horizontalGridLines,
            horizontalLabelFormat = '.0%',
            verticalLabelFormat = '.0f',
            grid = null,

            tooltipThreshold = 480,

            xAxisPadding = {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            },

            dateLabel = 'date',
            valueLabel = 'value',

            keyLabel = 'name',
            valueLabelFormat = NUMBER_FORMAT,

            // getters
            getName = ({name}) => name,
            getDate = (data) => data[dateLabel],
            getValue = ({value}) => value,
            getStack = ({stack}) => stack,
            stack3,
            dates,
            transformedData,

            // events
            dispatcher = d3Dispatch.dispatch('customMouseOver', 'customMouseOut', 'customMouseMove');

       /**
         * This function creates the graph using the selection and data provided
         * @param {D3Selection} _selection A d3 selection that represents
         * the container(s) where the chart(s) will be rendered
         * @param {areaChartData} _data The data to attach and generate the chart
         */
        function exports(_selection) {
            _selection.each(function(_data){
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = cleanData(_data);
                dataByDate= getDataByDate(data);
                dataByName = getDataByName(data);
                stacks = uniq(data.map(( {stack}) => stack));
                dates = uniq(data.map(getDate));
                stack3 = d3Shape.stack().keys(stacks)
                transformedData = d3Collection.nest()
                .key(getDate)
                .rollup(function(values) { 
                    var ret = {};
                        _(values).each((entry) => {
                                        if(entry && entry['stack']) {
                                            ret[entry['stack']] = getValue(entry);
                                            ret.values = values;//for tooltip
                                        }
                                    });
                    return ret;
                }).entries(data).map(function(data){
                    console.log('data',data)
                    var ret = data.value;
                    ret.key = data.key;
                    // ret.name = data.value.name
                    return ret
                })
                console.log('transformedData',transformedData)
            dataByDateormatted = _.chain(transformedData)
            .value();

                // .order(d3Shape.stackOrderNone)
                // .offset(d3Shape.stackOffsetNone);
                
    
                 buildScales();
                buildLayers();
               
                buildSVG(this);
                drawGridLines();
                buildAxis();
                drawAxis();
                drawStackedBar();
                //  drawDataReferencePoints();
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
             if (!horizontal) {
                xAxis = d3Axis.axisBottom(xScale);

                yAxis = d3Axis.axisLeft(yScale)
                    .ticks(numOfVerticalTicks, valueLabelFormat)
            } else {
                xAxis = d3Axis.axisBottom(xScale)
                    .ticks(numOfHorizontalTicks, valueLabelFormat)
                    .tickSizeInner([-chartHeight]);

                yAxis = d3Axis.axisLeft(yScale);
            }
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
         * Builds the stacked layers layout
         * @return {D3Layout} Layout for drawing the chart
         * @private
         */
        function buildLayers(){
            
            dataByDateZeroed = _.chain(JSON.parse(JSON.stringify(transformedData)))
                .map((item) => {
                     _(stacks).each((key) => {
                        item[key] = 0;
                    });
                    return item;
                })
                .value();
               
            layersInitial = stack3(dataByDateZeroed);
            layers  = stack3(dataByDateormatted);
            console.log('layers',layers,layersInitial)
        }
          /**
         * Configurable extension of the x axis
         * if your max point was 50% you might want to show x axis to 60%, pass 1.2
         * @param  {number} _x ratio to max data point to add to the x axis
         * @return { ratio | module} Current ratio or Bar Chart module to chain calls
         * @public
         */
        exports.percentageAxisToMaxRatio = function(_x) {
            if (!arguments.length) {
                return percentageAxisToMaxRatio;
            }
            percentageAxisToMaxRatio = _x;
            return this;
        }

        /**
         * Creates the x, y and color scales of the chart
         * @private
         */
        function buildScales() {
            let percentageAxis = Math.min(percentageAxisToMaxRatio * d3Array.max(data, getValue))
            var yMax = d3Array.max(transformedData.map(function(d){
                    var sum =0;
                    stacks.forEach(function(k){
                       sum+= d[k]
                    })
                    return sum;
                }))

            if (!horizontal) {
                xScale = d3Scale.scaleBand()
                     .domain(data.map(getDate))
                    .rangeRound([0, chartWidth])
                    .padding(0.1);

                yScale = d3Scale.scaleLinear()
                .domain([0,yMax])
                .rangeRound([chartHeight, 0])
                .nice();

                zScale = d3Scale.scaleOrdinal().domain(stacks);
            } else {
                var yMax = d3Array.max(transformedData.map(function(d){
                    var sum =0;
                    stacks.forEach(function(k){
                       sum+= d[k]
                    })
                    return sum;
                }))
                xScale = d3Scale.scaleLinear()
                    .domain([0, yMax])
                    .rangeRound([0, chartWidth]);

                yScale = d3Scale.scaleBand()
                    .domain(data.map(getDate))
                    .rangeRound([chartHeight, 0])
                    .padding(0.1);
            }

            colorScale = d3Scale.scaleOrdinal()
                .range(colorSchema)
                .domain(data.map(getStack));

            let range = colorScale.range();
            categoryColorMap = colorScale
                .domain(data.map(getDate)).domain()
                .reduce((memo, item, i) => {
                    var stack = '';
                    data.forEach(function(v){
                        if (getDate(v)==item){
                             memo[v.name] = colorScale(v.stack)
                             memo[v.stack] = colorScale(v.stack)
                            memo[v.stack + item] = colorScale(v.stack)
                        }
                    })
                    return memo;
                }, {});
                console.log(categoryColorMap)
        }

        /**
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @private
         */
        function buildSVG(container) {
            if (!svg) {
                svg = d3Selection.select(container)
                    .append('svg')
                    .classed('britechart stacked-bar', true);

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
                // d.date = new Date(d[dateLabel]);
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

            // if (forceAxisSettings !== 'custom') {
            //     svg.select('.x-axis-group .month-axis')
            //         .attr('transform', `translate(0, ${(chartHeight + monthAxisPadding)})`)
            //         .call(xMonthAxis);
            // }

            svg.select('.y-axis-group.axis')
                .attr('transform', `translate( ${-xAxisPadding.left}, 0)`)
                .call(yAxis)
                .call(adjustYTickLabels);

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
         * Draws grid lines on the background of the chart
         * @return void
         */
        function drawGridLines(){
            if (!horizontal) {
                drawVerticalGridLines();
            } else {
                drawHorizontalGridLines();
            }
        }

        /**
         * Draws the grid lines for an horizontal bar chart
         * @return {void}
         */
        function drawHorizontalGridLines() {
            maskGridLines = svg.select('.grid-lines-group')
                .selectAll('line.vertical-grid-line')
                .data(xScale.ticks(4))
                .enter()
                  .append('line')
                    .attr('class', 'vertical-grid-line')
                    .attr('y1', (xAxisPadding.left))
                    .attr('y2', chartHeight)
                    .attr('x1', (d) => xScale(d))
                    .attr('x2', (d) => xScale(d))

            //draw a horizontal line to extend y-axis till the edges
            baseLine = svg.select('.grid-lines-group')
                .selectAll('line.extended-y-line')
                .data([0])
                .enter()
                  .append('line')
                    .attr('class', 'extended-y-line')
                    .attr('y1', (xAxisPadding.left))
                    .attr('y2', chartHeight)
                    .attr('x1', 0)
                    .attr('x2', 0);
        }

        /**
         * Draws the grid lines for a vertical bar chart
         * @return {void}
         */
        function drawVerticalGridLines() {
            maskGridLines = svg.select('.grid-lines-group')
                .selectAll('line.horizontal-grid-line')
                .data(yScale.ticks(4))
                .enter()
                  .append('line')
                    .attr('class', 'horizontal-grid-line')
                    .attr('x1', (xAxisPadding.left))
                    .attr('x2', chartWidth)
                    .attr('y1', (d) => yScale(d))
                    .attr('y2', (d) => yScale(d))

            //draw a horizontal line to extend x-axis till the edges
            baseLine = svg.select('.grid-lines-group')
                .selectAll('line.extended-x-line')
                .data([0])
                .enter()
                  .append('line')
                    .attr('class', 'extended-x-line')
                    .attr('x1', (xAxisPadding.left))
                    .attr('x2', chartWidth)
                    .attr('y1', height - margin.bottom - margin.top)
                    .attr('y2', height - margin.bottom - margin.top);
        }

        /**
         * Draws an overlay element over the graph
         * @private
         */
        function drawHoverOverlay(){
            return;
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
         * Draws the bars along the x axis
         * @param  {D3Selection} bars Selection of bars
         * @return {void}
         */
        function drawHorizontalBars() {
            // Enter + Update
           svg.select('.chart-group').selectAll('.layer')
           .data(layers)
           .enter()
           .append('g')
            .classed('layer', true)
             .each(function(){
                    console.log('drawHorizontalBars',this,this.__data__)
                })
             .attr('fill', (({key}) => categoryColorMap[key]))
           .selectAll('.bar')
            .data( (d)=> d)
            .enter()
            .append('rect')
            .classed('bar', true)
                .each(function(){

                    console.log('drawHorizontalBars',this,this.__data__)
                })
                 .attr('fill', (({data}) => categoryColorMap[data.stack+data.key]))
                .attr('x', (d) => xScale(d[0]) )
                  .attr('y', (d) => yScale(d.data.key) )
                 .attr('width', (d) => xScale(d[1]) - xScale(d[0]) )
                  .attr('height', yScale.bandwidth())
                .on('mouseover', function(d) {
                    dispatcher.call('customMouseOver', this, !!d.values ? d:d.data, d3Selection.mouse(this), [chartWidth, chartHeight]);
                    // console.log(d3Color.color(d3Selection.select(this.parentNode).attr('fill')).darker())
                    // d3Selection.select(this).style('opacity',1);
                    d3Selection.select(this).attr('fill', () => d3Color.color(d3Selection.select(this.parentNode).attr('fill')).darker())
                })
                .on('mousemove', function(d) {
                    dispatcher.call('customMouseMove', this, !!d.values ? d:d.data, d3Selection.mouse(this), [chartWidth, chartHeight]);
                })
                .on('mouseout', function() {
                    dispatcher.call('customMouseOut', this);
                    d3Selection.select(this).attr('fill', () => d3Selection.select(this.parentNode).attr('fill'))
                })
                .transition()
                .delay( (_, i) => areaAnimationDelays[i])
                .duration(areaAnimationDuration)
                .ease(ease)
                .style('opacity', areaOpacity)
        }

        /**
         * Draws the bars along the y axis
         * @param  {D3Selection} bars Selection of bars
         * @return {void}
         */
        function drawVerticalBars() {
            // Enter + Update
          svg.select('.chart-group').selectAll('.layer')
           .data(layers)
           .enter()
           .append('g')
            .classed('layer', true)
             .each(function(){
                    console.log(this,this.__data__)
                })
             .attr('fill', (({key}) => categoryColorMap[key]))
           .selectAll('.bar')
            .data( (d)=> d)
            .enter()
            .append('rect')
            .classed('bar', true)
                .each(function(){
                    console.log(this,this.__data__)
                })
                 .attr('fill', (({data}) => categoryColorMap[data.stack+data.key]))
                .attr('x', (d) => xScale(d.data.key))
               
                 .attr('y', (d) => yScale(d[1]))
                .attr('width', xScale.bandwidth )
                .attr('height', (d) => yScale(d[0]) - yScale(d[1]) )
                .on('mouseover', function(d) {
                    dispatcher.call('customMouseOver', this);
                    // console.log(d3Color.color(d3Selection.select(this.parentNode).attr('fill')).darker())
                    console.log('this',d,this,d3Selection.select(this.parentNode).attr('fill'),d3Color.color(d3Selection.select(this.parentNode).attr('fill')).darker())
                    // d3Selection.select(this).style('opacity',1);
                    d3Selection.select(this).attr('fill', () => d3Color.color(d3Selection.select(this.parentNode).attr('fill')).darker())
                })
                .on('mousemove', function(d) {
                    dispatcher.call('customMouseMove', this, !!d.values ? d:d.data, d3Selection.mouse(this), [chartWidth, chartHeight]);
                })
                .on('mouseout', function() {
                    dispatcher.call('customMouseOut', this);
                    d3Selection.select(this).attr('fill', () => d3Selection.select(this.parentNode).attr('fill'))
                })
                .transition()
                .delay( (_, i) => areaAnimationDelays[i])
                .duration(areaAnimationDuration)
                .ease(ease)
                .style('opacity', areaOpacity)

        }
        /**
         * Draws the different areas into the chart-group element
         * @private
         */
        function drawStackedBar(){
            let series = svg.select('.chart-group').selectAll('.layer')
            if (!horizontal) {
               drawVerticalBars()
            } else {
               drawHorizontalBars()
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
        function drawVerticalMarker(){
            // return;
            verticalMarkerContainer = svg.select('.metadata-group')
                .append('g')
                .attr('class', 'vertical-marker-container')
                .attr('transform', 'translate(9999, 0)');
                return;
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
         * Orders the data by date for consumption on the chart tooltip
         * @param  {areaChartData} data    Chart data
         * @return {Object[]}               Chart data ordered by date
         * @private
         */
        function getDataByDate(data) {
              let b =  d3Collection.nest()
                                .key(getDate).key(getStack)
                                .entries(_(data).sortBy('value'));
            // console.log('b',b)

            return b

            // let b =  d3Collection.nest()
            //                     .key(getDate).sortKeys(d3Array.ascending)
            //                     .entries(data);
        }

        function getDataByName(data) {
              let b =  d3Collection.nest()
                                .key(getName)
                                .entries(_(data).sortBy('value'));
            return b

            // let b =  d3Collection.nest()
            //                     .key(getDate).sortKeys(d3Array.ascending)
            //                     .entries(data);
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
            let dataByValueParsed = transformedData.map((item) => {
                item.key = item.key   
                return item;
            });
            epsilon = (xScale(dataByValueParsed[1].key) - xScale(dataByValueParsed[0].key)) / 2;
            nearest = dataByValueParsed.find(({key}) => Math.abs(xScale(key) - mouseX) <= epsilon);

            return nearest;
        }
         /**
         * Finds out the data entry that is closer to the given position on pixels
         * @param  {Number} mouseX X position of the mouse
         * @return {obj}        Data entry that is closer to that x axis position
         */
        function getNearestDataPoint2(mouseX) {
            let epsilon,
                nearest;

            //could use spread operator, would prevent mutation of original data
            /*
                let dataByDateParsed = dataByDate.map((item) => ({...item, key: new Date(item.key)}))
             */
            let dataByValueParsed = transformedData.map((item) => {
                item.key = item.key   
                return item;
            });
           console.log('dataByValueParsed',dataByValueParsed)
            epsilon = xScale.range() / 2;
            nearest = dataByValueParsed.find(({key}) => Math.abs(xScale(key) - mouseX) <= epsilon);

            return nearest;
        }


        /**
         * MouseMove handler, calculates the nearest dataPoint to the cursor
         * and updates metadata related to it
         * @private
         */
        function handleMouseMove(){
            let dataPoint = !horizontal ?getNearestDataPoint(getMouseXPosition(this) - margin.left) :getNearestDataPoint2(getMouseXPosition(this) - margin.left),
                dataPointXPosition;
                 console.log('dataPoint',dataPoint)
            if(dataPoint) {
               
                // Move verticalMarker to that datapoint
                  if (!horizontal) {
                       dataPointXPosition = xScale(dataPoint.key);
                        moveVerticalMarker(dataPointXPosition);
                  }else{
                     
                      dataPointXPosition = xScale(dataPoint[1]/2);
                       dataPointYPosition = yScale(dataPoint.key);
                       moveVerticalMarkerXY(dataPointXPosition,dataPointYPosition);
                  }
                // Add data points highlighting
                // highlightDataPoints(dataPoint);
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
            
            // overlay.style('display', 'none');
            // verticalMarker.classed('bc-is-active', false);
            verticalMarkerContainer.attr('transform', 'translate(9999, 0)');

            dispatcher.call('customMouseOut', this, data);
        }

        /**
         * Mouseover handler, shows overlay and adds active class to verticalMarkerLine
         * @private
         */
        function handleMouseOver(data){
           
             if (!horizontal) {
                //   verticalMarkerContainer.attr('transform',null);
             }else{
                //  verticalMarkerContainer.attr('transform',null);
                  let dataPoint = getNearestDataPoint(getMouseXPosition(this) - margin.left),
                    dataPointXPosition;
                if(dataPoint) {
                     
                     dataPointXPosition = xScale(dataPoint[1]/2);
                       dataPointYPosition = yScale(dataPoint.key);
                        console.log('handleMouseOver',dataPointXPosition,dataPointYPosition,dataPoint)
                       moveVerticalMarkerXY(dataPointXPosition,dataPointYPosition);
                    //    moveVerticalMarker(dataPointXPosition)
                }

             }

           
            return;
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

            // eraseDataPointHighlights();

            // sorting the values based on the order of the colors,
            // so that the order always stays constant
            // values = values
            //             .filter(v => !!v)
            //             .sort((a, b) => colorOrder[a.el] > colorOrder[b.el]);

            // values.forEach((value, index) => {
            //     let marker = verticalMarkerContainer
            //                     .append('g')
            //                     .classed('circle-container', true),
            //         circleSize = 12;
          
            //     accumulator = accumulator + values[index][valueLabel];

            //     marker.append('circle')
            //         .classed('data-point-highlighter', true)
            //         .attr('cx', circleSize)
            //         .attr('cy', 0)
            //         .attr('r', 5)
            //         .attr('fill',categoryColorMap[getStack(value)])
            //         .style('stroke-width', 2)
            //         .style('stroke', categoryColorMap[getStack(value)]);

            //     marker.attr('transform', `translate( ${(- circleSize)}, ${(yScale(accumulator))} )` );
            // });
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
         * Helper method to update the x position of the vertical marker
         * @param  {obj} dataPoint Data entry to extract info
         * @return void
         */
        function moveVerticalMarkerXY(verticalMarkerXPosition,verticalMarkerYPosition){
            verticalMarkerContainer.attr('transform', `translate(${verticalMarkerXPosition},${verticalMarkerYPosition})`);
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
         * Gets or Sets the opacity of the stacked areas in the chart (all of them will have the same opacity)
         * @param  {Object} _x                  Opacity to get/set
         * @return { opacity | module}          Current opacity or Area Chart module to chain calls
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
         * @return { (Number | Module) } Current aspect ratio or Area Chart module to chain calls
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
         * @example
         *     area.forceAxisFormat(area.axisTimeCombinations.HOUR_DAY)
         */
        exports.forceAxisFormat = function(_x) {
            if (!arguments.length) {
              return forceAxisSettings;
            }
            forceAxisSettings = _x;

            return this;
        };

        /**
         * Exposes the ability to force the chart to show a certain x format
         * It requires a `forceAxisFormat` of 'custom' in order to work.
         * @param  {String} _x              Desired format for x axis
         * @return { (String|Module) }      Current format or module to chain calls
         */
        exports.forcedXFormat = function(_x) {
            if (!arguments.length) {
              return forcedXFormat;
            }
            forcedXFormat = _x;

            return this;
        };

        /**
         * Exposes the ability to force the chart to show a certain x ticks. It requires a `forceAxisFormat` of 'custom' in order to work.
         * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
         * how many and where the ticks will appear.
         *
         * @param  {Number} _x              Desired number of x axis ticks (multiple of 2, 5 or 10)
         * @return { (Number|Module) }      Current number or ticks or module to chain calls
         */
        exports.forcedXTicks = function(_x) {
            if (!arguments.length) {
              return forcedXTicks;
            }
            forcedXTicks = _x;

            return this;
        };

        /**
         * Gets or Sets the grid mode.
         *
         * @param  {String} _x Desired mode for the grid ('vertical'|'horizontal'|'full')
         * @return { String | module} Current mode of the grid or Area Chart module to chain calls
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
         * @return { height | module} Current height or Area Chart module to chain calls
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
         * Gets or Sets the keyLabel of the chart
         * @param  {Number} _x Desired keyLabel for the graph
         * @return { keyLabel | module} Current keyLabel or Chart module to chain calls
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
         * Gets or Sets the minimum width of the graph in order to show the tooltip
         * NOTE: This could also depend on the aspect ratio
         *
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
         * Gets or Sets the number of verticalTicks of the yAxis on the chart
         * @param  {Number} _x Desired verticalTicks
         * @return { verticalTicks | module} Current verticalTicks or Chart module to chain calls
         * @public
         */
        exports.verticalTicks = function(_x) {
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
         * Gets or Sets the horizontal direction of the chart
         * @param  {number} _x Desired horizontal direction for the graph
         * @return { horizontal | module} Current horizontal direction or Bar Chart module to chain calls
         * @public
         */
        exports.horizontal = function(_x) {
            if (!arguments.length) {
                return horizontal;
            }
            horizontal = _x;
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

        /**
         * Exposes the constants to be used to force the x axis to respect a certain granularity
         * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
         * @example
         *     area.forceAxisFormat(area.axisTimeCombinations.HOUR_DAY)
         */
        exports.axisTimeCombinations = axisTimeCombinations;

        return exports;
    };

});
