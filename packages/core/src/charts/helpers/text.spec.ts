// d3-selection rather than the monolithic `d3`, matching the rest of core.
import { select, selectAll } from 'd3-selection';
import type { Selection } from 'd3-selection';

import {
    wrapText,
    wrapTextWithEllipses,
    getApproximateNumberOfLines,
} from './text';

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

    describe('when the text element carries a dy with a unit', () => {
        // This is the shape donut actually passes: drawLegend sets
        // `.donut-text`'s dy to '.2em' and calls wrapText on the next line.
        // `Number('.2em')` is NaN, so every tspan came out with dy='NaNem',
        // which a browser rejects outright -- the tspans never positioned.
        // The specs above already set this dy and only ever asserted on `y`,
        // which is why nothing here caught it; the browser tests did.
        it('should keep the dy a usable length', () => {
            const textNode = select('.test-container')
                .append('svg')
                .append('text')
                .attr('y', 100)
                .attr('dy', '.2em')
                .text('brilliant dazzling flashing')
                .node();

            wrapText(0, 20, 200, textNode);

            const valueDy = select('.test-container .value').attr('dy');
            const labelDy = select('.test-container .label').attr('dy');

            expect(valueDy).toEqual('0.2em');
            // The label sits a line below, so its dy is the unit the element
            // carried plus one small line height -- the point being that the
            // element's own dy is read, not discarded and not turned into NaN.
            expect(labelDy).not.toContain('NaN');
            expect(parseFloat(labelDy!)).toBeCloseTo(1.28);
        });

        it('should keep the dy a usable length when adding ellipses', () => {
            const text = select('.test-container')
                .append('svg')
                .append('text')
                .attr('dy', '.2em')
                .text('brilliant dazzling flashing shimmering radiant');

            wrapTextWithEllipses(text, 20);

            const dy = select('.test-container tspan').attr('dy');

            expect(dy).not.toContain('NaN');
            expect(dy).toEqual('0.2em');
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
