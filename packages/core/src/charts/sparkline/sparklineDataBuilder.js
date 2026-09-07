import _ from 'underscore';

import jsonOneSource from './sparklineOneSource.json';
import jsonLowValues from './sparklineLowValues.json';
import sparklineNegativeValues from './sparklineNegativeValues.json';

export function SparklineDataBuilder(config) {
    this.Klass = SparklineDataBuilder;

    this.config = _.defaults({}, config);

    this.withNegativeValues = function () {
        const attributes = _.extend({}, this.config, sparklineNegativeValues);

        return new this.Klass(attributes);
    };

    this.with1Source = function () {
        const attributes = _.extend({}, this.config, jsonOneSource);

        return new this.Klass(attributes);
    };

    this.withLowValues = function () {
        const attributes = _.extend({}, this.config, jsonLowValues);

        return new this.Klass(attributes);
    };

    this.build = function () {
        return this.config.data;
    };
}
