// d3-selection rather than the monolithic `d3`, matching the rest of core.
import { select, selectAll } from 'd3-selection';
import type { Selection } from 'd3-selection';

import { wrapText, getApproximateNumberOfLines } from './text';

let containerFixture: Selection<HTMLElement, unknown, HTMLElement, unknown>;

describe('text Helper', () => {
    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        containerFixture = select('.test-container');
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        const fixture = document.getElementById('fixture');

        // Asserted rather than passed straight through: if beforeEach ever
        // stops inserting it, the failure should say so.
        if (!fixture) {
            throw new Error('the fixture was not inserted');
        }

        document.body.removeChild(fixture);
    });

    describe('when the text element carries a y', () => {
        // `attr('y')` hands back a string, and wrapText derives two offsets
        // from it. Untouched, `y - 5` subtracted numerically while
        // `y + smallTextOffset` concatenated, so '100' produced a label at
        // y='10010' instead of y=110.
        it('should offset the label numerically rather than concatenating', () => {
            const textNode = select('.test-container')
                .append('svg')
                .append('text')
                .attr('y', 100)
                .attr('dy', '.2em')
                .text('brilliant dazzling flashing')
                .node();

            wrapText(0, 20, 200, textNode);

            const label = select('.test-container .label');

            expect(label.attr('y')).toEqual('110');
        });

        it('should offset the value numerically too', () => {
            const textNode = select('.test-container')
                .append('svg')
                .append('text')
                .attr('y', 100)
                .attr('dy', '.2em')
                .text('brilliant dazzling')
                .node();

            wrapText(0, 20, 200, textNode);

            expect(select('.test-container .value').attr('y')).toEqual('95');
        });
    });

    describe('when the text element has no dy', () => {
        // parseFloat(null) is NaN, and `NaN + 'em'` is the string 'NaNem',
        // which is not a length an SVG renderer can use.
        it('should write a usable dy', () => {
            const textNode = select('.test-container')
                .append('svg')
                .append('text')
                .text('brilliant dazzling')
                .node();

            wrapText(0, 20, 200, textNode);

            const dy = select('.test-container .value').attr('dy');

            expect(dy).not.toContain('NaN');
            expect(dy).toEqual('0em');
        });
    });

    it('should wrap the text in X lines', () => {
        const expectedText = 'brilliant dazzling flashing';
        const fontSize = 20;
        const availableWidth = 20;
        const xOffset = 0;
        const expectedLabelCount = 3;
        const expectedValueCount = 1;
        const textNode = select('.test-container')
            .append('svg')
            .append('text')
            .attr('dy', '.2em')
            .text(expectedText)
            .node();

        wrapText.call(null, xOffset, fontSize, availableWidth, textNode);

        const actualValueCount = selectAll('.test-container .value').size();
        const actualLabelCount = selectAll('.test-container .label').size();

        expect(actualValueCount).toEqual(expectedValueCount);
        expect(actualLabelCount).toEqual(expectedLabelCount);
    });

    it.skip('should calculate the number of necessary lines to render the text', () => {
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
