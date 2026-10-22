/**
 * A place keyboard focus can rest on a chart: an element, such as a bar, and
 * optionally the point on the svg to treat as the pointer's position, such as
 * a line chart's date. Without a point, the pointer is put at the centre of
 * the element.
 */
export type KeyboardStop = {
    target: Element;
    /** In the svg's own coordinates, as `pointer(event, svg)` reads them */
    point?: [number, number];
};

export type KeyboardNavigation = {
    /** Off removes the tab stop and the listeners' effect */
    isEnabled: boolean;
    /** The chart's stops in reading order, read on every key press */
    stops: () => KeyboardStop[];
    /**
     * How many stops make a row, for charts laid out as a grid, such as the
     * heatmap's 24 hours: up and down move by a row. Unset, up and down move
     * like left and right.
     */
    rowLength?: number;
};

type NavigationState = KeyboardNavigation & {
    index: number;
    active: Element | null;
};

const states = new WeakMap<Element, NavigationState>();

// The client position of a point in the svg's own coordinates: the inverse of
// what d3's `pointer` does, so the chart's handlers read the point back
const toClient = (svg: SVGSVGElement, [x, y]: [number, number]) => {
    const matrix = svg.getScreenCTM?.();

    if (matrix && svg.createSVGPoint) {
        const point = svg.createSVGPoint();

        point.x = x;
        point.y = y;

        const { x: clientX, y: clientY } = point.matrixTransform(matrix);

        return { clientX, clientY };
    }

    const rect = svg.getBoundingClientRect();

    return {
        clientX: rect.left + svg.clientLeft + x,
        clientY: rect.top + svg.clientTop + y,
    };
};

const centreOf = (element: Element) => {
    const rect = element.getBoundingClientRect();

    return {
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
    };
};

const fire = (
    target: Element,
    type: string,
    position: { clientX: number; clientY: number },
    relatedTarget: Element | null = null
) => {
    const view = target.ownerDocument.defaultView;

    if (!view) {
        return;
    }

    target.dispatchEvent(
        new view.MouseEvent(type, {
            ...position,
            relatedTarget,
            bubbles: type !== 'mouseenter' && type !== 'mouseleave',
            cancelable: true,
        })
    );
};

// Moves the pretend pointer onto a stop: the events a pointer moving there
// fires, so the chart's hover code highlights it and dispatches its
// customMouseOver and customMouseMove, and the tooltip follows
const activate = (
    svg: SVGSVGElement,
    state: NavigationState,
    stop: KeyboardStop
) => {
    const position = stop.point
        ? toClient(svg, stop.point)
        : centreOf(stop.target);
    const previous = state.active;

    if (!previous) {
        fire(svg, 'mouseenter', position);
    }
    if (previous !== stop.target) {
        if (previous) {
            fire(previous, 'mouseout', position, stop.target);
        }
        fire(stop.target, 'mouseover', position, previous);
    }
    fire(stop.target, 'mousemove', position);
    state.active = stop.target;
};

// Moves the pretend pointer off the chart, which hides the tooltip
const deactivate = (svg: SVGSVGElement, state: NavigationState) => {
    if (!state.active) {
        return;
    }

    const position = centreOf(svg);

    fire(state.active, 'mouseout', position);
    fire(svg, 'mouseleave', position);
    state.active = null;
    state.index = -1;
};

const KEY_STEPS: Record<
    string,
    (state: NavigationState, count: number) => number
> = {
    ArrowRight: ({ index }) => index + 1,
    ArrowLeft: ({ index }, count) => (index < 0 ? count - 1 : index - 1),
    ArrowDown: ({ index, rowLength = 1 }) =>
        index < 0 ? 0 : index + rowLength,
    ArrowUp: ({ index, rowLength = 1 }, count) =>
        index < 0 ? count - 1 : index - rowLength,
    Home: () => 0,
    End: (_, count) => count - 1,
};

const handleKeydown = function (this: SVGSVGElement, event: KeyboardEvent) {
    const state = states.get(this);

    if (!state?.isEnabled) {
        return;
    }
    if (event.key === 'Escape') {
        deactivate(this, state);

        return;
    }

    const step = KEY_STEPS[event.key];

    if (!step) {
        return;
    }

    const stops = state.stops();

    if (!stops.length) {
        return;
    }

    // The arrows would scroll the page otherwise
    event.preventDefault();
    state.index = Math.min(
        Math.max(step(state, stops.length), 0),
        stops.length - 1
    );
    activate(this, state, stops[state.index]);
};

const handleBlur = function (this: SVGSVGElement) {
    const state = states.get(this);

    if (state) {
        deactivate(this, state);
    }
};

/**
 * Lets a keyboard move through a chart's data points: the svg takes one tab
 * stop, the arrow keys move between points (up and down by a row on a grid),
 * Home and End go to the first and last, and Escape, or leaving the chart,
 * lets go. Each move fires the mouse events a pointer would, so the chart's
 * own hover behaviour, its custom events and the tooltip follow focus.
 *
 * Run on every render: it keeps one set of listeners per svg, and reads the
 * stops on each key press, so they follow the data.
 */
export const enableKeyboardNavigation = (
    svg: SVGSVGElement | null,
    navigation: KeyboardNavigation
): void => {
    if (!svg) {
        return;
    }

    const existing = states.get(svg);

    if (existing) {
        Object.assign(existing, navigation);
    } else {
        states.set(svg, { ...navigation, index: -1, active: null });
        svg.addEventListener('keydown', handleKeydown);
        svg.addEventListener('blur', handleBlur);
    }

    if (navigation.isEnabled) {
        svg.setAttribute('tabindex', '0');
    } else {
        deactivate(svg, states.get(svg) as NavigationState);
        svg.removeAttribute('tabindex');
    }
};
