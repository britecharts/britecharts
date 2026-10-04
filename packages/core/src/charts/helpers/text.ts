import { select } from 'd3-selection';
import type { BaseType, Selection } from 'd3-selection';

/**
 * Any d3 selection these helpers are handed. Same reasoning as filter.ts: the
 * datum and parent generics are the plan's bounded `any` because `Selection` is
 * invariant in them and nothing here reads the datum, and the element is a
 * generic parameter on each function so a caller's own element type is inferred
 * rather than fixed.
 */
type TextSelection<TElement extends BaseType = BaseType> = Selection<
    TElement,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
>;

const wrapConfig = {
    lineHeight: 1.2,
    smallTextOffset: 10,
    smallTextLineHeightRatio: 0.9,
    smallTextRatio: 0.6,
    valueClassName: 'value',
    labelClassName: 'label',
};

const defaultTextSize = 12;
const defaultFontFace = 'Arial';

/**
 * Wraps a selection of text within the available width
 * @param  xOffset        X axis offset for the text
 * @param  fontSize       Size of the base font
 * @param  availableWidth Width of the container where the text needs to wrap on
 * @param  node           SVG text element that contains the text to wrap
 *
 * REF: http://bl.ocks.org/mbostock/7555321
 * More discussions on https://github.com/mbostock/d3/issues/1642
 * @private
 */
export const wrapText = function (
    xOffset: number,
    fontSize: number,
    availableWidth: number,
    node: BaseType | null
): void {
    const text = select(node);
    const words = text.text().split(/\s+/).reverse();
    const smallLineHeight =
        wrapConfig.lineHeight * wrapConfig.smallTextLineHeightRatio;

    // `attr` returns `string | null`, and the arithmetic below leans on
    // JavaScript's coercion rules in two different directions: `y - 5`
    // subtracts numerically, while `y + smallTextOffset` CONCATENATES when `y`
    // is a string ('100' + 10 is '10010', not 110).
    //
    // That is latent rather than live: the only caller is donut's
    // `.donut-text`, which is appended with a class and a `dy` and never a `y`,
    // so `y` is null here and `null + 10` is 10 -- numeric, correct. A caller
    // that did set `y` would get a concatenated attribute.
    //
    // Cast rather than converted, so the coercion stays bit-identical. Wrapping
    // it in `Number()` would be the fix, and would change what the chart draws
    // for any future caller that sets `y`, which is not a conversion's call.
    const y = text.attr('y') as unknown as number;
    // parseFloat(null) is NaN, so `dy + 'em'` renders as 'NaNem' when the
    // element has no `dy`. Also preserved; donut sets `dy` so it does not bite.
    const dy = parseFloat(text.attr('dy') as string);
    const smallFontSize = fontSize * wrapConfig.smallTextRatio;

    let lineNumber = 0;
    let line: string[] = [];
    let word: string | undefined;
    let tspan = text
        .text(null)
        .append('tspan')
        .attr('x', xOffset)
        .attr('y', y - 5)
        .attr('dy', dy + 'em')
        .classed(wrapConfig.valueClassName, true)
        .style('font-size', fontSize + 'px');

    tspan.text(words.pop() ?? null);
    tspan = text
        .append('tspan')
        .classed(wrapConfig.labelClassName, true)
        .attr('x', xOffset)
        .attr('y', y + wrapConfig.smallTextOffset)
        .attr('dy', ++lineNumber * smallLineHeight + dy + 'em')
        .style('font-size', smallFontSize + 'px');

    while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(' '));

        const tspanNode = tspan.node();

        if (
            tspanNode &&
            (tspanNode as SVGTextContentElement).getComputedTextLength() >
                availableWidth - 50
        ) {
            line.pop();
            tspan.text(line.join(' '));
            line = [word];
            tspan = text
                .append('tspan')
                .classed(wrapConfig.labelClassName, true)
                .attr('x', xOffset)
                .attr('y', y + wrapConfig.smallTextOffset)
                .attr('dy', ++lineNumber * smallLineHeight + dy + 'em')
                .text(word)
                .style('font-size', smallFontSize + 'px');
        }
    }
};

/**
 * Wraps a selection of text within the available width, also adds class
 * .adjust-upwards to configure a y offset for entries with multiple rows
 * @param  text    D3 text element
 * @param  width   Width of the container where the text needs to wrap on
 * @param  xpos    Number passed to determine the x offset
 * @param  limit   Number of lines before an ellipses is added and the rest of
 *                 the text is cut off
 *
 * REF: http://bl.ocks.org/mbostock/7555321
 * More discussions on https://github.com/mbostock/d3/issues/1642
 * @private
 */
export const wrapTextWithEllipses = function <TElement extends BaseType>(
    text: TextSelection<TElement>,
    width: number,
    xpos: number = 0,
    limit: number = 2
): void {
    text.each(function () {
        // The JavaScript reassigned the `text` parameter here. Every iteration
        // overwrote it before reading it, and nothing after `.each` touched it,
        // so a local is the same thing said without mutating a parameter -- and
        // it keeps each element's own selection type instead of fighting the
        // outer one.
        const element = select(this);
        const words = element.text().split(/\s+/).reverse();
        const lineHeight = 1.2;
        const y = element.attr('y');
        const dy = parseFloat(element.attr('dy') as string);

        let line: string[] = [];
        let lineNumber = 0;
        let word: string | undefined;
        let tspan = element
            .text(null)
            .append('tspan')
            .attr('x', xpos)
            .attr('y', y)
            .attr('dy', dy + 'em');

        while ((word = words.pop())) {
            line.push(word);
            tspan.text(line.join(' '));

            const tspanNode = tspan.node();

            if (
                tspanNode &&
                (tspanNode as SVGTextContentElement).getComputedTextLength() >
                    width
            ) {
                line.pop();
                tspan.text(line.join(' '));

                if (lineNumber < limit - 1) {
                    line = [word];
                    tspan = element
                        .append('tspan')
                        .attr('x', xpos)
                        .attr('y', y)
                        .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                        .text(word);
                    // if we need two lines for the text, move them both up to center them
                    element.classed('adjust-upwards', true);
                } else {
                    line.push('...');
                    tspan.text(line.join(' '));
                    break;
                }
            }
        }
    });
};

/**
 * Figures out an approximate of the text width by using a canvas element
 * This avoids having to actually render the text to measure it from the DOM itself
 * @param  text      Text to measure
 * @param  fontSize  Font size (or default)
 * @param  fontFace  Font family to use in the calculation (or default)
 * @return Approximated width of the text. The JSDoc used to say String; it is
 *         and always was a number.
 * @private
 */
export const getTextWidth = function (
    text: string,
    fontSize: number = defaultTextSize,
    fontFace: string = defaultFontFace
): number {
    const a = document.createElement('canvas');
    // `getContext` is typed as nullable. Asserted rather than guarded so the
    // behaviour is unchanged: where a null context would now throw on the next
    // line, it threw there before too.
    const b = a.getContext('2d')!;

    b.font = fontSize + 'px ' + fontFace;

    return b.measureText(text).width;
};

/**
 * Gets the font size of the passed node using getComputedStyle
 * or falls back to the default font size
 * @param node The node to get the computed font size for
 * @private
 */
export const getFontSize = function (node: Element): number {
    if (typeof window.getComputedStyle === 'function') {
        return parseFloat(window.getComputedStyle(node).fontSize);
    }

    return defaultTextSize;
};

/**
 * Heuristic which gets the number of lines needed to display the title of the tooltip
 * If shouldShowDateInTitle is set to true, it takes the formatted Date.now() as additional influencer
 * for the approximation of the needed number of lines.
 * @param  title      Text which shall be tested for the necessary number of lines
 * @param  fontSize   Fontsize to use for the heuristic
 * @param  maxLength  Maximal length per line
 * @return Approximative number of lines needed to display the title
 * @private
 */
export const getApproximateNumberOfLines = function (
    title: string,
    fontSize: number,
    maxLength: number
): number {
    const words = title.split(/\s+/).reverse();
    let line: string[] = [],
        approximateLineNumber = 1;

    for (const word of words) {
        line.push(word);

        const textWidth = getTextWidth(
            line.join(' '),
            fontSize,
            'Karla, sans-serif'
        );

        if (textWidth > maxLength) {
            line.pop();
            line = [word];
            ++approximateLineNumber;
        }
    }

    return approximateLineNumber;
};

export default {
    getApproximateNumberOfLines,
    getFontSize,
    getTextWidth,
    wrapText,
    wrapTextWithEllipses,
};
