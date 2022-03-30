import React from 'react';

import GroupedBar from './GroupedBar';
import groupedBarData from './groupedBarChart.fixtures';
import { colors } from '@britecharts/core';

export default {
    title: 'Charts/GroupedBar',
    component: GroupedBar,
};

export const WithDefaultProperties = () => {
    const data = groupedBarData.with3Groups();

    return <GroupedBar data={data} />;
};

export const WithHorizontalDirectionFixedSize = () => {
    const data = groupedBarData.with3Groups();

    return (
        <GroupedBar data={data} isHorizontal={true} width={800} height={400} />
    );
};

export const WithLoadingState = () => {
    const data = [];

    return <GroupedBar data={data} isLoading={true} />;
};
