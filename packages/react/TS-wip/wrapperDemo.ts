import { select } from 'd3-selection';

// import { bullet as bulletChart } from 'britecharts';
// import bulletChart from 'britecharts/dist/umd/bullet.min';
// import bulletChart from 'britecharts/src/charts/bullet';
import bulletChart, { BulletChartData, BulletChartType } from './bulletD3Chart';

export const britechartsCustomEvents = [
    'customMouseOver',
    'customMouseMove',
    'customMouseOut',
    'customClick',
];

const isEventConfig = (configName: string) =>
    britechartsCustomEvents.includes(configName);
const isNotEventConfig = (configName: string) => !isEventConfig(configName);

const setChartProperty = (
    chart: BulletChartType,
    configuration: Record<keyof BulletChartType, string>,
    key: keyof BulletChartType
) => {
    if (configuration[key] || typeof configuration[key] === 'string') {
        chart[key](configuration[key]);
    }
};

export const applyConfiguration = (
    chart: BulletChartType,
    configuration: Record<keyof BulletChartType, string>
) => {
    const configurationProperties = Object.keys(configuration);

    // Regular properties
    configurationProperties.filter(isNotEventConfig).forEach((key) => {
        setChartProperty(chart, configuration, key as keyof BulletChartType);
    });

    return chart;
};

const isNotCustomEvent = (configName: string) =>
    !britechartsCustomEvents.includes(configName);

export const validateConfiguration = (
    chart: BulletChartType,
    configuration: Record<keyof BulletChartType, string>
) => {
    const configurationProperties = Object.keys(configuration);
    const configurationPropertiesWithoutEvents = configurationProperties.filter(
        isNotCustomEvent
    );
    const supportedMethods = Object.keys(chart.prototype.constructor);

    const notSupportedMethods = configurationPropertiesWithoutEvents.filter(
        (methodName) => !supportedMethods.includes(methodName)
    );

    if (notSupportedMethods.length) {
        throw new Error(
            `Method not supported: ${notSupportedMethods.join(' ')}`
        );
    }

    return true;
};

type ContainerAnchor = HTMLElement & { __data__?: string };

const bullet = {
    create: (
        el: ContainerAnchor,
        data: BulletChartData[],
        configuration = {}
    ) => {
        const container = select(el);
        const chart = bulletChart();

        if (
            validateConfiguration(
                chart,
                configuration as Record<keyof BulletChartType, string>
            )
        ) {
            const configuredChart = applyConfiguration(
                chart,
                configuration as Record<keyof BulletChartType, string>
            );

            // Calls the chart with the container and dataset
            container.datum(data[0]).call(configuredChart);

            return chart;
        }
        return false;
    },

    update: (
        el: ContainerAnchor,
        data: BulletChartData[],
        configuration = {},
        chart: any
    ) => {
        const container = select(el);

        if (
            validateConfiguration(
                chart,
                configuration as Record<keyof BulletChartType, string>
            )
        ) {
            applyConfiguration(
                chart,
                configuration as Record<keyof BulletChartType, string>
            );

            // Calls the chart with the container and dataset
            if (data && data.length) {
                container.datum(data[0]).call(chart);
            } else {
                container.call(chart);
            }

            return chart;
        }
        return false;
    },

    destroy: (el: ContainerAnchor) => {
        select(el).remove();
    },
};

export default bullet;
