import { treemap, TreemapChartModule } from '@britecharts/core';

export const constructChart = (containerNode: Element): TreemapChartModule => {
  const treemapChart = treemap();

  treemapChart
    .width(containerNode.clientWidth)
    .height(300)
    .enableLabels(true)
    .labelsNumberFormat('$,')
    .isAnimated(true)
    .animationDuration(400);

  return treemapChart;
};
