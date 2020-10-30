import { LocalObject } from '@common/local';
import { StackedBarBaseAPI, InteractiveChartAPI, ExportableChartAPI } from '@common/base';
import { GridTypes } from '@common/grid';
import { ChartModuleSelection } from '@common/selection';
import { BaseType, Selection } from 'd3-selection';
import { StackedAreaChartModule } from 'britecharts';


export enum StackedBarChartKeys {
  Stack = 'stack',
  Name = 'name',
  Value = 'value',
}

export type StackedBarChartDataShape = {
  [StackedBarChartKeys.Value]: number;
  [StackedBarChartKeys.Name]: string;
  [StackedBarChartKeys.Stack]: string;
};

export type StackedBarSelection = Selection<
  BaseType,
  StackedBarChartDataShape,
  HTMLElement,
  any
>;

type Offset = {
  x: number;
  y: number;
}

export interface StackedBarChartAPI extends StackedBarBaseAPI<StackedBarChartModule>, InteractiveChartAPI<StackedBarChartModule>, ExportableChartAPI<StackedAreaChartModule> {
  /** Gets or Sets the aspect ratio of the chart */
  aspectRatio(ratio?: number): StackedBarChartModule;
  /** Gets or Sets the padding of the stacked bar chart */
  betweenBarsPadding(padding?: number): StackedBarChartModule;
  /** Gets or Sets the grid mode */
  grid(gridMode?: GridTypes): StackedBarChartModule;
  /** Gets or Sets the hasPercentage status */
  hasPercentage(hasPercentage?: boolean): StackedBarChartModule;
  /** Gets or Sets the hasReversedStacks property of the chart, reversing the order of stacks. */
  hasReversedStacks(hasReversedStacks?: boolean): StackedBarChartModule;
  /** Gets or Sets the horizontal direction of the chart */
  isHorizontal(isHorizontal?: boolean): StackedBarChartModule;
  /** Pass language tag for the tooltip to localize the date */
  locale(localObject?: LocalObject | null): StackedBarChartModule;
  /**
   * Configurable extension of the x axis
   * If your max point was 50% you might want to show x axis to 60%, pass 1.2
   */
  percentageAxisToMaxRatio(ratio?: number): StackedBarChartModule;
  /** Gets or Sets the minimum width of the graph in order to show the tooltip */
  tooltipThreshold(threshold?: number): StackedBarChartModule;
  /** Gets or Sets the numberFormat of the chart */
  valueLabelFormat(format?: string): StackedBarChartModule;  //Deprecated on V3 into numberFormat
  /** Gets or Sets the number of ticks of the x axis on the chart */
  xTicks(ticks?: number): StackedBarChartModule;
  /** Gets or Sets the y-axis label of the chart */
  yAxisLabel(yAxisLabel?: string): StackedBarChartModule;
  /**
   * Gets or Sets the offset of the yAxisLabel of the chart.
   * The method accepts both positive and negative values.
   */
  yAxisLabelOffset(yAxisLabelOffset?: number): StackedBarChartModule;
  /** Gets or Sets the number of vertical ticks of the axis on the chart */
  yTicks(ticks?: number): StackedBarChartModule;
}


export type StackedBarChartModule = ChartModuleSelection<StackedBarChartDataShape[]> &
  StackedBarChartAPI;

/**
 * import {stackedBar} from 'britecharts;
 * stackedBar().width(100).height(100)
 */
export function stackedBar(): StackedBarChartModule;
