---
'@britecharts/react': patch
---

The package's ES module entry named every component's file with its `.js` extension except `Sparkline`, which is now spelled the same way. A bundler or Node resolver that does not add the extension for you could not follow that one export.
