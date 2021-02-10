/* global require, __dirname, module */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (/*env*/) => {
  return {

    entry: "./src/index.js",
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist',
      publicPath: ""
    },
    module: {
        rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    externals: {
      lodash: "_"
    },
    devServer: {
      port: 3000,
      contentBase: "./dist", //where contents are served from,
      proxy: {
        '/editable-list': { 
          target: 'http://localhost:3001',
          changeOrigin: true,
          pathRewrite: {
            '/editable-list': ''
          }
        }, 
        '/basket-list': { 
          target: 'http://localhost:3002',
          changeOrigin: true,
          pathRewrite: {
            '/basket-list': ''
          }
        }
      }
      },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", // name of html file to be created
      template: "./src/index.html", // source from which html file would be created
    }),
    new WebpackManifestPlugin({
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
    new CopyWebpackPlugin({ patterns: [{ from: "static", to: "." }, { from: "libs", to: "." }]
   })
  ]

};
}