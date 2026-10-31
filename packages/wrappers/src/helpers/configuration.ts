import { britechartsCustomEvents } from '../constants.js';
import type {
    BritechartsCustomEvent,
    NotConfigurationMethod,
} from '../constants.js';

export type ChartEventHandler = (...args: never[]) => void;

/**
 * What an accessor accepts, or `never` when the member is not one.
 *
 * Core declares an accessor as a getter/setter overload pair, and conditional
 * inference in this position reads the **last** overload -- the setter -- which
 * is why core keeps the getter first. A single optional-parameter signature
 * infers the same way.
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
 * of the configuration it would map to `never`, and passing it would be an
 * error even though `applyConfiguration` calls it perfectly well.
 *
 * Only the first argument, because that is all a single configuration value
 * can carry. `exportChart`'s `title` is therefore not reachable this way, and
 * the helper behind it already treats both as optional.
 *
 * A command that takes nothing is handled before this, by {@link Arity}.
 */
type CommandArgument<TChart, TKey extends keyof TChart> = TChart[TKey] extends (
    ...args: infer TArgs
) => unknown
    ? TArgs[0]
    : never;

/**
 * How many arguments a member declares, as the literal union of lengths its
 * parameter list allows.
 *
 * An accessor with one optional parameter reports `0 | 1`; a command with one
 * required parameter reports `1`; a member that takes nothing reports `0`.
 * Exactly `0` is the only case that cannot be an accessor, which is what makes
 * this the test to use -- a zero-parameter function **is** assignable to
 * `(value?: infer TValue) => unknown`, inferring `unknown`, so
 * {@link AccessorValue} matches it and the fallback below is never reached
 * without this.
 */
type Arity<TChart, TKey extends keyof TChart> = TChart[TKey] extends (
    ...args: infer TArgs
) => unknown
    ? TArgs['length']
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
 * A member that takes no arguments at all -- legend's `clearHighlight()` -- is
 * a trigger rather than either: `applyConfiguration` calls it for any value
 * that is set and the chart discards what arrives, so `boolean` is what the
 * type offers. Its first argument would be `undefined`, which would leave the
 * only compiling value the one `isSet` skips.
 *
 * Anything that is none of the three maps to `never`, so passing it is still
 * an error rather than silently doing nothing. `render` is left out: the
 * wrapper draws the chart itself.
 */
export type ChartConfiguration<TChart> = Partial<{
    // Remapped with `as` rather than over `Exclude<keyof TChart, ...>`, which
    // would lose each accessor's JSDoc, and with it the schemas' descriptions
    [
        TKey in keyof TChart as TKey extends NotConfigurationMethod
            ? never
            : TKey
    ]: [Arity<TChart, TKey>] extends [0]
        ? boolean
        : [AccessorValue<TChart, TKey>] extends [never]
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

// `exportChart` downloads what the chart has drawn, and every wrapper applies
// its configuration before it draws. The draw runs in the same tick, so a
// microtask is enough to call the export once there is something to download.
const exportAfterDraw = (chart: DynamicChart, filename: unknown) => {
    Promise.resolve()
        .then(() => chart['exportChart'](filename))
        .catch((error: unknown) => {
            // eslint-disable-next-line no-console
            console.error(error);
        });
};

const setChartProperty = (
    chart: DynamicChart,
    configuration: Record<string, unknown>,
    key: string
) => {
    if (!isSet(configuration[key])) {
        return;
    }
    if (key === 'exportChart') {
        exportAfterDraw(chart, configuration[key]);
    } else {
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
