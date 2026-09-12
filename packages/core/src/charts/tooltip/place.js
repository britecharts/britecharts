/**
 * Positions a box next to an anchor point so that it stays inside a frame.
 *
 * Pure: everything it needs arrives as numbers, so the specs can drive every
 * case without a DOM, and the tooltip and the mini tooltip share one set of
 * rules -- the box goes on the preferred side of the anchor, flips to the
 * other side when there is no room, and slides vertically so it never leaves
 * the frame.
 *
 * @private
 */

/**
 * @private
 * @typedef {Object} Placement
 * @property {number} x                 Left edge of the box, frame units
 * @property {number} y                 Top edge of the box, frame units
 * @property {'right'|'left'} side      Side of the anchor the box ended on
 */

/**
 * Keeps a value within [min, max]; when the range is inverted (the box is
 * bigger than the frame) the minimum wins, so the box starts at the edge.
 * @private
 */
function clamp(value, min, max) {
    if (max < min) {
        return min;
    }

    return Math.min(Math.max(value, min), max);
}

/**
 * A finite number, or zero: a NaN anchor would otherwise become a NaN
 * transform, which SVG renders as nothing at all.
 * @private
 */
function finite(value) {
    return Number.isFinite(value) ? value : 0;
}

/**
 * Places a box of a given size next to an anchor inside a frame
 * @param {Object} options
 * @param {number[]} options.anchor         [x, y] the box is placed next to
 * @param {number[]} options.size           [width, height] of the box
 * @param {Object} options.frame            { width, height } of the frame; Infinity means unbounded
 * @param {number} [options.gap=12]         Distance between the anchor and the box's near edge
 * @param {'right'|'left'} [options.side='right']  Preferred side of the anchor
 * @param {number} [options.offsetY=0]      Added to the anchor's y before clamping
 * @return {Placement}
 * @private
 */
export function place({
    anchor,
    size,
    frame,
    gap = 12,
    side = 'right',
    offsetY = 0,
}) {
    const anchorX = finite(anchor[0]);
    const anchorY = finite(anchor[1]);
    const width = finite(size[0]);
    const height = finite(size[1]);
    const frameWidth = frame && frame.width > 0 ? frame.width : Infinity;
    const frameHeight = frame && frame.height > 0 ? frame.height : Infinity;
    const fits = {
        right: anchorX + gap + width <= frameWidth,
        left: anchorX - gap - width >= 0,
    };
    const other = side === 'right' ? 'left' : 'right';
    const chosen = !fits[side] && fits[other] ? other : side;
    const x = chosen === 'right' ? anchorX + gap : anchorX - gap - width;
    const y = anchorY + finite(offsetY);

    return {
        x: clamp(x, 0, frameWidth - width),
        y: clamp(y, 0, frameHeight - height),
        side: chosen,
    };
}
