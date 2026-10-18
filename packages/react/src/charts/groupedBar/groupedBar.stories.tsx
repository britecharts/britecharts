import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';

import GroupedBar from './GroupedBar';
import Tooltip from '../tooltip/Tooltip';
import type { TooltipRenderArgs } from '../tooltip/Tooltip';
import groupedBarData from './groupedBarChart.fixtures';

export default {
    title: 'Charts/GroupedBar',
    component: GroupedBar,
} satisfies Meta<typeof GroupedBar>;

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart,
 * with its tooltip.
 */
export const Playground: StoryFn<typeof GroupedBar> = (args) => {
    const data = groupedBarData.with3Groups();

    const renderGroupedBar = (props: TooltipRenderArgs<typeof data>) => (
        <GroupedBar {...args} {...props} />
    );

    // The chart dispatches each column as { key, values: [{ group, name,
    // value }] }: the title shows the key and each row a group
    return (
        <Tooltip
            data={data}
            render={renderGroupedBar}
            title="Tooltip Title"
            // The grouped bar names its rows by `group`
            nameLabel="group"
        />
    );
};

Playground.args = { isAnimated: false };

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithHorizontalDirectionFixedSize = () => {
    const data = groupedBarData.with3Groups();

    return (
        <GroupedBar data={data} isHorizontal={true} width={800} height={400} />
    );
};

export const WithAnimation = () => {
    const data = groupedBarData.with3Groups();

    const renderGroupedBar = (props: TooltipRenderArgs<typeof data>) => (
        <GroupedBar isAnimated={true} {...props} />
    );

    // The chart dispatches each column as { key, values: [{ group, name,
    // value }] }: the title shows the key and each row a group
    return (
        <Tooltip
            data={data}
            render={renderGroupedBar}
            title="Tooltip Title"
            // The grouped bar names its rows by `group`
            nameLabel="group"
        />
    );
};

export const WithLoadingState = () => {
    const data: [] = [];

    return <GroupedBar data={data} isLoading={true} />;
};
