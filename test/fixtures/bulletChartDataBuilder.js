import _ from 'underscore';
import jsonBulletData from '../json/bulletDataCpuUsage.json';


export function BulletChartDataBuilder(config) {
    this.Klass = BulletChartDataBuilder;

    this.config = _.defaults({}, config);

    this.withCpuData = function() {
        var attributes = _.extend({}, this.config, jsonBulletData);

        return new this.Klass(attributes);
    };

    this.build = function() {
        return this.config.data;
    };
}

