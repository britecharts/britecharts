import _ from 'underscore';
import jsonTwoSources from 'json-loader!../json/groupedbarDataTwoSources.json';
import jsonThreeSources from 'json-loader!../json/groupedbarDataThreeSources.json';


export function GroupedBarChartDataBuilder(config){
    this.Klass = GroupedBarChartDataBuilder;

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


