import { britechartsCustomEvents } from '../constants';
import type { BritechartsCustomEvent } from '../constants';

export type ChartEventHandler = (...args: never[]) => void;

/**
 * What an accessor accepts, or `never` when the member is not one.
 *
 * Core declares an accessor as a getter/setter overload pair, and conditional
 * inference in this position reads the **last** overload -- the setter -- which
 * is why core keeps the getter first. A single optional-parameter signature,
 * the older mixin form, infers the same way.
 */
type AccessorValue<TChart, TKey extends keyof TChart> = TChart[TKey] extends (
    value?: infer TValue
) => unknown
    ? TValue
    : never;

/**
 * What a command is called with: its first argument.
 *
 * A command acts when called rather than getting or setting -- legend's
 * `highlight(id)`, a chart's `exportChart(filename, title)` -- so it has a
 * required parameter and does not match {@link AccessorValue} at all. Left out
 * of the configuration it maps to `never`, and passing it is an error even
 * though `applyConfiguration` calls it perfectly well: `highlight` has always
 * worked at run time and never type-checked.
 *
 * Only the first argument, because that is all a single configuration value
 * can carry. `exportChart`'s `title` is therefore not reachable this way, and
 * the helper behind it already treats both as optional.
 */
type CommandArgument<TChart, TKey extends keyof TChart> = TChart[TKey] extends (
    ...args: infer TArgs
) => unknown
    ? TArgs[0]
    : never;

/**
 * Every member of the chart a wrapper may be handed a value for, paired with
 * the type that member takes: an accessor's value, or a command's argument.
 *
 * The two are chosen per key rather than intersected. Intersecting
 * `{ highlight?: never }` with `{ highlight?: number }` gives `never & number`
 * -- `never` -- so a command channel added that way would reject the very
 * props it exists to allow.
 *
 * Anything that is neither maps to `never`, so passing it is still an error
 * rather than silently doing nothing.
 */
export type ChartConfiguration<TChart> = Partial<{
    [TKey in keyof TChart]: [AccessorValue<TChart, TKey>] extends [never]
        ? CommandArgument<TChart, TKey>
        : AccessorValue<TChart, TKey>;
}>;

/**
 * What a wrapper may be handed: the chart's own accessors, plus the four
 * custom events, which are registered through `.on()` rather than called as
 * accessors.
 */
export type WrapperConfiguration<TChart> = ChartConfiguration<TChart> &
    Partial<Record<BritechartsCustomEvent, ChartEventHandler>>;

// The keys are only known at run time, so the calls below cannot be checked
// against TChart. The public signature is where correctness is enforced -- a
// caller cannot name an accessor the chart does not have, or pass it the wrong
// type -- and this shape confines the dynamism to one place.
type DynamicChart = Record<string, (value?: unknown) => unknown> & {
    on(eventName: string, handler: ChartEventHandler): unknown;
};

const isEventConfig = (
    configName: string
): configName is BritechartsCustomEvent =>
    (britechartsCustomEvents as readonly string[]).indexOf(configName) !== -1;
const isNotEventConfig = (configName: string) => !isEventConfig(configName);

// undefined and null mean "not set": the chart keeps its own default, as it does
// for a React prop that was left out or passed as null. Anything else is a
// setting, falsy or not: false, 0 and '' have to arrive, or a chart could never
// have a flag turned back off (isLoading={false} could not end a loading state).
const isSet = (value: unknown) => value !== undefined && value !== null;

const setChartProperty = (
    chart: DynamicChart,
    configuration: Record<string, unknown>,
    key: string
) => {
    if (isSet(configuration[key])) {
        chart[key](configuration[key]);
    }
};

const setChartEventHandler = (
    chart: DynamicChart,
    configuration: Record<string, unknown>,
    key: string
) => {
    if (configuration[key]) {
        chart.on(key, configuration[key] as ChartEventHandler);
    }
};

export const applyConfiguration = <TChart extends object>(
    chart: TChart,
    configuration: WrapperConfiguration<TChart>
): TChart => {
    const target = chart as unknown as DynamicChart;
    const settings = configuration as Record<string, unknown>;
    const configurationProperties = Object.keys(settings);

    // Regular properties
    configurationProperties
        .filter(isNotEventConfig)
        .forEach(setChartProperty.bind(null, target, settings));

    // Event related properties
    configurationProperties
        .filter(isEventConfig)
        .forEach(setChartEventHandler.bind(null, target, settings));

    return chart;
};

export default applyConfiguration;
