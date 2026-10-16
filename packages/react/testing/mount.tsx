import { cloneElement } from 'react';
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';

/**
 * A thin `mount()` over React Testing Library's `render()`, with an
 * Enzyme-shaped API: `mount(<X />)`, `.setProps({...})`, `.find(selector)`,
 * `.getDOMNode()`, `.unmount()`. RTL
 * has no equivalent of `setProps` (its `rerender` takes a whole new element),
 * so this closes over the last element rendered and merges partial props onto
 * it with `cloneElement` -- an Enzyme-shaped `setProps`, not an RTL idiom.
 *
 * Reach for RTL's own `render`/`screen`/`userEvent` directly in new specs;
 * this exists for the existing assertions, not to be the house style.
 *
 * `find`/`findAll`/`getDOMNode` query the container directly on purpose,
 * which is exactly what eslint-plugin-testing-library's no-node-access and
 * no-container rules exist to flag. This file (and every spec still calling
 * into it) sits outside the `lint:js` glob; that is a deliberate scope, not
 * an oversight.
 *
 * One representational difference callers must know: `render()` appends the
 * component into a `<div>` RTL owns (`container`), so `container` itself is
 * never the component's own root node -- `container.firstChild` is. Every
 * method below accounts for that; nothing outside this file should read
 * `container` directly.
 */
export interface Mounted<TProps> {
    /** The component's own root node: `container.firstChild`. */
    getDOMNode: () => HTMLElement;
    find: <TElement extends Element = HTMLElement>(
        selector: string
    ) => TElement | null;
    findAll: <TElement extends Element = HTMLElement>(
        selector: string
    ) => NodeListOf<TElement>;
    setProps: (partialProps: Partial<TProps>) => void;
    unmount: () => void;
}

export const mount = <TProps,>(
    element: ReactElement<TProps>
): Mounted<TProps> => {
    let current = element;
    const { container, rerender, unmount } = render(current);
    // RTL does not document whether its unmount() is safe to call more than
    // once. Some specs unmount inline and rely on an afterEach also unmounting
    // whatever is left, so this makes a second call a no-op here rather than
    // assuming.
    let isUnmounted = false;

    return {
        getDOMNode: () => container.firstChild as HTMLElement,
        find: <TElement extends Element = HTMLElement>(selector: string) =>
            container.querySelector<TElement>(selector),
        findAll: <TElement extends Element = HTMLElement>(selector: string) =>
            container.querySelectorAll<TElement>(selector),
        setProps: (partialProps) => {
            current = cloneElement(current, partialProps);
            rerender(current);
        },
        unmount: () => {
            if (isUnmounted) {
                return;
            }

            isUnmounted = true;
            unmount();
        },
    };
};
