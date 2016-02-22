var testsContext = require.context('./test/specs', true, /.spec\.js$/);
testsContext.keys().forEach(testsContext);

var srcContext = require.context('./src/charts', true, /\.js$/);
srcContext.keys().forEach(srcContext);

var jsFixturesContext = require.context('./test/fixtures', true, /\.js$/);
jsFixturesContext.keys().forEach(jsFixturesContext);
