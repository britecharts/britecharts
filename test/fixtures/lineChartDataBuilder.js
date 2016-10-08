define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonFiveTopics = require('json!../json/lineDataFiveTopics.json'),
        jsonOneSource = require('json!../json/lineDataOneSet.json'),
        jsonSevenDates = require('json!../json/lineDataForNDates.json');


    function SalesDataBuilder(config){
        this.Klass = SalesDataBuilder;

        this.config = _.defaults({}, config);

        this.with5Topics = function(){
            var attributes = _.extend({}, this.config, jsonFiveTopics);

            return new this.Klass(attributes);
        };

        this.withOneSource = function() {
            var attributes = _.extend({}, this.config, jsonOneSource);

            return new this.Klass(attributes);
        };

        this.withNDates = function(n) {
            var data = jsonSevenDates;
            if (n) {
                data.data[0].Data = data.data[0].Data.slice(0, n);
                data.dataByDate = data.dataByDate.slice(0, n);
            }

            var attributes = _.extend({}, this.config, data);

            return new this.Klass(attributes);
        };

        /**
         * Sets the path for fetching the data
         * @param  {string} path Desired path for test data
         * @return {SalesDataBuilder}      Builder object
         */
        this.withPath = function(path){
            var attributes = _.extend({}, this.config, {
                jsonURL: path
            });

            return new this.Klass(attributes);
        };

        this.build = function() {
            return dataCleaning(this.config);
        };
    }

    function dataCleaning(chartData) {
        var _data = _.compact(chartData.data),
            dataByDate = chartData.dataByDate;

        _data.forEach(function(kv) {
            kv.Data.forEach(function(d) {
                d.date = new Date(d.fullDate);
                d.date.setHours(0, 0, 0);
            });
        });

        return { data: _data, dataByDate: dataByDate};
    }

    return {
        SalesDataBuilder: SalesDataBuilder
    };

});
