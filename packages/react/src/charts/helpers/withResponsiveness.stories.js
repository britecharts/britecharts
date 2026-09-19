import React from 'react';

import Line from '../line/Line';
import lineData from '../line/lineChart.fixtures';
import withResponsiveness from './withResponsiveness';

const ResponsiveLine = withResponsiveness(Line);

export default {
    title: 'Helpers/withResponsiveness',
};

/**
 * The higher-order component measures its own wrapper after mount and again
 * whenever the window is resized, and passes the chart its width: resize the
 * window to see the chart follow. The frame fills the width available.
 */
export const WithALineChart = () => {
    const data = lineData.oneSet();

    return (
        <div style={{ width: '100%' }}>
            <ResponsiveLine
                data={data}
                height={300}
                margin={{ top: 60, right: 30, bottom: 60, left: 70 }}
            />
        </div>
    );
};
