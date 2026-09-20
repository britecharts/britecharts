import { ComponentType, NamedExoticComponent } from 'react';

/**
 * Wraps a component so that it is handed the width of the element around it,
 * as its `width` prop, and again when the window is resized. A `width` given
 * explicitly wins over the measured one.
 */
declare function withResponsiveness<P extends { width?: number }>(
    Component: ComponentType<P>
): NamedExoticComponent<Omit<P, 'width'> & { width?: number }>;

export default withResponsiveness;
