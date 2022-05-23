import * as d3 from 'd3';

import { wrapText, getApproximateNumberOfLines } from './text';

let containerFixture;

describe('text Helper', () => {
    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        containerFixture = d3.select('.test-container');
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    it('should wrap the text in X lines', () => {
        const expectedText = 'brilliant dazzling flashing';
        const fontSize = 20;
        const availableWidth = 20;
        const xOffset = 0;
        const expectedLabelCount = 3;
        const expectedValueCount = 1;
        const textNode = d3
            .select('.test-container')
            .append('svg')
            .append('text')
            .attr('dy', '.2em')
            .text(expectedText)
            .node();

        wrapText.call(null, xOffset, fontSize, availableWidth, textNode);

        const actualValueCount = d3.selectAll('.test-container .value').size();
        const actualLabelCount = d3.selectAll('.test-container .label').size();

        expect(actualValueCount).toEqual(expectedValueCount);
        expect(actualLabelCount).toEqual(expectedLabelCount);
    });

    it('should calculate the number of necessary lines to render the text', () => {
        const text = 'This is a super long text';
        const fontSize = 16;
        const availableWidth = 150;
        const expectedNumberOfLines = 2;

        const actualNumberOfLines = getApproximateNumberOfLines(
            text,
            fontSize,
            availableWidth
        );

        expect(actualNumberOfLines).toEqual(expectedNumberOfLines);
    });
});
