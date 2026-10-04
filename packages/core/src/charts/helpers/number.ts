import { format } from 'd3-format';
import { max, min } from 'd3-array';

let idCounter = 0;

/**
 * A value-size lookup. Only `small` and `medium` carry a numeric limit --
 * `large` is the fall-through, so its limit is never compared and is `null` to
 * say so.
 */
type ValueFormatTable = {
    small: { limit: number; format: (value: number) => string };
    medium: { limit: number; format: (value: number) => string };
    large: { limit: null; format: (value: number) => string };
};

const integerValueFormats: ValueFormatTable = {
    small: {
        limit: 10,
        format: format(''),
    },
    medium: {
        limit: 1000,
        format: format(''),
    },
    large: {
        limit: null,
        format: format('.2s'),
    },
};

const decimalValueFormats: ValueFormatTable = {
    small: {
        limit: 10,
        format: format('.3f'),
    },
    medium: {
        limit: 100,
        format: format('.1f'),
    },
    large: {
        limit: null,
        format: format('.2s'),
    },
};

/**
 * Return a relative size for the value given, based in our decimal or integer tables
 * @private
 */
const getValueSize = (
    value: number,
    limits: ValueFormatTable
): keyof ValueFormatTable => {
    let size: keyof ValueFormatTable = 'large';

    if (value < limits.small.limit) {
        size = 'small';
    } else if (value < limits.medium.limit) {
        size = 'medium';
    }

    return size;
};

/** A point the trendline is fitted through. */
export type RegressionPoint = { x: number; y: number };

/**
 * Returns an object that contains necessary coordinates for drawing the
 * trendline. The calculation of slope and y-intercept uses basic accumulative
 * linear regression formula.
 *
 * Both ends are the fitted line evaluated at the x they sit on: `y1` at
 * `minX`, `y2` at `maxX`. `y1` used to read `slope * n + intercept`, with `n`
 * the number of points, so the line's left end was drawn at the wrong height
 * whenever `minX` differed from the point count -- the scatter plot draws from
 * `(x1, y1)` to `(x2, y2)` with `x1` being `minX`.
 *
 * `x1`/`x2` are `number | undefined` because d3's `min`/`max` return undefined
 * for an empty input. No caller passes an empty array today -- the scatter plot
 * only calls this when it has points -- so that case still yields NaN heights
 * rather than being given an invented meaning.
 * @private
 */
export const calcLinearRegression = (
    dataPoints: RegressionPoint[]
): { x1?: number; y1: number; x2?: number; y2: number } => {
    const n = dataPoints.length;
    let x = 0,
        y = 0,
        xy = 0,
        x2 = 0;

    dataPoints.forEach((d) => {
        x += d.x;
        y += d.y;
        xy += d.x * d.y;
        x2 += d.x * d.x;
    });

    const denominator = n * x2 - x * x;
    const intercept = (y * x2 - x * xy) / denominator;
    const slope = (n * xy - x * y) / denominator;
    const minX = min(dataPoints, ({ x }) => x);
    const maxX = max(dataPoints, ({ x }) => x);

    return {
        x1: minX,
        y1: slope * (minX as number) + intercept,
        x2: maxX,
        y2: slope * (maxX as number) + intercept,
    };
};

/**
 * Calculates percentage of value from total
 * @param  decimals  Format specifier, https://github.com/d3/d3-format
 * @private
 */
export const calculatePercent = (
    value: number,
    total: number,
    decimals: string
): string => {
    const percent = total ? (value / total) * 100 : 0;

    return format(decimals)(percent);
};

/**
 * Checks if a number is an integer or a decimal value
 * @private
 */
export const isInteger = (value: number): boolean => {
    return value % 1 === 0;
};

/**
 * Formats a floating point value depending on its value range
 * @private
 */
export const formatDecimalValue = (value: number): string => {
    const size = getValueSize(value, decimalValueFormats);
    const format = decimalValueFormats[size].format;

    return format(value);
};

/**
 * Formats an integer value depending on its value range
 * @private
 */
export const formatIntegerValue = (value: number): string => {
    const size = getValueSize(value, integerValueFormats);
    const format = integerValueFormats[size].format;

    return format(value);
};

/**
 * Generates a unique id with a prefix
 * @private
 */
export const uniqueId = (prefix: string | number): string => {
    const id = ++idCounter;

    return `${prefix.toString()}-${id}`;
};

export default {
    calculatePercent,
    isInteger,
    formatDecimalValue,
    formatIntegerValue,
    uniqueId,
    calcLinearRegression,
};
