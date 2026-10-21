// The `.js` extensions are deliberate, even though every file behind them is
// `.ts`. They are what the published ESM entry resolves against: babel emits
// `dist/esm/charts/bar/barChart.js` from `barChart.ts`, so these specifiers
// point at real files there, and strict ESM cannot resolve one without an
// extension. In this repo they reach the TypeScript through TypeScript's and
// Vite's own resolution, which Vitest uses too.
export { default as BarWrapper } from './charts/bar/barChart.js';
export { default as BrushWrapper } from './charts/brush/brushChart.js';
export { default as BulletWrapper } from './charts/bullet/bulletChart.js';
export { default as DonutWrapper } from './charts/donut/donutChart.js';
export { default as GroupedBarWrapper } from './charts/groupedBar/groupedBarChart.js';
export { default as HeatmapWrapper } from './charts/heatmap/heatmapChart.js';
export { default as LegendWrapper } from './charts/legend/legendChart.js';
export { default as LineWrapper } from './charts/line/lineChart.js';
export { default as ScatterPlotWrapper } from './charts/scatterPlot/scatterPlotChart.js';
export { default as SparklineWrapper } from './charts/sparkline/sparklineChart.js';
export { default as StackedAreaWrapper } from './charts/stackedArea/stackedAreaChart.js';
export { default as StackedBarWrapper } from './charts/stackedBar/stackedBarChart.js';

export { default as TooltipWrapper } from './charts/tooltip/tooltipChart.js';

export * from './constants.js';

// The types a consumer needs to hold a wrapper or build a configuration for
// one.
export type {
    Wrapper,
    TooltipWrapper as TooltipWrapperShape,
    TooltipState,
} from './helpers/wrapper.js';
export type {
    ChartConfiguration,
    WrapperConfiguration,
    ChartEventHandler,
} from './helpers/configuration.js';
export type { ChartContainer } from './helpers/validation.js';
