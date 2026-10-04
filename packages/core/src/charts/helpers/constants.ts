import {
    curveLinear,
    curveBasis,
    curveCardinal,
    curveCatmullRom,
    curveMonotoneX,
    curveMonotoneY,
    curveNatural,
    curveStep,
    curveStepAfter,
    curveStepBefore,
} from 'd3-shape';
import {
    timeMillisecond,
    utcMillisecond,
    timeSecond,
    utcSecond,
    timeMinute,
    utcMinute,
    timeHour,
    utcHour,
    timeDay,
    utcDay,
    timeWeek,
    utcWeek,
    timeSunday,
    utcSunday,
    timeMonday,
    utcMonday,
    timeTuesday,
    utcTuesday,
    timeWednesday,
    utcWednesday,
    timeThursday,
    utcThursday,
    timeFriday,
    utcFriday,
    timeSaturday,
    utcSaturday,
    timeMonth,
    utcMonth,
    timeYear,
    utcYear,
} from 'd3-time';
import type { CountableTimeInterval } from 'd3-time';
import type { CurveFactory } from 'd3-shape';

// `as const` so each value's literal type survives. This is the one constant
// that is public API -- src/index.js re-exports it as `constants`, and the
// time-series charts' `xAxisFormat` accepts exactly these strings -- so the
// published typing promises those literals, not `string`.
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

export const timeBenchmarks = {
    ONE_AND_A_HALF_YEARS: 47304000000,
    ONE_YEAR: 31536000365,
    ONE_DAY: 86400001,
};

export const hoursHuman = [
    '00h',
    '01h',
    '02h',
    '03h',
    '04h',
    '05h',
    '06h',
    '07h',
    '08h',
    '09h',
    '10h',
    '11h',
    '12h',
    '13h',
    '14h',
    '15h',
    '16h',
    '17h',
    '18h',
    '19h',
    '20h',
    '21h',
    '22h',
    '23h',
];

export const motion = {
    duration: 1200,
    mediumDuration: 600,
    shortDuration: 300,
};

// Deliberately not `as const`: the charts look these up with a dynamic
// string (`curveMap[areaCurve]` in stacked-area and brush), which a readonly
// literal-keyed object would reject once those files convert.
export const curveMap: Record<string, CurveFactory> = {
    linear: curveLinear,
    basis: curveBasis,
    cardinal: curveCardinal,
    catmullRom: curveCatmullRom,
    monotoneX: curveMonotoneX,
    monotoneY: curveMonotoneY,
    natural: curveNatural,
    step: curveStep,
    stepAfter: curveStepAfter,
    stepBefore: curveStepBefore,
};

export const emptyDonutData = [
    {
        quantity: 1,
        percentage: 100,
    },
];

// Same reason as curveMap: brush does `timeIntervals[roundingTimeInterval]`.
// The values are a mix -- d3's millisecond/second/... intervals are countable,
// which is what brush's `.round` and `.every` need.
export const timeIntervals: Record<string, CountableTimeInterval> = {
    timeMillisecond: timeMillisecond,
    utcMillisecond: utcMillisecond,
    timeSecond: timeSecond,
    utcSecond: utcSecond,
    timeMinute: timeMinute,
    utcMinute: utcMinute,
    timeHour: timeHour,
    utcHour: utcHour,
    timeDay: timeDay,
    utcDay: utcDay,
    timeWeek: timeWeek,
    utcWeek: utcWeek,
    timeSunday: timeSunday,
    utcSunday: utcSunday,
    timeMonday: timeMonday,
    utcMonday: utcMonday,
    timeTuesday: timeTuesday,
    utcTuesday: utcTuesday,
    timeWednesday: timeWednesday,
    utcWednesday: utcWednesday,
    timeThursday: timeThursday,
    utcThursday: utcThursday,
    timeFriday: timeFriday,
    utcFriday: utcFriday,
    timeSaturday: timeSaturday,
    utcSaturday: utcSaturday,
    timeMonth: timeMonth,
    utcMonth: utcMonth,
    timeYear: timeYear,
    utcYear: utcYear,
};

export default {
    axisTimeCombinations,
    curveMap,
    emptyDonutData,
    timeBenchmarks,
    lineGradientId: 'lineGradientId',
    timeIntervals,
    hoursHuman,
};
