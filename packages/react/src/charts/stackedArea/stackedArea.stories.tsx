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
 * with horizontal grid lines and its tooltip.
 */
export const Playground: StoryFn<typeof StackedArea> = (args) => {
    const data = stackedAreaData.withSalesChannelData();

    const renderStackedArea = (props: TooltipRenderArgs<typeof data>) => (
        <StackedArea {...args} {...props} />
    );

    // No topicLabel here: @britecharts/wrappers already sets it to 'values' when
    // it creates the tooltip, and passing it again re-runs the deprecated setter
    // on every mouse move.
    return (
        <Tooltip
            data={data}
            render={renderStackedArea}
            title="Testing tooltip"
        />
    );
};

Playground.args = { isAnimated: false, grid: 'horizontal' };

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithThreeSources = () => {
    const data = stackedAreaData.with3Sources();

    const renderStackedArea = (props: TooltipRenderArgs<typeof data>) => (
        <StackedArea
            tooltipThreshold={600}
            grid="full"
            xAxisFormat="custom"
            xAxisCustomFormat="%Y/%m/%d"
            xTicks={2}
            height={400}
            {...props}
        />
    );

    return (
        <Tooltip data={data} render={renderStackedArea} title="Tooltip Title" />
    );
};

export const WithAnimation = () => {
    const data = stackedAreaData.withSalesChannelData();

    const renderStackedArea = (props: TooltipRenderArgs<typeof data>) => (
        <StackedArea isAnimated={true} {...props} />
    );

    // No topicLabel here: @britecharts/wrappers already sets it to 'values' when
    // it creates the tooltip, and passing it again re-runs the deprecated setter
    // on every mouse move.
    return (
        <Tooltip
            data={data}
            render={renderStackedArea}
            title="Testing tooltip"
        />
    );
};

/**
 * A 100% stacked area: `isNormalized` scales every date's areas to the full
 * height, so each area shows its share of the total and the axis runs from 0%
 * to 100%. The tooltip still shows the values.
 */
export const WithNormalizedAreas = () => {
    const data = stackedAreaData.withSalesChannelData();

    const renderStackedArea = (props: TooltipRenderArgs<typeof data>) => (
        <StackedArea isNormalized={true} {...props} />
    );

    return (
        <Tooltip
            data={data}
            render={renderStackedArea}
            title="Testing tooltip"
        />
    );
};

export const WithNegativeValues = () => {
    const data = stackedAreaData.withNegativeValues();

    return (
        <StackedArea
            data={data}
            isAnimated={true}
            grid="horizontal"
            height={400}
        />
    );
};

/**
 * The three mouse events, written under the chart: `customMouseMove` gets the
 * data point under the pointer and its anchor `[x, y]`, along with the chart's
 * size and the topic colours.
 */
export const WithMouseEvents = () => {
    const data = stackedAreaData.with2Sources();
    const [message, setMessage] = React.useState('Hover the chart');
    const showMouseMove: TooltipRenderArgs['customMouseMove'] = (
        dataPoint,
        [x, y]
    ) => {
        const { date } = dataPoint as { date: string };

        setMessage(
            `Mouse move: ${new Date(date).toDateString()} at [${Math.round(
                x
            )}, ${Math.round(y)}]`
        );
    };

    return (
        <div>
            <StackedArea
                data={data}
                customMouseOver={() => setMessage('Mouse over')}
                customMouseMove={showMouseMove}
                customMouseOut={() => setMessage('Mouse out')}
            />
            <p>{message}</p>
        </div>
    );
};

export const WithLoadingState = () => {
    const data: [] = [];

    return <StackedArea data={data} isLoading={true} />;
};
