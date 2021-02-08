const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    entry: './src/index.ts',

    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib')
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            sps: path.resolve("./src")
        }
    },

    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },

    plugins: [
        new NodePolyfillPlugin()
    ]
};