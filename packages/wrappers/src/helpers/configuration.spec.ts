import { applyConfiguration } from './configuration';
import type { ChartConfiguration, ChartEventHandler } from './configuration';
import type { LegendModule, SparklineChartModule } from '@britecharts/core';

// Type-level assertions: `tsc --noEmit` covers this file, so a wrong type here
// fails the type-check rather than a test.
type Expect<T extends true> = T;
type Equal<A, B> =
    (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
        ? true
        : false;

// An accessor still contributes the type its setter takes. Core declares these
// as overload pairs, and inference in this position reads the last overload,
// which is the setter -- the reason the getter comes first.
export type AccessorKeepsItsValueType = Expect<
    Equal<ChartConfiguration<SparklineChartModule>['width'], number | undefined>
>;

// A command contributes the argument it is called with. Were either of these
// `never`, passing it would be an error even though `applyConfiguration` calls
// it perfectly well.
export type CommandCarriesItsArgument = Expect<
    Equal<ChartConfiguration<LegendModule>['highlight'], number | undefined>
>;
export type ExportChartTakesAFilename = Expect<
    Equal<
        ChartConfiguration<SparklineChartModule>['exportChart'],
        string | undefined
    >
>;

// A command that takes nothing is a trigger: any set value calls it and the
// value is discarded, so `boolean` is what the type offers. The first element
// of an empty parameter list is `undefined`, which would leave the only
// compiling value the one `isSet` skips.
export type ZeroArgumentCommandIsATrigger = Expect<
    Equal<
        ChartConfiguration<LegendModule>['clearHighlight'],
        boolean | undefined
    >
>;

// And a command's argument is still checked, so the channel is not a hole.
const wrongCommandArgument: ChartConfiguration<LegendModule> = {
    // @ts-expect-error -- highlight takes an entry id, not a string
    highlight: 'three',
};

void wrongCommandArgument;

// A chart double whose accessors record what they were called with, and how
// many times: an accessor that was never called is a value that never arrived.
//
// Generic over the accessor names so the double has the same shape a real chart
// module does -- named methods taking a value -- rather than an index
// signature, which would collapse to `never` under ChartConfiguration and make
// every call here an error.
type ChartDouble<TName extends string> = {
    calls: Record<TName, unknown[]>;
} & Record<TName, (value?: unknown) => unknown>;

const makeChart = <TName extends string>(
    ...names: TName[]
): ChartDouble<TName> => {
    const chart = { calls: {} } as ChartDouble<TName>;

    names.forEach((name) => {
        chart.calls[name] = [];
        chart[name] = ((value?: unknown) => {
            chart.calls[name].push(value);

            return chart;
        }) as ChartDouble<TName>[TName];
    });

    return chart;
};

describe('configuration', () => {
    describe('applyConfiguration', () => {
        describe('a command', () => {
            // `applyConfiguration` calls these the same way it calls an
            // accessor -- the chart's member, with the value. The type-level
            // assertions above cover what compiles; this pins the runtime half.
            it('should be called with its argument', () => {
                const chart = makeChart('highlight');

                applyConfiguration(chart, { highlight: 3 });

                expect(chart.calls.highlight).toEqual([3]);
            });

            // The trigger case, and the reason `boolean` is its type: the
            // chart's member takes nothing, so whatever arrives is discarded --
            // being set at all is the whole signal.
            it('should be called when it takes no argument and a value is set', () => {
                const chart = makeChart('clearHighlight');

                applyConfiguration(chart, { clearHighlight: true });

                expect(chart.calls.clearHighlight).toEqual([true]);
            });
        });

        describe('exportChart', () => {
            it('should wait for the draw that follows', async () => {
                const exportChart = vi.fn();

                applyConfiguration(
                    { exportChart } as never,
                    {
                        exportChart: 'chart.svg',
                    } as never
                );

                expect(exportChart).not.toHaveBeenCalled();

                await Promise.resolve();

                expect(exportChart).toHaveBeenCalledWith('chart.svg');
            });

            it('should log an export that fails', async () => {
                const failure = new Error('nothing to export');
                const errorSpy = vi
                    .spyOn(console, 'error')
                    .mockImplementation(() => {});

                applyConfiguration(
                    { exportChart: () => Promise.reject(failure) } as never,
                    { exportChart: 'chart.svg' } as never
                );

                await vi.waitFor(() =>
                    expect(errorSpy).toHaveBeenCalledWith(failure)
                );
                errorSpy.mockRestore();
            });
        });

        describe('a value that is set', () => {
            it.each([
                ['true', true],
                ['a number', 300],
                ['a string', 'a title'],
                ['an object', { top: 1 }],
                ['an array', ['#fff']],
                ['a function', () => 1],
            ])('should reach the chart when it is %s', (name, value) => {
                const chart = makeChart('expected');

                applyConfiguration(chart, { expected: value });

                expect(chart.calls.expected).toEqual([value]);
            });

            // The point of it: false, 0 and '' are settings, not the absence of one
            it.each([
                ['false', false],
                ['zero', 0],
                ['an empty string', ''],
                ['NaN', NaN],
            ])('should reach the chart when it is %s', (name, value) => {
                const chart = makeChart('expected');

                applyConfiguration(chart, { expected: value });

                expect(chart.calls.expected).toHaveLength(1);
                expect(chart.calls.expected[0]).toBe(value);
            });
        });

        // undefined and null both mean "not set": the chart keeps its own
        // default, as a React prop that was left out or passed as null does
        describe('a value that is not set', () => {
            it.each([
                ['undefined', undefined],
                ['null', null],
            ])('should not reach the chart when it is %s', (name, value) => {
                const chart = makeChart('expected');

                applyConfiguration(chart, { expected: value });

                expect(chart.calls.expected).toEqual([]);
            });
        });

        it('should apply every property it is given', () => {
            const chart = makeChart('width', 'isAnimated', 'title');

            applyConfiguration(chart, {
                width: 0,
                isAnimated: false,
                title: '',
            });

            expect(chart.calls).toEqual({
                width: [0],
                isAnimated: [false],
                title: [''],
            });
        });

        it('should return the chart', () => {
            const chart = makeChart('expected');

            expect(applyConfiguration(chart, { expected: 1 })).toBe(chart);
        });

        describe('event handlers', () => {
            const makeEventChart = () => {
                const chart: {
                    handlers: Record<string, ChartEventHandler>;
                    on(name: string, handler: ChartEventHandler): unknown;
                } = {
                    handlers: {},
                    on(name, handler) {
                        chart.handlers[name] = handler;

                        return chart;
                    },
                };

                return chart;
            };

            it('should register a handler', () => {
                const chart = makeEventChart();
                const handler = () => {};

                applyConfiguration(chart, { customMouseOver: handler });

                expect(chart.handlers.customMouseOver).toBe(handler);
            });

            // A handler is a function or nothing: false or null is "no handler",
            // not a handler to register. These are deliberately values the types
            // forbid -- the cast is what says so -- because the guard they prove
            // exists is a runtime one, and callers reaching this code from
            // untyped JavaScript can still send them.
            it.each([
                ['false', false],
                ['null', null],
                ['undefined', undefined],
            ])('should not register a handler that is %s', (name, value) => {
                const chart = makeEventChart();

                applyConfiguration(chart, {
                    customMouseOver: value as unknown as ChartEventHandler,
                });

                expect(chart.handlers).toEqual({});
            });
        });
    });
});
