module.exports = (function() {

    'use strict';

    // Styles inherited from style sheets will not be rendered for elements with these tag names
    const noStyleTags = {
        'BASE': true,
        'HEAD': true,
        'HTML': true,
        'META': true,
        'NOFRAME': true,
        'NOSCRIPT': true,
        'PARAM': true,
        'SCRIPT': true,
        'STYLE': true,
        'TITLE': true
    };

    // This list determines which css default values lookup tables are precomputed at load time
    // Lookup tables for other tag names will be automatically built at runtime if needed
    const tagNames = ['A', 'ABBR', 'ADDRESS', 'AREA', 'ARTICLE', 'ASIDE', 'AUDIO', 'B', 'BASE', 'BDI', 'BDO', 'BLOCKQUOTE', 'BODY', 'BR', 'BUTTON', 'CANVAS', 'CAPTION', 'CENTER', 'CITE', 'CODE', 'COL', 'COLGROUP', 'COMMAND', 'DATALIST', 'DD', 'DEL', 'DETAILS', 'DFN', 'DIV', 'DL', 'DT', 'EM', 'EMBED', 'FIELDSET', 'FIGCAPTION', 'FIGURE', 'FONT', 'FOOTER', 'FORM', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HEAD', 'HEADER', 'HGROUP', 'HR', 'HTML', 'I', 'IFRAME', 'IMG', 'INPUT', 'INS', 'KBD', 'LABEL', 'LEGEND', 'LI', 'LINK', 'MAP', 'MARK', 'MATH', 'MENU', 'META', 'METER', 'NAV', 'NOBR', 'NOSCRIPT', 'OBJECT', 'OL', 'OPTION', 'OPTGROUP', 'OUTPUT', 'P', 'PARAM', 'PRE', 'PROGRESS', 'Q', 'RP', 'RT', 'RUBY', 'S', 'SAMP', 'SCRIPT', 'SECTION', 'SELECT', 'SMALL', 'SOURCE', 'SPAN', 'STRONG', 'STYLE', 'SUB', 'SUMMARY', 'SUP', 'SVG', 'TABLE', 'TBODY', 'TD', 'TEXTAREA', 'TFOOT', 'TH', 'THEAD', 'TIME', 'TITLE', 'TR', 'TRACK', 'U', 'UL', 'VAR', 'VIDEO', 'WBR'];

    /**
     * Extracts the styles of elements of the given tag name
     * @param {String} tagName  Tag name that we will check for styles
     * @return {Object}         Values of the styles applied to the given element
     */
    const computeDefaultStyleByTagName = (tagName) => {
        let defaultStyle = {},
            element = document.body.appendChild(document.createElement(tagName)),
            computedStyle = window.getComputedStyle(element);

        [].forEach.call(computedStyle, (style) => {
            defaultStyle[style] = computedStyle[style];
        });
        document.body.removeChild(element);

        return defaultStyle;
    };

    return {

        /**
         * returns serializer function, only run it when you know you want to serialize your chart
         * @return {func} serializer to add styles in line to dom string
         */
        initializeSerializer() {

            // Mapping between tag names and css default values lookup tables. This allows to exclude default values in the result.
            var defaultStylesByTagName = {};

            // Precompute the lookup tables.
            [].forEach.call(tagNames, (name) => {
                if (!noStyleTags[name]) {
                    defaultStylesByTagName[name] = computeDefaultStyleByTagName(name);
                }
            });

            function getDefaultStyleByTagName(tagName) {
                tagName = tagName.toUpperCase();

                if (!defaultStylesByTagName[tagName]) {
                    defaultStylesByTagName[tagName] = computeDefaultStyleByTagName(tagName);
                }

                return defaultStylesByTagName[tagName];
            }

            function serializeWithStyles(elem) {
                let cssTexts = [],
                    elements,
                    computedStyle,
                    defaultStyle,
                    result;

                if (!elem || elem.nodeType !== Node.ELEMENT_NODE) {
                    // 'Error: Object passed in to serializeWithSyles not of nodeType Node.ELEMENT_NODE'

                    return;
                }

                cssTexts = [];
                elements = elem.querySelectorAll('*');

                [].forEach.call(elements, (el, i) => {
                    if (!noStyleTags[el.tagName]) {
                        computedStyle = window.getComputedStyle(el);
                        defaultStyle = getDefaultStyleByTagName(el.tagName);
                        cssTexts[i] = el.style.cssText;
                        [].forEach.call(computedStyle, (cssPropName) => {
                            if (computedStyle[cssPropName] !== defaultStyle[cssPropName]) {
                                el.style[cssPropName] = computedStyle[cssPropName];
                            }
                        });
                    }
                });

                // fix for IE 11 not supporting svg.outerHTML
                result = $('<div>').append($(elem).clone()).html();

                elements = [].map.call(elements, (el, i) => {
                    el.style.cssText = cssTexts[i];

                    return el;
                });

                return result;
            };

            return serializeWithStyles;
        }
    }
})();
