const webpack = require('webpack');

module.exports = {
  // autres configurations...
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
};
