import { select } from 'd3-selection';

import { stackedArea } from '@britecharts/core';
import type {
    StackedAreaChartDataShape,
    StackedAreaChartModule,
} from '@britecharts/core';

import {
    validateConfiguration,
    validateContainer,
} from '../../helpers/validation';
import { applyConfiguration } from '../../helpers/configuration';
import { removeChartSvg } from '../../helpers/destroy';
import type { Wrapper } from '../../helpers/wrapper';

const stackedAreaChart: Wrapper<
    StackedAreaChartDataShape[],
    StackedAreaChartModule
> = {
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, StackedAreaChartDataShape[]>(el);
        const chart = stackedArea();

        validateContainer(container);
        validateConfiguration(chart, configuration);

        // Calls the chart with the container and dataset
        container.datum(data).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, StackedAreaChartDataShape[]>(el);
        const shouldUpdateData = data && data.length;

        validateContainer(container);
        validateConfiguration(chart, configuration);
        applyConfiguration(chart, configuration);

        // Calls the chart with the container and dataset.
        //
        // `data && data.length`, kept in its own variable the way the
        // JavaScript had it: an update with no data -- empty, null or
        // undefined -- keeps whatever is already bound, as every wrapper does.
        if (shouldUpdateData) {
            container.datum(data).call(chart);
        } else {
            container.call(chart);
        }

        return chart;
    },

    destroy: removeChartSvg,
};

export default stackedAreaChart;
