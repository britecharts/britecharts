---
'@britecharts/react': patch
---

`prop-types` is no longer a peer dependency. The components dropped their PropTypes when they moved to TypeScript, and nothing in the package imports it any more, so a consumer no longer has to install it. The UMD bundle's `prop-types` external goes with it.
