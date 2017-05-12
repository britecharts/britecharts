(function(root) {
    var basePath = './charts/',
        britecharts;

    if (!_ || !d3 || +d3.version[0] < 4) {
        console.error('Dependencies not found. Britecharts requires underscore and d3 v4');
    }

    if (typeof underscore === 'undefined' && typeof _ !== undefined) {
        underscore = _;
    } else {
        underscore = _ = require('underscore');
    }

    britecharts = {
        bar: require(basePath + 'bar'),
        brush: require(basePath + 'brush'),
        colors: require(basePath + 'helpers/colors'),
        donut: require(basePath + 'donut'),
        legend: require(basePath + 'legend'),
        line: require(basePath + 'line'),
        miniTooltip: require(basePath + 'mini-tooltip'),
        sparkline: require(basePath + 'sparkline'),
        stackedArea: require(basePath + 'stacked-area'),
        step: require(basePath + 'step'),
        tooltip: require(basePath + 'tooltip')
    };

    define([], function() {
        this.britecharts = britecharts
    }.bind(root || window));

})(this);
