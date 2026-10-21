export const britechartsCustomEvents = [
    'customMouseOver',
    'customMouseMove',
    'customMouseOut',
    'customClick',
    // The brush's own two, fired as its selection starts and ends
    'customBrushStart',
    'customBrushEnd',
] as const;

/** One of the events a chart dispatches. */
export type BritechartsCustomEvent = (typeof britechartsCustomEvents)[number];

// `as const`, so a consumer writing `xAxisFormat(axisTimeCombinations.HOUR_DAY)`
// is handing over the literal the charts compare against rather than `string`.
// Core's own copy of these is already declared that way.
export const axisTimeCombinations = {
    MINUTE_HOUR: 'minute-hour',
    HOUR_DAY: 'hour-daymonth',
    DAY_MONTH: 'day-month',
    MONTH_YEAR: 'month-year',
    CUSTOM: 'custom',
} as const;

/** Any of the values of {@link axisTimeCombinations}. */
export type AxisTimeCombinationValue =
    (typeof axisTimeCombinations)[keyof typeof axisTimeCombinations];
