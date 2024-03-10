import dotenv from 'dotenv';
dotenv.config();

// const path = require('path');
import path from 'path'
import { fileURLToPath } from 'url';

import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin' 
// const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
import Dotenv from 'dotenv-webpack';
// const Dotenv = require('dotenv-webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
import HtmlWebpackPlugin
 from 'html-webpack-plugin';
const outputDirectory = 'dist';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: ['babel-polyfill', path.join(__dirname, './src/client/index.js')],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 100000 }
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
    static: '/',
    historyApiFallback: true,
    port: parseInt(process.env.CLIENT_PORT, 10),
    open: process.env.OPEN_BROWSER === 'true' ? true : false,
    proxy: {
      '/api': `http://localhost:${process.env.API_PORT}`,
    },
  },
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new CaseSensitivePathsPlugin(),
    new Dotenv({
      safe: false,
    }),
  ],
};
