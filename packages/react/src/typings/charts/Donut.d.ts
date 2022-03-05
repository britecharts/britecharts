import { Component } from 'react';

export interface DonutChartProps {
    /**
     * Internally used, do not overwrite.
     */
    data: {
        quantity: number;
        percentage?: number;
        name: string;
        id?: number;
    }[];

    /**
     * Gets or Sets the duration of the animation
     */
    animationDuration?: number;

    /**
     * Gets or Sets the centeredTextFunction of the chart. If function is provided the format will be changed by the custom function's value format. The default format function value is "${d.percentage}% ${d.name}". The callback will provide the data object with id, name, percentage, and quantity. Also provides the component added by the user in each data entry
     */
    centeredTextFunction?: Function;

    /**
     * Current colorMap or Chart module to chain calls
     */
    colorMap?: Record<string, string>;

    /**
     * Gets or Sets the colorSchema of the chart
     */
    colorSchema?: string[];

    /**
     * Gets or Sets the emptyDataConfig of the chart. If set and data is empty (quantity adds up to zero or there are no entries), the chart will render an empty slice with a given color (light gray by default)
     */
    emptyDataConfig?: any;

    /**
     * Gets or Sets the externalRadius of the chart
     */
    externalRadius?: number;

    /**
     * Gets or Sets the hasFixedHighlightedSlice property of the chart, making it
     * to highlight the selected slice id set with `highlightSliceById` all the time.
     */
    hasFixedHighlightedSlice?: boolean;

    /**
     * Gets or Sets the hasHoverAnimation property of the chart. By default, donut chart highlights the hovered slice. This property explicitly disables this hover behavior.
     */
    hasHoverAnimation?: boolean;

    /**
     * Gets or sets the hasLastHoverSliceHighlighted property.
     * If property is true, the last hovered slice will be highlighted after 'mouseout` event is triggered.
     * The last hovered slice will remain in highlight state. Note: if both hasFixedHighlightedSlice and hasLastHoverSliceHighlighted are true, the latter property will override the former.
     */
    hasLastHoverSliceHighlighted?: boolean;

    /**
     * Gets or Sets the height of the chart
     */
    height?: number;

    /**
     * Gets or Sets the id of the slice to highlight
     */
    highlightSliceById?: number;

    /**
     * Gets or Sets the internalRadius of the chart
     */
    internalRadius?: number;

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
     * Gets or Sets the margin of the chart
     */
    margin?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };

    /**
     * Gets or Sets the number format of the donut chart
     */
    numberFormat?: string;

    /**
     * Changes the order of items given custom function
     */
    orderingFunction?: Function;

    /**
     * Gets or Sets the percentage format for the percentage label
     */
    percentageFormat?: string;

    /**
     * Gets or Sets the radiusHoverOffset of the chart
     */
    radiusHoverOffset?: number;

    /**
     * Gets or Sets the width of the chart
     */
    width?: number;

    customMouseOver?: Function;

    customMouseOut?: Function;

    customMouseMove?: Function;

    customClick?: Function;

    /**
     * Internally used, do not overwrite.
     */
    chart?: any;
}

export default class Donut extends Component<DonutChartProps> {}
