import { select } from 'd3-selection';

import { stackedBar } from '@britecharts/core';
import type {
    StackedBarChartDataShape,
    StackedBarChartModule,
} from '@britecharts/core';

import {
    validateConfiguration,
    validateContainer,
} from '../../helpers/validation';
import { applyConfiguration } from '../../helpers/configuration';
import { removeChartSvg } from '../../helpers/destroy';
import type { Wrapper } from '../../helpers/wrapper';

const stackedBarChart: Wrapper<
    StackedBarChartDataShape[],
    StackedBarChartModule
> = {
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, StackedBarChartDataShape[]>(el);
        const chart = stackedBar();

        validateContainer(container);
        validateConfiguration(chart, configuration);

        // Calls the chart with the container and dataset
        container.datum(data).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, StackedBarChartDataShape[]>(el);

        validateContainer(container);
        validateConfiguration(chart, configuration);
        applyConfiguration(chart, configuration);

        // Calls the chart with the container and dataset.
        //
        // `data && data.length`, so an empty array keeps whatever is already
        // bound. Preserved as-is; see the empty-data guard note on the Wrapper
        // interface -- bar, donut and scatterPlot guard on truthiness instead
        // and rebind here.
        if (data && data.length) {
            container.datum(data).call(chart);
        } else {
            container.call(chart);
        }

        return chart;
    },

    destroy: removeChartSvg,
};

export default stackedBarChart;
