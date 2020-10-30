import { ChartBaseAPI, ExportableChartAPI } from '@common/base';
import { ChartModuleSelection } from '@common/selection';

export enum BulletChartKeys {
  Ranges = 'ranges',
  Measures = 'measures',
  Markers = 'markers',
}

export type BulletChartDataShape = {
  [BulletChartKeys.Ranges]: [number?, number?, number?];
  [BulletChartKeys.Measures]: [number?, number?, number?];
  [BulletChartKeys.Markers]: [number?];
};

export type BulletChartBaseAPI = Omit<
  ChartBaseAPI<BulletChartModule>,
  'locale' | 'isAnimated' | 'loadingState'
>;

export interface BulletChartAPI extends BulletChartBaseAPI, ExportableChartAPI<BulletChartModule> {
  /** Gets or Sets the aspect ratio of the chart */
  aspectRatio(ratio?: number): BulletChartModule;
  /** Gets or Sets the subtitle for measure identifier range. */
  customSubtitle(subtitle?: number): BulletChartModule;
  /** Gets or Sets the title for measure identifier */
  customTitle(title?: number): BulletChartModule;
  /**
   * Gets or Sets the isReverse status of the chart. If true,
   * the elements will be rendered in reverse order.
   */
  isReverse(isReverse?: boolean): BulletChartModule;
  /** Space between axis and chart */
  paddingBetweenAxisAndChart(padding?: number): BulletChartModule;
  /** Gets or Sets the starting point of the capacity range. */
  startMaxRangeOpacity(opacity?: number): BulletChartModule;
  /** Gets or Sets the number of ticks of the x axis on the chart */
  ticks(ticks?: number): BulletChartModule;
}

export type BulletChartModule = ChartModuleSelection<BulletChartDataShape> &
  BulletChartAPI;

/**
 * import {bullet} from 'britecharts;
 * bullet().width(100).height(100)
 */
export function bullet(): BulletChartModule;
