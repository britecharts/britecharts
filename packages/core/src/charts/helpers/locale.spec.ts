import { format } from 'd3-format';

import { localeFormatterFor } from './locale';

describe('locale Helper', () => {
    describe('when a valid locale definition is given', () => {
        it('should return an object', () => {
            const validLocaleDefinition = {
                decimal: '.',
                thousands: ',',
                grouping: [3],
                currency: ['$', ''],
            };
            const expected = 'object';
            const actual = typeof localeFormatterFor(validLocaleDefinition);

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
            const actual = typeof localeFormatterFor(validLocaleDefinition)
                .format;

            expect(actual).toEqual(expected);
        });

        it('should format with the definition, and leave the default locale alone', () => {
            const germanLocaleDefinition = {
                decimal: ',',
                thousands: '.',
                grouping: [3],
                currency: ['', ' €'],
            };

            const formatter = localeFormatterFor(germanLocaleDefinition);

            expect(formatter.format(',.2f')(1234.5)).toEqual('1.234,50');
            expect(format(',.2f')(1234.5)).toEqual('1,234.50');
        });
    });

    describe('when an invalid locale definition is given', () => {
        it('should throw an error', () => {
            const invalidLocaleDefinition = {};
            const expected = new Error(
                'Please pass in a valid locale object definition'
            );

            expect(() => localeFormatterFor(invalidLocaleDefinition)).toThrow(
                expected
            );
        });
    });
});
