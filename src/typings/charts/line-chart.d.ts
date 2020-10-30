import { ChartBaseAPI, InteractiveChartAPI, ExportableChartAPI } from '@common/base';
import { GridTypes } from '@common/grid';
import { ChartModuleSelection } from '@common/selection';
import { AxisTimeCombination } from '@helpers/constants';


export enum LineChartKeys {
  Date = 'date',
  Name = 'name',
  TopicName = 'topicName',
  Value = 'value',
}

export type LineChartDataShape = {
  [LineChartKeys.Date]: string;
  [LineChartKeys.Name]: string;
  [LineChartKeys.TopicName]: string;
  [LineChartKeys.Value]: number;
};

export type LineChartData = {
  data: LineChartDataShape[],
}

export interface LineChartEmptyDataConfig {
  minDate: Date;
  maxDate: Date;
  maxY: number;
}

export interface CustomLine {
  y: number;
  name: string;
  color: string;
}

export interface LineChartAPI
  extends ChartBaseAPI<LineChartModule>, InteractiveChartAPI<LineChartModule>, ExportableChartAPI<LineChartModule> {
  /**
   * Exposes the constants to be used to force the x axis to respect a certain granularity
   * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
   */
  axisTimeCombinations: {
    [key in keyof typeof AxisTimeCombination]: AxisTimeCombination | string;
  };
  /** Gets or Sets the aspect ratio of the chart */
  aspectRatio(ratio?: number): LineChartModule;
  /** Gets or Sets the grid mode. */
  grid(gridType?: GridTypes): LineChartModule;
  /** Gets or Sets the curve of the line chart */
  lineCurve(curveType?: string): LineChartModule;
  /** Gets or Sets the gradient colors of the line chart when there is only one line */
  lineGradient(gradient?: [string, string]): LineChartModule;
  /**
   * Add custom horizontal lines to the Chart - this way you are able to plot arbitrary horizontal lines
   * onto the chart with a specific color and a text annotation over the line.
   */
  lines(customLines: CustomLine[]): LineChartModule;
  /** Gets or Sets the topicLabel of the chart */
  shouldShowAllDataPoints(showAllDataPoints?: boolean): LineChartModule;
  /**
   * Gets or Sets the minimum width of the graph in order to show the tooltip
   * NOTE: This could also depend on the aspect ratio
   */
  tooltipThreshold(threshold?: number): LineChartModule;
  /**
   * Exposes the ability to force the chart to show a certain x format
   * It requires a `xAxisFormat` of 'custom' in order to work.
   * NOTE: localization not supported
   */
  xAxisCustomFormat(format?: string): LineChartModule;
  /** Exposes the ability to force the chart to show a certain x axis grouping */
  xAxisFormat(format?: string): LineChartModule;
  /** Gets or Sets the label of the X axis of the chart */
  xAxisLabel(label: string): LineChartModule;
  /**
   * Gets or Sets the `xAxisScale`.
   * Choose between 'linear' and 'logarithmic'. The setting will only work if `xAxisValueType` is set to
   * 'number' as well, otherwise it won't influence the visualization.
   */
  xAxisScale(scale?: 'linear' | 'logarithmic'): LineChartModule;
  /**
   * Gets or Sets the `xAxisValueType`.
   * Choose between 'date' and 'number'. When set to `number` the values of the x-axis must not
   * be dates anymore, but can be arbitrary numbers.
   */
  xAxisValueType(valueType?: 'date' | 'numeric'): LineChartModule;
  /**
   * Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisFormat` of 'custom' in order to work.
   * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
   * how many and where the ticks will appear.
   */
  xTicks(ticks: number): LineChartModule;
  /** Gets or Sets the label of the Y axis of the chart */
  yAxisLabel(label: string): LineChartModule;
  /** Gets or Sets the yAxisLabelPadding of the chart. */
  yAxisLabelPadding(padding: number): LineChartModule;
  /** Gets or Sets the number of ticks of the y axis on the chart */
  yTicks(ticks: number): LineChartModule;
}


export type LineChartModule = ChartModuleSelection<
LineChartData
> &
  LineChartAPI;

/**
 * import {line} from 'britecharts;
 *
 * const lineChart = line();
 *
 * lineChart()
 *    .width(100)
 *    .height(100)
 *    .xAxisFormat(lineChart.axisTimeCombinations.HOUR_DAY)
 */
export function line(): LineChartModule;
