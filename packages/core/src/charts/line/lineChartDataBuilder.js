import _ from 'underscore';
import jsonAllDatas from './lineDataAllDatas.json';
import jsonFiveTopics from './lineDataFiveTopics.json';
import jsonFourTopics from './lineDataFourTopics.json';
import jsonOneSource from './lineDataOneSet.json';
import jsonAllZeroes from './lineDataAllZeroes.json';
import jsonTwoTopicsFlat from './lineDataTwoTopicsFlat.json';
import jsonMultiMonthValueRange from './multiMonthLineData.json';
import jsonHourDateRange from './lineDataOneSetHourly.json';
import jsonSmallValueRange from './lineDataSmallValueRange.json';
import jsonNegativeValues from './lineDataNegativeValues.json';
import jsonOnlyNegativeValues from './lineDataOnlyNegativeValues.json';
import jsonOnlyNonzeroPositiveValues from './lineDataOnlyNonzeroPositiveValues.json';
import jsonNumericKeys from './lineDataNumericKeys.json';

export function LineDataBuilder(config) {
    this.Klass = LineDataBuilder;

    this.config = _.defaults({}, config);

    this.with5Topics = function () {
        const attributes = _.extend({}, this.config, jsonFiveTopics);

        return new this.Klass(attributes);
    };

    this.with4Topics = function () {
        const attributes = _.extend({}, this.config, jsonFourTopics);

        return new this.Klass(attributes);
    };

    this.withOneSource = function () {
        const attributes = _.extend({}, this.config, jsonOneSource);

        return new this.Klass(attributes);
    };

    this.withSmallValueRange = function () {
        const attributes = _.extend({}, this.config, jsonSmallValueRange);

        return new this.Klass(attributes);
    };

    this.withMultiMonthValueRange = function () {
        const attributes = _.extend({}, this.config, jsonMultiMonthValueRange);

        return new this.Klass(attributes);
    };

    this.withHourDateRange = function () {
        const attributes = _.extend({}, this.config, jsonHourDateRange);

        return new this.Klass(attributes);
    };

    this.withAllDatas = function () {
        const attributes = _.extend({}, this.config, jsonAllDatas);

        return new this.Klass(attributes);
    };

    this.withTwoFlatTopics = function () {
        const attributes = _.extend({}, this.config, jsonTwoTopicsFlat);

        return new this.Klass(attributes);
    };

    this.withAllZeroes = function () {
        const attributes = _.extend({}, this.config, jsonAllZeroes);

        return new this.Klass(attributes);
    };

    this.withNegativeValues = function () {
        const attributes = _.extend({}, this.config, jsonNegativeValues);

        return new this.Klass(attributes);
    };

    this.withOnlyNegativeValues = function () {
        const attributes = _.extend({}, this.config, jsonOnlyNegativeValues);

        return new this.Klass(attributes);
    };

    this.withOnlyNonzeroPositiveValues = function () {
        const attributes = _.extend(
            {},
            this.config,
            jsonOnlyNonzeroPositiveValues
        );

        return new this.Klass(attributes);
    };

    this.withNumericKeys = function () {
        const attributes = _.extend({}, this.config, jsonNumericKeys);

        return new this.Klass(attributes);
    };

    this.build = function () {
        return this.config;
    };
}
