const _ = require('underscore');
import { default as PubSub } from 'pubsub-js';

import { select } from 'd3-selection';

const debounceDelay = 200;
let cachedWidth = window.innerWidth;

select(window)
    .on('resize', _.debounce(function(){
            var newWidth = window.innerWidth;

            if (cachedWidth !== newWidth) {
                cachedWidth = newWidth;
                PubSub.publish('resize');
            }

        }, debounceDelay));
