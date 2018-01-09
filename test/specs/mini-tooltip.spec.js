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

        it('should render a tooltip with minimal requirements', () =>  {
            expect(containerFixture.select('.britechart-mini-tooltip').empty()).toBeFalsy();
        });

        it('should not be visible by default', () =>  {
            expect(containerFixture.select('.britechart-mini-tooltip').style('display')).toBe('none');
        });

        it('should be visible when required', () =>  {
            expect(containerFixture.select('.britechart-mini-tooltip').style('display')).toBe('none');
            tooltipChart.show();
            expect(containerFixture.select('.britechart-mini-tooltip').style('display')).not.toBe('none');
            expect(containerFixture.select('.britechart-mini-tooltip').style('display')).toBe('block');
        });

        xit('should resize the tooltip depending of number of topics', () =>  {
            tooltipChart.update({
                name: 103,
                value: 0
            }, [0, 0], [20, 20]);

            expect(
                containerFixture.select('.tooltip-text-container')
                    .attr('height')
            ).toEqual('81.5');

            tooltipChart.update({
                name: 103,
                value: 0
            }, [0, 0], [10, 10]);

            expect(
                containerFixture.select('.tooltip-text-container')
                    .attr('height')
            ).toEqual('105');
        });

        describe('Render', function() {

            it('should render the title of the tooltip', () =>  {
                let expected = 'Tooltip title',
                    actual;

                tooltipChart.title(expected);
                tooltipChart.show();

                actual = containerFixture.select('.britechart-mini-tooltip')
                        .selectAll('.mini-tooltip-title')
                        .text();

                expect(actual).toBe(expected);
            });

            it('should render a line of text for the name', () =>  {
                let expected = 'radiating',
                    actual;

                tooltipChart.update({
                    name: expected,
                    value: 10
                }, [0, 0],[20, 20]);

                actual = containerFixture.select('.britechart-mini-tooltip')
                        .selectAll('.mini-tooltip-name')
                        .text();

                expect(actual).toEqual(expected);
            });

            it('should render a line of text for the value', () =>  {
                let expected = 10,
                    actual;

                tooltipChart.update({
                    name: 'radiating',
                    value: expected
                }, [0, 0],[20, 20]);

                actual = parseInt(containerFixture.select('.britechart-mini-tooltip')
                        .selectAll('.mini-tooltip-value')
                        .text(), 10);

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

                expect(current).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide numberFormat getter and setter', () => {
                let current = tooltipChart.numberFormat(),
                    expected = '.2%',
                    actual;

                tooltipChart.numberFormat(expected);
                actual = tooltipChart.numberFormat();

                expect(current).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide nameLabel getter and setter', () => {
                let defaultNameLabel = 'key',
                    testNameLabel = 'label',
                    newNameLabel;

                tooltipChart.nameLabel(testNameLabel);
                newNameLabel = tooltipChart.nameLabel();

                expect(defaultNameLabel).not.toBe(newNameLabel);
                expect(newNameLabel).toBe(testNameLabel);
            });
        });
    });
});
