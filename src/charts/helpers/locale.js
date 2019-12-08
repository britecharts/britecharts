define(function (require) {
    const {FORMAT_LOCALE_URL} = require('./constants');
    const {formatDefaultLocale} = require('d3-format');

    function setDefaultLocale(locale) {
        if (typeof locale === 'string' && isValidLocale(locale)) {
            return d3.json(`${FORMAT_LOCALE_URL}/${locale}.json`)
                .then(localeDefinition => {
                    formatDefaultLocale(localeDefinition);
                }).catch(() => {
                    // console.log(`Error retrieving locale, ${locale} from ${FORMAT_LOCALE_URL}`)
                });
        } else if (typeof defaultLocale == 'object') {
            return Promise.resolve(formatDefaultLocale(locale));
        } else {
            // console.log('Please pass in a valid locale string (az-AZ) or locale object definition')
            return Promise.reject();
        }
    }

    // https://cdn.jsdelivr.net/npm/d3-format/locale/
    function isValidLocale(locale) {
        return /[a-z]{2}-[A-Z]{2}/.test(locale);
    }

    return {
        setDefaultLocale
    };
});
