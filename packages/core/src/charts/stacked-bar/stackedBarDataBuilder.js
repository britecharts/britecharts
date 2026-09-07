import _ from 'underscore';
import jsonTwoSources from './stackedbarDataTwoSources.json';
import jsonThreeSources from './stackedbarDataThreeSources.json';
import stackedbarDataNegativeValues from './stackedbarDataNegativeValues.json';

export function StackedBarDataBuilder(config) {
    this.Klass = StackedBarDataBuilder;

    this.config = _.defaults({}, config);

    this.withNegativeValues = function () {
        const attributes = _.extend(
            {},
            this.config,
            stackedbarDataNegativeValues
        );

        return new this.Klass(attributes);
    };

    this.with3Sources = function () {
        const attributes = _.extend({}, this.config, jsonThreeSources);

        return new this.Klass(attributes);
    };

    this.with2Sources = function () {
        const attributes = _.extend({}, this.config, jsonTwoSources);

        return new this.Klass(attributes);
    };

    this.build = function () {
        return this.config.data;
    };
}
