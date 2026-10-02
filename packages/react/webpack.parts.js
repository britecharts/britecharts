const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        // Enable history API fallback so HTML5 History API based
        // routing works. Good for complex setups.
        historyApiFallback: true,

        // Display only errors to reduce the amount of output. webpack-dev-server
        // 4 moved this from a top-level `stats` option to `devMiddleware.stats`.
        devMiddleware: {
            stats: 'errors-only',
        },

        // overlay: true is equivalent. webpack-dev-server 4 moved this under
        // `client`.
        client: {
            overlay: {
                errors: true,
                warnings: true,
            },
        },

        // Parse host and port from env to allow customization.
        //
        // If you use Docker, Vagrant or Cloud9, set
        // host: options.host || '0.0.0.0';
        //
        // 0.0.0.0 is available to all network devices
        // unlike default `localhost`.
        host, // Defaults to `localhost`
        port, // Defaults to 8080
    },
});

exports.lintJavaScript = ({ options }) => ({
    plugins: [new ESLintPlugin(options)],
});

exports.babelLoader = () => ({
    module: {
        rules: [
            {
                // .tsx? as well as .jsx?: unlike core and wrappers, this
                // package already runs Babel over its source for JSX, so
                // converted files just need preset-typescript alongside
                // preset-react in babel.config.js -- no second rule.
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
});

exports.resolveTypeScript = () => ({
    resolve: {
        // webpack's defaults are ['.js', '.json', '.wasm'].
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.wasm'],
        // Lets `export { default as Bar } from './charts/bar/Bar.js'` in the
        // barrel resolve to Bar.tsx on disk, so index.js keeps its .js
        // specifiers -- and index.spec.js's assertion that every re-export
        // ends in literal .js keeps passing -- as components convert one at a
        // time. webpack 4 could not do this, which is what made it a fork in
        // the road before #1079.
        extensionAlias: {
            '.js': ['.ts', '.tsx', '.js'],
        },
    },
});

exports.generateSourceMaps = ({ type }) => ({
    devtool: type,
});

exports.minifyJavaScript = () => ({
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: 2,
                terserOptions: {
                    mangle: true,
                    keep_fnames: true, // eslint-disable-line
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    },
});

exports.externals = () => ({
    react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
    },
    'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
    },
    'prop-types': {
        root: 'PropTypes',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types',
    },
});
