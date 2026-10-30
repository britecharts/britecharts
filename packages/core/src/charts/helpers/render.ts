import { select } from 'd3-selection';
import type { Selection } from 'd3-selection';

import type { ChartRenderTarget } from '../../typings/common/base.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySelection = Selection<any, any, any, any>;

/**
 * A d3 selection, recognised by its methods rather than with `instanceof`:
 * on a CDN page the page's own d3 is a different copy from the bundle's, and
 * its selections are not instances of the bundle's class.
 */
const isSelection = (target: unknown): target is AnySelection =>
    typeof (target as AnySelection | null)?.node === 'function' &&
    typeof (target as AnySelection | null)?.each === 'function';

/**
 * Draws a chart into a target, as `select(target).datum(data).call(chart)`
 * does, so a page needs no d3 code of its own. The charts' `render` accessor
 * calls this.
 * @param  {Function} chart   The chart module to draw
 * @param  {String | Element | D3Selection} target Where to draw it
 * @param  {Object} [data]    The data to draw; left out, the chart redraws
 *                            with the data already bound to the target
 * @return {Function}         The chart, to chain calls
 */
export function renderChart<TChart>(
    chart: TChart,
    target: ChartRenderTarget,
    data?: unknown
): TChart {
    const container: AnySelection = isSelection(target)
        ? target
        : select(target as string);

    if (container.empty()) {
        throw new Error(
            isSelection(target)
                ? 'Britecharts: the selection passed to render is empty'
                : `Britecharts: no element matches "${String(target)}"`
        );
    }
    if (data !== undefined) {
        container.datum(data);
    }
    container.call(chart as unknown as (selection: AnySelection) => void);

    return chart;
}
