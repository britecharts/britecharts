define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonTwoSources = require('../json/groupedbarDataTwoSources.json'),
        jsonThreeSources = require('../json/groupedbarDataThreeSources.json');


    function GroupedBarChartDataBuilder(config){
        this.Klass = GroupedBarChartDataBuilder;

        this.config = _.defaults({}, config);

        this.with3Sources = function(){
            var attributes = _.extend({}, this.config, jsonThreeSources);

            return new this.Klass(attributes);
        };

        this.with2Sources = function(){
            var attributes = _.extend({}, this.config, jsonTwoSources);

            return new this.Klass(attributes);
        };

        this.build = function() {
            return this.config;
        };
    }

    return {
        GroupedBarChartDataBuilder: GroupedBarChartDataBuilder
    };

});
