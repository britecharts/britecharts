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

export const WithIncreasedAreaAndHollowCircles = () => {
    const data = scatterPlotData.withFourNames();

    const renderScatterPlot = (props: TooltipRenderArgs<typeof data>) => (
        <ScatterPlot
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
            {...props}
        />
    );

    // A point's value is its `y`; `nameLabel` shows its `x` instead of its name
    return (
        <Tooltip
            data={data}
            render={renderScatterPlot}
            nameLabel="x"
            valueLabel="y"
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

export const WithNegativeValues = () => {
    const data = scatterPlotData.withNegativeValues();

    return <ScatterPlot data={data} isAnimated={true} height={400} />;
};

/**
 * Values on both sides of zero: the value axis runs below zero, and each
 * circle's size shows the magnitude of its value, so -55 draws as large as 55.
 * Static, with grid lines, so the zero line and the sizes are easy to compare.
 */
export const WithValuesAboveAndBelowZero = () => {
    const data = scatterPlotData.withNegativeValues();

    const renderScatterPlot = (props: TooltipRenderArgs<typeof data>) => (
        <ScatterPlot isAnimated={false} grid="full" height={400} {...props} />
    );

    // A point's value is its `y`; `nameLabel` shows its `x` instead of its name
    return (
        <Tooltip
            data={data}
            render={renderScatterPlot}
            title="Temperature delta (C)"
            nameLabel="x"
            valueLabel="y"
        />
    );
};

export const WithLoadingState = () => {
    const data: [] = [];

    return <ScatterPlot data={data} isLoading={true} />;
};
