import { step } from '@britecharts/core';
import { select } from 'd3-selection';
import {
    validateConfiguration,
    validateContainer,
} from '../helpers/validation';
import { applyConfiguration } from '../helpers/configuration';

// TODO: Implement the correct loading state(line, bar, and donut are the available options atm)

const stepChart = {};

stepChart.create = (el, data, configuration = {}) => {
    const container = select(el);
    const chart = step();

    validateContainer(container);
    validateConfiguration(chart, configuration);

    // Calls the chart with the container and dataset
    container.datum(data).call(applyConfiguration(chart, configuration));

    return chart;
};

stepChart.update = (el, data, configuration = {}, chart) => {
    const container = select(el);

    validateContainer(container);
    validateConfiguration(chart, configuration);
    applyConfiguration(chart, configuration);

    // Calls the chart with the container and dataset
    if (data && data.length) {
        container.datum(data).call(chart);
    } else {
        container.call(chart);
    }

    return chart;
};

stepChart.destroy = () => {};

export default stepChart;
