define([
    'underscore',
    'jquery',
    'd3',
    'src/charts/line',
    'test/fixtures/lineChartDataBuilder'
    ], function(
        _,
        $,
        d3,
        chart,
        dataBuilder
    ) {
    'use strict';

    describe('Reusable Line Chart Test Suite', function(){
        var containerFixture, f, lineChart;

        function aTestDataSet() {
            return new dataBuilder.SalesDataBuilder();
        }

        aTestDataSet()
            .with5Topics()
            .build()
            .done(function(dataset){

            beforeEach(function(){
                lineChart = chart();
                // DOM Fixture Setup
                f = jasmine.getFixtures();
                f.fixturesPath = 'base/test/fixtures/';
                f.load('testContainer.html');

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(lineChart);
            });

            afterEach(function(){
                containerFixture.remove();
                f = jasmine.getFixtures();
                f.cleanUp();
                f.clearCache();
            });

            it('should render a chart with minimal requirements', function(){
                expect(containerFixture.select('.line-chart')).toBeDefined(1);
            });

            it('should render container, axis and chart groups', function(){
                expect(containerFixture.select('g.container-group')[0][0]).not.toBeNull();
                expect(containerFixture.select('g.chart-group')[0][0]).not.toBeNull();
                expect(containerFixture.select('g.x-axis-group')[0][0]).not.toBeNull();
                expect(containerFixture.select('g.y-axis-group')[0][0]).not.toBeNull();
                expect(containerFixture.select('g.grid-lines-group')[0][0]).not.toBeNull();
                expect(containerFixture.select('g.metadata-group')[0][0]).not.toBeNull();
            });

            it('should render grid lines', function(){
                expect(containerFixture.select('.horizontal-grid-line')[0][0]).not.toBeNull();
            });

            it('should render an X and Y axis', function(){
                expect(containerFixture.select('.x.axis')[0][0]).not.toBeNull();
                expect(containerFixture.select('.y.axis')[0][0]).not.toBeNull();
            });

            it('should render a line for each data topic', function(){
                var numLines = dataset.data.length;

                expect(containerFixture.selectAll('.line')[0].length).toEqual(numLines);
            });

            it('should render an overlay to trigger the hover effect', function(){
                expect(containerFixture.select('.overlay')[0][0]).not.toBeNull();
            });

            // API
            it('should provide margin getter and setter', function(){
                var defaultMargin = lineChart.margin(),
                    testMargin = {top: 4, right: 4, bottom: 4, left: 4},
                    newMargin;

                lineChart.margin(testMargin);
                newMargin = lineChart.margin();

                expect(defaultMargin).not.toBe(testMargin);
                expect(newMargin).toBe(testMargin);
            });

            it('should provide width getter and setter', function(){
                var defaultWidth = lineChart.width(),
                    testWidth = 200,
                    newWidth;

                lineChart.width(testWidth);
                newWidth = lineChart.width();

                expect(defaultWidth).not.toBe(testWidth);
                expect(newWidth).toBe(testWidth);
            });

            it('should provide height getter and setter', function(){
                var defaultHeight = lineChart.height(),
                    testHeight = 200,
                    newHeight;

                lineChart.height(testHeight);
                newHeight = lineChart.height();

                expect(defaultHeight).not.toBe(testHeight);
                expect(newHeight).toBe(testHeight);
            });

        });

    });

});
