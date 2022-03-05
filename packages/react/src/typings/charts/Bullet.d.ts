import { Component } from 'react';

export interface BulletChartProps {
    /**
     * Internally used, do not overwrite.
     */
    data: {
        ranges: number[];
        measures: number[];
        markers: number[];
        title?: string;
        subtitle?: string;
    }[];

    /**
     * Gets or Sets the colorSchema of the chart. The first color from the array will be applied to range bars (the wider bars). The second color from the array will be applied to measure bars (the narrow bars) and marker lines.
     */
    colorSchema?: string[];

    /**
     * Gets or Sets the subtitle for measure identifier range.
     */
    customSubtitle?: string;

    /**
     * Gets or Sets the title for measure identifier range.
     */
    customTitle?: string;

    /**
     * Gets or Sets the height of the chart
     */
    height?: number;

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
    chart?: any;
}

export default class Bullet extends Component<BulletChartProps> {}
