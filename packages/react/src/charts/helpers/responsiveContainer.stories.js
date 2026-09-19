import React from 'react';

import Line from '../line/Line';
import ResponsiveContainer from './responsiveContainer';
import lineData from '../line/lineChart.fixtures';

export default {
    title: 'Helpers/ResponsiveContainer',
    component: ResponsiveContainer,
};

/**
 * The container measures itself after mount and hands the chart its width.
 * The frame has a fixed width so the snapshot does not depend on the
 * viewport.
 */
export const WithALineChart = () => {
    const data = lineData.oneSet();

    return (
        <div style={{ width: 640 }}>
            <ResponsiveContainer
                render={({ width }) => (
                    <Line
                        data={data}
                        width={width}
                        height={300}
                        margin={{ top: 60, right: 30, bottom: 60, left: 70 }}
                    />
                )}
            />
        </div>
    );
};

export const InANarrowFrame = () => {
    const data = lineData.oneSet();

    return (
        <div style={{ width: 360 }}>
            <ResponsiveContainer
                render={({ width }) => (
                    <Line
                        data={data}
                        width={width}
                        height={300}
                        margin={{ top: 60, right: 30, bottom: 60, left: 70 }}
                    />
                )}
            />
        </div>
    );
};
