var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
        { from: './src/index.html' },
        { from: './src/klarna-ui-css-components.css' },
        { from: './assets' }
    ])
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /(\.scss|\.css)$/,
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader') + '?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ]
      }
    ]
  },
  devServer: {
    proxy: {
      '/api/search': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        secure: false
      }
    }
  }
}
