import { ChartBaseAPIMinimal, InteractiveChartAPI } from '@common/base';
import { ChartModuleSelection } from '@common/selection';
import { BaseType, Selection } from 'd3-selection';
import { AxisTimeCombination } from '@helpers/constants';
import { ColorGradientType } from '@helpers/colors';


export enum BrushChartKeys {
  Value = 'value',
  Date = 'date',
}

export type BrushChartDataShape = {
  [BrushChartKeys.Value]: number;
  [BrushChartKeys.Date]: string;
};

export type BrushSelection = Selection<
  BaseType,
  BrushChartDataShape,
  HTMLElement,
  any
>;

export interface BrushChartAPI extends ChartBaseAPIMinimal<BrushChartModule>, InteractiveChartAPI<BrushChartAPI> {
  /**
   * Exposes the constants to be used to force the x axis to respect a certain granularity
   * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
   */
  axisTimeCombinations: {
    [key in keyof typeof AxisTimeCombination]: AxisTimeCombination | string;
  };
  /** Gets or Sets the dateRange for the selected part of the brush */
  dateRange(dateRange?: [string, string]): BrushChartModule;
  /** Gets or Sets the gradient of the chart */
  gradient(gradient?: ColorGradientType): BrushChartModule;
  /** Gets or Sets the rounding time interval of the selection boundary */
  roundingTimeInterval(roundingTimeInterval?: string): BrushChartKeys;
  /**
   * Exposes the ability to force the chart to show a certain x format
   * It requires a `xAxisFormat` of 'custom' in order to work.
   */
  xAxisCustomFormat(format?: string): BrushChartModule;
  /** Exposes the ability to force the chart to show a certain x axis grouping */
  xAxisFormat(format?: string): BrushChartModule;
  /**
   * Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisCustomFormat` of 'custom' in order to work.
   * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
   * how many and where the ticks will appear.
   */
  xTicks(ticks?: number): BrushChartModule;
}

export type BrushChartModule = ChartModuleSelection<BrushChartDataShape[]> &
  BrushChartAPI;

/**
 * import {brush} from 'britecharts;
 * brush().width(100).height(100)
 */
export function brush(): BrushChartModule;
