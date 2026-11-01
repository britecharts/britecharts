// Reading an accessor -- `chart.width()` with no argument -- is the other
// thing every consumer does, and nothing else here does it.
//
// Every accessor in this library is `if (!arguments.length) { return value; }`,
// so `chart.width()` gives back a number, not the chart. A declaration with a
// single optional-parameter signature returning the chart:
//
//     width(width?: number): T & ChartBaseAPI<T>;
//
// gets the getter wrong on every accessor, and no consumer can assign one to a
// typed variable. The rest of this consumer only *sets* accessors, so it would
// stay green over that.
//
// Each assignment below is the assertion: it compiles only if the getter
// overload reports the value's own type. The chained calls alongside them are
// the other half -- the getter must not cost the setter its chaining.
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
// other chart-specific accessors are declared per chart and asserted in each
// chart's own section below; this one covers the shared interfaces.
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

// Heatmap's own accessors, `on`, `isAnimated` and `animationDuration` among
// them.
//
// All three are documented `@public`. `on` is the consequential one: it is
// how a consumer wires the mini tooltip to a chart, which is the pattern this
// library's own examples show, so `heatmap().on('customMouseOver',
// tooltip.show)` has to compile for a TypeScript consumer.
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

// Accessors the typings once left out, read back as their values.
// `check:api-parity` in core compares each chart's runtime surface against its
// typings through the TypeScript compiler, so it resolves `Omit`, inherited
// members and intersections properly. The data-key accessors (`nameLabel`,
// `valueLabel`, `dateLabel` and the rest) were here too, until 3.0 removed
// them from every chart but the tooltip.
import {
    groupedBar,
    legend,
    sparkline,
    stackedArea,
    stackedBar,
} from '@britecharts/core';
import type { LocalObject } from '@britecharts/core';
import type { BarChartDataShape, BarSelection } from '@britecharts/core';
import { scatterPlot } from '@britecharts/core';
import { tooltip as tooltipFactory } from '@britecharts/core';
import type {
    StackedAreaChartModule,
    StackedAreaEmptyDataConfig,
} from '@britecharts/core';
import type {
    ColorGradientType,
    CustomLine,
    LineChartModule,
} from '@britecharts/core';
import type {
    TooltipLayout,
    TooltipOffset,
    TooltipXAxisValueType,
} from '@britecharts/core';


// The bar chart's other twenty-two accessors, each read back as its value
// rather than the chart.
//
// `orderingFunction` is handed to `Array.prototype.sort`, which reads the sign
// of the result -- so the assertion below is that the comparator comes back
// usable for what the chart uses it for, and `expect-errors.ts` holds the
// control for the callback that returns nothing.
//
// Four getters are wider than their setter: `chartGradient`, `xAxisLabel`,
// `yAxisLabel` and `valueLocale` are `null` until set, where the grouped and
// stacked bars leave their axis labels `undefined` instead. `orderingFunction`
// reads `undefined`, having no initialiser. Worth asserting separately, since
// the shape a consumer has to write differs between the two.
const barOwn = bar();

const barPadding: number = barOwn.betweenBarsPadding();
const barLabelsEnabled: boolean = barOwn.enableLabels();
const barHasLabels: boolean = barOwn.hasLabels();
const barPercentage: boolean = barOwn.hasPercentage();
const barSingleHighlight: boolean = barOwn.hasSingleBarHighlight();
const barHorizontal: boolean = barOwn.isHorizontal();
const barLabelsMargin: number = barOwn.labelsMargin();
const barLabelsFormat: string = barOwn.labelsNumberFormat();
const barLabelsSize: number = barOwn.labelsSize();
const barAxisRatio: number = barOwn.percentageAxisToMaxRatio();
const barReverseColors: boolean = barOwn.shouldReverseColorList();
const barXLabelOffset: number = barOwn.xAxisLabelOffset();
const barXTicks: number = barOwn.xTicks();
const barYLabelOffset: number = barOwn.yAxisLabelOffset();
const barYAxisPadding: number = barOwn.yAxisPaddingBetweenChart();
const barYTicks: number = barOwn.yTicks();

// Null until set, each needing the guard a consumer has to write.
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
    .hasLabels(true)
    .labelsSize(14)
    .labelsSize();

// The scatter plot's twenty-one accessors, each read back as its value, as on
// the three bar charts.
//
// Four getters are wider than their setter, and `yTicks` is the one worth
// noticing: it is `null` by default and the chart hands that straight to d3's
// `axis.ticks`, where null means "use the scale's own count". So a consumer
// reading it back before setting one gets null, not a number -- the same shape
// brush's `xTicks` has. `grid` and `valueLocale` are null too, and the
// two axis labels read `undefined`.
const scatterChart = scatterPlot();

const scatterStrokeOpacity: number = scatterChart.circleStrokeOpacity();
const scatterStrokeWidth: number = scatterChart.circleStrokeWidth();
const scatterOpacity: number = scatterChart.circleOpacity();
const scatterZoom: boolean = scatterChart.enableZoom();
const scatterCrossHairs: boolean = scatterChart.hasCrossHairs();
const scatterHollow: boolean = scatterChart.hasHollowCircles();
const scatterTrendline: boolean = scatterChart.hasTrendline();
const scatterLegendOffset: number = scatterChart.highlightTextLegendOffset();
const scatterMaxArea: number = scatterChart.maxCircleArea();
const scatterXFormat: string = scatterChart.xAxisFormat();
const scatterXFormatType: string = scatterChart.xAxisFormatType();
const scatterXLabelOffset: number = scatterChart.xAxisLabelOffset();
const scatterXTicks: number = scatterChart.xTicks();
const scatterYFormat: string = scatterChart.yAxisFormat();
const scatterYLabelOffset: number = scatterChart.yAxisLabelOffset();

// Null or undefined until set.
const scatterGrid: 'vertical' | 'horizontal' | 'full' | null =
    scatterChart.grid();
const scatterLocale: LocalObject | null = scatterChart.valueLocale();
const scatterXLabel: string | null = scatterChart.xAxisLabel();
const scatterYLabel: string | null = scatterChart.yAxisLabel();
const scatterYTicks: number | null = scatterChart.yTicks();

// The setters chain, and the nullable ticks still reads a number once set.
const scatterChained: number | null = scatterPlot()
    .isAnimated(true)
    .hasTrendline(true)
    .yTicks(8)
    .yTicks();

// The tooltip's sixteen accessors, each read back as its value. Its
// declaration is careful about the data shapes -- `TooltipTopic.name` is a
// number, not a label.
//
// `dateFormat` is the one worth an assertion of its own: its getter never
// reports null, because it falls back to the default axis setting when none is
// set, where `dateCustomFormat` and `numberFormat` beside it do report null.
// Three accessors on one module, two shapes.
const tooltipChart = tooltipFactory();

const tooltipLayout: TooltipLayout = tooltipChart.layout();
const tooltipDateFormat: string = tooltipChart.dateFormat();
const tooltipDateLabel: string = tooltipChart.dateLabel();
const tooltipNameLabel: string = tooltipChart.nameLabel();
const tooltipTopicLabel: string = tooltipChart.topicLabel();
const tooltipValueLabel: string = tooltipChart.valueLabel();
const tooltipTitle: string = tooltipChart.title();
const tooltipShowsDate: boolean = tooltipChart.shouldShowDateInTitle();
const tooltipMaxEntries: number = tooltipChart.maxEntries();
const tooltipOffset: TooltipOffset = tooltipChart.tooltipOffset();
// `string | number` because the two charts that feed the tooltip name their
// topics differently: line sends numeric ids, stacked area sends string names,
// and the tooltip orders with `topic.name === orderName`. Both have to be
// expressible, so both are asserted below.
const tooltipTopicsOrder: (string | number)[] = tooltipChart.topicsOrder();
const tooltipOrderByIds: (string | number)[] = tooltipFactory()
    .topicsOrder([1, 2, 3])
    .topicsOrder();
const tooltipOrderByNames: (string | number)[] = tooltipFactory()
    .topicsOrder(['Other', 'Sunny'])
    .topicsOrder();
const tooltipValueType: TooltipXAxisValueType = tooltipChart.xAxisValueType();

// Null until set, where `dateFormat` above falls back instead.
const tooltipCustomFormat: string | null = tooltipChart.dateCustomFormat();
const tooltipNumberFormat: string | null = tooltipChart.numberFormat();
const tooltipFormatter: ((value: number) => number) | null =
    tooltipChart.valueFormatter();
// Null until set, like the time-series charts' `locale`.
const tooltipLocale: string | null = tooltipChart.locale();

// The setters chain, and a formatter read back is usable for what the tooltip
// uses it for.
const tooltipChained: number = tooltipFactory()
    .layout('single')
    .maxEntries(5)
    .valueFormatter((value) => value * 2)
    .maxEntries();
const tooltipFormatted: number | undefined = tooltipFactory()
    .valueFormatter((value) => value * 2)
    .valueFormatter()?.(21);

// The stacked area's seventeen accessors, and the generic on its `on`.
//
// `InteractiveChartAPI` has to be parameterised with this chart's own module:
// given another, `StackedBarChartModule` say, `stackedArea().on(...)` reports
// that chart's API. The two assertions below are what that breaks: a chain
// crossing from `on` back to one of this chart's own accessors, and the result
// still being drawable.
//
// `emptyDataConfig` carries `minY`, which the chart reads, and
// `xAxisValueType` takes `'number'`, which is what the chart compares against.
// Both are asserted here with the values the chart actually uses.
const areaChart = stackedArea();

const areaDrawable: StackedAreaChartModule = stackedArea().on(
    'customMouseOver',
    () => undefined
);
const areaChainedFromOn: string = stackedArea()
    .on('customMouseOver', () => undefined)
    .areaCurve('monotoneX')
    .areaCurve();

const areaCurve: string = areaChart.areaCurve();
const areaOpacity: number = areaChart.areaOpacity();
const areaOutline: boolean = areaChart.hasOutline();
const areaThreshold: number = areaChart.tooltipThreshold();
const areaBaseline: number = areaChart.yAxisBaseline();
const areaYLabelOffset: number = areaChart.yAxisLabelOffset();
const areaYTicks: number = areaChart.yTicks();
const areaXScale: 'linear' | 'logarithmic' = areaChart.xAxisScale();
const areaXValueType: 'date' | 'number' = areaChart.xAxisValueType();

// The empty-data window carries all four bounds, `minY` included.
const areaEmptyData: StackedAreaEmptyDataConfig = areaChart.emptyDataConfig();
const areaEmptyMinY: number = areaEmptyData.minY;

// Null or undefined until set.
const areaGrid: 'vertical' | 'horizontal' | 'full' | null = areaChart.grid();
const areaXTicks: number | null = areaChart.xTicks();
const areaTopicsOrder: string[] | undefined = areaChart.topicsOrder();
const areaYLabel: string | null = areaChart.yAxisLabel();

// `'number'` is the value that switches the axis, and it type-checks.
const areaNumericAxis: StackedAreaChartModule = stackedArea()
    .xAxisValueType('number')
    .xAxisScale('logarithmic');

// The line chart's thirteen accessors.
//
// `xAxisValueType` is typed as on the stacked area: the chart compares against
// `'number'`, so `'numeric'` would type-check and do nothing.
//
// The `on` chain below is the assertion that catches a wrong generic on an
// inherited surface. Neither `check:api-parity` nor any setter-only assertion
// sees it; it takes chaining off `on` back to one of the chart's own accessors
// and assigning the result to the chart's module type.
const lineOwn = line();

const lineDrawable: LineChartModule = line().on(
    'customMouseOver',
    () => undefined
);
const lineChainedFromOn: string = line()
    .on('customMouseOver', () => undefined)
    .lineCurve('linear')
    .lineCurve();

const lineCurve: string = lineOwn.lineCurve();
const lineGradient: ColorGradientType = lineOwn.lineGradient();
const lineCustomLines: CustomLine[] = lineOwn.lines();
const lineAllPoints: boolean = lineOwn.shouldShowAllDataPoints();
const lineThreshold: number = lineOwn.tooltipThreshold();
const lineXScale: 'linear' | 'logarithmic' = lineOwn.xAxisScale();
const lineXValueType: 'date' | 'number' = lineOwn.xAxisValueType();
const lineYLabelPadding: number = lineOwn.yAxisLabelPadding();
const lineYTicks: number = lineOwn.yTicks();

// Null until set, where the grouped and stacked bars leave their axis labels
// undefined instead -- this chart initialises them to null, as the bar does.
const lineGrid: 'vertical' | 'horizontal' | 'full' | null = lineOwn.grid();
const lineXLabel: string | null = lineOwn.xAxisLabel();
const lineYLabel: string | null = lineOwn.yAxisLabel();
const lineXTicks: number | null = lineOwn.xTicks();

// `'number'` is the value that switches the axis, and it type-checks.
const lineNumericAxis: LineChartModule = line()
    .xAxisValueType('number')
    .xAxisScale('logarithmic');

export const lineAccessors = {
    lineDrawable,
    lineChainedFromOn,
    lineCurve,
    lineGradient,
    lineCustomLines,
    lineAllPoints,
    lineThreshold,
    lineXScale,
    lineXValueType,
    lineYLabelPadding,
    lineYTicks,
    lineGrid,
    lineXLabel,
    lineYLabel,
    lineXTicks,
    lineNumericAxis,
};

export const stackedAreaAccessors = {
    areaDrawable,
    areaChainedFromOn,
    areaCurve,
    areaOpacity,
    areaOutline,
    areaThreshold,
    areaBaseline,
    areaYLabelOffset,
    areaYTicks,
    areaXScale,
    areaXValueType,
    areaEmptyData,
    areaEmptyMinY,
    areaGrid,
    areaXTicks,
    areaTopicsOrder,
    areaYLabel,
    areaNumericAxis,
};

export const tooltipAccessors = {
    tooltipLayout,
    tooltipDateFormat,
    tooltipDateLabel,
    tooltipNameLabel,
    tooltipTopicLabel,
    tooltipValueLabel,
    tooltipTitle,
    tooltipShowsDate,
    tooltipMaxEntries,
    tooltipOffset,
    tooltipTopicsOrder,
    tooltipOrderByIds,
    tooltipOrderByNames,
    tooltipValueType,
    tooltipCustomFormat,
    tooltipNumberFormat,
    tooltipFormatter,
    tooltipLocale,
    tooltipChained,
    tooltipFormatted,
};

export const scatterPlotAccessors = {
    scatterStrokeOpacity,
    scatterStrokeWidth,
    scatterOpacity,
    scatterZoom,
    scatterCrossHairs,
    scatterHollow,
    scatterTrendline,
    scatterLegendOffset,
    scatterMaxArea,
    scatterXFormat,
    scatterXFormatType,
    scatterXLabelOffset,
    scatterXTicks,
    scatterYFormat,
    scatterYLabelOffset,
    scatterGrid,
    scatterLocale,
    scatterXLabel,
    scatterYLabel,
    scatterYTicks,
    scatterChained,
};

export const barOwnAccessors = {
    barPadding,
    barLabelsEnabled,
    barHasLabels,
    barPercentage,
    barSingleHighlight,
    barHorizontal,
    barLabelsMargin,
    barLabelsFormat,
    barLabelsSize,
    barAxisRatio,
    barReverseColors,
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

// The grouped bar's eleven accessors, each read back as its value
// rather than the chart.
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

// Null or undefined until set, so each read needs the guard a consumer has to
// write.
const groupedGrid: 'vertical' | 'horizontal' | 'full' | null =
    groupedBarChart.grid();
const groupedLocale: LocalObject | null = groupedBarChart.valueLocale();
const groupedLocaleDecimal: string | undefined = groupedLocale?.decimal;
const groupedAxisLabel: string | null = groupedBarChart.yAxisLabel();

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
const hasMinimumValueScale: boolean = lineChart.hasMinimumValueScale();

const sparklineChart = sparkline();
const sparklineIsLoading: boolean = sparklineChart.isLoading();



const stackedBarChart = stackedBar();

// The stacked bar's twelve accessors, each read back as its value
// rather than the chart.
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
const stackedAxisLabel: string | null = stackedBarChart.yAxisLabel();

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

export const labelAccessors = {
    donutCenterLegend,
    legendUnit,
    hasMinimumValueScale,
    sparklineIsLoading,
};

// The bullet chart's own accessors, each read back as its value rather than
// the chart. The parity check only sees that every member is declared, not
// the getter's shape, so these reads are what cover it.
import { bullet } from '@britecharts/core';

const bulletChart = bullet();

const bulletTicks: number = bulletChart.ticks();
const bulletPadding: number = bulletChart.paddingBetweenAxisAndChart();
const bulletOpacity: number = bulletChart.startMaxRangeOpacity();
const bulletReverse: boolean = bulletChart.isReverse();
const bulletSchema: string[] = bulletChart.colorSchema();

// The setters still chain.
const bulletChained: number = bullet().isReverse(true).ticks(8).ticks();

// The legend's own four, and the shared `colorMap`.
//
// `colorMap` is declared on `ThemableChartAPI`, so its getter covers all eight
// charts that expose it: each defaults `nameToColorMap` to null and falls back
// to the colour scale until one is set. The guarded read below is the shape a
// consumer has to write; `expect-errors.ts` holds the other half.
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
// void, so they do not chain.
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

// The brush chart's own accessors, and the generic argument of its inherited
// surfaces.
//
// `AnimatedChartAPI`, `TimeSeriesChartAPI` and `InteractiveChartAPI` take
// `BrushChartModule`, not `BrushChartAPI`. Those interfaces return
// `T & XAPI<T>`, so given the API type, setting an inherited accessor reports
// a type with no `ChartModuleSelection` in it: the result cannot be handed to
// `selection.call()`, and chaining off it loses the rest of the chart. The two
// assertions below are what that breaks, and neither needs a cast.
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
// `roundingTimeInterval` is a d3 time interval name, not the
// `'value' | 'date'` data-key enum.
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

// The donut chart's eleven own accessors, and the return types of its two
// callbacks.
//
// `centeredTextFunction`'s result goes to `.text()` and `orderingFunction`'s to
// `.sort()`. TypeScript lets a value-returning function satisfy a `=> void`
// parameter, so a consumer's correct callback compiles either way; only
// reading one back shows a `=> void` declaration, as an unusable `void`. The
// two assertions below are that read, and `expect-errors.ts` holds the
// control.
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
    bulletChained,
};

// The sparkline's own two, each read back as its value rather than the chart.
// Its shared `isLoading` is asserted further up.
//
// The two gradients are a two-element tuple, not `string[]`: the chart reads
// `[0]` and `[1]` and nothing else, and `ColorGradientType` says so.
const sparklineOwn = sparkline();

const sparklineAreaGradient: [string, string] = sparklineOwn.areaGradient();
const sparklineLineGradient: [string, string] = sparklineOwn.lineGradient();

// The setters still chain.
const sparklineChained: [string, string] = sparkline()
    .areaGradient(['#F5FDFF', '#F6FEFC'])
    .lineGradient(['#39C7EA', '#4CDCBA'])
    .lineGradient();

export const sparklineAccessors = {
    sparklineAreaGradient,
    sparklineLineGradient,
    sparklineChained,
};

// The treemap's own accessors, each read back as its value rather than the
// chart.
import { treemap } from '@britecharts/core';

const treemapChart = treemap();

const treemapHasLabels: boolean = treemapChart.hasLabels();
const treemapLabelsFormat: string = treemapChart.labelsNumberFormat();

// The setters still chain.
const treemapChained: string = treemap()
    .hasLabels(false)
    .labelsNumberFormat('$,')
    .labelsNumberFormat();

export const treemapAccessors = {
    treemapHasLabels,
    treemapLabelsFormat,
    treemapChained,
};
