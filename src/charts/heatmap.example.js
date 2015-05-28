// HeatMap Chart
windmill.chart.heatmap = function() {
    'use strict';

    // Default Attribute Container
    var attributes = {
        width: 600,
        height: 300,
        margin: {top: 20, right: 20, bottom: 40, left: 40},
        colorExtent: ['#000', '#aaa'],
        value: function(d) { return d.value; },
        row: function(d) { return d.row; },
        column: function(d) { return d.column; }
    };

    // Charting function
    function chart(selection) {
        selection.each(function(data) {

            // Select the container element and initialize the
            // svg element on enter
            var div = d3.select(this),
                svg = div.selectAll('svg').data([data])
                    .enter()
                    .append('svg')
                    .call(chart.svgInit);

            // Compute the width and height of the chart area
            var margin = chart.margin(),
                width = chart.width() - margin.left - margin.right,
                height = chart.height() - margin.top - margin.bottom;

            // Retrieve the accessor functions
            var row = chart.row(),
                col = chart.column(),
                val = chart.value();

            // Select the charting group
            var gchart = svg.select('g.chart');

            // Scales

            // Horizontal Position
            var xScale = d3.scale.ordinal()
                .domain(data.map(col))
                .rangeBands([0, width]);

            // Vertical Position
            var yScale = d3.scale.ordinal()
                .domain(data.map(row))
                .rangeBands([0, height]);

            // Color Scale
            var cScale = d3.scale.linear()
                .domain(d3.extent(data, val))
                .range(chart.colorExtent());

            // Create the heatmap rectangles on enter
            var rect = gchart.selectAll('rect')
                .data(data)
                .enter()
                .append('rect');

            // Set the attributes of the rectangles
            rect
                .attr('width', xScale.rangeBand())
                .attr('height', yScale.rangeBand())
                .attr('x', function(d) { return xScale(col(d)); })
                .attr('y', function(d) { return yScale(row(d)); })
                .attr('fill', function(d) { return cScale(val(d)); });

            // Create the Horizontal Axis
            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom');

            svg.select('g.xaxis').call(xAxis);

            // Create the Vertical Axis
            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left');

            svg.select('g.yaxis').call(yAxis);
        });
    }

    // Initialize the SVG Element
    chart.svgInit = function(svg) {

        // Compute the width and height of the charting area
        var margin = chart.margin(),
            width = chart.width() - margin.left - margin.right,
            height = chart.height() - margin.top - margin.bottom,
            translate = windmill.svg.translate;

        // Set the size of the svg element
        svg.attr('width', chart.width()).attr('height', chart.height());

        // Chart Container
        svg.append('g').attr('class', 'chart')
            .attr('transform', translate(margin.left, margin.top));

        // X Axis Container
        svg.append('g').attr('class', 'axis xaxis')
            .attr('transform', translate(margin.left, margin.top + height));

        // Y Axis Container
        svg.append('g').attr('class', 'axis yaxis')
            .attr('transform', translate(margin.left, margin.top));
    };

    // Create an accessor function for the given attribute
    function createAccessor(attr) {
        function accessor(value) {
            if (!arguments.length) { return attributes[attr]; }
            attributes[attr] = value;
            return chart;
        }
        return accessor;
    }

    // Create accessors for each element in attributes
    for (var attr in attributes) {
        // Avoid overwriting explicitely created accessors
        // and creating accessors for inherited by the prototype
        // chain of the object.
        if ((!chart[attr]) && (attributes.hasOwnProperty(attr))) {
            chart[attr] = createAccessor(attr);
        }
    }

    return chart;
};
