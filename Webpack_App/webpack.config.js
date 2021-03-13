// The path to the CesiumJS source code
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

const CopywebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [{
    mode: 'development',
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'eval',
    node: {
        // Resolve node module use of fs
        fs: "empty",
        Buffer: false,
        http: "empty",
        https: "empty",
        zlib: "empty"
    },
    resolve: {
        mainFields: ['module', 'main']
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: ['url-loader']
        }]
    },

    plugins: [
        //   //  new HtmlWebpackPlugin({
        //         template: 'src/index.html'
        //     }),
        //     // Copy Cesium Assets, Widgets, and Workers to a static directory
        //    // new CopyWebpackPlugin({
        //         patterns: [
        //             { from: 'node_modules/cesium/Build/Cesium/Workers', to: 'Workers' },
        //             { from: 'node_modules/cesium/Build/Cesium/ThirdParty', to: 'ThirdParty' },
        //             { from: 'node_modules/cesium/Build/Cesium/Assets', to: 'Assets' },
        //             { from: 'node_modules/cesium/Build/Cesium/Widgets', to: 'Widgets' }
        //         ],
        //   //  }),
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify('')
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new CopywebpackPlugin({
            patterns: [
                { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
                { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
                { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }
            ]
        })
    ],

    // development server options
    devServer: {
        contentBase: path.join(__dirname, "dist")
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),

        // Needed to compile multiline strings in Cesium
        sourcePrefix: ''
    },
    amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },
    node: {
        // Resolve node module use of fs
        fs: 'empty'
    },

    resolve: {
        alias: {
            // CesiumJS module name
            cesium: path.resolve(__dirname, cesiumSource)
        }
    },

}];