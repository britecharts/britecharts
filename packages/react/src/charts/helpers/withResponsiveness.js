import React, { useLayoutEffect, useRef, useState } from 'react';
import optimizedResize from './optimizedResize.js';

export default function withResponsiveness(Component) {
    const WithResponsiveness = (props) => {
        const rootNode = useRef(null);
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

        // The props are spread after the width: an explicit width wins
        return (
            <div className="responsive-container" ref={rootNode}>
                <Component width={width} {...props} />
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
