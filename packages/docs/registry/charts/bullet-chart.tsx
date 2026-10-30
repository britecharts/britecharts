'use client';

import {
    Bullet,
    ResponsiveContainer,
    type BulletChartProps as BritechartsBulletChartProps,
} from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

export type BulletChartProps = Omit<BritechartsBulletChartProps, 'width'>;

/**
 * A Britecharts bullet chart that fills its container's width.
 * Data: `[{ ranges, measures, markers }]`, drawing the first item. Every other prop is the chart's own:
 * https://britecharts.github.io/britecharts/docs/API/bullet
 */
export function BulletChart(props: BulletChartProps) {
    return (
        <ResponsiveContainer
            render={({ width }) => <Bullet {...props} width={width} />}
        />
    );
}
