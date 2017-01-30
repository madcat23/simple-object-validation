module.exports = {
  entry: './src/index.js',
  output: {
    path: './bin',
    filename: 'simple-object-validation.js',
    libraryTarget: 'commonjs',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
}
