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

            // A global regex, not `replace(' ', '')`. With a string pattern
            // `replace` swaps only the FIRST match, so the computed
            // 'rgb(222, 163, 12)' normalised to 'rgb(222,163, 12)' -- one
            // space short of `randomColor` -- and the colour could never be
            // found no matter what the serializer did.
            //
            // `replaceAll` would say this more plainly but is ES2021, and this
            // repo's lib is ES2020 (es-check holds the bundles to ES11).
            styledHTML = serializer!(node)!.replace(/ /g, '');

            expect(styledHTML).not.toBe(node.outerHTML.replace(/ /g, ''));
            // This is what the spec was reaching for and never asserted: the
            // colour that only existed in a stylesheet is now inline.
            //
            // It used to read `styledHTML.indexOf(randomColor).length` and
            // compare that to 0 -- `indexOf` returns a number, so `.length`
            // was `undefined`, and `expect(undefined).not.toBe(0)` passed
            // however the serializer behaved. TypeScript is what surfaced it.
            expect(styledHTML).toContain(randomColor);
        });
    });
});
