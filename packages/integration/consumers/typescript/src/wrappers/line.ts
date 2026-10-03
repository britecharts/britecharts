// line is the wrapper most likely to regress at the package boundary: it is
// the only one whose `data` argument is an object rather than an array, so it
// is the one the shared `Wrapper` type cannot describe by accident. It is also
// where `LineChartDataShape.name` being declared `string` rather than `number`
// surfaced -- a consumer check here would have caught that before the
// conversion ran into it.
import { LineWrapper } from '@britecharts/wrappers';
import type { LineChartData, LineChartModule } from '@britecharts/core';

import { SAMPLE_LINE_CHART_DATA } from '../data/line-chart-sample';

export const draw = (node: HTMLElement) => {
  const chart: LineChartModule = LineWrapper.create(
    node,
    SAMPLE_LINE_CHART_DATA,
    { isAnimated: false }
  );

  LineWrapper.update(node, SAMPLE_LINE_CHART_DATA, { width: 600 }, chart);
  LineWrapper.destroy(node);

  return chart;
};

// The data is the object, not an array of points -- passing the array the other
// ten wrappers take does not type.
export const rejectsAnArray = () =>
  // @ts-expect-error line takes a LineChartData object
  LineWrapper.create(document.createElement('div'), SAMPLE_LINE_CHART_DATA.data);

// And `name` is the numeric topic id.
export const rejectsAStringName = () => {
  const data: LineChartData = {
    data: [
      {
        topicName: 'Sales',
        // @ts-expect-error name is the numeric topic identifier
        name: '1',
        value: 15,
        date: '2015-12-30T00:00:00-08:00',
      },
    ],
  };

  return data;
};
