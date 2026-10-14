import React from 'react';

import Sparkline from './Sparkline';
import sparklineData from './sparklineChart.fixtures';

export default {
    title: 'Charts/Sparkline',
    component: Sparkline,
};

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart.
 */
export const Playground = (args) => {
    const data = sparklineData.with1Source();

    return <Sparkline data={data} {...args} />;
};

Playground.args = { isAnimated: false };

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
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

export const WithLoadingState = () => {
    const data = [];

    return <Sparkline data={data} height={100} width={200} isLoading={true} />;
};
