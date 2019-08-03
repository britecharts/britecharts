import _ from 'underscore';
import jsonOneSource from 'json-loader!../json/sparklineOneSource.json';
import jsonLowValues from 'json-loader!../json/sparklineLowValues.json';


export function SparklineDataBuilder(config){
    this.Klass = SparklineDataBuilder;

    this.config = _.defaults({}, config);

    this.with1Source = function(){
        var attributes = _.extend({}, this.config, jsonOneSource);

        return new this.Klass(attributes);
    };

    this.withLowValues = function(){
        var attributes = _.extend({}, this.config, jsonLowValues);

        return new this.Klass(attributes);
    };

    this.build = function() {
        return this.config;
    };
}
