const ExtractTextPlugin = require('extract-text-webpack-plugin'),
      StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin'),
      BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      data = require('./data.js'),
      path = require('path');

module.exports = {
  context: path.join(__dirname, '.'),
    entry: './src/router',
    output: {
        path: './build',
        filename: 'bundle.js',
        libraryTarget: 'umd',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: __dirname + '/src',
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css?modules&minimize&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
                include: __dirname + '/src'
            }
        ],
    },
    plugins: [
      new CopyWebpackPlugin([
          { from: './src/images/favicons', to: 'images/favicons'},
          { from: './src/humans.txt'},
          { from: './src/robots.txt'},
          { from: './src/manifest.json'},
          { from: './src/favicon.ico'}
      ]),
        new ExtractTextPlugin("styles.css"),
        new StaticSiteGeneratorPlugin('main', data.routes, data),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8080/'
        })
    ]
};
