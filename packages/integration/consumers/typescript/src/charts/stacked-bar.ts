import { stackedBar, colors, StackedBarChartModule } from '@britecharts/core';

export const constructChart = (containerNode: Element): StackedBarChartModule => {
  const stackedBarChart = stackedBar();

  stackedBarChart
    .margin({
      left: 80,
      right: 60,
      top: 20,
      bottom: 40,
    })
    .colorSchema(colors.colorSchemas.britecharts)
    .width(containerNode.clientWidth)
    .grid('horizontal')
    .isAnimated(true)
    .betweenBarsPadding(0.3)
    .height(500);

  return stackedBarChart;
};


