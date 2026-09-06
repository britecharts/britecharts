---
'@britecharts/core': minor
---

Add loading states to the bullet, heatmap and scatter plot charts.

`isLoading` now covers every data chart in the library. These three were the only
ones left without it, and they are exactly the three the community asked for:
[#940](https://github.com/britecharts/britecharts/issues/940),
[#942](https://github.com/britecharts/britecharts/issues/942) and
[#943](https://github.com/britecharts/britecharts/issues/943).

Each gets a skeleton in the shape of its own chart — a grid of boxes for the
heatmap, scattered circles over an axis for the scatter plot, a range bar with a
measure and a marker for the bullet — drawn with the same shimmer as the rest.

The bullet chart draws its loading state before `cleanData()` rather than after:
the state stands in for data that has not arrived, so it must not require a datum
with `ranges`, `measures` and `markers` to exist first.
