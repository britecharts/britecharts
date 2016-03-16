define(function(require) {
    'use strict';

    var _ = require('underscore'),

        // This works on tests:
        jsonFiveTopics = require('json!./lineDataFiveTopics.json');
        // This works on demos:
        // jsonFiveTopics = require('json!/test/fixtures/lineDataFiveTopics.json');

    function SalesDataBuilder(config){
        this.Klass = SalesDataBuilder;

        this.config = _.defaults({}, config);

        this.with5Topics = function(){
            var attributes = _.extend({}, this.config, jsonFiveTopics);

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
            dataByDate = chartData.dataByDate,
            readableDataType = chartData.readableDataType;

        _data.forEach(function(kv) {
            kv.Data.forEach(function(d) {
                d.date = new Date(d.fullDate);
                d.date.setHours(0, 0, 0);
            });
        });

        return { data: _data, dataByDate: dataByDate, readableDataType: readableDataType };
    }

    return {
        SalesDataBuilder: SalesDataBuilder
    };

});
