import { stackedArea, StackedAreaChartModule } from '@britecharts/core';

export const constructChart = (
  containerNode: Element
): StackedAreaChartModule => {
  const stackedAreaChart = stackedArea();

  stackedAreaChart
    .isAnimated(true)
    .tooltipThreshold(600)
    .grid('full')
    .width(containerNode.clientWidth);

  return stackedAreaChart;
};
