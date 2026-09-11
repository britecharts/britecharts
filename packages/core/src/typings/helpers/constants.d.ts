export enum AxisTimeCombination {
  MINUTE_HOUR = 'minute-hour',
  HOUR_DAY = 'hour-daymonth',
  DAY_MONTH = 'day-month',
  MONTH_YEAR = 'month-year',
  CUSTOM = 'custom',
}

/**
 * The constants `@britecharts/core` exports. `axisTimeCombinations` is what
 * the time-series charts' `xAxisFormat` accepts; the same object is also
 * exposed on each chart instance.
 */
export const constants: {
  readonly axisTimeCombinations: {
    readonly MINUTE_HOUR: AxisTimeCombination.MINUTE_HOUR;
    readonly HOUR_DAY: AxisTimeCombination.HOUR_DAY;
    readonly DAY_MONTH: AxisTimeCombination.DAY_MONTH;
    readonly MONTH_YEAR: AxisTimeCombination.MONTH_YEAR;
    readonly CUSTOM: AxisTimeCombination.CUSTOM;
  };
};
