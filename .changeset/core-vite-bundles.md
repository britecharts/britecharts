---
'@britecharts/core': patch
---

Core's UMD bundles, CDN bundles and stylesheets are now built with Vite instead of webpack. Every file keeps its path, and every bundle exposes the same exports through CommonJS, AMD and the `core.<chart>` global. Files are a few percent smaller. The stylesheets have the same rules, with selectors in source order.
