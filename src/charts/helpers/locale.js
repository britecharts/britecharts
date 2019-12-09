define(function (require) {
    const { FORMAT_LOCALE_URL } = require('./constants');
    const { formatDefaultLocale } = require('d3-format');
    const { json } = require('d3');
    const VALID_LOCALE_REGEX = /[a-z]{2}-[A-Z]{2}/;
    const REQUIRED_LOCALE_DEFINITION_KEYS = ['decimal', 'thousands', 'grouping', 'currency'];

    /**
     * Sets the given locale as the new default locale through d3-format's formatDefaultLocale
     * When a string is given as a parameter, it uses d3.json to fetch the correct locale definition.
     * When an object is used, it simply uses it to set the new locale.
     * @param  {string | Object} locale The locale in string or object format.
     * @return {Promise}       Result of formatDefaultLocale call.
     */
    function setDefaultLocale(locale) {
        if (typeof locale === 'string' && isValidLocale(locale)) {
            return json(`${FORMAT_LOCALE_URL}/${locale}.json`)
                .then(localeDefinition => {

                    formatDefaultLocale(localeDefinition);
                    return Promise.resolve()
                })
                .catch(() => Promise.reject(`Error retrieving locale, ${locale} from ${FORMAT_LOCALE_URL}`));
        } else if (typeof locale == 'object' && isValidLocaleDefinition(locale)) {
            return Promise.resolve(formatDefaultLocale(locale));
        } else {
            return Promise.reject('Please pass in a valid locale string (az-AZ) or locale object definition');
        }
    }

    /**
     * Checks if a locale is of the correct format
     * @param  {string}  locale Locale to check
     * @return {Boolean}       Is the locale has a correct format (https://cdn.jsdelivr.net/npm/d3-format/locale/)
     */
    function isValidLocale(locale) {
        return VALID_LOCALE_REGEX.test(locale);
    }

    /**
     * Checks if a locale definition object contains the required keys
     * @param  {oabject}  locale Locale to check
     * @return {Boolean}       Is the locale definition has a correct format (https://cdn.jsdelivr.net/npm/d3-format/locale/en-US.json)
     */
    function isValidLocaleDefinition(locale) {
        return REQUIRED_LOCALE_DEFINITION_KEYS.every(localeKey => locale.hasOwnProperty(localeKey));
    }

    return {
        setDefaultLocale
    };
});
