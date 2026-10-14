import React from 'react';

import Bullet from './Bullet';
import bulletData from './bulletChart.fixtures';
import { colors } from '@britecharts/core';

export default {
    title: 'Charts/Bullet',
    component: Bullet,
};

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart.
 */
export const Playground = (args) => {
    const data = bulletData.fullTestData();

    return <Bullet data={data} {...args} />;
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

    return <Bullet data={data} isLoading={true} />;
};
