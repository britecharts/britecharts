import React from 'react';
import type { FunctionComponent } from 'react';

import { BrushWrapper } from '@britecharts/wrappers';
import type { ChartEventHandler, Wrapper } from '@britecharts/wrappers';
import type {
    AxisTimeCombination,
    BrushChartDataShape,
    BrushChartModule,
    ColorGradientType,
} from '@britecharts/core';

import useChart from '../helpers/useChart.js';
import { axisTimeCombinations as combinations } from '../constants.js';

/**
 * The props are declared here rather than imported, for the reason recorded on
 * Bullet: Storybook's docgen reads the component file, and an interface it has
 * to follow an import to find is one it does not find.
 */
export interface BrushProps {
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
    data: BrushChartDataShape[] | null;

    /**
     * Gets or Sets the duration of the animation
     */
    animationDuration?: number;

    /**
     * Gets or Sets the curve of the area, such as 'monotoneX' or 'step'
     */
    areaCurve?: string;

    /**
     * Gets or Sets the selected part of the brush, as a start and an end date.
     * The chart draws a selection once both are set.
     */
    dateRange?: [string, string];

    /**
     * Gets or Sets the gradient of the chart
     */
    gradient?: ColorGradientType;

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
     * Gets or Sets whether the selection keeps the size set with
     * `dateRange`, so it can be moved but not resized
     */
    isLocked?: boolean;

    /**
     * Pass language tag for the tooltip to localize the date.
     * Uses Intl.DateTimeFormat, for compatability and support, refer to
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
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
     * Gets or Sets the time interval the selection's ends round to, as a d3
     * time interval name such as 'timeDay'
     */
    roundingTimeInterval?: string;

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
     * Exposes the ability to force the chart to show a certain x ticks. It
     * requires a `xAxisFormat` of 'custom' in order to work. NOTE: This
     * value needs to be a multiple of 2, 5 or 10. They won't always work
     * as expected, as D3 decides at the end how many and where the ticks will appear.
     */
    xTicks?: number;

    /**
     * Called as a selection starts, with one argument: its `[start, end]`
     * dates
     */
    customBrushStart?: ChartEventHandler;

    /**
     * Called as a selection ends, with one argument: its `[start, end]`
     * dates, rounded to `roundingTimeInterval`
     */
    customBrushEnd?: ChartEventHandler;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    chart?: Wrapper<BrushChartDataShape[], BrushChartModule>;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     * @internal
     */
    createTooltip?: () => void;
}

const Brush: FunctionComponent<BrushProps> = ({
    chart = BrushWrapper,
    createTooltip,
    data,
    ...configuration
}: BrushProps) => {
    const rootNode = useChart(chart, data, configuration, { createTooltip });

    return <div className="brush-container" ref={rootNode} />;
};

/**
 * The x-axis granularity constants, re-exported for a consumer writing
 * `xAxisFormat`. They are an export, not a prop.
 */
export const axisTimeCombinations = combinations;

export default Brush;
