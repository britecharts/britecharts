import React from 'react';

import Bullet from './Bullet';
import bulletData from './bulletChart.fixtures';
import { colors } from '@britecharts/core';

export default {
    title: 'Charts/Bullet',
    component: Bullet,
};

export const WithDefaultProperties = () => {
    const data = bulletData.fullTestData();

    return <Bullet data={data} />;
};

export const WithMeasureUnderRanges = () => {
    const data = bulletData.underRangeNoMarker();

    return <Bullet data={data} />;
};
