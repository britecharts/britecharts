'use client';

import {
    GroupedBar,
    ResponsiveContainer,
    Tooltip,
    type GroupedBarProps as BritechartsGroupedBarProps,
} from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

export type GroupedBarChartProps = Omit<BritechartsGroupedBarProps, 'width'> & {
    /** Shown above the hovered group's name and value */
    tooltipTitle?: string;
};

/**
 * A Britecharts grouped bar chart that fills its container's width, with a tooltip.
 * Data: `[{ group, name, value }]`. Every other prop is the chart's own:
 * https://britecharts.github.io/britecharts/docs/API/grouped-bar
 */
export function GroupedBarChart({
    data,
    tooltipTitle = '',
    ...props
}: GroupedBarChartProps) {
    return (
        <ResponsiveContainer
            render={({ width }) => (
                <Tooltip
                    data={data}
                    title={tooltipTitle}
                    nameLabel="group"
                    render={(tooltipProps) => (
                        <GroupedBar
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
