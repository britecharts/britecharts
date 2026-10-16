---
'@britecharts/react': major
---

React publishes its UMD bundle only. The per-component files in `dist/umd/charts/` and `dist/cjs/charts/` are removed: import the components from the package (`import { Donut } from '@britecharts/react'`). The bundle is now built with Vite instead of webpack, with the same exports, and is 11% smaller.
