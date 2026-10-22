import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';

import StackedBar from './StackedBar';
import Tooltip from '../tooltip/Tooltip';
import type { TooltipRenderArgs } from '../tooltip/Tooltip';
import stackedBarData from './stackedBarChart.fixtures';

export default {
    title: 'Charts/StackedBar',
    component: StackedBar,
} satisfies Meta<typeof StackedBar>;

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart,
 * with its tooltip.
 */
export const Playground: StoryFn<typeof StackedBar> = (args) => {
    const data = stackedBarData.with3SourcesAndDates();

    const renderStackedBar = (props: TooltipRenderArgs<typeof data>) => (
        <StackedBar {...args} {...props} />
    );

    return (
        <Tooltip
            data={data}
            render={renderStackedBar}
            title="Tooltip Title"
            // The stacked bar names its rows by `stack`
            nameLabel="stack"
        />
    );
};

Playground.args = { isAnimated: false };

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithHorizontalDirectionAndFixedSize = () => {
    const data = stackedBarData.with3Sources();

    return (
        <StackedBar data={data} isHorizontal={true} width={600} height={400} />
    );
};

export const WithAnimation = () => {
    const data = stackedBarData.with3SourcesAndDates();

    const renderStackedBar = (props: TooltipRenderArgs<typeof data>) => (
        <StackedBar isAnimated={true} {...props} />
    );

    return (
        <Tooltip
            data={data}
            render={renderStackedBar}
            title="Tooltip Title"
            // The stacked bar names its rows by `stack`
            nameLabel="stack"
        />
    );
};

/**
 * A 100% stacked bar: `isNormalized` scales every stack to the full height,
 * so each segment shows its share of its stack and the axis runs from 0% to
 * 100%. The tooltip still shows the values.
 */
export const WithNormalizedStacks = () => {
    const data = stackedBarData.with3SourcesAndDates();

    const renderStackedBar = (props: TooltipRenderArgs<typeof data>) => (
        <StackedBar isNormalized={true} {...props} />
    );

    return (
        <Tooltip
            data={data}
            render={renderStackedBar}
            title="Tooltip Title"
            // The stacked bar names its rows by `stack`
            nameLabel="stack"
        />
    );
};

export const WithLoadingState = () => {
    const data: [] = [];

    return <StackedBar data={data} isLoading={true} />;
};
