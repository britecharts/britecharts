define(function(require){
    'use strict';

    var d3 = require('d3'),
        svg;

    return function module(){

        function exports(_selection){
            _selection.each(function(_data){

                if (!svg) {
                    svg = d3.select(this)
                        .append('svg')
                        .classed('bar-chart', true);
                }
            });
        }

        return exports;
    };


});
