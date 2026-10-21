---
'@britecharts/core': minor
---

`exportChart` downloads an svg file when the filename ends in `.svg`, and a png otherwise, as before. The svg has the chart's styles inlined and the optional title, so it looks the same outside the page and stays sharp at any size. React's `exportChart` prop gets it too, on the components that have that prop.
