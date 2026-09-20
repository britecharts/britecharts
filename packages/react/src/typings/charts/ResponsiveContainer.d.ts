import { FunctionComponent, ReactNode } from 'react';

export interface ResponsiveContainerProps {
    /**
     * Draws what should fill the container, given the width the container has
     * measured. Called again when the window is resized.
     */
    render?: (size: { width: number }) => ReactNode;
}

declare const ResponsiveContainer: FunctionComponent<ResponsiveContainerProps>;

export default ResponsiveContainer;
