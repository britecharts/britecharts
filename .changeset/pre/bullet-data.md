---
'@britecharts/core': patch
---

The bullet chart sorts its values as numbers. It compared them as text, so values with different numbers of digits, such as `[90, 100, 250]`, drew in the wrong order, and a wide band could cover a narrower one. `markers` is now optional: leave it out for a bullet with no target. A single measure now always draws at full strength: its tone depended on the number of ranges, so with three bands it looked like a forecast.
