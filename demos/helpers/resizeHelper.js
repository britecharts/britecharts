'use strict';

const _ = require('underscore');
const d3Selection = require('d3-selection');
const PubSub = require('pubsub-js');
const debounceDelay = 200;
let cachedWidth = window.innerWidth;

d3Selection.select(window)
    .on('resize', _.debounce(function(){
            var newWidth = window.innerWidth;

            if (cachedWidth !== newWidth) {
                cachedWidth = newWidth;
                PubSub.publish('resize');
            }

        }, debounceDelay));
