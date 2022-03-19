import { select } from 'd3-selection';

import heatmap from './heatmap';
import miniTooltip from '../mini-tooltip/mini-tooltip';

import { getCleanContainer } from '../../../.storybook/helpers';
import { HeatmapDataBuilder } from './heatmapChartDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new HeatmapDataBuilder();

export const WithWeeklyElements = () => {
    const container = getCleanContainer();
    const heatmapContainer = select(container);
    const heatmapChart = heatmap();
    const tooltip = miniTooltip().title('Tooltip Title');
    const containerWidth = heatmapContainer.node()
        ? heatmapContainer.node().getBoundingClientRect().width
        : false;
    const dataset = aTestDataSet().withWeeklyData().build();

    if (containerWidth) {
        heatmapChart
            .boxSize(30)
            .isAnimated(true)
            .on('customMouseOver', tooltip.show)
            .on('customMouseMove', tooltip.update)
            .on('customMouseOut', tooltip.hide);

        heatmapContainer.datum(dataset).call(heatmapChart);

        const tooltipContainer = select('.heatmap .metadata-group');
        tooltipContainer.datum([]).call(tooltip);
    }

    return container;
};

export default { title: 'Charts/Heatmap' };
