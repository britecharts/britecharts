define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonSimpleData = require('json!../json/brushData.json');


    function BrushDataBuilder(config){
        this.Klass = BrushDataBuilder;

        this.config = _.defaults({}, config);

        this.withSimpleData = function(){
            var attributes = _.extend({}, this.config, jsonSimpleData);

            return new this.Klass(attributes);
        };

        /**
         * Sets the path for fetching the data
         * @param  {String} path Desired path for test data
         * @return {BrushDataBuilder}      Builder object
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
        BrushDataBuilder: BrushDataBuilder
    };
});
