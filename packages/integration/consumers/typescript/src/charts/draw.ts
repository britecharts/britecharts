// Drawing a chart -- `selection.call(chart)` -- is the one thing every
// consumer of this library does, and until this file nothing here did it.
//
// That gap hid a real defect in the published typings: `ChartModuleSelection`
// declared a second `_data` parameter that no chart has and `d3.call` never
// passes, so every correct `.call(chart)` failed to compile with "Expected 2
// arguments, but got 1". The rest of this consumer only ever constructs charts
// and sets accessors, which is why it stayed green.
//
// One call per chart factory, through a real d3 selection, so the signature is
// exercised the way a consumer meets it.
import { select } from 'd3-selection';
import {
  bar,
  brush,
  bullet,
  donut,
  groupedBar,
  heatmap,
  legend,
  line,
  scatterPlot,
  sparkline,
  stackedArea,
  stackedBar,
} from '@britecharts/core';

import { SAMPLE_BAR_DATA } from '../data/bar-sample';
import { SAMPLE_BRUSH_DATA } from '../data/brush-sample';
import { SAMPLE_BULLET_DATA } from '../data/bullet-sample';
import { SAMPLE_DONUT_DATA } from '../data/donut-sample';
import { SAMPLE_GROUPED_BAR_DATA } from '../data/grouped-bar-sample';
import { SAMPLE_HEATMAP_DATA } from '../data/heatmap-sample';
import { SAMPLE_LEGEND_DATA } from '../data/legend-sample';
import { SAMPLE_LINE_CHART_DATA } from '../data/line-chart-sample';
import { SAMPLE_SCATTER_PLOT_DATA } from '../data/scatter-plot-sample';
import { SAMPLE_SPARKLINE_DATA } from '../data/sparkline-sample';
import { SAMPLE_STACKED_AREA_DATA } from '../data/stacked-area-sample';
import { SAMPLE_STACKED_BAR_DATA } from '../data/stacked-bar-sample';

export const drawAll = (node: HTMLElement) => {
  select(node).datum(SAMPLE_BAR_DATA).call(bar());
  select(node).datum(SAMPLE_BRUSH_DATA).call(brush());
  select(node).datum(SAMPLE_BULLET_DATA).call(bullet());
  select(node).datum(SAMPLE_DONUT_DATA).call(donut());
  select(node).datum(SAMPLE_GROUPED_BAR_DATA).call(groupedBar());
  select(node).datum(SAMPLE_HEATMAP_DATA).call(heatmap());
  select(node).datum(SAMPLE_LEGEND_DATA).call(legend());
  select(node).datum(SAMPLE_LINE_CHART_DATA).call(line());
  select(node).datum(SAMPLE_SCATTER_PLOT_DATA).call(scatterPlot());
  select(node).datum(SAMPLE_SPARKLINE_DATA).call(sparkline());
  select(node).datum(SAMPLE_STACKED_AREA_DATA).call(stackedArea());
  select(node).datum(SAMPLE_STACKED_BAR_DATA).call(stackedBar());
};
