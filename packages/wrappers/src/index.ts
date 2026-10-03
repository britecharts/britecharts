// The `.js` extensions are deliberate and stay, even though every file behind
// them is now `.ts`. They are what the published ESM entry resolves against:
// babel emits `dist/esm/charts/bar/barChart.js` from `barChart.ts`, so these
// specifiers point at real files there. In this repo they reach the TypeScript
// through webpack's `resolve.extensionAlias` and jest's `moduleNameMapper`.
//
// `sparklineChart` and `constants` were the two that had no extension at all,
// which left them unresolvable by strict ESM; they have one now.
export { default as BarWrapper } from './charts/bar/barChart.js';
export { default as BulletWrapper } from './charts/bullet/bulletChart.js';
export { default as DonutWrapper } from './charts/donut/donutChart.js';
export { default as GroupedBarWrapper } from './charts/groupedBar/groupedBarChart.js';
export { default as LegendWrapper } from './charts/legend/legendChart.js';
export { default as LineWrapper } from './charts/line/lineChart.js';
export { default as ScatterPlotWrapper } from './charts/scatterPlot/scatterPlotChart.js';
export { default as SparklineWrapper } from './charts/sparkline/sparklineChart.js';
export { default as StackedAreaWrapper } from './charts/stackedArea/stackedAreaChart.js';
export { default as StackedBarWrapper } from './charts/stackedBar/stackedBarChart.js';

export { default as TooltipWrapper } from './charts/tooltip/tooltipChart.js';

export * from './constants.js';

// The types a consumer needs to hold a wrapper or build a configuration for
// one. These were unreachable before: the package published no `types` field
// and this barrel exported values only.
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
