import { britechartsCustomEvents } from '../constants';

const isNotCustomEvent = (configName) =>
    britechartsCustomEvents.indexOf(configName) === -1;

export const validateConfiguration = (chart, configuration) => {
    const configurationProperties = Object.keys(configuration);
    // eslint-disable-next-line prettier/prettier
    const configurationPropertiesWithoutEvents = configurationProperties.filter(
        isNotCustomEvent
    );
    const supportedMethods = Object.keys(chart.prototype.constructor);

    const notSupportedMethods = configurationPropertiesWithoutEvents.filter(
        (methodName) => !supportedMethods.includes(methodName)
    );

    if (notSupportedMethods.length) {
        throw new Error(
            `Method not supported by Britechart: ${notSupportedMethods.join(
                ' '
            )}`
        );
    }
};

export const validateContainer = (container) => {
    if (container.empty()) {
        throw Error('A root container is required');
    }
};
