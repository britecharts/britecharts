import _ from 'underscore';
import jsonAllDatas from 'json-loader!../json/lineDataAllDatas.json';
import jsonFiveTopics from 'json-loader!../json/lineDataFiveTopics.json';
import jsonFourTopics from 'json-loader!../json/lineDataFourTopics.json';
import jsonOneSource from 'json-loader!../json/lineDataOneSet.json';
import jsonAllZeroes from 'json-loader!../json/lineDataAllZeroes.json';
import jsonTwoTopicsFlat from 'json-loader!../json/lineDataTwoTopicsFlat.json';
import jsonMultiMonthValueRange from 'json-loader!../json/multiMonthLineData';
import jsonHourDateRange from 'json-loader!../json/lineDataOneSetHourly.json';
import jsonSmallValueRange from 'json-loader!../json/lineDataSmallValueRange';


function LineDataBuilder(config) {
    this.Klass = LineDataBuilder;

    this.config = _.defaults({}, config);

    this.with5Topics = function(){
        var attributes = _.extend({}, this.config, jsonFiveTopics);

        return new this.Klass(attributes);
    };

    this.with4Topics = function(){
        var attributes = _.extend({}, this.config, jsonFourTopics);

        return new this.Klass(attributes);
    };

    this.withOneSource = function() {
        var attributes = _.extend({}, this.config, jsonOneSource);

        return new this.Klass(attributes);
    };

    this.withSmallValueRange = function() {
        var attributes = _.extend({}, this.config, jsonSmallValueRange);

        return new this.Klass(attributes);
    };

    this.withMultiMonthValueRange = function() {
        var attributes = _.extend({}, this.config, jsonMultiMonthValueRange);

        return new this.Klass(attributes);
    };

    this.withHourDateRange = function() {
        var attributes = _.extend({}, this.config, jsonHourDateRange);

        return new this.Klass(attributes);
    };

    this.withAllDatas = function() {
        var attributes = _.extend({}, this.config, jsonAllDatas);

        return new this.Klass(attributes);
    };

    this.withTwoFlatTopics = function() {
        var attributes = _.extend({}, this.config, jsonTwoTopicsFlat);

        return new this.Klass(attributes);
    };

    this.withAllZeroes = function() {
        var attributes = _.extend({}, this.config, jsonAllZeroes);

        return new this.Klass(attributes);
    };

    this.build = function() {
        return this.config;
    };
}

export default {
    LineDataBuilder,
};


