import { donut, DonutChartModule } from '@britecharts/core';

export const constructChart = (containerNode: Element): DonutChartModule => {
  const donutChart = donut();

  donutChart
    .margin({
      left: 120,
      right: 20,
      top: 20,
      bottom: 40,
    })
    .width(containerNode.clientWidth)
    .height(500)
    .centeredTextFunction((d) => `${d.quantity} units`);

  return donutChart;
};
