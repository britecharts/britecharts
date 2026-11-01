---
'@britecharts/core': patch
---

Exporting a chart that has not drawn now rejects with an error that says so, and downloads nothing. An svg export used to download a broken file ending in `undefined` and resolve, so it looked like it had worked. Importing core on Node 20 no longer throws a `ReferenceError`, because the check for Internet Explorer now makes sure `navigator` exists before it reads it. Exports also lose a Firefox-only rewrite of the chart's markup, which never ran because it looked for `FireFox` in the user agent and Firefox spells it `Firefox`.
