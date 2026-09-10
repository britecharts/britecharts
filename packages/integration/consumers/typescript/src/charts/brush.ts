import { brush, colors, BrushChartModule } from '@britecharts/core';

export const constructChart = (containerNode: Element): BrushChartModule => {
  const brushChart = brush();

  brushChart
    .margin({
      left: 120,
      right: 20,
      top: 20,
      bottom: 40,
    })
    .width(containerNode.clientWidth)
    .height(500)
    .gradient(colors.colorGradients.orangePink);

  return brushChart;
};
