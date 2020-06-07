import demoPaths from './demo-charts-in-sink.json';

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

window.onload = function () {
    demoPaths.demos.forEach((path) => loadScript(path));
};
