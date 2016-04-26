define(function(require) {

    'use strict';

    const $ = require('jquery');

    const serializeWithStyles = require('./serializeWithStyles.js');
    const encoder = window.btoa ||  require('./base64');

    const config = {
        styleClass : 'britechartStyle',
        defaultFilename: 'britechart.png',
        chartBackground: 'white'
    };

    const baseStrings = {
        imageSourceBase: 'data:image/svg+xml;base64,',
        styleString: `<style>svg{background:${config.chartBackground};}</style>`
    };

    /**
     * Main function to be used as a method by chart
     *     instances to export charts to png
     * @param  {array | d3 svg} svgs [pass in both chart & legend as array
     *     or just chart as svg or in array]
     * @param  {string} filename [download to be called <filename>.png]
     */
    function exportChart(svgs, filename) {
        let d3svg,
            legend,
            html,
            img,
            legendHtml,
            legendImg,
            canvas,
            canvasWidth = this.width(),
            canvasHeight = this.height();

        if (svgs.data) {
            d3svg = svgs;
        } else {
            [d3svg,legend] = svgs;
        }
        //legend functionality not complete
        if (legend) {
            canvasHeight += legend.height();
            legendHtml = convertSvgToHtml(legend.getD3SVG());
            legendImg = createImage(legendHtml);
        }

        html = convertSvgToHtml(d3svg);

        canvas = createCanvas(canvasWidth, canvasHeight);

        img = createImage(html);

        if (legendImg) {
            img.onload = function(e) {
                e.preventDefault();
                drawImageOnCanvas(img, canvas);
                legendImg.onload = handleImageLoad.bind(this, legendImg, canvas);
            };
        } else {
            img.onload = handleImageLoad.bind(img, canvas, filename);
        }
    }

    /**
     * takes d3 svg el, adds proper svg tags, adds inline styles
     * from stylesheets, adds white background and returns string
     * @param  {d3 svg el} d3svg
     * @return {string} string of passed d3
     */
    function convertSvgToHtml (d3svg) {
        let serialized;

        if (!d3svg){ return; }
        d3svg.attr({ version: 1.1, xmlns: 'http://www.w3.org/2000/svg'});
        serialized = serializeWithStyles(d3svg.node());
        return serialized.replace('>',`>${baseStrings.styleString}`);
    }

    /**
     * Create Canvas
     * @param  {number} width
     * @param  {number} height
     * @return {el <canvas>}
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
     * @return {el <img>}  src points at svg
     */
    function createImage(svgHtml) {
        let img = new Image();

        img.src = `${baseStrings.imageSourceBase}${encoder(svgHtml)}`;
        return img;
    };

    /**
     * Draws image on canvas
     * @param  {el <img>} image to draw
     * @param  {el <canvas>} canvas to be drawn on
     */
    function drawImageOnCanvas(image, canvas) {
        canvas.getContext('2d').drawImage(image, 0, 0);
    }

    /**
     * Triggers browser to download image, convert canvas to url,
     * point <a> at it and trigger click
     * @param  {el <canvas>} canvas
     * @param  {String} filename
     * @param  {String} extensionType
     */
    function downloadCanvas(canvas, filename='britechart.png', extensionType='image/png') {
        let url = canvas.toDataURL(extensionType);

        $('<a></a>', {href: url, download: filename})[0].click();
    }

    /**
     * Handles on load event fired by img.onload, this=img
     * @param  {[type]} canvas
     * @param  {[type]} filename
     * @param  {[type]} e
     */
    function handleImageLoad(canvas, filename, e) {
        e.preventDefault();
        drawImageOnCanvas(this, canvas);
        downloadCanvas(canvas, filename || config.defaultFilename);
    }

    return exportChart;
});

