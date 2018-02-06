define(function() {

    const d3Shape = require('d3-shape');

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

    return {
        axisTimeCombinations,
        curveMap,
        emptyDonutData,
        timeBenchmarks,
        lineGradientId: 'lineGradientId'
    };
});

