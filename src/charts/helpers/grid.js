define(function(require) {
    'use strict';

    const { scaleLinear } = require('d3-scale');
    const { classArray } = require('./classes');

    // Opacity for fade in/out
    const EPSILON = 1e-6;

    // Direction orientations
    const DIR = {
        H: 'horizontal',
        V: 'vertical'
    }

    // Default positioning function for continuous scales
    // The +0.5 avoids anti-aliasing artifacts
    function number(scale) {
        return d => +scale(d) + 0.5;
    }

    // Replacement positioning function for banded scales
    // Also adjusted for anti-aliasing
    function center(scale) {
        let offset = Math.max(0, scale.bandwidth() - 1) / 2;

        if (scale.round()) offset = Math.round(offset);
        return d => +scale(d) + offset + 0.5;
    }

    function gridBase(orient, scale) {
        let range = [0, 1],
            offsetStart = 0,
            offsetEnd = 0,
            hideEdges = false,
            ticks = null,
            tickValues = null,
            
            classArr = classArray('grid', orient),
            x = orient === DIR.H ? 'x' : 'y',
            y = orient === DIR.H ? 'y' : 'x';

        function gridBase(context) {
            let values = getValues(),
                position = (scale.bandwidth ? center : number)(scale.copy()),
                k = range[range.length - 1] >= range[0]? 1 : -1,
                selection = context.selection ? context.selection() : context,
                initContainer = selection.selectAll(classArr.asSelector()).data([null]),
                container = initContainer.merge(
                   initContainer.enter().append('g').attr('class', classArr.asList())
                ),
                line = container.selectAll('line').data(values, scale).order(),
                lineExit = line.exit(),
                lineEnter = line.enter().append('line').attr('stroke', '#000');

            line = line.merge(lineEnter);

            lineExit.remove();

            line
                .attr('opacity', 1)
                .attr(x + '1', +range[0] - k * offsetStart)
                .attr(x + '2', +range[range.length - 1] + k * offsetEnd)
                .attr(y + '1', d => position(d))
                .attr(y + '2', d => position(d));
        }

        // HELPERS

        function getValues() {
            let hideFirst = hideEdges === true || hideEdges === 'both' || hideEdges === 'first',
                hideLast = hideEdges === true || hideEdges === 'both' || hideEdges === 'last',
                values = tickValues === null ? scaleTicks() : tickValues.slice();

            if (hideFirst) values.shift();
            if (hideLast) values.pop();

            return values;
        }

        function scaleTicks() {
            return (scale.ticks 
                ? scale.ticks.apply(scale, ticks ? [ticks] : []) 
                : scale.domain()
            ).slice();
        }

        // API

        gridBase.scale = function(_) {
            return arguments.length ? (scale = _, gridBase) : scale;
        };

        gridBase.range = function(_) {
            return arguments.length ? (range = _, gridBase) : range;
        }

        gridBase.offsetStart = function(_) {
            return arguments.length ? (offsetStart = _, gridBase) : offsetStart;
        }
    
        gridBase.offsetEnd = function(_) {
            return arguments.length ? (offsetEnd = _, gridBase) : offsetEnd;
        }

        gridBase.hideEdges = function(_) {
            return arguments.length ? (hideEdges = _, gridBase) : hideEdges;
        }

        gridBase.ticks = function(_) {
            return arguments.length ? (ticks = _, gridBase) : ticks;
        };
      
        gridBase.tickValues = function(_) {
            return arguments.length ? (tickValues = _ == null ? null : [..._].slice(), gridBase) : tickValues && tickValues.slice();
        };

        return gridBase;
    }

    function gridHorizontal(scale) {
        return gridBase(DIR.H, scale)
    }

    function gridVertical(scale) {
        return gridBase(DIR.V, scale);
    }

    return {
        gridHorizontal,
        gridVertical
    };
});