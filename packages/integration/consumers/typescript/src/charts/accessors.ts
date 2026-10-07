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
import type { LocalObject } from '@britecharts/core';
import type { BarChartDataShape, BarSelection } from '@britecharts/core';

const barNameLabel: string = bar().nameLabel();

// The bar chart's other twenty-two accessors, corrected with its conversion for
// the same reason the grouped and stacked bars' were: setter-only, so reading
// one reported the chart instead of its value. `nameLabel` just above was never
// part of that.
//
// `orderingFunction` is the one that was declared wrong rather than merely
// incomplete. It was `=> void`, and the chart hands it to
// `Array.prototype.sort`, which reads the sign of the result -- so the
// assertion below is that the comparator comes back usable for what the chart
// uses it for, and `expect-errors.ts` holds the control for the callback that
// returns nothing.
//
// Four getters are wider than their setter: `chartGradient`, `xAxisLabel`,
// `yAxisLabel` and `valueLocale` are `null` until set, where the grouped and
// stacked bars left their axis labels `undefined` instead. `orderingFunction`
// reads `undefined`, having no initialiser. Worth asserting separately, since
// the shape a consumer has to write differs between the two.
const barOwn = bar();

const barPadding: number = barOwn.betweenBarsPadding();
const barLabelsEnabled: boolean = barOwn.enableLabels();
const barPercentage: boolean = barOwn.hasPercentage();
const barSingleHighlight: boolean = barOwn.hasSingleBarHighlight();
const barHorizontal: boolean = barOwn.isHorizontal();
const barLabelsMargin: number = barOwn.labelsMargin();
const barLabelsFormat: string = barOwn.labelsNumberFormat();
const barLabelsSize: number = barOwn.labelsSize();
const barAxisRatio: number = barOwn.percentageAxisToMaxRatio();
const barReverseColors: boolean = barOwn.shouldReverseColorList();
const barValueLabel: string = barOwn.valueLabel();
const barXLabelOffset: number = barOwn.xAxisLabelOffset();
const barXTicks: number = barOwn.xTicks();
const barYLabelOffset: number = barOwn.yAxisLabelOffset();
const barYAxisPadding: number = barOwn.yAxisPaddingBetweenChart();
const barYTicks: number = barOwn.yTicks();

// Null until set, each needing the guard a consumer now has to write.
const barGradient: [string, string] | null = barOwn.chartGradient();
const barXAxisLabel: string | null = barOwn.xAxisLabel();
const barYAxisLabel: string | null = barOwn.yAxisLabel();
const barLocale: LocalObject | null = barOwn.valueLocale();
const barHighlight: ((barSelection: BarSelection) => void) | null =
    barOwn.highlightBarFunction();

// Undefined until set, and read back usable for what the chart does with it:
// the sign of the number is what `Array.prototype.sort` reads.
const barOrdering = bar()
    .orderingFunction((a, b) => a.value - b.value)
    .orderingFunction();
const barSorted: BarChartDataShape[] = [
    { name: 'b', value: 2 },
    { name: 'a', value: 1 },
].sort(barOrdering);

// The setters chain, and a chain crossing from an inherited surface back to a
// bar-specific one still resolves.
const barChained: number = bar()
    .isAnimated(true)
    .enableLabels(true)
    .labelsSize(14)
    .labelsSize();

export const barOwnAccessors = {
    barPadding,
    barLabelsEnabled,
    barPercentage,
    barSingleHighlight,
    barHorizontal,
    barLabelsMargin,
    barLabelsFormat,
    barLabelsSize,
    barAxisRatio,
    barReverseColors,
    barValueLabel,
    barXLabelOffset,
    barXTicks,
    barYLabelOffset,
    barYAxisPadding,
    barYTicks,
    barGradient,
    barXAxisLabel,
    barYAxisLabel,
    barLocale,
    barHighlight,
    barOrdering,
    barSorted,
    barChained,
};
const donutCenterLegend: boolean = donut().hasCenterLegend();
const legendUnit: string = legend().unit();

const groupedBarChart = groupedBar();
const groupLabel: string = groupedBarChart.groupLabel();
const groupedNameLabel: string = groupedBarChart.nameLabel();
const groupedValueLabel: string = groupedBarChart.valueLabel();

// The grouped bar's other eleven accessors, corrected with its conversion for
// the same reason bullet's seven and the sparkline's four were: setter-only, so
// reading one reported the chart instead of its value. The three label getters
// just above already read correctly and were never part of that.
//
// Three of the eleven have a getter wider than their setter, which is the whole
// of what reading one before setting it gives you: `grid` and `valueLocale` are
// `null` in the module's own `let` block, and `yAxisLabel` has no initialiser at
// all. `expect-errors.ts` holds the control for those three -- a positive
// assertion proves a getter is not too narrow, and only a call that should fail
// proves it is not too wide.
//
// `GridTypes` and `Offset` are spelled out rather than imported: `common/grid`
// and `common/position` are not in `index.d.ts`, the same gap the margin read at
// the top of this file works around. Exporting them is a separate, additive
// change, and it would let these two assertions name the real types.
const groupedBarPadding: number = groupedBarChart.betweenBarsPadding();
const groupedGroupsPadding: number = groupedBarChart.betweenGroupsPadding();
const groupedHorizontal: boolean = groupedBarChart.isHorizontal();
const groupedThreshold: number = groupedBarChart.tooltipThreshold();
const groupedXTicks: number = groupedBarChart.xTicks();
const groupedYTicks: number = groupedBarChart.yTicks();
const groupedLabelOffset: number = groupedBarChart.yAxisLabelOffset();
const groupedTickOffset: { x: number; y: number } =
    groupedBarChart.yTickTextOffset();

// Null or undefined until set, so each read needs the guard a consumer now has
// to write.
const groupedGrid: 'vertical' | 'horizontal' | 'full' | null =
    groupedBarChart.grid();
const groupedLocale: LocalObject | null = groupedBarChart.valueLocale();
const groupedLocaleDecimal: string | undefined = groupedLocale?.decimal;
const groupedAxisLabel: string | undefined = groupedBarChart.yAxisLabel();

// The setters still chain, and a chain crossing from an inherited surface back
// to a grouped-bar-specific one still resolves.
const groupedChained: number = groupedBar()
    .isAnimated(true)
    .grid('horizontal')
    .yAxisLabel('Ticket Sales')
    .betweenBarsPadding(0.2)
    .betweenBarsPadding();

// `grid` and `valueLocale` take their own empty value back, which is how either
// one is turned off again. The chart's JSDoc documents `null` as the default
// for both, and both assign it straight through.
const groupedGridReset: 'vertical' | 'horizontal' | 'full' | null = groupedBar()
    .grid('full')
    .grid(null)
    .grid();
const groupedLocaleReset: LocalObject | null = groupedBar()
    .valueLocale(null)
    .valueLocale();

export const groupedBarAccessors = {
    groupedBarPadding,
    groupedGroupsPadding,
    groupedHorizontal,
    groupedThreshold,
    groupedXTicks,
    groupedYTicks,
    groupedLabelOffset,
    groupedTickOffset,
    groupedGrid,
    groupedLocale,
    groupedLocaleDecimal,
    groupedAxisLabel,
    groupedChained,
    groupedGridReset,
    groupedLocaleReset,
};

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

// The stacked bar's other twelve accessors, corrected with its conversion for
// the same reason the grouped bar's eleven were: setter-only, so reading one
// reported the chart instead of its value. Its three label getters just above
// were never part of that.
//
// `hasPercentage` is the odd one: its getter is computed rather than stored,
// reporting whether `numberFormat` is currently the percentage one. Setting it
// and reading it back is the assertion that actually covers it.
//
// `grid`, `valueLocale` and `yAxisLabel` have a getter wider than their setter,
// the same three as on the grouped bar and for the same reasons.
// `expect-errors.ts` holds the control for those.
const stackedPadding: number = stackedBarChart.betweenBarsPadding();
const stackedReversed: boolean = stackedBarChart.hasReversedStacks();
const stackedHorizontal: boolean = stackedBarChart.isHorizontal();
const stackedAxisRatio: number = stackedBarChart.percentageAxisToMaxRatio();
const stackedThreshold: number = stackedBarChart.tooltipThreshold();
const stackedXTicks: number = stackedBarChart.xTicks();
const stackedYTicks: number = stackedBarChart.yTicks();
const stackedLabelOffset: number = stackedBarChart.yAxisLabelOffset();

// Null or undefined until set.
const stackedGrid: 'vertical' | 'horizontal' | 'full' | null =
    stackedBarChart.grid();
const stackedLocale: LocalObject | null = stackedBarChart.valueLocale();
const stackedAxisLabel: string | undefined = stackedBarChart.yAxisLabel();

// Computed from `numberFormat`, so it reads back what was set rather than a
// stored flag -- and `numberFormat` itself moves with it.
const stackedPercentage: boolean = stackedBar().hasPercentage(true)
    .hasPercentage();
const stackedPercentageFormat: string = stackedBar()
    .hasPercentage(true)
    .numberFormat();

// The setters chain, and a chain crossing from an inherited surface back to a
// stacked-bar-specific one still resolves.
const stackedChained: number = stackedBar()
    .isAnimated(true)
    .grid('full')
    .grid(null)
    .hasReversedStacks(true)
    .betweenBarsPadding(0.2)
    .betweenBarsPadding();

export const stackedBarAccessors = {
    stackedPadding,
    stackedReversed,
    stackedHorizontal,
    stackedAxisRatio,
    stackedThreshold,
    stackedXTicks,
    stackedYTicks,
    stackedLabelOffset,
    stackedGrid,
    stackedLocale,
    stackedAxisLabel,
    stackedPercentage,
    stackedPercentageFormat,
    stackedChained,
};

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

// The legend's own four, corrected with its conversion, and the shared
// `colorMap` the conversion forced.
//
// `colorMap` is declared on `ThemableChartAPI`, so its getter was wrong for all
// eight charts that expose it: each defaults `nameToColorMap` to null and falls
// back to the colour scale until one is set. The guarded read below is the
// shape a consumer now has to write; `expect-errors.ts` holds the other half.
//
// `highlightEntryById` is nullable for the same reason -- no default, and the
// component only fades the other entries once an id is set.
const legendChart = legend();

const legendColorMap: Record<string, string> | null = legendChart.colorMap();
const legendFirstColour: string | undefined =
    legendColorMap === null ? undefined : legendColorMap['one'];
const legendHighlighted: number | null = legendChart.highlightEntryById();
const legendHorizontal: boolean = legendChart.isHorizontal();
const legendMarginRatio: number = legendChart.marginRatio();
const legendMarkerSize: number = legendChart.markerSize();

// `highlight` and `clearHighlight` are commands, not accessors: they return
// void, so they do not chain and never have.
const legendHighlightReturn: void = legend().highlight(1);

export const legendAccessors = {
    legendColorMap,
    legendFirstColour,
    legendHighlighted,
    legendHorizontal,
    legendMarginRatio,
    legendMarkerSize,
    legendHighlightReturn,
};

// The brush chart's own accessors, and the generic argument that made three of
// its inherited surfaces unusable.
//
// `AnimatedChartAPI`, `TimeSeriesChartAPI` and `InteractiveChartAPI` were each
// parameterised with `BrushChartAPI` instead of `BrushChartModule`. Those
// interfaces return `T & XAPI<T>`, so setting an inherited accessor reported a
// type with no `ChartModuleSelection` in it: the result could not be handed to
// `selection.call()`, and chaining off it lost the rest of the chart. The two
// assertions below are what that broke -- both are errors against the old
// declaration, and neither needs a cast now.
import { brush } from '@britecharts/core';
import type { BrushChartModule } from '@britecharts/core';
import type {
    DonutChartDataShape,
    DonutEmptyDataConfig,
} from '@britecharts/core';

const brushChart = brush();

// Setting an inherited accessor still gives something drawable.
const brushDrawable: BrushChartModule = brush().isAnimated(true);
// ... and still carries the chart's own accessors, so a chain crossing from an
// inherited surface back to a brush-specific one resolves.
const brushChained: string = brush().isAnimated(true).areaCurve('monotoneX').areaCurve();

const brushAreaCurve: string = brushChart.areaCurve();
const brushLocked: boolean = brushChart.isLocked();
const brushGradient: [string, string] = brushChart.gradient();
// `roundingTimeInterval` is a d3 time interval name. It was declared as
// returning the `'value' | 'date'` data-key enum.
const brushRounding: string = brushChart.roundingTimeInterval();
const brushRoundingChains: BrushChartModule =
    brush().roundingTimeInterval('timeWeek');
// Both nullable until set.
const brushDateRange: [string | null, string | null] = brushChart.dateRange();
const brushTicks: number | null = brushChart.xTicks();

export const brushAccessors = {
    brushDrawable,
    brushChained,
    brushAreaCurve,
    brushLocked,
    brushGradient,
    brushRounding,
    brushRoundingChains,
    brushDateRange,
    brushTicks,
};

// The donut chart's eleven own accessors, and the two callbacks whose declared
// return type was wrong.
//
// `centeredTextFunction`'s result goes to `.text()` and `orderingFunction`'s to
// `.sort()`, but both were declared `=> void`. TypeScript lets a
// value-returning function satisfy a `=> void` parameter, so a consumer's
// correct callback always compiled -- which is why nothing caught this. What
// broke was reading either one back: the result was `void` and unusable. The
// two assertions below are that read, and `expect-errors.ts` holds the control.
const donutChart = donut();

const donutCentered: (d: DonutChartDataShape) => string =
    donutChart.centeredTextFunction();
const donutOrdering: (
    a: DonutChartDataShape,
    b: DonutChartDataShape
) => number = donutChart.orderingFunction();

// Read back, each is usable for what the chart uses it for.
const donutCenteredText: string = donutCentered({
    id: 1,
    name: 'glittering',
    quantity: 2,
    percentage: 50,
});
const donutSorted: DonutChartDataShape[] = [].sort(donutOrdering);

const donutEmptyData: DonutEmptyDataConfig = donutChart.emptyDataConfig();
const donutExternalRadius: number = donutChart.externalRadius();
const donutInternalRadius: number = donutChart.internalRadius();
const donutRadiusHoverOffset: number = donutChart.radiusHoverOffset();
const donutPercentageFormat: string = donutChart.percentageFormat();
const donutFixedHighlight: boolean = donutChart.hasFixedHighlightedSlice();
const donutHoverAnimation: boolean = donutChart.hasHoverAnimation();
const donutLastHover: boolean = donutChart.hasLastHoverSliceHighlighted();
// Undefined until set: the chart has no default slice to highlight.
const donutHighlighted: number | undefined = donutChart.highlightSliceById();

export const donutAccessors = {
    donutCentered,
    donutOrdering,
    donutCenteredText,
    donutSorted,
    donutEmptyData,
    donutExternalRadius,
    donutInternalRadius,
    donutRadiusHoverOffset,
    donutPercentageFormat,
    donutFixedHighlight,
    donutHoverAnimation,
    donutLastHover,
    donutHighlighted,
};

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
