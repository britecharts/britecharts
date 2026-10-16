import React, { useLayoutEffect, useRef, useState } from 'react';
import type { FunctionComponent, ReactNode } from 'react';

import { TooltipWrapper } from '@britecharts/wrappers';
import type {
    TooltipState,
    TooltipWrapperShape,
    WrapperConfiguration,
} from '@britecharts/wrappers';
import type {
    TooltipDataShape,
    TooltipListDataShape,
    TooltipModule,
    TooltipTopic,
} from '@britecharts/core';

import { axisTimeCombinations as combinations } from '../constants.js';

const tooltipContainerWithMarkerSelector =
    '.metadata-group .vertical-marker-container';
const tooltipContainerSelector = '.metadata-group';
const tooltipSelector = '.britechart-tooltip';

const initialState: TooltipState = {
    isActive: false,
    x: 0,
    y: 0,
    dataPoint: null,
    topicColorMap: null,
};

/**
 * The props are declared here rather than imported, for the reason recorded on
 * Bullet: Storybook's docgen reads the component file, and an interface it has
 * to follow an import to find is one it does not find.
 */
/**
 * What the tooltip hands its `render` callback: the data and the handlers the
 * wrapped chart needs to drive the tooltip.
 */
export type TooltipRenderArgs = {
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
};

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
    render?: (args: TooltipRenderArgs) => ReactNode;

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

/**
 * We want to remove the chart and data from the props in order to have a
 * configuration object
 */
const getChartConfiguration = (props: TooltipProps) => {
    const configuration: Record<string, unknown> = { ...props };

    delete configuration.data;
    delete configuration.chart;
    delete configuration.render;
    // The component's own callbacks: the tooltip has no `on` accessor
    delete configuration.customMouseMove;
    delete configuration.customMouseOut;
    delete configuration.customMouseOver;

    return configuration as WrapperConfiguration<TooltipModule>;
};

/**
 * The chart's group the tooltip is drawn into: the vertical marker
 * container when the chart has one (line, stacked area), otherwise the
 * metadata group
 */
const getTooltipContainer = (rootNode: HTMLElement | null) => {
    if (!rootNode) {
        return null;
    }

    return (
        rootNode.querySelector<HTMLElement>(
            tooltipContainerWithMarkerSelector
        ) || rootNode.querySelector<HTMLElement>(tooltipContainerSelector)
    );
};

const Tooltip: FunctionComponent<TooltipProps> = (props: TooltipProps) => {
    const { chart = TooltipWrapper } = props;
    const rootNode = useRef<HTMLDivElement>(null);
    const tooltipChart = useRef<TooltipModule | null>(null);
    const chartWrapper = useRef(chart);
    const hasMounted = useRef(false);
    // The wrapped chart and the props it was built from. Held in a ref and not
    // in useMemo: a memo is a hint React may discard, and a discard would
    // rebuild the wrapped chart on a pointer move.
    const childChart = useRef<{
        props: TooltipProps | null;
        element: ReactNode;
    }>({ props: null, element: null });
    const [state, setState] = useState(initialState);

    /**
     * Draws the tooltip into the chart. The charts call this again after
     * every update of their own, so it only creates a tooltip when the
     * container does not hold one already -- otherwise every pointer move
     * would add another
     */
    const createTooltip = () => {
        const tooltipContainer = getTooltipContainer(rootNode.current);

        if (!tooltipContainer) {
            return;
        }

        if (
            tooltipChart.current &&
            tooltipContainer.querySelector(tooltipSelector)
        ) {
            return;
        }

        tooltipChart.current = chart.create(
            tooltipContainer,
            getChartConfiguration(props)
        );
    };

    /**
     * What every chart dispatches on customMouseMove: the data point, its
     * anchor [x, y], the chart's size and, from the multi-value charts, the
     * topic colours
     */
    const handleMouseMove = (
        dataPoint: object,
        position: [number, number],
        size?: [number, number],
        topicColorMap?: Record<string, string>
    ) => {
        const [x, y] = Array.isArray(position) ? position : [];

        // Update Tooltip State
        setState((previous) => ({
            ...previous,
            dataPoint: dataPoint as TooltipDataShape,
            topicColorMap: topicColorMap || null,
            x,
            y,
        }));

        if (props.customMouseMove) {
            props.customMouseMove(dataPoint, position, size, topicColorMap);
        }
    };

    const handleMouseOut = () => {
        // Update Tooltip State
        setState((previous) => ({ ...previous, isActive: false }));

        if (props.customMouseOut) {
            props.customMouseOut();
        }
    };

    const handleMouseOver = () => {
        // Update Tooltip State
        setState((previous) => ({ ...previous, isActive: true }));

        if (props.customMouseOver) {
            props.customMouseOver();
        }
    };

    // The wrapped chart is built from the props only, so a tooltip state
    // change (every pointer move) re-renders this component but hands the
    // chart the same element and React leaves it alone. Rebuilding it here on
    // every render would make the chart redraw itself on each move. It is
    // handed everything it needs to drive the tooltip: the data and the three
    // mouse handlers, plus createTooltip for the chart to call once it has
    // drawn (or redrawn) its groups. The handlers are plain closures over the
    // props they were built from: they are rebuilt whenever the props change.
    if (props.render && props !== childChart.current.props) {
        childChart.current = {
            props,
            element: props.render({
                data: props.data,
                createTooltip,
                customMouseMove: handleMouseMove,
                customMouseOut: handleMouseOut,
                customMouseOver: handleMouseOver,
            }),
        };
    }

    // No deps array on purpose: the tooltip is drawn once the chart it wraps
    // has drawn itself (layout effects run children first), then follows every
    // render, since the pointer moving is a state change. The mount is told
    // apart from an update by a flag that the cleanup resets, so a remount
    // (StrictMode's, in development) creates the tooltip again.
    useLayoutEffect(() => {
        chartWrapper.current = chart;

        if (!hasMounted.current) {
            hasMounted.current = true;
            createTooltip();

            return;
        }

        const tooltipContainer = getTooltipContainer(rootNode.current);

        if (tooltipContainer && tooltipChart.current) {
            tooltipChart.current = chart.update(
                tooltipContainer,
                getChartConfiguration(props),
                state,
                tooltipChart.current
            );
        }
    });

    // Mount and unmount only. Nothing the cleanup reads may come from a render
    // closure: the node is captured inside this effect and the wrapper comes
    // from a ref, so it is the one the last render was given.
    useLayoutEffect(() => {
        const node = rootNode.current;

        return () => {
            chartWrapper.current.destroy(node);
            tooltipChart.current = null;
            hasMounted.current = false;
        };
    }, []);

    return (
        <div className="tooltip-chart-wrapper" ref={rootNode}>
            {childChart.current.element}
        </div>
    );
};

export default Tooltip;

/**
 * Exposes the constants to be used to force the x axis to respect a
 * certain granularity current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
 */
export const axisTimeCombinations = combinations;
