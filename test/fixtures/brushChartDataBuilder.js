define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonShortData = require('../json/brushDataBis.json'),
        jsonSimpleData = require('../json/brushData.json');


    function BrushDataBuilder(config){
        this.Klass = BrushDataBuilder;

        this.config = _.defaults({}, config);

        this.withSimpleData = function(){
            var attributes = _.extend({}, this.config, jsonSimpleData);

            return new this.Klass(attributes);
        };

        this.withShortData = function(){
            var attributes = _.extend({}, this.config, jsonShortData);

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
