import React from 'react';

import Legend from './Legend';
import legendData from './legendChart.fixtures';

export default {
    title: 'Charts/Legend',
    component: Legend,
};

export const WithDefaultProperties = () => {
    const data = legendData.with6Points();

    return <Legend data={data} height={250} width={400} />;
};

export const WithHorizontalDirection = () => {
    const data = legendData.with6Points();

    return (
        <Legend
            data={data}
            isHorizontal={true}
            marginRatio={1.8}
            height={100}
        />
    );
};

export const WithHorizontalDirectionAndSmallerDots = () => {
    const data = legendData.with6Points();

    return (
        <Legend
            data={data}
            isHorizontal={true}
            markerSize={10}
            marginRatio={1.8}
            width={500}
            height={100}
        />
    );
};
