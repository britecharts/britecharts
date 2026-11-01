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
    treemap,
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
treemap().width('wide');
// @ts-expect-error a treemap entry needs a name
treemap().render('#chart', [{ value: 1 }]);
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
// This is the control for that declaration: against a non-null getter the
// index below compiles, which leaves the directive unused and fails the build.
// @ts-expect-error possibly null
legend().colorMap()['one'];

// The donut's two callbacks are read for what they return, so a callback that
// returns nothing is the error. Against a `=> void` declaration both lines
// below compile, which leaves these directives unused and fails the build --
// the control for a declaration that is too loose rather than wrong.
// @ts-expect-error a centered-text callback has to return the string to render
donut().centeredTextFunction(() => undefined);
// @ts-expect-error a comparator has to return a number
donut().orderingFunction(() => undefined);

// @ts-expect-error possibly null: no default format, where the shared
// declaration promises a string
donut().numberFormat().length;

// Three of the grouped bar's getters are wider than their setter, because the
// chart has no usable default for any of them: `grid`, `valueLocale` and
// `yAxisLabel` are all `null` in its own `let` block. Each line
// below is an unguarded read that must not compile, which is the control for
// the width -- narrowing any of these three getters back to its setter's type
// leaves the directive unused and fails the build with TS2578.
// @ts-expect-error possibly null
groupedBar().grid().length;
// @ts-expect-error possibly null
groupedBar().valueLocale().decimal;
// @ts-expect-error possibly null
groupedBar().yAxisLabel().length;

// The stacked bar has the same three, for the same reasons.
// @ts-expect-error possibly null
stackedBar().grid().length;
// @ts-expect-error possibly null
stackedBar().valueLocale().decimal;
// @ts-expect-error possibly null
stackedBar().yAxisLabel().length;

// The bar chart's four nullable getters and its undefined one.
// @ts-expect-error possibly null
bar().chartGradient()[0];
// @ts-expect-error possibly null
bar().xAxisLabel().length;
// @ts-expect-error possibly null
bar().yAxisLabel().length;
// @ts-expect-error possibly null
bar().valueLocale().decimal;
// @ts-expect-error possibly undefined
bar().orderingFunction()({ name: 'a', value: 1 }, { name: 'b', value: 2 });

// `orderingFunction` goes to `Array.prototype.sort`, which reads the sign of
// what the comparator returns, so a callback returning nothing is the error.
// Against a `=> void` declaration this compiles, which leaves the directive
// unused and fails the build -- the control for a declaration that is too
// loose rather than merely incomplete.
// @ts-expect-error a comparator has to return a number
bar().orderingFunction(() => undefined);

// The scatter plot's six nullable getters.
// @ts-expect-error possibly null
scatterPlot().grid().length;
// @ts-expect-error possibly null
scatterPlot().valueLocale().decimal;
// @ts-expect-error possibly null
scatterPlot().yTicks().toFixed(0);
// @ts-expect-error possibly null
scatterPlot().xAxisLabel().length;
// @ts-expect-error possibly null
scatterPlot().yAxisLabel().length;

// The tooltip's four nullable getters.
// @ts-expect-error possibly null
tooltip().dateCustomFormat().length;
// @ts-expect-error possibly null
tooltip().numberFormat().length;
// @ts-expect-error possibly null
tooltip().valueFormatter()(1);
// @ts-expect-error possibly null
tooltip().locale().length;

// The stacked area's nullable getters, and the x-axis value the chart does not
// recognise -- `'numeric'` must not type-check, since it would do nothing.
// @ts-expect-error possibly null
stackedArea().grid().length;
// @ts-expect-error possibly null
stackedArea().xTicks().toFixed(0);
// @ts-expect-error possibly undefined
stackedArea().topicsOrder().length;
// @ts-expect-error possibly null
stackedArea().yAxisLabel().length;
// @ts-expect-error possibly null: no default format, where the shared
// declaration promises a string
stackedArea().numberFormat().length;
// @ts-expect-error the chart compares against 'number', not 'numeric'
stackedArea().xAxisValueType('numeric');

// The line chart's four nullable getters, and the same x-axis value it does
// not recognise.
// @ts-expect-error possibly null
line().grid().length;
// @ts-expect-error possibly null
line().xAxisLabel().length;
// @ts-expect-error possibly null
line().yAxisLabel().length;
// @ts-expect-error possibly null
line().xTicks().toFixed(0);
// @ts-expect-error possibly null: no default format, where the shared
// declaration promises a string
line().numberFormat().length;
// @ts-expect-error the chart compares against 'number', not 'numeric'
line().xAxisValueType('numeric');
// Bullet and the sparkline draw no title or subtitle: the accessors do not
// exist, and these fail to compile if one comes back.
// @ts-expect-error removed in 3.0.0
bullet().customTitle('CPU');
// @ts-expect-error removed in 3.0.0
bullet().customSubtitle('GHz');
// @ts-expect-error removed in 3.0.0
sparkline().titleText('Signups');
// @ts-expect-error removed in 3.0.0
sparkline().titleTextStyle({ 'font-size': '1.5em' });
