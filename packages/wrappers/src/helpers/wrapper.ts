import type {
    TooltipDataShape,
    TooltipModule,
    TopicColorMap,
} from '@britecharts/core';

import type { WrapperConfiguration } from './configuration';

/**
 * The shape nine of the eleven wrappers share: draw a chart into an element,
 * update it in place, and remove what it drew.
 *
 * `TData` is the whole `data` argument, not its element type, so each wrapper
 * says what it actually takes: `Wrapper<BarChartDataShape[], BarChartModule>`
 * for the eight that take an array, `Wrapper<LineChartData, LineChartModule>`
 * for line, whose data is an object (`{ data: LineChartDataShape[] }`) bound
 * directly. Spelling this as `data: TData[]` instead looked right for eight of
 * them and could not express line at all.
 *
 * `TChart` is the chart module core exports (`BarChartModule` and so on),
 * which is what gives `configuration` its per-accessor value types.
 *
 * tooltipChart does not implement this at all: its `create` takes no data, and
 * its `update` takes a state object where the others take data. It gets its
 * own type rather than widening this one to fit both.
 */
export interface Wrapper<TData, TChart extends object> {
    /**
     * @param el The element to draw into.
     * @param data Bound to the container with `.datum(data)`, as a whole.
     * Bullet is the exception: it binds `data[0]`, because core types it as
     * `ChartModuleSelection<BulletChartDataShape>` rather than over an array,
     * so its datum is a single object. Do not generalise bullet's shape to the
     * other wrappers.
     * @param configuration Accessors to apply before the first draw.
     * @returns The chart instance, to be handed back to `update` later.
     */
    create(
        el: HTMLElement,
        data: TData,
        configuration?: WrapperConfiguration<TChart>
    ): TChart;

    /**
     * @param data What happens when this is empty is **not** consistent across
     * the wrappers, and this type deliberately does not claim otherwise:
     * bullet, groupedBar, legend, sparkline, stackedArea and stackedBar guard
     * on `data && data.length` and keep whatever is already bound, while bar,
     * donut and scatterPlot guard on `data` alone, so an empty array is truthy
     * and rebinds, dropping what was drawn. No test pins either behaviour.
     * Missing or null keeps the existing datum in every one of them.
     * @param chart The instance `create` returned.
     */
    update(
        el: HTMLElement,
        data: TData | null | undefined,
        configuration: WrapperConfiguration<TChart> | undefined,
        chart: TChart
    ): TChart;

    /**
     * @param el The element the chart was created in. Missing does nothing: a
     * wrapper can be destroyed before it ever drew.
     *
     * Note this is wider than the `destroy()` the nine unconverted `.js`
     * wrappers still declare, where it is a zero-argument no-op. Passing `el`
     * makes it actually remove the chart's svg, so the changeset for this
     * migration has to call that out as a behaviour change, not just a typing
     * one.
     */
    destroy(el?: HTMLElement | null): void;
}

/**
 * What a framework hands tooltipChart's `update` in place of data: where the
 * pointer is, whether the tooltip should be showing, and what to show.
 *
 * Every field is optional because this arrives as accumulated component state
 * -- react's Tooltip seeds it with `isActive: false`, `dataPoint: null`,
 * `topicColorMap: null` and no position at all, then merges in what each
 * `customMouseMove` dispatches.
 */
export interface TooltipState {
    /** Whether to `show()` or `hide()` the tooltip on this update. */
    isActive?: boolean;
    dataPoint?: TooltipDataShape | null;
    /**
     * `x` and `y` always arrive together or not at all: the consumer gets them
     * by destructuring the chart's `[x, y]` anchor
     * (`const [x, y] = Array.isArray(position) ? position : []`), so there is
     * no case where one is a number and the other is not.
     */
    x?: number;
    y?: number;
    /** Only the multi-value charts dispatch this. */
    topicColorMap?: TopicColorMap | null;
}

/**
 * tooltipChart alone, because it is shaped differently from the other ten:
 * `create` takes no data (it binds an empty datum itself), and `update` takes
 * a {@link TooltipState} where the others take data -- in third position, with
 * the chart last.
 *
 * `destroy` is `removeTooltip` rather than `removeChartSvg`: a tooltip is
 * created into a descendant of the chart it decorates but destroyed against
 * the outermost node, whose svg belongs to that chart.
 */
export interface TooltipWrapper {
    create(
        el: HTMLElement,
        configuration?: WrapperConfiguration<TooltipModule>
    ): TooltipModule;

    update(
        el: HTMLElement,
        configuration: WrapperConfiguration<TooltipModule> | undefined,
        state: TooltipState | undefined,
        chart: TooltipModule
    ): TooltipModule;

    destroy(el?: HTMLElement | null): void;
}
