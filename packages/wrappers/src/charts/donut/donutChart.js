import { select } from 'd3-selection';
import { donut } from '@britecharts/core';
import {
    validateConfiguration,
    validateContainer,
} from '../../helpers/validation';
import { applyConfiguration } from '../../helpers/configuration';

const donutChart = {};

donutChart.create = (el, data, configuration = {}) => {
    const container = select(el);
    const chart = donut();

    validateContainer(container);
    validateConfiguration(chart, configuration);

    // Calls the chart with the container and dataset
    container.datum(data).call(applyConfiguration(chart, configuration));

    return chart;
};

donutChart.update = (el, data, configuration = {}, chart) => {
    const container = select(el);

    validateContainer(container);
    validateConfiguration(chart, configuration);
    applyConfiguration(chart, configuration);

    // Calls the chart with the container and dataset
    if (data) {
        container.datum(data).call(chart);
    } else {
        container.call(chart);
    }

    return chart;
};

donutChart.destroy = () => {};

export default donutChart;
