import { legend, colors, LegendModule } from '@britecharts/core';

export const constructChart = (containerNode: Element): LegendModule => {
  const legendComponent = legend();

  legendComponent
    .margin({
      left: 20,
      right: 60,
      top: 20,
      bottom: 0,
    })
    .width(containerNode.clientWidth)
    .height(200)
    .colorSchema(colors.colorSchemas.britecharts);

  return legendComponent;
};
