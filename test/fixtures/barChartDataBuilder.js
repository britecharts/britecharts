import _ from 'underscore';
import jsonColors from '../json/barColors.json';
import jsonLetters from '../json/barDataLetters.json';

export function BarDataBuilder(config) {
    this.Klass = BarDataBuilder;

    this.config = _.defaults({}, config);

    this.withLettersFrequency = function () {
        var attributes = _.extend({}, this.config, jsonLetters);

        return new this.Klass(attributes);
    };

    this.withColors = function () {
        var attributes = _.extend({}, this.config, jsonColors);

        return new this.Klass(attributes);
    };

    this.build = function () {
        return this.config.data;
    };
}
