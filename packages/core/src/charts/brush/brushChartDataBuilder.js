import _ from 'underscore';
import jsonShortData from './brushShortData.json';
import jsonSimpleData from './brushData.json';
import jsonMissingData from './brushMissingData.json';

export function BrushDataBuilder(config) {
    this.Klass = BrushDataBuilder;

    this.config = _.defaults({}, config);

    this.withSimpleData = function () {
        const attributes = _.extend({}, this.config, jsonSimpleData);

        return new this.Klass(attributes);
    };

    this.withShortData = function () {
        const attributes = _.extend({}, this.config, jsonShortData);

        return new this.Klass(attributes);
    };

    this.withMissingData = function () {
        const attributes = _.extend({}, this.config, jsonMissingData);

        return new this.Klass(attributes);
    };

    this.build = function () {
        return this.config.data;
    };
}
