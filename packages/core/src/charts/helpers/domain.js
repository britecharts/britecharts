import { max, min } from 'd3-array';

/**
 * Builds the domain for a value axis so that it always contains zero.
 *
 * Charts whose marks grow from a baseline need that baseline inside the domain,
 * otherwise a negative value scales to a coordinate outside the range and the
 * mark is drawn with a negative width or height, which SVG rejects.
 *
 * For data that is entirely non-negative this returns the same `[0, max]` the
 * charts used before, so nothing about existing charts changes.
 *
 * @param  {Number[]} values            Values the axis has to cover
 * @param  {Number} ratio               Headroom multiplier applied to the extent
 * @param  {Number} emptyDomainMax      Upper bound to use when every value is 0
 * @return {Number[]}                   [lower, upper], always spanning zero
 */
export const getValueDomain = (
    values,
    { ratio = 1, emptyDomainMax = 1 } = {}
) => {
    const lowest = min(values);
    const highest = max(values);

    if (lowest === undefined || highest === undefined) {
        return [0, emptyDomainMax];
    }

    const lowerBound = Math.min(0, lowest * ratio);
    const upperBound = Math.max(0, highest * ratio);

    // A domain of [0, 0] has no extent, so the scale cannot place anything
    if (lowerBound === 0 && upperBound === 0) {
        return [0, emptyDomainMax];
    }

    return [lowerBound, upperBound];
};

/**
 * Where a mark that grows from the zero baseline starts, and how long it is.
 *
 * Works for either axis: with a vertical scale `start` is a y and `size` a
 * height, with a horizontal one they are an x and a width. Negative values come
 * back on the other side of the baseline with a positive size, which is what
 * SVG needs.
 *
 * @param  {Function} scale     Linear scale for the value axis
 * @param  {Number} value       Value to place
 * @return {Object}             { start, size }
 */
export const getBaselineExtent = (scale, value) => {
    const baseline = scale(0);
    const point = scale(value);

    return {
        start: Math.min(baseline, point),
        size: Math.abs(point - baseline),
    };
};

export default { getValueDomain, getBaselineExtent };
