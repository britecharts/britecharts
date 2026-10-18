---
'@britecharts/core': patch
---

A chart's `valueLocale` applies to that chart only. The bar, grouped bar, stacked bar and scatter plot set it as d3-format's default locale, so one chart's locale changed the numbers of every other chart on the page, and any `d3.format` call. They now build a formatter from it without touching the default. The scatter plot's x axis also uses it, which it did before only through that side effect.
