import { line, tooltip, LineChartModule, TooltipModule } from '@britecharts/core';

export const constructChart = (containerNode: Element): {lineChartWithTooltip: LineChartModule, tooltipComponent:TooltipModule} => {
  const lineChartWithTooltip = line();
  const tooltipComponent = tooltip();

  tooltipComponent.title('Test Title');

  lineChartWithTooltip
    .margin({top:60, bottom: 50, left: 50, right: 30})
    .grid('horizontal')
    .width(containerNode.clientWidth)
    .height(500)
    .on('customMouseOver', tooltipComponent.show)
    .on('customMouseMove', tooltipComponent.update)
    .on('customMouseOut', tooltipComponent.hide);

  return {lineChartWithTooltip, tooltipComponent};
};
