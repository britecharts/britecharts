import type { WrapperConfiguration } from './configuration';

/**
 * The shape ten of the eleven wrappers share: draw a chart into an element,
 * update it in place, and remove what it drew.
 *
 * `TChart` is the chart module core exports (`BulletChartModule` and so on),
 * which is what gives `configuration` its per-accessor value types.
 *
 * tooltipChart deliberately does not implement this: its `create` takes no
 * data, and its `update` takes a state object where the others take data. It
 * gets its own type rather than widening this one to fit both.
 */
export interface Wrapper<TData, TChart extends object> {
    /**
     * @param el The element to draw into.
     * @param data Bound to the container with `.datum(data)`, as a whole.
     * Bullet is the one exception: it binds `data[0]`, because core types it as
     * `ChartModuleSelection<BulletChartDataShape>` rather than over an array,
     * so its datum is a single object. Do not generalise bullet's shape to the
     * other wrappers.
     * @param configuration Accessors to apply before the first draw.
     * @returns The chart instance, to be handed back to `update` later.
     */
    create(
        el: HTMLElement,
        data: TData[],
        configuration?: WrapperConfiguration<TChart>
    ): TChart;

    /**
     * @param data Empty or missing keeps whatever is already bound, so a
     * configuration-only update does not have to re-send the data.
     * @param chart The instance `create` returned.
     */
    update(
        el: HTMLElement,
        data: TData[] | null | undefined,
        configuration: WrapperConfiguration<TChart> | undefined,
        chart: TChart
    ): TChart;

    /**
     * @param el The element the chart was created in. Missing does nothing: a
     * wrapper can be destroyed before it ever drew.
     *
     * Note this is wider than the `destroy()` the ten unconverted `.js`
     * wrappers still declare, where it is a zero-argument no-op. Passing `el`
     * makes it actually remove the chart's svg, so the changeset for this
     * migration has to call that out as a behaviour change, not just a typing
     * one.
     */
    destroy(el?: HTMLElement | null): void;
}
