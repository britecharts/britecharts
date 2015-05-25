var allTestFiles = [];
var TEST_REGEXP = /(spec)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: function(){
      require(['./jasmine-karma'], function(){
          window.__karma__.start();
      });
  },

  paths: requireConfig.paths,
  shim: requireConfig.shim,
  map: requireConfig.map,
  packages: requireConfig.packages
});
