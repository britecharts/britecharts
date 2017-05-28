define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonThreeSources = require('json!../json/groupedbarDataThreeSources.json');


    function GroupedBarDataBuilder(config){
        this.Klass = GroupedBarDataBuilder;

        this.config = _.defaults({}, config);

        this.with3Sources = function(){
            var attributes = _.extend({}, this.config, jsonThreeSources);

            return new this.Klass(attributes);
        };

        this.build = function() {
            return this.config;
        };
    }

    return {
        GroupedBarDataBuilder: GroupedBarDataBuilder
    };

});
