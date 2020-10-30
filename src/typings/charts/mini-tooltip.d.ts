import { ChartModuleSelection } from '@common/selection';
import { BaseType, Selection } from 'd3-selection';

export enum MiniTooltipKeys {
  Value = 'value',
  Name = 'name',
}

export type MiniTooltipDataShape = {
  [MiniTooltipKeys.Value]: number;
  [MiniTooltipKeys.Name]: string;
};

export type TooltipSelection = Selection<
  BaseType,
  MiniTooltipDataShape,
  HTMLElement,
  any
>;

export type MousePosition = [ number, number ];

export type ChartSize = [ number, number ];

type FormattingFunction = (value: number) => number;

export interface MiniTooltipAPI {
  /** Hides the tooltip */
  hide(): void;
  /** Shows the tooltip */
  show(): void;
  /** Updates the position and content of the tooltip */
  update(dataPoint: MiniTooltipDataShape, mousePosition: MousePosition, chartSize: ChartSize): void;
  /** Gets or Sets the number format for the value displayed on the tooltip */
  numberFormat(format?: string): MiniTooltipModule;
  /**
   * Gets or Sets the formatter function for the value displayed on the tooltip.
   * Setting this property makes the tooltip ignore numberFormat. Set by default to
   * d3-format formatter with numberFormat.
   */
  valueFormatter(formattingFunction?: FormattingFunction): MiniTooltipModule;
  /** Gets or Sets the title of the tooltip */
  title(title?: string): MiniTooltipModule;
  /** Gets or Sets data's valueLabel */
  valueLabel(label?: string): MiniTooltipModule;
  /** Gets or Sets data's nameLabel */
  nameLabel(label?: string): MiniTooltipModule;
}

export type MiniTooltipModule = ChartModuleSelection<MiniTooltipDataShape[]> & MiniTooltipAPI;

/**
 * import {bar, miniTooltip} from 'britecharts;
 *
 * bar()
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
