import { addParameters } from '@storybook/react';
import '@storybook/addon-console';

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
