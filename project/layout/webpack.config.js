const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
module.exports = () => ({
  mode: 'development',
  cache: false,
  devtool: 'source-map',
  optimization: {
    minimize: false,
  },
  target: 'web',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.vue', '.jsx', '.js', '.json'],
    alias: {
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      vue: '@vue/runtime-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new ModuleFederationPlugin({
      name: 'layout',
      filename: 'remoteEntry.js',
      remotes: {
        remote1: 'remote1@http://localhost:3002/remote1.entrypoint.js',
        remote2: 'remote2@http://localhost:3003/remote2.entrypoint.js',
      },
      exposes: {},
      shared: {
        vuetify: {
          singleton: true
        },
        vue: {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      chunks: ['main'],
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 3001,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
});