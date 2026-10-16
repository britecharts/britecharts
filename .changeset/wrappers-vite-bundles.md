---
'@britecharts/wrappers': major
---

Wrappers publishes its UMD and CommonJS bundles only. The per-chart UMD files in `dist/umd/charts/` are removed: import the wrappers from the package (`import { BarWrapper } from '@britecharts/wrappers'`), or use the bundle's `wrappers` global. The bundles are now built with Vite instead of webpack, with the same exports.
