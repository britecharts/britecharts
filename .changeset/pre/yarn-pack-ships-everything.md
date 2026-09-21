---
"@britecharts/core": patch
"@britecharts/wrappers": patch
"@britecharts/react": patch
---

Publish what the `files` field promises. Yarn's packer (which `yarn release`
uses) treated `dist/umd` as a pattern that matched nothing and ignored the `!`
exclusions, so core would have shipped without its CSS, CDN and per-chart
builds, react without its CommonJS builds, and all three with their spec and
story files. The patterns now use `dist/umd/**` form, Yarn is bumped to 3.8.7
where the exclusions work, and each `build` cleans `dist/` itself because Yarn
Berry never ran the `prebuild` hook (stale files were surviving into the
tarball). The React library builds also no longer emit a stray `index.html`.
