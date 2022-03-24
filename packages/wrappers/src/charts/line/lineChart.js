import { select } from 'd3-selection';
import { line } from '@britecharts/core';

import {
    validateConfiguration,
    validateContainer,
} from '../helpers/validation';
import { applyConfiguration } from '../helpers/configuration';

const lineChart = {};

lineChart.create = (el, data, configuration = {}) => {
    const container = select(el);
    const chart = line();

    validateContainer(container);
    validateConfiguration(chart, configuration);

    // Calls the chart with the container and dataset
    container.datum(data).call(applyConfiguration(chart, configuration));

    return chart;
};

lineChart.update = (el, data, configuration = {}, chart) => {
    const container = select(el);
    // TODO: Review this with Version 4
    const shouldUpdateData =
        data &&
        ((data.data && data.data.length) ||
            (data.dataByTopic && data.dataByTopic.length));

    validateContainer(container);
    validateConfiguration(chart, configuration);
    applyConfiguration(chart, configuration);

    // Calls the chart with the container and dataset
    if (shouldUpdateData) {
        container.datum(data).call(chart);
    } else {
        container.call(chart);
    }

    return chart;
};

lineChart.destroy = () => {};

export default lineChart;
