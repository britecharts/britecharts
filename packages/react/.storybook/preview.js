import { addParameters } from '@storybook/react';
import '@storybook/addon-console';
import '../../core/dist/styles/bundle/britecharts.css';

addParameters({
    a11y: {
        config: {},
        options: {},
    },
    layout: 'fullscreen',
    options: {
        storySort: {
            method: 'alphabetical',
            order: ['Welcome', ['CHARTS'], 'Changelog'],
        },
    },
});
