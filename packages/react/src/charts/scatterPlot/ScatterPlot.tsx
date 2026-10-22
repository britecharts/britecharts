import React from 'react';
import type { FunctionComponent } from 'react';

import { ScatterPlotWrapper } from '@britecharts/wrappers';
import type { ChartEventHandler, Wrapper } from '@britecharts/wrappers';
import type {
    ColorsSchemasType,
    LocalObject,
    ScatterPlotDataShape,
    ScatterPlotModule,
} from '@britecharts/core';

import useChart from '../helpers/useChart.js';

/**
 * The props are declared here rather than imported, for the reason recorded on
 * Bullet: Storybook's docgen reads the component file, and an interface it has
 * to follow an import to find is one it does not find.
 */
export interface ScatterPlotProps {
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
    data: ScatterPlotDataShape[] | null;

    /**
     * Gets or Sets the duration of the animation
     */
    animationDuration?: number;

    /**
     * Gets or Sets each circle's border opacity value of the chart.
     * It makes each circle border transparent if it's less than 1.
     */
    circleStrokeOpacity?: number;

    /**
     * Gets or Sets each circle's border width value of the chart.
     */
    circleStrokeWidth?: number;

    /**
     * Gets or Sets the circles opacity value of the chart.
     * It makes the area of each data point more transparent if it's less than 1.
     */
    circleOpacity?: number;

    /**
     * Current colorMap or Chart module to chain calls
     */
    colorMap?: Record<string, string>;

    /**
     * Gets or Sets the colorSchema of the chart
     */
    colorSchema?: ColorsSchemasType;

    /**
     * Gets or Sets whether the chart supports zoom controls. `false` by default.
     * If `true`, zoom event handling will be added to the chart.
     */
    enableZoom?: boolean;

    /**
     * The filename to export the chart to. Setting it exports the chart and fires
     * a download, which is what the chart's `exportChart` command does; it is
     * not a callback. The chart's exporter treats the title as optional, so a
     * filename on its own is enough.
     * A filename ending in `.svg` downloads an svg file, and any other a png.
     */
    exportChart?: string;

    /**
     * Gets or Sets the grid mode
     */
    // `GridTypes | null` as core declares it, spelled out rather than
    // imported: Storybook's docgen reads this file alone, so an imported alias
    // reaches it as a bare name and the grid Control loses its three options.
    // `null` is the default: assigning it back is how a grid is turned off.
    grid?: 'vertical' | 'horizontal' | 'full' | null;

    /**
     * Gets or Sets the hasCrossHairs status. If true, the hovered data point
     * will be highlighted with lines and legend from both x and y axis.
     */
    hasCrossHairs?: boolean;

    /**
     * Gets or Sets the hasHollowCircles value of the chart area
     */
    hasHollowCircles?: boolean;

    /**
     * Gets or Sets the hasTrendline value of the chart area. If true, the
     * trendline calculated based off the linear regression formula will be drawn
     */
    hasTrendline?: boolean;

    /**
     * Gets or Sets the height of the chart
     */
    height?: number;

    /**
     * Sets a custom distance between the legend values and both axes.
     * The legends show up when hasCrossHairs is true.
     */
    highlightTextLegendOffset?: number;

    /**
     * Gets or Sets the isAnimated property of the chart, making it to animate
     * when render. By default this is 'false'
     */
    isAnimated?: boolean;

    /**
     * Current loading state flag or Chart module to chain calls
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
     * Gets or Sets the maximum area of a circle in the chart
     */
    maxCircleArea?: number;

    /**
     * Current locale object or Chart module to chain calls
     */
    valueLocale?: LocalObject | null;

    /**
     * Gets or Sets the width of the chart
     */
    width?: number;

    /**
     * Exposes the ability to set the format of the x-axis values
     */
    xAxisFormat?: string;

    /**
     * Exposes the ability to set the formatter of the x-axis values.
     * The `timeFormat` formatter function is applied if a custom `xAxisFormatType`
     * that is not equal to 'number' is provided
     */
    xAxisFormatType?: string;

    /**
     * Gets or Sets the xAxisLabel of the chart
     */
    xAxisLabel?: string;

    /**
     * Gets or Sets the offset of the xAxisLabel of the chart
     */
    xAxisLabelOffset?: number;

    /**
     * Gets or Sets the number of ticks of the x axis on the chart
     */
    xTicks?: number;

    /**
     * Exposes the ability to set the format of the y-axis values
     */
    yAxisFormat?: string;

    /**
     * Gets or Sets the yAxisLabel of the chart
     */
    yAxisLabel?: string;

    /**
     * Gets or Sets the offset of the yAxisLabel of the chart
     */
    yAxisLabelOffset?: number;

    /**
     * Gets or Sets the number of ticks of the y axis on the chart
     */
    yTicks?: number;

    /**
     * Called with the hovered point ({ name, x, y }), its position [x, y]
     * and the chart's size [width, height]
     */
    customMouseMove?: ChartEventHandler;

    /**
     * Called when the pointer enters a point
     */
    customMouseOver?: ChartEventHandler;

    /**
     * Called when the pointer leaves the chart
     */
    customMouseOut?: ChartEventHandler;

    /**
     * Called with the clicked point, its position and the chart's size
     */
    customClick?: ChartEventHandler;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    chart?: Wrapper<ScatterPlotDataShape[], ScatterPlotModule>;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     * @internal
     */
    createTooltip?: () => void;
}

const ScatterPlot: FunctionComponent<ScatterPlotProps> = ({
    chart = ScatterPlotWrapper,
    createTooltip,
    data,
    ...configuration
}: ScatterPlotProps) => {
    const rootNode = useChart(chart, data, configuration, { createTooltip });

    return <div className="scatter-plot-container" ref={rootNode} />;
};

export default ScatterPlot;
