import { select } from 'd3-selection';

import { britechartsCustomEvents } from '../constants';
import type { WrapperConfiguration } from './configuration';
import type { ConfigurationSchema } from './schema';
import {
    nearestName,
    validateConfiguration,
    validateContainer,
} from './validation';

// Stands in for a core chart: its accessors are properties on the chart
// function, which is what `validateConfiguration` reads.
const aChart = () =>
    Object.assign(() => undefined, {
        width: (value?: number) => value,
        height: (value?: number) => value,
    });

// A JavaScript caller can pass any key; the types only stop a TypeScript one.
const untyped = <TChart>(configuration: Record<string, unknown>) =>
    configuration as unknown as WrapperConfiguration<TChart>;

describe('validation helpers', () => {
    describe('validateConfiguration', () => {
        it('should accept an empty configuration', () => {
            expect(() => validateConfiguration(aChart(), {})).not.toThrow();
        });

        it('should accept accessors the chart has', () => {
            expect(() =>
                validateConfiguration(aChart(), { width: 500, height: 300 })
            ).not.toThrow();
        });

        it('should name every accessor the chart does not have', () => {
            const chart = aChart();

            expect(() =>
                validateConfiguration(
                    chart,
                    untyped<typeof chart>({
                        width: 500,
                        notAnAccessor: 1,
                        neitherIsThis: 2,
                    })
                )
            ).toThrow(
                'Method not supported by Britechart: notAnAccessor neitherIsThis'
            );
        });

        it.each(britechartsCustomEvents)(
            'should accept the %s event, which is not an accessor',
            (eventName) => {
                const chart = aChart();

                expect(() =>
                    validateConfiguration(
                        chart,
                        untyped<typeof chart>({ [eventName]: () => undefined })
                    )
                ).not.toThrow();
            }
        );

        it('should suggest the accessor a misspelt key was meant to be', () => {
            const chart = aChart();

            expect(() =>
                validateConfiguration(
                    chart,
                    untyped<typeof chart>({ heigth: 1 })
                )
            ).toThrow('heigth: did you mean height?');
        });

        it('should suggest the event a miscased key was meant to be', () => {
            const chart = aChart();

            expect(() =>
                validateConfiguration(
                    chart,
                    untyped<typeof chart>({ customMouseover: () => undefined })
                )
            ).toThrow('customMouseover: did you mean customMouseOver?');
        });

        it('should suggest nothing for a key close to no accessor', () => {
            const chart = aChart();
            let message = '';

            try {
                validateConfiguration(
                    chart,
                    untyped<typeof chart>({ notAnAccessor: 1 })
                );
            } catch (error) {
                message = (error as Error).message;
            }

            expect(message).toBe(
                'Method not supported by Britechart: notAnAccessor'
            );
        });

        it('should link the API page of the chart when given one', () => {
            const chart = aChart();

            expect(() =>
                validateConfiguration(
                    chart,
                    untyped<typeof chart>({ notAnAccessor: 1 }),
                    'grouped-bar'
                )
            ).toThrow(
                'Supported accessors: https://britecharts.github.io/britecharts/docs/API/grouped-bar'
            );
        });

        it('should read the accessors of a chart that is an arrow function', () => {
            const arrowChart = Object.assign(() => undefined, {
                width: (value?: number) => value,
            });

            expect(() =>
                validateConfiguration(arrowChart, { width: 500 })
            ).not.toThrow();
        });
    });

    describe('validateConfiguration with a schema', () => {
        const schema: ConfigurationSchema = {
            type: 'object',
            properties: {
                width: { type: 'number' },
                height: { type: 'number' },
                customClick: { not: {} },
            },
            additionalProperties: false,
        };

        it('should accept values of the right type', () => {
            expect(() =>
                validateConfiguration(
                    aChart(),
                    { width: 500, height: 300 },
                    'bar',
                    schema
                )
            ).not.toThrow();
        });

        it('should say what each wrong value should be, and link the API page', () => {
            const chart = aChart();

            expect(() =>
                validateConfiguration(
                    chart,
                    untyped<typeof chart>({ width: '500px', height: true }),
                    'bar',
                    schema
                )
            ).toThrow(
                [
                    'Value not supported by Britechart: width height',
                    '  width: expected a number, got the string "500px"',
                    '  height: expected a number, got true',
                    'Supported accessors: https://britecharts.github.io/britecharts/docs/API/bar',
                ].join('\n')
            );
        });

        it('should skip unset values, so the chart keeps its default', () => {
            const chart = aChart();

            expect(() =>
                validateConfiguration(
                    chart,
                    untyped<typeof chart>({ width: undefined, height: null }),
                    'bar',
                    schema
                )
            ).not.toThrow();
        });

        it('should accept a function for an event', () => {
            const chart = aChart();

            expect(() =>
                validateConfiguration(
                    chart,
                    untyped<typeof chart>({ customClick: () => undefined }),
                    'bar',
                    schema
                )
            ).not.toThrow();
        });
    });

    describe('validateContainer', () => {
        afterEach(() => {
            document.body.innerHTML = '';
        });

        it('should accept a selection with an element', () => {
            document.body.innerHTML = '<div class="anchor"></div>';

            expect(() => validateContainer(select('.anchor'))).not.toThrow();
        });

        it('should reject an empty selection', () => {
            expect(() => validateContainer(select('.missing'))).toThrow(
                'A root container is required'
            );
        });
    });

    describe('nearestName', () => {
        const names = ['height', 'width', 'colorSchema', 'isAnimated'];

        it.each([
            ['heigth', 'height'],
            ['colorschema', 'colorSchema'],
            ['isAnimate', 'isAnimated'],
            ['widht', 'width'],
        ])('should find %s close to %s', (name, expected) => {
            expect(nearestName(name, names)).toBe(expected);
        });

        it('should find nothing close to an unrelated name', () => {
            expect(nearestName('barColor', names)).toBeNull();
        });
    });
});
