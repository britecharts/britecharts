'use client';

import {
    Legend as BritechartsLegend,
    ResponsiveContainer,
    type LegendProps as BritechartsLegendProps,
} from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

export type LegendProps = Omit<BritechartsLegendProps, 'width'>;

/**
 * A Britecharts legend that fills its container's width.
 * Data: `[{ id, name, quantity }]`. Every other prop is the chart's own:
 * https://britecharts.github.io/britecharts/docs/API/legend
 */
export function Legend(props: LegendProps) {
    return (
        <ResponsiveContainer
            render={({ width }) => (
                <BritechartsLegend {...props} width={width} />
            )}
        />
    );
}
