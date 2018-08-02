define(function(require) {
    'use strict';
    const canvg = require('canvg-browser');
    const {colorSchemas} = require('./color');
    const constants = require('./constants');
    const serializeWithStyles = require('./style');

    const isBrowser = (typeof window !== 'undefined');

    let encoder = isBrowser && window.btoa;

    if (!encoder) {
        encoder = require('base-64').encode;
    }

    // Base64 doesn't work really well with Unicode strings, so we need to use this function
    // Ref: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
    const b64EncodeUnicode = (str) => {
        return encoder(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    };

    const config = {
        styleClass : 'britechartStyle',
        defaultFilename: 'britechart.png',
        chartBackground: 'white',
        imageSourceBase: 'data:image/svg+xml;base64,',
        titleFontSize: '15px',
        titleFontFamily: '\'Benton Sans\', sans-serif',
        titleTopOffset: 30,
        get styleBackgroundString () {
            return `<style>svg{background:${this.chartBackground};}</style>`;
        }
    };

    /**
     * Main function to be used as a method by chart instances to export charts to png
     * @param  {array} svgs         (or an svg element) pass in both chart & legend as array or just chart as svg or in array
     * @param  {string} filename    [download to be called <filename>.png]
     * @param  {string} title       Title for the image
     */
    function exportChart(d3svg, filename, title) {
        let svgHtml = convertSvgToHtml.call(this, d3svg, title);
        let canvas = createCanvas(this.width(), this.height());

        if(navigator.msSaveOrOpenBlob){
            let options = {
                log: false,
                ignoreMouse: true
            };

            canvg(canvas, svgHtml, options);
            return(navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob(canvas.msToBlob(), filename));
        } else {
            let img = createImage( svgHtml );
            img.onload = handleImageLoad.bind(
                img,
                canvas,
                filename
            );
        }
    }

    /**
     * adds background styles to raw html
     * @param {string} html raw html
     */
    function addBackground(html) {
        return html.replace('>',`>${config.styleBackgroundString}`);
    }

    /**
     * takes d3 svg el, adds proper svg tags, adds inline styles
     * from stylesheets, adds white background and returns string
     * @param  {object} d3svg TYPE d3 svg element
     * @return {string} string of passed d3
     */
    function convertSvgToHtml (d3svg, title) {
        if (!d3svg) {
            return;
        }

        d3svg.attr('version', 1.1)
            .attr('xmlns', 'http://www.w3.org/2000/svg');
        let serializer = serializeWithStyles.initializeSerializer();
        let html = serializer(d3svg.node());

        html = formatHtmlByBrowser(html);
        html = prependTitle.call(this, html, title, parseInt(d3svg.attr('width'), 10));
        html = addBackground(html);

        return html;
    }

    /**
     * Create Canvas
     * @param  {number} width
     * @param  {number} height
     * @return {object} TYPE canvas element
     */
    function createCanvas(width, height) {
        let canvas = document.createElement('canvas');

        canvas.height = height;
        canvas.width = width;

        return canvas;
    }

    /**
     * Create Image
     * @param  {string} svgHtml string representation of svg el
     * @return {object}  TYPE element <img>, src points at svg
     */
    function createImage(svgHtml) {
        let img = new Image();

        img.src = `${config.imageSourceBase}${ b64EncodeUnicode(svgHtml) }`;

        return img;
    };

    /**
     * Draws image on canvas
     * @param  {object} image TYPE:el <img>, to be drawn
     * @param  {object} canvas TYPE: el <canvas>, to draw on
     */
    function drawImageOnCanvas(image, canvas) {
        canvas.getContext('2d').drawImage(image, 0, 0);

        return canvas;
    }

    /**
     * Triggers browser to download image, convert canvas to url,
     * we need to append the link el to the dom before clicking it for Firefox to register
     * point <a> at it and trigger click
     * @param  {object} canvas TYPE: el <canvas>
     * @param  {string} filename
     * @param  {string} extensionType
     */
    function downloadCanvas(canvas, filename=config.defaultFilename, extensionType='image/png') {
        let url = canvas.toDataURL(extensionType);
        let link = document.createElement('a');

        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /**
     * Some browsers need special formatting, we handle that here
     * @param  {string} html string of svg html
     * @return {string} string of svg html
     */
    function formatHtmlByBrowser(html) {
        if (navigator.userAgent.search('FireFox') > -1) {
            return html.replace(/url.*&quot;\)/, 'url(&quot;linearGradient[id*="-gradient-"]&quot;);');
        }

        return html;
    }

    /**
     * Handles on load event fired by img.onload, this=img
     * @param  {object} canvas TYPE: el <canvas>
     * @param  {string} filename
     * @param  {object} e
     */
    function handleImageLoad(canvas, filename, e) {
        e.preventDefault();

        downloadCanvas(drawImageOnCanvas(this, canvas), filename);
    }

    /**
     * if passed, append title to the raw html to appear on graph
     * @param  {string} html     raw html string
     * @param  {string} title    title of the graph
     * @param  {number} svgWidth width of graph container
     * @return {string}         raw html with title prepended
     */
    function prependTitle(html, title, svgWidth) {
        if (!title || !svgWidth) {
            return html;
        }
        let {grey} = colorSchemas;

        html =  html.replace(/<g/,`<text x="${this.margin().left}" y="${config.titleTopOffset}" font-family="${config.titleFontFamily}" font-size="${config.titleFontSize}" fill="${grey[6]}"> ${title} </text><g `);

        return html;
    }

    return {
        exportChart,
        convertSvgToHtml,
        createImage,
        drawImageOnCanvas
    };
});
