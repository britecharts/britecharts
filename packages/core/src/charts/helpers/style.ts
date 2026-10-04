// Was `module.exports = (function () { ... })()` -- the only CommonJS module in
// core/src. Both importers already did `import serializeWithStyles from
// './style'` and reached through it (`serializeWithStyles.initializeSerializer()`),
// which only worked through Babel's interop. An ESM default export of the same
// object is what they were really getting, so nothing at either call site
// changes, and the file stops being the one exception to how core is written.
//
// The IIFE is gone with it: a module already has its own scope, and 'use strict'
// is implicit in one.

/**
 * A `CSSStyleDeclaration` indexed by property name.
 *
 * Iterating a declaration yields its property names, and this file then reads
 * and writes them with bracket access. That is not in the DOM's typed surface
 * -- the standard route is `getPropertyValue`/`setProperty`, which also handle
 * the dashed names iteration produces -- but switching to those would change
 * which values round-trip, and a conversion is the wrong place to find out.
 * The cast keeps the behaviour exactly and marks where the cleanup belongs.
 */
type StyleByName = CSSStyleDeclaration & Record<string, string>;

// Styles inherited from style sheets will not be rendered for elements with these tag names
const noStyleTags: Record<string, boolean> = {
    BASE: true,
    HEAD: true,
    HTML: true,
    META: true,
    NOFRAME: true,
    NOSCRIPT: true,
    PARAM: true,
    SCRIPT: true,
    STYLE: true,
    TITLE: true,
};

// This list determines which css default values lookup tables are precomputed at load time
// Lookup tables for other tag names will be automatically built at runtime if needed
const tagNames = [
    'A',
    'ABBR',
    'ADDRESS',
    'AREA',
    'ARTICLE',
    'ASIDE',
    'AUDIO',
    'B',
    'BASE',
    'BDI',
    'BDO',
    'BLOCKQUOTE',
    'BODY',
    'BR',
    'BUTTON',
    'CANVAS',
    'CAPTION',
    'CENTER',
    'CITE',
    'CODE',
    'COL',
    'COLGROUP',
    'COMMAND',
    'DATALIST',
    'DD',
    'DEL',
    'DETAILS',
    'DFN',
    'DIV',
    'DL',
    'DT',
    'EM',
    'EMBED',
    'FIELDSET',
    'FIGCAPTION',
    'FIGURE',
    'FONT',
    'FOOTER',
    'FORM',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'HEAD',
    'HEADER',
    'HGROUP',
    'HR',
    'HTML',
    'I',
    'IFRAME',
    'IMG',
    'INPUT',
    'INS',
    'KBD',
    'LABEL',
    'LEGEND',
    'LI',
    'LINK',
    'MAP',
    'MARK',
    'MATH',
    'MENU',
    'META',
    'METER',
    'NAV',
    'NOBR',
    'NOSCRIPT',
    'OBJECT',
    'OL',
    'OPTION',
    'OPTGROUP',
    'OUTPUT',
    'P',
    'PARAM',
    'PRE',
    'PROGRESS',
    'Q',
    'RP',
    'RT',
    'RUBY',
    'S',
    'SAMP',
    'SCRIPT',
    'SECTION',
    'SELECT',
    'SMALL',
    'SOURCE',
    'SPAN',
    'STRONG',
    'STYLE',
    'SUB',
    'SUMMARY',
    'SUP',
    'SVG',
    'TABLE',
    'TBODY',
    'TD',
    'TEXTAREA',
    'TFOOT',
    'TH',
    'THEAD',
    'TIME',
    'TITLE',
    'TR',
    'TRACK',
    'U',
    'UL',
    'VAR',
    'VIDEO',
    'WBR',
];

/**
 * Extracts the styles of elements of the given tag name
 * @private
 */
const computeDefaultStyleByTagName = (
    tagName: string
): Record<string, string> => {
    const defaultStyle: Record<string, string> = {};
    const element = document.body.appendChild(document.createElement(tagName));
    const computedStyle = window.getComputedStyle(element) as StyleByName;

    // `Array.from` where this read `[].forEach.call(...)`. Same iteration over
    // the same array-like, but `[]` types as `never[]`, so the borrowed
    // `forEach` had nothing useful to infer from.
    Array.from(computedStyle).forEach((style) => {
        defaultStyle[style] = computedStyle[style];
    });
    document.body.removeChild(element);

    return defaultStyle;
};

/**
 * Returns a serializer function, only run it when you know you want to serialize your chart
 * @return serializer to add styles in line to dom string
 * @private
 */
const initializeSerializer = () => {
    // Mapping between tag names and css default values lookup tables. This allows to exclude default values in the result.
    const defaultStylesByTagName: Record<string, Record<string, string>> = {};

    // Precompute the lookup tables.
    tagNames.forEach((name) => {
        if (!noStyleTags[name]) {
            defaultStylesByTagName[name] = computeDefaultStyleByTagName(name);
        }
    });

    function getDefaultStyleByTagName(tagName: string): Record<string, string> {
        tagName = tagName.toUpperCase();

        if (!defaultStylesByTagName[tagName]) {
            defaultStylesByTagName[tagName] =
                computeDefaultStyleByTagName(tagName);
        }

        return defaultStylesByTagName[tagName];
    }

    function serializeWithStyles(
        elem: Element | null | undefined
    ): string | undefined {
        if (!elem || elem.nodeType !== Node.ELEMENT_NODE) {
            // 'Error: Object passed in to serializeWithSyles not of nodeType Node.ELEMENT_NODE'

            return;
        }

        const cssTexts: string[] = [];
        const elements = elem.querySelectorAll('*');

        elements.forEach((el, i) => {
            if (!noStyleTags[el.tagName]) {
                const computedStyle = window.getComputedStyle(
                    el
                ) as StyleByName;
                const defaultStyle = getDefaultStyleByTagName(el.tagName);
                const elStyle = (el as HTMLElement | SVGElement)
                    .style as StyleByName;

                cssTexts[i] = elStyle.cssText;
                Array.from(computedStyle).forEach((cssPropName) => {
                    if (
                        computedStyle[cssPropName] !== defaultStyle[cssPropName]
                    ) {
                        elStyle[cssPropName] = computedStyle[cssPropName];
                    }
                });
            }
        });

        const result = elem.outerHTML;

        elements.forEach((el, i) => {
            (el as HTMLElement | SVGElement).style.cssText = cssTexts[i];
        });

        return result;
    }

    return serializeWithStyles;
};

export default {
    initializeSerializer,
};
