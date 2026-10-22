import { select } from 'd3-selection';
import { easeLinear } from 'd3-ease';

import { bounceCircleHighlight } from './filter';

describe('filter helpers', () => {
    describe('bounceCircleHighlight', () => {
        // Partway through the bounce's first half, which takes 100 ms
        const partway = () => new Promise((resolve) => setTimeout(resolve, 60));
        const circle = () =>
            select<SVGCircleElement, unknown>('#fixture circle');

        beforeEach(() => {
            document.body.insertAdjacentHTML(
                'afterbegin',
                '<div id="fixture"><svg><circle r="5"></circle></svg></div>'
            );
        });

        afterEach(() => {
            vi.unstubAllGlobals();
            document.getElementById('fixture')?.remove();
        });

        it('should grow the point while it bounces', () => {
            vi.stubGlobal('matchMedia', () => ({ matches: false }));

            bounceCircleHighlight(circle(), easeLinear, 5);

            return partway().then(() => {
                expect(Number(circle().attr('r'))).toBeGreaterThan(5);
            });
        });

        it('should leave the point as it is when the reader prefers reduced motion', () => {
            vi.stubGlobal('matchMedia', () => ({ matches: true }));

            bounceCircleHighlight(circle(), easeLinear, 5);

            return partway().then(() => {
                expect(Number(circle().attr('r'))).toBe(5);
            });
        });
    });
});
