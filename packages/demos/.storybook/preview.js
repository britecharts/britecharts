import {
    applyColorScheme,
    colorSchemeGlobalTypes,
    colorSchemeInitialGlobals,
} from '../../../scripts/storybook-color-scheme.js';

export const parameters = {
    a11y: {
        config: {},
        options: {},
    },
    layout: 'fullscreen',
    options: {
        storySort: {
            method: '',
            order: ['Introduction', 'Changelog'],
        },
    },
};

// The colour scheme switch the core and react Storybooks have. A composed
// Storybook's toolbar shows only the host's own globals, so without this the
// switch is missing here, and the host passes its globals on to the composed
// stories.
export const globalTypes = colorSchemeGlobalTypes;
export const initialGlobals = colorSchemeInitialGlobals;

export const decorators = [
    (story, context) => {
        applyColorScheme(context.globals.colorScheme);

        return story();
    },
];
