/**
 * The one way both tooltips move: a fade in when shown, a fade out when
 * hidden, and an eased chase for position and size -- one duration and one
 * easing for all of it. Updates never touch the opacity, so a tooltip that
 * is already showing does not blink while the pointer moves.
 *
 * The fades run as a named transition, so a tooltip can fade and chase at
 * the same time without either cancelling the other.
 *
 * @private
 */
import { easeQuadInOut } from 'd3-ease';
import { select } from 'd3-selection';
import type { Selection } from 'd3-selection';
import 'd3-transition';

/**
 * The tooltip's root group, as a selection of it.
 *
 * Same convention as the helpers in `charts/helpers`: the datum and parent
 * generics are the migration plan's bounded `any` because `Selection` is
 * invariant in them and nothing here reads the datum, while the element is a
 * generic parameter on each function so a caller keeps its own element type.
 *
 * The element is narrower than the helpers' `BaseType`, though, and has to be:
 * `prepareToShow` reads `node.style`, which `BaseType` does not have -- it
 * admits `Document`, `Window` and `null`. `SVGElement | HTMLElement` is the
 * smallest bound that carries an inline style, and the real caller passes an
 * SVG `<g>`.
 */
type MotionSelection<TElement extends SVGElement | HTMLElement> = Selection<
    TElement,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
>;

/**
 * Milliseconds for a fade in or out
 * @private
 */
export const fadeDuration = 200;
/**
 * Milliseconds for the box to reach a new position or size
 * @private
 */
export const chaseDuration = 200;
/**
 * Easing for every tooltip transition
 * @private
 */
export const ease = easeQuadInOut;

const FADE = 'tooltip-fade';

/**
 * Makes the tooltip visible, ready to fade in once its content is right:
 * transparent when it was hidden, or at its current opacity when it is
 * still fading out -- the pointer crossing from one bar to the next hides
 * and shows the tooltip within one event, and it must not blink.
 * @param selection     The tooltip's root group
 * @private
 */
export function prepareToShow<TElement extends SVGElement | HTMLElement>(
    selection: MotionSelection<TElement>
): void {
    // The inline style, not the computed one: the tooltip sets it itself,
    // so it reads 'visible' only between a show and the end of a fade out
    const node = selection.node();
    const isFadingOut = !!node && node.style.visibility === 'visible';

    selection.interrupt(FADE).style('visibility', 'visible');

    if (!isFadingOut) {
        selection.style('opacity', 0);
    }
}

/**
 * Fades the tooltip in from its current opacity
 * @param selection     The tooltip's root group
 * @private
 */
export function fadeIn<TElement extends SVGElement | HTMLElement>(
    selection: MotionSelection<TElement>
): void {
    selection
        .interrupt(FADE)
        .transition(FADE)
        .duration(fadeDuration)
        .ease(ease)
        .style('opacity', 1);
}

/**
 * Fades the tooltip out and hides it once the fade completes. A show()
 * during the fade stops it and the tooltip stays visible.
 * @param selection     The tooltip's root group
 * @private
 */
export function fadeOut<TElement extends SVGElement | HTMLElement>(
    selection: MotionSelection<TElement>
): void {
    selection
        .interrupt(FADE)
        .transition(FADE)
        .duration(fadeDuration)
        .ease(ease)
        .style('opacity', 0)
        .on('end', function () {
            select(this).style('visibility', 'hidden');
        });
}
