---
'@britecharts/core': minor
---

`brush` honours `locale`, which it has always declared.

The accessor stored the value and nothing read it, so setting it did nothing at all. `getTimeSeriesAxis` takes a locale as its fourth argument — `line` passes it, and brush passed three arguments — so the x axis always formatted its ticks in d3's default English however the accessor was set.

This is the same shape as the `stackedArea.numberFormat` bug: an accessor that looks configurable and is inert. One line.

The test asserts the rendered tick text rather than the accessor, because a getter/setter pair passes trivially and would have passed against this bug too. Controlled by removing the argument again: both axes then render identical English ticks and the test fails.
