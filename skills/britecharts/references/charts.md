# Charts: data, accessors and events

Every chart in `@britecharts/core`, with the exact data it expects, every public accessor, and the events it dispatches. Accessor names here are the complete list: if a name is not here, the chart does not have it. The API page for each chart, with types and defaults, is at `https://britecharts.github.io/britecharts/docs/API/<page>`.

Accessors every data chart shares are listed once here and left out below:

- `width`, `height`, `margin({ top, right, bottom, left })`. Margins can be set partially.
- `isLoading`, which draws a skeleton.
- `a11yTitle` and `a11yDescription`, which give the chart its accessible name and description.

The charts with an `on` accessor take event handlers with `chart.on('customMouseOver', handler)`.

## Contents
- [bar](#bar) · [groupedBar](#groupedbar) · [stackedBar](#stackedbar) · [donut](#donut)
- [line](#line) · [stackedArea](#stackedarea) · [sparkline](#sparkline) · [brush](#brush)
- [scatterPlot](#scatterplot) · [heatmap](#heatmap) · [bullet](#bullet)
- [legend](#legend) · [tooltip and miniTooltip](#tooltip-and-minitooltip) · [colors](#colors)

## bar
API page: `bar`. Data: an array of `{ name: string, value: number }`.

```js
[{ name: 'Shiny', value: 4 }, { name: 'Blazing', value: 9 }]
```

Accessors: `animationDuration`, `betweenBarsPadding`, `chartGradient`, `colorMap`, `colorSchema`, `enableLabels`, `exportChart`, `hasPercentage`, `hasSingleBarHighlight`, `highlightBarFunction`, `isAnimated`, `isHorizontal`, `labelsMargin`, `labelsNumberFormat`, `labelsSize`, `numberFormat`, `on`, `orderingFunction`, `percentageAxisToMaxRatio`, `shouldReverseColorList`, `valueLocale`, `xAxisLabel`, `xAxisLabelOffset`, `xTicks`, `yAxisLabel`, `yAxisLabelOffset`, `yAxisPaddingBetweenChart`, `yTicks`.

Events: `customMouseOver`, `customMouseMove`, `customMouseOut`, `customClick`. Negative values draw below, or left of, zero. A horizontal bar chart usually needs `margin({ left })` wide enough for its labels.

## groupedBar
API page: `grouped-bar`. Data: an array of `{ name: string, group: string, value: number }`. `name` is the category on the axis, and `group` is the series whose bars sit side by side.

```js
[{ name: 'Jan', group: 'Direct', value: 3 }, { name: 'Jan', group: 'Paid', value: 5 }]
```

Accessors: `animationDuration`, `betweenBarsPadding`, `betweenGroupsPadding`, `colorMap`, `colorSchema`, `exportChart`, `grid`, `isAnimated`, `isHorizontal`, `numberFormat`, `on`, `tooltipThreshold`, `valueLocale`, `xTicks`, `yAxisLabel`, `yAxisLabelOffset`, `yTicks`, `yTickTextOffset`.

Events: `customMouseOver`, `customMouseMove`, `customMouseOut`, `customClick`. The tooltip shows only over a bar, and `customClick` passes the clicked bar's data as a third argument.

## stackedBar
API page: `stacked-bar`. Data: an array of `{ name: string, stack: string, value: number }`. `name` is the category on the axis, and `stack` is the series stacked within it.

Accessors: `animationDuration`, `betweenBarsPadding`, `colorMap`, `colorSchema`, `exportChart`, `grid`, `hasPercentage`, `hasReversedStacks`, `isAnimated`, `isHorizontal`, `numberFormat`, `on`, `percentageAxisToMaxRatio`, `tooltipThreshold`, `valueLocale`, `xTicks`, `yAxisLabel`, `yAxisLabelOffset`, `yTicks`.

Events: `customMouseOver`, `customMouseMove`, `customMouseOut`, `customClick`. Negative parts stack down from zero.

## donut
API page: `donut`. Data: an array of `{ name: string, quantity: number, id?: number, percentage?: number }`. Give each slice an `id` to highlight it from a legend, which matches slices by `id`.

```js
[{ id: 1, name: 'Shiny', quantity: 86 }, { id: 2, name: 'Blazing', quantity: 300 }]
```

Accessors: `animationDuration`, `centeredTextFunction`, `colorMap`, `colorSchema`, `emptyDataConfig`, `exportChart`, `externalRadius`, `hasCenterLegend`, `hasFixedHighlightedSlice`, `hasHoverAnimation`, `hasLastHoverSliceHighlighted`, `highlightSliceById`, `internalRadius`, `isAnimated`, `numberFormat`, `on`, `orderingFunction`, `percentageFormat`, `radiusHoverOffset`.

Events: `customMouseOver`, `customMouseMove`, `customMouseOut`, `customClick`.

## line
API page: `line`. Data: an object, not an array: `{ data: [{ topicName, name, date, value }] }`. Each point repeats its series' `topicName` (the label) and `name` (a numeric id for the series). `date` is an ISO string. v2's `dataByTopic` shape is gone.

```js
{
  data: [
    { topicName: 'San Francisco', name: 1, date: '2017-01-16T16:00:00-08:00', value: 1 },
    { topicName: 'San Francisco', name: 1, date: '2017-01-17T16:00:00-08:00', value: 2 },
    { topicName: 'Oakland', name: 2, date: '2017-01-16T16:00:00-08:00', value: 3 },
  ],
}
```

Accessors: `animationDuration`, `colorMap`, `colorSchema`, `exportChart`, `grid`, `hasMinimumValueScale`, `isAnimated`, `lineCurve`, `lineGradient`, `lines`, `locale`, `numberFormat`, `on`, `shouldShowAllDataPoints`, `tooltipThreshold`, `xAxisCustomFormat`, `xAxisFormat`, `xAxisLabel`, `xAxisScale`, `xAxisValueType`, `xTicks`, `yAxisLabel`, `yAxisLabelPadding`, `yTicks`.

Events: `customMouseOver`, `customMouseMove`, `customMouseOut`, `customDataEntryClick`, `customTouchMove`. The wrappers and React only pass on the first three.

`xAxisFormat` takes a time combination from `constants.axisTimeCombinations`: `MINUTE_HOUR`, `HOUR_DAY`, `DAY_MONTH` or `MONTH_YEAR`. Set it to `CUSTOM` to use a d3-time-format string in `xAxisCustomFormat`. `xTicks` works only with `CUSTOM`.

## stackedArea
API page: `stacked-area`. Data: an array of `{ date: string, name: string, value: number }`, one row per series per date. `name` is the series.

Accessors: `animationDuration`, `areaCurve`, `areaOpacity`, `colorMap`, `colorSchema`, `emptyDataConfig`, `exportChart`, `grid`, `hasOutline`, `isAnimated`, `locale`, `numberFormat`, `on`, `tooltipThreshold`, `topicsOrder`, `xAxisCustomFormat`, `xAxisFormat`, `xAxisScale`, `xAxisValueType`, `xTicks`, `yAxisBaseline`, `yAxisLabel`, `yAxisLabelOffset`, `yTicks`.

Events: `customMouseOver`, `customMouseMove`, `customMouseOut`, `customDataEntryClick`, `customTouchMove`.

## sparkline
API page: `sparkline`. Data: an array of `{ date: string, value: number }`. It draws only the data, with no title or axes, so label it in your own markup and with `a11yTitle`. Its default height is 30 px.

Accessors: `animationDuration`, `areaGradient`, `exportChart`, `isAnimated`, `lineGradient`. It has no events.

## brush
API page: `brush`. Data: an array of `{ date: string, value: number | null }`. A `null` value is a gap in the area.

Accessors: `animationDuration`, `areaCurve`, `dateRange`, `gradient`, `isAnimated`, `isLocked`, `locale`, `on`, `roundingTimeInterval`, `xAxisCustomFormat`, `xAxisFormat`, `xTicks`.

Events: `customBrushStart` and `customBrushEnd`. Each passes one argument, the selection as a `[start, end]` array of Dates, not two arguments. `customBrushEnd`'s dates are rounded to `roundingTimeInterval` (a d3 interval name such as `'timeDay'`), and both are `null` when the selection is cleared.

```js
brushChart.on('customBrushEnd', ([start, end]) => {
    if (start && end) filterLineChart(start, end);
});
```

`dateRange([start, end])` sets an initial window. `isLocked(true)` keeps the window's size while it is dragged.

## scatterPlot
API page: `scatter-plot`. Data: an array of `{ name: string, x: number, y: number }`. `name` is the series, and the points are coloured by it.

Accessors: `animationDuration`, `circleOpacity`, `circleStrokeOpacity`, `circleStrokeWidth`, `colorMap`, `colorSchema`, `enableZoom`, `exportChart`, `grid`, `hasCrossHairs`, `hasHollowCircles`, `hasTrendline`, `highlightTextLegendOffset`, `isAnimated`, `maxCircleArea`, `on`, `valueLocale`, `xAxisFormat`, `xAxisFormatType`, `xAxisLabel`, `xAxisLabelOffset`, `xTicks`, `yAxisFormat`, `yAxisLabel`, `yAxisLabelOffset`, `yTicks`.

Events: `customMouseOver`, `customMouseMove`, `customMouseOut`, `customClick`. The tooltip needs `valueLabel('y')`, because a point has no `value`.

## heatmap
API page: `heatmap`. Data: an array of `{ day: number, hour: number, value: number }`, where `day` runs from 0 to 6 and `hour` from 0 to 23.

Accessors: `animationDuration`, `boxSize`, `colorSchema`, `exportChart`, `isAnimated`, `on`, `xAxisLabels` (one label per hour, from the first), `yAxisLabels` (one label per day, from the first). With both label sets, `day` and `hour` index them, so the heatmap can show any two sets of categories.

Events: `customMouseOver`, `customMouseMove`, `customMouseOut`, `customClick`.

## bullet
API page: `bullet`. Data: one object per chart, not an array. Bind it with `container.datum(bulletData)`.

```js
{ ranges: [130, 160, 250], measures: [150, 180], markers: [220] }
```

`ranges` are the background bands, `measures` the bars, and `markers` the target line. The chart draws no title, so label it in your own markup.

Accessors: `colorSchema`, `exportChart`, `isReverse`, `numberFormat`, `paddingBetweenAxisAndChart`, `startMaxRangeOpacity`, `ticks`. It has no events.

## legend
API page: `legend`. Data: an array of `{ id: number, name: string, quantity?: number }`. Use the same ids as the chart it keys, such as the donut's slices.

Accessors: `clearHighlight()`, `colorMap`, `colorSchema`, `highlight(id)`, `highlightEntryById`, `isHorizontal`, `marginRatio`, `markerSize`, `numberFormat`, `unit`. Pair it with a donut through the donut's events:

```js
donutChart
    .on('customMouseOver', (d) => legendChart.highlight(d.data.id))
    .on('customMouseOut', () => legendChart.clearHighlight());
```

## tooltip and miniTooltip
API page: `tooltip`. `miniTooltip()` is `tooltip().layout('single').title('').numberFormat('.2f')`.

Accessors: `dateCustomFormat`, `dateFormat`, `dateLabel`, `hide`, `layout`, `locale`, `maxEntries`, `nameLabel`, `numberFormat`, `shouldShowDateInTitle`, `show`, `title`, `tooltipOffset`, `topicLabel`, `topicsOrder`, `update`, `valueFormatter`, `valueLabel`, `xAxisValueType`.

`SKILL.md` has the table of where each chart's tooltip attaches and which labels it needs. Call the tooltip after the chart's first draw. The element it attaches to only exists once the chart has drawn.

## colors

```js
import { colors } from '@britecharts/core';

colors.colorSchemas;   // britecharts (default), grey, orange, blueGreen, teal, green, yellow, pink, purple, red, okabeIto
colors.colorGradients; // greenBlue, orangePink, bluePurple, for the bar's chartGradient, line's lineGradient and the brush's gradient
```

`okabeIto` stays distinct with the common kinds of colour blindness. Its yellow is light on white, so it suits filled marks more than thin lines.
