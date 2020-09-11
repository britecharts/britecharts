define(function(require) {

    const d3Selection = require('d3-selection');

    const wrapConfig = {
        lineHeight: 1.2,
        smallTextOffset: 10,
        smallTextLineHeightRatio: 0.9,
        smallTextRatio: 0.6,
        valueClassName: 'value',
        labelClassName: 'label'
    };

    const defaultTextSize = 12;
    const defaultFontFace = 'Arial';

    /**
     * Wraps a selection of text within the available width
     * @param  {Number} xOffset        X axis offset for the text
     * @param  {Number} fontSize       Size of the base font
     * @param  {Number} availableWidth Width of the container where the text needs to wrap on
     * @param  {D3Selection} node      SVG text element that contains the text to wrap
     *
     * REF: http://bl.ocks.org/mbostock/7555321
     * More discussions on https://github.com/mbostock/d3/issues/1642
     * @return {void}
     */
    const wrapText = function(xOffset, fontSize, availableWidth, node) {
        let text = d3Selection.select(node),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            smallLineHeight = wrapConfig.lineHeight * wrapConfig.smallTextLineHeightRatio,
            y = text.attr('y'),
            dy = parseFloat(text.attr('dy')),
            smallFontSize = fontSize * wrapConfig.smallTextRatio,
            tspan = text.text(null).append('tspan')
                .attr('x', xOffset)
                .attr('y', y - 5)
                .attr('dy', dy + 'em')
                .classed(wrapConfig.valueClassName, true)
                .style('font-size', fontSize + 'px');

        tspan.text(words.pop());
        tspan = text.append('tspan')
            .classed(wrapConfig.labelClassName, true)
            .attr('x', xOffset)
            .attr('y', y + wrapConfig.smallTextOffset)
            .attr('dy', ++lineNumber * smallLineHeight + dy + 'em')
            .style('font-size', smallFontSize + 'px');

        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(' '));
            if (tspan.node() && tspan.node().getComputedTextLength() > availableWidth - 50) {
                line.pop();
                tspan.text(line.join(' '));
                line = [word];
                tspan = text.append('tspan')
                    .classed(wrapConfig.labelClassName, true)
                    .attr('x', xOffset)
                    .attr('y', y+ wrapConfig.smallTextOffset)
                    .attr('dy', ++lineNumber * smallLineHeight + dy + 'em')
                    .text(word)
                    .style('font-size', smallFontSize + 'px');
            }
        }
    };

    /**
     * Wraps a selection of text within the available width, also adds class .adjust-upwards
     * to configure a y offset for entries with multiple rows
     * @param  {D3Selection} text       D3 text element
     * @param  {Number} width           Width of the container where the text needs to wrap on
     * @param  {Number} [xpos=0]        Number passed to determine the x offset
     * @param  {Number} [limit=2]       Number of lines before an ellipses is added and the rest of the text is cut off
     *
     * REF: http://bl.ocks.org/mbostock/7555321
     * More discussions on https://github.com/mbostock/d3/issues/1642
     * @return {void}
     */
    const wrapTextWithEllipses = function(text, width, xpos=0, limit=2) {
        text.each(function() {
            var words,
                word,
                line,
                lineNumber,
                lineHeight,
                y,
                dy,
                tspan;

            text = d3Selection.select(this);

            words = text.text().split(/\s+/).reverse();
            line = [];
            lineNumber = 0;
            lineHeight = 1.2;
            y = text.attr('y');
            dy = parseFloat(text.attr('dy'));
            tspan = text
                .text(null)
                .append('tspan')
                .attr('x', xpos)
                .attr('y', y)
                .attr('dy', dy + 'em');

            while ((word = words.pop())) {
                line.push(word);
                tspan.text(line.join(' '));

                if (tspan.node() && tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(' '));

                    if (lineNumber < limit - 1) {
                        line = [word];
                        tspan = text.append('tspan')
                            .attr('x', xpos)
                            .attr('y', y)
                            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                            .text(word);
                        // if we need two lines for the text, move them both up to center them
                        text.classed('adjust-upwards', true);
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
     * @param  {String} text                Text to measure
     * @param  {Number} [fontSize=12]       Font size (or default)
     * @param  {String} [fontFace='Arial']  Font family to use in the calculation (or default)
     * @return {String}                     Approximated width of the text
     */
    const getTextWidth = function(text, fontSize = defaultTextSize, fontFace = defaultFontFace) {
        let a = document.createElement('canvas'),
            b = a.getContext('2d');

        b.font = fontSize + 'px ' + fontFace;

        return b.measureText(text).width;
    }

    /**
     * Heuristic which gets the number of lines needed to display the title of the tooltip
     * If shouldShowDateInTitle is set to true, it takes the formatted Date.now() as additional influencer
     * for the approximation of the needed number of lines.
     * @param  {String}  text  Text which shall be tested for the necessary number of lines
     * @param  {Number}  fontSize  Fontsize to use for the heuristic
     * @param  {Number}  maxLength  Maximal length per line
     * @return  {Number}  approximateLineNumber  Approximative number of lines needed to display the title
     * @private
     */
    const getApproximateNumberOfLines = function(title, fontSize, maxLength) {
        const words = title.split(/\s+/).reverse();

        let line = [],
            approximateLineNumber = 1;

        for(let word of words) {
            line.push(word);

            const textWidth = getTextWidth(line.join(' '), fontSize, 'Karla, sans-serif');
            if (textWidth > maxLength) {
                line.pop();
                line = [word];
                ++approximateLineNumber;
            }
        }

        return approximateLineNumber;
    }

    return {
        getTextWidth,
        wrapText,
        wrapTextWithEllipses,
        getApproximateNumberOfLines
    };
});
