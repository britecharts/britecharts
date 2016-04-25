define(function(require) {

    'use strict';

    const d3 = require('d3');
    const $ = require('jquery');

    const serializeWithStyles = require('./serializeWithStyles.js');

    let encoder = window.btoa;

    if(!window.btoa) {
        let base64 = require('./base64');
        encoder = base64.encode.bind(base64);
    }

    const config = {
        styleClass : 'britechartStyle',
        filename: 'britechart.png',
        chartBackground: 'white'
    };

    const baseStrings = {
        imageSourceBase: 'data:image/svg+xml;base64,',
        styleString: `<style>svg{background:${config.chartBackground};}</style>`
    };

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

        if(svgs.data) {
            d3svg = svgs;
        } else {
            d3svg = svgs[0];
            legend = svgs[1];
        }

        if(legend) {
            canvasHeight += legend.height();
            legendHtml = convertSvgToHtml(legend.getD3SVG());
            legendImg = createImage(legendHtml);
        }

        html = convertSvgToHtml(d3svg);

        canvas = createCanvas(canvasWidth, canvasHeight);

        img = createImage(html);

        // legend functionality incomplete
        if(legendImg) {
            img.onload = function(e) {
                drawImageOnCanvas(img, canvas);
                legendImg.onload = handleImageLoad.bind(this, legendImg, canvas);
            };
        } else {
            img.onload = handleImageLoad.bind(this, img, canvas, filename);
        }
    }

    function convertSvgToHtml (d3svg) {
        let serialized;

        if(!d3svg){ return; }
        d3svg.attr({ version: 1.1, xmlns: "http://www.w3.org/2000/svg"});
        serialized = serializeWithStyles(d3svg.node());
        return serialized.replace('>',`>${baseStrings.styleString}`);
    }

    function createCanvas(width, height) {
        let canvas = document.createElement('canvas');
        canvas.height = height;
        canvas.width = width;
        return canvas;
    }

    function createImage(svgHtml) {
        let img = new Image();
        img.src = `${baseStrings.imageSourceBase}${encoder(svgHtml)}`;
        return img;
    };

    function drawImageOnCanvas(image, canvas) {
        canvas.getContext('2d').drawImage(image, 0, 0);
    }

    function downloadCanvas(canvas, filename='britechart.png', extensionType='image/png') {
        let url = canvas.toDataURL(extensionType);
        $('<a></a>', {href: url, download: filename})[0].click();
    }

    function handleImageLoad(image, canvas, filename, e) {
        e.preventDefault();
        drawImageOnCanvas(image, canvas);
        downloadCanvas(canvas, filename || config.filename);
    }

    return exportChart;
});



