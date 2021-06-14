var path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "./../../../dist/prod"),
    filename: "js/index_bundle.[contenthash].js",
    clean: true
  },
  devServer: {
    port: 4000,
    contentBase: path.resolve(__dirname, "./../../../dist/prod"),
    hot: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/index.[contenthash].css"
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
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
