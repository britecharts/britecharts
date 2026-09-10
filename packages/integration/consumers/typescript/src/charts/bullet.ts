import { bullet, BulletChartModule } from '@britecharts/core';

export const constructChart = (containerNode: Element): BulletChartModule => {
  const bulletChart = bullet();

  bulletChart.width(containerNode.clientWidth).height(300);

  return bulletChart;
};
