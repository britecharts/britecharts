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
// declaration cannot say so, which forces a cast here.
type ExportContext = {
    width(): number;
    height(): number;
    margin(): { left?: number };
};

const aDonutTestDataSet = () => new DonutDataBuilder();

const context = (margin: { left?: number } = { left: 0 }): ExportContext => ({
    width: () => 200,
    height: () => 100,
    margin: () => margin,
});

const decodeImageSource = (source: string) =>
    new TextDecoder().decode(
        Uint8Array.from(atob(source.split(',')[1]), (character) =>
            character.charCodeAt(0)
        )
    );

describe('export Helper', () => {
    // Inferred from the legend module rather than annotated: importing it
    // directly (not the typings barrel) gives its own type, and naming a type
    // here would only disagree with it.
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

    describe('exportChart', () => {
        let clicked: HTMLAnchorElement[];

        beforeEach(() => {
            clicked = [];
            vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(
                function (this: HTMLAnchorElement) {
                    clicked.push(this);
                }
            );
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });

        describe('when the filename ends in .svg', () => {
            it('should download the chart as an svg file', async () => {
                const svg = select<SVGSVGElement, unknown>(
                    '.test-container svg'
                );

                await exportChart.exportChart.call(context(), svg, 'chart.svg');

                expect(clicked).toHaveLength(1);
                expect(clicked[0].download).toBe('chart.svg');
                expect(clicked[0].href).toMatch(
                    /^data:image\/svg\+xml;charset=utf-8,/
                );
            });

            it('should start the file with the XML declaration, then the svg', async () => {
                const svg = select<SVGSVGElement, unknown>(
                    '.test-container svg'
                );

                await exportChart.exportChart.call(context(), svg, 'chart.svg');

                const file = decodeURIComponent(
                    clicked[0].href.split(',').slice(1).join(',')
                );

                expect(file).toMatch(
                    /^<\?xml version="1\.0" encoding="UTF-8"\?>\n<svg/
                );
                expect(file).toContain('xmlns="http://www.w3.org/2000/svg"');
            });

            it('should add the title', async () => {
                const svg = select<SVGSVGElement, unknown>(
                    '.test-container svg'
                );

                await exportChart.exportChart.call(
                    context(),
                    svg,
                    'chart.svg',
                    'Visits by source'
                );

                expect(decodeURIComponent(clicked[0].href)).toContain(
                    'Visits by source'
                );
            });

            it('should read the extension whatever its case', async () => {
                const svg = select<SVGSVGElement, unknown>(
                    '.test-container svg'
                );

                await exportChart.exportChart.call(context(), svg, 'CHART.SVG');

                expect(clicked[0].href).toMatch(/^data:image\/svg\+xml/);
            });
        });

        describe('when given a title', () => {
            const exportedFile = async (title?: string) => {
                const svg = select<SVGSVGElement, unknown>(
                    '.test-container svg'
                );

                await exportChart.exportChart.call(
                    context(),
                    svg,
                    'chart.svg',
                    title
                );

                return decodeURIComponent(
                    clicked[clicked.length - 1].href
                        .split(',')
                        .slice(1)
                        .join(',')
                );
            };
            const parse = (file: string) =>
                new DOMParser().parseFromString(
                    file.replace(/^<\?xml[^>]*>\n/, ''),
                    'image/svg+xml'
                );

            it('should escape it, so the file stays valid XML', async () => {
                const doc = parse(await exportedFile('Q1 & Q2 <draft>'));

                expect(doc.querySelector('parsererror')).toBeNull();
                expect(doc.querySelector('svg > text')?.textContent).toBe(
                    'Q1 & Q2 <draft>'
                );
            });

            it('should grow the svg by a band for the title', async () => {
                const untitled = parse(await exportedFile()).documentElement;
                const titled = parse(
                    await exportedFile('Visits')
                ).documentElement;
                const heightOf = (svg: Element) =>
                    Number(svg.getAttribute('viewBox')?.split(/[\s,]+/)[3]);

                expect(heightOf(titled)).toBe(heightOf(untitled) + 30);
            });

            it('should set it in the charts font, Helvetica Neue first', async () => {
                const doc = parse(await exportedFile('Visits'));
                const fontFamily = doc
                    .querySelector('svg > text')
                    ?.getAttribute('font-family');

                expect(fontFamily?.split(',')[0]).toBe('Helvetica Neue');
            });

            it('should move the chart below the title', async () => {
                const doc = parse(await exportedFile('Visits'));
                const chart = doc.querySelector('svg > g:last-child');

                expect(chart?.getAttribute('transform')).toBe(
                    'translate(0, 30)'
                );
            });
        });

        describe('when the filename does not end in .svg', () => {
            const pngData = 'data:image/png;base64,iVBORw0KGgo=';
            const chartSvg = () =>
                select<SVGSVGElement, unknown>('.test-container svg');
            // jsdom never loads an image, so the event its src would fire in a
            // browser is fired by hand. The listeners are attached before src
            // is set, so firing it from the setter reaches them.
            const stubImageOutcome = (outcome: 'load' | 'error') => {
                const sources: string[] = [];

                vi.spyOn(
                    HTMLImageElement.prototype,
                    'src',
                    'set'
                ).mockImplementation(function (
                    this: HTMLImageElement,
                    source: string
                ) {
                    sources.push(source);
                    this.dispatchEvent(new Event(outcome));
                });

                return sources;
            };
            const stubCanvasOutput = () => {
                const canvases: HTMLCanvasElement[] = [];
                const toDataURLSpy = vi
                    .spyOn(HTMLCanvasElement.prototype, 'toDataURL')
                    .mockImplementation(function (this: HTMLCanvasElement) {
                        canvases.push(this);

                        return pngData;
                    });

                return { canvases, toDataURLSpy };
            };

            it('should go through an image, for a png, and download nothing yet', () => {
                const svg = select<SVGSVGElement, unknown>(
                    '.test-container svg'
                );

                const result = exportChart.exportChart.call(
                    context(),
                    svg,
                    'chart.png'
                );

                expect(result).toBeInstanceOf(Promise);
                expect(clicked).toHaveLength(0);
            });

            describe('when the image loads', () => {
                it('should download the canvas as a png under that filename', async () => {
                    stubImageOutcome('load');
                    const { toDataURLSpy } = stubCanvasOutput();
                    const expected = {
                        count: 1,
                        download: 'chart.png',
                        href: pngData,
                        mimeType: 'image/png',
                    };

                    await exportChart.exportChart.call(
                        context(),
                        chartSvg(),
                        'chart.png'
                    );
                    const actual = {
                        count: clicked.length,
                        download: clicked[0].download,
                        href: clicked[0].href,
                        mimeType: toDataURLSpy.mock.calls[0][0],
                    };

                    expect(actual).toEqual(expected);
                });

                it('should call the file britechart.png when given no filename', async () => {
                    stubImageOutcome('load');
                    stubCanvasOutput();
                    const expected = 'britechart.png';

                    await exportChart.exportChart.call(context(), chartSvg());
                    const actual = clicked[0].download;

                    expect(actual).toEqual(expected);
                });

                it('should remove the download link from the page', async () => {
                    stubImageOutcome('load');
                    stubCanvasOutput();
                    const expected = 0;

                    await exportChart.exportChart.call(
                        context(),
                        chartSvg(),
                        'chart.png'
                    );
                    const actual =
                        document.querySelectorAll('a[download]').length;

                    expect(actual).toEqual(expected);
                });

                it('should draw the image on a canvas the size of the chart', async () => {
                    stubImageOutcome('load');
                    const { canvases } = stubCanvasOutput();
                    const expected = { width: 200, height: 100 };

                    await exportChart.exportChart.call(
                        context(),
                        chartSvg(),
                        'chart.png'
                    );
                    const [canvas] = canvases;
                    const actual = {
                        width: canvas.width,
                        height: canvas.height,
                    };

                    expect(actual).toEqual(expected);
                    expect(
                        canvas.getContext('2d')!.drawImage
                    ).toHaveBeenCalledTimes(1);
                });

                it('should make the canvas taller by the title band when given a title', async () => {
                    stubImageOutcome('load');
                    const { canvases } = stubCanvasOutput();
                    const expected = 130;

                    await exportChart.exportChart.call(
                        context(),
                        chartSvg(),
                        'chart.png',
                        'Visits'
                    );
                    const actual = canvases[0].height;

                    expect(actual).toEqual(expected);
                });

                it('should render the title into the image', async () => {
                    const sources = stubImageOutcome('load');

                    stubCanvasOutput();
                    const expected = '>HIPERTENSIÓN 日本語</text>';

                    await exportChart.exportChart.call(
                        context(),
                        chartSvg(),
                        'chart.png',
                        'HIPERTENSIÓN 日本語'
                    );
                    const actual = decodeImageSource(sources[0]);

                    expect(actual).toContain(expected);
                });
            });

            describe('when the image fails to load', () => {
                it('should reject and download nothing', async () => {
                    stubImageOutcome('error');
                    stubCanvasOutput();
                    const expected = 0;

                    await expect(
                        exportChart.exportChart.call(
                            context(),
                            chartSvg(),
                            'chart.png'
                        )
                    ).rejects.toBeInstanceOf(Event);
                    const actual = clicked.length;

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('when the browser is Internet Explorer', () => {
            type NavigatorInIE = Navigator & { msSaveOrOpenBlob?: () => void };

            beforeEach(() => {
                (navigator as NavigatorInIE).msSaveOrOpenBlob = vi.fn();
                // Read once, when the module loads, so it needs a fresh copy
                vi.resetModules();
            });

            afterEach(() => {
                delete (navigator as NavigatorInIE).msSaveOrOpenBlob;
            });

            it('should explain the limitation, return false and download nothing', async () => {
                const errorSpy = vi
                    .spyOn(console, 'error')
                    .mockImplementation(() => {});
                const { default: freshExport } = await import('./export');
                const expected = {
                    result: false,
                    clicks: 0,
                    logged: 1,
                };

                const result = freshExport.exportChart.call(
                    context(),
                    select<SVGSVGElement, unknown>('.test-container svg'),
                    'chart.svg'
                );
                const actual = {
                    result,
                    clicks: clicked.length,
                    logged: errorSpy.mock.calls.length,
                };

                expect(actual).toEqual(expected);
                expect(errorSpy.mock.calls[0][0]).toContain(
                    'not available for IE'
                );
            });
        });
    });

    describe('convertSvgToHtml', () => {
        const toHtml = (title?: string, margin?: { left?: number }) =>
            exportChart.convertSvgToHtml.call(
                context(margin),
                select('.test-container svg'),
                title
            )!;
        // jsdom has no cascade to resolve a var() through, so the resolved
        // colours a browser would give back are stubbed per theme token.
        const stubThemeColors = (colors: Record<string, string>) => {
            const getComputedStyle = window.getComputedStyle.bind(window);

            vi.spyOn(window, 'getComputedStyle').mockImplementation(
                (element, pseudoElement) => {
                    const token = Object.keys(colors).find((name) =>
                        (element as SVGElement).style
                            ?.getPropertyValue('fill')
                            .includes(name)
                    );

                    return token
                        ? ({ fill: colors[token] } as CSSStyleDeclaration)
                        : getComputedStyle(element, pseudoElement);
                }
            );
        };

        afterEach(() => {
            vi.restoreAllMocks();
        });

        describe('when given no selection', () => {
            it('should return undefined', () => {
                const expected = undefined;
                const actual = exportChart.convertSvgToHtml.call(
                    context(),
                    null
                );

                expect(actual).toEqual(expected);
            });
        });

        describe('when the theme colours can not be resolved', () => {
            it('should fall back to a white background', () => {
                const expected = '<style>svg{background:white;}</style>';
                const actual = toHtml();

                expect(actual).toContain(expected);
            });
        });

        describe('when a theme colour resolves to none', () => {
            it('should fall back to a white background', () => {
                stubThemeColors({ '--bc-background': 'none' });
                const expected = '<style>svg{background:white;}</style>';
                const actual = toHtml();

                expect(actual).toContain(expected);
            });
        });

        describe('when the theme colours resolve', () => {
            it('should carry the background in the exported markup', () => {
                stubThemeColors({ '--bc-background': 'rgb(18, 18, 20)' });
                const expected = '<style>svg{background:rgb(18, 18, 20);}';
                const actual = toHtml();

                expect(actual).toContain(expected);
            });

            it('should set the title in the resolved muted text colour', () => {
                stubThemeColors({ '--bc-text-muted': 'rgb(200, 201, 202)' });
                const expected = 'fill="rgb(200, 201, 202)">Visits</text>';
                const actual = toHtml('Visits');

                expect(actual).toContain(expected);
            });
        });

        it('should leave nothing behind in the chart after reading its colours', () => {
            const svgNode = document.querySelector('.test-container svg')!;
            const expected = svgNode.childElementCount;

            toHtml('Visits');
            const actual = svgNode.childElementCount;

            expect(actual).toEqual(expected);
        });

        describe('when the chart has a left margin', () => {
            it('should line the title up with it', () => {
                const expected = '<text x="40" y="20"';
                const actual = toHtml('Visits', { left: 40 });

                expect(actual).toContain(expected);
            });
        });

        describe('when the margin has no left value', () => {
            it('should start the title at the left edge', () => {
                const expected = '<text x="0" y="20"';
                const actual = toHtml('Visits', {});

                expect(actual).toContain(expected);
            });
        });

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
            // still comes back, which is all this asserts.
            // @ts-expect-error loadImage takes the svg html
            expect(exportChart.loadImage()).toBeInstanceOf(Promise);
        });
    });

    describe('createImage', () => {
        const expectedMarkup = '<svg><text>日本語 – Ó</text></svg>';

        it('should point at the svg as a base64 data url, unicode included', () => {
            const expected = expectedMarkup;
            const { src } = exportChart.createImage(expectedMarkup);
            const actual = decodeImageSource(src);

            expect(src).toMatch(/^data:image\/svg\+xml;base64,/);
            expect(actual).toEqual(expected);
        });

        describe('when btoa is not available', () => {
            beforeEach(() => {
                vi.resetModules();
            });

            afterEach(() => {
                vi.unstubAllGlobals();
            });

            it('should encode the same with the bundled encoder', async () => {
                vi.stubGlobal('btoa', undefined);
                const { default: freshExport } = await import('./export');
                const expected = expectedMarkup;
                const actual = decodeImageSource(
                    freshExport.createImage(expectedMarkup).src
                );

                expect(actual).toEqual(expected);
            });
        });

        describe('when there is no window', () => {
            beforeEach(() => {
                vi.resetModules();
            });

            afterEach(() => {
                vi.unstubAllGlobals();
            });

            it('should encode the same with the bundled encoder', async () => {
                vi.stubGlobal('window', undefined);
                const { default: freshExport } = await import('./export');
                const expected = expectedMarkup;
                const actual = decodeImageSource(
                    freshExport.createImage(expectedMarkup).src
                );

                expect(actual).toEqual(expected);
            });
        });

        describe('when callback is passed', () => {
            it('should be called at least once with one arg', () => {
                const callbackSpy = vi.fn();
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
