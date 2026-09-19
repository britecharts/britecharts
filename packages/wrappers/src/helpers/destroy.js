import { select } from 'd3-selection';

/**
 * Removes the svg a chart appended to its container, and nothing else: not
 * the container (a framework owns that node), not its siblings.
 *
 * The core charts only ever append their svg as a direct child of the element
 * they are called on, so that is where this looks.
 * @param  {HTMLElement} el     The element the chart was created in
 */
export const removeChartSvg = (el) => {
    if (!el) {
        return;
    }

    select(el).selectChildren('svg').remove();
};

/**
 * Removes the tooltip group from inside `el`, and never an svg.
 *
 * A tooltip is created into a descendant of the chart it decorates
 * (`.metadata-group`), but is destroyed against the outermost node, whose svg
 * belongs to the chart. Removing that svg here would delete the chart the
 * tooltip is attached to.
 * @param  {HTMLElement} el     An element containing the tooltip
 */
export const removeTooltip = (el) => {
    if (!el) {
        return;
    }

    select(el)
        .selectAll('g.britechart-tooltip, g.britechart-mini-tooltip')
        .remove();
};
