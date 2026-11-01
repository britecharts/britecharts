import * as d3 from 'd3';

import chart from './treemap';
import { TreemapDataBuilder } from './treemapDataBuilder';
import colors from '../helpers/color';

const aTestDataSet = () => new TreemapDataBuilder();
const buildDataSet = (dataSetName) => aTestDataSet()[dataSetName]().build();

describe('treemap Chart', () => {
    let treemapChart, dataset, containerFixture;

    const area = (cell) =>
        +cell.getAttribute('width') * +cell.getAttribute('height');
    const cellNamed = (name) =>
        containerFixture
            .selectAll('.cell')
            .filter((d) => d.data.name === name)
            .node();
    const texts = (selector) =>
        containerFixture
            .selectAll(selector)
            .nodes()
            .map((node) => node.textContent);

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        document.body.insertAdjacentHTML('afterbegin', fixture);
        dataset = buildDataSet('withBudget');
        treemapChart = chart();

        containerFixture = d3.select('.test-container');
        containerFixture.datum(dataset).call(treemapChart);
    });

    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    describe('render', () => {
        it('should render a treemap', () => {
            expect(containerFixture.select('.treemap').size()).toEqual(1);
        });

        it.each([
            'container-group',
            'chart-group',
            'labels-group',
            'metadata-group',
        ])('should render a %s', (group) => {
            expect(containerFixture.select(`g.${group}`).size()).toEqual(1);
        });

        it('should render a cell per entry', () => {
            expect(containerFixture.selectAll('.cell').size()).toEqual(
                dataset.length
            );
        });

        it('should size each cell by its value', () => {
            const rent = area(cellNamed('Rent'));
            const groceries = area(cellNamed('Groceries'));
            const ratio = dataset[0].value / dataset[3].value;

            expect(dataset[0].name).toEqual('Rent');
            expect(dataset[3].name).toEqual('Groceries');
            // The gaps between cells take the same width off big and small
            // cells, so this is near the data's ratio rather than exactly it
            expect(rent / groceries).toBeGreaterThan(ratio * 0.9);
            expect(rent / groceries).toBeLessThan(ratio * 1.1);
        });

        it('should keep the cells inside the chart', () => {
            containerFixture.selectAll('.cell').each(function () {
                const x = +this.getAttribute('x');
                const y = +this.getAttribute('y');

                expect(x).toBeGreaterThanOrEqual(0);
                expect(y).toBeGreaterThanOrEqual(0);
                expect(x + +this.getAttribute('width')).toBeLessThanOrEqual(
                    treemapChart.width()
                );
                expect(y + +this.getAttribute('height')).toBeLessThanOrEqual(
                    treemapChart.height()
                );
            });
        });

        it('should give the entries different colours', () => {
            const fills = containerFixture
                .selectAll('.cell')
                .nodes()
                .map((cell) => cell.style.fill);

            expect(new Set(fills).size).toBeGreaterThan(1);
        });

        it('should not draw entries with no area', () => {
            containerFixture
                .datum([
                    { name: 'Rent', value: 10 },
                    { name: 'Refund', value: -5 },
                    { name: 'Free', value: 0 },
                    { name: 'Broken', value: 'nope' },
                ])
                .call(treemapChart);

            expect(containerFixture.selectAll('.cell').size()).toEqual(1);
        });

        it('should cast string values', () => {
            containerFixture
                .datum([
                    { name: 'Big', value: '30' },
                    { name: 'Small', value: '10' },
                ])
                .call(treemapChart);

            expect(area(cellNamed('Big'))).toBeGreaterThan(
                area(cellNamed('Small'))
            );
        });

        it('should draw nothing for no data', () => {
            containerFixture.datum([]).call(treemapChart);

            expect(containerFixture.selectAll('.cell').size()).toEqual(0);
            expect(containerFixture.selectAll('.cell-label').size()).toEqual(0);
        });

        it('should keep a colour when the values change', () => {
            const before = cellNamed('Holidays').style.fill;

            containerFixture
                .datum(
                    dataset.map((entry) =>
                        entry.name === 'Holidays'
                            ? { ...entry, value: 9000 }
                            : entry
                    )
                )
                .call(treemapChart);

            expect(cellNamed('Holidays').style.fill).toEqual(before);
        });

        it('should draw the same cell twice when names repeat', () => {
            containerFixture
                .datum([
                    { name: 'Twin', value: 10 },
                    { name: 'Twin', value: 10 },
                ])
                .call(treemapChart);

            expect(containerFixture.selectAll('.cell').size()).toEqual(2);
        });
    });

    describe('labels', () => {
        it('should show the name and value of a cell with room for them', () => {
            expect(texts('.cell-label')).toContain('Rent');
            expect(texts('.cell-value')).toContain('1,450');
        });

        it('should hide what does not fit', () => {
            containerFixture
                .datum([
                    { name: 'Everything', value: 1000 },
                    { name: 'A name too long for this cell', value: 1 },
                ])
                .call(treemapChart);

            expect(texts('.cell-label')).toEqual(['Everything']);
        });

        it('should hide the value first in a short cell', () => {
            treemapChart.height(30);
            containerFixture
                .datum([{ name: 'Rent', value: 1450 }])
                .call(treemapChart);

            expect(texts('.cell-label')).toEqual(['Rent']);
            expect(texts('.cell-value')).toEqual([]);
        });

        it('should pick the text colour that reads on the cell', () => {
            treemapChart.colorSchema(['#000000']);
            containerFixture.call(treemapChart);

            expect(
                containerFixture.select('.cell-label').node().style.fill
            ).toEqual('rgb(248, 248, 250)');

            treemapChart.colorSchema(['#ffffff']);
            containerFixture.call(treemapChart);

            expect(
                containerFixture.select('.cell-label').node().style.fill
            ).toEqual('rgb(40, 44, 53)');
        });

        it('should let the pointer through to the cell', () => {
            expect(
                containerFixture.select('.cell-label').node().style
                    .pointerEvents
            ).toEqual('none');
        });

        it('should format the values', () => {
            treemapChart.labelsNumberFormat('$,.0f');
            containerFixture.call(treemapChart);

            expect(texts('.cell-value')).toContain('$1,450');
        });

        it('should format the values with the locale', () => {
            treemapChart.valueLocale({
                decimal: ',',
                thousands: '.',
                grouping: [3],
                currency: ['', '€'],
            });
            containerFixture.call(treemapChart);

            expect(texts('.cell-value')).toContain('1.450');
        });

        it('should draw none when turned off', () => {
            treemapChart.hasLabels(false);
            containerFixture
                .datum(buildDataSet('withBudget'))
                .call(treemapChart);

            expect(
                containerFixture.selectAll('.labels-group text').size()
            ).toEqual(0);
        });
    });

    describe('updates', () => {
        beforeEach(() => {
            containerFixture
                .datum(buildDataSet('withBudget'))
                .call(treemapChart);
        });

        it('should remove the cells and labels of removed entries', () => {
            const updated = buildDataSet('withUpdatedBudget');

            containerFixture.datum(updated).call(treemapChart);

            expect(containerFixture.selectAll('.cell').size()).toEqual(
                updated.length
            );
            expect(texts('.cell-label')).not.toContain('Train');
        });

        it('should keep one svg', () => {
            containerFixture.call(treemapChart);

            expect(containerFixture.selectAll('svg').size()).toEqual(1);
        });

        it('should send the current entry after an update', () => {
            const callback = vi.fn();

            treemapChart.on('customClick', callback);
            containerFixture
                .datum([{ name: 'Only', value: 1 }])
                .call(treemapChart);
            containerFixture.selectAll('.cell').dispatch('click');

            expect(callback.mock.calls[0][0].name).toEqual('Only');
        });

        it('should follow a new size', () => {
            treemapChart.width(300).height(200);
            containerFixture.call(treemapChart);

            expect(containerFixture.select('svg').attr('viewBox')).toEqual(
                '0,0,300,200'
            );
            containerFixture.selectAll('.cell').each(function () {
                expect(
                    +this.getAttribute('x') + +this.getAttribute('width')
                ).toBeLessThanOrEqual(300);
            });
        });

        it('should follow new margins', () => {
            treemapChart.margin({ top: 12, left: 34 });
            containerFixture.call(treemapChart);

            expect(
                containerFixture.select('.container-group').attr('transform')
            ).toEqual('translate(34, 12)');
        });
    });

    describe('when animated', () => {
        beforeEach(() => {
            treemapChart.isAnimated(true).animationDuration(0);
        });

        it('should start the new cells and labels faded out', () => {
            const animated = chart().isAnimated(true);
            const other = containerFixture.append('div');

            other.datum(dataset).call(animated);

            expect(other.select('.cell').node().style.opacity).toEqual('0');
            expect(other.select('.cell-label').node().style.opacity).toEqual(
                '0'
            );
        });

        it('should draw at once when the reader asks for reduced motion', () => {
            const matchMedia = window.matchMedia;

            window.matchMedia = vi.fn(() => ({ matches: true }));

            const other = containerFixture.append('div');

            other.datum(dataset).call(chart().isAnimated(true));
            window.matchMedia = matchMedia;

            expect(other.select('.cell').node().style.opacity).toEqual('1');
            expect(other.select('.cell-label').node().style.opacity).toEqual(
                '1'
            );
        });
    });

    describe('loading state', () => {
        beforeEach(() => {
            treemapChart.isLoading(true);
            containerFixture.datum(dataset).call(treemapChart);
        });

        it('should render the skeleton', () => {
            expect(
                containerFixture.select('.treemap-load-state').size()
            ).toEqual(1);
        });

        it('should hide what it drew before', () => {
            expect(
                containerFixture.select('.container-group').style('display')
            ).toEqual('none');
        });

        it('should have no data table or keyboard stop', () => {
            expect(
                containerFixture.select('.britechart-data-table').size()
            ).toEqual(0);
        });

        it('should come back when it is done', () => {
            treemapChart.isLoading(false);
            containerFixture.call(treemapChart);

            expect(
                containerFixture.select('.treemap-load-state').size()
            ).toEqual(0);
            expect(
                containerFixture.select('.container-group').style('display')
            ).not.toEqual('none');
        });
    });

    describe('events', () => {
        it.each([
            ['mouseover', 'customMouseOver'],
            ['mousemove', 'customMouseMove'],
            ['mouseout', 'customMouseOut'],
            ['click', 'customClick'],
        ])('should turn %s into %s, with the entry', (event, customEvent) => {
            const callback = vi.fn();

            treemapChart.on(customEvent, callback);
            d3.select(cellNamed('Rent')).dispatch(event);

            const [entry, position, size] = callback.mock.calls[0];

            expect(entry).toEqual({ name: 'Rent', value: 1450 });
            expect(position).toHaveLength(2);
            expect(size).toEqual([780, 400]);
        });

        it('should darken a hovered cell, and restore it on leaving', () => {
            const cell = cellNamed('Rent');
            const fill = cell.style.fill;

            d3.select(cell).dispatch('mouseover');
            expect(cell.style.fill).not.toEqual(fill);

            d3.select(cell).dispatch('mouseout');
            expect(cell.style.fill).toEqual(fill);
        });
    });

    describe('data table', () => {
        const headings = () =>
            containerFixture
                .selectAll('.britechart-data-table th')
                .nodes()
                .map((node) => node.textContent);

        it('should list the names and values', () => {
            expect(headings().slice(0, 2)).toEqual(['Name', 'Value']);
        });

        it('should keep the entries it could not draw', () => {
            containerFixture
                .datum([
                    { name: 'Rent', value: 10 },
                    { name: 'Refund', value: -5 },
                ])
                .call(treemapChart);

            expect(
                containerFixture.select('.britechart-data-table').text()
            ).toContain('Refund');
        });
    });

    describe('API', () => {
        it.each([
            ['animationDuration', 1200, 300],
            ['colorSchema', colors.colorSchemas.britecharts, ['#000', '#fff']],
            ['hasLabels', true, false],
            ['height', 400, 200],
            ['isAnimated', false, true],
            ['isLoading', false, true],
            ['labelsNumberFormat', ',', '.2f'],
            ['valueLocale', null, { decimal: ',' }],
            ['width', 780, 300],
            ['a11yTitle', null, 'Spending'],
            ['a11yDescription', null, 'What we spend'],
            ['a11yDataTable', true, false],
            ['a11yKeyboardNavigation', true, false],
        ])('should get and set %s', (accessor, defaultValue, value) => {
            const instance = chart();

            expect(instance[accessor]()).toEqual(defaultValue);
            expect(instance[accessor](value)).toBe(instance);
            expect(instance[accessor]()).toEqual(value);
        });

        it('should merge the margin it is given', () => {
            const instance = chart();

            expect(instance.margin({ top: 5 })).toBe(instance);
            expect(instance.margin()).toEqual({
                top: 5,
                right: 0,
                bottom: 0,
                left: 0,
            });
        });

        it('should read a registered event back', () => {
            const callback = vi.fn();

            expect(treemapChart.on('customClick', callback)).toBe(treemapChart);
            expect(treemapChart.on('customClick')).toBe(callback);
        });
    });
});
