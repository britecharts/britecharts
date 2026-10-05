import { measureFrame, originOf } from './frame';

// The frame is read from transform attributes, which jsdom keeps like any
// other attribute; the same code runs in the browser, where the hover pages
// in packages/integration check it against real geometry.
const buildFixture = (svgAttributes = 'width="600" height="300"') => `
    <div id="fixture">
        <svg class="chart" ${svgAttributes}>
            <g class="container-group" transform="translate(70,60)">
                <g class="chart-group"></g>
                <g class="metadata-group">
                    <g class="hover-marker" transform="translate(120, 0)">
                        <g class="tooltip"></g>
                    </g>
                </g>
            </g>
        </svg>
    </div>`;

/**
 * The element at `selector`, or a failure that says which one was missing.
 * `querySelector` is nullable, and a spec that reads a node the fixture should
 * have is better off failing by name than on `null.setAttribute`.
 */
const required = (selector: string): Element => {
    const node = document.querySelector(selector);

    if (!node) {
        throw new Error(`the fixture has no ${selector}`);
    }

    return node;
};

describe('tooltip frame', () => {
    afterEach(() => {
        document.body.removeChild(required('#fixture'));
    });

    describe('originOf', () => {
        beforeEach(() => {
            document.body.insertAdjacentHTML('afterbegin', buildFixture());
        });

        it('sums the translations above a node', () => {
            const node = document.querySelector('.tooltip');

            expect(originOf(node)).toEqual([190, 60]);
        });

        it('includes a node with no transform of its own', () => {
            const node = document.querySelector('.metadata-group');

            expect(originOf(node)).toEqual([70, 60]);
        });

        it('places the root svg at the origin', () => {
            const node = document.querySelector('svg');

            expect(originOf(node)).toEqual([0, 0]);
        });

        it('places anything outside an svg at the origin', () => {
            const node = document.getElementById('fixture');

            expect(originOf(node)).toEqual([0, 0]);
        });

        it('reads a single-value translate as a horizontal offset', () => {
            const node = required('.hover-marker');

            node.setAttribute('transform', 'translate(33)');

            expect(originOf(node)).toEqual([103, 60]);
        });

        it('ignores transforms that are not translations', () => {
            const node = required('.hover-marker');

            node.setAttribute('transform', 'scale(2)');

            expect(originOf(node)).toEqual([70, 60]);
        });
    });

    describe('measureFrame', () => {
        it('reads the root svg size and the node origin', () => {
            document.body.insertAdjacentHTML('afterbegin', buildFixture());

            const frame = measureFrame(document.querySelector('.tooltip'));

            expect(frame).toEqual({
                width: 600,
                height: 300,
                origin: [190, 60],
            });
        });

        it('is unbounded when the svg has no size attributes', () => {
            document.body.insertAdjacentHTML('afterbegin', buildFixture(''));

            const frame = measureFrame(document.querySelector('.tooltip'));

            expect(frame.width).toEqual(Infinity);
            expect(frame.height).toEqual(Infinity);
        });

        it('measures the root svg itself', () => {
            document.body.insertAdjacentHTML('afterbegin', buildFixture());

            const frame = measureFrame(document.querySelector('svg'));

            expect(frame).toEqual({ width: 600, height: 300, origin: [0, 0] });
        });
    });
});
