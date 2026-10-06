// Naming: H and V describe the lines a grid draws -- horizontal lines come
// from the y-scale's ticks, vertical lines from the x-scale's -- while X and Y
// name scales and axes. So gridHorizontal(yScale) draws horizontal lines, and
// on the 2D grid ticksH() sets the ticks of the horizontal lines, which are
// taken from scaleY().

import { scaleLinear } from 'd3-scale';
import type { BaseType, Selection } from 'd3-selection';
import type { Transition } from 'd3-transition';

import { classArray } from './classes';

/**
 * A d3 scale with a numeric range: continuous (`scaleLinear`, `scaleTime`, ...)
 * or band (`scaleBand`, `scalePoint`). Band scales are recognised through
 * `bandwidth()` and their lines are centred on the band.
 * @typedef {function} GridScale
 */
// Everything above goes on the generated API page, so it is kept to what a
// caller needs. The `@typedef` is what puts it there: this is a real type now,
// which jsdoc has no way to know is documented, and without the tag the
// `@param {GridScale}` tags below would render as plain text rather than links
// to an explanation.
//
// Declared as the surface this file actually uses rather than as a union of
// d3's scale types. Those differ in ways that matter here -- only band scales
// have `bandwidth`/`round`, only continuous ones have `ticks` -- and the code
// already feature-detects both. The optional members say exactly that, so the
// detection narrows instead of being cast away.
export type GridScale = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any): number | undefined;
    domain(): unknown[];
    range(): number[];
    copy(): GridScale;
    bandwidth?: () => number;
    round?: () => boolean;
    ticks?: (count?: number) => unknown[];
};

/**
 * A d3 selection to render into, or a d3 transition on one. Given a
 * transition, entering and exiting lines fade and slide between positions.
 *
 * `any` for the datum and parent generics for the same reason as filter.ts and
 * text.ts: `Selection` is invariant in them, the charts pass a variety, and
 * nothing here reads the datum.
 */
/**
 * Which edge lines `hideEdges` suppresses: a boolean for both-or-neither, or
 * the name of one end.
 */
/**
 * The container element, which the grid stashes its positioning function on so
 * an entering line can animate from wherever the previous grid had it. Not a
 * standard DOM property, hence the declaration.
 */
type WithSavedPosition<TElement> = TElement & {
    __pos?: (d: unknown) => number;
};

/**
 * The grid's lines, as either a selection or a transition on one. `gridBase`
 * swaps a selection for a transition when it was called on one, and the API it
 * uses afterwards -- `attr` and `remove` -- exists on both, so this union is
 * callable without narrowing.
 */
type LineSelectionOrTransition =
    | Selection<SVGLineElement, unknown, BaseType, unknown>
    | Transition<SVGLineElement, unknown, BaseType, unknown>;

export type HideEdges = boolean | 'both' | 'first' | 'last';

/**
 * The one-dimensional grid `gridHorizontal` and `gridVertical` return.
 *
 * Each accessor is a getter/setter overload pair, getter first and setter last.
 * The implementation below assigns a single `function (_?: X)` per accessor,
 * which infers the return as `X | typeof gridBaseGenerator` -- a union with no
 * accessor on it, so the chain every chart writes stopped compiling at the
 * second call:
 *
 *     gridHorizontal(yScale).range([0, chartWidth]).hideEdges('first')
 *
 * All six charts that draw a grid chain like that -- bar, grouped-bar, line,
 * scatter-plot, stacked-area and stacked-bar -- so this blocked every one of
 * them. The overloads say what the runtime has always done:
 * `if (!arguments.length) { return value; }`, else return the generator.
 *
 * Setter last is load-bearing beyond readability: conditional inference against
 * an overloaded method reads the last overload, which is how
 * `ChartConfiguration` in the wrappers package derives a config value's type.
 */
export interface GridBaseGenerator {
    (context: GridContext): void;
    /** Gets or sets the scale whose ticks the grid draws. */
    scale(): GridScale;
    scale(value: GridScale): GridBaseGenerator;
    /** Gets or sets the length and positioning of the lines. */
    range(): number[];
    range(value: number[]): GridBaseGenerator;
    /** Gets or sets the inset at the start of each line. */
    offsetStart(): number;
    offsetStart(value: number): GridBaseGenerator;
    /** Gets or sets the inset at the end of each line. */
    offsetEnd(): number;
    offsetEnd(value: number): GridBaseGenerator;
    /** Gets or sets which edge lines are suppressed. */
    hideEdges(): HideEdges;
    hideEdges(value: HideEdges): GridBaseGenerator;
    /**
     * Gets or sets the approximate tick count.
     *
     * The getter is `null` until one is set: the generator falls back to the
     * scale's own ticks.
     */
    ticks(): number | null;
    ticks(value: number): GridBaseGenerator;
    /**
     * Gets or sets the exact domain values to place ticks at.
     *
     * The getter is `null` until they are set, and returns a copy rather than
     * the stored array. `null` goes in to clear them again.
     */
    tickValues(): unknown[] | null;
    tickValues(value: unknown[] | null): GridBaseGenerator;
    /**
     * Gets or sets the axis baseline's inset in px.
     *
     * The getter is `null` until one is set, which draws no baseline.
     */
    extendedLine(): number | null;
    extendedLine(value: number): GridBaseGenerator;
    /**
     * Gets or sets the tick value whose line is highlighted.
     *
     * The getter is `null` until one is set, which highlights nothing.
     */
    highlight(): unknown;
    highlight(value: unknown): GridBaseGenerator;
}

/**
 * A d3 selection to render into, or a d3 transition on one. Given a
 * transition, entering and exiting lines fade and slide between positions.
 * @typedef {Object} GridContext
 */
export type GridContext =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Selection<any, any, any, any> | Transition<any, any, any, any>;

// Opacity for fade in/out
const EPSILON = 1e-6;

const COMPONENT_CLASSNAME = 'grid';
const DIRECTION_HORIZONTAL = 'horizontal';
const DIRECTION_VERTICAL = 'vertical';
const DIRECTION_FULL = 'full';

// Direction orientations
const DIR = {
    H: DIRECTION_HORIZONTAL,
    V: DIRECTION_VERTICAL,
};

/**
 * Higher order function that returns the default positioning function for continuous scales
 * The +0.5 avoids anti-aliasing artifacts
 * @param {GridScale} scale - Scale for positioning
 * @return {function}
 * @private
 */
function positionNumber(scale: GridScale) {
    return (d: unknown) => +(scale(d) as number) + 0.5;
}

/**
 * Higher order function that returns the positioning function for bandwidth scales
 * Also adjusted for anti-aliasing
 * @param {GridScale} scale - Scale for positioning
 * @return {function}
 * @private
 */
function positionCenter(scale: GridScale) {
    // Only reached for band scales, which is what gridBaseGenerator's
    // `scale.bandwidth ? ...` check establishes before calling this.
    let offset = Math.max(0, scale.bandwidth!() - 1) / 2;

    if (scale.round!()) {
        offset = Math.round(offset);
    }

    return (d: unknown) => +(scale(d) as number) + offset + 0.5;
}

/**
 * Constructor for a one-dimensional grid helper
 * @param {string} orient - orientation string to define the direction
 * @param {GridScale} scale - d3 scale for the grid's ticks
 * @return {gridBaseGenerator}
 * @private
 */
function gridBase(orient: string, scale: GridScale) {
    let range: number[] = [0, 1],
        offsetStart = 0,
        offsetEnd = 0,
        // Not just `boolean`: the initialiser is `false`, but getValues()
        // compares this against 'both', 'first' and 'last'. TypeScript called
        // those comparisons impossible, which they were under the inferred
        // boolean -- the union is what the accessor has always accepted.
        // 'first' rather than false: every one of the twelve grid
        // constructions in the charts passes 'first' explicitly, so this is
        // the value the helper is actually always used with.
        hideEdges: HideEdges = 'first',
        ticks: number | null = null,
        tickValues: unknown[] | null = null,
        extendedLine: number | null = null,
        highlight: unknown = null;

    // Create a class array helper for producing class lists
    const classArr = classArray(COMPONENT_CLASSNAME, orient);
    // Manage horizontal and vertical directions by setting the a parameter
    // to use in svg attributes
    const x = orient === DIR.H ? 'x' : 'y';
    const y = orient === DIR.H ? 'y' : 'x';

    /**
     * Generator function for one-dimensional grid
     * @param {GridContext} context - d3 selection or transition to use as the container
     */
    function gridBaseGenerator(context: GridContext) {
        const values = getValues(),
            // Get the appropriate function to position the lines, based on scale type
            // Pass a duplicate scale to ensure position values are fixed until grid updated
            position = (scale.bandwidth ? positionCenter : positionNumber)(
                scale.copy()
            ),
            // Set parameter to ensure correct line offset positions for inverted ranges
            k = range[range.length - 1] >= range[0] ? 1 : -1,
            // If passed a transition, convert to selection
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            selection = (
                'selection' in context
                    ? context.selection()
                    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      context
            ) as Selection<any, any, any, any>,
            // Set up container element
            initContainer = selection
                .selectAll<SVGGElement, null>(classArr.asSelector())
                .data([null]),
            container = initContainer.merge(
                initContainer
                    .enter()
                    .append('g')
                    .attr('class', classArr.asList())
            ),
            // Set up line selections
            // Scoped to the grid lines: the extended line shares the container
            initLine = container
                .selectAll<SVGLineElement, unknown>('line.grid-line')
                // The scale doubles as the key function -- d3 calls it with
                // each datum, which is exactly what a scale takes.
                .data(values, scale as unknown as (d: unknown) => string)
                .order();

        // Reassigned below when the grid was called on a transition, so this
        // one stays a `let` while everything above it is write-once.
        let lineEnter = initLine
            .enter()
            .append('line')
            .attr('class', 'grid-line');

        // Both of these hold a selection, or a transition on one once the grid
        // has been called on a transition. Declared as that union rather than
        // cast: everything used past this point -- `attr` and `remove` -- is on
        // both, so the union is directly callable.
        const lineSelection = initLine
            .merge(lineEnter)
            .attr('class', (d: unknown) =>
                highlight !== null && d === highlight
                    ? `grid-line ${orient}-grid-line--highlighted`
                    : 'grid-line'
            );

        let line: LineSelectionOrTransition = lineSelection;
        let lineExit: LineSelectionOrTransition = initLine.exit();

        // Run animations only if grid was called on a transition
        if (context !== selection) {
            // Higher-order function that returns a function to position the exiting grid lines
            // Requires a HOF to pass the attribute name to the inner function
            const exitPosition = (attr: string) =>
                function (this: SVGLineElement, d: unknown) {
                    return isFinite((d = position(d)) as number)
                        ? (d as number)
                        : this.getAttribute(attr);
                };

            // Function to initially position the entering grid lines
            // Pulls the previously saved positioning function from the parent node if it exists
            const enterPosition = function (this: SVGLineElement, d: unknown) {
                let p = (this.parentNode as WithSavedPosition<Element> | null)
                    ?.__pos as ((d: unknown) => number) | number | undefined;

                return p && isFinite((p = (p as (d: unknown) => number)(d)))
                    ? p
                    : position(d);
            };

            // `context` is a transition here -- that is what
            // `context !== selection` establishes -- but the union cannot be
            // narrowed on an identity comparison, so it is named as one.
            const transition = context as Transition<
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                any,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                any,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                any,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                any
            >;

            line = lineSelection.transition(transition);

            lineExit = initLine
                .exit<unknown>()
                .transition(transition)
                .attr('opacity', EPSILON)
                .attr(y + '1', exitPosition(y + '1'))
                .attr(y + '2', exitPosition(y + '2'));

            lineEnter = lineEnter
                .attr('opacity', EPSILON)
                .attr(y + '1', enterPosition)
                .attr(y + '2', enterPosition);
        }

        lineExit.remove();

        line.attr('opacity', 1);
        line.attr(x + '1', +range[0] - k * offsetStart);
        line.attr(x + '2', +range[range.length - 1] + k * offsetEnd);
        line.attr(y + '1', (d: unknown) => position(d));
        line.attr(y + '2', (d: unknown) => position(d));

        drawExtendedLine(container, k);

        // Attach the positioning function as a property of the container element
        // This stores it for future use as the starting point for the lineEnter transition
        // Cannot use arrow function as this must refer to the element
        container.each(function (this: BaseType) {
            (this as WithSavedPosition<Element>).__pos = position;
        });
    }

    // HELPERS

    /**
     * Draws (or removes) the extended line: the axis baseline, a solid line
     * at the start of the scale's own range, spanning the grid's range. It is
     * inset from the start of that range by the extendedLine offset, which is
     * where a chart leaves room for its axis labels.
     * @param {GridContext} container - the grid's container group
     * @param {number} k - 1 or -1, the direction of the range
     * @private
     */
    function drawExtendedLine(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        container: Selection<any, any, any, any>,
        k: number
    ) {
        const className = `extended-${x}-line`;
        const extended = container
            // Typed so that merging the enter selection -- which appends a
            // line -- lines up with it.
            .selectAll<SVGLineElement, null>(`line.${className}`)
            .data(extendedLine === null ? [] : [null]);
        const at = +scale.range()[0];

        extended.exit().remove();

        extended
            .enter()
            .append('line')
            .attr('class', className)
            .merge(extended)
            .attr(x + '1', +range[0] + k * extendedLine!)
            .attr(x + '2', +range[range.length - 1])
            .attr(y + '1', at)
            .attr(y + '2', at);
    }

    /**
     * Extract the tick values and adjust for edge hiding
     * @return {number[]}
     * @private
     */
    function getValues(): unknown[] {
        const hideFirst =
                hideEdges === true ||
                hideEdges === 'both' ||
                hideEdges === 'first',
            hideLast =
                hideEdges === true ||
                hideEdges === 'both' ||
                hideEdges === 'last',
            values = tickValues === null ? scaleTicks() : tickValues.slice();

        if (hideFirst) values.shift();
        if (hideLast) values.pop();

        return values;
    }

    /**
     * Get the tick values from the underlying scales
     * @return {number[]}
     * @private
     */
    function scaleTicks(): unknown[] {
        let scaleTicks;

        if (scale.ticks) {
            scaleTicks = ticks ? scale.ticks(ticks) : scale.ticks();
        } else {
            scaleTicks = scale.domain();
        }

        return scaleTicks.slice();
    }

    // API

    /**
     * Gets or sets the scale
     * Scale applies the ticks to the grid
     * @param {GridScale} [_] - d3 scale instance
     * @return {GridScale|gridBaseGenerator}
     * @public
     */
    gridBaseGenerator.scale = function (_?: GridScale) {
        if (!arguments.length) {
            return scale;
        }
        scale = _!;

        return gridBaseGenerator;
    };

    /**
     * Gets or sets the range
     * Governs the underlying length and positioning of the grid lines relative to the container
     * Should usually be set to the output range from the orthogonal scale in a 2D chart
     * @param {number[]} [_] - Array representing the output range
     * @return {number[]|gridBaseGenerator}
     * @public
     */
    gridBaseGenerator.range = function (_?: number[]) {
        if (!arguments.length) {
            return range;
        }
        range = _!;

        return gridBaseGenerator;
    };

    /**
     * Gets or sets the start offset
     * Start offset is the distance before the start position of the scale's range that the grid will render
     * @param {number} [_] - Offset in px
     * @return {GridScale|gridBaseGenerator}
     * @public
     */
    gridBaseGenerator.offsetStart = function (_?: number) {
        if (!arguments.length) {
            return offsetStart;
        }
        offsetStart = _!;

        return gridBaseGenerator;
    };

    /**
     * Gets or sets the end offset
     * End offset is the distance after the end position of the scale's range that the grid will render
     * @param {number} [_] - Offset in px
     * @return {GridScale|gridBaseGenerator}
     * @public
     */
    gridBaseGenerator.offsetEnd = function (_?: number) {
        if (!arguments.length) {
            return offsetEnd;
        }
        offsetEnd = _!;

        return gridBaseGenerator;
    };

    /**
     * Gets or sets the hideEdges parameter
     * Determines if the first and last grid line are suppressed
     * True or 'both' suppress both edges, 'first' and 'last' suppress the grid line
     * corresponding to the first and last tick value respectively
     * @param {boolean|string} [_] - hideEdges parameter, accepts boolean and 'both', 'first', or 'last' strings
     * @return {boolean|string|gridBaseGenerator}
     * @public
     */
    gridBaseGenerator.hideEdges = function (_?: HideEdges) {
        if (!arguments.length) {
            return hideEdges;
        }
        hideEdges = _!;

        return gridBaseGenerator;
    };

    /**
     * Gets or sets the tick count
     * Mirrors d3 axis' ticks API method
     * @param {number} [_] - Approximate tick count
     * @return {number|gridBaseGenerator}
     * @public
     */
    gridBaseGenerator.ticks = function (_?: number) {
        if (!arguments.length) {
            return ticks;
        }
        ticks = _!;

        return gridBaseGenerator;
    };

    /**
     * Gets or sets the tick values
     * Mirrors d3 axis' tickValues API method
     * @param {number[]} [_] - Array of domain values to place ticks
     * @return {number[]|gridBaseGenerator}
     * @public
     */
    gridBaseGenerator.tickValues = function (_?: unknown[] | null) {
        if (!arguments.length) {
            return tickValues && tickValues.slice();
        }
        tickValues = _ === null ? null : [...(_ as unknown[])].slice();

        return gridBaseGenerator;
    };

    /**
     * Gets or sets the extended line offset
     * The extended line is the axis baseline: a solid line at the start of the
     * scale's range, spanning the grid's range. A number draws it, inset by
     * that many px from the start of the range (room for the axis labels);
     * null, the default, draws none. The line carries the class
     * `extended-x-line` on a horizontal grid and `extended-y-line` on a
     * vertical one.
     * @param {number|null} [_] - Inset in px, or null for no line
     * @return {number|null|gridBaseGenerator}
     * @public
     */
    gridBaseGenerator.extendedLine = function (_?: number) {
        if (!arguments.length) {
            return extendedLine;
        }
        extendedLine = _!;

        return gridBaseGenerator;
    };

    /**
     * Gets or sets the highlighted tick value
     * The grid line drawn at this value (typically 0, when the data crosses it)
     * also gets the class `horizontal-grid-line--highlighted` or
     * `vertical-grid-line--highlighted`. Only a line that exists is
     * highlighted, so the value must be one of the ticks. null, the default,
     * highlights nothing.
     * @param {number|Date|string|null} [_] - Tick value to highlight, or null
     * @return {number|Date|string|null|gridBaseGenerator}
     * @public
     */
    gridBaseGenerator.highlight = function (_?: unknown) {
        if (!arguments.length) {
            return highlight;
        }
        highlight = _!;

        return gridBaseGenerator;
    };

    // The accessors above are assigned one `function (_?: X)` each, so their
    // inferred return is `X | typeof gridBaseGenerator`. `GridBaseGenerator`
    // declares the overload pair each one really is, which is what lets the
    // charts chain; the cast is the one place the two descriptions meet.
    return gridBaseGenerator as unknown as GridBaseGenerator;
}

/**
 * Constructor for a two-dimensional grid helper
 * @param {GridScale} scaleX - d3 scale for the grid's x direction
 * @param {GridScale} scaleY - d3 scale for the grid's y direction
 * @return {gridGenerator}
 * @memberof Grid
 * @alias module:Grid.grid
 * @example
 * const grid = grid(xScale, yScale)
        .offsetStart(5)
        .hideEdges(true)
        .ticks(4);

    grid(svg.select('.grid-lines-group'));
 */
export function grid(scaleX: GridScale, scaleY: GridScale) {
    const gridH = gridHorizontal(scaleY || scaleLinear());
    const gridV = gridVertical(scaleX || scaleLinear());

    let direction = DIRECTION_FULL,
        tickValuesX: unknown[] | null = null,
        tickValuesY: unknown[] | null = null;

    /**
     * Generator function for two-dimensional grid
     * @param {GridContext} context - d3 selection or transition to use as the container
     */
    function gridGenerator(context: GridContext) {
        // Statements rather than discarded ternary expressions. Chaining
        // `.tickValues(...).range(...)` reads the accessor's return type, which
        // is the value-or-generator union every getter/setter has; calling them
        // in sequence needs no cast and does exactly the same thing, since the
        // chain's result was thrown away.
        if (
            direction === DIRECTION_FULL ||
            direction === DIRECTION_HORIZONTAL
        ) {
            gridH.tickValues(tickValuesY);
            gridH.range(scaleX.range());
        } else {
            gridH.tickValues([]);
        }

        if (direction === DIRECTION_FULL || direction === DIRECTION_VERTICAL) {
            gridV.tickValues(tickValuesX);
            gridV.range(scaleY.range());
        } else {
            gridV.tickValues([]);
        }

        context.call(gridH).call(gridV);
    }

    // API

    /**
     * Gets or sets the x-scale
     * X-scale applies ticks to the vertical grid and range to the horizontal grid
     * @param {GridScale} [_] - d3 scale instance
     * @return {GridScale|gridGenerator}
     * @public
     */
    // The 2D accessors from here down forward to the two one-dimensional grids,
    // whose setters now declare a required parameter. Each forwarding call
    // therefore passes `_!`, the same assertion the stored assignment beside it
    // already used: the `arguments.length` guard above is what establishes the
    // value is there, and it is not something TypeScript can follow.
    gridGenerator.scaleX = function (_?: GridScale) {
        if (!arguments.length) {
            return scaleX;
        }
        scaleX = _!;
        gridV.scale(_!);

        return gridGenerator;
    };

    /**
     * Gets or sets the y-scale
     * Y-scale applies ticks to the horizontal grid and range to the vertical grid
     * @param {GridScale} [_] - d3 scale instance
     * @return {GridScale|gridGenerator}
     * @public
     */
    gridGenerator.scaleY = function (_?: GridScale) {
        if (!arguments.length) {
            return scaleY;
        }
        scaleY = _!;
        gridH.scale(_!);

        return gridGenerator;
    };

    /**
     * Gets or sets the direction of the grid
     * Direction of 'full' will render both horizontal and vertical grid lines
     * Either 'horizontal' or 'vertical' wil render the respective lines
     * @param {string} [_] - Grid direction accepts 'full', 'vertical', or 'horizontal'
     * @return {string|gridGenerator}
     * @public
     */
    gridGenerator.direction = function (_?: string) {
        if (!arguments.length) {
            return direction;
        }
        direction = _!;

        return gridGenerator;
    };

    /**
     * Gets or sets both the horizontal and vertical grid start offset
     * Convenience method that sets the start offset for both horizontal and vertical grids
     * Returns the start offset of the horizontal grid if no argument is supplied
     * Start offset is the distance before the start position of the scale's range that the grid will render
     * @param {number} [_] - Offset in px
     * @return {number|gridGenerator}
     * @public
     */
    gridGenerator.offsetStart = function (_?: number) {
        if (!arguments.length) {
            return gridH.offsetStart();
        }
        gridH.offsetStart(_!);
        gridV.offsetStart(_!);

        return gridGenerator;
    };

    /**
     * Gets or sets the horizontal grid start offset
     * Returns the start offset of the horizontal grid if no argument is supplied
     * Start offset is the distance before the start of the x-scale's range that the grid will render
     * @param {number} [_] - Offset in px
     * @return {number|gridGenerator}
     * @public
     */
    gridGenerator.offsetStartH = function (_?: number) {
        if (!arguments.length) {
            return gridH.offsetStart();
        }
        gridH.offsetStart(_!);

        return gridGenerator;
    };

    /**
     * Gets or sets the vertical grid start offset
     * Returns the start offset of the vertical grid if no argument is supplied
     * Start offset is the distance before the start of the y-scale's range that the grid will render
     * @param {number} [_] - Offset in px
     * @return {number|gridGenerator}
     * @public
     */
    gridGenerator.offsetStartV = function (_?: number) {
        if (!arguments.length) {
            return gridV.offsetStart();
        }
        gridV.offsetStart(_!);

        return gridGenerator;
    };

    /**
     * Gets or sets both the horizontal and vertical grid end offset
     * Convenience method that sets the end offset for both horizontal and vertical grids
     * Returns the end offset of the horizontal grid if no argument is supplied
     * End offset is the distance after the end position of the scale's range that the grid will render
     * @param {number} [_] - Offset in px
     * @return {number|gridGenerator}
     * @public
     */
    gridGenerator.offsetEnd = function (_?: number) {
        if (!arguments.length) {
            return gridH.offsetEnd();
        }
        gridH.offsetEnd(_!);
        gridV.offsetEnd(_!);

        return gridGenerator;
    };

    /**
     * Gets or sets the horizontal grid end offset
     * Returns the end offset of the horizontal grid if no argument is supplied
     * End offset is the distance after the end of the x-scale's range that the grid will render
     * @param {number} [_] - Offset in px
     * @return {number|gridGenerator}
     * @public
     */
    gridGenerator.offsetEndH = function (_?: number) {
        if (!arguments.length) {
            return gridH.offsetEnd();
        }
        gridH.offsetEnd(_!);

        return gridGenerator;
    };

    /**
     * Gets or sets the vertical grid end offset
     * Returns the end offset of the vertical grid if no argument is supplied
     * End offset is the distance after the end of the y-scale's range that the grid will render
     * @param {number} [_] - Offset in px
     * @return {number|gridGenerator}
     * @public
     */
    gridGenerator.offsetEndV = function (_?: number) {
        if (!arguments.length) {
            return gridV.offsetEnd();
        }
        gridV.offsetEnd(_!);

        return gridGenerator;
    };

    /**
     * Gets or sets the hideEdges parameter for both horizontal and vertical grids
     * Returns the horizontal value if no argument specified
     * Determines if the first and last grid line are suppressed
     * True or 'both' suppress both edges, 'first' and 'last' suppress the grid line
     * corresponding to the first and last tick value respectively
     * @param {boolean|string} [_] - hideEdges parameter, accepts boolean and 'both', 'first', or 'last' strings
     * @return {boolean|string|gridGenerator}
     * @public
     */
    gridGenerator.hideEdges = function (_?: HideEdges) {
        if (!arguments.length) {
            return gridH.hideEdges();
        }
        gridH.hideEdges(_!);
        gridV.hideEdges(_!);

        return gridGenerator;
    };

    /**
     * Gets or sets the hideEdges parameter for the horizontal grid
     * Determines if the first and last grid line are suppressed
     * True or 'both' suppress both edges, 'first' and 'last' suppress the grid line
     * corresponding to the first and last tick value respectively
     * @param {boolean|string} [_] - hideEdges parameter, accepts boolean and 'both', 'first', or 'last' strings
     * @return {boolean|string|gridGenerator}
     * @public
     */
    gridGenerator.hideEdgesH = function (_?: HideEdges) {
        if (!arguments.length) {
            return gridH.hideEdges();
        }
        gridH.hideEdges(_!);

        return gridGenerator;
    };

    /**
     * Gets or sets the hideEdges parameter for the vertical grid
     * Determines if the first and last grid line are suppressed
     * True or 'both' suppress both edges, 'first' and 'last' suppress the grid line
     * corresponding to the first and last tick value respectively
     * @param {boolean|string} [_] - hideEdges parameter, accepts boolean and 'both', 'first', or 'last' strings
     * @return {boolean|string|gridGenerator}
     * @public
     */
    gridGenerator.hideEdgesV = function (_?: HideEdges) {
        if (!arguments.length) {
            return gridV.hideEdges();
        }
        gridV.hideEdges(_!);

        return gridGenerator;
    };

    /**
     * Gets or sets the tick count for both horizontal and vertical grids
     * Returns the horizontal ticks if no argument specified
     * Mirrors d3 axis' ticks API method
     * @param {number} [_] - Approximate tick count
     * @return {number|gridGenerator}
     * @public
     */
    gridGenerator.ticks = function (_?: number) {
        if (!arguments.length) {
            return gridH.ticks();
        }
        gridH.ticks(_!);
        gridV.ticks(_!);

        return gridGenerator;
    };

    /**
     * Gets or sets the tick count for the horizontal grid
     * Mirrors d3 axis' ticks API method
     * @param {number} [_] - Approximate tick count
     * @return {number|gridGenerator}
     * @public
     */
    gridGenerator.ticksH = function (_?: number) {
        if (!arguments.length) {
            return gridH.ticks();
        }
        gridH.ticks(_!);

        return gridGenerator;
    };

    /**
     * Gets or sets the tick count for the vertical grid
     * Mirrors d3 axis' ticks API method
     * @param {number} [_] - Approximate tick count
     * @return {number|gridGenerator}
     * @public
     */
    gridGenerator.ticksV = function (_?: number) {
        if (!arguments.length) {
            return gridV.ticks();
        }
        gridV.ticks(_!);

        return gridGenerator;
    };

    /**
     * Gets or sets the tick values for both horizontal and vertical grids
     * Returns the horizontal tick values if no argument specified
     * Mirrors d3 axis' tickValues API method
     * @param {number[]} [_] - Array of domain values to place ticks
     * @return {number[]|gridGenerator}
     * @public
     */
    gridGenerator.tickValues = function (_?: unknown[] | null) {
        if (!arguments.length) {
            return tickValuesY;
        }
        tickValuesX = tickValuesY = _ as unknown[] | null;

        return gridGenerator;
    };

    /**
     * Gets or sets the tick values for the horizontal grid
     * Mirrors d3 axis' tickValues API method
     * @param {number[]} [_] - Array of domain values to place ticks
     * @return {number[]|gridGenerator}
     * @public
     */
    gridGenerator.tickValuesH = function (_?: unknown[] | null) {
        if (!arguments.length) {
            return tickValuesY;
        }
        tickValuesY = _!;

        return gridGenerator;
    };

    /**
     * Gets or sets the tick values for the vertical grid
     * Mirrors d3 axis' tickValues API method
     * @param {number[]} [_] - Array of domain values to place ticks
     * @return {number[]|gridGenerator}
     * @public
     */
    gridGenerator.tickValuesV = function (_?: unknown[] | null) {
        if (!arguments.length) {
            return tickValuesX;
        }
        tickValuesX = _!;

        return gridGenerator;
    };

    /**
     * Gets or sets the extended line offset of the horizontal grid
     * See gridHorizontal's extendedLine
     * @param {number|null} [_] - Inset in px, or null for no line
     * @return {number|null|gridGenerator}
     * @public
     */
    gridGenerator.extendedLineH = function (_?: number) {
        if (!arguments.length) {
            return gridH.extendedLine();
        }
        gridH.extendedLine(_!);

        return gridGenerator;
    };

    /**
     * Gets or sets the extended line offset of the vertical grid
     * See gridVertical's extendedLine
     * @param {number|null} [_] - Inset in px, or null for no line
     * @return {number|null|gridGenerator}
     * @public
     */
    gridGenerator.extendedLineV = function (_?: number) {
        if (!arguments.length) {
            return gridV.extendedLine();
        }
        gridV.extendedLine(_!);

        return gridGenerator;
    };

    /**
     * Gets or sets the highlighted tick value of the horizontal grid
     * See gridHorizontal's highlight
     * @param {number|Date|string|null} [_] - Tick value to highlight, or null
     * @return {number|Date|string|null|gridGenerator}
     * @public
     */
    gridGenerator.highlightH = function (_?: unknown) {
        if (!arguments.length) {
            return gridH.highlight();
        }
        gridH.highlight(_);

        return gridGenerator;
    };

    /**
     * Gets or sets the highlighted tick value of the vertical grid
     * See gridVertical's highlight
     * @param {number|Date|string|null} [_] - Tick value to highlight, or null
     * @return {number|Date|string|null|gridGenerator}
     * @public
     */
    gridGenerator.highlightV = function (_?: unknown) {
        if (!arguments.length) {
            return gridV.highlight();
        }
        gridV.highlight(_);

        return gridGenerator;
    };

    return gridGenerator;
}

/**
 * Constructor for a horizontal grid helper
 * @param {GridScale} scale - d3 scale to initialize the grid
 * @return {gridBaseGenerator}
 * @public
 * @memberof Grid
 * @alias module:Grid.gridHorizontal
 * @example
 * const grid = gridHorizontal(yScale)
        .range([0, chartWidth])
        .hideEdges('first')
        .ticks(yTicks);

    grid(svg.select('.grid-lines-group'));
 */
export function gridHorizontal(scale: GridScale): GridBaseGenerator {
    return gridBase(DIR.H, scale);
}

/**
 * Constructor for a vertical grid helper
 * @param {GridScale} scale - d3 scale to initialize the grid
 * @return {gridBaseGenerator}
 * @public
 * @memberof Grid
 * @alias module:Grid.gridVertical
 * @example
 *  const grid = gridVertical(xScale)
        .range([0, chartHeight])
        .hideEdges('first')
        .ticks(xTicks);

    grid(svg.select('.grid-lines-group'));
 */
export function gridVertical(scale: GridScale): GridBaseGenerator {
    return gridBase(DIR.V, scale);
}

/**
 * Reusable Grid component helper that renders either a vertical, horizontal or full grid, and that
 * will usually be used inside charts. It could also be used as a standalone component to use on custom charts.
 *
 * Naming: H and V describe the lines a grid draws, X and Y name scales.
 * gridHorizontal(yScale) draws horizontal lines from the y-scale's ticks; on
 * the 2D grid, ticksH() sets the ticks of the horizontal lines (from scaleY())
 * and ticksV() those of the vertical lines (from scaleX()).
 * @module Grid
 * @requires d3-scale
 * @exports gridHorizontal
 * @exports gridVertical
 * @exports grid
 */
export default {
    gridHorizontal,
    gridVertical,
    grid,
};
