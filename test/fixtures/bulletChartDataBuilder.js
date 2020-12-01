define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonBulletData = require('../json/bulletDataCpuUsage.json');


    function BulletChartDataBuilder(config){
        this.Klass = BulletChartDataBuilder;

        this.config = _.defaults({}, config);

        this.withNoMarker = function() {
            var attributes = _.extend(
                {},
                this.config,
                ({'data': [
                    {
                        title: 'CPU 1',
                        subtitle: 'GHz',
                        ranges: [1500, 2100, 3500],
                        measures: [1800, 2200],
                        markers: [],
                    }
                ]})
            );

            return new this.Klass(attributes);
        }

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
