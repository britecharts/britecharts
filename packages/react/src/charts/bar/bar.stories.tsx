import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';

import Bar from './Bar';
import Tooltip from '../tooltip/Tooltip';
import type { TooltipRenderArgs } from '../tooltip/Tooltip';
import barData from './barChart.fixtures';
import { colors } from '@britecharts/core';

export default {
    title: 'Charts/Bar',
    component: Bar,
} satisfies Meta<typeof Bar>;

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart,
 * with its tooltip.
 */
export const Playground: StoryFn<typeof Bar> = (args) => {
    const data = barData.withLetters();

    const renderBar = (props: TooltipRenderArgs) => (
        <Bar {...args} {...props} data={data} />
    );

    return <Tooltip data={data} render={renderBar} title="Frequency" />;
};

// Static, so the Controls are what changes; `WithAnimation` shows the motion.
Playground.args = { isAnimated: false };

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithHorizontalDirectionAndColorSchema = () => {
    const data = barData.withColors();

    return (
        <Bar
            data={data}
            isHorizontal={true}
            height={400}
            betweenBarsPadding={0.3}
            colorSchema={colors.colorSchemas.orange}
            margin={{
                left: 100,
                right: 40,
                top: 40,
                bottom: 40,
            }}
        />
    );
};

export const WithAnimation = () => {
    const data = barData.withLetters();

    const renderBar = (props: TooltipRenderArgs) => (
        <Bar {...props} data={data} isAnimated={true} />
    );

    return <Tooltip data={data} render={renderBar} title="Frequency" />;
};

export const WithLoadingState = () => {
    const data: [] = [];

    return <Bar data={data} isLoading={true} />;
};

/**
 * A chart that starts loading and then has its data: `isLoading` turns `false`
 * and the chart replaces its loading state.
 */
export const WithLoadingStateThatEnds = () => {
    const [data] = React.useState(barData.withLetters);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(false);
    }, []);

    return <Bar data={data} isLoading={isLoading} />;
};
