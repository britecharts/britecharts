import { Component } from 'react';

export interface TooltipProps {
    /**
     * Exposes the constants to be used to force the x axis to respect a
     * certain granularity current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
     */
    axisTimeCombinations?: string;

    /**
     * Exposes the ability to use a custom date format
     */
    dateCustomFormat?: string;

    /**
     * Exposes the ability to force the tooltip to use a certain date format
     */
    dateFormat?: string;

    /**
     * Gets or Sets the dateLabel of the data
     */
    dateLabel?: string;

    /**
     * Hides the tooltip
     */
    hide?: Function;

    /**
     * Pass locale for the tooltip to render the date in
     */
    locale?: string;

    /**
     * Gets or Sets the nameLabel of the data
     */
    nameLabel?: string;

    /**
     * Gets or Sets the number format of the bar chart
     */
    numberFormat?: string;

    /**
     * Gets or Sets shouldShowDateInTitle
     */
    shouldShowDateInTitle?: boolean;

    /**
     * Shows the tooltip
     */
    show?: Function;

    /**
     * Gets or Sets the title of the tooltip (to only show the date, set a blank title)
     */
    title?: string;

    /**
     * Pass an override for the offset of your tooltip
     */
    tooltipOffset?: {
        x?: number;
        y?: number;
    };

    /**
     * Gets or Sets the topicLabel of the data
     */
    topicLabel?: string;

    /**
     * Pass an override for the ordering of your tooltip
     */
    topicsOrder?: string[];

    /**
     * Updates the position and content of the tooltip
     */
    update?: Function;

    /**
     * Gets or Sets the formatter function for the value displayed on the tooltip.
     */
    valueFormatter?: Function;

    /**
     * Gets or Sets the valueLabel of the data
     */
    valueLabel?: string;

    /**
     * Gets or Sets the most rows the tooltip shows; past that, the last row reads "+n more".
     * 0 shows every row. Default 12.
     */
    maxEntries?: number;

    /**
     * Gets or Sets how the key of the data point is shown in the title: 'date', 'number',
     * 'category' (as it is), or 'auto' (the default), which picks one per key.
     */
    xAxisValueType?: 'auto' | 'date' | 'number' | 'category';

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
    render?: Function;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    data: { [s: string]: any } | any[];

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    customMouseMove?: Function;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    customMouseOut?: Function;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    customMouseOver?: Function;
}

export default class Tooltip extends Component<TooltipProps> {}
