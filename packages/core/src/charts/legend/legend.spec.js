import { select } from 'd3-selection';

import legend from './legend';
import { DonutDataBuilder } from '../donut/donutChartDataBuilder';

const aTestDataSet = () => new DonutDataBuilder();
const buildDataSet = (dataSetName) => {
    return aTestDataSet()[dataSetName]().build();
};
const stubElementWidth = (width) =>
    vi
        .spyOn(Element.prototype, 'getBoundingClientRect')
        .mockReturnValue({ width });
const getTranslateX = (selection) =>
    parseFloat(selection.attr('transform').match(/translate\(([^,]+),/)[1]);
const getTranslateY = (selection) =>
    parseFloat(
        selection.attr('transform').match(/translate\([^,]+,([^)]+)\)/)[1]
    );

describe('legend', () => {
    let legendChart, dataset, containerFixture;

    // Inside the fixture, so the top-level afterEach removes it. For charts
    // configured differently from the one the top-level beforeEach draws.
    const drawInNewContainer = (chart, data) => {
        const container = select('#fixture').append('div');

        container.datum(data).call(chart);

        return container;
    };

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        dataset = buildDataSet('withFivePlusOther');
        legendChart = legend();

        containerFixture = select('.test-container');
        containerFixture.datum(dataset).call(legendChart);
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    describe('commands before the first render', () => {
        // A wrapper or a React prop can call these on a legend that has not
        // drawn yet; there is nothing to change, and they must not throw
        it('should do nothing on clearHighlight', () => {
            expect(() => legend().clearHighlight()).not.toThrow();
        });

        it('should do nothing on highlight', () => {
            expect(() => legend().highlight(1)).not.toThrow();
        });
    });

    describe('highlight commands', () => {
        const faded = () =>
            containerFixture.selectAll('g.legend-entry.is-faded').size();

        it('should fade every entry but the highlighted one', () => {
            legendChart.highlight(dataset[0].id);

            expect(faded()).toBe(dataset.length - 1);
        });

        it('should clear the highlight', () => {
            legendChart.highlight(dataset[0].id);
            legendChart.clearHighlight();

            expect(faded()).toBe(0);
        });

        it('should keep the highlighted entry unfaded', () => {
            const expected = 0;

            legendChart.highlight(dataset[0].id);

            const actual = containerFixture
                .selectAll(`[data-item="${dataset[0].id}"].is-faded`)
                .size();

            expect(actual).toEqual(expected);
        });

        it('should highlight an entry with an id of zero', () => {
            const expected = dataset.length - 1;

            legendChart.highlight(0);

            const actual = faded();

            expect(actual).toEqual(expected);
        });

        it('should move the highlight to the last entry asked for', () => {
            const expected = [dataset[1].id];

            legendChart.highlight(dataset[0].id);
            legendChart.highlight(dataset[1].id);

            const actual = containerFixture
                .selectAll('g.legend-entry:not(.is-faded)')
                .nodes()
                .map((node) => +node.getAttribute('data-item'));

            expect(actual).toEqual(expected);
        });

        describe('when the id matches no entry', () => {
            it('should fade nothing', () => {
                const expected = 0;

                legendChart.highlight(9999);

                const actual = faded();

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('render', () => {
        it('should show a chart with minimal requirements', () => {
            const expected = 1;
            const actual = containerFixture.select('.britechart-legend').size();

            expect(actual).toEqual(expected);
        });

        it('should size the svg to the width and height set', () => {
            const expected = ['400', '100', '0,0,400,100'];
            const svg = drawInNewContainer(
                legend().width(400).height(100),
                dataset
            ).select('svg');
            const actual = [
                svg.attr('width'),
                svg.attr('height'),
                svg.attr('viewBox'),
            ];

            expect(actual).toEqual(expected);
        });

        it('should apply the margin to the container group', () => {
            const expected = 'translate(20,30)';
            const actual = drawInNewContainer(
                legend().margin({ top: 30, left: 20 }),
                dataset
            )
                .select('g.legend-container-group')
                .attr('transform');

            expect(actual).toEqual(expected);
        });

        it('should space the entries evenly along the height', () => {
            const expected = [
                'translate(40,42.5)',
                'translate(40,85)',
                'translate(40,127.5)',
            ];
            const actual = drawInNewContainer(
                legend(),
                buildDataSet('withThreeCategories')
            )
                .selectAll('.legend-entry')
                .nodes()
                .map((node) => node.getAttribute('transform'));

            expect(actual).toEqual(expected);
        });

        it('should size the markers with markerSize', () => {
            const expected = '12';
            const actual = drawInNewContainer(legend().markerSize(24), dataset)
                .select('.legend-circle')
                .attr('r');

            expect(actual).toEqual(expected);
        });

        it('should separate the names from the markers with marginRatio', () => {
            const expected = '48';
            const actual = drawInNewContainer(
                legend().markerSize(16).marginRatio(3),
                dataset
            )
                .select('.legend-entry-name')
                .attr('x');

            expect(actual).toEqual(expected);
        });

        it('should align the values to the width of the chart', () => {
            const expected = '250';
            const actual = drawInNewContainer(
                legend().width(300).margin({ left: 5, right: 5 }),
                dataset
            )
                .select('.legend-entry-value')
                .attr('x');

            expect(actual).toEqual(expected);
        });

        describe('accessibility', () => {
            it('should expose the legend as a group of readable text', () => {
                const expected = 'group';
                const actual = containerFixture
                    .select('.britechart-legend')
                    .attr('role');

                expect(actual).toEqual(expected);
            });

            it('should announce the chart as a legend by default', () => {
                const expected = 'Legend';
                const actual = containerFixture
                    .select('.britechart-legend')
                    .attr('aria-label');

                expect(actual).toEqual(expected);
            });

            it('should announce the a11yTitle instead', () => {
                const expected = 'Sales by product';
                const actual = drawInNewContainer(
                    legend().a11yTitle(expected),
                    dataset
                )
                    .select('.britechart-legend')
                    .attr('aria-label');

                expect(actual).toEqual(expected);
            });

            it('should render the a11yDescription as a desc', () => {
                const expected = 'Shiny sells the most';
                const actual = drawInNewContainer(
                    legend().a11yDescription(expected),
                    dataset
                )
                    .select('.britechart-legend desc')
                    .text();

                expect(actual).toEqual(expected);
            });
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
                    parseInt(select(elements[index]).attr('data-item'), 10)
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
            const expected = dataset.map(({ name }) => name);
            const actual = containerFixture
                .select('.britechart-legend')
                .selectAll('.legend-entry-name')
                .nodes()
                .map((node) => node.textContent);

            expect(actual).toEqual(expected);
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
            const expected = dataset.map(({ quantity }) => String(quantity));

            legendChart.numberFormat('d');
            containerFixture.call(legendChart);

            const actual = containerFixture
                .select('.britechart-legend')
                .selectAll('.legend-entry-value')
                .nodes()
                .map((node) => node.textContent);

            expect(actual).toEqual(expected);
        });

        it('should format the values with numberFormat', () => {
            const expected = '1,500.0';
            const actual = drawInNewContainer(legend().numberFormat(',.1f'), [
                { id: 1, name: 'Shiny', quantity: 1500 },
            ])
                .select('.legend-entry-value')
                .text();

            expect(actual).toEqual(expected);
        });

        it('should trim the trailing zeros from the values by default', () => {
            const expected = ['86', '814', '1.5k'];
            const actual = drawInNewContainer(legend(), [
                { id: 1, name: 'Shiny', quantity: 86 },
                { id: 2, name: 'Radiant', quantity: 814 },
                { id: 3, name: 'Sparkling', quantity: 1500 },
            ])
                .selectAll('.legend-entry-value')
                .nodes()
                .map((node) => node.textContent);

            expect(actual).toEqual(expected);
        });

        describe('when data changes', () => {
            it('should draw only the new entries', () => {
                const data = buildDataSet('withThreeCategories');
                const expected = data.map(({ name }) => name);

                containerFixture.datum(data).call(legendChart);

                const actual = containerFixture
                    .selectAll('.legend-entry-name')
                    .nodes()
                    .map((node) => node.textContent);

                expect(actual).toEqual(expected);
            });

            it('should not add a second svg', () => {
                const expected = 1;

                containerFixture.call(legendChart);

                const actual = containerFixture
                    .selectAll('svg.britechart-legend')
                    .size();

                expect(actual).toEqual(expected);
            });
        });

        describe('when the orientation changes', () => {
            it('should redraw the entries in a single line', () => {
                const expected = [1, dataset.length];

                legendChart.isHorizontal(true);
                containerFixture.call(legendChart);

                const actual = [
                    containerFixture.selectAll('.legend-line').size(),
                    containerFixture.selectAll('.legend-entry').size(),
                ];

                expect(actual).toEqual(expected);
            });
        });

        describe('when there is no data', () => {
            it('should draw no entries', () => {
                const expected = 0;
                const actual = drawInNewContainer(legend(), [])
                    .selectAll('.legend-entry')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should draw no entries in a horizontal legend', () => {
                const expected = 0;
                const actual = drawInNewContainer(
                    legend().isHorizontal(true),
                    []
                )
                    .selectAll('.legend-entry')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should not split a horizontal legend too narrow for its line', () => {
                const expected = 1;
                const actual = drawInNewContainer(
                    legend().isHorizontal(true).width(20),
                    []
                )
                    .selectAll('.legend-line')
                    .size();

                expect(actual).toEqual(expected);
            });
        });

        describe('when an entry is highlighted by id', () => {
            const notFaded = (container) =>
                container
                    .selectAll('g.legend-entry:not(.is-faded)')
                    .nodes()
                    .map((node) => +node.getAttribute('data-item'));

            it('should draw only that entry unfaded', () => {
                const expected = [dataset[1].id];
                const actual = notFaded(
                    drawInNewContainer(
                        legend().highlightEntryById(dataset[1].id),
                        dataset
                    )
                );

                expect(actual).toEqual(expected);
            });

            it('should draw only that entry unfaded in a horizontal legend', () => {
                const expected = [dataset[1].id];
                const actual = notFaded(
                    drawInNewContainer(
                        legend()
                            .isHorizontal(true)
                            .highlightEntryById(dataset[1].id),
                        dataset
                    )
                );

                expect(actual).toEqual(expected);
            });

            it('should draw only that entry unfaded with an id of zero', () => {
                const expected = [0];
                const actual = notFaded(
                    drawInNewContainer(legend().highlightEntryById(0), dataset)
                );

                expect(actual).toEqual(expected);
            });

            it('should keep the highlight when the chart redraws', () => {
                const expected = [dataset[1].id];
                const chart = legend().highlightEntryById(dataset[1].id);
                const container = drawInNewContainer(chart, dataset);

                container.call(chart);

                const actual = notFaded(container);

                expect(actual).toEqual(expected);
            });

            describe('when the id matches no entry', () => {
                it('should fade nothing', () => {
                    const expected = 0;
                    const actual = drawInNewContainer(
                        legend().highlightEntryById(9999),
                        dataset
                    )
                        .selectAll('.is-faded')
                        .size();

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('when quantities are strings', () => {
            it('should draw them as numbers', () => {
                const expected = ['200', '1500'];
                const actual = drawInNewContainer(legend().numberFormat('d'), [
                    { id: 1, name: 'Shiny', quantity: '200' },
                    { id: 2, name: 'Radiant', quantity: '1500' },
                ])
                    .selectAll('.legend-entry-value')
                    .nodes()
                    .map((node) => node.textContent);

                expect(actual).toEqual(expected);
            });
        });

        describe('when a quantity is zero', () => {
            it('should still draw it', () => {
                const expected = ['0'];
                const actual = drawInNewContainer(legend().numberFormat('d'), [
                    { id: 1, name: 'Shiny', quantity: 0 },
                ])
                    .selectAll('.legend-entry-value')
                    .nodes()
                    .map((node) => node.textContent);

                expect(actual).toEqual(expected);
            });
        });

        describe('when only some entries have a quantity', () => {
            it('should not draw any value', () => {
                const expected = 0;
                const actual = drawInNewContainer(legend(), [
                    { id: 1, name: 'Shiny', quantity: 200 },
                    { id: 2, name: 'Radiant', quantity: null },
                    { id: 3, name: 'Sparkling' },
                ])
                    .selectAll('.legend-entry-value')
                    .size();

                expect(actual).toEqual(expected);
            });
        });

        describe('when no quantities in our data', () => {
            beforeEach(() => {
                dataset = buildDataSet('withNoQuantity');

                containerFixture = select('.test-container');
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

            describe('when the legend is wider than the svg', () => {
                let widthSpy;

                beforeEach(() => {
                    widthSpy = stubElementWidth(400);
                });

                afterEach(() => {
                    widthSpy.mockRestore();
                });

                it('should stay at the margin', () => {
                    const expected = 'translate(5,5)';
                    const actual = drawInNewContainer(legend(), dataset)
                        .select('g.legend-container-group')
                        .attr('transform');

                    expect(actual).toEqual(expected);
                });
            });

            describe('when the legend is narrower than the svg', () => {
                let widthSpy;

                // Where the markers start on the svg. The bounding box covers
                // what is drawn, and the entries sit inset within the group.
                const getLeftEdge = (container) =>
                    getTranslateX(
                        container.select('g.legend-container-group')
                    ) + getTranslateX(container.select('.legend-entry'));

                beforeEach(() => {
                    widthSpy = stubElementWidth(200);
                });

                afterEach(() => {
                    widthSpy.mockRestore();
                });

                it('should center what it draws on the svg', () => {
                    const expected = 60;
                    const actual = getLeftEdge(
                        drawInNewContainer(legend().width(320), dataset)
                    );

                    expect(actual).toEqual(expected);
                });

                it('should center it with any marker size and margin ratio', () => {
                    const expected = 60;
                    const actual = getLeftEdge(
                        drawInNewContainer(
                            legend().width(320).markerSize(24).marginRatio(1),
                            dataset
                        )
                    );

                    expect(actual).toEqual(expected);
                });

                it('should keep the top margin', () => {
                    const expected = 12;
                    const actual = getTranslateY(
                        drawInNewContainer(
                            legend().margin({ top: 12 }),
                            dataset
                        ).select('g.legend-container-group')
                    );

                    expect(actual).toEqual(expected);
                });

                describe('when it almost fills the svg', () => {
                    it('should stay inside the svg', () => {
                        const expected = 10;

                        widthSpy.mockReturnValue({ width: 300 });

                        const actual = getLeftEdge(
                            drawInNewContainer(legend().width(320), dataset)
                        );

                        expect(actual).toEqual(expected);
                    });
                });
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

                legendChart.unit(unit).numberFormat('d');

                containerFixture = select('.test-container');
                containerFixture.datum(dataset).call(legendChart);
            });

            // remove the html fixture from the DOM
            afterEach(() => {
                document.body.removeChild(document.getElementById('fixture'));
            });

            it('should add the proper value with unit to each value element', () => {
                const expected = dataset.map(
                    ({ quantity }) => `${quantity}${unit}`
                );
                const actual = containerFixture
                    .select('.britechart-legend')
                    .selectAll('.legend-entry-value')
                    .nodes()
                    .map((node) => node.textContent);

                expect(actual).toEqual(expected);
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

                containerFixture = select('.test-container');
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
                        parseInt(select(elements[index]).attr('data-item'), 10)
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

            it('should not draw the values', () => {
                const expected = 0;
                const actual = containerFixture
                    .selectAll('.legend-entry-value')
                    .size();

                expect(actual).toEqual(expected);
            });

            describe('when the line fits with room to spare', () => {
                let widthSpy;

                beforeEach(() => {
                    widthSpy = stubElementWidth(200);
                });

                afterEach(() => {
                    widthSpy.mockRestore();
                });

                it('should center it on the svg', () => {
                    const expected = 138;
                    const actual = getTranslateX(
                        drawInNewContainer(
                            legend().isHorizontal(true).width(500),
                            dataset
                        ).select('g.legend-container-group')
                    );

                    expect(actual).toEqual(expected);
                });

                it('should keep the top margin', () => {
                    const expected = 12;
                    const actual = getTranslateY(
                        drawInNewContainer(
                            legend()
                                .isHorizontal(true)
                                .width(500)
                                .margin({ top: 12 }),
                            dataset
                        ).select('g.legend-container-group')
                    );

                    expect(actual).toEqual(expected);
                });

                it('should keep the markers inside a short svg', () => {
                    const container = drawInNewContainer(
                        legend().isHorizontal(true).width(500).height(30),
                        dataset
                    );
                    const circle = container.select('.legend-circle');
                    const actual =
                        getTranslateY(
                            container.select('g.legend-container-group')
                        ) +
                        getTranslateY(container.select('.legend-entry')) +
                        +circle.attr('cy') -
                        +circle.attr('r');

                    expect(actual).toBeGreaterThanOrEqual(0);
                });
            });

            describe('when chart width is not enough for one line', () => {
                let widthSpy;

                beforeEach(() => {
                    widthSpy = stubElementWidth(400);

                    const fixture =
                        '<div id="fixture"><div class="test-container"></div></div>';

                    // adds an html fixture to the DOM
                    document.body.insertAdjacentHTML('afterbegin', fixture);

                    dataset = buildDataSet('withThreeCategories');
                    legendChart = legend();

                    legendChart.isHorizontal(true).height(50).width(200);

                    containerFixture = select('.test-container');
                    containerFixture.datum(dataset).call(legendChart);
                });

                // remove the html fixture from the DOM
                afterEach(() => {
                    widthSpy.mockRestore();
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

                it('should move the last entry to the new line', () => {
                    const expected = [dataset[dataset.length - 1].id];
                    const actual = containerFixture
                        .selectAll('.legend-line:last-child .legend-entry')
                        .nodes()
                        .map((node) => +node.getAttribute('data-item'));

                    expect(actual).toEqual(expected);
                });

                it('should keep the rest of the entries on the first line', () => {
                    const expected = dataset.slice(0, -1).map(({ id }) => id);
                    const actual = containerFixture
                        .selectAll('.legend-line:first-child .legend-entry')
                        .nodes()
                        .map((node) => +node.getAttribute('data-item'));

                    expect(actual).toEqual(expected);
                });

                it('should keep every entry once', () => {
                    const expected = dataset.length;
                    const actual = containerFixture
                        .selectAll('.legend-entry')
                        .size();

                    expect(actual).toEqual(expected);
                });

                it('should stay at the margin', () => {
                    const expected = 'translate(5,5)';
                    const actual = containerFixture
                        .select('g.legend-container-group')
                        .attr('transform');

                    expect(actual).toEqual(expected);
                });

                describe('when there is a single entry', () => {
                    const singleEntry = [{ id: 1, name: 'Shiny' }];

                    it('should keep it on the only line', () => {
                        const expected = 1;
                        const actual = drawInNewContainer(
                            legend().isHorizontal(true).height(50).width(200),
                            singleEntry
                        )
                            .selectAll('.legend-line')
                            .size();

                        expect(actual).toEqual(expected);
                    });

                    it('should not move it', () => {
                        const expected = 'translate(16,20)';
                        const actual = drawInNewContainer(
                            legend().isHorizontal(true).height(50).width(200),
                            singleEntry
                        )
                            .select('.legend-entry')
                            .attr('transform');

                        expect(actual).toEqual(expected);
                    });
                });

                describe('when the chart redraws', () => {
                    it('should not add more lines', () => {
                        const expected = 2;

                        containerFixture.call(legendChart);

                        const actual = containerFixture
                            .selectAll('.legend-line')
                            .size();

                        expect(actual).toEqual(expected);
                    });
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

                containerFixture = select('.test-container');
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

            describe('when an entry is missing from the map', () => {
                it('should take its color from the colorSchema', () => {
                    const expected = ['green', 'red', 'blue'];
                    const actual = drawInNewContainer(
                        legend()
                            .colorMap({ Shiny: 'green' })
                            .colorSchema(['red', 'blue', 'pink']),
                        dataset
                    )
                        .selectAll('.legend-circle')
                        .nodes()
                        .map((node) => node.style.fill);

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('when the colorMap is set to undefined', () => {
            it('should take the colors from the colorSchema', () => {
                const expected = ['red', 'blue', 'pink'];
                const actual = drawInNewContainer(
                    legend().colorMap(undefined).colorSchema(expected),
                    buildDataSet('withThreeCategories')
                )
                    .selectAll('.legend-circle')
                    .nodes()
                    .map((node) => node.style.fill);

                expect(actual).toEqual(expected);
            });
        });

        describe('when legend has a colorSchema', () => {
            it('should color the markers with it, in order', () => {
                const expected = ['red', 'blue', 'pink'];
                const actual = drawInNewContainer(
                    legend().colorSchema(expected),
                    buildDataSet('withThreeCategories')
                )
                    .selectAll('.legend-circle')
                    .nodes()
                    .map((node) => node.style.fill);

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('render accessor', () => {
        it('should draw the chart into the target', () => {
            const expected = dataset.length;

            select('#fixture').append('div').attr('id', 'render-target');
            legend().render('#render-target', dataset);

            const actual = select('#render-target')
                .selectAll('.legend-entry')
                .size();

            expect(actual).toEqual(expected);
        });

        it('should return the chart to chain calls', () => {
            const expected = legend();
            const view = expected.render('.test-container', dataset);

            expect(view).toBe(expected);
        });
    });

    describe('aPI', () => {
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

                legendChart.margin({ top: 10, right: 20 });
                actual = legendChart.margin();

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

        it('should provide a11yTitle getter and setter', () => {
            let previous = legendChart.a11yTitle(),
                expected = 'Sales by product',
                actual;

            legendChart.a11yTitle(expected);
            actual = legendChart.a11yTitle();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide a11yDescription getter and setter', () => {
            let previous = legendChart.a11yDescription(),
                expected = 'Shiny sells the most',
                actual;

            legendChart.a11yDescription(expected);
            actual = legendChart.a11yDescription();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide highlightEntryById getter and setter', () => {
            let previous = legendChart.highlightEntryById(),
                expected = 3,
                actual;

            legendChart.highlightEntryById(expected);
            actual = legendChart.highlightEntryById();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide markerSize getter and setter', () => {
            let previous = legendChart.markerSize(),
                expected = 24,
                actual;

            legendChart.markerSize(expected);
            actual = legendChart.markerSize();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide numberFormat getter and setter', () => {
            let previous = legendChart.numberFormat(),
                expected = ',.2f',
                actual;

            legendChart.numberFormat(expected);
            actual = legendChart.numberFormat();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        it('should provide unit getter and setter', () => {
            let previous = legendChart.unit(),
                expected = 'kg',
                actual;

            legendChart.unit(expected);
            actual = legendChart.unit();

            expect(previous).not.toBe(expected);
            expect(actual).toBe(expected);
        });

        describe('defaults', () => {
            it('should have no a11yTitle', () => {
                const expected = null;
                const actual = legendChart.a11yTitle();

                expect(actual).toEqual(expected);
            });

            it('should have no a11yDescription', () => {
                const expected = null;
                const actual = legendChart.a11yDescription();

                expect(actual).toEqual(expected);
            });

            it('should have no highlighted entry', () => {
                const expected = null;
                const actual = legendChart.highlightEntryById();

                expect(actual).toEqual(expected);
            });

            it('should have a markerSize of 16', () => {
                const expected = 16;
                const actual = legendChart.markerSize();

                expect(actual).toEqual(expected);
            });

            it('should have a numberFormat of ~s', () => {
                const expected = '~s';
                const actual = legendChart.numberFormat();

                expect(actual).toEqual(expected);
            });

            it('should have no unit', () => {
                const expected = '';
                const actual = legendChart.unit();

                expect(actual).toEqual(expected);
            });
        });
    });
});
