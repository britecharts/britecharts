import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';

import Brush from '../brush/Brush';
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
    const data = lineData.fiveTopics();

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

const lineMargin = { top: 60, bottom: 50, left: 50, right: 30 };

export const WithSingleLine = () => {
    const data = lineData.oneSet();

    const renderLine = (props: TooltipRenderArgs<typeof data>) => (
        <Line
            height={300}
            margin={lineMargin}
            lineCurve="basis"
            grid="vertical"
            tooltipThreshold={600}
            {...props}
        />
    );

    return (
        <Tooltip
            data={data}
            render={renderLine}
            // Tooltip reads rows from `values`; the line's are under `topics`
            topicLabel="topics"
            title="Quantity Sold"
        />
    );
};

export const WithManyLines = () => {
    const data = lineData.fiveTopics();

    const renderLine = (props: TooltipRenderArgs<typeof data>) => (
        <Line height={300} margin={lineMargin} grid="full" {...props} />
    );

    return (
        <Tooltip
            data={data}
            render={renderLine}
            // Tooltip reads rows from `values`; the line's are under `topics`
            topicLabel="topics"
            title="Quantity Sold"
        />
    );
};

export const WithAnimation = () => {
    const data = lineData.fiveTopics();

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

export const WithStepBeforeCurveAndTealColorSchema = () => {
    const data = lineData.fiveTopics();

    return (
        <Line
            data={data}
            margin={lineMargin}
            lineCurve="stepBefore"
            tooltipThreshold={200}
            colorSchema={colors.colorSchemas.teal}
        />
    );
};

/**
 * The Brush gets the total per date and, once a range is selected, the Line
 * redraws with only the dates inside it.
 */
export const WithTooltipAndBrush = () => {
    const allData = lineData.fiveTopics();
    const [range, setRange] = useState<[Date, Date] | null>(null);

    const totals = new Map<string, number>();

    allData.data.forEach(({ date, value }) => {
        totals.set(date, (totals.get(date) ?? 0) + value);
    });

    const brushData = [...totals.entries()].map(([date, value]) => ({
        date,
        value,
    }));

    const data = range
        ? {
              data: allData.data.filter(({ date }) => {
                  const time = new Date(date);

                  return time >= range[0] && time <= range[1];
              }),
          }
        : allData;

    const handleBrushEnd = (...args: never[]) => {
        // One argument: the selection's [start, end]
        const [[start, end]] = args as unknown as [[Date | null, Date | null]];

        setRange(start && end ? [start, end] : null);
    };

    const renderLine = (props: TooltipRenderArgs<typeof data>) => (
        <Line
            isAnimated={true}
            grid="horizontal"
            tooltipThreshold={600}
            margin={lineMargin}
            yAxisLabel="Value Axis Label"
            {...props}
        />
    );

    return (
        <div>
            <Tooltip
                data={data}
                render={renderLine}
                // Tooltip reads rows from `values`; the line's are under `topics`
                topicLabel="topics"
                title="Quantity Sold"
            />
            <Brush
                data={brushData}
                height={100}
                isAnimated={true}
                margin={{ top: 0, bottom: 40, left: 50, right: 30 }}
                customBrushEnd={handleBrushEnd}
            />
        </div>
    );
};

export const WithLoadingState = () => {
    const data = { data: [] };

    return <Line data={data} isLoading={true} />;
};
