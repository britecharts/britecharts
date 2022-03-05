import { applyConfiguration } from './configuration';

describe.skip('configuration', () => {
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
});
