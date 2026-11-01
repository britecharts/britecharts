import bar from './charts/bar/bar.js';
import donut from './charts/donut/donut.js';
import legend from './charts/legend/legend.js';
import line from './charts/line/line.js';
import tooltip from './charts/tooltip/tooltip.js';
import miniTooltip from './charts/mini-tooltip/mini-tooltip.js';
import sparkline from './charts/sparkline/sparkline.js';
import stackedArea from './charts/stacked-area/stacked-area.js';
import scatterPlot from './charts/scatter-plot/scatter-plot.js';
import groupedBar from './charts/grouped-bar/grouped-bar.js';
import stackedBar from './charts/stacked-bar/stacked-bar.js';
import heatmap from './charts/heatmap/heatmap.js';
import treemap from './charts/treemap/treemap.js';
import brush from './charts/brush/brush.js';
import bullet from './charts/bullet/bullet.js';
import colors from './charts/helpers/color.js';
import { axisTimeCombinations } from './charts/helpers/constants.js';

// The public constants. Deliberately a curated subset of helpers/constants:
// the rest (curve maps, time intervals, gradient ids) is internal.
const constants = { axisTimeCombinations };

// The public types, re-exported so the generated declaration for this file is
// the whole package surface -- values above, types here. `types` points at
// that declaration.
//
// `export type *` rather than `export *`, which is a deliberate narrowing.
// Each chart module also exports a `*Keys` enum, and an enum is a value as
// well as a type: `export *` would put fourteen of them into the bundle and
// into the package's runtime surface, which does not include them. Type-only
// keeps them out, so a consumer importing one as a value gets a compile error
// (TS1362) rather than `undefined` at run time. Enum members still work where
// the data shapes use them, in type position.
export type * from './charts/bar/bar.js';
export type * from './charts/brush/brush.js';
export type * from './charts/bullet/bullet.js';
export type * from './charts/donut/donut.js';
export type * from './charts/grouped-bar/grouped-bar.js';
export type * from './charts/heatmap/heatmap.js';
export type * from './charts/legend/legend.js';
export type * from './charts/line/line.js';
export type * from './charts/mini-tooltip/mini-tooltip.js';
export type * from './charts/scatter-plot/scatter-plot.js';
export type * from './charts/sparkline/sparkline.js';
export type * from './charts/stacked-area/stacked-area.js';
export type * from './charts/stacked-bar/stacked-bar.js';
export type * from './charts/tooltip/tooltip.js';
export type * from './charts/treemap/treemap.js';
export type * from './typings/common/grid.js';
export type * from './typings/common/local.js';
export type * from './typings/helpers/colors.js';
export type * from './typings/helpers/constants.js';

export {
    bar,
    donut,
    legend,
    line,
    tooltip,
    miniTooltip,
    sparkline,
    stackedArea,
    scatterPlot,
    groupedBar,
    stackedBar,
    heatmap,
    treemap,
    brush,
    bullet,
    colors,
    constants,
};

const britecharts = {
    bar,
    donut,
    legend,
    line,
    tooltip,
    miniTooltip,
    sparkline,
    stackedArea,
    scatterPlot,
    groupedBar,
    stackedBar,
    heatmap,
    treemap,
    brush,
    bullet,
    colors,
    constants,
};

export default britecharts;
