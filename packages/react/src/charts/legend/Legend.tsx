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
     * The data to be used by the chart
     *
     * Required. `null` means the data has not arrived yet: nothing is drawn
     * until it does. Leaving it out is an error.
     */
    // `LegendDataShape[]`, which had both fields' optionality the other way
    // round here: `name` was optional though the component renders it for
    // every entry, and `quantity` was required though the component supports
    // data without it -- `hasQuantity` exists to ask. The chart's own
    // `@typedef` says id and name are required and quantity is optional.
    data: LegendDataShape[] | null;

    /**
     * Clears all highlighted entries
     */
    // A trigger, not a callback: the chart's `clearHighlight()` takes no
    // arguments, so `applyConfiguration` calls it for any value that is set
    // and discards what arrives. It was declared as a function, which is what
    // a reader would pass and the chart would ignore.
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
     * it decorates, and a legend has no tooltip to redraw. It was undeclared,
     * so a TypeScript consumer could not pass it.
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
