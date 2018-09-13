const copyWebpackPlugin = require("copy-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"]
  },
  entry: {
    index: "./index.jsx"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
    library: "reactDateRangePicker",
    libraryTarget: "commonjs2"
  },
  devtool: "source-map",
  mode: "development",
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
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  },
  plugins: [
    new copyWebpackPlugin([
      {
        from: "./package.json",
        to: "./package.json",
        toType: "file"
      },
      {
        from: "./README.md",
        to: "./README.md",
        toType: "file"
      }
    ]),
    new extractTextPlugin("styles.css")
  ],
  externals: {
    react: "commonjs react",
    "react-dom": "commonjs react-dom"
  }
};
