define(function(require) {
    'use strict';

    const d3Scale = require('d3-scale');

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
            tickValues = null;

        function gridBase(context) {
            return 'gridBase';
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