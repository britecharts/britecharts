import { Component } from 'react';

export interface LineProps {
    /**
     * Internally used, do not overwrite.
     */
    data: {
        data: {
            topicName: string;
            name: number;
            date: string;
            value: number;
        }[];
    };

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
    dateLabel?: string;

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
     * Current loading state flag or Chart module to chain calls
     */
    isLoading?: boolean;

    /**
     * Gets or Sets the curve of the line chart
     */
    lineCurve?: string;

    /**
     * Gets or Sets the gradient colors of the line chart when there is only one line
     */
    lineGradient?: string[];

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
     * Gets or Sets the number format of the line chart
     */
    numberFormat?: string;

    /**
     * Gets or Sets the minimum width of the graph in order
     * to show the tooltip NOTE: This could also depend on the aspect ratio
     */
    tooltipThreshold?: number;

    /**
     * Gets or Sets the topicLabel of the chart
     */
    topicLabel?: number;

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
     * Gets or Sets the label of the X axis of the chart
     */
    xAxisLabel?: string;

    /**
     * Gets or Sets the `xAxisScale`. Choose between 'linear' and 'logarithmic'.
     * The setting will only work if `xAxisValueType` is set to 'number' as well, otherwise it won't influence the visualization.
     */
    xAxisScale?: string;

    /**
     * Gets or Sets the `xAxisValueType`. Choose between 'date' and 'number'.
     * When set to `number` the values of the x-axis must not be dates anymore, but can be arbitrary numbers.
     */
    xAxisValueType?: string;

    /**
     * Exposes the ability to force the chart to show a certain x ticks. It
     * requires a `xAxisFormat` of 'custom' in order to work. NOTE: This
     * value needs to be a multiple of 2, 5 or 10. They won't always work
     * as expected, as D3 decides at the end how many and where the ticks will appear.
     */
    xTicks?: number;

    /**
     * Gets or Sets the label of the Y axis of the chart
     */
    yAxisLabel?: string;

    /**
     * Gets or Sets the yAxisLabelPadding of the chart. The default value is -36
     */
    yAxisLabelPadding?: number;

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

export default class Line extends Component<LineProps> {}
