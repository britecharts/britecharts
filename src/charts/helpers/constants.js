define(function() {

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

    const emptyDonutData = [{
        'quantity': 1,
        'percentage': 100
    }];

    return {
        axisTimeCombinations,
        emptyDonutData,
        timeBenchmarks,
        lineGradientId: 'lineGradientId'
    };
});

