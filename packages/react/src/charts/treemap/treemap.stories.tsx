import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { colors } from '@britecharts/core';

import Treemap from './Treemap';
import Tooltip from '../tooltip/Tooltip';
import type { TooltipRenderArgs } from '../tooltip/Tooltip';
import treemapData from './treemapChart.fixtures';

export default {
    title: 'Charts/Treemap',
    component: Treemap,
} satisfies Meta<typeof Treemap>;

/**
 * Every prop the chart takes, editable from the Controls panel. A month's
 * budget, with a tooltip.
 */
export const Playground: StoryFn<typeof Treemap> = (args) => {
    const data = treemapData.withBudget();

    const renderTreemap = (props: TooltipRenderArgs<typeof data>) => (
        <Treemap {...args} {...props} />
    );

    return (
        <Tooltip
            data={data}
            render={renderTreemap}
            title="Monthly spend"
            numberFormat="$,"
        />
    );
};

Playground.args = {
    isAnimated: false,
    hasLabels: true,
    labelsNumberFormat: '$,',
};

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithoutLabels = () => (
    <Treemap data={treemapData.withBudget()} hasLabels={false} />
);

export const WithAnotherColorSchema = () => (
    <Treemap
        data={treemapData.withBudget()}
        colorSchema={colors.colorSchemas.teal}
        labelsNumberFormat="$,"
    />
);

export const WithAnimation = () => (
    <Treemap data={treemapData.withBudget()} isAnimated={true} />
);

export const WithLoadingState = () => {
    const data: [] = [];

    return <Treemap data={data} isLoading={true} />;
};
