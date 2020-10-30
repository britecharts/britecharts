import { BaseAPI, ExportableChartAPI } from '@common/base';
import { ChartModuleSelection } from '@common/selection';

export enum HeatmapChartKeys {
  Day = 'day',
  Hour = 'hour',
  Value = 'value',
}

export type HeatmapChartDataShape = {
  [HeatmapChartKeys.Day]: number;
  [HeatmapChartKeys.Hour]: number;
  [HeatmapChartKeys.Value]: number;
};

export interface HeatmapChartAPI extends BaseAPI<HeatmapChartModule>, ExportableChartAPI<HeatmapChartModule>  {
  /** Gets or Sets the y-axis labels of the chart */
  yAxisLabels(labels?: string[]): HeatmapChartModule;
  /** Gets or Sets the boxSize of the chart */
  boxSize(size?: number): HeatmapChartModule;
}

export type HeatmapChartModule = ChartModuleSelection<HeatmapChartDataShape[]> &
  HeatmapChartAPI;

/**
 * import {heatmap} from 'britecharts;
 * heatmap().width(100).height(100)
 */
export function heatmap(): HeatmapChartModule;
