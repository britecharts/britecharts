import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';

import Line from './Line';
import Tooltip from '../tooltip/Tooltip';
import type { TooltipRenderArgs } from '../tooltip/Tooltip';
import lineData from './lineChart.fixtures';
import { colors } from '@britecharts/core';

export default {
    title: 'Charts/Line',
    component: Line,
} satisfies Meta<typeof Line>;

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart,
 * with horizontal grid lines and its tooltip.
 */
export const Playground: StoryFn<typeof Line> = (args) => {
    const data = lineData.oneSet();

    const renderLine = (props: TooltipRenderArgs<typeof data>) => (
        <Line {...args} {...props} />
    );

    return (
        <Tooltip
            data={data}
            render={renderLine}
            // Tooltip reads rows from `values`; the line's are under `topics`
            topicLabel="topics"
            title="Tooltip Title"
        />
    );
};

Playground.args = { isAnimated: false, grid: 'horizontal', yTicks: 10 };

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithOneLineAndTooltipAndBasisCurve = () => {
    const data = lineData.oneSet();

    const renderLine = (props: TooltipRenderArgs<typeof data>) => (
        <Line
            margin={{
                top: 60,
                right: 30,
                bottom: 60,
                left: 70,
            }}
            lineCurve="basis"
            {...props}
        />
    );

    return (
        <Tooltip
            data={data}
            render={renderLine}
            // Tooltip reads rows from `values`; the line's are under `topics`
            topicLabel="topics"
            title="Tooltip Title"
        />
    );
};

export const WithMultipleLinesAndTooltip = () => {
    const data = lineData.fiveTopics();

    const renderLine = (props: TooltipRenderArgs<typeof data>) => (
        <Line
            margin={{
                top: 60,
                right: 30,
                bottom: 60,
                left: 70,
            }}
            tooltipThreshold={0}
            {...props}
        />
    );

    return (
        <Tooltip
            data={data}
            render={renderLine}
            // Tooltip reads rows from `values`; the line's are under `topics`
            topicLabel="topics"
            title=""
        />
    );
};

export const WithAnimation = () => {
    const data = lineData.oneSet();

    const renderLine = (props: TooltipRenderArgs<typeof data>) => (
        <Line isAnimated={true} {...props} />
    );

    return (
        <Tooltip
            data={data}
            render={renderLine}
            // Tooltip reads rows from `values`; the line's are under `topics`
            topicLabel="topics"
            title="Tooltip Title"
        />
    );
};

export const WithMultipleLinesAndStepBeforeCurveAndTealColorSchema = () => {
    const data = lineData.fiveTopics();

    return (
        <Line
            data={data}
            margin={{
                top: 60,
                right: 30,
                bottom: 60,
                left: 70,
            }}
            lineCurve="stepBefore"
            tooltipThreshold={200}
            colorSchema={colors.colorSchemas.teal}
        />
    );
};

export const WithLoadingState = () => {
    const data = { data: [] };

    return <Line data={data} isLoading={true} />;
};
