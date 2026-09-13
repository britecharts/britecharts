import {
    TooltipAPI,
    TooltipModule,
    TooltipPosition,
    TooltipChartSize,
    TooltipSingleDataShape,
} from './tooltip';

export enum MiniTooltipKeys {
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

/**
 * import {bar, miniTooltip} from '@britecharts/core';
 *
 * const barChart = bar(),
 *     tooltip = miniTooltip();
 *
 * barChart
 *  .width(100)
 *  .height(100)
 *  .on('customMouseOver', tooltip.show)
 *  .on('customMouseMove', tooltip.update)
 *  .on('customMouseOut', tooltip.hide);
 *
 * barContainer.datum(dataset).call(barChart);
 *
 * tooltipContainer = d3Selection.select('.bar-chart-container .bar-chart .metadata-group');
 * tooltipContainer.datum([]).call(tooltip);
 *
 */
export function miniTooltip(): MiniTooltipModule;
