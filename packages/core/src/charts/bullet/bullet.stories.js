import { select } from 'd3-selection';

import bullet from './bullet';

import { getCleanContainer } from '../../../.storybook/helpers';
import { BulletDataBuilder } from './bulletChartDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new BulletDataBuilder();

export const WithAllElements = () => {
    const container = getCleanContainer();
    const bulletContainer = select(container);
    const containerWidth = bulletContainer.node()
        ? bulletContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withAllElements().build();
    let bulletChart;

    if (containerWidth) {
        dataset.forEach((data) => {
            bulletChart = new bullet();
            bulletChart.width(containerWidth);

            bulletContainer.datum(data).call(bulletChart);
        });
    }

    return container;
};

export const WithNoMarker = () => {
    const container = getCleanContainer();
    const bulletContainer = select(container);
    const containerWidth = bulletContainer.node()
        ? bulletContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withNoMarker().build();
    let bulletChart;

    if (containerWidth) {
        dataset.forEach((data) => {
            bulletChart = new bullet();
            bulletChart.width(containerWidth);

            bulletContainer.datum(data).call(bulletChart);
        });
    }

    return container;
};

export const AlignedAsDashboard = () => {
    const container = getCleanContainer();
    const bulletContainer = select(container);
    const containerWidth = bulletContainer.node()
        ? bulletContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withManyCPUData().build();
    let bulletChart;

    if (containerWidth) {
        dataset.forEach((data) => {
            bulletChart = new bullet();
            bulletChart.width(containerWidth);

            bulletContainer.datum(data).call(bulletChart);
        });
    }

    return container;
};

export default { title: 'Charts/Bullet' };
