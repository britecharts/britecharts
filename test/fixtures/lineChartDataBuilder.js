define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonAllDatas = require('json!../json/lineDataAllDatas.json'),
        jsonFiveTopics = require('json!../json/lineDataFiveTopics.json'),
        jsonOneSource = require('json!../json/lineDataOneSet.json'),
        jsonMultiMonthValueRange = require('json!../json/multiMonthLineData'),
        jsonHourDateRange = require('json!../json/lineDataOneSetHourly.json'),
        jsonSmallValueRange = require('json!../json/lineDataSmallValueRange');


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

        /**
         * Sets the path for fetching the data
         * @param  {string} path Desired path for test data
         * @return {LineDataBuilder}      Builder object
         */
        this.withPath = function(path){
            var attributes = _.extend({}, this.config, {
                jsonURL: path
            });

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
