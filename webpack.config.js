/* eslint-disable strict, no-console, object-shorthand */
/* eslint-disable import/no-extraneous-dependencies, import/newline-after-import */
'use strict';

const path = require('path');

const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');
const combineLoaders = require('webpack-combine-loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').load({ silent: true });

const PRODUCTION = process.env.NODE_ENV === 'production';
const EXTRACT = process.env.NODE_ENV === 'extract';

const PATHS = {
    APP: path.resolve(__dirname, 'src/app.js'),
    BUILD: path.resolve(__dirname, 'build'),
    DIST: path.resolve(__dirname, 'dist'),
    NODE_MODULES: path.resolve(__dirname, 'node_modules')
};

// Definitions injected into app
const DEFINITIONS = {
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),

        APP_VERSION: JSON.stringify(process.env.ONIONBOARDING_APP_VERSION || 'dev'),

        API_URL: JSON.stringify(process.env.ONION_API_URL || 'https://staging.ascribe.io/api'),
        ONION_BASE_PATH: JSON.stringify(process.env.ONION_BASE_PATH || 'https://staging.ascribe.io/app'),
        SERVER_URL: JSON.stringify(process.env.ONION_SERVER_URL || 'https://staging.ascribe.io/'),

        RAVEN_DSN_URL: JSON.stringify(process.env.RAVEN_DSN_URL || ''),

        S3_ACCESS_KEY: JSON.stringify(process.env.S3_ACCESS_KEY || '')
    }
};

// Plugins
const plugins = [
    new webpack.DefinePlugin(DEFINITIONS),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        minify: PRODUCTION ? {
            collapseWhitespace: true,
            minifyJS: true,
            removeComments: true,
            removeRedundantAttributes: true
        } : false,
        template: path.resolve(__dirname, 'src/index_template.html'),

        // Our own options
        PRODUCTION: PRODUCTION
    })
];

const EXTRACT_PLUGINS = [
    new ExtractTextPlugin(PRODUCTION ? 'styles.min.css' : 'styles.css', {
        allChunks: true
    })
];

const PROD_PLUGINS = [
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
    plugins.push(...EXTRACT_PLUGINS);
}

if (PRODUCTION) {
    plugins.push(...PROD_PLUGINS);
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
    { loader: 'postcss' },
    {
        loader: 'sass',
        query: {
            precision: '8', // See https://github.com/twbs/bootstrap-sass#sass-number-precision
            outputStyle: 'expanded',
            sourceMap: true
        }
    },
    { loader: 'sass-resources' }
]);

const PNG_LOADER = combineLoaders([
    {
        loader: 'url',
        query: {
            mimetype: 'image/png'
        }
    },
    // Can't supply the query using the query object as json formats aren't supported
    // Let's use the super awesome optimization levels for now, since we're not going to be adding
    // too many png assets for pngquant and optipng to crunch.
    { loader: 'image-webpack?{ optimizationLevel: 7, pngquant: { quality: "65-90", speed: 1 } }' }
]);

const SVG_LOADER = combineLoaders([
    { loader: 'babel' },
    { loader: 'svg-react' },
    // Can't supply the query using the query object as json formats aren't supported
    { loader: 'image-webpack?{ svgo: { plugins: [{ removeTitle: true }, { cleanupIDs: false }] } }' }
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
            },
            {
                test: /\.png$/,
                exclude: [PATHS.NODE_MODULES],
                loader: PNG_LOADER
            },
            {
                test: /\.svg$/,
                exclude: [PATHS.NODE_MODULES],
                loader: SVG_LOADER
            }
        ]
    },

    postcss: [autoPrefixer()],
    sassResources: './sass-resources.scss'
};

module.exports = config;
