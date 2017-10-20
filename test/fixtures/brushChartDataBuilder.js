define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonSimpleData = require('json-loader!../json/brushData.json');


    function BrushDataBuilder(config){
        this.Klass = BrushDataBuilder;

        this.config = _.defaults({}, config);

        this.withSimpleData = function(){
            var attributes = _.extend({}, this.config, jsonSimpleData);

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
