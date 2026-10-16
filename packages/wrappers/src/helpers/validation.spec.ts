import { select } from 'd3-selection';

import { britechartsCustomEvents } from '../constants';
import type { WrapperConfiguration } from './configuration';
import { validateConfiguration, validateContainer } from './validation';

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

        it('should read the accessors of a chart that is an arrow function', () => {
            const arrowChart = Object.assign(() => undefined, {
                width: (value?: number) => value,
            });

            expect(() =>
                validateConfiguration(arrowChart, { width: 500 })
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
});
