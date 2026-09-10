import { heatmap, colors, HeatmapChartModule } from '@britecharts/core';

export const constructChart = (containerNode: Element): HeatmapChartModule => {
  const heatmapChart = heatmap();

  heatmapChart
    .margin({
      left: 80,
      right: 60,
      top: 80,
      bottom: 40,
    })
    .colorSchema(colors.colorSchemas.britecharts)
    .width(containerNode.clientWidth)
    .height(500);

  return heatmapChart;
};
