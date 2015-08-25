define(['underscore', 'jquery', 'd3', 'src/charts/line'], function(_, $, d3, chart) {
    'use strict';

    describe('Reusable Line Chart Test Suite', function(){
        var $dfd = new $.Deferred(),
            dataset,
            dataDate,
            _data,
            containerFixture, f, lineChart;

        d3.json('base/test/fixtures/lineData.json', function(chartData){

            _data = _.compact(chartData.data);

            _data.forEach(function(kv) {
                kv.Data.forEach(function(d) {
                    d.date = new Date(d.fullDate._i);
                    d.date.setHours(0, 0, 0);
                });
            });

            dataDate = chartData.dataByDate;

            dataset = { data: _data, dataByDate: dataDate};
            $dfd.resolve();
        });

        $dfd.done(function(){
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
        });




        // it('should provide margin getter and setter', function(){
        //     var defaultMargin = barChart.margin(),
        //         testMargin = {top: 4, right: 4, bottom: 4, left: 4},
        //         newMargin;

        //     barChart.margin(testMargin);
        //     newMargin = barChart.margin();

        //     expect(defaultMargin).not.toBe(testMargin);
        //     expect(newMargin).toBe(testMargin);
        // });

    });

});
