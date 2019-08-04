import _ from 'underscore';
import jsonThreeSources from '../json/areaDataThreeSources.json';
import jsonSixSources from '../json/areaDataSixSources.json';
import jsonSalesChannel from '../json/areaDataSalesChannel.json';
import jsonReportService from '../json/areaDataReportService.json';
import jsonLargeService from '../json/areaDataLarge.json';


export function StackedAreaDataBuilder(config){
    this.Klass = StackedAreaDataBuilder;

    this.config = _.defaults({}, config);

    this.with3Sources = function(){
        var attributes = _.extend({}, this.config, jsonThreeSources);

        return new this.Klass(attributes);
    };

    this.with6Sources = function(){
        var attributes = _.extend({}, this.config, jsonSixSources);

        return new this.Klass(attributes);
    };

    this.withReportData = function(){
        var attributes = _.extend({}, this.config, jsonReportService);

        return new this.Klass(attributes);
    };

    this.withSalesChannelData = function(){
        var attributes = _.extend({}, this.config, jsonSalesChannel);

        return new this.Klass(attributes);
    };

    this.withLargeData = function() {
        var attributes = _.extend({}, this.config, jsonLargeService);

        return new this.Klass(attributes);
    }

    this.build = function() {
        return this.config;
    };
}
