define(function() {

    const d3Shape = require('d3-shape');
    const d3Time = require('d3-time');

    const axisTimeCombinations = {
        MINUTE_HOUR: 'minute-hour',
        HOUR_DAY: 'hour-daymonth',
        DAY_MONTH: 'day-month',
        MONTH_YEAR: 'month-year',
        CUSTOM: 'custom'
    };

    const timeBenchmarks= {
        ONE_AND_A_HALF_YEARS: 47304000000,
        ONE_YEAR: 31536000365,
        ONE_DAY: 86400001
    };

    const curveMap = {
        linear: d3Shape.curveLinear,
        basis: d3Shape.curveBasis,
        cardinal: d3Shape.curveCardinal,
        catmullRom: d3Shape.curveCatmullRom,
        monotoneX: d3Shape.curveMonotoneX,
        monotoneY: d3Shape.curveMonotoneY,
        natural: d3Shape.curveNatural,
        step: d3Shape.curveStep,
        stepAfter: d3Shape.curveStepAfter,
        stepBefore: d3Shape.curveStepBefore
    };

    const emptyDonutData = [{
        'quantity': 1,
        'percentage': 100
    }];

    const timeIntervals = {
        timeMillisecond: d3Time.timeMillisecond,
        utcMillisecond: d3Time.utcMillisecond,
        timeSecond: d3Time.timeSecond ,
        utcSecond: d3Time.utcSecond,
        timeMinute: d3Time.timeMinute,
        utcMinute: d3Time.utcMinute,
        timeHour: d3Time.timeHour,
        utcHour: d3Time.utcHour,
        timeDay: d3Time.timeDay,
        utcDay: d3Time.utcDay,
        timeWeek: d3Time.timeWeek,
        utcWeek: d3Time.utcWeek,
        timeSunday: d3Time.timeSunday,
        utcSunday: d3Time.utcSunday,
        timeMonday: d3Time.timeMonday,
        utcMonday: d3Time.utcMonday,
        timeTuesday: d3Time.timeTuesday,
        utcTuesday: d3Time.utcTuesday,
        timeWednesday: d3Time.timeWednesday,
        utcWednesday: d3Time.utcWednesday,
        timeThursday: d3Time.timeThursday,
        utcThursday: d3Time.utcThursday,
        timeFriday: d3Time.timeFriday,
        utcFriday: d3Time.utcFriday,
        timeSaturday: d3Time.timeSaturday,
        utcSaturday: d3Time.utcSaturday,
        timeMonth: d3Time.timeMonth,
        utcMonth: d3Time.utcMonth,
        timeYear: d3Time.timeYear,
        utcYear: d3Time.utcYear
    };

    return {
        axisTimeCombinations,
        curveMap,
        emptyDonutData,
        timeBenchmarks,
        lineGradientId: 'lineGradientId',
        timeIntervals
    };
});

