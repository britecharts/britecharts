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
 * The mini tooltip is the tooltip with the single layout forced, so it has
 * the tooltip's whole API.
 */
export type MiniTooltipAPI = TooltipAPI;

export type MiniTooltipModule = TooltipModule;

// Warned about once
let hasWarnedDeprecation = false;

// Deprecated: `tooltip()` picks this layout from the data point, with no
// title and a `.2f` format by default. Kept through 3.x so version 2 code
// keeps working (a plain comment on purpose: one page for the one component).
export default function module(): MiniTooltipModule {
    if (!hasWarnedDeprecation) {
        hasWarnedDeprecation = true;
        // eslint-disable-next-line no-console
        console.warn(
            'Britecharts: miniTooltip is deprecated and goes in version 4. Use tooltip(), which shows a single value by itself.'
        );
    }

    return tooltip().layout('single').title('').numberFormat('.2f');
}
