---
'@britecharts/core': patch
---

Fixed the text-wrapping helper deriving one of its two offsets by string concatenation.

`wrapText` reads the element's `y` with `attr('y')`, which returns a string, and then computes two offsets from it. `y - 5` subtracted numerically, but `y + smallTextOffset` *concatenated*: an element at `y="100"` produced a label positioned at `y="10010"` rather than `110`. It also used `parseFloat` for `dy`, which is `NaN` when the element has no `dy`, rendering the attribute as the string `"NaNem"`.

No chart shipped today is affected — the only caller is the donut chart's centre text, which sets neither `y` nor a numeric `dy`, so both paths already produced the right numbers by accident. This matters for anyone calling the helper directly or wrapping text on an element that is positioned.
