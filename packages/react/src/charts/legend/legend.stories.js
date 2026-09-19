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

/**
 * The legend used to have no guard against having no data yet, so with
 * `data={null}` it tried to draw and threw ("Cannot read properties of
 * undefined (reading 'filter')"). It now waits like every other chart: nothing
 * is drawn until the data arrives. This story is the one Chromatic diff that
 * change causes (an error state becomes an empty frame).
 */
export const WithNoData = () => <Legend data={null} height={250} width={400} />;
