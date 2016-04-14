define(function(require) {

    'use strict';

    const d3 = require('d3');
    const $ = require('jquery');

    const config = {
        styleClass : 'britechartStyle',
        filename: 'imageDownload.png',
        imageSourceBase: 'data:image/svg+xml;base64,',
        backgroundStyle: '.britechart{background:white;}'
    };

    const encoder = window.btoa || require('./Base64').encode.bind(base64);

    const chartTypeMap = {
        'line': './css/line.css'
    };

    const exportToPNG = function(d3svg, type) {

        const svgWidth = $(d3svg[0]).width();
        const svgHeight = $(d3svg[0]).height();

        const exportChartMainMethod = (importedCssString) => {
            let styleElement,
                html,
                img,
                canvas;

            styleElement = createStyleElement(importedCssString);

            addStyleToSVG(styleElement, d3svg);

            html = convertSvgToHtml(d3svg);

            removeStyleFromSVG();

            canvas = createCanvas(svgWidth, svgHeight);

            img = createImage(html);

            img.onload = handleImageLoad.bind(this, img, canvas);
        };

        const errorRetrievingCssFile = (err) => {
            console.log(`error: ${err}`);
        };

        $.get(chartTypeMap[type])
            .then(exportChartMainMethod)
            .catch(errorRetrievingCssFile);
    };

    const convertSvgToHtml = (d3svg) => {
        if(!d3svg || !d3svg.datum) {
            return console.log(`Error: d3 object not passed to convertSvgToHtml, you passed ${d3svg}`);
        }
        return d3svg
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .node().parentNode.innerHTML;
    };

    const addStyleToSVG = (styleElement, d3svg) => {
        d3svg.node().insertBefore(styleElement, this.nextSibling);
    };

    const removeStyleFromSVG = () => {
        $(`.${config.styleClass}`).remove();
    };

    const handleImageLoad = (image, canvas, e) => {
        e.preventDefault();
        drawImageOnCanvas(image, canvas);
        downloadCanvas(canvas, config.filename);
    };

    const drawImageOnCanvas = (image, canvas) => {
        canvas.getContext('2d').drawImage(image, 0, 0);
    };

    const createImage = (svgHtml) => {
        let img = new Image();
        img.src = `${config.imageSourceBase}${encoder(svgHtml)}`;
        return img;
    };

    const createStyleElement = (importedCssString) => {
        let styleElement = document.createElement('style');
        styleElement.className = config.britechartStyle;
        styleElement.innerHTML = importedCssString.concat(config.backgroundStyle);
        return styleElement;
    };

    const createCanvas = (width, height) => {
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    };

    const downloadCanvas = (canvas, filename='image.png', extensionType='image/png') => {
        let a = document.createElement('a');
        a.download = filename;
        a.href = canvas.toDataURL(extensionType);
        a.click();
    };

    return exportToPNG;
});



