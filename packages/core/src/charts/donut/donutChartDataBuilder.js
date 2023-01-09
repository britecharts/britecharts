import _ from 'underscore';

import jsonLegendNoQuantity from './legendDataNoQuantity.json';
import jsonFivePlusOther from './donutDataFivePlusOther.json';
import jsonFivePlusOtherNoPercent from './donutDataFivePlusOtherNoPercent.json';
import jsonOneZeroed from './donutDataOneZeroed.json';
import jsonAllZeroed from './donutDataAllZeroed.json';
import jsonThreeCategories from './donutDataThreeCategories.json';

export function DonutDataBuilder(config) {
    this.Klass = DonutDataBuilder;

    this.config = _.defaults({}, config);

    this.withFivePlusOther = function () {
        const attributes = _.extend({}, this.config, jsonFivePlusOther);

        return new this.Klass(attributes);
    };

    this.withFivePlusOtherNoPercent = function () {
        const attributes = _.extend(
            {},
            this.config,
            jsonFivePlusOtherNoPercent
        );

        return new this.Klass(attributes);
    };

    this.withThreeCategories = function () {
        const attributes = _.extend({}, this.config, jsonThreeCategories);

        return new this.Klass(attributes);
    };

    this.withOneTopicAtZero = function () {
        const attributes = _.extend({}, this.config, jsonOneZeroed);

        return new this.Klass(attributes);
    };

    this.withAllTopicsAtZero = function () {
        const attributes = _.extend({}, this.config, jsonAllZeroed);

        return new this.Klass(attributes);
    };

    this.withNoQuantity = function () {
        const attributes = _.extend({}, this.config, jsonLegendNoQuantity);

        return new this.Klass(attributes);
    };

    this.build = function () {
        return this.config.data;
    };
}