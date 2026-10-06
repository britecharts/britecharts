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

// `colorMap`'s getter is nullable, because all eight charts that expose it
// default `nameToColorMap` to null and fall back to the colour scale. Indexing
// the result without a guard is "possibly null".
//
// This is the control for that declaration, and it runs both ways: against the
// old non-null getter the index below compiles, which leaves the directive
// unused and fails the build.
// @ts-expect-error possibly null
legend().colorMap()['one'];

// The donut's two callbacks are read for what they return, so a callback that
// returns nothing is the error. Against the old `=> void` declaration both
// lines below compiled, which left these directives unused and failed the
// build -- the control for a declaration that was too loose rather than wrong.
// @ts-expect-error a centered-text callback has to return the string to render
donut().centeredTextFunction(() => undefined);
// @ts-expect-error a comparator has to return a number
donut().orderingFunction(() => undefined);

// Three of the grouped bar's getters are wider than their setter, because the
// chart has no usable default for any of them: `grid` and `valueLocale` are
// `null` in its own `let` block and `yAxisLabel` has no initialiser. Each line
// below is an unguarded read that must not compile, which is the control for
// the width -- narrowing any of these three getters back to its setter's type
// leaves the directive unused and fails the build with TS2578.
// @ts-expect-error possibly null
groupedBar().grid().length;
// @ts-expect-error possibly null
groupedBar().valueLocale().decimal;
// @ts-expect-error possibly undefined
groupedBar().yAxisLabel().length;
