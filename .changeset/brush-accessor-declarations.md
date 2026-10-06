---
'@britecharts/core': major
---

The brush chart's declarations match what it actually does. Three defects, two of them the kind that compiles and then fails the consumer.

**Three inherited surfaces were parameterised with the wrong type.** `BrushChartAPI` extended `AnimatedChartAPI<BrushChartAPI>`, `TimeSeriesChartAPI<BrushChartAPI>` and `InteractiveChartAPI<BrushChartAPI>`, where every other chart passes its Module. Those interfaces return `T & XAPI<T>`, so `brush().isAnimated(true)` reported `BrushChartAPI & AnimatedChartAPI<BrushChartAPI>` — a type with no `ChartModuleSelection` in it. The result could not be passed to `selection.call()`, and chaining off it lost the rest of the chart. So `d3.select(...).datum(data).call(brush().isAnimated(true))` did not compile, although it works at runtime. The `ChartBaseAPIMinimal<BrushChartModule>` on the line above had it right.

**`roundingTimeInterval`'s setter returned `BrushChartKeys`** — the `'value' | 'date'` data-key enum, which this accessor has nothing to do with. It holds a d3 time interval name such as `'timeDay'`, and setting it returns the module like every other accessor, so the declared type made it unchainable and described the wrong domain entirely.

**Its six own accessors were setter-only**, so reading one reported the chart rather than its value: `areaCurve`, `dateRange`, `gradient`, `isLocked`, `roundingTimeInterval` and `xTicks` are each a getter/setter overload pair now. Two getters are nullable, matching the defaults the chart really has — `dateRange` is `[null, null]` until both ends are set, and `xTicks` is `null`, which leaves the tick count to d3.

**Breaking**, type-only: code relying on one of those getters' wrong return type no longer compiles, and those setters no longer accept an explicit `undefined`. Everything this fixes was previously a compile error for consumers doing the correct thing.

Found while preparing the brush chart's TypeScript conversion, which lands separately. `packages/integration`'s TypeScript consumer now asserts all three, and each is controlled: reinstating either the `BrushChartAPI` generics or the `BrushChartKeys` return fails the consumer build on its own.

Note that `check:api-parity` passed brush at 17 exposed / 17 declared throughout. It compares accessor *names* in both directions and cannot see a wrong return type, a wrong generic argument or a missing getter overload — so this class of defect is still found only by converting a chart or by typing a consumer against it.
