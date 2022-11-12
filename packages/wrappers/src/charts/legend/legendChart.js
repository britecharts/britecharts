import { select } from 'd3-selection';
import { legend } from '@britecharts/core';
import {
    validateConfiguration,
    validateContainer,
} from '../../helpers/validation';
import { applyConfiguration } from '../../helpers/configuration';

const legendChart = {};

legendChart.create = (el, data, configuration = {}) => {
    const container = select(el);
    const chart = legend();

    validateContainer(container);
    validateConfiguration(chart, configuration);

    // Calls the chart with the container and dataset
    container.datum(data).call(applyConfiguration(chart, configuration));

    return chart;
};

legendChart.update = (el, data, configuration = {}, chart) => {
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

legendChart.destroy = () => {};

export default legendChart;
