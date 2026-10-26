import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { colors } from '@britecharts/core';

import Heatmap from './Heatmap';
import Tooltip from '../tooltip/Tooltip';
import type { TooltipRenderArgs } from '../tooltip/Tooltip';
import heatmapData from './heatmapChart.fixtures';

export default {
    title: 'Charts/Heatmap',
    component: Heatmap,
} satisfies Meta<typeof Heatmap>;

const lightWords = [
    'Blazing',
    'Glittering',
    'Shining',
    'Sunny',
    'Flashing',
    'Radiant',
];

type HeatmapBox = { day: number; hour: number; value: number };

// What the tooltip shows for a box: its row and column words, and its value
const nameBox = ({ day, hour, value }: HeatmapBox) => ({
    name:
        day === hour
            ? lightWords[day]
            : `${lightWords[day]} + ${lightWords[hour]}`,
    value,
});

/**
 * Every prop the chart takes, editable from the Controls panel. Categories on
 * both axes: `yAxisLabels` names the rows and `xAxisLabels` the columns, and
 * each box's `day` and `hour` index them. How often two light words describe
 * the same thing, and on the diagonal how often each one does on its own. The
 * chart is sized from the box size and margins, so the grid stays square.
 */
export const Playground: StoryFn<typeof Heatmap> = (args) => {
    const data = heatmapData.withCategoricalData();
    const { boxSize = 70, margin = {} } = args;
    const { top = 40, right = 20, bottom = 20, left = 80 } = margin;
    const side = lightWords.length * boxSize;

    const renderHeatmap = ({
        customMouseMove,
        ...props
    }: TooltipRenderArgs<typeof data>) => (
        <Heatmap
            {...args}
            {...props}
            customMouseMove={(box, position, size) =>
                customMouseMove(nameBox(box as HeatmapBox), position, size)
            }
            yAxisLabels={lightWords}
            xAxisLabels={lightWords}
            margin={{ top, right, bottom, left }}
            width={left + side + right}
            height={top + side + bottom}
        />
    );

    return (
        <Tooltip
            data={data}
            render={renderHeatmap}
            title="Described together"
            numberFormat="d"
        />
    );
};

Playground.args = {
    isAnimated: false,
    colorSchema: colors.colorSchemas.purple,
    boxSize: 70,
};

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithWeeklyElements = () => (
    <Heatmap
        data={heatmapData.withWeeklyData()}
        boxSize={30}
        isAnimated={true}
    />
);

export const WithAnimation = () => {
    const data = heatmapData.withWeeklyData();

    const renderHeatmap = (props: TooltipRenderArgs<typeof data>) => (
        <Heatmap isAnimated={true} {...props} />
    );

    return (
        <Tooltip
            data={data}
            render={renderHeatmap}
            title="Visits"
            nameLabel="hour"
        />
    );
};

export const WithAnotherColorSchema = () => (
    <Heatmap
        data={heatmapData.withWeeklyData()}
        colorSchema={colors.colorSchemas.teal}
    />
);

export const WithDayLabels = () => (
    <Heatmap
        data={heatmapData.withWeeklyData()}
        yAxisLabels={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
    />
);

export const WithLoadingState = () => {
    const data: [] = [];

    return <Heatmap data={data} isLoading={true} />;
};
