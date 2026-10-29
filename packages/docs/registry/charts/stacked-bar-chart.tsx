'use client';

import {
    StackedBar,
    ResponsiveContainer,
    Tooltip,
    type StackedBarProps as BritechartsStackedBarProps,
} from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

export type StackedBarChartProps = Omit<BritechartsStackedBarProps, 'width'> & {
    /** Shown above the hovered stack's name and value */
    tooltipTitle?: string;
};

/**
 * A Britecharts stacked bar chart that fills its container's width, with a tooltip.
 * Data: `[{ stack, name, value }]`. Every other prop is the chart's own:
 * https://britecharts.github.io/britecharts/docs/API/stacked-bar
 */
export function StackedBarChart({
    data,
    tooltipTitle = '',
    ...props
}: StackedBarChartProps) {
    return (
        <ResponsiveContainer
            render={({ width }) => (
                <Tooltip
                    data={data}
                    title={tooltipTitle}
                    nameLabel="stack"
                    render={(tooltipProps) => (
                        <StackedBar
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
