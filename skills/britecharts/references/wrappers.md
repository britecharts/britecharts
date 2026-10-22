# @britecharts/wrappers

Use the wrappers to put a Britecharts chart into a framework without React: Vue, Svelte, Angular, Lit, Alpine or a plain component class. Each wrapper is an object with three methods, which map onto a component's lifecycle:

| Method | When | Returns |
|---|---|---|
| `create(element, data, config)` | mount | the chart instance; keep it |
| `update(element, data, config, chart)` | when data or config change | the chart |
| `destroy(element)` | unmount | nothing; removes the chart's svg |

Wrappers: `BarWrapper`, `BrushWrapper`, `BulletWrapper`, `DonutWrapper`, `GroupedBarWrapper`, `HeatmapWrapper`, `LegendWrapper`, `LineWrapper`, `ScatterPlotWrapper`, `SparklineWrapper`, `StackedAreaWrapper`, `StackedBarWrapper`, and `TooltipWrapper`, which has its own signature.

```js
import { BarWrapper } from '@britecharts/wrappers';
import '@britecharts/core/dist/styles/bundle/britecharts.min.css';

const chart = BarWrapper.create(el, data, {
    width: el.getBoundingClientRect().width,
    height: 300,
    isHorizontal: true,
    customMouseOver: (d) => console.log(d.name),
});

BarWrapper.update(el, newData, { height: 400 }, chart);
BarWrapper.destroy(el);
```

## The config object

- **Keys are the chart's accessor names**, from `charts.md`, with the value you would pass to the setter: `{ width: 400, margin: { left: 60 }, colorSchema: colors.colorSchemas.teal }`.
- **Event handlers go in the same object.** The keys a wrapper accepts are `customMouseOver`, `customMouseMove`, `customMouseOut`, `customClick`, `customBrushStart` and `customBrushEnd`. Use only those the chart dispatches.
- **An unknown key throws** before anything is drawn. The message names the key, suggests the nearest accessor, and links the chart's API page:
  ```
  Method not supported by Britechart: heigth
    heigth: did you mean height?
  ```
  Fix the key; don't wrap the call in a try/catch.
- **`null` and `undefined` mean "not set"**, and the chart keeps its default. `false`, `0` and `''` are applied, so `{ isLoading: false }` ends a loading state.
- A command such as `exportChart` takes its first argument as the value: `{ exportChart: 'chart.svg' }` downloads the chart.

## Updating

`update` with empty, `null` or `undefined` data keeps what is already drawn. Use it to change only the configuration: `update(el, null, { isLoading: false }, chart)`.

The element must exist in the document when `create` runs, or it throws `A root container is required: …`. In a framework, create the chart in the mounted hook (`onMounted`, `ngAfterViewInit`, Svelte's `onMount`), not when the component is set up.

## Vue example

```vue
<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { LineWrapper } from '@britecharts/wrappers';

const props = defineProps({ data: Object });
const el = ref(null);
let chart;

onMounted(() => {
    chart = LineWrapper.create(el.value, props.data, {
        width: el.value.getBoundingClientRect().width,
        height: 300,
    });
});
watch(() => props.data, (data) => LineWrapper.update(el.value, data, {}, chart));
onBeforeUnmount(() => LineWrapper.destroy(el.value));
</script>

<template><div ref="el" /></template>
```

## Tooltips

`TooltipWrapper.create(element, config)` takes no data. Its `update` takes a state object, `{ isActive, x, y, dataPoint, topicColorMap }`, not data. For most framework code it's simpler to draw the chart through its wrapper and attach a core `tooltip()` to the chart's svg, as the tooltip section of `SKILL.md` shows, using the chart instance `create` returned.
