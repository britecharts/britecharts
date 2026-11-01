import React from 'react';
import type { FunctionComponent } from 'react';

import { BarWrapper } from '@britecharts/wrappers';
import type { ChartEventHandler, Wrapper } from '@britecharts/wrappers';
import type {
    BarChartDataShape,
    BarChartModule,
    BarSelection,
    ColorsSchemasType,
    LocalObject,
} from '@britecharts/core';

import useChart from '../helpers/useChart.js';

/**
 * The props are declared here rather than imported, for the reason recorded
 * on Bullet: Storybook's docgen reads the component file, and
 * an interface it has to follow an import to find is one it does not find --
 * the Controls collapse to the destructured `chart` default. The JSDoc goes
 * with them, since that is what fills each Control's description.
 */
export interface BarChartProps {
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
     * Whether a keyboard can move through the chart's data points: the chart
     * takes one tab stop, the arrow keys move between points and the tooltip
     * follows. On by default.
     */
    a11yKeyboardNavigation?: boolean;
    /**
     * Internally used, do not overwrite.
     *
     * Required. `null` means the data has not arrived yet: nothing is drawn
     * until it does. Leaving it out is an error.
     */
    data: BarChartDataShape[] | null;

    /**
     * Gets or Sets the duration of the animation
     */
    animationDuration?: number;

    /**
     * Gets or Sets the padding of the chart
     */
    betweenBarsPadding?: number;

    /**
     * Gets or Sets the gradient colors of a bar in the chart
     */
    chartGradient?: [string, string];

    /**
     * Gets or Sets the colorSchema of the chart
     */
    colorSchema?: ColorsSchemasType;

    /**
     * Current colorMap or Chart module to chain calls
     */
    colorMap?: Record<string, string>;

    /**
     * If true, adds labels at the end of the bars
     *
     * @deprecated Use `hasLabels`, which does the same. Goes in version 4.
     */
    enableLabels?: boolean;

    /**
     * If true, adds labels at the end of the bars
     */
    hasLabels?: boolean;

    /**
     * The filename to export the chart to. Setting it exports the chart and fires
     * a download, which is what the chart's `exportChart` command does; it is
     * not a callback. The chart's exporter treats the title as optional, so a
     * filename on its own is enough.
     * A filename ending in `.svg` downloads an svg file, and any other a png.
     */
    exportChart?: string;

    /**
     * Gets or Sets the hasPercentage status
     */
    hasPercentage?: boolean;

    /**
     * Gets or Sets the hasSingleBarHighlight status. If the value is true (default), only the hovered bar is considered to be highlighted and will be darkened by default. If the value is false, all the bars but the hovered bar are considered to be highlighted and will be darkened (by default). To customize the bar highlight or remove it completely, use highlightBarFunction instead.
     */
    hasSingleBarHighlight?: boolean;

    /**
     * Gets or Sets the height of the chart
     */
    height?: number;

    /**
     * Gets or Sets the highlightBarFunction function. The callback passed to this function returns a bar selection from the bar chart. Use this function if you want to apply a custom behavior to the highlighted bar on hover. When hasSingleBarHighlight is true the highlighted bar will be the one that was hovered by the user. When hasSingleBarHighlight is false the highlighted bars are all the bars but the hovered one. The default highlight effect on a bar is darkening the highlighted bar(s) color.
     */
    highlightBarFunction?: ((bar: BarSelection) => void) | null;

    /**
     * Gets or Sets the isAnimated property of the chart, making it to animate
     * when render. By default this is 'false'
     */
    isAnimated?: boolean;

    /**
     * Gets or Sets the horizontal direction of the chart
     */
    isHorizontal?: boolean;
    /**
     * Gets or Sets whether a loading state will be shown
     */
    isLoading?: boolean;

    /**
     * Offset between end of bar and start of the percentage bars
     */
    labelsMargin?: number;

    /**
     * Gets or Sets the labels number format
     */
    labelsNumberFormat?: string;

    /**
     * Get or Sets the labels text size
     */
    labelsSize?: number;

    /**
     * Gets or Sets the loading state of the chart
     */
    loadingState?: string;

    /**
     * Gets or Sets the margin of the chart
     */
    margin?: { top?: number; bottom?: number; left?: number; right?: number };

    /**
     * Gets or Sets the number format of the bar chart
     */
    numberFormat?: string;

    /**
     * Changes the order of items given the custom function
     */
    orderingFunction?: (a: BarChartDataShape, b: BarChartDataShape) => number;

    /**
     * Configurable extension of the x axis if your max point was 50%
     * you might want to show x axis to 60%, pass 1.2
     */
    percentageAxisToMaxRatio?: number;

    /**
     * Gets or Sets whether the color list should be reversed or not
     */
    shouldReverseColorList?: boolean;

    /**
     * Current locale object or Chart module to chain calls
     */
    valueLocale?: LocalObject | null;

    /**
     * Gets or Sets the width of the chart
     */
    width?: number;

    /**
     * Label or Chart module to chain calls
     */
    xAxisLabel?: string;

    /**
     * Gets or Sets the offset of the xAxisLabel on the chart
     */
    xAxisLabelOffset?: number;

    /**
     * Gets or Sets the number of ticks of the x axis on the chart (Default is 5)
     */
    xTicks?: number;

    /**
     * Label or Chart module to chain calls
     */
    yAxisLabel?: string;

    /**
     * Gets or Sets the offset of the yAxisLabel on the chart
     */
    yAxisLabelOffset?: number;

    /**
     * Space between y axis and chart (Default 10)
     */
    yAxisPaddingBetweenChart?: number;

    /**
     * Gets or Sets the number of vertical ticks on the chart (Default is 6)
     */
    yTicks?: number;

    /**
     * Called when the pointer enters a bar, with what the chart dispatches.
     *
     * `ChartEventHandler` is the type the wrappers package publishes for these
     * four, and it is what `applyConfiguration` registers them through. The
     * bare `Function` type will not do: no handler satisfies it structurally,
     * so these would be unusable from TypeScript in practice.
     */
    customMouseOver?: ChartEventHandler;

    /** Called on every pointer move over the chart. */
    customMouseMove?: ChartEventHandler;

    /** Called when the pointer leaves a bar. */
    customMouseOut?: ChartEventHandler;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    chart?: Wrapper<BarChartDataShape[], BarChartModule>;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     * @internal
     */
    createTooltip?: () => void;
}

const Bar: FunctionComponent<BarChartProps> = ({
    chart = BarWrapper,
    createTooltip,
    data,
    ...configuration
}: BarChartProps) => {
    const rootNode = useChart(chart, data, configuration, { createTooltip });

    return <div className="bar-container" ref={rootNode} />;
};

export default Bar;
