import { select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';

import { grid, gridHorizontal, gridVertical } from './grid';

describe('grid helper', () => {
    let container;

    const yScale = () => scaleLinear().domain([0, 10]).range([100, 0]);
    const xScale = () => scaleLinear().domain([0, 4]).range([0, 200]);
    const lines = (selector) => container.selectAll(selector).nodes();

    beforeEach(() => {
        container = select(document.body)
            .append('svg')
            .append('g')
            .attr('class', 'grid-lines-group');
    });

    afterEach(() => {
        select(document.body).selectAll('svg').remove();
    });

    describe('gridHorizontal', () => {
        it('draws one horizontal line per tick, in a grid container', () => {
            gridHorizontal(yScale()).range([0, 200]).ticks(5)(container);

            expect(lines('g.grid.horizontal')).toHaveLength(1);
            expect(lines('line.grid-line')).toHaveLength(6);
            expect(lines('line.grid-line')[0].getAttribute('x2')).toBe('200');
        });

        it('hides the first edge when asked', () => {
            gridHorizontal(yScale())
                .range([0, 200])
                .ticks(5)
                .hideEdges('first')(container);

            expect(lines('line.grid-line')).toHaveLength(5);
        });

        it('draws no extended line by default', () => {
            gridHorizontal(yScale()).range([0, 200])(container);

            expect(lines('line.extended-x-line')).toHaveLength(0);
        });

        it('draws the extended line at the start of its own range, inset by the offset', () => {
            gridHorizontal(yScale()).range([0, 200]).extendedLine(30)(
                container
            );

            const [extended] = lines(
                'g.grid.horizontal > line.extended-x-line'
            );

            expect(extended).toBeDefined();
            expect(extended.getAttribute('x1')).toBe('30');
            expect(extended.getAttribute('x2')).toBe('200');
            expect(extended.getAttribute('y1')).toBe('100');
            expect(extended.getAttribute('y2')).toBe('100');
        });

        it('updates the extended line on re-render and removes it when set back to null', () => {
            const g = gridHorizontal(yScale()).range([0, 200]).extendedLine(0);

            g(container);
            g.range([0, 300])(container);
            expect(lines('line.extended-x-line')).toHaveLength(1);
            expect(lines('line.extended-x-line')[0].getAttribute('x2')).toBe(
                '300'
            );

            g.extendedLine(null)(container);
            expect(lines('line.extended-x-line')).toHaveLength(0);
        });

        it('highlights the line at the given tick value', () => {
            gridHorizontal(scaleLinear().domain([-5, 5]).range([100, 0]))
                .range([0, 200])
                .ticks(5)
                .highlight(0)(container);

            const highlighted = lines('line.horizontal-grid-line--highlighted');

            expect(highlighted).toHaveLength(1);
            expect(highlighted[0].__data__).toBe(0);
            expect(highlighted[0].classList.contains('grid-line')).toBe(true);
        });

        it('clears the highlight on re-render when it is set back to null', () => {
            const g = gridHorizontal(
                scaleLinear().domain([-5, 5]).range([100, 0])
            )
                .range([0, 200])
                .ticks(5)
                .highlight(0);

            g(container);
            g.highlight(null)(container);

            expect(
                lines('line.horizontal-grid-line--highlighted')
            ).toHaveLength(0);
            // d3 ticks(5) on [-5, 5] gives -4, -2, 0, 2, 4
            expect(lines('line.grid-line')).toHaveLength(5);
        });
    });

    describe('gridVertical', () => {
        it('draws vertical lines and names the extended line and highlight after its direction', () => {
            gridVertical(xScale())
                .range([0, 100])
                .ticks(4)
                .extendedLine(10)
                .highlight(0)(container);

            const [extended] = lines('g.grid.vertical > line.extended-y-line');

            expect(lines('line.grid-line').length).toBeGreaterThan(0);
            expect(extended.getAttribute('y1')).toBe('10');
            expect(extended.getAttribute('y2')).toBe('100');
            expect(extended.getAttribute('x1')).toBe('0');
            expect(extended.getAttribute('x2')).toBe('0');
            expect(lines('line.vertical-grid-line--highlighted')).toHaveLength(
                1
            );
        });

        it('centres its lines on band scales', () => {
            const band = scaleBand().domain(['a', 'b']).range([0, 100]);

            gridVertical(band).range([0, 50])(container);

            expect(lines('line.grid-line')[0].getAttribute('x1')).toBe('25');
        });
    });

    describe('grid (2D)', () => {
        it('passes extendedLine and highlight through to each direction', () => {
            const g = grid(xScale(), yScale())
                .extendedLineH(20)
                .extendedLineV(5)
                .highlightH(0)
                .highlightV(0);

            g(container);

            expect(g.extendedLineH()).toBe(20);
            expect(g.extendedLineV()).toBe(5);
            expect(g.highlightH()).toBe(0);
            expect(lines('line.extended-x-line')).toHaveLength(1);
            expect(lines('line.extended-y-line')).toHaveLength(1);
            expect(
                lines('line.horizontal-grid-line--highlighted')
            ).toHaveLength(1);
            expect(lines('line.vertical-grid-line--highlighted')).toHaveLength(
                1
            );
        });
    });
});
