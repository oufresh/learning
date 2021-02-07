/* global require, __dirname, module */
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = env => {
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
          use: ["raw-loader"],
        },
      ]
    },
    devServer: {
      port: 3001,
      contentBase: "./dist"//where contents are served from
    },
    devtool: "inline-source-map",
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html", // name of html file to be created
        template: "./src/index.html", // source from which html file would be created
      }),
      new WebpackManifestPlugin({
        seed: {
          short_name: "",
          name: "editable-list",
          icons: [],
          start_url: ".",
          display: "standalone",
          theme_color: "#000000",
          background_color: "#ffffff",
          
        },
      }),
      new CleanWebpackPlugin(),
    //new CopyWebpackPlugin({ patterns: [{ from: "static", to: "." }] }),
    //new webpack.EnvironmentPlugin(['STANDALONE']),
      new webpack.DefinePlugin({
        STANDALONE: env.STANDALONE
        })
  ]
}
}