import {
    ChartBaseAPI,
    InteractiveChartAPI,
    ExportableChartAPI,
    AnimatedChartAPI,
    ThemableChartAPI,
} from '../common/base';
import { ChartModuleSelection } from '../common/selection';
import { Offset } from '../common/position';
import { LocalObject } from '../common/local';
import { GridTypes } from '../common/grid';
import { BaseType, Selection } from 'd3-selection';

export enum GroupedBarChartKeys {
    Group = 'group',
    Name = 'name',
    Value = 'value',
}

export type GroupedBarChartDataShape = {
    [GroupedBarChartKeys.Value]: number;
    [GroupedBarChartKeys.Name]: string;
    [GroupedBarChartKeys.Group]: string;
};

export type GroupedBarSelection = Selection<
    BaseType,
    GroupedBarChartDataShape,
    HTMLElement,
    any
>;

// The eleven accessors below were setter-only -- a single
// optional-parameter signature returning the chart -- so reading one reported
// the chart rather than its value. Each is a getter/setter overload pair now,
// with the getter typed from the implementation's own default.
//
// Three of those getters are wider than their setter, and for the same reason
// in each case: the chart has no usable default, so reading before setting
// really does give the empty value. `grid` and `valueLocale` are declared
// `null` in the module's own `let` block, and `yAxisLabel` is declared with no
// initialiser at all.
export interface GroupedBarChartAPI
    extends ChartBaseAPI<GroupedBarChartModule>,
        InteractiveChartAPI<GroupedBarChartModule>,
        ExportableChartAPI,
        AnimatedChartAPI<GroupedBarChartModule>,
        ThemableChartAPI<GroupedBarChartModule> {
    /** Gets or Sets the padding between bars. */
    betweenBarsPadding(): number;
    betweenBarsPadding(padding: number): GroupedBarChartModule;
    /** Gets or Sets the padding between groups of bars. */
    betweenGroupsPadding(): number;
    betweenGroupsPadding(padding: number): GroupedBarChartModule;
    /**
     * Gets or Sets the grid mode.
     *
     * The getter is `null` until one is set: the chart draws no configurable
     * grid by default. The setter takes `null` for the same reason -- the
     * chart's own JSDoc documents `null` as the default, and assigning it back
     * is how a grid is turned off again.
     */
    grid(): GridTypes | null;
    grid(gridMode: GridTypes | null): GroupedBarChartModule;
    /** Gets or Sets the horizontal direction of the chart */
    isHorizontal(): boolean;
    isHorizontal(isHorizontal: boolean): GroupedBarChartModule;
    /** Gets or Sets the minimum width of the graph in order to show the tooltip */
    tooltipThreshold(): number;
    tooltipThreshold(threshold: number): GroupedBarChartModule;
    /**
     * Gets or Sets the locale which our formatting functions use.
     * Check [the d3-format docs]{@link https://github.com/d3/d3-format#formatLocale} for the required values.
     *
     * The getter is `null` until one is set: the chart formats with d3-format's
     * own default locale until then.
     */
    valueLocale(): LocalObject | null;
    valueLocale(localObject: LocalObject | null): GroupedBarChartModule;
    /** Gets or Sets the number of ticks of the x axis on the chart */
    xTicks(): number;
    xTicks(ticks: number): GroupedBarChartModule;
    /**
     * Gets or Sets the y-axis label of the chart
     *
     * The getter is `undefined` until one is set: the chart has no default
     * label and only appends the text element once one arrives.
     */
    yAxisLabel(): string | undefined;
    yAxisLabel(yAxisLabel: string): GroupedBarChartModule;
    /**
     * Gets or Sets the offset of the yAxisLabel of the chart.
     * The method accepts both positive and negative values.
     */
    yAxisLabelOffset(): number;
    yAxisLabelOffset(yAxisLabelOffset: number): GroupedBarChartModule;
    /** Gets or Sets the number of ticks of the y axis on the chart */
    yTicks(): number;
    yTicks(ticks: number): GroupedBarChartModule;
    /** Gets or Sets the x and y offset of ticks of the y axis on the chart */
    yTickTextOffset(): Offset;
    yTickTextOffset(yTickTextOffset: Offset): GroupedBarChartModule;
    /** Gets or Sets the `group` key of the data */
    groupLabel(): string;
    groupLabel(value: string): GroupedBarChartModule;
    /** Gets or Sets the `name` key of the data */
    nameLabel(): string;
    nameLabel(value: string): GroupedBarChartModule;
    /** Gets or Sets the `value` key of the data */
    valueLabel(): string;
    valueLabel(value: string): GroupedBarChartModule;
}

export type GroupedBarChartModule = ChartModuleSelection<
    GroupedBarChartDataShape[]
> &
    GroupedBarChartAPI;

/**
 * import {groupedBar} from 'britecharts;
 * groupedBar().width(100).height(100)
 */
export function groupedBar(): GroupedBarChartModule;
