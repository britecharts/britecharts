/* eslint-disable no-console */
import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';

import StackedArea from './StackedArea';
import Tooltip from '../tooltip/Tooltip';
import type { TooltipRenderArgs } from '../tooltip/Tooltip';
import stackedAreaData from './stackedAreaChart.fixtures';

export default {
    title: 'Charts/StackedArea',
    component: StackedArea,
} satisfies Meta<typeof StackedArea>;

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart,
 * with its tooltip.
 */
export const Playground: StoryFn<typeof StackedArea> = (args) => {
    const data = stackedAreaData.with3Sources();

    const renderStackedArea = (props: TooltipRenderArgs<typeof data>) => (
        <StackedArea {...args} {...props} />
    );

    // No topicLabel here: @britecharts/wrappers already sets it to 'values' when
    // it creates the tooltip, and passing it again re-runs the deprecated setter
    // on every mouse move.
    return <Tooltip data={data} render={renderStackedArea} title="Tooltip" />;
};

Playground.args = { isAnimated: false };

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithAnimation = () => {
    const data = stackedAreaData.with3Sources();

    const renderStackedArea = (props: TooltipRenderArgs<typeof data>) => (
        <StackedArea isAnimated={true} {...props} />
    );

    // No topicLabel here: @britecharts/wrappers already sets it to 'values' when
    // it creates the tooltip, and passing it again re-runs the deprecated setter
    // on every mouse move.
    return <Tooltip data={data} render={renderStackedArea} title="Tooltip" />;
};

/**
 * A 100% stacked area: `isNormalized` scales every date's areas to the full
 * height, so each area shows its share of the total and the axis runs from 0%
 * to 100%. The tooltip still shows the values.
 */
export const WithNormalizedAreas = () => {
    const data = stackedAreaData.with3Sources();

    const renderStackedArea = (props: TooltipRenderArgs<typeof data>) => (
        <StackedArea isNormalized={true} {...props} />
    );

    return <Tooltip data={data} render={renderStackedArea} title="Tooltip" />;
};

export const WithMouseEventsOnConsole = () => {
    const data = stackedAreaData.with2Sources();
    const logMouseOver = () => console.log('Mouse Over');
    const logMouseOut = () => console.log('Mouse Out');
    // What every chart dispatches on customMouseMove: the data point, its
    // anchor [x, y], the chart's size and the topic colours
    const logMouseMove: TooltipRenderArgs['customMouseMove'] = (
        dataPoint,
        position,
        size,
        topicColorMap
    ) => {
        console.log('Mouse Move: dataPoint', dataPoint);
        console.log('Mouse Move: position', position);
        console.log('Mouse Move: size', size);
        console.log('Mouse Move: topicColorMap', topicColorMap);
    };

    return (
        <StackedArea
            data={data}
            customMouseOver={logMouseOver}
            customMouseMove={logMouseMove}
            customMouseOut={logMouseOut}
        />
    );
};

export const WithLoadingState = () => {
    const data: [] = [];

    return <StackedArea data={data} isLoading={true} />;
};
