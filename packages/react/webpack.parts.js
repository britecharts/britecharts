/* eslint-disable import/no-commonjs, line-comment-position */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        // Enable history API fallback so HTML5 History API based
        // routing works. Good for complex setups.
        historyApiFallback: true,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only',

        // overlay: true is equivalent
        overlay: {
            errors: true,
            warnings: true,
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
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
});

exports.generateSourceMaps = ({ type }) => ({
    devtool: type,
});

exports.minifyJavaScript = () => ({
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                cache: true,
                parallel: 2,
                uglifyOptions: {
                    mangle: true,
                    ie8: true,
                    keep_fnames: true, // eslint-disable-line
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    },
});

exports.bundleTreeChart = () => ({
    plugins: [new BundleAnalyzerPlugin()],
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

exports.copy = (patterns, options) => ({
    plugins: [new CopyWebpackPlugin([patterns], options)],
});
