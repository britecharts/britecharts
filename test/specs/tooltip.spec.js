define(['jquery', 'd3', 'tooltip'], function($, d3, tooltip) {
    'use strict';

    describe('Reusable Tooltip Component', () => {
        let topicColorMap = {
                0: '#9963D5',
                60: '#E5C400',
                81: '#FF4D7C',
                103: '#4DC2F5',
                149: '#4DDB86'
            },
            tooltipChart, dataset, containerFixture, f;

        beforeEach(() => {
            dataset = [];
            tooltipChart = tooltip();

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container').append('svg');
            containerFixture.datum(dataset).call(tooltipChart);
        });

        afterEach(() => {
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        it('should render a tooltip with minimal requirements', () =>  {
            expect(containerFixture.select('.britechart-tooltip').empty()).toBeFalsy();
        });

        it('should not be visible by default', () =>  {
            expect(containerFixture.select('.britechart-tooltip').style('display')).toBe('none');
        });

        it('should be visible when required', () =>  {
            expect(containerFixture.select('.britechart-tooltip').style('display')).toBe('none');
            tooltipChart.show();
            expect(containerFixture.select('.britechart-tooltip').style('display')).not.toBe('none');
            expect(containerFixture.select('.britechart-tooltip').style('display')).toBe('block');
        });

        xit('should resize the tooltip depending of number of topics', () =>  {
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
            ).toEqual('81.5');

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
            ).toEqual('105');
        });

        describe('Render', function() {

            it('should update the title of the tooltip', () =>  {
                tooltipChart.update({
                    date: '2015-08-05T07:00:00.000Z',
                    topics: []
                }, topicColorMap, 0);

                expect(
                    containerFixture.select('.britechart-tooltip')
                        .selectAll('.tooltip-title')
                        .text()
                ).toBe('Tooltip title - Aug 05, 2015');
            });

            it('should add a line of text for each topic', () =>  {
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

            it('should add a circle for each topic', () =>  {
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
        });
    });
});
