---
'@britecharts/core': patch
---

Fixed the text-wrapping helper deriving one of its two offsets by string concatenation.

`wrapText` reads the element's `y` with `attr('y')`, which returns a string, and then computes two offsets from it. `y - 5` subtracted numerically, but `y + smallTextOffset` *concatenated*: an element at `y="100"` produced a label positioned at `y="10010"` rather than `110`.

No chart shipped today is affected — the only caller is the donut chart's centre text, which never sets `y`, so `null - 5` and `null + 10` both coerced to the right numbers. This matters for anyone calling the helper directly or wrapping text on an element that is positioned.

The element's `dy` is still read with `parseFloat`, which is what handles the unit it normally carries: donut sets `.donut-text`'s to `.2em`. A `dy` that is absent entirely now falls back to `0` rather than `NaN`, which previously rendered as the string `"NaNem"` — reachable only from a direct caller, since donut always sets one.
