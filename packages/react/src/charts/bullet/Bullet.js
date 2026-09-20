import React from 'react';
import PropTypes from 'prop-types';

import { BulletWrapper } from '@britecharts/wrappers';
import useChart from '../helpers/useChart';

const Bullet = ({
    chart = BulletWrapper,
    createTooltip,
    data,
    ...configuration
}) => {
    const rootNode = useChart(chart, data, configuration, { createTooltip });

    return <div className="bullet-container" ref={rootNode} />;
};

Bullet.propTypes = {
    /**
     * Internally used, do not overwrite.
     */
    data: PropTypes.arrayOf(PropTypes.any),

    /**
     * Gets or Sets the colorSchema of the chart. The first color from the array will be applied to range bars (the wider bars). The second color from the array will be applied to measure bars (the narrow bars) and the third to the marker lines.
     */
    colorSchema: PropTypes.arrayOf(PropTypes.string),

    /**
     * Gets or Sets the subtitle for measure identifier range.
     */
    customSubtitle: PropTypes.string,

    /**
     * Gets or Sets the title for measure identifier range.
     */
    customTitle: PropTypes.string,

    /**
     * Gets or Sets the height of the chart
     */
    height: PropTypes.number,

    /**
     * Gets or Sets the isReverse status of the chart. If true, the elements will be rendered in reverse order.
     */
    isReverse: PropTypes.bool,

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
     * Gets or Sets the number format of the bar chart
     */
    numberFormat: PropTypes.string,

    /**
     * Space between axis and chart
     */
    paddingBetweenAxisAndChart: PropTypes.number,

    /**
     * Gets or Sets the starting point of the capacity range.
     * Default is 0.5
     */
    startMaxRangeOpacity: PropTypes.number,

    /**
     * Gets or Sets the number of ticks of the x axis on the chart
     * Default is 5
     */
    ticks: PropTypes.number,

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

export default Bullet;
