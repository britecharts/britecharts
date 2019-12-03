define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonOneSource = require('../json/sparklineOneSource.json'),
        jsonLowValues = require('../json/sparklineLowValues.json');


    function SparklineDataBuilder(config){
        this.Klass = SparklineDataBuilder;

        this.config = _.defaults({}, config);

        this.with1Source = function(){
            var attributes = _.extend({}, this.config, jsonOneSource);

            return new this.Klass(attributes);
        };

        this.withLowValues = function(){
            var attributes = _.extend({}, this.config, jsonLowValues);

            return new this.Klass(attributes);
        };

        this.build = function() {
            return this.config;
        };
    }

    return {
        SparklineDataBuilder: SparklineDataBuilder
    };

});
