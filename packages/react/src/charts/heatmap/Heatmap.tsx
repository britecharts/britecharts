import React from 'react';
import type { FunctionComponent } from 'react';

import { HeatmapWrapper } from '@britecharts/wrappers';
import type { ChartEventHandler, Wrapper } from '@britecharts/wrappers';
import type {
    ColorsSchemasType,
    HeatmapChartDataShape,
    HeatmapChartModule,
} from '@britecharts/core';

import useChart from '../helpers/useChart.js';

/**
 * The props are declared here rather than imported, for the reason recorded on
 * Bullet: Storybook's docgen reads the component file, and an interface it has
 * to follow an import to find is one it does not find.
 */
export interface HeatmapProps {
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
    data: HeatmapChartDataShape[] | null;

    /**
     * Gets or Sets the duration of the animation
     */
    animationDuration?: number;

    /**
     * Gets or Sets the size of each box, in pixels
     */
    boxSize?: number;

    /**
     * Gets or Sets the colorSchema of the chart
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
     * Gets or Sets the isAnimated property of the chart,
     * making it to animate when render.
     * By default this is 'false'
     */
    isAnimated?: boolean;

    /**
     * Gets or Sets whether a loading state will be shown
     */
    isLoading?: boolean;

    /**
     * Gets or Sets the margin of the chart
     */
    margin?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };

    /**
     * Gets or Sets the width of the chart
     */
    width?: number;

    /**
     * Gets or Sets the labels of the y axis, one per day, from the first
     */
    yAxisLabels?: string[];

    customMouseOver?: ChartEventHandler;
    customMouseMove?: ChartEventHandler;
    customMouseOut?: ChartEventHandler;
    customClick?: ChartEventHandler;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    chart?: Wrapper<HeatmapChartDataShape[], HeatmapChartModule>;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     * @internal
     */
    createTooltip?: () => void;
}

const Heatmap: FunctionComponent<HeatmapProps> = ({
    chart = HeatmapWrapper,
    createTooltip,
    data,
    ...configuration
}: HeatmapProps) => {
    const rootNode = useChart(chart, data, configuration, { createTooltip });

    return <div className="heatmap-container" ref={rootNode} />;
};

export default Heatmap;
