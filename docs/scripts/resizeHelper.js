'use strict';

var _ = require('underscore'),
    d3Selection = require('d3-selection'),
    PubSub = require('pubsub-js'),
    debounceDelay = 200,
    cachedWidth = window.innerWidth;

d3Selection.select(window)
    .on('resize', _.debounce(function(){
            var newWidth = window.innerWidth;

            if (cachedWidth !== newWidth) {
                cachedWidth = newWidth;
                PubSub.publish('resize');
            }

        }, debounceDelay));
