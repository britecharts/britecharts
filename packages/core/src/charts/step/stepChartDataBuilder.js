import _ from 'underscore';

import jsonStepDataSmall from './stepDataSmall.json';
import jsonStepDataMedium from './stepDataMedium.json';

export function StepDataBuilder(config) {
    this.Klass = StepDataBuilder;

    this.config = _.defaults({}, config);

    this.withSmallData = function () {
        const attributes = _.extend({}, this.config, jsonStepDataSmall);

        return new this.Klass(attributes);
    };

    this.withMediumData = function () {
        const attributes = _.extend({}, this.config, jsonStepDataMedium);

        return new this.Klass(attributes);
    };

    this.build = function () {
        return this.config.data;
    };
}
