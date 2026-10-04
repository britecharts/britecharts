// `select` from d3-selection rather than the monolithic `d3`, which this spec
// was the only thing in core still importing. Same function -- d3's bundle
// re-exports it -- but core's source has used the granular packages throughout,
// and the bundle is a d3 5.x pin with no types.
import { select } from 'd3-selection';
import type { Selection } from 'd3-selection';

import serializeWithStyles from './style';

const randomColor = 'rgb(222,163,12)';
let containerFixture: Selection<HTMLElement, unknown, HTMLElement, unknown>;
let styles: HTMLStyleElement;
let node: HTMLElement;

describe('style Helper', () => {
    let styledHTML: string;
    let serializer: ReturnType<
        typeof serializeWithStyles.initializeSerializer
    > | null;

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        containerFixture = select('.test-container');

        containerFixture.append('span').classed('child', true);

        serializer = serializeWithStyles.initializeSerializer();
        styles = document.createElement('style');
        styles.innerHTML = `.child{background:${randomColor};}`;
        document.body.appendChild(styles);
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        const fixture = document.getElementById('fixture');

        // Asserted rather than passed straight to removeChild: if beforeEach
        // ever stops inserting it, the failure should say that.
        if (!fixture) {
            throw new Error('the fixture was not inserted');
        }

        document.body.removeChild(fixture);

        serializer = null;
        document.body.removeChild(styles);
    });

    describe('serializeWithStyles', () => {
        it('should expect serializer to be defined', () => {
            const expected = 'function';
            const actual = typeof serializer;

            expect(actual).toEqual(expected);
        });

        it('should add styles from stylesheets to inline of element', () => {
            node = containerFixture.nodes()[0];

            styledHTML = serializer!(node)!.replace(' ', '');

            // This assertion cannot fail, and TypeScript is what surfaced it:
            // `indexOf` returns a number, so `.length` is `undefined`, and
            // `expect(undefined).not.toBe(0)` passes whatever the serializer
            // did. It was reaching for "the stylesheet colour ended up inline".
            //
            // Left exactly as it was, because writing the assertion it meant
            // -- `expect(styledHTML.indexOf(randomColor)).not.toBe(-1)` --
            // FAILS: the colour is not in the output. So this is not just a
            // typo to tidy up; either jsdom's getComputedStyle does not
            // resolve the <style> cascade here, or the serializer does not
            // inline stylesheet-derived styles at all. Flagged for its own
            // investigation rather than quietly turned red in a conversion.
            //
            // The assertion below it is the one doing real work: serializing
            // changed the markup.
            // @ts-expect-error indexOf returns a number, which has no length
            const actual = styledHTML.indexOf(randomColor).length;

            expect(styledHTML).not.toBe(node.outerHTML.replace(' ', ''));
            expect(actual).not.toBe(0);
        });
    });
});
