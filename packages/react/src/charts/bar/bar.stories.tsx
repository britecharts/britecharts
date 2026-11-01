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

    const renderBar = (props: TooltipRenderArgs<typeof data>) => (
        <Bar {...args} {...props} />
    );

    return <Tooltip data={data} render={renderBar} title="Frequency" />;
};

// Static, so the Controls are what changes; `WithAnimation` shows the motion.
Playground.args = { isAnimated: false };

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithHorizontalDirection = () => {
    const data = barData.withColors();

    const renderBar = (props: TooltipRenderArgs<typeof data>) => (
        <Bar
            {...props}
            isHorizontal={true}
            isAnimated={true}
            height={300}
            percentageAxisToMaxRatio={1.3}
            yAxisPaddingBetweenChart={20}
            colorSchema={colors.colorSchemas.britecharts}
            margin={{
                left: 120,
                right: 20,
                top: 20,
                bottom: 30,
            }}
        />
    );

    return <Tooltip data={data} render={renderBar} title="Frequency" />;
};

export const WithAnimation = () => {
    const data = barData.withLetters();

    const renderBar = (props: TooltipRenderArgs<typeof data>) => (
        <Bar {...props} isAnimated={true} />
    );

    return <Tooltip data={data} render={renderBar} title="Frequency" />;
};

export const WithBarLabels = () => {
    const data = barData.withLetters();

    return (
        <Bar
            data={data}
            height={300}
            hasPercentage={true}
            hasLabels={true}
            labelsNumberFormat=".0%"
        />
    );
};

export const WithNegativeValues = () => {
    const data = barData.withNegativeValues();

    return <Bar data={data} isAnimated={true} height={400} />;
};

export const WithNegativeValuesHorizontal = () => {
    const data = barData.withNegativeValues();

    return (
        <Bar
            data={data}
            isAnimated={true}
            isHorizontal={true}
            height={400}
            margin={{ left: 100, right: 40, top: 40, bottom: 40 }}
        />
    );
};

export const WithLoadingState = () => {
    const data = barData.withLetters();

    return <Bar data={data} height={300} isAnimated={true} isLoading={true} />;
};
