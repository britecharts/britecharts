import * as d3Format from 'd3-format';
import type { FormatLocaleDefinition, FormatLocaleObject } from 'd3-format';

const REQUIRED_LOCALE_DEFINITION_KEYS = [
    'decimal',
    'thousands',
    'grouping',
    'currency',
] as const satisfies readonly (keyof FormatLocaleDefinition)[];

const WRONG_LOCALE_OBJECT_MESSAGE =
    'Please pass in a valid locale object definition';

/**
 * Checks if a locale definition object contains the required keys
 *
 * A predicate, because its only caller uses it to decide whether the value is
 * safe to hand to d3. The parameter is `unknown`: the whole point is that this
 * runs on a value a consumer passed and nothing has vouched for yet.
 *
 * It checks four of d3's required keys, not all of them -- that is the
 * behaviour as it was, and the `satisfies` above at least makes the four
 * spelling-checked against d3's own type, so a typo cannot silently stop
 * checking a key.
 * @private
 */
const isValidLocaleDefinition = (
    locale: unknown
): locale is FormatLocaleDefinition => {
    return (
        typeof locale == 'object' &&
        locale !== null &&
        REQUIRED_LOCALE_DEFINITION_KEYS.every((localeKey) =>
            Object.prototype.hasOwnProperty.call(locale, localeKey)
        )
    );
};

/**
 * Sets the given locale as the new default locale through d3-format's
 * formatDefaultLocale. When an object is used, it simply uses it to set the
 * new locale.
 *
 * This is a d3-format locale *definition* -- `{ decimal, thousands, grouping,
 * currency, ... }` -- not a BCP 47 tag. The date helpers and the tooltip take
 * the tag; these two kinds share the word `locale` and nothing else.
 *
 * @return Object with 'format' and 'formatPrefix' functions
 * @private
 */
export const setDefaultLocale = (locale: unknown): FormatLocaleObject => {
    if (isValidLocaleDefinition(locale)) {
        return d3Format.formatDefaultLocale(locale);
    } else {
        throw new Error(WRONG_LOCALE_OBJECT_MESSAGE);
    }
};
