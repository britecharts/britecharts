---
'@britecharts/core': patch
---

The stylesheets' SCSS sources use the Sass module system: `@use` in place of `@import`, the palette pulled in as a namespaced module by each partial, and `color.adjust` in place of the deprecated `desaturate()`. The compiled CSS is identical, so nothing changes for anyone loading the built stylesheets; a project that compiles the `src/styles` sources itself can keep `@import`-ing them or switch to `@use`, and no longer sees Dart Sass's deprecation warnings from them.
