import React from 'react';

import Bar from './Bar';
import barData from './barChart.fixtures';
import { colors } from '@britecharts/core';

export default {
    title: 'Charts/Bar',
    component: Bar,
};

export const WithVerticalDirection = () => {
    const data = barData.withLetters();

    return <Bar data={data} />;
};

export const WithHorizontalDirectionAndColorSchema = () => {
    const data = barData.withColors();

    return (
        <Bar
            data={data}
            isHorizontal={true}
            height={400}
            betweenBarsPadding={0.3}
            colorSchema={colors.colorSchemas.orange}
            margin={{
                left: 100,
                right: 40,
                top: 40,
                bottom: 40,
            }}
        />
    );
};

export const WithLoadingState = () => {
    return <Bar data={null} shouldShowLoadingState={true} />;
};
