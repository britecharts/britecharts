import React, { useLayoutEffect, useRef, useState } from 'react';
import type { ComponentType, NamedExoticComponent } from 'react';

import optimizedResize from './optimizedResize.js';
import type { Equal, Expect } from '../../typings/assert';
import type { default as PublishedWithResponsiveness } from '../../typings/charts/withResponsiveness';

/**
 * What the wrapper takes: the wrapped component's props, except that `width`
 * becomes optional because this provides it. Spelled the same way the
 * published declaration spells it, which is what `PropsMatchPublished` below
 * compares.
 */
type ResponsiveProps<P> = Omit<P, 'width'> & { width?: number };

/**
 * Wraps a component so that it is handed the width of the element around it,
 * as its `width` prop, and again when the window is resized. A `width` given
 * explicitly wins over the measured one.
 */
export default function withResponsiveness<P extends { width?: number }>(
    Component: ComponentType<P>
): NamedExoticComponent<ResponsiveProps<P>> {
    const WithResponsiveness = (props: ResponsiveProps<P>) => {
        const rootNode = useRef<HTMLDivElement>(null);
        const measuredWidth = useRef(500);
        // Until it has measured, which it does in the same commit
        const [width, setWidth] = useState(500);

        // Measure once mounted, and again whenever the window is resized
        useLayoutEffect(() => {
            const updateSize = () => {
                // Only a change of width is worth a render: setting the same
                // value can still call this component once more
                if (
                    rootNode.current &&
                    rootNode.current.clientWidth !== measuredWidth.current
                ) {
                    measuredWidth.current = rootNode.current.clientWidth;
                    setWidth(measuredWidth.current);
                }
            };

            optimizedResize.addHorizontal(updateSize);
            updateSize();

            return () => optimizedResize.remove(updateSize);
        }, []);

        // The props are spread after the width: an explicit width wins.
        //
        // The assertion is the one the plan expected here, and it is the only
        // one in this file. `{ width, ...props }` is `P` for every component
        // this is called with -- it is `Omit<P, 'width'>` plus a `width` -- but
        // TypeScript cannot prove that for an unresolved `P`: a conditional
        // type over a type parameter stays deferred, so the spread is checked
        // against the constraint rather than the eventual type. Narrowing `P`
        // to make it provable would mean a wrapper that only accepts the
        // components whose props it already knows, which is the opposite of
        // what this helper is for.
        return (
            <div className="responsive-container" ref={rootNode}>
                <Component {...({ width, ...props } as unknown as P)} />
            </div>
        );
    };

    WithResponsiveness.displayName = `withResponsiveness(${
        Component.displayName || Component.name || 'Component'
    })`;

    // A pure component, as the class was: a parent re-rendering with the same
    // props costs nothing
    return React.memo(WithResponsiveness);
}

/**
 * The signature above and the published declaration are the same type -- the
 * generic included, which is the part worth pinning: this is the one helper
 * whose published shape was drafted before the implementation existed.
 */
export type PropsMatchPublished = Expect<
    Equal<typeof withResponsiveness, typeof PublishedWithResponsiveness>
>;
