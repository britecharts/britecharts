var requireConfig = {

    baseUrl: '',

    paths: {
        'underscore': './node_modules/underscore/underscore',
        'es6': './node_modules/js-common/src/utils/es6',
        'sinon': './node_modules/sinon/lib/sinon',
        'jasmine-jquery': './node_modules/jasmine-jquery/lib/jasmine-jquery',
        'jquery': './node_modules/jquery/dist/jquery',
        'd3': 'node_modules/d3/d3'
    },
    shim: {
        'jasmine-jquery': {
            deps: ['jquery']
        },
        'd3': { exports: 'd3'},
        'underscore': { exports: '_'}
    },
    map: {},
    packages: []
};

if (typeof require === 'undefined') {
    // any values set on require before it loads will be used as config
    // ignore the "redefinition error" due to the line below
    window.require = window.requireConfig;
} else if (typeof module === 'undefined') {
    window.require.config(window.requireConfig);
}

// allow for loading in nodejs
if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = requireConfig;
}
