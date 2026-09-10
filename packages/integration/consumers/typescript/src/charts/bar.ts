import { bar, colors, BarChartModule } from '@britecharts/core';

export const constructChart = (containerNode: Element): BarChartModule => {
  const barChart = bar();

  barChart
    .margin({
      left: 120,
      right: 20,
      top: 20,
      bottom: 40,
    })
    .hasSingleBarHighlight(false)
    .highlightBarFunction((bar) => bar.attr('fill', 'cyan'))
    .isHorizontal(true)
    .hasPercentage(true)
    .colorSchema(colors.colorSchemas.britecharts)
    .percentageAxisToMaxRatio(1.3)
    .width(containerNode.clientWidth)
    .orderingFunction((a, b) => b.value - a.value)
    .height(500);

  return barChart;
};
