import { select } from 'd3-selection';

import { tooltip } from '@britecharts/core';
import {
    validateConfiguration,
    validateContainer,
} from '../../helpers/validation';
import { applyConfiguration } from '../../helpers/configuration';
import { removeTooltip } from '../../helpers/destroy';

const tooltipChart = {};

tooltipChart.create = (el, configuration = {}) => {
    const container = select(el);
    const chart = tooltip();

    chart.topicLabel('values');

    validateContainer(container);
    validateConfiguration(chart, configuration);

    const chartConfigured = applyConfiguration(chart, configuration);

    // Calls the chart with the container and dataset
    container.datum([]).call(chartConfigured);

    return chartConfigured;
};

tooltipChart.update = (el, configuration = {}, state = {}, chart) => {
    const container = select(el);

    validateContainer(container);
    validateConfiguration(chart, configuration);

    const chartConfigured = applyConfiguration(chart, configuration);

    container.call(chartConfigured);

    if (state.isActive) {
        chartConfigured.show();
    } else {
        chartConfigured.hide();
    }

    if (state.dataPoint && typeof state.x === 'number') {
        chartConfigured.update(
            state.dataPoint,
            [state.x, state.y],
            undefined,
            state.topicColorMap || undefined
        );
    }

    return chartConfigured;
};

tooltipChart.destroy = removeTooltip;

export default tooltipChart;
