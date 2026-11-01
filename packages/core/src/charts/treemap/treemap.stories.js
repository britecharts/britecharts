import { select } from 'd3-selection';

import treemap from './treemap';
import tooltip from '../tooltip/tooltip';

import {
    addExportButtons,
    getCleanContainer,
} from '../../../.storybook/helpers';
import {
    applyArgs,
    playgroundArgs,
    playgroundArgTypes,
} from '../../../.storybook/playground';
import { TreemapDataBuilder } from './treemapDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new TreemapDataBuilder();

/**
 * A month's budget, with a tooltip. Hover a cell, or tab to the chart and use
 * the arrow keys.
 */
export const Playground = (args) => {
    const container = getCleanContainer();
    const treemapChart = treemap();
    const treemapContainer = select(container);
    const containerWidth = treemapContainer.node()
        ? treemapContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const dataset = aTestDataSet().withBudget().build();

        applyArgs(treemapChart, args)
            .width(containerWidth)
            .tooltip(tooltip().title('Monthly spend').numberFormat('$,'));

        treemapChart.render(treemapContainer, dataset);

        addExportButtons(container, treemapChart, 'treemap');
    }

    return container;
};

Playground.args = playgroundArgs(treemap, [
    'height',
    'margin',
    'colorSchema',
    'hasLabels',
    'labelsNumberFormat',
    'isAnimated',
    'isLoading',
]);
Playground.argTypes = playgroundArgTypes(Playground.args);

export const WithoutLabels = () => {
    const container = getCleanContainer();
    const treemapContainer = select(container);
    const containerWidth = treemapContainer.node()
        ? treemapContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        treemap()
            .width(containerWidth)
            .hasLabels(false)
            .render(treemapContainer, aTestDataSet().withBudget().build());
    }

    return container;
};

/**
 * Labels show only where they fit, so a small chart keeps its biggest ones.
 */
export const WithSmallSize = () => {
    const container = getCleanContainer();
    const treemapContainer = select(container);

    treemap()
        .width(320)
        .height(220)
        .render(treemapContainer, aTestDataSet().withBudget().build());

    return container;
};

export const WithAnotherColorSchema = () => {
    const container = getCleanContainer();
    const treemapContainer = select(container);
    const containerWidth = treemapContainer.node()
        ? treemapContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        treemap()
            .width(containerWidth)
            .colorSchema(colors.colorSchemas.teal)
            .labelsNumberFormat('$,')
            .render(treemapContainer, aTestDataSet().withBudget().build());
    }

    return container;
};

/**
 * The cells fade in, then move to their new places when the data changes.
 */
export const WithAnimation = () => {
    const container = getCleanContainer();
    const treemapContainer = select(container);
    const containerWidth = treemapContainer.node()
        ? treemapContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        const treemapChart = treemap().width(containerWidth).isAnimated(true);
        const button = document.createElement('button');
        const budgets = [
            aTestDataSet().withUpdatedBudget().build(),
            aTestDataSet().withBudget().build(),
        ];
        let next = 0;

        treemapChart.render(treemapContainer, budgets[1]);

        button.type = 'button';
        button.textContent = 'Change the data';
        button.addEventListener('click', () => {
            treemapChart.render(treemapContainer, budgets[next]);
            next = 1 - next;
        });
        container.appendChild(button);
    }

    return container;
};

export const WithLoadingState = () => {
    const container = getCleanContainer();
    const treemapContainer = select(container);
    const containerWidth = treemapContainer.node()
        ? treemapContainer.node().getBoundingClientRect().width
        : false;

    if (containerWidth) {
        treemap()
            .width(containerWidth)
            .isLoading(true)
            .render(treemapContainer, []);
    }

    return container;
};

export default { title: 'Charts/Treemap' };
