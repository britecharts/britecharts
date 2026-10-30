'use client';

import {
    Line,
    ResponsiveContainer,
    Tooltip,
    type LineProps as BritechartsLineProps,
} from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

export type LineChartProps = Omit<BritechartsLineProps, 'width'> & {
    /** Shown above the hovered date's name and value */
    tooltipTitle?: string;
};

/**
 * A Britecharts line chart that fills its container's width, with a tooltip.
 * Data: `{ data: [{ date, name, topicName, value }] }`, where `name` is a
 * number that identifies the line and `topicName` its label. Every other prop is the chart's own:
 * https://britecharts.github.io/britecharts/docs/API/line
 */
export function LineChart({
    data,
    tooltipTitle = '',
    ...props
}: LineChartProps) {
    return (
        <ResponsiveContainer
            render={({ width }) => (
                <Tooltip
                    data={data}
                    title={tooltipTitle}
                    topicLabel="topics"
                    render={(tooltipProps) => (
                        <Line {...props} {...tooltipProps} width={width} />
                    )}
                />
            )}
        />
    );
}
