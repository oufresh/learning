/* global require, __dirname, module */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
    port: 3000,
    contentBase: "./dist", //where contents are served from,
    proxy: {
      '/micro/editable-list': { 
        target: 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: {
          '/micro/editable-list': ''
        }/*,

        bypass: function(req, res, proxyOptions) {
          console.log(req);
          return '/manifest.json';
        }*/
      }
    }
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", // name of html file to be created
      template: "./src/index.html", // source from which html file would be created
    }),
    new ManifestPlugin({
      seed: {
        short_name: "App",
        name: "Microfrontend App Sample",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "logo192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: "static", to: "." }] }),
  ],
};
