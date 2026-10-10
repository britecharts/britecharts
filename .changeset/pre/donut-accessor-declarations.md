---
'@britecharts/core': major
---

The donut chart's declarations match what it actually does. Two wrong callback types, and eleven setter-only accessors.

**`centeredTextFunction` and `orderingFunction` were declared `=> void`**, and the chart reads both for what they return: the first's result goes to `.text()`, the second's to `.sort()`. The chart's own defaults say what they really are — `(d) => \`${d.percentage}% ${d.name}\`` and `(a, b) => b.quantity - a.quantity`.

TypeScript lets a value-returning function satisfy a `=> void` parameter, so a consumer's correct callback always compiled, which is why this went unnoticed. Two things were broken anyway: reading either accessor back gave a function whose result was `void` and unusable, and the declaration accepted a callback that returns nothing — a comparator returning `undefined` would have left the slices unsorted.

**Its eleven own accessors were setter-only**, so reading one reported the chart rather than its value: `centeredTextFunction`, `emptyDataConfig`, `externalRadius`, `hasFixedHighlightedSlice`, `hasHoverAnimation`, `hasLastHoverSliceHighlighted`, `highlightSliceById`, `internalRadius`, `orderingFunction`, `percentageFormat` and `radiusHoverOffset` are each a getter/setter overload pair now. `highlightSliceById`'s getter is `number | undefined`: the chart has no default and only highlights a slice once an id arrives.

**Breaking**, type-only: code relying on one of those getters' wrong return type no longer compiles, a callback that returns nothing is now rejected, and those setters no longer accept an explicit `undefined`.

Found while preparing the donut's TypeScript conversion, which lands separately. `packages/integration`'s TypeScript consumer reads all eleven and uses both callbacks for their results; `expect-errors.ts` holds the control for the two that were too loose rather than wrong, since reinstating `=> void` leaves those directives unused and fails the build.
