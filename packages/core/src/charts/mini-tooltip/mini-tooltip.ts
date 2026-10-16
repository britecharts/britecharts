import tooltip from '../tooltip/tooltip.js';

import type {
    TooltipAPI,
    TooltipChartSize,
    TooltipModule,
    TooltipPosition,
    TooltipSingleDataShape,
} from '../tooltip/tooltip.js';

export declare enum MiniTooltipKeys {
    Value = 'value',
    Name = 'name',
}

export type MiniTooltipDataShape = TooltipSingleDataShape;

export type MousePosition = TooltipPosition;

export type ChartSize = TooltipChartSize;

/**
 * The mini tooltip is the single-value preset of the tooltip
 * (`tooltip().layout('single').title('').numberFormat('.2f')`), so it has
 * the tooltip's whole API.
 */
export type MiniTooltipAPI = TooltipAPI;

export type MiniTooltipModule = TooltipModule;

// The single-value preset of the tooltip: the same component with the
// single layout, no title and a `.2f` number format, for the bar, scatter
// plot, heatmap and donut charts. Documented on the tooltip's API page
// (a plain comment on purpose: one page for the one component).
export default function module(): MiniTooltipModule {
    return tooltip().layout('single').title('').numberFormat('.2f');
}
