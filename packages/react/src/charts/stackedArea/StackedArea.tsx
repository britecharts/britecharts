import React from 'react';
import type { FunctionComponent } from 'react';

import { StackedAreaWrapper } from '@britecharts/wrappers';
import type { ChartEventHandler, Wrapper } from '@britecharts/wrappers';
import type {
    AxisTimeCombination,
    ColorsSchemasType,
    StackedAreaChartDataShape,
    StackedAreaChartModule,
    StackedAreaEmptyDataConfig,
    StackedAreaXAxisScale,
    StackedAreaXAxisValueType,
} from '@britecharts/core';

import useChart from '../helpers/useChart.js';
import { axisTimeCombinations as combinations } from '../constants.js';

/**
 * The props are declared here rather than imported, for the reason recorded on
 * Bullet: Storybook's docgen reads the component file, and an interface it has
 * to follow an import to find is one it does not find.
 */
export interface StackedAreaProps {
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
    data: StackedAreaChartDataShape[] | null;

    /**
     * Gets or Sets the duration of the animation
     */
    animationDuration?: number;

    /**
     * Gets or Sets the area curve of the stacked area.
     */
    areaCurve?: string;

    /**
     * Gets or Sets the opacity of the stacked areas in the chart
     * (all of them will have the same opacity)
     */
    areaOpacity?: number;

    /**
     * Current colorMap or Chart module to chain calls
     */
    colorMap?: Record<string, string>;

    /**
     * Gets or Sets the colorSchema of the chart
     */
    colorSchema?: ColorsSchemasType;

    /**
     * Gets or Sets the emptyDataConfig of the chart
     */
    emptyDataConfig?: StackedAreaEmptyDataConfig;

    /**
     * The filename to export the chart to. Setting it exports the chart and fires
     * a download, which is what the chart's `exportChart` command does; it is
     * not a callback.
     * A filename ending in `.svg` downloads an svg file, and any other a png.
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
     * Enables or disables the outline at the top of the areas.
     * By default this is 'true'
     */
    hasOutline?: boolean;

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
     * Gets or Sets whether a loading state will be shown
     */
    isLoading?: boolean;

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
     * Gets or Sets the minimum width of the graph in order
     * to show the tooltip NOTE: This could also depend on the aspect ratio
     */
    tooltipThreshold?: number;

    /**
     * Pass an override for the ordering of the topics
     */
    topicsOrder?: string[];

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
    // The four granularities plus 'custom', as core declares it. `string`
    // accepted anything and only those five do something; the enum and its
    // string values are both allowed, which is what core's
    // `AxisTimeCombination | `${AxisTimeCombination}`` says.
    xAxisFormat?: AxisTimeCombination | `${AxisTimeCombination}`;

    /**
     * Gets or Sets the `xAxisScale`. Choose between 'linear' and 'logarithmic'.
     * The setting will only work if `xAxisValueType` is set to 'number' as well, otherwise it won't influence the visualization.
     */
    xAxisScale?: StackedAreaXAxisScale;

    /**
     * Gets or Sets the `xAxisValueType`. Choose between 'date' and 'number'.
     * When set to `number` the values of the x-axis must not be dates anymore, but can be arbitrary numbers.
     */
    xAxisValueType?: StackedAreaXAxisValueType;

    /**
     * Exposes the ability to force the chart to show a certain x ticks. It
     * requires a `xAxisFormat` of 'custom' in order to work. NOTE: This
     * value needs to be a multiple of 2, 5 or 10. They won't always work
     * as expected, as D3 decides at the end how many and where the ticks will appear.
     */
    xTicks?: number;

    /**
     * Gets or Sets the yAxisBaseline - this is the y-value where the area starts from in y-direction (default is 0).
     * Change this value if you don't want to start your area from y=0.
     */
    yAxisBaseline?: number;

    /**
     * Gets or Sets the y-axis label of the chart
     */
    yAxisLabel?: string;

    /**
     * Gets or Sets the offset of the yAxisLabel of the chart. The method accepts both positive and negative values. The default value is -60
     */
    yAxisLabelOffset?: number;

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
    chart?: Wrapper<StackedAreaChartDataShape[], StackedAreaChartModule>;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     * @internal
     */
    createTooltip?: () => void;
}

const StackedArea: FunctionComponent<StackedAreaProps> = ({
    chart = StackedAreaWrapper,
    createTooltip,
    data,
    ...configuration
}: StackedAreaProps) => {
    const rootNode = useChart(chart, data, configuration, { createTooltip });

    return <div className="stacked-area-container" ref={rootNode} />;
};

/**
 * The x-axis granularity constants, re-exported for a consumer writing
 * `xAxisFormat`. They are an export, not a prop.
 */
export const axisTimeCombinations = combinations;

export default StackedArea;
