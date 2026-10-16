import React from 'react';
import type { FunctionComponent } from 'react';

import { LegendWrapper } from '@britecharts/wrappers';
import type { Wrapper } from '@britecharts/wrappers';
import type {
    ColorsSchemasType,
    LegendDataShape,
    LegendModule,
} from '@britecharts/core';

import useChart from '../helpers/useChart.js';

/**
 * The props are declared here rather than imported, for the reason recorded on
 * Bullet: Storybook's docgen reads the component file, and an interface it has
 * to follow an import to find is one it does not find.
 */
export interface LegendProps {
    /**
     * The name screen readers announce for the chart, rendered as its svg's
     * `<title>`. Unset, the chart is announced by its type, such as "Bar chart".
     */
    a11yTitle?: string | null;
    /**
     * A longer description screen readers announce after the name, such as
     * what the data shows, rendered as the svg's `<desc>`.
     */
    a11yDescription?: string | null;
    /**
     * The data to be used by the chart
     *
     * Required. `null` means the data has not arrived yet: nothing is drawn
     * until it does. Leaving it out is an error.
     */
    // `LegendDataShape[]`, as the chart's own `@typedef` says: id and name are
    // required and quantity is optional. The component renders `name` for
    // every entry, and supports data without `quantity` -- `hasQuantity`
    // exists to ask.
    data: LegendDataShape[] | null;

    /**
     * Clears all highlighted entries
     */
    // A trigger, not a callback: the chart's `clearHighlight()` takes no
    // arguments, so `applyConfiguration` calls it for any value that is set
    // and discards what arrives. Typed as a function, it would invite a reader
    // to pass one that the chart ignores.
    clearHighlight?: boolean;

    /**
     * Current colorMap or Chart module to chain calls
     */
    colorMap?: Record<string, string>;

    /**
     * Gets or Sets the colorSchema of the chart
     */
    colorSchema?: ColorsSchemasType;

    /**
     * Gets or Sets the height of the legend chart
     */
    height?: number;

    /**
     * Command that highlights a line entry by fading the rest of lines
     */
    highlight?: number;

    /**
     * Highlights a line entry by fading the rest of lines
     */
    highlightEntryById?: number;

    /**
     * Gets or Sets the horizontal mode on the legend
     */
    isHorizontal?: boolean;

    /**
     * Gets or Sets the margin of the legend chart
     */
    margin?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };

    /**
     * Gets or Sets the margin ratio of the legend chart. Used to determine spacing between legend elements.
     */
    marginRatio?: number;

    /**
     * Gets or Sets the markerSize of the legend chart. This markerSize will determine
     * the horizontal and vertical size of the colored marks added as color
     * identifiers for the chart's categories.
     */
    markerSize?: number;

    /**
     * Gets or Sets the number format of the legend chart
     */
    numberFormat?: string;

    /**
     * Gets or Sets the unit of the value
     */
    unit?: string;

    /**
     * Gets or Sets the width of the chart
     */
    width?: number;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    chart?: Wrapper<LegendDataShape[], LegendModule>;

    /**
     * Internally used, do not overwrite.
     *
     * Accepted and deliberately dropped: a Tooltip hands this to every chart
     * it decorates, and a legend has no tooltip to redraw. Declared so a
     * TypeScript consumer can pass it.
     *
     * @ignore
     */
    createTooltip?: () => void;
}

// createTooltip is handed to every chart by a Tooltip, but is not a
// configuration key of the wrapper, and a legend has no tooltip to redraw.
const Legend: FunctionComponent<LegendProps> = ({
    chart = LegendWrapper,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    createTooltip,
    data,
    ...configuration
}: LegendProps) => {
    const rootNode = useChart(chart, data, configuration);

    return <div className="legend-container" ref={rootNode} />;
};

export default Legend;
