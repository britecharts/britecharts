define(function(require) {
    'use strict';

    var _ = require('underscore'),
        $ = require('jquery'),
        d3 = require('d3'),
        $dfd = new $.Deferred(),
        dataSet;

    function SalesDataBuilder(config){
        this.Klass = SalesDataBuilder;

        this.config = _.defaults({}, config, {});

        this.with5Topics = function(){
            var attributes = _.extend({}, this.config, {
                jsonURL: 'base/test/fixtures/lineDataFiveTopics.json'
            });
            return new this.Klass(attributes);
        };

        this.build = function() {
            d3.json(this.config.jsonURL, dataCleaning);

            return $dfd.promise();
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

        dataSet = { data: _data, dataByDate: dataByDate };
        $dfd.resolve(dataSet);
    }

    return {
        SalesDataBuilder: SalesDataBuilder
    };

});
