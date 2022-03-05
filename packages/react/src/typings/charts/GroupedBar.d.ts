import { Component } from 'react';
import { LocalObject } from 'britecharts/src/typings/common/local';

export interface GroupedBarProps {
    /**
     * Internally used, do not overwrite.
     */
    data: {
        name: string;
        group: string;
        value: number;
    }[];

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
    colorSchema?: string[];

    /**
     * Chart exported to png and a download action is fired
     */
    exportChart?: Function;

    /**
     * Gets or Sets the grid mode.
     */
    grid?: string;

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
    nameLabel?: number;

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
    valueLabel?: number;

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
    yTickTextOffset?: {
        x?: number;
        y?: number;
    };

    customMouseOver?: Function;
    customMouseMove?: Function;
    customMouseOut?: Function;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    chart?: any;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    createTooltip?: Function;
}

export default class GroupedBar extends Component<GroupedBarProps> {}
