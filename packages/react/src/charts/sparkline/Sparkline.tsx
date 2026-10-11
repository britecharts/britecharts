import React from 'react';

import { SparklineWrapper } from '@britecharts/wrappers';
import type { Wrapper } from '@britecharts/wrappers';
import type {
    ColorGradientType,
    SparkelineTitleTextStyle,
    SparklineChartDataShape,
    SparklineChartModule,
} from '@britecharts/core';

import useChart from '../helpers/useChart.js';
import type { Equal, Expect } from '../../typings/assert';
import type { SparklineProps as PublishedSparklineProps } from '../../typings/charts/Sparkline';

/**
 * The props are declared here rather than imported, for the reason recorded on
 * Bullet: Storybook's docgen reads the component file, and an interface it has
 * to follow an import to find is one it does not find.
 */
export interface SparklineProps {
    /**
     * Internally used, do not overwrite.
     *
     * Required. `null` means the data has not arrived yet: nothing is drawn
     * until it does. Leaving it out is an error.
     */
    data: SparklineChartDataShape[] | null;

    /**
     * Gets or Sets the duration of the animation
     */
    animationDuration?: number;

    /**
     * Gets or Sets the areaGradient of the chart
     */
    // A two-element tuple, as core declares it: the chart reads [0] and [1]
    // and nothing else. `string[]` accepted a one-element or empty array.
    areaGradient?: ColorGradientType;

    /**
     * Gets or Sets the dateLabel of the chart
     */
    dateLabel?: string;

    /**
     * The filename to export the chart to. Setting it exports a png and fires
     * a download, which is what the chart's `exportChart` command does; it is
     * not a callback, and the four other components that declare this prop had
     * it as one. The chart's exporter treats the title as optional, so a
     * filename on its own is enough.
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
    lineGradient?: ColorGradientType;

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
    titleTextStyle?: SparkelineTitleTextStyle;

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
    chart?: Wrapper<SparklineChartDataShape[], SparklineChartModule>;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     * @internal
     */
    createTooltip?: () => void;
}

/** The interface above and the published declaration are the same type. */
export type PropsMatchPublished = Expect<
    Equal<SparklineProps, PublishedSparklineProps>
>;

const Sparkline = ({
    chart = SparklineWrapper,
    createTooltip,
    data,
    ...configuration
}: SparklineProps) => {
    const rootNode = useChart(chart, data, configuration, { createTooltip });

    return <div className="sparkline-container" ref={rootNode} />;
};

export default Sparkline;
