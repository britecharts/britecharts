define(function(require) {

    const d3 = require('d3');
    const $ = require('jquery');

    const config = {
        styleClass : 'britechartStyle',
        filename: 'imageDownload.png',
        imageSourceBase: 'data:image/svg+xml;base64,',
        backgroundStyle: '.britechart{background:white;}'
    };


    const exportToPNG = function(svg, type) {
        let css,
            style,
            html,
            img,
            canvas,
            context;

        const chartTypeMap = {
            'line': './css/line.css'
        }

        const encoder = window.btoa || require('./Base64').encode.bind(base64);


        $.get(chartTypeMap[type])
            .then(function(css) {
                css = css;


                style = document.createElement('style');
                style.className = config.britechartStyle;

                style.innerHTML = css.concat(config.backgroundStyle);
                svg.node().insertBefore(style, this.nextSibling);

                html = svg
                    .attr("version", 1.1)
                    .attr("xmlns", "http://www.w3.org/2000/svg")
                    .node().parentNode.innerHTML;

                $(`.${config.styleClass}`).remove();
                img = new Image();
                img.src = `${config.imageSourceBase}${encoder(html)}`;

                canvas = document.createElement('canvas');
                canvas.width = $(svg[0]).width();
                canvas.height = $(svg[0]).height();
                context = canvas.getContext('2d');


                img.onload = function(e) {
                    e.preventDefault();
                    context.drawImage(img, 0, 0);
                    document.body.appendChild(canvas);

                    downloadCanvas(canvas, config.filename);
                }
        });
    }

    const downloadCanvas = (canvas, filename='image.png', extensionType='image/png') => {
        let a = document.createElement('a');
        a.download = filename;
        a.href = canvas.toDataURL(extensionType);
        a.click();
    }

    return exportToPNG;
})





// var chart = c3.generate({
//     bindto: '#svg-container',
//     data: {
//         columns: [
//             ['data1', 30, 200, 100, 400, 150, 250],
//             ['data2', 130, 100, 140, 200, 150, 50]
//         ],
//         type: 'area'
//     }
// });

// d3.select('body').append('canvas')
// d3.select('#button').on('click', function() {
//     // https://developer.mozilla.org/en/XMLSerializer

//     var svg = d3.select('svg')
//     .attr("version", 1.1)
//   .attr("xmlns", "http://www.w3.org/2000/svg")
// .node()

//        svg_xml = (new XMLSerializer()).serializeToString(svg);
//    var canvas  = document.querySelector('canvas'),
//         context = canvas.getContext('2d');

//        // this is just a JavaScript (HTML) image
//        var img = new Image();
//        // http://en.wikipedia.org/wiki/SVG#Native_support
//        // https://developer.mozilla.org/en/DOM/window.btoa
//        img.src = "data:image/svg+xml;base64," + btoa(svg_xml);

//        img.onload = function() {
//            // after this, Canvas’ origin-clean is DIRTY
//            context.drawImage(img, 0, 0);
//        }
// })
//
//
// d3.select('body').append('canvas');

// d3.select("#button").on("click", function(){
    // var html = d3.select("svg")
    //       .attr("version", 1.1)
    //       .attr("xmlns", "http://www.w3.org/2000/svg")
    //       .node().parentNode.innerHTML;

//     var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);

//     var canvas  = document.querySelector('canvas'),
//         context = canvas.getContext('2d');
//     var image = new Image;
//     image.src = imgsrc;

//     image.onload = function(){
//         context.drawImage(image,0,0);

//         var a = document.createElement('a');
//         a.download=imgsrc;
//         a.href=canvas.toDataURL('image/png');
//         $('a').click();
//     };

// });



// d3.select("#button").on("click", function(){
//   var html = d3.select("svg")
//         .attr("version", 1.1)
//         .attr("xmlns", "http://www.w3.org/2000/svg")
//         .node().parentNode.innerHTML;

//   //console.log(html);
  // var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
  // var img = '<img src="'+imgsrc+'">';
//   d3.select("#svgdataurl").html(img);

//   d3.select('body').append('canvas');

//   var canvas = document.querySelector("canvas"),
//       context = canvas.getContext("2d");

//   var image = new Image;
//   image.src = imgsrc;

//   setTimeout(function(){
//       context.drawImage(image, 0, 0);

//       var canvasdata = canvas.toDataURL("image/png");

//       var pngimg = '<img src="'+canvasdata+'">';
//       d3.select("#pngdataurl").html(pngimg);

//       var a = document.createElement("a");
//       a.download = "sample.png";
//       a.href = canvasdata;
//       a.click();
//   },4000);
// });


// $('#button').on('click', function() {
//     // debugger;

//     html2canvas($('#chart')).then(function(chart){
//         document.body.appendChild(chart);
//     });
// });

// $('#button').on('click', function() {
//     debugger;
//     var canvas = d3.select('body').append('canvas').node();
//     canvas.width = 100;
//     canvas.height = 100;
//     var ctx = canvas.getContext('2d');
//     ctx.drawImage(d3.select('#chart')[0][0].children[0], 0, 0);
//     var canvasUrl = canvas.toDataURL("image/png");
//     var img2 = d3.select('body').append('img')
//         .attr('width', 100)
//         .attr('height', 100)
//         .node();
//     // this is now the base64 encoded version of our PNG! you could optionally
//     // redirect the user to download the PNG by sending them to the url with
//     // `window.location.href= canvasUrl`.
//     img2.src = canvasUrl;
//     window.location.href = canvasUrl;
// });