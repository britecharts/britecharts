'use client';

import {
    Donut,
    ResponsiveContainer,
    type DonutChartProps as BritechartsDonutChartProps,
} from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

export type DonutChartProps = Omit<BritechartsDonutChartProps, 'width'>;

// Britecharts' defaults: the hole is this share of the radius, and a hovered
// slice grows by this much
const HOLE_RATIO = 45.5 / 140;
const HOVER_OFFSET = 12;

/**
 * A Britecharts donut chart that fills its container's width, sized to fit
 * its height. Data: `[{ name, quantity }]`. Every other prop is the chart's
 * own: https://britecharts.github.io/britecharts/docs/API/donut
 */
export function DonutChart({
    height = 300,
    externalRadius,
    internalRadius,
    radiusHoverOffset = HOVER_OFFSET,
    ...props
}: DonutChartProps) {
    return (
        <ResponsiveContainer
            render={({ width }) => {
                const radius =
                    externalRadius ??
                    Math.min(width, height) / 2 - radiusHoverOffset;

                return (
                    // Drawn afresh at each width, so the donut stays centred
                    <Donut
                        key={width}
                        {...props}
                        width={width}
                        height={height}
                        externalRadius={radius}
                        internalRadius={internalRadius ?? radius * HOLE_RATIO}
                        radiusHoverOffset={radiusHoverOffset}
                    />
                );
            }}
        />
    );
}
