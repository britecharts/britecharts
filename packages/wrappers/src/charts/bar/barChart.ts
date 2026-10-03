import { select } from 'd3-selection';

import { bar } from '@britecharts/core';
import type { BarChartDataShape, BarChartModule } from '@britecharts/core';

import {
    validateConfiguration,
    validateContainer,
} from '../../helpers/validation';
import { applyConfiguration } from '../../helpers/configuration';
import { removeChartSvg } from '../../helpers/destroy';
import type { Wrapper } from '../../helpers/wrapper';

const barChart: Wrapper<BarChartDataShape[], BarChartModule> = {
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, BarChartDataShape[]>(el);
        const chart = bar();

        validateContainer(container);
        validateConfiguration(chart, configuration);
        // Calls the chart with the container and dataset
        container.datum(data).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, BarChartDataShape[]>(el);

        validateContainer(container);
        validateConfiguration(chart, configuration);
        applyConfiguration(chart, configuration);

        // Calls the chart with the container and dataset.
        //
        // Note this is `if (data)`, not bullet's `if (data && data.length)`:
        // an empty array is truthy, so `update(el, [], ...)` rebinds an empty
        // datum here where bullet would keep what was already bound. That
        // difference is preserved rather than reconciled -- it is a behaviour
        // question, not a typing one, and no test currently pins it either
        // way.
        if (data) {
            container.datum(data).call(chart);
        } else {
            container.call(chart);
        }

        return chart;
    },

    destroy: removeChartSvg,
};

export default barChart;
