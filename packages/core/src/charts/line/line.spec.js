import _ from 'underscore';
import * as d3 from 'd3';

import chart from './line';
import { LineDataBuilder } from './lineChartDataBuilder';

const aTestDataSet = () => new LineDataBuilder();
const buildDataSet = (dataSetName) => {
    return aTestDataSet()[dataSetName]().build();
};

const hasClass = (element, className) => {
    return _.contains(element.node().classList, className);
};

describe('line Chart', () => {
    let dataset, containerFixture, lineChart;

    describe('render', () => {
        describe('when a single line of zeroes', () => {
            beforeEach(() => {
                const fixture =
                    '<div id="fixture"><div class="test-container"></div></div>';

                // adds an html fixture to the DOM
                document.body.insertAdjacentHTML('afterbegin', fixture);

                dataset = buildDataSet('withAllZeroes');
                lineChart = chart();

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(lineChart);
            });

            // remove the html fixture from the DOM
            afterEach(() => {
                document.body.removeChild(document.getElementById('fixture'));
            });

            it('should have one line on the chart line', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('.chart-group')
                    .selectAll('path')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should have a gradient stroke on the chart line', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('.chart-group')
                    .selectAll('path')
                    .node()
                    .getAttribute('stroke')
                    .match('one-line-gradient').length;

                expect(actual).toEqual(expected);
            });
        });

        describe('when multiple lines', () => {
            beforeEach(() => {
                const fixture =
                    '<div id="fixture"><div class="test-container"></div></div>';

                // adds an html fixture to the DOM
                document.body.insertAdjacentHTML('afterbegin', fixture);

                dataset = buildDataSet('with5Topics');
                lineChart = chart();

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(lineChart);
            });

            // remove the html fixture from the DOM
            afterEach(() => {
                document.body.removeChild(document.getElementById('fixture'));
            });

            it('should show a chart with minimal requirements', () => {
                const expected = 1;
                const actual = containerFixture.select('.line-chart').size();

                expect(actual).toEqual(expected);
            });

            describe('groups', () => {
                it('should create a container-group', () => {
                    const expected = 1;
                    const actual = containerFixture
                        .select('g.container-group')
                        .size();

                    expect(actual).toEqual(expected);
                });

                it('should create a chart-group', () => {
                    const expected = 1;
                    const actual = containerFixture
                        .select('g.chart-group')
                        .size();

                    expect(actual).toEqual(expected);
                });

                it('should create a x-axis-group', () => {
                    const expected = 1;
                    const actual = containerFixture
                        .select('g.x-axis-group')
                        .size();

                    expect(actual).toEqual(expected);
                });

                it('should create a y-axis-group', () => {
                    const expected = 1;
                    const actual = containerFixture
                        .select('g.y-axis-group')
                        .size();

                    expect(actual).toEqual(expected);
                });

                it('should create a grid-lines-group', () => {
                    const expected = 1;
                    const actual = containerFixture
                        .select('g.grid-lines-group')
                        .size();

                    expect(actual).toEqual(expected);
                });

                it('should create a custom-lines-group', () => {
                    const expected = 1;
                    const actual = containerFixture
                        .select('g.custom-lines-group')
                        .size();

                    expect(actual).toEqual(expected);
                });

                it('should create a metadata-group', () => {
                    const expected = 1;
                    const actual = containerFixture
                        .select('g.metadata-group')
                        .size();

                    expect(actual).toEqual(expected);
                });

                it('should create a loading-state-group', () => {
                    const expected = 1;
                    const actual = containerFixture
                        .select('g.loading-state-group')
                        .size();

                    expect(actual).toEqual(expected);
                });
            });

            describe('grids', () => {
                describe('when grid is horizontal', () => {
                    beforeEach(() => {
                        lineChart = chart().grid('horizontal');

                        containerFixture = d3
                            .select('.test-container')
                            .append('svg');
                        containerFixture.datum(dataset).call(lineChart);
                    });

                    it('should draw horizontal grid lines', () => {
                        const expected = 1;
                        const actual = containerFixture
                            .select('.horizontal .grid-line')
                            .size();

                        expect(actual).toEqual(expected);
                    });

                    it('should not draw vertical grid lines', () => {
                        const expected = 0;
                        const actual = containerFixture
                            .select('.vertical .grid-line')
                            .size();

                        expect(actual).toEqual(expected);
                    });
                });

                describe('when grid is vertical', function () {
                    beforeEach(function () {
                        lineChart = chart().grid('vertical');

                        containerFixture = d3
                            .select('.test-container')
                            .append('svg');
                        containerFixture.datum(dataset).call(lineChart);
                    });

                    it('should not draw horizontal grid lines', () => {
                        const expected = 0;
                        const actual = containerFixture
                            .select('.horizontal .grid-line')
                            .size();

                        expect(actual).toEqual(expected);
                    });

                    it('should draw vertical grid lines', () => {
                        const expected = 1;
                        const actual = containerFixture
                            .select('.vertical .grid-line')
                            .size();

                        expect(actual).toEqual(expected);
                    });
                });

                describe('when grid is full', function () {
                    beforeEach(function () {
                        lineChart = chart().grid('full');

                        containerFixture = d3
                            .select('.test-container')
                            .append('svg');
                        containerFixture.datum(dataset).call(lineChart);
                    });

                    it('should draw horizontal grid lines', () => {
                        const expected = 1;
                        const actual = containerFixture
                            .select('.horizontal .grid-line')
                            .size();

                        expect(actual).toEqual(expected);
                    });

                    it('should draw vertical grid lines', () => {
                        const expected = 1;
                        const actual = containerFixture
                            .select('.vertical .grid-line')
                            .size();

                        expect(actual).toEqual(expected);
                    });
                });
            });

            describe('custom lines', () => {
                describe('when no lines are set', () => {
                    beforeEach(() => {
                        lineChart = chart();

                        containerFixture = d3
                            .select('.test-container')
                            .append('svg');
                        containerFixture.datum(dataset).call(lineChart);
                    });

                    it('should not draw a horizontal line', () => {
                        const expected = 0;
                        const actual = containerFixture
                            .select('.custom-line')
                            .size();

                        expect(actual).toEqual(expected);
                    });

                    it('should not render an annotation text', () => {
                        const expected = 0;
                        const actual = containerFixture
                            .select('.custom-line-annotation')
                            .size();

                        expect(actual).toEqual(expected);
                    });
                });

                describe('when one line is set', () => {
                    beforeEach(() => {
                        lineChart = chart().lines([
                            {
                                y: 2,
                                color: '#ff0000',
                                name: 'Testname',
                            },
                        ]);

                        containerFixture = d3
                            .select('.test-container')
                            .append('svg');
                        containerFixture.datum(dataset).call(lineChart);
                    });

                    it('should draw a horizontal line', () => {
                        const expected = 1;
                        const actual = containerFixture
                            .select('.custom-line')
                            .size();

                        expect(actual).toEqual(expected);
                    });

                    it('should render an annotation text', () => {
                        const expected = 1;
                        const actual = containerFixture
                            .select('.custom-line-annotation')
                            .size();

                        expect(actual).toEqual(expected);

                        const actualText = containerFixture
                            .select('.custom-lines-group text')
                            .text();

                        expect(actualText).toBe('Testname');
                    });
                });
            });

            describe('axis', () => {
                it('should draw an X axis', () => {
                    const expected = 1;
                    const actual = containerFixture
                        .select('.x-axis-group .x.axis')
                        .size();

                    expect(actual).toEqual(expected);
                });

                it('should draw a month X axis', () => {
                    const expected = 1;
                    const actual = containerFixture
                        .select('.x-axis-group .axis.sub-x')
                        .size();

                    expect(actual).toEqual(expected);
                });

                it('should draw an Y axis', () => {
                    const expected = 1;
                    const actual = containerFixture.select('.y.axis').size();

                    expect(actual).toEqual(expected);
                });
            });

            it('should render a line for each data topic', () => {
                const expected = 5;
                const actual = containerFixture.selectAll('.line').size();

                expect(actual).toEqual(expected);
            });

            it('should not have a gradient line with a data set for more than one line', () => {
                const expected = 'url("#line-area-gradient")';
                const actual = containerFixture
                    .select('.chart-group')
                    .selectAll('path')
                    .node().style.stroke;

                expect(actual).not.toEqual(expected);
            });

            it('should render an overlay to trigger the hover effect', () => {
                const expected = 1;
                const actual = containerFixture.select('.overlay').size();

                expect(actual).toEqual(expected);
            });

            it('should render a vertical marker', () => {
                const expected = 1;
                const actual = containerFixture.select('.hover-marker').size();

                expect(actual).toEqual(expected);
            });

            it('should render a vertical marker container', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('.vertical-marker')
                    .size();

                expect(actual).toEqual(expected);
            });

            describe('when reloading with a different dataset', () => {
                it('should render in the same svg', function () {
                    const expected = 1;
                    const newDataset = buildDataSet('withOneSource');
                    let actual;

                    containerFixture.datum(newDataset).call(lineChart);
                    actual = containerFixture.selectAll('.line-chart').size();

                    expect(actual).toEqual(expected);
                });

                it('should render one line', function () {
                    const expected = 1;
                    const newDataset = buildDataSet('withOneSource');
                    let actual;

                    containerFixture.datum(newDataset).call(lineChart);
                    actual = containerFixture
                        .selectAll('.line-chart .line')
                        .size();

                    expect(actual).toEqual(expected);
                });

                it('should not throw error on mousemove', function () {
                    const container = containerFixture.selectAll('svg');
                    const newDataset = buildDataSet('withOneSource');

                    // Need to refresh the data twice to get failure before fix
                    containerFixture.datum(newDataset).call(lineChart);
                    containerFixture.datum(newDataset).call(lineChart);
                    container.dispatch('mousemove');
                });
            });

            describe('axis Labels', () => {
                describe('when axis labels are not set', () => {
                    beforeEach(() => {
                        const fixture =
                            '<div id="fixture"><div class="test-container"></div></div>';

                        // adds an html fixture to the DOM
                        document.body.insertAdjacentHTML('afterbegin', fixture);

                        dataset = buildDataSet('withOneSource');
                        lineChart = chart();
                        containerFixture = d3.select('.test-container');
                        containerFixture.datum(dataset).call(lineChart);
                    });

                    // remove the html fixture from the DOM
                    afterEach(() => {
                        document.body.removeChild(
                            document.getElementById('fixture')
                        );
                    });

                    it('should not render the x-axis label', () => {
                        const expected = 0;
                        const actual =
                            containerFixture.selectAll('.x-axis-label')[
                                '_groups'
                            ][0].length;

                        expect(actual).toEqual(expected);
                    });

                    it('should not render any axisLabel', () => {
                        const expected = 0;
                        const actual =
                            containerFixture.selectAll('.y-axis-label')[
                                '_groups'
                            ][0].length;

                        expect(actual).toEqual(expected);
                    });
                });

                describe('when axis labels are set', () => {
                    beforeEach(() => {
                        const fixture =
                            '<div id="fixture"><div class="test-container"></div></div>';

                        // adds an html fixture to the DOM
                        document.body.insertAdjacentHTML('afterbegin', fixture);

                        dataset = buildDataSet('withOneSource');
                        lineChart = chart()
                            .xAxisLabel('valueSetX')
                            .yAxisLabel('valueSetY');
                        containerFixture = d3.select('.test-container');
                        containerFixture.datum(dataset).call(lineChart);
                    });

                    // remove the html fixture from the DOM
                    afterEach(() => {
                        document.body.removeChild(
                            document.getElementById('fixture')
                        );
                    });

                    it('should render the x-axis label', () => {
                        let expected = 1,
                            actual =
                                containerFixture.selectAll('.x-axis-label')[
                                    '_groups'
                                ][0].length;

                        expect(actual).toEqual(expected);
                    });

                    it('should render any axisLabel', () => {
                        let expected = 1,
                            actual =
                                containerFixture.selectAll('.y-axis-label')[
                                    '_groups'
                                ][0].length;

                        expect(actual).toEqual(expected);
                    });
                });

                describe('when has negative values', () => {
                    beforeEach(() => {
                        const fixture =
                            '<div id="fixture"><div class="test-container"></div></div>';

                        // adds an html fixture to the DOM
                        document.body.insertAdjacentHTML('afterbegin', fixture);

                        dataset = buildDataSet('withNegativeValues');
                        lineChart = chart().grid('full');

                        containerFixture = d3.select('.test-container');
                        containerFixture.datum(dataset).call(lineChart);
                    });

                    afterEach(() => {
                        document.body.removeChild(
                            document.getElementById('fixture')
                        );
                    });

                    it('the lowest Y-axis value is negative', () => {
                        let values = dataset.data.map((d) => d.value);
                        let minValue = Math.min(...values);
                        let minValueText = '' + minValue;

                        let yAxis = d3.select('.y-axis-group');
                        let text = yAxis.select('g.tick');

                        expect(text.text()).toEqual(minValueText);
                    });

                    it('0-axis is highlighted with an additional class', () => {
                        let values = dataset.data.map((d) => d.value);
                        let minValue = Math.min(...values);
                        let indexOf0 = -minValue - 1;

                        let horizontalGridLines = d3
                            .selectAll('.horizontal .grid-line')
                            .filter((_, i) => i === indexOf0);
                        let classes = horizontalGridLines
                            .attr('class')
                            .split(' ');

                        expect(classes).toContain(
                            'horizontal-grid-line--highlighted'
                        );
                    });
                });

                describe('when has only negative values', () => {
                    beforeEach(() => {
                        const fixture =
                            '<div id="fixture"><div class="test-container"></div></div>';

                        // adds an html fixture to the DOM
                        document.body.insertAdjacentHTML('afterbegin', fixture);

                        dataset = buildDataSet('withOnlyNegativeValues');
                        lineChart = chart().grid('full');

                        containerFixture = d3.select('.test-container');
                        containerFixture.datum(dataset).call(lineChart);
                    });

                    afterEach(() => {
                        document.body.removeChild(
                            document.getElementById('fixture')
                        );
                    });

                    it('the highest Y-axis value is negative', () => {
                        let yAxis = d3.selectAll('.y-axis-group');
                        let text = yAxis.selectAll('g.tick:nth-child(8)');
                        const expected = '-1';
                        const actual = text.text();

                        expect(actual).toEqual(expected);
                    });

                    it('the lowest Y-axis value is negative', () => {
                        let yAxis = d3.selectAll('.y-axis-group');
                        let text = yAxis.selectAll('g.tick');
                        const expected = '-4';
                        const actual = text.text();

                        expect(actual).toEqual(expected);
                    });
                });
                describe('when has only non-zero positive values and hasMinimumValueScale is true', () => {
                    beforeEach(() => {
                        const fixture =
                            '<div id="fixture"><div class="test-container"></div></div>';

                        // adds an html fixture to the DOM
                        document.body.insertAdjacentHTML('afterbegin', fixture);

                        dataset = buildDataSet('withOnlyNonzeroPositiveValues');
                        lineChart = chart()
                            .grid('full')
                            .hasMinimumValueScale(true);

                        containerFixture = d3.select('.test-container');
                        containerFixture.datum(dataset).call(lineChart);
                    });

                    afterEach(() => {
                        document.body.removeChild(
                            document.getElementById('fixture')
                        );
                    });

                    it('the highest Y-axis value is positive', () => {
                        let yAxis = d3.selectAll('.y-axis-group');
                        let text = yAxis.selectAll('g.tick:nth-child(6)');
                        expect(text.text()).toBe('10');
                    });

                    it('the lowest Y-axis value is positive', () => {
                        let yAxis = d3.selectAll('.y-axis-group');
                        let text = yAxis.selectAll('g.tick');
                        expect(text.text()).toBe('2');
                    });
                });
            });

            describe('when different date ranges', () => {
                beforeEach(() => {
                    const fixture =
                        '<div id="fixture"><div class="test-container"></div></div>';

                    // adds an html fixture to the DOM
                    document.body.insertAdjacentHTML('afterbegin', fixture);

                    dataset = buildDataSet('withHourDateRange');
                    lineChart = chart();

                    containerFixture = d3.select('.test-container');
                    containerFixture.datum(dataset).call(lineChart);
                });

                // remove the html fixture from the DOM
                afterEach(() => {
                    document.body.removeChild(
                        document.getElementById('fixture')
                    );
                });

                it('should have an x axis with hour format', () => {
                    const expected = '00 AM';
                    const container = containerFixture.selectAll('svg');
                    const xAxis = d3.select('.x-axis-group');
                    const xAxisLabels = xAxis.selectAll('.tick text');
                    const actual = xAxisLabels.text();

                    expect(actual).toEqual(expected);
                });
            });

            describe('when using flat data', () => {
                beforeEach(() => {
                    const fixture =
                        '<div id="fixture"><div class="test-container"></div></div>';

                    // adds an html fixture to the DOM
                    document.body.insertAdjacentHTML('afterbegin', fixture);

                    dataset = buildDataSet('withTwoFlatTopics');
                    lineChart = chart();

                    containerFixture = d3.select('.test-container');
                    containerFixture.datum(dataset).call(lineChart);
                });

                // remove the html fixture from the DOM
                afterEach(() => {
                    document.body.removeChild(
                        document.getElementById('fixture')
                    );
                });

                it('should render a chart with two lines', () => {
                    const expected = 2;
                    const actual = containerFixture
                        .select('.chart-group')
                        .selectAll('path')
                        .size();

                    expect(actual).toEqual(expected);
                });
            });

            describe('when it has a colorMap', () => {
                const colorMap = {
                    123: 'green',
                    120: 'blue',
                };

                beforeEach(() => {
                    const fixture =
                        '<div id="fixture"><div class="test-container"></div></div>';

                    // adds an html fixture to the DOM
                    document.body.insertAdjacentHTML('afterbegin', fixture);

                    dataset = buildDataSet('withTwoFlatTopics');
                    lineChart = chart().colorMap(colorMap);

                    containerFixture = d3.select('.test-container');
                    containerFixture.datum(dataset).call(lineChart);
                });

                // remove the html fixture from the DOM
                afterEach(() => {
                    document.body.removeChild(
                        document.getElementById('fixture')
                    );
                });

                it('should add the proper color to each stack', () => {
                    const lines = containerFixture.selectAll('.line');

                    lines.nodes().forEach((d) => {
                        expect(d.getAttribute('stroke')).toEqual(
                            colorMap[d.__data__.topic]
                        );
                    });
                });
            });

            describe('when isLoading is true', () => {
                it('should render the loading state', () => {
                    const expected = 1;

                    lineChart.isLoading(true);
                    containerFixture.datum(dataset).call(lineChart);

                    const actual = containerFixture
                        .select('.line-load-state')
                        .size();

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('when single line', () => {
            describe('when x-axis value type is number', () => {
                beforeEach(() => {
                    const fixture =
                        '<div id="fixture"><div class="test-container"></div></div>';

                    // adds an html fixture to the DOM
                    document.body.insertAdjacentHTML('afterbegin', fixture);

                    dataset = buildDataSet('withNumericKeys');
                    lineChart = chart().xAxisValueType('number');

                    containerFixture = d3.select('.test-container');
                    containerFixture.datum(dataset).call(lineChart);
                });

                it('the highest X-axis value is a number', () => {
                    let xAxis = containerFixture.selectAll('.x-axis-group');
                    let text = xAxis.select('g.tick:last-child');

                    expect(text.text()).toBe('8.0k');
                });
            });

            describe('when x-axis value type is number and x-axis scale is logarithmic', () => {
                beforeEach(() => {
                    const fixture =
                        '<div id="fixture"><div class="test-container"></div></div>';

                    // adds an html fixture to the DOM
                    document.body.insertAdjacentHTML('afterbegin', fixture);

                    dataset = buildDataSet('withNumericKeys');
                    lineChart = chart()
                        .xAxisValueType('number')
                        .xAxisScale('logarithmic');

                    containerFixture = d3.select('.test-container');
                    containerFixture.datum(dataset).call(lineChart);
                });

                it('one X-axis value is a logarithmic number', () => {
                    let xAxis = containerFixture.selectAll('.x-axis-group');
                    let text = xAxis.select('g.tick:nth-child(2)');

                    expect(text.text()).toBe('10^1');
                });
            });
        });

        describe('data points', () => {
            beforeEach(() => {
                const fixture =
                    '<div id="fixture"><div class="test-container"></div></div>';

                // adds an html fixture to the DOM
                document.body.insertAdjacentHTML('afterbegin', fixture);

                dataset = buildDataSet('with5Topics');
                lineChart = chart();

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(lineChart);
            });

            // remove the html fixture from the DOM
            afterEach(() => {
                document.body.removeChild(document.getElementById('fixture'));
            });

            describe('when shouldShowAllDataPoints is true', () => {
                beforeEach(() => {
                    lineChart = chart().shouldShowAllDataPoints(true);

                    containerFixture = d3
                        .select('.test-container')
                        .append('svg');
                    containerFixture.datum(dataset).call(lineChart);
                });

                it('chart should render data points container', () => {
                    const expected = 1;
                    const actual = containerFixture
                        .select('.data-points-container')
                        .size();

                    expect(actual).toEqual(expected);
                });

                it('data points container renders a circle for each data point', () => {
                    const expected = dataset.dataByDate.reduce(
                        (accum, dataPoint) => accum + dataPoint.topics.length,
                        0
                    );
                    const actual = containerFixture
                        .select('.data-points-container')
                        .selectAll('circle')
                        .size();

                    expect(actual).toEqual(expected);
                });

                it('each data circle has proper attributes', () => {
                    const circles = containerFixture
                        .select('.data-points-container')
                        .selectAll('circle')
                        .nodes();

                    circles.forEach((circle) => {
                        expect(circle.getAttribute('class')).toBe(
                            'data-point-mark'
                        );
                        expect(circle.getAttribute('r')).toBe('5');
                        expect(circle.getAttribute('cx')).toBeDefined();
                        expect(circle.getAttribute('cy')).toBeDefined();
                        expect(circle.getAttribute('style')).toBeDefined();
                    });
                });
            });
        });
    });

    describe('lifecycle', () => {
        beforeEach(() => {
            const fixture =
                '<div id="fixture"><div class="test-container"></div></div>';

            // adds an html fixture to the DOM
            document.body.insertAdjacentHTML('afterbegin', fixture);

            dataset = buildDataSet('with5Topics');
            lineChart = chart();

            containerFixture = d3.select('.test-container');
            containerFixture.datum(dataset).call(lineChart);
        });

        // remove the html fixture from the DOM
        afterEach(() => {
            document.body.removeChild(document.getElementById('fixture'));
        });

        it('should trigger an event on hover', () => {
            const callback = jest.fn();
            const container = containerFixture.selectAll('svg');
            const expectedCalls = 1;
            const expectedArguments = 2;

            lineChart.on('customMouseOver', callback);
            container.dispatch('mouseover');

            expect(callback.mock.calls).toHaveLength(expectedCalls);
            expect(callback.mock.calls[0]).toHaveLength(expectedArguments);
        });

        it('should trigger an event on mouse out', () => {
            const callback = jest.fn();
            const container = containerFixture.selectAll('svg');
            const expectedCalls = 1;
            const expectedArguments = 2;

            lineChart.on('customMouseOut', callback);
            container.dispatch('mouseout');

            expect(callback.mock.calls).toHaveLength(expectedCalls);
            expect(callback.mock.calls[0]).toHaveLength(expectedArguments);
        });

        it('should trigger an event on touchmove', () => {
            const callback = jest.fn();
            const container = containerFixture.selectAll('svg');
            const expectedCalls = 1;
            const expectedArguments = 2;

            lineChart.on('customTouchMove', callback);
            container.dispatch('touchmove');

            expect(callback.mock.calls).toHaveLength(expectedCalls);
            expect(callback.mock.calls[0]).toHaveLength(expectedArguments);
        });

        it('should show the overlay when the mouse is hovering', () => {
            const container = containerFixture.selectAll('svg');
            const expectedInitial = 'none';
            const expected = 'block';
            let actual = containerFixture.select('.overlay').style('display');

            expect(actual).toEqual(expectedInitial);
            container.dispatch('mouseover');
            actual = containerFixture.select('.overlay').style('display');

            expect(actual).toEqual(expected);
        });

        it('should show a vertical line where the mouse is hovering', () => {
            const expected = true;
            const container = containerFixture.selectAll('svg');
            const verticalLine = d3.select('.hover-marker line');
            let actual;

            container.dispatch('mouseover');
            actual = hasClass(verticalLine, 'bc-is-active');

            expect(actual).toEqual(expected);
        });

        it('should hide the vertical marker when the mouse is out', () => {
            const container = containerFixture.selectAll('svg');
            const verticalLine = d3.select('.hover-marker line');

            expect(hasClass(verticalLine, 'bc-is-active')).toBe(false);
            container.dispatch('mouseover');
            expect(hasClass(verticalLine, 'bc-is-active')).toBe(true);
            container.dispatch('mouseout');
            expect(hasClass(verticalLine, 'bc-is-active')).toBe(false);
        });
    });

    describe('aPI', () => {
        beforeEach(() => {
            const fixture =
                '<div id="fixture"><div class="test-container"></div></div>';

            // adds an html fixture to the DOM
            document.body.insertAdjacentHTML('afterbegin', fixture);

            dataset = buildDataSet('withOneSource');
            lineChart = chart();

            containerFixture = d3.select('.test-container');
            containerFixture.datum(dataset).call(lineChart);
        });

        // remove the html fixture from the DOM
        afterEach(() => {
            document.body.removeChild(document.getElementById('fixture'));
        });

        it('should provide animationDuration getter and setter', () => {
            let defaultAnimationDuration = lineChart.animationDuration(),
                testAnimationDuration = 2000,
                newAnimationDuration;

            lineChart.animationDuration(testAnimationDuration);
            newAnimationDuration = lineChart.animationDuration();

            expect(defaultAnimationDuration).not.toBe(testAnimationDuration);
            expect(newAnimationDuration).toBe(testAnimationDuration);
        });

        it('should provide an axisTimeCombinations accessor', () => {
            let axisTimeCombinations = lineChart.axisTimeCombinations;

            expect(axisTimeCombinations).toEqual({
                MINUTE_HOUR: 'minute-hour',
                HOUR_DAY: 'hour-daymonth',
                DAY_MONTH: 'day-month',
                MONTH_YEAR: 'month-year',
                CUSTOM: 'custom',
            });
        });

        describe('export', () => {
            it('should have exportChart defined', () => {
                expect(lineChart.exportChart).toBeDefined();
            });
        });

        it('should provide a colorSchema getter and setter', () => {
            let previous = lineChart.colorSchema(),
                expected = ['#ffffff', '#fafefc', '#000000'],
                actual;

            lineChart.colorSchema(expected);
            actual = lineChart.colorSchema();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide colorMap getter and setter', () => {
            let previous = lineChart.colorMap(),
                expected = {
                    testName: 'red',
                    testName2: 'black',
                },
                actual;

            lineChart.colorMap(expected);
            actual = lineChart.colorMap();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide dateLabel getter and setter', () => {
            let previous = lineChart.dateLabel(),
                expected = 'dateUTC',
                actual;

            lineChart.dateLabel(expected);
            actual = lineChart.dateLabel();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide grid mode getter and setter', () => {
            let previous = lineChart.grid(),
                expected = 'vertical',
                actual;

            lineChart.grid(expected);
            actual = lineChart.grid();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide height getter and setter', () => {
            let previous = lineChart.height(),
                expected = 200,
                actual;

            lineChart.height(expected);
            actual = lineChart.height();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide isAnimated getter and setter', () => {
            let previous = lineChart.isAnimated(),
                expected = true,
                actual;

            lineChart.isAnimated(expected);
            actual = lineChart.isAnimated();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide isLoading getter and setter', () => {
            let previous = lineChart.isLoading(),
                expected = true,
                actual;

            lineChart.isLoading(expected);
            actual = lineChart.isLoading();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        describe('margin', () => {
            it('should provide margin getter and setter', () => {
                let previous = lineChart.margin(),
                    expected = { top: 4, right: 4, bottom: 4, left: 4 },
                    actual;

                lineChart.margin(expected);
                actual = lineChart.margin();

                expect(previous).not.toBe(expected);
                expect(actual).toEqual(expected);
            });

            describe('when margins are set partially', () => {
                it('should override the default values', () => {
                    let previous = lineChart.margin(),
                        expected = {
                            ...previous,
                            top: 10,
                            right: 20,
                        },
                        actual;

                    lineChart.width(expected);
                    actual = lineChart.width();

                    expect(previous).not.toBe(actual);
                    expect(actual).toEqual(expected);
                });
            });
        });

        it('should not have numberFormat by default', () => {
            let expected = undefined,
                actual;

            actual = lineChart.numberFormat();

            expect(expected).toBe(actual);
        });

        it('should provide numberFormat getter and setter', () => {
            let previous = lineChart.numberFormat(),
                expected = 'd',
                actual;

            lineChart.numberFormat(expected);
            actual = lineChart.numberFormat();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide lineCurve getter and setter', () => {
            let previous = lineChart.lineCurve(),
                expected = 'basis',
                actual;

            lineChart.lineCurve(expected);
            actual = lineChart.lineCurve();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide lineGradient getter and setter', () => {
            let previous = lineChart.lineGradient(),
                expected = ['#ddd', '#ccc'],
                actual;

            lineChart.lineGradient(expected);
            actual = lineChart.lineGradient();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide locale getter and setter', () => {
            let previous = lineChart.locale(),
                expected = 'en-US',
                actual;

            lineChart.locale(expected);
            actual = lineChart.locale();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should have shouldShowAllDataPoints getter and setter', () => {
            let previous = lineChart.shouldShowAllDataPoints(),
                expected = true,
                actual;

            lineChart.shouldShowAllDataPoints(expected);
            actual = lineChart.shouldShowAllDataPoints();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide a tooltip threshold getter and setter', () => {
            let previous = lineChart.tooltipThreshold(),
                expected = 600,
                actual;

            lineChart.tooltipThreshold(expected);
            actual = lineChart.tooltipThreshold();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide topicLabel getter and setter', () => {
            let previous = lineChart.topicLabel(),
                expected = 'valueSet',
                actual;

            lineChart.topicLabel(expected);
            actual = lineChart.topicLabel();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide valueLabel getter and setter', () => {
            let previous = lineChart.valueLabel(),
                expected = 'quantity',
                actual;

            lineChart.valueLabel(expected);
            actual = lineChart.valueLabel();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide width getter and setter', () => {
            let previous = lineChart.width(),
                expected = 200,
                actual;

            lineChart.width(expected);
            actual = lineChart.width();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide xAxisLabel getter and setter', () => {
            let previous = lineChart.xAxisLabel(),
                expected = 'valueSet',
                actual;

            lineChart.xAxisLabel(expected);
            actual = lineChart.xAxisLabel();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide a xTicks getter and setter', () => {
            let previous = lineChart.xTicks(),
                expected = 2,
                actual;

            lineChart.xTicks(expected);
            actual = lineChart.xTicks();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide a xAxisFormat getter and setter', () => {
            let previous = lineChart.xAxisFormat(),
                expected = lineChart.axisTimeCombinations.HOUR_DAY,
                actual;

            lineChart.xAxisFormat(expected);
            actual = lineChart.xAxisFormat();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide a xAxisCustomFormat getter and setter', () => {
            let previous = lineChart.xAxisCustomFormat(),
                expected = '%d %b',
                actual;

            lineChart.xAxisCustomFormat(expected);
            actual = lineChart.xAxisCustomFormat();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide yTicks getter and setter', () => {
            let previous = lineChart.yTicks(),
                expected = 3,
                actual;

            lineChart.yTicks(expected);
            actual = lineChart.yTicks();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide yAxisLabel getter and setter', () => {
            let previous = lineChart.yAxisLabel(),
                expected = 'valueSet',
                actual;

            lineChart.yAxisLabel(expected);
            actual = lineChart.yAxisLabel();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide yAxisLabelPadding getter and setter', () => {
            let previous = lineChart.yAxisLabelPadding(),
                expected = 100,
                actual;

            lineChart.yAxisLabelPadding(expected);
            actual = lineChart.yAxisLabelPadding();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide a lines getter and setter', () => {
            let previous = lineChart.lines(),
                expected = [
                    {
                        y: 2,
                        color: 'grey',
                    },
                ],
                actual;

            lineChart.lines(expected);
            actual = lineChart.lines();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide xAxisValueType getter and setter', () => {
            let previous = lineChart.xAxisValueType(),
                expected = 'number',
                actual;

            lineChart.xAxisValueType(expected);
            actual = lineChart.xAxisValueType();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('default xAxisValueType is date', () => {
            let defaultXAxisValueType = lineChart.xAxisValueType();

            expect(defaultXAxisValueType).toBe('date');
        });

        it('should provide xAxisScale getter and setter', () => {
            let previous = lineChart.xAxisScale(),
                expected = 'logarithmic',
                actual;

            lineChart.xAxisScale(expected);
            actual = lineChart.xAxisScale();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('default xAxisScale is linear', () => {
            let defaultXAxisScale = lineChart.xAxisScale();

            expect(defaultXAxisScale).toBe('linear');
        });
    });
});
