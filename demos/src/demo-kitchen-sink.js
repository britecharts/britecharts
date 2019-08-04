const loadScript = (name, cb) => {
    let head = document.getElementsByTagName('head')[0],
        script = document.createElement('script');

    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.defer = true;
    script.src = name + '.js';
    head.appendChild(script);
    cb && cb();
};

const demoPaths = [
    '/britecharts/scripts/demo-stacked-area',
    '/britecharts/scripts/demo-bar',
    '/britecharts/scripts/demo-stacked-bar',
    '/britecharts/scripts/demo-grouped-bar',
    '/britecharts/scripts/demo-donut',
    '/britecharts/scripts/demo-line',
    '/britecharts/scripts/demo-sparkline',
    '/britecharts/scripts/demo-step',
    '/britecharts/scripts/demo-brush',
    '/britecharts/scripts/demo-scatter-plot',
    '/britecharts/scripts/demo-bullet'
];

window.onload = function(){
    demoPaths.forEach((path) => loadScript(path));
}
