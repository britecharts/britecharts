import {{camelCase componentName}}Chart from 'britecharts/dist/umd/{{camelCase componentName}}.min';
import {select} from 'd3-selection';
import {validateConfiguration, validateContainer} from '../helpers/validation';
import {applyConfiguration} from '../helpers/configuration';

//TODO: Implement the correct loading state(line, bar, and donut are the available options atm)
import { line as {{camelCase componentName}}LoadingState } from 'britecharts/dist/umd/loading.min';

const {{camelCase componentName}} = {};

{{camelCase componentName}}.create = (el, data, configuration = {}) => {
    const container = select(el);
    const chart = {{camelCase componentName}}Chart();

    validateContainer(container);
    validateConfiguration(chart, configuration);

    // Calls the chart with the container and dataset
    container.datum(data).call(applyConfiguration(chart, configuration));

    return chart;
};

{{camelCase componentName}}.update = (el, data, configuration = {}, chart) => {
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

{{camelCase componentName}}.destroy = () => {};

export default {{camelCase componentName}};
