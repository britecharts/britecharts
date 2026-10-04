// d3-selection rather than the monolithic `d3`, as elsewhere in core.
import { select } from 'd3-selection';
import type { Selection } from 'd3-selection';

import legend from '../legend/legend';
import { DonutDataBuilder } from '../donut/donutChartDataBuilder';
import exportChart from './export';

// What export.ts needs `this` to be. The published `LegendModule` cannot
// satisfy it, because core types every accessor as
// `width(width?: number): T & ...` -- so `width()` reads as the chart rather
// than a number. The chart really does return numbers at runtime; the
// declaration cannot say so yet. Recorded in the migration plan as core's
// getter-typing gap, and this is the first place it forces a cast.
type ExportContext = {
    width(): number;
    height(): number;
    margin(): { left?: number };
};

const aDonutTestDataSet = () => new DonutDataBuilder();

describe('export Helper', () => {
    // Inferred from legend.js rather than annotated: importing the module
    // directly (not the typings barrel) gives whatever TS reads off the
    // JavaScript, and naming a type here would only disagree with it.
    let legendChart: ReturnType<typeof legend>;
    let dataset: ReturnType<DonutDataBuilder['build']>;
    let containerFixture: Selection<HTMLElement, unknown, HTMLElement, unknown>;
    const regularHTML =
        '<svg class="britechart britechart-legend" width="200" version="1.1" xmlns="http://www.w3.org/2000/svg"><style>svg{background:white;}</style><text x="0" y="30" font-family="Karla, sans-serif" font-size="15px" fill="#45494E"> test title </text><g  class="legend-container-group" transform="translate(0,0)"><g class="legend-group"><g class="legend-line" data-item="1" transform="translate(26,25.714285714285715)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(106, 237, 199); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 30px; perspective-origin: 15px 7px;">Shiny</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">86.0000</text></g><g class="legend-line" data-item="2" transform="translate(26,51.42857142857143)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(57, 194, 201); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 40.3125px; perspective-origin: 20.1562px 7px;">Blazing</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">300.000</text></g><g class="legend-line" data-item="3" transform="translate(26,77.14285714285714)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(255, 206, 0); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 46.8125px; perspective-origin: 23.4062px 7px;">Dazzling</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">276.000</text></g><g class="legend-line" data-item="4" transform="translate(26,102.85714285714286)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(255, 167, 26); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 40.3281px; perspective-origin: 20.1562px 7px;">Radiant</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">195.000</text></g><g class="legend-line" data-item="5" transform="translate(26,128.57142857142858)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(248, 102, 185); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 50.6562px; perspective-origin: 25.3281px 7px;">Sparkling</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">36.0000</text></g><g class="legend-line" data-item="0" transform="translate(26,154.28571428571428)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(153, 140, 227); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 29.3438px; perspective-origin: 14.6719px 7px;">Other</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">814.000</text></g></g></g></svg>';
    const specialHTML =
        '<svg class="britechart britechart-legend" width="200" version="1.1" xmlns="http://www.w3.org/2000/svg"><style>svg{background:white;}</style><text x="0" y="30" font-family="Karla, sans-serif" font-size="15px" fill="#45494E"> XXIV CONGRESO ARGENTINO DE HIPERTENSIÓN ARTERIAL </text><g  class="legend-container-group" transform="translate(0,0)"><g class="legend-group"><g class="legend-line" data-item="1" transform="translate(26,25.714285714285715)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(106, 237, 199); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 30px; perspective-origin: 15px 7px;">Shiny</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">86.0000</text></g><g class="legend-line" data-item="2" transform="translate(26,51.42857142857143)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(57, 194, 201); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 40.3125px; perspective-origin: 20.1562px 7px;">Blazing</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">300.000</text></g><g class="legend-line" data-item="3" transform="translate(26,77.14285714285714)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(255, 206, 0); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 46.8125px; perspective-origin: 23.4062px 7px;">Dazzling</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">276.000</text></g><g class="legend-line" data-item="4" transform="translate(26,102.85714285714286)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(255, 167, 26); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 40.3281px; perspective-origin: 20.1562px 7px;">Radiant</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">195.000</text></g><g class="legend-line" data-item="5" transform="translate(26,128.57142857142858)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(248, 102, 185); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 50.6562px; perspective-origin: 25.3281px 7px;">Sparkling</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">36.0000</text></g><g class="legend-line" data-item="0" transform="translate(26,154.28571428571428)"><circle class="legend-circle" cx="0" cy="-5" r="8" style="fill: rgb(153, 140, 227); stroke-width: 1; cy: -5px; r: 8px;"></circle><text class="legend-entry-name" x="28" style="font-size: 12px; letter-spacing: 0.5px; display: block; height: 14px; white-space: nowrap; width: 29.3438px; perspective-origin: 14.6719px 7px;">Other</text><text class="legend-entry-value" x="280" style="font-size: 12px; letter-spacing: 0.8px; text-anchor: end; display: block; height: 14px; white-space: nowrap; width: 43.8125px; perspective-origin: 21.9062px 7px;">814.000</text></g></g></g></svg>';

    beforeEach(() => {
        const fixture =
            '<div id="fixture"><div class="test-container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);

        dataset = aDonutTestDataSet().withFivePlusOther().build();
        legendChart = legend();

        containerFixture = select('.test-container');
        containerFixture.datum(dataset).call(legendChart);
        select('.test-container svg').attr('width', 200);
    });

    // remove the html fixture from the DOM
    afterEach(() => {
        const fixture = document.getElementById('fixture');

        // Asserted rather than passed straight through: if beforeEach ever
        // stops inserting it, the failure should say so.
        if (!fixture) {
            throw new Error('the fixture was not inserted');
        }

        document.body.removeChild(fixture);
    });

    describe.skip('convertSvgToHtml', () => {
        describe('when the title is regular text', () => {
            it('should add the title to the chart html', () => {
                const expected = 1;
                const testTitle = 'test title';
                const actual = exportChart.convertSvgToHtml
                    .call(
                        legendChart as unknown as ExportContext,
                        select('.test-container svg'),
                        testTitle
                    )!
                    .match(testTitle)!.length;

                expect(actual).toEqual(expected);
            });
        });

        describe('when the title has special characters', () => {
            it('should add the title to the chart html', () => {
                const expected = 1;
                const testTitle =
                    'XXIV CONGRESO ARGENTINO DE HIPERTENSIÓN ARTERIAL';
                const actual = exportChart.convertSvgToHtml
                    .call(
                        legendChart as unknown as ExportContext,
                        select('.test-container svg'),
                        testTitle
                    )!
                    .match(testTitle)!.length;

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('loadImage', () => {
        it('should return a promise', () => {
            // Called with no argument, which the signature does not allow.
            // At runtime the html becomes the string 'undefined' and a promise
            // still comes back, which is all this asserts. Kept as it was.
            // @ts-expect-error loadImage takes the svg html
            expect(exportChart.loadImage()).toBeInstanceOf(Promise);
        });
    });

    describe('createImage', () => {
        describe('when callback is passed', () => {
            it('should be called at least once with one arg', () => {
                const callbackSpy = jest.fn();
                const expectedCalls = 1;
                const expectedArgumentsCount = 1;

                exportChart.createImage(regularHTML, callbackSpy);
                const actualCalls = callbackSpy.mock.calls.length;
                const actualArgumentsCount = callbackSpy.mock.calls[0].length;

                expect(actualCalls).toEqual(expectedCalls);
                expect(actualArgumentsCount).toEqual(expectedArgumentsCount);
            });

            it('should throw an error if callback is not a function', () => {
                const notAFunc = 'something';
                const expected = `The callback provided should be a function, we got a ${typeof notAFunc} instead.`;

                expect(() =>
                    // @ts-expect-error the point of the test is a non-function
                    exportChart.createImage(regularHTML, notAFunc)
                ).toThrow(new Error(expected));
            });
        });

        describe('when the title is regular text', () => {
            it('should produce an image tag', () => {
                const expected = 'IMG';
                const actual = exportChart.createImage(regularHTML).tagName;

                expect(actual).toEqual(expected);
            });

            it('should produce a canvas tag when using it with drawImageOnCanvas', () => {
                const expected = 'CANVAS';
                const image = exportChart.createImage(regularHTML);
                const actual = exportChart.drawImageOnCanvas(
                    image,
                    document.createElement('canvas')
                ).tagName;

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
                const expected = 'CANVAS';
                const image = exportChart.createImage(specialHTML);
                const actual = exportChart.drawImageOnCanvas(
                    image,
                    document.createElement('canvas')
                ).tagName;

                expect(actual).toEqual(expected);
            });
        });
    });
});
