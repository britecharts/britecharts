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

// What each bullet of withIncreasingDetail adds to the one before it
const DETAIL_STEPS = [
    'Start with a measure on two ranges: the value and its bands',
    'Add a third range for one more band',
    'Add a second measure, such as a forecast',
    'Add a marker for the target',
    'Add a second marker for a stretch target',
];

// What the Playground's data means, under the chart: Storybook shows a
// story's own description on its Docs page, not next to the canvas
const addDataGuide = (container) => {
    const guide = document.createElement('div');

    guide.className = 'story-caption';
    guide.innerHTML = `
        <p>
            One chart draws one metric, from a single object you can edit in
            the <code>data</code> Control. Give the values in any order.
        </p>
        <ul>
            <li><code>ranges</code>: the background bands, such as poor, fair and good.</li>
            <li><code>measures</code>: the bars, for the actual value and optionally a forecast.</li>
            <li><code>markers</code>: the target lines. Optional.</li>
        </ul>
        <p>
            The chart draws no label and has no tooltip, so name the metric in
            your own markup next to it.
        </p>
    `;
    container.appendChild(guide);
};

export const Playground = ({ data, ...args }) => {
    const container = getCleanContainer();
    const bulletContainer = select(container);
    const containerWidth = bulletContainer.node()
        ? bulletContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const bulletChart = bullet();

        applyArgs(bulletChart, args).width(containerWidth);

        bulletChart.render(bulletContainer, data);

        addExportButtons(container, bulletChart, 'bullet');
        addDataGuide(container);
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
Playground.argTypes = {
    ...playgroundArgTypes(Playground.args),
    data: {
        control: 'object',
        description:
            'One object: `ranges` are the background bands, `measures` the bars and `markers`, which is optional, the target lines.',
    },
};
Playground.args.data = aTestDataSet().withAllElements().build()[0];

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

            bulletChart.render(bulletContainer, data);
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
    const dataset = aTestDataSet().withIncreasingDetail().build();

    if (containerWidth) {
        dataset.forEach((data, index) => {
            const row = bulletContainer.append('div');

            row.append('p')
                .attr('class', 'story-caption')
                .text(DETAIL_STEPS[index]);

            bullet().width(containerWidth).height(100).render(row, data);
        });

        bulletContainer
            .append('p')
            .attr('class', 'story-caption')
            .text(
                'Each bullet is its own chart. They line up because they share a width and a largest value, which sets the axis.'
            );
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
