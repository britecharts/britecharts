import { addParameters } from '@storybook/html';
import '@storybook/addon-console';
import '../src/styles/britecharts.scss';

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
