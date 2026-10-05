// Reading an accessor -- `chart.width()` with no argument -- is the other
// thing every consumer does, and until this file nothing here did it.
//
// That gap hid a defect in the published typings as real as the `.call(chart)`
// one next door. Every accessor was declared with a single optional-parameter
// signature returning the chart:
//
//     width(width?: number): T & ChartBaseAPI<T>;
//
// which says `chart.width()` gives back the chart. At runtime it gives back a
// number -- every accessor in this library is
// `if (!arguments.length) { return value; }`. So the type was wrong for the
// getter on all ~30 accessors of all 14 charts, and no consumer could assign
// one to a typed variable. The rest of this consumer only ever *sets*
// accessors, which is why it stayed green.
//
// Each assignment below is the assertion: it compiles only if the getter
// overload reports the value's own type. The chained calls alongside them are
// the other half -- fixing the getter must not cost the setter its chaining.
import { bar, donut, heatmap, line } from '@britecharts/core';

// Getters report the value, not the chart.
const barChart = bar();
const width: number = barChart.width();
const height: number = barChart.height();
const isLoading: boolean = barChart.isLoading();
const numberFormat: string = barChart.numberFormat();
// Reached through its own member rather than by naming ChartMarginParams,
// which the package root does not re-export -- `common/base` and
// `common/margin` are not in index.d.ts. Reading `.top` at all is the
// assertion either way: a chart module has no such property. It is
// `number | undefined` because every member of ChartMarginParams is optional,
// which is the declaration's business and not this file's.
const marginTop: number | undefined = barChart.margin().top;

// Setters still chain, and still return something with the whole API on it.
const chained: number = bar()
    .width(100)
    .height(200)
    .margin(barChart.margin())
    .width();

// The same on a chart using BaseAPI rather than ChartBaseAPI. `boxSize` and the
// other chart-specific accessors are declared per chart and are corrected with
// each chart's own conversion; this file covers the shared interfaces.
const schema: string[] = heatmap().colorSchema();

// And on the animated and time-series surfaces.
const isAnimated: boolean = donut().isAnimated();
const animationDuration: number = donut().animationDuration();
const locale = line().locale();

export const readAccessors = {
    width,
    height,
    marginTop,
    isLoading,
    numberFormat,
    chained,
    schema,
    isAnimated,
    animationDuration,
    locale,
};

// Heatmap's own accessors, and the three its declaration never had at all.
//
// The implementation exposes eleven accessors; the declaration covered eight.
// `on`, `isAnimated` and `animationDuration` are all documented `@public` and
// have always shipped. `on` is the consequential one: it is how a consumer
// wires the mini tooltip to a chart, which is the pattern this library's own
// examples show, so `heatmap().on('customMouseOver', tooltip.show)` was a
// compile error for every TypeScript consumer.
import { miniTooltip } from '@britecharts/core';

const heatmapChart = heatmap();
const tooltip = miniTooltip();

const boxSize: number = heatmapChart.boxSize();
// `string[] | undefined` because the chart declares `let yAxisLabels` with no
// default and falls back to `daysHuman` at draw time, so reading it before
// setting it really does give undefined.
const yAxisLabels: string[] | undefined = heatmapChart.yAxisLabels();
const heatmapAnimated: boolean = heatmapChart.isAnimated();
const heatmapDuration: number = heatmapChart.animationDuration();

heatmap()
    .on('customMouseOver', tooltip.show)
    .on('customMouseMove', tooltip.update)
    .on('customMouseOut', tooltip.hide);

export const heatmapAccessors = {
    boxSize,
    yAxisLabels,
    heatmapAnimated,
    heatmapDuration,
};

// The label accessors, and the three others that were exposed but never
// declared. Eighteen in total across eight charts, found by comparing each
// chart's runtime surface against its typings rather than one at a time --
// `check:api-parity` in core does that comparison through the TypeScript
// compiler, so it resolves `Omit`, inherited members and intersections properly.
//
// Fifteen of the eighteen are one family: the keys a chart reads its data by.
// Their JSDoc called most of them `{number}`, which is why the types here come
// from the implementation's own defaults instead -- `nameLabel` defaults to
// `'name'`, `valueLabel` to `'value'`, `dateLabel` to `'date'`. They are
// strings, and they always have been.
import {
    groupedBar,
    legend,
    sparkline,
    stackedArea,
    stackedBar,
} from '@britecharts/core';

const barNameLabel: string = bar().nameLabel();
const donutCenterLegend: boolean = donut().hasCenterLegend();
const legendUnit: string = legend().unit();

const groupedBarChart = groupedBar();
const groupLabel: string = groupedBarChart.groupLabel();
const groupedNameLabel: string = groupedBarChart.nameLabel();
const groupedValueLabel: string = groupedBarChart.valueLabel();

const lineChart = line();
const lineDateLabel: string = lineChart.dateLabel();
const lineTopicLabel: string = lineChart.topicLabel();
const lineValueLabel: string = lineChart.valueLabel();
const hasMinimumValueScale: boolean = lineChart.hasMinimumValueScale();

const sparklineChart = sparkline();
const sparklineDateLabel: string = sparklineChart.dateLabel();
const sparklineValueLabel: string = sparklineChart.valueLabel();
const sparklineIsLoading: boolean = sparklineChart.isLoading();

const stackedAreaChart = stackedArea();
const areaDateLabel: string = stackedAreaChart.dateLabel();
const areaValueLabel: string = stackedAreaChart.valueLabel();

const stackedBarChart = stackedBar();
const barStackLabel: string = stackedBarChart.stackLabel();
const stackedNameLabel: string = stackedBarChart.nameLabel();
const stackedValueLabel: string = stackedBarChart.valueLabel();

// Setting one still chains, so the overloads did not cost the setter anything.
const chainedLabels: string = stackedBar()
    .nameLabel('name')
    .valueLabel('value')
    .stackLabel('stack')
    .nameLabel();

export const labelAccessors = {
    barNameLabel,
    donutCenterLegend,
    legendUnit,
    groupLabel,
    groupedNameLabel,
    groupedValueLabel,
    lineDateLabel,
    lineTopicLabel,
    lineValueLabel,
    hasMinimumValueScale,
    sparklineDateLabel,
    sparklineValueLabel,
    sparklineIsLoading,
    areaDateLabel,
    areaValueLabel,
    barStackLabel,
    stackedNameLabel,
    stackedValueLabel,
    chainedLabels,
};

// The bullet chart's own accessors. Its declaration had every member, so the
// parity check was already green on it -- what was wrong was the shape and two
// of the types.
//
// `customTitle` and `customSubtitle` were declared `number`. The chart assigns
// them to `title`/`subtitle` and renders them as text, and its own documented
// examples are `customTitle('CPU Usage')` and `customSubtitle('GHz')`. They are
// `string`, and `string | undefined` on the way out, since neither has a
// default. The seven chart-specific accessors were also setter-only, so reading
// one reported the chart rather than its value -- the same gap the shared
// interfaces had before, which never reached the per-chart declarations.
import { bullet } from '@britecharts/core';

const bulletChart = bullet();

const bulletTicks: number = bulletChart.ticks();
const bulletPadding: number = bulletChart.paddingBetweenAxisAndChart();
const bulletOpacity: number = bulletChart.startMaxRangeOpacity();
const bulletReverse: boolean = bulletChart.isReverse();
const bulletSchema: string[] = bulletChart.colorSchema();
const bulletTitle: string | undefined = bulletChart.customTitle();
const bulletSubtitle: string | undefined = bulletChart.customSubtitle();

// A string goes in, and the setter still chains.
const bulletChained: string | undefined = bullet()
    .customTitle('CPU Usage')
    .customSubtitle('GHz')
    .ticks(8)
    .customTitle();

export const bulletAccessors = {
    bulletTicks,
    bulletPadding,
    bulletOpacity,
    bulletReverse,
    bulletSchema,
    bulletTitle,
    bulletSubtitle,
    bulletChained,
};

// The sparkline's own four, corrected with its conversion for the same reason
// bullet's seven were: they were setter-only, so reading one reported the chart
// instead of its value. Its three shared ones -- `dateLabel`, `valueLabel`,
// `isLoading` -- already read correctly and are asserted further up.
//
// The two gradients are a two-element tuple, not `string[]`: the chart reads
// `[0]` and `[1]` and nothing else, and `ColorGradientType` has said so since
// before this migration. `titleText` is `string | undefined` on the way out
// because the chart has no default title -- `drawSparklineTitle` only runs once
// one is set.
const sparklineOwn = sparkline();

const sparklineAreaGradient: [string, string] = sparklineOwn.areaGradient();
const sparklineLineGradient: [string, string] = sparklineOwn.lineGradient();
const sparklineTitleText: string | undefined = sparklineOwn.titleText();
const sparklineTitleFont: string | undefined =
    sparklineOwn.titleTextStyle()['font-family'];

// The setters still chain, and a partial style object is still accepted: the
// chart falls back to its own default for every member left out.
const sparklineChained: string | undefined = sparkline()
    .areaGradient(['#F5FDFF', '#F6FEFC'])
    .lineGradient(['#39C7EA', '#4CDCBA'])
    .titleTextStyle({ 'font-size': '1.5em' })
    .titleText('Signups')
    .titleText();

export const sparklineAccessors = {
    sparklineAreaGradient,
    sparklineLineGradient,
    sparklineTitleText,
    sparklineTitleFont,
    sparklineChained,
};
