define(function(require) {
    'use strict';

    var _ = require('underscore'),
        jsonThreeSources,
        jsonSixSources,
        jsonReportService;

        // This works on tests:
        jsonThreeSources = require('json!./areaDataThreeSources.json');
        jsonSixSources = require('json!./areaDataSixSources.json');
        jsonReportService = require('json!./stackedAreaReportService.json');

        // This works on demos:
        // jsonReportService = require('json!/test/fixtures/stackedAreaReportService.json');
        // jsonSixSources = require('json!/test/fixtures/areaDataSixSources.json');
        // jsonThreeSources = require('json!/test/fixtures/areaDataThreeSources.json');

    function StackedAreaDataBuilder(config){
        this.Klass = StackedAreaDataBuilder;

        this.config = _.defaults({}, config);

        this.with3Sources = function(){
            var attributes = _.extend({}, this.config, jsonThreeSources);

            return new this.Klass(attributes);
        };

        this.with6Sources = function(){
            var attributes = _.extend({}, this.config, jsonSixSources);

            return new this.Klass(attributes);
        };

        this.withReportData = function(){
            var attributes = _.extend({}, this.config, jsonReportService);

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
