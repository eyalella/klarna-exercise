var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var cssnext = require('postcss-cssnext')

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
        test: /\.jpg$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /(\.scss|\.css)$/,
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader') + '?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          require.resolve('sass-loader') + '?sourceMap'
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
      },
      '/api/comments': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        secure: false
      }
    }
  },
  postcss: function () {
    return [cssnext]
  }
}
