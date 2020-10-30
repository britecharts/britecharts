import { ChartBaseAPI, InteractiveChartAPI, ExportableChartAPI } from '@common/base';
import { ChartModuleSelection } from '@common/selection';
import { BaseType, Selection } from 'd3-selection';

export enum BarChartKeys {
  Value = 'value',
  Name = 'name',
}

export type BarChartDataShape = {
  [BarChartKeys.Value]: number;
  [BarChartKeys.Name]: string;
};

export type BarSelection = Selection<
  BaseType,
  BarChartDataShape,
  HTMLElement,
  any
>;

export interface BarChartAPI extends ChartBaseAPI<BarChartModule>, ExportableChartAPI<BarChartModule>, InteractiveChartAPI<BarChartModule> {
  /** Gets or Sets the padding of the chart (Default is 0.1) */
  betweenBarsPadding(padding?: number): BarChartModule;
  /** Gets or Sets the gradient colors of a bar in the chart */
  chartGradient(gradient?: [string, string]): BarChartModule;
  /** If true, adds labels at the end of the bars */
  enableLabels(shouldEnable?: boolean): BarChartModule;
  /** Gets or Sets the hasPercentage status */
  hasPercentage(hasPercentage?: boolean): BarChartModule;
  /**
   * Gets or Sets the hasSingleBarHighlight status.
   * If the value is true (default), only the hovered bar is considered to
   * be highlighted and will be darkened by default. If the value is false,
   * all the bars but the hovered bar are considered to be highlighted
   * and will be darkened (by default).
   */
  hasSingleBarHighlight(hasHighlight?: boolean): BarChartModule;
  /**
   * Gets or Sets the highlightBarFunction function. The callback passed to
   * this function returns a bar selection from the bar chart. Use this function
   * if you want to apply a custom behavior to the highlighted bar on hover.
   * When hasSingleBarHighlight is true the highlighted bar will be the
   * one that was hovered by the user. When hasSingleBarHighlight is false
   * the highlighted bars are all the bars but the hovered one. The default
   * highlight effect on a bar is darkening the highlighted bar(s) color.
   */
  highlightBarFunction(
    highlightFunc: (bar: BarSelection) => void | null
  ): BarChartModule;
  /** Gets or Sets the horizontal direction of the chart */
  isHorizontal(isHorizontal?: boolean): BarChartModule;
  /** Offset between end of bar and start of the percentage bars */
  labelsMargin(margin?: number): BarChartModule;
  /** Gets or Sets the labels number format */
  labelsNumberFormat(format?: string): BarChartModule;
  /** Get or Sets the labels text size */
  labelsSize(size?: number): BarChartModule;
  /** Changes the order of items given the custom function */
  orderingFunction(
    orderingFunc: (a: BarChartDataShape, b: BarChartDataShape) => void
  ): BarChartModule;
  /** Configurable extension of the x axis. If your max point was 50% you might want to show x axis to 60%, pass 1.2 */
  percentageAxisToMaxRatio(ratio?: number): BarChartModule;
  /** Gets or Sets whether the color list should be reversed or not */
  shouldReverseColorList(shouldReverse?: boolean): BarChartModule;
  /** Gets or Sets the valueLabel of the chart */
  valueLabel(valueLabel?: string): BarChartModule;
  /** Gets or Sets the text of the xAxisLabel on the chart */
  xAxisLabel(xAxisLabel?: string): BarChartModule;
  /** Gets or Sets the offset of the xAxisLabel on the chart */
  xAxisLabelOffset(offset?: number): BarChartModule;
  /** Gets or Sets the number of ticks of the x axis on the chart */
  xTicks(ticks?: number): BarChartModule;
  /** Gets or Sets the text of the yAxisLabel on the chart */
  yAxisLabel(yAxisLabel?: string): BarChartModule;
  /** Gets or Sets the offset of the yAxisLabel on the chart */
  yAxisLabelOffset(yAxisLabelOffset?: number): BarChartModule;
  /** Space between y axis and chart */
  yAxisPaddingBetweenChart(yAxisPadding?: number): BarChartModule;
  /** Gets or Sets the number of vertical ticks on the chart */
  yTicks(ticks?: number): BarChartModule;
}

export type BarChartModule = ChartModuleSelection<BarChartDataShape[]> &
  BarChartAPI;

/**
 * import {bar} from 'britecharts;
 * bar().width(100).height(100)
 */
export function bar(): BarChartModule;
