define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonAllDatas = require('json-loader!../json/lineDataAllDatas.json'),
        jsonFiveTopics = require('json-loader!../json/lineDataFiveTopics.json'),
        jsonOneSource = require('json-loader!../json/lineDataOneSet.json'),
        jsonAllZeroes = require('json-loader!../json/lineDataAllZeroes.json'),
        jsonMultiMonthValueRange = require('json-loader!../json/multiMonthLineData'),
        jsonHourDateRange = require('json-loader!../json/lineDataOneSetHourly.json'),
        jsonSmallValueRange = require('json-loader!../json/lineDataSmallValueRange');


    function LineDataBuilder(config) {
        this.Klass = LineDataBuilder;

        this.config = _.defaults({}, config);

        this.with5Topics = function(){
            var attributes = _.extend({}, this.config, jsonFiveTopics);

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
        
        this.withAllZeroes = function() {
            var attributes = _.extend({}, this.config, jsonAllZeroes);

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
