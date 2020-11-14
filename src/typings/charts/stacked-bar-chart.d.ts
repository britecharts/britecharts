import { LocalObject } from '../common/local';
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
import { StackedAreaChartModule } from 'britecharts';
import { StackedAreaChartModule } from './stacked-area';

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

export interface StackedBarChartAPI
    extends ChartBaseAPI<StackedBarChartModule>,
        InteractiveChartAPI<StackedBarChartModule>,
        ExportableChartAPI<StackedAreaChartModule>,
        AnimatedChartAPI<StackedAreaChartModule>,
        ThemableChartAPI<StackedAreaChartModule> {
    /** Gets or Sets the aspect ratio of the chart */
    aspectRatio(ratio?: number): StackedBarChartModule;
    /** Gets or Sets the padding of the stacked bar chart */
    betweenBarsPadding(padding?: number): StackedBarChartModule;
    /** Gets or Sets the grid mode */
    grid(gridMode?: GridTypes): StackedBarChartModule;
    /** Gets or Sets the hasPercentage status */
    hasPercentage(hasPercentage?: boolean): StackedBarChartModule;
    /** Gets or Sets the hasReversedStacks property of the chart, reversing the order of stacks. */
    hasReversedStacks(hasReversedStacks?: boolean): StackedBarChartModule;
    /** Gets or Sets the horizontal direction of the chart */
    isHorizontal(isHorizontal?: boolean): StackedBarChartModule;
    /** Pass language tag for the tooltip to localize the date */
    locale(localObject?: LocalObject | null): StackedBarChartModule;
    /**
     * Configurable extension of the x axis
     * If your max point was 50% you might want to show x axis to 60%, pass 1.2
     */
    percentageAxisToMaxRatio(ratio?: number): StackedBarChartModule;
    /** Gets or Sets the minimum width of the graph in order to show the tooltip */
    tooltipThreshold(threshold?: number): StackedBarChartModule;
    /**
     * Gets or Sets the locale which our formatting functions use.
     * Check [the d3-format docs]{@link https://github.com/d3/d3-format#formatLocale} for the required values.
     */
    valueLocale(localObject?: LocalObject | null): StackedBarChartModule;
    /** Gets or Sets the number of ticks of the x axis on the chart */
    xTicks(ticks?: number): StackedBarChartModule;
    /** Gets or Sets the y-axis label of the chart */
    yAxisLabel(yAxisLabel?: string): StackedBarChartModule;
    /**
     * Gets or Sets the offset of the yAxisLabel of the chart.
     * The method accepts both positive and negative values.
     */
    yAxisLabelOffset(yAxisLabelOffset?: number): StackedBarChartModule;
    /** Gets or Sets the number of vertical ticks of the axis on the chart */
    yTicks(ticks?: number): StackedBarChartModule;
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
