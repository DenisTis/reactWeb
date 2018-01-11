const merge = require("webpack-merge");
const common = require("./webpack.common.js");
module.exports = merge(common, {
  devtool: "source-map", //with 'cheap-module-source-map' breakpoints do not work
  devServer: {
    port: 8081,
    publicPath: "/",
    historyApiFallback: true
  }
});
