define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonAllDatas = require('../json/lineDataAllDatas.json'),
        jsonFiveTopics = require('../json/lineDataFiveTopics.json'),
        jsonFourTopics = require('../json/lineDataFourTopics.json'),
        jsonOneSource = require('../json/lineDataOneSet.json'),
        jsonAllZeroes = require('../json/lineDataAllZeroes.json'),
        jsonTwoTopicsFlat = require('../json/lineDataTwoTopicsFlat.json'),
        jsonMultiMonthValueRange = require('../json/multiMonthLineData'),
        jsonHourDateRange = require('../json/lineDataOneSetHourly.json'),
        jsonSmallValueRange = require('../json/lineDataSmallValueRange'),
        jsonNegativeValues = require('../json/lineDataNegativeValues.json');


    function LineDataBuilder(config) {
        this.Klass = LineDataBuilder;

        this.config = _.defaults({}, config);

        this.with5Topics = function(){
            var attributes = _.extend({}, this.config, jsonFiveTopics);

            return new this.Klass(attributes);
        };

        this.with4Topics = function(){
            var attributes = _.extend({}, this.config, jsonFourTopics);

            return new this.Klass(attributes);
        };

        this.withOneSource = function() {
            var attributes = _.extend({}, this.config, jsonOneSource);

            return new this.Klass(attributes);
        };

        this.withSmallValueRange = function() {
            var attributes = _.extend({}, this.config, jsonSmallValueRange);

            return new this.Klass(attributes);
        };

        this.withMultiMonthValueRange = function() {
            var attributes = _.extend({}, this.config, jsonMultiMonthValueRange);

            return new this.Klass(attributes);
        };

        this.withHourDateRange = function() {
            var attributes = _.extend({}, this.config, jsonHourDateRange);

            return new this.Klass(attributes);
        };

        this.withAllDatas = function() {
            var attributes = _.extend({}, this.config, jsonAllDatas);

            return new this.Klass(attributes);
        };

        this.withTwoFlatTopics = function() {
            var attributes = _.extend({}, this.config, jsonTwoTopicsFlat);

            return new this.Klass(attributes);
        };

        this.withAllZeroes = function() {
            var attributes = _.extend({}, this.config, jsonAllZeroes);

            return new this.Klass(attributes);
        };

        this.withNegativeValues = function() {
            var attributes = _.extend({}, this.config, jsonNegativeValues);

            return new this.Klass(attributes);
        };

        this.build = function() {
            return this.config;
        };
    }

    return {
        LineDataBuilder: LineDataBuilder
    };

});
