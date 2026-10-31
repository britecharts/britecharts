import { select } from 'd3-selection';
import { scaleBand, scaleLinear, scalePoint, scaleTime } from 'd3-scale';
// grid.ts only imports d3-transition's types, so nothing else patches
// `selection.transition` in this file.
import 'd3-transition';

import { grid, gridHorizontal, gridVertical } from './grid';

describe('grid helper', () => {
    let container;

    const yScale = () => scaleLinear().domain([0, 10]).range([100, 0]);
    const xScale = () => scaleLinear().domain([0, 4]).range([0, 200]);
    const lines = (selector) => container.selectAll(selector).nodes();
    const attrs = (selector, name) =>
        lines(selector).map((node) => node.getAttribute(name));
    const lineAt = (value) =>
        lines('line.grid-line').find((node) => node.__data__ === value);

    const H_LINES = 'g.grid.horizontal line.grid-line';
    const V_LINES = 'g.grid.vertical line.grid-line';

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

        it('places each line on its tick, half a pixel in, at full opacity', () => {
            gridHorizontal(yScale())
                .range([0, 200])
                .tickValues([2, 5])
                .hideEdges(false)(container);

            expect(attrs('line.grid-line', 'y1')).toEqual(['80.5', '50.5']);
            expect(attrs('line.grid-line', 'y2')).toEqual(['80.5', '50.5']);
            expect(attrs('line.grid-line', 'x1')).toEqual(['0', '0']);
            expect(attrs('line.grid-line', 'opacity')).toEqual(['1', '1']);
        });

        it('uses the default ticks of the scale until a count is set', () => {
            const g = gridHorizontal(yScale()).range([0, 200]).hideEdges(false);

            g(container);
            expect(lines('line.grid-line')).toHaveLength(11);

            g.ticks(2)(container);
            expect(lines('line.grid-line')).toHaveLength(3);
        });

        it('draws no lines with a tick count of 0, as a d3 axis does', () => {
            const g = gridHorizontal(yScale()).range([0, 200]).hideEdges(false);

            g.ticks(0)(container);

            expect(g.ticks()).toBe(0);
            expect(lines('line.grid-line')).toHaveLength(0);
        });

        it('removes the lines when the tick count goes to 0, keeping the extended line', () => {
            const g = gridHorizontal(yScale())
                .range([0, 200])
                .ticks(5)
                .hideEdges(false)
                .extendedLine(0);

            g(container);
            g.ticks(0)(container);

            expect(lines('line.grid-line')).toHaveLength(0);
            expect(lines('line.extended-x-line')).toHaveLength(1);
        });

        it('uses the default ticks of the scale when the count is undefined', () => {
            gridHorizontal(yScale())
                .range([0, 200])
                .hideEdges(false)
                .ticks(undefined)(container);

            expect(lines('line.grid-line')).toHaveLength(11);
        });

        it('goes back to the ticks of the scale when the tick values are cleared', () => {
            const g = gridHorizontal(yScale())
                .range([0, 200])
                .ticks(5)
                .hideEdges(false)
                .tickValues([5]);

            g(container);
            expect(lines('line.grid-line')).toHaveLength(1);

            g.tickValues(null)(container);
            expect(lines('line.grid-line')).toHaveLength(6);
        });

        it('keeps its own copy of the tick values it is given', () => {
            const values = [2, 4];
            const g = gridHorizontal(yScale())
                .range([0, 200])
                .hideEdges(false)
                .tickValues(values);

            values.push(6);
            g(container);

            expect(lines('line.grid-line')).toHaveLength(2);
        });

        describe('when edges are hidden', () => {
            const edges = (hideEdges) => {
                gridHorizontal(scaleLinear().domain([0, 4]).range([100, 0]))
                    .range([0, 200])
                    .ticks(4)
                    .hideEdges(hideEdges)(container);

                return attrs('line.grid-line', 'y1');
            };

            it('keeps both edges with false', () => {
                expect(edges(false)).toEqual([
                    '100.5',
                    '75.5',
                    '50.5',
                    '25.5',
                    '0.5',
                ]);
            });

            it('drops only the last tick with last', () => {
                expect(edges('last')).toEqual([
                    '100.5',
                    '75.5',
                    '50.5',
                    '25.5',
                ]);
            });

            it('drops only the first tick with first', () => {
                expect(edges('first')).toEqual(['75.5', '50.5', '25.5', '0.5']);
            });

            it('drops both ticks with both', () => {
                expect(edges('both')).toEqual(['75.5', '50.5', '25.5']);
            });

            it('drops both ticks with true', () => {
                expect(edges(true)).toEqual(['75.5', '50.5', '25.5']);
            });

            it('applies to explicit tick values without consuming them', () => {
                const g = gridHorizontal(yScale())
                    .range([0, 200])
                    .tickValues([2, 4, 6])
                    .hideEdges('both');

                g(container);
                g(container);

                expect(attrs('line.grid-line', 'y1')).toEqual(['60.5']);
                expect(g.tickValues()).toEqual([2, 4, 6]);
            });
        });

        describe('when offsets are set', () => {
            it('extends the lines past both ends of the range', () => {
                gridHorizontal(yScale())
                    .range([0, 200])
                    .tickValues([5])
                    .hideEdges(false)
                    .offsetStart(5)
                    .offsetEnd(7)(container);

                expect(attrs('line.grid-line', 'x1')).toEqual(['-5']);
                expect(attrs('line.grid-line', 'x2')).toEqual(['207']);
            });

            it('extends them outwards on an inverted range too', () => {
                gridHorizontal(yScale())
                    .range([200, 0])
                    .tickValues([5])
                    .hideEdges(false)
                    .offsetStart(5)
                    .offsetEnd(7)(container);

                expect(attrs('line.grid-line', 'x1')).toEqual(['205']);
                expect(attrs('line.grid-line', 'x2')).toEqual(['-7']);
            });

            it('insets the extended line inwards on an inverted range', () => {
                gridHorizontal(yScale()).range([200, 0]).extendedLine(30)(
                    container
                );

                expect(attrs('line.extended-x-line', 'x1')).toEqual(['170']);
                expect(attrs('line.extended-x-line', 'x2')).toEqual(['0']);
            });
        });

        describe('when it renders again', () => {
            it('keeps one container and redraws the lines for the new scale', () => {
                const g = gridHorizontal(yScale())
                    .range([0, 200])
                    .ticks(5)
                    .hideEdges(false);

                g(container);
                expect(lines('line.grid-line')).toHaveLength(6);

                g.scale(scaleLinear().domain([0, 4]).range([100, 0]))(
                    container
                );

                expect(lines('g.grid.horizontal')).toHaveLength(1);
                expect(attrs('line.grid-line', 'y1')).toEqual([
                    '100.5',
                    '75.5',
                    '50.5',
                    '25.5',
                    '0.5',
                ]);
            });

            it('moves a highlight to a different tick', () => {
                const g = gridHorizontal(yScale())
                    .range([0, 200])
                    .tickValues([2, 4])
                    .hideEdges(false)
                    .highlight(2);

                g(container);
                g.highlight(4)(container);

                const highlighted = lines(
                    'line.horizontal-grid-line--highlighted'
                );

                expect(highlighted).toHaveLength(1);
                expect(highlighted[0].getAttribute('y1')).toBe('60.5');
            });
        });
    });

    describe('accessors', () => {
        // The runtime half of what `GridBaseGenerator`'s overloads declare.
        // Every chart that draws a grid chains its setters, and reading one
        // back has to give the value rather than the generator.
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

        it('spans the range along y and sits on the tick along x', () => {
            gridVertical(xScale())
                .range([0, 100])
                .tickValues([1, 3])
                .hideEdges(false)
                .offsetStart(5)
                .offsetEnd(7)(container);

            expect(attrs('line.grid-line', 'x1')).toEqual(['50.5', '150.5']);
            expect(attrs('line.grid-line', 'x2')).toEqual(['50.5', '150.5']);
            expect(attrs('line.grid-line', 'y1')).toEqual(['-5', '-5']);
            expect(attrs('line.grid-line', 'y2')).toEqual(['107', '107']);
        });

        it('places lines by date on a time scale', () => {
            const start = new Date(Date.UTC(2020, 0, 1));
            const middle = new Date(Date.UTC(2020, 0, 2));
            const end = new Date(Date.UTC(2020, 0, 3));
            const time = scaleTime().domain([start, end]).range([0, 100]);

            gridVertical(time)
                .range([0, 50])
                .tickValues([middle])
                .hideEdges(false)(container);

            expect(attrs('line.grid-line', 'x1')).toEqual(['50.5']);
        });

        describe('when the ticks are dates', () => {
            const time = () =>
                scaleTime()
                    .domain([
                        new Date(Date.UTC(2020, 0, 1)),
                        new Date(Date.UTC(2020, 0, 11)),
                    ])
                    .range([0, 100]);

            it('highlights the tick at an equal date, which is never the same object', () => {
                const scale = time();
                const tick = scale.ticks()[2];

                gridVertical(scale)
                    .range([0, 50])
                    .hideEdges(false)
                    .highlight(new Date(tick.getTime()))(container);

                const highlighted = lines(
                    'line.vertical-grid-line--highlighted'
                );

                expect(highlighted).toHaveLength(1);
                expect(highlighted[0].__data__.getTime()).toBe(tick.getTime());
            });

            it('highlights nothing when no tick falls on the date', () => {
                const scale = time();

                gridVertical(scale)
                    .range([0, 50])
                    .hideEdges(false)
                    .highlight(new Date(scale.ticks()[2].getTime() + 1))(
                    container
                );

                expect(
                    lines('line.vertical-grid-line--highlighted')
                ).toHaveLength(0);
            });

            it('draws no lines with a tick count of 0', () => {
                gridVertical(time()).range([0, 50]).hideEdges(false).ticks(0)(
                    container
                );

                expect(lines('line.grid-line')).toHaveLength(0);
            });
        });

        it('highlights a band by its name', () => {
            const band = scaleBand().domain(['a', 'b']).range([0, 100]);

            gridVertical(band).range([0, 50]).hideEdges(false).highlight('b')(
                container
            );

            const highlighted = lines('line.vertical-grid-line--highlighted');

            expect(highlighted).toHaveLength(1);
            expect(highlighted[0].__data__).toBe('b');
        });

        describe('when the scale has no ticks', () => {
            it('draws one line per domain value, ignoring the tick count', () => {
                const band = scaleBand().domain(['a', 'b', 'c']).range([0, 90]);

                gridVertical(band).range([0, 50]).ticks(10).hideEdges(false)(
                    container
                );

                expect(attrs('line.grid-line', 'x1')).toEqual([
                    '15',
                    '45',
                    '75',
                ]);
            });

            it('rounds the centre of a rounded band scale', () => {
                const band = scaleBand()
                    .domain(['a', 'b'])
                    .range([0, 100])
                    .round(true);

                gridVertical(band).range([0, 50]).hideEdges(false)(container);

                expect(attrs('line.grid-line', 'x1')).toEqual(['25.5', '75.5']);
            });

            it('sits on the points of a point scale, which have no width', () => {
                const point = scalePoint()
                    .domain(['a', 'b', 'c'])
                    .range([0, 100]);

                gridVertical(point).range([0, 50]).hideEdges(false)(container);

                expect(attrs('line.grid-line', 'x1')).toEqual([
                    '0.5',
                    '50.5',
                    '100.5',
                ]);
            });
        });
    });

    describe('when called on a transition', () => {
        const FADED_OUT = '0.000001';
        const animate = () => container.transition().duration(0);

        it('fades new lines in on the first render, from their own position', async () => {
            const transition = animate();

            gridHorizontal(yScale())
                .range([0, 200])
                .tickValues([2, 5])
                .hideEdges(false)(transition);

            expect(attrs('line.grid-line', 'opacity')).toEqual([
                FADED_OUT,
                FADED_OUT,
            ]);
            expect(attrs('line.grid-line', 'y1')).toEqual(['80.5', '50.5']);

            await transition.end();

            expect(attrs('line.grid-line', 'opacity')).toEqual(['1', '1']);
            expect(attrs('line.grid-line', 'y2')).toEqual(['80.5', '50.5']);
            expect(attrs('line.grid-line', 'x2')).toEqual(['200', '200']);
        });

        it('moves lines that stay to their new position', async () => {
            const scale = yScale();
            const g = gridHorizontal(scale)
                .range([0, 200])
                .tickValues([5])
                .hideEdges(false);
            const transition = animate();

            g(container);
            const staying = lineAt(5);

            scale.domain([0, 20]);
            g(transition);

            expect(staying.getAttribute('y1')).toBe('50.5');

            await transition.end();

            expect(lineAt(5)).toBe(staying);
            expect(staying.getAttribute('y1')).toBe('75.5');
        });

        it('starts entering lines from where the previous scale had them', async () => {
            const scale = yScale();
            const g = gridHorizontal(scale)
                .range([0, 200])
                .tickValues([5])
                .hideEdges(false);
            const transition = animate();

            g(container);

            // Mutating the scale in place: the previous position has to come
            // from the copy the grid kept, not from the scale it was given.
            scale.domain([0, 20]);
            g.tickValues([5, 15])(transition);

            expect(lineAt(15).getAttribute('y1')).toBe('-49.5');
            expect(lineAt(15).getAttribute('y2')).toBe('-49.5');

            await transition.end();

            expect(lineAt(15).getAttribute('y1')).toBe('25.5');
            expect(lineAt(15).getAttribute('opacity')).toBe('1');
        });

        it('starts entering lines at their new position when the previous scale cannot place them', async () => {
            const band = scaleBand().domain(['a', 'b']).range([0, 90]);
            const g = gridVertical(band).range([0, 50]).hideEdges(false);
            const transition = animate();

            g(container);

            band.domain(['a', 'b', 'c']);
            g(transition);

            expect(lineAt('c').getAttribute('x1')).toBe('75');
            expect(lineAt('c').getAttribute('x2')).toBe('75');
            expect(lineAt('c').getAttribute('opacity')).toBe(FADED_OUT);

            await transition.end();
        });

        it('slides exiting lines to their new position, fades them and removes them', async () => {
            const scale = yScale();
            const g = gridHorizontal(scale)
                .range([0, 200])
                .tickValues([2, 8])
                .hideEdges(false);
            const transition = animate();

            g(container);
            const exiting = lineAt(8);

            scale.domain([0, 20]);
            g.tickValues([2])(transition);

            expect(lines('line.grid-line')).toHaveLength(2);

            await transition.end();

            expect(lines('line.grid-line')).toHaveLength(1);
            expect(exiting.isConnected).toBe(false);
            expect(exiting.getAttribute('opacity')).toBe(FADED_OUT);
            expect(exiting.getAttribute('y1')).toBe('60.5');
            expect(exiting.getAttribute('y2')).toBe('60.5');
        });

        it('leaves exiting lines in place when the new scale cannot place them', async () => {
            const band = scaleBand().domain(['a', 'b']).range([0, 100]);
            const g = gridVertical(band).range([0, 50]).hideEdges(false);
            const transition = animate();

            g(container);
            const exiting = lineAt('b');

            band.domain(['a']);
            g(transition);

            await transition.end();

            expect(exiting.isConnected).toBe(false);
            expect(exiting.getAttribute('x1')).toBe('75');
            expect(exiting.getAttribute('x2')).toBe('75');
        });

        it('animates both directions of the 2D grid', async () => {
            const transition = animate();

            grid(xScale(), yScale()).ticks(4).hideEdges(false)(transition);

            expect(attrs(H_LINES, 'opacity')).toContain(FADED_OUT);
            expect(attrs(V_LINES, 'opacity')).toContain(FADED_OUT);

            await transition.end();

            expect(attrs(H_LINES, 'opacity')).not.toContain(FADED_OUT);
            expect(attrs(V_LINES, 'opacity')).not.toContain(FADED_OUT);
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

        it('reads the vertical highlight back on its own', () => {
            const g = grid(xScale(), yScale()).highlightH(1).highlightV(2);

            expect(g.highlightH()).toBe(1);
            expect(g.highlightV()).toBe(2);
        });

        it('returns the generator from every setter, so the calls chain', () => {
            const g = grid(xScale(), yScale());

            expect(g.scaleX(xScale())).toBe(g);
            expect(g.scaleY(yScale())).toBe(g);
            expect(g.direction('full')).toBe(g);
            expect(g.offsetStart(1)).toBe(g);
            expect(g.offsetStartH(1)).toBe(g);
            expect(g.offsetStartV(1)).toBe(g);
            expect(g.offsetEnd(1)).toBe(g);
            expect(g.offsetEndH(1)).toBe(g);
            expect(g.offsetEndV(1)).toBe(g);
            expect(g.hideEdges(false)).toBe(g);
            expect(g.hideEdgesH(false)).toBe(g);
            expect(g.hideEdgesV(false)).toBe(g);
            expect(g.ticks(1)).toBe(g);
            expect(g.ticksH(1)).toBe(g);
            expect(g.ticksV(1)).toBe(g);
            expect(g.tickValues([1])).toBe(g);
            expect(g.tickValuesH([1])).toBe(g);
            expect(g.tickValuesV([1])).toBe(g);
            expect(g.extendedLineH(1)).toBe(g);
            expect(g.extendedLineV(1)).toBe(g);
            expect(g.highlightH(1)).toBe(g);
            expect(g.highlightV(1)).toBe(g);
        });

        it('spans each direction across the range of the other scale', () => {
            grid(xScale(), yScale()).tickValues([1]).hideEdges(false)(
                container
            );

            expect(attrs(H_LINES, 'x1')).toEqual(['0']);
            expect(attrs(H_LINES, 'x2')).toEqual(['200']);
            expect(attrs(V_LINES, 'y1')).toEqual(['100']);
            expect(attrs(V_LINES, 'y2')).toEqual(['0']);
        });

        describe('scales', () => {
            it('reads back the scales it was built with', () => {
                const x = xScale();
                const y = yScale();
                const g = grid(x, y);

                expect(g.scaleX()).toBe(x);
                expect(g.scaleY()).toBe(y);
            });

            it('can be built empty and given its scales before drawing', () => {
                const g = grid()
                    .scaleX(xScale())
                    .scaleY(yScale())
                    .tickValues([1])
                    .hideEdges(false);

                g(container);

                expect(attrs(H_LINES, 'y1')).toEqual(['90.5']);
                expect(attrs(H_LINES, 'x2')).toEqual(['200']);
                expect(attrs(V_LINES, 'x1')).toEqual(['50.5']);
                expect(attrs(V_LINES, 'y1')).toEqual(['100']);
            });

            it('draws with default linear scales when built with none', () => {
                grid().hideEdges(false)(container);

                expect(lines(H_LINES)).toHaveLength(11);
                expect(lines(V_LINES)).toHaveLength(11);
                expect(attrs(H_LINES, 'x2')[0]).toBe('1');
                expect(attrs(V_LINES, 'y2')[0]).toBe('1');
            });

            it('reads back the default scales it draws with', () => {
                const g = grid().tickValues([1]).hideEdges(false);

                g.scaleX().domain([0, 4]).range([0, 200]);
                g.scaleY().domain([0, 10]).range([100, 0]);
                g(container);

                expect(attrs(V_LINES, 'x1')).toEqual(['50.5']);
                expect(attrs(H_LINES, 'x2')).toEqual(['200']);
                expect(attrs(H_LINES, 'y1')).toEqual(['90.5']);
                expect(attrs(V_LINES, 'y1')).toEqual(['100']);
            });

            it('falls back on the scale it is missing when given only one', () => {
                const x = xScale();

                grid(x).tickValues([1]).hideEdges(false)(container);
                expect(attrs(V_LINES, 'x1')).toEqual(['50.5']);
                expect(attrs(V_LINES, 'y2')).toEqual(['1']);
            });

            it('falls back on a default scale for a null one too', () => {
                const g = grid(null, yScale()).tickValues([1]).hideEdges(false);

                g(container);

                expect(g.scaleX().range()).toEqual([0, 1]);
                expect(attrs(H_LINES, 'x2')).toEqual(['1']);
                expect(attrs(H_LINES, 'y1')).toEqual(['90.5']);
            });

            it('takes vertical ticks and horizontal range from a new x-scale', () => {
                const g = grid(xScale(), yScale())
                    .tickValues([1])
                    .hideEdges(false)
                    .scaleX(scaleLinear().domain([0, 2]).range([0, 400]));

                g(container);

                expect(attrs(V_LINES, 'x1')).toEqual(['200.5']);
                expect(attrs(H_LINES, 'x2')).toEqual(['400']);
            });

            it('takes horizontal ticks and vertical range from a new y-scale', () => {
                const g = grid(xScale(), yScale())
                    .tickValues([1])
                    .hideEdges(false)
                    .scaleY(scaleLinear().domain([0, 2]).range([300, 0]));

                g(container);

                expect(attrs(H_LINES, 'y1')).toEqual(['150.5']);
                expect(attrs(V_LINES, 'y1')).toEqual(['300']);
            });
        });

        describe('direction', () => {
            const draw = (direction) => {
                const g = grid(xScale(), yScale()).ticks(4).hideEdges(false);

                if (direction) {
                    g.direction(direction);
                }
                g(container);

                return g;
            };

            it('draws both directions by default', () => {
                const g = draw();

                expect(g.direction()).toBe('full');
                expect(lines(H_LINES).length).toBeGreaterThan(0);
                expect(lines(V_LINES).length).toBeGreaterThan(0);
            });

            it('draws only horizontal lines when horizontal', () => {
                const g = draw('horizontal');

                expect(g.direction()).toBe('horizontal');
                expect(lines(H_LINES).length).toBeGreaterThan(0);
                expect(lines(V_LINES)).toHaveLength(0);
            });

            it('draws only vertical lines when vertical', () => {
                const g = draw('vertical');

                expect(g.direction()).toBe('vertical');
                expect(lines(H_LINES)).toHaveLength(0);
                expect(lines(V_LINES).length).toBeGreaterThan(0);
            });

            it('removes and restores a direction across re-renders', () => {
                const g = draw();
                const count = lines(V_LINES).length;

                g.direction('horizontal')(container);
                expect(lines(V_LINES)).toHaveLength(0);

                g.direction('full')(container);
                expect(lines(V_LINES)).toHaveLength(count);
            });

            describe('and extended lines are set', () => {
                const build = () =>
                    grid(xScale(), yScale())
                        .ticks(4)
                        .hideEdges(false)
                        .extendedLineH(20)
                        .extendedLineV(5);

                it('draws only the extended line of the horizontal direction', () => {
                    build().direction('horizontal')(container);

                    expect(attrs('line.extended-x-line', 'x1')).toEqual(['20']);
                    expect(lines('line.extended-y-line')).toHaveLength(0);
                });

                it('draws only the extended line of the vertical direction', () => {
                    build().direction('vertical')(container);

                    expect(attrs('line.extended-y-line', 'y1')).toEqual(['95']);
                    expect(lines('line.extended-x-line')).toHaveLength(0);
                });

                it('removes and restores the vertical extended line across re-renders', () => {
                    const g = build();

                    g(container);
                    expect(lines('line.extended-y-line')).toHaveLength(1);

                    g.direction('horizontal')(container);
                    expect(lines('line.extended-y-line')).toHaveLength(0);
                    expect(g.extendedLineV()).toBe(5);

                    g.direction('full')(container);
                    expect(attrs('line.extended-y-line', 'y1')).toEqual(['95']);
                    expect(attrs('line.extended-y-line', 'y2')).toEqual(['0']);
                });

                it('removes and restores the horizontal extended line across re-renders', () => {
                    const g = build();

                    g(container);
                    expect(lines('line.extended-x-line')).toHaveLength(1);

                    g.direction('vertical')(container);
                    expect(lines('line.extended-x-line')).toHaveLength(0);
                    expect(g.extendedLineH()).toBe(20);

                    g.direction('full')(container);
                    expect(attrs('line.extended-x-line', 'x1')).toEqual(['20']);
                    expect(attrs('line.extended-x-line', 'x2')).toEqual([
                        '200',
                    ]);
                });

                it('draws an extended line set while its direction is off, once it is back', () => {
                    const g = grid(xScale(), yScale()).direction('horizontal');

                    g.extendedLineV(5)(container);
                    expect(lines('line.extended-y-line')).toHaveLength(0);

                    g.direction('vertical')(container);
                    expect(attrs('line.extended-y-line', 'y1')).toEqual(['95']);
                });

                it('does not bring back an extended line cleared while its direction is off', () => {
                    const g = build().direction('horizontal');

                    g(container);
                    g.extendedLineV(null).direction('full')(container);

                    expect(g.extendedLineV()).toBeNull();
                    expect(lines('line.extended-y-line')).toHaveLength(0);
                });
            });
        });

        describe('ticks', () => {
            it('sets the tick count of both directions', () => {
                const g = grid(xScale(), yScale()).hideEdges(false).ticks(2);

                g(container);

                // d3 ticks(2): [0, 5, 10] on y and [0, 2, 4] on x
                expect(g.ticks()).toBe(2);
                expect(lines(H_LINES)).toHaveLength(3);
                expect(lines(V_LINES)).toHaveLength(3);
            });

            it('sets the count of each direction on its own', () => {
                const g = grid(xScale(), yScale())
                    .hideEdges(false)
                    .ticksH(2)
                    .ticksV(4);

                g(container);

                expect(g.ticksH()).toBe(2);
                expect(g.ticksV()).toBe(4);
                expect(lines(H_LINES)).toHaveLength(3);
                expect(lines(V_LINES)).toHaveLength(5);
            });
        });

        describe('tickValues', () => {
            it('starts with no tick values in either direction', () => {
                const g = grid(xScale(), yScale());

                expect(g.tickValues()).toBeNull();
                expect(g.tickValuesH()).toBeNull();
                expect(g.tickValuesV()).toBeNull();
            });

            it('sets the values of both directions', () => {
                const g = grid(xScale(), yScale())
                    .hideEdges(false)
                    .tickValues([1, 2]);

                g(container);

                expect(g.tickValues()).toEqual([1, 2]);
                expect(attrs(H_LINES, 'y1')).toEqual(['90.5', '80.5']);
                expect(attrs(V_LINES, 'x1')).toEqual(['50.5', '100.5']);
            });

            it('sets the values of each direction on its own', () => {
                const g = grid(xScale(), yScale())
                    .hideEdges(false)
                    .tickValuesH([5])
                    .tickValuesV([1, 3]);

                g(container);

                expect(g.tickValuesH()).toEqual([5]);
                expect(g.tickValuesV()).toEqual([1, 3]);
                expect(attrs(H_LINES, 'y1')).toEqual(['50.5']);
                expect(attrs(V_LINES, 'x1')).toEqual(['50.5', '150.5']);
            });

            it('goes back to the ticks of the scales when cleared', () => {
                const g = grid(xScale(), yScale())
                    .ticks(2)
                    .hideEdges(false)
                    .tickValues([1]);

                g(container);
                expect(lines(H_LINES)).toHaveLength(1);

                g.tickValues(null)(container);
                expect(lines(H_LINES)).toHaveLength(3);
                expect(lines(V_LINES)).toHaveLength(3);
            });

            it('hands back copies of the tick values of both directions', () => {
                const g = grid(xScale(), yScale())
                    .hideEdges(false)
                    .tickValues([1, 2]);

                g.tickValues().push(3);
                g(container);

                expect(g.tickValues()).toEqual([1, 2]);
                expect(lines(H_LINES)).toHaveLength(2);
                expect(lines(V_LINES)).toHaveLength(2);
            });

            it('hands back a copy of the horizontal tick values', () => {
                const g = grid(xScale(), yScale())
                    .hideEdges(false)
                    .tickValuesH([5]);

                g.tickValuesH().push(6);
                g(container);

                expect(g.tickValuesH()).toEqual([5]);
                expect(lines(H_LINES)).toHaveLength(1);
            });

            it('hands back a copy of the vertical tick values', () => {
                const g = grid(xScale(), yScale())
                    .hideEdges(false)
                    .tickValuesV([1]);

                g.tickValuesV().push(2);
                g(container);

                expect(g.tickValuesV()).toEqual([1]);
                expect(lines(V_LINES)).toHaveLength(1);
            });

            it('keeps its own copy of the tick values it is given', () => {
                const both = [1, 2];
                const horizontal = [5];
                const vertical = [1];
                const g = grid(xScale(), yScale()).hideEdges(false);

                g.tickValues(both);
                both.push(3);
                expect(g.tickValuesH()).toEqual([1, 2]);
                expect(g.tickValuesV()).toEqual([1, 2]);

                g.tickValuesH(horizontal).tickValuesV(vertical);
                horizontal.push(6);
                vertical.push(2);
                g(container);

                expect(lines(H_LINES)).toHaveLength(1);
                expect(lines(V_LINES)).toHaveLength(1);
            });

            it('clears the values of each direction on null', () => {
                const g = grid(xScale(), yScale())
                    .tickValuesH([5])
                    .tickValuesV([1]);

                g.tickValuesH(null).tickValuesV(null);

                expect(g.tickValuesH()).toBeNull();
                expect(g.tickValuesV()).toBeNull();
            });
        });

        describe('offsets', () => {
            const build = () =>
                grid(xScale(), yScale()).tickValues([1]).hideEdges(false);

            it('applies offsetStart to both directions', () => {
                const g = build().offsetStart(5);

                g(container);

                expect(g.offsetStart()).toBe(5);
                expect(attrs(H_LINES, 'x1')).toEqual(['-5']);
                expect(attrs(V_LINES, 'y1')).toEqual(['105']);
            });

            it('applies offsetStartH to the horizontal lines only', () => {
                const g = build().offsetStartH(5);

                g(container);

                expect(g.offsetStartH()).toBe(5);
                expect(g.offsetStartV()).toBe(0);
                expect(attrs(H_LINES, 'x1')).toEqual(['-5']);
                expect(attrs(V_LINES, 'y1')).toEqual(['100']);
            });

            it('applies offsetStartV to the vertical lines only', () => {
                const g = build().offsetStartV(5);

                g(container);

                expect(g.offsetStartV()).toBe(5);
                expect(g.offsetStartH()).toBe(0);
                expect(attrs(H_LINES, 'x1')).toEqual(['0']);
                expect(attrs(V_LINES, 'y1')).toEqual(['105']);
            });

            it('applies offsetEnd to both directions', () => {
                const g = build().offsetEnd(7);

                g(container);

                expect(g.offsetEnd()).toBe(7);
                expect(attrs(H_LINES, 'x2')).toEqual(['207']);
                expect(attrs(V_LINES, 'y2')).toEqual(['-7']);
            });

            it('applies offsetEndH to the horizontal lines only', () => {
                const g = build().offsetEndH(7);

                g(container);

                expect(g.offsetEndH()).toBe(7);
                expect(g.offsetEndV()).toBe(0);
                expect(attrs(H_LINES, 'x2')).toEqual(['207']);
                expect(attrs(V_LINES, 'y2')).toEqual(['0']);
            });

            it('applies offsetEndV to the vertical lines only', () => {
                const g = build().offsetEndV(7);

                g(container);

                expect(g.offsetEndV()).toBe(7);
                expect(g.offsetEndH()).toBe(0);
                expect(attrs(H_LINES, 'x2')).toEqual(['200']);
                expect(attrs(V_LINES, 'y2')).toEqual(['-7']);
            });
        });

        describe('hideEdges', () => {
            const build = () => grid(xScale(), yScale()).tickValues([1, 2, 3]);

            it('hides the first edge of both directions by default', () => {
                const g = build();

                g(container);

                expect(g.hideEdges()).toBe('first');
                expect(lines(H_LINES)).toHaveLength(2);
                expect(lines(V_LINES)).toHaveLength(2);
            });

            it('sets both directions', () => {
                const g = build().hideEdges('both');

                g(container);

                expect(g.hideEdges()).toBe('both');
                expect(lines(H_LINES)).toHaveLength(1);
                expect(lines(V_LINES)).toHaveLength(1);
            });

            it('sets the horizontal lines on their own', () => {
                const g = build().hideEdges(false).hideEdgesH('both');

                g(container);

                expect(g.hideEdgesH()).toBe('both');
                expect(g.hideEdgesV()).toBe(false);
                expect(lines(H_LINES)).toHaveLength(1);
                expect(lines(V_LINES)).toHaveLength(3);
            });

            it('sets the vertical lines on their own', () => {
                const g = build().hideEdges(false).hideEdgesV('both');

                g(container);

                expect(g.hideEdgesV()).toBe('both');
                expect(g.hideEdgesH()).toBe(false);
                expect(lines(H_LINES)).toHaveLength(3);
                expect(lines(V_LINES)).toHaveLength(1);
            });
        });
    });
});
