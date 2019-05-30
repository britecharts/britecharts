var testsContext = require.context('./test/specsES6', true, /spec\.js$/),
    srcContext = require.context('./src/es6charts', true, /\.js$/),
    jsFixturesContext = require.context('./test/fixturesES6', true, /\.js$/);

testsContext.keys().forEach(testsContext);
srcContext.keys().forEach(srcContext);
jsFixturesContext.keys().forEach(jsFixturesContext);
