define(function (require) {
    'use strict';

    var _ = require('underscore'),

        jsonWeeklyBis = require('../json/heatmapWeeklyBis.json'),
        jsonWeekly = require('../json/heatmapWeekly.json');


    function HeatmapDataBuilder(config) {
        this.Klass = HeatmapDataBuilder;

        this.config = _.defaults({}, config);

        this.withWeeklyData = function () {
            var attributes = _.extend({}, this.config, jsonWeekly);

            return new this.Klass(attributes);
        };

        this.withAlternativeWeeklyData = function () {
            var attributes = _.extend({}, this.config, jsonWeeklyBis);

            return new this.Klass(attributes);
        };

        this.build = function () {
            return this.config.data;
        };
    }

    return {
        HeatmapDataBuilder: HeatmapDataBuilder
    };
});
