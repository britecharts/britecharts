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
    curveStepBefore
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
    utcYear
} from 'd3-time';


export const axisTimeCombinations = {
    MINUTE_HOUR: 'minute-hour',
    HOUR_DAY: 'hour-daymonth',
    DAY_MONTH: 'day-month',
    MONTH_YEAR: 'month-year',
    CUSTOM: 'custom'
};

export const timeBenchmarks = {
    ONE_AND_A_HALF_YEARS: 47304000000,
    ONE_YEAR: 31536000365,
    ONE_DAY: 86400001
};

export const curveMap = {
    linear: curveLinear,
    basis: curveBasis,
    cardinal: curveCardinal,
    catmullRom: curveCatmullRom,
    monotoneX: curveMonotoneX,
    monotoneY: curveMonotoneY,
    natural: curveNatural,
    step: curveStep,
    stepAfter: curveStepAfter,
    stepBefore: curveStepBefore
};

export const emptyDonutData = [{
    'quantity': 1,
    'percentage': 100
}];

export const timeIntervals = {
    timeMillisecond: timeMillisecond,
    utcMillisecond: utcMillisecond,
    timeSecond: timeSecond ,
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
    utcYear: utcYear
};

export default {
    axisTimeCombinations,
    curveMap,
    emptyDonutData,
    timeBenchmarks,
    lineGradientId: 'lineGradientId',
    timeIntervals
};
