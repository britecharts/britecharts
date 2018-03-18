define(function(require) {
    'use strict';

    var _ = require('underscore'),
        jsonWithFourNames = require('json-loader!../json/scatterDataWithFourNames.json');


    function ScatterPlotDataBuilder(config) {
        this.Klass = ScatterPlotDataBuilder;

        this.config = _.defaults({}, config);

        this.withFourNames = function() {
            var attributes = _.extend({}, this.config, jsonWithFourNames);

            return new this.Klass(attributes);
        };

        this.build = function() {
            return this.config.data;
        };
    }

    return {
        ScatterPlotDataBuilder: ScatterPlotDataBuilder
    };

});
