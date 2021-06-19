const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/app.js",
  plugins: [
    new HtmlWebpackPlugin({
      title: "YNAB Absa CSV Converter",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "docs"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
};
