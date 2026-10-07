import {
    ChartBaseAPI,
    InteractiveChartAPI,
    ExportableChartAPI,
    ThemableChartAPI,
    AnimatedChartAPI,
} from '../common/base';
import { GridTypes } from '../common/grid';
import { LocalObject } from '../common/local';
import { ChartModuleSelection } from '../common/selection';

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

// `numberFormat` is omitted because this chart does not have it and should not:
// its own idiom is a format per axis, `xAxisFormat` and `yAxisFormat`, both of
// which it exposes. A chart-wide `numberFormat` would be a second way to say the
// same thing.
//
// The two keys this omitted before, `'locale' | 'loadingState'`, are not members
// of `ChartBaseAPI` at all -- the loading accessor is `isLoading`, and `locale`
// lives on `TimeSeriesChartAPI`. So the `Omit` removed nothing while reading as
// though it removed two things.
export type ScatterPlotBaseAPI = Omit<
    ChartBaseAPI<ScatterPlotModule>,
    'numberFormat'
>;

// The twenty-one accessors below were setter-only -- a single
// optional-parameter signature returning the chart -- so reading one reported
// the chart rather than its value. Each is a getter/setter overload pair now,
// getter first and setter last, with the getter typed from the
// implementation's own default.
//
// Four getters are wider than their setter. `grid` and `valueLocale` are `null`
// in the module's own `let` block; `xAxisLabel` and `yAxisLabel` have no
// initialiser, so they read `undefined`. And `yTicks` is `null` by default,
// which is this chart's own idiom rather than an oversight -- it hands the
// value straight to d3's `axis.ticks`, where `null` means "use the scale's own
// tick count". Its setter takes a number only, following brush's `xTicks`,
// whose declaration settled that shape.
export interface ScatterPlotAPI
    extends ScatterPlotBaseAPI,
        InteractiveChartAPI<ScatterPlotModule>,
        ExportableChartAPI,
        AnimatedChartAPI<ScatterPlotModule>,
        ThemableChartAPI<ScatterPlotModule> {
    /**
     * Gets or Sets each circle's border opacity value of the chart.
     * It makes each circle border transparent if it's less than 1.
     */
    circleStrokeOpacity(): number;
    circleStrokeOpacity(opacity: number): ScatterPlotModule;
    /**
     * Gets or Sets each circle's border width value of the chart.
     * It makes each circle border transparent if it's less than 1.
     */
    circleStrokeWidth(): number;
    circleStrokeWidth(width: number): ScatterPlotModule;
    /**
     * Gets or Sets the circles opacity value of the chart.
     * Use this to set opacity of a circle for each data point of the chart.
     * It makes the area of each data point more transparent if it's less than 1.
     */
    circleOpacity(): number;
    circleOpacity(opacity: number): ScatterPlotModule;
    /**
     * Gets or Sets weather the chart support zoom controls. `false` by default.
     * If `true`, zoom event handling will be added to the chart.
     */
    enableZoom(): boolean;
    enableZoom(enable: boolean): ScatterPlotModule;
    /**
     * Gets or Sets the grid mode.
     *
     * The getter is `null` until one is set: the chart draws no configurable
     * grid by default, and assigning the default back is how one is turned off
     * again. The parameter was named `opacity`, which this accessor has never
     * had anything to do with.
     */
    grid(): GridTypes | null;
    grid(gridMode: GridTypes | null): ScatterPlotModule;
    /**
     * Gets or Sets the hasCrossHairs status. If true,
     * the hovered data point will be highlighted with lines
     * and legend from both x and y axis. The user will see
     * values for x under x axis line and y under y axis. Lines
     * will be drawn with respect to highlighted data point
     */
    hasCrossHairs(): boolean;
    hasCrossHairs(hasCrossHairs: boolean): ScatterPlotModule;
    /** Gets or Sets the hasHollowCircles value of the chart area */
    hasHollowCircles(): boolean;
    hasHollowCircles(hasHollowCircles: boolean): ScatterPlotModule;
    /**
     * Gets or Sets the hasTrendline value of the chart area
     * If true, the trendline calculated based off linear regression
     * formula will be drawn
     */
    hasTrendline(): boolean;
    hasTrendline(hasTrendline: boolean): ScatterPlotModule;
    /**
     * Sets a custom distance between legend
     * values with respect to both axises. The legends
     * show up when hasCrossHairs is true.
     */
    highlightTextLegendOffset(): number;
    highlightTextLegendOffset(offset: number): ScatterPlotModule;
    /** Gets or Sets the maximum value of the chart area */
    maxCircleArea(): number;
    maxCircleArea(area: number): ScatterPlotModule;
    /**
     * Gets or Sets the locale which our formatting functions use.
     * Check [the d3-format docs]{@link https://github.com/d3/d3-format#formatLocale} for the required values.
     */
    valueLocale(): LocalObject | null;
    valueLocale(localObject: LocalObject | null): ScatterPlotModule;
    /** Exposes ability to set the format of x-axis values */
    xAxisFormat(): string;
    xAxisFormat(format: string): ScatterPlotModule;
    /**
     * Exposes ability to set the formatter of x-axis values
     * The `timeFormat` formatter function is applied if a custom `xAxisFormatType`
     that is not equal to 'number' is provided
     */
    xAxisFormatType(): string;
    xAxisFormatType(formatType: string): ScatterPlotModule;
    /**
     * Gets or Sets the xAxisLabel of the chart. Adds a
     * label bellow x-axis for better clarify of data representation.
     *
     * The getter is `undefined` until one is set: the chart appends no label
     * element until then.
     */
    xAxisLabel(): string | undefined;
    xAxisLabel(label: string): ScatterPlotModule;
    /**
     * Gets or Sets the offset of the xAxisLabel of the chart.
     * The method accepts both positive and negative values.
     */
    xAxisLabelOffset(): number;
    xAxisLabelOffset(offset: number): ScatterPlotModule;
    /** Gets or Sets the xTicks of the chart */
    xTicks(): number;
    xTicks(ticks: number): ScatterPlotModule;
    /** Exposes ability to set the format of y-axis values */
    yAxisFormat(): string;
    yAxisFormat(format: string): ScatterPlotModule;
    /**
     * Gets or Sets the y-axis label of the chart
     *
     * The getter is `undefined` until one is set, as `xAxisLabel`'s is.
     */
    yAxisLabel(): string | undefined;
    yAxisLabel(label: string): ScatterPlotModule;
    /**
     * Gets or Sets the offset of the yAxisLabel of the chart.
     * The method accepts both positive and negative values.
     */
    yAxisLabelOffset(): number;
    yAxisLabelOffset(offset: number): ScatterPlotModule;
    /**
     * Gets or Sets the yTicks of the chart
     *
     * The getter is `null` by default, which the chart hands straight to d3's
     * `axis.ticks` to mean "use the scale's own tick count". The JSDoc called
     * this one xTicks.
     */
    yTicks(): number | null;
    yTicks(ticks: number): ScatterPlotModule;
}

export type ScatterPlotModule = ChartModuleSelection<ScatterPlotDataShape[]> &
    ScatterPlotAPI;

/**
 * import {scatter} from 'britecharts;
 * scatter().width(100).height(100)
 */
export function scatterPlot(): ScatterPlotModule;
