import { createElement } from 'react';

import '../../core/src/styles/britecharts.scss';
import '../../../scripts/storybook-preview.css';
import {
    applyColorScheme,
    colorSchemeGlobalTypes,
    colorSchemeInitialGlobals,
} from '../../../scripts/storybook-color-scheme.js';

// Shows the story's name above a card holding the chart, as the core
// Storybook does. Only on the canvas: a docs page already heads each story
// with its name. createElement, not JSX: this file is plain JavaScript.
const withStoryTitleAndCard = (Story, context) => {
    applyColorScheme(context.globals.colorScheme);

    return context.viewMode === 'story'
        ? createElement(
              'div',
              null,
              createElement('h2', { className: 'story-title' }, context.name),
              createElement(
                  'div',
                  { className: 'chart-container' },
                  createElement(Story)
              )
          )
        : createElement(Story);
};

export const decorators = [withStoryTitleAndCard];

export const globalTypes = colorSchemeGlobalTypes;
export const initialGlobals = colorSchemeInitialGlobals;

export const parameters = {
    a11y: {
        config: {},
        options: {},
    },
    layout: 'fullscreen',
    options: {
        storySort: {
            method: '',
            order: ['Welcome', ['CHARTS'], 'Changelog'],
        },
    },
};
