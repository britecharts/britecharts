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
            externalRadius = 140,
            internalRadius = 45.5,
            colorScale = d3.scale.category20c(),
            colorScheme,
            tooltipWidth = externalRadius + internalRadius,
            data,
            chartWidth, chartHeight,
            svg,
            ease = 'bounce',
            layout,
            shape,
            slices,
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
                .attr('class', 'js-donut-chart');

            buildContainerGroups();

            svg.transition().ease(ease)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);

            svg.select('.container-group')
                .attr('transform', 'translate(' + (chartWidth / 2) + ',' + (chartHeight / 2) + ')');
        }

        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) {
                return shape(i(t));
            };
        }

        function drawSlices() {
            if (!slices) {
                slices = svg.select('.chart-group').selectAll('path')
                    .data(layout(data))
                  .enter().append('path')
                    .each(function(d) { this._current = d; })
                    .attr('d', shape)
                    .attr('fill', getSliceFill)
                    .attr('class', 'slice');
            }
            else {
                slices = svg.select('.chart-group').selectAll('path')
                    .data(layout(data))
                    .attr('d', shape);

                slices.transition().duration(750).attrTween('d', arcTween);
            }
        }

        function wrap(text, tooltipWidth) {
            text.each(function() {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1,
                    y = text.attr('y'),
                    dy = parseFloat(text.attr('dy')),
                    tspan = text.text(null).append('tspan')
                        .attr('x', 0)
                        .attr('y', y)
                        .attr('dy', dy + 'em')
                        .style('font-weight', 'bold')
                        .style('font-size', externalRadius / 3.5 + 'px');

                tspan.text(words.pop());
                tspan = text.append('tspan')
                    .attr('x', 0)
                    .attr('y', y)
                    .attr('dy', ++lineNumber * lineHeight + dy + 'em');

                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(' '));
                    if (tspan.node().getComputedTextLength() > tooltipWidth - 50) {
                        line.pop();
                        tspan.text(line.join(' '));
                        line = [word];
                        tspan = text.append('tspan')
                            .attr('x', 0)
                            .attr('y', y)
                            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                            .text(word);
                    }
                }
            });
        }

        function drawTooltip() {
            svg.select('.tooltip-group').append('text')
                .attr('class', 'tooltip-text')
                .style('font-weight', 'normal')
                .style('font-size', internalRadius / 3 + 'px')
                .attr('x', -100);

            svg.selectAll('.slice').on('mouseover', function(obj) {
                svg.select('.tooltip-text')
                // TODO: make this an accessor so people can customize how
                // their data is presented in the tooltip?
                    .text(function() {
                        return obj.data.percentage + '% ' + obj.data.name;
                    })
                    .attr('dy', '.35em')
                    .attr('text-anchor', 'middle');

                svg.select('.tooltip-text').call(wrap, tooltipWidth);
            });

            svg.selectAll('.slice').on('mouseout', function() {
                svg.select('.tooltip-text')
                    .text('');
            });
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

                drawTooltip();
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
