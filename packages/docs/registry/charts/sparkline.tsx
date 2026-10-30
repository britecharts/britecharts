'use client';

import {
    Sparkline as BritechartsSparkline,
    ResponsiveContainer,
    type SparklineProps as BritechartsSparklineProps,
} from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

export type SparklineProps = Omit<BritechartsSparklineProps, 'width'>;

/**
 * A Britecharts sparkline that fills its container's width.
 * Data: `[{ date, value }]`. Every other prop is the chart's own:
 * https://britecharts.github.io/britecharts/docs/API/sparkline
 */
export function Sparkline(props: SparklineProps) {
    return (
        <ResponsiveContainer
            render={({ width }) => (
                <BritechartsSparkline {...props} width={width} />
            )}
        />
    );
}
