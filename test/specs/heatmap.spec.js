import * as d3 from 'd3';

import chart from './../../src/charts/heatmap';
import { HeatmapDataBuilder } from 'heatmapChartDataBuilder';

const aTestDataSet = () => new HeatmapDataBuilder();
const buildDataSet = (dataSetName) => {
    return aTestDataSet()[dataSetName]().build();
};

describe('Heatmap Chart', () => {
    let heatmapChart, dataset, containerFixture, f;

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);
        dataset = buildDataSet('withWeeklyData');
        heatmapChart = chart();

        containerFixture = d3.select('.test-container');
        containerFixture.datum(dataset).call(heatmapChart);
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    describe('Render', () => {
        it('should render a heatmap', () => {
            const expected = 1;
            const actual = containerFixture.select('.heatmap').size();

            expect(actual).toEqual(expected);
        });

        describe('groups', () => {
            it('should render a container-group', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('g.container-group')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should render a chart-group', () => {
                const expected = 1;
                const actual = containerFixture.select('g.chart-group').size();

                expect(actual).toEqual(expected);
            });

            it('should render a metadata-group', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('g.metadata-group')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should render a day-labels-group', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('g.day-labels-group')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should render a hour-labels-group', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('g.hour-labels-group')
                    .size();

                expect(actual).toEqual(expected);
            });
        });

        it('should render a box for each hour in the week', () => {
            const expected = 24 * 7;
            const actual = containerFixture.selectAll('.box').size();

            expect(actual).toEqual(expected);
        });

        describe('axis', () => {
            it('should render the day labels', () => {
                const expected = 7;
                const actual = containerFixture.selectAll('.day-label').size();

                expect(actual).toEqual(expected);
            });

            it('should render the hour labels', () => {
                const expected = 24;
                const actual = containerFixture.selectAll('.hour-label').size();

                expect(actual).toEqual(expected);
            });
        });

        describe('when reloading with a different dataset', () => {
            it('should render in the same svg', () => {
                const expected = 1;
                const newDataset = buildDataSet('withAlternativeWeeklyData');
                let actual;

                containerFixture.datum(newDataset).call(heatmapChart);
                actual = containerFixture.selectAll('.heatmap').size();

                expect(actual).toEqual(expected);
            });
        });

        describe('custom axis labels', () => {
            it('should render custom y axis labels correctly', () => {
                const customYAxisLabels = ['Test1', 'Test2'];

                // clear container to avoid having multiple
                //  charts within one container
                containerFixture.html('');
                containerFixture.datum(dataset).call(heatmapChart);
                heatmapChart.yAxisLabels(customYAxisLabels);

                const yAxisLabels = containerFixture
                    .select('svg')
                    .selectAll('.heatmap .y-axis-label');

                yAxisLabels.each((yAxisLabel, i) => {
                    expect(yAxisLabel).toBe(customYAxisLabels[i]);
                });
            });
        });
    });

    describe('Lifecycle', () => {
        describe('when hovering a box', () => {
            it('should trigger a callback on mouse over', () => {
                const box = containerFixture.selectAll('.box:nth-child(1)');
                const callbackSpy = jasmine.createSpy('callback');
                const expectedCallCount = 1;
                const expectedArgumentsNumber = 3;
                let actualCallCount;
                let actualArgumentsNumber;

                heatmapChart.on('customMouseOver', callbackSpy);
                box.dispatch('mouseover');
                actualCallCount = callbackSpy.calls.count();
                actualArgumentsNumber = callbackSpy.calls.allArgs()[0].length;

                expect(actualCallCount).toEqual(expectedCallCount);
                expect(actualArgumentsNumber).toEqual(expectedArgumentsNumber);
            });

            it('should trigger a callback on mouse move', () => {
                const expectedCallCount = 1;
                const expectedArgumentsNumber = 3;

                let actualCallCount;
                let actualArgumentsNumber;

                const box = containerFixture.selectAll('.box:nth-child(1)');
                const callbackSpy = jasmine.createSpy('callback');

                heatmapChart.on('customMouseMove', callbackSpy);
                box.dispatch('mousemove');
                actualCallCount = callbackSpy.calls.count();
                actualArgumentsNumber = callbackSpy.calls.allArgs()[0].length;

                expect(actualCallCount).toEqual(expectedCallCount);
                expect(actualArgumentsNumber).toEqual(expectedArgumentsNumber);
            });

            it('should trigger a callback on mouse out', () => {
                const expectedCallCount = 1;
                const expectedArgumentsNumber = 3;

                let actualCallCount;
                let actualArgumentsNumber;

                const box = containerFixture.selectAll('.box:nth-child(1)');
                const callbackSpy = jasmine.createSpy('callback');

                heatmapChart.on('customMouseOut', callbackSpy);
                box.dispatch('mouseout');
                actualCallCount = callbackSpy.calls.count();
                actualArgumentsNumber = callbackSpy.calls.allArgs()[0].length;

                expect(actualCallCount).toEqual(expectedCallCount);
                expect(actualArgumentsNumber).toEqual(expectedArgumentsNumber);
            });

            it('should trigger a callback on mouse click', () => {
                const expectedCallCount = 1;
                const expectedArgumentsNumber = 3;

                let actualCallCount;
                let actualArgumentsNumber;

                const box = containerFixture.selectAll('.box:nth-child(1)');
                const callbackSpy = jasmine.createSpy('callback');

                heatmapChart.on('customClick', callbackSpy);
                box.dispatch('click');
                actualCallCount = callbackSpy.calls.count();
                actualArgumentsNumber = callbackSpy.calls.allArgs()[0].length;

                expect(actualCallCount).toEqual(expectedCallCount);
                expect(actualArgumentsNumber).toEqual(expectedArgumentsNumber);
            });
        });
    });

    describe('API', () => {
        it('should provide animationDuration getter and setter', () => {
            let defaultAnimationDuration = heatmapChart.animationDuration(),
                testAnimationDuration = 2000,
                newAnimationDuration;

            heatmapChart.animationDuration(testAnimationDuration);
            newAnimationDuration = heatmapChart.animationDuration();

            expect(defaultAnimationDuration).not.toBe(testAnimationDuration);
            expect(newAnimationDuration).toBe(testAnimationDuration);
        });

        it('should provide boxSize getter and setter', () => {
            let previous = heatmapChart.boxSize(),
                expected = 10,
                actual;

            heatmapChart.boxSize(expected);
            actual = heatmapChart.boxSize();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });

        it('should provide colorSchema getter and setter', () => {
            let previous = heatmapChart.colorSchema(),
                expected = ['#FFFFFF'],
                actual;

            heatmapChart.colorSchema(expected);
            actual = heatmapChart.colorSchema();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });

        it('should have exportChart defined', () => {
            expect(heatmapChart.exportChart).toBeDefined();
        });

        it('should provide height getter and setter', () => {
            let previous = heatmapChart.height(),
                expected = 50,
                actual;

            heatmapChart.height(expected);
            actual = heatmapChart.height();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });

        it('should provide isAnimated getter and setter', () => {
            let previous = heatmapChart.isAnimated(),
                expected = true,
                actual;

            heatmapChart.isAnimated(expected);
            actual = heatmapChart.isAnimated();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });

        xit('should provide loadingState getter and setter', () => {
            let previous = heatmapChart.loadingState(),
                expected = 'test',
                actual;

            heatmapChart.loadingState(expected);
            actual = heatmapChart.loadingState();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });

        it('should provide margin getter and setter', () => {
            let previous = heatmapChart.margin(),
                expected = { top: 4, right: 4, bottom: 4, left: 4 },
                actual;

            heatmapChart.margin(expected);
            actual = heatmapChart.margin();

            expect(previous).not.toBe(actual);
            expect(actual).toEqual(expected);
        });

        it('should provide width getter and setter', () => {
            let previous = heatmapChart.width(),
                expected = 20,
                actual;

            heatmapChart.width(expected);
            actual = heatmapChart.width();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });

        it('should provide yAxisLabels getter and setter', () => {
            let previous = heatmapChart.yAxisLabels(),
                expected = ['One', 'Two', 'Three'],
                actual;

            heatmapChart.yAxisLabels(expected);
            actual = heatmapChart.yAxisLabels();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });
    });
});
