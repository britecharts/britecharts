var testsContext = require.context('./test/specs', true, /spec\.js$/),
    srcContext = require.context('./src/charts', true, /\.js$/),
    jsFixturesContext = require.context('./test/fixtures', true, /\.js$/);

testsContext.keys().forEach(testsContext);
srcContext.keys().forEach(srcContext);
jsFixturesContext.keys().forEach(jsFixturesContext);
