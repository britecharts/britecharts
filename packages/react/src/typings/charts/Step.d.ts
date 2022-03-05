import { Component } from 'react';

export interface StepProps {
    /**
     * Internally used, do not overwrite.
     */
    data: {
        value: number;
        key: string;
    }[];

    /**
     * Chart exported to png and a download action is fired
     */
    exportChart?: Function;

    /**
     * Gets or Sets the height of the chart
     */
    height?: number;

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
     * Gets or Sets the text of the xAxisLabel on the chart
     */
    xAxisLabel?: string;

    /**
     * Gets or Sets the offset of the xAxisLabel on the chart
     */
    xAxisLabelOffset?: number;

    /**
     * Gets or Sets the text of the yAxisLabel on the chart
     */
    yAxisLabel?: string;

    /**
     * Gets or Sets the offset of the yAxisLabel on the chart
     */
    yAxisLabelOffset?: number;

    /**
     * Gets or Sets the number of ticks of the y axis on the chart (Default is 6)
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

export default class Step extends Component<StepProps> {}
