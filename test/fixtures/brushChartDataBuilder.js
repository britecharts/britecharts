import _ from 'underscore';
import jsonShortData from '../json/brushShortData.json';
import jsonSimpleData from '../json/brushData.json';
import jsonMissingData from '../json/brushMissingData.json';

export function BrushDataBuilder(config) {
    this.Klass = BrushDataBuilder;

    this.config = _.defaults({}, config);

    this.withSimpleData = function () {
        var attributes = _.extend({}, this.config, jsonSimpleData);

        return new this.Klass(attributes);
    };

    this.withShortData = function () {
        var attributes = _.extend({}, this.config, jsonShortData);

        return new this.Klass(attributes);
    };

    this.withMissingData = function () {
        var attributes = _.extend({}, this.config, jsonMissingData);

        return new this.Klass(attributes);
    };

    this.build = function () {
        return this.config.data;
    };
}
