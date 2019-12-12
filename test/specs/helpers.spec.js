define([
    'underscore',
    'jquery',
    'd3',
    'legend',
    'donutChartDataBuilder',
    'lineChartDataBuilder',
    'helpers/style',
    'helpers/text',
    'helpers/number',
    'helpers/date',
    'helpers/export',
    'helpers/axis',
    'helpers/locale'
], function (
    _,
    $,
    d3,
    legend,
    donutDataBuilder,
    lineDataBuilder,
    style,
    textHelper,
    number,
    date,
    exportChart,
    axis,
    locale
) {
    'use strict';

    const randomColor = 'rgb(222,163,12)';
    let f, containerFixture, styles, node;

    const aDonutTestDataSet = () => new donutDataBuilder.DonutDataBuilder();
    const aLineTestDataSet = () => new lineDataBuilder.LineDataBuilder();

    describe('Helpers', () => {

        beforeEach(() => {
            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');
            containerFixture = $('.test-container');
        });

        afterEach(() => {
            containerFixture.remove();
            f = jasmine.getFixtures();
            f.cleanUp();
            f.clearCache();
        });

        describe('style', () => {
            let styledHTML;

            beforeEach(() => {
                containerFixture.append($('<span></span>', { class: 'child' }));

                this.serializer = style.initializeSerializer();
                styles = document.createElement('style');
                styles.innerHTML = `.child{background:${randomColor};}`;
                document.body.appendChild(styles);
            });

            afterEach(() => {
                this.serializer = null;
                document.body.removeChild(styles);
            });

            it('should expect serializer to be defined', () => {
                const expected = 'function';
                const actual = typeof this.serializer;

                expect(actual).toEqual(expected);
            });

            it('should add styles from stylesheets to inline of element', () => {
                let actual;
                node = containerFixture[0];

                styledHTML = this.serializer(node).replace(' ', '');
                actual = styledHTML.indexOf(randomColor).length;

                expect(styledHTML).not.toBe(node.outerHTML.replace(' ', ''));
                expect(actual).not.toEqual(0);
            });
        });

        describe('text', () => {

            it('should wrap the text in X lines', () => {
                const expectedText = 'brilliant dazzling flashing';
                const fontSize = 20;
                const availableWidth = 20;
                const xOffset = 0;
                const expectedLabelCount = 3;
                const expectedValueCount = 1;
                const textNode = d3.select('.test-container')
                    .append('svg')
                    .append('text')
                    .attr('dy', '.2em')
                    .text(expectedText)
                    .node();

                textHelper.wrapText.call(null, xOffset, fontSize, availableWidth, textNode);

                const actualValueCount = d3.selectAll('.test-container .value').size();
                const actualLabelCount = d3.selectAll('.test-container .label').size();

                expect(actualValueCount).toEqual(expectedValueCount);
                expect(actualLabelCount).toEqual(expectedLabelCount);
            });
        });

        describe('number', () => {

            it('should return true if its an integer', () => {
                const expected = true;
                const actual = number.isInteger(3);

                expect(actual).toEqual(expected);
            });

            it('should return false passed a non integer', () => {
                const expected = false;
                const actual = number.isInteger(3.2);

                expect(actual).toEqual(expected);
            });

            it('should calculate percent from value and total', () => {
                const expected = '10.0';
                const actual = number.calculatePercent(10, 100, '.1f');

                expect(actual).toEqual(expected);
            });

            it('should return specified number of decimal places', () => {
                const expected = '20.00';
                const actual = number.calculatePercent(20, 100, '.2f');

                expect(actual).toEqual(expected);
            });
        });

        describe('date', () => {

            it('should return difference between dates', () => {
                const expected = 1;
                const actual = date.diffDays('Thu Oct 05 2017', 'Thu Oct 04 2017');

                expect(actual).toEqual(expected);
            });

            it('should add a number of days to a date', () => {
                const expected = 'Fri Oct 06 2017';
                const actual = date.addDays('Thu Oct 05 2017', 1).slice(0, 15);

                expect(actual).toEqual(expected);
            });
        });

        describe('export chart', () => {
            const regularHTML = '<svg class="britechart britechart-legend" width="200" version="1.1" xmlns="http://www.w3.org/2000/svg"><style>svg{background:white;}</style><text x="0" y="30" font-family="Benton Sans, sans-serif" font-size="15px" fill="#45494E"> test title </text><g  class="legend-container-group" transform="translate(0,0)"><g class="legend-group"><g class="legend-line" data-item="1" transform="translate(26,25.714285714285715)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(106, 237, 199); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 30px; perspective-origin: 15px 7px;">Shiny</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">86.0000</text></g><g class="legend-line" data-item="2" transform="translate(26,51.42857142857143)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(57, 194, 201); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 40.3125px; perspective-origin: 20.1562px 7px;">Blazing</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">300.000</text></g><g class="legend-line" data-item="3" transform="translate(26,77.14285714285714)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(255, 206, 0); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 46.8125px; perspective-origin: 23.4062px 7px;">Dazzling</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">276.000</text></g><g class="legend-line" data-item="4" transform="translate(26,102.85714285714286)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(255, 167, 26); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 40.3281px; perspective-origin: 20.1562px 7px;">Radiant</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">195.000</text></g><g class="legend-line" data-item="5" transform="translate(26,128.57142857142858)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(248, 102, 185); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 50.6562px; perspective-origin: 25.3281px 7px;">Sparkling</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">36.0000</text></g><g class="legend-line" data-item="0" transform="translate(26,154.28571428571428)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(153, 140, 227); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 29.3438px; perspective-origin: 14.6719px 7px;">Other</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">814.000</text></g></g></g></svg>';
            const specialHTML = '<svg class="britechart britechart-legend" width="200" version="1.1" xmlns="http://www.w3.org/2000/svg"><style>svg{background:white;}</style><text x="0" y="30" font-family="Benton Sans, sans-serif" font-size="15px" fill="#45494E"> XXIV CONGRESO ARGENTINO DE HIPERTENSIÓN ARTERIAL </text><g  class="legend-container-group" transform="translate(0,0)"><g class="legend-group"><g class="legend-line" data-item="1" transform="translate(26,25.714285714285715)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(106, 237, 199); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 30px; perspective-origin: 15px 7px;">Shiny</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">86.0000</text></g><g class="legend-line" data-item="2" transform="translate(26,51.42857142857143)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(57, 194, 201); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 40.3125px; perspective-origin: 20.1562px 7px;">Blazing</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">300.000</text></g><g class="legend-line" data-item="3" transform="translate(26,77.14285714285714)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(255, 206, 0); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 46.8125px; perspective-origin: 23.4062px 7px;">Dazzling</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">276.000</text></g><g class="legend-line" data-item="4" transform="translate(26,102.85714285714286)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(255, 167, 26); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 40.3281px; perspective-origin: 20.1562px 7px;">Radiant</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">195.000</text></g><g class="legend-line" data-item="5" transform="translate(26,128.57142857142858)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(248, 102, 185); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 50.6562px; perspective-origin: 25.3281px 7px;">Sparkling</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">36.0000</text></g><g class="legend-line" data-item="0" transform="translate(26,154.28571428571428)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(153, 140, 227); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 29.3438px; perspective-origin: 14.6719px 7px;">Other</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">814.000</text></g></g></g></svg>';
            let legendChart, dataset, containerFixture, f;

            beforeEach(() => {
                dataset = aDonutTestDataSet()
                    .withFivePlusOther()
                    .build();
                legendChart = legend();

                f = jasmine.getFixtures();
                f.fixturesPath = 'base/test/fixtures/';
                f.load('testContainer.html');

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(legendChart);
                d3.select('.test-container svg').attr('width', 200);
            });

            xdescribe('convertSvgToHtml', () => {

                describe('when the title is regular text', () => {

                    it('should add the title to the chart html', () => {
                        let expected = 1;
                        let testTitle = 'test title';
                        let actual = exportChart.convertSvgToHtml.call(legendChart, d3.select('.test-container svg'), testTitle).match(testTitle).length;

                        expect(actual).toEqual(expected);
                    });
                });

                describe('when the title has special characters', () => {

                    it('should add the title to the chart html', () => {
                        let expected = 1;
                        let testTitle = 'XXIV CONGRESO ARGENTINO DE HIPERTENSIÓN ARTERIAL';
                        let actual = exportChart.convertSvgToHtml.call(legendChart, d3.select('.test-container svg'), testTitle).match(testTitle).length;

                        expect(actual).toEqual(expected);
                    });
                });
            });

            describe('createImage', () => {

                describe('when the title is regular text', () => {

                    it('should produce an image tag', () => {
                        const expected = 'IMG';
                        const actual = exportChart.createImage(regularHTML).tagName;

                        expect(actual).toEqual(expected);
                    });

                    it('should produce a canvas tag when using it with drawImageOnCanvas', () => {
                        const expected = 'CANVAS';
                        const image = exportChart.createImage(regularHTML);
                        const actual = exportChart.drawImageOnCanvas(image, document.createElement('canvas')).tagName;

                        expect(actual).toEqual(expected);
                    });
                });

                describe('when the title has special characters', () => {

                    it('should produce an image tag', () => {
                        const expected = 'IMG';
                        const actual = exportChart.createImage(specialHTML).tagName;

                        expect(actual).toEqual(expected);
                    });

                    it('should produce a canvas tag when using it with drawImageOnCanvas', () => {
                        let expected = 'CANVAS';
                        let image = exportChart.createImage(specialHTML);
                        let actual = exportChart.drawImageOnCanvas(image, document.createElement('canvas')).tagName;

                        expect(actual).toEqual(expected);
                    });
                });
            });
        });

        describe('axis', () => {
            const minuteFormat = '%M m';
            const hourFormat = '%H %p';
            const dayFormat = '%e';
            const dayMonthFormat = '%d %b';
            const monthFormat = '%b';
            const yearFormat = '%Y';
            let twoYearsDataSet;
            let oneDayDataSet;
            let lessThanOneMonthDataSet;

            beforeEach(() => {
                lessThanOneMonthDataSet = aLineTestDataSet()
                    .with5Topics()
                    .build();
                oneDayDataSet = aLineTestDataSet()
                    .withHourDateRange()
                    .build();
                twoYearsDataSet = aLineTestDataSet()
                    .withMultiMonthValueRange()
                    .build();
            });

            describe('when automatic setting', () => {

                describe('when timeframe is 1 day', () => {
                    let minor, major;

                    beforeEach(() => {
                        ({ minor, major } = axis.getTimeSeriesAxis(oneDayDataSet.dataByDate, 300));
                    });

                    it('should give back a minor tick function', () => {
                        const expected = 'function';
                        const actual = typeof minor.tick;

                        expect(actual).toEqual(expected);
                    });

                    it('should give back a minor hour format and 5 ticks', () => {
                        const actual = minor.format.toString();

                        expect(actual).toEqual(hourFormat);
                    });

                    it('should give back a major day format', () => {
                        const actual = major.format.toString();

                        expect(actual).toEqual(dayMonthFormat);
                    });
                });

                describe('when timeframe is less than one month', () => {
                    let minor, major;

                    beforeEach(() => {
                        ({ minor, major } = axis.getTimeSeriesAxis(lessThanOneMonthDataSet.dataByDate, 300));
                    });

                    it('should give back a minor tick function', () => {
                        const expected = 5;
                        const actual = minor.tick;

                        expect(actual).toEqual(expected);
                    });

                    it('should give back a minor day format and 5 ticks', () => {
                        const actual = minor.format.toString();

                        expect(actual).toEqual(dayFormat);
                    });

                    it('should give back a major month format', () => {
                        const actual = major.format.toString();

                        expect(actual).toEqual(monthFormat);
                    });
                });

                describe('when timeframe is 2 years', () => {
                    let minor, major;

                    beforeEach(() => {
                        ({ minor, major } = axis.getTimeSeriesAxis(twoYearsDataSet.dataByDate, 300));
                    });

                    it('should give back a minor month format', () => {
                        const expected = 5;
                        const actual = minor.tick;

                        expect(actual).toEqual(expected);
                    });

                    it('should give back a minor month format and 5 ticks', () => {
                        const actual = minor.format.toString();

                        expect(actual).toEqual(monthFormat);
                    });

                    it('should give back a major year format', () => {
                        const actual = major.format.toString();

                        expect(actual).toEqual(yearFormat);
                    });
                });
            });

            describe('when forced setting', () => {

                describe('when timeframe forced to minute and hour', () => {
                    let minor, major;

                    beforeEach(() => {
                        ({ minor, major } = axis.getTimeSeriesAxis(oneDayDataSet.dataByDate, 300, 'minute-hour'));
                    });

                    it('should give back a minor minute format and 5 ticks', () => {
                        const actual = minor.format.toString();

                        expect(actual).toEqual(minuteFormat);
                    });

                    it('should give back a major hour format', () => {
                        const actual = major.format.toString();

                        expect(actual).toEqual(hourFormat);
                    });
                });

                describe('when timeframe forced to hour and day', () => {
                    let minor, major;

                    beforeEach(() => {
                        ({ minor, major } = axis.getTimeSeriesAxis(oneDayDataSet.dataByDate, 300, 'hour-daymonth'));
                    });

                    it('should give back a minor hour format and 5 ticks', () => {
                        const actual = minor.format.toString();

                        expect(actual).toEqual(hourFormat);
                    });

                    it('should give back a major day-month format', () => {
                        const actual = major.format.toString();

                        expect(actual).toEqual(dayMonthFormat);
                    });
                });

                describe('when timeframe forced to day and month', () => {
                    let minor, major;

                    beforeEach(() => {
                        ({ minor, major } = axis.getTimeSeriesAxis(oneDayDataSet.dataByDate, 300, 'day-month'));
                    });

                    it('should give back a minor day format and 5 ticks', () => {
                        const actual = minor.format.toString();

                        expect(actual).toEqual(dayFormat);
                    });

                    it('should give back a major month format', () => {
                        const actual = major.format.toString();

                        expect(actual).toEqual(monthFormat);
                    });
                });

                describe('when timeframe forced to month and year', () => {
                    let minor, major;

                    beforeEach(() => {
                        ({ minor, major } = axis.getTimeSeriesAxis(oneDayDataSet.dataByDate, 300, 'month-year'));
                    });

                    it('should give back a minor tick function', () => {
                        const expected = 'function';
                        const actual = typeof minor.tick;

                        expect(actual).toEqual(expected);
                    });

                    it('should give back a minor day format and 5 ticks', () => {
                        const actual = minor.format.toString();

                        expect(actual).toEqual(monthFormat);
                    });

                    it('should give back a major month format', () => {
                        const actual = major.format.toString();

                        expect(actual).toEqual(yearFormat);
                    });
                });
            });
        });

        describe('locale', () => {

            afterEach(() => {
                const USLocale = {
                    'decimal': '.',
                    'thousands': ',',
                    'grouping': [3],
                    'currency': ['$', '']
                };

                locale.setDefaultLocale(USLocale);
            });

            describe('when a valid locale definition is given', () => {

                it('should return an object', () => {
                    const validLocaleDefinition = {
                        'decimal': '.',
                        'thousands': ',',
                        'grouping': [
                            3
                        ],
                        'currency': [
                            '$',
                            ''
                        ]
                    };
                    const expected = 'object';
                    const actual = typeof locale.setDefaultLocale(validLocaleDefinition);

                    expect(actual).toEqual(expected);
                });

                it('should return an object with a format function', () => {
                    const validLocaleDefinition = {
                        'decimal': '.',
                        'thousands': ',',
                        'grouping': [
                            3
                        ],
                        'currency': [
                            '$',
                            ''
                        ]
                    };
                    const expected = 'function';
                    const actual = typeof locale.setDefaultLocale(validLocaleDefinition).format;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when an invalid locale definition is given', () => {

                it('should throw an error', () => {
                    const invalidLocaleDefinition = {};
                    const expected = new Error('Please pass in a valid locale object definition');

                    expect(
                        () => locale.setDefaultLocale(invalidLocaleDefinition)
                    ).toThrow(expected);
                });
            });
        });
    });
});
