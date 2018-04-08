define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonBulletData = require('json-loader!../json/bulletDataCpuUsage.json');


    function BulletChartDataBuilder(config){
        this.Klass = BrushDataBuilder;

        this.config = _.defaults({}, config);

        this.withCpuData = function() {
            var attributes = _.extend({}, this.config, jsonBulletData);

            return new this.Klass(attributes);
        };

        this.build = function() {
            return this.config.data;
        };
    }

    return {
        BulletChartDataBuilder: BulletChartDataBuilder
    };
});
