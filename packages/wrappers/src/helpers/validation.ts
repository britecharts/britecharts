import type { BaseType, Selection } from 'd3-selection';

import { britechartsCustomEvents } from '../constants';
import type { WrapperConfiguration } from './configuration';

// The container a wrapper is handed is always the d3 selection, not the raw
// element -- every wrapper does `const container = select(el)` first.
//
// Only the part of Selection this helper actually uses, rather than a concrete
// Selection: d3's Selection is invariant in both its element and its datum
// (each appears in parameter position on merge, select, on and others), so any
// one Selection type we picked here would reject every caller whose selection
// is typed even slightly differently, and all ten wrappers would need a cast.
export type ChartContainer = Pick<
    Selection<BaseType, unknown, null, undefined>,
    'empty'
>;

const isNotCustomEvent = (configName: string) =>
    (britechartsCustomEvents as readonly string[]).indexOf(configName) === -1;

export const validateConfiguration = <TChart extends object>(
    chart: TChart,
    configuration: WrapperConfiguration<TChart>
) => {
    const configurationProperties = Object.keys(configuration);
    const configurationPropertiesWithoutEvents =
        configurationProperties.filter(isNotCustomEvent);
    // The accessors are properties on the chart function itself. This used to
    // read them off `chart.prototype.constructor`, which is the same object by
    // a longer route -- core declares each chart as a named function
    // declaration, so `chart.prototype.constructor === chart` -- but only for
    // as long as a chart is a `function`. An arrow function has no `.prototype`
    // at all, so that route throws a TypeError before it can report anything.
    // Reading the keys directly is identical for every chart core ships and
    // survives one that is not a function declaration.
    const supportedMethods = Object.keys(chart);

    const notSupportedMethods = configurationPropertiesWithoutEvents.filter(
        (methodName) => !supportedMethods.includes(methodName)
    );

    if (notSupportedMethods.length) {
        throw new Error(
            `Method not supported by Britechart: ${notSupportedMethods.join(
                ' '
            )}`
        );
    }
};

export const validateContainer = (container: ChartContainer) => {
    if (container.empty()) {
        throw Error('A root container is required');
    }
};
