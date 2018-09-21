const HtmlWebpackPlugin = require("html-webpack-plugin");
const isDevServer = process.argv[1].indexOf("webpack-dev-server") !== -1;

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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./demo/public/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
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
