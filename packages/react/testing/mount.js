import { cloneElement } from 'react';
import { render } from '@testing-library/react';

/**
 * A thin `mount()` over React Testing Library's `render()`, built to keep
 * every call site here shaped the way it was under Enzyme: `mount(<X />)`,
 * `.setProps({...})`, `.find(selector)`, `.getDOMNode()`, `.unmount()`. RTL
 * has no equivalent of `setProps` (its `rerender` takes a whole new element),
 * so this closes over the last element rendered and merges partial props onto
 * it with `cloneElement` -- an Enzyme-shaped `setProps`, not an RTL idiom.
 *
 * Reach for RTL's own `render`/`screen`/`userEvent` directly in new specs;
 * this exists to carry the ~120 existing assertions across the framework
 * swap unchanged, not to be the house style going forward.
 *
 * `find`/`findAll`/`getDOMNode` query the container directly on purpose,
 * which is exactly what eslint-plugin-testing-library's no-node-access and
 * no-container rules exist to flag. This file (and every spec still calling
 * into it) sits outside the `lint:js` glob for the same reason Enzyme specs
 * always did; that is a deliberate scope, not an oversight.
 *
 * One representational difference callers must know: `render()` appends the
 * component into a `<div>` RTL owns (`container`), so `container` itself is
 * never the component's own root node -- `container.firstChild` is. Every
 * method below accounts for that; nothing outside this file should read
 * `container` directly.
 */
export const mount = (element) => {
    let current = element;
    const { container, rerender, unmount } = render(current);
    // Enzyme's unmount() was safe to call more than once (the second call is
    // a no-op against an already-empty wrapper); RTL's is not documented
    // either way. Some specs unmount inline and rely on an afterEach also
    // unmounting whatever is left, so this makes a second call a no-op here
    // rather than assuming.
    let isUnmounted = false;

    return {
        getDOMNode: () => container.firstChild,
        find: (selector) => container.querySelector(selector),
        findAll: (selector) => container.querySelectorAll(selector),
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
