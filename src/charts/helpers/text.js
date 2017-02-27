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

    /**
     * Wraps a selection of text within the available width
     * @param  {Number} fontSize       Size of the base font
     * @param  {Number} availableWidth Width of the container where the text needs to wrap on
     * @param  {D3Selection} node      SVG text element that contains the text to wrap
     *
     * REF: http://bl.ocks.org/mbostock/7555321
     * More discussions on https://github.com/mbostock/d3/issues/1642
     * @return {void}
     */
    const wrapText = function(xOffset, fontSize, availableWidth, node, data, i) {
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
            if (tspan.node().getComputedTextLength() > availableWidth - 50) {
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
     * @param  {D3Sekectuib} text       d3 text element
     * @param  {Number} width           Width of the container where the text needs to wrap on
     * @param  {Number} xpos            number passed to determine the x offset
     * @param  {Number} limit           number of lines before an ellipses is added and the rest of the text is cut off
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

                    if (tspan.node().getComputedTextLength() > width) {
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
        }

    return {
        wrapText,
        wrapTextWithEllipses
    };
});
