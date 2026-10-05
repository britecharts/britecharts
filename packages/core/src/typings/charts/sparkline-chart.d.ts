import {
    ChartDimensionsAPI,
    AnimatedChartAPI,
    ExportableChartAPI,
} from '../common/base';
import { ChartModuleSelection } from '../common/selection';
import { BaseType, Selection } from 'd3-selection';

export enum SparklineChartKeys {
    Value = 'value',
    Date = 'date',
}

export type SparklineChartDataShape = {
    [SparklineChartKeys.Value]: number;
    [SparklineChartKeys.Date]: string;
};

export type SparklineSelection = Selection<
    BaseType,
    SparklineChartDataShape,
    HTMLElement,
    any
>;

export interface SparkelineTitleTextStyle {
    'font-family'?: string;
    'font-size'?: string;
    'font-weight'?: number;
    'font-style'?: string;
    fill?: string;
}

export interface SparklineChartAPI
    extends ChartDimensionsAPI<SparklineChartModule>,
        AnimatedChartAPI<SparklineChartModule>,
        ExportableChartAPI {
    /** Gets or Sets the areaGradient of the chart */
    areaGradient(): [string, string];
    areaGradient(gradient: [string, string]): SparklineChartModule;
    /** Gets or Sets the lineGradient of the chart */
    lineGradient(): [string, string];
    lineGradient(gradient: [string, string]): SparklineChartModule;
    /**
     * Gets or Sets the text of the title at the top of sparkline.
     * To style the title, use the titleTextStyle method below.
     *
     * The getter can return undefined: the chart has no default title, and
     * `drawSparklineTitle` only runs once one is set.
     */
    titleText(): string | undefined;
    titleText(title: string): SparklineChartModule;
    /**
     * Gets or Sets the text style object of the title at the top of sparkline.
     * Using this method, you can set font-family, font-size, font-weight, font-style,
     * and color (fill).
     */
    titleTextStyle(): SparkelineTitleTextStyle;
    titleTextStyle(titleStyle: SparkelineTitleTextStyle): SparklineChartModule;
    /** Gets or Sets the `date` key of the data */
    dateLabel(): string;
    dateLabel(value: string): SparklineChartModule;
    /** Gets or Sets the loading state of the chart */
    isLoading(): boolean;
    isLoading(value: boolean): SparklineChartModule;
    /** Gets or Sets the `value` key of the data */
    valueLabel(): string;
    valueLabel(value: string): SparklineChartModule;
}

export type SparklineChartModule = ChartModuleSelection<
    SparklineChartDataShape[]
> &
    SparklineChartAPI;

/**
 * import {sparkline} from 'britecharts;
 * sparkline().width(100).height(100)
 */
export function sparkline(): SparklineChartModule;
