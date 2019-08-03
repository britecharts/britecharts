import _ from 'underscore';
import jsonShortData from 'json-loader!../json/brushDataBis.json';
import jsonSimpleData from 'json-loader!../json/brushData.json';


export function BrushDataBuilder(config) {
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

