---
'@britecharts/core': major
---

Core's accessors now declare their getter, not just their setter.

Every accessor in this library is a get-or-set pair — `if (!arguments.length) { return value; }` — but the published typings described only one of the two:

```ts
width(width?: number): T & ChartBaseAPI<T>;
```

That says `chart.width()` hands back the chart. It hands back a number. The same was true of `height`, `margin`, `isLoading`, `numberFormat`, `colorSchema`, `colorMap`, `isAnimated`, `animationDuration`, `locale` and `xAxisCustomFormat` — every shared accessor of every chart. A consumer could not assign one to a typed variable:

```ts
const w: number = chart.width();
// Type 'ChartModuleSelection<...> & ChartBaseAPI<...>' is not assignable to type 'number'
```

Each is now a pair of overloads, so both halves are described:

```ts
width(): number;
width(width: number): T & ChartBaseAPI<T>;
```

**Breaking**, in two ways, both type-only — no runtime behaviour changes at all:

- Code that relied on the getter's wrong return type, for example assigning `chart.width()` to a variable annotated as the chart, no longer compiles. It never worked at runtime.
- Calling a setter with an explicit `undefined` — `chart.width(undefined)` — no longer matches either overload. Previously the single `width?: number` signature accepted it. At runtime that call is a *get*, not a set, so this is the type catching a mistake it used to wave through.

Chaining is unaffected: `bar().width(100).height(200)` still returns the chart, which is what the setter overload says.

Found while converting core's charts to TypeScript. An implementation cannot be typed against a declaration that contradicts it — the getter branch's `return width;` does not compile when the declaration promises the chart — so this had to be settled before the first chart could convert.

`packages/integration`'s TypeScript consumer gained `src/charts/accessors.ts`, which reads every shared accessor into a typed variable and chains the setters alongside. Nothing there had ever *read* an accessor, which is exactly why this survived so long; the file fails with 18 type errors against the old declarations and compiles clean against the new ones, under both the `node` and `bundler` resolution tiers.

Chart-specific accessors (`boxSize`, `yAxisLabels` and the rest, declared per chart rather than in the shared interfaces) are corrected along with each chart's own conversion.
