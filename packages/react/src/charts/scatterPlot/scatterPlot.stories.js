import React from 'react';

import ScatterPlot from './ScatterPlot';
import Tooltip from '../tooltip/Tooltip';
import scatterPlotData from './scatterPlotChart.fixtures';

export default {
    title: 'Charts/ScatterPlot',
    component: ScatterPlot,
};

export const WithDefaultProperties = () => {
    const data = scatterPlotData.withFourNames();

    return <ScatterPlot data={data} />;
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

export const WithTooltip = () => {
    const data = scatterPlotData.withOneSource();

    const renderScatterPlot = (props) => (
        <ScatterPlot
            circleOpacity={0.6}
            hasTrendline={true}
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
            {...props}
        />
    );

    // The chart dispatches the hovered point as { name, x, y }: the tooltip
    // shows a single value, the y, titled with the x
    return (
        <Tooltip
            data={data}
            render={renderScatterPlot}
            title="Temperature (C)"
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
    const data = [];

    return <ScatterPlot data={data} isLoading={true} />;
};
