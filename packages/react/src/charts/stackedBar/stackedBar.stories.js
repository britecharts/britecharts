import React from 'react';

import StackedBar from './StackedBar';
import Tooltip from '../tooltip/Tooltip';
import stackedBarData from './stackedBarChart.fixtures';
import { colors } from '@britecharts/core';

export default {
    title: 'Charts/StackedBar',
    component: StackedBar,
};

export const WithDefaultProperties = () => {
    const data = stackedBarData.with3Sources();

    return <StackedBar data={data} />;
};

export const WithHorizontalDirectionAndFixedSize = () => {
    const data = stackedBarData.with3Sources();

    return (
        <StackedBar data={data} isHorizontal={true} width={600} height={400} />
    );
};

export const WithDefaultPropertiesAndTooltip = () => {
    const data = stackedBarData.with3SourcesAndDates();

    const renderStackedBar = (props) => (
        <StackedBar
            margin={{
                top: 60,
                right: 30,
                bottom: 60,
                left: 70,
            }}
            {...props}
        />
    );

    return (
        <Tooltip
            data={data}
            render={renderStackedBar}
            title="Tooltip Title"
            dateLabel="key"
            nameLabel="stack"
        />
    );
};

export const WithLoadingState = () => {
    const data = [];

    return <StackedBar data={data} isLoading={true} />;
};
