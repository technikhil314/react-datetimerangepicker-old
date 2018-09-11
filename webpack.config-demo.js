const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        modules: ['../node_modules', __dirname + '/demo', __dirname, __dirname + '/../'],
        extensions: ['.js', '.jsx']
    },
    entry: {
        demo: './demo/demo.jsx'
    },
    output: {
        filename: '[name]-[hash:6].js',
        path: __dirname + '/demo/dist'
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
        new HtmlWebpackPlugin({
            template: './demo/public/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    serve: {
        content: './demo/dist',
        hotClient: false,
        hmr: false
    }
}