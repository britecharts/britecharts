---
title: Keyboard helpers
---

<a name="enableKeyboardNavigation" id="enableKeyboardNavigation"></a>

## enableKeyboardNavigation
Lets a keyboard move through a chart's data points: the svg takes one tab
stop, the arrow keys move between points (up and down by a row on a grid),
Home and End go to the first and last, and Escape, or leaving the chart,
lets go. Each move fires the mouse events a pointer would, so the chart's
own hover behaviour, its custom events and the tooltip follow focus.

Run on every render: it keeps one set of listeners per svg, and reads the
stops on each key press, so they follow the data.

**Kind**: global constant  
