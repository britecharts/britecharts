define(['d3', 'bullet', 'bulletChartDataBuilder'], function(d3, chart, dataBuilder) {
    'use strict';

    describe('Bullet Chart', () => {
        let bulletChart, dataset, containerFixture, f;

        function aTestDataSet() {
            return new dataBuilder.BulletChartDataBuilder();
        }

        beforeEach(() => {
            dataset = aTestDataSet()
                .withSimpleData()
                .build();
            brushChart = chart();

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container');
            containerFixture.datum(dataset).call(brushChart);
        });

        afterEach(() => {
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        describe('API', () => {

            it('should provide width getter and setter', () => {
                let previous = bulletChart.width(),
                    expected = 600,
                    actual;

                bulletChart.width(expected);
                actual = bulletChart.width();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            })
        });
    });
});
