const copyWebpackPlugin = require("copy-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const isDevServer = process.argv[2].indexOf("--watch") !== -1;
let extractTextPluginInstance = new extractTextPlugin({
  filename: "styles.css",
  disable: false,
  allChunks: true
});

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@components": path.resolve("src/js/components"),
      "@common": path.resolve("src/js/common"),
      "@styles": path.resolve("src/scss")
    }
  },
  entry: {
    index: "./src/index.jsx"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
    library: "reactDateRangePicker",
    libraryTarget: "commonjs2"
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
        test: /\.scss$/,
        use: extractTextPluginInstance.extract({
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
    extractTextPluginInstance
  ],
  externals: {
    react: "commonjs react",
    "react-dom": "commonjs react-dom",
    "prop-types": "commonjs prop-types"
  }
};
