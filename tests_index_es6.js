require("@babel/polyfill");

const context = require.context('./test/specsES6', true, /spec\.js$/),
    srcContext = require.context('./src/es6charts', true, /\.js$/),
    jsFixturesContext = require.context('./test/fixturesES6', true, /\.js$/);

context.keys().forEach(context);
// srcContext.keys().forEach(srcContext);
// jsFixturesContext.keys().forEach(jsFixturesContext);
