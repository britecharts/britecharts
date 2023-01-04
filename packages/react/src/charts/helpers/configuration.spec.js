import { applyConfiguration } from './configuration';

describe('configuration', () => {
    describe('applyConfiguration', () => {
        it('should allow setting empty string', () => {
            const expected = '';
            const mockChart = {
                expected: (value) => {
                    mockChart._expected = value;
                },
            };
            const actual = applyConfiguration(mockChart, {
                expected: '',
            })._expected;

            expect(actual).toEqual(expected);
        });

        it('should not set unknown properties', () => {
            const expected = undefined;
            const mockChart = {
                expected: (value) => {
                    mockChart._expected = value;
                },
            };
            const actual = applyConfiguration(mockChart, {
                testNotValid: '',
            })._expected;

            expect(actual).toEqual(expected);
        });

        it('should allow setting event configurations', () => {
            const expected = 'customMouseOver';
            const testFn = () => {};
            const mockChart = {
                on: (value) => {
                    mockChart._expected = value;
                },
            };
            const actual = applyConfiguration(mockChart, {
                customMouseOver: testFn,
            })._expected;

            expect(actual).toEqual(expected);
        });
    });
});
