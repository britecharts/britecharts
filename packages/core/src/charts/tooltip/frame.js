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

const TRANSLATE = /translate\(\s*([-+\d.eE]+)(?:[\s,]+([-+\d.eE]+))?\s*\)/;

/**
 * Reads the translate() of one element's transform attribute
 * @param {Element} node    An SVG element
 * @return {number[]}       [x, y], zeros when there is no translate
 * @private
 */
export function translateOf(node) {
    const transform = node.getAttribute && node.getAttribute('transform');
    const match = transform && transform.match(TRANSLATE);

    if (!match) {
        return [0, 0];
    }

    return [parseFloat(match[1]) || 0, parseFloat(match[2]) || 0];
}

/**
 * Sums the translations from the node up to (not including) the root svg
 * @param {Element} node    An SVG element inside a root svg
 * @return {number[]}       [x, y] offset in root user units
 * @private
 */
function translationOf(node) {
    let x = 0;
    let y = 0;
    let current = node;

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
 * @param {Element} node    The element to locate
 * @return {number[]}       [x, y] in root user units
 * @private
 */
export function originOf(node) {
    if (!node || !node.ownerSVGElement) {
        return [0, 0];
    }

    return translationOf(node);
}

/**
 * Size of the root svg along one axis, from its attribute; Infinity when the
 * attribute is missing or not a length, so callers never clamp to nothing.
 * @param {Element} root    The root svg, or null
 * @param {String} name     'width' or 'height'
 * @return {number}
 * @private
 */
function sizeOf(root, name) {
    const value = root ? parseFloat(root.getAttribute(name)) : NaN;

    return Number.isFinite(value) && value > 0 ? value : Infinity;
}

/**
 * @private
 * @typedef {Object} TooltipFrame
 * @property {number} width         Root svg width in user units, or Infinity
 * @property {number} height        Root svg height in user units, or Infinity
 * @property {number[]} origin      The node's own origin in root user units
 */

/**
 * Measures the frame a node has to stay inside: its root svg's size and the
 * node's own position within it.
 * @param {Element} node    Any element inside the chart's svg (or the svg)
 * @return {TooltipFrame}
 * @private
 */
export function measureFrame(node) {
    const isSvg = node && String(node.tagName).toLowerCase() === 'svg';
    const root = node ? node.ownerSVGElement || (isSvg ? node : null) : null;

    return {
        width: sizeOf(root, 'width'),
        height: sizeOf(root, 'height'),
        origin: originOf(node),
    };
}
