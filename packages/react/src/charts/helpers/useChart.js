import { useLayoutEffect, useRef } from 'react';

const noop = () => null;

/**
 * The configuration is rebuilt from the props on every render, so it can never
 * be compared by identity, which is what a deps array would have to do. Compare
 * what was drawn last with what is about to be, field by field. Delete this and
 * its call site to get back to redrawing on every render.
 * @param  {Object} previous    What was drawn last, or null
 * @param  {Object} next        What is about to be drawn
 * @return {boolean}
 */
const isSameDrawing = (previous, next) => {
    if (!previous) {
        return false;
    }

    const keys = Object.keys(next);

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
 * @param  {Object} wrapper                 The chart wrapper
 * @param  {Object|Array} data              The data to draw
 * @param  {Object} configuration           What the wrapper is configured with
 * @param  {Object} [options]
 * @param  {Function} [options.createTooltip]   Asked for again after each update
 * @param  {boolean} [options.requiresData=true]    Do not create the chart while data is null
 * @return {Object} The ref for the container element
 */
export default function useChart(
    wrapper,
    data,
    configuration,
    { createTooltip = noop, requiresData = true } = {}
) {
    const rootNode = useRef(null);
    const chartInstance = useRef(null);
    const chartWrapper = useRef(wrapper);
    const lastDrawn = useRef(null);

    // No deps array on purpose: creating and updating live in one effect that
    // branches on whether a chart exists, so creation stays reachable on any
    // render (the data arriving after mount) and a StrictMode remount
    // recreates the chart.
    useLayoutEffect(() => {
        chartWrapper.current = wrapper;

        const drawing = { data, ...configuration };

        if (chartInstance.current) {
            if (isSameDrawing(lastDrawn.current, drawing)) {
                return;
            }

            lastDrawn.current = drawing;
            wrapper.update(
                rootNode.current,
                data,
                configuration,
                chartInstance.current
            );
            // After the update, and never after the creation
            createTooltip();

            return;
        }

        if (requiresData && data === null) {
            return;
        }

        lastDrawn.current = drawing;
        chartInstance.current = wrapper.create(
            rootNode.current,
            data,
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
