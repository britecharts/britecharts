import {
    ChartBaseAPI,
    InteractiveChartAPI,
    ExportableChartAPI,
    ThemableChartAPI,
    AnimatedChartAPI,
} from '../common/base';
import { GridTypes } from '../common/grid';
import { ChartModuleSelection } from '../common/selection';
import { LocalObject } from '../common/local';
import { BaseType, Selection } from 'd3-selection';

export enum StackedBarChartKeys {
    Stack = 'stack',
    Name = 'name',
    Value = 'value',
}

export type StackedBarChartDataShape = {
    [StackedBarChartKeys.Value]: number;
    [StackedBarChartKeys.Name]: string;
    [StackedBarChartKeys.Stack]: string;
};

export type StackedBarSelection = Selection<
    BaseType,
    StackedBarChartDataShape,
    HTMLElement,
    any
>;

// The twelve accessors below were setter-only -- a single
// optional-parameter signature returning the chart -- so reading one reported
// the chart rather than its value. Each is a getter/setter overload pair now,
// getter first and setter last, with the getter typed from the
// implementation's own default. This is the same correction grouped-bar's
// declarations needed, on a chart whose API is its near-twin.
//
// `hasPercentage` is the one that is not a stored value at all: its getter
// computes `numberFormat === PERCENTAGE_FORMAT`, which is a boolean either way.
export interface StackedBarChartAPI
    extends ChartBaseAPI<StackedBarChartModule>,
        InteractiveChartAPI<StackedBarChartModule>,
        ExportableChartAPI,
        AnimatedChartAPI<StackedBarChartModule>,
        ThemableChartAPI<StackedBarChartModule> {
    /** Gets or Sets the padding of the stacked bar chart */
    betweenBarsPadding(): number;
    betweenBarsPadding(padding: number): StackedBarChartModule;
    /**
     * Gets or Sets the grid mode
     *
     * The getter is `null` until one is set: the chart draws no configurable
     * grid by default. The setter takes `null` for the same reason it does on
     * the grouped bar -- the assignment goes straight through, so putting the
     * default back is how a grid is turned off again. Only the JSDoc differs
     * between the two charts, and that is a documentation gap rather than a
     * difference in what either one does.
     */
    grid(): GridTypes | null;
    grid(gridMode: GridTypes | null): StackedBarChartModule;
    /**
     * Gets or Sets the hasPercentage status
     *
     * The getter is computed rather than stored: it reports whether
     * `numberFormat` is currently the percentage one.
     */
    hasPercentage(): boolean;
    hasPercentage(hasPercentage: boolean): StackedBarChartModule;
    /** Gets or Sets the hasReversedStacks property of the chart, reversing the order of stacks. */
    hasReversedStacks(): boolean;
    hasReversedStacks(hasReversedStacks: boolean): StackedBarChartModule;
    /** Gets or Sets the horizontal direction of the chart */
    isHorizontal(): boolean;
    isHorizontal(isHorizontal: boolean): StackedBarChartModule;
    /**
     * Configurable extension of the x axis
     * If your max point was 50% you might want to show x axis to 60%, pass 1.2
     */
    percentageAxisToMaxRatio(): number;
    percentageAxisToMaxRatio(ratio: number): StackedBarChartModule;
    /** Gets or Sets the minimum width of the graph in order to show the tooltip */
    tooltipThreshold(): number;
    tooltipThreshold(threshold: number): StackedBarChartModule;
    /**
     * Gets or Sets the locale which our formatting functions use.
     * Check [the d3-format docs]{@link https://github.com/d3/d3-format#formatLocale} for the required values.
     *
     * The getter is `null` until one is set: the chart formats with d3-format's
     * own default locale until then.
     */
    valueLocale(): LocalObject | null;
    valueLocale(localObject: LocalObject | null): StackedBarChartModule;
    /** Gets or Sets the number of ticks of the x axis on the chart */
    xTicks(): number;
    xTicks(ticks: number): StackedBarChartModule;
    /**
     * Gets or Sets the y-axis label of the chart
     *
     * The getter is `undefined` until one is set: the chart has no default
     * label and only appends the text element once one arrives.
     */
    yAxisLabel(): string | undefined;
    yAxisLabel(yAxisLabel: string): StackedBarChartModule;
    /**
     * Gets or Sets the offset of the yAxisLabel of the chart.
     * The method accepts both positive and negative values.
     */
    yAxisLabelOffset(): number;
    yAxisLabelOffset(yAxisLabelOffset: number): StackedBarChartModule;
    /** Gets or Sets the number of vertical ticks of the axis on the chart */
    yTicks(): number;
    yTicks(ticks: number): StackedBarChartModule;
    /** Gets or Sets the `name` key of the data */
    nameLabel(): string;
    nameLabel(value: string): StackedBarChartModule;
    /** Gets or Sets the `stack` key of the data */
    stackLabel(): string;
    stackLabel(value: string): StackedBarChartModule;
    /** Gets or Sets the `value` key of the data */
    valueLabel(): string;
    valueLabel(value: string): StackedBarChartModule;
}

export type StackedBarChartModule = ChartModuleSelection<
    StackedBarChartDataShape[]
> &
    StackedBarChartAPI;

/**
 * import {stackedBar} from 'britecharts;
 * stackedBar().width(100).height(100)
 */
export function stackedBar(): StackedBarChartModule;
