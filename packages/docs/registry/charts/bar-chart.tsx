'use client';

import {
    Bar,
    ResponsiveContainer,
    Tooltip,
    type BarChartProps as BritechartsBarChartProps,
} from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

export type BarChartProps = Omit<BritechartsBarChartProps, 'width'> & {
    /** Shown above the hovered bar's name and value */
    tooltipTitle?: string;
};

/**
 * A Britecharts bar chart that fills its container's width, with a tooltip.
 * Data: `[{ name, value }]`. Every other prop is the chart's own:
 * https://britecharts.github.io/britecharts/docs/API/bar
 */
export function BarChart({ data, tooltipTitle = '', ...props }: BarChartProps) {
    return (
        <ResponsiveContainer
            render={({ width }) => (
                <Tooltip
                    data={data}
                    title={tooltipTitle}
                    render={(tooltipProps) => (
                        <Bar {...props} {...tooltipProps} width={width} />
                    )}
                />
            )}
        />
    );
}
