/* global require, __dirname, module */
const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const CopyWebpackPlugin = require("copy-webpack-plugin");

const p = path.resolve(__dirname, "dist");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  entry: "./src/index.js",
  output: {
    path: p,
    filename: "bundle.js",
  },
  devServer: {
    port: 3001,
    contentBase: "./dist", //where contents are served from
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", // name of html file to be created
      template: "./src/index.html", // source from which html file would be created
    }),
    new ManifestPlugin({
      seed: {
        short_name: "App1",
        name: "Microfrontend App 1",
        icons: [],
        start_url: ".",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
      },
    }),
    new CleanWebpackPlugin(),
    //new CopyWebpackPlugin({ patterns: [{ from: "static", to: "." }] }),
    new webpack.DefinePlugin({
      STANDALONE: false
    })
  ],
};
