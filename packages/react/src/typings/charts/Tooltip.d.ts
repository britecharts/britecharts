import { FunctionComponent, ReactNode } from 'react';
import {
    TooltipDataShape,
    TooltipListDataShape,
    TooltipTopic,
} from '@britecharts/core';
import { TooltipWrapperShape } from '@britecharts/wrappers';

export interface TooltipProps {
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
    // A trigger, not a callback: the tooltip's `hide()` takes no arguments,
    // so any value that is set calls it and the value is discarded.
    hide?: boolean;

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
    // The data point to show, which is what the tooltip's `show` command
    // takes. It was declared as a function, which the tooltip would have
    // rendered as a data point.
    show?: TooltipDataShape;

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
    // `TooltipTopic['name'][]`, which is `(string | number)[]`: line hands
    // the tooltip numeric topic ids and stacked area hands it string names,
    // and this migration corrected core to say so. `string[]` rejected the
    // numeric order the tooltip's own spec uses.
    topicsOrder?: TooltipTopic['name'][];

    /**
     * Updates the position and content of the tooltip
     */
    // The data point to update with. The tooltip's `update` is overloaded,
    // and this is the first argument of the signature a configuration can
    // reach -- the other three arrive from the chart's own dispatch, not from
    // a prop.
    update?: TooltipListDataShape;

    /**
     * Gets or Sets the formatter function for the value displayed on the tooltip.
     */
    // `(value: number) => number`, as core declares it. Spelled out because
    // core's `TooltipFormattingFunction` is not exported; the bare `Function`
    // type that stood here accepts any function-like value and tells a
    // consumer nothing.
    valueFormatter?: (value: number) => number;

    /**
     * Gets or Sets the valueLabel of the data
     */
    valueLabel?: string;

    /**
     * Gets or Sets the layout: 'list' (title and one row per topic), 'single' (title,
     * name and a big value) or 'auto' (the default: by the data point's shape).
     */
    layout?: 'auto' | 'list' | 'single';

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
    chart?: TooltipWrapperShape;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    render?: (args: {
        data: TooltipProps['data'];
        createTooltip: () => void;
        customMouseMove: (
            dataPoint: object,
            position: [number, number],
            size?: [number, number],
            topicColorMap?: Record<string, string>
        ) => void;
        customMouseOut: () => void;
        customMouseOver: () => void;
    }) => ReactNode;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    data: { [s: string]: any } | any[];

    /**
     * Called after the tooltip updates, with what the chart dispatches on
     * customMouseMove: the data point, its anchor [x, y], the chart's size and,
     * from the multi-value charts, the topic colours.
     */
    customMouseMove?: (
        dataPoint: object,
        position: [number, number],
        size?: [number, number],
        topicColorMap?: Record<string, string>
    ) => void;

    /** Called after the tooltip hides, when the pointer leaves the chart */
    customMouseOut?: () => void;

    /** Called after the tooltip shows, when the pointer enters the chart */
    customMouseOver?: () => void;
}

declare const Tooltip: FunctionComponent<TooltipProps>;

export default Tooltip;
