const path = require("path");
const webpack = require("webpack");

/* Optimisations des images */
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminMozjpeg = require("imagemin-mozjpeg");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new CopyPlugin({
      patterns: [{ from: "src/img", to: "image/" }],
    }),
    new ImageminPlugin({
      pngquant: { quality: "50-70" },
      plugins: [
        imageminMozjpeg({
          quality: 70,
          progressive: true,
        }),
      ],
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
