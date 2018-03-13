define([
    'd3',
    'helpers/grid'
], function(d3, grid) {
    'use strict';

    function extractLineCoords(el) {
        el = d3.select(el);

        return {
            x1: +el.attr('x1'),
            x2: +el.attr('x2'),
            y1: +el.attr('y1'),
            y2: +el.attr('y2')
        }; 
    }

    describe('Grid helper', () => {
        let f,
            container,
            lineNodes = () => container.selectAll('.grid line').nodes(),
            actualLineCoords = () => lineNodes().map(extractLineCoords);

        beforeEach(() => {
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            container = d3.select('.test-container');
        });

        afterEach(() => {
            container.remove();

            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        describe('gridHorizontal', () => {
            let scale, scaleOrdinal, gridH;

            beforeEach(() => {
                scale = d3.scaleLinear().domain([0, 2]).range([0, 100]);
                scaleOrdinal = d3.scaleOrdinal();
                gridH = grid.gridHorizontal(scale);
            });
            
            it('should return a generator function from the constructor', () => {
                expect(typeof gridH === 'function').toBeTruthy();
            });

            // TODO: Consider testing that correct lines are added/kept/removed, not just that the count is correct
            describe('on render with selection', () => {
                it('should render a container group with the correct classes when passed a selection', () => {
                    container.call(gridH);

                    let expected = 1,
                        actual = container.selectAll('g.grid.horizontal').nodes().length;
    
                    expect(actual).toBe(expected);
                });

                it('should append lines using scale.ticks when scale has a ticks method', () => {
                    spyOn(scale, 'ticks').and.callThrough();
                    container.call(gridH);

                    let expected = scale.ticks().length,
                        actual = lineNodes().length;

                    expect(scale.ticks).toHaveBeenCalledTimes(2);
                    expect(actual).toEqual(expected);
                });

                it('should append lines using scale.domain when ticks is not present', () => {
                    let domain = [0, 1, 2, 3];

                    spyOn(scaleOrdinal, 'domain').and.callThrough();
                    scaleOrdinal.domain(domain);
                    container.call(gridH.scale(scaleOrdinal));
                    
                    let expected = domain.length,
                        actual = lineNodes().length;

                    expect(scaleOrdinal.domain).toHaveBeenCalledTimes(2);
                    expect(actual).toEqual(expected);
                });

                it('should append lines using tickValues when tickValues is supplied', () => {
                    let tickValues = [0, 1, 2];

                    spyOn(scale, 'ticks').and.callThrough();
                    spyOn(scale, 'domain').and.callThrough();
                    container.call(gridH.tickValues(tickValues));

                    let expected = tickValues.length,
                        actual = lineNodes().length;

                    // Domain is called by scale.copy, so needs to be called once to set the position function
                    expect(scale.ticks).not.toHaveBeenCalled();
                    expect(scale.domain).toHaveBeenCalledTimes(1);
                    expect(actual).toEqual(expected);
                });

                it('should add new lines on re-render', () => {
                    let oldActual,
                        newActual,
                        oldTicks = [0, 1],
                        newTicks = [0, 1, 2, 3];

                    container.call(gridH.tickValues(oldTicks));
                    oldActual = lineNodes().length;
                    container.call(gridH.tickValues(newTicks));
                    newActual = lineNodes().length;

                    expect(oldActual).toEqual(oldTicks.length);
                    expect(newActual).toEqual(newTicks.length);
                });
                
                it('should remove unused lines on re-render', () => {
                    let oldActual,
                        newActual,
                        oldTicks = [0, 1, 2, 3],
                        newTicks = [0, 1];

                    container.call(gridH.tickValues(oldTicks));
                    oldActual = lineNodes().length;
                    container.call(gridH.tickValues(newTicks));
                    newActual = lineNodes().length;

                    expect(oldActual).toEqual(oldTicks.length);
                    expect(newActual).toEqual(newTicks.length);
                });

                describe('positioning', () => {
                    let tickValues, range, expectedCoords;

                    beforeEach(() => {
                        tickValues = [0, 1, 2];
                        range = [0, 50],
                        expectedCoords = [
                            { x1: 0, x2: 50, y1: 0.5, y2: 0.5 },
                            { x1: 0, x2: 50, y1: 50.5, y2: 50.5 },
                            { x1: 0, x2: 50, y1: 100.5, y2: 100.5 }
                        ];

                        gridH.tickValues(tickValues).range(range);
                    });

                    it('should render lines in the correct position with black stroke and full opacity', () => {
                        container.call(gridH);

                        let line = container.selectAll('.grid line'),
                            expectedStroke = '#000',
                            actualStroke = line.attr('stroke'),
                            expectedOpacity = 1,
                            actualOpacity = +line.attr('opacity');

                        expect(actualStroke).toEqual(expectedStroke);
                        expect(actualOpacity).toEqual(expectedOpacity);
                        expect(actualLineCoords()).toEqual(expectedCoords);
                    });

                    // TODO: Check anti-aliasing behavior compared to d3.axis
                    it('should render lines correctly with bandwidth scale', () => {
                        let scaleBand = d3.scaleBand().domain(['a', 'b', 'c']).range([0, 120]),
                            expected = [
                                { x1: 0, x2: 50, y1: 20, y2: 20 },
                                { x1: 0, x2: 50, y1: 60, y2: 60 },
                                { x1: 0, x2: 50, y1: 100, y2: 100 }
                            ];

                        container.call(gridH.tickValues(null).scale(scaleBand));
                        expect(actualLineCoords()).toEqual(expected);
                    });
                    
                    it('should render lines correctly when offsetStart set', () => {
                        let expected = expectedCoords.map(d => ({ ...d, x1: -10 }));
                        
                        container.call(gridH.offsetStart(10));
                        expect(actualLineCoords()).toEqual(expected);
                    });
                    
                    it('should render lines correctly when offsetStart set and range is reversed', () => {
                        let expected = expectedCoords.map(d => ({ ...d, x1: 60, x2: 0 }));

                        container.call(gridH.range([50, 0]).offsetStart(10));
                        expect(actualLineCoords()).toEqual(expected);
                    });
                    
                    it('should render lines correctly when offsetEnd set', () => {
                        let expected = expectedCoords.map(d => ({ ...d, x2: 60 }));

                        container.call(gridH.offsetEnd(10));
                        expect(actualLineCoords()).toEqual(expected);
                    });

                    it('should render lines correctly when offsetEnd set and range is reversed', () => {
                        let expected = expectedCoords.map(d => ({ ...d, x1: 50, x2: -10 }));

                        container.call(gridH.range([50, 0]).offsetEnd(10));
                        expect(actualLineCoords()).toEqual(expected);
                    });

                    it('should hide the first line when hideEdges is set to first', () => {
                        container.call(gridH.hideEdges('first'));
                        expectedCoords.shift();

                        expect(actualLineCoords()).toEqual(expectedCoords);
                    });
                    
                    it('should hide the last line when hideEdges is set to last', () => {
                        container.call(gridH.hideEdges('last'));
                        expectedCoords.pop();

                        expect(actualLineCoords()).toEqual(expectedCoords);
                    });
                    
                    it('should hide the first and last lines when hideEdges is set to both', () => {
                        container.call(gridH.hideEdges('both'));
                        expectedCoords.shift();
                        expectedCoords.pop();

                        expect(actualLineCoords()).toEqual(expectedCoords);
                    });

                    it('should hide the first and last lines when hideEdges is set to true', () => {
                        container.call(gridH.hideEdges('both'));
                        expectedCoords.shift();
                        expectedCoords.pop();

                        expect(actualLineCoords()).toEqual(expectedCoords);
                    });
                });
            });

            // TODO: Consider adding tests to work out the positioning animation
            describe('on render with transition', () => {
                let transition;

                beforeEach(() => {
                    transition = container.transition();
                    transition.call(gridH);
                });

                it('should render the container when passed a transition', () => {
                    let expected = 1,
                        actual = container.selectAll('g.grid.horizontal').nodes().length;
      
                    expect(actual).toBe(expected);
                });
            });
            
            describe('API', () => {
                it('should have a scale accessor that returns undefined if nothing passed to constructor', () => {
                    expect(grid.gridHorizontal().scale()).toBe(undefined);
                });

                it('should have a scale accessor that defaults to constructor value', () => {
                    let previous = scale,
                        newScale = d3.scaleLinear();

                    expect(gridH.scale()).toBe(scale);
                    expect(gridH.scale(newScale)).toBe(gridH);
                    expect(gridH.scale()).toBe(newScale);
                });

                it('should have a range accessor that defaults to [0, 1]', () => {
                    let previous = [0, 1],
                        next = [200, 0];

                    expect(gridH.range()).toEqual(previous);
                    expect(gridH.range(next)).toBe(gridH);
                    expect(gridH.range()).toEqual(next);
                });

                it('should have an offsetStart accessor that defaults to 0', () => {
                    let previous = 0,
                        next = 10;

                    expect(gridH.offsetStart()).toBe(previous);
                    expect(gridH.offsetStart(next)).toBe(gridH);
                    expect(gridH.offsetStart()).toBe(next);
                });

                it('should havean offsetEnd accessor that defaults to 0 ', () => {
                    let previous = 0,
                        next = 10;

                    expect(gridH.offsetEnd()).toBe(previous);
                    expect(gridH.offsetEnd(next)).toBe(gridH);
                    expect(gridH.offsetEnd()).toBe(next);
                });

                it('should have a hideEdges accessor that defaults to false', () => {
                    let previous = false,
                        next = 'both';

                    expect(gridH.hideEdges()).toBe(previous);
                    expect(gridH.hideEdges(next)).toBe(gridH);
                    expect(gridH.hideEdges()).toBe(next);
                });

                it('should have a ticks accessor that defaults to null', () => {
                    let previous = null,
                        next = 5;

                    expect(gridH.ticks()).toBe(previous);
                    expect(gridH.ticks(next)).toBe(gridH);
                    expect(gridH.ticks()).toBe(next);
                });

                it('should have a tickValues accessor that defaluts to null', () => {
                    let previous = null,
                        next = [0, 0.5, 1];

                    expect(gridH.tickValues()).toEqual(previous);
                    expect(gridH.tickValues(next)).toBe(gridH);
                    expect(gridH.tickValues()).toEqual(next);
                });
            });
        });

        // TODO: Duplicate gridHorizontal tests for vertical
        describe('gridVertical', () => {

        });

        // TODO: Test 2d grid
        describe('grid', () => {

        });
    });
});
