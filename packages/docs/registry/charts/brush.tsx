'use client';

import {
    Brush as BritechartsBrush,
    ResponsiveContainer,
    type BrushProps as BritechartsBrushProps,
} from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

export type BrushProps = Omit<BritechartsBrushProps, 'width'>;

/**
 * A Britecharts brush that fills its container's width.
 * Data: `[{ date, value }]`. Every other prop is the chart's own:
 * https://britecharts.github.io/britecharts/docs/API/brush
 */
export function Brush(props: BrushProps) {
    return (
        <ResponsiveContainer
            render={({ width }) => (
                <BritechartsBrush {...props} width={width} />
            )}
        />
    );
}
