'use client';

import {
    Heatmap as BritechartsHeatmap,
    Tooltip,
    type HeatmapProps as BritechartsHeatmapProps,
} from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

export type HeatmapProps = BritechartsHeatmapProps & {
    /** Shown above the hovered box's name and value */
    tooltipTitle?: string;
};

/**
 * A Britecharts heatmap with a tooltip.
 * Data: `[{ day, hour, value }]`. Every other prop is the chart's own:
 * https://britecharts.github.io/britecharts/docs/API/heatmap
 */
export function Heatmap({ data, tooltipTitle = '', ...props }: HeatmapProps) {
    return (
        <Tooltip
            data={data}
            title={tooltipTitle}
            render={(tooltipProps) => (
                <BritechartsHeatmap {...props} {...tooltipProps} />
            )}
        />
    );
}
