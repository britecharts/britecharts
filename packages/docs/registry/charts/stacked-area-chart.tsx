'use client';

import {
    StackedArea,
    ResponsiveContainer,
    Tooltip,
    type StackedAreaProps as BritechartsStackedAreaProps,
} from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

export type StackedAreaChartProps = Omit<
    BritechartsStackedAreaProps,
    'width'
> & {
    /** Shown above the hovered date's name and value */
    tooltipTitle?: string;
};

/**
 * A Britecharts stacked area chart that fills its container's width, with a tooltip.
 * Data: `[{ date, name, value }]`. Every other prop is the chart's own:
 * https://britecharts.github.io/britecharts/docs/API/stacked-area
 */
export function StackedAreaChart({
    data,
    tooltipTitle = '',
    ...props
}: StackedAreaChartProps) {
    return (
        <ResponsiveContainer
            render={({ width }) => (
                <Tooltip
                    data={data}
                    title={tooltipTitle}
                    render={(tooltipProps) => (
                        <StackedArea
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
