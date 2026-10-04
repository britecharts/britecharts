import type { BaseType, Selection } from 'd3-selection';
// Imported for the side effect: d3-transition augments Selection with
// `.transition()`, which bounceCircleHighlight uses. Without it the method
// does not exist on the type. The charts already import d3-transition for the
// same reason at runtime.
import 'd3-transition';

/**
 * Any d3 selection these helpers are handed.
 *
 * The datum and parent generics are `any` deliberately. d3's `Selection` is
 * invariant in all of them, so naming concrete types here would force a cast
 * at every call site -- line and stacked-area pass selections of different
 * element and datum types -- and none of these helpers reads the datum. The
 * element stays a parameter so a caller keeps its own element type on the way
 * back out.
 *
 * This is the bounded `any` the migration plan allows for a selection's
 * trailing generics, not a shortcut.
 *
 * The element has to be a *generic parameter at each function*, not just a
 * default here. `Selection` is invariant in it as well, so a parameter typed
 * `FilterSelection<BaseType>` rejects the `Selection<SVGGElement, ...>` that
 * line and stacked-area actually hold. Fixing the element would have meant a
 * cast at every call site once those charts convert -- the same thing that bit
 * `ChartContainer` in Phase 1.
 */
type FilterSelection<TElement extends BaseType = BaseType> = Selection<
    TElement,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
>;

const filterId = 'highlight-filter';

export const createFilterContainer = <TElement extends BaseType>(
    metadataSelection: FilterSelection<TElement>
): FilterSelection<SVGFilterElement> => {
    const highlightFilter = metadataSelection
        .append('defs')
        .append('filter')
        .attr('id', filterId);

    return highlightFilter;
};

export const createGausianBlur = <TElement extends BaseType>(
    filterSelector: FilterSelection<TElement>
): string => {
    filterSelector
        .append('feGaussianBlur')
        .attr('stdDeviation', 1)
        .attr('result', 'coloredBlur');

    return filterId;
};

export const createGlow = <TElement extends BaseType>(
    filterSelector: FilterSelection<TElement>
): string => {
    filterSelector
        .attr('x', '-30%')
        .attr('y', '-30%')
        .attr('width', '160%')
        .attr('height', '160%');

    filterSelector
        .append('feGaussianBlur')
        .attr('stdDeviation', '0.9 0.9')
        .attr('result', 'glow');

    const merge = filterSelector.append('feMerge');

    merge.append('feMergeNode').attr('in', 'glow');

    merge.append('feMergeNode').attr('in', 'glow');

    merge.append('feMergeNode').attr('in', 'glow');

    return filterId;
};

export const createGlowWithMatrix = <TElement extends BaseType>(
    filterSelector: FilterSelection<TElement>
): string => {
    const colorMatrix = '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0';

    filterSelector
        .attr('x', '-500%')
        .attr('y', '-500%')
        .attr('width', '1800%')
        .attr('height', '1800%');

    filterSelector
        .append('feColorMatrix')
        .attr('type', 'matrix')
        .attr('values', colorMatrix);

    filterSelector
        .append('feGaussianBlur')
        .attr('stdDeviation', '1')
        .attr('result', 'coloredBlur')
        .attr('in', 'SourceGraphic');

    const merge = filterSelector.append('feMerge');

    merge.append('feMergeNode').attr('in', 'coloredBlur');

    merge.append('feMergeNode').attr('in', 'SourceGraphic');

    return filterId;
};

export const createWhiteGlow = <TElement extends BaseType>(
    filterSelector: FilterSelection<TElement>
): string => {
    filterSelector
        .attr('x', '-5000%')
        .attr('y', '-5000%')
        .attr('width', '10000%')
        .attr('height', '10000%');

    filterSelector
        .append('feFlood')
        .attr('result', 'flood')
        .attr('flood-color', '#ffffff')
        .attr('flood-opacity', '1');

    filterSelector
        .append('feComposite')
        .attr('result', 'mask')
        .attr('in2', 'SourceGraphic')
        .attr('operator', 'in')
        .attr('in', 'flood');

    filterSelector
        .append('feMorphology')
        .attr('result', 'dilated')
        .attr('operator', 'dilate')
        .attr('radius', '2')
        .attr('in', 'mask');

    filterSelector
        .append('feGaussianBlur')
        .attr('result', 'blurred')
        .attr('stdDeviation', '5')
        .attr('in', 'dilated');

    const merge = filterSelector.append('feMerge');

    merge.append('feMergeNode').attr('in', 'blurred');

    merge.append('feMergeNode').attr('in', 'SourceGraphic');

    return filterId;
};

/**
 * @param ease A d3 easing function: normalized time in, eased time out.
 * @private
 */
export const bounceCircleHighlight = <TElement extends BaseType>(
    el: FilterSelection<TElement>,
    ease: (normalizedTime: number) => number,
    radius: number,
    bounceRadius: number = radius * 2
): void => {
    const duration = 100;
    const delay = 50;

    el.transition()
        .ease(ease)
        .duration(duration)
        .attr('r', bounceRadius)
        .transition()
        .ease(ease)
        .delay(delay)
        .duration(duration)
        .attr('r', radius);
};

export default {
    bounceCircleHighlight,
    createFilterContainer,
    createGausianBlur,
    createWhiteGlow,
    createGlow,
    createGlowWithMatrix,
};
