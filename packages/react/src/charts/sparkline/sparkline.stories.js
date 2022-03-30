import React from 'react';

import Sparkline from './Sparkline';
import sparklineData from './sparklineChart.fixtures';

export default {
    title: 'Charts/Sparkline',
    component: Sparkline,
};

export const WithDefaultProperties = () => {
    const data = sparklineData.with1Source();

    return <Sparkline data={data} width={400} height={100} />;
};

export const WithAnimation = () => {
    const data = sparklineData.with1Source();

    return (
        <Sparkline
            data={data}
            isAnimated={true}
            width={400}
            animationDuration={1000}
            height={100}
        />
    );
};

export const WithFixedWidthAndTitle = () => {
    const data = sparklineData.withLowValues();

    return (
        <Sparkline
            data={data}
            height={100}
            width={400}
            titleText="Yearly prediction"
        />
    );
};

export const WithLoadingState = () => {
    const data = [];

    return <Sparkline data={data} height={100} width={200} isLoading={true} />;
};
