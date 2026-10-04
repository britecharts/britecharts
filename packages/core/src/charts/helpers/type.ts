/**
 * How a time-series chart reads its x values. This is the contract the code
 * actually implements: every check in line and stacked-area is
 * `xAxisValueType === 'number'`, and the default is `'date'`.
 *
 * Note their JSDoc `@example`s offer `xAxisValueType('numeric')` -- line.js
 * and stacked-area.js, two each. That string matches nothing, so following the
 * documented example silently gets date casting. The examples are wrong, not
 * this union; fixing them is a docs change, not a typing one.
 */
export type XAxisValueType = 'date' | 'number';

/**
 * Casts the data given to a date or number
 * respecting the value of xAxisValueType
 * @private
 */
export const castValueToType = (
    value: string | number | Date,
    type: XAxisValueType
): Date | number => {
    if (type === 'number') {
        return Number(value);
    }

    return new Date(value);
};

/**
 * Given any type of value, checks
 * if it's strictly defined in JS terms.
 *
 * Typed as a predicate rather than a plain boolean: every caller uses it to
 * guard (`if (!isDefined(key))`, `if (isDefined(dataPoint.key))`), so the
 * narrowing is the point.
 * @private
 */
export const isDefined = <TValue>(
    value: TValue
): value is NonNullable<TValue> => {
    return value !== null && value !== undefined;
};
