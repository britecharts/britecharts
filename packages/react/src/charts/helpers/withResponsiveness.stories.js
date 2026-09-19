import React from 'react';

import Line from '../line/Line';
import lineData from '../line/lineChart.fixtures';
import withResponsiveness from './withResponsiveness';

const ResponsiveLine = withResponsiveness(Line);

export default {
    title: 'Helpers/withResponsiveness',
};

/**
 * The higher-order component measures its own wrapper after mount and passes
 * the chart its width. The frame has a fixed width so the snapshot does not
 * depend on the viewport.
 */
export const WithALineChart = () => {
    const data = lineData.oneSet();

    return (
        <div style={{ width: 640 }}>
            <ResponsiveLine
                data={data}
                height={300}
                margin={{ top: 60, right: 30, bottom: 60, left: 70 }}
            />
        </div>
    );
};
