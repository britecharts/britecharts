import * as d3 from 'd3';

import legend from 'legend';
import { DonutDataBuilder } from 'donutChartDataBuilder';

const aTestDataSet = () => new DonutDataBuilder();
const buildDataSet = (dataSetName) => {
    return aTestDataSet()[dataSetName]().build();
};

describe('Legend', () => {
    let legendChart, dataset, containerFixture, f;

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        dataset = buildDataSet('withFivePlusOther');
        legendChart = legend();

        containerFixture = d3.select('.test-container');
        containerFixture.datum(dataset).call(legendChart);
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    describe('Render', () => {
        it('should show a chart with minimal requirements', () => {
            const expected = 1;
            const actual = containerFixture.select('.britechart-legend').size();

            expect(actual).toEqual(expected);
        });

        describe('groups', () => {
            it('should create a legend-container-group', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('g.legend-container-group')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should create a legend-group', () => {
                const expected = 1;
                const actual = containerFixture.select('g.legend-group').size();

                expect(actual).toEqual(expected);
            });
        });

        it('should add a line group for each entry', () => {
            const expected = dataset.length;
            const actual = containerFixture
                .select('.britechart-legend')
                .selectAll('.legend-line')
                .size();

            expect(actual).toEqual(expected);
        });

        it('should add the proper data identifier to each entry', () => {
            const lines = containerFixture
                .select('.britechart-legend')
                .selectAll('.legend-entry');
            const elements = lines.nodes();

            lines.each(function (d, index) {
                expect(
                    parseInt(d3.select(elements[index]).attr('data-item'), 10)
                ).toEqual(dataset[index].id);
            });
        });

        it('should add a circle for each entry', () => {
            const expected = dataset.length;
            const actual = containerFixture
                .select('.britechart-legend')
                .selectAll('.legend-circle')
                .size();

            expect(actual).toEqual(expected);
        });

        it('should add a text element for each entry', () => {
            const expected = dataset.length;
            const actual = containerFixture
                .select('.britechart-legend')
                .selectAll('.legend-entry-name')
                .size();

            expect(actual).toEqual(expected);
        });

        it('should add the proper text to each text element', () => {
            const texts = containerFixture
                .select('.britechart-legend')
                .selectAll('.legend-entry-name text');
            const elements = texts[0];

            texts.each(function (d, index) {
                expect(elements[index]).toEqual(dataset[index].name);
            });
        });

        it('should add a value element for each entry', () => {
            const expected = dataset.length;
            const actual = containerFixture
                .select('.britechart-legend')
                .selectAll('.legend-entry-value')
                .size();

            expect(actual).toEqual(expected);
        });

        it('should add the proper value to each value element', () => {
            const texts = containerFixture
                .select('.britechart-legend')
                .selectAll('.legend-entry-value text');
            const elements = texts[0];

            texts.each(function (d, index) {
                expect(elements[index]).toEqual(dataset[index]['quantity']);
            });
        });

        describe('when no quantities in our data', () => {
            beforeEach(() => {
                dataset = buildDataSet('withNoQuantity');

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(legendChart);
            });

            it('should render the legend', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('svg.britechart-legend')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should not draw any value', () => {
                const expected = 0;
                const actual = containerFixture
                    .selectAll('.legend-entry-value')
                    .size();

                expect(actual).toEqual(expected);
            });
        });

        describe('when legend has unit', () => {
            let unit;

            beforeEach(() => {
                const fixture =
                    '<div id="fixture"><div class="test-container"></div></div>';

                // adds an html fixture to the DOM
                document.body.insertAdjacentHTML('afterbegin', fixture);

                unit = 'some unit';
                dataset = buildDataSet('withFivePlusOther');
                legendChart = legend();

                legendChart.unit(unit);

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(legendChart);
            });

            // remove the html fixture from the DOM
            afterEach(() => {
                document.body.removeChild(document.getElementById('fixture'));
            });

            it('should add the proper value with unit to each value element', () => {
                const texts = containerFixture
                    .select('.britechart-legend')
                    .selectAll('.legend-entry-value text');
                const elements = texts[0];

                texts.each(function (d, index) {
                    expect(elements[index]).toEqual(
                        dataset[index]['quantity'] + unit
                    );
                });
            });
        });

        describe('when legend is horizontal', () => {
            beforeEach(() => {
                const fixture =
                    '<div id="fixture"><div class="test-container"></div></div>';

                // adds an html fixture to the DOM
                document.body.insertAdjacentHTML('afterbegin', fixture);

                dataset = buildDataSet('withThreeCategories');
                legendChart = legend();

                legendChart.width(500).isHorizontal(true);

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(legendChart);
            });

            // remove the html fixture from the DOM
            afterEach(() => {
                document.body.removeChild(document.getElementById('fixture'));
            });

            it('should show a chart with minimal requirements', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('.britechart-legend')
                    .size();

                expect(actual).toEqual(expected);
            });

            describe('groups', () => {
                it('should create a legend-container-group', () => {
                    const expected = 1;
                    const actual = containerFixture
                        .select('g.legend-container-group')
                        .size();

                    expect(actual).toEqual(expected);
                });

                it('should create a legend-group', () => {
                    const expected = 1;
                    const actual = containerFixture
                        .select('g.legend-group')
                        .size();

                    expect(actual).toEqual(expected);
                });
            });

            it('should add only one line group', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('.britechart-legend')
                    .selectAll('.legend-line')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should add one entry per data', () => {
                const expected = dataset.length;
                const actual = containerFixture
                    .select('.britechart-legend')
                    .selectAll('.legend-entry')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should add the proper data identifier to each entry', () => {
                const lines = containerFixture
                    .select('.britechart-legend')
                    .selectAll('.legend-entry');
                const elements = lines.nodes();

                lines.each(function (d, index) {
                    expect(
                        parseInt(
                            d3.select(elements[index]).attr('data-item'),
                            10
                        )
                    ).toEqual(dataset[index].id);
                });
            });

            it('should add a circle for each entry', () => {
                const expected = dataset.length;
                const actual = containerFixture
                    .select('.britechart-legend')
                    .selectAll('.legend-circle')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should add a text element for each entry', () => {
                const expected = dataset.length;
                const actual = containerFixture
                    .select('.britechart-legend')
                    .selectAll('.legend-entry-name')
                    .size();

                expect(actual).toEqual(expected);
            });

            describe('when chart width is not enough for one line', () => {
                beforeEach(() => {
                    const fixture =
                        '<div id="fixture"><div class="test-container"></div></div>';

                    // adds an html fixture to the DOM
                    document.body.insertAdjacentHTML('afterbegin', fixture);

                    dataset = buildDataSet('withThreeCategories');
                    legendChart = legend();

                    legendChart.isHorizontal(true).height(50).width(200);

                    containerFixture = d3.select('.test-container');
                    containerFixture.datum(dataset).call(legendChart);
                });

                // remove the html fixture from the DOM
                afterEach(() => {
                    document.body.removeChild(
                        document.getElementById('fixture')
                    );
                });

                it('should create another line below', function () {
                    const expected = 2;
                    const actual = containerFixture
                        .select('.britechart-legend')
                        .selectAll('.legend-line')
                        .size();

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('when legend has a colorMap', () => {
            const colorMap = {
                Shiny: 'green',
                Radiant: 'blue',
                Sparkling: 'black',
            };

            beforeEach(() => {
                const fixture =
                    '<div id="fixture"><div class="test-container"></div></div>';

                // adds an html fixture to the DOM
                document.body.insertAdjacentHTML('afterbegin', fixture);

                dataset = buildDataSet('withThreeCategories');
                legendChart = legend();

                legendChart.colorMap(colorMap);

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(legendChart);
            });

            // remove the html fixture from the DOM
            afterEach(() => {
                document.body.removeChild(document.getElementById('fixture'));
            });

            it('should add the proper color to each marker', () => {
                const markers = containerFixture
                    .select('.britechart-legend')
                    .selectAll('.legend-circle');

                markers.nodes().forEach((d) => {
                    expect(d.style.fill).toEqual(colorMap[d.__data__.name]);
                });
            });
        });
    });

    describe('API', () => {
        it('should provide margin getter and setter', () => {
            let previous = legendChart.margin(),
                expected = { top: 4, right: 4, bottom: 4, left: 4 },
                actual;

            legendChart.margin(expected);
            actual = legendChart.margin();

            expect(previous).not.toBe(expected);
            expect(actual).toEqual(expected);
        });

        describe('when margins are set partially', function () {
            it('should override the default values', () => {
                let previous = legendChart.margin(),
                    expected = {
                        ...previous,
                        top: 10,
                        right: 20,
                    },
                    actual;

                legendChart.width(expected);
                actual = legendChart.width();

                expect(previous).not.toBe(actual);
                expect(actual).toEqual(expected);
            });
        });

        it('should provide margin ratio getter and setter', () => {
            let previous = legendChart.marginRatio(),
                expected = 5,
                actual;

            legendChart.marginRatio(expected);
            actual = legendChart.marginRatio();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide width getter and setter', () => {
            let previous = legendChart.width(),
                expected = 200,
                actual;

            legendChart.width(expected);
            actual = legendChart.width();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide height getter and setter', () => {
            let previous = legendChart.height(),
                expected = 200,
                actual;

            legendChart.height(expected);
            actual = legendChart.height();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide an horizontal mode getter and setter', () => {
            let previous = legendChart.isHorizontal(),
                expected = true,
                actual;

            legendChart.isHorizontal(expected);
            actual = legendChart.isHorizontal();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide colorSchema getter and setter', () => {
            let previous = legendChart.colorSchema(),
                expected = ['pink', 'red', 'magenta'],
                actual;

            legendChart.colorSchema(expected);
            actual = legendChart.colorSchema();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide colorMap getter and setter', () => {
            let previous = legendChart.colorMap(),
                expected = {
                    testName: 'red',
                    testName2: 'black',
                },
                actual;

            legendChart.colorMap(expected);
            actual = legendChart.colorMap();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });
    });
});
