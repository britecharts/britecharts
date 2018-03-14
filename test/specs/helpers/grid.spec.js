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
            lineNodes = dir => container.selectAll(`.grid${dir ? '.' + dir : ''} line`).nodes(),
            actualLineCoords = dir => lineNodes(dir).map(extractLineCoords);

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

            // TODO: Consider adding tests to confirm correct positioning animation
            describe('on render with transition', () => {
                let transition;

                beforeEach(() => {
                    transition = container.transition().duration(1);
                });

                it('should render the container and lines when passed a transition', () => {
                    let tickValues = [0, 1, 2],
                        expectedContainer = 1;
    
                    transition.call(gridH.tickValues(tickValues));
      
                    expect(container.selectAll('g.grid.horizontal').nodes().length).toBe(expectedContainer);
                    expect(lineNodes().length).toBe(tickValues.length);
                });

                it('should add new lines on animated re-render', done => {
                    let newActual,
                        oldTicks = [0, 1],
                        newTicks = [0, 1, 2, 3];

                    container.call(gridH.tickValues(oldTicks));
                    transition.on('end', () => {
                        // Timeout captures state after rendering is complete
                        setTimeout(() => {
                            newActual = lineNodes().length;
                            expect(newActual).toEqual(newTicks.length);
                            done();
                        });
                    }).call(gridH.tickValues(newTicks));
                });

                it('should remove unused lines on animated re-render', done => {
                    let newActual,
                        oldTicks = [0, 1, 2, 3],
                        newTicks = [0, 1];

                    container.call(gridH.tickValues(oldTicks));
                    transition.on('end', () => {
                        setTimeout(() => {
                            newActual = lineNodes().length;
                            expect(newActual).toEqual(newTicks.length);
                            done();
                        });
                    }).call(gridH.tickValues(newTicks));
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

                it('should have an offsetEnd accessor that defaults to 0', () => {
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

                it('should have a tickValues accessor that defaults to null', () => {
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
            let scale, tickValues, range, expected, gridV;
            
            beforeEach(() => {
                scale = d3.scaleLinear().domain([0, 2]).range([0, 100]);
                tickValues = [0, 1, 2];
                range = [0, 50];
                expected = [
                    { x1: 0.5, x2: 0.5, y1: 0, y2: 50 },
                    { x1: 50.5, x2: 50.5, y1: 0, y2: 50 },
                    { x1: 100.5, x2: 100.5, y1: 0, y2: 50 }
                ];
                gridV = grid.gridVertical(scale).tickValues(tickValues).range(range);
            });

            it('should render a container group with correct classes and lines', () => {
                container.call(gridV);

                let expectedContainer = 1,
                    actualContainer = container.selectAll('g.grid.vertical').nodes().length,
                    expectedLines = tickValues.length,
                    actualLines = lineNodes().length;

                expect(actualContainer).toBe(expectedContainer);
                expect(actualLines).toBe(expectedLines);
            });

            it('should position the lines correctly', () => {
                container.call(gridV);
                expect(actualLineCoords()).toEqual(expected);
            });
        });

        describe('grid', () => {
            let scaleX, scaleY, tickValues, grid2D;

            beforeEach(() => {
                scaleX = d3.scaleLinear().domain([0, 2]).range([0, 50]);
                scaleY = d3.scaleLinear().domain([0, 2]).range([100, 150]);
                tickValues = [0, 1, 2];
                grid2D = grid.grid(scaleX, scaleY).tickValues(tickValues);
            });

            it('should render a h and v container group with the correct classes', () => {
              container.call(grid2D);
              
              let expected = 1,
                  actualH = container.selectAll('g.grid.horizontal').nodes().length,
                  actualV = container.selectAll('g.grid.vertical').nodes().length;

              expect(actualH).toBe(expected);
              expect(actualV).toBe(expected);
            });

            it('should render the correct number of gridlines when direction is full', () => {
              container.call(grid2D);
              
              let expected = tickValues.length,
                  actualH = lineNodes('horizontal').length,
                  actualV = lineNodes('vertical').length;

              expect(actualH).toBe(expected);
              expect(actualV).toBe(expected);
            });

            it('should render the correct number of gridlines when direction is horizontal', () => {
                container.call(grid2D.direction('horizontal'));
                
                let expectedH = tickValues.length,
                    expectedV = 0,
                    actualH = lineNodes('horizontal').length,
                    actualV = lineNodes('vertical').length;

                expect(actualH).toBe(expectedH);
                expect(actualV).toBe(expectedV);
            });

            it('should render the correct number of gridlines when direction is vertical', () => {
                container.call(grid2D.direction('vertical'));
                
                let expectedH = 0,
                    expectedV = tickValues.length,
                    actualH = lineNodes('horizontal').length,
                    actualV = lineNodes('vertical').length;

                expect(actualH).toBe(expectedH);
                expect(actualV).toBe(expectedV);
            });

            it('should render the correct number of gridlines when hideEdges is first', () => {
                container.call(grid2D.hideEdges('first'));
                expect(lineNodes('horizontal').length).toBe(2);
                expect(lineNodes('vertical').length).toBe(2);
            });

            it('should render the correct number of gridlines when hideEdges is last', () => {
                container.call(grid2D.hideEdges('last'));
                expect(lineNodes('horizontal').length).toBe(2);
                expect(lineNodes('vertical').length).toBe(2);
            });

            it('should render the correct number of gridlines when hideEdges is both', () => {
                container.call(grid2D.hideEdges('both'));
                expect(lineNodes('horizontal').length).toBe(1);
                expect(lineNodes('vertical').length).toBe(1);
            });

            describe('positioning', () => {
                let expectedCoordsH, expectedCoordsV;

                beforeEach(() => {
                    expectedCoordsH = [
                        { x1: 0, x2: 50, y1: 100.5, y2: 100.5 },
                        { x1: 0, x2: 50, y1: 125.5, y2: 125.5 },
                        { x1: 0, x2: 50, y1: 150.5, y2: 150.5 }
                    ],
                    expectedCoordsV = [
                        { x1: 0.5, x2: 0.5, y1: 100, y2: 150 },
                        { x1: 25.5, x2: 25.5, y1: 100, y2: 150 },
                        { x1: 50.5, x2: 50.5, y1: 100, y2: 150 }
                    ];
                });

                it('should position both the horizontal and vertical gridlines correctly', () => {
                    container.call(grid2D);
                    expect(actualLineCoords('horizontal')).toEqual(expectedCoordsH);
                    expect(actualLineCoords('vertical')).toEqual(expectedCoordsV);
                });

                it('should position the gridlines correctly when offsetStart is set', () => {
                    let expectedH = expectedCoordsH.map(d => ({ ...d, x1: -10 })),
                        expectedV = expectedCoordsV.map(d => ({ ...d, y1: 90 }));
                    
                    container.call(grid2D.offsetStart(10));
                    expect(actualLineCoords('horizontal')).toEqual(expectedH);
                    expect(actualLineCoords('vertical')).toEqual(expectedV);
                });

                it('should position the gridlines correctly when offsetEnd is set', () => {
                    let expectedH = expectedCoordsH.map(d => ({ ...d, x2: 60 })),
                        expectedV = expectedCoordsV.map(d => ({ ...d, y2: 160 }));
                    
                    container.call(grid2D.offsetEnd(10));
                    expect(actualLineCoords('horizontal')).toEqual(expectedH);
                    expect(actualLineCoords('vertical')).toEqual(expectedV);
                });
            });

            describe('API', () => {
                beforeEach(() => {
                    grid2D = grid.grid(scaleX, scaleY);
                });

                it('should have an X and Y scale accessor that returns undefined if nothing passed to constructor', () => {
                    expect(grid.grid().scaleX()).toBe(undefined);
                    expect(grid.grid().scaleY()).toBe(undefined);
                });

                it('should have an X and Y scale accessor that defaults to constructor value', () => {
                    let newScaleX = d3.scaleLinear(),
                        newScaleY = d3.scaleLinear();

                    expect(grid2D.scaleX()).toBe(scaleX);
                    expect(grid2D.scaleY()).toBe(scaleY);
                    expect(grid2D.scaleX(newScaleX)).toBe(grid2D);
                    expect(grid2D.scaleY(newScaleY)).toBe(grid2D);
                    expect(grid2D.scaleX()).toBe(newScaleX);
                    expect(grid2D.scaleY()).toBe(newScaleY);
                });

                it('should have a direction accessor that defaults to full ', () => {
                    let previous = 'full',
                        next = 'vertical';

                    expect(grid2D.direction()).toBe(previous);
                    expect(grid2D.direction(next)).toBe(grid2D);
                    expect(grid2D.direction()).toBe(next);
                });

                it('should have an offsetStart accessor that defaults to 0', () => {
                    let previous = 0,
                        next = 10;

                    expect(grid2D.offsetStart()).toBe(previous);
                    expect(grid2D.offsetStart(next)).toBe(grid2D);
                    expect(grid2D.offsetStart()).toBe(next);
                });

                it('should have an offsetEnd accessor that defaults to 0', () => {
                    let previous = 0,
                        next = 10;

                    expect(grid2D.offsetEnd()).toBe(previous);
                    expect(grid2D.offsetEnd(next)).toBe(grid2D);
                    expect(grid2D.offsetEnd()).toBe(next);
                });

                it('should have a hideEdges accessor that defaults to false', () => {
                    let previous = false,
                        next = 'both';

                    expect(grid2D.hideEdges()).toBe(previous);
                    expect(grid2D.hideEdges(next)).toBe(grid2D);
                    expect(grid2D.hideEdges()).toBe(next);
                });

                it('should have a ticks accessor that defaults to null', () => {
                    let previous = null,
                        next = 5;

                    expect(grid2D.ticks()).toBe(previous);
                    expect(grid2D.ticks(next)).toBe(grid2D);
                    expect(grid2D.ticks()).toBe(next);
                });

                it('should have a tickValues accessor that defaults to null', () => {
                    let previous = null,
                        next = [0, 0.5, 1];

                    expect(grid2D.tickValues()).toEqual(previous);
                    expect(grid2D.tickValues(next)).toBe(grid2D);
                    expect(grid2D.tickValues()).toEqual(next);
                });
            });
        });
    });
});
