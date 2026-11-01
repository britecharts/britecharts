'use client';

import {
    Treemap as BritechartsTreemap,
    Tooltip,
    type TreemapProps as BritechartsTreemapProps,
} from '@britecharts/react';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

export type TreemapProps = BritechartsTreemapProps & {
    /** Shown above the hovered cell's name and value */
    tooltipTitle?: string;
};

/**
 * A Britecharts treemap with a tooltip.
 * Data: `[{ name, value }]`. Every other prop is the chart's own:
 * https://britecharts.github.io/britecharts/docs/API/treemap
 */
export function Treemap({ data, tooltipTitle = '', ...props }: TreemapProps) {
    return (
        <Tooltip
            data={data}
            title={tooltipTitle}
            render={(tooltipProps) => (
                <BritechartsTreemap {...props} {...tooltipProps} />
            )}
        />
    );
}
