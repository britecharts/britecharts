import { ChartBaseAPI, ExportableChartAPI } from '../common/base';
import { ChartModuleSelection } from '../common/selection';
import { ColorsSchemasType } from '../helpers/colors';

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

// The `Omit` this used to carry removed `'locale' | 'isAnimated' |
// 'loadingState'`, and `ChartBaseAPI` declares none of those three -- the real
// member is `isLoading`, which the chart has and keeps. So it removed nothing
// and read as though it did. Spelled plainly instead.
export type BulletChartBaseAPI = ChartBaseAPI<BulletChartModule>;

export interface BulletChartAPI extends BulletChartBaseAPI, ExportableChartAPI {
  /** Gets or Sets the colorSchema of the chart */
  colorSchema(): ColorsSchemasType;
  colorSchema(schema: ColorsSchemasType): BulletChartModule;
  /**
   * Gets or Sets the subtitle for measure identifier range.
   *
   * A string, not the `number` this declared: the chart assigns it to
   * `subtitle` and renders it as text, its own example is
   * `bulletChart.customSubtitle('GHz')`, and it has no default -- so reading it
   * before setting it gives undefined.
   */
  customSubtitle(): string | undefined;
  customSubtitle(subtitle: string): BulletChartModule;
  /** Gets or Sets the title for measure identifier. A string, as above. */
  customTitle(): string | undefined;
  customTitle(title: string): BulletChartModule;
  /**
   * Gets or Sets the isReverse status of the chart. If true,
   * the elements will be rendered in reverse order.
   */
  isReverse(): boolean;
  isReverse(isReverse: boolean): BulletChartModule;
  /** Space between axis and chart */
  paddingBetweenAxisAndChart(): number;
  paddingBetweenAxisAndChart(padding: number): BulletChartModule;
  /** Gets or Sets the starting point of the capacity range. */
  startMaxRangeOpacity(): number;
  startMaxRangeOpacity(opacity: number): BulletChartModule;
  /** Gets or Sets the number of ticks of the x axis on the chart */
  ticks(): number;
  ticks(ticks: number): BulletChartModule;
}

export type BulletChartModule = ChartModuleSelection<BulletChartDataShape> &
  BulletChartAPI;

/**
 * import {bullet} from 'britecharts;
 * bullet().width(100).height(100)
 */
export function bullet(): BulletChartModule;
