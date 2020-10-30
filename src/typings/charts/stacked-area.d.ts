import { ChartBaseAPI, InteractiveChartAPI, ExportableChartAPI } from '@common/base';
import { GridTypes } from '@common/grid';
import { ChartModuleSelection } from '@common/selection';
import { AxisTimeCombination } from '@helpers/constants';
import { StackedBarChartModule } from 'britecharts';


export enum StackedAreaChartKeys {
  Date = 'date',
  Name = 'name',
  Value = 'value',
}

export type StackedAreaChartDataShape = {
  [StackedAreaChartKeys.Date]: string;
  [StackedAreaChartKeys.Name]: string;
  [StackedAreaChartKeys.Value]: number;
};

export interface StackedAreaEmptyDataConfig {
  minDate: Date;
  maxDate: Date;
  maxY: number;
}

export interface StackedAreaChartAPI
  extends ChartBaseAPI<StackedAreaChartModule>, InteractiveChartAPI<StackedBarChartModule>, ExportableChartAPI<StackedAreaChartModule> {
  /**
   * Exposes the constants to be used to force the x axis to respect a certain granularity
   * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
   */
  axisTimeCombinations: {
    [key in keyof typeof AxisTimeCombination]: AxisTimeCombination | string;
  };
  /** Gets or Sets the area curve of the stacked area. */
  areaCurve(curveType?: string): StackedAreaChartModule;
  /** Gets or Sets the opacity of the stacked areas in the chart (all of them will have the same opacity) */
  areaOpacity(opacity?: number): StackedAreaChartModule;
  /** Gets or Sets the aspect ratio of the chart */
  aspectRatio(ratio?: number): StackedAreaChartModule;
  /** Gets or Sets the emptyDataConfig of the chart */
  emptyDataConfig(config?: StackedAreaEmptyDataConfig): StackedAreaChartModule;
  /** Gets or Sets the grid mode */
  grid(gridType?: GridTypes): StackedAreaChartModule;
  /** Enables or disables the outline at the top of the areas */
  hasOutline(hasOutline?: boolean): StackedAreaChartModule;
  /** Gets or Sets the keyLabel of the chart */
  keyLabel(label?: string): StackedAreaChartModule;
  /** Gets or Sets the minimum width of the graph in order to show the tooltip */
  tooltipThreshold(threshold?: number): StackedAreaChartModule;
  /** Pass an override for the ordering of the topics */
  topicsOrder(orderList?: string[]): StackedAreaChartModule;
  /**
   * Exposes the ability to force the chart to show a certain x format
   * It requires a `xAxisFormat` of 'custom' in order to work.
   * NOTE: localization not supported
   */
  xAxisCustomFormat(format?: string): StackedAreaChartModule;
  /** Exposes the ability to force the chart to show a certain x axis grouping */
  xAxisFormat(format?: string): StackedAreaChartModule;
  /**
   * Gets or Sets the `xAxisScale`.
   * Choose between 'linear' and 'logarithmic'. The setting will only work if `xAxisValueType` is set to
   * 'number' as well, otherwise it won't influence the visualization.
   */
  xAxisScale(scale?: 'linear' | 'logarithmic'): StackedAreaChartModule;
  /**
   * Gets or Sets the `xAxisValueType`.
   * Choose between 'date' and 'number'. When set to `number` the values of the x-axis must not
   * be dates anymore, but can be arbitrary numbers.
   */
  xAxisValueType(valueType?: 'date' | 'numeric'): StackedAreaChartModule;
  /**
   * Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisFormat` of 'custom' in order to work.
   * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
   * how many and where the ticks will appear.
   */
  xTicks(ticks: number): StackedAreaChartModule;
  /**
   * Gets or Sets the yAxisBaseline - this is the y-value where the area starts from in y-direction
   * (default is 0). Change this value if you don't want to start your area from y=0.
   */
  yAxisBaseline(baseLine: number): StackedAreaChartModule;
  /** Gets or Sets the y-axis label of the chart */
  yAxisLabel(label: string): StackedAreaChartModule;
  /**
   * Gets or Sets the offset of the yAxisLabel of the chart.
   * The method accepts both positive and negative values.
   */
  yAxisLabelOffset(offset: number): StackedAreaChartModule;
  /** Gets or Sets the number of ticks of the y axis on the chart */
  yTicks(ticks: number): StackedAreaChartModule;
}

export type StackedAreaChartModule = ChartModuleSelection<
  StackedAreaChartDataShape[]
> &
  StackedAreaChartAPI;

/**
 * import {stackedArea} from 'britecharts;
 * const areaChart = stackedArea();
 * areaChart().width(100).height(100);
 * areaChart.xAxisFormat(areaChart.axisTimeCombinations.HOUR_DAY)
 */
export function stackedArea(): StackedAreaChartModule;
