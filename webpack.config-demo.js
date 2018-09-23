const HtmlWebpackPlugin = require("html-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");
const isDevServer = process.argv[1].indexOf("webpack-dev-server") !== -1;
let extractTextPluginInstance = new extractTextPlugin({
  filename: isDevServer ? "styles.css" : "styles-[md5:contenthash:hex:20].css",
  disable: false,
  allChunks: true
});

module.exports = {
  resolve: {
    modules: [
      "../node_modules",
      __dirname + "/demo",
      __dirname,
      __dirname + "/../"
    ],
    extensions: [".js", ".jsx"]
  },
  entry: {
    demo: "./demo/demo.jsx"
  },
  output: {
    filename: isDevServer ? "[name].js" : "[name]-[contenthash].js",
    path: __dirname + "/demo/dist"
  },
  devtool: "source-map",
  mode: isDevServer ? "development" : "production",
  stats: isDevServer
    ? {
        all: false,
        errors: true,
        warnings: true
      }
    : "verbose",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.s?css$/,
        use: extractTextPluginInstance.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./demo/public/index.html",
      inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    extractTextPluginInstance
  ],
  devServer: {
    inline: true,
    hot: true,
    stats: {
      all: false,
      errors: true,
      warnings: true,
      children: false,
      chunks: false,
      assets: false
    }
  }
};
