define(function(require){
    'use strict';

    var d3 = require('d3');

    return function module() {

        var margin = {
                top: 20,
                right: 50,
                bottom: 20,
                left: 50
            },
            width = 300,
            height = 300,
            data,
            chartWidth, chartHeight,
            svg,
            ease = 'bounce',
            layout,
            shape,
            colorScale = d3.scale.category20c(),
            colorScheme,
            externalRadius = 140,
            internalRadius = 45.5,
            sortComparator = null,
            getQuantity = function(d) { return parseInt(d.quantity, 10); },
            getSliceFill = function(d) { return colorScale(d.data.name); };

        function buildColorScale() {
            if (colorScheme) {
                colorScale = d3.scale.ordinal().range(colorScheme);
            }
        }

        function buildContainerGroups() {
            var container = svg.append('g').classed('container-group', true);

            container.append('g').classed('chart-group', true);
            container.append('g').classed('tooltip-group', true);
        }

        function buildLayout() {
            layout = d3.layout.pie()
                .value(getQuantity)
                .sort(sortComparator);
        }

        function buildShape() {
            shape = d3.svg.arc()
                .innerRadius(externalRadius - internalRadius)
                .outerRadius(externalRadius);
        }

        function drawSVG(container) {
            svg = d3.select(container)
                .selectAll('svg')
                .data([data]);

            svg.enter().append('svg')
                .attr('class', 'donut-chart');

            buildContainerGroups();

            svg.transition().ease(ease)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);

            svg.select('.container-group')
                .attr('transform', 'translate(' + (chartWidth / 2) + ',' + (chartHeight / 2) + ')');
        }

        function drawSlices() {
            svg.select('.chart-group').selectAll('path')
                .data(layout(data))
              .enter().append('path')
                // .each(function(d) { this._current = d; })
                .attr('d', shape)
                .attr('fill', getSliceFill)
                .attr('class', 'slice');
        }

        function exports(_selection) {
            _selection.each(function(_data) {
                chartWidth = width - margin.left - margin.right;
                chartHeight = height - margin.top - margin.bottom;
                data = _data;

                buildLayout();
                buildColorScale();
                buildShape();
                drawSVG(this);
                drawSlices();
            });
        }

        // Accessors
        // TODO: Maybe remove these accessors?
        exports.layout = function(_x) {
            if (!arguments.length) {
                return layout;
            }
            layout = _x;
            return this;
        };

        exports.shape = function(_x) {
            if (!arguments.length) {
                return shape;
            }
            shape = _x;
            return this;
        };

        // Accessors for API calls
        exports.externalRadius = function(_x) {
            if (!arguments.length) {
                return externalRadius;
            }
            externalRadius = _x;
            return this;
        };

        exports.internalRadius = function(_x) {
            if (!arguments.length) {
                return internalRadius;
            }
            internalRadius = _x;
            return this;
        };

        exports.colorScheme = function(_x) {
            if (!arguments.length) {
                return colorScheme;
            }
            colorScheme = _x;
            return this;
        };

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
