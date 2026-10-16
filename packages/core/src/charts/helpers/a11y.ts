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

const ownChild = (svg: Element, tagName: 'title' | 'desc') =>
    Array.from(svg.children).find(
        (child) => child.tagName.toLowerCase() === tagName
    );

const ensureOwnChild = (
    svg: Element,
    tagName: 'title' | 'desc',
    after: Element | null
) => {
    const existing = ownChild(svg, tagName);

    if (existing) {
        return existing;
    }

    const element = svg.ownerDocument.createElementNS(SVG_NAMESPACE, tagName);

    element.id = `britechart-${tagName}-${++lastId}`;
    // A `<title>` only names its parent when it is the first child, so both
    // elements go at the top, title first.
    svg.insertBefore(element, after ? after.nextSibling : svg.firstChild);

    return element;
};

/**
 * Gives a chart's svg the role, `<title>` and `<desc>` that screen readers
 * announce. Run on every render: it reuses the elements it made the first time
 * and only updates their text, so the ids, and the attributes that point at
 * them, stay stable.
 */
export const labelChart = (
    svg: Element | null,
    { a11yTitle, a11yDescription, fallbackTitle, role = 'img' }: ChartLabel
): void => {
    if (!svg) {
        return;
    }

    svg.setAttribute('role', role);

    const titleElement = ensureOwnChild(svg, 'title', null);

    titleElement.textContent = a11yTitle ?? fallbackTitle;
    svg.setAttribute('aria-labelledby', titleElement.id);

    if (a11yDescription) {
        const descElement = ensureOwnChild(svg, 'desc', titleElement);

        descElement.textContent = a11yDescription;
        svg.setAttribute('aria-describedby', descElement.id);
    } else {
        ownChild(svg, 'desc')?.remove();
        svg.removeAttribute('aria-describedby');
    }
};
