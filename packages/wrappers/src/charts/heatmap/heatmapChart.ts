import { select } from 'd3-selection';

import { heatmap } from '@britecharts/core';
import type {
    HeatmapChartDataShape,
    HeatmapChartModule,
} from '@britecharts/core';

import {
    validateConfiguration,
    validateContainer,
} from '../../helpers/validation.js';
import { applyConfiguration } from '../../helpers/configuration.js';
import { removeChartSvg } from '../../helpers/destroy.js';
import type { Wrapper } from '../../helpers/wrapper.js';

const heatmapChart: Wrapper<HeatmapChartDataShape[], HeatmapChartModule> = {
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, HeatmapChartDataShape[]>(el);
        const chart = heatmap();

        validateContainer(container);
        validateConfiguration(chart, configuration, 'heatmap');

        // Calls the chart with the container and dataset
        container.datum(data).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, HeatmapChartDataShape[]>(el);

        validateContainer(container);
        validateConfiguration(chart, configuration, 'heatmap');
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

export default heatmapChart;
