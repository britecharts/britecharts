define([
    'underscore',
    'jquery',
    'd3',
    'sparkline',
    'sparklineDataBuilder'
    ], function(
        _,
        $,
        d3,
        sparkline,
        dataBuilder
    ) {
    'use strict';

    const aTestDataSet = () => new dataBuilder.SparklineDataBuilder();
    const buildDataSet = (dataSetName) => {
        return aTestDataSet()
            [dataSetName]()
            .build();
    };

    const hasClass = (element, className) => {
        return _.contains(element[0][0].classList, className);
    };

    const hasIdWithPrefix = (element, prefix) => {
        return element.id.match(prefix) !== null;
    };

    describe('Sparkline Chart', () => {
        let dataset, containerFixture, f, sparklineChart;

        beforeEach(() => {
            dataset = aTestDataSet().with1Source().build();
            sparklineChart = sparkline().dateLabel('dateUTC');

            // DOM Fixture Setup
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container').append('svg');
            containerFixture.datum(dataset.data).call(sparklineChart);
        });

        afterEach(() => {
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        it('should render a sparkline chart with minimal requirements', () =>  {
            expect(containerFixture.select('.line').empty()).toBeFalsy();
        });

        it('should render container and chart groups', () => {
            expect(containerFixture.select('g.container-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.text-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.chart-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.metadata-group').empty()).toBeFalsy();
        });

        it('should render a sparkline', () => {
            let expected = 1;
            let actual = containerFixture.selectAll('.sparkline').nodes().length;

            expect(actual).toEqual(expected);
        });

        it('should create a gradient for the area', () => {
            let expected = 1;
            let actual = _.filter(containerFixture.selectAll('.area-gradient').nodes(), f => f && hasIdWithPrefix(f, 'sparkline-area-gradient')).length;

            expect(actual).toEqual(expected);
        });

        it('should render the sparkline area', () => {
            let expected = 1;
            let actual = containerFixture.selectAll('.sparkline-area').nodes().length;

            expect(actual).toEqual(expected);
        });

        it('should create a gradient for the line', () => {
            let expected = 1;
            let actual = _.filter(containerFixture.selectAll('.line-gradient').nodes(), f => f && hasIdWithPrefix(f, 'sparkline-line-gradient')).length;

            expect(actual).toEqual(expected);
        });

        describe('when the title text is set to specified string', () => {

            it('should create a text node with proper attributes', () => {
                let titleTextNode;

                sparklineChart.titleText('text');
                containerFixture.datum(dataset.data).call(sparklineChart);

                titleTextNode = containerFixture.selectAll('.sparkline-text').node();

                expect(titleTextNode).toBeInDOM();
                expect(titleTextNode).toHaveAttr('x');
                expect(titleTextNode).toHaveAttr('y');
                expect(titleTextNode).toHaveAttr('text-anchor');
                expect(titleTextNode).toHaveAttr('class');
                expect(titleTextNode).toHaveAttr('style');
            });

            it('should properly set the text inside of text node', () => {
                let expected = 'Tickets Sale';
                let actual;

                sparklineChart.titleText(expected);
                containerFixture.datum(dataset.data).call(sparklineChart);
                actual = containerFixture.selectAll('.sparkline-text').node().textContent;

                expect(actual).toEqual(expected);
            });
        });

        describe('when reloading with a different dataset', () => {

            it('should render in the same svg', function() {
                let actual;
                let expected = 1;
                let newDataset = buildDataSet('withLowValues');

                containerFixture.datum(newDataset.data).call(sparklineChart);

                actual = containerFixture.selectAll('.sparkline').nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should render one line', function() {
                let actual;
                let expected = 1;
                let newDataset = buildDataSet('withLowValues');

                containerFixture.datum(newDataset.data).call(sparklineChart);

                actual = containerFixture.selectAll('.sparkline .line').nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should render one area', function() {
                let actual;
                let expected = 1;
                let newDataset = buildDataSet('withLowValues');

                containerFixture.datum(newDataset.data).call(sparklineChart);

                actual = containerFixture.selectAll('.sparkline .sparkline-area').nodes().length;

                expect(actual).toEqual(expected);
            });

            it('should render one end circle', function() {
                let actual;
                let expected = 1;
                let newDataset = buildDataSet('withLowValues');

                containerFixture.datum(newDataset.data).call(sparklineChart);

                actual = containerFixture.selectAll('.sparkline .sparkline-circle').nodes().length;

                expect(actual).toEqual(expected);
            });
        });

        describe('when isAnimated is true', () => {

            it('should create a masking clip', () => {
                sparklineChart.isAnimated(true);
                containerFixture.datum(dataset.data).call(sparklineChart);

                let expected = 1;
                let actual = _.filter(containerFixture.selectAll('.clip-path').nodes(), f => f && hasIdWithPrefix(f, 'maskingClip')).length;

                expect(actual).toEqual(expected);
            });
        });

        describe('API', () => {

            it('should provide an areaGradient getter and setter', () => {
                let defaultGradient = sparklineChart.areaGradient(),
                    testGradient = ['#ffffff', '#fafefc'],
                    newGradient;

                sparklineChart.areaGradient(testGradient);
                newGradient = sparklineChart.areaGradient();

                expect(defaultGradient).not.toBe(testGradient);
                expect(newGradient).toBe(testGradient);
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

            it('should provide height getter and setter', () => {
                let defaultHeight = sparklineChart.height(),
                    testHeight = 200,
                    newHeight;

                sparklineChart.height(testHeight);
                newHeight = sparklineChart.height();

                expect(defaultHeight).not.toBe(testHeight);
                expect(newHeight).toBe(testHeight);
            });

            it('should provide dateLabel getter and setter', () => {
                let defaultDateLabel = sparklineChart.dateLabel(),
                    testDateLabel = 'date',
                    newDateLabel;

                sparklineChart.valueLabel(testDateLabel);
                newDateLabel = sparklineChart.valueLabel();

                expect(defaultDateLabel).not.toBe(testDateLabel);
                expect(newDateLabel).toBe(testDateLabel);
            });

            it('should provide animation duration getter and setter', () => {
                let defaultAnimationDuration = sparklineChart.duration(),
                    testAnimationDuration = 2000,
                    newAnimationDuration;

                sparklineChart.duration(testAnimationDuration);
                newAnimationDuration = sparklineChart.duration();

                expect(defaultAnimationDuration).not.toBe(testAnimationDuration);
                expect(newAnimationDuration).toBe(testAnimationDuration);
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
                        actual = sparklineChart.loadingState().match('stacked-area-load-state').length;

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
                                right: 20
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
                    'fill': 'green',
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
        });

        describe('Export chart functionality', () => {

            it('should have exportChart defined', () => {
                expect(sparklineChart.exportChart).toBeDefined();
            });
        });
    });
});
