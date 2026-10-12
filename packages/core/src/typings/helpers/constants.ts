export enum AxisTimeCombination {
    MINUTE_HOUR = 'minute-hour',
    HOUR_DAY = 'hour-daymonth',
    DAY_MONTH = 'day-month',
    MONTH_YEAR = 'month-year',
    CUSTOM = 'custom',
}

// The `constants` object the package exports used to be declared here, as an
// ambient `const` with its shape written out by hand. It is gone, not moved: a
// real module cannot declare a value it does not define, and it does not need
// to -- `src/index.ts` builds the real `constants` from
// `charts/helpers/constants`, and the declaration generated from that file
// reports the shape it actually has. One fewer hand-maintained copy of a
// literal. `packages/integration`'s TypeScript consumer covers it, including
// the negative case: `constants.axisTimeCombinations.NOPE` has to stay an
// error.
