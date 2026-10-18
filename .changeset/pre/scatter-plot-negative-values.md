---
'@britecharts/core': minor
---

The scatter plot draws negative values. Its value axis now runs from below zero when the data does, and each circle's size shows the magnitude of its value, so -50 draws as large as 50. Before, the axis always started at 0 and points with a negative value were not drawn. Clicking a point bounces it to the size it reached before the radius scale was clamped.
