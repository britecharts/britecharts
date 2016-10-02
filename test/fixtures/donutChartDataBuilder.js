define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonFivePlusOther = require('json!../json/donutDataFivePlusOther.json');


    function DonutDataBuilder(config){
        this.Klass = DonutDataBuilder;

        this.config = _.defaults({}, config);

        this.withFivePlusOther = function(){
            var attributes = _.extend({}, this.config, jsonFivePlusOther);

            return new this.Klass(attributes);
        };

        /**
         * Sets the path for fetching the data
         * @param  {String} path Desired path for test data
         * @return {DonutDataBuilder}      Builder object
         */
        this.withPath = function(path){
            var attributes = _.extend({}, this.config, {
                jsonURL: path
            });

            return new this.Klass(attributes);
        };

        this.build = function() {
            return this.config.data;
        };
    }

    return {
        DonutDataBuilder: DonutDataBuilder
    };
});
