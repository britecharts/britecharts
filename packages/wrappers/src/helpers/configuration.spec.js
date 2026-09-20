import { applyConfiguration } from './configuration';

// A chart double whose accessors record what they were called with, and how
// many times: an accessor that was never called is a value that never arrived.
const makeChart = (...names) => {
    const chart = { calls: {} };

    names.forEach((name) => {
        chart.calls[name] = [];
        chart[name] = (value) => {
            chart.calls[name].push(value);

            return chart;
        };
    });

    return chart;
};

describe('configuration', () => {
    describe('applyConfiguration', () => {
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
                const chart = { handlers: {} };

                chart.on = (name, handler) => {
                    chart.handlers[name] = handler;

                    return chart;
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
            // not a handler to register
            it.each([
                ['false', false],
                ['null', null],
                ['undefined', undefined],
            ])('should not register a handler that is %s', (name, value) => {
                const chart = makeEventChart();

                applyConfiguration(chart, { customMouseOver: value });

                expect(chart.handlers).toEqual({});
            });
        });
    });
});
