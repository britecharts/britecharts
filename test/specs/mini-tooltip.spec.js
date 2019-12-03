define(['jquery', 'd3', 'mini-tooltip'], function($, d3, tooltip) {
    'use strict';

    describe('Mini Tooltip Component', () => {
        let tooltipChart,
            containerFixture,
            dataset,
            f;

        beforeEach(() => {
            dataset = [];
            tooltipChart = tooltip();

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container')
              .append('svg');
            containerFixture.datum(dataset)
                .call(tooltipChart);
        });

        afterEach(() => {
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        describe('Render', () => {

            it('should show a tooltip with minimal requirements', () => {
                const expected = 1;
                const actual = containerFixture.select('.britechart-mini-tooltip').size();

                expect(actual).toEqual(expected);
            });

            it('should not be visible by default', () => {
                const expected = 'hidden';
                const actual = containerFixture.select('.britechart-mini-tooltip').style('visibility');

                expect(actual).toEqual(expected);
            });

            it('should render the title of the tooltip', () => {
                const expected = 'Tooltip title';
                let actual;

                tooltipChart.title(expected);
                tooltipChart.show();

                actual = containerFixture.select('.britechart-mini-tooltip')
                    .selectAll('.mini-tooltip-title')
                    .text();

                expect(actual).toEqual(expected);
            });

            it('should render a line of text for the name', () => {
                const expected = 'radiating';
                let actual;

                tooltipChart.update({
                    name: expected,
                    value: 10
                }, [0, 0], [20, 20]);

                actual = containerFixture.select('.britechart-mini-tooltip')
                    .selectAll('.mini-tooltip-name')
                    .text();

                expect(actual).toEqual(expected);
            });

            it('should render a line of text for the value', () => {
                const expected = 10;
                let actual;

                tooltipChart.update({
                    name: 'radiating',
                    value: expected
                }, [0, 0], [20, 20]);

                actual = parseInt(containerFixture.select('.britechart-mini-tooltip')
                    .selectAll('.mini-tooltip-value')
                    .text(), 10);

                expect(actual).toEqual(expected);
            });
        });

        describe('Lifecycle', () => {

            it('should be visible when required', () =>  {
                const initialExpected = 'hidden';
                const expected = 'visible';
                let actual = containerFixture.select('.britechart-mini-tooltip').style('visibility');

                expect(actual).toEqual(initialExpected);
                tooltipChart.show();
                actual = containerFixture.select('.britechart-mini-tooltip').style('visibility');

                expect(actual).toEqual(expected);
            });

            it('should allow overriding the value formatting function', () => {
                const expected = '8';
                const valueFormatFn = value => value.toString().length.toString()
                let actual;

                tooltipChart.valueFormatter(valueFormatFn);
                tooltipChart.update({
                    name: 'radiating',
                    value: 10000000
                }, [0, 0], [20, 20]);
                actual = containerFixture.select('.britechart-mini-tooltip')
                    .selectAll('.mini-tooltip-value')
                    .text();

                expect(actual).toEqual(expected);
            });
        });

        describe('API', function() {

            it('should provide title getter and setter', () => {
                let current = tooltipChart.title(),
                    expected = 'test',
                    actual;

                tooltipChart.title(expected);
                actual = tooltipChart.title();

                expect(current).not.toEqual(expected);
                expect(actual).toEqual(expected);
            });

            it('should provide numberFormat getter and setter', () => {
                let current = tooltipChart.numberFormat(),
                    expected = '.2%',
                    actual;

                tooltipChart.numberFormat(expected);
                actual = tooltipChart.numberFormat();

                expect(current).not.toEqual(expected);
                expect(actual).toEqual(expected);
            });

            it('should provide nameLabel getter and setter', () => {
                let defaultNameLabel = 'key',
                    testNameLabel = 'label',
                    newNameLabel;

                tooltipChart.nameLabel(testNameLabel);
                newNameLabel = tooltipChart.nameLabel();

                expect(defaultNameLabel).not.toEqual(newNameLabel);
                expect(newNameLabel).toEqual(testNameLabel);
            });


            it('should provide valueLabel getter and setter', () => {
                let defaultNameLabel = 'key',
                    testNameLabel = 'label',
                    newNameLabel;

                tooltipChart.valueLabel(testNameLabel);
                newNameLabel = tooltipChart.valueLabel();

                expect(defaultNameLabel).not.toEqual(newNameLabel);
                expect(newNameLabel).toEqual(testNameLabel);
            });
        });
    });
});
