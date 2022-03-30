import React from 'react';

import Donut from './Donut';
import donutData from './donutChart.fixtures';
import { colors } from '@britecharts/core';

export default {
    title: 'Charts/Donut',
    component: Donut,
};

export const WithDefaultProperties = () => {
    const data = donutData.with4Slices();

    return <Donut data={data} />;
};

export const WithHoverEvent = () => {
    const data = donutData.with4Slices();
    const logMouseOver = () => console.log('Mouse Over');

    return (
        <Donut
            data={data}
            customMouseOver={logMouseOver}
            externalRadius={100}
            internalRadius={47}
            highlightSliceById={1}
            isAnimated={false}
        />
    );
};

export const WithLoadingState = () => {
    const data = [];

    return <Donut data={data} isLoading={true} />;
};
