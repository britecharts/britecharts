import React from 'react';
import PropTypes from 'prop-types';

import { SparklineWrapper } from '@britecharts/wrappers';
import useChart from '../helpers/useChart';

const Sparkline = ({
    chart = SparklineWrapper,
    createTooltip,
    data,
    ...configuration
}) => {
    const rootNode = useChart(chart, data, configuration, { createTooltip });

    return <div className="sparkline-container" ref={rootNode} />;
};

Sparkline.propTypes = {
    /**
     * Internally used, do not overwrite.
     */
    data: PropTypes.arrayOf(PropTypes.any),

    /**
     * Gets or Sets the duration of the animation
     */
    animationDuration: PropTypes.number,

    /**
     * Gets or Sets the areaGradient of the chart
     */
    areaGradient: PropTypes.arrayOf(PropTypes.string),

    /**
     * Gets or Sets the dateLabel of the chart
     */
    dateLabel: PropTypes.string,

    /**
     * Chart exported to png and a download action is fired
     */
    exportChart: PropTypes.string,

    /**
     * Gets or Sets the height of the chart
     */
    height: PropTypes.number,

    /**
     * Gets or Sets the isAnimated property of the chart,
     * making it to animate when render.
     * By default this is 'false'
     */
    isAnimated: PropTypes.bool,

    /**
     * Current loading state flag or Chart module to chain calls
     */
    isLoading: PropTypes.bool,

    /**
     * Gets or Sets the lineGradient of the chart
     */
    lineGradient: PropTypes.arrayOf(PropTypes.string),

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
     * Gets or Sets the text of the title at the top of the chart.
     * To style the title text, use the titleTextStyle method below.
     */
    titleText: PropTypes.string,

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
    titleTextStyle: PropTypes.shape({
        'font-family': PropTypes.string,
        'font-size': PropTypes.string,
        'font-weight': PropTypes.number,
        'font-style': PropTypes.string,
        fill: PropTypes.string,
    }),

    /**
     * Gets or Sets the valueLabel of the chart
     */
    valueLabel: PropTypes.string,

    /**
     * Gets or Sets the width of the chart
     */
    width: PropTypes.number,

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

export default Sparkline;
