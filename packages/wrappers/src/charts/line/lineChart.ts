import { select } from 'd3-selection';

import { line } from '@britecharts/core';
import type { LineChartData, LineChartModule } from '@britecharts/core';

import {
    validateConfiguration,
    validateContainer,
} from '../../helpers/validation.js';
import { applyConfiguration } from '../../helpers/configuration.js';
import { removeChartSvg } from '../../helpers/destroy.js';
import schema from '../../schemas/line.js';
import type { Wrapper } from '../../helpers/wrapper.js';

// `LineChartData`, not `LineChartDataShape[]`: line is the one data-taking
// wrapper whose argument is an object rather than an array. Core declares it
// as `ChartModuleSelection<LineChartData>` -- `{ data: LineChartDataShape[] }`
// -- and the wrapper binds that object whole. This is why the shared Wrapper
// interface takes the data argument's own type instead of its element type.
const lineChart: Wrapper<LineChartData, LineChartModule> = {
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, LineChartData>(el);
        const chart = line();

        validateContainer(container);
        validateConfiguration(chart, configuration, 'line', schema);

        // Calls the chart with the container and dataset
        container.datum(data).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, LineChartData>(el);
        // TODO: Review this with Version 4
        //
        // The guard reaches a level deeper than the other wrappers' --
        // `data.data.length` rather than `data.length` -- because the data is
        // that object. An update with no rows keeps what is bound, as every
        // wrapper does.
        const shouldUpdateData = data && data.data && data.data.length;

        validateContainer(container);
        validateConfiguration(chart, configuration, 'line', schema);
        applyConfiguration(chart, configuration);

        // Calls the chart with the container and dataset
        if (shouldUpdateData) {
            container.datum(data).call(chart);
        } else {
            container.call(chart);
        }

        return chart;
    },

    destroy: removeChartSvg,
};

export default lineChart;
