import { scatterPlot, ScatterPlotModule } from '@britecharts/core';

export const constructChart = (containerNode: Element): ScatterPlotModule => {
  const scatter = scatterPlot();

  scatter
    .width(containerNode.clientWidth)
    .margin({bottom: 60, left: 100})
    .hasTrendline(true)
    .grid('horizontal')
    .xAxisLabel('Temperature (C)')
    .yAxisLabel('Ice Cream Sales')
    .xAxisFormat('.1f')
    .yAxisFormat('$');

  return scatter;
};
