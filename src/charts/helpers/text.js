define(function(require) {

    const wrapConfig = {
        lineHeight: 1.2,
        smallTextOffset: 10,
        smallTextLineHeightRatio: 0.9,
        smallTextRatio: 0.4,
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
    const wrapText = function(fontSize, availableWidth, node, data, i) {
        let text = d3.select(node),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            smallLineHeight = wrapConfig.lineHeight * wrapConfig.smallTextLineHeightRatio,
            y = text.attr('y'),
            dy = parseFloat(text.attr('dy')),
            smallFontSize = fontSize * wrapConfig.smallTextRatio,
            tspan = text.text(null).append('tspan')
                .attr('x', 0)
                .attr('y', y - 5)
                .attr('dy', dy + 'em')
                .classed(wrapConfig.valueClassName, true)
                .style('font-size', fontSize + 'px');

        tspan.text(words.pop());
        tspan = text.append('tspan')
            .classed(wrapConfig.labelClassName, true)
            .attr('x', 0)
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
                    .attr('x', 0)
                    .attr('y', y+ wrapConfig.smallTextOffset)
                    .attr('dy', ++lineNumber * smallLineHeight + dy + 'em')
                    .text(word)
                    .style('font-size', smallFontSize + 'px');
            }
        }
    };

    return {
        wrapText
    };
});
