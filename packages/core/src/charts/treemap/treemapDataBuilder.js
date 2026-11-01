import _ from 'underscore';

import jsonBudget from './treemapBudget.json';
import jsonUpdatedBudget from './treemapUpdatedBudget.json';

export function TreemapDataBuilder(config) {
    this.Klass = TreemapDataBuilder;

    this.config = _.defaults({}, config);

    this.withBudget = function () {
        const attributes = _.extend({}, this.config, jsonBudget);

        return new this.Klass(attributes);
    };

    // The budget after a change: new values, and one entry fewer
    this.withUpdatedBudget = function () {
        const attributes = _.extend({}, this.config, jsonUpdatedBudget);

        return new this.Klass(attributes);
    };

    this.build = function () {
        return this.config.data;
    };
}
