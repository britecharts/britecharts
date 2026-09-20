import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import optimizedResize from './optimizedResize.js';

const ResponsiveContainer = ({ render }) => {
    const rootNode = useRef(null);
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

ResponsiveContainer.propTypes = {
    render: PropTypes.func,
};

export default ResponsiveContainer;
