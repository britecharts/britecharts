import _ from 'underscore';
import jsonWithFourNames from './scatterDataWithFourNames.json';
import jsonWithOneSource from './scatterDataWithSingleSource.json';

export function ScatterPlotDataBuilder(config) {
    this.Klass = ScatterPlotDataBuilder;

    this.config = _.defaults({}, config);

    this.withFourNames = function () {
        const attributes = _.extend({}, this.config, jsonWithFourNames);

        return new this.Klass(attributes);
    };

    this.withOneSource = function () {
        const attributes = _.extend({}, this.config, jsonWithOneSource);

        return new this.Klass(attributes);
    };

    this.build = function () {
        return this.config.data;
    };
}
