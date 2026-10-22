const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

let lastId = 0;

export type ChartLabel = {
    /** What the chart is announced as. Null falls back to `fallbackTitle`. */
    a11yTitle: string | null;
    /** Announced after the title. Null leaves the chart without one. */
    a11yDescription: string | null;
    /** The chart's type, such as "Bar chart", for when no title is set. */
    fallbackTitle: string;
    /**
     * `img` for a chart, whose marks are one picture. `group` for one whose
     * text should stay readable, such as the legend.
     */
    role?: 'img' | 'group';
};

const ownDesc = (svg: Element) =>
    Array.from(svg.children).find(
        (child) => child.tagName.toLowerCase() === 'desc'
    );

const ensureOwnDesc = (svg: Element) => {
    const existing = ownDesc(svg);

    if (existing) {
        return existing;
    }

    const element = svg.ownerDocument.createElementNS(SVG_NAMESPACE, 'desc');

    element.id = `britechart-desc-${++lastId}`;
    svg.insertBefore(element, svg.firstChild);

    return element;
};

/**
 * Gives a chart's svg the role, `aria-label` and `<desc>` that screen readers
 * announce. The name is an attribute, not a `<title>`: browsers show an svg's
 * `<title>` as a tooltip when the pointer rests on the chart. Run on every
 * render: it reuses the `<desc>` it made the first time and only updates its
 * text, so its id, and the attribute that points at it, stay stable.
 */
export const labelChart = (
    svg: Element | null,
    { a11yTitle, a11yDescription, fallbackTitle, role = 'img' }: ChartLabel
): void => {
    if (!svg) {
        return;
    }

    svg.setAttribute('role', role);
    svg.setAttribute('aria-label', a11yTitle ?? fallbackTitle);

    if (a11yDescription) {
        const descElement = ensureOwnDesc(svg);

        descElement.textContent = a11yDescription;
        svg.setAttribute('aria-describedby', descElement.id);
    } else {
        ownDesc(svg)?.remove();
        svg.removeAttribute('aria-describedby');
    }
};

/**
 * Whether the reader's system asks for reduced motion. Charts check it on
 * every render, so `isAnimated` gives way to it, and a change to the setting
 * applies from the next render. False where there is no `matchMedia`, as on a
 * server or in jsdom.
 */
export const prefersReducedMotion = (): boolean =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * A transition's duration in milliseconds, or 0 when the reader's system asks
 * for reduced motion. A transition of 0 still reaches its end state and fires
 * its end event, so code that waits for it keeps working.
 * @param duration  The duration with motion
 */
export const motionDuration = (duration: number): number =>
    prefersReducedMotion() ? 0 : duration;
