define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonStepDataSmall = require('../json/stepDataSmall.json'),
        jsonStepDataMedium = require('../json/stepDataMedium.json');

    function StepDataBuilder(config){
        this.Klass = StepDataBuilder;

        this.config = _.defaults({}, config);

        this.withSmallData = function() {
            var attributes = _.extend({}, this.config, jsonStepDataSmall);

            return new this.Klass(attributes);
        }

        this.withMediumData = function() {
            var attributes = _.extend({}, this.config, jsonStepDataMedium);

            return new this.Klass(attributes);
        }

        this.build = function() {
            return this.config;
        };
    }

    return {
        StepDataBuilder: StepDataBuilder
    };

});
