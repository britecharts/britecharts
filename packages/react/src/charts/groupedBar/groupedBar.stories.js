import React from 'react';

import GroupedBar from './GroupedBar';
import Tooltip from '../tooltip/Tooltip';
import groupedBarData from './groupedBarChart.fixtures';

export default {
    title: 'Charts/GroupedBar',
    component: GroupedBar,
};

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart,
 * with its tooltip.
 */
export const Playground = (args) => {
    const data = groupedBarData.with3Groups();

    const renderGroupedBar = (props) => <GroupedBar {...args} {...props} />;

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

Playground.args = { isAnimated: false };

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
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

export const WithAnimation = () => {
    const data = groupedBarData.with3Groups();

    const renderGroupedBar = (props) => (
        <GroupedBar isAnimated={true} {...props} />
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
