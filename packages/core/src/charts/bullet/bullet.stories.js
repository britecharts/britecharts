import { select } from 'd3-selection';

import bullet from './bullet';

import {
    addExportButtons,
    getCleanContainer,
} from '../../../.storybook/helpers';
import {
    applyArgs,
    playgroundArgs,
    playgroundArgTypes,
} from '../../../.storybook/playground';
import { BulletDataBuilder } from './bulletChartDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new BulletDataBuilder();

export const Playground = (args) => {
    const container = getCleanContainer();
    const bulletContainer = select(container);
    const containerWidth = bulletContainer.node()
        ? bulletContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withAllElements().build();

    if (containerWidth) {
        let bulletChart;

        dataset.forEach((data) => {
            bulletChart = bullet();

            applyArgs(bulletChart, args).width(containerWidth);

            bulletContainer.datum(data).call(bulletChart);
        });

        // Each bullet draws into the same container, so the last one is shown
        addExportButtons(container, bulletChart, 'bullet');
    }

    return container;
};

Playground.args = playgroundArgs(bullet, [
    'height',
    'margin',
    'colorSchema',
    'isReverse',
    'paddingBetweenAxisAndChart',
    'startMaxRangeOpacity',
    'ticks',
    'numberFormat',
    'isLoading',
]);
Playground.argTypes = playgroundArgTypes(Playground.args);

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

export const WithDashboardAlignment = () => {
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

export const WithLoadingState = () => {
    const container = getCleanContainer();
    const bulletContainer = select(container);
    const bulletChart = bullet();
    const containerWidth = bulletContainer.node()
        ? bulletContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        bulletChart.width(containerWidth).isLoading(true);

        bulletContainer.datum([]).call(bulletChart);
    }

    return container;
};

export default { title: 'Charts/Bullet' };
