import React from 'react';

import Line from '../line/Line';
import ResponsiveContainer from './responsiveContainer';
import lineData from '../line/lineChart.fixtures';

export default {
    title: 'Helpers/ResponsiveContainer',
    component: ResponsiveContainer,
};

/**
 * The container measures itself after mount and again whenever the window is
 * resized, and hands the chart its width: resize the window to see the chart
 * follow. The frame fills the width available.
 */
export const WithALineChart = () => {
    const data = lineData.oneSet();

    return (
        <div style={{ width: '100%' }}>
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

/**
 * A frame capped at 360px: the chart takes the frame's width, not the
 * window's, until the window gets narrower than the frame.
 */
export const InANarrowFrame = () => {
    const data = lineData.oneSet();

    return (
        <div style={{ width: '100%', maxWidth: 360 }}>
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
