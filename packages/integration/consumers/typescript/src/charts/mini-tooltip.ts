import { bar, miniTooltip, colors, BarChartModule } from '@britecharts/core';

export const constructChart = (containerNode: Element): {barChart: BarChartModule, tooltip:any} => {
  const barChart = bar();
  const tooltip = miniTooltip();

  tooltip.title('Test Title');

  barChart
    .margin({
      left: 120,
      right: 20,
      top: 20,
      bottom: 40,
    })
    .isHorizontal(true)
    .colorSchema(colors.colorSchemas.britecharts)
    .width(containerNode.clientWidth)
    .height(500)
    .on('customMouseOver', tooltip.show)
    .on('customMouseMove', tooltip.update)
    .on('customMouseOut', tooltip.hide);

  return {barChart, tooltip};
};
