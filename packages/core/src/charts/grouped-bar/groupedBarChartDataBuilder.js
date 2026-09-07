import _ from 'underscore';
import jsonTwoSources from './groupedbarDataTwoSources.json';
import jsonThreeSources from './groupedbarDataThreeSources.json';
import groupedbarDataNegativeValues from './groupedbarDataNegativeValues.json';

export function GroupedBarDataBuilder(config) {
    this.Klass = GroupedBarDataBuilder;

    this.config = _.defaults({}, config);

    this.withNegativeValues = function () {
        const attributes = _.extend(
            {},
            this.config,
            groupedbarDataNegativeValues
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
