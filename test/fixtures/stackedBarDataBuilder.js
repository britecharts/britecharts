import _ from 'underscore';
import jsonTwoSources from '../json/stackbarDataTwoSources.json';
import jsonThreeSources from '../json/stackbarDataThreeSources.json';


export function StackedBarDataBuilder(config){
    this.Klass = StackedBarDataBuilder;

    this.config = _.defaults({}, config);

    this.with3Sources = function(){
        var attributes = _.extend({}, this.config, jsonThreeSources);

        return new this.Klass(attributes);
    };

    this.with2Sources = function(){
        var attributes = _.extend({}, this.config, jsonTwoSources);

        return new this.Klass(attributes);
    };

    this.build = function() {
        return this.config;
    };
}
