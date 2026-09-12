import * as d3 from 'd3';

import tooltip from './tooltip';

const topicColorMap = {
    0: '#9963D5',
    60: '#E5C400',
    81: '#FF4D7C',
    103: '#4DC2F5',
    149: '#4DDB86',
};

describe('tooltip Component', () => {
    let tooltipChart, dataset, containerFixture;

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        dataset = [];
        tooltipChart = tooltip();

        containerFixture = d3.select('.test-container').append('svg');
        containerFixture.datum(dataset).call(tooltipChart);

        window.SVGElement.prototype.getBBox = () => ({
            x: 0,
            y: 0,
        });
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        delete window.SVGElement.prototype.getBBox;
        document.body.removeChild(document.getElementById('fixture'));
    });

    describe('render', () => {
        it('should not catch pointer events, so the chart under it keeps them', () => {
            const expected = 'none';
            const actual = containerFixture
                .select('.britechart-tooltip')
                .attr('pointer-events');

            expect(actual).toEqual(expected);
        });

        it('should render a chart with minimal requirements', () => {
            const expected = 1;
            const actual = containerFixture
                .select('.britechart-tooltip')
                .size();

            expect(actual).toEqual(expected);
        });

        it('should render a chart with minimal requirements', () => {
            const expected = 'hidden';
            const actual = containerFixture
                .select('.britechart-tooltip')
                .style('visibility');

            expect(actual).toEqual(expected);
        });

        describe('for each topic', () => {
            it('should add a line of text', () => {
                const expected = 2;
                let actual;

                tooltipChart.update(
                    {
                        date: '2015-08-05T07:00:00.000Z',
                        topics: [
                            {
                                name: 103,
                                value: '5',
                                topicName: 'San Francisco',
                            },
                            {
                                name: 60,
                                value: '10',
                                topicName: 'Chicago',
                            },
                        ],
                    },
                    topicColorMap,
                    0
                );
                actual = containerFixture
                    .select('.britechart-tooltip')
                    .selectAll('.tooltip-left-text')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should keep a numeric background height when the text cannot be measured', () => {
                // getBBox() is stubbed here without a height, which is what a
                // browser reports while the tooltip is still hidden. The height
                // must fall back to a number rather than becoming NaN.
                let actual;

                tooltipChart.update(
                    {
                        date: '2015-08-05T07:00:00.000Z',
                        topics: [
                            {
                                name: 103,
                                value: '5',
                                topicName: 'San Francisco',
                            },
                            {
                                name: 60,
                                value: '10',
                                topicName: 'Chicago',
                            },
                        ],
                    },
                    topicColorMap,
                    0
                );
                actual = containerFixture
                    .select('.britechart-tooltip')
                    .select('.tooltip-background')
                    .attr('height');

                expect(actual).not.toEqual('NaN');
                expect(Number.isFinite(+actual)).toBe(true);
                expect(+actual).toBeGreaterThan(0);
            });

            it('should add a circle', () => {
                const expected = 2;
                let actual;

                tooltipChart.update(
                    {
                        date: '2015-08-05T07:00:00.000Z',
                        topics: [
                            {
                                name: 103,
                                value: 0,
                                topicName: 'San Francisco',
                            },
                            {
                                name: 60,
                                value: 10,
                                topicName: 'Chicago',
                            },
                        ],
                    },
                    topicColorMap,
                    0
                );
                actual = containerFixture
                    .select('.britechart-tooltip')
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

                    tooltipChart.dateFormat(
                        tooltipChart.axisTimeCombinations.DAY_MONTH
                    );
                    tooltipChart.update(
                        {
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [],
                        },
                        topicColorMap,
                        0
                    );
                    actual = containerFixture
                        .select('.britechart-tooltip')
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
                    tooltipChart.update(
                        {
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [],
                        },
                        topicColorMap,
                        0
                    );
                    actual = containerFixture
                        .select('.britechart-tooltip')
                        .selectAll('.tooltip-title')
                        .text();

                    expect(actual).toBe(expected);
                });
            });

            describe.skip('when title is long', () => {
                beforeEach(() => {
                    dataset = [];
                    tooltipChart = tooltip().title(
                        'Super long and exciting Tooltip title'
                    );

                    const fixture =
                        '<div id="fixture"><div class="test-container"></div></div>';

                    document.body.insertAdjacentHTML('afterbegin', fixture);

                    containerFixture = d3
                        .select('.test-container')
                        .append('svg');
                    containerFixture.datum(dataset).call(tooltipChart);
                });

                afterEach(() => {
                    document.body.removeChild(
                        document.getElementById('fixture')
                    );
                });

                it('should be displayed in two rows', () => {
                    // the space between 'Tooltip' and 'title' dissappears because of the text wrap
                    const expectedTitle =
                        'SuperlongandexcitingTooltiptitle-Aug05,2015';
                    const expectedDividerYPosition = 48;
                    let actualTitle,
                        actualDividerY1Position,
                        actualDividerY2Position;

                    tooltipChart.dateFormat(
                        tooltipChart.axisTimeCombinations.DAY_MONTH
                    );
                    tooltipChart.update(
                        {
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [],
                        },
                        topicColorMap,
                        0
                    );

                    actualTitle = containerFixture
                        .select('.britechart-tooltip')
                        .selectAll('.tooltip-title')
                        .text();

                    actualDividerY1Position = containerFixture
                        .select('.britechart-tooltip')
                        .select('.tooltip-divider')
                        .attr('y1');

                    actualDividerY2Position = containerFixture
                        .select('.britechart-tooltip')
                        .select('.tooltip-divider')
                        .attr('y2');

                    expect(actualTitle.split(' ').join('')).toEqual(
                        expectedTitle
                    );
                    expect(parseInt(actualDividerY1Position, 10)).toEqual(
                        expectedDividerYPosition
                    );
                    expect(parseInt(actualDividerY2Position, 10)).toEqual(
                        expectedDividerYPosition
                    );
                });
            });
        });
    });

    describe('title key', () => {
        const titleOf = () => containerFixture.select('.tooltip-title').text();

        beforeEach(() => {
            // No title, so the text is the formatted key alone
            tooltipChart.title('');
        });
        const pointWith = (key) => ({
            date: key,
            topics: [{ name: 'a', topicName: 'a', value: 1 }],
        });

        it('should show a date key as a date by default', () => {
            tooltipChart.update(
                pointWith('2015-08-05T07:00:00.000Z'),
                topicColorMap,
                0
            );

            expect(titleOf()).toEqual('Aug 05, 2015');
        });

        it('should show a category key as it is by default', () => {
            tooltipChart.update(pointWith('Chicago'), topicColorMap, 0);

            expect(titleOf()).toEqual('Chicago');
        });

        it('should show a numeric key as a number by default', () => {
            tooltipChart.update(pointWith('42'), topicColorMap, 0);

            expect(titleOf()).toEqual('42');
        });

        it('should show a category key as it is when told so, even if it parses as a date', () => {
            tooltipChart.xAxisValueType('category');
            tooltipChart.update(pointWith('2015'), topicColorMap, 0);

            expect(titleOf()).toEqual('2015');
        });

        it('should fall back to the key field of the data point', () => {
            tooltipChart.update(
                {
                    key: 'Chicago',
                    topics: [{ name: 'a', topicName: 'a', value: 1 }],
                },
                topicColorMap,
                0
            );

            expect(titleOf()).toEqual('Chicago');
        });

        it('should show only the title when the data point has no key', () => {
            tooltipChart.title('Sales');
            tooltipChart.update(
                { topics: [{ name: 'a', topicName: 'a', value: 1 }] },
                topicColorMap,
                0
            );

            expect(titleOf()).toEqual('Sales');
        });
    });

    describe('many rows', () => {
        const pointWithRows = (count) => ({
            date: '2015-08-05T07:00:00.000Z',
            topics: Array.from({ length: count }, (_, index) => ({
                name: `topic-${String(index).padStart(2, '0')}`,
                topicName: `Topic ${index}`,
                value: index,
            })),
        });
        const rowTexts = () =>
            containerFixture
                .selectAll('.tooltip-left-text')
                .nodes()
                .map((node) => node.textContent);

        it('should show every row up to maxEntries', () => {
            tooltipChart.update(pointWithRows(12), topicColorMap, 0);

            expect(rowTexts()).toHaveLength(12);
        });

        it('should fold the rows past maxEntries into a "+n more" row', () => {
            tooltipChart.update(pointWithRows(20), topicColorMap, 0);

            const texts = rowTexts();

            expect(texts).toHaveLength(12);
            expect(texts[11]).toEqual('+9 more');
            expect(
                containerFixture
                    .selectAll('.tooltip-entry')
                    .filter(function () {
                        return (
                            d3
                                .select(this)
                                .select('.tooltip-circle')
                                .style('display') === 'none'
                        );
                    })
                    .size()
            ).toEqual(1);
        });

        it('should show every row when maxEntries is 0', () => {
            tooltipChart.maxEntries(0);
            tooltipChart.update(pointWithRows(20), topicColorMap, 0);

            expect(rowTexts()).toHaveLength(20);
        });
    });

    describe('lifecycle', () => {
        const settle = () => new Promise((resolve) => setTimeout(resolve, 300));
        const aDataPoint = (names) => ({
            date: '2015-08-05T07:00:00.000Z',
            topics: names.map((name, index) => ({
                name,
                topicName: name,
                value: index + 1,
            })),
        });

        it('should fade out when hidden, staying visible meanwhile', () => {
            tooltipChart.show();
            tooltipChart.update(aDataPoint(['a']), topicColorMap, 0, 0);

            return settle()
                .then(() => {
                    tooltipChart.hide();

                    expect(
                        containerFixture
                            .select('.britechart-tooltip')
                            .style('visibility')
                    ).toEqual('visible');

                    return settle();
                })
                .then(() => {
                    expect(
                        containerFixture
                            .select('.britechart-tooltip')
                            .style('visibility')
                    ).toEqual('hidden');
                });
        });

        it('should stay shown when called on its container again', () => {
            tooltipChart.show();
            tooltipChart.update(aDataPoint(['a']), topicColorMap, 0, 0);
            containerFixture.call(tooltipChart);

            const expected = 'visible';
            const actual = containerFixture
                .select('.britechart-tooltip')
                .style('visibility');

            expect(actual).toEqual(expected);
        });

        it('should keep the same row nodes across updates', () => {
            tooltipChart.update(aDataPoint(['a', 'b']), topicColorMap, 0, 0);

            const before = containerFixture.selectAll('.tooltip-entry').nodes();

            tooltipChart.update(aDataPoint(['a', 'b']), topicColorMap, 10, 0);

            const after = containerFixture.selectAll('.tooltip-entry').nodes();

            expect(after).toEqual(before);
            expect(after.length).toEqual(2);
        });

        it('should drop the rows of topics that are gone', () => {
            tooltipChart.update(aDataPoint(['a', 'b']), topicColorMap, 0, 0);
            tooltipChart.update(aDataPoint(['b']), topicColorMap, 0, 0);

            const expected = ['b'];
            const actual = containerFixture
                .selectAll('.tooltip-left-text')
                .nodes()
                .map((node) => node.textContent);

            expect(actual).toEqual(expected);
        });

        it('should be visible when required', () => {
            const expected = 'visible';
            const expectedDefault = 'hidden';
            let actual = containerFixture
                .select('.britechart-tooltip')
                .style('visibility');

            expect(actual).toEqual(expectedDefault);
            tooltipChart.show();
            actual = containerFixture
                .select('.britechart-tooltip')
                .style('visibility');

            expect(actual).not.toEqual(expectedDefault);
            expect(actual).toEqual(expected);
        });

        describe('number formatting', () => {
            describe('decimal values', () => {
                it('should format big numbers', () => {
                    const expected = '10k';
                    let actual;

                    tooltipChart.update(
                        {
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [
                                {
                                    name: 103,
                                    value: 10000.004,
                                    topicName: 'San Francisco',
                                },
                            ],
                        },
                        topicColorMap,
                        0
                    );
                    actual = containerFixture
                        .select('.britechart-tooltip .tooltip-right-text')
                        .text();

                    expect(actual).toEqual(expected);
                });

                it('should format medium numbers', () => {
                    const expected = '100';
                    let actual;

                    tooltipChart.update(
                        {
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [
                                {
                                    name: 103,
                                    value: 100.005,
                                    topicName: 'San Francisco',
                                },
                            ],
                        },
                        topicColorMap,
                        0
                    );
                    actual = containerFixture
                        .select('.britechart-tooltip .tooltip-right-text')
                        .text();

                    expect(actual).toEqual(expected);
                });

                it('should format small numbers', () => {
                    const expected = '9.123';
                    let actual;

                    tooltipChart.update(
                        {
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [
                                {
                                    name: 103,
                                    value: 9.1234,
                                    topicName: 'San Francisco',
                                },
                            ],
                        },
                        topicColorMap,
                        0
                    );
                    actual = containerFixture
                        .select('.britechart-tooltip .tooltip-right-text')
                        .text();

                    expect(actual).toEqual(expected);
                });
            });

            describe('integer values', () => {
                it('should format big numbers', () => {
                    const expected = '10k';
                    let actual;

                    tooltipChart.update(
                        {
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [
                                {
                                    name: 103,
                                    value: 10000,
                                    topicName: 'San Francisco',
                                },
                            ],
                        },
                        topicColorMap,
                        0
                    );
                    actual = containerFixture
                        .select('.britechart-tooltip .tooltip-right-text')
                        .text();

                    expect(actual).toEqual(expected);
                });

                it('should not format medium numbers', () => {
                    const expected = '103';
                    let actual;

                    tooltipChart.update(
                        {
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [
                                {
                                    name: 103,
                                    value: 103,
                                    topicName: 'San Francisco',
                                },
                            ],
                        },
                        topicColorMap,
                        0
                    );
                    actual = containerFixture
                        .select('.britechart-tooltip .tooltip-right-text')
                        .text();

                    expect(actual).toEqual(expected);
                });

                it('should not format small numbers', () => {
                    const expected = '9';
                    let actual;

                    tooltipChart.update(
                        {
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [
                                {
                                    name: 103,
                                    value: 9,
                                    topicName: 'San Francisco',
                                },
                            ],
                        },
                        topicColorMap,
                        0
                    );
                    actual = containerFixture
                        .select('.britechart-tooltip .tooltip-right-text')
                        .text();

                    expect(actual).toEqual(expected);
                });

                describe('when xAxisValueType is set to number', () => {
                    it('should show the number in the title of the tooltip', () => {
                        const expected = 'Tooltip title - 20000';
                        let actual;

                        tooltipChart.xAxisValueType('number');
                        tooltipChart.update(
                            {
                                date: 20000,
                                topics: [],
                            },
                            topicColorMap,
                            0
                        );
                        actual = containerFixture
                            .select('.britechart-tooltip')
                            .selectAll('.tooltip-title')
                            .text();

                        expect(actual).toEqual(expected);
                    });
                });
            });

            describe('override default formatting', () => {
                it('should respect format override', () => {
                    const expected = '10,000';
                    let actual;

                    tooltipChart.numberFormat(',');
                    tooltipChart.update(
                        {
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [
                                {
                                    name: 103,
                                    value: 10000,
                                    topicName: 'San Francisco',
                                },
                            ],
                        },
                        topicColorMap,
                        0
                    );
                    actual = containerFixture
                        .select('.britechart-tooltip .tooltip-right-text')
                        .text();

                    expect(actual).toEqual(expected);
                });

                it('should use custom function if set', () => {
                    const expected = '8';
                    let actual;

                    tooltipChart.valueFormatter((value) =>
                        value.toString().length.toString()
                    );
                    tooltipChart.update(
                        {
                            date: '2015-08-05T07:00:00.000Z',
                            topics: [
                                {
                                    name: 103,
                                    value: 10000000,
                                    topicName: 'San Francisco',
                                },
                            ],
                        },
                        topicColorMap,
                        0
                    );
                    actual = containerFixture
                        .select('.britechart-tooltip .tooltip-right-text')
                        .text();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });

    describe('aPI', () => {
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
                testTooltipOffset = { x: 50, y: 50 },
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
                CUSTOM: 'custom',
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
                testOrder = [1, 2, 3, 4, 5],
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

        it('default of xAxisValueType should be "auto"', () => {
            const expected = 'auto';
            const actual = tooltipChart.xAxisValueType();

            expect(actual).toEqual(expected);
        });

        it('should provide maxEntries getter and setter', () => {
            const defaultMaxEntries = tooltipChart.maxEntries();
            const expected = 6;

            tooltipChart.maxEntries(expected);

            expect(defaultMaxEntries).toEqual(12);
            expect(tooltipChart.maxEntries()).toEqual(expected);
        });
    });
});
