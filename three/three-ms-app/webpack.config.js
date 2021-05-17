/* global require, __dirname, module */
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

/**
 * non può funzionare così perchè prima si carica lo script dall'app principale e il web component non è nel dom, in questo momento il loade prova inserire il
 * css. Quando lo renderizza nel dom il loader ormai ha già girato.
 * Posso allora 
 * 1. usare un loader raw e inserire il css creando il nodo style nel web component come fatto qui
 * 2. prefixare il css e le classi per non andare in conflitto con quello dell'app principale e caricarlo con style loader nle dom principale (prefix css-loader)
 * 3. usare un tag style con link e caricare il css separatamente
 * 
 * document.querySelector("basket-list").shadowRoot.firstElementChild
 *document.querySelector("three-ms-app").shadowRoot.querySelector("style")
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