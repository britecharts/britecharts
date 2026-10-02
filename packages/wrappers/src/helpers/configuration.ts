import { britechartsCustomEvents } from '../constants';
import type { BritechartsCustomEvent } from '../constants';

export type ChartEventHandler = (...args: never[]) => void;

/**
 * Every accessor on the chart, paired with the type that accessor accepts.
 *
 * Core declares each accessor as one optional-parameter signature
 * (`width(width?: number): T & ChartBaseAPI<T>`), so `infer` reads the value
 * type straight off it. An overloaded getter/setter pair would not infer
 * reliably in this position, which is why the mixin form core already uses is
 * the one to keep.
 *
 * Anything that is not an accessor maps to `never`, so passing it is an error
 * rather than silently doing nothing.
 */
export type ChartConfiguration<TChart> = Partial<{
    [TKey in keyof TChart]: TChart[TKey] extends (
        value?: infer TValue
    ) => unknown
        ? TValue
        : never;
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
