import { select } from 'd3-selection';

import { tooltip } from '@britecharts/core';
import type { TooltipDataShape, TooltipPosition } from '@britecharts/core';

import {
    validateConfiguration,
    validateContainer,
} from '../../helpers/validation';
import { applyConfiguration } from '../../helpers/configuration';
import { removeTooltip } from '../../helpers/destroy';
import type { TooltipWrapper } from '../../helpers/wrapper';

// TooltipWrapper, not Wrapper: create takes no data and update takes a state
// object in third position. See the note on TooltipWrapper for why it is not
// worth widening the shared interface to cover both.
const tooltipChart: TooltipWrapper = {
    create(el, configuration = {}) {
        const container = select<HTMLElement, TooltipDataShape[]>(el);
        const chart = tooltip();

        chart.topicLabel('values');

        validateContainer(container);
        validateConfiguration(chart, configuration);

        const chartConfigured = applyConfiguration(chart, configuration);

        // Calls the chart with the container and dataset.
        //
        // The type argument is load-bearing: a bare `[]` infers as `never[]`,
        // which is not the `TooltipDataShape[]` the chart is declared over, so
        // `.call` would not type. tooltipChart binds this empty datum itself
        // because it takes no data argument -- the rows arrive later, through
        // `update`.
        container.datum<TooltipDataShape[]>([]).call(chartConfigured);

        return chartConfigured;
    },

    update(el, configuration = {}, state = {}, chart) {
        const container = select<HTMLElement, TooltipDataShape[]>(el);

        validateContainer(container);
        validateConfiguration(chart, configuration);

        const chartConfigured = applyConfiguration(chart, configuration);

        container.call(chartConfigured);

        if (state.isActive) {
            chartConfigured.show();
        } else {
            chartConfigured.hide();
        }

        if (state.dataPoint && typeof state.x === 'number') {
            chartConfigured.update(
                state.dataPoint,
                // Narrowing `x` alone leaves `y` as `number | undefined`, but
                // the two always arrive together -- the consumer destructures
                // the chart's `[x, y]` anchor, so neither is a number without
                // the other. The guard is left checking `x` only, as it was,
                // and the pair is asserted here rather than the condition
                // being changed during a conversion.
                [state.x, state.y] as TooltipPosition,
                undefined,
                state.topicColorMap || undefined
            );
        }

        return chartConfigured;
    },

    destroy: removeTooltip,
};

export default tooltipChart;
