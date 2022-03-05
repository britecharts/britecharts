import bulletChart from 'britecharts/dist/umd/bullet.min';
import { select } from 'd3-selection';
import {
    validateConfiguration,
    validateContainer,
} from '../helpers/validation';
import { applyConfiguration } from '../helpers/configuration';

const bullet = {};

bullet.create = (el, data, configuration = {}) => {
    const container = select(el);
    const chart = bulletChart();

    validateContainer(container);
    validateConfiguration(chart, configuration);

    // Calls the chart with the container and dataset
    container.datum(data[0]).call(applyConfiguration(chart, configuration));

    return chart;
};

bullet.update = (el, data, configuration = {}, chart) => {
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

bullet.destroy = () => {};

export default bullet;
