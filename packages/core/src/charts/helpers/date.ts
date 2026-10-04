// `satisfies` rather than a plain annotation: it checks each entry against
// Intl's option type while keeping the literal keys, so `TimeUnit` below can
// be derived from them. A plain `Record<string, Intl.DateTimeFormatOptions>`
// would widen the keys to `string` and let `getLocaleDateFormatter` be called
// with a unit that has no entry -- which silently formats with `undefined`
// options rather than failing.
const localeTimeMap = {
    minute: { minute: 'numeric' },
    hour: { hour: 'numeric' },
    day: { day: 'numeric' },
    daymonth: { day: 'numeric', month: 'short' },
    month: { month: 'short' },
    year: { year: 'numeric' },
} satisfies Record<string, Intl.DateTimeFormatOptions>;

/** One of the time units {@link getLocaleDateFormatter} knows how to format. */
export type TimeUnit = keyof typeof localeTimeMap;

/**
 * Calculates a new date by summing a given amount of days to a given date
 * @private
 */
export const addDays = (
    startDate: string | number | Date,
    days: number
): string => {
    const result = new Date(startDate);

    result.setDate(result.getDate() + days);

    return String(result);
};

/**
 * Calculates difference between dates in days
 * @private
 */
export const diffDays = (
    startDate: string | number | Date,
    endDate: string | number | Date
): number => {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    return Math.ceil(
        Math.abs(
            (new Date(startDate).getTime() - new Date(endDate).getTime()) /
                oneDayInMilliseconds
        )
    );
};

/**
 * Takes a number representing milliseconds and convert to days
 * @private
 */
export const convertMillisecondsToDays = (milliseconds: number): number =>
    Math.ceil(milliseconds / (24 * 60 * 60 * 1000));

/**
 * Takes a locale (string) and the format to return and returns a function to
 * format dates.
 *
 * `locale` is a BCP 47 tag ('en-US', 'fr-FR'), the same kind the tooltip
 * takes -- not a d3-format locale definition object. Those two are different
 * things that share the word, and core's typings had them crossed until
 * recently.
 * @private
 */
export const getLocaleDateFormatter = (
    locale: string | string[] | undefined,
    timeUnit: TimeUnit = 'day'
): ((date: Date | number) => string) => {
    const options = localeTimeMap[timeUnit];
    const formatter = new Intl.DateTimeFormat(locale, options);

    return (date) => formatter.format(date);
};

export default {
    addDays,
    convertMillisecondsToDays,
    diffDays,
    getLocaleDateFormatter,
};
