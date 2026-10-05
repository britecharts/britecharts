import {
    AnimatedChartAPI,
    BaseAPI,
    ExportableChartAPI,
    InteractiveChartAPI,
} from '../common/base';
import { ChartModuleSelection } from '../common/selection';

export enum HeatmapChartKeys {
    Day = 'day',
    Hour = 'hour',
    Value = 'value',
}

export type HeatmapChartDataShape = {
    [HeatmapChartKeys.Day]: number;
    [HeatmapChartKeys.Hour]: number;
    [HeatmapChartKeys.Value]: number;
};

export interface HeatmapChartAPI
    extends BaseAPI<HeatmapChartModule>,
        // `isAnimated` and `animationDuration` are documented `@public` on the
        // chart and have always shipped; they were simply never declared.
        AnimatedChartAPI<HeatmapChartModule>,
        // Nor was `on`, which is how a consumer wires the mini tooltip to the
        // chart -- the pattern this library's own examples show. Until now
        // `heatmap().on('customMouseOver', tooltip.show)` did not compile.
        InteractiveChartAPI<HeatmapChartModule>,
        ExportableChartAPI {
    /** Gets or Sets the y-axis labels of the chart */
    yAxisLabels(): string[] | undefined;
    yAxisLabels(labels: string[]): HeatmapChartModule;
    /** Gets or Sets the boxSize of the chart */
    boxSize(): number;
    boxSize(size: number): HeatmapChartModule;
}

export type HeatmapChartModule = ChartModuleSelection<HeatmapChartDataShape[]> &
    HeatmapChartAPI;

/**
 * import {heatmap} from 'britecharts;
 * heatmap().width(100).height(100)
 */
export function heatmap(): HeatmapChartModule;
