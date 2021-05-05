/* global require, __dirname, module */
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

/**
 * 
 * document.querySelector("basket-list").shadowRoot.firstElementChild
 */
/*
const customStyleLoader = {
  loader: 'style-loader',
  options: {
    insert: function (linkTag) {
      const parent = document.querySelector('#root').shadowRoot
      parent.appendChild(linkTag)
    },
  },
}*/
module.exports = env => {
  return {
    
    externals: {
      lodash: "_"
    },
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
          use: ["raw-loader"]
        },
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin({
          test: /\.css$/i,
        }),
      ],
    },
    devServer: {
      port: 3002,
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
          name: "three-ms-app",
          icons: [],
          start_url: ".",
          display: "standalone",
          theme_color: "#000000",
          background_color: "#ffffff",
          
        },
      }),
      new CleanWebpackPlugin(),
    //new webpack.EnvironmentPlugin(['STANDALONE']),
      new webpack.DefinePlugin({
        STANDALONE: env.STANDALONE
        })
  ]
}
}