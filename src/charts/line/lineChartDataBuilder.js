import _ from 'underscore';
import jsonAllDatas from '../../../test/json/lineDataAllDatas.json';
import jsonFiveTopics from '../../../test/json/lineDataFiveTopics.json';
import jsonFourTopics from '../../../test/json/lineDataFourTopics.json';
import jsonOneSource from '../../../test/json/lineDataOneSet.json';
import jsonAllZeroes from '../../../test/json/lineDataAllZeroes.json';
import jsonTwoTopicsFlat from '../../../test/json/lineDataTwoTopicsFlat.json';
import jsonMultiMonthValueRange from '../../../test/json/multiMonthLineData.json';
import jsonHourDateRange from '../../../test/json/lineDataOneSetHourly.json';
import jsonSmallValueRange from '../../../test/json/lineDataSmallValueRange.json';
import jsonNegativeValues from '../../../test/json/lineDataNegativeValues.json';
import jsonOnlyNegativeValues from '../../../test/json/lineDataOnlyNegativeValues.json';
import jsonNumericKeys from '../../../test/json/lineDataNumericKeys.json';

export function LineDataBuilder(config) {
    this.Klass = LineDataBuilder;

    this.config = _.defaults({}, config);

    this.with5Topics = function () {
        var attributes = _.extend({}, this.config, jsonFiveTopics);

        return new this.Klass(attributes);
    };

    this.with4Topics = function () {
        var attributes = _.extend({}, this.config, jsonFourTopics);

        return new this.Klass(attributes);
    };

    this.withOneSource = function () {
        var attributes = _.extend({}, this.config, jsonOneSource);

        return new this.Klass(attributes);
    };

    this.withSmallValueRange = function () {
        var attributes = _.extend({}, this.config, jsonSmallValueRange);

        return new this.Klass(attributes);
    };

    this.withMultiMonthValueRange = function () {
        var attributes = _.extend({}, this.config, jsonMultiMonthValueRange);

        return new this.Klass(attributes);
    };

    this.withHourDateRange = function () {
        var attributes = _.extend({}, this.config, jsonHourDateRange);

        return new this.Klass(attributes);
    };

    this.withAllDatas = function () {
        var attributes = _.extend({}, this.config, jsonAllDatas);

        return new this.Klass(attributes);
    };

    this.withTwoFlatTopics = function () {
        var attributes = _.extend({}, this.config, jsonTwoTopicsFlat);

        return new this.Klass(attributes);
    };

    this.withAllZeroes = function () {
        var attributes = _.extend({}, this.config, jsonAllZeroes);

        return new this.Klass(attributes);
    };

    this.withNegativeValues = function () {
        var attributes = _.extend({}, this.config, jsonNegativeValues);

        return new this.Klass(attributes);
    };

    this.withOnlyNegativeValues = function () {
        var attributes = _.extend({}, this.config, jsonOnlyNegativeValues);

        return new this.Klass(attributes);
    };

    this.withNumericKeys = function () {
        var attributes = _.extend({}, this.config, jsonNumericKeys);

        return new this.Klass(attributes);
    };

    this.build = function () {
        return this.config;
    };
}
