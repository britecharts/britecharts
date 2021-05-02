import _ from 'underscore';
import * as d3 from 'd3';

import sparkline from 'sparkline';
import { SparklineDataBuilder } from 'sparklineDataBuilder';

const aTestDataSet = () => new SparklineDataBuilder();
const buildDataSet = (dataSetName) => {
    return aTestDataSet()[dataSetName]().build();
};
const hasIdWithPrefix = (element, prefix) => element.id.match(prefix) !== null;
const hasClass = (element, className) => {
    return _.contains(element[0][0].classList, className);
};

describe('Sparkline Chart', () => {
    let dataset, containerFixture, sparklineChart;

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        dataset = buildDataSet('with1Source');
        sparklineChart = sparkline();

        containerFixture = d3.select('.test-container').append('svg');
        containerFixture.datum(dataset.data).call(sparklineChart);
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        document.body.removeChild(document.getElementById('fixture'));
    });

    describe('Render', () => {
        it('should show a sparkline chart with minimal requirements', () => {
            const expected = 1;
            const actual = containerFixture.select('.line').size();

            expect(actual).toEqual(expected);
        });

        describe('groups', () => {
            it('should create a container-group', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('g.container-group')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should create a chart-group', () => {
                const expected = 1;
                const actual = containerFixture.select('g.chart-group').size();

                expect(actual).toEqual(expected);
            });

            it('should create a text-group', () => {
                const expected = 1;
                const actual = containerFixture.select('g.text-group').size();

                expect(actual).toEqual(expected);
            });

            it('should create a metadata-group', () => {
                const expected = 1;
                const actual = containerFixture
                    .select('g.metadata-group')
                    .size();

                expect(actual).toEqual(expected);
            });
        });

        it('should render a sparkline', () => {
            const expected = 1;
            const actual = containerFixture.selectAll('.sparkline').size();

            expect(actual).toEqual(expected);
        });

        it('should create a gradient for the area', () => {
            const expected = 1;
            const actual = _.filter(
                containerFixture.selectAll('.area-gradient').nodes(),
                (f) => f && hasIdWithPrefix(f, 'sparkline-area-gradient')
            ).length;

            expect(actual).toEqual(expected);
        });

        it('should render the sparkline area', () => {
            const expected = 1;
            const actual = containerFixture.selectAll('.sparkline-area').size();

            expect(actual).toEqual(expected);
        });

        it('should create a gradient for the line', () => {
            const expected = 1;
            const actual = _.filter(
                containerFixture.selectAll('.line-gradient').nodes(),
                (f) => f && hasIdWithPrefix(f, 'sparkline-line-gradient')
            ).length;

            expect(actual).toEqual(expected);
        });

        describe('when the title text is set', () => {
            it('should create a text node with proper attributes', () => {
                sparklineChart.titleText('text');
                containerFixture.datum(dataset.data).call(sparklineChart);
                const titleTextNode = containerFixture
                    .selectAll('.sparkline-text')
                    .node();

                expect(titleTextNode.getAttribute('x')).toBeDefined();
                expect(titleTextNode.getAttribute('y')).toBeDefined();
                expect(titleTextNode.getAttribute('text-anchor')).toBeDefined();
                expect(titleTextNode.getAttribute('class')).toBeDefined();
                expect(titleTextNode.getAttribute('style')).toBeDefined();
            });

            it('should properly set the text inside of text node', () => {
                const expected = 'Tickets Sale';
                let actual;

                sparklineChart.titleText(expected);
                containerFixture.datum(dataset.data).call(sparklineChart);
                actual = containerFixture.selectAll('.sparkline-text').node()
                    .textContent;

                expect(actual).toEqual(expected);
            });
        });

        describe('when reloading with a different dataset', () => {
            it('should render in the same svg', () => {
                const expected = 1;
                const newDataset = buildDataSet('withLowValues');
                let actual;

                containerFixture.datum(newDataset.data).call(sparklineChart);
                actual = containerFixture.selectAll('.sparkline').size();

                expect(actual).toEqual(expected);
            });

            it('should render one line', () => {
                const expected = 1;
                const newDataset = buildDataSet('withLowValues');
                let actual;

                containerFixture.datum(newDataset.data).call(sparklineChart);
                actual = containerFixture.selectAll('.sparkline .line').size();

                expect(actual).toEqual(expected);
            });

            it('should render one area', () => {
                const expected = 1;
                const newDataset = buildDataSet('withLowValues');
                let actual;

                containerFixture.datum(newDataset.data).call(sparklineChart);
                actual = containerFixture
                    .selectAll('.sparkline .sparkline-area')
                    .size();

                expect(actual).toEqual(expected);
            });

            it('should render one end circle', () => {
                const expected = 1;
                const newDataset = buildDataSet('withLowValues');
                let actual;

                containerFixture.datum(newDataset.data).call(sparklineChart);

                actual = containerFixture
                    .selectAll('.sparkline .sparkline-circle')
                    .size();

                expect(actual).toEqual(expected);
            });
        });

        describe('when is animated', () => {
            it('should create a masking clip', () => {
                const expected = 1;

                sparklineChart.isAnimated(true);
                containerFixture.datum(dataset.data).call(sparklineChart);
                const actual = _.filter(
                    containerFixture.selectAll('.clip-path').nodes(),
                    (f) => f && hasIdWithPrefix(f, 'maskingClip')
                ).length;

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('API', () => {
        it('should provide animationDuration getter and setter', () => {
            let defaultAnimationDuration = sparklineChart.animationDuration(),
                testAnimationDuration = 2000,
                newAnimationDuration;

            sparklineChart.animationDuration(testAnimationDuration);
            newAnimationDuration = sparklineChart.animationDuration();

            expect(defaultAnimationDuration).not.toBe(testAnimationDuration);
            expect(newAnimationDuration).toBe(testAnimationDuration);
        });

        it('should provide an areaGradient getter and setter', () => {
            let defaultGradient = sparklineChart.areaGradient(),
                testGradient = ['#ffffff', '#fafefc'],
                newGradient;

            sparklineChart.areaGradient(testGradient);
            newGradient = sparklineChart.areaGradient();

            expect(defaultGradient).not.toBe(testGradient);
            expect(newGradient).toBe(testGradient);
        });

        it('should provide dateLabel getter and setter', () => {
            let defaultDateLabel = sparklineChart.dateLabel(),
                testDateLabel = 'testDateLabel',
                newDateLabel;

            sparklineChart.valueLabel(testDateLabel);
            newDateLabel = sparklineChart.valueLabel();

            expect(defaultDateLabel).not.toBe(testDateLabel);
            expect(newDateLabel).toBe(testDateLabel);
        });

        describe('export chart', () => {
            it('should have exportChart defined', () => {
                expect(sparklineChart.exportChart).toBeDefined();
            });
        });

        it('should provide height getter and setter', () => {
            let defaultHeight = sparklineChart.height(),
                testHeight = 200,
                newHeight;

            sparklineChart.height(testHeight);
            newHeight = sparklineChart.height();

            expect(defaultHeight).not.toBe(testHeight);
            expect(newHeight).toBe(testHeight);
        });

        it('should provide isAnimated getter and setter', () => {
            let defaultAnimation = sparklineChart.isAnimated(),
                testAnimation = true,
                newAnimation;

            sparklineChart.isAnimated(testAnimation);
            newAnimation = sparklineChart.isAnimated();

            expect(defaultAnimation).not.toBe(testAnimation);
            expect(newAnimation).toBe(testAnimation);
        });

        describe('loadingState', () => {
            it('should provide a loading state getter and setter', () => {
                let previous = sparklineChart.loadingState(),
                    expected = '<svg></svg>',
                    actual;

                sparklineChart.loadingState(expected);
                actual = sparklineChart.loadingState();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            describe('when getting a loadingState', () => {
                it('should return an SVG element', () => {
                    let expected = 1,
                        actual;

                    sparklineChart = sparkline();
                    actual = sparklineChart
                        .loadingState()
                        .match('stacked-area-load-state').length;

                    expect(actual).toEqual(expected);
                });
            });
        });

        it('should provide a lineGradient getter and setter', () => {
            let defaultGradient = sparklineChart.lineGradient(),
                testGradient = ['#ffffff', '#fafefc'],
                newGradient;

            sparklineChart.lineGradient(testGradient);
            newGradient = sparklineChart.lineGradient();

            expect(defaultGradient).not.toBe(testGradient);
            expect(newGradient).toBe(testGradient);
        });

        describe('margin', () => {
            it('should provide margin getter and setter', () => {
                let defaultMargin = sparklineChart.margin(),
                    testMargin = { top: 4, right: 4, bottom: 4, left: 4 },
                    newMargin;

                sparklineChart.margin(testMargin);
                newMargin = sparklineChart.margin();

                expect(defaultMargin).not.toBe(testMargin);
                expect(newMargin).toEqual(testMargin);
            });

            describe('when margins are set partially', function () {
                it('should override the default values', () => {
                    let previous = sparklineChart.margin(),
                        expected = {
                            ...previous,
                            top: 10,
                            right: 20,
                        },
                        actual;

                    sparklineChart.width(expected);
                    actual = sparklineChart.width();

                    expect(previous).not.toBe(actual);
                    expect(actual).toEqual(expected);
                });
            });
        });

        it('should provide a titleText getter and setter', () => {
            let defaultTitleText = sparklineChart.titleText(),
                testTitleText = 'Budget Growth',
                newTitleText;

            sparklineChart.titleText(testTitleText);
            newTitleText = sparklineChart.titleText();

            expect(defaultTitleText).not.toBe(testTitleText);
            expect(newTitleText).toBe(testTitleText);
        });

        it('should provide a titleTextStyle getter and setter', () => {
            let defaultTitleTextStyle = sparklineChart.titleTextStyle(),
                testTitleTextStyle = {
                    'font-family': 'Verdana',
                    'font-size': '32px',
                    'font-weight': 200,
                    'font-style': 'italic',
                    fill: 'green',
                },
                newTitleTextStyle;

            sparklineChart.titleTextStyle(testTitleTextStyle);
            newTitleTextStyle = sparklineChart.titleTextStyle();

            expect(defaultTitleTextStyle).not.toEqual(testTitleTextStyle);
            expect(newTitleTextStyle).toEqual(testTitleTextStyle);
        });

        it('should provide valueLabel getter and setter', () => {
            let defaultValueLabel = sparklineChart.valueLabel(),
                testValueLabel = 'quantity',
                newValueLabel;

            sparklineChart.valueLabel(testValueLabel);
            newValueLabel = sparklineChart.valueLabel();

            expect(defaultValueLabel).not.toBe(testValueLabel);
            expect(newValueLabel).toBe(testValueLabel);
        });

        it('should provide width getter and setter', () => {
            let defaultWidth = sparklineChart.width(),
                testWidth = 200,
                newWidth;

            sparklineChart.width(testWidth);
            newWidth = sparklineChart.width();

            expect(defaultWidth).not.toBe(testWidth);
            expect(newWidth).toBe(testWidth);
        });
    });
});
