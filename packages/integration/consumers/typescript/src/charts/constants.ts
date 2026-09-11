import { line, constants, LineChartModule } from '@britecharts/core';

// `constants.axisTimeCombinations` is typed against the AxisTimeCombination
// enum, so it is accepted wherever a chart takes an axis format.
export const withHourDayAxis = (): LineChartModule =>
  line().xAxisFormat(constants.axisTimeCombinations.HOUR_DAY);

// @ts-expect-error not a combination
constants.axisTimeCombinations.NOPE;
