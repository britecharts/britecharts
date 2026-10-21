import React from 'react';
import type { FunctionComponent } from 'react';

import { DonutWrapper } from '@britecharts/wrappers';
import type { ChartEventHandler, Wrapper } from '@britecharts/wrappers';
import type {
    ColorsSchemasType,
    DonutChartDataShape,
    DonutChartModule,
    DonutEmptyDataConfig,
} from '@britecharts/core';

import useChart from '../helpers/useChart.js';

/**
 * The props are declared here rather than imported, for the reason recorded on
 * Bullet: Storybook's docgen reads the component file, and an interface it has
 * to follow an import to find is one it does not find.
 */
export interface DonutChartProps {
    /**
     * The name screen readers announce for the chart, set as its svg's
     * `aria-label`. Unset, the chart is announced by its type, such as "Bar chart".
     */
    a11yTitle?: string | null;
    /**
     * A longer description screen readers announce after the name, such as
     * what the data shows, rendered as the svg's `<desc>`.
     */
    a11yDescription?: string | null;
    /**
     * Internally used, do not overwrite.
     *
     * Required. `null` means the data has not arrived yet: nothing is drawn
     * until it does. Leaving it out is an error.
     */
    data: DonutChartDataShape[] | null;

    /**
     * Gets or Sets the duration of the animation
     */
    animationDuration?: number;

    /**
     * Gets or Sets the centeredTextFunction of the chart. If function is provided the format will be changed by the custom function's value format. The default format function value is "${d.percentage}% ${d.name}". The callback will provide the data object with id, name, percentage, and quantity. Also provides the component added by the user in each data entry
     */
    centeredTextFunction?: (datum: DonutChartDataShape) => string;

    /**
     * Current colorMap or Chart module to chain calls
     */
    colorMap?: Record<string, string>;

    /**
     * Gets or Sets the colorSchema of the chart
     */
    colorSchema?: ColorsSchemasType;

    /**
     * Gets or Sets the emptyDataConfig of the chart. If set and data is empty (quantity adds up to zero or there are no entries), the chart will render an empty slice with a given color (light gray by default)
     */
    emptyDataConfig?: DonutEmptyDataConfig;

    /**
     * The filename to export the chart to. Setting it exports the chart and fires
     * a download, which is what the chart's `exportChart` command does; it is
     * not a callback. The chart's exporter treats the title as optional, so a
     * filename on its own is enough.
     * A filename ending in `.svg` downloads an svg file, and any other a png.
     */
    exportChart?: string;

    /**
     * Gets or Sets the externalRadius of the chart
     */
    externalRadius?: number;

    /**
     * Gets or Sets the hasCenterLegend property of the chart, making it
     * display the legend at the center of the donut. By default this is 'true'
     */
    hasCenterLegend?: boolean;

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
    orderingFunction?: (
        a: DonutChartDataShape,
        b: DonutChartDataShape
    ) => number;

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

    customMouseOver?: ChartEventHandler;

    customMouseOut?: ChartEventHandler;

    customMouseMove?: ChartEventHandler;

    customClick?: ChartEventHandler;

    /**
     * Internally used, do not overwrite.
     */
    chart?: Wrapper<DonutChartDataShape[], DonutChartModule>;

    /**
     * Internally used, do not overwrite.
     *
     * Accepted and deliberately dropped: a Tooltip hands this to every chart
     * it decorates, and this component takes it out of the configuration
     * rather than passing it on. Declared so a TypeScript consumer using
     * Tooltip's render prop around a Donut can pass it.
     *
     * @ignore
     */
    createTooltip?: () => void;
}

// isAnimated reaches the chart only because it is put back into the
// configuration here: the rest of the props do not carry a default, so leaving
// it out would silently stop the donut animating. createTooltip is handed to
// every chart by a Tooltip, but is not a configuration key of the wrapper.
const Donut: FunctionComponent<DonutChartProps> = ({
    chart = DonutWrapper,
    isAnimated = true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createTooltip,
    data,
    ...rest
}: DonutChartProps) => {
    const rootNode = useChart(chart, data, { isAnimated, ...rest });

    return (
        <div
            className="donut-container"
            style={{ textAlign: 'center' }}
            ref={rootNode}
        />
    );
};

export default Donut;
