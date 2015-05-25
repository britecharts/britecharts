define(function(require){
    'use strict';

    var d3 = require('d3');

    return function module(){

        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960,
            height = 500,
            data,
            chartW, chartH,
            xScale, yScale,
            xAxis, yAxis,
            svg;

        function buildContainerGroups(){
            var container = svg.append('g').classed('container-group', true);

            container.append('g').classed('chart-group', true);
            container.append('g').classed('x-axis-group', true);
            container.append('g').classed('y-axis-group', true);
        }

        function buildScales(){
            xScale = d3.scale.ordinal()
                .domain(data.map(function(d) { return d.letter; }))
                .rangeRoundBands([0, chartW], 0.1);

            yScale = d3.scale.linear()
                .domain([0, d3.max(data, function(d) { return d.frequency; })])
                .range([chartH, 0]);
        }

        function buildAxis(){
            xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom');

            yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left')
                .ticks(10, '%');
        }

        function drawAxis(){
            svg.select('.x-axis-group')
                .append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + chartH + ')')
                .call(xAxis);

            svg.select('.y-axis-group')
                .append('g')
                .attr('class', 'y axis')
                .call(yAxis)
              .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '.71em')
                .style('text-anchor', 'end')
                .text('Frequency');
        }

        function drawBars(){
            // Setup the enter, exit and update of the actual bars in the chart.
            // Select the bars, and bind the data to the .bar elements.
            var bars = svg.select('.chart-group').selectAll('.bar')
                .data(data);

            // If there aren't any bars create them
            bars.enter().append('rect')
                .attr('class', 'bar')
                .attr('x', function(d) { return xScale(d.letter); })
                .attr('width', xScale.rangeBand())
                .attr('y', function(d) { return yScale(d.frequency); })
                .attr('height', function(d) { return chartH - yScale(d.frequency); });
        }

        function exports(_selection){
            _selection.each(function(_data){
                chartW = width - margin.left - margin.right;
                chartH = height - margin.top - margin.bottom;
                data = _data;

                buildScales();
                buildAxis();

                if (!svg) {
                    svg = d3.select(this)
                        .append('svg')
                        .classed('bar-chart', true);
                }
                svg.attr({
                    width: width + margin.left + margin.right,
                    height: height + margin.top + margin.bottom
                });

                buildContainerGroups();
                drawBars();
                drawAxis();
            });
        }

        exports.margin = function(_x) {
            if (!arguments.length) {
                return margin;
            }
            margin = _x;
            return this;
        };

        exports.width = function(_x) {
            if (!arguments.length) {
                return width;
            }
            width = _x;
            return this;
        };

        exports.height = function(_x) {
            if (!arguments.length) {
                return height;
            }
            height = _x;
            return this;
        };

        return exports;
    };


});
