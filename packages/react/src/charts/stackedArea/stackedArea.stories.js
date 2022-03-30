import React from 'react';

import StackedArea from './StackedArea';
import Tooltip from '../tooltip/Tooltip';
import stackedAreaData from './stackedAreaChart.fixtures';
import { colors } from '@britecharts/core';

export default {
    title: 'Charts/StackedArea',
    component: StackedArea,
};

export const WithTooltip = () => {
    const data = stackedAreaData.with3Sources();
    const renderStackedArea = (props) => (
        <StackedArea data={data} width={800} {...props} />
    );

    return (
        <Tooltip data={data} render={renderStackedArea} topicLabel="values" />
    );
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
