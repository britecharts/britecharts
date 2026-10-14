import React from 'react';

import StackedBar from './StackedBar';
import Tooltip from '../tooltip/Tooltip';
import stackedBarData from './stackedBarChart.fixtures';

export default {
    title: 'Charts/StackedBar',
    component: StackedBar,
};

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart,
 * with its tooltip.
 */
export const Playground = (args) => {
    const data = stackedBarData.with3SourcesAndDates();

    const renderStackedBar = (props) => <StackedBar {...args} {...props} />;

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

Playground.args = { isAnimated: false };

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
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

export const WithAnimation = () => {
    const data = stackedBarData.with3SourcesAndDates();

    const renderStackedBar = (props) => (
        <StackedBar isAnimated={true} {...props} />
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
