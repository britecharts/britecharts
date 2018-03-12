define([
    'd3',
    'helpers/grid'
], function(d3, grid) {
    'use strict';

    describe('Grid helper', () => {
        let f, container;

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

        // TODO: Behavior tests for rendering
        //       Should create a spy that tests what tick arguments scale is called with 
        describe('gridHorizontal', () => {
            let scale, gridH;

            beforeEach(() => {
                scale = d3.scaleLinear();
                gridH = grid.gridHorizontal(scale);
            });
            
            it('should return a generator function from the constructor', () => {
                expect(typeof gridH === 'function').toBeTruthy();
            });

            describe('on render with selection', () => {
                beforeEach(() => {
                    container.call(gridH);
                });

                it('should render a container group with the correct classes when passed a selection', () => {
                    let expected = 1,
                        actual = container.selectAll('g.grid.horizontal').nodes().length;
    
                    expect(actual).toBe(expected);
                });
            });

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
