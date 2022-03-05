import { britechartsCustomEvents } from '../constants';

const isEventConfig = (configName) =>
    britechartsCustomEvents.indexOf(configName) !== -1;
const isNotEventConfig = (configName) => !isEventConfig(configName);

const setChartProperty = (chart, configuration, key) => {
    if (configuration[key] || typeof configuration[key] === 'string') {
        chart[key](configuration[key]);
    }
};

const setChartEventHandler = (chart, configuration, key) => {
    if (configuration[key]) {
        chart.on(key, configuration[key]);
    }
};

export const applyConfiguration = (chart, configuration) => {
    const configurationProperties = Object.keys(configuration);

    // Regular properties
    configurationProperties
        .filter(isNotEventConfig)
        .forEach(setChartProperty.bind(null, chart, configuration));

    // Event related properties
    configurationProperties
        .filter(isEventConfig)
        .forEach(setChartEventHandler.bind(null, chart, configuration));

    return chart;
};

export default applyConfiguration;
