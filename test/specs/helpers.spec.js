define([
    'underscore',
    'jquery',
    'd3',
    'legend',
    'donutChartDataBuilder',
    'lineChartDataBuilder',
    'helpers/serializeWithStyles',
    'helpers/text',
    'helpers/common',
    'helpers/exportChart',
    'helpers/timeAxis'
    ], function (
        _,
        $,
        d3,
        legend,
        donutDataBuilder,
        lineDataBuilder,
        serializeWithStyles,
        textHelper,
        common,
        exportChart,
        timeAxis
    ) {
    'use strict';

    let f, containerFixture, styles, node,
        randomColor = 'rgb(222,163,12)';

    function aDonutTestDataSet() {
        return new donutDataBuilder.DonutDataBuilder();
    }

    function aLineTestDataSet() {
        return new lineDataBuilder.LineDataBuilder();
    }

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

        describe('serializeWithStyles', () => {
            let styledHTML;

            beforeEach(() => {
                containerFixture.append($('<span></span>',{class:'child'}));

                this.serializer = serializeWithStyles.initializeSerializer();
                styles = document.createElement('style');
                styles.innerHTML = `.child{background:${randomColor};}`;
                document.body.appendChild(styles);
            });

            afterEach(() => {
                this.serializer = null;
                document.body.removeChild(styles);
            });

            it('Should expect serializer to be defined', () => {
                expect(this.serializer).toBeDefined();
            });

            it('should add styles from stylesheets to inline of element', () => {
                node = containerFixture[0];

                styledHTML = this.serializer(node).replace(' ','');

                expect(styledHTML).not.toBe(node.outerHTML.replace(' ',''));
                expect(styledHTML.indexOf(randomColor).length).not.toBe(0);
            });
        });

        // TODO: Let's get to this tests later
        xdescribe('text wrapper', () => {

            it('should wrap the text in X lines', () => {
                let text = 'brilliant dazzling flashing',
                    fontSize = 20,
                    availableWidth = 20,
                    expected = 3;

                d3.select('.test-container')
                  .append('text')
                    .attr('dy', '.2em')
                    .text(text);

                textHelper.wrapText.call(null, fontSize, availableWidth, d3.selectAll('.test-container text').node());

                expect(d3.selectAll('.test-container value').size()).toEqual(1);
                expect(d3.selectAll('.test-container label').size()).toEqual(expected);
            });
        });

        describe('common', () => {

            it('should return true if its an integer', () => {
                expect(common.isInteger(3)).toEqual(true);
            });

            it('should return false passed a non integer', () => {
                expect(common.isInteger(3.2)).toEqual(false);
            });

            it('should calculate percent from value and total', () => {
                expect(common.calculatePercent(10, 100, '.1f')).toEqual('10.0');
            });

            it('should return specified number of decimal places', () => {
                expect(common.calculatePercent(20, 100, '.2f')).toEqual('20.00');
            });

            it('should return difference between dates', () => {
                expect(common.diffDays('Thu Oct 05 2017', 'Thu Oct 04 2017')).toEqual(1);
            });

            it('should add a number of days to a date', () => {
                expect(common.addDays('Thu Oct 05 2017', 1).slice(0, 15)).toEqual('Fri Oct 06 2017');
            });
        });

        describe('export chart', () => {
            let legendChart, dataset, containerFixture, f;
            const regularHTML = '<svg class="britechart britechart-legend" width="200" version="1.1" xmlns="http://www.w3.org/2000/svg"><style>svg{background:white;}</style><text x="0" y="30" font-family="Benton Sans, sans-serif" font-size="15px" fill="#45494E"> test title </text><g  class="legend-container-group" transform="translate(0,0)"><g class="legend-group"><g class="legend-line" data-item="1" transform="translate(26,25.714285714285715)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(106, 237, 199); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 30px; perspective-origin: 15px 7px;">Shiny</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">86.0000</text></g><g class="legend-line" data-item="2" transform="translate(26,51.42857142857143)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(57, 194, 201); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 40.3125px; perspective-origin: 20.1562px 7px;">Blazing</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">300.000</text></g><g class="legend-line" data-item="3" transform="translate(26,77.14285714285714)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(255, 206, 0); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 46.8125px; perspective-origin: 23.4062px 7px;">Dazzling</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">276.000</text></g><g class="legend-line" data-item="4" transform="translate(26,102.85714285714286)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(255, 167, 26); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 40.3281px; perspective-origin: 20.1562px 7px;">Radiant</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">195.000</text></g><g class="legend-line" data-item="5" transform="translate(26,128.57142857142858)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(248, 102, 185); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 50.6562px; perspective-origin: 25.3281px 7px;">Sparkling</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">36.0000</text></g><g class="legend-line" data-item="0" transform="translate(26,154.28571428571428)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(153, 140, 227); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 29.3438px; perspective-origin: 14.6719px 7px;">Other</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">814.000</text></g></g></g></svg>';
            const specialHTML = '<svg class="britechart britechart-legend" width="200" version="1.1" xmlns="http://www.w3.org/2000/svg"><style>svg{background:white;}</style><text x="0" y="30" font-family="Benton Sans, sans-serif" font-size="15px" fill="#45494E"> XXIV CONGRESO ARGENTINO DE HIPERTENSIÓN ARTERIAL </text><g  class="legend-container-group" transform="translate(0,0)"><g class="legend-group"><g class="legend-line" data-item="1" transform="translate(26,25.714285714285715)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(106, 237, 199); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 30px; perspective-origin: 15px 7px;">Shiny</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">86.0000</text></g><g class="legend-line" data-item="2" transform="translate(26,51.42857142857143)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(57, 194, 201); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 40.3125px; perspective-origin: 20.1562px 7px;">Blazing</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">300.000</text></g><g class="legend-line" data-item="3" transform="translate(26,77.14285714285714)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(255, 206, 0); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 46.8125px; perspective-origin: 23.4062px 7px;">Dazzling</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">276.000</text></g><g class="legend-line" data-item="4" transform="translate(26,102.85714285714286)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(255, 167, 26); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 40.3281px; perspective-origin: 20.1562px 7px;">Radiant</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">195.000</text></g><g class="legend-line" data-item="5" transform="translate(26,128.57142857142858)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(248, 102, 185); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 50.6562px; perspective-origin: 25.3281px 7px;">Sparkling</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">36.0000</text></g><g class="legend-line" data-item="0" transform="translate(26,154.28571428571428)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(153, 140, 227); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 29.3438px; perspective-origin: 14.6719px 7px;">Other</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">814.000</text></g></g></g></svg>';

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
                        let expected = 'IMG';
                        let actual = exportChart.createImage(regularHTML).tagName;

                        expect(actual).toEqual(expected);
                    });

                    it('should produce a canvas tag when using it with drawImageOnCanvas', () => {
                        let expected = 'CANVAS';
                        let image = exportChart.createImage(regularHTML);
                        let actual = exportChart.drawImageOnCanvas(image, document.createElement('canvas')).tagName;

                        expect(actual).toEqual(expected);
                    });
                });

                describe('when the title has special characters', () => {

                    it('should produce an image tag', () => {
                        let expected = 'IMG';
                        let actual = exportChart.createImage(specialHTML).tagName;

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

        describe('time axis', () => {
            let lessThanOneMonthDataSet,
                twoYearsDataSet,
                oneDayDataSet,
                minuteFormat = '%M m',
                hourFormat = '%H %p',
                dayFormat = '%e',
                dayMonthFormat = '%d %b',
                monthFormat = '%b',
                yearFormat = '%Y';

            beforeEach(() => {
                lessThanOneMonthDataSet = aLineTestDataSet().with5Topics().build();
                oneDayDataSet = aLineTestDataSet().withHourDateRange().build();
                twoYearsDataSet = aLineTestDataSet().withMultiMonthValueRange().build();
            });

            describe('when automatic setting', () => {

                describe('when timeframe is 1 day', () => {
                    let minor, major;

                    beforeEach(() => {
                        ({minor, major} = timeAxis.getXAxisSettings(oneDayDataSet.dataByDate, 300));
                    });

                    it('should give back a minor hour format and 5 ticks', () => {
                        expect(typeof minor.tick).toEqual('function');
                        expect(minor.format.toString()).toEqual(hourFormat);
                    });

                    it('should give back a major day format', () => {
                        expect(major.format.toString()).toEqual(dayMonthFormat);
                    });
                });

                describe('when timeframe is less than one month', () => {
                    let minor, major;

                    beforeEach(() => {
                        ({minor, major} = timeAxis.getXAxisSettings(lessThanOneMonthDataSet.dataByDate, 300));
                    });

                    it('should give back a minor day format and 5 ticks', () => {
                        expect(minor.tick).toEqual(5);
                        expect(minor.format.toString()).toEqual(dayFormat);
                    });

                    it('should give back a major month format', () => {
                        expect(major.format.toString()).toEqual(monthFormat);
                    });
                });

                describe('when timeframe is 2 years', () => {
                    let minor, major;

                    beforeEach(() => {
                        ({minor, major} = timeAxis.getXAxisSettings(twoYearsDataSet.dataByDate, 300));
                    });

                    it('should give back a minor month format and 5 ticks', () => {
                        expect(minor.tick).toEqual(5);
                        expect(minor.format.toString()).toEqual(monthFormat);
                    });

                    it('should give back a major year format', () => {
                        expect(major.format.toString()).toEqual(yearFormat);
                    });
                });
            });

            describe('when forced setting', () => {

                describe('when timeframe forced to minute and hour', () => {
                    let minor, major;

                    beforeEach(() => {
                        ({minor, major} = timeAxis.getXAxisSettings(oneDayDataSet.dataByDate, 300, 'minute-hour'));
                    });

                    it('should give back a minor minute format and 5 ticks', () => {
                        expect(typeof minor.tick).toEqual('function');
                        expect(minor.format.toString()).toEqual(minuteFormat);
                    });

                    it('should give back a major hour format', () => {
                        expect(major.format.toString()).toEqual(hourFormat);
                    });
                });

                describe('when timeframe forced to hour and day', () => {
                    let minor, major;

                    beforeEach(() => {
                        ({minor, major} = timeAxis.getXAxisSettings(oneDayDataSet.dataByDate, 300, 'hour-daymonth'));
                    });

                    it('should give back a minor hour format and 5 ticks', () => {
                        expect(typeof minor.tick).toEqual('function');
                        expect(minor.format.toString()).toEqual(hourFormat);
                    });

                    it('should give back a major day-month format', () => {
                        expect(major.format.toString()).toEqual(dayMonthFormat);
                    });
                });

                describe('when timeframe forced to day and month', () => {
                    let minor, major;

                    beforeEach(() => {
                        ({minor, major} = timeAxis.getXAxisSettings(oneDayDataSet.dataByDate, 300, 'day-month'));
                    });

                    it('should give back a minor day format and 5 ticks', () => {
                        expect(typeof minor.tick).toEqual('function');
                        expect(minor.format.toString()).toEqual(dayFormat);
                    });

                    it('should give back a major month format', () => {
                        expect(major.format.toString()).toEqual(monthFormat);
                    });
                });

                describe('when timeframe forced to month and year', () => {
                    let minor, major;

                    beforeEach(() => {
                        ({minor, major} = timeAxis.getXAxisSettings(oneDayDataSet.dataByDate, 300, 'month-year'));
                    });

                    it('should give back a minor day format and 5 ticks', () => {
                        expect(typeof minor.tick).toEqual('function');
                        expect(minor.format.toString()).toEqual(monthFormat);
                    });

                    it('should give back a major month format', () => {
                        expect(major.format.toString()).toEqual(yearFormat);
                    });
                });
            });
        });
    });
});
