// One wrong call per chart factory. If a typing regresses to `any`, the
// expect-error directive below it becomes unused and tsc fails the build.
import {
    bar,
    brush,
    bullet,
    donut,
    groupedBar,
    heatmap,
    legend,
    line,
    miniTooltip,
    scatterPlot,
    sparkline,
    stackedArea,
    stackedBar,
    tooltip,
    colors,
} from '@britecharts/core';

// @ts-expect-error width takes a number
bar().width('wide');
// @ts-expect-error margin is an object
brush().margin(10);
// @ts-expect-error height takes a number
bullet().height('tall');
// @ts-expect-error width takes a number
donut().width('wide');
// @ts-expect-error isAnimated takes a boolean
groupedBar().isAnimated('yes');
// @ts-expect-error width takes a number
heatmap().width('wide');
// @ts-expect-error width takes a number
legend().width('wide');
// @ts-expect-error isAnimated takes a boolean
line().isAnimated('yes');
// @ts-expect-error not a method
miniTooltip().nope();
// @ts-expect-error width takes a number
scatterPlot().width('wide');
// @ts-expect-error width takes a number
sparkline().width('wide');
// @ts-expect-error width takes a number
stackedArea().width('wide');
// @ts-expect-error width takes a number
stackedBar().width('wide');
// @ts-expect-error not a method
tooltip().nope();
// @ts-expect-error not a colour schema
colors.colorSchemas.nope;
