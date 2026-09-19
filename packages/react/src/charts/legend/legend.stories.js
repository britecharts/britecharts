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
 * KNOWN BROKEN: unlike every other chart, the legend has no guard against
 * having no data yet, so it tries to draw with `null` and throws ("Cannot
 * read properties of undefined (reading 'filter')"). Fixed in the hooks
 * migration by giving it the same guard as the others; this story is the
 * visual diff that fix is expected to cause.
 */
export const WithNoData = () => <Legend data={null} height={250} width={400} />;
