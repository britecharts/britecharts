import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';

import Donut from '../donut/Donut';
import Tooltip from './Tooltip';
import donutData from '../donut/donutChart.fixtures';

export default {
    title: 'Charts/Tooltip',
    component: Tooltip,
} satisfies Meta<typeof Tooltip>;

/**
 * A chart wrapped by a tooltip is handed `createTooltip`. The donut drops it
 * rather than passing it on to its wrapper as a configuration key, which
 * throws "Method not supported by Britechart: createTooltip"; this story shows
 * the donut rendering.
 */
export const WrappingADonut = () => {
    const data = donutData.with4Slices();

    return <Tooltip data={data} render={(props) => <Donut {...props} />} />;
};
