var path = require("path");
var webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanOptions = {
  allowExternal: true
};

module.exports = {
  entry: "./web/index.jsx",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader" // compiles Less to CSS
          }
        ]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: "url-loader",
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      THREE: "three",
      CANNON: "cannon"
    }),
    new CleanWebpackPlugin(["../distWeb"], CleanOptions),
    new HtmlWebpackPlugin({
      template: "./web/index.html",
      filename: "index.html",
      inject: "body"
    })
  ],
  output: {
    path: path.resolve(__dirname, "../distWeb"),
    filename: "bundle.js"
  }
};
