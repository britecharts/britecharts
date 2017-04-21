define(function(require) {
    const axisTimeCombinations = {
        MINUTE_HOUR: 'minute-hour',
        HOUR_DAY: 'hour-daymonth',
        DAY_MONTH: 'day-month',
        MONTH_YEAR: 'month-year'
    };

    const timeBenchmarks= {
        ONE_AND_A_HALF_YEARS: 47304000000,
        ONE_YEAR: 31536000365,
        ONE_DAY: 86400001
    };

    return {
        axisTimeCombinations,
        timeBenchmarks,
        lineGradientId: 'lineGradientId'
    };
});

