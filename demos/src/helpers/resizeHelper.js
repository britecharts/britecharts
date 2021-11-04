import _ from 'underscore';
import { select } from 'd3-selection';
// import PubSub from 'pubsub-js';

const debounceDelay = 200;
let cachedWidth = window.innerWidth;

select(window).on(
    'resize',
    _.debounce(function () {
        let newWidth = window.innerWidth;

        if (cachedWidth !== newWidth) {
            cachedWidth = newWidth;
            PubSub.publish('resize');
        }
    }, debounceDelay)
);
