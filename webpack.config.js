let webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    watch: true,
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        index: './index.jsx'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        library: 'reactDateRangePicker',
        libraryTarget: 'commonjs2'
    },
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        }]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: './package.json',
            to: './package.json',
            toType: 'file'
        }])
    ],
    externals: {
        'react': 'commonjs react',
        'react-dom': 'commonjs react-dom'
    }
}