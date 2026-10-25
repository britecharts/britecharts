import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';

import Sparkline from './Sparkline';
import sparklineData from './sparklineChart.fixtures';

export default {
    title: 'Charts/Sparkline',
    component: Sparkline,
} satisfies Meta<typeof Sparkline>;

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart.
 */
export const Playground: StoryFn<typeof Sparkline> = (args) => {
    const data = sparklineData.with1Source();

    return <Sparkline {...args} data={data} />;
};

Playground.args = { isAnimated: false };

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithFixedWidth = () => {
    const data = sparklineData.withLowValues();

    return <Sparkline data={data} height={100} width={400} />;
};

export const WithAnimation = () => {
    const data = sparklineData.with1Source();

    return <Sparkline data={data} isAnimated={true} />;
};

export const WithNegativeValues = () => {
    const data = sparklineData.withNegativeValues();

    return <Sparkline data={data} isAnimated={true} />;
};

export const WithLoadingState = () => {
    const data = sparklineData.with1Source();

    return <Sparkline data={data} isAnimated={true} isLoading={true} />;
};
