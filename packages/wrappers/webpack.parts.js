const constants = require('./webpack.constants');

exports.noParseD3Vendor = () => ({
    module: {
        noParse: [new RegExp(constants.PATHS.vendor + '/d3/d3.js')],
    },
});

exports.externals = () => ({
    externals: /^d3-/,
});

exports.aliasD3ToVendorPath = () => ({
    resolve: {
        alias: {
            d3: constants.PATHS.vendor + '/d3',
        },
    },
});

// webpack understands ES modules but not TypeScript, and H26 deliberately took
// Babel back out of this build -- plain .js is ES2020 already and goes through
// untouched. This rule is scoped to .tsx? on purpose so that stays true: Babel
// runs on converted files only, and only to strip the types. Checking them is
// the `type-check` script's job.
exports.typeScript = () => ({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // Hermetic: this build has no babel config of its own,
                        // and should not pick one up from a parent directory.
                        babelrc: false,
                        configFile: false,
                        presets: ['@babel/preset-typescript'],
                    },
                },
            },
        ],
    },
    resolve: {
        // webpack's defaults are ['.js', '.json', '.wasm'].
        extensions: ['.ts', '.tsx', '.js', '.json', '.wasm'],
        // Lets an import written `./barChart.js` resolve to barChart.ts on
        // disk, so the barrels keep their .js specifiers as files convert one
        // at a time. webpack 4 could not do this at all, which is why the
        // migration waited on #1079.
        extensionAlias: {
            '.js': ['.ts', '.tsx', '.js'],
        },
    },
});
