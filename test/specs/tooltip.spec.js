define(['jquery', 'd3', 'src/charts/tooltip'], function($, d3, tooltip) {
    'use strict';

    describe('Reusable Tooltip Component Test Suite', function(){
        var topicColorMap = {
                0: '#9963D5',
                60: '#E5C400',
                81: '#FF4D7C',
                103: '#4DC2F5',
                149: '#4DDB86'
            },
            tooltipChart, dataset, containerFixture, f;

        beforeEach(function(){
            dataset = [];
            tooltipChart = tooltip();

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container').append('svg');
            containerFixture.datum(dataset).call(tooltipChart);
        });

        afterEach(function(){
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        it('should render a tooltip with minimal requirements', function() {
            expect(containerFixture.select('.britechart-tooltip').empty()).toBeFalsy();
        });

        it('should not be visible by default', function() {
            expect(containerFixture.select('.britechart-tooltip').style('display')).toBe('none');
        });

        it('should be visible when required', function() {
            expect(containerFixture.select('.britechart-tooltip').style('display')).toBe('none');
            tooltipChart.show();
            expect(containerFixture.select('.britechart-tooltip').style('display')).not.toBe('none');
            expect(containerFixture.select('.britechart-tooltip').style('display')).toBe('block');
        });

        it('should update the title of the tooltip', function() {
            tooltipChart.update({
                date: '2015-08-05T07:00:00.000Z',
                topics: []
            }, topicColorMap, 0);

            expect(
                containerFixture.select('.britechart-tooltip')
                    .selectAll('.tooltip-title')
                    .text()
            ).toBe('Tooltip title - August 05, 2015');
        });

        it('should add a line of text for each topic', function() {
            tooltipChart.update({
                date: '2015-08-05T07:00:00.000Z',
                topics: [
                    {
                        name: 103,
                        value: '5',
                        topicName: 'San Francisco'
                    },
                    {
                        name: 60,
                        value: '10',
                        topicName: 'Chicago'
                    }
                ]
            }, topicColorMap, 0);

            expect(
                containerFixture.select('.britechart-tooltip')
                    .selectAll('.tooltip-left-text')
                    .size()
            ).toEqual(2);
        });

        it('should add a circle for each topic', function() {
            tooltipChart.update({
                date: '2015-08-05T07:00:00.000Z',
                topics: [
                    {
                        name: 103,
                        value: 0,
                        topicName: 'San Francisco'
                    },
                    {
                        name: 60,
                        value: 10,
                        topicName: 'Chicago'
                    }
                ]
            }, topicColorMap, 0);

            expect(
                containerFixture.select('.britechart-tooltip')
                    .selectAll('.tooltip-circle')
                    .size()
            ).toEqual(2);
        });

        // TODO: develop
        it('should position the tooltip in the right coordinates', function() {
            tooltipChart.update({
                date: '2015-08-05T07:00:00.000Z',
                topics: [
                    {
                        name: 103,
                        value: 0,
                        topicName: 'San Francisco'
                    }
                ]
            }, topicColorMap, 10);

            expect(
                containerFixture.select('.tooltip-text').attr('transform')
            ).toEqual('translate(65,-55)');
        });

        it('should resize the tooltip depending of number of topics', function() {
            tooltipChart.update({
                date: '2015-08-05T07:00:00.000Z',
                topics: [
                    {
                        name: 103,
                        value: 0,
                        topicName: 'San Francisco'
                    }
                ]
            }, topicColorMap, 10);

            expect(
                containerFixture.select('.tooltip-text-container')
                    .attr('height')
            ).toEqual('81');

            tooltipChart.update({
                date: '2015-08-05T07:00:00.000Z',
                topics: [
                    {
                        name: 103,
                        value: 0,
                        topicName: 'San Francisco'
                    },
                    {
                        name: 60,
                        value: 10,
                        topicName: 'Chicago'
                    }
                ]
            }, topicColorMap, 10);

            expect(
                containerFixture.select('.tooltip-text-container')
                    .attr('height')
            ).toEqual('104');
        });

        it('should provide title getter and setter', function(){
            var defaultTitle = tooltipChart.title(),
                testTitle = 'test',
                newTitle;

            tooltipChart.title(testTitle);
            newTitle = tooltipChart.title();

            expect(defaultTitle).not.toBe(testTitle);
            expect(newTitle).toBe(testTitle);
        });
    });
});
