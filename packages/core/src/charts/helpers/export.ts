import base64 from 'base-64';
import type { BaseType, Selection } from 'd3-selection';

import { colorSchemas } from './color';
import serializeWithStyles from './style';
import type { ChartMarginParams } from '../../typings/common/margin';

/**
 * What these functions need `this` to be: a chart instance, called as
 * `exportChart.call(chart, ...)` from each chart's own `exportChart` accessor.
 *
 * Declared structurally here rather than reusing core's chart types, because
 * those cannot express it yet: every accessor is typed
 * `width(width?: number): T & ChartBaseAPI<T>`, so under them `this.width()`
 * is the chart, not a number. That getter gap is recorded in the migration
 * plan as core's to resolve; this contract describes what the code actually
 * receives at runtime.
 */
type ExportableChartContext = {
    width(): number;
    height(): number;
    margin(): ChartMarginParams;
};

/**
 * The d3 selection wrapping the chart's svg.
 *
 * The element is `any` here, which is the one place in core where that is the
 * right answer rather than a shortcut. This type named `BaseType` until the
 * heatmap became the first converted chart to call `exportChart`, holding a
 * `Selection<SVGSVGElement, ...>`: `Selection` is invariant in its element, so
 * that is not assignable to a `Selection<BaseType, ...>` parameter -- the same
 * trap as `ChartContainer` in Phase 1, found this time by a caller rather than
 * by a probe.
 *
 * `filter.ts`'s answer, a generic parameter per function, does not work here.
 * Both of these are reached through `exportChart.call(chart, svg, ...)`,
 * because they need `this` to be the chart, and inference through
 * `Function.prototype.call` instantiates the parameter rather than inferring
 * it -- it comes out as `BaseType` again. Nothing in this file depends on the
 * element: the svg is serialized via `.node()` and `.attr()` and never
 * returned, so there is no type for a caller to get back wrong.
 */
type SvgSelection = Selection<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
>;

const isBrowser = typeof window !== 'undefined';
// `msSaveOrOpenBlob` is IE-only and not in the DOM typings. The cast is the
// feature detection, not a claim that it exists.
const isIE = (navigator as Navigator & { msSaveOrOpenBlob?: unknown })
    .msSaveOrOpenBlob;
const IE_ERROR_MSG =
    'Sorry, this feature is not available for IE. If you require this to work, check this issue https://github.com/eventbrite/britecharts/pull/652';
const DEFAULT_FONT_STACK = '‘Helvetica Neue’, Helvetica, Arial, sans-serif';

let encoder: (input: string) => string = isBrowser
    ? window.btoa
    : base64.encode;

if (!encoder) {
    encoder = base64.encode;
}

// Base64 doesn't work really well with Unicode strings, so we need to use this function
// Ref: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
const b64EncodeUnicode = (str: string): string => {
    return encoder(
        encodeURIComponent(str).replace(
            /%([0-9A-F]{2})/g,
            function (match, p1) {
                // `Number` where this passed the string '0x41' straight to
                // fromCharCode and let it coerce. Same result -- ToNumber reads
                // the hex prefix either way -- spelled so it types.
                return String.fromCharCode(Number('0x' + p1));
            }
        )
    );
};

const config = {
    styleClass: 'britechartStyle',
    defaultFilename: 'britechart.png',
    chartBackground: 'white',
    imageSourceBase: 'data:image/svg+xml;base64,',
    titleFontSize: '15px',
    // eslint-disable-next-line quotes
    titleFontFamily: DEFAULT_FONT_STACK,
    titleTopOffset: 15,
    get styleBackgroundString() {
        return `<style>svg{background:${this.chartBackground};}</style>`;
    },
};

/**
 * Main function to be used as a method by chart instances to export charts to png
 * @param  d3svg     The chart's svg selection
 * @param  filename  download to be called <filename>.png
 * @param  title     Title for the image
 * @private
 */
export function exportChart(
    this: ExportableChartContext,
    d3svg: SvgSelection,
    filename?: string,
    title?: string
): Promise<void> | false {
    if (isIE) {
        // eslint-disable-next-line no-console
        console.error(IE_ERROR_MSG);

        return false;
    }

    return loadImage(convertSvgToHtml.call(this, d3svg, title) as string)
        .then((img) => {
            return {
                canvas: createCanvas(this.width(), this.height()),
                img,
            };
        })
        .then(({ canvas, img }) => handleImageLoad.call(img, canvas, filename));
}

/**
 * adds background styles to raw html
 * @param html raw html
 * @private
 */
function addBackground(html: string): string {
    return html.replace('>', `>${config.styleBackgroundString}`);
}

/**
 * Takes the D3 SVG element, adds proper SVG tags, adds inline styles
 * from stylesheets, adds white background and returns string
 * @param  d3svg  d3 svg selection
 * @return String of passed d3, or undefined when given no selection
 * @private
 */
export function convertSvgToHtml(
    this: ExportableChartContext,
    d3svg: SvgSelection | null | undefined,
    title?: string
): string | undefined {
    if (!d3svg) {
        return;
    }

    d3svg.attr('version', 1.1).attr('xmlns', 'http://www.w3.org/2000/svg');
    const serializer = serializeWithStyles.initializeSerializer();
    let html = serializer(d3svg.node() as Element) as string;

    html = formatHtmlByBrowser(html);
    html = prependTitle.call(
        this,
        html,
        title,
        parseInt(d3svg.attr('width'), 10)
    );
    html = addBackground(html);

    return html;
}

/**
 * Create Canvas
 * @private
 */
function createCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');

    canvas.height = height;
    canvas.width = width;

    return canvas;
}

/**
 * Create Image
 * @param  svgHtml   string representation of svg el
 * @param  callback  function to prepare image for loading
 * @return element <img>, src points at svg
 * @private
 */
function createImage(
    svgHtml: string,
    callback?: (img: HTMLImageElement) => void
): HTMLImageElement {
    const img = new Image();

    if (callback) {
        if (typeof callback !== 'function') {
            throw new Error(
                `The callback provided should be a function, we got a ${typeof callback} instead.`
            );
        }
        callback(img);
    }
    img.src = `${config.imageSourceBase}${b64EncodeUnicode(svgHtml)}`;

    return img;
}

/**
 * Draws image on canvas
 * @private
 */
export function drawImageOnCanvas(
    image: CanvasImageSource,
    canvas: HTMLCanvasElement
): HTMLCanvasElement {
    // Asserted, not guarded: a null context already threw on the next call.
    canvas.getContext('2d')!.drawImage(image, 0, 0);

    return canvas;
}

/**
 * Triggers browser to download image, convert canvas to url,
 * we need to append the link el to the dom before clicking it for Firefox to register
 * point <a> at it and trigger click
 * @private
 */
function downloadCanvas(
    canvas: HTMLCanvasElement,
    filename: string = config.defaultFilename,
    extensionType: string = 'image/png'
): void {
    const url = canvas.toDataURL(extensionType);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Some browsers need special formatting, we handle that here
 * @private
 */
function formatHtmlByBrowser(html: string): string {
    if (navigator.userAgent.search('FireFox') > -1) {
        return html.replace(
            /url.*&quot;\)/,
            'url(&quot;linearGradient[id*="-gradient-"]&quot;);'
        );
    }

    return html;
}

/**
 * Handles on load event fired by img.onload, this=img
 * @private
 */
function handleImageLoad(
    this: HTMLImageElement,
    canvas: HTMLCanvasElement,
    filename?: string
): void {
    downloadCanvas(drawImageOnCanvas(this, canvas), filename);
}

/**
 * Create Image instance and attach event listeners for future promise
 * @param  svgHtml  string representation of svg el
 * @returns promise that exposes loaded image instance
 * @private
 */
function loadImage(svgHtml: string): Promise<HTMLImageElement> {
    return new Promise((res, rej) => {
        createImage(svgHtml, (img) => {
            img.addEventListener('load', () => res(img));
            img.addEventListener('error', (err) => rej(err));
        });
    });
}

/**
 * if passed, append title to the raw html to appear on graph
 * @param  html      raw html string
 * @param  title     title of the graph
 * @param  svgWidth  width of graph container
 * @return raw html with title prepended
 * @private
 */
function prependTitle(
    this: ExportableChartContext,
    html: string,
    title: string | undefined,
    svgWidth: number
): string {
    if (!title || !svgWidth) {
        return html;
    }
    const { grey } = colorSchemas;

    html = html.replace(
        /<g/,
        `<text x="${this.margin().left}" y="${
            config.titleTopOffset
        }" font-family="${config.titleFontFamily}" font-size="${
            config.titleFontSize
        }" fill="${grey[6]}"> ${title} </text><g `
    );

    return html;
}

export default {
    exportChart,
    convertSvgToHtml,
    createImage,
    drawImageOnCanvas,
    loadImage,
};
