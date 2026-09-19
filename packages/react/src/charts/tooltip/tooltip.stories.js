import React from 'react';

import Donut from '../donut/Donut';
import Tooltip from './Tooltip';
import donutData from '../donut/donutChart.fixtures';

export default {
    title: 'Charts/Tooltip',
    component: Tooltip,
};

/**
 * The tooltip on its own: with no chart to render there is nothing to attach
 * it to, so all it draws is its empty wrapper. Baselines the wrapper markup
 * before the component is converted to a function.
 */
export const WithNoChart = () => (
    <div style={{ minHeight: 40, outline: '1px dashed #d2d6df' }}>
        <Tooltip />
    </div>
);

/**
 * KNOWN BROKEN: the tooltip hands its child chart `createTooltip`, and the
 * donut passes it on to its wrapper as a configuration key, which throws
 * "Method not supported by Britechart: createTooltip". Fixed in the hooks
 * migration by making the donut drop it; this story is the visual proof, and
 * the one Chromatic diff that fix is expected to cause.
 */
export const WrappingADonut = () => {
    const data = donutData.with4Slices();

    return <Tooltip data={data} render={(props) => <Donut {...props} />} />;
};
