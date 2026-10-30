import type { Selection } from 'd3-selection';

import type { TooltipDataShape, TooltipModule } from '../tooltip/tooltip.js';

/** The tooltip settings that name a field of the data point a chart sends */
export type TooltipLabelName =
    | 'dateLabel'
    | 'nameLabel'
    | 'topicLabel'
    | 'valueLabel';

export type TooltipLabels = Partial<Record<TooltipLabelName, string>>;

// The labels each tooltip was given through its own setters. A WeakMap, so
// the record goes when the tooltip does, and the tooltip's API stays as it is
const labelsSetByUser = new WeakMap<object, Set<TooltipLabelName>>();

/**
 * Records that a tooltip's label was set through its setter, so a chart
 * never replaces it with the one it would choose. The tooltip's label
 * setters call this.
 * @param  {Object} tooltip   The tooltip module
 * @param  {String} labelName The label's setter name, such as 'topicLabel'
 */
export function markLabelSet(tooltip: object, labelName: TooltipLabelName) {
    const labels = labelsSetByUser.get(tooltip) ?? new Set();

    labels.add(labelName);
    labelsSetByUser.set(tooltip, labels);
}

/**
 * Sets the labels a chart needs on a tooltip, leaving the ones its user set
 * @param  {Object} tooltip The tooltip module
 * @param  {Object} labels  The labels the chart needs, by setter name
 */
export function applyChartLabels(
    tooltip: TooltipModule,
    labels: TooltipLabels
) {
    const setByUser = labelsSetByUser.get(tooltip);

    (Object.keys(labels) as TooltipLabelName[]).forEach((labelName) => {
        if (setByUser?.has(labelName)) {
            return;
        }
        tooltip[labelName](labels[labelName] as string);
        // That call went through the setter, which marked it as the user's
        labelsSetByUser.get(tooltip)?.delete(labelName);
    });
}

/**
 * Connects a tooltip to a chart that has just drawn: sets the labels the
 * chart needs, follows the chart's pointer and keyboard events, and draws
 * the tooltip into the chart's vertical marker, or its metadata group when
 * it has no marker. The events are namespaced, so handlers the user
 * registers on the same events keep running.
 * @param  {Object} chart   The chart module
 * @param  {Object} tooltip The tooltip module
 * @param  {D3Selection} svg The chart's svg
 * @param  {Object} labels  The labels the chart needs
 */
export function connectTooltip(
    chart: {
        on(
            typenames: string,
            callback: ((...args: never[]) => void) | null
        ): unknown;
    },
    tooltip: TooltipModule,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    svg: Selection<any, any, any, any>,
    labels: TooltipLabels
) {
    applyChartLabels(tooltip, labels);
    chart.on('customMouseOver.tooltip', tooltip.show);
    chart.on('customMouseMove.tooltip', tooltip.update);
    chart.on('customMouseOut.tooltip', tooltip.hide);

    const marker = svg.select('.metadata-group .vertical-marker-container');
    const container = marker.empty() ? svg.select('.metadata-group') : marker;

    if (!container.empty()) {
        // `call` types the selection's element as BaseType, which allows null;
        // the tooltip takes an Element, and `empty()` ruled the null out above
        container
            .datum([] as TooltipDataShape[])
            .call(tooltip as unknown as (selection: typeof container) => void);
    }
}

/**
 * Stops a chart's events from reaching the tooltip `connectTooltip` gave it
 * @param  {Object} chart   The chart module
 */
export function disconnectTooltip(chart: {
    on(typenames: string, callback: null): unknown;
}) {
    chart.on('customMouseOver.tooltip', null);
    chart.on('customMouseMove.tooltip', null);
    chart.on('customMouseOut.tooltip', null);
}
