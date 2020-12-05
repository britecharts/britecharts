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

        this.withManyCPUData = function () {
            var attributes = _.extend({}, this.config, {
                data: [
                    {
                        title: 'CPU 1',
                        subtitle: 'GHz',
                        ranges: [1500, 2100, 3500],
                        measures: [1800, 2200],
                        markers: [2600, 3000],
                    },
                    {
                        title: 'CPU 2',
                        subtitle: 'GHz',
                        ranges: [1300, 1900, 3000],
                        measures: [1700, 2000],
                        markers: [1600],
                    },
                    {
                        title: 'CPU 3',
                        subtitle: 'GHz',
                        ranges: [1300, 1500, 2000],
                        measures: [1500, 1800],
                        markers: [1950],
                    },
                    {
                        title: 'CPU 4',
                        subtitle: 'GHz',
                        ranges: [1000, 2000],
                        measures: [1500],
                        markers: [],
                    },
                    {
                        title: 'CPU 5',
                        subtitle: 'GHz',
                        ranges: [1000, 2000],
                        measures: [500],
                        markers: [],
                    }
                ],
            });

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
