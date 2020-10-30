import { ChartDimensionsAPI, ChartAnimationAPI, ExportableChartAPI } from '@common/base';
import { ChartModuleSelection } from '@common/selection';
import { BaseType, Selection } from 'd3-selection';

export enum SparklineChartKeys {
  Value = 'value',
  Date = 'date',
}

export type SparklineChartDataShape = {
  [SparklineChartKeys.Value]: number;
  [SparklineChartKeys.Date]: string;
};

export type SparklineSelection = Selection<
  BaseType,
  SparklineChartDataShape,
  HTMLElement,
  any
>;

export interface SparkelineTitleTextStyle {
  'font-family'?: string;
  'font-size'?: string,
  'font-weight'?: number,
  'font-style'?: string,
  'fill'?: string,
}

export interface SparklineChartAPI extends
    ChartDimensionsAPI<SparklineChartModule>,
    ChartAnimationAPI<SparklineChartModule>,
    ExportableChartAPI<SparklineChartModule>  {
  /** Gets or Sets the areaGradient of the chart */
  areaGradient(gradient?: [string, string]): SparklineChartModule;
  /** Gets or Sets the lineGradient of the chart */
  lineGradient(gradient?: [string, string]): SparklineChartModule;
  /** Gets or Sets the loading state of the chart */
  loadingState(markup?: string): SparklineChartModule;
  /**
   * Gets or Sets the text of the title at the top of sparkline.
   * To style the title, use the titleTextStyle method below.
   */
  titleText(title?: string): SparklineChartModule;
  /**
   * Gets or Sets the text style object of the title at the top of sparkline.
   * Using this method, you can set font-family, font-size, font-weight, font-style,
   * and color (fill).
   */
  titleTextStyle(titleStyle?: SparkelineTitleTextStyle): SparklineChartModule;
}

export type SparklineChartModule = ChartModuleSelection<SparklineChartDataShape[]> &
  SparklineChartAPI;

/**
 * import {sparkline} from 'britecharts;
 * sparkline().width(100).height(100)
 */
export function sparkline(): SparklineChartModule;
