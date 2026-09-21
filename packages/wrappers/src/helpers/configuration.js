import { britechartsCustomEvents } from '../constants';

const isEventConfig = (configName) =>
    britechartsCustomEvents.indexOf(configName) !== -1;
const isNotEventConfig = (configName) => !isEventConfig(configName);

// undefined and null mean "not set": the chart keeps its own default, as it does
// for a React prop that was left out or passed as null. Anything else is a
// setting, falsy or not: false, 0 and '' have to arrive, or a chart could never
// have a flag turned back off (isLoading={false} could not end a loading state).
const isSet = (value) => value !== undefined && value !== null;

const setChartProperty = (chart, configuration, key) => {
    if (isSet(configuration[key])) {
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
