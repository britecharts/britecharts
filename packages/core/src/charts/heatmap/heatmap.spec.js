import * as d3 from 'd3';

import chart from './heatmap';
import { HeatmapDataBuilder } from './heatmapChartDataBuilder';

const aTestDataSet = () => new HeatmapDataBuilder();
const buildDataSet = (dataSetName) => {
    return aTestDataSet()[dataSetName]().build();
};

describe('heatmap Chart', () => {
    let heatmapChart, dataset, containerFixture;

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

    describe('render', () => {
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

            it('should render a row-labels-group', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('g.row-labels-group')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should render a column-labels-group', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('g.column-labels-group')
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
            it('should render a row label for each day by default', () => {
                const expected = 7;
                const actual = containerFixture.selectAll('.row-label').size();

                expect(actual).toEqual(expected);
            });

            it('should render a column label for each hour by default', () => {
                const expected = 24;
                const actual = containerFixture
                    .selectAll('.column-label')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should give the row and column labels the same look', () => {
                const looks = ['.row-label', '.column-label'].map(
                    (selector) => {
                        const label = containerFixture.select(selector).node();

                        return [label.style.fill, label.style.fontSize];
                    }
                );

                expect(looks[0]).toEqual(looks[1]);
                expect(looks[0][0]).toContain('--bc-text-muted');
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

            describe('when given x axis labels', () => {
                const labels = ['Cat', 'Dog', 'Fox'];
                const squareData = labels.flatMap((row, day) =>
                    labels.map((column, hour) => ({
                        day,
                        hour,
                        value: day + hour,
                    }))
                );

                beforeEach(() => {
                    containerFixture.html('');
                    heatmapChart = chart()
                        .yAxisLabels(labels)
                        .xAxisLabels(labels);
                    containerFixture.datum(squareData).call(heatmapChart);
                });

                it('should draw a column label for each, in order', () => {
                    const actual = containerFixture
                        .selectAll('.column-label')
                        .nodes()
                        .map((label) => label.textContent);

                    expect(actual).toEqual(labels);
                });

                it('should move a whole row of labels on an arrow down', () => {
                    const hover = vi.fn();
                    const press = (key) =>
                        containerFixture
                            .select('svg')
                            .node()
                            .dispatchEvent(
                                new KeyboardEvent('keydown', {
                                    key,
                                    cancelable: true,
                                })
                            );

                    heatmapChart.on('customMouseOver', hover);
                    press('ArrowDown');
                    press('ArrowDown');

                    expect(hover.mock.lastCall[0]).toMatchObject({
                        day: 1,
                        hour: 0,
                    });
                });
            });
        });
    });

    describe('exportChart', () => {
        it('should hand back the export, so a failed one can be caught', async () => {
            await expect(chart().exportChart('heatmap.svg')).rejects.toThrow(
                'has not been drawn'
            );
        });
    });

    describe('lifecycle', () => {
        describe('when hovering a box', () => {
            it('should trigger a callback on mouse over', () => {
                const box = containerFixture.selectAll('.box:nth-child(1)');
                const callbackSpy = vi.fn();
                const expectedCallCount = 1;
                const expectedArgumentsNumber = 3;
                let actualCallCount;
                let actualArgumentsNumber;

                heatmapChart.on('customMouseOver', callbackSpy);
                box.dispatch('mouseover');
                actualCallCount = callbackSpy.mock.calls.length;
                actualArgumentsNumber = callbackSpy.mock.calls[0].length;

                expect(actualCallCount).toEqual(expectedCallCount);
                expect(actualArgumentsNumber).toEqual(expectedArgumentsNumber);
            });

            it('should trigger a callback on mouse move', () => {
                const expectedCallCount = 1;
                const expectedArgumentsNumber = 3;

                let actualCallCount;
                let actualArgumentsNumber;

                const box = containerFixture.selectAll('.box:nth-child(1)');
                const callbackSpy = vi.fn();

                heatmapChart.on('customMouseMove', callbackSpy);
                box.dispatch('mousemove');
                actualCallCount = callbackSpy.mock.calls.length;
                actualArgumentsNumber = callbackSpy.mock.calls[0].length;

                expect(actualCallCount).toEqual(expectedCallCount);
                expect(actualArgumentsNumber).toEqual(expectedArgumentsNumber);
            });

            it('should trigger a callback on mouse out', () => {
                const expectedCallCount = 1;
                const expectedArgumentsNumber = 3;

                let actualCallCount;
                let actualArgumentsNumber;

                const box = containerFixture.selectAll('.box:nth-child(1)');
                const callbackSpy = vi.fn();

                heatmapChart.on('customMouseOut', callbackSpy);
                box.dispatch('mouseout');
                actualCallCount = callbackSpy.mock.calls.length;
                actualArgumentsNumber = callbackSpy.mock.calls[0].length;

                expect(actualCallCount).toEqual(expectedCallCount);
                expect(actualArgumentsNumber).toEqual(expectedArgumentsNumber);
            });

            it('should trigger a callback on mouse click', () => {
                const expectedCallCount = 1;
                const expectedArgumentsNumber = 3;

                let actualCallCount;
                let actualArgumentsNumber;

                const box = containerFixture.selectAll('.box:nth-child(1)');
                const callbackSpy = vi.fn();

                heatmapChart.on('customClick', callbackSpy);
                box.dispatch('click');
                actualCallCount = callbackSpy.mock.calls.length;
                actualArgumentsNumber = callbackSpy.mock.calls[0].length;

                expect(actualCallCount).toEqual(expectedCallCount);
                expect(actualArgumentsNumber).toEqual(expectedArgumentsNumber);
            });
        });
    });

    describe('aPI', () => {
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

        it('should provide xAxisLabels getter and setter', () => {
            let previous = heatmapChart.xAxisLabels(),
                expected = ['One', 'Two', 'Three'],
                actual;

            heatmapChart.xAxisLabels(expected);
            actual = heatmapChart.xAxisLabels();

            expect(previous).not.toBe(actual);
            expect(actual).toBe(expected);
        });
    });

    describe('loading state', () => {
        it('should provide isLoading getter and setter', () => {
            let previous = heatmapChart.isLoading(),
                expected = true,
                actual;

            heatmapChart.isLoading(expected);
            actual = heatmapChart.isLoading();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should render the loading state when isLoading is true', () => {
            const expected = 1;

            heatmapChart.isLoading(true);
            containerFixture.datum([]).call(heatmapChart);

            const actual = containerFixture
                .select('.heatmap-load-state')
                .size();

            expect(actual).toEqual(expected);
        });

        it('should remove the loading state once data arrives', () => {
            const expected = 0;

            heatmapChart.isLoading(true);
            containerFixture.datum([]).call(heatmapChart);

            heatmapChart.isLoading(false);
            containerFixture.datum(dataset).call(heatmapChart);

            const actual = containerFixture
                .select('.heatmap-load-state')
                .size();

            expect(actual).toEqual(expected);
        });
    });
});
