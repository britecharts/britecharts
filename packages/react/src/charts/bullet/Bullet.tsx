import React from 'react';

import { BulletWrapper } from '@britecharts/wrappers';
import type { Wrapper } from '@britecharts/wrappers';
import type {
    BulletChartDataShape,
    BulletChartModule,
    ColorsSchemasType,
} from '@britecharts/core';

import useChart from '../helpers/useChart.js';
import type { Equal, Expect } from '../../typings/assert';
import type { BulletChartProps as PublishedBulletChartProps } from '../../typings/charts/Bullet';

/**
 * The props live here rather than being imported from `src/typings`, and that
 * is deliberate: Storybook's docgen reads the component file, and an interface
 * it has to follow an import to find is one it does not find -- the Controls
 * for this chart would drop from every prop to the one destructured default.
 * The JSDoc on each prop is what fills each Control's description, which is
 * the other reason it belongs next to the code.
 *
 * `PropsMatchPublished` below is what stops the two copies drifting while both
 * exist. Phase 5 removes the hand-written declaration and generates it from
 * this interface, and the assertion goes with it.
 */
export interface BulletChartProps {
    /**
     * Internally used, do not overwrite.
     *
     * Required. `null` means the data has not arrived yet: nothing is drawn
     * until it does. Leaving it out is an error.
     */
    data: BulletChartDataShape[] | null;

    /**
     * Gets or Sets the colorSchema of the chart. The first color from the array will be applied to range bars (the wider bars). The second color from the array will be applied to measure bars (the narrow bars) and marker lines.
     */
    colorSchema?: ColorsSchemasType;

    /**
     * Gets or Sets the subtitle for measure identifier range.
     */
    customSubtitle?: string;

    /**
     * Gets or Sets the title for measure identifier range.
     */
    customTitle?: string;

    /**
     * Gets or Sets the height of the chart
     */
    height?: number;

    /**
     * Gets or Sets the isReverse status of the chart. If true, the elements will be rendered in reverse order.
     */
    isReverse?: boolean;

    /**
     * Gets or Sets the margin of the chart
     */
    margin?: { top?: number; bottom?: number; left?: number; right?: number };

    /**
     * Gets or Sets the number format of the bar chart
     */
    numberFormat?: string;

    /**
     * Space between axis and chart
     */
    paddingBetweenAxisAndChart?: number;

    /**
     * Gets or Sets the starting point of the capacity range.
     * Default is 0.5
     */
    startMaxRangeOpacity?: number;

    /**
     * Gets or Sets the number of ticks of the x axis on the chart
     * Default is 5
     */
    ticks?: number;

    /**
     * Gets or Sets the width of the chart
     */
    width?: number;

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    chart?: Wrapper<BulletChartDataShape[], BulletChartModule>;

    /**
     * Internally used, do not overwrite.
     *
     * Asked for again after each update, so a tooltip can be attached to the
     * chart the wrapper has just drawn.
     *
     * @ignore
     */
    createTooltip?: () => void;
}

/** The interface above and the published declaration are the same type. */
export type PropsMatchPublished = Expect<
    Equal<BulletChartProps, PublishedBulletChartProps>
>;

const Bullet = ({
    chart = BulletWrapper,
    createTooltip,
    data,
    ...configuration
}: BulletChartProps) => {
    const rootNode = useChart(chart, data, configuration, { createTooltip });

    return <div className="bullet-container" ref={rootNode} />;
};

export default Bullet;
