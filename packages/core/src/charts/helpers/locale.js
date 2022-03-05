import * as d3Format from 'd3-format';

const REQUIRED_LOCALE_DEFINITION_KEYS = [
    'decimal',
    'thousands',
    'grouping',
    'currency',
];
const WRONG_LOCALE_OBJECT_MESSAGE =
    'Please pass in a valid locale object definition';

/**
 * Sets the given locale as the new default locale through d3-format's formatDefaultLocale
 * When an object is used, it simply uses it to set the new locale.
 * @param  {LocaleObject} locale    The desired locale object
 * @return {Object}                 Object with a 'format' and 'formatPrefix' functions
 * @private
 */
export const setDefaultLocale = (locale) => {
    if (isValidLocaleDefinition(locale)) {
        return d3Format.formatDefaultLocale(locale);
    } else {
        throw new Error(WRONG_LOCALE_OBJECT_MESSAGE);
    }
};

/**
 * Checks if a locale definition object contains the required keys
 * @param  {LocaleObject}  locale   Locale to check
 * @return {Boolean}                Is the locale definition has a correct format (https://cdn.jsdelivr.net/npm/d3-format/locale/en-US.json)
 * @private
 */
const isValidLocaleDefinition = (locale) => {
    return (
        typeof locale == 'object' &&
        REQUIRED_LOCALE_DEFINITION_KEYS.every((localeKey) =>
            locale.hasOwnProperty(localeKey)
        )
    );
};
