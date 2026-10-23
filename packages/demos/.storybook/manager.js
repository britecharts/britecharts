import { addons } from 'storybook/manager-api';
import { SET_GLOBALS, UPDATE_GLOBALS } from 'storybook/internal/core-events';

import britechartsTheme from '../../../scripts/storybook-theme';

addons.setConfig({
    theme: britechartsTheme,
});

// The toolbar for the composed core and react stories. The manager sends a
// toolbar change (the colour scheme, measure, the grid, outlines) only to
// this Storybook's own preview, and treats globals from a composed Storybook
// as unsupported, so those buttons change nothing in the core or react story
// on screen. This forwards the globals to each composed preview, by the iframe
// id Storybook gives it: when the toolbar sends a change to the host's
// preview, and when a composed preview loads, since it starts from its own
// defaults.
addons.register('britecharts/composed-globals', (api) => {
    const channel = addons.getChannel();
    const HOST_PREVIEW = 'storybook-preview-iframe';

    const forward = (globals) => {
        if (!globals || !Object.keys(globals).length) {
            return;
        }

        Object.keys(api.getRefs()).forEach((refId) => {
            channel.emit(UPDATE_GLOBALS, {
                globals,
                options: { target: `storybook-ref-${refId}` },
            });
        });
    };

    // The toolbar's change, on its way to the host's own preview
    channel.on(UPDATE_GLOBALS, ({ globals, options }) => {
        if (options?.target === HOST_PREVIEW) {
            forward(globals);
        }
    });
    // A composed preview (re)loads with its own defaults
    channel.on(SET_GLOBALS, () => forward(api.getGlobals()));
});
