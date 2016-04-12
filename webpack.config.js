'use strict';

const path = require('path');

const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');
const combineLoaders = require('webpack-combine-loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

require('dotenv').load({ silent: true });

const PRODUCTION = process.env.NODE_ENV === 'production';
const EXTRACT = process.env.NODE_ENV === 'extract';

const PATHS = {
    APP: path.resolve(__dirname, 'src/app.js'),
    BUILD: path.resolve(__dirname, 'build'),
    DIST: path.resolve(__dirname, 'dist'),
    NODE_MODULES: path.resolve(__dirname, 'node_modules')
};

// Browsers to target when prefixing CSS.
const COMPATIBILITY = ['Chrome >= 30', 'Safari >= 6.1', 'Firefox >= 35', 'Opera >= 32', 'iOS >= 8', 'Android >= 2.3', 'ie >= 10'];

// Definitions injected into app
const DEFINITIONS = {
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),

        API_URL: JSON.stringify(process.env.API_URL || 'https://staging.ascribe.io/api'),
        APP_BASE_PATH: JSON.stringify(process.env.APP_BASE_PATH || '/'),
        SERVER_URL: JSON.stringify(process.env.SERVER_URL || 'https://staging.ascribe.io/'),

        S3_ACCESS_KEY: JSON.stringify(process.env.S3_ACCESS_KEY || '')
    },
};

// Plugins
const plugins = [
    new webpack.DefinePlugin(DEFINITIONS),
    new webpack.NoErrorsPlugin()
];

const extractPlugins = [
    new ExtractTextPlugin(PRODUCTION ? 'styles.min.css' : 'styles.css', {
        allChunks: true
    })
];

const prodPlugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        }
    }),
    new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true
    })
];

if (EXTRACT || PRODUCTION) {
    plugins.push(...extractPlugins);
}

if (PRODUCTION) {
    plugins.push(...prodPlugins);
}

// Modules
// **Note** Make sure css-loader's importLoader value is equal to the number of loaders after it
// to make sure that CSS Module composes also invoke the full loader chain.
const CSS_LOADER = combineLoaders([
    {
        loader: 'css',
        query: {
            modules: true,
            importLoaders: 3,
            localIdentName: '[path]__[name]__[local]_[hash:base64:5]',
            sourceMap: true
        }
    },
    {
        loader: 'postcss'
    },
    {
        loader: 'sass',
        query: {
            precision: '8', // See https://github.com/twbs/bootstrap-sass#sass-number-precision
            outputStyle: 'expanded',
            sourceMap: true
        }
    },
    {
        loader: 'sass-resources'
    }
]);


const config = {
    entry: [
        PRODUCTION || EXTRACT ? 'bootstrap-loader/extractStyles' : 'bootstrap-loader',
        PATHS.APP
    ],

    output: {
        filename: PRODUCTION ? 'bundle.min.js' : 'bundle.js',
        path: PRODUCTION ? PATHS.DIST : PATHS.BUILD
    },

    debug: !PRODUCTION,

    devtool: PRODUCTION ? '#source-map' : '#inline-source-map',

    resolve: {
        // Dedupe any dependencies' polyfill, react, or react-css-modules dependencies
        // FIXME: check if this is still necessary without npm link
        alias: {
            'babel-runtime': path.resolve(PATHS.NODE_MODULES, 'babel-runtime'),
            'core-js': path.resolve(PATHS.NODE_MODULES, 'core-js'),
            'react': path.resolve(PATHS.NODE_MODULES, 'react'),
            'react-css-modules': path.resolve(PATHS.NODE_MODULES, 'react-css-modules'),
        },
        extensions: ['', '.js'],
        modules: ['node_modules'] // Don't use absolute path here to allow recursive matching
    },

    plugins: plugins,

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [PATHS.NODE_MODULES],
                loader: 'babel',
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.s[ac]ss$/,
                exclude: [PATHS.NODE_MODULES],
                loader: PRODUCTION || EXTRACT ? ExtractTextPlugin.extract('style', CSS_LOADER)
                                              : `style!${CSS_LOADER}`
            }
        ]
    },

    postcss: [autoPrefixer({ browsers: COMPATIBILITY })],
    sassResources: './sass-resources.scss'
};

module.exports = config;
