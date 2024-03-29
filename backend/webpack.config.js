const path = require('path');
const slsw = require('serverless-webpack');
// var nodeExternals = require('webpack-node-externals') TODO excute by ThienNLNT - 24-10:

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  // externals: [nodeExternals()], TODO excute by ThienNLNT - 24-10:
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader` TODO excute by ThienNLNT - 24-10:
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
};
