import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { LineWrapper } from '@britecharts/wrappers';

import { axisTimeCombinations as combinations } from '../constants';

const noop = () => null;

/**
 * The configuration is rebuilt from the props on every render, so it can never
 * be compared by identity, which is what a deps array would have to do. Compare
 * what was drawn last with what is about to be, field by field. Delete this and
 * its call site to get back to redrawing on every render.
 */
const isSameDrawing = (previous, next) => {
    if (!previous) {
        return false;
    }

    const keys = Object.keys(next);

    return (
        keys.length === Object.keys(previous).length &&
        keys.every((key) => Object.is(previous[key], next[key]))
    );
};

const Line = ({
    chart = LineWrapper,
    createTooltip = noop,
    data,
    ...configuration
}) => {
    const rootNode = useRef(null);
    const chartInstance = useRef(null);
    const chartWrapper = useRef(chart);
    const lastDrawn = useRef(null);

    // Layout effects flush synchronously inside React's commit, before paint,
    // which is what componentDidMount and componentDidUpdate did. No deps array
    // on purpose: creating and updating live in one effect that branches on
    // whether a chart exists, so creation stays reachable on any render (the
    // data arriving after mount) and a StrictMode remount recreates the chart.
    useLayoutEffect(() => {
        chartWrapper.current = chart;

        const drawing = { data, ...configuration };

        if (chartInstance.current) {
            if (isSameDrawing(lastDrawn.current, drawing)) {
                return;
            }

            lastDrawn.current = drawing;
            chart.update(
                rootNode.current,
                data,
                configuration,
                chartInstance.current
            );
            // After the update, and never after the creation
            createTooltip();

            return;
        }

        if (data === null) {
            return;
        }

        lastDrawn.current = drawing;
        chartInstance.current = chart.create(
            rootNode.current,
            data,
            configuration
        );
    });

    // Mount and unmount only. Nothing the cleanup reads may come from a render
    // closure: the node is captured inside this effect and the wrapper comes
    // from a ref, so it is the one the last render was given.
    useLayoutEffect(() => {
        const node = rootNode.current;

        return () => {
            chartWrapper.current.destroy(node);
            chartInstance.current = null;
            lastDrawn.current = null;
        };
    }, []);

    return <div className="line-container" ref={rootNode} />;
};

Line.propTypes = {
    /**
     * Internally used, do not overwrite.
     */
    data: PropTypes.object,

    /**
     * Gets or Sets the duration of the animation
     */
    animationDuration: PropTypes.number,

    /**
     * Exposes the constants to be used to force the x axis to respect a certain granularity current options:
     *  MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
     */
    axisTimeCombinations: PropTypes.string,

    /**
     * Current colorMap or Chart module to chain calls
     */
    colorMap: PropTypes.object,

    /**
     * Gets or Sets the colorSchema of the chart
     */
    colorSchema: PropTypes.arrayOf(PropTypes.string),

    /**
     * Gets or Sets the dateLabel of the chart
     */
    dateLabel: PropTypes.string,

    /**
     * Chart exported to png and a download action is fired
     */
    exportChart: PropTypes.func,

    /**
     * Gets or Sets the grid mode.
     */
    grid: PropTypes.string,

    /**
     * Gets or Sets the height of the chart
     */
    height: PropTypes.number,

    /**
     * Gets or Sets the isAnimated property of the chart, making it to animate
     * when render. By default this is 'false'
     */
    isAnimated: PropTypes.bool,

    /**
     * Current loading state flag or Chart module to chain calls
     */
    isLoading: PropTypes.bool,

    /**
     * Gets or Sets the curve of the line chart
     */
    lineCurve: PropTypes.string,

    /**
     * Gets or Sets the gradient colors of the line chart when there is only one line
     */
    lineGradient: PropTypes.arrayOf(PropTypes.string),

    /**
     * Pass language tag for the tooltip to localize the date. Feature
     * uses Intl.DateTimeFormat, for compatability and support, refer
     * to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     */
    locale: PropTypes.string,

    /**
     * Gets or Sets the margin of the chart
     */
    margin: PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
    }),

    /**
     * Gets or Sets the number format of the line chart
     */
    numberFormat: PropTypes.string,

    /**
     * Gets or Sets the minimum width of the graph in order
     * to show the tooltip NOTE: This could also depend on the aspect ratio
     */
    tooltipThreshold: PropTypes.number,

    /**
     * Gets or Sets the topicLabel of the chart
     */
    topicLabel: PropTypes.number,

    /**
     * Gets or Sets the valueLabel of the chart
     */
    valueLabel: PropTypes.number,

    /**
     * Gets or Sets the width of the chart
     */
    width: PropTypes.number,

    /**
     * Exposes the ability to force the chart to show a certain x format
     * It requires a `xAxisFormat` of 'custom' in order to work.
     * NOTE: localization not supported
     */
    xAxisCustomFormat: PropTypes.string,

    /**
     * Exposes the ability to force the chart to show a certain x axis grouping
     */
    xAxisFormat: PropTypes.string,

    /**
     * Gets or Sets the label of the X axis of the chart
     */
    xAxisLabel: PropTypes.string,

    /**
     * Gets or Sets the `xAxisScale`. Choose between 'linear' and 'logarithmic'.
     * The setting will only work if `xAxisValueType` is set to 'number' as well, otherwise it won't influence the visualization.
     */
    xAxisScale: PropTypes.string,

    /**
     * Gets or Sets the `xAxisValueType`. Choose between 'date' and 'number'.
     * When set to `number` the values of the x-axis must not be dates anymore, but can be arbitrary numbers.
     */
    xAxisValueType: PropTypes.string,

    /**
     * Exposes the ability to force the chart to show a certain x ticks. It
     * requires a `xAxisFormat` of 'custom' in order to work. NOTE: This
     * value needs to be a multiple of 2, 5 or 10. They won't always work
     * as expected, as D3 decides at the end how many and where the ticks will appear.
     */
    xTicks: PropTypes.number,

    /**
     * Gets or Sets the label of the Y axis of the chart
     */
    yAxisLabel: PropTypes.string,

    /**
     * Gets or Sets the yAxisLabelPadding of the chart. The default value is -36
     */
    yAxisLabelPadding: PropTypes.number,

    /**
     * Gets or Sets the number of ticks of the y axis on the chart (Default is 5)
     */
    yTicks: PropTypes.number,

    customMouseOver: PropTypes.func,
    customMouseMove: PropTypes.func,
    customMouseOut: PropTypes.func,

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
    createTooltip: PropTypes.func,
};

export default Line;

/**
 * Exposes the constants to be used to force the x axis to respect a
 * certain granularity current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
 */
export const axisTimeCombinations = combinations;
