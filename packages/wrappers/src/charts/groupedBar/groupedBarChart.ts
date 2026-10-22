import { select } from 'd3-selection';

import { groupedBar } from '@britecharts/core';
import type {
    GroupedBarChartDataShape,
    GroupedBarChartModule,
} from '@britecharts/core';

import {
    validateConfiguration,
    validateContainer,
} from '../../helpers/validation.js';
import { applyConfiguration } from '../../helpers/configuration.js';
import { removeChartSvg } from '../../helpers/destroy.js';
import schema from '../../schemas/groupedBar.js';
import type { Wrapper } from '../../helpers/wrapper.js';

const groupedBarChart: Wrapper<
    GroupedBarChartDataShape[],
    GroupedBarChartModule
> = {
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, GroupedBarChartDataShape[]>(el);
        const chart = groupedBar();

        validateContainer(container);
        validateConfiguration(chart, configuration, 'grouped-bar', schema);

        // Calls the chart with the container and dataset
        container.datum(data).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, GroupedBarChartDataShape[]>(el);

        validateContainer(container);
        validateConfiguration(chart, configuration, 'grouped-bar', schema);
        applyConfiguration(chart, configuration);

        // Calls the chart with the container and dataset.
        //
        // `data && data.length`, so an update with no data -- empty, null or
        // undefined -- keeps whatever is already bound, as every wrapper does.
        if (data && data.length) {
            container.datum(data).call(chart);
        } else {
            container.call(chart);
        }

        return chart;
    },

    destroy: removeChartSvg,
};

export default groupedBarChart;
