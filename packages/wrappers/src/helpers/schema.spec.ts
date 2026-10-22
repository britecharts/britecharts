import { checkValue, describeSchema } from './schema';
import type { SchemaNode } from './schema';

const FUNCTION: SchemaNode = { not: {} };

describe('schema helpers', () => {
    describe('checkValue', () => {
        it.each([
            ['a number', { type: 'number' }, 300],
            ['a string', { type: 'string' }, 'Visits'],
            ['a boolean', { type: 'boolean' }, false],
            ['null', { anyOf: [{ type: 'null' }, { type: 'string' }] }, null],
            ['a listed value', { enum: ['linear', 'basis'] }, 'basis'],
            [
                'an array',
                { type: 'array', items: { type: 'string' } },
                ['#fff'],
            ],
            [
                'a tuple of the right length',
                {
                    type: 'array',
                    prefixItems: [{ type: 'string' }, { type: 'string' }],
                    items: false,
                },
                ['#fff', '#000'],
            ],
            [
                'a tuple without its optional elements',
                {
                    type: 'array',
                    prefixItems: [{ type: 'number' }, { type: 'number' }],
                    items: false,
                    minItems: 0,
                },
                [130],
            ],
            [
                'a map',
                { type: 'object', additionalProperties: { type: 'string' } },
                { Pro: '#fff' },
            ],
            ['a function', FUNCTION, () => undefined],
            [
                'a Date for a date-time',
                { type: 'string', format: 'date-time' },
                new Date(),
            ],
        ] as [string, SchemaNode, unknown][])(
            'should accept %s',
            (_, schema, value) => {
                expect(checkValue(value, schema, 'key')).toEqual([]);
            }
        );

        it('should say what a value should be and what it is', () => {
            expect(checkValue('300', { type: 'number' }, 'height')).toEqual([
                'height: expected a number, got the string "300"',
            ]);
        });

        it('should reject NaN as a number', () => {
            expect(checkValue(NaN, { type: 'number' }, 'width')).toHaveLength(
                1
            );
        });

        it('should list the values a value can be', () => {
            expect(
                checkValue('cubic', { enum: ['linear', 'basis'] }, 'lineCurve')
            ).toEqual([
                'lineCurve: expected one of "linear", "basis", got the string "cubic"',
            ]);
        });

        it('should reject a tuple of the wrong length', () => {
            const gradient: SchemaNode = {
                type: 'array',
                prefixItems: [{ type: 'string' }, { type: 'string' }],
                items: false,
                minItems: 2,
            };

            expect(checkValue(['#fff'], gradient, 'chartGradient')).toEqual([
                'chartGradient: expected an array of 2 strings, got an array of 1',
            ]);
        });

        it('should name the item or property that is wrong', () => {
            expect(
                checkValue(
                    ['#fff', 3],
                    { type: 'array', items: { type: 'string' } },
                    'colorSchema'
                )
            ).toEqual(['colorSchema[1]: expected a string, got 3']);
            expect(
                checkValue(
                    { top: '10' },
                    {
                        type: 'object',
                        properties: { top: { type: 'number' } },
                    },
                    'margin'
                )
            ).toEqual(['margin.top: expected a number, got the string "10"']);
        });

        it('should reject a function where a value is expected, and the reverse', () => {
            expect(checkValue(() => 300, { type: 'number' }, 'height')).toEqual(
                ['height: expected a number, got a function']
            );
            expect(checkValue('alert()', FUNCTION, 'customClick')).toEqual([
                'customClick: expected a function, got the string "alert()"',
            ]);
        });
    });

    describe('describeSchema', () => {
        it('should join the options of a union', () => {
            expect(
                describeSchema({
                    anyOf: [{ type: 'null' }, FUNCTION],
                })
            ).toBe('null or a function');
        });

        it('should describe an array by its items', () => {
            expect(
                describeSchema({ type: 'array', items: { type: 'number' } })
            ).toBe('an array of numbers');
        });
    });
});
