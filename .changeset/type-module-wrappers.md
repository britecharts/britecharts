---
'@britecharts/wrappers': major
---

The package is now an ES module package (`"type": "module"`), so `import` works in Node as well as in bundlers, with matching types under each condition. `require` still works and resolves to the CommonJS bundle, renamed from `.js` to `.cjs` (`dist/umd/bundle/wrappers.bundled.min.cjs` and `dist/cjs/bundle/wrappers.bundled.min.cjs`). Update any deep path that named the old file.
