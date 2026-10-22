# @britecharts/react

`npm install @britecharts/react` installs core and wrappers with it. It needs React 16.8 or later. Import the stylesheet once, for example in the app's entry file:

```js
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';
```

## Components

`Bar`, `Brush`, `Bullet`, `Donut`, `GroupedBar`, `Heatmap`, `Legend`, `Line`, `ScatterPlot`, `Sparkline`, `StackedArea`, `StackedBar`, plus `Tooltip`, `ResponsiveContainer` and `withResponsiveness`. Each exports its props type: `BarChartProps`, `BrushProps`, `HeatmapProps`, `LineProps` and so on. `axisTimeCombinations` is exported for `xAxisFormat`.

Props are the chart's accessors, named the same, with the same data shapes as `charts.md`. `Line`'s `data` is the `{ data: [...] }` object, and `Bullet`'s is an array with one bullet object.

## Rules that differ from the vanilla API

- **`data` is required.** Pass `null` while it loads: nothing is drawn until data arrives. Leaving it out, or passing `undefined`, is an error. To show a skeleton instead, pass `data={[]}` with `isLoading`.
- **Charts redraw only when a prop changes**, by identity. Pass a new array or object to redraw; a mutated array with the same reference does nothing:
  ```jsx
  setData([...data, newPoint]); // redraws
  data.push(newPoint); setData(data); // does not
  ```
  Inline objects and arrays (`margin={{ left: 60 }}`) are compared by value field by field, so they don't cause redraws on every render.
- **No `ref`.** The components are function components. They draw into a `<div>` they own and clean up on unmount.
- **`false`, `0` and `''` reach the chart**, so `isLoading={false}` ends a loading state. `null` and `undefined` leave the chart's default in place.
- **Width comes from you.** Wrap the chart in `ResponsiveContainer` or `withResponsiveness` to fill its container:
  ```jsx
  <ResponsiveContainer render={({ width }) => <Bar data={data} width={width} />} />

  const ResponsiveBar = withResponsiveness(Bar);
  <ResponsiveBar data={data} />
  ```

## Events

Pass handlers as props. Not every component takes every event:

| Component | Event props |
|---|---|
| `Bar`, `GroupedBar`, `StackedBar`, `StackedArea`, `Line` | `customMouseOver`, `customMouseMove`, `customMouseOut` |
| `Donut`, `ScatterPlot`, `Heatmap` | those three and `customClick` |
| `Brush` | `customBrushStart`, `customBrushEnd`, each called with one `[start, end]` array of Dates |
| `Bullet`, `Sparkline`, `Legend` | none |

```jsx
<Brush
    data={brushData}
    roundingTimeInterval="timeDay"
    customBrushEnd={([start, end]) => setRange(start && end ? [start, end] : null)}
/>
```

## Tooltip

`Tooltip` wraps the chart it decorates. Give it the data and a `render` prop that returns the chart, and spread the props it hands you onto the chart: they carry the data and the event wiring.

```jsx
<Tooltip
    data={data}
    title="Visits"
    render={(props) => <StackedBar {...props} width={600} />}
    nameLabel="stack"
/>
```

Some charts name their data point's fields differently, so tell the tooltip where to look:

| Chart | `Tooltip` props |
|---|---|
| `Line` | `topicLabel="topics"` |
| `StackedArea` | none |
| `StackedBar` | `nameLabel="stack"` |
| `GroupedBar` | `nameLabel="group"` |
| `ScatterPlot` | `valueLabel="y"`, optionally `nameLabel="x"` |
| `Bar`, `Donut`, `Heatmap` | none |

Without them the tooltip shows no rows (line), rows without colours (stacked and grouped bar) or no value (scatter plot). Other `Tooltip` props: `title`, `numberFormat`, `dateFormat`, `dateCustomFormat`, `locale`, `shouldShowDateInTitle`, `topicsOrder` and `tooltipOffset`.

## Export

`exportChart` is a prop on every chart component except `Brush` (and `Legend`, which isn't a chart). It isn't a callback: setting it to a filename downloads the chart once, as SVG for a `.svg` name and PNG for any other. Because charts redraw only on a change, export again with a different value:

```jsx
const [exportName, setExportName] = useState(null);
<Line data={data} exportChart={exportName} />
<button onClick={() => setExportName(`visits-${Date.now()}.svg`)}>Download SVG</button>
```

The brush has no `exportChart`, in React or in core.
