import React from 'react';
import type { FunctionComponent } from 'react';

import { LineWrapper } from '@britecharts/wrappers';
import type { ChartEventHandler, Wrapper } from '@britecharts/wrappers';
import type {
    AxisTimeCombination,
    ColorGradientType,
    ColorsSchemasType,
    CustomLine,
    LineChartData,
    LineChartModule,
    LineChartXAxisScale,
    LineChartXAxisValueType,
} from '@britecharts/core';

import useChart from '../helpers/useChart.js';
import { axisTimeCombinations as combinations } from '../constants.js';

/**
 * The props are declared here rather than imported, for the reason recorded on
 * Bullet: Storybook's docgen reads the component file, and an interface it has
 * to follow an import to find is one it does not find.
 */
export interface LineProps {
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
     * Whether the chart renders its data as a visually hidden table after its
     * svg, which screen readers can read cell by cell. On by default.
     */
    a11yDataTable?: boolean;
    /**
     * Internally used, do not overwrite.
     *
     * Required. `null` means the data has not arrived yet: nothing is drawn
     * until it does. Leaving it out is an error.
     */
    data: LineChartData | null;

    /**
     * Gets or Sets the duration of the animation
     */
    animationDuration?: number;

    /**
     * Current colorMap or Chart module to chain calls
     */
    colorMap?: Record<string, string>;

    /**
     * Gets or Sets the colorSchema of the chart
     */

    colorSchema?: ColorsSchemasType;

    /**
     * The filename to export the chart to. Setting it exports the chart and
     * fires a download: an svg file when the filename ends in `.svg`, and a
     * png otherwise.
     */
    exportChart?: string;

    /**
     * Gets or Sets the grid mode.
     */
    // `GridTypes | null` as core declares it, spelled out rather than
    // imported: Storybook's docgen reads this file alone, so an imported alias
    // reaches it as a bare name and the grid Control loses its three options.
    grid?: 'vertical' | 'horizontal' | 'full' | null;

    /**
     * Gets or Sets the hasMinimumValueScale property of the chart, making the
     * y axis start at the lowest value in the dataset rather than at zero.
     * By default this is 'false'
     */
    hasMinimumValueScale?: boolean;

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
    // The two-element tuple core declares: the chart reads [0] and [1] and
    // nothing else, so `string[]` accepted an array that leaves a stop
    // undefined.
    lineGradient?: ColorGradientType;

    /**
     * Add custom horizontal lines to the Chart - this way you are able to plot arbitrary horizontal lines
     * onto the chart with a specific color and a text annotation over the line.
     */
    lines?: CustomLine[];

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
     * Gets or Sets whether every data point is drawn as a marker on its line.
     * By default this is 'false'
     */
    shouldShowAllDataPoints?: boolean;

    /**
     * Gets or Sets the minimum width of the graph in order
     * to show the tooltip NOTE: This could also depend on the aspect ratio
     */
    tooltipThreshold?: number;

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
    xAxisFormat?: AxisTimeCombination | `${AxisTimeCombination}`;

    /**
     * Gets or Sets the label of the X axis of the chart
     */
    xAxisLabel?: string;

    /**
     * Gets or Sets the `xAxisScale`. Choose between 'linear' and 'logarithmic'.
     * The setting will only work if `xAxisValueType` is set to 'number' as well, otherwise it won't influence the visualization.
     */
    xAxisScale?: LineChartXAxisScale;

    /**
     * Gets or Sets the `xAxisValueType`. Choose between 'date' and 'number'.
     * When set to `number` the values of the x-axis must not be dates anymore, but can be arbitrary numbers.
     */
    xAxisValueType?: LineChartXAxisValueType;

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

    customMouseOver?: ChartEventHandler;
    customMouseMove?: ChartEventHandler;
    customMouseOut?: ChartEventHandler;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    chart?: Wrapper<LineChartData, LineChartModule>;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     * @internal
     */
    createTooltip?: () => void;
}

const Line: FunctionComponent<LineProps> = ({
    chart = LineWrapper,
    createTooltip,
    data,
    ...configuration
}: LineProps) => {
    const rootNode = useChart(chart, data, configuration, { createTooltip });

    return <div className="line-container" ref={rootNode} />;
};

/**
 * The x-axis granularity constants, re-exported for a consumer writing
 * `xAxisFormat`. They are an export, not a prop.
 */
export const axisTimeCombinations = combinations;

export default Line;
