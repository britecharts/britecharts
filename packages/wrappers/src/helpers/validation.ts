import type { BaseType, Selection } from 'd3-selection';

import {
    britechartsCustomEvents,
    notConfigurationMethods,
} from '../constants.js';
import type { WrapperConfiguration } from './configuration.js';
import { checkValue } from './schema.js';
import type { ConfigurationSchema } from './schema.js';

// The container a wrapper is handed is always the d3 selection, not the raw
// element -- every wrapper does `const container = select(el)` first.
//
// Only the part of Selection this helper actually uses, rather than a concrete
// Selection: d3's Selection is invariant in both its element and its datum
// (each appears in parameter position on merge, select, on and others), so any
// one Selection type we picked here would reject every caller whose selection
// is typed even slightly differently, and every wrapper would need a cast.
export type ChartContainer = Pick<
    Selection<BaseType, unknown, null, undefined>,
    'empty'
>;

const isNotCustomEvent = (configName: string) =>
    (britechartsCustomEvents as readonly string[]).indexOf(configName) === -1;

const API_DOCS = 'https://britecharts.github.io/britecharts/docs/API/';

// Levenshtein distance: the fewest single-character insertions, deletions and
// substitutions that turn one name into the other
const editDistance = (a: string, b: string) => {
    let previous = Array.from({ length: b.length + 1 }, (_, j) => j);

    for (let i = 1; i <= a.length; i++) {
        const current = [i];

        for (let j = 1; j <= b.length; j++) {
            current[j] = Math.min(
                previous[j] + 1,
                current[j - 1] + 1,
                previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
            );
        }
        previous = current;
    }

    return previous[b.length];
};

/**
 * The supported name closest to one that is not, or null when none is close
 * enough to be what was meant. Case is ignored, so `colorschema` finds
 * `colorSchema`, and a typo or two is allowed, a few more in a long name.
 */
export const nearestName = (name: string, candidates: readonly string[]) => {
    const target = name.toLowerCase();
    const tolerance = Math.max(2, Math.floor(name.length / 4));
    let nearest: string | null = null;
    let nearestDistance = Infinity;

    candidates.forEach((candidate) => {
        const distance = editDistance(target, candidate.toLowerCase());

        if (distance < nearestDistance) {
            nearest = candidate;
            nearestDistance = distance;
        }
    });

    return nearestDistance <= tolerance ? nearest : null;
};

/**
 * Throws when the configuration names something the chart has no accessor
 * for, or, given the chart's schema, sets one to a value of the wrong type.
 * The message names each one, suggests the nearest accessor or event for any
 * that looks like a typo, says what each wrong value should be, and links the
 * chart's API page.
 *
 * @param apiPage The chart's page under docs/API, such as `grouped-bar`
 * @param schema The chart's generated config schema, from `src/schemas`
 */
export const validateConfiguration = <TChart extends object>(
    chart: TChart,
    configuration: WrapperConfiguration<TChart>,
    apiPage?: string,
    schema?: ConfigurationSchema
) => {
    const configurationProperties = Object.keys(configuration);
    const configurationPropertiesWithoutEvents =
        configurationProperties.filter(isNotCustomEvent);
    // The accessors are properties on the chart function itself. Read them
    // directly rather than off `chart.prototype.constructor`: that is the same
    // object for a function declaration, but an arrow function has no
    // `.prototype` at all, so that route throws a TypeError before it can
    // report anything.
    const supportedMethods = Object.keys(chart).filter(
        (methodName) =>
            !(notConfigurationMethods as readonly string[]).includes(methodName)
    );

    const notSupportedMethods = configurationPropertiesWithoutEvents.filter(
        (methodName) => !supportedMethods.includes(methodName)
    );

    if (notSupportedMethods.length) {
        const candidates = [...supportedMethods, ...britechartsCustomEvents];
        const suggestions = notSupportedMethods.flatMap((methodName) => {
            const nearest = nearestName(methodName, candidates);

            return nearest ? [`  ${methodName}: did you mean ${nearest}?`] : [];
        });

        // The first line is the message this has always thrown, which
        // callers may match on; the hints follow it
        throw new Error(
            [
                `Method not supported by Britechart: ${notSupportedMethods.join(
                    ' '
                )}`,
                ...suggestions,
                ...docsLink(apiPage),
            ].join('\n')
        );
    }

    if (schema) {
        validateValues(configuration, schema, apiPage);
    }
};

const docsLink = (apiPage?: string) =>
    apiPage ? [`Supported accessors: ${API_DOCS}${apiPage}`] : [];

// Undefined and null are skipped, as applyConfiguration skips them: the chart
// keeps its own default
const validateValues = (
    configuration: Record<string, unknown>,
    schema: ConfigurationSchema,
    apiPage?: string
) => {
    const problems = Object.entries(configuration)
        .filter(
            ([key, value]) =>
                value !== undefined && value !== null && schema.properties[key]
        )
        .map(([key, value]) => ({
            key,
            problems: checkValue(value, schema.properties[key], key),
        }))
        .filter(({ problems }) => problems.length);

    if (problems.length) {
        throw new Error(
            [
                `Value not supported by Britechart: ${problems
                    .map(({ key }) => key)
                    .join(' ')}`,
                ...problems.flatMap(({ problems }) =>
                    problems.map((problem) => `  ${problem}`)
                ),
                ...docsLink(apiPage),
            ].join('\n')
        );
    }
};

export const validateContainer = (container: ChartContainer) => {
    if (container.empty()) {
        throw Error(
            'A root container is required: pass the element to draw into, which must exist in the document'
        );
    }
};
