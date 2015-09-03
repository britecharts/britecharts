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

        // var reportData30Days = {
        //     'data': [
        //         {
        //             'topics': [
        //                 {
        //                     'gross': '119.97',
        //                     'name': 'Team Runner',
        //                     'currency': 'USD',
        //                     'fees': '6.30',
        //                     'net': '113.67',
        //                     'id': 30800427,
        //                     'quantity': 3
        //                 },
        //                 {
        //                     'gross': '449.73',
        //                     'name': 'Individual Runner',
        //                     'currency': 'USD',
        //                     'fees': '24.30',
        //                     'net': '425.43',
        //                     'id': 30800429,
        //                     'quantity': 9
        //                 }
        //             ],

        //             'date': moment(todaysDate).format(utcFormat + 'Z'),

        //             'totals': {
        //                 'currency': 'USD',
        //                 'gross': '569.70',
        //                 'net': '539.10',
        //                 'quantity': 12,
        //                 'fees': '30.60'
        //             }
        //         },

        //         {
        //             'topics': [
        //                 {
        //                     'gross': '399.90',
        //                     'name': 'Team Runner',
        //                     'currency': 'USD',
        //                     'fees': '21.00',
        //                     'net': '378.90',
        //                     'id': 30800427,
        //                     'quantity': 10
        //                 },

        //                 {
        //                     'gross': '49.97',
        //                     'name': 'Individual Runner',
        //                     'currency': 'USD',
        //                     'fees': '2.70',
        //                     'net': '47.27',
        //                     'id': 30800429,
        //                     'quantity': 1
        //                 }
        //             ],

        //             'date': moment(todaysDate).subtract(5, 'days').format(utcFormat + 'Z'),

        //             'totals': {
        //                 'currency': 'USD',
        //                 'gross': '449.87',
        //                 'net': '426.17',
        //                 'quantity': 11,
        //                 'fees': '23.70'
        //             }
        //         },
        //         {
        //             'topics': [
        //                 {
        //                     'gross': '479.88',
        //                     'name': 'Team Runner',
        //                     'currency': 'USD',
        //                     'fees': '25.20',
        //                     'net': '454.68',
        //                     'id': 30800427,
        //                     'quantity': 12
        //                 },

        //                 {
        //                     'gross': '599.64',
        //                     'name': 'Individual Runner',
        //                     'currency': 'USD',
        //                     'fees': '32.40',
        //                     'net': '567.24',
        //                     'id': 30800429,
        //                     'quantity': 12
        //                 }
        //             ],

        //             'date': moment(todaysDate).subtract(20, 'days').format(utcFormat + 'Z'),

        //             'totals': {
        //                 'currency': 'USD',
        //                 'gross': '1079.52',
        //                 'net': '1021.92',
        //                 'quantity': 24,
        //                 'fees': '57.60'
        //             }
        //         }
        //     ],

        //     'totals': {
        //         'currency': 'USD',
        //         'fees': '111.90',
        //         'gross': '2099.09',
        //         'net': '1987.19',
        //         'quantity': 47
        //     }
        // };

        // var emptyTestReportData = {'data': [], 'totals': {}};

        // var chartDataObj = {
        //     data: [
        //         {
        //             topic: -1,
        //             Data: [{
        //                 date: '26-Feb-15',
        //                 value: 186,
        //                 fullDate: moment('2015-02-26T08:00:00.000Z')
        //             },
        //             {
        //                 'date': '27-Feb-15',
        //                 'value': 225,
        //                 'fullDate': moment('2015-02-27T08:00:00.000Z')
        //             }],
        //             'topicName': 'All Sales'
        //         }
        //     ],
        //     dataByDate: [
        //         {
        //             date: '2015-02-26T08:00:00Z',
        //             topics: [{
        //                 name: -1,
        //                 value: 186,
        //                 topicName: 'All Sales'
        //             }]
        //         },
        //         {
        //             date: '2015-02-27T08:00:00Z',
        //             topics: [{
        //                 name: -1,
        //                 value: 225,
        //                 topicName: 'All Sales'
        //             }]
        //         }
        //     ],
        //     readableDataType: {
        //         name: 'Quantity Sold',
        //         type: 'number'
        //     },
        //     topicList: {
        //         'topicIds': [
        //             -1
        //         ],
        //         'topicNames': [
        //             'All Sales'
        //         ]
        //     }
        // };

        function hasClass(element, className) {
            return _.contains(element[0][0].classList, className);
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


            // Event Setting
            it('should trigger an event on hover', function(){
                var callback = jasmine.createSpy('hoverCallback'),
                    container = containerFixture.selectAll('svg');

                lineChart.on('customMouseOver', callback);
                container[0][0].__onmouseover();

                expect(callback.calls.count()).toBe(1);
            });

            it('should trigger an event on mouse out', function(){
                var callback = jasmine.createSpy('mouseOutCallback'),
                    container = containerFixture.selectAll('svg');

                lineChart.on('customMouseOut', callback);
                container[0][0].__onmouseout();
                expect(callback.calls.count()).toBe(1);
            });

            // We need to stub some code in order to be able to run this test
            // it('should trigger an event on mouse move', function(){
            //     var callback = jasmine.createSpy('mouseMoveCallback'),
            //         container = containerFixture.selectAll('svg');
            //     lineChart.on('customMouseMove', callback);
            //     container[0][0].__onmousemove();

            //     expect(callback.calls.count()).toBe(1);
            // });

            // Tooltip and Markers
            it('should render an overlay to trigger the hover effect', function(){
                expect(containerFixture.select('.overlay')[0][0]).not.toBeNull();
            });

            it('should show a vertical line where the mouse is hovering', function() {
                var container = containerFixture.selectAll('svg'),
                    verticalLine = d3.select('.hover-marker line');

                container[0][0].__onmouseover();

                expect(hasClass(verticalLine, 'bc-is-active')).toBe(true);
            });

            it('should not show the tooltip on mobile', function() {
                var container = containerFixture.selectAll('svg'),
                    overlay = d3.select('.overlay');

                lineChart.isMobile(true);
                containerFixture.datum(dataset).call(lineChart);

                container[0][0].__onmouseover();

                expect(overlay.style('display')).toBe('none');
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
