import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';

import GroupedBar from './GroupedBar';
import Tooltip from '../tooltip/Tooltip';
import type { TooltipRenderArgs } from '../tooltip/Tooltip';
import { colors } from '@britecharts/core';
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
    const data = groupedBarData.with3Sources();

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

export const WithHorizontalDirection = () => {
    const data = groupedBarData.with3Sources();

    const renderGroupedBar = (props: TooltipRenderArgs<typeof data>) => (
        <GroupedBar
            {...props}
            isHorizontal={true}
            isAnimated={true}
            grid="vertical"
            tooltipThreshold={600}
            colorSchema={colors.colorSchemas.red.filter(
                (_, idx) => idx % 2 === 0
            )}
            margin={{
                left: 80,
                top: 40,
                right: 30,
                bottom: 20,
            }}
        />
    );

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

export const WithAnimation = () => {
    const data = groupedBarData.with3Sources();

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

export const WithNegativeValues = () => {
    const data = groupedBarData.withNegativeValues();

    return <GroupedBar data={data} isAnimated={true} height={400} />;
};

export const WithLoadingState = () => {
    const data = groupedBarData.with3Sources();

    return (
        <GroupedBar
            data={data}
            height={300}
            isAnimated={true}
            isLoading={true}
        />
    );
};
