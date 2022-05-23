import * as d3 from 'd3';

import serializeWithStyles from './style';

const randomColor = 'rgb(222,163,12)';
let containerFixture, styles, node;

describe('style Helper', () => {
    let styledHTML, serializer;

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        containerFixture = d3.select('.test-container');

        containerFixture.append('span').classed('child', true);

        serializer = serializeWithStyles.initializeSerializer();
        styles = document.createElement('style');
        styles.innerHTML = `.child{background:${randomColor};}`;
        document.body.appendChild(styles);
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));

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
            let actual;

            node = containerFixture.nodes()[0];

            styledHTML = serializer(node).replace(' ', '');
            actual = styledHTML.indexOf(randomColor).length;

            expect(styledHTML).not.toBe(node.outerHTML.replace(' ', ''));
            expect(actual).not.toBe(0);
        });
    });
});
