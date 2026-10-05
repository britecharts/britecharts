/**
 * Geometry of the SVG a tooltip lives in, so the tooltip can keep itself
 * inside the chart without the chart having to say how big it is.
 *
 * Every chart draws into one root `<svg>` whose `width` and `height`
 * attributes are the chart's size in user units, and lays its groups out
 * with `translate(...)` transforms. A tooltip is a `<g>` somewhere in that
 * tree, so its frame is the root and its offset inside it is the sum of the
 * translations above it, read from the transform attributes. That is the
 * same answer `getCTM()` would give in a browser, minus the viewBox
 * ambiguity between engines, and it also works under jsdom, which has no
 * geometry at all -- so one code path is covered by the unit specs and by
 * the hover pages in packages/integration alike.
 *
 * @private
 */
import type { PlacementFrame } from './place';

/**
 * What this module reads off a node, declared structurally rather than as
 * `Element` or `SVGElement`, because the duck typing here is load-bearing in
 * both directions.
 *
 * `translationOf` walks up `parentNode`, so it really does meet nodes with no
 * `getAttribute` -- a `Document` ends the chain -- and the `getAttribute &&`
 * guard below is live. In the other direction `ownerSVGElement` is on
 * `SVGElement`, not `Element`, while the specs and the tooltip both hand these
 * functions whatever `querySelector` and d3's `.node()` return. Every member is
 * optional for that reason, which is also what makes `Element`, `Node`,
 * `SVGElement` and `SVGSVGElement` all assignable to it.
 *
 * Declared this way rather than tested with `instanceof`, which would be a
 * different runtime check than the one this code has always made.
 */
type SvgNodeLike = {
    ownerSVGElement?: SVGSVGElement | null;
    getAttribute?: (name: string) => string | null;
    parentNode?: ParentNode | null;
    tagName?: string;
};

/** [x, y] in root user units. */
export type Offset = [number, number];

/**
 * The frame a tooltip has to stay inside, which is exactly what `place` takes
 * plus the measured node's own origin. Spelled as an extension of
 * `PlacementFrame` so the two stay in step: `measureFrame`'s result is passed
 * straight into `place`.
 */
export type TooltipFrame = PlacementFrame & {
    /** The node's own origin in root user units */
    origin: Offset;
};

const TRANSLATE = /translate\(\s*([-+\d.eE]+)(?:[\s,]+([-+\d.eE]+))?\s*\)/;

/**
 * Reads the translate() of one element's transform attribute
 * @param node    An SVG element
 * @return [x, y], zeros when there is no translate
 * @private
 */
export function translateOf(node: SvgNodeLike | null | undefined): Offset {
    const transform = node?.getAttribute && node.getAttribute('transform');
    const match = transform && transform.match(TRANSLATE);

    if (!match) {
        return [0, 0];
    }

    return [parseFloat(match[1]) || 0, parseFloat(match[2]) || 0];
}

/**
 * Sums the translations from the node up to (not including) the root svg
 * @param node    An SVG element inside a root svg
 * @return [x, y] offset in root user units
 * @private
 */
function translationOf(node: SvgNodeLike | null | undefined): Offset {
    let x = 0;
    let y = 0;
    let current: SvgNodeLike | null | undefined = node;

    while (current && current.ownerSVGElement) {
        const [dx, dy] = translateOf(current);

        x += dx;
        y += dy;
        current = current.parentNode;
    }

    return [x, y];
}

/**
 * Origin of an SVG element in the user space of its root svg.
 * The root svg itself, and anything that is not inside one, sits at [0, 0].
 * @param node    The element to locate
 * @return [x, y] in root user units
 * @private
 */
export function originOf(node: SvgNodeLike | null | undefined): Offset {
    if (!node || !node.ownerSVGElement) {
        return [0, 0];
    }

    return translationOf(node);
}

/**
 * Size of the root svg along one axis, from its attribute; Infinity when the
 * attribute is missing or not a length, so callers never clamp to nothing.
 * @param root    The root svg, or null
 * @param name    'width' or 'height'
 * @private
 */
function sizeOf(
    root: SvgNodeLike | null | undefined,
    name: 'width' | 'height'
): number {
    // `?? ''` where this passed `getAttribute`'s null straight to parseFloat
    // and let it coerce. Same result -- parseFloat(null) and parseFloat('') are
    // both NaN, which the check below turns into Infinity -- spelled so it
    // types.
    const value = root ? parseFloat(root.getAttribute?.(name) ?? '') : NaN;

    return Number.isFinite(value) && value > 0 ? value : Infinity;
}

/**
 * Measures the frame a node has to stay inside: its root svg's size and the
 * node's own position within it.
 * @param node    Any element inside the chart's svg (or the svg)
 * @return The root svg's size and the node's origin inside it
 * @private
 */
export function measureFrame(
    node: SvgNodeLike | null | undefined
): TooltipFrame {
    const isSvg = node && String(node.tagName).toLowerCase() === 'svg';
    const root = node ? node.ownerSVGElement || (isSvg ? node : null) : null;

    return {
        width: sizeOf(root, 'width'),
        height: sizeOf(root, 'height'),
        origin: originOf(node),
    };
}
