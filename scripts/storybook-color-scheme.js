/*
 * A toolbar switch for the core, react and composed Storybooks: shows every
 * story in the light or dark colour scheme, or as the system prefers. It sets
 * `color-scheme` on the preview's root element, as an app would on its page,
 * and the charts' theme tokens follow it through light-dark().
 */

export const colorSchemeGlobalTypes = {
    colorScheme: {
        description: 'The page colour scheme the charts follow',
        toolbar: {
            title: 'Colour scheme',
            icon: 'contrast',
            items: [
                { value: 'light', title: 'Light' },
                { value: 'dark', title: 'Dark' },
                { value: 'light dark', title: 'As the system prefers' },
            ],
            dynamicTitle: true,
        },
    },
};

export const colorSchemeInitialGlobals = { colorScheme: 'light' };

export const applyColorScheme = (colorScheme = 'light') => {
    document.documentElement.style.colorScheme = colorScheme;
};
