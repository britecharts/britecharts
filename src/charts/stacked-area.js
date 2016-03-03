define(function(require){
    'use strict';

    const _ = require('underscore'),
        d3 = require('d3');

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
                left: 5,
                right: 5,
                top: 5,
                bottom: 5
            },
            width = 960,
            height = 500,

            xScale, xAxis,
            yScale, yAxis,

            colorScale,
            colors = [
                '#4DC2F5',
                '#4DDB86',
                '#E5C400',
                '#FF4D7C',
                '#9963D5',
                '#051C48'
            ],
            axisTextColor = '#4a5864',

            verticalTicksLabelOffset = -50,

            numVerticalTicks = 5,
            numHorizontalTicks = 5,

            ease = 'linear',
            svg,
            chartWidth, chartHeight,
            data,

            // formats
            yTickFormat = d3.format('s'),
            xTickFormat = d3.time.format('%e');

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
                data = _data;

                // buildLayers();
                buildScales();
                buildAxis();
                buildSVG(this);
                drawAxis();

                // drawStackedAreas();
                // drawDataReferencePoints();
                // drawTitle();
                // drawGraphLegend();

                // addMouseEvents();
                // drawHoverOverlay();
                // drawTooltip();
            });
        }

        /**
         * Creates the d3 x and y axis, setting orientations
         * @private
         */
        function buildAxis(){
            xAxis = d3.svg.axis()
                .scale(xScale)
                .ticks(numHorizontalTicks)
                .orient('bottom')
                .tickSize(-(height), 0, 0)
                .tickPadding([10])
                .tickFormat(xTickFormat);

            yAxis = d3.svg.axis()
                .scale(yScale)
                .ticks(numVerticalTicks)
                .tickFormat(yTickFormat)
                .tickSize(-(width), 0, 0)
                .outerTickSize([50])
                .tickPadding([4])
                .orient('right');
        }

        /**
         * Creates the x, y and color scales of the chart
         * @private
         */
        function buildScales(){
            xScale = d3.time.scale()
                .domain(d3.extent(data, function(d) { return d.date; }))
                .range([0, width]);

            yScale = d3.scale.linear()
                .domain([0, d3.max(data, function(d) { return d.y0 + d.y; })])
                .range([height, 0])
                .nice([numVerticalTicks + 1]);

            colorScale = d3.scale.ordinal()
                  .range(colors);
        }

        /**
         * @param  {HTMLElement} container DOM element that will work as the container of the graph
         * @private
         */
        function buildSVG(container){
            if (!svg) {
                svg = d3.select(container)
                    .append('svg')
                    .classed('stacked-area', true);

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
                .append('g').classed('x-axis-group axis', true);
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
         * Draws the x and y axis on the svg object within their
         * respective groups
         * @private
         */
        function drawAxis(){
            svg.select('.x-axis-group.axis')
                .transition()
                .ease(ease)
                .attr({
                    transform: `translate( 0, ${chartHeight + margin.top + margin.top} )`
                })
                .style('fill', axisTextColor)
                .call(xAxis);

            svg.select('.y-axis-group.axis')
                .transition()
                .ease(ease)
                .attr({
                    transform: `translate( ${chartWidth}, 0)`
                })
                .style('fill', axisTextColor)
                .call(yAxis);

            // Moving the YAxis tick labels to the right side
            d3.selectAll('.y-axis-group .tick text')
                .attr('transform', `translate( ${verticalTicksLabelOffset}, -10)` );

        }

        return exports;
    };

});
