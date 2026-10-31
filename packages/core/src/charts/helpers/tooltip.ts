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

// The namespace the chart's tooltip handlers go under, so handlers the user
// registers on the same events, with or without a namespace of their own,
// keep running
const NAMESPACE = 'britechartsTooltip';

// The chart each tooltip is set on: a tooltip draws into one chart only
const owners = new WeakMap<object, object>();

// The group each tooltip last drew, so a chart can take it out again
const groups = new WeakMap<object, Element>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ChartWithEvents = { on(typenames: string, callback: any): unknown };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TooltipCallback = (dataPoint: any, ...rest: any[]) => unknown;

/**
 * Records the group a tooltip drew itself in. The tooltip calls this each
 * time it builds one.
 * @param  {Object} tooltip The tooltip module
 * @param  {Element} group  The tooltip's group
 */
export function registerTooltipGroup(tooltip: object, group: Element | null) {
    if (group) {
        groups.set(tooltip, group);
    }
}

/**
 * Makes a chart the tooltip's only chart. Throws when another chart has it:
 * a tooltip draws into one chart, and a second chart would move it between
 * them on every draw.
 * @param  {Object} chart   The chart module
 * @param  {Object} tooltip The tooltip module
 */
export function claimTooltip(chart: object, tooltip: TooltipModule) {
    const owner = owners.get(tooltip);

    if (owner && owner !== chart) {
        throw new Error(
            'Britecharts: this tooltip is already set on another chart. Give each chart a tooltip of its own.'
        );
    }
    owners.set(tooltip, chart);
}

/**
 * Takes a tooltip off a chart: stops the chart's events from reaching it,
 * removes the group it drew, and frees it for another chart
 * @param  {Object} chart   The chart module
 * @param  {Object} tooltip The tooltip module
 */
export function releaseTooltip(chart: ChartWithEvents, tooltip: TooltipModule) {
    chart.on(`customMouseOver.${NAMESPACE}`, null);
    chart.on(`customMouseMove.${NAMESPACE}`, null);
    chart.on(`customMouseOut.${NAMESPACE}`, null);
    groups.get(tooltip)?.remove();
    groups.delete(tooltip);
    owners.delete(tooltip);
}

/**
 * Connects a tooltip to a chart that has drawn: sets the labels the chart
 * needs, follows the chart's pointer and keyboard events, and draws the
 * tooltip into the chart's vertical marker, or its metadata group when it
 * has no marker. The handlers go under their own namespace, so the user's
 * handlers on the same events keep running.
 * @param  {Object} chart   The chart module
 * @param  {Object} tooltip The tooltip module
 * @param  {D3Selection} svg The chart's svg
 * @param  {Object} labels  The labels the chart needs
 * @param  {Function} [toDataPoint] Turns what the chart sends into the
 *                                  data point the tooltip shows
 */
export function connectTooltip(
    chart: ChartWithEvents,
    tooltip: TooltipModule,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    svg: Selection<any, any, any, any>,
    labels: TooltipLabels,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toDataPoint?: (dataPoint: any) => unknown
) {
    const mapped =
        (callback: TooltipCallback) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (dataPoint: any, ...rest: any[]) =>
            callback(toDataPoint ? toDataPoint(dataPoint) : dataPoint, ...rest);

    applyChartLabels(tooltip, labels);
    chart.on(
        `customMouseOver.${NAMESPACE}`,
        mapped(tooltip.show as TooltipCallback)
    );
    chart.on(
        `customMouseMove.${NAMESPACE}`,
        mapped(tooltip.update as TooltipCallback)
    );
    chart.on(`customMouseOut.${NAMESPACE}`, tooltip.hide);

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
