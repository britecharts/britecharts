import { ChartBaseAPIMinimal, InteractiveChartAPI, AnimatedChartAPI, TimeSeriesChartAPI } from '../common/base';
import { ChartModuleSelection } from '../common/selection';
import { BaseType, Selection } from 'd3-selection';
import { ColorGradientType } from '../helpers/colors';

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

export interface BrushChartAPI
    extends ChartBaseAPIMinimal<BrushChartModule>,
        AnimatedChartAPI<BrushChartAPI>,
        TimeSeriesChartAPI<BrushChartAPI>,
        InteractiveChartAPI<BrushChartAPI> {
    /** Gets or Sets the area curve of the stacked area. */
    areaCurve(curveType?: string): BrushChartModule;
    /** Gets or Sets the isLocked property of the brush, enforcing the initial brush size set with dateRange */
    isLocked(isLocked?: boolean): BrushChartModule;
    /** Gets or Sets the dateRange for the selected part of the brush */
    dateRange(dateRange?: [string, string]): BrushChartModule;
    /** Gets or Sets the gradient of the chart */
    gradient(gradient?: ColorGradientType): BrushChartModule;
    /** Gets or Sets the rounding time interval of the selection boundary */
    roundingTimeInterval(roundingTimeInterval?: string): BrushChartKeys;
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
