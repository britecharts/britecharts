define(function(require) {

    var _ = require('underscore'),
        d3 = require('d3'),

        PubSub = require('pubsub-js');


    d3.select(window).on('resize', _.debounce(function(){
        PubSub.publish('resize');
    }, 200));

    return {};
});
