import { groupedBar, colors, GroupedBarChartModule } from '@britecharts/core';

export const constructChart = (containerNode: Element): GroupedBarChartModule => {
  const groupedBarChart = groupedBar();

  groupedBarChart
    .margin({
      left: 80,
      right: 60,
      top: 20,
      bottom: 40,
    })
    .colorSchema(colors.colorSchemas.britecharts)
    .width(containerNode.clientWidth)
    .grid('horizontal')
    .height(500);

  return groupedBarChart;
};
