import { select } from 'd3-selection';

/**
 * Removes the svg a chart appended to its container, and the data table it
 * links with `aria-details`, and nothing else: not the container (a framework
 * owns that node), not its other children.
 *
 * The core charts only ever append their svg, and the table after it, as
 * direct children of the element they are called on, so that is where this
 * looks.
 *
 * @param el The element the chart was created in. Missing is allowed and does
 * nothing: a wrapper can be destroyed before it ever drew.
 */
export const removeChartSvg = (el?: HTMLElement | null) => {
    if (!el) {
        return;
    }

    select(el)
        .selectChildren<SVGSVGElement, unknown>('svg')
        .each(function () {
            const tableId = this.getAttribute('aria-details');

            Array.from(el.children)
                .find((child) => tableId && child.id === tableId)
                ?.remove();
        })
        .remove();
};

/**
 * Removes the tooltip group from inside `el`, and never an svg.
 *
 * A tooltip is created into a descendant of the chart it decorates
 * (`.metadata-group`), but is destroyed against the outermost node, whose svg
 * belongs to the chart. Removing that svg here would delete the chart the
 * tooltip is attached to.
 *
 * @param el An element containing the tooltip. Missing is allowed and does
 * nothing.
 */
export const removeTooltip = (el?: HTMLElement | null) => {
    if (!el) {
        return;
    }

    select(el)
        .selectAll('g.britechart-tooltip, g.britechart-mini-tooltip')
        .remove();
};
