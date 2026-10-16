---
'@britecharts/core': minor
'@britecharts/wrappers': minor
'@britecharts/react': minor
---

Charts announce themselves to screen readers. Every chart that draws its own
svg gives it `role="img"`, a `<title>` and, when one is set, a `<desc>`,
linked with `aria-labelledby` and `aria-describedby`. The legend takes
`role="group"` instead, so its entries stay readable.

Two new accessors set the text, on all twelve charts: `a11yTitle` (unset, the
chart is announced by its type, such as "Bar chart") and `a11yDescription`
(unset, there is none). Both getters read `null` until set. The wrappers take
them as configuration, and the ten React chart components as `a11yTitle` and
`a11yDescription` props.
