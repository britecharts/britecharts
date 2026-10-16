---
'@britecharts/core': major
---

Core publishes one UMD bundle and one CDN bundle instead of a file per chart. `dist/umd/charts/` and `dist/cdn/charts/` are removed: import the charts from the package, or load `dist/cdn/bundle/core.cdn.min.js` and use the `core` global (`core.bar()`, `core.colors`). The stylesheets, per-chart ones included, are unchanged.

The bundles and stylesheets are now built with Vite instead of webpack. `require('@britecharts/core')` keeps every named export and now also has `default`, the same object, as the type declarations describe.
