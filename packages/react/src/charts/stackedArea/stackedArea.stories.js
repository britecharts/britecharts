/* eslint-disable no-console */
import React from 'react';

import StackedArea from './StackedArea';
import Tooltip from '../tooltip/Tooltip';
import stackedAreaData from './stackedAreaChart.fixtures';

export default {
    title: 'Charts/StackedArea',
    component: StackedArea,
};

export const WithTooltip = () => {
    const data = stackedAreaData.with3Sources();
    const renderStackedArea = (props) => (
        <StackedArea data={data} width={800} {...props} />
    );

    // No topicLabel here: @britecharts/wrappers already sets it to 'values' when
    // it creates the tooltip, and passing it again re-runs the deprecated setter
    // on every mouse move.
    return <Tooltip data={data} render={renderStackedArea} title="Tooltip" />;
};

export const WithMouseEventsOnConsole = () => {
    const data = stackedAreaData.with2Sources();
    const logMouseOver = () => console.log('Mouse Over');
    const logMouseOut = () => console.log('Mouse Out');
    const logMouseMoveTooltip = (
        dataPoint,
        topicColorMap,
        dataPointXPosition
    ) => {
        console.log('Mouse Move: dataPoint', dataPoint);
        console.log('Mouse Move: topicColorMap', topicColorMap);
        console.log('Mouse Move: dataPointXPosition', dataPointXPosition);
    };

    return (
        <StackedArea
            data={data}
            customMouseOver={logMouseOver}
            customMouseMove={logMouseMoveTooltip}
            customMouseOut={logMouseOut}
        />
    );
};
export const WithLoadingState = () => {
    const data = [];

    return <StackedArea data={data} isLoading={true} />;
};
