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

export interface GroupedBarChartAPI
    extends ChartBaseAPI<GroupedBarChartModule>,
        InteractiveChartAPI<GroupedBarChartModule>,
        ExportableChartAPI<GroupedBarChartModule>,
        AnimatedChartAPI<GroupedBarChartModule>,
        ThemableChartAPI<GroupedBarChartModule> {
    /** Gets or Sets the padding between bars. */
    betweenBarsPadding(padding?: number): GroupedBarChartModule;
    /** Gets or Sets the padding between groups of bars. */
    betweenGroupsPadding(padding?: number): GroupedBarChartModule;
    /** Gets or Sets the grid mode. */
    grid(gridMode?: GridTypes): GroupedBarChartModule;
    /** Gets or Sets the horizontal direction of the chart */
    isHorizontal(isHorizontal?: boolean): GroupedBarChartModule;
    /** Gets or Sets the minimum width of the graph in order to show the tooltip */
    tooltipThreshold(threshold?: number): GroupedBarChartModule;
    /**
     * Gets or Sets the locale which our formatting functions use.
     * Check [the d3-format docs]{@link https://github.com/d3/d3-format#formatLocale} for the required values.
     */
    valueLocale(localObject?: LocalObject | null): GroupedBarChartModule;
    /** Gets or Sets the number of ticks of the x axis on the chart */
    xTicks(ticks?: number): GroupedBarChartModule;
    /** Gets or Sets the y-axis label of the chart */
    yAxisLabel(yAxisLabel?: string): GroupedBarChartModule;
    /**
     * Gets or Sets the offset of the yAxisLabel of the chart.
     * The method accepts both positive and negative values.
     */
    yAxisLabelOffset(yAxisLabelOffset?: number): GroupedBarChartModule;
    /** Gets or Sets the number of ticks of the y axis on the chart */
    yTicks(ticks?: number): GroupedBarChartModule;
    /** Gets or Sets the x and y offset of ticks of the y axis on the chart */
    yTickTextOffset(yTickTextOffset?: Offset): GroupedBarChartModule;
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
