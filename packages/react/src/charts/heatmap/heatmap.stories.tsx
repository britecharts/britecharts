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

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart.
 * The heatmap dispatches the hovered box as { day, hour, value }: the tooltip
 * shows its value, named by its hour.
 */
export const Playground: StoryFn<typeof Heatmap> = (args) => {
    const data = heatmapData.withWeeklyData();

    const renderHeatmap = (props: TooltipRenderArgs<typeof data>) => (
        <Heatmap {...args} {...props} />
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

Playground.args = { isAnimated: false };

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
