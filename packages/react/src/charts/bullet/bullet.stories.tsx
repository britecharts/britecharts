import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';

import Bullet from './Bullet';
import bulletData from './bulletChart.fixtures';
import { colors } from '@britecharts/core';

export default {
    title: 'Charts/Bullet',
    component: Bullet,
} satisfies Meta<typeof Bullet>;

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart.
 */
export const Playground: StoryFn<typeof Bullet> = (args) => {
    const data = bulletData.fullTestData();

    return <Bullet {...args} data={data} />;
};

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithMeasureUnderRanges = () => {
    const data = bulletData.underRangeNoMarker();

    return <Bullet data={data} />;
};

export const WithLoadingState = () => {
    const data = bulletData.fullTestData();

    return (
        // @ts-expect-error -- BulletChartProps does not declare isLoading yet,
        // though the chart takes it; the prop type is fixed separately.
        <Bullet data={data} isLoading={true} />
    );
};
