import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';

import ScatterPlot from './ScatterPlot';
import Tooltip from '../tooltip/Tooltip';
import type { TooltipRenderArgs } from '../tooltip/Tooltip';
import scatterPlotData from './scatterPlotChart.fixtures';

export default {
    title: 'Charts/ScatterPlot',
    component: ScatterPlot,
} satisfies Meta<typeof ScatterPlot>;

/**
 * Every prop the chart takes, editable from the Controls panel. Left unset, a
 * prop keeps the chart's own default, so this starts as the default chart,
 * with horizontal grid lines and its tooltip.
 */
export const Playground: StoryFn<typeof ScatterPlot> = (args) => {
    const data = scatterPlotData.withOneSource();

    const renderScatterPlot = (props: TooltipRenderArgs<typeof data>) => (
        <ScatterPlot {...args} {...props} />
    );

    // The chart dispatches the hovered point as { name, x, y }: the tooltip
    // shows a single value, the y, titled with the x
    return (
        <Tooltip
            data={data}
            render={renderScatterPlot}
            title="Temperature (C)"
            // A point's value is its `y`; `nameLabel` shows its `x` instead of its name
            nameLabel="x"
            valueLabel="y"
            numberFormat="$"
        />
    );
};

Playground.args = { isAnimated: false, grid: 'horizontal' };

Playground.parameters = {
    controls: { exclude: ['data', 'chart', 'createTooltip'] },
};

export const WithTrendlineAndGrid = () => {
    const data = scatterPlotData.withOneSource();

    return (
        <ScatterPlot
            data={data}
            isAnimated={true}
            circleOpacity={0.6}
            hasTrendline={true}
            grid="horizontal"
            margin={{
                top: 20,
                right: 20,
                bottom: 50,
                left: 60,
            }}
            xAxisFormat=".1f"
            xAxisLabel="Temperature (C)"
            yAxisFormat="$"
            yAxisLabel="Ice Cream Sales"
        />
    );
};

export const WithAnimation = () => {
    const data = scatterPlotData.withOneSource();

    const renderScatterPlot = (props: TooltipRenderArgs<typeof data>) => (
        <ScatterPlot isAnimated={true} {...props} />
    );

    // The chart dispatches the hovered point as { name, x, y }: the tooltip
    // shows a single value, the y, titled with the x
    return (
        <Tooltip
            data={data}
            render={renderScatterPlot}
            title="Temperature (C)"
            // A point's value is its `y`; `nameLabel` shows its `x` instead of its name
            nameLabel="x"
            valueLabel="y"
            numberFormat="$"
        />
    );
};

export const WithCrossHairsAndHollowCircles = () => {
    const data = scatterPlotData.withFourNames();

    return (
        <ScatterPlot
            data={data}
            isAnimated={true}
            hasCrossHairs={true}
            hasHollowCircles={true}
            maxCircleArea={15}
            margin={{
                top: 20,
                right: 20,
                bottom: 45,
                left: 60,
            }}
        />
    );
};

export const WithNegativeValues = () => {
    const data = scatterPlotData.withNegativeValues();

    return <ScatterPlot data={data} isAnimated={true} height={400} />;
};

export const WithLoadingState = () => {
    const data: [] = [];

    return <ScatterPlot data={data} isLoading={true} />;
};
