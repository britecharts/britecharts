import React from 'react';

import Donut from './Donut';
import Legend from '../legend/Legend';
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

export const WithHighlightedLegend = () => {
    const data = donutData.with4Slices();
    const legendMargin = {
        top: 10,
        bottom: 10,
        left: 0,
        right: 30,
    };
    const width = 500;
    const [highlightedSlice, setHighlightedSlice] = React.useState(null);

    const handleMouseOver = (data) => {
        setHighlightedSlice(data.data.id);
    };
    const handleMouseOut = (data) => {
        setHighlightedSlice(99999);
    };

    return (
        <>
            <Donut
                data={data}
                height={width}
                width={width}
                externalRadius={width / 2.5}
                internalRadius={width / 5}
                isAnimated={false}
                highlightSliceById={highlightedSlice}
                customMouseOver={handleMouseOver.bind(this)}
                customMouseOut={handleMouseOut.bind(this)}
            />
            <Legend
                data={donutData.with4Slices()}
                height={200}
                width={width}
                margin={legendMargin}
                highlightEntryById={highlightedSlice}
            />
        </>
    );
};

export const WithLoadingState = () => {
    const data = [];

    return <Donut data={data} isLoading={true} />;
};
