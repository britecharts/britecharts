import React from 'react';
import type { FunctionComponent } from 'react';

import { BulletWrapper } from '@britecharts/wrappers';
import type { Wrapper } from '@britecharts/wrappers';
import type {
    BulletChartDataShape,
    BulletChartModule,
    ColorsSchemasType,
} from '@britecharts/core';

import useChart from '../helpers/useChart.js';

/**
 * The props live in the component file, and that is deliberate: Storybook's
 * docgen reads the component file, and an interface it has to follow an
 * import to find is one it does not find -- the Controls for this chart would
 * drop from every prop to the one destructured default.
 * The JSDoc on each prop is what fills each Control's description, which is
 * the other reason it belongs next to the code. The published declaration is
 * generated from this interface too, so there is one copy to keep.
 */
export interface BulletChartProps {
    /**
     * The name screen readers announce for the chart, set as its svg's
     * `aria-label`. Unset, the chart is announced by its type, such as "Bar chart".
     */
    a11yTitle?: string | null;
    /**
     * A longer description screen readers announce after the name, such as
     * what the data shows, rendered as the svg's `<desc>`.
     */
    a11yDescription?: string | null;
    /**
     * Whether the chart renders its data as a visually hidden table after its
     * svg, which screen readers can read cell by cell. On by default.
     */
    a11yDataTable?: boolean;
    /**
     * Internally used, do not overwrite.
     *
     * Required. `null` means the data has not arrived yet: nothing is drawn
     * until it does. Leaving it out is an error.
     */
    data: BulletChartDataShape[] | null;

    /**
     * Gets or Sets the colorSchema of the chart. The first color from the array will be applied to range bars (the wider bars). The second color from the array will be applied to measure bars (the narrow bars) and marker lines.
     */
    colorSchema?: ColorsSchemasType;

    /**
     * The filename to export the chart to. Setting it exports the chart and fires
     * a download, which is what the chart's `exportChart` command does; it is
     * not a callback. The chart's exporter treats the title as optional, so a
     * filename on its own is enough.
     * A filename ending in `.svg` downloads an svg file, and any other a png.
     */
    exportChart?: string;

    /**
     * Gets or Sets the height of the chart
     */
    height?: number;

    /**
     * Gets or Sets whether a loading state will be shown
     */
    isLoading?: boolean;

    /**
     * Gets or Sets the isReverse status of the chart. If true, the elements will be rendered in reverse order.
     */
    isReverse?: boolean;

    /**
     * Gets or Sets the margin of the chart
     */
    margin?: { top?: number; bottom?: number; left?: number; right?: number };

    /**
     * Gets or Sets the number format of the bar chart
     */
    numberFormat?: string;

    /**
     * Space between axis and chart
     */
    paddingBetweenAxisAndChart?: number;

    /**
     * Gets or Sets the starting point of the capacity range.
     * Default is 0.5
     */
    startMaxRangeOpacity?: number;

    /**
     * Gets or Sets the number of ticks of the x axis on the chart
     * Default is 5
     */
    ticks?: number;

    /**
     * Gets or Sets the width of the chart
     */
    width?: number;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    chart?: Wrapper<BulletChartDataShape[], BulletChartModule>;

    /**
     * Internally used, do not overwrite.
     *
     * Asked for again after each update, so a tooltip can be attached to the
     * chart the wrapper has just drawn.
     *
     * @ignore
     */
    createTooltip?: () => void;
}

const Bullet: FunctionComponent<BulletChartProps> = ({
    chart = BulletWrapper,
    createTooltip,
    data,
    ...configuration
}: BulletChartProps) => {
    const rootNode = useChart(chart, data, configuration, { createTooltip });

    return <div className="bullet-container" ref={rootNode} />;
};

export default Bullet;
