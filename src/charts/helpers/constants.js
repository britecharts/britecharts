define(function () {

    const d3Shape = require('d3-shape');
    const d3Time = require('d3-time');

    const FORMAT_LOCALE_URL = 'https://cdn.jsdelivr.net/npm/d3-format/locale';

    const axisTimeCombinations = {
        MINUTE_HOUR: 'minute-hour',
        HOUR_DAY: 'hour-daymonth',
        DAY_MONTH: 'day-month',
        MONTH_YEAR: 'month-year',
        CUSTOM: 'custom'
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

    const hoursHuman = [
        "00h",
        "01h",
        "02h",
        "03h",
        "04h",
        "05h",
        "06h",
        "07h",
        "08h",
        "09h",
        "10h",
        "11h",
        "12h",
        "13h",
        "14h",
        "15h",
        "16h",
        "17h",
        "18h",
        "19h",
        "20h",
        "21h",
        "22h",
        "23h",
    ];

    const timeBenchmarks = {
        ONE_AND_A_HALF_YEARS: 47304000000,
        ONE_YEAR: 31536000365,
        ONE_DAY: 86400001
    };

    const timeIntervals = {
        timeMillisecond: d3Time.timeMillisecond,
        utcMillisecond: d3Time.utcMillisecond,
        timeSecond: d3Time.timeSecond,
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
        hoursHuman,
        timeBenchmarks,
        lineGradientId: 'lineGradientId',
        timeIntervals,
        FORMAT_LOCALE_URL
    };
});

