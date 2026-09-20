import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { TooltipWrapper } from '@britecharts/wrappers';

import { axisTimeCombinations as combinations } from '../constants';

const tooltipContainerWithMarkerSelector =
    '.metadata-group .vertical-marker-container';
const tooltipContainerSelector = '.metadata-group';
const tooltipSelector = '.britechart-tooltip';

const initialState = {
    isActive: false,
    x: 0,
    y: 0,
    dataPoint: null,
    topicColorMap: null,
};

/**
 * We want to remove the chart and data from the props in order to have a configuration object
 * @param  {Object} props   The component's props
 * @return {Object}         Configuration object for the chart
 */
const getChartConfiguration = (props) => {
    const configuration = { ...props };

    delete configuration.data;
    delete configuration.chart;
    delete configuration.render;
    // The component's own callbacks: the tooltip has no `on` accessor
    delete configuration.customMouseMove;
    delete configuration.customMouseOut;
    delete configuration.customMouseOver;

    return configuration;
};

/**
 * The chart's group the tooltip is drawn into: the vertical marker
 * container when the chart has one (line, stacked area), otherwise the
 * metadata group
 * @param  {Element|null} rootNode  The component's wrapper element
 * @return {Element|null}
 */
const getTooltipContainer = (rootNode) => {
    if (!rootNode) {
        return null;
    }

    return (
        rootNode.querySelector(tooltipContainerWithMarkerSelector) ||
        rootNode.querySelector(tooltipContainerSelector)
    );
};

const Tooltip = (props) => {
    const { chart = TooltipWrapper } = props;
    const rootNode = useRef(null);
    const tooltipChart = useRef(null);
    const chartWrapper = useRef(chart);
    const hasMounted = useRef(false);
    // The wrapped chart and the props it was built from. Held in a ref and not
    // in useMemo: a memo is a hint React may discard, and a discard would
    // rebuild the wrapped chart on a pointer move.
    const childChart = useRef({ props: null, element: null });
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
    const handleMouseMove = (dataPoint, position, size, topicColorMap) => {
        const [x, y] = Array.isArray(position) ? position : [];

        // Update Tooltip State
        setState((previous) => ({
            ...previous,
            dataPoint,
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

Tooltip.propTypes = {
    /**
     * Exposes the constants to be used to force the x axis to respect a certain granularity current options:
     *  MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
     */
    axisTimeCombinations: PropTypes.string,

    /**
     * Exposes the ability to use a custom date format
     */
    dateCustomFormat: PropTypes.string,

    /**
     * Exposes the ability to force the tooltip to use a certain date format
     */
    dateFormat: PropTypes.string,

    /**
     * Gets or Sets the dateLabel of the data
     */
    dateLabel: PropTypes.string,

    /**
     * Hides the tooltip
     */
    hide: PropTypes.func,

    /**
     * Pass locale for the tooltip to render the date in
     */
    locale: PropTypes.string,

    /**
     * Gets or Sets the nameLabel of the data
     */
    nameLabel: PropTypes.string,

    /**
     * Gets or Sets the number format of the line chart
     */
    numberFormat: PropTypes.string,

    /**
     * Gets or Sets shouldShowDateInTitle
     */
    shouldShowDateInTitle: PropTypes.bool,

    /**
     * Shows the tooltip
     */
    show: PropTypes.func,

    /**
     * Gets or Sets the title of the tooltip (to only show the date, set a blank title)
     */
    title: PropTypes.string,

    /**
     * Pass an override for the offset of your tooltip
     */
    tooltipOffset: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }),

    /**
     * Gets or Sets the topicLabel of the data
     */
    topicLabel: PropTypes.string,

    /**
     * Pass an override for the ordering of your tooltip
     */
    topicsOrder: PropTypes.arrayOf(PropTypes.string),

    /**
     * Updates the position and content of the tooltip
     */
    update: PropTypes.func,

    /**
     * Gets or Sets the formatter function for the value displayed on the tooltip.
     */
    valueFormatter: PropTypes.func,

    /**
     * Gets or Sets the valueLabel of the data
     */
    valueLabel: PropTypes.string,

    /**
     * Gets or Sets the layout: 'list' (title and one row per topic), 'single'
     * (title, name and a big value) or 'auto' (the default: by the data point's shape,
     * so a list for the line, stacked area, stacked bar and grouped bar charts and a
     * single value for the bar, scatter plot, heatmap and donut charts)
     */
    layout: PropTypes.oneOf(['auto', 'list', 'single']),

    /**
     * Gets or Sets the most rows the tooltip shows; past that, the last row reads "+n more".
     * 0 shows every row. Default 12.
     */
    maxEntries: PropTypes.number,

    /**
     * Gets or Sets how the key of the data point is shown in the title: 'date', 'number',
     * 'category' (as it is), or 'auto' (the default), which picks one per key.
     */
    xAxisValueType: PropTypes.oneOf(['auto', 'date', 'number', 'category']),

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    chart: PropTypes.object,

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    render: PropTypes.func,

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,

    /**
     * Called after the tooltip updates, with what the chart dispatches on
     * customMouseMove: the data point, its anchor [x, y], the chart's size and,
     * from the multi-value charts, the topic colours
     */
    customMouseMove: PropTypes.func,

    /**
     * Called after the tooltip hides, when the pointer leaves the chart
     */
    customMouseOut: PropTypes.func,

    /**
     * Called after the tooltip shows, when the pointer enters the chart
     */
    customMouseOver: PropTypes.func,
};

export default Tooltip;

/**
 * Exposes the constants to be used to force the x axis to respect a
 * certain granularity current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
 */
export const axisTimeCombinations = combinations;
