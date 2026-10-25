import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';

import Bullet from './Bullet';
import type { BulletChartProps } from './Bullet';
import bulletData from './bulletChart.fixtures';
import type { BulletChartDataShape } from '@britecharts/core';

export default {
    title: 'Charts/Bullet',
    component: Bullet,
} satisfies Meta<typeof Bullet>;

/**
 * The chart draws the first item of its data, so each bullet is its own chart.
 */
const renderBullets = (
    data: BulletChartDataShape[],
    props: Partial<BulletChartProps> = {}
) => (
    <>
        {data.map((bullet, index) => (
            <Bullet key={index} {...props} data={[bullet]} />
        ))}
    </>
);

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart.
 */
export const Playground: StoryFn<typeof Bullet> = (args) =>
    renderBullets(bulletData.withAllElements(), args);

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithNoMarker = () => renderBullets(bulletData.withNoMarker());

export const WithDashboardAlignment = () =>
    renderBullets(bulletData.withManyCPUData());

export const WithLoadingState = () => {
    const data = bulletData.withAllElements();

    return <Bullet data={data} isLoading={true} />;
};
