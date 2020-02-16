const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: { main: './main.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader']
          })
      },
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "/webfonts/fa-solid-900.woff",
          },
        },
      },
      {
        test: /\.svg$/,
        rules: [ {
          oneOf: [ {
            resourceQuery: /^\?vue-template/,
            loader: 'vue-template-loader',
            options: {
              functional: true
            }
          }, {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]?[hash]'
            }
          } ]
        }, {
          loader: 'svgo-loader',
          options: {
            plugins: [
              { removeViewBox: false },
              { removeDimensions: true }
            ]
          }
        } ]
      }
    ]
  }
};