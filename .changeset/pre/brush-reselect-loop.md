---
'@britecharts/core': patch
---

The brush no longer flickers when a new window is selected over an earlier one, and reports each selection once. After a selection, the brush eased it to whole days with a transition, and the end of that transition was taken for a new selection: it started another, so the brush looped for as long as it was on the page, fired `customBrushEnd` about every quarter second, and drew a new selection back towards the previous one while it was dragged.
