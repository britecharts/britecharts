---
'@britecharts/wrappers': minor
---

A wrapper's configuration carries the chart's **commands** as well as its accessors.

`ChartConfiguration<TChart>` read each member as an accessor — `(value?) => chart` — and mapped everything else to `never`. A command does not have that shape: legend's `highlight(id)` and a chart's `exportChart(filename, title)` take a required argument and return void. So `legendChart.create(el, data, { highlight: 3 })` was a type error, while `applyConfiguration` called it perfectly well. `highlight` has always worked at run time and has never type-checked.

Each key now contributes its accessor's value type, or, when it has none, the argument its command is called with. The two are chosen per key rather than intersected: intersecting `{ highlight?: never }` with `{ highlight?: number }` gives `never`, so a channel added that way would reject the props it exists to allow.

A command's argument is still checked — `{ highlight: 'three' }` is an error — and only the first argument is reachable, which is all a single configuration value can carry.
