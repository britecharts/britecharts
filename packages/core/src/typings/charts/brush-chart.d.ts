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

// The three generics below named `BrushChartAPI`, where every other chart
// names its Module. That is not cosmetic: these interfaces all return
// `T & XAPI<T>`, so `brush().isAnimated(true)` reported
// `BrushChartAPI & AnimatedChartAPI<BrushChartAPI>` -- a type with no
// `ChartModuleSelection` in it, so the result could not be passed to
// `selection.call()` and chaining off it lost the rest of the chart. The
// sibling `ChartBaseAPIMinimal<BrushChartModule>` on the same line had it
// right all along.
export interface BrushChartAPI
    extends ChartBaseAPIMinimal<BrushChartModule>,
        AnimatedChartAPI<BrushChartModule>,
        TimeSeriesChartAPI<BrushChartModule>,
        InteractiveChartAPI<BrushChartModule> {
    /** Gets or Sets the area curve of the stacked area. */
    areaCurve(): string;
    areaCurve(curveType: string): BrushChartModule;
    /** Gets or Sets the isLocked property of the brush, enforcing the initial brush size set with dateRange */
    isLocked(): boolean;
    isLocked(isLocked: boolean): BrushChartModule;
    /**
     * Gets or Sets the dateRange for the selected part of the brush.
     *
     * The getter's members are nullable: the default is `[null, null]`, and
     * the chart only draws a selection once both ends are set.
     */
    dateRange(): [string | null, string | null];
    dateRange(dateRange: [string, string]): BrushChartModule;
    /** Gets or Sets the gradient of the chart */
    gradient(): ColorGradientType;
    gradient(gradient: ColorGradientType): BrushChartModule;
    /**
     * Gets or Sets the rounding time interval of the selection boundary.
     *
     * The setter returns the module, as every other accessor does. It was
     * declared as returning `BrushChartKeys` -- the `'value' | 'date'` data-key
     * enum, which this accessor has nothing to do with: it holds a d3 time
     * interval name such as `'timeDay'`, and setting it returns `this`.
     */
    roundingTimeInterval(): string;
    roundingTimeInterval(roundingTimeInterval: string): BrushChartModule;
    /**
     * Exposes the ability to force the chart to show a certain x ticks. It requires a `xAxisCustomFormat` of 'custom' in order to work.
     * NOTE: This value needs to be a multiple of 2, 5 or 10. They won't always work as expected, as D3 decides at the end
     * how many and where the ticks will appear.
     *
     * The getter is nullable: the default is `null`, which leaves the tick
     * count to d3.
     */
    xTicks(): number | null;
    xTicks(ticks: number): BrushChartModule;
}

export type BrushChartModule = ChartModuleSelection<BrushChartDataShape[]> &
    BrushChartAPI;

/**
 * import {brush} from 'britecharts;
 * brush().width(100).height(100)
 */
export function brush(): BrushChartModule;
