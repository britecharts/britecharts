define(function(require) {

    'use strict';

    const serializeWithStyles = require('./serializeWithStyles.js');

    let encoder = window.btoa;

    if (!encoder) {
        encoder = require('base-64').encode;
    }

    const config = {
        styleClass : 'britechartStyle',
        defaultFilename: 'britechart.png',
        chartBackground: 'white',
        imageSourceBase: 'data:image/svg+xml;base64,',
        get styleString () {
            return `<style>svg{background:${this.chartBackground};}</style>`;
        }
    };


    /**
     * Main function to be used as a method by chart instances to export charts to png
     * @param  {array} svgs (or an svg element) pass in both chart & legend as array or just chart as svg or in array
     * @param  {string} filename [download to be called <filename>.png]
     */
    function exportChart(d3svg, filename) {
        let html,
            img,
            canvas,
            canvasWidth = this.width(),
            canvasHeight = this.height();

        html = convertSvgToHtml(d3svg);

        canvas = createCanvas(canvasWidth, canvasHeight);

        img = createImage(html);

        img.onload = handleImageLoad.bind(img, canvas, filename);
    }

    /**
     * takes d3 svg el, adds proper svg tags, adds inline styles
     * from stylesheets, adds white background and returns string
     * @param  {object} d3svg TYPE d3 svg element
     * @return {string} string of passed d3
     */
    function convertSvgToHtml (d3svg) {
        let serialized;

        if (!d3svg){ return; }
        d3svg.attr({ version: 1.1, xmlns: 'http://www.w3.org/2000/svg'});
        serialized = serializeWithStyles(d3svg.node());
        return serialized.replace('>',`>${config.styleString}`);
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

        img.src = `${config.imageSourceBase}${encoder(svgHtml)}`;
        return img;
    };

    /**
     * Draws image on canvas
     * @param  {object} image TYPE:el <img>, to be drawn
     * @param  {object} canvas TYPE: el <canvas>, to draw on
     */
    function drawImageOnCanvas(image, canvas) {
        canvas.getContext('2d').drawImage(image, 0, 0);
    }

    /**
     * Triggers browser to download image, convert canvas to url,
     * we need to append the link el to the dom before clicking it for Firefox to register
     * point <a> at it and trigger click
     * @param  {object} canvas TYPE: el <canvas>
     * @param  {string} filename
     * @param  {string} extensionType
     */
    function downloadCanvas(canvas, filename='britechart.png', extensionType='image/png') {
        let url = canvas.toDataURL(extensionType);
        let link = document.createElement('a');

        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /**
     * Handles on load event fired by img.onload, this=img
     * @param  {object} canvas TYPE: el <canvas>
     * @param  {string} filename
     * @param  {object} e
     */
    function handleImageLoad(canvas, filename, e) {
        e.preventDefault();
        drawImageOnCanvas(this, canvas);
        downloadCanvas(canvas, filename || config.defaultFilename);
    }

    return exportChart;
});

