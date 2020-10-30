import { ChartBaseAPI, InteractiveChartAPI, ExportableChartAPI } from '@common/base';
import { GridTypes } from '@common/grid';
import { ChartModuleSelection } from '@common/selection';

export enum ScatterPlotKeys {
  Name = 'name',
  X = 'x',
  Y = 'y',
}

export type ScatterPlotDataShape = {
  [ScatterPlotKeys.Name]: string;
  [ScatterPlotKeys.X]: number;
  [ScatterPlotKeys.Y]: number;
};

export type ScatterPlotBaseAPI = Omit<
  ChartBaseAPI<ScatterPlotModule>,
  'locale' | 'loadingState'
>;

export interface ScatterPlotAPI extends ScatterPlotBaseAPI, InteractiveChartAPI<ScatterPlotModule>, ExportableChartAPI<ScatterPlotModule> {
  /** Gets or Sets the aspect ratio of the chart */
  aspectRatio(ratio?: number): ScatterPlotModule;
  /**
   * Gets or Sets each circle's border opacity value of the chart.
   * It makes each circle border transparent if it's less than 1.
   */
  circleStrokeOpacity(opacity?: number): ScatterPlotModule;
  /**
   * Gets or Sets each circle's border width value of the chart.
   * It makes each circle border transparent if it's less than 1.
   */
  circleStrokeWidth(width?: number): ScatterPlotModule;
  /**
   * Gets or Sets the circles opacity value of the chart.
   * Use this to set opacity of a circle for each data point of the chart.
   * It makes the area of each data point more transparent if it's less than 1.
   */
  circleOpacity(opacity?: number): ScatterPlotModule;
  /** Gets or Sets the grid mode. */
  grid(opacity?: GridTypes): ScatterPlotModule;
  /**
   * Gets or Sets the hasCrossHairs status. If true,
   * the hovered data point will be highlighted with lines
   * and legend from both x and y axis. The user will see
   * values for x under x axis line and y under y axis. Lines
   * will be drawn with respect to highlighted data point
   */
  hasCrossHairs(hasCrossHairs?: boolean): ScatterPlotModule;
  /** Gets or Sets the hasHollowCircles value of the chart area */
  hasHollowCircles(hasHollowCircles?: boolean): ScatterPlotModule;
  /**
   * Gets or Sets the hasTrendline value of the chart area
   * If true, the trendline calculated based off linear regression
   * formula will be drawn
   */
  hasTrendline(hasTrendline?: boolean): ScatterPlotModule;
  /**
   * Sets a custom distance between legend
   * values with respect to both axises. The legends
   * show up when hasCrossHairs is true.
   */
  highlightTextLegendOffset(offset?: number): ScatterPlotModule;
  /** Gets or Sets the maximum value of the chart area */
  maxCircleArea(area?: number): ScatterPlotModule;
  /** Exposes ability to set the format of x-axis values */
  xAxisFormat(format?: string): ScatterPlotModule;
  /**
   * Gets or Sets the xAxisLabel of the chart. Adds a
   * label bellow x-axis for better clarify of data representation.
   */
  xAxisLabel(label?: string): ScatterPlotModule;
  /**
   * Gets or Sets the offset of the xAxisLabel of the chart.
   * The method accepts both positive and negative values.
   */
  xAxisLabelOffset(offset?: number): ScatterPlotModule;
  /** Gets or Sets the xTicks of the chart */
  xTicks(ticks?: number): ScatterPlotModule;
  /** Exposes ability to set the format of y-axis values */
  yAxisFormat(format?: string): ScatterPlotModule;
  /** Gets or Sets the y-axis label of the chart */
  yAxisLabel(label?: string): ScatterPlotModule;
  /**
   * Gets or Sets the offset of the yAxisLabel of the chart.
   * The method accepts both positive and negative values.
   */
  yAxisLabelOffset(offset?: string): ScatterPlotModule;
  /** Gets or Sets the xTicks of the chart */
  yTicks(ticks?: number): ScatterPlotModule;
}

export type ScatterPlotModule = ChartModuleSelection<ScatterPlotDataShape[]> &
  ScatterPlotAPI;

/**
 * import {scatter} from 'britecharts;
 * scatter().width(100).height(100)
 */
export function scatterPlot(): ScatterPlotModule;
