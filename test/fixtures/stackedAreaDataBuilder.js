define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonThreeSources = require('json-loader!../json/areaDataThreeSources.json'),
        jsonSixSources = require('json-loader!../json/areaDataSixSources.json'),
        jsonSalesChannel = require('json-loader!../json/areaDataSalesChannel.json'),
        jsonReportService = require('json-loader!../json/areaDataReportService.json'),
        jsonLargeService = require('json-loader!../json/areaDataLarge.json');


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

        this.withSalesChannelData = function(){
            var attributes = _.extend({}, this.config, jsonSalesChannel);

            return new this.Klass(attributes);
        };

        this.withLargeData = function() {
            var attributes = _.extend({}, this.config, jsonLargeService);
            
            return new this.Klass(attributes);
        }

        this.build = function() {
            return this.config;
        };
    }

    return {
        StackedAreaDataBuilder: StackedAreaDataBuilder
    };

});
