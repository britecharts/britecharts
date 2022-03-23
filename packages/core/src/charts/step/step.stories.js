import { select } from 'd3-selection';

import step from './step';
import miniTooltip from '../mini-tooltip/mini-tooltip';

import { getCleanContainer } from '../../../.storybook/helpers';
import { StepDataBuilder } from './stepChartDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new StepDataBuilder();

export const Step = () => {
    const container = getCleanContainer();
    const stepChart = step();
    const stepContainer = select(container);
    const containerWidth = stepContainer.node()
        ? stepContainer.node().getBoundingClientRect().width
        : false;
    const tooltip = miniTooltip();
    const dataset = aTestDataSet().withSmallData().build();
    let tooltipContainer;

    if (containerWidth) {
        stepChart
            .width(containerWidth)
            .height(300)
            .xAxisLabel('Meal Type')
            .xAxisLabelOffset(60)
            .yAxisLabel('Quantity')
            .yAxisLabelOffset(-50)
            .margin({
                top: 40,
                right: 40,
                bottom: 80,
                left: 80,
            })
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        stepContainer.datum(dataset).call(stepChart);

        tooltip.nameLabel('key');
        tooltipContainer = select('.step-chart .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
    }

    return container;
};

export default { title: 'Charts/Step' };
