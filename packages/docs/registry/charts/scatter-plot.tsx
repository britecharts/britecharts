'use client';

import {
    ScatterPlot as BritechartsScatterPlot,
    ResponsiveContainer,
    Tooltip,
    type ScatterPlotProps as BritechartsScatterPlotProps,
} from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

export type ScatterPlotProps = Omit<BritechartsScatterPlotProps, 'width'> & {
    /** Shown above the hovered point's name and value */
    tooltipTitle?: string;
};

/**
 * A Britecharts scatter plot that fills its container's width, with a tooltip.
 * Data: `[{ name, x, y }]`. Every other prop is the chart's own:
 * https://britecharts.github.io/britecharts/docs/API/scatter-plot
 */
export function ScatterPlot({
    data,
    tooltipTitle = '',
    ...props
}: ScatterPlotProps) {
    return (
        <ResponsiveContainer
            render={({ width }) => (
                <Tooltip
                    data={data}
                    title={tooltipTitle}
                    nameLabel="x"
                    valueLabel="y"
                    render={(tooltipProps) => (
                        <BritechartsScatterPlot
                            {...props}
                            {...tooltipProps}
                            width={width}
                        />
                    )}
                />
            )}
        />
    );
}
