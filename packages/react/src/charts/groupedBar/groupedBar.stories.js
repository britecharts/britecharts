import React from 'react';

import GroupedBar from './GroupedBar';
import Tooltip from '../tooltip/Tooltip';
import groupedBarData from './groupedBarChart.fixtures';

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

export const WithDefaultPropertiesAndTooltip = () => {
    const data = groupedBarData.with3Groups();

    const renderGroupedBar = (props) => (
        <GroupedBar
            margin={{
                top: 60,
                right: 30,
                bottom: 60,
                left: 70,
            }}
            {...props}
        />
    );

    // The chart dispatches each column as { key, values: [{ group, name,
    // value }] }: the title shows the key and each row a group
    return (
        <Tooltip
            data={data}
            render={renderGroupedBar}
            title="Tooltip Title"
            dateLabel="key"
            nameLabel="group"
        />
    );
};

export const WithLoadingState = () => {
    const data = [];

    return <GroupedBar data={data} isLoading={true} />;
};
