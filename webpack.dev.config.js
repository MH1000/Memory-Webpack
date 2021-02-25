const copyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

/* Optimisations des images */
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  watch: true,
  /*entry: {
    index: "./src/index.js",
  }*/
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
