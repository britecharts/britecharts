import _ from 'underscore';

import jsonWeeklyBis from './heatmapWeeklyBis.json';
import jsonWeekly from './heatmapWeekly.json';
import heatmapNegativeValues from './heatmapNegativeValues.json';
import jsonCategorical from './heatmapCategorical.json';

export function HeatmapDataBuilder(config) {
    this.Klass = HeatmapDataBuilder;

    this.config = _.defaults({}, config);

    this.withNegativeValues = function () {
        const attributes = _.extend({}, this.config, heatmapNegativeValues);

        return new this.Klass(attributes);
    };

    this.withWeeklyData = function () {
        const attributes = _.extend({}, this.config, jsonWeekly);

        return new this.Klass(attributes);
    };

    this.withAlternativeWeeklyData = function () {
        const attributes = _.extend({}, this.config, jsonWeeklyBis);

        return new this.Klass(attributes);
    };

    // A square grid of categories: day and hour index the axis labels
    this.withCategoricalData = function () {
        const attributes = _.extend({}, this.config, jsonCategorical);

        return new this.Klass(attributes);
    };

    this.build = function () {
        return this.config.data;
    };
}
