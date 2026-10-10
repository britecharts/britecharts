/**
 * Scale types and readers for the charts whose axes change kind with their
 * orientation.
 *
 * @module Scale
 * @requires d3-scale
 */

/**
 * What a chart calls on an axis scale, typed structurally rather than as a d3
 * scale class.
 *
 * Several charts hold two different kinds of scale in one variable: `xScale` is
 * a `scaleLinear` when the chart is horizontal and a `scaleBand` when it is
 * vertical, and `yScale` is the mirror image. No single d3 class describes
 * either, and the `isHorizontal` flag cannot narrow a module-level `let`.
 * `GridScale` in grid.ts and `getBaselineExtent`'s `scale` parameter in
 * domain.ts already type scales this way, for the same reason -- narrower about
 * what is required, wider about what satisfies it.
 *
 * The call signature returns `number | undefined` because a band scale's does:
 * it maps a category name and has nothing to return for a name outside its
 * domain. `bandwidth` and `ticks` are optional because only one kind of scale
 * has each.
 * @typedef {function} AxisScale
 */
export type AxisScale = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any): number | undefined;
    domain(): unknown[];
    range(): number[];
    copy(): AxisScale;
    bandwidth?: () => number;
    ticks?: (count?: number) => unknown[];
};

// The value axis' scale, as `getBaselineExtent` and the bar tweens need it: a
// number in, a number out.
//
// `AxisScale`'s call signature is the band scale's, so it reports
// `number | undefined`, while `getBaselineExtent` asks for
// `(value: number) => number`. In the orientation each caller runs in, the
// scale really is the continuous one -- which is the thing `isHorizontal` knows
// and the type system cannot be told.
//
// Line comments rather than a doc block on purpose: jsdoc2md treats a `/** */`
// above a const arrow function as a public global, and these two landed on a
// chart's generated API page as accessors when they lived in grouped-bar.ts.
export const asValueScale = (scale: AxisScale) =>
    scale as unknown as (value: number) => number;

// The category axis' scale, for the paths that place a band by its name or
// measure one.
//
// Same trade as `asValueScale` in the other direction: every name handed to one
// of these comes from the scale's own domain, which is built from the data, so
// the `undefined` the call signature admits cannot occur there.
export const asCategoryScale = (scale: AxisScale) =>
    scale as unknown as {
        (value: string): number;
        bandwidth(): number;
    };
