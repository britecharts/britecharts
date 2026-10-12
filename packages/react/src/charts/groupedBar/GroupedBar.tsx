import React from 'react';

import { GroupedBarWrapper } from '@britecharts/wrappers';
import type { ChartEventHandler, Wrapper } from '@britecharts/wrappers';
import type {
    ColorsSchemasType,
    GroupedBarChartDataShape,
    GroupedBarChartModule,
    LocalObject,
} from '@britecharts/core';

import useChart from '../helpers/useChart.js';
import type { Equal, Expect } from '../../typings/assert';
import type { GroupedBarProps as PublishedGroupedBarProps } from '../../typings/charts/GroupedBar';

/**
 * The props are declared here rather than imported, for the reason recorded on
 * Bullet: Storybook's docgen reads the component file, and an interface it has
 * to follow an import to find is one it does not find.
 */
export interface GroupedBarProps {
    /**
     * Internally used, do not overwrite.
     *
     * Required. `null` means the data has not arrived yet: nothing is drawn
     * until it does. Leaving it out is an error.
     */
    data: GroupedBarChartDataShape[] | null;

    /**
     * Gets or Sets the duration of the animation
     */
    animationDuration?: number;

    /**
     * Gets or Sets the padding of the chart
     */
    betweenBarsPadding?: number;

    /**
     * Gets or Sets the padding between groups of bars
     */
    betweenGroupsPadding?: number;

    /**
     * Current colorMap or Chart module to chain calls
     */
    colorMap?: Record<string, string>;

    /**
     * Gets or Sets the colorSchema of the chart
     */
    colorSchema?: ColorsSchemasType;

    /**
     * The filename to export the chart to. Setting it exports a png and fires
     * a download, which is what the chart's `exportChart` command does -- it
     * is not a callback, which is what this declared and what a reader would
     * have passed. The chart's exporter treats the title as optional, so a
     * filename on its own is enough.
     */
    exportChart?: string;

    /**
     * Gets or Sets the grid mode.
     */
    // `GridTypes | null` as core declares it, spelled out because core's
    // typings barrel does not export `common/grid` yet. `string` accepted any
    // string, and only three of them do anything.
    grid?: 'vertical' | 'horizontal' | 'full' | null;

    /**
     * Gets or Sets the groupLabel of the chart
     */
    groupLabel?: string;

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
     * Gets or Sets the nameLabel of the chart
     */
    nameLabel?: string;

    /**
     * Gets or Sets the number format of the bar chart
     */
    numberFormat?: string;

    /**
     * Gets or Sets the minimum width of the graph in order to show the tooltip NOTE: This could also depend on the aspect ratio
     */
    tooltipThreshold?: number;

    /**
     * Gets or Sets the valueLabel of the chart
     */
    valueLabel?: string;

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

    /**
     * Gets or Sets the x and y offset of ticks of the y axis on the chart
     */
    // Both required, as core's `Offset` declares them: the chart reads x and
    // y off it to place the tick text, so half an offset is not an offset.
    // Spelled out because `common/position` is not exported from core's
    // barrel either.
    yTickTextOffset?: { x: number; y: number };

    customMouseOver?: ChartEventHandler;
    customMouseMove?: ChartEventHandler;
    customMouseOut?: ChartEventHandler;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    chart?: Wrapper<GroupedBarChartDataShape[], GroupedBarChartModule>;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     * @internal
     */
    createTooltip?: () => void;
}

/** The interface above and the published declaration are the same type. */
export type PropsMatchPublished = Expect<
    Equal<GroupedBarProps, PublishedGroupedBarProps>
>;

const GroupedBar = ({
    chart = GroupedBarWrapper,
    createTooltip,
    data,
    ...configuration
}: GroupedBarProps) => {
    const rootNode = useChart(chart, data, configuration, { createTooltip });

    return <div className="grouped-bar-container" ref={rootNode} />;
};

export default GroupedBar;
