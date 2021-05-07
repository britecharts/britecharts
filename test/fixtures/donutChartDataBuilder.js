import _ from 'underscore';
import jsonLegendNoQuantity from '../json/legendDataNoQuantity.json';
import jsonFivePlusOther from '../json/donutDataFivePlusOther.json';
import jsonFivePlusOtherNoPercent from '../json/donutDataFivePlusOtherNoPercent.json';
import jsonOneZeroed from '../json/donutDataOneZeroed.json';
import jsonAllZeroed from '../json/donutDataAllZeroed.json';
import jsonThreeCategories from '../json/donutDataThreeCategories.json';

export function DonutDataBuilder(config) {
    this.Klass = DonutDataBuilder;

    this.config = _.defaults({}, config);

    this.withFivePlusOther = function () {
        var attributes = _.extend({}, this.config, jsonFivePlusOther);

        return new this.Klass(attributes);
    };

    this.withFivePlusOtherNoPercent = function () {
        var attributes = _.extend({}, this.config, jsonFivePlusOtherNoPercent);

        return new this.Klass(attributes);
    };

    this.withThreeCategories = function () {
        var attributes = _.extend({}, this.config, jsonThreeCategories);

        return new this.Klass(attributes);
    };

    this.withOneTopicAtZero = function () {
        var attributes = _.extend({}, this.config, jsonOneZeroed);

        return new this.Klass(attributes);
    };

    this.withAllTopicsAtZero = function () {
        var attributes = _.extend({}, this.config, jsonAllZeroed);

        return new this.Klass(attributes);
    };

    this.withNoQuantity = function () {
        var attributes = _.extend({}, this.config, jsonLegendNoQuantity);

        return new this.Klass(attributes);
    };

    this.build = function () {
        return this.config.data;
    };
}
