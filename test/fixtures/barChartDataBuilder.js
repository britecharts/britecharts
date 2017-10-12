define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonColors = require('json-loader!../json/barColors.json'),
        jsonLetters = require('json-loader!../json/barDataLetters.json');


    function BarDataBuilder(config){
        this.Klass = BarDataBuilder;

        this.config = _.defaults({}, config);

        this.withLettersFrequency = function(){
            var attributes = _.extend({}, this.config, jsonLetters);

            return new this.Klass(attributes);
        };

        this.withColors = function(){
            var attributes = _.extend({}, this.config, jsonColors);

            return new this.Klass(attributes);
        };

        this.build = function() {
            return this.config.data;
        };
    }

    return {
        BarDataBuilder: BarDataBuilder
    };
});
