import base64 from 'base-64';
import type { BaseType, Selection } from 'd3-selection';

import { colorSchemas } from './color.js';
import serializeWithStyles from './style.js';
import type { ChartMarginParams } from '../../typings/common/margin.js';

/**
 * What these functions need `this` to be: a chart instance, called as
 * `exportChart.call(chart, ...)` from each chart's own `exportChart` accessor.
 *
 * Declared structurally here rather than reusing core's chart types, because
 * those cannot express it: every accessor is typed
 * `width(width?: number): T & ChartBaseAPI<T>`, so under them `this.width()`
 * is the chart, not a number. This contract describes what the code actually
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
 * right answer rather than a shortcut. The charts hold a
 * `Selection<SVGSVGElement, ...>`, and `Selection` is invariant in its element,
 * so that is not assignable to a `Selection<BaseType, ...>` parameter.
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
// The charts' own stack (base/_typography.scss), with the family names
// unquoted, which CSS allows. Typographic quotes would become part of the
// name, which then matches no font.
const DEFAULT_FONT_STACK = 'Helvetica Neue, Helvetica, Arial, sans-serif';

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
                // `Number` so the string '0x41' types as a fromCharCode
                // argument. ToNumber reads the hex prefix.
                return String.fromCharCode(Number('0x' + p1));
            }
        )
    );
};

const config = {
    styleClass: 'britechartStyle',
    defaultFilename: 'britechart.png',
    // Used where the chart's theme tokens can't be read, as outside a browser
    chartBackground: 'white',
    imageSourceBase: 'data:image/svg+xml;base64,',
    svgSourceBase: 'data:image/svg+xml;charset=utf-8,',
    xmlDeclaration: '<?xml version="1.0" encoding="UTF-8"?>\n',
    titleFontSize: '15px',
    titleFontFamily: DEFAULT_FONT_STACK,
    // The band added above the chart for its title, and the title's baseline
    // within it
    titleBandHeight: 30,
    titleBaseline: 20,
    styleBackgroundString(background: string) {
        return `<style>svg{background:${background};}</style>`;
    },
};

const isSvgFilename = (filename?: string): filename is string =>
    !!filename && /\.svg$/i.test(filename);

/**
 * Main function to be used as a method by chart instances to export charts.
 * The filename picks the format: one ending in `.svg` downloads the chart as
 * an svg file, with its styles inlined so it looks the same outside the page,
 * and any other downloads a png.
 * @param  d3svg     The chart's svg selection
 * @param  filename  download to be called <filename>, britechart.png by default
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

    if (isSvgFilename(filename)) {
        downloadSvg(
            convertSvgToHtml.call(this, d3svg, title) as string,
            filename
        );

        return Promise.resolve();
    }

    return loadImage(convertSvgToHtml.call(this, d3svg, title) as string)
        .then((img) => {
            return {
                canvas: createCanvas(
                    this.width(),
                    this.height() + (title ? config.titleBandHeight : 0)
                ),
                img,
            };
        })
        .then(({ canvas, img }) => handleImageLoad.call(img, canvas, filename));
}

/**
 * adds background styles to raw html
 * @param html        raw html
 * @param background  the colour behind the chart
 * @private
 */
function addBackground(html: string, background: string): string {
    return html.replace('>', `>${config.styleBackgroundString(background)}`);
}

/**
 * A colour as the chart's svg resolves it, such as one of its theme tokens in
 * the page's light or dark scheme. An exported file is opened away from the
 * page, where the tokens are not defined, so it has to carry the colour
 * itself.
 * @param  svgNode   the chart's svg
 * @param  color     a CSS colour, such as `var(--bc-background, #fff)`
 * @param  fallback  what to use when it can't be resolved, as in jsdom
 * @private
 */
function resolveColor(
    svgNode: Element,
    color: string,
    fallback: string
): string {
    const probe = svgNode.ownerDocument.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect'
    );

    probe.style.setProperty('fill', color);
    svgNode.appendChild(probe);
    const resolved = window.getComputedStyle(probe).fill;

    probe.remove();

    return resolved && resolved !== 'none' && !resolved.includes('var(')
        ? resolved
        : fallback;
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
    const svgNode = d3svg.node() as Element;
    let html = serializer(svgNode) as string;

    html = formatHtmlByBrowser(html);
    html = prependTitle.call(
        this,
        html,
        title,
        parseInt(d3svg.attr('width'), 10),
        resolveColor(
            svgNode,
            'var(--bc-text-muted, #666a73)',
            colorSchemas.grey[6]
        )
    );
    html = addBackground(
        html,
        resolveColor(
            svgNode,
            'var(--bc-background, #fff)',
            config.chartBackground
        )
    );

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
 * Triggers browser to download the canvas as an image, a png by default
 * @private
 */
function downloadCanvas(
    canvas: HTMLCanvasElement,
    filename: string = config.defaultFilename,
    extensionType: string = 'image/png'
): void {
    downloadUrl(canvas.toDataURL(extensionType), filename);
}

/**
 * Triggers browser to download the svg markup as a file, with the XML
 * declaration a standalone svg file starts with
 * @private
 */
function downloadSvg(svgHtml: string, filename: string): void {
    downloadUrl(
        `${config.svgSourceBase}${encodeURIComponent(
            config.xmlDeclaration + svgHtml
        )}`,
        filename
    );
}

/**
 * Points a link at the url and clicks it, appended to the document first
 * for Firefox to register the click
 * @private
 */
function downloadUrl(url: string, filename: string): void {
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

const escapeXml = (text: string): string =>
    text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

/**
 * Adds the title in a band above the chart: the svg grows by the band, in its
 * height and its viewBox, and the chart moves down into the space below it, so
 * the title never covers the chart. The title is escaped, so a title with `&`
 * or `<` still makes a valid file.
 * @param  html      raw html string
 * @param  title     title of the graph
 * @param  svgWidth  width of graph container
 * @param  color     the title's colour
 * @return raw html with the title band added
 * @private
 */
function prependTitle(
    this: ExportableChartContext,
    html: string,
    title: string | undefined,
    svgWidth: number,
    color: string
): string {
    const openingTag = html.match(/^<svg\b[^>]*>/)?.[0];

    if (!title || !svgWidth || !openingTag) {
        return html;
    }
    const band = config.titleBandHeight;
    const grownTag = openingTag
        .replace(
            /\sheight="([\d.]+)"/,
            (match, height) => ` height="${Number(height) + band}"`
        )
        .replace(/\sviewBox="([^"]+)"/, (match, viewBox) => {
            const [x, y, width, height] = viewBox.split(/[\s,]+/).map(Number);

            return ` viewBox="${x} ${y} ${width} ${height + band}"`;
        });
    const titleText = `<text x="${this.margin().left ?? 0}" y="${
        config.titleBaseline
    }" font-family="${config.titleFontFamily}" font-size="${
        config.titleFontSize
    }" fill="${color}">${escapeXml(title)}</text>`;
    const chart = html.slice(openingTag.length, html.lastIndexOf('</svg>'));

    return `${grownTag}${titleText}<g transform="translate(0, ${band})">${chart}</g></svg>`;
}

export default {
    exportChart,
    convertSvgToHtml,
    createImage,
    drawImageOnCanvas,
    loadImage,
};
