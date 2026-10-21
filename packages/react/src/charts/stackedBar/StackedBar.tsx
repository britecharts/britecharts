import React from 'react';
import type { FunctionComponent } from 'react';

import { StackedBarWrapper } from '@britecharts/wrappers';
import type { ChartEventHandler, Wrapper } from '@britecharts/wrappers';
import type {
    ColorsSchemasType,
    LocalObject,
    StackedBarChartDataShape,
    StackedBarChartModule,
} from '@britecharts/core';

import useChart from '../helpers/useChart.js';

/**
 * The props are declared here rather than imported, for the reason recorded on
 * Bullet: Storybook's docgen reads the component file, and an interface it has
 * to follow an import to find is one it does not find.
 */
export interface StackedBarProps {
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
     * Internally used, do not overwrite.
     *
     * Required. `null` means the data has not arrived yet: nothing is drawn
     * until it does. Leaving it out is an error.
     */
    data: StackedBarChartDataShape[] | null;

    /**
     * Gets or Sets the duration of the animation
     */
    animationDuration?: number;

    /**
     * Gets or Sets the padding of the stacked bar chart
     */
    betweenBarsPadding?: number;

    /**
     * Current colorMap or Chart module to chain calls
     */
    colorMap?: Record<string, string>;

    /**
     * Gets or Sets the colorSchema of the chart
     */
    colorSchema?: ColorsSchemasType;

    /**
     * The filename to export the chart to. Setting it exports the chart and fires
     * a download, which is what the chart's `exportChart` command does; it is
     * not a callback.
     * A filename ending in `.svg` downloads an svg file, and any other a png.
     */
    exportChart?: string;

    /**
     * Gets or Sets the grid mode.
     */
    // `GridTypes | null` as core declares it, spelled out rather than
    // imported: Storybook's docgen reads this file alone, so an imported alias
    // reaches it as a bare name and the grid Control loses its three options.
    grid?: 'vertical' | 'horizontal' | 'full' | null;

    /**
     * Gets or Sets the hasPercentage status
     */
    hasPercentage?: boolean;

    /**
     * Gets or Sets the hasReversedStacks property of the chart, reversing the order of stacks.
     */
    hasReversedStacks?: boolean;

    /**
     * Gets or Sets the height of the chart
     */
    height?: number;

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
     * Gets or Sets the margin of the chart
     */
    margin?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };

    /**
     * Configurable extension of the x axis
     * If your max point was 50% you might want to show x axis to 60%, pass 1.2
     */
    percentageAxisToMaxRatio?: number;

    /**
     * Gets or Sets the minimum width of the graph in order
     * to show the tooltip NOTE: This could also depend on the aspect ratio
     */
    tooltipThreshold?: number;

    /**
     * Current locale object or Chart module to chain calls
     */
    valueLocale?: LocalObject | null;

    /**
     * Gets or Sets the width of the chart
     */
    width?: number;

    /**
     * Exposes the ability to force the chart to show a certain x ticks. It
     * requires a `xAxisFormat` of 'custom' in order to work. NOTE: This
     * value needs to be a multiple of 2, 5 or 10. They won't always work
     * as expected, as D3 decides at the end how many and where the ticks will appear.
     */
    xTicks?: number;

    /**
     * Gets or Sets the y-axis label of the chart
     */
    yAxisLabel?: string;

    /**
     * Gets or Sets the offset of the yAxisLabel of the chart. The method accepts both positive and negative values. The default value is -60
     */
    yAxisLabelOffset?: number;

    /**
     * Gets or Sets the number of ticks of the y axis on the chart (Default is 5)
     */
    yTicks?: number;

    customMouseOver?: ChartEventHandler;
    customMouseMove?: ChartEventHandler;
    customMouseOut?: ChartEventHandler;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    chart?: Wrapper<StackedBarChartDataShape[], StackedBarChartModule>;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     * @internal
     */
    createTooltip?: () => void;
}

const StackedBar: FunctionComponent<StackedBarProps> = ({
    chart = StackedBarWrapper,
    createTooltip,
    data,
    ...configuration
}: StackedBarProps) => {
    const rootNode = useChart(chart, data, configuration, { createTooltip });

    return <div className="stacked-bar-container" ref={rootNode} />;
};

export default StackedBar;
