const package = require("./package.json");
const webpack = require("webpack");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      PUBLIC_URL: JSON.stringify(package.homepage),
    })
  ],
});