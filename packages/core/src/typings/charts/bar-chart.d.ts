import {
    ChartBaseAPI,
    InteractiveChartAPI,
    ExportableChartAPI,
    ThemableChartAPI,
    AnimatedChartAPI,
} from '../common/base';
import { LocalObject } from '../common/local';
import { ChartModuleSelection } from '../common/selection';
import { BaseType, Selection } from 'd3-selection';

export enum BarChartKeys {
    Value = 'value',
    Name = 'name',
}

export type BarChartDataShape = {
    [BarChartKeys.Value]: number;
    [BarChartKeys.Name]: string;
};

export type BarSelection = Selection<
    BaseType,
    BarChartDataShape,
    HTMLElement,
    any
>;

// The twenty-two accessors below were setter-only -- a single
// optional-parameter signature returning the chart -- so reading one reported
// the chart rather than its value. Each is a getter/setter overload pair now,
// getter first and setter last, with the getter typed from the
// implementation's own default.
//
// `orderingFunction` was also declared wrong, not just incomplete: see its own
// note below.
//
// Four getters are wider than their setter, and each for its own reason rather
// than one rule: `chartGradient`, `xAxisLabel`, `yAxisLabel` and `valueLocale`
// are all `null` in the module's `let` block, where the grouped and stacked
// bars left their axis labels uninitialised. `orderingFunction` has no
// initialiser at all, so it reads `undefined`.
export interface BarChartAPI
    extends ChartBaseAPI<BarChartModule>,
        ExportableChartAPI,
        InteractiveChartAPI<BarChartModule>,
        AnimatedChartAPI<BarChartModule>,
        ThemableChartAPI<BarChartModule> {
    /** Gets or Sets the padding of the chart (Default is 0.1) */
    betweenBarsPadding(): number;
    betweenBarsPadding(padding: number): BarChartModule;
    /**
     * Gets or Sets the gradient colors of a bar in the chart
     *
     * The getter is `null` until one is set: the chart fills from its colour
     * schema until a gradient arrives.
     */
    chartGradient(): [string, string] | null;
    chartGradient(gradient: [string, string]): BarChartModule;
    /** If true, adds labels at the end of the bars */
    enableLabels(): boolean;
    enableLabels(shouldEnable: boolean): BarChartModule;
    /**
     * Gets or Sets the hasPercentage status
     *
     * The getter is computed rather than stored: it reports whether
     * `numberFormat` is currently the percentage one.
     */
    hasPercentage(): boolean;
    hasPercentage(hasPercentage: boolean): BarChartModule;
    /**
     * Gets or Sets the hasSingleBarHighlight status.
     * If the value is true (default), only the hovered bar is considered to
     * be highlighted and will be darkened by default. If the value is false,
     * all the bars but the hovered bar are considered to be highlighted
     * and will be darkened (by default).
     */
    hasSingleBarHighlight(): boolean;
    hasSingleBarHighlight(hasHighlight: boolean): BarChartModule;
    /**
     * Gets or Sets the highlightBarFunction function. The callback passed to
     * this function returns a bar selection from the bar chart. Use this function
     * if you want to apply a custom behavior to the highlighted bar on hover.
     * When hasSingleBarHighlight is true the highlighted bar will be the
     * one that was hovered by the user. When hasSingleBarHighlight is false
     * the highlighted bars are all the bars but the hovered one. The default
     * highlight effect on a bar is darkening the highlighted bar(s) color.
     *
     * The getter is nullable because `null` goes in to disable the effect, as
     * the chart's own example shows. It does not stay null: the first hover
     * replaces it with a no-op, so reading it back after one reports that
     * function rather than the `null` that was set.
     */
    highlightBarFunction(): ((bar: BarSelection) => void) | null;
    highlightBarFunction(
        highlightFunc: ((bar: BarSelection) => void) | null
    ): BarChartModule;
    /** Gets or Sets the horizontal direction of the chart */
    isHorizontal(): boolean;
    isHorizontal(isHorizontal: boolean): BarChartModule;
    /** Offset between end of bar and start of the percentage bars */
    labelsMargin(): number;
    labelsMargin(margin: number): BarChartModule;
    /** Gets or Sets the labels number format */
    labelsNumberFormat(): string;
    labelsNumberFormat(format: string): BarChartModule;
    /** Get or Sets the labels text size */
    labelsSize(): number;
    labelsSize(size: number): BarChartModule;
    /**
     * Changes the order of items given the custom function
     *
     * The comparator returns a **number**, where this was declared `=> void`.
     * The chart hands it straight to `Array.prototype.sort`, which reads the
     * sign of the result, so a callback returning nothing leaves the bars in
     * their original order. Same defect, and same fix, as the donut's
     * `orderingFunction`.
     *
     * The getter is `undefined` until one is set: the chart has no default
     * ordering and only sorts once a comparator arrives.
     */
    orderingFunction():
        | ((a: BarChartDataShape, b: BarChartDataShape) => number)
        | undefined;
    orderingFunction(
        orderingFunc: (a: BarChartDataShape, b: BarChartDataShape) => number
    ): BarChartModule;
    /** Configurable extension of the x axis. If your max point was 50% you might want to show x axis to 60%, pass 1.2 */
    percentageAxisToMaxRatio(): number;
    percentageAxisToMaxRatio(ratio: number): BarChartModule;
    /** Gets or Sets whether the color list should be reversed or not */
    shouldReverseColorList(): boolean;
    shouldReverseColorList(shouldReverse: boolean): BarChartModule;
    /** Gets or Sets the valueLabel of the chart */
    valueLabel(): string;
    valueLabel(valueLabel: string): BarChartModule;
    /**
     * Gets or Sets the locale which our formatting functions use.
     * Check [the d3-format docs]{@link https://github.com/d3/d3-format#formatLocale} for the required values.
     *
     * The getter is `null` until one is set: the chart formats with d3-format's
     * own default locale until then.
     */
    valueLocale(): LocalObject | null;
    valueLocale(localObject: LocalObject | null): BarChartModule;
    /**
     * Gets or Sets the text of the xAxisLabel on the chart
     *
     * The getter is `null` until one is set: the chart appends no label element
     * until then.
     */
    xAxisLabel(): string | null;
    xAxisLabel(xAxisLabel: string): BarChartModule;
    /** Gets or Sets the offset of the xAxisLabel on the chart */
    xAxisLabelOffset(): number;
    xAxisLabelOffset(offset: number): BarChartModule;
    /** Gets or Sets the number of ticks of the x axis on the chart */
    xTicks(): number;
    xTicks(ticks: number): BarChartModule;
    /**
     * Gets or Sets the text of the yAxisLabel on the chart
     *
     * The getter is `null` until one is set, as `xAxisLabel`'s is.
     */
    yAxisLabel(): string | null;
    yAxisLabel(yAxisLabel: string): BarChartModule;
    /** Gets or Sets the offset of the yAxisLabel on the chart */
    yAxisLabelOffset(): number;
    yAxisLabelOffset(yAxisLabelOffset: number): BarChartModule;
    /** Space between y axis and chart */
    yAxisPaddingBetweenChart(): number;
    yAxisPaddingBetweenChart(yAxisPadding: number): BarChartModule;
    /** Gets or Sets the number of vertical ticks on the chart */
    yTicks(): number;
    yTicks(ticks: number): BarChartModule;
    /** Gets or Sets the `name` key of the data */
    nameLabel(): string;
    nameLabel(value: string): BarChartModule;
}

export type BarChartModule = ChartModuleSelection<BarChartDataShape[]> &
    BarChartAPI;

/**
 * import {bar} from 'britecharts;
 * bar().width(100).height(100)
 */
export function bar(): BarChartModule;
