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
            gridHorizontal(yScale()).range([0, 200]).ticks(5).hideEdges(false)(
                container
            );

            expect(lines('g.grid.horizontal')).toHaveLength(1);
            expect(lines('line.grid-line')).toHaveLength(6);
            expect(lines('line.grid-line')[0].getAttribute('x2')).toBe('200');
        });

        it('hides the first edge by default', () => {
            // Every grid construction in the charts passes 'first', so that is
            // the default. The tests above pin `hideEdges(false)` precisely so
            // they keep testing what they are about rather than this.
            gridHorizontal(yScale()).range([0, 200]).ticks(5)(container);

            expect(lines('line.grid-line')).toHaveLength(5);
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
                .hideEdges(false)
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

    describe('accessors', () => {
        // The runtime half of what `GridBaseGenerator`'s overloads declare.
        // Every chart that draws a grid chains its setters, and reading one
        // back has to give the value rather than the generator -- which is the
        // contract the single-signature typing described wrongly, and which
        // nothing here pinned before.
        it('returns the generator from every setter, so the calls chain', () => {
            const generator = gridHorizontal(yScale());

            expect(generator.range([0, 200])).toBe(generator);
            expect(generator.ticks(5)).toBe(generator);
            expect(generator.hideEdges('first')).toBe(generator);
            expect(generator.offsetStart(2)).toBe(generator);
            expect(generator.offsetEnd(3)).toBe(generator);
            expect(generator.extendedLine(10)).toBe(generator);
            expect(generator.highlight(4)).toBe(generator);
            expect(generator.tickValues([1, 2])).toBe(generator);
        });

        it('reads each value back rather than the generator', () => {
            const scale = yScale();
            const generator = gridHorizontal(scale)
                .range([0, 200])
                .ticks(5)
                .hideEdges('last')
                .offsetStart(2)
                .offsetEnd(3)
                .extendedLine(10)
                .highlight(4);

            expect(generator.scale()).toBe(scale);
            expect(generator.range()).toEqual([0, 200]);
            expect(generator.ticks()).toBe(5);
            expect(generator.hideEdges()).toBe('last');
            expect(generator.offsetStart()).toBe(2);
            expect(generator.offsetEnd()).toBe(3);
            expect(generator.extendedLine()).toBe(10);
            expect(generator.highlight()).toBe(4);
        });

        it('starts ticks, tickValues, extendedLine and highlight at null', () => {
            const generator = gridHorizontal(yScale());

            expect(generator.ticks()).toBeNull();
            expect(generator.tickValues()).toBeNull();
            expect(generator.extendedLine()).toBeNull();
            expect(generator.highlight()).toBeNull();
        });

        it('copies the tick values it hands back, and clears them on null', () => {
            const generator = gridHorizontal(yScale()).tickValues([1, 2]);
            const read = generator.tickValues();

            read.push(3);

            expect(generator.tickValues()).toEqual([1, 2]);
            expect(generator.tickValues(null).tickValues()).toBeNull();
        });
    });

    describe('gridVertical', () => {
        it('draws vertical lines and names the extended line and highlight after its direction', () => {
            gridVertical(xScale())
                .range([0, 100])
                .ticks(4)
                .hideEdges(false)
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

            gridVertical(band).range([0, 50]).hideEdges(false)(container);

            expect(lines('line.grid-line')[0].getAttribute('x1')).toBe('25');
        });
    });

    describe('grid (2D)', () => {
        it('passes extendedLine and highlight through to each direction', () => {
            const g = grid(xScale(), yScale())
                .hideEdges(false)
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
