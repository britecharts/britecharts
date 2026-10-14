import React, { useLayoutEffect, useRef, useState } from 'react';
import type { FunctionComponent, ReactNode } from 'react';

import optimizedResize from './optimizedResize.js';

/**
 * The props are declared here rather than imported, for the reason recorded on
 * Bullet: Storybook's docgen reads the component file, and an interface it has
 * to follow an import to find is one it does not find.
 */
export interface ResponsiveContainerProps {
    /**
     * Draws what should fill the container, given the width the container has
     * measured. Called again when the window is resized.
     */
    render?: (size: { width: number }) => ReactNode;
}

const ResponsiveContainer: FunctionComponent<ResponsiveContainerProps> = ({
    render,
}: ResponsiveContainerProps) => {
    const rootNode = useRef<HTMLDivElement>(null);
    const measuredWidth = useRef(500);
    // Until it has measured, which it does in the same commit
    const [width, setWidth] = useState(500);

    // Measure once mounted, and again whenever the window is resized. Layout
    // effects flush before paint, so the content is never drawn at the default
    // width first. Removing the callback (and not everyone's) on unmount is what
    // keeps the other containers on the page resizing.
    useLayoutEffect(() => {
        const updateSize = () => {
            // Only a change of width is worth a render: setting the same value
            // can still call this component once more
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

    return (
        <div className="responsive-container" ref={rootNode}>
            {render ? render({ width }) : null}
        </div>
    );
};

export default ResponsiveContainer;
