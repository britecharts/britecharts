import { Component } from 'react';

export interface LegendProps {
    /**
     * The data to be used by the chart
     */
    data: {
        id: number;
        quantity: number;
        name?: string;
    }[];

    /**
     * Clears all highlighted entries
     */
    clearHighlight?: Function;

    /**
     * Current colorMap or Chart module to chain calls
     */
    colorMap?: Record<string, string>;

    /**
     * Gets or Sets the colorSchema of the chart
     */
    colorSchema?: string[];

    /**
     * Gets or Sets the height of the legend chart
     */
    height?: number;

    /**
     * Command that highlights a line entry by fading the rest of lines
     */
    highlight?: number;

    /**
     * Highlights a line entry by fading the rest of lines
     */
    highlightEntryById?: number;

    /**
     * Gets or Sets the horizontal mode on the legend
     */
    isHorizontal?: boolean;

    /**
     * Gets or Sets the margin of the legend chart
     */
    margin?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };

    /**
     * Gets or Sets the margin ratio of the legend chart. Used to determine spacing between legend elements.
     */
    marginRatio?: number;

    /**
     * Gets or Sets the markerSize of the legend chart. This markerSize will determine
     * the horizontal and vertical size of the colored marks added as color
     * identifiers for the chart's categories.
     */
    markerSize?: number;

    /**
     * Gets or Sets the number format of the legend chart
     */
    numberFormat?: string;

    /**
     * Gets or Sets the unit of the value
     */
    unit?: string;

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

export default class Legend extends Component<LegendProps> {}
