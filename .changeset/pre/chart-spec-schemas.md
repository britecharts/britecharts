---
'@britecharts/wrappers': minor
---

Add a JSON Schema for each chart's spec, `{ chart, config, data }`, and check configuration values in the wrappers. The schemas are generated from the TypeScript types the wrappers take, published at `https://britecharts.github.io/britecharts/schema/v3/<chart>.json` and shipped as `@britecharts/wrappers/schemas/<chart>.json`, so editors and coding agents can check a spec before drawing it. `create` and `update` now also throw on a value of the wrong type, naming the type it should be, such as `height: expected a number, got the string "300"`, alongside the existing check for keys a chart doesn't have. `undefined` and `null` values are still skipped.
