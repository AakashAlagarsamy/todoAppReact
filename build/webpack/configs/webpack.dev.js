var path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./../../../dist/dev"),
    filename: "js/index_bundle.js",
    clean: true
  },
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, "./../../../dist/dev"),
    hot: true
  },
  devtool: "inline-source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/index.css"
    })
  ],
  optimization: {
    // minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  }
});
