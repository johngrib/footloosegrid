module.exports = {
  entry: './dist/footloosegrid.js',
  output: {
    path : __dirname,
    filename: './build/footloosegrid.bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css'}
    ]
  }
};