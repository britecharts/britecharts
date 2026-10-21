# Coming from Britecharts v2

Most outdated Britecharts code on the web, and most of what a model remembers, is v2: the `britecharts` and `britecharts-react` packages. Use this list both to migrate a project and to check that new code has no v2 habits in it. The full guide is at https://britecharts.github.io/britecharts/docs/how-tos/migration-guide-2-to-3.

| v2 | v3 |
|---|---|
| `import bar from 'britecharts/dist/umd/bar.min'` | `import { bar } from '@britecharts/core'` |
| `require('britecharts/umd/line.min')` | `const { line } = require('@britecharts/core')` |
| `britecharts/dist/css/britecharts.min.css` | `@britecharts/core/dist/styles/bundle/britecharts.min.css` |
| one UMD file per chart | one UMD bundle and one CDN bundle (global `core`) |
| `import { Bar } from 'britecharts-react'` | `import { Bar } from '@britecharts/react'` |
| `barContainer.html(barChart.loadingState())` | `barChart.isLoading(true)`, then call the chart with data, which can be empty |
| line data `{ dataByTopic: [{ topicName, topic, dates: [...] }] }` | `{ data: [{ topicName, name, date, value }] }`, one entry per point. `topic` becomes `name`. Passing `dataByTopic` throws. |
| `nameLabel`, `valueLabel`, `dateLabel`, `topicLabel`, `keyLabel`, `groupLabel` and `stackLabel` on the charts | removed. Rename the keys in the data instead. The tooltip keeps its own. |
| `aspectRatio` | removed. Set `width` and `height`. |
| `locale` for number formatting on bar, grouped bar, stacked bar and scatter plot | `valueLocale` |
| line and stacked area `xAxisFormat` ↔ `xAxisCustomFormat` | swapped. `xAxisFormat` takes a time combination, `xAxisCustomFormat` a d3 format string. The brush swapped the same way. |
| value formatters on grouped and stacked bar | `numberFormat` |
| bullet `customTitle`, `customSubtitle`, and `title` / `subtitle` in the data | removed. Label the chart in your own markup. |
| sparkline `titleText`, `titleTextStyle` | removed |
| the Step chart (`step`, `StepWrapper`, React `Step`) | removed. A `bar` chart draws the same data. For a stepped line over time, use `line` with `lineCurve('step')`. |
| `exportChart` returned nothing | returns a promise. A `.svg` filename downloads an SVG. |
| an unset accessor could read `undefined` | reads `null` |
| tooltip `update(dataPoint, colorMap, x, y)` | the charts dispatch `(dataPoint, [x, y], [width, height], colorMap)`. Pass `show` and `update` straight through. The old order still works, with a warning. |

React-specific changes:
- **Function components.** They need React 16.8 or later, and take no `ref`.
- **Redraws.** A chart redraws only when a prop changes, so pass a new array or object.
- **Data.** `data` is required; pass `null` while loading.
- **Falsy props.** `false`, `0` and `''` reach the chart.
- **No PropTypes.** Each props type is exported for TypeScript instead.
- **`axisTimeCombinations`.** It's an import now, not a prop.

Runtime: v3 targets ES2020, so transpile it yourself for older browsers. It runs on the d3 v7 modules: use `d3-selection` 3 next to it. Negative axis labels use the typographic minus sign (−), not a hyphen.

## Converting old line data

```js
const toFlatData = ({ dataByTopic }) => ({
    data: dataByTopic.flatMap((topic) =>
        topic.dates.map(({ date, value }) => ({
            topicName: topic.topicName,
            name: topic.topic,
            date,
            value,
        }))
    ),
});
```
