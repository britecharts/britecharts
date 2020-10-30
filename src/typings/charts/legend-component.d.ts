import { ComponentBaseAPI } from '@common/base';
import { ChartModuleSelection } from '@common/selection';
import { BaseType, Selection } from 'd3-selection';


export enum LegendKeys {
  Name = 'name',
  Id = 'id',
  Quantity = 'quantity',
}

export type LegendDataShape = {
  [LegendKeys.Name]: string;
  [LegendKeys.Id]: number;
  [LegendKeys.Quantity]?: number;
};

export type LegendSelection = Selection<
  BaseType,
  LegendDataShape,
  HTMLElement,
  any
>;

export interface LegendAPI extends ComponentBaseAPI<LegendModule> {
  /** Command that highlights a line entry by fading the rest of lines on a legend instance */
  highlight(entryId: number): void;
  /** Gets or Sets the id of the entry to highlight */
  highlightEntryById(highlightedEntryId?: number): LegendModule;
  /** Gets or Sets the horizontal mode on the legend */
  isHorizontal(isHorizontal?: boolean): LegendModule;
  /**
   * Gets or Sets the margin ratio of the legend chart.
   * Used to determine spacing between legend elements.
   */
  marginRatio(ratio?: number): LegendModule;
  /**
   * Gets or Sets the markerSize of the legend chart.
   * This markerSize will determine the horizontal and vertical size of the colored marks
   * added as color identifiers for the chart's categories.
   */
  markerSize(markerSize?: number): LegendModule;
}

export type LegendModule = ChartModuleSelection<LegendDataShape[]> &
  LegendAPI;

/**
 * import {legend} from 'britecharts;
 * legend().width(100).height(100)
 */
export function legend(): LegendModule;
