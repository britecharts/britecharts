import { Component } from 'react';

export interface SparklineProps {
    /**
     * Internally used, do not overwrite.
     */
    data: {
        value: number;
        date: string;
    }[];

    /**
     * Gets or Sets the duration of the animation
     */
    animationDuration?: number;

    /**
     * Gets or Sets the areaGradient of the chart
     */
    areaGradient?: string[];

    /**
     * Gets or Sets the dateLabel of the chart
     */
    dateLabel?: string;

    /**
     * Chart exported to png and a download action is fired
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
     * Gets or Sets the lineGradient of the chart
     */
    lineGradient?: string[];

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
     * Gets or Sets the text of the title at the top of the chart.
     * To style the title text, use the titleTextStyle method below.
     */
    titleText?: string;

    /**
     * Gets or Sets the text style object of the title at the top of sparkline.
     * Using this method, you can set font-family, font-size, font-weight, font-style,
     * and color (fill). The default text font settings:
     *
     * <pre>
     * <code>
     * {
     *    'font-family': 'sans-serif',
     *    'font-size': '22px',
     *    'font-weight': 0,
     *    'font-style': 'normal',
     *    'fill': linearGradient[0]
     * }
     * </code>
     * </pre>
     *
     * You can set attributes individually. Setting just 'font-family'
     * within the object will set custom 'font-family` while the rest
     * of the attributes will have the default values provided above.
     */
    titleTextStyle?: {
        'font-family'?: string;
        'font-size'?: string;
        'font-weight'?: number;
        'font-style'?: string;
        fill?: string;
    };

    /**
     * Gets or Sets the valueLabel of the chart
     */
    valueLabel?: string;

    /**
     * Gets or Sets the width of the chart
     */
    width?: number;

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

export default class Sparkline extends Component<SparklineProps> {}
