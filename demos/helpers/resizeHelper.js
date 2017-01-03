define(function(require) {

    var _ = require('underscore'),
        d3Selection = require('d3-selection'),

        PubSub = require('pubsub-js'),

        debounceDelay = 200;


    d3Selection.select(window)
        .on('resize', _.debounce(function(){
            PubSub.publish('resize');
        }, debounceDelay));

    return {};
});
