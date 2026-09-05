---
'@britecharts/core': major
'@britecharts/react': major
'@britecharts/wrappers': major
---

Define what each package publishes.

- `@britecharts/core` drops from 22.1 MB unpacked to 3.7 MB: the built Storybook, source maps, specs, stories, fixtures and data builders are no longer published. This is the cause of the "package size too large" report on jsDelivr.
- `@britecharts/react`'s `main` pointed at `dist/umd/bundle/react.min.js`, which the build never produced — it emits `react.bundled.min.js`. `require('@britecharts/react')` would have failed on a published package.
