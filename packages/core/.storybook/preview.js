import '../src/styles/britecharts.scss';
import '../../../scripts/storybook-preview.css';
import {
    applyColorScheme,
    colorSchemeGlobalTypes,
    colorSchemeInitialGlobals,
} from '../../../scripts/storybook-color-scheme.js';

// Shows the story's name above its card. Only on the canvas: a docs page
// already heads each story with its name.
const withStoryTitle = (storyFn, context) => {
    applyColorScheme(context.globals.colorScheme);

    const story = storyFn();

    if (context.viewMode !== 'story') {
        return story;
    }

    const wrapper = document.createElement('div');
    const title = document.createElement('h2');

    title.className = 'story-title';
    title.textContent = context.name;
    wrapper.append(title);

    if (typeof story === 'string') {
        wrapper.insertAdjacentHTML('beforeend', story);
    } else {
        wrapper.append(story);
    }

    return wrapper;
};

export const decorators = [withStoryTitle];

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
