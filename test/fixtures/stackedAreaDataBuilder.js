define(function(require) {
    'use strict';

    var _ = require('underscore'),

        // This works on tests:
        // jsonThreeSources = require('json!./areaDataThreeSources.json');
        // This works on demos:
        jsonThreeSources = require('json!/test/fixtures/areaDataThreeSources.json');

    function StackedAreaDataBuilder(config){
        this.Klass = StackedAreaDataBuilder;

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
        StackedAreaDataBuilder: StackedAreaDataBuilder
    };

});
