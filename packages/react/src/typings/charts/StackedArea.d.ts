import { Component } from 'react';

export interface StackedAreaProps {
    /**
     * Internally used, do not overwrite.
     */
    data: {
        date: string;
        name: string;
        value: number;
    }[];

    /**
     * Gets or Sets the duration of the animation
     */
    animationDuration?: number;

    /**
     * Exposes the constants to be used to force the x axis to respect a
     * certain granularity current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
     */
    axisTimeCombinations?: string;

    /**
     * Gets or Sets the area curve of the stacked area.
     */
    areaCurve?: string;

    /**
     * Gets or Sets the opacity of the stacked areas in the chart
     * (all of them will have the same opacity)
     */
    areaOpacity?: number;

    /**
     * Current colorMap or Chart module to chain calls
     */
    colorMap?: Record<string, string>;

    /**
     * Gets or Sets the colorSchema of the chart
     */
    colorSchema?: string[];

    /**
     * Gets or Sets the dateLabel of the chart
     */
    dateLabel?: number;

    /**
     * Gets or Sets the emptyDataConfig of the chart
     */
    emptyDataConfig?: any;

    /**
     * Chart exported to png and a download action is fired
     */
    exportChart?: Function;

    /**
     * Gets or Sets the grid mode.
     */
    grid?: string;

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
     * Gets or Sets whether a loading state will be shown
     */
    isLoading?: boolean;

    /**
     * Gets or Sets the keyLabel of the chart
     */
    keyLabel?: number;

    /**
     * Pass language tag for the tooltip to localize the date. Feature
     * uses Intl.DateTimeFormat, for compatability and support, refer
     * to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     */
    locale?: string;

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
     * Gets or Sets the minimum width of the graph in order
     * to show the tooltip NOTE: This could also depend on the aspect ratio
     */
    tooltipThreshold?: number;

    /**
     * Pass an override for the ordering of the topics
     */
    topicsOrder?: string[];

    /**
     * Gets or Sets the valueLabel of the chart
     */
    valueLabel?: number;

    /**
     * Gets or Sets the width of the chart
     */
    width?: number;

    /**
     * Exposes the ability to force the chart to show a certain x format
     * It requires a `xAxisFormat` of 'custom' in order to work.
     * NOTE: localization not supported
     */
    xAxisCustomFormat?: string;

    /**
     * Exposes the ability to force the chart to show a certain x axis grouping
     */
    xAxisFormat?: string;

    /**
     * Exposes the ability to force the chart to show a certain x ticks. It
     * requires a `xAxisFormat` of 'custom' in order to work. NOTE: This
     * value needs to be a multiple of 2, 5 or 10. They won't always work
     * as expected, as D3 decides at the end how many and where the ticks will appear.
     */
    xTicks?: number;

    /**
     * Gets or Sets the yAxisBaseline - this is the y-value where the area starts from in y-direction (default is 0).
     * Change this value if you don't want to start your area from y=0.
     */
    yAxisBaseline?: number;

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

export default class StackedArea extends Component<StackedAreaProps> {}
