import { useLayoutEffect, useRef } from 'react';

import type { Wrapper, WrapperConfiguration } from '@britecharts/wrappers';

const noop = () => null;

/**
 * What a drawing is: the data and the configuration that produced it, flattened
 * into one object so it can be compared field by field.
 */
type Drawing<TData, TChart extends object> = WrapperConfiguration<TChart> & {
    data: TData | null;
};

/**
 * The configuration is rebuilt from the props on every render, so it can never
 * be compared by identity, which is what a deps array would have to do. Compare
 * what was drawn last with what is about to be, field by field. Delete this and
 * its call site to get back to redrawing on every render.
 *
 * @param previous What was drawn last, or null
 * @param next What is about to be drawn
 */
const isSameDrawing = <TData, TChart extends object>(
    previous: Drawing<TData, TChart> | null,
    next: Drawing<TData, TChart>
) => {
    if (!previous) {
        return false;
    }

    const keys = Object.keys(next) as (keyof Drawing<TData, TChart>)[];

    return (
        keys.length === Object.keys(previous).length &&
        keys.every((key) => Object.is(previous[key], next[key]))
    );
};

/**
 * Drives a Britecharts wrapper (create, update, destroy) from a function
 * component, and returns the ref to put on the container element.
 *
 * Layout effects flush synchronously inside React's commit, before paint,
 * which is what componentDidMount and componentDidUpdate did.
 *
 * The wrapper is typed as the `Wrapper` the wrappers package publishes rather
 * than as a shape of react's own, so the two cannot drift: `TChart` is the
 * chart module core exports, and it is what gives `configuration` its
 * per-accessor value types. Every component that calls this hook passes a
 * data-taking wrapper; `Tooltip` is shaped differently (no data, a state object
 * on update) and drives its own effect instead of this hook.
 *
 * @param wrapper The chart wrapper
 * @param data The data to draw
 * @param configuration What the wrapper is configured with
 * @param options.createTooltip Asked for again after each update
 * @param options.requiresData Do not create the chart while data is null
 * @returns The ref for the container element
 */
export default function useChart<TData, TChart extends object>(
    wrapper: Wrapper<TData, TChart>,
    data: TData | null,
    configuration: WrapperConfiguration<TChart>,
    {
        createTooltip = noop,
        requiresData = true,
    }: { createTooltip?: () => void; requiresData?: boolean } = {}
) {
    const rootNode = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<TChart | null>(null);
    const chartWrapper = useRef(wrapper);
    const lastDrawn = useRef<Drawing<TData, TChart> | null>(null);

    // No deps array on purpose: creating and updating live in one effect that
    // branches on whether a chart exists, so creation stays reachable on any
    // render (the data arriving after mount) and a StrictMode remount
    // recreates the chart.
    useLayoutEffect(() => {
        chartWrapper.current = wrapper;

        const drawing = { data, ...configuration };

        // The ref is attached by the time a layout effect runs, which is the
        // same guarantee the untyped version relied on.
        const node = rootNode.current as HTMLDivElement;

        if (chartInstance.current) {
            if (isSameDrawing(lastDrawn.current, drawing)) {
                return;
            }

            lastDrawn.current = drawing;
            wrapper.update(node, data, configuration, chartInstance.current);
            // After the update, and never after the creation
            createTooltip();

            return;
        }

        if (requiresData && data === null) {
            return;
        }

        lastDrawn.current = drawing;
        // `requiresData: false` means the caller has chosen to create the chart
        // before its data arrives, so null reaches `create` by design -- a
        // spec pins that it is passed through rather than replaced.
        chartInstance.current = wrapper.create(
            node,
            data as TData,
            configuration
        );
    });

    // Mount and unmount only. Nothing the cleanup reads may come from a render
    // closure: the node is captured inside this effect and the wrapper comes
    // from a ref, so it is the one the last render was given.
    useLayoutEffect(() => {
        const node = rootNode.current;

        return () => {
            chartWrapper.current.destroy(node);
            chartInstance.current = null;
            lastDrawn.current = null;
        };
    }, []);

    return rootNode;
}
