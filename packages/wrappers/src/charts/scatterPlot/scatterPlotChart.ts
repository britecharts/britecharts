import { select } from 'd3-selection';

import { scatterPlot } from '@britecharts/core';
import type {
    ScatterPlotDataShape,
    ScatterPlotModule,
} from '@britecharts/core';

import {
    validateConfiguration,
    validateContainer,
} from '../../helpers/validation';
import { applyConfiguration } from '../../helpers/configuration';
import { removeChartSvg } from '../../helpers/destroy';
import type { Wrapper } from '../../helpers/wrapper';

const scatterPlotChart: Wrapper<ScatterPlotDataShape[], ScatterPlotModule> = {
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, ScatterPlotDataShape[]>(el);
        const chart = scatterPlot();

        validateContainer(container);
        validateConfiguration(chart, configuration);

        // Calls the chart with the container and dataset
        container.datum(data).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, ScatterPlotDataShape[]>(el);

        validateContainer(container);
        validateConfiguration(chart, configuration);
        applyConfiguration(chart, configuration);

        // Calls the chart with the container and dataset.
        //
        // `if (data)`, so an empty array is truthy and rebinds here, dropping
        // what was drawn. Preserved as-is; see the empty-data guard note on
        // the Wrapper interface -- bar and donut do the same, the other six
        // guard on length instead.
        if (data) {
            container.datum(data).call(chart);
        } else {
            container.call(chart);
        }

        return chart;
    },

    destroy: removeChartSvg,
};

export default scatterPlotChart;
