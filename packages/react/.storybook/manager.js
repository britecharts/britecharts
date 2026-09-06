import { addons } from '@storybook/manager-api';

import britechartsTheme from '../../../scripts/storybook-theme';

addons.setConfig({
    theme: britechartsTheme,
});
