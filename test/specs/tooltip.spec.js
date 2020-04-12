define(['jquery', 'd3', 'tooltip'], function($, d3, tooltip) {
    'use strict';

    const topicColorMap = {
        0: '#9963D5',
        60: '#E5C400',
        81: '#FF4D7C',
        103: '#4DC2F5',
        149: '#4DDB86'
    };

    describe('Tooltip Component', () => {
        let tooltipChart, dataset, containerFixture, f;

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

        describe('Render', () => {

            it('should render a chart with minimal requirements', () => {
                const expected = 1;
                const actual = containerFixture.select('.britechart-tooltip').size();

                expect(actual).toEqual(expected);
            });

            it('should render a chart with minimal requirements', () => {
                const expected = 'hidden';
                const actual = containerFixture.select('.britechart-tooltip').style('visibility');

                expect(actual).toEqual(expected);
            });

            describe('for each topic', () => {

                it('should add a line of text', () => {
                    const expected = 2;
                    let actual;

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
                    actual = containerFixture.select('.britechart-tooltip')
                        .selectAll('.tooltip-left-text')
                        .size();

                    expect(actual).toEqual(expected);
                });

                it('should add a circle', () => {
                    const expected = 2;
                    let actual;

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
                    actual = containerFixture.select('.britechart-tooltip')
                        .selectAll('.tooltip-circle')
                        .size();

                    expect(actual).toEqual(expected);
                });
            });

            describe('title', () => {

                describe('when date has day granularity', () => {

                    it('should update the title of the tooltip with a date with year', () => {
                        const expected = 'Tooltip title - Aug 05, 2015';
                        let actual;

                        tooltipChart.dateFormat(tooltipChart.axisTimeCombinations.DAY_MONTH);
                        tooltipChart.update({
                            date: '2015-08-05T07:00:00.000Z',
                            topics: []
                        }, topicColorMap, 0);
                        actual = containerFixture.select('.britechart-tooltip')
                            .selectAll('.tooltip-title')
                            .text();

                        expect(actual).toEqual(expected);
                    });
                });

                describe('when date must not be shown', () => {

                    it('should only show the title of the tooltip', () => {
                        const expected = 'Tooltip title';
                        let actual;

                        tooltipChart.shouldShowDateInTitle(false);
                        tooltipChart.update({
                            date: '2015-08-05T07:00:00.000Z',
                            topics: []
                        }, topicColorMap, 0);
                        actual = containerFixture.select('.britechart-tooltip')
                            .selectAll('.tooltip-title')
                            .text();

                        expect(actual).toBe(expected);
                    });
                });
            });
        });

        describe('Lifecycle', () => {

            it('should be visible when required', () =>  {
                const expected = 'visible';
                const expectedDefault = 'hidden';
                let actual = containerFixture.select('.britechart-tooltip').style('visibility');

                expect(actual).toEqual(expectedDefault);
                tooltipChart.show();
                actual = containerFixture.select('.britechart-tooltip').style('visibility');

                expect(actual).not.toEqual(expectedDefault);
                expect(actual).toEqual(expected);
            });

            describe('number formatting', () => {

                describe('decimal values', () => {

                    it('should format big numbers', () =>  {
                        const expected = '10k';
                        let actual;

                        tooltipChart.update({
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [
                                {
                                    name: 103,
                                    value: 10000.004,
                                    topicName: 'San Francisco'
                                }
                            ]
                        }, topicColorMap, 0);
                        actual = containerFixture.select('.britechart-tooltip .tooltip-right-text')
                                    .text()

                        expect(actual).toEqual(expected);
                    });

                    it('should format medium numbers', () =>  {
                        const expected = '100';
                        let actual;

                        tooltipChart.update({
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [
                                {
                                    name: 103,
                                    value: 100.005,
                                    topicName: 'San Francisco'
                                }
                            ]
                        }, topicColorMap, 0);
                        actual = containerFixture.select('.britechart-tooltip .tooltip-right-text')
                                    .text()

                        expect(actual).toEqual(expected);
                    });

                    it('should format small numbers', () =>  {
                        const expected = '9.123';
                        let actual;

                        tooltipChart.update({
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [
                                {
                                    name: 103,
                                    value: 9.1234,
                                    topicName: 'San Francisco'
                                }
                            ]
                        }, topicColorMap, 0);
                        actual = containerFixture.select('.britechart-tooltip .tooltip-right-text')
                                    .text()

                        expect(actual).toEqual(expected);
                    });
                });

                describe('integer values', () => {

                    it('should format big numbers', () =>  {
                        const expected = '10k';
                        let actual;

                        tooltipChart.update({
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [
                                {
                                    name: 103,
                                    value: 10000,
                                    topicName: 'San Francisco'
                                }
                            ]
                        }, topicColorMap, 0);
                        actual = containerFixture.select('.britechart-tooltip .tooltip-right-text')
                                    .text()

                        expect(actual).toEqual(expected);
                    });

                    it('should not format medium numbers', () =>  {
                        const expected = '103';
                        let actual;

                        tooltipChart.update({
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [
                                {
                                    name: 103,
                                    value: 103,
                                    topicName: 'San Francisco'
                                }
                            ]
                        }, topicColorMap, 0);
                        actual = containerFixture.select('.britechart-tooltip .tooltip-right-text')
                                    .text()

                        expect(actual).toEqual(expected);
                    });

                    it('should not format small numbers', () =>  {
                        const expected = '9';
                        let actual;

                        tooltipChart.update({
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [
                                {
                                    name: 103,
                                    value: 9,
                                    topicName: 'San Francisco'
                                }
                            ]
                        }, topicColorMap, 0);
                        actual = containerFixture.select('.britechart-tooltip .tooltip-right-text')
                                    .text()

                        expect(actual).toEqual(expected);
                    });
                });

                describe('override default formatting', () => {

                    it('should respect format override', () =>  {
                        const expected = '10,000';
                        let actual;

                        tooltipChart.numberFormat(',');
                        tooltipChart.update({
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [
                                {
                                    name: 103,
                                    value: 10000,
                                    topicName: 'San Francisco'
                                }
                            ]
                        }, topicColorMap, 0);
                        actual = containerFixture.select('.britechart-tooltip .tooltip-right-text')
                            .text()

                        expect(actual).toEqual(expected);
                    });

                    it('should use custom function if set', () => {
                        const expected = '8';
                        let actual;

                        tooltipChart.valueFormatter(value => value.toString().length.toString());
                        tooltipChart.update({
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [
                                {
                                    name: 103,
                                    value: 10000000,
                                    topicName: 'San Francisco'
                                }
                            ]
                        }, topicColorMap, 0);
                        actual = containerFixture.select('.britechart-tooltip .tooltip-right-text')
                                    .text();

                        expect(actual).toEqual(expected);
                    });
                });
            });
        });

        describe('API', () => {

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

            it('should provide valueLabel getter and setter', () => {
                let defaultValueLabel = tooltipChart.valueLabel(),
                    testValueLabel = 'quantity',
                    newValueLabel;

                tooltipChart.valueLabel(testValueLabel);
                newValueLabel = tooltipChart.valueLabel();

                expect(defaultValueLabel).not.toBe(testValueLabel);
                expect(newValueLabel).toBe(testValueLabel);
            });

            it('should provide tooltipOffset getter and setter', () => {
                let defaultTooltipOffset = tooltipChart.tooltipOffset(),
                    testTooltipOffset = {x: 50, y: 50},
                    newTooltipOffset;

                tooltipChart.tooltipOffset(testTooltipOffset);
                newTooltipOffset = tooltipChart.tooltipOffset();

                expect(defaultTooltipOffset).not.toBe(testTooltipOffset);
                expect(newTooltipOffset).toBe(testTooltipOffset);
            });

            it('should provide topicLabel getter and setter', () => {
                let defaultTopicLabel = tooltipChart.topicLabel(),
                    testTopicLabel = 'valueSet',
                    newTopicLabel;

                tooltipChart.topicLabel(testTopicLabel);
                newTopicLabel = tooltipChart.topicLabel();

                expect(defaultTopicLabel).not.toBe(testTopicLabel);
                expect(newTopicLabel).toBe(testTopicLabel);
            });

            it('should provide dateLabel getter and setter', () => {
                let defaultDateLabel = tooltipChart.dateLabel(),
                    testDateLabel = 'dateUTC',
                    newDateLabel;

                tooltipChart.dateLabel(testDateLabel);
                newDateLabel = tooltipChart.dateLabel();

                expect(defaultDateLabel).not.toBe(testDateLabel);
                expect(newDateLabel).toBe(testDateLabel);
            });

            it('should provide a dateFormat getter and setter', () => {
                let defaultSchema = tooltipChart.dateFormat(),
                    testFormat = tooltipChart.axisTimeCombinations.HOUR_DAY,
                    newSchema;

                tooltipChart.dateFormat(testFormat);
                newSchema = tooltipChart.dateFormat();

                expect(defaultSchema).not.toBe(testFormat);
                expect(newSchema).toBe(testFormat);
            });

            it('should provide an axisTimeCombinations accessor', () => {
                let axisTimeCombinations = tooltipChart.axisTimeCombinations;

                expect(axisTimeCombinations).toEqual({
                    MINUTE_HOUR: 'minute-hour',
                    HOUR_DAY: 'hour-daymonth',
                    DAY_MONTH: 'day-month',
                    MONTH_YEAR: 'month-year',
                    CUSTOM: 'custom'
                });
            });

            it('should provide locale getter and setter', () => {
                let current = tooltipChart.locale(),
                    expected = 'fr-FR',
                    actual;

                tooltipChart.locale(expected);
                actual = tooltipChart.locale();

                expect(current).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide a topicsOrder getter and setter', () => {
                let defaultOrder = tooltipChart.topicsOrder(),
                    testOrder = [1,2,3,4,5],
                    newOrder;

                tooltipChart.topicsOrder(testOrder);
                newOrder = tooltipChart.topicsOrder();

                expect(defaultOrder).not.toBe(testOrder);
                expect(newOrder).toBe(testOrder);
            });

            it('should provide shouldShowDateInTitle getter and setter', () => {
                let current = tooltipChart.shouldShowDateInTitle(),
                    expected = false,
                    actual;

                tooltipChart.shouldShowDateInTitle(expected);
                actual = tooltipChart.shouldShowDateInTitle();

                expect(current).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide xAxisValueType getter and setter', () => {
                let current = tooltipChart.xAxisValueType(),
                    expected = 'number',
                    actual;

                tooltipChart.xAxisValueType(expected);
                actual = tooltipChart.xAxisValueType();

                expect(current).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('default of xAxisValueType should be "date"', () => {
                let current = tooltipChart.xAxisValueType();
                expect(current).toBe('date');
            });
        });
    });
});
