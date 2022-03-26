import { select } from 'd3-selection';
import { bullet } from '@britecharts/core';
import {
    validateConfiguration,
    validateContainer,
} from '../helpers/validation';
import { applyConfiguration } from '../helpers/configuration';

const bulletChart = {};

bulletChart.create = (el, data, configuration = {}) => {
    const container = select(el);
    const chart = bullet();

    validateContainer(container);
    validateConfiguration(chart, configuration);

    // Calls the chart with the container and dataset
    container.datum(data[0]).call(applyConfiguration(chart, configuration));

    return chart;
};

bulletChart.update = (el, data, configuration = {}, chart) => {
    const container = select(el);

    validateContainer(container);
    validateConfiguration(chart, configuration);
    applyConfiguration(chart, configuration);

    // Calls the chart with the container and dataset
    if (data && data.length) {
        container.datum(data[0]).call(chart);
    } else {
        container.call(chart);
    }

    return chart;
};

bulletChart.destroy = () => {};

export default bulletChart;
