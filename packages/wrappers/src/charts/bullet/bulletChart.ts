import { select } from 'd3-selection';
import { bullet } from '@britecharts/core';
import type {
    BulletChartDataShape,
    BulletChartModule,
} from '@britecharts/core';

import {
    validateConfiguration,
    validateContainer,
} from '../../helpers/validation.js';
import { applyConfiguration } from '../../helpers/configuration.js';
import { removeChartSvg } from '../../helpers/destroy.js';
import schema from '../../schemas/bullet.js';
import type { Wrapper } from '../../helpers/wrapper.js';

const bulletChart: Wrapper<BulletChartDataShape[], BulletChartModule> = {
    create(el, data, configuration = {}) {
        const container = select<HTMLElement, BulletChartDataShape>(el);
        const chart = bullet();

        validateContainer(container);
        validateConfiguration(chart, configuration, 'bullet', schema);

        // Calls the chart with the container and dataset
        container.datum(data[0]).call(applyConfiguration(chart, configuration));

        return chart;
    },

    update(el, data, configuration = {}, chart) {
        const container = select<HTMLElement, BulletChartDataShape>(el);

        validateContainer(container);
        validateConfiguration(chart, configuration, 'bullet', schema);
        applyConfiguration(chart, configuration);

        // Calls the chart with the container and dataset
        if (data && data.length) {
            container.datum(data[0]).call(chart);
        } else {
            container.call(chart);
        }

        return chart;
    },

    destroy: removeChartSvg,
};

export default bulletChart;
