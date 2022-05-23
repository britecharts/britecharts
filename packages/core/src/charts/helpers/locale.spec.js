import { setDefaultLocale } from './locale';

describe('locale Helper', () => {
    afterEach(() => {
        const USLocale = {
            decimal: '.',
            thousands: ',',
            grouping: [3],
            currency: ['$', ''],
        };

        setDefaultLocale(USLocale);
    });

    describe('when a valid locale definition is given', () => {
        it('should return an object', () => {
            const validLocaleDefinition = {
                decimal: '.',
                thousands: ',',
                grouping: [3],
                currency: ['$', ''],
            };
            const expected = 'object';
            const actual = typeof setDefaultLocale(validLocaleDefinition);

            expect(actual).toEqual(expected);
        });

        it('should return an object with a format function', () => {
            const validLocaleDefinition = {
                decimal: '.',
                thousands: ',',
                grouping: [3],
                currency: ['$', ''],
            };
            const expected = 'function';
            const actual = typeof setDefaultLocale(validLocaleDefinition)
                .format;

            expect(actual).toEqual(expected);
        });
    });

    describe('when an invalid locale definition is given', () => {
        it('should throw an error', () => {
            const invalidLocaleDefinition = {};
            const expected = new Error(
                'Please pass in a valid locale object definition'
            );

            expect(() => setDefaultLocale(invalidLocaleDefinition)).toThrow(
                expected
            );
        });
    });
});
