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

/** Which side of the anchor the box sits on. */
export type PlacementSide = 'right' | 'left';

/**
 * A coordinate pair this module is willing to be handed.
 *
 * The elements are `number | undefined` rather than `number` on purpose: every
 * one goes through `finite()` below, which exists precisely because the caller
 * may not have a usable number yet. `NaN` is already a `number`, so the union
 * is only about a missing element -- and the specs drive exactly that case to
 * prove a degenerate anchor cannot become a NaN transform. Typing these as
 * `[number, number]` would describe what the tooltip happens to pass today
 * instead of what the function promises to survive.
 */
type LoosePair = readonly [number | undefined, number | undefined];

/** The box the placement has to fit inside. `Infinity` means unbounded. */
export type PlacementFrame = {
    width: number;
    height: number;
};

export type PlacementOptions = {
    /** [x, y] the box is placed next to */
    anchor: LoosePair;
    /** [width, height] of the box */
    size: LoosePair;
    /**
     * { width, height } of the frame; `Infinity` means unbounded.
     *
     * Optional, and the specs rely on that: a missing frame is treated as
     * unbounded, which is what the `frame &&` guard below is for.
     */
    frame?: PlacementFrame;
    /** Distance between the anchor and the box's near edge */
    gap?: number;
    /** Preferred side of the anchor */
    side?: PlacementSide;
    /** Added to the anchor's y before clamping */
    offsetY?: number;
};

export type Placement = {
    /** Left edge of the box, frame units */
    x: number;
    /** Top edge of the box, frame units */
    y: number;
    /** Side of the anchor the box ended on */
    side: PlacementSide;
};

/**
 * Keeps a value within [min, max]; when the range is inverted (the box is
 * bigger than the frame) the minimum wins, so the box starts at the edge.
 * @private
 */
function clamp(value: number, min: number, max: number): number {
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
function finite(value: number | undefined): number {
    return Number.isFinite(value) ? (value as number) : 0;
}

/**
 * Places a box of a given size next to an anchor inside a frame
 * @param options
 * @return Where the box goes, and which side of the anchor it ended on
 * @private
 */
export function place({
    anchor,
    size,
    frame,
    gap = 12,
    side = 'right',
    offsetY = 0,
}: PlacementOptions): Placement {
    const anchorX = finite(anchor[0]);
    const anchorY = finite(anchor[1]);
    const width = finite(size[0]);
    const height = finite(size[1]);
    const frameWidth = frame && frame.width > 0 ? frame.width : Infinity;
    const frameHeight = frame && frame.height > 0 ? frame.height : Infinity;
    const fits: Record<PlacementSide, boolean> = {
        right: anchorX + gap + width <= frameWidth,
        left: anchorX - gap - width >= 0,
    };
    const other: PlacementSide = side === 'right' ? 'left' : 'right';
    const chosen = !fits[side] && fits[other] ? other : side;
    const x = chosen === 'right' ? anchorX + gap : anchorX - gap - width;
    const y = anchorY + finite(offsetY);

    return {
        x: clamp(x, 0, frameWidth - width),
        y: clamp(y, 0, frameHeight - height),
        side: chosen,
    };
}
